function UtilitiesApp() {
  try {
    const [activeCategory, setActiveCategory] = React.useState('development');

    const categories = [
      { id: 'development', name: 'Development', icon: '💻' },
      { id: 'system', name: 'System', icon: '⚙️' },
      { id: 'productivity', name: 'Productivity', icon: '📈' },
      { id: 'tools', name: 'Tools', icon: '🔧' }
    ];

    const utilities = {
      development: [
        {
          id: 'vscode',
          name: 'Visual Studio Code',
          description: 'Lightweight code editor with extensive extensions',
          icon: '📝',
          action: 'Launch VS Code',
          shortcut: 'Ctrl+Shift+V',
          installed: true
        },
        {
          id: 'git',
          name: 'Git Bash',
          description: 'Version control system terminal',
          icon: '🔀',
          action: 'Open Git Bash',
          shortcut: 'Ctrl+Shift+G',
          installed: true
        },
        {
          id: 'docker',
          name: 'Docker Desktop',
          description: 'Container platform for application deployment',
          icon: '🐳',
          action: 'Launch Docker',
          shortcut: 'Ctrl+Shift+D',
          installed: true
        },
        {
          id: 'postman',
          name: 'Postman',
          description: 'API development and testing tool',
          icon: '📮',
          action: 'Open Postman',
          shortcut: 'Ctrl+Shift+P',
          installed: false
        },
        {
          id: 'nodejs',
          name: 'Node.js Terminal',
          description: 'JavaScript runtime environment',
          icon: '🟢',
          action: 'Open Node.js REPL',
          shortcut: 'Ctrl+Shift+N',
          installed: true
        },
        {
          id: 'python',
          name: 'Python IDLE',
          description: 'Python integrated development environment',
          icon: '🐍',
          action: 'Launch Python',
          shortcut: 'Ctrl+Shift+Y',
          installed: true
        }
      ],
      system: [
        {
          id: 'terminal',
          name: 'Terminal',
          description: 'Command line interface',
          icon: '💻',
          action: 'Open Terminal',
          shortcut: 'Ctrl+Alt+T',
          installed: true
        },
        {
          id: 'task-manager',
          name: 'Task Manager',
          description: 'Monitor and manage system processes',
          icon: '📊',
          action: 'Open Task Manager',
          shortcut: 'Ctrl+Shift+Esc',
          installed: true
        },
        {
          id: 'file-explorer',
          name: 'File Explorer',
          description: 'Browse and manage files',
          icon: '📁',
          action: 'Open File Explorer',
          shortcut: 'Win+E',
          installed: true
        },
        {
          id: 'registry',
          name: 'Registry Editor',
          description: 'Windows registry editor',
          icon: '📋',
          action: 'Open Registry',
          shortcut: 'Win+R → regedit',
          installed: true
        },
        {
          id: 'services',
          name: 'Services',
          description: 'Manage system services',
          icon: '⚙️',
          action: 'Open Services',
          shortcut: 'Win+R → services.msc',
          installed: true
        }
      ],
      productivity: [
        {
          id: 'notepad',
          name: 'Notepad',
          description: 'Simple text editor',
          icon: '📄',
          action: 'Open Notepad',
          shortcut: 'Win+R → notepad',
          installed: true
        },
        {
          id: 'calculator',
          name: 'Calculator',
          description: 'Mathematical calculations',
          icon: '🧮',
          action: 'Open Calculator',
          shortcut: 'Win+R → calc',
          installed: true
        },
        {
          id: 'snipping-tool',
          name: 'Snipping Tool',
          description: 'Capture screen screenshots',
          icon: '📸',
          action: 'Open Snipping Tool',
          shortcut: 'Win+Shift+S',
          installed: true
        },
        {
          id: 'sticky-notes',
          name: 'Sticky Notes',
          description: 'Quick note-taking',
          icon: '📝',
          action: 'Open Sticky Notes',
          shortcut: 'Win+R → stikynot',
          installed: true
        },
        {
          id: 'alarm',
          name: 'Alarms & Clock',
          description: 'Set alarms and timers',
          icon: '⏰',
          action: 'Open Clock',
          shortcut: 'Win+R → timedate.cpl',
          installed: true
        }
      ],
      tools: [
        {
          id: 'compiler',
          name: 'C++ Compiler',
          description: 'Compile and run C++ programs',
          icon: '🔷',
          action: 'Open Compiler',
          shortcut: 'Ctrl+Shift+C',
          installed: true
        },
        {
          id: 'java-compiler',
          name: 'Java Compiler',
          description: 'Compile and run Java programs',
          icon: '☕',
          action: 'Open Java Compiler',
          shortcut: 'Ctrl+Shift+J',
          installed: true
        },
        {
          id: 'sql-client',
          name: 'SQL Client',
          description: 'Database management tool',
          icon: '🗃️',
          action: 'Open SQL Client',
          shortcut: 'Ctrl+Shift+S',
          installed: false
        },
        {
          id: 'hex-editor',
          name: 'Hex Editor',
          description: 'Binary file editor',
          icon: '🔢',
          action: 'Open Hex Editor',
          shortcut: 'Ctrl+Shift+H',
          installed: false
        },
        {
          id: 'network-monitor',
          name: 'Network Monitor',
          description: 'Monitor network traffic',
          icon: '🌐',
          action: 'Open Network Monitor',
          shortcut: 'Ctrl+Shift+M',
          installed: true
        }
      ]
    };

    const launchUtility = (utility) => {
      // Simulate launching utility
      if (typeof soundManager !== 'undefined') {
        soundManager.play('open');
      }
      
      // In a real implementation, this would actually launch the application
      console.log(`Launching ${utility.name}...`);
      
      // Show a notification or feedback
      alert(`Launching ${utility.name}...`);
    };

    const installUtility = (utility) => {
      // Simulate installation
      if (typeof soundManager !== 'undefined') {
        soundManager.play('success');
      }
      alert(`Installing ${utility.name}...`);
    };

    const currentUtilities = utilities[activeCategory] || [];

    return (
      <div className="flex h-full" data-file="apps/UtilitiesApp.js">
        <div className="w-64 border-r border-white/10 flex flex-col">
          <div className="p-4 border-b border-white/10">
            <h2 className="text-lg font-bold mb-3">Utilities</h2>
            <div className="space-y-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full p-3 rounded-lg flex items-center gap-3 transition-colors ${
                    activeCategory === category.id
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
            <div className="glass-effect rounded-xl p-4">
              <h3 className="font-semibold mb-3">Quick Stats</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total Utilities</span>
                  <span>{currentUtilities.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Installed</span>
                  <span>{currentUtilities.filter(u => u.installed).length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Available</span>
                  <span>{currentUtilities.filter(u => !u.installed).length}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 glass-effect rounded-xl p-4">
              <h3 className="font-semibold mb-3">Shortcuts</h3>
              <div className="text-xs opacity-70">
                <p>• Click utility to launch</p>
                <p>• Use keyboard shortcuts</p>
                <p>• Right-click for options</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-auto">
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-2">
              {categories.find(c => c.id === activeCategory)?.name} Utilities
            </h3>
            <p className="opacity-70">
              Quick access to essential development and system tools
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {currentUtilities.map(utility => (
              <div
                key={utility.id}
                className="glass-effect rounded-xl p-4 hover:bg-white/15 transition-all cursor-pointer"
                onClick={() => utility.installed ? launchUtility(utility) : installUtility(utility)}
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{utility.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{utility.name}</h4>
                      {utility.installed ? (
                        <div className="icon-check-circle text-green-500 text-sm"></div>
                      ) : (
                        <div className="icon-download text-blue-500 text-sm"></div>
                      )}
                    </div>
                    <p className="text-sm opacity-70 mb-3">{utility.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-xs opacity-50">
                        <div className="icon-keyboard text-xs"></div>
                        {utility.shortcut}
                      </div>
                      <button
                        className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                          utility.installed
                            ? 'bg-[var(--primary-color)] text-white hover:opacity-90'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                        }`}
                      >
                        {utility.installed ? 'Launch' : 'Install'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 glass-effect rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4">System Information</h3>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium mb-2">Hardware</h4>
                <div className="space-y-1 text-sm opacity-70">
                  <div>CPU: Intel Core i7-12700K</div>
                  <div>RAM: 16 GB DDR4</div>
                  <div>Storage: 512 GB SSD</div>
                  <div>GPU: NVIDIA RTX 3070</div>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Software</h4>
                <div className="space-y-1 text-sm opacity-70">
                  <div>OS: Windows 11 Pro</div>
                  <div>Node.js: v18.17.0</div>
                  <div>Python: 3.11.4</div>
                  <div>Git: 2.41.0</div>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Performance</h4>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>CPU Usage</span>
                      <span>24%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div className="w-[24%] bg-green-500 h-2 rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Memory</span>
                      <span>8.2 GB / 16 GB</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div className="w-[51%] bg-yellow-500 h-2 rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Storage</span>
                      <span>324 GB / 512 GB</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div className="w-[63%] bg-blue-500 h-2 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('UtilitiesApp error:', error);
    return null;
  }
}