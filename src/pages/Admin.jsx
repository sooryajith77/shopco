// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

// const Admin = () => {
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [products, setProducts] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [editingItem, setEditingItem] = useState(null);
//   const [formData, setFormData] = useState({
//     title: '',
//     price: '',
//     description: '',
//     category: '',
//     image: '',
//     stock: ''
//   });
//   const [stats, setStats] = useState({
//     totalProducts: 0,
//     totalOrders: 0,
//     totalUsers: 0,
//     totalRevenue: 0
//   });

//   const { isAuthenticated, user } = useSelector((state) => state.auth);
//   const navigate = useNavigate();

//   // Check if user is admin
//   useEffect(() => {
//     if (!isAuthenticated || user?.email !== 'admin@shop.co') {
//       navigate('/login');
//     } else {
//       loadDashboardData();
//     }
//   }, [isAuthenticated, user, navigate]);

//   const loadDashboardData = () => {
//     fetchProducts();
//     fetchOrders();
//     fetchUsers();
//   };

//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch('https://fakestoreapi.com/products');
//       const data = await response.json();
//       setProducts(data);
//       setStats(prev => ({ ...prev, totalProducts: data.length }));
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//     setLoading(false);
//   };

//   const fetchOrders = () => {
//     // Get orders from localStorage
//     const savedOrders = localStorage.getItem('admin_orders');
//     const mockOrders = savedOrders ? JSON.parse(savedOrders) : [
//       { id: 1001, customer: 'John Doe', email: 'john@example.com', total: 299.99, status: 'delivered', date: '2024-01-15', items: 3 },
//       { id: 1002, customer: 'Jane Smith', email: 'jane@example.com', total: 459.99, status: 'processing', date: '2024-01-16', items: 2 },
//       { id: 1003, customer: 'Mike Johnson', email: 'mike@example.com', total: 189.99, status: 'pending', date: '2024-01-17', items: 1 },
//       { id: 1004, customer: 'Sarah Wilson', email: 'sarah@example.com', total: 567.99, status: 'shipped', date: '2024-01-18', items: 4 },
//       { id: 1005, customer: 'David Brown', email: 'david@example.com', total: 345.99, status: 'delivered', date: '2024-01-19', items: 2 },
//     ];
//     setOrders(mockOrders);
//     const totalRevenue = mockOrders.reduce((sum, order) => sum + order.total, 0);
//     setStats(prev => ({ ...prev, totalOrders: mockOrders.length, totalRevenue }));
//   };

//   const fetchUsers = () => {
//     // Get users from localStorage
//     const savedUsers = localStorage.getItem('admin_users');
//     const mockUsers = savedUsers ? JSON.parse(savedUsers) : [
//       { id: 1, name: 'Admin User', email: 'admin@shop.co', role: 'admin', joined: '2024-01-01', orders: 0 },
//       { id: 2, name: 'John Customer', email: 'john@example.com', role: 'user', joined: '2024-01-10', orders: 3 },
//       { id: 3, name: 'Jane Doe', email: 'jane@example.com', role: 'user', joined: '2024-01-12', orders: 2 },
//     ];
//     setUsers(mockUsers);
//     setStats(prev => ({ ...prev, totalUsers: mockUsers.length }));
//   };

//   // Product CRUD Operations
//   const handleAddProduct = () => {
//     setEditingItem(null);
//     setFormData({
//       title: '',
//       price: '',
//       description: '',
//       category: '',
//       image: '',
//       stock: ''
//     });
//     setShowModal(true);
//   };

//   const handleEditProduct = (product) => {
//     setEditingItem(product);
//     setFormData({
//       title: product.title,
//       price: product.price,
//       description: product.description,
//       category: product.category,
//       image: product.image,
//       stock: product.stock || 100
//     });
//     setShowModal(true);
//   };

//   const handleDeleteProduct = async (id) => {
//     if (window.confirm('Are you sure you want to delete this product?')) {
//       try {
//         // In real app, make API call
//         setProducts(products.filter(p => p.id !== id));
//         alert('Product deleted successfully!');
//       } catch (error) {
//         console.error('Error deleting product:', error);
//       }
//     }
//   };

//   const handleSubmitProduct = (e) => {
//     e.preventDefault();
    
