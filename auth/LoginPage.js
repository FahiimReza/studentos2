function LoginPage() {
  try {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const handleLogin = (e) => {
      e.preventDefault();
      setError('');
      setLoading(true);

      setTimeout(() => {
        if (email === 'admin' && password === 'admin123') {
          localStorage.setItem('studentos-auth', 'true');
          window.location.href = 'index.html';
        } else {
          setError('Invalid email or password');
          setLoading(false);
        }
      }, 500);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-[var(--bg-gradient-start)] to-[var(--bg-gradient-end)] flex items-center justify-center p-4" data-name="login-page" data-file="auth/LoginPage.js">
        <div className="w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/30">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                <div className="icon-graduation-cap text-4xl text-white"></div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">StudentOS</h1>
              <p className="text-gray-600 mt-2">Sign in to your account</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none transition-all"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none transition-all"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[var(--primary-color)] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <a href="register.html" className="text-[var(--primary-color)] font-semibold hover:underline">
                  Register here
                </a>
              </p>
            </div>
          </div>

          <div className="text-center mt-4 text-sm text-gray-600">
            StudentOS © 2025
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('LoginPage component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<LoginPage />);