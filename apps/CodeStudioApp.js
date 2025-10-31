function CodeStudioApp() {
  try {
    const [activeTab, setActiveTab] = React.useState('cpp');
    const [code, setCode] = React.useState({
      cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
      python: `print("Hello, World!")`,
      java: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
      javascript: `console.log("Hello, World!");`
    });
    const [output, setOutput] = React.useState('');
    const [isRunning, setIsRunning] = React.useState(false);

    const languages = [
      { id: 'cpp', name: 'C++', icon: '🔷' },
      { id: 'python', name: 'Python', icon: '🐍' },
      { id: 'java', name: 'Java', icon: '☕' },
      { id: 'javascript', name: 'JavaScript', icon: '🟨' }
    ];

    const runCode = () => {
      setIsRunning(true);
      setOutput('Running code...');
      
      // Simulate code execution
      setTimeout(() => {
        const outputs = {
          cpp: 'Hello, World!\nProgram finished with exit code 0',
          python: 'Hello, World!',
          java: 'Hello, World!',
          javascript: 'Hello, World!'
        };
        setOutput(outputs[activeTab] || 'Code executed successfully');
        setIsRunning(false);
      }, 1500);
    };

    const clearCode = () => {
      setCode(prev => ({ ...prev, [activeTab]: '' }));
      setOutput('');
    };

    return (
      <div className="flex flex-col h-full" data-file="apps/CodeStudioApp.js">
        <div className="border-b border-white/10">
          <div className="flex gap-1 p-2">
            {languages.map(lang => (
              <button
                key={lang.id}
                onClick={() => setActiveTab(lang.id)}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                  activeTab === lang.id 
                    ? 'bg-[var(--primary-color)] text-white' 
                    : 'hover:bg-white/10'
                }`}
              >
                <span>{lang.icon}</span>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 flex">
          <div className="flex-1 flex flex-col">
            <div className="flex justify-between items-center p-3 border-b border-white/10">
              <h3 className="font-semibold">Code Editor</h3>
              <div className="flex gap-2">
                <button
                  onClick={clearCode}
                  className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Clear
                </button>
                <button
                  onClick={runCode}
                  disabled={isRunning}
                  className={`px-4 py-1 text-sm rounded flex items-center gap-2 ${
                    isRunning 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  <div className={`icon-play text-sm ${isRunning ? 'animate-spin' : ''}`}></div>
                  {isRunning ? 'Running...' : 'Run'}
                </button>
              </div>
            </div>
            <div className="flex-1 p-4">
              <textarea
                value={code[activeTab]}
                onChange={(e) => setCode(prev => ({ ...prev, [activeTab]: e.target.value }))}
                className="w-full h-full bg-gray-900 text-green-400 font-mono text-sm p-4 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                placeholder={`Write your ${languages.find(l => l.id === activeTab)?.name} code here...`}
              />
            </div>
          </div>

          <div className="w-1/2 flex flex-col border-l border-white/10">
            <div className="p-3 border-b border-white/10">
              <h3 className="font-semibold">Output</h3>
            </div>
            <div className="flex-1 p-4 bg-black/30">
              <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap">
                {output || 'Output will appear here...'}
              </pre>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 p-3">
          <div className="flex justify-between items-center text-sm opacity-70">
            <div>Language: {languages.find(l => l.id === activeTab)?.name}</div>
            <div>Lines: {code[activeTab].split('\n').length}</div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('CodeStudioApp error:', error);
    return null;
  }
}