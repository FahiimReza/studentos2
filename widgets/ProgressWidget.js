function ProgressWidget() {
  try {
    const subjects = [
      { name: 'Algorithms', progress: 85, color: '#007AFF' },
      { name: 'Web Dev', progress: 72, color: '#34C759' },
      { name: 'Database', progress: 90, color: '#FF9500' },
      { name: 'Networks', progress: 65, color: '#FF3B30' }
    ];

    return (
      <div className="backdrop-blur-xl bg-white/20 dark:bg-black/30 rounded-3xl p-4 shadow-2xl border border-white/30 dark:border-white/20 transition-all hover:scale-105 hover:bg-white/30 dark:hover:bg-black/40" data-file="widgets/ProgressWidget.js">
        <h3 className="font-semibold mb-3 flex items-center gap-2 text-white drop-shadow-lg">
          <div className="icon-chart-bar text-lg"></div>
          Study Progress
        </h3>
        <div className="space-y-3">
          {subjects.map((subject, i) => (
            <div key={i}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-white drop-shadow">{subject.name}</span>
                <span className="font-semibold text-white drop-shadow">{subject.progress}%</span>
              </div>
              <div className="w-full bg-white/20 dark:bg-white/10 rounded-full h-2 backdrop-blur-sm border border-white/30 dark:border-white/20">
                <div
                  className="h-2 rounded-full transition-all shadow-lg"
                  style={{
                    width: `${subject.progress}%`,
                    backgroundColor: subject.color,
                    boxShadow: `0 0 10px ${subject.color}40`
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