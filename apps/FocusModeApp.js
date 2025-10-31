function FocusModeApp() {
  try {
    const [activeMode, setActiveMode] = React.useState('pomodoro');
    const [timeLeft, setTimeLeft] = React.useState(25 * 60); // 25 minutes in seconds
    const [isRunning, setIsRunning] = React.useState(false);
    const [currentSession, setCurrentSession] = React.useState(0);
    const [totalSessions, setTotalSessions] = React.useState(0);
    const [breakTime, setBreakTime] = React.useState(false);
    const [selectedDuration, setSelectedDuration] = React.useState(25);
    const [selectedBreak, setSelectedBreak] = React.useState(5);

    const pomodoroSettings = {
      workDuration: 25,
      shortBreak: 5,
      longBreak: 15,
      sessionsUntilLongBreak: 4
    };

    const focusSounds = [
      { id: 'none', name: 'None', icon: '🔇' },
      { id: 'rain', name: 'Rain', icon: '🌧️' },
      { id: 'ocean', name: 'Ocean', icon: '🌊' },
      { id: 'forest', name: 'Forest', icon: '🌲' },
      { id: 'coffee-shop', name: 'Coffee Shop', icon: '☕' }
    ];

    const tasks = [
      { id: 1, title: 'Complete Algorithm Assignment', completed: false, pomodoros: 3 },
      { id: 2, title: 'Review Database Notes', completed: false, pomodoros: 2 },
      { id: 3, title: 'Practice Coding Problems', completed: false, pomodoros: 4 },
      { id: 4, title: 'Read Research Paper', completed: true, pomodoros: 2 }
    ];

    const stats = {
      todayPomodoros: 8,
      todayFocus: 200, // minutes
      weekPomodoros: 42,
      weekFocus: 1050, // minutes
      streak: 7
    };

    React.useEffect(() => {
      let interval = null;
      
      if (isRunning && timeLeft > 0) {
        interval = setInterval(() => {
          setTimeLeft(time => time - 1);
        }, 1000);
      } else if (timeLeft === 0) {
        // Timer completed
        setIsRunning(false);
        
        if (typeof soundManager !== 'undefined') {
          soundManager.play('success');
        }
        
        if (!breakTime) {
          // Work session completed
          const newSession = currentSession + 1;
          setCurrentSession(newSession);
          setTotalSessions(totalSessions + 1);
          
          if (newSession % pomodoroSettings.sessionsUntilLongBreak === 0) {
            // Long break
            setTimeLeft(pomodoroSettings.longBreak * 60);
            setBreakTime(true);
            alert('Great work! Time for a long break.');
          } else {
            // Short break
            setTimeLeft(pomodoroSettings.shortBreak * 60);
            setBreakTime(true);
            alert('Work session complete! Time for a short break.');
          }
        } else {
          // Break completed
          setTimeLeft(selectedDuration * 60);
          setBreakTime(false);
          alert('Break over! Ready to focus?');
        }
      }
      
      return () => clearInterval(interval);
    }, [isRunning, timeLeft, breakTime, currentSession, totalSessions, selectedDuration]);

    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const startTimer = () => {
      setIsRunning(true);
    };

    const pauseTimer = () => {
      setIsRunning(false);
    };

    const resetTimer = () => {
      setIsRunning(false);
      setTimeLeft(selectedDuration * 60);
      setBreakTime(false);
    };

    const skipSession = () => {
      setIsRunning(false);
      if (!breakTime) {
        setCurrentSession(currentSession + 1);
        setTotalSessions(totalSessions + 1);
        setTimeLeft(pomodoroSettings.shortBreak * 60);
        setBreakTime(true);
      } else {
        setTimeLeft(selectedDuration * 60);
        setBreakTime(false);
      }
    };

    const getProgressPercentage = () => {
      const totalTime = breakTime 
        ? (currentSession % pomodoroSettings.sessionsUntilLongBreak === 0 ? pomodoroSettings.longBreak : pomodoroSettings.shortBreak) * 60
        : selectedDuration * 60;
      return ((totalTime - timeLeft) / totalTime) * 100;
    };

    return (
      <div className="flex h-full" data-file="apps/FocusModeApp.js">
        <div className="w-80 border-r border-white/10 flex flex-col">
          <div className="p-4 border-b border-white/10">
            <h2 className="text-lg font-bold mb-3">Focus Mode</h2>
            
            <div className="glass-effect rounded-xl p-4 mb-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-[var(--primary-color)]">
                  {stats.todayPomodoros}
                </div>
                <div className="text-xs opacity-70">Pomodoros Today</div>
                <div className="text-sm mt-1">{stats.streak} day streak 🔥</div>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => setActiveMode('pomodoro')}
                className={`w-full p-3 rounded-lg flex items-center gap-3 transition-colors ${
                  activeMode === 'pomodoro'
                    ? 'bg-[var(--primary-color)] text-white'
                    : 'hover:bg-white/10'
                }`}
              >
                <div className="icon-clock text-xl"></div>
                <span>Pomodoro Timer</span>
              </button>
              <button
                onClick={() => setActiveMode('tasks')}
                className={`w-full p-3 rounded-lg flex items-center gap-3 transition-colors ${
                  activeMode === 'tasks'
                    ? 'bg-[var(--primary-color)] text-white'
                    : 'hover:bg-white/10'
                }`}
              >
                <div className="icon-check-square text-xl"></div>
                <span>Focus Tasks</span>
              </button>
              <button
                onClick={() => setActiveMode('stats')}
                className={`w-full p-3 rounded-lg flex items-center gap-3 transition-colors ${
                  activeMode === 'stats'
                    ? 'bg-[var(--primary-color)] text-white'
                    : 'hover:bg-white/10'
                }`}
              >
                <div className="icon-bar-chart text-xl"></div>
                <span>Statistics</span>
              </button>
            </div>
          </div>

          <div className="flex-1 p-4">
            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-2 opacity-70">FOCUS SOUNDS</h3>
              <div className="space-y-2">
                {focusSounds.map(sound => (
                  <button
                    key={sound.id}
                    className="w-full p-2 rounded-lg hover:bg-white/10 text-left flex items-center gap-2"
                  >
                    <span>{sound.icon}</span>
                    <span className="text-sm">{sound.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-2 opacity-70">QUICK SETTINGS</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs opacity-70">Work Duration</label>
                  <select
                    value={selectedDuration}
                    onChange={(e) => setSelectedDuration(parseInt(e.target.value))}
                    className="w-full mt-1 px-2 py-1 bg-white/10 rounded text-sm"
                  >
                    <option value={15}>15 min</option>
                    <option value={25}>25 min</option>
                    <option value={45}>45 min</option>
                    <option value={60}>60 min</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs opacity-70">Break Duration</label>
                  <select
                    value={selectedBreak}
                    onChange={(e) => setSelectedBreak(parseInt(e.target.value))}
                    className="w-full mt-1 px-2 py-1 bg-white/10 rounded text-sm"
                  >
                    <option value={3}>3 min</option>
                    <option value={5}>5 min</option>
                    <option value={10}>10 min</option>
                    <option value={15}>15 min</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-6">
          {activeMode === 'pomodoro' && (
            <div className="text-center max-w-md">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">
                  {breakTime ? 'Break Time' : 'Focus Time'}
                </h3>
                <p className="opacity-70">
                  {breakTime 
                    ? 'Relax and recharge for the next session'
                    : 'Stay focused and avoid distractions'
                  }
                </p>
              </div>

              <div className="relative mb-8">
                <div className="w-64 h-64 rounded-full border-8 border-white/20 flex items-center justify-center">
                  <div 
                    className="absolute inset-0 rounded-full border-8 border-[var(--primary-color)]"
                    style={{
                      borderRightColor: 'transparent',
                      borderBottomColor: 'transparent',
                      transform: `rotate(${(getProgressPercentage() / 100) * 360 - 90}deg)`
                    }}
                  ></div>
                  <div className="text-6xl font-bold">
                    {formatTime(timeLeft)}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="text-sm opacity-70 mb-2">
                  Session {currentSession + 1} • Total: {totalSessions}
                </div>
                <div className="flex gap-2 justify-center">
                  {[...Array(pomodoroSettings.sessionsUntilLongBreak)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i < currentSession % pomodoroSettings.sessionsUntilLongBreak
                          ? 'bg-[var(--primary-color)]'
                          : 'bg-white/20'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 justify-center">
                {!isRunning ? (
                  <button
                    onClick={startTimer}
                    className="px-6 py-3 bg-[var(--primary-color)] text-white rounded-lg hover:opacity-90 flex items-center gap-2"
                  >
                    <div className="icon-play"></div>
                    Start
                  </button>
                ) : (
                  <button
                    onClick={pauseTimer}
                    className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 flex items-center gap-2"
                  >
                    <div className="icon-pause"></div>
                    Pause
                  </button>
                )}
                <button
                  onClick={resetTimer}
                  className="px-6 py-3 bg-white/10 rounded-lg hover:bg-white/20 flex items-center gap-2"
                >
                  <div className="icon-refresh-cw"></div>
                  Reset
                </button>
                <button
                  onClick={skipSession}
                  className="px-6 py-3 bg-white/10 rounded-lg hover:bg-white/20 flex items-center gap-2"
                >
                  <div className="icon-skip-forward"></div>
                  Skip
                </button>
              </div>
            </div>
          )}

          {activeMode === 'tasks' && (
            <div className="w-full max-w-2xl">
              <h3 className="text-2xl font-bold mb-6">Focus Tasks</h3>
              <div className="space-y-3">
                {tasks.map(task => (
                  <div key={task.id} className="glass-effect rounded-xl p-4">
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        className="w-5 h-5 rounded"
                        readOnly
                      />
                      <div className="flex-1">
                        <div className={`font-medium ${task.completed ? 'line-through opacity-50' : ''}`}>
                          {task.title}
                        </div>
                        <div className="text-sm opacity-70">
                          {task.pomodoros} pomodoros estimated
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20">
                          <div className="icon-edit text-sm"></div>
                        </button>
                        <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20">
                          <div className="icon-trash text-sm"></div>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <button className="w-full p-4 border-2 border-dashed border-white/20 rounded-xl hover:border-white/40 transition-colors">
                  <div className="flex items-center justify-center gap-2">
                    <div className="icon-plus"></div>
                    Add New Task
                  </div>
                </button>
              </div>
            </div>
          )}

          {activeMode === 'stats' && (
            <div className="w-full max-w-4xl">
              <h3 className="text-2xl font-bold mb-6">Focus Statistics</h3>
              
              <div className="grid grid-cols-4 gap-4 mb-8">
                <div className="glass-effect rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-[var(--primary-color)]">
                    {stats.todayPomodoros}
                  </div>
                  <div className="text-sm opacity-70">Today's Pomodoros</div>
                </div>
                <div className="glass-effect rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {Math.floor(stats.todayFocus / 60)}h {stats.todayFocus % 60}m
                  </div>
                  <div className="text-sm opacity-70">Today's Focus Time</div>
                </div>
                <div className="glass-effect rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {stats.weekPomodoros}
                  </div>
                  <div className="text-sm opacity-70">Weekly Pomodoros</div>
                </div>
                <div className="glass-effect rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {stats.streak}
                  </div>
                  <div className="text-sm opacity-70">Day Streak 🔥</div>
                </div>
              </div>

              <div className="glass-effect rounded-xl p-6">
                <h4 className="font-semibold mb-4">Weekly Progress</h4>
                <div className="h-48 flex items-end justify-between gap-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
                    <div key={day} className="flex-1 flex flex-col items-center gap-2">
                      <div 
                        className="w-full bg-[var(--primary-color)] rounded-t"
                        style={{ height: `${40 + Math.random() * 60}%` }}
                      ></div>
                      <span className="text-xs opacity-70">{day}</span>
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
    console.error('FocusModeApp error:', error);
    return null;
  }
}