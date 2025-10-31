function ClockWidget() {
  try {
    const [time, setTime] = React.useState(new Date());

    React.useEffect(() => {
      const timer = setInterval(() => setTime(new Date()), 1000);
      return () => clearInterval(timer);
    }, []);

    return (
      <div className="glass-effect rounded-2xl p-6 text-center" data-file="widgets/ClockWidget.js">
        <div className="text-4xl font-light mb-2">
          {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
        </div>
        <div className="text-sm opacity-70">
          {time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
      </div>
    );
  } catch (error) {
    console.error('ClockWidget error:', error);
    return null;
  }
}