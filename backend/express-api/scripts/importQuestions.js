const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const connectDB = require('../config/db');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

// Load models
const Quiz = require('../models/Quiz');
const Question = require('../models/Question');

async function importQuestions() {
    // Parse arguments
    const args = process.argv.slice(2);
    const argMap = {};
    args.forEach(arg => {
        const [key, value] = arg.split('=');
        if (key.startsWith('--')) {
            argMap[key.replace('--', '')] = value;
        }
    });

    const { file, quizName, difficulty = 'Easy' } = argMap;

    if (!file || !quizName) {
        console.error('❌ Usage: node scripts/importQuestions.js --file=path/to/file.json --quizName="DSA" --difficulty=Easy');
        process.exit(1);
    }

    try {
        await connectDB();

        // 1. Read the JSON file
        const dataPath = path.isAbsolute(file) ? file : path.join(process.cwd(), file);
        if (!fs.existsSync(dataPath)) {
            console.error(`❌ File not found: ${dataPath}`);
            process.exit(1);
        }
        const questionsData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

        // 2. Find or create the Quiz
        let quiz = await Quiz.findOne({ name: quizName }).exec();
        if (!quiz) {
            console.log(`📝 Creating new Quiz: "${quizName}"`);
            quiz = await Quiz.create({
                name: quizName,
                difficulty: difficulty,
                questions: []
            });
        }

        console.log(`🚀 Importing ${questionsData.length} questions into "${quizName}"...`);

        const newQuestionIds = [];
        for (const qData of questionsData) {
            // Check if question already exists by text
            let question = await Question.findOne({ question: qData.question }).exec();
            
            if (!question) {
                question = await Question.create({
                    quiz_id: quiz.quiz_id,
                    question: qData.question,
                    type: qData.type || 'MCQ',
                    options: qData.options,
                    correctAnswer: qData.correctAnswer,
                    explanation: qData.explanation || 'No explanation provided'
                });
                console.log(`✅ Created: ${qData.question.substring(0, 50)}...`);
            } else {
                console.log(`⏭️  Skipped (already exists): ${qData.question.substring(0, 50)}...`);
            }
            newQuestionIds.push(question.question_id);
        }

        // 3. Update Quiz with new question IDs (avoid duplicates)
        const updatedQuestions = [...new Set([...quiz.questions, ...newQuestionIds])];
        await Quiz.updateOne({ quiz_id: quiz.quiz_id }, { questions: updatedQuestions });

        console.log(`\n✨ Successfully imported questions into "${quizName}"!`);
        process.exit(0);
    } catch (error) {
        console.error('❌ Error during import:', error);
        process.exit(1);
    }
}

importQuestions();
