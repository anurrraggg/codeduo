export const post = {
  id: 1,
  title: "Master Dynamic Programming: From Beginner to Expert",
  excerpt:
    "A comprehensive guide to understanding dynamic programming concepts with practical examples and coding challenges.",
  content: `
    <article class="prose prose-lg max-w-none">
      <p class="text-gray-700 leading-relaxed">
        Dynamic Programming is one of the most powerful algorithmic techniques in computer science, yet it often intimidates beginners. In this comprehensive guide, we'll break down the concept step by step, making it accessible and practical.
      </p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-900">What is Dynamic Programming?</h2>
      <p class="text-gray-700 leading-relaxed">
        Dynamic Programming (DP) is an algorithmic paradigm that solves complex problems by breaking them down into simpler subproblems. It stores the results of subproblems to avoid computing the same results again, following the principle of optimality.
      </p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3 text-gray-800">Key Characteristics of DP Problems:</h3>
      <ul class="list-disc list-inside space-y-2 text-gray-700">
        <li><strong>Overlapping Subproblems:</strong> The problem can be broken down into subproblems which are reused several times.</li>
        <li><strong>Optimal Substructure:</strong> An optimal solution to the problem contains optimal solutions to the subproblems.</li>
      </ul>
      
      <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-900">Classic Example: Fibonacci Sequence</h2>
      <p class="text-gray-700 leading-relaxed">
        Let's start with the classic Fibonacci example to illustrate the difference between naive recursion and dynamic programming:
      </p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg my-6 overflow-x-auto">
        <pre class="text-sm font-mono leading-snug"><code>// Naive Recursive Approach - O(2^n)
function fibNaive(n) {
    if (n <= 1) return n;
    return fibNaive(n-1) + fibNaive(n-2);
}

// Dynamic Programming Approach - O(n)
function fibDP(n) {
    if (n <= 1) return n;
    
    const dp = [0, 1];
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    return dp[n];
}</code></pre>
      </div>
      
      <p class="text-gray-700 leading-relaxed">
        The DP approach reduces the time complexity from exponential to linear by storing previously computed values.
      </p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-900">Types of Dynamic Programming</h2>
      
      <h3 class="text-xl font-semibold mt-6 mb-3 text-gray-800">1. Top-Down Approach (Memoization)</h3>
      <p class="text-gray-700 leading-relaxed">
        This approach starts with the original problem and breaks it down into subproblems, storing results as we go:
      </p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg my-6 overflow-x-auto">
        <pre class="text-sm font-mono leading-snug"><code>function fibMemo(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 1) return n;
    
    memo[n] = fibMemo(n-1, memo) + fibMemo(n-2, memo);
    return memo[n];
}</code></pre>
      </div>
      
      <h3 class="text-xl font-semibold mt-6 mb-3 text-gray-800">2. Bottom-Up Approach (Tabulation)</h3>
      <p class="text-gray-700 leading-relaxed">
        This approach starts from the smallest subproblems and builds up to the original problem:
      </p>
      
      <div class="bg-gray-900 text-gray-100 p-4 rounded-lg my-6 overflow-x-auto">
        <pre class="text-sm font-mono leading-snug"><code>function fibBottomUp(n) {
    if (n <= 1) return n;
    
    let prev2 = 0, prev1 = 1;
    for (let i = 2; i <= n; i++) {
        const current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    return prev1;
}</code></pre>
      </div>
      
      <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-900">Advanced DP Problems</h2>
      <p class="text-gray-700 leading-relaxed">
        Once you master the basics, you can tackle more complex problems like:
      </p>
      <ul class="list-disc list-inside space-y-2 text-gray-700">
        <li>Longest Common Subsequence</li>
        <li>0/1 Knapsack Problem</li>
        <li>Edit Distance</li>
        <li>Maximum Subarray Sum</li>
        <li>Coin Change Problem</li>
      </ul>
      
      <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-900">Tips for Solving DP Problems</h2>
      <ol class="list-decimal list-inside space-y-2 text-gray-700">
        <li><strong>Identify the pattern:</strong> Look for overlapping subproblems and optimal substructure.</li>
        <li><strong>Define the state:</strong> What parameters uniquely identify a subproblem?</li>
        <li><strong>Write the recurrence relation:</strong> How does the current state relate to previous states?</li>
        <li><strong>Implement and optimize:</strong> Start with recursion, then add memoization or use tabulation.</li>
      </ol>
      
      <h2 class="text-2xl font-bold mt-8 mb-4 text-gray-900">Conclusion</h2>
      <p class="text-gray-700 leading-relaxed">
        Dynamic Programming is a powerful technique that can dramatically improve the efficiency of your algorithms. With practice and the right approach, you'll be able to recognize DP patterns and apply them effectively to solve complex problems.
      </p>
      
      <p class="text-gray-700 leading-relaxed">
        Remember, the key to mastering DP is practice. Start with simple problems and gradually work your way up to more complex ones. Happy coding!
      </p>
    </article>
  `,
  author: {
    name: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786",
    bio: "Senior Software Engineer & Algorithms Expert",
  },
  publishedDate: "2024-03-15",
  readTime: "8 min read",
  views: 3247,
  category: "Algorithms",
  tags: ["Dynamic Programming", "Algorithms", "Coding", "Interview Prep", "Data Structures"],
  image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop",
};

export const relatedPosts = [
    {
        id: 2,
        title: "Binary Search Trees: Complete Guide",
        image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=300&h=200&fit=crop",
        readTime: "6 min read",
        category: "Data Structures"
    },
    {
        id: 3,
        title: "Graph Algorithms Every Developer Should Know",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&h=200&fit=crop",
        readTime: "10 min read",
        category: "Algorithms"
    },
    {
        id: 4,
        title: "System Design Interview Prep",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop",
        readTime: "15 min read",
        category: "System Design"
    }
];

export const recentPosts = [
    { id: 5, title: "Understanding Big O Notation", date: "2024-03-12" },
    { id: 6, title: "Sorting Algorithms Comparison", date: "2024-03-10" },
    { id: 7, title: "Hash Tables Deep Dive", date: "2024-03-08" },
    { id: 8, title: "Recursion vs Iteration", date: "2024-03-05" }
];