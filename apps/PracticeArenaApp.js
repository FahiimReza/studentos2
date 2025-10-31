function PracticeArenaApp() {
  try {
    const [activePlatform, setActivePlatform] = React.useState('all');
    const [selectedDifficulty, setSelectedDifficulty] = React.useState('all');
    const [selectedTopic, setSelectedTopic] = React.useState('all');
    const [showProblem, setShowProblem] = React.useState(false);
    const [currentProblem, setCurrentProblem] = React.useState(null);

    const platforms = [
      { id: 'all', name: 'All Platforms', icon: '🌐', color: '#8E8E93' },
      { id: 'leetcode', name: 'LeetCode', icon: '💻', color: '#FFA116' },
      { id: 'codeforces', name: 'Codeforces', icon: '⚔️', color: '#1E90FF' },
      { id: 'hackerrank', name: 'HackerRank', icon: '🎯', color: '#2EC866' },
      { id: 'codewars', name: 'Codewars', icon: '🥋', color: '#B32E37' }
    ];

    const difficulties = [
      { id: 'all', name: 'All Levels' },
      { id: 'easy', name: 'Easy', color: 'text-green-600' },
      { id: 'medium', name: 'Medium', color: 'text-yellow-600' },
      { id: 'hard', name: 'Hard', color: 'text-red-600' }
    ];

    const topics = [
      { id: 'all', name: 'All Topics' },
      { id: 'arrays', name: 'Arrays' },
      { id: 'strings', name: 'Strings' },
      { id: 'linked-lists', name: 'Linked Lists' },
      { id: 'trees', name: 'Trees' },
      { id: 'graphs', name: 'Graphs' },
      { id: 'dynamic-programming', name: 'Dynamic Programming' },
      { id: 'algorithms', name: 'Algorithms' },
      { id: 'data-structures', name: 'Data Structures' }
    ];

    const problems = [
      {
        id: 1,
        title: 'Two Sum',
        platform: 'leetcode',
        difficulty: 'easy',
        topic: 'arrays',
        description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
        acceptance: '49.2%',
        frequency: 'High',
        solved: true,
        url: 'https://leetcode.com/problems/two-sum/'
      },
      {
        id: 2,
        title: 'Longest Substring Without Repeating Characters',
        platform: 'leetcode',
        difficulty: 'medium',
        topic: 'strings',
        description: 'Given a string s, find the length of the longest substring without repeating characters.',
        acceptance: '33.7%',
        frequency: 'High',
        solved: true,
        url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/'
      },
      {
        id: 3,
        title: 'Binary Tree Maximum Path Sum',
        platform: 'leetcode',
        difficulty: 'hard',
        topic: 'trees',
        description: 'A path in a binary tree is a sequence of nodes where each pair of adjacent nodes is connected by an edge.',
        acceptance: '37.8%',
        frequency: 'Medium',
        solved: false,
        url: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/'
      },
      {
        id: 4,
        title: 'Array Restoration',
        platform: 'codeforces',
        difficulty: 'medium',
        topic: 'arrays',
        description: 'Given a partially restored array, restore it completely using the given operations.',
        acceptance: '45.3%',
        frequency: 'Medium',
        solved: false,
        url: 'https://codeforces.com/problemset/problem/1490/B'
      },
      {
        id: 5,
        title: 'String Reduction',
        platform: 'hackerrank',
        difficulty: 'easy',
        topic: 'strings',
        description: 'Reduce a string by repeatedly applying reduction rules until no more reductions are possible.',
        acceptance: '68.9%',
        frequency: 'Low',
        solved: true,
        url: 'https://www.hackerrank.com/challenges/string-reduction/'
      },
      {
        id: 6,
        title: 'Valid Parentheses',
        platform: 'codewars',
        difficulty: 'easy',
        topic: 'algorithms',
        description: 'Write a function that takes a string of parentheses, and determines if the order of the parentheses is valid.',
        acceptance: '72.1%',
        frequency: 'High',
        solved: true,
        url: 'https://www.codewars.com/kata/52774a314c2333f0a7000688'
      }
    ];

    const contests = [
      {
        id: 1,
        name: 'LeetCode Weekly Contest 378',
        platform: 'leetcode',
        date: '2025-11-03',
        time: '14:30 UTC',
        duration: '90 minutes',
        participants: 12543,
        status: 'upcoming'
      },
      {
        id: 2,
        name: 'Codeforces Round #1890',
        platform: 'codeforces',
        date: '2025-11-05',
        time: '17:35 UTC',
        duration: '120 minutes',
        participants: 8932,
        status: 'upcoming'
      },
      {
        id: 3,
        name: 'HackerRank HourRank 33',
        platform: 'hackerrank',
        date: '2025-11-07',
        time: '15:00 UTC',
        duration: '60 minutes',
        participants: 3456,
        status: 'upcoming'
      }
    ];

    const getDifficultyColor = (difficulty) => {
      const colors = {
        easy: 'text-green-600 bg-green-100',
        medium: 'text-yellow-600 bg-yellow-100',
        hard: 'text-red-600 bg-red-100'
      };
      return colors[difficulty] || 'text-gray-600 bg-gray-100';
    };

    const getPlatformColor = (platform) => {
      const platformData = platforms.find(p => p.id === platform);
      return platformData?.color || '#8E8E93';
    };

    const filteredProblems = problems.filter(problem => {
      const matchesPlatform = activePlatform === 'all' || problem.platform === activePlatform;
      const matchesDifficulty = selectedDifficulty === 'all' || problem.difficulty === selectedDifficulty;
      const matchesTopic = selectedTopic === 'all' || problem.topic === selectedTopic;
      return matchesPlatform && matchesDifficulty && matchesTopic;
    });

    const startProblem = (problem) => {
      setCurrentProblem(problem);
      setShowProblem(true);
    };

    const stats = {
      totalSolved: problems.filter(p => p.solved).length,
      totalProblems: problems.length,
      currentStreak: 7,
      ranking: 12543
    };

    return (
      <div className="flex h-full" data-file="apps/PracticeArenaApp.js">
        <div className="w-64 border-r border-white/10 flex flex-col">
          <div className="p-4 border-b border-white/10">
            <h2 className="text-lg font-bold mb-3">Practice Arena</h2>
            
            <div className="glass-effect rounded-xl p-3 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-[var(--primary-color)]">{stats.totalSolved}</div>
                <div className="text-xs opacity-70">Problems Solved</div>
                <div className="text-sm mt-1">Rank #{stats.ranking}</div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold opacity-70">PLATFORM</label>
                <select
                  value={activePlatform}
                  onChange={(e) => setActivePlatform(e.target.value)}
                  className="w-full mt-1 px-3 py-2 bg-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                >
                  {platforms.map(platform => (
                    <option key={platform.id} value={platform.id}>
                      {platform.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold opacity-70">DIFFICULTY</label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full mt-1 px-3 py-2 bg-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                >
                  {difficulties.map(difficulty => (
                    <option key={difficulty.id} value={difficulty.id}>
                      {difficulty.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold opacity-70">TOPIC</label>
                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="w-full mt-1 px-3 py-2 bg-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                >
                  {topics.map(topic => (
                    <option key={topic.id} value={topic.id}>
                      {topic.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-4">
            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-2 opacity-70">UPCOMING CONTESTS</h3>
              <div className="space-y-2">
                {contests.slice(0, 2).map(contest => (
                  <div key={contest.id} className="glass-effect rounded-lg p-2">
                    <div className="text-xs font-medium">{contest.name}</div>
                    <div className="text-xs opacity-70">{contest.date} • {contest.time}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-2 opacity-70">STREAK</h3>
              <div className="glass-effect rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <div className="icon-zap text-yellow-500"></div>
                  <span className="text-lg font-bold">{stats.currentStreak} days</span>
                </div>
                <div className="text-xs opacity-70 mt-1">Keep it up!</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="border-b border-white/10">
            <div className="flex gap-1 p-2">
              {['problems', 'contests', 'submissions'].map(tab => (
                <button
                  key={tab}
                  className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                    'problems' === tab
                      ? 'bg-[var(--primary-color)] text-white'
                      : 'hover:bg-white/10'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-auto p-4">
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                Problems ({filteredProblems.length})
              </h3>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-white/10 rounded-lg hover:bg-white/20 text-sm">
                  <div className="icon-filter text-xs"></div>
                </button>
                <button className="px-3 py-1 bg-white/10 rounded-lg hover:bg-white/20 text-sm">
                  <div className="icon-sort-asc text-xs"></div>
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {filteredProblems.map(problem => (
                <div
                  key={problem.id}
                  className="glass-effect rounded-xl p-4 hover:bg-white/15 transition-colors cursor-pointer"
                  onClick={() => startProblem(problem)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: getPlatformColor(problem.platform) }}
                        ></div>
                        <h4 className="font-semibold">{problem.title}</h4>
                        {problem.solved && (
                          <div className="icon-check-circle text-green-500 text-sm"></div>
                        )}
                      </div>
                      <p className="text-sm opacity-80 line-clamp-2">{problem.description}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
                      {problem.difficulty}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs opacity-70">
                    <div className="flex gap-4">
                      <span>Acceptance: {problem.acceptance}</span>
                      <span>Frequency: {problem.frequency}</span>
                    </div>
                    <button className="px-3 py-1 bg-[var(--primary-color)] text-white rounded hover:opacity-90">
                      Solve
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {showProblem && currentProblem && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="glass-effect rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-auto">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">{currentProblem.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(currentProblem.difficulty)}`}>
                      {currentProblem.difficulty}
                    </span>
                    <span className="text-sm opacity-70">{currentProblem.topic}</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowProblem(false)}
                  className="p-2 hover:bg-white/10 rounded-lg"
                >
                  <div className="icon-x"></div>
                </button>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold mb-2">Problem Description</h4>
                <p className="text-sm opacity-80">{currentProblem.description}</p>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold mb-2">Statistics</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>Acceptance Rate: {currentProblem.acceptance}</div>
                  <div>Frequency: {currentProblem.frequency}</div>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:opacity-90">
                  Start Solving
                </button>
                <button 
                  onClick={() => window.open(currentProblem.url, '_blank')}
                  className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20"
                >
                  Open in {platforms.find(p => p.id === currentProblem.platform)?.name}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('PracticeArenaApp error:', error);
    return null;
  }
}