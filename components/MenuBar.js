function MenuBar({ theme, onToggleTheme, onToggleWidgets, onChangeWallpaper }) {
  try {
    const [showSettings, setShowSettings] = React.useState(false);
    const [currentTime, setCurrentTime] = React.useState(new Date());

    React.useEffect(() => {
      const timer = setInterval(() => setCurrentTime(new Date()), 1000);
      return () => clearInterval(timer);
    }, []);

    return (
      <div className="fixed top-0 left-0 right-0 h-7 menubar-glass flex items-center justify-between px-4 text-xs z-50" data-file="components/MenuBar.js">
        <div className="flex items-center gap-4">
          <div className="font-semibold">StudentOS</div>
        </div>
        
        <div className="flex items-center gap-3">
          <button onClick={() => {
            if (typeof soundManager !== 'undefined') {
              soundManager.play('click');
            }
            onToggleWidgets();
          }} className="hover:bg-white/20 px-2 py-1 rounded transition-colors">
            <div className="icon-layout-grid text-sm"></div>
          </button>
          <button onClick={() => {
            if (typeof soundManager !== 'undefined') {
              soundManager.play('click');
            }
            onToggleTheme();
          }} className="hover:bg-white/20 px-2 py-1 rounded transition-colors">
            <div className={`icon-${theme === 'light' ? 'moon' : 'sun'} text-sm`}></div>
          </button>
          <div className="relative">
            <button onClick={() => {
              if (typeof soundManager !== 'undefined') {
                soundManager.play('click');
              }
              setShowSettings(!showSettings);
            }} className="hover:bg-white/20 px-2 py-1 rounded transition-colors">
              <div className="icon-user text-sm"></div>
            </button>
            {showSettings && (
              <div className="absolute right-0 top-8 w-48 glass-effect rounded-xl p-2 shadow-2xl">
                <button onClick={() => {
                  if (typeof soundManager !== 'undefined') {
                    soundManager.play('click');
                  }
                  localStorage.removeItem('studentos-auth');
                  window.location.href = 'login.html';
                }} className="w-full text-left px-3 py-2 hover:bg-white/20 rounded-lg">
                  Logout
                </button>
              </div>
            )}
          </div>
          <div className="font-medium">
            {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('MenuBar error:', error);
    return null;
  }
}