//     if (editingItem) {
//       // Update existing product
//       const updatedProducts = products.map(p => 
//         p.id === editingItem.id ? { ...p, ...formData, price: parseFloat(formData.price) } : p
//       );
//       setProducts(updatedProducts);
//       alert('Product updated successfully!');
//     } else {
//       // Add new product
//       const newProduct = {
//         id: Date.now(),
//         ...formData,
//         price: parseFloat(formData.price),
//         rating: { rate: 0, count: 0 }
//       };
//       setProducts([...products, newProduct]);
//       alert('Product added successfully!');
//     }
    
//     setShowModal(false);
//     setEditingItem(null);
//     setFormData({
//       title: '',
//       price: '',
//       description: '',
//       category: '',
//       image: '',
//       stock: ''
//     });
//   };

//   // Order Management
//   const handleUpdateOrderStatus = (orderId, newStatus) => {
//     const updatedOrders = orders.map(order => 
//       order.id === orderId ? { ...order, status: newStatus } : order
//     );
//     setOrders(updatedOrders);
//     localStorage.setItem('admin_orders', JSON.stringify(updatedOrders));
//     alert(`Order #${orderId} status updated to ${newStatus}`);
//   };

//   const handleDeleteOrder = (orderId) => {
//     if (window.confirm('Are you sure you want to delete this order?')) {
//       const updatedOrders = orders.filter(order => order.id !== orderId);
//       setOrders(updatedOrders);
//       localStorage.setItem('admin_orders', JSON.stringify(updatedOrders));
//       alert('Order deleted successfully!');
//     }
//   };

//   // User Management
//   const handleAddUser = () => {
//     const name = prompt('Enter user name:');
//     const email = prompt('Enter user email:');
//     if (name && email) {
//       const newUser = {
//         id: Date.now(),
//         name,
//         email,
//         role: 'user',
//         joined: new Date().toISOString().split('T')[0],
//         orders: 0
//       };
//       setUsers([...users, newUser]);
//       localStorage.setItem('admin_users', JSON.stringify([...users, newUser]));
//       alert('User added successfully!');
//     }
//   };

//   const handleDeleteUser = (userId) => {
//     if (window.confirm('Are you sure you want to delete this user?')) {
//       const updatedUsers = users.filter(user => user.id !== userId);
//       setUsers(updatedUsers);
//       localStorage.setItem('admin_users', JSON.stringify(updatedUsers));
//       alert('User deleted successfully!');
//     }
//   };

//   const handleUpdateUserRole = (userId, newRole) => {
//     const updatedUsers = users.map(user => 
//       user.id === userId ? { ...user, role: newRole } : user
//     );
//     setUsers(updatedUsers);
//     localStorage.setItem('admin_users', JSON.stringify(updatedUsers));
//     alert(`User role updated to ${newRole}`);
//   };

//   // Dashboard Components
//   const Dashboard = () => (
//     <div className="dashboard">
//       <div className="stats-grid">
//         <div className="stat-card">
//           <div className="stat-icon">📦</div>
//           <div className="stat-info">
//             <h3>Total Products</h3>
//             <p className="stat-number">{stats.totalProducts}</p>
//           </div>
//         </div>
//         <div className="stat-card">
//           <div className="stat-icon">🛒</div>
//           <div className="stat-info">
//             <h3>Total Orders</h3>
//             <p className="stat-number">{stats.totalOrders}</p>
//           </div>
//         </div>
//         <div className="stat-card">
//           <div className="stat-icon">👥</div>
//           <div className="stat-info">
//             <h3>Total Users</h3>
//             <p className="stat-number">{stats.totalUsers}</p>
//           </div>
//         </div>
//         <div className="stat-card">
//           <div className="stat-icon">💰</div>
//           <div className="stat-info">
//             <h3>Total Revenue</h3>
//             <p className="stat-number">${stats.totalRevenue.toLocaleString()}</p>
//           </div>
//         </div>
//       </div>

