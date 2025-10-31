function WidgetPanel({ isOpen }) {
  try {
    return (
      <div
        className={`fixed left-0 top-7 bottom-0 w-[350px] backdrop-blur-2xl bg-white/10 dark:bg-black/20 border-r border-white/20 dark:border-white/10 shadow-2xl transition-transform duration-500 z-40 ${isOpen ? 'translate-x-0' : '-translate-x-full'} rounded-tr-2xl rounded-br-2xl`}
        data-file="components/WidgetPanel.js"
      >
        <div className="p-6 h-full overflow-auto space-y-4">
          <h2 className="text-xl font-semibold mb-4 text-white dark:text-gray-100">Widgets</h2>
          <div className="space-y-4">
            <ClockWidget />
            <ScheduleWidget />
            <TodoWidget />
            <ProgressWidget />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('WidgetPanel error:', error);
    return null;
  }
}