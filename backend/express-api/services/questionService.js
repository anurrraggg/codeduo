const { questionRepository } = require("../repository/questionRepository");
const Quiz = require("../models/Quiz");
const { generateAdaptiveQuestionFromGemini } = require("./geminiService");

const questionService = {
  createQuestion: async (questionData) => {
    return await questionRepository.create(questionData);
  },

  findQuestionById: async (id) => {
    return await questionRepository.findById(id);
  },

  findQuestionsByQuizId: async (quizId) => {
    return await questionRepository.findByQuizId(quizId);
  },

  findQuestionByQuestionId: async (questionId) => {
    return await questionRepository.findByQuestionId(questionId);
  },

  updateQuestion: async (questionId, questionData) => {
    return await questionRepository.update(questionId, questionData);
  },

  findAllQuestions: async () => {
    return await questionRepository.findAll();
  },

  deleteQuestion: async (id) => {
    await questionRepository.delete(id);
  },

  createAdaptiveQuestion: async (payload) => {
    const generated = await generateAdaptiveQuestionFromGemini(payload);

    const questionToSave = {
      quiz_id: payload.quiz_id,
      type: payload.type || generated.type || "MCQ",
      question: generated.question,
      options: generated.options,
      correctAnswer: [generated.correctAnswer],
      explanation: generated.explanation || "No explanation provided"
    };

    const savedQuestion = await questionRepository.create(questionToSave);

    // Keep quiz->questions relationship in sync when quiz exists.
    await Quiz.updateOne(
      { quiz_id: payload.quiz_id },
      { $addToSet: { questions: savedQuestion.question_id } }
    );

    return savedQuestion;
  }
};

module.exports = { questionService };
