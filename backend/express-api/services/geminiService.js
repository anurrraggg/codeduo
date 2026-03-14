const axios = require("axios");

const SUPPORTED_DIFFICULTY = ["Easy", "Medium", "Hard"];
const DEFAULT_MAX_RETRIES = 3;
const DEFAULT_BASE_DELAY_MS = 800;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getRetryAfterDelay = (retryAfterHeader) => {
  if (!retryAfterHeader) return null;

  const asSeconds = Number(retryAfterHeader);
  if (Number.isFinite(asSeconds) && asSeconds >= 0) {
    return asSeconds * 1000;
  }

  const asDate = new Date(retryAfterHeader).getTime();
  if (Number.isFinite(asDate)) {
    const msUntilDate = asDate - Date.now();
    return msUntilDate > 0 ? msUntilDate : null;
  }

  return null;
};

const getBackoffDelay = (attempt, baseDelayMs, retryAfterHeader) => {
  const retryAfterDelay = getRetryAfterDelay(retryAfterHeader);
  if (retryAfterDelay !== null) {
    return retryAfterDelay;
  }

  const jitter = Math.floor(Math.random() * 250);
  const exponential = baseDelayMs * (2 ** (attempt - 1));
  return Math.min(exponential + jitter, 15000);
};

const buildRequestPayload = (prompt) => ({
  contents: [{ role: "user", parts: [{ text: prompt }] }],
  generationConfig: {
    temperature: 0.7,
    responseMimeType: "application/json"
  }
});

const buildRequestConfig = () => ({
  timeout: 30000,
  headers: {
    "Content-Type": "application/json"
  }
});

const mapAuthError = (status) => {
  const authError = new Error("Gemini API key is invalid or unauthorized for the selected model.");
  authError.statusCode = status;
  return authError;
};

const mapQuotaError = () => {
  const quotaError = new Error("Gemini quota exceeded or rate limit reached after retries. Please retry later or check API limits.");
  quotaError.statusCode = 429;
  return quotaError;
};

const handleNon429ErrorStatus = (status, error) => {
  if (status === 401 || status === 403) {
    throw mapAuthError(status);
  }

  if (status === 404) {
    return null;
  }

  throw error;
};

const requestWithRetryForModel = async ({ url, prompt, maxRetries, baseDelayMs }) => {
  let attempt = 0;

  while (attempt <= maxRetries) {
    try {
      return await axios.post(url, buildRequestPayload(prompt), buildRequestConfig());
    } catch (error) {
      const status = error?.response?.status;

      if (status === 429) {
        if (attempt >= maxRetries) {
          throw mapQuotaError();
        }

        const retryAfterHeader = error.response.headers?.["retry-after"];
        const delayMs = getBackoffDelay(attempt + 1, baseDelayMs, retryAfterHeader);
        await sleep(delayMs);
        attempt += 1;
        continue;
      }

      return handleNon429ErrorStatus(status, error);
    }
  }

  return null;
};

const normalizeDifficulty = (difficulty = "Medium") => {
  const normalized = String(difficulty).toLowerCase();
  if (normalized === "easy") return "Easy";
  if (normalized === "hard") return "Hard";
  return "Medium";
};

const nextDifficulty = (currentDifficulty, wasCorrect) => {
  const current = normalizeDifficulty(currentDifficulty);
  const currentIndex = SUPPORTED_DIFFICULTY.indexOf(current);

  if (typeof wasCorrect !== "boolean") return current;

  if (wasCorrect && currentIndex < SUPPORTED_DIFFICULTY.length - 1) {
    return SUPPORTED_DIFFICULTY[currentIndex + 1];
  }

  if (!wasCorrect && currentIndex > 0) {
    return SUPPORTED_DIFFICULTY[currentIndex - 1];
  }

  return current;
};

const parseGeminiJson = (text) => {
  const trimmed = text.trim();
  if (!trimmed) throw new Error("Gemini returned empty response.");

  try {
    return JSON.parse(trimmed);
  } catch (parseError) {
    const start = trimmed.indexOf("{");
    const end = trimmed.lastIndexOf("}");
    if (start === -1 || end === -1 || start >= end) {
      throw new Error(`Gemini returned non-JSON output: ${parseError.message}`);
    }
    return JSON.parse(trimmed.slice(start, end + 1));
  }
};

