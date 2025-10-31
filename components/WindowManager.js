const WindowManager = React.memo(function WindowManager({ windows, activeWindowId, onClose, onFocus, onToggleTheme, theme }) {
  try {
    return (
      <div className="absolute inset-0 pointer-events-none" data-name="window-manager" data-file="components/WindowManager.js">
        {windows.map((window) => (
          <Window
            key={window.id}
            window={window}
            isActive={activeWindowId === window.id}
            onClose={onClose}
            onFocus={onFocus}
            onToggleTheme={onToggleTheme}
            theme={theme}
          />
        ))}
      </div>
    );
  } catch (error) {
    console.error('WindowManager component error:', error);
    return null;
  }
});
