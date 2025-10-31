class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-screen">
          <button onClick={() => window.location.reload()}>Reload</button>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  try {
    const [openWindows, setOpenWindows] = React.useState([]);
    const [activeWindow, setActiveWindow] = React.useState(null);
    const [theme, setTheme] = React.useState('light');
    const [currentWallpaper, setCurrentWallpaper] = React.useState(WALLPAPERS[0]);
    const [showWidgets, setShowWidgets] = React.useState(false);

    React.useEffect(() => {
      const isAuth = localStorage.getItem('studentos-auth');
      if (!isAuth) {
        window.location.href = 'login.html';
        return;
      }

      // Initialize sound manager
      if (typeof soundManager !== 'undefined') {
        soundManager.init();
      }

      const savedTheme = localStorage.getItem('studentos-theme') || 'light';
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');

      const savedWallpaper = localStorage.getItem('studentos-wallpaper');
      if (savedWallpaper) {
        setCurrentWallpaper(JSON.parse(savedWallpaper));
      }
    }, []);

    const openWindow = React.useCallback((app) => {
      setOpenWindows(prev => {
        const exists = prev.find(w => w.id === app.id);
        if (exists) {
          setActiveWindow(app.id);
          return prev;
        }
        const newWindow = {
          ...app,
          position: { x: 100 + prev.length * 40, y: 100 + prev.length * 40 },
          size: { width: 800, height: 600 }
        };
        setActiveWindow(app.id);
        return [...prev, newWindow];
      });
    }, []);

    const closeWindow = React.useCallback((id) => {
      setOpenWindows(prev => prev.filter(w => w.id !== id));
      setActiveWindow(null);
    }, []);

    const toggleTheme = React.useCallback(() => {
      setTheme(prev => {
        const newTheme = prev === 'light' ? 'dark' : 'light';
        localStorage.setItem('studentos-theme', newTheme);
        document.documentElement.classList.toggle('dark');
        return newTheme;
      });
    }, []);

    const changeWallpaper = React.useCallback((wallpaper) => {
      setCurrentWallpaper(wallpaper);
      localStorage.setItem('studentos-wallpaper', JSON.stringify(wallpaper));
    }, []);

    return (
      <div className="h-screen w-screen overflow-hidden">
        <Desktop wallpaper={currentWallpaper} />
        <MenuBar 
          theme={theme}
          onToggleTheme={toggleTheme}
          onToggleWidgets={() => setShowWidgets(!showWidgets)}
          onChangeWallpaper={changeWallpaper}
        />
        {openWindows.map(window => (
          <Window
            key={window.id}
            window={window}
            isActive={activeWindow === window.id}
            onClose={closeWindow}
            onFocus={setActiveWindow}
          />
        ))}
        <Dock onOpenWindow={openWindow} openWindows={openWindows} />
        <WidgetPanel isOpen={showWidgets} />
      </div>
    );
  } catch (error) {
    console.error('App error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ErrorBoundary><App /></ErrorBoundary>);