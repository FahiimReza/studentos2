function RegisterPage() {
  try {
    const [formData, setFormData] = React.useState({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    const [error, setError] = React.useState('');
    const [success, setSuccess] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };

    const handleRegister = (e) => {
      e.preventDefault();
      setError('');
      setLoading(true);

      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }

      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        setLoading(false);
        return;
      }

      setTimeout(() => {
        setSuccess(true);
        setLoading(false);
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 2000);
      }, 500);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-[var(--bg-gradient-start)] to-[var(--bg-gradient-end)] flex items-center justify-center p-4" data-name="register-page" data-file="auth/RegisterPage.js">
        <div className="w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/30">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                <div className="icon-user-plus text-4xl text-white"></div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
              <p className="text-gray-600 mt-2">Join StudentOS today</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                  Account created successfully! Redirecting to login...
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none transition-all"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none transition-all"
                  placeholder="Create a password"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none transition-all"
                  placeholder="Confirm your password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading || success}
                className="w-full bg-[var(--primary-color)] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <a href="login.html" className="text-[var(--primary-color)] font-semibold hover:underline">
                  Sign in here
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
    console.error('RegisterPage component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RegisterPage />);