//       <div className="recent-activity">
//         <h3>Recent Orders</h3>
//         <table className="data-table">
//           <thead>
//             <tr><th>Order ID</th><th>Customer</th><th>Total</th><th>Status</th><th>Date</th></tr>
//           </thead>
//           <tbody>
//             {orders.slice(0, 5).map(order => (
//               <tr key={order.id}>
//                 <td>#{order.id}</td>
//                 <td>{order.customer}</td>
//                 <td>${order.total}</td>
//                 <td><span className={`status-badge ${order.status}`}>{order.status}</span></td>
//                 <td>{order.date}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );

//   const ProductsManagement = () => (
//     <div className="products-management">
//       <div className="section-header">
//         <h2>Products Management</h2>
//         <button className="btn-primary" onClick={handleAddProduct}>+ Add New Product</button>
//       </div>
      
//       {loading ? (
//         <div className="loading">Loading...</div>
//       ) : (
//         <table className="data-table">
//           <thead>
//             <tr>
//               <th>Image</th>
//               <th>Title</th>
//               <th>Category</th>
//               <th>Price</th>
//               <th>Stock</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map(product => (
//               <tr key={product.id}>
//                 <td><img src={product.image} alt={product.title} className="product-thumb" /></td>
//                 <td>{product.title.substring(0, 50)}...</td>
//                 <td>{product.category}</td>
//                 <td>${product.price}</td>
//                 <td>{product.stock || 100}</td>
//                 <td className="actions">
//                   <button className="btn-edit" onClick={() => handleEditProduct(product)}>✏️ Edit</button>
//                   <button className="btn-delete" onClick={() => handleDeleteProduct(product.id)}>🗑️ Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );

//   const OrdersManagement = () => (
//     <div className="orders-management">
//       <div className="section-header">
//         <h2>Orders Management</h2>
//       </div>
      
//       <table className="data-table">
//         <thead>
//           <tr>
//             <th>Order ID</th>
//             <th>Customer</th>
//             <th>Email</th>
//             <th>Items</th>
//             <th>Total</th>
//             <th>Status</th>
//             <th>Date</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map(order => (
//             <tr key={order.id}>
//               <td>#{order.id}</td>
//               <td>{order.customer}</td>
//               <td>{order.email}</td>
//               <td>{order.items}</td>
//               <td>${order.total}</td>
//               <td>
//                 <select 
//                   value={order.status} 
//                   onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
//                   className={`status-select ${order.status}`}
//                 >
//                   <option value="pending">Pending</option>
//                   <option value="processing">Processing</option>
//                   <option value="shipped">Shipped</option>
//                   <option value="delivered">Delivered</option>
//                   <option value="cancelled">Cancelled</option>
//                 </select>
//               </td>
//               <td>{order.date}</td>
//               <td className="actions">
//                 <button className="btn-delete" onClick={() => handleDeleteOrder(order.id)}>🗑️ Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );

//   const UsersManagement = () => (
//     <div className="users-management">
//       <div className="section-header">
//         <h2>Users Management</h2>
//         <button className="btn-primary" onClick={handleAddUser}>+ Add New User</button>
//       </div>
      
//       <table className="data-table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Role</th>
//             <th>Joined Date</th>
//             <th>Orders</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map(user => (
//             <tr key={user.id}>
//               <td>#{user.id}</td>
//               <td>{user.name}</td>
//               <td>{user.email}</td>
//               <td>
//                 <select 
//                   value={user.role} 
//                   onChange={(e) => handleUpdateUserRole(user.id, e.target.value)}
//                   className="role-select"
//                 >
//                   <option value="user">User</option>
//                   <option value="admin">Admin</option>
//                 </select>
//               </td>
//               <td>{user.joined}</td>
//               <td>{user.orders}</td>
//               <td className="actions">
//                 <button className="btn-delete" onClick={() => handleDeleteUser(user.id)}>🗑️ Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );

//   const Settings = () => (
//     <div className="settings">
//       <h2>Site Settings</h2>
//       <div className="settings-form">
//         <div className="form-group">
//           <label>Site Name</label>
//           <input type="text" defaultValue="SHOP.CO" className="form-input" />
//         </div>
//         <div className="form-group">
//           <label>Site Logo</label>
//           <input type="text" defaultValue="/logo.png" className="form-input" />
//         </div>
//         <div className="form-group">
//           <label>Contact Email</label>
//           <input type="email" defaultValue="support@shop.co" className="form-input" />
//         </div>
//         <div className="form-group">
//           <label>Phone Number</label>
//           <input type="text" defaultValue="+1 234 567 8900" className="form-input" />
//         </div>
//         <div className="form-group">
//           <label>Address</label>
//           <textarea className="form-input" rows="3">123 Fashion Street, New York, NY 10001</textarea>
//         </div>
//         <button className="btn-primary">Save Settings</button>
//       </div>
//     </div>
//   );

