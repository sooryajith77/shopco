// // import React, { useState } from 'react';
// // import { Link, useNavigate } from 'react-router-dom';
// // import { useSelector, useDispatch } from 'react-redux';
// // import { logout } from '../redux/slices/authSlice';

// // const Navbar = () => {
// //   const [isMenuOpen, setIsMenuOpen] = useState(false);
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const { isAuthenticated, user } = useSelector((state) => state.auth);
// //   const { items } = useSelector((state) => state.cart);
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();

// //   const handleLogout = () => {
// //     dispatch(logout());
// //     navigate('/');
// //   };

// //   const handleSearch = (e) => {
// //     e.preventDefault();
// //     if (searchQuery.trim()) {
// //       navigate(`/products?search=${searchQuery}`);
// //       setSearchQuery('');
// //     }
// //   };

// //   const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

// //   return (
// //     <nav className="navbar">
// //       <div className="container">
// //         <div className="navbar-content">
// //           <Link to="/" className="logo">
// //             SHOP.CO
// //           </Link>

// //           <div className="nav-links">
// //             <Link to="/products">Shop</Link>
// //             <Link to="/products?filter=onsale">On Sale</Link>
// //             <Link to="/products?filter=new">New Arrivals</Link>
// //             <Link to="/products?filter=brands">Brands</Link>
// //           </div>

// //           <form className="search-form" onSubmit={handleSearch}>
// //             <input
// //               type="text"
// //               className="search-input"
// //               placeholder="Search for products..."
// //               value={searchQuery}
// //               onChange={(e) => setSearchQuery(e.target.value)}
// //             />
// //             <button type="submit" className="search-submit">🔍</button>
// //           </form>

// //           <div className="nav-actions">
// //             <Link to="/cart" className="cart-btn">
// //               🛒 {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
// //             </Link>
// //             {isAuthenticated ? (
// //               <div className="user-menu">
// //                 <button className="user-btn">
// //                   👤 {user?.name?.split(' ')[0] || 'User'}
// //                 </button>
// //                 <div className="dropdown">
// //                   <Link to="/profile">My Profile</Link>
// //                   <Link to="/orders">My Orders</Link>
// //                   <Link to="/wishlist">Wishlist</Link>
// //                   <button onClick={handleLogout}>Logout</button>
// //                 </div>
// //               </div>
// //             ) : (
// //               <Link to="/login" className="login-btn">
// //                 👤 Login
// //               </Link>
// //             )}
// //           </div>

// //           <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
// //             ☰
// //           </button>
// //         </div>

// //         {isMenuOpen && (
// //           <div className="mobile-menu">
// //             <Link to="/products">Shop</Link>
// //             <Link to="/products?filter=onsale">On Sale</Link>
// //             <Link to="/products?filter=new">New Arrivals</Link>
// //             <Link to="/products?filter=brands">Brands</Link>
// //             <div className="mobile-search">
// //               <form onSubmit={handleSearch}>
// //                 <input
// //                   type="text"
// //                   placeholder="Search for products..."
// //                   value={searchQuery}
// //                   onChange={(e) => setSearchQuery(e.target.value)}
// //                 />
// //                 <button type="submit">🔍</button>
// //               </form>
// //             </div>
// //             {!isAuthenticated && <Link to="/login">Login</Link>}
// //           </div>
// //         )}
// //       </div>

// //       <style jsx>{`
// //         .navbar {
// //           background: white;
// //           box-shadow: 0 2px 4px rgba(0,0,0,0.1);
// //           position: sticky;
// //           top: 0;
// //           z-index: 1000;
// //         }
        
// //         .container {
// //           max-width: 1200px;
// //           margin: 0 auto;
// //           padding: 0 20px;
// //         }
        
// //         .navbar-content {
// //           display: flex;
// //           justify-content: space-between;
// //           align-items: center;
// //           padding: 20px 0;
// //           gap: 30px;
// //         }
        
// //         .logo {
// //           font-size: 28px;
// //           font-weight: 700;
// //           text-decoration: none;
// //           color: #000;
// //           white-space: nowrap;
// //         }
        
// //         .nav-links {
// //           display: flex;
// //           gap: 30px;
// //         }
        
// //         .nav-links a {
// //           text-decoration: none;
// //           color: #333;
// //           font-weight: 500;
// //           transition: color 0.3s ease;
// //         }
        
// //         .nav-links a:hover {
// //           color: #000;
// //         }
        
// //         .search-form {
// //           flex: 1;
// //           max-width: 400px;
// //           position: relative;
// //         }
        
// //         .search-input {
// //           width: 100%;
// //           padding: 10px 40px 10px 15px;
// //           border: 1px solid #e0e0e0;
// //           border-radius: 25px;
// //           font-size: 14px;
// //           background-color: #f5f5f5;
// //           transition: all 0.3s ease;
// //         }
        
// //         .search-input:focus {
// //           outline: none;
// //           border-color: #000;
// //           background-color: #fff;
// //         }
        
// //         .search-submit {
// //           position: absolute;
// //           right: 12px;
// //           top: 50%;
// //           transform: translateY(-50%);
// //           background: none;
// //           border: none;
// //           cursor: pointer;
// //           font-size: 16px;
// //           color: #666;
// //         }
        
// //         .nav-actions {
// //           display: flex;
// //           gap: 20px;
// //           align-items: center;
// //         }
        
// //         .cart-btn, .login-btn, .user-btn {
// //           background: none;
// //           border: none;
// //           font-size: 20px;
// //           cursor: pointer;
// //           text-decoration: none;
// //           color: #333;
// //           position: relative;
// //           transition: color 0.3s ease;
// //         }
        
// //         .cart-btn:hover, .login-btn:hover, .user-btn:hover {
// //           color: #000;
// //         }
        
// //         .cart-count {
// //           position: absolute;
// //           top: -8px;
// //           right: -8px;
// //           background: #ff3b30;
// //           color: white;
// //           border-radius: 50%;
// //           padding: 2px 6px;
// //           font-size: 11px;
// //           font-weight: 600;
// //           min-width: 18px;
// //           text-align: center;
// //         }
        
// //         .user-menu {
// //           position: relative;
// //         }
        
// //         .dropdown {
// //           display: none;
// //           position: absolute;
// //           top: 100%;
// //           right: 0;
// //           background: white;
// //           box-shadow: 0 4px 12px rgba(0,0,0,0.15);
// //           border-radius: 8px;
// //           min-width: 160px;
// //           z-index: 100;
// //           margin-top: 10px;
// //         }
        
// //         .user-menu:hover .dropdown {
// //           display: flex;
// //           flex-direction: column;
// //         }
        
// //         .dropdown a, .dropdown button {
// //           padding: 12px 16px;
// //           text-decoration: none;
// //           color: #333;
// //           background: none;
// //           border: none;
// //           text-align: left;
// //           cursor: pointer;
// //           font-size: 14px;
// //           transition: background 0.2s ease;
// //         }
        
// //         .dropdown a:hover, .dropdown button:hover {
// //           background: #f5f5f5;
// //         }
        
// //         .dropdown a:first-child {
// //           border-radius: 8px 8px 0 0;
// //         }
        
// //         .dropdown button:last-child {
// //           border-radius: 0 0 8px 8px;
// //           color: #ff3b30;
// //         }
        
// //         .mobile-menu-btn {
// //           display: none;
// //           font-size: 24px;
// //           background: none;
// //           border: none;
// //           cursor: pointer;
// //         }
        
// //         .mobile-menu {
// //           display: none;
// //           flex-direction: column;
// //           padding: 20px 0;
// //           gap: 15px;
// //           border-top: 1px solid #e0e0e0;
// //         }
        
// //         .mobile-menu a {
// //           text-decoration: none;
// //           color: #333;
// //           font-size: 16px;
// //           padding: 8px 0;
// //         }
        
// //         .mobile-search {
// //           margin: 10px 0;
// //         }
        
// //         .mobile-search form {
// //           display: flex;
// //           gap: 10px;
// //         }
        
// //         .mobile-search input {
// //           flex: 1;
// //           padding: 10px 15px;
// //           border: 1px solid #e0e0e0;
// //           border-radius: 25px;
// //           font-size: 14px;
// //         }
        
// //         .mobile-search button {
// //           padding: 10px 20px;
// //           background: #000;
// //           color: white;
// //           border: none;
// //           border-radius: 25px;
// //           cursor: pointer;
// //         }
        
// //         @media (max-width: 968px) {
// //           .navbar-content {
// //             gap: 20px;
// //           }
          
// //           .nav-links {
// //             gap: 20px;
// //           }
// //         }
        
// //         @media (max-width: 768px) {
// //           .nav-links, .search-form, .nav-actions {
// //             display: none;
// //           }
          
// //           .mobile-menu-btn {
// //             display: block;
// //           }
          
// //           .mobile-menu {
// //             display: flex;
// //           }
          
