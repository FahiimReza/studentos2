function CalendarApp() {
  try {
    const events = [
      { id: 1, title: 'Algorithm Exam', date: '2025-11-05', time: '09:00', type: 'exam' },
      { id: 2, title: 'Project Presentation', date: '2025-11-08', time: '14:00', type: 'presentation' },
      { id: 3, title: 'Study Group', date: '2025-11-02', time: '16:00', type: 'meeting' }
    ];

    const getEventColor = (type) => {
      const colors = {
        exam: 'bg-red-100 text-red-700',
        presentation: 'bg-blue-100 text-blue-700',
        meeting: 'bg-green-100 text-green-700'
      };
      return colors[type] || 'bg-gray-100 text-gray-700';
    };

    return (
      <div className="p-6 h-full overflow-auto" data-file="apps/CalendarApp.js">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">October 2025</h2>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-white/20 rounded-lg">
              <div className="icon-chevron-left text-lg"></div>
            </button>
            <button className="p-2 hover:bg-white/20 rounded-lg">
              <div className="icon-chevron-right text-lg"></div>
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold">Upcoming Events</h3>
          {events.map(event => (
            <div key={event.id} className={`p-4 rounded-xl ${getEventColor(event.type)}`}>
              <div className="font-semibold">{event.title}</div>
              <div className="text-sm mt-1">
                {event.date} at {event.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('CalendarApp error:', error);
    return null;
  }
}