//   return (
//     <div className="admin-panel">
//       <div className="admin-sidebar">
//         <div className="admin-logo">
//           <h2>SHOP.CO Admin</h2>
//         </div>
//         <nav className="admin-nav">
//           <button className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
//             📊 Dashboard
//           </button>
//           <button className={activeTab === 'products' ? 'active' : ''} onClick={() => setActiveTab('products')}>
//             📦 Products
//           </button>
//           <button className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>
//             🛒 Orders
//           </button>
//           <button className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>
//             👥 Users
//           </button>
//           <button className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>
//             ⚙️ Settings
//           </button>
//         </nav>
//       </div>

//       <div className="admin-content">
//         <div className="admin-header">
//           <h1>Welcome back, {user?.name || 'Admin'}!</h1>
//           <button className="btn-logout" onClick={() => navigate('/')}>View Store →</button>
//         </div>

//         <div className="admin-main">
//           {activeTab === 'dashboard' && <Dashboard />}
//           {activeTab === 'products' && <ProductsManagement />}
//           {activeTab === 'orders' && <OrdersManagement />}
//           {activeTab === 'users' && <UsersManagement />}
//           {activeTab === 'settings' && <Settings />}
//         </div>
//       </div>

//       {/* Product Modal */}
//       {showModal && (
//         <div className="modal-overlay" onClick={() => setShowModal(false)}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <h2>{editingItem ? 'Edit Product' : 'Add New Product'}</h2>
//             <form onSubmit={handleSubmitProduct}>
//               <div className="form-group">
//                 <label>Product Title</label>
//                 <input
//                   type="text"
//                   value={formData.title}
//                   onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                   required
//                   className="form-input"
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Price ($)</label>
//                 <input
//                   type="number"
//                   step="0.01"
//                   value={formData.price}
//                   onChange={(e) => setFormData({ ...formData, price: e.target.value })}
//                   required
//                   className="form-input"
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Category</label>
//                 <input
//                   type="text"
//                   value={formData.category}
//                   onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//                   required
//                   className="form-input"
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Description</label>
//                 <textarea
//                   value={formData.description}
//                   onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                   required
//                   className="form-input"
//                   rows="3"
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Image URL</label>
//                 <input
//                   type="url"
//                   value={formData.image}
//                   onChange={(e) => setFormData({ ...formData, image: e.target.value })}
//                   required
//                   className="form-input"
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Stock Quantity</label>
//                 <input
//                   type="number"
//                   value={formData.stock}
//                   onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
//                   className="form-input"
//                 />
//               </div>
//               <div className="modal-actions">
//                 <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
//                 <button type="submit" className="btn-primary">{editingItem ? 'Update' : 'Add'} Product</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       <style jsx>{`
//         .admin-panel {
//           display: flex;
//           min-height: 100vh;
//           background: #f5f5f5;
//         }

//         .admin-sidebar {
//           width: 280px;
//           background: linear-gradient(135deg, #000 0%, #1a1a1a 100%);
//           color: white;
//           padding: 30px 20px;
//           position: fixed;
//           height: 100vh;
//           overflow-y: auto;
//         }

//         .admin-logo h2 {
//           margin-bottom: 30px;
//           text-align: center;
//           font-size: 24px;
//         }

//         .admin-nav {
//           display: flex;
//           flex-direction: column;
//           gap: 10px;
//         }

//         .admin-nav button {
//           padding: 12px 20px;
//           background: transparent;
//           border: none;
//           color: #ccc;
//           text-align: left;
//           font-size: 16px;
//           cursor: pointer;
//           border-radius: 8px;
//           transition: all 0.3s;
//         }

//         .admin-nav button:hover {
//           background: rgba(255,255,255,0.1);
//           color: white;
//         }

//         .admin-nav button.active {
//           background: #fff;
//           color: #000;
//           font-weight: 600;
//         }