// //           .navbar-content {
// //             padding: 15px 0;
// //           }
// //         }
// //       `}</style>
// //     </nav>
// //   );
// // };

// // export default Navbar;




// // import React, { useState } from 'react';
// // import { Link, useNavigate } from 'react-router-dom';
// // import { useSelector, useDispatch } from 'react-redux';
// // import { logout } from '../redux/slices/authSlice';

// // const Navbar = () => {
// //   const [isMenuOpen, setIsMenuOpen] = useState(false);
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const { isAuthenticated, user } = useSelector((state) => state.auth);
// //   const { items } = useSelector((state) => state.cart);
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();

// //   const handleLogout = () => {
// //     dispatch(logout());
// //     navigate('/');
// //   };

// //   const handleSearch = (e) => {
// //     e.preventDefault();
// //     if (searchQuery.trim()) {
// //       navigate(`/products?search=${searchQuery}`);
// //       setSearchQuery('');
// //     }
// //   };

// //   const cartItemCount = items?.reduce((total, item) => total + item.quantity, 0) || 0;

// //   return (
// //     <nav className="navbar">
// //       <div className="container">
// //         <div className="navbar-content">
// //           <Link to="/" className="logo">
// //             SHOP.CO
// //           </Link>

// //           <div className="nav-links">
// //             <Link to="/products">Shop</Link>
// //             <Link to="/products?filter=onsale">On Sale</Link>
// //             <Link to="/products?filter=new">New Arrivals</Link>
// //             <Link to="/products?filter=brands">Brands</Link>
// //           </div>

// //           <form className="search-form" onSubmit={handleSearch}>
// //             <input
// //               type="text"
// //               className="search-input"
// //               placeholder="Search for products..."
// //               value={searchQuery}
// //               onChange={(e) => setSearchQuery(e.target.value)}
// //             />
// //             <button type="submit" className="search-submit">🔍</button>
// //           </form>

// //           <div className="nav-actions">
// //             <Link to="/cart" className="cart-btn">
// //               🛒 {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
// //             </Link>
// //             {isAuthenticated ? (
// //               <div className="user-menu">
// //                 <button className="user-btn">
// //                   👤 {user?.name?.split(' ')[0] || 'User'}
// //                 </button>
// //                 <div className="dropdown">
// //                   <Link to="/profile">My Profile</Link>
// //                   <Link to="/orders">My Orders</Link>
// //                   <Link to="/wishlist">Wishlist</Link>
// //                   {/* Admin Panel Link - Only visible to admin users */}
// //                   {user?.role === 'admin' && (
// //                     <Link to="/admin" className="admin-link">
// //                       👑 Admin Panel
// //                     </Link>
// //                   )}
// //                   <button onClick={handleLogout}>Logout</button>
// //                 </div>
// //               </div>
// //             ) : (
// //               <Link to="/login" className="login-btn">
// //                 👤 Login
// //               </Link>
// //             )}
// //           </div>

// //           <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
// //             ☰
// //           </button>
// //         </div>

// //         {isMenuOpen && (
// //           <div className="mobile-menu">
// //             <Link to="/products">Shop</Link>
// //             <Link to="/products?filter=onsale">On Sale</Link>
// //             <Link to="/products?filter=new">New Arrivals</Link>
// //             <Link to="/products?filter=brands">Brands</Link>
// //             <div className="mobile-search">
// //               <form onSubmit={handleSearch}>
// //                 <input
// //                   type="text"
// //                   placeholder="Search for products..."
// //                   value={searchQuery}
// //                   onChange={(e) => setSearchQuery(e.target.value)}
// //                 />
// //                 <button type="submit">🔍</button>
// //               </form>
// //             </div>
// //             {isAuthenticated ? (
// //               <>
// //                 <Link to="/profile">My Profile</Link>
// //                 <Link to="/orders">My Orders</Link>
// //                 <Link to="/wishlist">Wishlist</Link>
// //                 {user?.role === 'admin' && (
// //                   <Link to="/admin" className="admin-link">👑 Admin Panel</Link>
// //                 )}
// //                 <button onClick={handleLogout} className="mobile-logout">Logout</button>
// //               </>
// //             ) : (
// //               <Link to="/login">Login</Link>
// //             )}
// //           </div>
// //         )}
// //       </div>

// //       <style jsx>{`
// //         .navbar {
// //           background: white;
// //           box-shadow: 0 2px 4px rgba(0,0,0,0.1);
// //           position: sticky;
// //           top: 0;
// //           z-index: 1000;
// //         }
        
// //         .container {
// //           max-width: 1200px;
// //           margin: 0 auto;
// //           padding: 0 20px;
// //         }
        
// //         .navbar-content {
// //           display: flex;
// //           justify-content: space-between;
// //           align-items: center;
// //           padding: 20px 0;
// //           gap: 30px;
// //         }
        
// //         .logo {
// //           font-size: 28px;
// //           font-weight: 700;
// //           text-decoration: none;
// //           color: #000;
// //           white-space: nowrap;
// //         }
        
// //         .nav-links {
// //           display: flex;
// //           gap: 30px;
// //         }
        
// //         .nav-links a {
// //           text-decoration: none;
// //           color: #333;
// //           font-weight: 500;
// //           transition: color 0.3s ease;
// //         }
        
// //         .nav-links a:hover {
// //           color: #000;
// //         }
        
// //         .search-form {
// //           flex: 1;
// //           max-width: 400px;
// //           position: relative;
// //         }
        
// //         .search-input {
// //           width: 100%;
// //           padding: 10px 40px 10px 15px;
// //           border: 1px solid #e0e0e0;
// //           border-radius: 25px;
// //           font-size: 14px;
// //           background-color: #f5f5f5;
// //           transition: all 0.3s ease;
// //         }
        
// //         .search-input:focus {
// //           outline: none;
// //           border-color: #000;
// //           background-color: #fff;
// //         }
        
// //         .search-submit {
// //           position: absolute;
// //           right: 12px;
// //           top: 50%;
// //           transform: translateY(-50%);
// //           background: none;
// //           border: none;
// //           cursor: pointer;
// //           font-size: 16px;
// //           color: #666;
// //         }
        
// //         .nav-actions {
// //           display: flex;
// //           gap: 20px;
// //           align-items: center;
// //         }
        
// //         .cart-btn, .login-btn, .user-btn {
// //           background: none;
// //           border: none;
// //           font-size: 20px;
// //           cursor: pointer;
// //           text-decoration: none;
// //           color: #333;
// //           position: relative;
// //           transition: color 0.3s ease;
// //         }
        
// //         .cart-btn:hover, .login-btn:hover, .user-btn:hover {
// //           color: #000;
// //         }
        
// //         .cart-count {
// //           position: absolute;
// //           top: -8px;
// //           right: -8px;
// //           background: #ff3b30;
// //           color: white;
// //           border-radius: 50%;
// //           padding: 2px 6px;
// //           font-size: 11px;
// //           font-weight: 600;
// //           min-width: 18px;
// //           text-align: center;
// //         }
        
// //         .user-menu {
// //           position: relative;
// //         }
        
// //         .dropdown {
// //           display: none;
// //           position: absolute;
// //           top: 100%;
// //           right: 0;
// //           background: white;
// //           box-shadow: 0 4px 12px rgba(0,0,0,0.15);
// //           border-radius: 8px;
// //           min-width: 180px;
// //           z-index: 100;
// //           margin-top: 10px;
// //         }
        
// //         .user-menu:hover .dropdown {
// //           display: flex;
// //           flex-direction: column;
// //         }
        
// //         .dropdown a, .dropdown button {
// //           padding: 12px 16px;
// //           text-decoration: none;
// //           color: #333;
// //           background: none;
// //           border: none;
// //           text-align: left;
// //           cursor: pointer;
// //           font-size: 14px;
// //           transition: background 0.2s ease;
// //         }
        
// //         .dropdown a:hover, .dropdown button:hover {
// //           background: #f5f5f5;
// //         }
        
// //         .dropdown a:first-child {
// //           border-radius: 8px 8px 0 0;
// //         }
        
// //         .dropdown button:last-child {
// //           border-radius: 0 0 8px 8px;
// //           color: #ff3b30;
// //         }
        
// //         .admin-link {
// //           color: #667eea !important;
// //           border-top: 1px solid #e0e0e0;
// //           font-weight: 600;
// //         }
        
// //         .admin-link:hover {
// //           background: #f0f0ff !important;
// //         }
        
// //         .mobile-menu-btn {
// //           display: none;
// //           font-size: 24px;
// //           background: none;
// //           border: none;
// //           cursor: pointer;
// //         }
        
// //         .mobile-menu {
// //           display: none;
// //           flex-direction: column;
// //           padding: 20px 0;
// //           gap: 15px;
// //           border-top: 1px solid #e0e0e0;
// //         }
        
