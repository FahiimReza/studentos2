function StudyPlannerApp() {
  try {
    const [tasks, setTasks] = React.useState([
      { id: 1, title: 'Complete Chapter 5', subject: 'Algorithms', priority: 'high', done: false },
      { id: 2, title: 'Practice SQL queries', subject: 'Database', priority: 'medium', done: false },
      { id: 3, title: 'Review lecture notes', subject: 'Web Dev', priority: 'low', done: true }
    ]);

    const getPriorityColor = (priority) => {
      const colors = {
        high: 'text-red-600 bg-red-100',
        medium: 'text-yellow-600 bg-yellow-100',
        low: 'text-green-600 bg-green-100'
      };
      return colors[priority] || 'text-gray-600 bg-gray-100';
    };

    return (
      <div className="p-6 h-full overflow-auto" data-file="apps/StudyPlannerApp.js">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Study Planner</h2>
          <button className="px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:opacity-90">
            Add Task
          </button>
        </div>

        <div className="space-y-3">
          {tasks.map(task => (
            <div key={task.id} className="glass-effect rounded-xl p-4 flex items-center gap-4">
              <input
                type="checkbox"
                checked={task.done}
                className="w-5 h-5 rounded"
                readOnly
              />
              <div className="flex-1">
                <div className={`font-semibold ${task.done ? 'line-through opacity-50' : ''}`}>
                  {task.title}
                </div>
                <div className="text-sm opacity-70 mt-1">{task.subject}</div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('StudyPlannerApp error:', error);
    return null;
  }
}