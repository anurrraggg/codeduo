const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const axios = require('axios');
const { createQuiz, getQuizByQuizId, getQuizByLessonId, updateQuiz, getAllQuizzes, deleteQuiz } = require('../controllers/quizController');

// Sample MCQ questions for C++
const cppQuestions = [
  {
    id: 1,
    text: "What is the correct way to declare a pointer in C++?",
    answers: [
      { key: 'a', text: 'int *ptr;' },
      { key: 'b', text: 'int ptr*;' },
      { key: 'c', text: 'pointer int ptr;' },
      { key: 'd', text: 'int ptr = &;' }
    ],
    correct: 'a',
    explanation: 'The correct syntax is "int *ptr;" where the asterisk (*) indicates that ptr is a pointer to an integer.'
  },
  {
    id: 2,
    text: "Which of the following is used to allocate memory dynamically in C++?",
    answers: [
      { key: 'a', text: 'malloc()' },
      { key: 'b', text: 'new' },
      { key: 'c', text: 'calloc()' },
      { key: 'd', text: 'All of the above' }
    ],
    correct: 'd',
    explanation: 'All three can be used for dynamic memory allocation, though "new" is the C++ way and preferred.'
  },
  {
    id: 3,
    text: "What is the output of: cout << sizeof('a');",
    answers: [
      { key: 'a', text: '1' },
      { key: 'b', text: '2' },
      { key: 'c', text: '4' },
      { key: 'd', text: 'Depends on compiler' }
    ],
    correct: 'a',
    explanation: 'In C++, a character literal is of type char, which is 1 byte in size.'
  },
  {
    id: 4,
    text: "Which keyword is used to prevent inheritance of a class?",
    answers: [
      { key: 'a', text: 'private' },
      { key: 'b', text: 'final' },
      { key: 'c', text: 'sealed' },
      { key: 'd', text: 'C++ does not support this' }
    ],
    correct: 'd',
    explanation: 'C++ does not have a built-in keyword to prevent inheritance. You can achieve this by making constructors private or using final (C++11).'
  },
  {
    id: 5,
    text: "What is the purpose of virtual functions in C++?",
    answers: [
      { key: 'a', text: 'To make functions faster' },
      { key: 'b', text: 'To enable runtime polymorphism' },
      { key: 'c', text: 'To save memory' },
      { key: 'd', text: 'To prevent function overriding' }
    ],
    correct: 'b',
    explanation: 'Virtual functions enable runtime polymorphism by allowing the correct function to be called based on the actual object type.'
  },
  {
    id: 6,
    text: "Which of the following is not a valid access specifier in C++?",
    answers: [
      { key: 'a', text: 'private' },
      { key: 'b', text: 'protected' },
      { key: 'c', text: 'public' },
      { key: 'd', text: 'internal' }
    ],
    correct: 'd',
    explanation: '"internal" is not a valid access specifier in C++. The valid ones are public, private, and protected.'
  },
  {
    id: 7,
    text: "What is the default return type of functions in C++ if not specified?",
    answers: [
      { key: 'a', text: 'void' },
      { key: 'b', text: 'int' },
      { key: 'c', text: 'float' },
      { key: 'd', text: 'double' }
    ],
    correct: 'b',
    explanation: 'In C++, if the return type is not specified, it defaults to int.'
  },
  {
    id: 8,
    text: "Which operator cannot be overloaded in C++?",
    answers: [
      { key: 'a', text: '++' },
      { key: 'b', text: '?:' },
      { key: 'c', text: '[]' },
      { key: 'd', text: '->' }
    ],
    correct: 'b',
    explanation: 'The conditional (ternary) operator ?: cannot be overloaded in C++.'
  },
  {
    id: 9,
    text: "What is the size of a boolean variable in C++?",
    answers: [
      { key: 'a', text: '1 bit' },
      { key: 'b', text: '1 byte' },
      { key: 'c', text: '2 bytes' },
      { key: 'd', text: 'Depends on compiler' }
    ],
    correct: 'b',
    explanation: 'A boolean variable in C++ typically occupies 1 byte.'
  },
  {
    id: 10,
    text: "Which of the following is used to define a constant in C++?",
    answers: [
      { key: 'a', text: '#define' },
      { key: 'b', text: 'const' },
      { key: 'c', text: 'Both a and b' },
      { key: 'd', text: 'static' }
    ],
    correct: 'c',
    explanation: 'Both #define (preprocessor) and const (keyword) can be used to define constants in C++.'
  },
  {
    id: 11,
    text: "Which function is called when an object is destroyed?",
    answers: [
      { key: 'a', text: 'Constructor' },
      { key: 'b', text: 'Destructor' },
      { key: 'c', text: 'Copy Constructor' },
      { key: 'd', text: 'Assignment Operator' }
    ],
    correct: 'b',
    explanation: 'The destructor is called when an object is destroyed.'
  },
  {
    id: 12,
    text: "Which of the following is the correct syntax for inheritance in C++?",
    answers: [
      { key: 'a', text: 'class Derived : public Base {};' },
      { key: 'b', text: 'class Derived inherits Base {};' },
      { key: 'c', text: 'class Derived extends Base {};' },
      { key: 'd', text: 'class Derived -> Base {};' }
    ],
    correct: 'a',
    explanation: 'The correct syntax is: class Derived : public Base {};'
  },
  {
    id: 13,
    text: "Which of the following is used to terminate a loop in C++?",
    answers: [
      { key: 'a', text: 'exit' },
      { key: 'b', text: 'break' },
      { key: 'c', text: 'continue' },
      { key: 'd', text: 'return' }
    ],
    correct: 'b',
    explanation: 'The break statement is used to terminate a loop in C++.'
  },
  {
    id: 14,
    text: "Which header file is required for using std::vector in C++?",
    answers: [
      { key: 'a', text: '<vector>' },
      { key: 'b', text: '<array>' },
      { key: 'c', text: '<list>' },
      { key: 'd', text: '<map>' }
    ],
    correct: 'a',
    explanation: 'The <vector> header file is required for using std::vector.'
  },
  {
    id: 15,
    text: "What is the output of: std::cout << 5 / 2;",
    answers: [
      { key: 'a', text: '2.5' },
      { key: 'b', text: '2' },
      { key: 'c', text: '2.0' },
      { key: 'd', text: 'Error' }
    ],
    correct: 'b',
    explanation: 'Both operands are integers, so integer division is performed, resulting in 2.'
  }
];

