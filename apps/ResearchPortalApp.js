function ResearchPortalApp() {
  try {
    const [activeTab, setActiveTab] = React.useState('search');
    const [searchQuery, setSearchQuery] = React.useState('');
    const [selectedDatabase, setSelectedDatabase] = React.useState('all');
    const [savedPapers, setSavedPapers] = React.useState([]);

    const databases = [
      { id: 'all', name: 'All Databases', icon: '🌐' },
      { id: 'ieee', name: 'IEEE Xplore', icon: '📚' },
      { id: 'acm', name: 'ACM Digital Library', icon: '💻' },
      { id: 'arxiv', name: 'arXiv', icon: '📄' },
      { id: 'pubmed', name: 'PubMed', icon: '🧬' },
      { id: 'google-scholar', name: 'Google Scholar', icon: '🔍' }
    ];

    const papers = [
      {
        id: 1,
        title: 'Deep Learning for Computer Vision: A Comprehensive Survey',
        authors: ['Zhang, L.', 'Wang, Y.', 'Chen, X.'],
        journal: 'IEEE Transactions on Pattern Analysis',
        year: 2024,
        doi: '10.1109/TPAMI.2024.1234567',
        abstract: 'This paper presents a comprehensive survey of deep learning techniques in computer vision, covering recent advances and future directions...',
        citations: 156,
        database: 'ieee',
        tags: ['deep learning', 'computer vision', 'survey'],
        pdf: true
      },
      {
        id: 2,
        title: 'Efficient Algorithms for Large-Scale Graph Processing',
        authors: ['Johnson, M.', 'Smith, K.', 'Brown, A.'],
        journal: 'ACM Computing Surveys',
        year: 2024,
        doi: '10.1145/1234567.8901234',
        abstract: 'We present novel algorithms for processing large-scale graphs efficiently, with applications in social network analysis and recommendation systems...',
        citations: 89,
        database: 'acm',
        tags: ['algorithms', 'graph processing', 'scalability'],
        pdf: true
      },
      {
        id: 3,
        title: 'Quantum Computing: Principles and Applications',
        authors: ['Davis, R.', 'Wilson, S.', 'Taylor, J.'],
        journal: 'Nature Quantum Information',
        year: 2023,
        doi: '10.1038/s41534-023-00001-x',
        abstract: 'An introduction to quantum computing principles, including quantum gates, algorithms, and potential applications in cryptography and optimization...',
        citations: 234,
        database: 'arxiv',
        tags: ['quantum computing', 'algorithms', 'cryptography'],
        pdf: false
      },
      {
        id: 4,
        title: 'Machine Learning in Healthcare: Recent Advances',
        authors: ['Anderson, L.', 'Martin, P.', 'Thompson, E.'],
        journal: 'Journal of Medical AI',
        year: 2024,
        doi: '10.1016/j.jmai.2024.01.002',
        abstract: 'This review examines recent advances in machine learning applications in healthcare, including disease diagnosis, drug discovery, and personalized medicine...',
        citations: 67,
        database: 'pubmed',
        tags: ['machine learning', 'healthcare', 'medical AI'],
        pdf: true
      }
    ];

    const researchTopics = [
      'Artificial Intelligence',
      'Machine Learning',
      'Computer Vision',
      'Natural Language Processing',
      'Quantum Computing',
      'Cybersecurity',
      'Blockchain',
      'Internet of Things',
      'Cloud Computing',
      'Data Science'
    ];

    const filteredPapers = papers.filter(paper => {
      const matchesSearch = !searchQuery || 
        paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.authors.some(author => author.toLowerCase().includes(searchQuery.toLowerCase())) ||
        paper.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesDatabase = selectedDatabase === 'all' || paper.database === selectedDatabase;
      
      return matchesSearch && matchesDatabase;
    });

    const savePaper = (paperId) => {
      const paper = papers.find(p => p.id === paperId);
      if (paper && !savedPapers.find(p => p.id === paperId)) {
        setSavedPapers(prev => [...prev, paper]);
      }
    };

    const removeSavedPaper = (paperId) => {
      setSavedPapers(prev => prev.filter(p => p.id !== paperId));
    };

    const isSaved = (paperId) => {
      return savedPapers.some(p => p.id === paperId);
    };

    return (
      <div className="flex h-full" data-file="apps/ResearchPortalApp.js">
        <div className="w-64 border-r border-white/10 flex flex-col">
          <div className="p-4 border-b border-white/10">
            <h2 className="text-lg font-bold mb-3">Research Portal</h2>
            <div className="space-y-2">
              {databases.map(db => (
                <button
                  key={db.id}
                  onClick={() => setSelectedDatabase(db.id)}
                  className={`w-full p-3 rounded-lg flex items-center gap-3 transition-colors ${
                    selectedDatabase === db.id
                      ? 'bg-[var(--primary-color)] text-white'
                      : 'hover:bg-white/10'
                  }`}
                >
                  <span>{db.icon}</span>
                  <span className="text-sm">{db.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-auto p-4">
            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-2 opacity-70">RESEARCH TOPICS</h3>
              <div className="flex flex-wrap gap-2">
                {researchTopics.slice(0, 6).map(topic => (
                  <button
                    key={topic}
                    onClick={() => setSearchQuery(topic)}
                    className="px-2 py-1 bg-white/10 rounded-full text-xs hover:bg-white/20"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-2 opacity-70">QUICK STATS</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total Papers</span>
                  <span>{papers.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Saved</span>
                  <span>{savedPapers.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>With PDF</span>
                  <span>{papers.filter(p => p.pdf).length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="border-b border-white/10">
            <div className="flex gap-1 p-2">
              {['search', 'saved', 'citations'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                    activeTab === tab
                      ? 'bg-[var(--primary-color)] text-white'
                      : 'hover:bg-white/10'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="p-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search papers, authors, or keywords..."
                  className="w-full px-4 py-3 pl-10 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                />
                <div className="absolute left-3 top-3.5 icon-search opacity-50"></div>
                <button className="absolute right-3 top-2.5 px-3 py-1 bg-[var(--primary-color)] text-white rounded text-sm hover:opacity-90">
                  Search
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-4">
            {activeTab === 'search' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">
                    Search Results ({filteredPapers.length})
                  </h3>
                  <select className="px-3 py-1 bg-white/10 rounded-lg text-sm focus:outline-none">
                    <option>Relevance</option>
                    <option>Date (Newest)</option>
                    <option>Citations</option>
                    <option>Title (A-Z)</option>
                  </select>
                </div>

                {filteredPapers.map(paper => (
                  <div key={paper.id} className="glass-effect rounded-xl p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-lg flex-1">{paper.title}</h4>
                      <button
                        onClick={() => isSaved(paper.id) ? removeSavedPaper(paper.id) : savePaper(paper.id)}
                        className={`ml-4 p-2 rounded-lg transition-colors ${
                          isSaved(paper.id)
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'hover:bg-white/10'
                        }`}
                      >
                        <div className={`icon-${isSaved(paper.id) ? 'star' : 'bookmark'}`}></div>
                      </button>
                    </div>

                    <div className="text-sm opacity-70 mb-2">
                      {paper.authors.join(', ')} • {paper.journal} • {paper.year}
                    </div>

                    <p className="text-sm opacity-80 mb-3 line-clamp-3">
                      {paper.abstract}
                    </p>

                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        {paper.tags.map((tag, idx) => (
                          <span key={idx} className="px-2 py-1 bg-white/10 rounded-full text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 text-sm opacity-70">
                        <span className="flex items-center gap-1">
                          <div className="icon-quote text-xs"></div>
                          {paper.citations} citations
                        </span>
                        {paper.pdf && (
                          <button className="px-3 py-1 bg-[var(--primary-color)] text-white rounded text-sm hover:opacity-90">
                            PDF
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="text-xs opacity-50 mt-2">
                      DOI: {paper.doi}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'saved' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Saved Papers ({savedPapers.length})</h3>
                {savedPapers.length > 0 ? (
                  savedPapers.map(paper => (
                    <div key={paper.id} className="glass-effect rounded-xl p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{paper.title}</h4>
                        <button
                          onClick={() => removeSavedPaper(paper.id)}
                          className="p-2 rounded-lg hover:bg-white/10"
                        >
                          <div className="icon-x text-sm"></div>
                        </button>
                      </div>
                      <div className="text-sm opacity-70">
                        {paper.authors.join(', ')} • {paper.journal} • {paper.year}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 opacity-50">
                    <div className="icon-bookmark text-6xl mb-4"></div>
                    <p>No saved papers yet</p>
                    <p className="text-sm mt-2">Save papers for quick access later</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'citations' && (
              <div className="flex items-center justify-center h-64 opacity-50">
                <div className="text-center">
                  <div className="icon-quote text-6xl mb-4"></div>
                  <p>Citation manager coming soon</p>
                  <p className="text-sm mt-2">Generate and manage citations in various formats</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('ResearchPortalApp error:', error);
    return null;
  }
}