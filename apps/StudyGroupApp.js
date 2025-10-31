function StudyGroupApp() {
  try {
    const [activeTab, setActiveTab] = React.useState('groups');
    const [selectedGroup, setSelectedGroup] = React.useState(null);
    const [showCreateGroup, setShowCreateGroup] = React.useState(false);

    const groups = [
      {
        id: 1,
        name: 'CS301 Study Squad',
        course: 'CS301 - Data Structures',
        description: 'Weekly study sessions for algorithms and data structures',
        members: 12,
        maxMembers: 15,
        nextMeeting: 'Today, 6:00 PM',
        isJoined: true,
        isOwner: false,
        tags: ['algorithms', 'weekly', 'exam-prep'],
        avatar: '📚'
      },
      {
        id: 2,
        name: 'Database Masters',
        course: 'CS302 - Database Systems',
        description: 'Collaborative learning for SQL and database design',
        members: 8,
        maxMembers: 10,
        nextMeeting: 'Tomorrow, 4:00 PM',
        isJoined: true,
        isOwner: true,
        tags: ['sql', 'projects', 'collaborative'],
        avatar: '🗃️'
      },
      {
        id: 3,
        name: 'Web Dev Warriors',
        course: 'CS303 - Web Technologies',
        description: 'Frontend and backend development practice',
        members: 15,
        maxMembers: 20,
        nextMeeting: 'Friday, 5:00 PM',
        isJoined: false,
        isOwner: false,
        tags: ['javascript', 'react', 'full-stack'],
        avatar: '🌐'
      },
      {
        id: 4,
        name: 'Math Problem Solvers',
        course: 'MATH201 - Discrete Mathematics',
        description: 'Tackling complex math problems together',
        members: 6,
        maxMembers: 12,
        nextMeeting: 'Saturday, 2:00 PM',
        isJoined: false,
        isOwner: false,
        tags: ['math', 'proofs', 'logic'],
        avatar: '🧮'
      }
    ];

    const discussions = [
      {
        id: 1,
        groupId: 1,
        title: 'Understanding Red-Black Trees',
        author: 'Alex Chen',
        content: 'Can someone explain the balancing mechanism in red-black trees? I\'m having trouble with the rotation cases.',
        replies: 5,
        likes: 3,
        timestamp: '2 hours ago',
        isPinned: true
      },
      {
        id: 2,
        groupId: 2,
        title: 'SQL Join Optimization Tips',
        author: 'Sarah Johnson',
        content: 'Here are some tips I learned for optimizing complex SQL queries with multiple joins...',
        replies: 8,
        likes: 12,
        timestamp: '4 hours ago',
        isPinned: false
      },
      {
        id: 3,
        groupId: 3,
        title: 'React Hooks Best Practices',
        author: 'Mike Wilson',
        content: 'Let\'s share our favorite React Hooks patterns and common pitfalls to avoid.',
        replies: 15,
        likes: 7,
        timestamp: '1 day ago',
        isPinned: false
      }
    ];

    const members = [
      {
        id: 1,
        name: 'Alex Chen',
        avatar: '👨‍💻',
        role: 'Admin',
        status: 'online',
        courses: ['CS301', 'CS302'],
        joinedGroups: 3
      },
      {
        id: 2,
        name: 'Sarah Johnson',
        avatar: '👩‍💻',
        role: 'Member',
        status: 'online',
        courses: ['CS301', 'CS303'],
        joinedGroups: 2
      },
      {
        id: 3,
        name: 'Mike Wilson',
        avatar: '👨‍🎓',
        role: 'Member',
        status: 'away',
        courses: ['CS302', 'MATH201'],
        joinedGroups: 4
      },
      {
        id: 4,
        name: 'Emily Davis',
        avatar: '👩‍🎓',
        role: 'Moderator',
        status: 'offline',
        courses: ['CS303', 'CS401'],
        joinedGroups: 2
      }
    ];

    const getStatusColor = (status) => {
      const colors = {
        online: 'bg-green-500',
        away: 'bg-yellow-500',
        offline: 'bg-gray-400'
      };
      return colors[status] || 'bg-gray-400';
    };

    const getRoleColor = (role) => {
      const colors = {
        Admin: 'bg-red-100 text-red-700',
        Moderator: 'bg-blue-100 text-blue-700',
        Member: 'bg-gray-100 text-gray-700'
      };
      return colors[role] || 'bg-gray-100 text-gray-700';
    };

    const joinGroup = (groupId) => {
      // Simulate joining group
      if (typeof soundManager !== 'undefined') {
        soundManager.play('success');
      }
      alert('Joined study group successfully!');
    };

    const leaveGroup = (groupId) => {
      // Simulate leaving group
      if (typeof soundManager !== 'undefined') {
        soundManager.play('close');
      }
      alert('Left study group');
    };

    return (
      <div className="flex h-full" data-file="apps/StudyGroupApp.js">
        <div className="w-80 border-r border-white/10 flex flex-col">
          <div className="p-4 border-b border-white/10">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-bold">Study Groups</h2>
              <button
                onClick={() => setShowCreateGroup(true)}
                className="p-2 bg-[var(--primary-color)] text-white rounded-lg hover:opacity-90"
              >
                <div className="icon-plus text-sm"></div>
              </button>
            </div>
            
            <div className="glass-effect rounded-xl p-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-[var(--primary-color)]">
                  {groups.filter(g => g.isJoined).length}
                </div>
                <div className="text-xs opacity-70">Active Groups</div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-4">
            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-2 opacity-70">MY GROUPS</h3>
              <div className="space-y-2">
                {groups.filter(g => g.isJoined).map(group => (
                  <button
                    key={group.id}
                    onClick={() => setSelectedGroup(group)}
                    className={`w-full p-3 rounded-xl text-left transition-all ${
                      selectedGroup?.id === group.id
                        ? 'bg-[var(--primary-color)] text-white'
                        : 'glass-effect hover:bg-white/15'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{group.avatar}</div>
                      <div className="flex-1">
                        <div className="font-medium">{group.name}</div>
                        <div className="text-xs opacity-70">{group.members}/{group.maxMembers} members</div>
                      </div>
                      {group.isOwner && (
                        <div className="icon-crown text-yellow-500 text-sm"></div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-2 opacity-70">ONLINE MEMBERS</h3>
              <div className="space-y-2">
                {members.filter(m => m.status === 'online').slice(0, 3).map(member => (
                  <div key={member.id} className="flex items-center gap-2">
                    <div className="relative">
                      <div className="text-xl">{member.avatar}</div>
                      <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full ${getStatusColor(member.status)}`}></div>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{member.name}</div>
                      <div className="text-xs opacity-70">{member.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="border-b border-white/10">
            <div className="flex gap-1 p-2">
              {['groups', 'discussions', 'members', 'schedule'].map(tab => (
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
            {activeTab === 'groups' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">Available Study Groups</h3>
                  <select className="px-3 py-1 bg-white/10 rounded-lg text-sm focus:outline-none">
                    <option>All Courses</option>
                    <option>CS301</option>
                    <option>CS302</option>
                    <option>CS303</option>
                    <option>MATH201</option>
                  </select>
                </div>

                <div className="grid gap-4">
                  {groups.map(group => (
                    <div key={group.id} className="glass-effect rounded-xl p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <div className="text-3xl">{group.avatar}</div>
                          <div>
                            <h4 className="font-semibold text-lg">{group.name}</h4>
                            <p className="text-sm opacity-70">{group.course}</p>
                          </div>
                        </div>
                        {group.isOwner && (
                          <div className="icon-crown text-yellow-500"></div>
                        )}
                      </div>

                      <p className="text-sm opacity-80 mb-3">{group.description}</p>

                      <div className="flex gap-2 mb-3">
                        {group.tags.map((tag, idx) => (
                          <span key={idx} className="px-2 py-1 bg-white/10 rounded-full text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex gap-4 text-sm opacity-70">
                          <span className="flex items-center gap-1">
                            <div className="icon-users text-xs"></div>
                            {group.members}/{group.maxMembers}
                          </span>
                          <span className="flex items-center gap-1">
                            <div className="icon-calendar text-xs"></div>
                            {group.nextMeeting}
                          </span>
                        </div>
                        <button
                          onClick={() => group.isJoined ? leaveGroup(group.id) : joinGroup(group.id)}
                          className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                            group.isJoined
                              ? 'bg-red-500 text-white hover:bg-red-600'
                              : 'bg-[var(--primary-color)] text-white hover:opacity-90'
                          }`}
                        >
                          {group.isJoined ? 'Leave' : 'Join'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'discussions' && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Recent Discussions</h3>
                <div className="space-y-3">
                  {discussions.map(discussion => (
                    <div key={discussion.id} className="glass-effect rounded-xl p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{discussion.title}</h4>
                        {discussion.isPinned && (
                          <div className="icon-pin text-yellow-500"></div>
                        )}
                      </div>
                      <p className="text-sm opacity-80 mb-3">{discussion.content}</p>
                      <div className="flex justify-between items-center text-sm opacity-70">
                        <div className="flex items-center gap-4">
                          <span>{discussion.author}</span>
                          <span>{discussion.timestamp}</span>
                        </div>
                        <div className="flex gap-3">
                          <span className="flex items-center gap-1">
                            <div className="icon-message-circle text-xs"></div>
                            {discussion.replies}
                          </span>
                          <span className="flex items-center gap-1">
                            <div className="icon-heart text-xs"></div>
                            {discussion.likes}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'members' && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Group Members</h3>
                <div className="grid gap-3">
                  {members.map(member => (
                    <div key={member.id} className="glass-effect rounded-xl p-4">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="text-3xl">{member.avatar}</div>
                          <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full ${getStatusColor(member.status)}`}></div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold">{member.name}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs ${getRoleColor(member.role)}`}>
                              {member.role}
                            </span>
                          </div>
                          <div className="text-sm opacity-70 mb-2">
                            Courses: {member.courses.join(', ')}
                          </div>
                          <div className="flex gap-4 text-sm">
                            <span>{member.joinedGroups} groups</span>
                            <span className="capitalize">{member.status}</span>
                          </div>
                        </div>
                        <button className="px-3 py-1 bg-white/10 rounded-lg hover:bg-white/20 text-sm">
                          Message
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'schedule' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Study Schedule</h3>
                
                <div className="glass-effect rounded-xl p-4">
                  <h4 className="font-semibold mb-3">Today's Sessions</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 p-3 bg-white/5 rounded-lg">
                      <div className="text-center">
                        <div className="text-lg font-bold">6:00</div>
                        <div className="text-xs opacity-70">PM</div>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">CS301 Study Squad</div>
                        <div className="text-sm opacity-70">Red-Black Trees Review</div>
                      </div>
                      <button className="px-3 py-1 bg-[var(--primary-color)] text-white rounded-lg text-sm">
                        Join
                      </button>
                    </div>
                    <div className="flex items-center gap-4 p-3 bg-white/5 rounded-lg">
                      <div className="text-center">
                        <div className="text-lg font-bold">8:00</div>
                        <div className="text-xs opacity-70">PM</div>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">Database Masters</div>
                        <div className="text-sm opacity-70">SQL Practice Session</div>
                      </div>
                      <button className="px-3 py-1 bg-[var(--primary-color)] text-white rounded-lg text-sm">
                        Join
                      </button>
                    </div>
                  </div>
                </div>

                <div className="glass-effect rounded-xl p-4">
                  <h4 className="font-semibold mb-3">Upcoming Sessions</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2">
                      <div>
                        <div className="font-medium">Web Dev Warriors</div>
                        <div className="text-sm opacity-70">Tomorrow, 5:00 PM</div>
                      </div>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                        React Hooks
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-2">
                      <div>
                        <div className="font-medium">Math Problem Solvers</div>
                        <div className="text-sm opacity-70">Saturday, 2:00 PM</div>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                        Graph Theory
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {showCreateGroup && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="glass-effect rounded-xl p-6 max-w-md w-full mx-4">
              <h3 className="text-xl font-bold mb-4">Create Study Group</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Group Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                    placeholder="Enter group name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Course</label>
                  <select className="w-full px-3 py-2 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]">
                    <option>Select course</option>
                    <option>CS301 - Data Structures</option>
                    <option>CS302 - Database Systems</option>
                    <option>CS303 - Web Technologies</option>
                    <option>MATH201 - Discrete Mathematics</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    className="w-full px-3 py-2 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                    rows={3}
                    placeholder="Describe the study group purpose"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Max Members</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                    placeholder="10"
                    min="2"
                    max="50"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowCreateGroup(false)}
                  className="flex-1 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowCreateGroup(false);
                    if (typeof soundManager !== 'undefined') {
                      soundManager.play('success');
                    }
                    alert('Study group created successfully!');
                  }}
                  className="flex-1 px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:opacity-90"
                >
                  Create Group
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('StudyGroupApp error:', error);
    return null;
  }
}