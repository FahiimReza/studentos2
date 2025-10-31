function AssignmentsApp() {
  try {
    const [assignments, setAssignments] = React.useState([
      {
        id: 1,
        title: 'Algorithm Analysis Report',
        course: 'CS301 - Data Structures',
        dueDate: '2025-11-05',
        dueTime: '23:59',
        status: 'pending',
        priority: 'high',
        description: 'Analyze time complexity of sorting algorithms',
        submissions: 0
      },
      {
        id: 2,
        title: 'Database Design Project',
        course: 'CS302 - Database Systems',
        dueDate: '2025-11-08',
        dueTime: '23:59',
        status: 'in-progress',
        priority: 'medium',
        description: 'Design and implement a library management system',
        submissions: 1
      },
      {
        id: 3,
        title: 'Web Development Portfolio',
        course: 'CS303 - Web Technologies',
        dueDate: '2025-11-10',
        dueTime: '23:59',
        status: 'submitted',
        priority: 'low',
        description: 'Create a responsive portfolio website',
        submissions: 2
      },
      {
        id: 4,
        title: 'Machine Learning Lab Report',
        course: 'CS401 - Machine Learning',
        dueDate: '2025-11-12',
        dueTime: '23:59',
        status: 'pending',
        priority: 'high',
        description: 'Implement and evaluate classification algorithms',
        submissions: 0
      }
    ]);

    const [filter, setFilter] = React.useState('all');
    const [selectedAssignment, setSelectedAssignment] = React.useState(null);

    const getStatusColor = (status) => {
      const colors = {
        'pending': 'bg-yellow-100 text-yellow-700',
        'in-progress': 'bg-blue-100 text-blue-700',
        'submitted': 'bg-green-100 text-green-700',
        'overdue': 'bg-red-100 text-red-700'
      };
      return colors[status] || 'bg-gray-100 text-gray-700';
    };

    const getPriorityColor = (priority) => {
      const colors = {
        'high': 'text-red-600',
        'medium': 'text-yellow-600',
        'low': 'text-green-600'
      };
      return colors[priority] || 'text-gray-600';
    };

    const getDaysRemaining = (dueDate) => {
      const today = new Date();
      const due = new Date(dueDate);
      const diffTime = due - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    };

    const filteredAssignments = assignments.filter(assignment => {
      if (filter === 'all') return true;
      return assignment.status === filter;
    });

    const markAsSubmitted = (id) => {
      setAssignments(prev => prev.map(assignment => 
        assignment.id === id 
          ? { ...assignment, status: 'submitted', submissions: assignment.submissions + 1 }
          : assignment
      ));
    };

    return (
      <div className="flex h-full" data-file="apps/AssignmentsApp.js">
        <div className="w-96 border-r border-white/10 flex flex-col">
          <div className="p-4 border-b border-white/10">
            <h2 className="text-xl font-bold mb-3">Assignments</h2>
            <div className="flex gap-2">
              {['all', 'pending', 'in-progress', 'submitted'].map(status => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    filter === status
                      ? 'bg-[var(--primary-color)] text-white'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex-1 overflow-auto p-4 space-y-3">
            {filteredAssignments.map(assignment => {
              const daysRemaining = getDaysRemaining(assignment.dueDate);
              return (
                <div
                  key={assignment.id}
                  onClick={() => setSelectedAssignment(assignment)}
                  className={`p-4 rounded-xl cursor-pointer transition-all ${
                    selectedAssignment?.id === assignment.id
                      ? 'bg-white/20 ring-1 ring-white/30'
                      : 'glass-effect hover:bg-white/15'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-sm">{assignment.title}</h3>
                    <div className={`icon-circle text-xs ${getPriorityColor(assignment.priority)}`}></div>
                  </div>
                  <div className="text-xs opacity-70 mb-2">{assignment.course}</div>
                  <div className="flex justify-between items-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                      {assignment.status.replace('-', ' ')}
                    </span>
                    <div className="text-xs">
                      {daysRemaining > 0 ? `${daysRemaining} days left` : 'Overdue'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          {selectedAssignment ? (
            <>
              <div className="p-6 border-b border-white/10">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{selectedAssignment.title}</h2>
                    <p className="opacity-70">{selectedAssignment.course}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedAssignment.status)}`}>
                    {selectedAssignment.status.replace('-', ' ')}
                  </span>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="glass-effect rounded-lg p-3">
                    <div className="text-xs opacity-70 mb-1">Due Date</div>
                    <div className="font-semibold">{selectedAssignment.dueDate}</div>
                    <div className="text-sm opacity-70">{selectedAssignment.dueTime}</div>
                  </div>
                  <div className="glass-effect rounded-lg p-3">
                    <div className="text-xs opacity-70 mb-1">Priority</div>
                    <div className={`font-semibold capitalize ${getPriorityColor(selectedAssignment.priority)}`}>
                      {selectedAssignment.priority}
                    </div>
                  </div>
                  <div className="glass-effect rounded-lg p-3">
                    <div className="text-xs opacity-70 mb-1">Submissions</div>
                    <div className="font-semibold">{selectedAssignment.submissions}</div>
                  </div>
                </div>

                <div className="glass-effect rounded-lg p-4 mb-4">
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-sm opacity-80">{selectedAssignment.description}</p>
                </div>

                <div className="flex gap-3">
                  {selectedAssignment.status !== 'submitted' && (
                    <button
                      onClick={() => markAsSubmitted(selectedAssignment.id)}
                      className="px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:opacity-90"
                    >
                      Mark as Submitted
                    </button>
                  )}
                  <button className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20">
                    View Submission Guidelines
                  </button>
                  <button className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20">
                    Download Files
                  </button>
                </div>
              </div>

              <div className="flex-1 p-6">
                <h3 className="font-semibold mb-4">Submission History</h3>
                <div className="space-y-3">
                  {selectedAssignment.submissions > 0 ? (
                    <div className="glass-effect rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">Submission #{selectedAssignment.submissions}</div>
                          <div className="text-sm opacity-70">Submitted on 2025-10-30 at 14:23</div>
                        </div>
                        <button className="px-3 py-1 bg-white/10 rounded-lg hover:bg-white/20 text-sm">
                          View
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 opacity-50">
                      <div className="icon-file-text text-4xl mb-2"></div>
                      <p>No submissions yet</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center opacity-50">
              <div className="text-center">
                <div className="icon-file-text text-6xl mb-4"></div>
                <p>Select an assignment to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('AssignmentsApp error:', error);
    return null;
  }
}