// // pages/Login.jsx
// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import './Auth.css';

// const Login = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [errors, setErrors] = useState({});
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.email) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Email is invalid';
//     }
//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//     }
//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newErrors = validateForm();
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     setIsLoading(true);
//     // Simulate API call
//     setTimeout(() => {
//       setIsLoading(false);
//       // Store user data in localStorage if remember me is checked
//       if (rememberMe) {
//         localStorage.setItem('user', JSON.stringify({ email: formData.email }));
//       }
//       sessionStorage.setItem('isLoggedIn', 'true');
//       navigate('/');
//     }, 1000);
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-card">
//         <div className="auth-header">
//           <h1>Welcome Back</h1>
//           <p>Sign in to your account</p>
//         </div>

//         <form onSubmit={handleSubmit} className="auth-form">
//           <div className="form-group">
//             <label htmlFor="email">Email Address</label>
//             <div className="input-wrapper">
//               <span className="input-icon">📧</span>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 placeholder="Enter your email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className={errors.email ? 'error' : ''}
//               />
//             </div>
//             {errors.email && <span className="error-message">{errors.email}</span>}
//           </div>

//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <div className="input-wrapper">
//               <span className="input-icon">🔒</span>
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 id="password"
//                 name="password"
//                 placeholder="Enter your password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className={errors.password ? 'error' : ''}
//               />
//               <button
//                 type="button"
//                 className="password-toggle"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? '👁️' : '👁️‍🗨️'}
//               </button>
//             </div>
//             {errors.password && <span className="error-message">{errors.password}</span>}
//           </div>

//           <div className="form-options">
//             <label className="checkbox-label">
//               <input
//                 type="checkbox"
//                 checked={rememberMe}
//                 onChange={(e) => setRememberMe(e.target.checked)}
//               />
//               <span>Remember me</span>
//             </label>
//             <Link to="/forgot-password" className="forgot-link">
//               Forgot Password?
//             </Link>
//           </div>

//           <button type="submit" className="auth-btn" disabled={isLoading}>
//             {isLoading ? 'Signing in...' : 'Sign In'}
//           </button>

//           <div className="auth-divider">
//             <span>or continue with</span>
//           </div>

//           <div className="social-login">
//             <button type="button" className="social-btn google">
//               <span>G</span> Google
//             </button>
//             <button type="button" className="social-btn facebook">
//               <span>f</span> Facebook
//             </button>
//             <button type="button" className="social-btn apple">
//               <span>🍎</span> Apple
//             </button>
//           </div>

//           <p className="auth-footer">
//             Don't have an account? <Link to="/register">Sign Up</Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;



import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginStart, loginSuccess, loginFailure } from '../redux/slices/authSlice';
import { authAPI } from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      dispatch(loginStart());
      const response = await authAPI.login(email, password);
      
      // The response should contain user data with token
      dispatch(loginSuccess(response));
      
      // Redirect based on role
      if (response.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
      alert(error.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Login to Your Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="demo-credentials">
          <p>Demo Credentials:</p>
          <p><strong>Admin:</strong> admin@shop.co / admin123</p>
          <p><strong>User:</strong> user@example.com / user123</p>
        </div>
        
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
      
      <style jsx>{`
        .auth-page {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 80vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px;
        }
        .auth-container {
          background: white;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
          width: 100%;
          max-width: 450px;
        }
        .auth-container h2 {
          margin-bottom: 30px;
          text-align: center;
          color: #333;
        }
        .form-group {
          margin-bottom: 20px;
        }
        .auth-container input {
          width: 100%;
          padding: 14px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 16px;
          transition: border-color 0.3s;
        }
        .auth-container input:focus {
          outline: none;
          border-color: #667eea;
        }
        .auth-container button {
          width: 100%;
          padding: 14px;
          font-size: 16px;
          font-weight: 600;
          margin-top: 10px;
        }
        .demo-credentials {
          margin: 20px 0;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 8px;
          font-size: 13px;
        }
        .demo-credentials p {
          margin: 5px 0;
        }
        .auth-container p {
          margin-top: 20px;
          text-align: center;
        }
        .auth-container a {
          color: #667eea;
          text-decoration: none;
        }
        .auth-container a:hover {
          text-decoration: underline;
        }
        @media (max-width: 768px) {
          .auth-container {
            padding: 30px 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;