// //         .mobile-menu a {
// //           text-decoration: none;
// //           color: #333;
// //           font-size: 16px;
// //           padding: 8px 0;
// //         }
        
// //         .mobile-menu .admin-link {
// //           color: #667eea;
// //           font-weight: 600;
// //         }
        
// //         .mobile-search {
// //           margin: 10px 0;
// //         }
        
// //         .mobile-search form {
// //           display: flex;
// //           gap: 10px;
// //         }
        
// //         .mobile-search input {
// //           flex: 1;
// //           padding: 10px 15px;
// //           border: 1px solid #e0e0e0;
// //           border-radius: 25px;
// //           font-size: 14px;
// //         }
        
// //         .mobile-search button {
// //           padding: 10px 20px;
// //           background: #000;
// //           color: white;
// //           border: none;
// //           border-radius: 25px;
// //           cursor: pointer;
// //         }
        
// //         .mobile-logout {
// //           background: none;
// //           border: none;
// //           color: #ff3b30;
// //           font-size: 16px;
// //           padding: 8px 0;
// //           text-align: left;
// //           cursor: pointer;
// //         }
        
// //         @media (max-width: 968px) {
// //           .navbar-content {
// //             gap: 20px;
// //           }
          
// //           .nav-links {
// //             gap: 20px;
// //           }
// //         }
        
// //         @media (max-width: 768px) {
// //           .nav-links, .search-form, .nav-actions {
// //             display: none;
// //           }
          
// //           .mobile-menu-btn {
// //             display: block;
// //           }
          
// //           .mobile-menu {
// //             display: flex;
// //           }
          
// //           .navbar-content {
// //             padding: 15px 0;
// //           }
// //         }
// //       `}</style>
// //     </nav>
// //   );
// // };

// // export default Navbar;


// // import React, { useState, useEffect, useRef } from 'react';
// // import { Link, useNavigate, useLocation } from 'react-router-dom';
// // import { useSelector, useDispatch } from 'react-redux';
// // import { logout } from '../redux/slices/authSlice';

// // const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// // const Navbar = () => {
// //   const [isMenuOpen, setIsMenuOpen] = useState(false);
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [searchResults, setSearchResults] = useState([]);
// //   const [showSuggestions, setShowSuggestions] = useState(false);
// //   const [isSearching, setIsSearching] = useState(false);
// //   const [selectedIndex, setSelectedIndex] = useState(-1);
// //   const searchRef = useRef(null);
// //   const inputRef = useRef(null);
  
// //   const { isAuthenticated, user } = useSelector((state) => state.auth);
// //   const { items } = useSelector((state) => state.cart);
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   // Close suggestions when clicking outside
// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (searchRef.current && !searchRef.current.contains(event.target)) {
// //         setShowSuggestions(false);
// //         setSelectedIndex(-1);
// //       }
// //     };
// //     document.addEventListener('mousedown', handleClickOutside);
// //     return () => document.removeEventListener('mousedown', handleClickOutside);
// //   }, []);

// //   // Search products from API
// //   const searchProducts = async (query) => {
// //     if (!query.trim()) {
// //       setSearchResults([]);
// //       setShowSuggestions(false);
// //       setSelectedIndex(-1);
// //       return;
// //     }

// //     setIsSearching(true);
// //     try {
// //       const response = await fetch(`${API_URL}/products?search=${encodeURIComponent(query)}&limit=5`);
// //       const data = await response.json();
      
// //       // Handle different response formats
// //       const products = data.products || data || [];
// //       setSearchResults(products.slice(0, 5));
// //       setShowSuggestions(products.length > 0);
// //       setSelectedIndex(-1);
// //     } catch (error) {
// //       console.error('Search error:', error);
// //       setSearchResults([]);
// //       setShowSuggestions(false);
// //     } finally {
// //       setIsSearching(false);
// //     }
// //   };

// //   // Debounce search input
// //   useEffect(() => {
// //     const delayDebounceFn = setTimeout(() => {
// //       if (searchQuery) {
// //         searchProducts(searchQuery);
// //       } else {
// //         setSearchResults([]);
// //         setShowSuggestions(false);
// //         setSelectedIndex(-1);
// //       }
// //     }, 300);

// //     return () => clearTimeout(delayDebounceFn);
// //   }, [searchQuery]);

// //   // Keyboard navigation
// //   useEffect(() => {
// //     const handleKeyDown = (e) => {
// //       if (!showSuggestions) return;

// //       if (e.key === 'ArrowDown') {
// //         e.preventDefault();
// //         setSelectedIndex((prev) => 
// //           prev < searchResults.length - 1 ? prev + 1 : prev
// //         );
// //       } else if (e.key === 'ArrowUp') {
// //         e.preventDefault();
// //         setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
// //       } else if (e.key === 'Enter' && selectedIndex >= 0) {
// //         e.preventDefault();
// //         const selected = searchResults[selectedIndex];
// //         if (selected) {
// //           handleSuggestionClick(selected);
// //         }
// //       } else if (e.key === 'Escape') {
// //         setShowSuggestions(false);
// //         setSelectedIndex(-1);
// //         inputRef.current?.blur();
// //       }
// //     };

// //     document.addEventListener('keydown', handleKeyDown);
// //     return () => document.removeEventListener('keydown', handleKeyDown);
// //   }, [showSuggestions, searchResults, selectedIndex]);

// //   // Handle search - shows ALL products matching the query
// //   const handleSearch = (e) => {
// //     e.preventDefault();
// //     if (searchQuery.trim()) {
// //       setShowSuggestions(false);
// //       setSelectedIndex(-1);
// //       // Navigate to products page with search query - shows ALL matching products
// //       navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
// //       // Optionally clear search after navigation
// //       // setSearchQuery('');
// //     }
// //   };

// //   const handleSuggestionClick = (product) => {
// //     setShowSuggestions(false);
// //     setSelectedIndex(-1);
// //     setSearchQuery('');
// //     navigate(`/product/${product.id}`);
// //   };

// //   const handleLogout = () => {
// //     dispatch(logout());
// //     navigate('/');
// //   };

// //   const cartItemCount = items?.reduce((total, item) => total + item.quantity, 0) || 0;

// //   // Highlight matching text
// //   const highlightMatch = (text, query) => {
// //     if (!query || !text) return text;
// //     try {
// //       const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
// //       const parts = text.split(regex);
// //       return parts.map((part, index) => 
// //         part.toLowerCase() === query.toLowerCase() ? 
// //           <span key={index} className="highlight">{part}</span> : part
// //       );
// //     } catch {
// //       return text;
// //     }
// //   };

// //   return (
// //     <nav className="navbar">
// //       <div className="container">
// //         <div className="navbar-content">
// //           <Link to="/" className="logo">
// //             SHOP.CO
// //           </Link>

// //           <div className="nav-links">
// //             <Link to="/products">Shop</Link>
// //             <Link to="/products?filter=onsale">On Sale</Link>
// //             <Link to="/products?filter=new">New Arrivals</Link>
// //             <Link to="/products?filter=brands">Brands</Link>
// //           </div>

// //           <div className="search-wrapper" ref={searchRef}>
// //             <form className="search-form" onSubmit={handleSearch}>
// //               <input
// //                 ref={inputRef}
// //                 type="text"
// //                 className="search-input"
// //                 placeholder="Search for products..."
// //                 value={searchQuery}
// //                 onChange={(e) => setSearchQuery(e.target.value)}
// //                 onFocus={() => {
// //                   if (searchResults.length > 0) {
// //                     setShowSuggestions(true);
// //                   }
// //                 }}
// //                 autoComplete="off"
// //               />
// //               <button type="submit" className="search-submit">
// //                 {isSearching ? '⏳' : '🔍'}
// //               </button>
// //             </form>

// //             {/* Search Suggestions Dropdown */}
// //             {showSuggestions && searchResults.length > 0 && (
// //               <div className="search-suggestions">
// //                 {searchResults.map((product, index) => (
// //                   <div 
// //                     key={product.id} 
// //                     className={`suggestion-item ${index === selectedIndex ? 'selected' : ''}`}
// //                     onClick={() => handleSuggestionClick(product)}
// //                     onMouseEnter={() => setSelectedIndex(index)}
// //                   >
// //                     <img 
// //                       src={product.image} 
// //                       alt={product.title} 
// //                       className="suggestion-image"
// //                       onError={(e) => e.target.src = 'https://via.placeholder.com/40'}
// //                     />
// //                     <div className="suggestion-info">
// //                       <div className="suggestion-title">
// //                         {highlightMatch(product.title || product.name, searchQuery)}
// //                       </div>
// //                       <div className="suggestion-price">${product.price}</div>
// //                       {product.category && (
// //                         <div className="suggestion-category">{product.category}</div>
// //                       )}
// //                     </div>
// //                   </div>
// //                 ))}
// //                 <div className="suggestion-footer">
// //                   <span>{searchResults.length} results found</span>
// //                   <button 
// //                     className="view-all-btn"
// //                     onClick={() => {
// //                       setShowSuggestions(false);
// //                       setSelectedIndex(-1);
// //                       navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
// //                       // Don't clear search query so it shows in the products page search
// //                     }}
// //                   >
// //                     View All Results →
// //                   </button>
// //                 </div>
// //               </div>
// //             )}

