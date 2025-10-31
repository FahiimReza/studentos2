function Grades() {
  try {
    const grades = [
      { course: 'Algorithm Analysis', grade: 'A', score: 92, credits: 3 },
      { course: 'Web Development', grade: 'A-', score: 88, credits: 3 },
      { course: 'Database Systems', grade: 'A+', score: 96, credits: 4 },
      { course: 'Software Engineering', grade: 'B+', score: 85, credits: 3 },
      { course: 'Computer Networks', grade: 'A', score: 90, credits: 3 }
    ];

    const getGradeColor = (grade) => {
      if (grade.includes('A')) return 'text-green-600 bg-green-100';
      if (grade.includes('B')) return 'text-blue-600 bg-blue-100';
      return 'text-gray-600 bg-gray-100';
    };

    return (
      <div className="p-6 space-y-4" data-name="grades" data-file="features/Grades.js">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Academic Performance</h2>
          <div className="glass-effect rounded-lg px-4 py-2">
            <span className="text-sm text-gray-600">Overall GPA: </span>
            <span className="text-xl font-bold text-[var(--primary-color)]">3.85</span>
          </div>
        </div>
        
        <div className="space-y-3">
          {grades.map((item, index) => (
            <div key={index} className="glass-effect rounded-xl p-4 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <h3 className="font-semibold">{item.course}</h3>
                  <p className="text-sm text-gray-600">{item.credits} Credits</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">{item.score}</div>
                    <div className="text-xs text-gray-500">Score</div>
                  </div>
                  <div className={`px-4 py-2 rounded-lg font-bold ${getGradeColor(item.grade)}`}>
                    {item.grade}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Grades component error:', error);
    return null;
  }
}