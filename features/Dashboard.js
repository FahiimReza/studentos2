function Dashboard() {
  try {
    const stats = [
      { label: 'GPA', value: '3.85', icon: 'trophy', color: 'bg-yellow-100', iconColor: 'text-yellow-600' },
      { label: 'Credits', value: '45/120', icon: 'book', color: 'bg-blue-100', iconColor: 'text-blue-600' },
      { label: 'Courses', value: '5', icon: 'layers', color: 'bg-green-100', iconColor: 'text-green-600' },
      { label: 'Tasks', value: '12', icon: 'check-circle', color: 'bg-purple-100', iconColor: 'text-purple-600' }
    ];

    return (
      <div className="p-6 space-y-6" data-name="dashboard" data-file="features/Dashboard.js">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
            JS
          </div>
          <div>
            <h2 className="text-2xl font-bold">Welcome back, John!</h2>
            <p className="text-gray-600">Computer Science • Junior Year</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="glass-effect rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <div className={`icon-${stat.icon} text-xl ${stat.iconColor}`}></div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="glass-effect rounded-xl p-4">
          <h3 className="font-semibold mb-3">Upcoming Deadlines</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 bg-white/30 rounded-lg">
              <span className="text-sm">Algorithm Analysis - Assignment 3</span>
              <span className="text-xs text-gray-600">Due in 2 days</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-white/30 rounded-lg">
              <span className="text-sm">Web Development - Project Presentation</span>
              <span className="text-xs text-gray-600">Due in 5 days</span>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Dashboard component error:', error);
    return null;
  }
}