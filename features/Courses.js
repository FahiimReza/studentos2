function Courses() {
  try {
    const courses = [
      { id: 1, name: 'Algorithm Analysis', code: 'CS301', progress: 75, assignments: 3 },
      { id: 2, name: 'Web Development', code: 'CS205', progress: 60, assignments: 5 },
      { id: 3, name: 'Database Systems', code: 'CS310', progress: 85, assignments: 2 },
      { id: 4, name: 'Software Engineering', code: 'CS401', progress: 70, assignments: 4 },
      { id: 5, name: 'Computer Networks', code: 'CS315', progress: 55, assignments: 6 }
    ];

    return (
      <div className="p-6 space-y-4" data-name="courses" data-file="features/Courses.js">
        <h2 className="text-2xl font-bold mb-4">My Courses</h2>
        
        <div className="space-y-3">
          {courses.map((course) => (
            <div key={course.id} className="glass-effect rounded-xl p-4 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-lg">{course.name}</h3>
                  <p className="text-sm text-gray-600">{course.code}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="icon-clipboard-list text-lg text-[var(--primary-color)]"></div>
                  <span className="text-sm">{course.assignments} assignments</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span className="font-semibold">{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[var(--primary-color)] h-2 rounded-full transition-all"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Courses component error:', error);
    return null;
  }
}