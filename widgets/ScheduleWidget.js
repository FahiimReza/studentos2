function ScheduleWidget() {
  try {
    const schedule = [
      { time: '09:00', class: 'Data Structures', room: 'CS-301' },
      { time: '11:00', class: 'Web Development', room: 'CS-205' },
      { time: '14:00', class: 'Algorithms', room: 'CS-310' }
    ];

    return (
      <div className="backdrop-blur-xl bg-white/20 dark:bg-black/30 rounded-3xl p-4 shadow-2xl border border-white/30 dark:border-white/20 transition-all hover:scale-105 hover:bg-white/30 dark:hover:bg-black/40" data-file="widgets/ScheduleWidget.js">
        <h3 className="font-semibold mb-3 flex items-center gap-2 text-white drop-shadow-lg">
          <div className="icon-calendar text-lg"></div>
          Today's Schedule
        </h3>
        <div className="space-y-2">
          {schedule.map((item, i) => (
            <div key={i} className="flex justify-between items-center p-2 bg-white/10 dark:bg-white/5 rounded-lg text-sm backdrop-blur-sm border border-white/20 dark:border-white/10">
              <div>
                <div className="font-medium text-white drop-shadow">{item.class}</div>
                <div className="text-xs opacity-80 text-white drop-shadow">{item.room}</div>
              </div>
              <div className="text-xs font-medium text-white drop-shadow">{item.time}</div>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('ScheduleWidget error:', error);
    return null;
  }
}