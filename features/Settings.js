function Settings({ onToggleTheme, theme }) {
  try {
    const [soundEnabled, setSoundEnabled] = React.useState(true);
    const [soundVolume, setSoundVolume] = React.useState(0.3);

    React.useEffect(() => {
      if (typeof soundManager !== 'undefined') {
        setSoundEnabled(soundManager.enabled);
        setSoundVolume(soundManager.volume);
      }
    }, []);

    const handleSoundToggle = () => {
      const newEnabled = !soundEnabled;
      setSoundEnabled(newEnabled);
      if (typeof soundManager !== 'undefined') {
        soundManager.setEnabled(newEnabled);
        if (newEnabled) {
          soundManager.play('click');
        }
      }
    };

    const handleVolumeChange = (e) => {
      const newVolume = parseFloat(e.target.value);
      setSoundVolume(newVolume);
      if (typeof soundManager !== 'undefined') {
        soundManager.setVolume(newVolume);
        if (soundEnabled) {
          soundManager.play('click');
        }
      }
    };

    return (
      <div className="p-6 space-y-6" data-name="settings" data-file="features/Settings.js">
        <h2 className="text-2xl font-bold mb-4">Settings</h2>
        
        <div className="glass-effect rounded-xl p-4">
          <h3 className="font-semibold mb-3">Appearance</h3>
          <div className="flex justify-between items-center">
            <div>
              <div className="font-medium">Theme</div>
              <div className="text-sm text-gray-600">Switch between light and dark mode</div>
            </div>
            <button
              onClick={() => {
                if (typeof soundManager !== 'undefined') {
                  soundManager.play('click');
                }
                onToggleTheme();
              }}
              className="w-14 h-7 bg-[var(--primary-color)] rounded-full relative transition-colors"
            >
              <div
                className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                  theme === 'dark' ? 'translate-x-8' : 'translate-x-1'
                }`}
              ></div>
            </button>
          </div>
        </div>

        <div className="glass-effect rounded-xl p-4">
          <h3 className="font-semibold mb-3">Account</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                JS
              </div>
              <div>
                <div className="font-medium">John Smith</div>
                <div className="text-sm text-gray-600">john.smith@university.edu</div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-effect rounded-xl p-4">
          <h3 className="font-semibold mb-3">Sound</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">Sound Effects</div>
                <div className="text-sm text-gray-600">Enable click and interaction sounds</div>
              </div>
              <button
                onClick={handleSoundToggle}
                className={`w-14 h-7 rounded-full relative transition-colors ${
                  soundEnabled ? 'bg-[var(--primary-color)]' : 'bg-gray-400'
                }`}
              >
                <div
                  className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                    soundEnabled ? 'translate-x-8' : 'translate-x-1'
                  }`}
                ></div>
              </button>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="font-medium">Volume</div>
                <div className="text-sm text-gray-600">{Math.round(soundVolume * 100)}%</div>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={soundVolume}
                onChange={handleVolumeChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                disabled={!soundEnabled}
              />
            </div>
          </div>
        </div>

        <div className="glass-effect rounded-xl p-4">
          <h3 className="font-semibold mb-3">Notifications</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className="text-sm">Assignment reminders</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="rounded" />
              <span className="text-sm">Grade updates</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span className="text-sm">Course announcements</span>
            </label>
          </div>
        </div>

        <div className="glass-effect rounded-xl p-4">
          <button
            onClick={() => {
              if (typeof soundManager !== 'undefined') {
                soundManager.play('click');
              }
              localStorage.removeItem('studentos-auth');
              window.location.href = 'login.html';
            }}
            className="w-full px-4 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="text-center text-sm text-gray-500 pt-4">
          StudentOS v1.0 © 2025
        </div>
      </div>
    );
  } catch (error) {
    console.error('Settings component error:', error);
    return null;
  }
}