function FileHubApp() {
  try {
    const [activeView, setActiveView] = React.useState('files');
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [currentPath, setCurrentPath] = React.useState('/');

    const files = [
      {
        id: 1,
        name: 'CS301_Lecture_Notes.pdf',
        type: 'pdf',
        size: '2.4 MB',
        modified: '2025-10-30',
        course: 'CS301 - Data Structures',
        tags: ['lecture', 'notes', 'important']
      },
      {
        id: 2,
        name: 'Algorithm_Analysis.docx',
        type: 'doc',
        size: '856 KB',
        modified: '2025-10-29',
        course: 'CS301 - Data Structures',
        tags: ['assignment', 'draft']
      },
      {
        id: 3,
        name: 'Database_Design_Project.zip',
        type: 'archive',
        size: '15.2 MB',
        modified: '2025-10-28',
        course: 'CS302 - Database Systems',
        tags: ['project', 'submission']
      },
      {
        id: 4,
        name: 'WebDev_Portfolio.html',
        type: 'code',
        size: '124 KB',
        modified: '2025-10-27',
        course: 'CS303 - Web Technologies',
        tags: ['project', 'web']
      },
      {
        id: 5,
        name: 'Machine_Learning_Notes.pdf',
        type: 'pdf',
        size: '5.1 MB',
        modified: '2025-10-26',
        course: 'CS401 - Machine Learning',
        tags: ['notes', 'ml']
      },
      {
        id: 6,
        name: 'Study_Schedule.xlsx',
        type: 'spreadsheet',
        size: '45 KB',
        modified: '2025-10-25',
        course: 'General',
        tags: ['planning', 'schedule']
      }
    ];

    const folders = [
      { id: 1, name: 'CS301 - Data Structures', itemCount: 12 },
      { id: 2, name: 'CS302 - Database Systems', itemCount: 8 },
      { id: 3, name: 'CS303 - Web Technologies', itemCount: 15 },
      { id: 4, name: 'CS401 - Machine Learning', itemCount: 6 },
      { id: 5, name: 'Assignments', itemCount: 24 },
      { id: 6, name: 'Projects', itemCount: 9 }
    ];

    const getFileIcon = (type) => {
      const icons = {
        pdf: '📄',
        doc: '📝',
        code: '💻',
        spreadsheet: '📊',
        archive: '📦',
        image: '🖼️',
        video: '🎥',
        audio: '🎵'
      };
      return icons[type] || '📄';
    };

    const formatFileSize = (size) => {
      return size;
    };

    const filteredFiles = files.filter(file =>
      file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const viewTabs = [
      { id: 'files', name: 'Files', icon: '📁' },
      { id: 'recent', name: 'Recent', icon: '🕐' },
      { id: 'shared', name: 'Shared', icon: '👥' },
      { id: 'starred', name: 'Starred', icon: '⭐' }
    ];

    return (
      <div className="flex h-full" data-file="apps/FileHubApp.js">
        <div className="w-64 border-r border-white/10 flex flex-col">
          <div className="p-4 border-b border-white/10">
            <h2 className="text-lg font-bold mb-3">File Hub</h2>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search files..."
                className="w-full px-3 py-2 pl-9 bg-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
              />
              <div className="absolute left-3 top-2.5 icon-search text-sm opacity-50"></div>
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            <div className="p-4">
              <div className="mb-4">
                <div className="text-xs font-semibold text-opacity-70 mb-2">QUICK ACCESS</div>
                <div className="space-y-1">
                  {folders.map(folder => (
                    <button
                      key={folder.id}
                      onClick={() => setCurrentPath(folder.name)}
                      className="w-full p-2 rounded-lg hover:bg-white/10 flex items-center gap-2 text-sm"
                    >
                      <div className="icon-folder text-yellow-500"></div>
                      <span>{folder.name}</span>
                      <span className="ml-auto text-xs opacity-50">{folder.itemCount}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold text-opacity-70 mb-2">STORAGE</div>
                <div className="glass-effect rounded-lg p-3">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Used</span>
                    <span>2.8 GB / 5 GB</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="w-[56%] bg-[var(--primary-color)] h-2 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-white/10">
            <button className="w-full px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:opacity-90 flex items-center justify-center gap-2">
              <div className="icon-upload text-sm"></div>
              Upload Files
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="border-b border-white/10">
            <div className="flex gap-1 p-2">
              {viewTabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveView(tab.id)}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                    activeView === tab.id
                      ? 'bg-[var(--primary-color)] text-white'
                      : 'hover:bg-white/10'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>
            
            <div className="px-4 pb-2 flex items-center gap-2 text-sm opacity-70">
              <div className="icon-home text-xs"></div>
              <span>/</span>
              <span>{currentPath}</span>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-4">
            {activeView === 'files' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Files</h3>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-sm bg-white/10 rounded-lg hover:bg-white/20">
                      <div className="icon-grid text-xs"></div>
                    </button>
                    <button className="px-3 py-1 text-sm bg-white/10 rounded-lg hover:bg-white/20">
                      <div className="icon-list text-xs"></div>
                    </button>
                  </div>
                </div>

                <div className="grid gap-2">
                  {filteredFiles.map(file => (
                    <div
                      key={file.id}
                      onClick={() => setSelectedFile(file)}
                      className={`p-4 rounded-xl cursor-pointer transition-all ${
                        selectedFile?.id === file.id
                          ? 'bg-white/20 ring-1 ring-white/30'
                          : 'glass-effect hover:bg-white/15'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-3xl">{getFileIcon(file.type)}</div>
                        <div className="flex-1">
                          <div className="font-medium">{file.name}</div>
                          <div className="text-sm opacity-70">{file.course}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm">{formatFileSize(file.size)}</div>
                          <div className="text-xs opacity-50">{file.modified}</div>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-2">
                        {file.tags.map((tag, idx) => (
                          <span key={idx} className="px-2 py-1 bg-white/10 rounded-full text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeView === 'recent' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Recent Files</h3>
                {files.slice(0, 3).map(file => (
                  <div key={file.id} className="glass-effect rounded-xl p-4 flex items-center gap-4">
                    <div className="text-2xl">{getFileIcon(file.type)}</div>
                    <div className="flex-1">
                      <div className="font-medium">{file.name}</div>
                      <div className="text-sm opacity-70">Modified {file.modified}</div>
                    </div>
                    <button className="px-3 py-1 bg-white/10 rounded-lg hover:bg-white/20 text-sm">
                      Open
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeView === 'shared' && (
              <div className="flex items-center justify-center h-64 opacity-50">
                <div className="text-center">
                  <div className="icon-users text-6xl mb-4"></div>
                  <p>No shared files yet</p>
                  <p className="text-sm mt-2">Share files with your study group</p>
                </div>
              </div>
            )}

            {activeView === 'starred' && (
              <div className="flex items-center justify-center h-64 opacity-50">
                <div className="text-center">
                  <div className="icon-star text-6xl mb-4"></div>
                  <p>No starred files</p>
                  <p className="text-sm mt-2">Star important files for quick access</p>
                </div>
              </div>
            )}
          </div>

          {selectedFile && (
            <div className="border-t border-white/10 p-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold">{selectedFile.name}</div>
                  <div className="text-sm opacity-70">{formatFileSize(selectedFile.size)}</div>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-white/10 rounded-lg hover:bg-white/20 text-sm">
                    <div className="icon-download text-xs"></div>
                  </button>
                  <button className="px-3 py-1 bg-white/10 rounded-lg hover:bg-white/20 text-sm">
                    <div className="icon-share text-xs"></div>
                  </button>
                  <button className="px-3 py-1 bg-white/10 rounded-lg hover:bg-white/20 text-sm">
                    <div className="icon-star text-xs"></div>
                  </button>
                  <button className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 text-sm">
                    <div className="icon-trash text-xs"></div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('FileHubApp error:', error);
    return null;
  }
}