//         .admin-content {
//           flex: 1;
//           margin-left: 280px;
//           padding: 20px;
//         }

//         .admin-header {
//           background: white;
//           padding: 20px 30px;
//           border-radius: 12px;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 30px;
//           box-shadow: 0 2px 8px rgba(0,0,0,0.1);
//         }

//         .btn-logout {
//           padding: 10px 20px;
//           background: #000;
//           color: white;
//           border: none;
//           border-radius: 6px;
//           cursor: pointer;
//         }

//         .admin-main {
//           background: white;
//           border-radius: 12px;
//           padding: 30px;
//           box-shadow: 0 2px 8px rgba(0,0,0,0.1);
//         }

//         .stats-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//           gap: 20px;
//           margin-bottom: 40px;
//         }

//         .stat-card {
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           color: white;
//           padding: 25px;
//           border-radius: 12px;
//           display: flex;
//           align-items: center;
//           gap: 20px;
//         }

//         .stat-icon {
//           font-size: 48px;
//         }

//         .stat-info h3 {
//           font-size: 14px;
//           margin-bottom: 5px;
//           opacity: 0.9;
//         }

//         .stat-number {
//           font-size: 32px;
//           font-weight: bold;
//           margin: 0;
//         }

//         .section-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 30px;
//         }

//         .data-table {
//           width: 100%;
//           border-collapse: collapse;
//         }

//         .data-table th,
//         .data-table td {
//           padding: 12px;
//           text-align: left;
//           border-bottom: 1px solid #e0e0e0;
//         }

//         .data-table th {
//           background: #f8f8f8;
//           font-weight: 600;
//         }

//         .product-thumb {
//           width: 50px;
//           height: 50px;
//           object-fit: cover;
//           border-radius: 8px;
//         }

//         .status-badge {
//           padding: 4px 12px;
//           border-radius: 20px;
//           font-size: 12px;
//           font-weight: 600;
//         }

//         .status-badge.pending { background: #ff9800; color: white; }
//         .status-badge.processing { background: #2196f3; color: white; }
//         .status-badge.shipped { background: #9c27b0; color: white; }
//         .status-badge.delivered { background: #4caf50; color: white; }
//         .status-badge.cancelled { background: #f44336; color: white; }

//         .status-select {
//           padding: 5px 10px;
//           border-radius: 6px;
//           border: 1px solid #ddd;
//         }

//         .actions {
//           display: flex;
//           gap: 10px;
//         }

//         .btn-edit, .btn-delete {
//           padding: 5px 10px;
//           border: none;
//           border-radius: 6px;
//           cursor: pointer;
//         }

//         .btn-edit {
//           background: #2196f3;
//           color: white;
//         }

//         .btn-delete {
//           background: #f44336;
//           color: white;
//         }

//         .modal-overlay {
//           position: fixed;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background: rgba(0,0,0,0.7);
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           z-index: 1000;
//         }

//         .modal-content {
//           background: white;
//           padding: 30px;
//           border-radius: 12px;
//           width: 90%;
//           max-width: 600px;
//           max-height: 80vh;
//           overflow-y: auto;
//         }

//         .form-group {
//           margin-bottom: 20px;
//         }

//         .form-group label {
//           display: block;
//           margin-bottom: 8px;
//           font-weight: 600;
//         }

//         .form-input {
//           width: 100%;
//           padding: 10px;
//           border: 1px solid #ddd;
//           border-radius: 6px;
//           font-size: 14px;
//         }

//         .modal-actions {
//           display: flex;
//           justify-content: flex-end;
//           gap: 15px;
//           margin-top: 20px;
//         }

//         .settings-form {
//           max-width: 600px;
//         }

//         @media (max-width: 768px) {
//           .admin-sidebar {
//             width: 80px;
//             padding: 20px 10px;
//           }
//           .admin-sidebar h2, .admin-nav button span {
//             display: none;
//           }
//           .admin-content {
//             margin-left: 80px;
//           }
//           .stats-grid {
//             grid-template-columns: 1fr;
//           }
//           .data-table {
//             font-size: 12px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Admin;