// //             {/* No Results */}
// //             {showSuggestions && searchResults.length === 0 && searchQuery && !isSearching && (
// //               <div className="search-suggestions no-results">
// //                 <div className="no-results-content">
// //                   <span className="no-results-icon">🔍</span>
// //                   <p>No products found for <strong>"{searchQuery}"</strong></p>
// //                   <p className="no-results-hint">Try searching with different keywords</p>
// //                 </div>
// //               </div>
// //             )}
// //           </div>

// //           <div className="nav-actions">
// //             <Link to="/cart" className="cart-btn">
// //               🛒 {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
// //             </Link>
// //             {isAuthenticated ? (
// //               <div className="user-menu">
// //                 <button className="user-btn">
// //                   👤 {user?.name?.split(' ')[0] || 'User'}
// //                 </button>
// //                 <div className="dropdown">
// //                   <Link to="/profile">My Profile</Link>
// //                   <Link to="/orders">My Orders</Link>
// //                   <Link to="/wishlist">Wishlist</Link>
// //                   {user?.role === 'admin' && (
// //                     <Link to="/admin" className="admin-link">
// //                       👑 Admin Panel
// //                     </Link>
// //                   )}
// //                   <button onClick={handleLogout}>Logout</button>
// //                 </div>
// //               </div>
// //             ) : (
// //               <Link to="/login" className="login-btn">
// //                 👤 Login
// //               </Link>
// //             )}
// //           </div>

// //           <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
// //             ☰
// //           </button>
// //         </div>

// //         {isMenuOpen && (
// //           <div className="mobile-menu">
// //             <Link to="/products">Shop</Link>
// //             <Link to="/products?filter=onsale">On Sale</Link>
// //             <Link to="/products?filter=new">New Arrivals</Link>
// //             <Link to="/products?filter=brands">Brands</Link>
// //             <div className="mobile-search">
// //               <form onSubmit={handleSearch}>
// //                 <input
// //                   type="text"
// //                   placeholder="Search for products..."
// //                   value={searchQuery}
// //                   onChange={(e) => setSearchQuery(e.target.value)}
// //                 />
// //                 <button type="submit">🔍</button>
// //               </form>
// //             </div>
// //             {isAuthenticated ? (
// //               <>
// //                 <Link to="/profile">My Profile</Link>
// //                 <Link to="/orders">My Orders</Link>
// //                 <Link to="/wishlist">Wishlist</Link>
// //                 {user?.role === 'admin' && (
// //                   <Link to="/admin" className="admin-link">👑 Admin Panel</Link>
// //                 )}
// //                 <button onClick={handleLogout} className="mobile-logout">Logout</button>
// //               </>
// //             ) : (
// //               <Link to="/login">Login</Link>
// //             )}
// //           </div>
// //         )}
// //       </div>

// //       <style jsx>{`
// //         .navbar {
// //           background: white;
// //           box-shadow: 0 2px 4px rgba(0,0,0,0.1);
// //           position: sticky;
// //           top: 0;
// //           z-index: 1000;
// //         }
        
// //         .container {
// //           max-width: 1200px;
// //           margin: 0 auto;
// //           padding: 0 20px;
// //         }
        
// //         .navbar-content {
// //           display: flex;
// //           justify-content: space-between;
// //           align-items: center;
// //           padding: 20px 0;
// //           gap: 30px;
// //         }
        
// //         .logo {
// //           font-size: 28px;
// //           font-weight: 700;
// //           text-decoration: none;
// //           color: #000;
// //           white-space: nowrap;
// //         }
        
// //         .nav-links {
// //           display: flex;
// //           gap: 30px;
// //         }
        
// //         .nav-links a {
// //           text-decoration: none;
// //           color: #333;
// //           font-weight: 500;
// //           transition: color 0.3s ease;
// //         }
        
// //         .nav-links a:hover {
// //           color: #000;
// //         }
        
// //         .search-wrapper {
// //           flex: 1;
// //           max-width: 400px;
// //           position: relative;
// //         }
        
// //         .search-form {
// //           position: relative;
// //           width: 100%;
// //         }
        
// //         .search-input {
// //           width: 100%;
// //           padding: 10px 40px 10px 15px;
// //           border: 1px solid #e0e0e0;
// //           border-radius: 25px;
// //           font-size: 14px;
// //           background-color: #f5f5f5;
// //           transition: all 0.3s ease;
// //         }
        
// //         .search-input:focus {
// //           outline: none;
// //           border-color: #000;
// //           background-color: #fff;
// //           box-shadow: 0 0 0 3px rgba(0,0,0,0.05);
// //         }
        
// //         .search-submit {
// //           position: absolute;
// //           right: 12px;
// //           top: 50%;
// //           transform: translateY(-50%);
// //           background: none;
// //           border: none;
// //           cursor: pointer;
// //           font-size: 16px;
// //           color: #666;
// //           padding: 0;
// //         }
        
// //         .search-suggestions {
// //           position: absolute;
// //           top: calc(100% + 8px);
// //           left: 0;
// //           right: 0;
// //           background: white;
// //           border-radius: 12px;
// //           box-shadow: 0 8px 24px rgba(0,0,0,0.15);
// //           z-index: 1000;
// //           max-height: 400px;
// //           overflow-y: auto;
// //           padding: 8px 0;
// //         }
        
// //         .search-suggestions::-webkit-scrollbar {
// //           width: 6px;
// //         }
        
// //         .search-suggestions::-webkit-scrollbar-track {
// //           background: #f1f1f1;
// //           border-radius: 6px;
// //         }
        
// //         .search-suggestions::-webkit-scrollbar-thumb {
// //           background: #ddd;
// //           border-radius: 6px;
// //         }
        
// //         .suggestion-item {
// //           display: flex;
// //           align-items: center;
// //           gap: 12px;
// //           padding: 10px 16px;
// //           cursor: pointer;
// //           transition: background 0.2s ease;
// //         }
        
// //         .suggestion-item:hover,
// //         .suggestion-item.selected {
// //           background: #f5f5f5;
// //         }
        
// //         .suggestion-image {
// //           width: 40px;
// //           height: 40px;
// //           object-fit: cover;
// //           border-radius: 8px;
// //           flex-shrink: 0;
// //           background: #f5f5f5;
// //         }
        
// //         .suggestion-info {
// //           flex: 1;
// //           min-width: 0;
// //         }
        
// //         .suggestion-title {
// //           font-size: 14px;
// //           font-weight: 500;
// //           color: #333;
// //           margin-bottom: 2px;
// //           white-space: nowrap;
// //           overflow: hidden;
// //           text-overflow: ellipsis;
// //         }
        
// //         .suggestion-title .highlight {
// //           background: #fff3cd;
// //           padding: 0 2px;
// //           border-radius: 2px;
// //           color: #000;
// //         }
        
// //         .suggestion-price {
// //           font-size: 13px;
// //           font-weight: 600;
// //           color: #000;
// //         }
        
// //         .suggestion-category {
// //           font-size: 11px;
// //           color: #999;
// //           margin-top: 2px;
// //         }
        
// //         .suggestion-footer {
// //           display: flex;
// //           justify-content: space-between;
// //           align-items: center;
// //           padding: 10px 16px;
// //           border-top: 1px solid #eee;
// //           font-size: 12px;
// //           color: #999;
// //         }
        
// //         .view-all-btn {
// //           background: none;
// //           border: none;
// //           color: #000;
// //           font-weight: 600;
// //           cursor: pointer;
// //           padding: 4px 12px;
// //           border-radius: 20px;
// //           transition: background 0.2s ease;
// //           font-size: 12px;
// //         }
        
// //         .view-all-btn:hover {
// //           background: #f5f5f5;
// //         }
        
// //         .no-results {
// //           padding: 20px;
// //           text-align: center;
// //         }
        
// //         .no-results-content {
// //           display: flex;
// //           flex-direction: column;
// //           align-items: center;
// //           gap: 8px;
// //         }
        
// //         .no-results-icon {
// //           font-size: 32px;
// //         }
        
// //         .no-results-content p {
// //           margin: 0;
// //           color: #666;
// //         }
        
// //         .no-results-content strong {
// //           color: #000;
// //         }
        
// //         .no-results-hint {
// //           font-size: 12px;
// //           color: #999 !important;
// //         }
        
// //         .nav-actions {
// //           display: flex;
// //           gap: 20px;
// //           align-items: center;
// //         }
        
