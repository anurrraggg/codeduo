export const quizQuestions = [
    {
        id: 1,
        question: "What is the time complexity of accessing an element in a hash table (average case)?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        correctAnswer: 0,
        explanation: "Hash tables provide O(1) average time complexity for access operations due to direct indexing."
    },
    {
        id: 2,
        question: "Which data structure follows the Last In First Out (LIFO) principle?",
        options: ["Queue", "Stack", "Linked List", "Array"],
        correctAnswer: 1,
        explanation: "A stack follows LIFO principle where the last element added is the first one to be removed."
    },
    {
        id: 3,
        question: "What is the space complexity of merge sort?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        correctAnswer: 2,
        explanation: "Merge sort requires O(n) extra space for the temporary arrays used in the merging process."
    },
    {
        id: 4,
        question: "In a binary search tree, what is the time complexity for searching an element in the worst case?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        correctAnswer: 2,
        explanation: "In worst case (skewed tree), BST degenerates to a linked list, giving O(n) search time."
    },
    {
        id: 5,
        question: "Which algorithm is used to find the shortest path in a weighted graph?",
        options: ["BFS", "DFS", "Dijkstra's", "Quick Sort"],
        correctAnswer: 2,
        explanation: "Dijkstra's algorithm finds shortest paths from a source vertex to all other vertices in weighted graphs."
    },
    {
        id: 6,
        question: "What is the time complexity of inserting an element at the beginning of a linked list?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        correctAnswer: 0,
        explanation: "Inserting at the beginning of a linked list is O(1) as it only requires updating pointers."
    },
    {
        id: 7,
        question: "Which of the following is NOT a stable sorting algorithm?",
        options: ["Merge Sort", "Bubble Sort", "Quick Sort", "Insertion Sort"],
        correctAnswer: 2,
        explanation: "Quick sort is not stable as it may change the relative order of equal elements during partitioning."
    },
    {
        id: 8,
        question: "What is the maximum number of nodes at level 'i' in a binary tree?",
        options: ["2^i", "2^(i-1)", "2^(i+1)", "i^2"],
        correctAnswer: 0,
        explanation: "At level i (starting from 0), a binary tree can have at most 2^i nodes."
    },
    {
        id: 9,
        question: "Which data structure is used to implement recursion?",
        options: ["Queue", "Stack", "Array", "Hash Table"],
        correctAnswer: 1,
        explanation: "The system uses a call stack to manage function calls in recursion, storing return addresses and local variables."
    },
    {
        id: 10,
        question: "What is the time complexity of heapify operation in a binary heap?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        correctAnswer: 1,
        explanation: "Heapify operation takes O(log n) time as it may need to traverse the height of the heap."
    },
    {
        id: 11,
        question: "In dynamic programming, what does 'optimal substructure' mean?",
        options: ["Problem has overlapping subproblems", "Optimal solution contains optimal solutions to subproblems", "Problem can be solved recursively", "Problem has exponential time complexity"],
        correctAnswer: 1,
        explanation: "Optimal substructure means that optimal solution to the problem contains optimal solutions to subproblems."
    },
    {
        id: 12,
        question: "What is the space complexity of BFS traversal?",
        options: ["O(1)", "O(V)", "O(E)", "O(V + E)"],
        correctAnswer: 1,
        explanation: "BFS uses a queue which in worst case can store all vertices at the same level, requiring O(V) space."
    },
    {
        id: 13,
        question: "Which of the following has the best average-case time complexity for sorting?",
        options: ["Bubble Sort", "Selection Sort", "Quick Sort", "Insertion Sort"],
        correctAnswer: 2,
        explanation: "Quick Sort has O(n log n) average time complexity, which is better than the O(n²) of the other options."
    },
    {
        id: 14,
        question: "What is the minimum number of comparisons needed to find both maximum and minimum in an array of n elements?",
        options: ["n", "2n - 2", "3n/2 - 2", "n - 1"],
        correctAnswer: 2,
        explanation: "By comparing elements in pairs, we can find both min and max in 3n/2 - 2 comparisons."
    },
    {
        id: 15,
        question: "In a graph, what is a spanning tree?",
        options: ["A tree with all vertices", "A subgraph that connects all vertices with minimum edges", "A tree with maximum weight", "A cyclic subgraph"],
        correctAnswer: 1,
        explanation: "A spanning tree is a subgraph that includes all vertices connected with exactly V-1 edges (no cycles)."
    },
    {
        id: 16,
        question: "What is the time complexity of finding the kth smallest element using QuickSelect?",
        options: ["O(n)", "O(n log n)", "O(k)", "O(n²)"],
        correctAnswer: 0,
        explanation: "QuickSelect has O(n) average time complexity for finding the kth smallest element."
    },
    {
        id: 17,
        question: "Which technique is used to avoid recomputation in dynamic programming?",
        options: ["Recursion", "Memoization", "Iteration", "Backtracking"],
        correctAnswer: 1,
        explanation: "Memoization stores results of subproblems to avoid recomputation in dynamic programming."
    },
    {
        id: 18,
        question: "What is the worst-case time complexity of insertion in a B-tree of order m?",
        options: ["O(1)", "O(log n)", "O(m log n)", "O(n)"],
        correctAnswer: 1,
        explanation: "B-tree insertion is O(log n) as it involves traversing the height and possibly splitting nodes."
    },
    {
        id: 19,
        question: "Which algorithm is used for topological sorting?",
        options: ["DFS", "BFS", "Both DFS and BFS", "Dijkstra's"],
        correctAnswer: 2,
        explanation: "Both DFS (using recursion stack) and BFS (using in-degree) can be used for topological sorting."
    },
    {
        id: 20,
        question: "What is the time complexity of building a heap from an unsorted array?",
        options: ["O(n log n)", "O(n)", "O(log n)", "O(n²)"],
        correctAnswer: 1,
        explanation: "Building a heap from an unsorted array using bottom-up heapify takes O(n) time."
    }
];

