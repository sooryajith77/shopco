// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { logout } from '../redux/slices/authSlice';

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const { isAuthenticated, user } = useSelector((state) => state.auth);
//   const { items } = useSelector((state) => state.cart);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate('/');
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       navigate(`/products?search=${searchQuery}`);
//       setSearchQuery('');
//     }
//   };

//   const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

//   return (
//     <nav className="navbar">
//       <div className="container">
//         <div className="navbar-content">
//           <Link to="/" className="logo">
//             SHOP.CO
//           </Link>

//           <div className="nav-links">
//             <Link to="/products">Shop</Link>
//             <Link to="/products?filter=onsale">On Sale</Link>
//             <Link to="/products?filter=new">New Arrivals</Link>
//             <Link to="/products?filter=brands">Brands</Link>
//           </div>

//           <form className="search-form" onSubmit={handleSearch}>
//             <input
//               type="text"
//               className="search-input"
//               placeholder="Search for products..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <button type="submit" className="search-submit">🔍</button>
//           </form>

//           <div className="nav-actions">
//             <Link to="/cart" className="cart-btn">
//               🛒 {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
//             </Link>
//             {isAuthenticated ? (
//               <div className="user-menu">
//                 <button className="user-btn">
//                   👤 {user?.name?.split(' ')[0] || 'User'}
//                 </button>
//                 <div className="dropdown">
//                   <Link to="/profile">My Profile</Link>
//                   <Link to="/orders">My Orders</Link>
//                   <Link to="/wishlist">Wishlist</Link>
//                   <button onClick={handleLogout}>Logout</button>
//                 </div>
//               </div>
//             ) : (
//               <Link to="/login" className="login-btn">
//                 👤 Login
//               </Link>
//             )}
//           </div>

//           <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
//             ☰
//           </button>
//         </div>

//         {isMenuOpen && (
//           <div className="mobile-menu">
//             <Link to="/products">Shop</Link>
//             <Link to="/products?filter=onsale">On Sale</Link>
//             <Link to="/products?filter=new">New Arrivals</Link>
//             <Link to="/products?filter=brands">Brands</Link>
//             <div className="mobile-search">
//               <form onSubmit={handleSearch}>
//                 <input
//                   type="text"
//                   placeholder="Search for products..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//                 <button type="submit">🔍</button>
//               </form>
//             </div>
//             {!isAuthenticated && <Link to="/login">Login</Link>}
//           </div>
//         )}
//       </div>

//       <style jsx>{`
//         .navbar {
//           background: white;
//           box-shadow: 0 2px 4px rgba(0,0,0,0.1);
//           position: sticky;
//           top: 0;
//           z-index: 1000;
//         }
        
//         .container {
//           max-width: 1200px;
//           margin: 0 auto;
//           padding: 0 20px;
//         }
        
//         .navbar-content {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           padding: 20px 0;
//           gap: 30px;
//         }
        
//         .logo {
//           font-size: 28px;
//           font-weight: 700;
//           text-decoration: none;
//           color: #000;
//           white-space: nowrap;
//         }
        
//         .nav-links {
//           display: flex;
//           gap: 30px;
//         }
        
//         .nav-links a {
//           text-decoration: none;
//           color: #333;
//           font-weight: 500;
//           transition: color 0.3s ease;
//         }
        
//         .nav-links a:hover {
//           color: #000;
//         }
        
//         .search-form {
//           flex: 1;
//           max-width: 400px;
//           position: relative;
//         }
        
//         .search-input {
//           width: 100%;
//           padding: 10px 40px 10px 15px;
//           border: 1px solid #e0e0e0;
//           border-radius: 25px;
//           font-size: 14px;
//           background-color: #f5f5f5;
//           transition: all 0.3s ease;
//         }
        
//         .search-input:focus {
//           outline: none;
//           border-color: #000;
//           background-color: #fff;
//         }
        
//         .search-submit {
//           position: absolute;
//           right: 12px;
//           top: 50%;
//           transform: translateY(-50%);
//           background: none;
//           border: none;
//           cursor: pointer;
//           font-size: 16px;
//           color: #666;
//         }
        
//         .nav-actions {
//           display: flex;
//           gap: 20px;
//           align-items: center;
//         }
        
//         .cart-btn, .login-btn, .user-btn {
//           background: none;
//           border: none;
//           font-size: 20px;
//           cursor: pointer;
//           text-decoration: none;
//           color: #333;
//           position: relative;
//           transition: color 0.3s ease;
//         }
        
//         .cart-btn:hover, .login-btn:hover, .user-btn:hover {
//           color: #000;
//         }
        
//         .cart-count {
//           position: absolute;
//           top: -8px;
//           right: -8px;
//           background: #ff3b30;
//           color: white;
//           border-radius: 50%;
//           padding: 2px 6px;
//           font-size: 11px;
//           font-weight: 600;
//           min-width: 18px;
//           text-align: center;
//         }
        