// //         .cart-btn, .login-btn, .user-btn {
// //           background: none;
// //           border: none;
// //           font-size: 20px;
// //           cursor: pointer;
// //           text-decoration: none;
// //           color: #333;
// //           position: relative;
// //           transition: color 0.3s ease;
// //         }
        
// //         .cart-btn:hover, .login-btn:hover, .user-btn:hover {
// //           color: #000;
// //         }
        
// //         .cart-count {
// //           position: absolute;
// //           top: -8px;
// //           right: -8px;
// //           background: #ff3b30;
// //           color: white;
// //           border-radius: 50%;
// //           padding: 2px 6px;
// //           font-size: 11px;
// //           font-weight: 600;
// //           min-width: 18px;
// //           text-align: center;
// //         }
        
// //         .user-menu {
// //           position: relative;
// //         }
        
// //         .dropdown {
// //           display: none;
// //           position: absolute;
// //           top: 100%;
// //           right: 0;
// //           background: white;
// //           box-shadow: 0 4px 12px rgba(0,0,0,0.15);
// //           border-radius: 8px;
// //           min-width: 180px;
// //           z-index: 100;
// //           margin-top: 10px;
// //         }
        
// //         .user-menu:hover .dropdown {
// //           display: flex;
// //           flex-direction: column;
// //         }
        
// //         .dropdown a, .dropdown button {
// //           padding: 12px 16px;
// //           text-decoration: none;
// //           color: #333;
// //           background: none;
// //           border: none;
// //           text-align: left;
// //           cursor: pointer;
// //           font-size: 14px;
// //           transition: background 0.2s ease;
// //         }
        
// //         .dropdown a:hover, .dropdown button:hover {
// //           background: #f5f5f5;
// //         }
        
// //         .dropdown a:first-child {
// //           border-radius: 8px 8px 0 0;
// //         }
        
// //         .dropdown button:last-child {
// //           border-radius: 0 0 8px 8px;
// //           color: #ff3b30;
// //         }
        
// //         .admin-link {
// //           color: #667eea !important;
// //           border-top: 1px solid #e0e0e0;
// //           font-weight: 600;
// //         }
        
// //         .admin-link:hover {
// //           background: #f0f0ff !important;
// //         }
        
// //         .mobile-menu-btn {
// //           display: none;
// //           font-size: 24px;
// //           background: none;
// //           border: none;
// //           cursor: pointer;
// //         }
        
// //         .mobile-menu {
// //           display: none;
// //           flex-direction: column;
// //           padding: 20px 0;
// //           gap: 15px;
// //           border-top: 1px solid #e0e0e0;
// //         }
        
// //         .mobile-menu a {
// //           text-decoration: none;
// //           color: #333;
// //           font-size: 16px;
// //           padding: 8px 0;
// //         }
        
// //         .mobile-menu .admin-link {
// //           color: #667eea;
// //           font-weight: 600;
// //         }
        
// //         .mobile-search {
// //           margin: 10px 0;
// //         }
        
// //         .mobile-search form {
// //           display: flex;
// //           gap: 10px;
// //         }
        
// //         .mobile-search input {
// //           flex: 1;
// //           padding: 10px 15px;
// //           border: 1px solid #e0e0e0;
// //           border-radius: 25px;
// //           font-size: 14px;
// //         }
        
// //         .mobile-search button {
// //           padding: 10px 20px;
// //           background: #000;
// //           color: white;
// //           border: none;
// //           border-radius: 25px;
// //           cursor: pointer;
// //         }
        
// //         .mobile-logout {
// //           background: none;
// //           border: none;
// //           color: #ff3b30;
// //           font-size: 16px;
// //           padding: 8px 0;
// //           text-align: left;
// //           cursor: pointer;
// //         }
        
// //         @media (max-width: 968px) {
// //           .navbar-content {
// //             gap: 20px;
// //           }
          
// //           .nav-links {
// //             gap: 20px;
// //           }
// //         }
        
// //         @media (max-width: 768px) {
// //           .nav-links, .search-wrapper, .nav-actions {
// //             display: none;
// //           }
          
// //           .mobile-menu-btn {
// //             display: block;
// //           }
          
// //           .mobile-menu {
// //             display: flex;
// //           }
          
// //           .navbar-content {
// //             padding: 15px 0;
// //           }
// //         }
// //       `}</style>
// //     </nav>
// //   );
// // };

// // export default Navbar;










// import React, { useState, useEffect, useRef } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { logout } from '../redux/slices/authSlice';

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [isSearching, setIsSearching] = useState(false);
//   const [selectedIndex, setSelectedIndex] = useState(-1);
//   const [showAnnouncement, setShowAnnouncement] = useState(true);
//   const searchRef = useRef(null);
//   const inputRef = useRef(null);
//   const shopDropdownRef = useRef(null);
  
//   const { isAuthenticated, user } = useSelector((state) => state.auth);
//   const { items } = useSelector((state) => state.cart);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Close dropdowns when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (searchRef.current && !searchRef.current.contains(event.target)) {
//         setShowSuggestions(false);
//         setSelectedIndex(-1);
//       }
//       if (shopDropdownRef.current && !shopDropdownRef.current.contains(event.target)) {
//         setIsShopDropdownOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   // Search products from API
//   const searchProducts = async (query) => {
//     if (!query.trim()) {
//       setSearchResults([]);
//       setShowSuggestions(false);
//       setSelectedIndex(-1);
//       return;
//     }

//     setIsSearching(true);
//     try {
//       const response = await fetch(`${API_URL}/products?search=${encodeURIComponent(query)}&limit=5`);
//       const data = await response.json();
      
//       const products = data.products || data || [];
//       setSearchResults(products.slice(0, 5));
//       setShowSuggestions(products.length > 0);
//       setSelectedIndex(-1);
//     } catch (error) {
//       console.error('Search error:', error);
//       setSearchResults([]);
//       setShowSuggestions(false);
//     } finally {
//       setIsSearching(false);
//     }
//   };

//   // Debounce search input
//   useEffect(() => {
//     const delayDebounceFn = setTimeout(() => {
//       if (searchQuery) {
//         searchProducts(searchQuery);
//       } else {
//         setSearchResults([]);
//         setShowSuggestions(false);
//         setSelectedIndex(-1);
//       }
//     }, 300);

//     return () => clearTimeout(delayDebounceFn);
//   }, [searchQuery]);

//   // Keyboard navigation
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (!showSuggestions) return;

//       if (e.key === 'ArrowDown') {
//         e.preventDefault();
//         setSelectedIndex((prev) => 
//           prev < searchResults.length - 1 ? prev + 1 : prev
//         );
//       } else if (e.key === 'ArrowUp') {
//         e.preventDefault();
//         setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
//       } else if (e.key === 'Enter' && selectedIndex >= 0) {
//         e.preventDefault();
//         const selected = searchResults[selectedIndex];
//         if (selected) {
//           handleSuggestionClick(selected);
//         }
//       } else if (e.key === 'Escape') {
//         setShowSuggestions(false);
//         setSelectedIndex(-1);
//         inputRef.current?.blur();
//       }
//     };

//     document.addEventListener('keydown', handleKeyDown);
//     return () => document.removeEventListener('keydown', handleKeyDown);
//   }, [showSuggestions, searchResults, selectedIndex]);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       setShowSuggestions(false);
//       setSelectedIndex(-1);
//       navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
//     }
//   };

//   const handleSuggestionClick = (product) => {
//     setShowSuggestions(false);
//     setSelectedIndex(-1);
//     setSearchQuery('');
//     navigate(`/product/${product.id}`);
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate('/');
//   };

//   const cartItemCount = items?.reduce((total, item) => total + item.quantity, 0) || 0;

//   // Highlight matching text
//   const highlightMatch = (text, query) => {
//     if (!query || !text) return text;
//     try {
//       const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
//       const parts = text.split(regex);
//       return parts.map((part, index) => 
//         part.toLowerCase() === query.toLowerCase() ? 
//           <span key={index} className="highlight">{part}</span> : part
//       );
//     } catch {
//       return text;
//     }
//   };

//   return (
//     <nav className="navbar">
//       {/* Announcement Bar */}
//       {showAnnouncement && (
//         <div className="announcement-bar">
//           <div className="container announcement-container">
//             <p className="announcement-text">
//               Sign up and get 20% off to your first order.{' '}
//               <Link to="/register" className="announcement-link">
//                 Sign Up Now
//               </Link>
//             </p>
//             <button 
//               className="announcement-close"
//               onClick={() => setShowAnnouncement(false)}
//               aria-label="Close announcement"
//             >
//               ✕
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Main Navbar */}
//       <div className="navbar-main">
//         <div className="container">
//           <div className="navbar-content">
//             {/* Logo */}
//             <Link to="/" className="logo">
//               SHOP.CO
//             </Link>

