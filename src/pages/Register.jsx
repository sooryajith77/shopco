// // pages/Register.jsx
// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import '../pages/Auth.css';

// const Register = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     password: '',
//     confirmPassword: ''
//   });
//   const [errors, setErrors] = useState({});
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [agreeTerms, setAgreeTerms] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.fullName) {
//       newErrors.fullName = 'Full name is required';
//     } else if (formData.fullName.length < 3) {
//       newErrors.fullName = 'Name must be at least 3 characters';
//     }
    
//     if (!formData.email) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Email is invalid';
//     }
    
//     if (!formData.phone) {
//       newErrors.phone = 'Phone number is required';
//     } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
//       newErrors.phone = 'Please enter a valid 10-digit phone number';
//     }
    
//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//     } else if (!/(?=.*[A-Z])/.test(formData.password)) {
//       newErrors.password = 'Password must contain at least 1 uppercase letter';
//     } else if (!/(?=.*[0-9])/.test(formData.password)) {
//       newErrors.password = 'Password must contain at least 1 number';
//     }
    
//     if (!formData.confirmPassword) {
//       newErrors.confirmPassword = 'Please confirm your password';
//     } else if (formData.confirmPassword !== formData.password) {
//       newErrors.confirmPassword = 'Passwords do not match';
//     }
    
//     if (!agreeTerms) {
//       newErrors.terms = 'You must agree to the terms and conditions';
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
//       // Store user data
//       localStorage.setItem('user', JSON.stringify({ 
//         name: formData.fullName, 
//         email: formData.email 
//       }));
//       sessionStorage.setItem('isLoggedIn', 'true');
//       navigate('/');
//     }, 1000);
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-card register-card">
//         <div className="auth-header">
//           <h1>Create Account</h1>
//           <p>Join us and start shopping</p>
//         </div>

//         <form onSubmit={handleSubmit} className="auth-form">
//           <div className="form-group">
//             <label htmlFor="fullName">Full Name</label>
//             <div className="input-wrapper">
//               <span className="input-icon">👤</span>
//               <input
//                 type="text"
//                 id="fullName"
//                 name="fullName"
//                 placeholder="Enter your full name"
//                 value={formData.fullName}
//                 onChange={handleChange}
//                 className={errors.fullName ? 'error' : ''}
//               />
//             </div>
//             {errors.fullName && <span className="error-message">{errors.fullName}</span>}
//           </div>

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
//             <label htmlFor="phone">Phone Number</label>
//             <div className="input-wrapper">
//               <span className="input-icon">📱</span>
//               <input
//                 type="tel"
//                 id="phone"
//                 name="phone"
//                 placeholder="Enter your phone number"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 className={errors.phone ? 'error' : ''}
//               />
//             </div>
//             {errors.phone && <span className="error-message">{errors.phone}</span>}
//           </div>

//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <div className="input-wrapper">
//               <span className="input-icon">🔒</span>
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 id="password"
//                 name="password"
//                 placeholder="Create a password"
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
//             <div className="password-hint">
//               Must contain at least 6 characters, 1 uppercase letter, and 1 number
//             </div>
//           </div>

//           <div className="form-group">
//             <label htmlFor="confirmPassword">Confirm Password</label>
//             <div className="input-wrapper">
//               <span className="input-icon">🔒</span>
//               <input
//                 type={showConfirmPassword ? 'text' : 'password'}
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 placeholder="Confirm your password"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 className={errors.confirmPassword ? 'error' : ''}
//               />
//               <button
//                 type="button"
//                 className="password-toggle"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               >
//                 {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
//               </button>
//             </div>
//             {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
//           </div>

//           <div className="form-options">
//             <label className="checkbox-label">
//               <input
//                 type="checkbox"
//                 checked={agreeTerms}
//                 onChange={(e) => setAgreeTerms(e.target.checked)}
//               />
//               <span>
//                 I agree to the <Link to="/terms">Terms of Service</Link> and{' '}
//                 <Link to="/privacy">Privacy Policy</Link>
//               </span>
//             </label>
//             {errors.terms && <span className="error-message">{errors.terms}</span>}
//           </div>

//           <button type="submit" className="auth-btn" disabled={isLoading}>
//             {isLoading ? 'Creating Account...' : 'Create Account'}
//           </button>

//           <div className="auth-divider">
//             <span>or sign up with</span>
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
//             Already have an account? <Link to="/login">Sign In</Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;



import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { registerStart, registerSuccess, registerFailure } from '../redux/slices/authSlice';
import { authAPI } from '../services/api';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    if (password.length < 6) {
      alert('Password must be at least 6 characters long!');
      return;
    }
    
    setLoading(true);
    
    try {
      dispatch(registerStart());
      const response = await authAPI.register(name, email, password);
      
      // The response should contain user data with token
      dispatch(registerSuccess(response));
      
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (error) {
      dispatch(registerFailure(error.message));
      alert(error.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>
        
        <p>
          Already have an account? <Link to="/login">Login here</Link>
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

export default Register;