//         .user-menu {
//           position: relative;
//         }
        
//         .dropdown {
//           display: none;
//           position: absolute;
//           top: 100%;
//           right: 0;
//           background: white;
//           box-shadow: 0 4px 12px rgba(0,0,0,0.15);
//           border-radius: 8px;
//           min-width: 160px;
//           z-index: 100;
//           margin-top: 10px;
//         }
        
//         .user-menu:hover .dropdown {
//           display: flex;
//           flex-direction: column;
//         }
        
//         .dropdown a, .dropdown button {
//           padding: 12px 16px;
//           text-decoration: none;
//           color: #333;
//           background: none;
//           border: none;
//           text-align: left;
//           cursor: pointer;
//           font-size: 14px;
//           transition: background 0.2s ease;
//         }
        
//         .dropdown a:hover, .dropdown button:hover {
//           background: #f5f5f5;
//         }
        
//         .dropdown a:first-child {
//           border-radius: 8px 8px 0 0;
//         }
        
//         .dropdown button:last-child {
//           border-radius: 0 0 8px 8px;
//           color: #ff3b30;
//         }
        
//         .mobile-menu-btn {
//           display: none;
//           font-size: 24px;
//           background: none;
//           border: none;
//           cursor: pointer;
//         }
        
//         .mobile-menu {
//           display: none;
//           flex-direction: column;
//           padding: 20px 0;
//           gap: 15px;
//           border-top: 1px solid #e0e0e0;
//         }
        
//         .mobile-menu a {
//           text-decoration: none;
//           color: #333;
//           font-size: 16px;
//           padding: 8px 0;
//         }
        
//         .mobile-search {
//           margin: 10px 0;
//         }
        
//         .mobile-search form {
//           display: flex;
//           gap: 10px;
//         }
        
//         .mobile-search input {
//           flex: 1;
//           padding: 10px 15px;
//           border: 1px solid #e0e0e0;
//           border-radius: 25px;
//           font-size: 14px;
//         }
        
//         .mobile-search button {
//           padding: 10px 20px;
//           background: #000;
//           color: white;
//           border: none;
//           border-radius: 25px;
//           cursor: pointer;
//         }
        
//         @media (max-width: 968px) {
//           .navbar-content {
//             gap: 20px;
//           }
          
//           .nav-links {
//             gap: 20px;
//           }
//         }
        
//         @media (max-width: 768px) {
//           .nav-links, .search-form, .nav-actions {
//             display: none;
//           }
          
//           .mobile-menu-btn {
//             display: block;
//           }
          
//           .mobile-menu {
//             display: flex;
//           }
          
//           .navbar-content {
//             padding: 15px 0;
//           }
//         }
//       `}</style>
//     </nav>
//   );
// };

// export default Navbar;