//             {/* Navigation Links */}
//             <div className="nav-links">
//               {/* Shop Dropdown */}
//               <div className="dropdown-wrapper" ref={shopDropdownRef}>
//                 <button 
//                   className="nav-link shop-dropdown-btn"
//                   onClick={() => setIsShopDropdownOpen(!isShopDropdownOpen)}
//                 >
//                   Shop <span className="dropdown-arrow">▼</span>
//                 </button>
//                 {isShopDropdownOpen && (
//                   <div className="dropdown-menu">
//                     <Link to="/products" onClick={() => setIsShopDropdownOpen(false)}>All Products</Link>
//                     <Link to="/products?category=Men" onClick={() => setIsShopDropdownOpen(false)}>Men's Fashion</Link>
//                     <Link to="/products?category=Women" onClick={() => setIsShopDropdownOpen(false)}>Women's Fashion</Link>
//                     <Link to="/products?category=Accessories" onClick={() => setIsShopDropdownOpen(false)}>Accessories</Link>
//                     <Link to="/products?category=Kids" onClick={() => setIsShopDropdownOpen(false)}>Kids</Link>
//                   </div>
//                 )}
//               </div>
              
//               <Link to="/products?filter=onsale" className="nav-link">On Sale</Link>
//               <Link to="/products?filter=new" className="nav-link">New Arrivals</Link>
//               <Link to="/products?filter=brands" className="nav-link">Brands</Link>
//             </div>

//             {/* Search Bar */}
//             <div className="search-wrapper" ref={searchRef}>
//               <form className="search-form" onSubmit={handleSearch}>
//                 <input
//                   ref={inputRef}
//                   type="text"
//                   className="search-input"
//                   placeholder="Search for products..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   onFocus={() => {
//                     if (searchResults.length > 0) {
//                       setShowSuggestions(true);
//                     }
//                   }}
//                   autoComplete="off"
//                 />
//                 <button type="submit" className="search-submit">
//                   {isSearching ? '⏳' : '🔍'}
//                 </button>
//               </form>

