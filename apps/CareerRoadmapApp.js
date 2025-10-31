function CareerRoadmapApp() {
  try {
    const [activeTab, setActiveTab] = React.useState('paths');
    const [selectedPath, setSelectedPath] = React.useState(null);
    const [selectedSkill, setSelectedSkill] = React.useState(null);

    const careerPaths = [
      {
        id: 'software-engineer',
        title: 'Software Engineer',
        icon: '💻',
        description: 'Design, develop, and maintain software systems and applications',
        avgSalary: '$85,000 - $150,000',
        growth: '22%',
        demand: 'Very High',
        skills: ['Programming', 'Data Structures', 'Algorithms', 'System Design', 'Version Control'],
        companies: ['Google', 'Microsoft', 'Amazon', 'Apple', 'Meta'],
        timeline: [
          { year: 'Year 1-2', title: 'Junior Developer', focus: 'Learn fundamentals, build projects' },
          { year: 'Year 3-5', title: 'Mid-level Engineer', focus: 'Specialize, contribute to large projects' },
          { year: 'Year 5-8', title: 'Senior Engineer', focus: 'Lead projects, mentor others' },
          { year: 'Year 8+', title: 'Staff/Principal Engineer', focus: 'Technical leadership, architecture' }
        ]
      },
      {
        id: 'data-scientist',
        title: 'Data Scientist',
        icon: '📊',
        description: 'Analyze complex data to help organizations make better decisions',
        avgSalary: '$95,000 - $165,000',
        growth: '36%',
        demand: 'Very High',
        skills: ['Statistics', 'Machine Learning', 'Python', 'SQL', 'Data Visualization'],
        companies: ['Netflix', 'Spotify', 'Uber', 'Airbnb', 'LinkedIn'],
        timeline: [
          { year: 'Year 1-2', title: 'Junior Data Scientist', focus: 'Learn ML basics, data cleaning' },
          { year: 'Year 3-5', title: 'Data Scientist', focus: 'Build models, work with stakeholders' },
          { year: 'Year 5-8', title: 'Senior Data Scientist', focus: 'Lead projects, research' },
          { year: 'Year 8+', title: 'Principal Data Scientist', focus: 'Strategy, innovation' }
        ]
      },
      {
        id: 'cybersecurity',
        title: 'Cybersecurity Analyst',
        icon: '🔒',
        description: 'Protect computer systems and networks from cyber threats',
        avgSalary: '$75,000 - $140,000',
        growth: '35%',
        demand: 'Very High',
        skills: ['Network Security', 'Cryptography', 'Risk Assessment', 'Incident Response', 'Compliance'],
        companies: ['Cisco', 'Palo Alto Networks', 'FireEye', 'CrowdStrike', 'IBM Security'],
        timeline: [
          { year: 'Year 1-2', title: 'Security Analyst', focus: 'Monitor systems, learn threats' },
          { year: 'Year 3-5', title: 'Security Engineer', focus: 'Implement security measures' },
          { year: 'Year 5-8', title: 'Senior Security Engineer', focus: 'Design security architecture' },
          { year: 'Year 8+', title: 'Security Architect', focus: 'Strategy, leadership' }
        ]
      },
      {
        id: 'product-manager',
        title: 'Product Manager',
        icon: '📱',
        description: 'Guide product development from concept to launch',
        avgSalary: '$90,000 - $160,000',
        growth: '30%',
        demand: 'High',
        skills: ['Communication', 'Market Research', 'Analytics', 'Project Management', 'UX Design'],
        companies: ['Apple', 'Google', 'Microsoft', 'Adobe', 'Salesforce'],
        timeline: [
          { year: 'Year 1-2', title: 'Associate PM', focus: 'Learn product lifecycle, support team' },
          { year: 'Year 3-5', title: 'Product Manager', focus: 'Own features, work with engineering' },
          { year: 'Year 5-8', title: 'Senior PM', focus: 'Lead product strategy' },
          { year: 'Year 8+', title: 'Director of Product', focus: 'Portfolio management, team leadership' }
        ]
      },
      {
        id: 'devops',
        title: 'DevOps Engineer',
        icon: '⚙️',
        description: 'Bridge development and operations to improve deployment processes',
        avgSalary: '$80,000 - $145,000',
        growth: '28%',
        demand: 'Very High',
        skills: ['Cloud Computing', 'CI/CD', 'Containerization', 'Infrastructure as Code', 'Monitoring'],
        companies: ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes'],
        timeline: [
          { year: 'Year 1-2', title: 'Junior DevOps', focus: 'Learn tools, basic automation' },
          { year: 'Year 3-5', title: 'DevOps Engineer', focus: 'Build pipelines, manage infrastructure' },
          { year: 'Year 5-8', title: 'Senior DevOps', focus: 'Architecture, optimization' },
          { year: 'Year 8+', title: 'DevOps Architect', focus: 'Strategy, best practices' }
        ]
      }
    ];

    const internships = [
      {
        id: 1,
        company: 'Google',
        position: 'Software Engineering Intern',
        location: 'Mountain View, CA / Remote',
        duration: '12 weeks',
        stipend: '$8,000/month',
        deadline: '2025-11-15',
        requirements: ['CS major', 'Python/Java/C++', 'Data structures'],
        logo: '🔍'
      },
      {
        id: 2,
        company: 'Microsoft',
        position: 'Explore Microsoft Internship',
        location: 'Redmond, WA / Remote',
        duration: '12 weeks',
        stipend: '$7,500/month',
        deadline: '2025-11-30',
        requirements: ['Freshman/Sophomore', 'Basic programming', 'Problem solving'],
        logo: '🪟'
      },
      {
        id: 3,
        company: 'Amazon',
        position: 'SDE Intern',
        location: 'Seattle, WA / Remote',
        duration: '12 weeks',
        stipend: '$8,200/month',
        deadline: '2025-12-01',
        requirements: ['CS major', 'Algorithms', 'System design'],
        logo: '📦'
      }
    ];

    const skills = [
      { id: 'programming', name: 'Programming', category: 'Technical', level: 85 },
      { id: 'algorithms', name: 'Algorithms', category: 'Technical', level: 75 },
      { id: 'communication', name: 'Communication', category: 'Soft Skills', level: 70 },
      { id: 'leadership', name: 'Leadership', category: 'Soft Skills', level: 60 },
      { id: 'cloud', name: 'Cloud Computing', category: 'Technical', level: 65 },
      { id: 'machine-learning', name: 'Machine Learning', category: 'Technical', level: 55 }
    ];

    const getSkillColor = (level) => {
      if (level >= 80) return 'bg-green-500';
      if (level >= 60) return 'bg-yellow-500';
      return 'bg-red-500';
    };

    const getDemandColor = (demand) => {
      const colors = {
        'Very High': 'text-green-600 bg-green-100',
        'High': 'text-blue-600 bg-blue-100',
        'Medium': 'text-yellow-600 bg-yellow-100',
        'Low': 'text-red-600 bg-red-100'
      };
      return colors[demand] || 'text-gray-600 bg-gray-100';
    };

    return (
      <div className="flex h-full" data-file="apps/CareerRoadmapApp.js">
        <div className="w-80 border-r border-white/10 overflow-auto">
          <div className="p-4 border-b border-white/10">
            <h2 className="text-lg font-bold mb-3">Career Paths</h2>
            <div className="space-y-2">
              {careerPaths.map(path => (
                <button
                  key={path.id}
                  onClick={() => setSelectedPath(path)}
                  className={`w-full p-3 rounded-xl text-left transition-all ${
                    selectedPath?.id === path.id
                      ? 'bg-[var(--primary-color)] text-white'
                      : 'glass-effect hover:bg-white/15'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{path.icon}</span>
                    <div className="flex-1">
                      <div className="font-semibold">{path.title}</div>
                      <div className="text-xs opacity-70">{path.avgSalary}</div>
                    </div>
                    <div className={`text-xs px-2 py-1 rounded-full ${
                      selectedPath?.id === path.id
                        ? 'bg-white/20'
                        : getDemandColor(path.demand)
                    }`}>
                      {path.demand}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="p-4">
            <h3 className="text-sm font-semibold mb-3 opacity-70">SKILL ASSESSMENT</h3>
            <div className="space-y-3">
              {skills.map(skill => (
                <div key={skill.id} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getSkillColor(skill.level)}`}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="border-b border-white/10">
            <div className="flex gap-1 p-2">
              {['paths', 'internships', 'skills', 'resources'].map(tab => (
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
            {activeTab === 'paths' && selectedPath && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">{selectedPath.icon}</span>
                    <div>
                      <h2 className="text-2xl font-bold">{selectedPath.title}</h2>
                      <p className="opacity-70">{selectedPath.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="glass-effect rounded-xl p-4">
                      <div className="text-sm opacity-70 mb-1">Average Salary</div>
                      <div className="font-semibold">{selectedPath.avgSalary}</div>
                    </div>
                    <div className="glass-effect rounded-xl p-4">
                      <div className="text-sm opacity-70 mb-1">Growth Rate</div>
                      <div className="font-semibold text-green-600">{selectedPath.growth}</div>
                    </div>
                    <div className="glass-effect rounded-xl p-4">
                      <div className="text-sm opacity-70 mb-1">Demand</div>
                      <div className={`font-semibold ${getDemandColor(selectedPath.demand).split(' ')[0]}`}>
                        {selectedPath.demand}
                      </div>
                    </div>
                    <div className="glass-effect rounded-xl p-4">
                      <div className="text-sm opacity-70 mb-1">Top Companies</div>
                      <div className="font-semibold">{selectedPath.companies.length}+</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Career Timeline</h3>
                  <div className="space-y-4">
                    {selectedPath.timeline.map((stage, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-4 h-4 bg-[var(--primary-color)] rounded-full"></div>
                          {idx < selectedPath.timeline.length - 1 && (
                            <div className="w-0.5 h-20 bg-white/20 mt-2"></div>
                          )}
                        </div>
                        <div className="flex-1 glass-effect rounded-xl p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-semibold">{stage.title}</h4>
                              <p className="text-sm opacity-70">{stage.year}</p>
                            </div>
                          </div>
                          <p className="text-sm opacity-80">{stage.focus}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPath.skills.map((skill, idx) => (
                      <span key={idx} className="px-3 py-1 bg-[var(--primary-color)]/20 text-[var(--primary-color)] rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Top Companies</h3>
                  <div className="grid grid-cols-5 gap-3">
                    {selectedPath.companies.map((company, idx) => (
                      <div key={idx} className="glass-effect rounded-lg p-3 text-center">
                        <div className="text-2xl mb-1">🏢</div>
                        <div className="text-sm font-medium">{company}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'internships' && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Available Internships</h3>
                {internships.map(internship => (
                  <div key={internship.id} className="glass-effect rounded-xl p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{internship.logo}</div>
                        <div>
                          <h4 className="font-semibold">{internship.position}</h4>
                          <p className="text-sm opacity-70">{internship.company}</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-[var(--primary-color)] text-white rounded-full text-sm">
                        {internship.duration}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                      <div>
                        <span className="opacity-70">Location:</span> {internship.location}
                      </div>
                      <div>
                        <span className="opacity-70">Stipend:</span> {internship.stipend}
                      </div>
                      <div>
                        <span className="opacity-70">Deadline:</span> {internship.deadline}
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="text-sm font-medium mb-2">Requirements:</div>
                      <div className="flex flex-wrap gap-2">
                        {internship.requirements.map((req, idx) => (
                          <span key={idx} className="px-2 py-1 bg-white/10 rounded text-xs">
                            {req}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button className="w-full px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:opacity-90">
                      Apply Now
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Skill Development Roadmap</h3>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="glass-effect rounded-xl p-4">
                    <h4 className="font-semibold mb-3">Technical Skills</h4>
                    <div className="space-y-3">
                      {skills.filter(s => s.category === 'Technical').map(skill => (
                        <div key={skill.id} className="space-y-2">
                          <div className="flex justify-between">
                            <span>{skill.name}</span>
                            <span>{skill.level}%</span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${getSkillColor(skill.level)}`}
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="glass-effect rounded-xl p-4">
                    <h4 className="font-semibold mb-3">Soft Skills</h4>
                    <div className="space-y-3">
                      {skills.filter(s => s.category === 'Soft Skills').map(skill => (
                        <div key={skill.id} className="space-y-2">
                          <div className="flex justify-between">
                            <span>{skill.name}</span>
                            <span>{skill.level}%</span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${getSkillColor(skill.level)}`}
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="glass-effect rounded-xl p-4">
                  <h4 className="font-semibold mb-3">Recommended Learning Resources</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="icon-book-open text-3xl mb-2"></div>
                      <div className="font-medium">Books</div>
                      <div className="text-sm opacity-70">12 recommended</div>
                    </div>
                    <div className="text-center">
                      <div className="icon-video text-3xl mb-2"></div>
                      <div className="font-medium">Courses</div>
                      <div className="text-sm opacity-70">8 available</div>
                    </div>
                    <div className="text-center">
                      <div className="icon-code text-3xl mb-2"></div>
                      <div className="font-medium">Projects</div>
                      <div className="text-sm opacity-70">15 suggested</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'resources' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Career Resources</h3>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="glass-effect rounded-xl p-4">
                    <h4 className="font-semibold mb-3">Resume Building</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <div className="icon-check text-green-500"></div>
                        Resume templates
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="icon-check text-green-500"></div>
                        Cover letter examples
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="icon-check text-green-500"></div>
                        Portfolio guidelines
                      </li>
                    </ul>
                  </div>

                  <div className="glass-effect rounded-xl p-4">
                    <h4 className="font-semibold mb-3">Interview Preparation</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <div className="icon-check text-green-500"></div>
                        Common questions
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="icon-check text-green-500"></div>
                        Technical challenges
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="icon-check text-green-500"></div>
                        Mock interviews
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="glass-effect rounded-xl p-4">
                  <h4 className="font-semibold mb-3">Networking Opportunities</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-white/5 rounded-lg">
                      <div className="icon-users text-2xl mb-2"></div>
                      <div className="font-medium">Meetups</div>
                      <div className="text-sm opacity-70">5 this month</div>
                    </div>
                    <div className="text-center p-3 bg-white/5 rounded-lg">
                      <div className="icon-calendar text-2xl mb-2"></div>
                      <div className="font-medium">Events</div>
                      <div className="text-sm opacity-70">3 upcoming</div>
                    </div>
                    <div className="text-center p-3 bg-white/5 rounded-lg">
                      <div className="icon-message-circle text-2xl mb-2"></div>
                      <div className="font-medium">Forums</div>
                      <div className="text-sm opacity-70">Active</div>
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
    console.error('CareerRoadmapApp error:', error);
    return null;
  }
}