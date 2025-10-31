function Messages() {
  try {
    const [messages] = React.useState([
      { id: 1, from: 'Prof. Smith', subject: 'Assignment Feedback', preview: 'Great work on your latest submission...', time: '2h ago', unread: true },
      { id: 2, from: 'Study Group', subject: 'Meeting Tomorrow', preview: 'Don\'t forget our study session at 3 PM...', time: '5h ago', unread: true },
      { id: 3, from: 'Campus Admin', subject: 'Registration Open', preview: 'Fall 2025 course registration is now open...', time: '1d ago', unread: false },
      { id: 4, from: 'Dr. Johnson', subject: 'Research Opportunity', preview: 'I have an exciting research position available...', time: '2d ago', unread: false }
    ]);

    return (
      <div className="p-6 space-y-4" data-name="messages" data-file="features/Messages.js">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Messages</h2>
          <button className="px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:opacity-90 transition-opacity">
            Compose
          </button>
        </div>
        
        <div className="space-y-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`glass-effect rounded-xl p-4 hover:shadow-lg transition-shadow cursor-pointer ${msg.unread ? 'border-l-4 border-[var(--primary-color)]' : ''}`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                    {msg.from.charAt(0)}
                  </div>
                  <div>
                    <h3 className={`font-semibold ${msg.unread ? 'text-gray-900' : 'text-gray-600'}`}>{msg.from}</h3>
                    <p className="text-sm text-gray-500">{msg.time}</p>
                  </div>
                </div>
                {msg.unread && (
                  <div className="w-2 h-2 bg-[var(--primary-color)] rounded-full"></div>
                )}
              </div>
              <div className={`${msg.unread ? 'font-medium' : 'text-gray-600'}`}>
                <div className="text-sm mb-1">{msg.subject}</div>
                <p className="text-xs text-gray-500">{msg.preview}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Messages component error:', error);
    return null;
  }
}
