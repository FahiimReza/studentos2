function ProgressWidget() {
  try {
    const subjects = [
      { name: 'Algorithms', progress: 85, color: '#007AFF' },
      { name: 'Web Dev', progress: 72, color: '#34C759' },
      { name: 'Database', progress: 90, color: '#FF9500' },
      { name: 'Networks', progress: 65, color: '#FF3B30' }
    ];

    return (
      <div className="glass-effect rounded-2xl p-4" data-file="widgets/ProgressWidget.js">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <div className="icon-chart-bar text-lg"></div>
          Study Progress
        </h3>
        <div className="space-y-3">
          {subjects.map((subject, i) => (
            <div key={i}>
              <div className="flex justify-between text-xs mb-1">
                <span>{subject.name}</span>
                <span className="font-semibold">{subject.progress}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all"
                  style={{ 
                    width: `${subject.progress}%`,
                    backgroundColor: subject.color
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('ProgressWidget error:', error);
    return null;
  }
}