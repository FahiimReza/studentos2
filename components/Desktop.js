function Desktop({ wallpaper }) {
  try {
    return (
      <div 
        className="fixed inset-0 bg-cover bg-center transition-all duration-700"
        style={{ backgroundImage: `url(${wallpaper.url})` }}
        data-file="components/Desktop.js"
      >
        <div className="absolute inset-0 bg-black/10"></div>
      </div>
    );
  } catch (error) {
    console.error('Desktop error:', error);
    return null;
  }
}