let currentQuestionIndex = 0;

// Get next question
router.get('/next', auth, (req, res) => {
  const topic = req.query.topic || 'cpp';

  if (topic === 'cpp') {
    // Pick a random question instead of rotating
    const question = cppQuestions[Math.floor(Math.random() * cppQuestions.length)];
    res.json({
      question: {
        id: question.id,
        text: question.text,
        answers: question.answers,
        correct: question.correct,
        explanation: question.explanation
      }
    });
  } else {
    res.status(400).json({ message: 'Topic not supported' });
  }
});

// Submit answer
router.post('/answer', auth, async (req, res) => {
  try {
    const { selectedKey, correct } = req.body;
    
    if (!selectedKey || !correct) {
      return res.status(400).json({ message: 'Missing selectedKey or correct answer' });
    }
    
    const isCorrect = selectedKey === correct;
    
    // Update user points based on answer
    let pointsChange = 0;
    if (isCorrect) {
      pointsChange = 2; // +2 points for correct answer
    } else {
      pointsChange = -1; // -1 point for wrong answer
    }
    
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $inc: { points: pointsChange } },
      { new: true, select: 'username points' }
    );
    
    console.log(`User ${req.user.username} answered ${isCorrect ? 'correctly' : 'incorrectly'}! Points: ${updatedUser.points} (${pointsChange > 0 ? '+' : ''}${pointsChange})`);
    
    res.json({
      correct: isCorrect,
      selectedKey,
      correctAnswer: correct,
      newPoints: updatedUser.points,
      pointsChange: pointsChange
    });
  } catch (error) {
    console.error('Error updating user points:', error);
    res.status(500).json({ message: 'Failed to update points' });
  }
});

// Add this route to fetch questions from OpenTDB
router.get('/external', auth, async (req, res) => {
  try {
    const count = Math.max(1, Math.min(parseInt(req.query.count) || 5, 50)); // OpenTDB max is 50
    const response = await axios.get(`https://opentdb.com/api.php?amount=${count}&category=18&type=multiple`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch external questions' });
  }
});

router.post('/', auth, createQuiz);
router.get('/quiz/:quizId', auth, getQuizByQuizId);
router.get('/lesson/:lessonId', auth, getQuizByLessonId);
router.put('/', auth, updateQuiz);
router.get('/', auth, getAllQuizzes);
router.delete('/', auth, deleteQuiz);

module.exports = router;