import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
      setSearchQuery('');
    }
  };

  const cartItemCount = items?.reduce((total, item) => total + item.quantity, 0) || 0;

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="logo">
            SHOP.CO
          </Link>

          <div className="nav-links">
            <Link to="/products">Shop</Link>
            <Link to="/products?filter=onsale">On Sale</Link>
            <Link to="/products?filter=new">New Arrivals</Link>
            <Link to="/products?filter=brands">Brands</Link>
          </div>

          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              className="search-input"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-submit">🔍</button>
          </form>

          <div className="nav-actions">
            <Link to="/cart" className="cart-btn">
              🛒 {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
            </Link>
            {isAuthenticated ? (
              <div className="user-menu">
                <button className="user-btn">
                  👤 {user?.name?.split(' ')[0] || 'User'}
                </button>
                <div className="dropdown">
                  <Link to="/profile">My Profile</Link>
                  <Link to="/orders">My Orders</Link>
                  <Link to="/wishlist">Wishlist</Link>
                  {/* Admin Panel Link - Only visible to admin users */}
                  {user?.role === 'admin' && (
                    <Link to="/admin" className="admin-link">
                      👑 Admin Panel
                    </Link>
                  )}
                  <button onClick={handleLogout}>Logout</button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="login-btn">
                👤 Login
              </Link>
            )}
          </div>

          <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            ☰
          </button>
        </div>

        {isMenuOpen && (
          <div className="mobile-menu">
            <Link to="/products">Shop</Link>
            <Link to="/products?filter=onsale">On Sale</Link>
            <Link to="/products?filter=new">New Arrivals</Link>
            <Link to="/products?filter=brands">Brands</Link>
            <div className="mobile-search">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit">🔍</button>
              </form>
            </div>
            {isAuthenticated ? (
              <>
                <Link to="/profile">My Profile</Link>
                <Link to="/orders">My Orders</Link>
                <Link to="/wishlist">Wishlist</Link>
                {user?.role === 'admin' && (
                  <Link to="/admin" className="admin-link">👑 Admin Panel</Link>
                )}
                <button onClick={handleLogout} className="mobile-logout">Logout</button>
              </>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        .navbar {
          background: white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          position: sticky;
          top: 0;
          z-index: 1000;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        .navbar-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 0;
          gap: 30px;
        }
        
        .logo {
          font-size: 28px;
          font-weight: 700;
          text-decoration: none;
          color: #000;
          white-space: nowrap;
        }
        
        .nav-links {
          display: flex;
          gap: 30px;
        }
        
        .nav-links a {
          text-decoration: none;
          color: #333;
          font-weight: 500;
          transition: color 0.3s ease;
        }
        
        .nav-links a:hover {
          color: #000;
        }
        
        .search-form {
          flex: 1;
          max-width: 400px;
          position: relative;
        }
        
        .search-input {
          width: 100%;
          padding: 10px 40px 10px 15px;
          border: 1px solid #e0e0e0;
          border-radius: 25px;
          font-size: 14px;
          background-color: #f5f5f5;
          transition: all 0.3s ease;
        }
        
        .search-input:focus {
          outline: none;
          border-color: #000;
          background-color: #fff;
        }
        
        .search-submit {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          font-size: 16px;
          color: #666;
        }
        
        .nav-actions {
          display: flex;
          gap: 20px;
          align-items: center;
        }
        
        .cart-btn, .login-btn, .user-btn {
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          text-decoration: none;
          color: #333;
          position: relative;
          transition: color 0.3s ease;
        }
        
        .cart-btn:hover, .login-btn:hover, .user-btn:hover {
          color: #000;
        }
        
        .cart-count {
          position: absolute;
          top: -8px;
          right: -8px;
          background: #ff3b30;
          color: white;
          border-radius: 50%;
          padding: 2px 6px;
          font-size: 11px;
          font-weight: 600;
          min-width: 18px;
          text-align: center;
        }
        
        .user-menu {
          position: relative;
        }
        
        .dropdown {
          display: none;
          position: absolute;
          top: 100%;
          right: 0;
          background: white;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          border-radius: 8px;
          min-width: 180px;
          z-index: 100;
          margin-top: 10px;
        }
        
        .user-menu:hover .dropdown {
          display: flex;
          flex-direction: column;
        }
        
        .dropdown a, .dropdown button {
          padding: 12px 16px;
          text-decoration: none;
          color: #333;
          background: none;
          border: none;
          text-align: left;
          cursor: pointer;
          font-size: 14px;
          transition: background 0.2s ease;
        }
        
        .dropdown a:hover, .dropdown button:hover {
          background: #f5f5f5;
        }
        
        .dropdown a:first-child {
          border-radius: 8px 8px 0 0;
        }
        
        .dropdown button:last-child {
          border-radius: 0 0 8px 8px;
          color: #ff3b30;
        }
        
        .admin-link {
          color: #667eea !important;
          border-top: 1px solid #e0e0e0;
          font-weight: 600;
        }
        
        .admin-link:hover {
          background: #f0f0ff !important;
        }
        
        .mobile-menu-btn {
          display: none;
          font-size: 24px;
          background: none;
          border: none;
          cursor: pointer;
        }
        
        .mobile-menu {
          display: none;
          flex-direction: column;
          padding: 20px 0;
          gap: 15px;
          border-top: 1px solid #e0e0e0;
        }
        
        .mobile-menu a {
          text-decoration: none;
          color: #333;
          font-size: 16px;
          padding: 8px 0;
        }
        
        .mobile-menu .admin-link {
          color: #667eea;
          font-weight: 600;
        }
        
        .mobile-search {
          margin: 10px 0;
        }
        
        .mobile-search form {
          display: flex;
          gap: 10px;
        }
        
        .mobile-search input {
          flex: 1;
          padding: 10px 15px;
          border: 1px solid #e0e0e0;
          border-radius: 25px;
          font-size: 14px;
        }
        
        .mobile-search button {
          padding: 10px 20px;
          background: #000;
          color: white;
          border: none;
          border-radius: 25px;
          cursor: pointer;
        }
        
        .mobile-logout {
          background: none;
          border: none;
          color: #ff3b30;
          font-size: 16px;
          padding: 8px 0;
          text-align: left;
          cursor: pointer;
        }
        
        @media (max-width: 968px) {
          .navbar-content {
            gap: 20px;
          }
          
          .nav-links {
            gap: 20px;
          }
        }
        
        @media (max-width: 768px) {
          .nav-links, .search-form, .nav-actions {
            display: none;
          }
          
          .mobile-menu-btn {
            display: block;
          }
          
          .mobile-menu {
            display: flex;
          }
          
          .navbar-content {
            padding: 15px 0;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;