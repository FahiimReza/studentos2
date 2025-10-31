# Authentication System

## Default Credentials
- Email: `admin`
- Password: `admin123`

## Pages
- **login.html**: Login page for existing users
- **register.html**: Registration page for new users
- **index.html**: Main application (requires authentication)

## How It Works
- Uses localStorage to store authentication status
- On app load, checks for authentication token
- Redirects to login page if not authenticated
- Logout button available in Settings

## File Structure
- `auth/LoginPage.js`: Login page component
- `auth/RegisterPage.js`: Registration page component