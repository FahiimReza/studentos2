function AIAssistant() {
  try {
    const [messages, setMessages] = React.useState([
      { id: 1, type: 'ai', text: 'Hello! I\'m your AI assistant. How can I help you with your studies today?' }
    ]);
    const [input, setInput] = React.useState('');

    const handleSend = async () => {
      if (!input.trim()) return;

      const userMessage = { id: Date.now(), type: 'user', text: input };
      setMessages([...messages, userMessage]);
      setInput('');

      setTimeout(() => {
        const aiResponse = {
          id: Date.now() + 1,
          type: 'ai',
          text: 'I can help you with course materials, study tips, and assignment planning. What would you like to know?'
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    };

    return (
      <div className="h-full flex flex-col" data-name="ai-assistant" data-file="features/AIAssistant.js">
        <div className="flex-1 overflow-auto p-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-2xl ${
                  msg.type === 'user'
                    ? 'bg-[var(--primary-color)] text-white'
                    : 'glass-effect'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 glass-effect border-t border-white/20">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything..."
              className="flex-1 px-4 py-2 rounded-lg glass-effect outline-none"
            />
            <button
              onClick={handleSend}
              className="px-6 py-2 bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-lg hover:opacity-90"
            >
              <div className="icon-send text-lg"></div>
            </button>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('AIAssistant component error:', error);
    return null;
  }
}