export const quizzes = [
    {
        id: 1,
        title: 'Binary Tree Fundamentals',
        category: 'Data Structures',
        difficulty: 'Beginner',
        duration: '15 min',
        questions: 20,
        participants: 2847,
        rating: 4.8,
        description: 'Master the basics of binary trees with traversal algorithms and basic operations.',
        tags: ['Trees', 'Traversal', 'Recursion'],
        isPopular: true
    },
    {
        id: 2,
        title: 'Dynamic Programming Mastery',
        category: 'Dynamic Programming',
        difficulty: 'Advanced',
        duration: '25 min',
        questions: 15,
        participants: 1523,
        rating: 4.9,
        description: 'Solve complex DP problems including knapsack, LIS, and optimization challenges.',
        tags: ['Optimization', 'Memoization', 'Tabulation'],
        isNew: true
    },
    {
        id: 3,
        title: 'Graph Traversal Algorithms',
        category: 'Graph Algorithms',
        difficulty: 'Intermediate',
        duration: '18 min',
        questions: 12,
        participants: 1876,
        rating: 4.7,
        description: 'Deep dive into BFS, DFS, and shortest path algorithms.',
        tags: ['BFS', 'DFS', 'Shortest Path']
    },
    {
        id: 4,
        title: 'Array Manipulation Techniques',
        category: 'Data Structures',
        difficulty: 'Beginner',
        duration: '12 min',
        questions: 18,
        participants: 3421,
        rating: 4.6,
        description: 'Learn essential array operations, sorting, and searching techniques.',
        tags: ['Arrays', 'Sorting', 'Searching'],
        isPopular: true
    },
    {
        id: 5,
        title: 'Backtracking Problem Solving',
        category: 'Backtracking',
        difficulty: 'Intermediate',
        duration: '20 min',
        questions: 14,
        participants: 987,
        rating: 4.8,
        description: 'Solve N-Queens, Sudoku, and permutation problems using backtracking.',
        tags: ['N-Queens', 'Sudoku', 'Permutations']
    },
    {
        id: 6,
        title: 'System Design Fundamentals',
        category: 'System Design',
        difficulty: 'Advanced',
        duration: '30 min',
        questions: 10,
        participants: 756,
        rating: 4.9,
        description: 'Learn scalability, load balancing, and distributed system concepts.',
        tags: ['Scalability', 'Load Balancing', 'Distributed Systems'],
        isNew: true
    },
    {
        id: 7,
        title: 'Sorting Algorithm Deep Dive',
        category: 'Algorithms',
        difficulty: 'Intermediate',
        duration: '16 min',
        questions: 16,
        participants: 2134,
        rating: 4.7,
        description: 'Compare and analyze various sorting algorithms and their complexities.',
        tags: ['Quicksort', 'Mergesort', 'Time Complexity']
    },
    {
        id: 8,
        title: 'Hash Table Implementation',
        category: 'Data Structures',
        difficulty: 'Intermediate',
        duration: '14 min',
        questions: 13,
        participants: 1654,
        rating: 4.8,
        description: 'Understand hash functions, collision resolution, and hash table design.',
        tags: ['Hashing', 'Collision Resolution', 'Hash Functions']
    }
];