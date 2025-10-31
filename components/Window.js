function Window({ window, isActive, onClose, onFocus }) {
  try {
    const [position, setPosition] = React.useState(window.position);
    const [size, setSize] = React.useState(window.size);
    const [isDragging, setIsDragging] = React.useState(false);
    const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 });

    const handleMouseDown = (e) => {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
      onFocus(window.id);
    };

    React.useEffect(() => {
      if (!isDragging) return;
      const handleMove = (e) => {
        setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
      };
      const handleUp = () => setIsDragging(false);
      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleUp);
      return () => {
        document.removeEventListener('mousemove', handleMove);
        document.removeEventListener('mouseup', handleUp);
      };
    }, [isDragging, dragStart]);

    const ComponentMap = {
      NotesApp,
      CalendarApp,
      StudyPlannerApp,
      Settings,
      CodeStudioApp,
      AssignmentsApp,
      ProgressTrackerApp,
      AIAssistantApp,
      MathToolsApp,
      FileHubApp,
      ResearchPortalApp,
      PracticeArenaApp,
      CareerRoadmapApp,
      UtilitiesApp,
      UniversityPortalApp,
      StudyGroupApp,
      FocusModeApp,
      BrowserApp
    };
    const Component = ComponentMap[window.component];

    return (
      <div
        className="fixed z-30"
        style={{ left: position.x, top: position.y, width: size.width, height: size.height }}
        onClick={() => {
          if (typeof soundManager !== 'undefined') {
            soundManager.play('click');
          }
          onFocus(window.id);
        }}
        data-file="components/Window.js"
      >
        <div className={`h-full rounded-xl glass-effect shadow-2xl overflow-hidden ${isActive ? 'ring-1 ring-white/30' : ''}`}>
          <div 
            className="h-10 flex items-center justify-between px-4 cursor-move border-b border-white/10"
            onMouseDown={handleMouseDown}
          >
            <div className="flex gap-2">
              <button onClick={() => {
                if (typeof soundManager !== 'undefined') {
                  soundManager.play('close');
                }
                onClose(window.id);
              }} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600"></button>
              <button onClick={() => {
                if (typeof soundManager !== 'undefined') {
                  soundManager.play('click');
                }
              }} className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600"></button>
              <button onClick={() => {
                if (typeof soundManager !== 'undefined') {
                  soundManager.play('click');
                }
              }} className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600"></button>
            </div>
            <div className="text-sm font-medium">{window.title}</div>
            <div className="w-12"></div>
          </div>
          <div className="h-[calc(100%-2.5rem)] overflow-auto">
            {Component && <Component />}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Window error:', error);
    return null;
  }
}