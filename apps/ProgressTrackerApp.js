function ProgressTrackerApp() {
  try {
    const [activeTab, setActiveTab] = React.useState('grades');
    const [selectedSemester, setSelectedSemester] = React.useState('fall-2025');

    const semesters = [
      { id: 'fall-2025', name: 'Fall 2025' },
      { id: 'spring-2025', name: 'Spring 2025' },
      { id: 'fall-2024', name: 'Fall 2024' }
    ];

    const courses = [
      {
        id: 1,
        code: 'CS301',
        name: 'Data Structures & Algorithms',
        credits: 4,
        grade: 'A-',
        instructor: 'Dr. Smith',
        attendance: 92,
        assignments: [
          { name: 'Homework 1', grade: 95, weight: 10 },
          { name: 'Homework 2', grade: 88, weight: 10 },
          { name: 'Midterm', grade: 85, weight: 30 },
          { name: 'Final Project', grade: 92, weight: 40 },
          { name: 'Final Exam', grade: 87, weight: 10 }
        ]
      },
      {
        id: 2,
        code: 'CS302',
        name: 'Database Systems',
        credits: 3,
        grade: 'B+',
        instructor: 'Prof. Johnson',
        attendance: 88,
        assignments: [
          { name: 'Lab 1', grade: 90, weight: 15 },
          { name: 'Lab 2', grade: 85, weight: 15 },
          { name: 'Midterm', grade: 82, weight: 35 },
          { name: 'Final Project', grade: 88, weight: 35 }
        ]
      },
      {
        id: 3,
        code: 'CS303',
        name: 'Web Technologies',
        credits: 3,
        grade: 'A',
        instructor: 'Dr. Williams',
        attendance: 95,
        assignments: [
          { name: 'Project 1', grade: 96, weight: 20 },
          { name: 'Project 2', grade: 94, weight: 20 },
          { name: 'Midterm', grade: 92, weight: 30 },
          { name: 'Final Project', grade: 98, weight: 30 }
        ]
      },
      {
        id: 4,
        code: 'MATH201',
        name: 'Discrete Mathematics',
        credits: 3,
        grade: 'B',
        instructor: 'Prof. Davis',
        attendance: 85,
        assignments: [
          { name: 'Quiz 1', grade: 82, weight: 10 },
          { name: 'Quiz 2', grade: 78, weight: 10 },
          { name: 'Midterm', grade: 80, weight: 40 },
          { name: 'Final Exam', grade: 83, weight: 40 }
        ]
      }
    ];

    const getGradeColor = (grade) => {
      if (grade.startsWith('A')) return 'text-green-600 bg-green-100';
      if (grade.startsWith('B')) return 'text-blue-600 bg-blue-100';
      if (grade.startsWith('C')) return 'text-yellow-600 bg-yellow-100';
      return 'text-red-600 bg-red-100';
    };

    const getAttendanceColor = (attendance) => {
      if (attendance >= 90) return 'text-green-600';
      if (attendance >= 75) return 'text-yellow-600';
      return 'text-red-600';
    };

    const calculateGPA = () => {
      const gradePoints = {
        'A': 4.0, 'A-': 3.7,
        'B+': 3.3, 'B': 3.0, 'B-': 2.7,
        'C+': 2.3, 'C': 2.0, 'C-': 1.7,
        'D+': 1.3, 'D': 1.0, 'F': 0.0
      };

      let totalPoints = 0;
      let totalCredits = 0;

      courses.forEach(course => {
        totalPoints += (gradePoints[course.grade] || 0) * course.credits;
        totalCredits += course.credits;
      });

      return (totalPoints / totalCredits).toFixed(2);
    };

    const calculateOverallAttendance = () => {
      const totalAttendance = courses.reduce((sum, course) => sum + course.attendance, 0);
      return Math.round(totalAttendance / courses.length);
    };

    return (
      <div className="flex flex-col h-full" data-file="apps/ProgressTrackerApp.js">
        <div className="border-b border-white/10">
          <div className="flex gap-1 p-2">
            {['grades', 'attendance', 'performance'].map(tab => (
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
            <div className="ml-auto flex items-center gap-2 px-4">
              <span className="text-sm opacity-70">Semester:</span>
              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="bg-white/10 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
              >
                {semesters.map(semester => (
                  <option key={semester.id} value={semester.id}>
                    {semester.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          {activeTab === 'grades' && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="glass-effect rounded-xl p-4">
                  <div className="text-sm opacity-70 mb-1">Current GPA</div>
                  <div className="text-3xl font-bold text-[var(--primary-color)]">{calculateGPA()}</div>
                  <div className="text-xs opacity-70 mt-1">Semester GPA</div>
                </div>
                <div className="glass-effect rounded-xl p-4">
                  <div className="text-sm opacity-70 mb-1">Total Credits</div>
                  <div className="text-3xl font-bold">{courses.reduce((sum, c) => sum + c.credits, 0)}</div>
                  <div className="text-xs opacity-70 mt-1">This semester</div>
                </div>
                <div className="glass-effect rounded-xl p-4">
                  <div className="text-sm opacity-70 mb-1">Average Grade</div>
                  <div className="text-3xl font-bold">B+</div>
                  <div className="text-xs opacity-70 mt-1">Across all courses</div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Course Grades</h3>
                {courses.map(course => (
                  <div key={course.id} className="glass-effect rounded-xl p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold">{course.code} - {course.name}</h4>
                        <p className="text-sm opacity-70">{course.instructor} • {course.credits} credits</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(course.grade)}`}>
                        {course.grade}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium opacity-70">Assignments & Exams</div>
                      {course.assignments.map((assignment, idx) => (
                        <div key={idx} className="flex justify-between items-center text-sm">
                          <span>{assignment.name}</span>
                          <div className="flex items-center gap-3">
                            <div className="w-32 bg-white/10 rounded-full h-2">
                              <div 
                                className="h-2 rounded-full bg-[var(--primary-color)]"
                                style={{ width: `${assignment.grade}%` }}
                              ></div>
                            </div>
                            <span className="w-12 text-right">{assignment.grade}%</span>
                            <span className="opacity-50 text-xs">({assignment.weight}%)</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'attendance' && (
            <div className="space-y-6">
              <div className="glass-effect rounded-xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Overall Attendance</h3>
                  <div className={`text-2xl font-bold ${getAttendanceColor(calculateOverallAttendance())}`}>
                    {calculateOverallAttendance()}%
                  </div>
                </div>
                <div className="w-full bg-white/10 rounded-full h-4">
                  <div 
                    className={`h-4 rounded-full ${
                      calculateOverallAttendance() >= 90 ? 'bg-green-500' :
                      calculateOverallAttendance() >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${calculateOverallAttendance()}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Course Attendance</h3>
                {courses.map(course => (
                  <div key={course.id} className="glass-effect rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <h4 className="font-semibold">{course.code} - {course.name}</h4>
                        <p className="text-sm opacity-70">{course.instructor}</p>
                      </div>
                      <div className={`text-xl font-bold ${getAttendanceColor(course.attendance)}`}>
                        {course.attendance}%
                      </div>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full ${
                          course.attendance >= 90 ? 'bg-green-500' :
                          course.attendance >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${course.attendance}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'performance' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-effect rounded-xl p-4">
                  <h3 className="font-semibold mb-3">Grade Distribution</h3>
                  <div className="space-y-2">
                    {['A', 'B', 'C', 'D', 'F'].map(grade => {
                      const count = courses.filter(c => c.grade.startsWith(grade)).length;
                      return (
                        <div key={grade} className="flex justify-between items-center">
                          <span className="text-sm">Grade {grade}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-white/10 rounded-full h-2">
                              <div 
                                className="h-2 rounded-full bg-[var(--primary-color)]"
                                style={{ width: `${(count / courses.length) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-sm w-4">{count}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="glass-effect rounded-xl p-4">
                  <h3 className="font-semibold mb-3">Study Statistics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm opacity-70">Study Hours/Week</span>
                      <span className="font-semibold">24</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm opacity-70">Assignments Completed</span>
                      <span className="font-semibold">18/20</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm opacity-70">Average Study Session</span>
                      <span className="font-semibold">2.5 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm opacity-70">Productivity Score</span>
                      <span className="font-semibold text-green-600">85%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-effect rounded-xl p-4">
                <h3 className="font-semibold mb-3">Performance Trends</h3>
                <div className="h-48 flex items-end justify-between gap-2">
                  {['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'].map((week, idx) => (
                    <div key={week} className="flex-1 flex flex-col items-center gap-2">
                      <div 
                        className="w-full bg-[var(--primary-color)] rounded-t"
                        style={{ height: `${60 + Math.random() * 40}%` }}
                      ></div>
                      <span className="text-xs opacity-70">{week}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('ProgressTrackerApp error:', error);
    return null;
  }
}