function Dock({ onOpenWindow, openWindows }) {
  try {
    const [hovered, setHovered] = React.useState(null);

    const getScale = (index, hoveredIndex) => {
      if (hoveredIndex === null) return 1;
      const distance = Math.abs(index - hoveredIndex);
      if (distance === 0) return 1.6;
      if (distance === 1) return 1.3;
      if (distance === 2) return 1.1;
      return 1;
    };

    return (
      <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-40" data-file="components/Dock.js">
        <div className="dock-glass px-4 py-3 rounded-2xl shadow-2xl flex items-end gap-2">
          {DOCK_CONFIG.map((app, index) => {
            const scale = getScale(index, hovered);
            const isOpen = openWindows.some(w => w.id === app.id);
            return (
              <div key={app.id} className="relative flex flex-col items-center">
                <button
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => {
                    if (typeof soundManager !== 'undefined') {
                      soundManager.play('open');
                    }
                    onOpenWindow(app);
                  }}
                  className="relative transition-all duration-200"
                  style={{
                    transform: `scale(${scale})`,
                    marginBottom: scale > 1 ? '8px' : '0px'
                  }}
                >
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: app.color }}
                  >
                    <div className={`icon-${app.icon} text-2xl text-white`}></div>
                  </div>
                </button>
                {isOpen && (
                  <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-white/80"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Dock error:', error);
    return null;
  }
}