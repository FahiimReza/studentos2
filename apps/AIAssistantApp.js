function AIAssistantApp() {
  try {
    const [messages, setMessages] = React.useState([
      {
        id: 1,
        type: 'assistant',
        content: 'Hello! I\'m your AI learning assistant. I can help you with:\n\n• Programming concepts and debugging\n• Math problems and explanations\n• Study strategies and time management\n• Research and writing assistance\n• Career guidance in computer science\n\nHow can I help you today?',
        timestamp: new Date()
      }
    ]);
    const [input, setInput] = React.useState('');
    const [isTyping, setIsTyping] = React.useState(false);
    const [selectedCategory, setSelectedCategory] = React.useState('general');

    const categories = [
      { id: 'general', name: 'General', icon: '💬' },
      { id: 'programming', name: 'Programming', icon: '💻' },
      { id: 'math', name: 'Mathematics', icon: '🧮' },
      { id: 'research', name: 'Research', icon: '🔬' },
      { id: 'career', name: 'Career', icon: '🎯' }
    ];

    const quickQuestions = {
      programming: [
        'Explain Big O notation',
        'Help debug my code',
        'Compare sorting algorithms',
        'Explain recursion'
      ],
      math: [
        'Solve calculus problem',
        'Explain linear algebra',
        'Help with statistics',
        'Graph theory basics'
      ],
      research: [
        'Find research papers',
        'Citation format help',
        'Research methodology',
        'Literature review'
      ],
      career: [
        'Internship opportunities',
        'Resume review',
        'Interview preparation',
        'Career paths in CS'
      ],
      general: [
        'Study tips',
        'Time management',
        'Note-taking strategies',
        'Exam preparation'
      ]
    };

    const generateResponse = (userMessage) => {
      const responses = {
        programming: {
          'big o': 'Big O notation describes the performance or complexity of an algorithm. It shows how the runtime or space requirements grow as the input size increases. Common complexities include:\n\n• O(1) - Constant time\n• O(log n) - Logarithmic time\n• O(n) - Linear time\n• O(n log n) - Linearithmic time\n• O(n²) - Quadratic time\n\nFor example, a linear search has O(n) complexity because in the worst case, you might need to check every element.',
          'debug': 'To debug your code effectively:\n\n1. Read error messages carefully\n2. Use console.log() or debugger statements\n3. Check variable values at different points\n4. Break down complex problems\n5. Test with simple inputs first\n6. Use rubber duck debugging (explain your code line by line)\n\nCould you share the specific code you\'re having trouble with?',
          'sorting': 'Common sorting algorithms:\n\n• Bubble Sort: O(n²) - Simple but inefficient\n• Selection Sort: O(n²) - Finds minimum and swaps\n• Insertion Sort: O(n²) - Good for small/nearly sorted data\n• Merge Sort: O(n log n) - Divide and conquer\n• Quick Sort: O(n log n) average, O(n²) worst\n• Heap Sort: O(n log n) - Uses heap data structure\n\nFor most practical applications, Merge Sort or Quick Sort are preferred.',
          'recursion': 'Recursion is when a function calls itself to solve smaller instances of the same problem. Key components:\n\n1. Base case: When to stop recursing\n2. Recursive case: How to break down the problem\n\nExample: Factorial\n```python\ndef factorial(n):\n    if n <= 1:  # Base case\n        return 1\n    return n * factorial(n - 1)  # Recursive case\n```\n\nPros: Elegant for divide-and-conquer problems\nCons: Can cause stack overflow, may be less efficient'
        },
        math: {
          'calculus': 'Calculus fundamentals:\n\nDerivatives measure rate of change:\n• d/dx(x²) = 2x\n• d/dx(sin x) = cos x\n• d/dx(eˣ) = eˣ\n\nIntegrals find area under curves:\n• ∫x² dx = x³/3 + C\n• ∫sin x dx = -cos x + C\n• ∫eˣ dx = eˣ + C\n\nKey concepts: limits, continuity, optimization problems\nWhat specific calculus topic would you like to explore?',
          'linear algebra': 'Linear algebra essentials:\n\nVectors: Arrays of numbers representing direction/magnitude\nMatrices: Rectangular arrays for linear transformations\n\nKey operations:\n• Matrix multiplication\n• Determinants\n• Eigenvalues/eigenvectors\n• Vector spaces\n\nApplications: Computer graphics, machine learning, data analysis\nNeed help with a specific concept?',
          'statistics': 'Statistics fundamentals:\n\nDescriptive Statistics:\n• Mean: Average value\n• Median: Middle value\n• Mode: Most frequent value\n• Standard deviation: Measure of spread\n\nInferential Statistics:\n• Hypothesis testing\n• Confidence intervals\n• p-values\n• Correlation vs causation\n\nWhat statistical concept would you like to understand better?',
          'graph theory': 'Graph theory basics:\n\nGraph components:\n• Vertices (nodes): Points in the graph\n• Edges: Connections between vertices\n• Degree: Number of edges connected to a vertex\n\nTypes:\n• Directed vs undirected\n• Weighted vs unweighted\n• Cyclic vs acyclic\n\nApplications: Social networks, routing algorithms, dependency resolution\nInterested in a specific algorithm?'
        },
        general: {
          'study': 'Effective study techniques:\n\n1. Active Recall: Test yourself instead of re-reading\n2. Spaced Repetition: Review at increasing intervals\n3. Pomodoro Technique: 25min focus, 5min break\n4. Feynman Technique: Explain concepts in simple terms\n5. Interleaving: Mix different subjects in one session\n\nCreate a study schedule and stick to it. Review notes within 24 hours of class for best retention.',
          'time': 'Time management strategies:\n\n1. Prioritize tasks using Eisenhower Matrix (urgent/important)\n2. Use time-blocking for dedicated focus\n3. Break large tasks into smaller chunks\n4. Set realistic daily goals\n5. Include buffer time between tasks\n6. Review and adjust weekly\n\nTools: Digital calendars, todo apps, or simple pen and paper\nWhat\'s your biggest time management challenge?',
          'notes': 'Effective note-taking methods:\n\nCornell Method:\n• Main notes on right\n• Cues/questions on left\n• Summary at bottom\n\nMind Mapping:\n• Central topic in middle\n• Branch out with related concepts\n• Use colors and images\n\nOutline Method:\n• Hierarchical structure\n• Main points and sub-points\n• Easy to review and organize\n\nTry different methods to find what works for your learning style.',
          'exam': 'Exam preparation strategies:\n\n1. Start early (2-3 weeks before)\n2. Create a study schedule\n3. Practice with past exams\n4. Form study groups\n5. Teach concepts to others\n6. Get good sleep before exam\n7. Arrive early and stay calm\n\nDuring exam:\n• Read all questions first\n• Budget your time\n• Answer easy questions first\n• Review if time permits\n\nWhat subject are you preparing for?'
        }
      };

      const lowerMessage = userMessage.toLowerCase();
      
      // Check for programming keywords
      for (const [key, response] of Object.entries(responses.programming)) {
        if (lowerMessage.includes(key)) {
          return response;
        }
      }
      
      // Check for math keywords
      for (const [key, response] of Object.entries(responses.math)) {
        if (lowerMessage.includes(key)) {
          return response;
        }
      }
      
      // Check for general keywords
      for (const [key, response] of Object.entries(responses.general)) {
        if (lowerMessage.includes(key)) {
          return response;
        }
      }
      
      // Default response based on category
      const categoryResponses = {
        programming: 'I can help you with programming concepts, debugging, algorithms, and best practices. What specific programming topic are you working on?',
        math: 'I\'m here to help with mathematics! Whether it\'s calculus, algebra, statistics, or discrete math, I can provide explanations and examples. What math problem are you facing?',
        research: 'For research assistance, I can help you find papers, format citations, develop methodology, and structure literature reviews. What research area are you exploring?',
        career: 'I can provide guidance on CS career paths, internship opportunities, interview preparation, and resume building. What career questions do you have?',
        general: 'I\'m here to help with your academic journey! I can assist with study strategies, time management, exam preparation, and general learning advice. How can I support you?'
      };
      
      return categoryResponses[selectedCategory] || 'I\'m here to help! Could you provide more details about what you\'d like assistance with?';
    };

    const sendMessage = () => {
      if (!input.trim()) return;
      
      const userMessage = {
        id: Date.now(),
        type: 'user',
        content: input,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);
      setInput('');
      setIsTyping(true);
      
      setTimeout(() => {
        const assistantResponse = {
          id: Date.now() + 1,
          type: 'assistant',
          content: generateResponse(input),
          timestamp: new Date()
        };
        setMessages(prev => [...prev, assistantResponse]);
        setIsTyping(false);
      }, 1000 + Math.random() * 1000);
    };

    const handleQuickQuestion = (question) => {
      setInput(question);
    };

    return (
      <div className="flex h-full" data-file="apps/AIAssistantApp.js">
        <div className="w-64 border-r border-white/10 flex flex-col">
          <div className="p-4 border-b border-white/10">
            <h2 className="text-lg font-bold mb-3">Categories</h2>
            <div className="space-y-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full p-3 rounded-lg flex items-center gap-3 transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-[var(--primary-color)] text-white'
                      : 'hover:bg-white/10'
                  }`}
                >
                  <span className="text-xl">{category.icon}</span>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex-1 p-4">
            <h3 className="text-sm font-semibold mb-3 opacity-70">Quick Questions</h3>
            <div className="space-y-2">
              {quickQuestions[selectedCategory]?.map((question, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickQuestion(question)}
                  className="w-full text-left p-2 text-xs bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-auto p-4 space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] p-4 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-[var(--primary-color)] text-white'
                      : 'glass-effect'
                  }`}
                >
                  <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                  <div className={`text-xs mt-2 opacity-70 ${
                    message.type === 'user' ? 'text-white/70' : ''
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="glass-effect p-4 rounded-2xl">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-white/10 p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask me anything about your studies..."
                className="flex-1 px-4 py-3 bg-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isTyping}
                className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                  input.trim() && !isTyping
                    ? 'bg-[var(--primary-color)] text-white hover:opacity-90'
                    : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                }`}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('AIAssistantApp error:', error);
    return null;
  }
}