function ClockWidget() {
  try {
    const [time, setTime] = React.useState(new Date());

    React.useEffect(() => {
      const timer = setInterval(() => setTime(new Date()), 1000);
      return () => clearInterval(timer);
    }, []);

    return (
      <div className="backdrop-blur-xl bg-white/20 dark:bg-black/30 rounded-3xl p-6 text-center shadow-2xl border border-white/30 dark:border-white/20 transition-all hover:scale-105 hover:bg-white/30 dark:hover:bg-black/40" data-file="widgets/ClockWidget.js">
        <div className="text-4xl font-light mb-2 text-white drop-shadow-lg">
          {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
        </div>
        <div className="text-sm opacity-80 text-white drop-shadow">
          {time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
      </div>
    );
  } catch (error) {
    console.error('ClockWidget error:', error);
    return null;
  }
}