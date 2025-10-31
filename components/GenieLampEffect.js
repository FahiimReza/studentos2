function GenieLampEffect({ isActive }) {
  try {
    const [phase, setPhase] = React.useState('idle');
    const [sparkles, setSparkles] = React.useState([]);

    React.useEffect(() => {
      if (isActive) {
        setPhase('glow');
        
        // Generate sparkles
        const newSparkles = Array.from({ length: 12 }, (_, i) => ({
          id: i,
          x: Math.random() * 100 - 50,
          y: Math.random() * 100 - 50,
          delay: Math.random() * 0.5
        }));
        setSparkles(newSparkles);
        
        setTimeout(() => setPhase('expand'), 800);
        setTimeout(() => {
          setPhase('complete');
        }, 2000);
        setTimeout(() => {
          setPhase('idle');
        }, 2200);
      }
    }, [isActive]);

    if (phase === 'idle') return null;

    return (
      <div className="fixed inset-0 pointer-events-none z-[9999] flex items-end justify-center pb-32" data-name="genie-lamp-effect" data-file="components/GenieLampEffect.js">
        {phase === 'glow' && (
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 genie-glow"></div>
            {sparkles.map((sparkle) => (
              <div
                key={sparkle.id}
                className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-300 rounded-full"
                style={{
                  transform: `translate(${sparkle.x}px, ${sparkle.y}px)`,
                  animation: `sparkleFloat 0.8s ease-out ${sparkle.delay}s`,
                  opacity: 0
                }}
              ></div>
            ))}
          </div>
        )}
        {(phase === 'expand' || phase === 'complete') && (
          <div
            className="w-96 h-96 bg-gradient-to-br from-purple-400 via-pink-500 to-orange-400 rounded-3xl"
            style={{
              animation: 'genieExpand 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
              transformOrigin: 'bottom center'
            }}
          ></div>
        )}
      </div>
    );
  } catch (error) {
    console.error('GenieLampEffect component error:', error);
    return null;
  }
}