//               {/* Search Suggestions */}
//               {showSuggestions && searchResults.length > 0 && (
//                 <div className="search-suggestions">
//                   {searchResults.map((product, index) => (
//                     <div 
//                       key={product.id} 
//                       className={`suggestion-item ${index === selectedIndex ? 'selected' : ''}`}
//                       onClick={() => handleSuggestionClick(product)}
//                       onMouseEnter={() => setSelectedIndex(index)}
//                     >
//                       <img 
//                         src={product.image} 
//                         alt={product.title} 
//                         className="suggestion-image"
//                         onError={(e) => e.target.src = 'https://via.placeholder.com/40'}
//                       />
//                       <div className="suggestion-info">
//                         <div className="suggestion-title">
//                           {highlightMatch(product.title || product.name, searchQuery)}
//                         </div>
//                         <div className="suggestion-price">${product.price}</div>
//                       </div>
//                     </div>
//                   ))}
//                   <div className="suggestion-footer">
//                     <span>{searchResults.length} results found</span>
//                     <button 
//                       className="view-all-btn"
//                       onClick={() => {
//                         setShowSuggestions(false);
//                         setSelectedIndex(-1);
//                         navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
//                       }}
//                     >
//                       View All Results →
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {showSuggestions && searchResults.length === 0 && searchQuery && !isSearching && (
//                 <div className="search-suggestions no-results">
//                   <div className="no-results-content">
//                     <span className="no-results-icon">🔍</span>
//                     <p>No products found for <strong>"{searchQuery}"</strong></p>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Actions */}
//             <div className="nav-actions">
//               <Link to="/cart" className="cart-btn">
//                 🛒 {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
//               </Link>
//               {isAuthenticated ? (
//                 <div className="user-menu">
//                   <button className="user-btn">
//                     👤 {user?.name?.split(' ')[0] || 'User'}
//                   </button>
//                   <div className="dropdown">
//                     <Link to="/profile">My Profile</Link>
//                     <Link to="/orders">My Orders</Link>
//                     <Link to="/wishlist">Wishlist</Link>
//                     {user?.role === 'admin' && (
//                       <Link to="/admin" className="admin-link">👑 Admin Panel</Link>
//                     )}
//                     <button onClick={handleLogout}>Logout</button>
//                   </div>
//                 </div>
//               ) : (
//                 <Link to="/login" className="login-btn">
//                   👤 Login
//                 </Link>
//               )}
//             </div>

//             {/* Mobile Menu Button */}
//             <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
//               ☰
//             </button>
//           </div>

//           {/* Mobile Menu */}
//           {isMenuOpen && (
//             <div className="mobile-menu">
//               <div className="mobile-menu-section">
//                 <div className="mobile-menu-title">Shop</div>
//                 <Link to="/products" onClick={() => setIsMenuOpen(false)}>All Products</Link>
//                 <Link to="/products?category=Men" onClick={() => setIsMenuOpen(false)}>Men's Fashion</Link>
//                 <Link to="/products?category=Women" onClick={() => setIsMenuOpen(false)}>Women's Fashion</Link>
//                 <Link to="/products?category=Accessories" onClick={() => setIsMenuOpen(false)}>Accessories</Link>
//                 <Link to="/products?category=Kids" onClick={() => setIsMenuOpen(false)}>Kids</Link>
//               </div>
//               <Link to="/products?filter=onsale" onClick={() => setIsMenuOpen(false)}>On Sale</Link>
//               <Link to="/products?filter=new" onClick={() => setIsMenuOpen(false)}>New Arrivals</Link>
//               <Link to="/products?filter=brands" onClick={() => setIsMenuOpen(false)}>Brands</Link>
              
//               <div className="mobile-search">
//                 <form onSubmit={(e) => {
//                   handleSearch(e);
//                   setIsMenuOpen(false);
//                 }}>
//                   <input
//                     type="text"
//                     placeholder="Search for products..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                   />
//                   <button type="submit">🔍</button>
//                 </form>
//               </div>
              
//               {isAuthenticated ? (
//                 <>
//                   <Link to="/profile" onClick={() => setIsMenuOpen(false)}>My Profile</Link>
//                   <Link to="/orders" onClick={() => setIsMenuOpen(false)}>My Orders</Link>
//                   <Link to="/wishlist" onClick={() => setIsMenuOpen(false)}>Wishlist</Link>
//                   {user?.role === 'admin' && (
//                     <Link to="/admin" className="admin-link" onClick={() => setIsMenuOpen(false)}>👑 Admin Panel</Link>
//                   )}
//                   <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="mobile-logout">Logout</button>
//                 </>
//               ) : (
//                 <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       <style jsx>{`
//         /* Announcement Bar */
//         .announcement-bar {
//           background: #000;
//           color: white;
//           padding: 10px 0;
//           position: sticky;
//           top: 0;
//           z-index: 1001;
//         }
        
//         .announcement-container {
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           position: relative;
//           padding: 0 40px;
//         }
        
//         .announcement-text {
//           margin: 0;
//           font-size: 14px;
//           text-align: center;
//           letter-spacing: 0.3px;
//         }
        
//         .announcement-link {
//           color: #fff;
//           font-weight: 600;
//           text-decoration: underline;
//           margin-left: 4px;
//           transition: opacity 0.3s ease;
//         }
        
//         .announcement-link:hover {
//           opacity: 0.8;
//         }
        
//         .announcement-close {
//           position: absolute;
//           right: 0;
//           top: 50%;
//           transform: translateY(-50%);
//           background: none;
//           border: none;
//           color: rgba(255,255,255,0.6);
//           cursor: pointer;
//           font-size: 16px;
//           padding: 4px 8px;
//           transition: color 0.3s ease;
//         }
        
//         .announcement-close:hover {
//           color: white;
//         }
        
//         /* Main Navbar */
//         .navbar-main {
//           background: white;
//           box-shadow: 0 2px 4px rgba(0,0,0,0.08);
//           position: sticky;
//           top: 0;
//           z-index: 1000;
//           border-bottom: 1px solid #f0f0f0;
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
//           padding: 18px 0;
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
//           align-items: center;
//           gap: 25px;
//         }
        
//         .nav-link {
//           text-decoration: none;
//           color: #333;
//           font-weight: 500;
//           font-size: 15px;
//           transition: color 0.3s ease;
//           background: none;
//           border: none;
//           cursor: pointer;
//           padding: 0;
//         }
        
//         .nav-link:hover {
//           color: #000;
//         }
        
//         .dropdown-wrapper {
//           position: relative;
//         }
        
//         .shop-dropdown-btn {
//           display: flex;
//           align-items: center;
//           gap: 4px;
//           background: none;
//           border: none;
//           font-size: 15px;
//           font-weight: 500;
//           color: #333;
//           cursor: pointer;
//           padding: 0;
//           font-family: inherit;
//         }
        
//         .shop-dropdown-btn:hover {
//           color: #000;
//         }
        
//         .dropdown-arrow {
//           font-size: 10px;
//           margin-left: 2px;
//         }
        
//         .dropdown-menu {
//           position: absolute;
//           top: calc(100% + 12px);
//           left: 0;
//           background: white;
//           border-radius: 12px;
//           box-shadow: 0 8px 24px rgba(0,0,0,0.12);
//           min-width: 200px;
//           padding: 8px 0;
//           z-index: 100;
//         }
        
//         .dropdown-menu a {
//           display: block;
//           padding: 10px 20px;
//           text-decoration: none;
//           color: #333;
//           font-size: 14px;
//           transition: background 0.2s ease;
//         }
        
//         .dropdown-menu a:hover {
//           background: #f5f5f5;
//         }
        
//         .dropdown-menu a:first-child {
//           border-radius: 12px 12px 0 0;
//         }
        
//         .dropdown-menu a:last-child {
//           border-radius: 0 0 12px 12px;
//         }
        
//         .search-wrapper {
//           flex: 1;
//           max-width: 400px;
//           position: relative;
//         }
        
//         .search-form {
//           position: relative;
//           width: 100%;
//         }
        
//         .search-input {
//           width: 100%;
//           padding: 10px 40px 10px 18px;
//           border: 1px solid #e8e8e8;
//           border-radius: 25px;
//           font-size: 14px;
//           background-color: #f8f8f8;
//           transition: all 0.3s ease;
//           font-family: inherit;
//         }
        
//         .search-input::placeholder {
//           color: #999;
//         }
        
//         .search-input:focus {
//           outline: none;
//           border-color: #000;
//           background-color: #fff;
//           box-shadow: 0 0 0 3px rgba(0,0,0,0.05);
//         }
        
//         .search-submit {
//           position: absolute;
//           right: 14px;
//           top: 50%;
//           transform: translateY(-50%);
//           background: none;
//           border: none;
//           cursor: pointer;
//           font-size: 16px;
//           color: #888;
//           padding: 0;
//         }
        
//         .search-suggestions {
//           position: absolute;
//           top: calc(100% + 8px);
//           left: 0;
//           right: 0;
//           background: white;
//           border-radius: 12px;
//           box-shadow: 0 8px 24px rgba(0,0,0,0.15);
//           z-index: 1000;
//           max-height: 400px;
//           overflow-y: auto;
//           padding: 8px 0;
//         }
        
//         .search-suggestions::-webkit-scrollbar {
//           width: 6px;
//         }
        
//         .search-suggestions::-webkit-scrollbar-track {
//           background: #f1f1f1;
//           border-radius: 6px;
//         }
        
//         .search-suggestions::-webkit-scrollbar-thumb {
//           background: #ddd;
//           border-radius: 6px;
//         }
        
//         .suggestion-item {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//           padding: 10px 16px;
//           cursor: pointer;
//           transition: background 0.2s ease;
//         }
        
//         .suggestion-item:hover,
//         .suggestion-item.selected {
//           background: #f5f5f5;
//         }
        
//         .suggestion-image {
//           width: 40px;
//           height: 40px;
//           object-fit: cover;
//           border-radius: 8px;
//           flex-shrink: 0;
//           background: #f5f5f5;
//         }
        
//         .suggestion-info {
//           flex: 1;
//           min-width: 0;
//         }
        
//         .suggestion-title {
//           font-size: 14px;
//           font-weight: 500;
//           color: #333;
//           margin-bottom: 2px;
//           white-space: nowrap;
//           overflow: hidden;
//           text-overflow: ellipsis;
//         }
        
//         .suggestion-title .highlight {
//           background: #fff3cd;
//           padding: 0 2px;
//           border-radius: 2px;
//           color: #000;
//         }
        
//         .suggestion-price {
//           font-size: 13px;
//           font-weight: 600;
//           color: #000;
//         }
        
//         .suggestion-footer {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           padding: 10px 16px;
//           border-top: 1px solid #f0f0f0;
//           font-size: 12px;
//           color: #999;
//         }
        
//         .view-all-btn {
//           background: none;
//           border: none;
//           color: #000;
//           font-weight: 600;
//           cursor: pointer;
//           padding: 4px 12px;
//           border-radius: 20px;
//           transition: background 0.2s ease;
//           font-size: 12px;
//         }
        
//         .view-all-btn:hover {
//           background: #f5f5f5;
//         }
        
//         .no-results {
//           padding: 30px 20px;
//           text-align: center;
//         }
        
//         .no-results-content {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           gap: 8px;
//         }
        
//         .no-results-icon {
//           font-size: 32px;
//         }
        
//         .no-results-content p {
//           margin: 0;
//           color: #666;
//           font-size: 14px;
//         }
        
//         .no-results-content strong {
//           color: #000;
//         }
        
//         .nav-actions {
//           display: flex;
//           gap: 18px;
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
        
//         .user-menu .dropdown {
//           display: none;
//           position: absolute;
//           top: calc(100% + 10px);
//           right: 0;
//           background: white;
//           box-shadow: 0 8px 24px rgba(0,0,0,0.12);
//           border-radius: 12px;
//           min-width: 180px;
//           z-index: 100;
//           padding: 8px 0;
//         }
        
//         .user-menu:hover .dropdown {
//           display: flex;
//           flex-direction: column;
//         }
        
//         .dropdown a, .dropdown button {
//           padding: 10px 20px;
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
        
//         .dropdown button:last-child {
//           color: #ff3b30;
//           border-radius: 0 0 12px 12px;
//         }
        
//         .dropdown a:first-child {
//           border-radius: 12px 12px 0 0;
//         }
        
//         .admin-link {
//           color: #667eea !important;
//           border-top: 1px solid #f0f0f0;
//           font-weight: 600;
//         }
        
//         .admin-link:hover {
//           background: #f0f0ff !important;
//         }
        
//         .mobile-menu-btn {
//           display: none;
//           font-size: 24px;
//           background: none;
//           border: none;
//           cursor: pointer;
//           color: #333;
//         }
        
//         .mobile-menu {
//           display: none;
//           flex-direction: column;
//           padding: 20px 0 30px;
//           gap: 12px;
//           border-top: 1px solid #f0f0f0;
//         }
        
//         .mobile-menu a {
//           text-decoration: none;
//           color: #333;
//           font-size: 16px;
//           padding: 8px 0;
//         }
        
//         .mobile-menu .admin-link {
//           color: #667eea;
//           font-weight: 600;
//         }
        
//         .mobile-menu-section {
//           display: flex;
//           flex-direction: column;
//           gap: 8px;
//         }
        
//         .mobile-menu-title {
//           font-weight: 600;
//           font-size: 14px;
//           color: #999;
//           text-transform: uppercase;
//           letter-spacing: 0.5px;
//           margin-bottom: 4px;
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
//           border: 1px solid #e8e8e8;
//           border-radius: 25px;
//           font-size: 14px;
//           background: #f8f8f8;
//         }
        
//         .mobile-search input:focus {
//           outline: none;
//           border-color: #000;
//           background: #fff;
//         }
        
//         .mobile-search button {
//           padding: 10px 20px;
//           background: #000;
//           color: white;
//           border: none;
//           border-radius: 25px;
//           cursor: pointer;
//           font-size: 16px;
//         }
        
//         .mobile-logout {
//           background: none;
//           border: none;
//           color: #ff3b30;
//           font-size: 16px;
//           padding: 8px 0;
//           text-align: left;
//           cursor: pointer;
//           font-family: inherit;
//         }
        
//         /* Mobile Responsive for Announcement */
//         @media (max-width: 768px) {
//           .announcement-text {
//             font-size: 12px;
//           }
          
//           .announcement-container {
//             padding: 0 32px;
//           }
          
//           .announcement-close {
//             font-size: 14px;
//           }
          
//           .nav-links, .search-wrapper, .nav-actions {
//             display: none;
//           }
          
//           .mobile-menu-btn {
//             display: block;
//           }
          
//           .mobile-menu {
//             display: flex;
//           }
          
//           .navbar-content {
//             padding: 14px 0;
//           }
//         }
        
//         @media (max-width: 480px) {
//           .announcement-text {
//             font-size: 11px;
//           }
          
//           .announcement-container {
//             padding: 0 28px;
//           }
//         }
//       `}</style>
//     </nav>
//   );
// };

// export default Navbar;








import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { RiAdminFill } from "react-icons/ri";
import { IoSearchSharp } from "react-icons/io5";



const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search products from API
  const searchProducts = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowSuggestions(false);
      setSelectedIndex(-1);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(`${API_URL}/products?search=${encodeURIComponent(query)}&limit=5`);
      const data = await response.json();
      
      // Handle different response formats
      const products = data.products || data || [];
      setSearchResults(products.slice(0, 5));
      setShowSuggestions(products.length > 0);
      setSelectedIndex(-1);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
      setShowSuggestions(false);
    } finally {
      setIsSearching(false);
    }
  };

  // Debounce search input
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        searchProducts(searchQuery);
      } else {
        setSearchResults([]);
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!showSuggestions) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => 
          prev < searchResults.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
      } else if (e.key === 'Enter' && selectedIndex >= 0) {
        e.preventDefault();
        const selected = searchResults[selectedIndex];
        if (selected) {
          handleSuggestionClick(selected);
        }
      } else if (e.key === 'Escape') {
        setShowSuggestions(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showSuggestions, searchResults, selectedIndex]);

  // Handle search - shows ALL products matching the query
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      setSelectedIndex(-1);
      // Navigate to products page with search query - shows ALL matching products
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      // Optionally clear search after navigation
      // setSearchQuery('');
    }
  };

  const handleSuggestionClick = (product) => {
    setShowSuggestions(false);
    setSelectedIndex(-1);
    setSearchQuery('');
    navigate(`/product/${product.id}`);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const cartItemCount = items?.reduce((total, item) => total + item.quantity, 0) || 0;

  // Highlight matching text
  const highlightMatch = (text, query) => {
    if (!query || !text) return text;
    try {
      const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      const parts = text.split(regex);
      return parts.map((part, index) => 
        part.toLowerCase() === query.toLowerCase() ? 
          <span key={index} className="highlight">{part}</span> : part
      );
    } catch {
      return text;
    }
  };

  return (
    <>
      {/* Announcement Bar - Only show if user is not logged in */}
      {!isAuthenticated && showAnnouncement && (
        <div className="announcement-bar">
          <div className="container announcement-container">
            <p className="announcement-text">
              Sign up and get 20% off to your first order.{' '}
              <Link to="/register" className="announcement-link">
                Sign Up Now
              </Link>
            </p>
            <button 
              className="announcement-close"
              onClick={() => setShowAnnouncement(false)}
              aria-label="Close announcement"
            >
              ✕
            </button>
          </div>
        </div>
      )}

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
<Link to="/brands">Brands</Link>
            </div>

            <div className="search-wrapper" ref={searchRef}>
              <form className="search-form" onSubmit={handleSearch}>
                <input
                  ref={inputRef}
                  type="text"
                  className="search-input"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => {
                    if (searchResults.length > 0) {
                      setShowSuggestions(true);
                    }
                  }}
                  autoComplete="off"
                />
                <button type="submit" className="search-submit">
                  {isSearching ? '⏳' : <IoSearchSharp />
}
                </button>
              </form>

              {/* Search Suggestions Dropdown */}
              {showSuggestions && searchResults.length > 0 && (
                <div className="search-suggestions">
                  {searchResults.map((product, index) => (
                    <div 
                      key={product.id} 
                      className={`suggestion-item ${index === selectedIndex ? 'selected' : ''}`}
                      onClick={() => handleSuggestionClick(product)}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      <img 
                        src={product.image} 
                        alt={product.title} 
                        className="suggestion-image"
                        onError={(e) => e.target.src = 'https://via.placeholder.com/40'}
                      />
                      <div className="suggestion-info">
                        <div className="suggestion-title">
                          {highlightMatch(product.title || product.name, searchQuery)}
                        </div>
                        <div className="suggestion-price">${product.price}</div>
                        {product.category && (
                          <div className="suggestion-category">{product.category}</div>
                        )}
                      </div>
                    </div>
                  ))}
                  <div className="suggestion-footer">
                    <span>{searchResults.length} results found</span>
                    <button 
                      className="view-all-btn"
                      onClick={() => {
                        setShowSuggestions(false);
                        setSelectedIndex(-1);
                        navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
                        // Don't clear search query so it shows in the products page search
                      }}
                    >
                      View All Results →
                    </button>
                  </div>
                </div>
              )}

              {/* No Results */}
              {showSuggestions && searchResults.length === 0 && searchQuery && !isSearching && (
                <div className="search-suggestions no-results">
                  <div className="no-results-content">
                    <span className="no-results-icon"><IoSearchSharp />
</span>
                    <p>No products found for <strong>"{searchQuery}"</strong></p>
                    <p className="no-results-hint">Try searching with different keywords</p>
                  </div>
                </div>
              )}
            </div>

            <div className="nav-actions">
              <Link to="/cart" className="cart-btn">
                🛒 {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
              </Link>
              {isAuthenticated ? (
                <div className="user-menu">
                  <button className="user-btn">
                      <RiAdminFill /> {user?.name?.split(' ')[0] || 'User'}
                  </button>
                  <div className="dropdown">
                    <Link to="/profile">My Profile</Link>
                    <Link to="/orders">My Orders</Link>
                    <Link to="/wishlist">Wishlist</Link>
                    {user?.role === 'admin' && (
                      <Link to="/admin" className="admin-link">
                        <RiAdminFill />
 Admin Panel
                      </Link>
                    )}
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                </div>
              ) : (
                <Link to="/login" className="login-btn">
                  <RiAdminFill />   Login
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
                    <Link to="/admin" className="admin-link"><RiAdminFill />
 Admin Panel</Link>
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
          /* Announcement Bar Styles */
          .announcement-bar {
            background: linear-gradient(135deg, #000000, #000000);
            color: white;
            padding: 10px 0;
            border-bottom: 2px solid rgba(255, 255, 255, 0.1);
          }

          .announcement-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 20px;
            
          }

          .announcement-text {
            margin: 0;
            font-size: 14px;
            font-weight: 400;
            text-align: center;
            flex: 1;
          }

          .announcement-link {
            color: #ffd700;
            font-weight: 600;
            text-decoration: none;
            margin-left: 5px;
            transition: color 0.3s ease;
          }

          .announcement-link:hover {
            color: #fff;
            text-decoration: underline;
          }

          .announcement-close {
            background: none;
            border: none;
            color: rgba(255, 255, 255, 0.7);
            font-size: 18px;
            cursor: pointer;
            padding: 0 5px;
            transition: color 0.3s ease;
            flex-shrink: 0;
          }

          .announcement-close:hover {
            color: #fff;
          }

          /* Navbar Styles */
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
          
          .search-wrapper {
            flex: 1;
            max-width: 400px;
            position: relative;
          }
          
          .search-form {
            position: relative;
            width: 100%;
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
            box-shadow: 0 0 0 3px rgba(0,0,0,0.05);
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
            padding: 0;
          }
          
          .search-suggestions {
            position: absolute;
            top: calc(100% + 8px);
            left: 0;
            right: 0;
            background: white;
            border-radius: 12px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.15);
            z-index: 1000;
            max-height: 400px;
            overflow-y: auto;
            padding: 8px 0;
          }
          
          .search-suggestions::-webkit-scrollbar {
            width: 6px;
          }
          
          .search-suggestions::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 6px;
          }
          
          .search-suggestions::-webkit-scrollbar-thumb {
            background: #ddd;
            border-radius: 6px;
          }
          
          .suggestion-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 10px 16px;
            cursor: pointer;
            transition: background 0.2s ease;
          }
          
          .suggestion-item:hover,
          .suggestion-item.selected {
            background: #f5f5f5;
          }
          
          .suggestion-image {
            width: 40px;
            height: 40px;
            object-fit: cover;
            border-radius: 8px;
            flex-shrink: 0;
            background: #f5f5f5;
          }
          
          .suggestion-info {
            flex: 1;
            min-width: 0;
          }
          
          .suggestion-title {
            font-size: 14px;
            font-weight: 500;
            color: #333;
            margin-bottom: 2px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          
          .suggestion-title .highlight {
            background: #fff3cd;
            padding: 0 2px;
            border-radius: 2px;
            color: #000;
          }
          
          .suggestion-price {
            font-size: 13px;
            font-weight: 600;
            color: #000;
          }
          
          .suggestion-category {
            font-size: 11px;
            color: #999;
            margin-top: 2px;
          }
          
          .suggestion-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 16px;
            border-top: 1px solid #eee;
            font-size: 12px;
            color: #999;
          }
          
          .view-all-btn {
            background: none;
            border: none;
            color: #000;
            font-weight: 600;
            cursor: pointer;
            padding: 4px 12px;
            border-radius: 20px;
            transition: background 0.2s ease;
            font-size: 12px;
          }
          
          .view-all-btn:hover {
            background: #f5f5f5;
          }
          
          .no-results {
            padding: 20px;
            text-align: center;
          }
          
          .no-results-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
          }
          
          .no-results-icon {
            font-size: 32px;
          }
          
          .no-results-content p {
            margin: 0;
            color: #666;
          }
          
          .no-results-content strong {
            color: #000;
          }
          
          .no-results-hint {
            font-size: 12px;
            color: #999 !important;
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
            .nav-links, .search-wrapper, .nav-actions {
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

            .announcement-text {
              font-size: 12px;
            }

            .announcement-container {
              flex-wrap: wrap;
              justify-content: center;
            }
          }
        `}</style>
      </nav>
    </>
  );
};

export default Navbar;