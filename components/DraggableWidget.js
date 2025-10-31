function DraggableWidget({ children, id, defaultPosition = { x: 50, y: 50 } }) {
  try {
    const [position, setPosition] = React.useState(defaultPosition);
    const [isDragging, setIsDragging] = React.useState(false);
    const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 });

    const handleMouseDown = (e) => {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
      e.preventDefault();
    };

    React.useEffect(() => {
      if (!isDragging) return;
      
      const handleMove = (e) => {
        setPosition({ 
          x: e.clientX - dragStart.x, 
          y: e.clientY - dragStart.y 
        });
      };
      
      const handleUp = () => setIsDragging(false);
      
      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMove);
        document.removeEventListener('mouseup', handleUp);
      };
    }, [isDragging, dragStart]);

    return (
      <div
        className="fixed z-30 cursor-move"
        style={{ left: position.x, top: position.y }}
        onMouseDown={handleMouseDown}
        data-file="components/DraggableWidget.js"
      >
        {children}
      </div>
    );
  } catch (error) {
    console.error('DraggableWidget error:', error);
    return null;
  }
}