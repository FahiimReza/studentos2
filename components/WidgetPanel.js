function WidgetPanel({ isOpen }) {
  try {
    return (
      <div 
        className={`fixed right-0 top-7 bottom-0 w-96 glass-effect shadow-2xl transition-transform duration-300 z-40 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        data-file="components/WidgetPanel.js"
      >
        <div className="p-6 h-full overflow-auto space-y-4">
          <h2 className="text-xl font-semibold mb-4">Widgets</h2>
          <ClockWidget />
          <ScheduleWidget />
          <TodoWidget />
          <ProgressWidget />
        </div>
      </div>
    );
  } catch (error) {
    console.error('WidgetPanel error:', error);
    return null;
  }
}