const validateAndNormalizeQuestion = (data) => {
  const question = typeof data.question === "string" ? data.question.trim() : "";
  const options = Array.isArray(data.options)
    ? data.options.map((option) => String(option).trim()).filter(Boolean)
    : [];

  if (!question) {
    throw new Error("Generated question is missing.");
  }

  if (options.length < 2) {
    throw new Error("Generated question has insufficient options.");
  }

  let correctAnswer = data.correctAnswer;

  if (typeof correctAnswer === "number") {
    if (correctAnswer < 0 || correctAnswer >= options.length) {
      throw new Error("Generated correctAnswer index is invalid.");
    }
    correctAnswer = options[correctAnswer];
  }

  if (typeof correctAnswer !== "string") {
    throw new TypeError("Generated correctAnswer must be a string option or valid option index.");
  }

  const normalizedCorrectAnswer = correctAnswer.trim();
  if (!options.includes(normalizedCorrectAnswer)) {
    throw new Error("Generated correctAnswer does not match options.");
  }

  return {
    type: data.type === "TILES" ? "TILES" : "MCQ",
    question,
    options,
    correctAnswer: normalizedCorrectAnswer,
    explanation:
      typeof data.explanation === "string" && data.explanation.trim()
        ? data.explanation.trim()
        : "No explanation provided"
  };
};

const generateAdaptiveQuestionFromGemini = async ({
  topic,
  previousQuestion,
  previousAnswer,
  wasCorrect,
  currentDifficulty,
  type
}) => {
  const apiKey = process.env.GEMINI_API_KEY;
  const configuredModel = process.env.GEMINI_MODEL;
  const maxRetries = Math.max(0, Number(process.env.GEMINI_MAX_RETRIES || DEFAULT_MAX_RETRIES));
  const baseDelayMs = Math.max(100, Number(process.env.GEMINI_RETRY_BASE_DELAY_MS || DEFAULT_BASE_DELAY_MS));

  if (!apiKey) {
    const error = new Error("GEMINI_API_KEY is required for adaptive question generation.");
    error.statusCode = 500;
    throw error;
  }

  const targetDifficulty = nextDifficulty(currentDifficulty, wasCorrect);
  const mode = type === "TILES" ? "TILES" : "MCQ";

  const prompt = `You are an adaptive coding quiz generator.
Return ONLY valid JSON with these keys: type, question, options, correctAnswer, explanation.
Do not include markdown, code fences, or extra text.

Rules:
- type must be "${mode}".
- topic must be "${topic}".
- difficulty must be "${targetDifficulty}".
- Generate exactly 4 concise options.
- correctAnswer must exactly match one option value.
- Keep question practical for interview prep.

Student history:
- previousQuestion: ${previousQuestion || "N/A"}
- previousAnswer: ${previousAnswer || "N/A"}
- wasCorrect: ${typeof wasCorrect === "boolean" ? String(wasCorrect) : "unknown"}

Output JSON schema:
{
  "type": "MCQ",
  "question": "string",
  "options": ["string", "string", "string", "string"],
  "correctAnswer": "string",
  "explanation": "string"
}`;

  const fallbackModels = [
    configuredModel,
    "gemini-2.0-flash",
    "gemini-2.0-flash-lite",
    "gemini-1.5-flash"
  ].filter(Boolean);

  let response = null;
  let lastError = null;

  for (const model of fallbackModels) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    try {
      response = await requestWithRetryForModel({
        url,
        prompt,
        maxRetries,
        baseDelayMs
      });
      if (response) {
        break;
      }
    } catch (error) {
      lastError = error;
      console.warn(`Gemini API fallback log - model ${model} failed:`, error.message);
    }
  }

  if (!response) {
    throw lastError || new Error("Gemini request failed for all configured models.");
  }

  const text = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    const error = new Error("Gemini did not return candidate content.");
    error.statusCode = 502;
    throw error;
  }

  const parsed = parseGeminiJson(text);
  return validateAndNormalizeQuestion(parsed);
};

module.exports = { generateAdaptiveQuestionFromGemini };