// Admin.jsx - Complete with Backend Integration
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  clearError
} from '../redux/slices/productSlice';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [dashboardStats, setDashboardStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    recentOrders: []
  });
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
    stock: ''
  });

  // Get products from Redux store
  const { products, loading: productsLoading, error } = useSelector((state) => state.products);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Get auth token
  const getAuthToken = () => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData).token : null;
  };

  // Helper function for API calls
  const apiRequest = async (url, options = {}) => {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`,
          ...options.headers
        }
      });
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || error.error || 'API request failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };

  // Check if user is admin
  useEffect(() => {
    if (!isAuthenticated || user?.email !== 'admin@shop.co') {
      navigate('/login');
    } else {
      loadDashboardData();
    }
  }, [isAuthenticated, user, navigate]);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const loadDashboardData = async () => {
    await Promise.all([
      dispatch(fetchProducts()),
      fetchDashboardStats(),
      fetchOrders(),
      fetchUsers()
    ]);
  };

  const fetchDashboardStats = async () => {
    try {
      const stats = await apiRequest(`${API_URL}/admin/dashboard/stats`);
      setDashboardStats(stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const data = await apiRequest(`${API_URL}/admin/orders`);
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      alert('Failed to fetch orders');
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await apiRequest(`${API_URL}/admin/users`);
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      alert('Failed to fetch users');
    }
  };

  // Product CRUD Operations using Redux
  const handleAddProduct = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      price: '',
      description: '',
      category: '',
      image: '',
      stock: ''
    });
    setShowModal(true);
  };

  const handleEditProduct = (product) => {
    setEditingItem(product);
    setFormData({
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
      stock: product.stock || 100
    });
    setShowModal(true);
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setLoading(true);
      try {
        await dispatch(deleteProduct(id)).unwrap();
        alert('Product deleted successfully!');
        await fetchDashboardStats();
      } catch (error) {
        console.error('Error deleting product:', error);
        alert(error.message || 'Failed to delete product');
      }
      setLoading(false);
    }
  };

 const handleSubmitProduct = async (e) => {
  e.preventDefault();
  setLoading(true);
  
  try {
    const productData = {
      title: formData.title,
      price: parseFloat(formData.price),
      description: formData.description,
      category: formData.category,
      image: formData.image,
      stock: parseInt(formData.stock) || 100
      // REMOVE the rating field completely
    };

    if (editingItem) {
      await dispatch(updateProduct({ 
        id: editingItem.id, 
        productData 
      })).unwrap();
      alert('Product updated successfully!');
    } else {
      await dispatch(createProduct(productData)).unwrap();
      alert('Product added successfully!');
    }
    
    await fetchDashboardStats();
    setShowModal(false);
    setEditingItem(null);
    setFormData({
      title: '',
      price: '',
      description: '',
      category: '',
      image: '',
      stock: ''
    });
  } catch (error) {
    console.error('Error saving product:', error);
    alert(error.message || 'Failed to save product');
  }
  setLoading(false);
};

  // Order Management
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await apiRequest(`${API_URL}/admin/orders/${orderId}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status: newStatus })
      });
      await fetchOrders();
      await fetchDashboardStats();
      alert(`Order #${orderId} status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Failed to update order status');
    }
  };

  // User Management
  const handleUpdateUserRole = async (userId, newRole) => {
    try {
      await apiRequest(`${API_URL}/admin/users/${userId}`, {
        method: 'PUT',
        body: JSON.stringify({ role: newRole })
      });
      await fetchUsers();
      alert(`User role updated to ${newRole}`);
    } catch (error) {
      console.error('Error updating user role:', error);
      alert('Failed to update user role');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await apiRequest(`${API_URL}/admin/users/${userId}`, {
          method: 'DELETE'
        });
        await fetchUsers();
        await fetchDashboardStats();
        alert('User deleted successfully!');
      } catch (error) {
        console.error('Error deleting user:', error);
        alert(error.message || 'Failed to delete user');
      }
    }
  };

  // Dashboard Components
  const Dashboard = () => (
    <div className="dashboard">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-info">
            <h3>Total Products</h3>
            <p className="stat-number">{dashboardStats.totalProducts}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🛒</div>
          <div className="stat-info">
            <h3>Total Orders</h3>
            <p className="stat-number">{dashboardStats.totalOrders}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>Total Users</h3>
            <p className="stat-number">{dashboardStats.totalUsers}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>Total Revenue</h3>
            <p className="stat-number">${(dashboardStats.totalRevenue || 0).toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="recent-activity">
        <h3>Recent Orders</h3>
        <table className="data-table">
          <thead>
            <tr><th>Order ID</th><th>Customer</th><th>Total</th><th>Status</th><th>Date</th></tr>
          </thead>
          <tbody>
            {(dashboardStats.recentOrders || []).slice(0, 5).map(order => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.User?.name || 'Guest'}</td>
                <td>${order.total_amount || order.total}</td>
                <td><span className={`status-badge ${order.status}`}>{order.status}</span></td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const ProductsManagement = () => (
    <div className="products-management">
      <div className="section-header">
        <h2>Products Management</h2>
        <button className="btn-primary" onClick={handleAddProduct}>+ Add New Product</button>
      </div>
      
      {(productsLoading || loading) ? (
        <div className="loading">Loading...</div>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="product-thumb"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/50';
                    }}
                  />
                </td>
                <td>{product.title.substring(0, 50)}...</td>
                <td>{product.category}</td>
                <td>${product.price}</td>
                <td>{product.stock || 100}</td>
                <td className="actions">
                  <button className="btn-edit" onClick={() => handleEditProduct(product)}>✏️ Edit</button>
                  <button className="btn-delete" onClick={() => handleDeleteProduct(product.id)}>🗑️ Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  const OrdersManagement = () => (
    <div className="orders-management">
      <div className="section-header">
        <h2>Orders Management</h2>
      </div>
      
      <table className="data-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Email</th>
            <th>Items</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>#{order.id}</td>
              <td>{order.User?.name || order.customer || 'Guest'}</td>
              <td>{order.User?.email || order.email || 'N/A'}</td>
              <td>{order.OrderItems?.length || order.items || 0}</td>
              <td>${order.total_amount || order.total}</td>
              <td>
                <select 
                  value={order.status} 
                  onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                  className={`status-select ${order.status}`}
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td className="actions">
                <button className="btn-delete" onClick={() => handleDeleteOrder(order.id)}>🗑️ Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const UsersManagement = () => (
    <div className="users-management">
      <div className="section-header">
        <h2>Users Management</h2>
      </div>
      
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Joined Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <select 
                  value={user.role} 
                  onChange={(e) => handleUpdateUserRole(user.id, e.target.value)}
                  className="role-select"
                  disabled={user.email === 'admin@shop.co'}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              <td className="actions">
                <button 
                  className="btn-delete" 
                  onClick={() => handleDeleteUser(user.id)}
                  disabled={user.email === 'admin@shop.co'}
                >
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Add delete order function
  const handleDeleteOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        // Note: You may need to add this endpoint to your backend
        await apiRequest(`${API_URL}/admin/orders/${orderId}`, {
          method: 'DELETE'
        });
        await fetchOrders();
        await fetchDashboardStats();
        alert('Order deleted successfully!');
      } catch (error) {
        console.error('Error deleting order:', error);
        alert('Failed to delete order');
      }
    }
  };

  return (
    <div className="admin-panel">
      <div className="admin-sidebar">
        <div className="admin-logo">
          <h2>SHOP.CO Admin</h2>
        </div>
        <nav className="admin-nav">
          <button className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
            📊 Dashboard
          </button>
          <button className={activeTab === 'products' ? 'active' : ''} onClick={() => setActiveTab('products')}>
            📦 Products
          </button>
          <button className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>
            🛒 Orders
          </button>
          <button className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>
            👥 Users
          </button>
        </nav>
      </div>

      <div className="admin-content">
        <div className="admin-header">
          <h1>Welcome back, {user?.name || 'Admin'}!</h1>
          <button className="btn-logout" onClick={() => navigate('/')}>View Store →</button>
        </div>

        <div className="admin-main">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'products' && <ProductsManagement />}
          {activeTab === 'orders' && <OrdersManagement />}
          {activeTab === 'users' && <UsersManagement />}
        </div>
      </div>

      {/* Product Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{editingItem ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSubmitProduct}>
              <div className="form-group">
                <label>Product Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Price ($) *</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                  className="form-input"
                >
                  <option value="">Select Category</option>
                  <option value="men's clothing">Men's Clothing</option>
                  <option value="women's clothing">Women's Clothing</option>
                  <option value="jewelery">Jewelery</option>
                  <option value="electronics">Electronics</option>
                </select>
              </div>
              <div className="form-group">
                <label>Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  className="form-input"
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label>Image URL *</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Stock Quantity</label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="form-input"
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? 'Saving...' : (editingItem ? 'Update' : 'Add')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .admin-panel {
          display: flex;
          min-height: 100vh;
          background: #f5f5f5;
        }

        .admin-sidebar {
          width: 280px;
          background: linear-gradient(135deg, #000 0%, #1a1a1a 100%);
          color: white;
          padding: 30px 20px;
          position: fixed;
          height: 100vh;
          overflow-y: auto;
        }

        .admin-logo h2 {
          margin-bottom: 30px;
          text-align: center;
          font-size: 24px;
        }

        .admin-nav {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .admin-nav button {
          padding: 12px 20px;
          background: transparent;
          border: none;
          color: #ccc;
          text-align: left;
          font-size: 16px;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.3s;
        }

        .admin-nav button:hover {
          background: rgba(255,255,255,0.1);
          color: white;
        }

        .admin-nav button.active {
          background: #fff;
          color: #000;
          font-weight: 600;
        }

        .admin-content {
          flex: 1;
          margin-left: 280px;
          padding: 20px;
        }

        .admin-header {
          background: white;
          padding: 20px 30px;
          border-radius: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .btn-logout {
          padding: 10px 20px;
          background: #000;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }

        .admin-main {
          background: white;
          border-radius: 12px;
          padding: 30px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .stat-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 25px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .stat-icon {
          font-size: 48px;
        }

        .stat-info h3 {
          font-size: 14px;
          margin-bottom: 5px;
          opacity: 0.9;
        }

        .stat-number {
          font-size: 32px;
          font-weight: bold;
          margin: 0;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .btn-primary {
          background: #000;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
        }

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-secondary {
          background: #ccc;
          color: #000;
          padding: 10px 20px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
        }

        .data-table th,
        .data-table td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #e0e0e0;
        }

        .data-table th {
          background: #f8f8f8;
          font-weight: 600;
        }

        .product-thumb {
          width: 50px;
          height: 50px;
          object-fit: cover;
          border-radius: 8px;
        }

        .status-badge {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          display: inline-block;
        }

        .status-badge.pending { background: #ff9800; color: white; }
        .status-badge.processing { background: #2196f3; color: white; }
        .status-badge.shipped { background: #9c27b0; color: white; }
        .status-badge.delivered { background: #4caf50; color: white; }
        .status-badge.cancelled { background: #f44336; color: white; }

        .status-select {
          padding: 5px 10px;
          border-radius: 6px;
          border: 1px solid #ddd;
        }

        .role-select {
          padding: 5px 10px;
          border-radius: 6px;
          border: 1px solid #ddd;
        }

        .actions {
          display: flex;
          gap: 10px;
        }

        .btn-edit, .btn-delete {
          padding: 5px 10px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }

        .btn-edit {
          background: #2196f3;
          color: white;
        }

        .btn-delete {
          background: #f44336;
          color: white;
        }

        .btn-delete:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal-content {
          background: white;
          padding: 30px;
          border-radius: 12px;
          width: 90%;
          max-width: 600px;
          max-height: 80vh;
          overflow-y: auto;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
        }

        .form-input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 14px;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 15px;
          margin-top: 20px;
        }

        .loading {
          text-align: center;
          padding: 40px;
          font-size: 18px;
          color: #666;
        }

        @media (max-width: 768px) {
          .admin-sidebar {
            width: 80px;
            padding: 20px 10px;
          }
          .admin-sidebar h2 {
            display: none;
          }
          .admin-nav button {
            font-size: 20px;
            text-align: center;
            padding: 12px;
          }
          .admin-content {
            margin-left: 80px;
          }
          .stats-grid {
            grid-template-columns: 1fr;
          }
          .data-table {
            font-size: 12px;
          }
          .actions {
            flex-direction: column;
          }
          .product-thumb {
            width: 30px;
            height: 30px;
          }
        }
      `}</style>
    </div>
  );
};

export default Admin;