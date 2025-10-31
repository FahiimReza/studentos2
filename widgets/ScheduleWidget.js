function ScheduleWidget() {
  try {
    const schedule = [
      { time: '09:00', class: 'Data Structures', room: 'CS-301' },
      { time: '11:00', class: 'Web Development', room: 'CS-205' },
      { time: '14:00', class: 'Algorithms', room: 'CS-310' }
    ];

    return (
      <div className="glass-effect rounded-2xl p-4" data-file="widgets/ScheduleWidget.js">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <div className="icon-calendar text-lg"></div>
          Today's Schedule
        </h3>
        <div className="space-y-2">
          {schedule.map((item, i) => (
            <div key={i} className="flex justify-between items-center p-2 bg-white/20 rounded-lg text-sm">
              <div>
                <div className="font-medium">{item.class}</div>
                <div className="text-xs opacity-70">{item.room}</div>
              </div>
              <div className="text-xs font-medium">{item.time}</div>
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