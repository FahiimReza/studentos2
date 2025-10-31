function UniversityPortalApp() {
  try {
    const [activeTab, setActiveTab] = React.useState('dashboard');
    const [selectedCourse, setSelectedCourse] = React.useState(null);

    const courses = [
      {
        id: 'cs301',
        code: 'CS301',
        name: 'Data Structures & Algorithms',
        instructor: 'Dr. Sarah Johnson',
        credits: 4,
        schedule: 'Mon/Wed/Fri 10:00-11:00 AM',
        room: 'Tech Building 301',
        grade: 'A-',
        attendance: 92,
        nextClass: 'Tomorrow, 10:00 AM',
        assignments: 3,
        announcements: 2
      },
      {
        id: 'cs302',
        code: 'CS302',
        name: 'Database Systems',
        instructor: 'Prof. Michael Chen',
        credits: 3,
        schedule: 'Tue/Thu 2:00-3:30 PM',
        room: 'Tech Building 205',
        grade: 'B+',
        attendance: 88,
        nextClass: 'Today, 2:00 PM',
        assignments: 2,
        announcements: 1
      },
      {
        id: 'cs303',
        code: 'CS303',
        name: 'Web Technologies',
        instructor: 'Dr. Emily Davis',
        credits: 3,
        schedule: 'Mon/Wed 3:00-4:30 PM',
        room: 'Tech Building 150',
        grade: 'A',
        attendance: 95,
        nextClass: 'Monday, 3:00 PM',
        assignments: 1,
        announcements: 0
      },
      {
        id: 'math201',
        code: 'MATH201',
        name: 'Discrete Mathematics',
        instructor: 'Prof. Robert Wilson',
        credits: 3,
        schedule: 'Tue/Thu 10:00-11:30 AM',
        room: 'Math Building 102',
        grade: 'B',
        attendance: 85,
        nextClass: 'Tuesday, 10:00 AM',
        assignments: 4,
        announcements: 3
      }
    ];

    const announcements = [
      {
        id: 1,
        course: 'CS301',
        title: 'Midterm Exam Schedule Update',
        content: 'The midterm exam has been rescheduled to next Friday. Please update your calendars.',
        date: '2025-10-30',
        priority: 'high',
        author: 'Dr. Sarah Johnson'
      },
      {
        id: 2,
        course: 'CS302',
        title: 'Lab Session Canceled',
        content: 'Tomorrow\'s lab session is canceled due to maintenance. We will have a makeup session next week.',
        date: '2025-10-30',
        priority: 'medium',
        author: 'Prof. Michael Chen'
      },
      {
        id: 3,
        course: 'University',
        title: 'Registration for Spring 2026',
        content: 'Course registration for Spring 2026 will open on November 15th at 8:00 AM.',
        date: '2025-10-29',
        priority: 'low',
        author: 'Registrar Office'
      }
    ];

    const resources = [
      {
        id: 1,
        title: 'Academic Calendar',
        description: 'Important dates and deadlines for the current semester',
        type: 'document',
        url: '#'
      },
      {
        id: 2,
        title: 'Library Database',
        description: 'Access to digital books, journals, and research papers',
        type: 'link',
        url: '#'
      },
      {
        id: 3,
        title: 'Student Handbook',
        description: 'University policies and guidelines',
        type: 'document',
        url: '#'
      },
      {
        id: 4,
        title: 'IT Support',
        description: 'Technical support for university systems',
        type: 'service',
        url: '#'
      }
    ];

    const getGradeColor = (grade) => {
      if (grade.startsWith('A')) return 'text-green-600 bg-green-100';
      if (grade.startsWith('B')) return 'text-blue-600 bg-blue-100';
      if (grade.startsWith('C')) return 'text-yellow-600 bg-yellow-100';
      return 'text-red-600 bg-red-100';
    };

    const getPriorityColor = (priority) => {
      const colors = {
        high: 'bg-red-100 text-red-700',
        medium: 'bg-yellow-100 text-yellow-700',
        low: 'bg-blue-100 text-blue-700'
      };
      return colors[priority] || 'bg-gray-100 text-gray-700';
    };

    return (
      <div className="flex h-full" data-file="apps/UniversityPortalApp.js">
        <div className="w-64 border-r border-white/10 flex flex-col">
          <div className="p-4 border-b border-white/10">
            <h2 className="text-lg font-bold mb-3">University Portal</h2>
            <div className="glass-effect rounded-xl p-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-[var(--primary-color)]">Fall 2025</div>
                <div className="text-xs opacity-70">Current Semester</div>
                <div className="text-sm mt-1">13 Credits</div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-4">
            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-2 opacity-70">QUICK LINKS</h3>
              <div className="space-y-2">
                <button className="w-full p-2 rounded-lg hover:bg-white/10 text-sm text-left flex items-center gap-2">
                  <div className="icon-calendar text-xs"></div>
                  Academic Calendar
                </button>
                <button className="w-full p-2 rounded-lg hover:bg-white/10 text-sm text-left flex items-center gap-2">
                  <div className="icon-book-open text-xs"></div>
                  Course Catalog
                </button>
                <button className="w-full p-2 rounded-lg hover:bg-white/10 text-sm text-left flex items-center gap-2">
                  <div className="icon-users text-xs"></div>
                  Student Directory
                </button>
                <button className="w-full p-2 rounded-lg hover:bg-white/10 text-sm text-left flex items-center gap-2">
                  <div className="icon-help-circle text-xs"></div>
                  IT Help Desk
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-2 opacity-70">CAMPUS INFO</h3>
              <div className="glass-effect rounded-lg p-3 text-xs space-y-1">
                <div>📍 Tech University</div>
                <div>📧 student@tech.edu</div>
                <div>📞 (555) 123-4567</div>
                <div>🌐 www.tech.edu</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="border-b border-white/10">
            <div className="flex gap-1 p-2">
              {['dashboard', 'courses', 'announcements', 'resources'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                    activeTab === tab
                      ? 'bg-[var(--primary-color)] text-white'
                      : 'hover:bg-white/10'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-auto p-6">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Welcome Back!</h3>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="glass-effect rounded-xl p-4">
                      <div className="text-2xl font-bold text-[var(--primary-color)]">3.4</div>
                      <div className="text-sm opacity-70">Current GPA</div>
                    </div>
                    <div className="glass-effect rounded-xl p-4">
                      <div className="text-2xl font-bold text-green-600">90%</div>
                      <div className="text-sm opacity-70">Avg Attendance</div>
                    </div>
                    <div className="glass-effect rounded-xl p-4">
                      <div className="text-2xl font-bold">10</div>
                      <div className="text-sm opacity-70">Pending Assignments</div>
                    </div>
                    <div className="glass-effect rounded-xl p-4">
                      <div className="text-2xl font-bold">4</div>
                      <div className="text-sm opacity-70">Active Courses</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Today's Schedule</h3>
                  <div className="space-y-2">
                    <div className="glass-effect rounded-xl p-3 flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-sm font-medium">10:00</div>
                        <div className="text-xs opacity-70">AM</div>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">CS301 - Data Structures</div>
                        <div className="text-sm opacity-70">Tech Building 301 • Dr. Johnson</div>
                      </div>
                      <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                        In 2 hours
                      </div>
                    </div>
                    <div className="glass-effect rounded-xl p-3 flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-sm font-medium">2:00</div>
                        <div className="text-xs opacity-70">PM</div>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">CS302 - Database Systems</div>
                        <div className="text-sm opacity-70">Tech Building 205 • Prof. Chen</div>
                      </div>
                      <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                        In 6 hours
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Recent Announcements</h3>
                  <div className="space-y-2">
                    {announcements.slice(0, 2).map(announcement => (
                      <div key={announcement.id} className="glass-effect rounded-xl p-3">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-medium">{announcement.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(announcement.priority)}`}>
                            {announcement.priority}
                          </span>
                        </div>
                        <p className="text-sm opacity-80 mb-1">{announcement.content}</p>
                        <div className="text-xs opacity-60">
                          {announcement.course} • {announcement.date} • {announcement.author}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'courses' && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">My Courses</h3>
                <div className="grid gap-4">
                  {courses.map(course => (
                    <div
                      key={course.id}
                      className="glass-effect rounded-xl p-4 hover:bg-white/15 transition-colors cursor-pointer"
                      onClick={() => setSelectedCourse(course)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-lg">{course.code} - {course.name}</h4>
                          <p className="text-sm opacity-70">{course.instructor}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(course.grade)}`}>
                          {course.grade}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                        <div>
                          <span className="opacity-70">Schedule:</span> {course.schedule}
                        </div>
                        <div>
                          <span className="opacity-70">Room:</span> {course.room}
                        </div>
                        <div>
                          <span className="opacity-70">Credits:</span> {course.credits}
                        </div>
                        <div>
                          <span className="opacity-70">Attendance:</span> {course.attendance}%
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <div className="icon-file-text text-xs"></div>
                            {course.assignments} assignments
                          </span>
                          <span className="flex items-center gap-1">
                            <div className="icon-bell text-xs"></div>
                            {course.announcements} new
                          </span>
                        </div>
                        <button className="px-3 py-1 bg-[var(--primary-color)] text-white rounded-lg hover:opacity-90 text-sm">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'announcements' && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Announcements</h3>
                <div className="space-y-3">
                  {announcements.map(announcement => (
                    <div key={announcement.id} className="glass-effect rounded-xl p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{announcement.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(announcement.priority)}`}>
                          {announcement.priority}
                        </span>
                      </div>
                      <p className="text-sm opacity-80 mb-3">{announcement.content}</p>
                      <div className="flex justify-between items-center text-xs opacity-60">
                        <span>{announcement.course}</span>
                        <span>{announcement.date} • {announcement.author}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'resources' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">University Resources</h3>
                <div className="grid grid-cols-2 gap-4">
                  {resources.map(resource => (
                    <div key={resource.id} className="glass-effect rounded-xl p-4 hover:bg-white/15 transition-colors cursor-pointer">
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">
                          {resource.type === 'document' && '📄'}
                          {resource.type === 'link' && '🔗'}
                          {resource.type === 'service' && '🛠️'}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">{resource.title}</h4>
                          <p className="text-sm opacity-70">{resource.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="glass-effect rounded-xl p-6">
                  <h4 className="font-semibold mb-4">Campus Services</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="icon-book-open text-3xl mb-2"></div>
                      <div className="font-medium">Library</div>
                      <div className="text-sm opacity-70">24/7 Access</div>
                    </div>
                    <div className="text-center">
                      <div className="icon-utensils text-3xl mb-2"></div>
                      <div className="font-medium">Dining</div>
                      <div className="text-sm opacity-70">Multiple Locations</div>
                    </div>
                    <div className="text-center">
                      <div className="icon-heart text-3xl mb-2"></div>
                      <div className="font-medium">Health Center</div>
                      <div className="text-sm opacity-70">Medical Services</div>
                    </div>
                    <div className="text-center">
                      <div className="icon-dumbbell text-3xl mb-2"></div>
                      <div className="font-medium">Gym</div>
                      <div className="text-sm opacity-70">Fitness Facilities</div>
                    </div>
                    <div className="text-center">
                      <div className="icon-bus text-3xl mb-2"></div>
                      <div className="font-medium">Transportation</div>
                      <div className="text-sm opacity-70">Campus Shuttle</div>
                    </div>
                    <div className="text-center">
                      <div className="icon-shield text-3xl mb-2"></div>
                      <div className="font-medium">Security</div>
                      <div className="text-sm opacity-70">24/7 Campus Police</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('UniversityPortalApp error:', error);
    return null;
  }
}