/*
  Seed quizzes and questions for modules with difficulty levels.
  - Modules: Dynamic Programming, Backtracking, Data Structures, Algorithms, System Design, Graph Algorithms
  - For each module: create 3 quizzes (Easy, Medium, Hard)
  - For each quiz: create 20 questions with 4 options (1 correct)
*/

const path = require('node:path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load env from backend/.env if present and process env
dotenv.config();
dotenv.config({ path: path.resolve(__dirname, '..', 'env') });

// Ensure models are registered with mongoose
require('../models/Lesson');
require('../models/Quiz');
require('../models/Question');
require('../models/Option');

const connectDB = require('../config/db');

async function run() {
  await connectDB();

  const Lesson = mongoose.model('Lesson');
  const Quizzes = mongoose.model('Quizzes');
  const Questions = mongoose.model('Questions');
  const Options = mongoose.model('Options');

  const modules = [
    { title: 'Dynamic Programming', description: 'Optimize solutions using overlapping subproblems and optimal substructure.' },
    { title: 'Backtracking', description: 'Systematically search for solutions by exploring and abandoning paths.' },
    { title: 'Data Structures', description: 'Core structures like arrays, stacks, queues, trees, and graphs.' },
    { title: 'Algorithms', description: 'Sorting, searching, and general problem-solving techniques.' },
    { title: 'System Design', description: 'Scalable systems, components, and design principles.' },
    { title: 'Graph Algorithms', description: 'Traversal, shortest paths, MSTs, and more.' },
  ];

  const difficulties = [
    { label: 'Easy', quizType: 'Easy', timeLimit: 20 * 60 },
    { label: 'Medium', quizType: 'Medium', timeLimit: 25 * 60 },
    { label: 'Hard', quizType: 'Hard', timeLimit: 30 * 60 },
  ];

  // Helper to generate deterministic options
  function buildOptionsFor(questionDoc, correctIndex) {
    const texts = ['Option A', 'Option B', 'Option C', 'Option D'];
    return texts.map((text, idx) => ({
      question_id: questionDoc._id,
      option_text: text,
      is_correct: idx === correctIndex,
    }));
  }

  // Create lessons, quizzes, and questions
  for (const mod of modules) {
    let lesson = await Lesson.findOne({ title: mod.title }).exec();
    if (!lesson) {
      lesson = await Lesson.create({
        title: mod.title,
        description: mod.description,
        difficulty: 'Easy',
        estimated_time: 60,
        is_published: true,
      });
    }

    for (const diff of difficulties) {
      // Create/find quiz for this module and difficulty
      let quiz = await Quizzes.findOne({ lesson_id: lesson._id, quiz_type: diff.quizType }).exec();
      if (!quiz) {
        quiz = await Quizzes.create({
          lesson_id: lesson._id,
          quiz_type: diff.quizType,
          time_limit: diff.timeLimit,
        });
      }

      // Count existing questions; ensure at least 20
      const existingCount = await Questions.countDocuments({ quiz_id: quiz._id }).exec();
      const toCreate = Math.max(0, 20 - existingCount);

      if (toCreate > 0) {
        const questionsToInsert = [];
        for (let i = 0; i < toCreate; i++) {
          questionsToInsert.push({
            quiz_id: quiz._id,
            question_text: `${mod.title} (${diff.label}) - Question ${existingCount + i + 1}`,
            // Use question_type to store difficulty label
            question_type: diff.label,
          });
        }

        const createdQs = await Questions.insertMany(questionsToInsert);

        // Create options for each question
        const allOptions = [];
        createdQs.forEach((q, idx) => {
          const correctIndex = (idx % 4); // rotate correct answer
          allOptions.push(...buildOptionsFor(q, correctIndex));
        });
        await Options.insertMany(allOptions);
      }
    }
  }

  console.log('✅ Seeding complete: ensured >= 20 questions per module per difficulty.');
  await mongoose.connection.close();
}

run().catch(async (err) => {
  console.error('❌ Seeding failed:', err);
  try { await mongoose.connection.close(); } catch {}
  process.exit(1);
});


