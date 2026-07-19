// // import React, { useState, useEffect } from 'react';
// // import { useSelector } from 'react-redux';
// // import { useNavigate } from 'react-router-dom';

// // const Admin = () => {
// //   const [activeTab, setActiveTab] = useState('dashboard');
// //   const [products, setProducts] = useState([]);
// //   const [orders, setOrders] = useState([]);
// //   const [users, setUsers] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [showModal, setShowModal] = useState(false);
// //   const [editingItem, setEditingItem] = useState(null);
// //   const [formData, setFormData] = useState({
// //     title: '',
// //     price: '',
// //     description: '',
// //     category: '',
// //     image: '',
// //     stock: ''
// //   });
// //   const [stats, setStats] = useState({
// //     totalProducts: 0,
// //     totalOrders: 0,
// //     totalUsers: 0,
// //     totalRevenue: 0
// //   });

// //   const { isAuthenticated, user } = useSelector((state) => state.auth);
// //   const navigate = useNavigate();

// //   // Check if user is admin
// //   useEffect(() => {
// //     if (!isAuthenticated || user?.email !== 'admin@shop.co') {
// //       navigate('/login');
// //     } else {
// //       loadDashboardData();
// //     }
// //   }, [isAuthenticated, user, navigate]);

// //   const loadDashboardData = () => {
// //     fetchProducts();
// //     fetchOrders();
// //     fetchUsers();
// //   };

// //   const fetchProducts = async () => {
// //     setLoading(true);
// //     try {
// //       const response = await fetch('https://fakestoreapi.com/products');
// //       const data = await response.json();
// //       setProducts(data);
// //       setStats(prev => ({ ...prev, totalProducts: data.length }));
// //     } catch (error) {
// //       console.error('Error fetching products:', error);
// //     }
// //     setLoading(false);
// //   };

// //   const fetchOrders = () => {
// //     // Get orders from localStorage
// //     const savedOrders = localStorage.getItem('admin_orders');
// //     const mockOrders = savedOrders ? JSON.parse(savedOrders) : [
// //       { id: 1001, customer: 'John Doe', email: 'john@example.com', total: 299.99, status: 'delivered', date: '2024-01-15', items: 3 },
// //       { id: 1002, customer: 'Jane Smith', email: 'jane@example.com', total: 459.99, status: 'processing', date: '2024-01-16', items: 2 },
// //       { id: 1003, customer: 'Mike Johnson', email: 'mike@example.com', total: 189.99, status: 'pending', date: '2024-01-17', items: 1 },
// //       { id: 1004, customer: 'Sarah Wilson', email: 'sarah@example.com', total: 567.99, status: 'shipped', date: '2024-01-18', items: 4 },
// //       { id: 1005, customer: 'David Brown', email: 'david@example.com', total: 345.99, status: 'delivered', date: '2024-01-19', items: 2 },
// //     ];
// //     setOrders(mockOrders);
// //     const totalRevenue = mockOrders.reduce((sum, order) => sum + order.total, 0);
// //     setStats(prev => ({ ...prev, totalOrders: mockOrders.length, totalRevenue }));
// //   };

// //   const fetchUsers = () => {
// //     // Get users from localStorage
// //     const savedUsers = localStorage.getItem('admin_users');
// //     const mockUsers = savedUsers ? JSON.parse(savedUsers) : [
// //       { id: 1, name: 'Admin User', email: 'admin@shop.co', role: 'admin', joined: '2024-01-01', orders: 0 },
// //       { id: 2, name: 'John Customer', email: 'john@example.com', role: 'user', joined: '2024-01-10', orders: 3 },
// //       { id: 3, name: 'Jane Doe', email: 'jane@example.com', role: 'user', joined: '2024-01-12', orders: 2 },
// //     ];
// //     setUsers(mockUsers);
// //     setStats(prev => ({ ...prev, totalUsers: mockUsers.length }));
// //   };

// //   // Product CRUD Operations
// //   const handleAddProduct = () => {
// //     setEditingItem(null);
// //     setFormData({
// //       title: '',
// //       price: '',
// //       description: '',
// //       category: '',
// //       image: '',
// //       stock: ''
// //     });
// //     setShowModal(true);
// //   };

// //   const handleEditProduct = (product) => {
// //     setEditingItem(product);
// //     setFormData({
// //       title: product.title,
// //       price: product.price,
// //       description: product.description,
// //       category: product.category,
// //       image: product.image,
// //       stock: product.stock || 100
// //     });
// //     setShowModal(true);
// //   };

// //   const handleDeleteProduct = async (id) => {
// //     if (window.confirm('Are you sure you want to delete this product?')) {
// //       try {
// //         // In real app, make API call
// //         setProducts(products.filter(p => p.id !== id));
// //         alert('Product deleted successfully!');
// //       } catch (error) {
// //         console.error('Error deleting product:', error);
// //       }
// //     }
// //   };

// //   const handleSubmitProduct = (e) => {
// //     e.preventDefault();
    
// //     if (editingItem) {
// //       // Update existing product
// //       const updatedProducts = products.map(p => 
// //         p.id === editingItem.id ? { ...p, ...formData, price: parseFloat(formData.price) } : p
// //       );
// //       setProducts(updatedProducts);
// //       alert('Product updated successfully!');
// //     } else {
// //       // Add new product
// //       const newProduct = {
// //         id: Date.now(),
// //         ...formData,
// //         price: parseFloat(formData.price),
// //         rating: { rate: 0, count: 0 }
// //       };
// //       setProducts([...products, newProduct]);
// //       alert('Product added successfully!');
// //     }
    
// //     setShowModal(false);
// //     setEditingItem(null);
// //     setFormData({
// //       title: '',
// //       price: '',
// //       description: '',
// //       category: '',
// //       image: '',
// //       stock: ''
// //     });
// //   };

// //   // Order Management
// //   const handleUpdateOrderStatus = (orderId, newStatus) => {
// //     const updatedOrders = orders.map(order => 
// //       order.id === orderId ? { ...order, status: newStatus } : order
// //     );
// //     setOrders(updatedOrders);
// //     localStorage.setItem('admin_orders', JSON.stringify(updatedOrders));
// //     alert(`Order #${orderId} status updated to ${newStatus}`);
// //   };

// //   const handleDeleteOrder = (orderId) => {
// //     if (window.confirm('Are you sure you want to delete this order?')) {
// //       const updatedOrders = orders.filter(order => order.id !== orderId);
// //       setOrders(updatedOrders);
// //       localStorage.setItem('admin_orders', JSON.stringify(updatedOrders));
// //       alert('Order deleted successfully!');
// //     }
// //   };

// //   // User Management
// //   const handleAddUser = () => {
// //     const name = prompt('Enter user name:');
// //     const email = prompt('Enter user email:');
// //     if (name && email) {
// //       const newUser = {
// //         id: Date.now(),
// //         name,
// //         email,
// //         role: 'user',
// //         joined: new Date().toISOString().split('T')[0],
// //         orders: 0
// //       };
// //       setUsers([...users, newUser]);
// //       localStorage.setItem('admin_users', JSON.stringify([...users, newUser]));
// //       alert('User added successfully!');
// //     }
// //   };

// //   const handleDeleteUser = (userId) => {
// //     if (window.confirm('Are you sure you want to delete this user?')) {
// //       const updatedUsers = users.filter(user => user.id !== userId);
// //       setUsers(updatedUsers);
// //       localStorage.setItem('admin_users', JSON.stringify(updatedUsers));
// //       alert('User deleted successfully!');
// //     }
// //   };

// //   const handleUpdateUserRole = (userId, newRole) => {
// //     const updatedUsers = users.map(user => 
// //       user.id === userId ? { ...user, role: newRole } : user
// //     );
// //     setUsers(updatedUsers);
// //     localStorage.setItem('admin_users', JSON.stringify(updatedUsers));
// //     alert(`User role updated to ${newRole}`);
// //   };

// //   // Dashboard Components
// //   const Dashboard = () => (
// //     <div className="dashboard">
// //       <div className="stats-grid">
// //         <div className="stat-card">
// //           <div className="stat-icon">📦</div>
// //           <div className="stat-info">
// //             <h3>Total Products</h3>
// //             <p className="stat-number">{stats.totalProducts}</p>
// //           </div>
// //         </div>
// //         <div className="stat-card">
// //           <div className="stat-icon">🛒</div>
// //           <div className="stat-info">
// //             <h3>Total Orders</h3>
// //             <p className="stat-number">{stats.totalOrders}</p>
// //           </div>
// //         </div>
// //         <div className="stat-card">
// //           <div className="stat-icon">👥</div>
// //           <div className="stat-info">
// //             <h3>Total Users</h3>
// //             <p className="stat-number">{stats.totalUsers}</p>
// //           </div>
// //         </div>
// //         <div className="stat-card">
// //           <div className="stat-icon">💰</div>
// //           <div className="stat-info">
// //             <h3>Total Revenue</h3>
// //             <p className="stat-number">${stats.totalRevenue.toLocaleString()}</p>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="recent-activity">
// //         <h3>Recent Orders</h3>
// //         <table className="data-table">
// //           <thead>
// //             <tr><th>Order ID</th><th>Customer</th><th>Total</th><th>Status</th><th>Date</th></tr>
// //           </thead>
// //           <tbody>
// //             {orders.slice(0, 5).map(order => (
// //               <tr key={order.id}>
// //                 <td>#{order.id}</td>
// //                 <td>{order.customer}</td>
// //                 <td>${order.total}</td>
// //                 <td><span className={`status-badge ${order.status}`}>{order.status}</span></td>
// //                 <td>{order.date}</td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );

// //   const ProductsManagement = () => (
// //     <div className="products-management">
// //       <div className="section-header">
// //         <h2>Products Management</h2>
// //         <button className="btn-primary" onClick={handleAddProduct}>+ Add New Product</button>
// //       </div>
      
// //       {loading ? (
// //         <div className="loading">Loading...</div>
// //       ) : (
// //         <table className="data-table">
// //           <thead>
// //             <tr>
// //               <th>Image</th>
// //               <th>Title</th>
// //               <th>Category</th>
// //               <th>Price</th>
// //               <th>Stock</th>
// //               <th>Actions</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {products.map(product => (
// //               <tr key={product.id}>
// //                 <td><img src={product.image} alt={product.title} className="product-thumb" /></td>
// //                 <td>{product.title.substring(0, 50)}...</td>
// //                 <td>{product.category}</td>
// //                 <td>${product.price}</td>
// //                 <td>{product.stock || 100}</td>
// //                 <td className="actions">
// //                   <button className="btn-edit" onClick={() => handleEditProduct(product)}>✏️ Edit</button>
// //                   <button className="btn-delete" onClick={() => handleDeleteProduct(product.id)}>🗑️ Delete</button>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       )}
// //     </div>
// //   );

// //   const OrdersManagement = () => (
// //     <div className="orders-management">
// //       <div className="section-header">
// //         <h2>Orders Management</h2>
// //       </div>
      
// //       <table className="data-table">
// //         <thead>
// //           <tr>
// //             <th>Order ID</th>
// //             <th>Customer</th>
// //             <th>Email</th>
// //             <th>Items</th>
// //             <th>Total</th>
// //             <th>Status</th>
// //             <th>Date</th>
// //             <th>Actions</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {orders.map(order => (
// //             <tr key={order.id}>
// //               <td>#{order.id}</td>
// //               <td>{order.customer}</td>
// //               <td>{order.email}</td>
// //               <td>{order.items}</td>
// //               <td>${order.total}</td>
// //               <td>
// //                 <select 
// //                   value={order.status} 
// //                   onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
// //                   className={`status-select ${order.status}`}
// //                 >
// //                   <option value="pending">Pending</option>
// //                   <option value="processing">Processing</option>
// //                   <option value="shipped">Shipped</option>
// //                   <option value="delivered">Delivered</option>
// //                   <option value="cancelled">Cancelled</option>
// //                 </select>
// //               </td>
// //               <td>{order.date}</td>
// //               <td className="actions">
// //                 <button className="btn-delete" onClick={() => handleDeleteOrder(order.id)}>🗑️ Delete</button>
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );

// //   const UsersManagement = () => (
// //     <div className="users-management">
// //       <div className="section-header">
// //         <h2>Users Management</h2>
// //         <button className="btn-primary" onClick={handleAddUser}>+ Add New User</button>
// //       </div>
      
// //       <table className="data-table">
// //         <thead>
// //           <tr>
// //             <th>ID</th>
// //             <th>Name</th>
// //             <th>Email</th>
// //             <th>Role</th>
// //             <th>Joined Date</th>
// //             <th>Orders</th>
// //             <th>Actions</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {users.map(user => (
// //             <tr key={user.id}>
// //               <td>#{user.id}</td>
// //               <td>{user.name}</td>
// //               <td>{user.email}</td>
// //               <td>
// //                 <select 
// //                   value={user.role} 
// //                   onChange={(e) => handleUpdateUserRole(user.id, e.target.value)}
// //                   className="role-select"
// //                 >
// //                   <option value="user">User</option>
// //                   <option value="admin">Admin</option>
// //                 </select>
// //               </td>
// //               <td>{user.joined}</td>
// //               <td>{user.orders}</td>
// //               <td className="actions">
// //                 <button className="btn-delete" onClick={() => handleDeleteUser(user.id)}>🗑️ Delete</button>
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );

// //   const Settings = () => (
// //     <div className="settings">
// //       <h2>Site Settings</h2>
// //       <div className="settings-form">
// //         <div className="form-group">
// //           <label>Site Name</label>
// //           <input type="text" defaultValue="SHOP.CO" className="form-input" />
// //         </div>
// //         <div className="form-group">
// //           <label>Site Logo</label>
// //           <input type="text" defaultValue="/logo.png" className="form-input" />
// //         </div>
// //         <div className="form-group">
// //           <label>Contact Email</label>
// //           <input type="email" defaultValue="support@shop.co" className="form-input" />
// //         </div>
// //         <div className="form-group">
// //           <label>Phone Number</label>
// //           <input type="text" defaultValue="+1 234 567 8900" className="form-input" />
// //         </div>
// //         <div className="form-group">
// //           <label>Address</label>
// //           <textarea className="form-input" rows="3">123 Fashion Street, New York, NY 10001</textarea>
// //         </div>
// //         <button className="btn-primary">Save Settings</button>
// //       </div>
// //     </div>
// //   );

// //   return (
// //     <div className="admin-panel">
// //       <div className="admin-sidebar">
// //         <div className="admin-logo">
// //           <h2>SHOP.CO Admin</h2>
// //         </div>
// //         <nav className="admin-nav">
// //           <button className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
// //             📊 Dashboard
// //           </button>
// //           <button className={activeTab === 'products' ? 'active' : ''} onClick={() => setActiveTab('products')}>
// //             📦 Products
// //           </button>
// //           <button className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>
// //             🛒 Orders
// //           </button>
// //           <button className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>
// //             👥 Users
// //           </button>
// //           <button className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>
// //             ⚙️ Settings
// //           </button>
// //         </nav>
// //       </div>

// //       <div className="admin-content">
// //         <div className="admin-header">
// //           <h1>Welcome back, {user?.name || 'Admin'}!</h1>
// //           <button className="btn-logout" onClick={() => navigate('/')}>View Store →</button>
// //         </div>

// //         <div className="admin-main">
// //           {activeTab === 'dashboard' && <Dashboard />}
// //           {activeTab === 'products' && <ProductsManagement />}
// //           {activeTab === 'orders' && <OrdersManagement />}
// //           {activeTab === 'users' && <UsersManagement />}
// //           {activeTab === 'settings' && <Settings />}
// //         </div>
// //       </div>

// //       {/* Product Modal */}
// //       {showModal && (
// //         <div className="modal-overlay" onClick={() => setShowModal(false)}>
// //           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
// //             <h2>{editingItem ? 'Edit Product' : 'Add New Product'}</h2>
// //             <form onSubmit={handleSubmitProduct}>
// //               <div className="form-group">
// //                 <label>Product Title</label>
// //                 <input
// //                   type="text"
// //                   value={formData.title}
// //                   onChange={(e) => setFormData({ ...formData, title: e.target.value })}
// //                   required
// //                   className="form-input"
// //                 />
// //               </div>
// //               <div className="form-group">
// //                 <label>Price ($)</label>
// //                 <input
// //                   type="number"
// //                   step="0.01"
// //                   value={formData.price}
// //                   onChange={(e) => setFormData({ ...formData, price: e.target.value })}
// //                   required
// //                   className="form-input"
// //                 />
// //               </div>
// //               <div className="form-group">
// //                 <label>Category</label>
// //                 <input
// //                   type="text"
// //                   value={formData.category}
// //                   onChange={(e) => setFormData({ ...formData, category: e.target.value })}
// //                   required
// //                   className="form-input"
// //                 />
// //               </div>
// //               <div className="form-group">
// //                 <label>Description</label>
// //                 <textarea
// //                   value={formData.description}
// //                   onChange={(e) => setFormData({ ...formData, description: e.target.value })}
// //                   required
// //                   className="form-input"
// //                   rows="3"
// //                 />
// //               </div>
// //               <div className="form-group">
// //                 <label>Image URL</label>
// //                 <input
// //                   type="url"
// //                   value={formData.image}
// //                   onChange={(e) => setFormData({ ...formData, image: e.target.value })}
// //                   required
// //                   className="form-input"
// //                 />
// //               </div>
// //               <div className="form-group">
// //                 <label>Stock Quantity</label>
// //                 <input
// //                   type="number"
// //                   value={formData.stock}
// //                   onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
// //                   className="form-input"
// //                 />
// //               </div>
// //               <div className="modal-actions">
// //                 <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
// //                 <button type="submit" className="btn-primary">{editingItem ? 'Update' : 'Add'} Product</button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       )}

// //       <style jsx>{`
// //         .admin-panel {
// //           display: flex;
// //           min-height: 100vh;
// //           background: #f5f5f5;
// //         }

// //         .admin-sidebar {
// //           width: 280px;
// //           background: linear-gradient(135deg, #000 0%, #1a1a1a 100%);
// //           color: white;
// //           padding: 30px 20px;
// //           position: fixed;
// //           height: 100vh;
// //           overflow-y: auto;
// //         }

// //         .admin-logo h2 {
// //           margin-bottom: 30px;
// //           text-align: center;
// //           font-size: 24px;
// //         }

// //         .admin-nav {
// //           display: flex;
// //           flex-direction: column;
// //           gap: 10px;
// //         }

// //         .admin-nav button {
// //           padding: 12px 20px;
// //           background: transparent;
// //           border: none;
// //           color: #ccc;
// //           text-align: left;
// //           font-size: 16px;
// //           cursor: pointer;
// //           border-radius: 8px;
// //           transition: all 0.3s;
// //         }

// //         .admin-nav button:hover {
// //           background: rgba(255,255,255,0.1);
// //           color: white;
// //         }

// //         .admin-nav button.active {
// //           background: #fff;
// //           color: #000;
// //           font-weight: 600;
// //         }

// //         .admin-content {
// //           flex: 1;
// //           margin-left: 280px;
// //           padding: 20px;
// //         }

// //         .admin-header {
// //           background: white;
// //           padding: 20px 30px;
// //           border-radius: 12px;
// //           display: flex;
// //           justify-content: space-between;
// //           align-items: center;
// //           margin-bottom: 30px;
// //           box-shadow: 0 2px 8px rgba(0,0,0,0.1);
// //         }

// //         .btn-logout {
// //           padding: 10px 20px;
// //           background: #000;
// //           color: white;
// //           border: none;
// //           border-radius: 6px;
// //           cursor: pointer;
// //         }

// //         .admin-main {
// //           background: white;
// //           border-radius: 12px;
// //           padding: 30px;
// //           box-shadow: 0 2px 8px rgba(0,0,0,0.1);
// //         }

// //         .stats-grid {
// //           display: grid;
// //           grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
// //           gap: 20px;
// //           margin-bottom: 40px;
// //         }

// //         .stat-card {
// //           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
// //           color: white;
// //           padding: 25px;
// //           border-radius: 12px;
// //           display: flex;
// //           align-items: center;
// //           gap: 20px;
// //         }

// //         .stat-icon {
// //           font-size: 48px;
// //         }

// //         .stat-info h3 {
// //           font-size: 14px;
// //           margin-bottom: 5px;
// //           opacity: 0.9;
// //         }

// //         .stat-number {
// //           font-size: 32px;
// //           font-weight: bold;
// //           margin: 0;
// //         }

// //         .section-header {
// //           display: flex;
// //           justify-content: space-between;
// //           align-items: center;
// //           margin-bottom: 30px;
// //         }

// //         .data-table {
// //           width: 100%;
// //           border-collapse: collapse;
// //         }

// //         .data-table th,
// //         .data-table td {
// //           padding: 12px;
// //           text-align: left;
// //           border-bottom: 1px solid #e0e0e0;
// //         }

// //         .data-table th {
// //           background: #f8f8f8;
// //           font-weight: 600;
// //         }

// //         .product-thumb {
// //           width: 50px;
// //           height: 50px;
// //           object-fit: cover;
// //           border-radius: 8px;
// //         }

// //         .status-badge {
// //           padding: 4px 12px;
// //           border-radius: 20px;
// //           font-size: 12px;
// //           font-weight: 600;
// //         }

// //         .status-badge.pending { background: #ff9800; color: white; }
// //         .status-badge.processing { background: #2196f3; color: white; }
// //         .status-badge.shipped { background: #9c27b0; color: white; }
// //         .status-badge.delivered { background: #4caf50; color: white; }
// //         .status-badge.cancelled { background: #f44336; color: white; }

// //         .status-select {
// //           padding: 5px 10px;
// //           border-radius: 6px;
// //           border: 1px solid #ddd;
// //         }

// //         .actions {
// //           display: flex;
// //           gap: 10px;
// //         }

// //         .btn-edit, .btn-delete {
// //           padding: 5px 10px;
// //           border: none;
// //           border-radius: 6px;
// //           cursor: pointer;
// //         }

// //         .btn-edit {
// //           background: #2196f3;
// //           color: white;
// //         }

// //         .btn-delete {
// //           background: #f44336;
// //           color: white;
// //         }

// //         .modal-overlay {
// //           position: fixed;
// //           top: 0;
// //           left: 0;
// //           right: 0;
// //           bottom: 0;
// //           background: rgba(0,0,0,0.7);
// //           display: flex;
// //           justify-content: center;
// //           align-items: center;
// //           z-index: 1000;
// //         }

// //         .modal-content {
// //           background: white;
// //           padding: 30px;
// //           border-radius: 12px;
// //           width: 90%;
// //           max-width: 600px;
// //           max-height: 80vh;
// //           overflow-y: auto;
// //         }

// //         .form-group {
// //           margin-bottom: 20px;
// //         }

// //         .form-group label {
// //           display: block;
// //           margin-bottom: 8px;
// //           font-weight: 600;
// //         }

// //         .form-input {
// //           width: 100%;
// //           padding: 10px;
// //           border: 1px solid #ddd;
// //           border-radius: 6px;
// //           font-size: 14px;
// //         }

// //         .modal-actions {
// //           display: flex;
// //           justify-content: flex-end;
// //           gap: 15px;
// //           margin-top: 20px;
// //         }

// //         .settings-form {
// //           max-width: 600px;
// //         }

// //         @media (max-width: 768px) {
// //           .admin-sidebar {
// //             width: 80px;
// //             padding: 20px 10px;
// //           }
// //           .admin-sidebar h2, .admin-nav button span {
// //             display: none;
// //           }
// //           .admin-content {
// //             margin-left: 80px;
// //           }
// //           .stats-grid {
// //             grid-template-columns: 1fr;
// //           }
// //           .data-table {
// //             font-size: 12px;
// //           }
// //         }
// //       `}</style>
// //     </div>
// //   );
// // };

// // export default Admin;




// // // Admin.jsx - Complete with Backend Integration
// // import React, { useState, useEffect } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { useNavigate } from 'react-router-dom';
// // import {
// //   fetchProducts,
// //   createProduct,
// //   updateProduct,
// //   deleteProduct,
// //   clearError
// // } from '../redux/slices/productSlice';

// // const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// // const Admin = () => {
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
  
// //   const [activeTab, setActiveTab] = useState('dashboard');
// //   const [orders, setOrders] = useState([]);
// //   const [users, setUsers] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [showModal, setShowModal] = useState(false);
// //   const [editingItem, setEditingItem] = useState(null);
// //   const [dashboardStats, setDashboardStats] = useState({
// //     totalUsers: 0,
// //     totalProducts: 0,
// //     totalOrders: 0,
// //     totalRevenue: 0,
// //     recentOrders: []
// //   });
// //   const [formData, setFormData] = useState({
// //     title: '',
// //     price: '',
// //     description: '',
// //     category: '',
// //     image: '',
// //     stock: ''
// //   });

// //   // Get products from Redux store
// //   const { products, loading: productsLoading, error } = useSelector((state) => state.products);
// //   const { isAuthenticated, user } = useSelector((state) => state.auth);

// //   // Get auth token
// //   const getAuthToken = () => {
// //     const userData = localStorage.getItem('user');
// //     return userData ? JSON.parse(userData).token : null;
// //   };

// //   // Helper function for API calls
// //   const apiRequest = async (url, options = {}) => {
// //     try {
// //       const response = await fetch(url, {
// //         ...options,
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'Authorization': `Bearer ${getAuthToken()}`,
// //           ...options.headers
// //         }
// //       });
      
// //       if (!response.ok) {
// //         const error = await response.json().catch(() => ({}));
// //         throw new Error(error.message || error.error || 'API request failed');
// //       }
      
// //       return await response.json();
// //     } catch (error) {
// //       console.error('API Error:', error);
// //       throw error;
// //     }
// //   };

// //   // Check if user is admin
// //   useEffect(() => {
// //     if (!isAuthenticated || user?.email !== 'admin@shop.co') {
// //       navigate('/login');
// //     } else {
// //       loadDashboardData();
// //     }
// //   }, [isAuthenticated, user, navigate]);

// //   useEffect(() => {
// //     if (error) {
// //       alert(error);
// //       dispatch(clearError());
// //     }
// //   }, [error, dispatch]);

// //   const loadDashboardData = async () => {
// //     await Promise.all([
// //       dispatch(fetchProducts()),
// //       fetchDashboardStats(),
// //       fetchOrders(),
// //       fetchUsers()
// //     ]);
// //   };

// //   const fetchDashboardStats = async () => {
// //     try {
// //       const stats = await apiRequest(`${API_URL}/admin/dashboard/stats`);
// //       setDashboardStats(stats);
// //     } catch (error) {
// //       console.error('Error fetching stats:', error);
// //     }
// //   };

// //   const fetchOrders = async () => {
// //     try {
// //       const data = await apiRequest(`${API_URL}/admin/orders`);
// //       setOrders(data);
// //     } catch (error) {
// //       console.error('Error fetching orders:', error);
// //       alert('Failed to fetch orders');
// //     }
// //   };

// //   const fetchUsers = async () => {
// //     try {
// //       const data = await apiRequest(`${API_URL}/admin/users`);
// //       setUsers(data);
// //     } catch (error) {
// //       console.error('Error fetching users:', error);
// //       alert('Failed to fetch users');
// //     }
// //   };

// //   // Product CRUD Operations using Redux
// //   const handleAddProduct = () => {
// //     setEditingItem(null);
// //     setFormData({
// //       title: '',
// //       price: '',
// //       description: '',
// //       category: '',
// //       image: '',
// //       stock: ''
// //     });
// //     setShowModal(true);
// //   };

// //   const handleEditProduct = (product) => {
// //     setEditingItem(product);
// //     setFormData({
// //       title: product.title,
// //       price: product.price,
// //       description: product.description,
// //       category: product.category,
// //       image: product.image,
// //       stock: product.stock || 100
// //     });
// //     setShowModal(true);
// //   };

// //   const handleDeleteProduct = async (id) => {
// //     if (window.confirm('Are you sure you want to delete this product?')) {
// //       setLoading(true);
// //       try {
// //         await dispatch(deleteProduct(id)).unwrap();
// //         alert('Product deleted successfully!');
// //         await fetchDashboardStats();
// //       } catch (error) {
// //         console.error('Error deleting product:', error);
// //         alert(error.message || 'Failed to delete product');
// //       }
// //       setLoading(false);
// //     }
// //   };

// //  const handleSubmitProduct = async (e) => {
// //   e.preventDefault();
// //   setLoading(true);
  
// //   try {
// //     const productData = {
// //       title: formData.title,
// //       price: parseFloat(formData.price),
// //       description: formData.description,
// //       category: formData.category,
// //       image: formData.image,
// //       stock: parseInt(formData.stock) || 100
// //       // REMOVE the rating field completely
// //     };

// //     if (editingItem) {
// //       await dispatch(updateProduct({ 
// //         id: editingItem.id, 
// //         productData 
// //       })).unwrap();
// //       alert('Product updated successfully!');
// //     } else {
// //       await dispatch(createProduct(productData)).unwrap();
// //       alert('Product added successfully!');
// //     }
    
// //     await fetchDashboardStats();
// //     setShowModal(false);
// //     setEditingItem(null);
// //     setFormData({
// //       title: '',
// //       price: '',
// //       description: '',
// //       category: '',
// //       image: '',
// //       stock: ''
// //     });
// //   } catch (error) {
// //     console.error('Error saving product:', error);
// //     alert(error.message || 'Failed to save product');
// //   }
// //   setLoading(false);
// // };

// //   // Order Management
// //   const handleUpdateOrderStatus = async (orderId, newStatus) => {
// //     try {
// //       await apiRequest(`${API_URL}/admin/orders/${orderId}/status`, {
// //         method: 'PUT',
// //         body: JSON.stringify({ status: newStatus })
// //       });
// //       await fetchOrders();
// //       await fetchDashboardStats();
// //       alert(`Order #${orderId} status updated to ${newStatus}`);
// //     } catch (error) {
// //       console.error('Error updating order:', error);
// //       alert('Failed to update order status');
// //     }
// //   };

// //   // User Management
// //   const handleUpdateUserRole = async (userId, newRole) => {
// //     try {
// //       await apiRequest(`${API_URL}/admin/users/${userId}`, {
// //         method: 'PUT',
// //         body: JSON.stringify({ role: newRole })
// //       });
// //       await fetchUsers();
// //       alert(`User role updated to ${newRole}`);
// //     } catch (error) {
// //       console.error('Error updating user role:', error);
// //       alert('Failed to update user role');
// //     }
// //   };

// //   const handleDeleteUser = async (userId) => {
// //     if (window.confirm('Are you sure you want to delete this user?')) {
// //       try {
// //         await apiRequest(`${API_URL}/admin/users/${userId}`, {
// //           method: 'DELETE'
// //         });
// //         await fetchUsers();
// //         await fetchDashboardStats();
// //         alert('User deleted successfully!');
// //       } catch (error) {
// //         console.error('Error deleting user:', error);
// //         alert(error.message || 'Failed to delete user');
// //       }
// //     }
// //   };

// //   // Dashboard Components
// //   const Dashboard = () => (
// //     <div className="dashboard">
// //       <div className="stats-grid">
// //         <div className="stat-card">
// //           <div className="stat-icon">📦</div>
// //           <div className="stat-info">
// //             <h3>Total Products</h3>
// //             <p className="stat-number">{dashboardStats.totalProducts}</p>
// //           </div>
// //         </div>
// //         <div className="stat-card">
// //           <div className="stat-icon">🛒</div>
// //           <div className="stat-info">
// //             <h3>Total Orders</h3>
// //             <p className="stat-number">{dashboardStats.totalOrders}</p>
// //           </div>
// //         </div>
// //         <div className="stat-card">
// //           <div className="stat-icon">👥</div>
// //           <div className="stat-info">
// //             <h3>Total Users</h3>
// //             <p className="stat-number">{dashboardStats.totalUsers}</p>
// //           </div>
// //         </div>
// //         <div className="stat-card">
// //           <div className="stat-icon">💰</div>
// //           <div className="stat-info">
// //             <h3>Total Revenue</h3>
// //             <p className="stat-number">${(dashboardStats.totalRevenue || 0).toLocaleString()}</p>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="recent-activity">
// //         <h3>Recent Orders</h3>
// //         <table className="data-table">
// //           <thead>
// //             <tr><th>Order ID</th><th>Customer</th><th>Total</th><th>Status</th><th>Date</th></tr>
// //           </thead>
// //           <tbody>
// //             {(dashboardStats.recentOrders || []).slice(0, 5).map(order => (
// //               <tr key={order.id}>
// //                 <td>#{order.id}</td>
// //                 <td>{order.User?.name || 'Guest'}</td>
// //                 <td>${order.total_amount || order.total}</td>
// //                 <td><span className={`status-badge ${order.status}`}>{order.status}</span></td>
// //                 <td>{new Date(order.createdAt).toLocaleDateString()}</td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );

// //   const ProductsManagement = () => (
// //     <div className="products-management">
// //       <div className="section-header">
// //         <h2>Products Management</h2>
// //         <button className="btn-primary" onClick={handleAddProduct}>+ Add New Product</button>
// //       </div>
      
// //       {(productsLoading || loading) ? (
// //         <div className="loading">Loading...</div>
// //       ) : (
// //         <table className="data-table">
// //           <thead>
// //             <tr>
// //               <th>Image</th>
// //               <th>Title</th>
// //               <th>Category</th>
// //               <th>Price</th>
// //               <th>Stock</th>
// //               <th>Actions</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {products.map(product => (
// //               <tr key={product.id}>
// //                 <td>
// //                   <img 
// //                     src={product.image} 
// //                     alt={product.title} 
// //                     className="product-thumb"
// //                     onError={(e) => {
// //                       e.target.src = 'https://via.placeholder.com/50';
// //                     }}
// //                   />
// //                 </td>
// //                 <td>{product.title.substring(0, 50)}...</td>
// //                 <td>{product.category}</td>
// //                 <td>${product.price}</td>
// //                 <td>{product.stock || 100}</td>
// //                 <td className="actions">
// //                   <button className="btn-edit" onClick={() => handleEditProduct(product)}>✏️ Edit</button>
// //                   <button className="btn-delete" onClick={() => handleDeleteProduct(product.id)}>🗑️ Delete</button>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       )}
// //     </div>
// //   );

// //   const OrdersManagement = () => (
// //     <div className="orders-management">
// //       <div className="section-header">
// //         <h2>Orders Management</h2>
// //       </div>
      
// //       <table className="data-table">
// //         <thead>
// //           <tr>
// //             <th>Order ID</th>
// //             <th>Customer</th>
// //             <th>Email</th>
// //             <th>Items</th>
// //             <th>Total</th>
// //             <th>Status</th>
// //             <th>Date</th>
// //             <th>Actions</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {orders.map(order => (
// //             <tr key={order.id}>
// //               <td>#{order.id}</td>
// //               <td>{order.User?.name || order.customer || 'Guest'}</td>
// //               <td>{order.User?.email || order.email || 'N/A'}</td>
// //               <td>{order.OrderItems?.length || order.items || 0}</td>
// //               <td>${order.total_amount || order.total}</td>
// //               <td>
// //                 <select 
// //                   value={order.status} 
// //                   onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
// //                   className={`status-select ${order.status}`}
// //                 >
// //                   <option value="pending">Pending</option>
// //                   <option value="processing">Processing</option>
// //                   <option value="shipped">Shipped</option>
// //                   <option value="delivered">Delivered</option>
// //                   <option value="cancelled">Cancelled</option>
// //                 </select>
// //               </td>
// //               <td>{new Date(order.createdAt).toLocaleDateString()}</td>
// //               <td className="actions">
// //                 <button className="btn-delete" onClick={() => handleDeleteOrder(order.id)}>🗑️ Delete</button>
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );

// //   const UsersManagement = () => (
// //     <div className="users-management">
// //       <div className="section-header">
// //         <h2>Users Management</h2>
// //       </div>
      
// //       <table className="data-table">
// //         <thead>
// //           <tr>
// //             <th>ID</th>
// //             <th>Name</th>
// //             <th>Email</th>
// //             <th>Role</th>
// //             <th>Joined Date</th>
// //             <th>Actions</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {users.map(user => (
// //             <tr key={user.id}>
// //               <td>{user.id}</td>
// //               <td>{user.name}</td>
// //               <td>{user.email}</td>
// //               <td>
// //                 <select 
// //                   value={user.role} 
// //                   onChange={(e) => handleUpdateUserRole(user.id, e.target.value)}
// //                   className="role-select"
// //                   disabled={user.email === 'admin@shop.co'}
// //                 >
// //                   <option value="user">User</option>
// //                   <option value="admin">Admin</option>
// //                 </select>
// //               </td>
// //               <td>{new Date(user.createdAt).toLocaleDateString()}</td>
// //               <td className="actions">
// //                 <button 
// //                   className="btn-delete" 
// //                   onClick={() => handleDeleteUser(user.id)}
// //                   disabled={user.email === 'admin@shop.co'}
// //                 >
// //                   🗑️ Delete
// //                 </button>
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );

// //   // Add delete order function
// //   const handleDeleteOrder = async (orderId) => {
// //     if (window.confirm('Are you sure you want to delete this order?')) {
// //       try {
// //         // Note: You may need to add this endpoint to your backend
// //         await apiRequest(`${API_URL}/admin/orders/${orderId}`, {
// //           method: 'DELETE'
// //         });
// //         await fetchOrders();
// //         await fetchDashboardStats();
// //         alert('Order deleted successfully!');
// //       } catch (error) {
// //         console.error('Error deleting order:', error);
// //         alert('Failed to delete order');
// //       }
// //     }
// //   };

// //   return (
// //     <div className="admin-panel">
// //       <div className="admin-sidebar">
// //         <div className="admin-logo">
// //           <h2>SHOP.CO Admin</h2>
// //         </div>
// //         <nav className="admin-nav">
// //           <button className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
// //             📊 Dashboard
// //           </button>
// //           <button className={activeTab === 'products' ? 'active' : ''} onClick={() => setActiveTab('products')}>
// //             📦 Products
// //           </button>
// //           <button className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>
// //             🛒 Orders
// //           </button>
// //           <button className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>
// //             👥 Users
// //           </button>
// //         </nav>
// //       </div>

// //       <div className="admin-content">
// //         <div className="admin-header">
// //           <h1>Welcome back, {user?.name || 'Admin'}!</h1>
// //           <button className="btn-logout" onClick={() => navigate('/')}>View Store →</button>
// //         </div>

// //         <div className="admin-main">
// //           {activeTab === 'dashboard' && <Dashboard />}
// //           {activeTab === 'products' && <ProductsManagement />}
// //           {activeTab === 'orders' && <OrdersManagement />}
// //           {activeTab === 'users' && <UsersManagement />}
// //         </div>
// //       </div>

// //       {/* Product Modal */}
// //       {showModal && (
// //         <div className="modal-overlay" onClick={() => setShowModal(false)}>
// //           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
// //             <h2>{editingItem ? 'Edit Product' : 'Add New Product'}</h2>
// //             <form onSubmit={handleSubmitProduct}>
// //               <div className="form-group">
// //                 <label>Product Title *</label>
// //                 <input
// //                   type="text"
// //                   value={formData.title}
// //                   onChange={(e) => setFormData({ ...formData, title: e.target.value })}
// //                   required
// //                   className="form-input"
// //                 />
// //               </div>
// //               <div className="form-group">
// //                 <label>Price ($) *</label>
// //                 <input
// //                   type="number"
// //                   step="0.01"
// //                   value={formData.price}
// //                   onChange={(e) => setFormData({ ...formData, price: e.target.value })}
// //                   required
// //                   className="form-input"
// //                 />
// //               </div>
// //               <div className="form-group">
// //                 <label>Category *</label>
// //                 <select
// //                   value={formData.category}
// //                   onChange={(e) => setFormData({ ...formData, category: e.target.value })}
// //                   required
// //                   className="form-input"
// //                 >
// //                   <option value="">Select Category</option>
// //                   <option value="men's clothing">Men's Clothing</option>
// //                   <option value="women's clothing">Women's Clothing</option>
// //                   <option value="jewelery">Jewelery</option>
// //                   <option value="electronics">Electronics</option>
// //                 </select>
// //               </div>
// //               <div className="form-group">
// //                 <label>Description *</label>
// //                 <textarea
// //                   value={formData.description}
// //                   onChange={(e) => setFormData({ ...formData, description: e.target.value })}
// //                   required
// //                   className="form-input"
// //                   rows="3"
// //                 />
// //               </div>
// //               <div className="form-group">
// //                 <label>Image URL *</label>
// //                 <input
// //                   type="url"
// //                   value={formData.image}
// //                   onChange={(e) => setFormData({ ...formData, image: e.target.value })}
// //                   required
// //                   className="form-input"
// //                 />
// //               </div>
// //               <div className="form-group">
// //                 <label>Stock Quantity</label>
// //                 <input
// //                   type="number"
// //                   value={formData.stock}
// //                   onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
// //                   className="form-input"
// //                 />
// //               </div>
// //               <div className="modal-actions">
// //                 <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
// //                 <button type="submit" className="btn-primary" disabled={loading}>
// //                   {loading ? 'Saving...' : (editingItem ? 'Update' : 'Add')}
// //                 </button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       )}

// //       <style>{`
// //         .admin-panel {
// //           display: flex;
// //           min-height: 100vh;
// //           background: #f5f5f5;
// //         }

// //         .admin-sidebar {
// //           width: 280px;
// //           background: linear-gradient(135deg, #000 0%, #1a1a1a 100%);
// //           color: white;
// //           padding: 30px 20px;
// //           position: fixed;
// //           height: 100vh;
// //           overflow-y: auto;
// //         }

// //         .admin-logo h2 {
// //           margin-bottom: 30px;
// //           text-align: center;
// //           font-size: 24px;
// //         }

// //         .admin-nav {
// //           display: flex;
// //           flex-direction: column;
// //           gap: 10px;
// //         }

// //         .admin-nav button {
// //           padding: 12px 20px;
// //           background: transparent;
// //           border: none;
// //           color: #ccc;
// //           text-align: left;
// //           font-size: 16px;
// //           cursor: pointer;
// //           border-radius: 8px;
// //           transition: all 0.3s;
// //         }

// //         .admin-nav button:hover {
// //           background: rgba(255,255,255,0.1);
// //           color: white;
// //         }

// //         .admin-nav button.active {
// //           background: #fff;
// //           color: #000;
// //           font-weight: 600;
// //         }

// //         .admin-content {
// //           flex: 1;
// //           margin-left: 280px;
// //           padding: 20px;
// //         }

// //         .admin-header {
// //           background: white;
// //           padding: 20px 30px;
// //           border-radius: 12px;
// //           display: flex;
// //           justify-content: space-between;
// //           align-items: center;
// //           margin-bottom: 30px;
// //           box-shadow: 0 2px 8px rgba(0,0,0,0.1);
// //         }

// //         .btn-logout {
// //           padding: 10px 20px;
// //           background: #000;
// //           color: white;
// //           border: none;
// //           border-radius: 6px;
// //           cursor: pointer;
// //         }

// //         .admin-main {
// //           background: white;
// //           border-radius: 12px;
// //           padding: 30px;
// //           box-shadow: 0 2px 8px rgba(0,0,0,0.1);
// //         }

// //         .stats-grid {
// //           display: grid;
// //           grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
// //           gap: 20px;
// //           margin-bottom: 40px;
// //         }

// //         .stat-card {
// //           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
// //           color: white;
// //           padding: 25px;
// //           border-radius: 12px;
// //           display: flex;
// //           align-items: center;
// //           gap: 20px;
// //         }

// //         .stat-icon {
// //           font-size: 48px;
// //         }

// //         .stat-info h3 {
// //           font-size: 14px;
// //           margin-bottom: 5px;
// //           opacity: 0.9;
// //         }

// //         .stat-number {
// //           font-size: 32px;
// //           font-weight: bold;
// //           margin: 0;
// //         }

// //         .section-header {
// //           display: flex;
// //           justify-content: space-between;
// //           align-items: center;
// //           margin-bottom: 30px;
// //         }

// //         .btn-primary {
// //           background: #000;
// //           color: white;
// //           padding: 10px 20px;
// //           border: none;
// //           border-radius: 6px;
// //           cursor: pointer;
// //           font-size: 14px;
// //         }

// //         .btn-primary:disabled {
// //           opacity: 0.6;
// //           cursor: not-allowed;
// //         }

// //         .btn-secondary {
// //           background: #ccc;
// //           color: #000;
// //           padding: 10px 20px;
// //           border: none;
// //           border-radius: 6px;
// //           cursor: pointer;
// //         }

// //         .data-table {
// //           width: 100%;
// //           border-collapse: collapse;
// //         }

// //         .data-table th,
// //         .data-table td {
// //           padding: 12px;
// //           text-align: left;
// //           border-bottom: 1px solid #e0e0e0;
// //         }

// //         .data-table th {
// //           background: #f8f8f8;
// //           font-weight: 600;
// //         }

// //         .product-thumb {
// //           width: 50px;
// //           height: 50px;
// //           object-fit: cover;
// //           border-radius: 8px;
// //         }

// //         .status-badge {
// //           padding: 4px 12px;
// //           border-radius: 20px;
// //           font-size: 12px;
// //           font-weight: 600;
// //           display: inline-block;
// //         }

// //         .status-badge.pending { background: #ff9800; color: white; }
// //         .status-badge.processing { background: #2196f3; color: white; }
// //         .status-badge.shipped { background: #9c27b0; color: white; }
// //         .status-badge.delivered { background: #4caf50; color: white; }
// //         .status-badge.cancelled { background: #f44336; color: white; }

// //         .status-select {
// //           padding: 5px 10px;
// //           border-radius: 6px;
// //           border: 1px solid #ddd;
// //         }

// //         .role-select {
// //           padding: 5px 10px;
// //           border-radius: 6px;
// //           border: 1px solid #ddd;
// //         }

// //         .actions {
// //           display: flex;
// //           gap: 10px;
// //         }

// //         .btn-edit, .btn-delete {
// //           padding: 5px 10px;
// //           border: none;
// //           border-radius: 6px;
// //           cursor: pointer;
// //         }

// //         .btn-edit {
// //           background: #2196f3;
// //           color: white;
// //         }

// //         .btn-delete {
// //           background: #f44336;
// //           color: white;
// //         }

// //         .btn-delete:disabled {
// //           opacity: 0.5;
// //           cursor: not-allowed;
// //         }

// //         .modal-overlay {
// //           position: fixed;
// //           top: 0;
// //           left: 0;
// //           right: 0;
// //           bottom: 0;
// //           background: rgba(0,0,0,0.7);
// //           display: flex;
// //           justify-content: center;
// //           align-items: center;
// //           z-index: 1000;
// //         }

// //         .modal-content {
// //           background: white;
// //           padding: 30px;
// //           border-radius: 12px;
// //           width: 90%;
// //           max-width: 600px;
// //           max-height: 80vh;
// //           overflow-y: auto;
// //         }

// //         .form-group {
// //           margin-bottom: 20px;
// //         }

// //         .form-group label {
// //           display: block;
// //           margin-bottom: 8px;
// //           font-weight: 600;
// //         }

// //         .form-input {
// //           width: 100%;
// //           padding: 10px;
// //           border: 1px solid #ddd;
// //           border-radius: 6px;
// //           font-size: 14px;
// //         }

// //         .modal-actions {
// //           display: flex;
// //           justify-content: flex-end;
// //           gap: 15px;
// //           margin-top: 20px;
// //         }

// //         .loading {
// //           text-align: center;
// //           padding: 40px;
// //           font-size: 18px;
// //           color: #666;
// //         }

// //         @media (max-width: 768px) {
// //           .admin-sidebar {
// //             width: 80px;
// //             padding: 20px 10px;
// //           }
// //           .admin-sidebar h2 {
// //             display: none;
// //           }
// //           .admin-nav button {
// //             font-size: 20px;
// //             text-align: center;
// //             padding: 12px;
// //           }
// //           .admin-content {
// //             margin-left: 80px;
// //           }
// //           .stats-grid {
// //             grid-template-columns: 1fr;
// //           }
// //           .data-table {
// //             font-size: 12px;
// //           }
// //           .actions {
// //             flex-direction: column;
// //           }
// //           .product-thumb {
// //             width: 30px;
// //             height: 30px;
// //           }
// //         }
// //       `}</style>
// //     </div>
// //   );
// // };

// // export default Admin;




// // // Admin.jsx - Updated with improved Orders Management (keeping all existing code)
// // import React, { useState, useEffect } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { useNavigate } from 'react-router-dom';
// // import {
// //   fetchProducts,
// //   createProduct,
// //   updateProduct,
// //   deleteProduct,
// //   clearError
// // } from '../redux/slices/productSlice';

// // const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// // const Admin = () => {
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
  
// //   const [activeTab, setActiveTab] = useState('dashboard');
// //   const [orders, setOrders] = useState([]);
// //   const [users, setUsers] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [showModal, setShowModal] = useState(false);
// //   const [editingItem, setEditingItem] = useState(null);
// //   const [dashboardStats, setDashboardStats] = useState({
// //     totalUsers: 0,
// //     totalProducts: 0,
// //     totalOrders: 0,
// //     totalRevenue: 0,
// //     recentOrders: []
// //   });
// //   const [formData, setFormData] = useState({
// //     title: '',
// //     price: '',
// //     description: '',
// //     category: '',
// //     image: '',
// //     stock: ''
// //   });

// //   // NEW: Add state for order filtering and selected order details
// //   const [orderFilter, setOrderFilter] = useState('all');
// //   const [selectedOrder, setSelectedOrder] = useState(null);
// //   const [showOrderModal, setShowOrderModal] = useState(false);

// //   // Get products from Redux store
// //   const { products, loading: productsLoading, error } = useSelector((state) => state.products);
// //   const { isAuthenticated, user } = useSelector((state) => state.auth);

// //   // Get auth token
// //   const getAuthToken = () => {
// //     const userData = localStorage.getItem('user');
// //     return userData ? JSON.parse(userData).token : null;
// //   };

// //   // Helper function for API calls
// //   const apiRequest = async (url, options = {}) => {
// //     try {
// //       const response = await fetch(url, {
// //         ...options,
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'Authorization': `Bearer ${getAuthToken()}`,
// //           ...options.headers
// //         }
// //       });
      
// //       if (!response.ok) {
// //         const error = await response.json().catch(() => ({}));
// //         throw new Error(error.message || error.error || 'API request failed');
// //       }
      
// //       return await response.json();
// //     } catch (error) {
// //       console.error('API Error:', error);
// //       throw error;
// //     }
// //   };

// //   // Check if user is admin
// //   useEffect(() => {
// //     if (!isAuthenticated || user?.email !== 'admin@shop.co') {
// //       navigate('/login');
// //     } else {
// //       loadDashboardData();
// //     }
// //   }, [isAuthenticated, user, navigate]);

// //   useEffect(() => {
// //     if (error) {
// //       alert(error);
// //       dispatch(clearError());
// //     }
// //   }, [error, dispatch]);

// //   const loadDashboardData = async () => {
// //     await Promise.all([
// //       dispatch(fetchProducts()),
// //       fetchDashboardStats(),
// //       fetchOrders(),
// //       fetchUsers()
// //     ]);
// //   };

// //   const fetchDashboardStats = async () => {
// //     try {
// //       const stats = await apiRequest(`${API_URL}/admin/dashboard/stats`);
// //       setDashboardStats(stats);
// //     } catch (error) {
// //       console.error('Error fetching stats:', error);
// //     }
// //   };

// //   const fetchOrders = async () => {
// //     try {
// //       const data = await apiRequest(`${API_URL}/admin/orders`);
// //       setOrders(data);
// //       // Update dashboard stats with orders data
// //       const totalRevenue = Array.isArray(data) ? data.reduce((sum, order) => {
// //         if (order.status !== 'cancelled') {
// //           return sum + (parseFloat(order.total_amount || order.total) || 0);
// //         }
// //         return sum;
// //       }, 0) : 0;
      
// //       setDashboardStats(prev => ({
// //         ...prev,
// //         totalOrders: Array.isArray(data) ? data.length : 0,
// //         totalRevenue: totalRevenue,
// //         recentOrders: Array.isArray(data) ? data.slice(0, 5) : []
// //       }));
// //     } catch (error) {
// //       console.error('Error fetching orders:', error);
// //       alert('Failed to fetch orders');
// //     }
// //   };

// //   const fetchUsers = async () => {
// //     try {
// //       const data = await apiRequest(`${API_URL}/admin/users`);
// //       setUsers(data);
// //     } catch (error) {
// //       console.error('Error fetching users:', error);
// //       alert('Failed to fetch users');
// //     }
// //   };

// //   // Product CRUD Operations using Redux
// //   const handleAddProduct = () => {
// //     setEditingItem(null);
// //     setFormData({
// //       title: '',
// //       price: '',
// //       description: '',
// //       category: '',
// //       image: '',
// //       stock: ''
// //     });
// //     setShowModal(true);
// //   };

// //   const handleEditProduct = (product) => {
// //     setEditingItem(product);
// //     setFormData({
// //       title: product.title,
// //       price: product.price,
// //       description: product.description,
// //       category: product.category,
// //       image: product.image,
// //       stock: product.stock || 100
// //     });
// //     setShowModal(true);
// //   };

// //   const handleDeleteProduct = async (id) => {
// //     if (window.confirm('Are you sure you want to delete this product?')) {
// //       setLoading(true);
// //       try {
// //         await dispatch(deleteProduct(id)).unwrap();
// //         alert('Product deleted successfully!');
// //         await fetchDashboardStats();
// //       } catch (error) {
// //         console.error('Error deleting product:', error);
// //         alert(error.message || 'Failed to delete product');
// //       }
// //       setLoading(false);
// //     }
// //   };

// //  const handleSubmitProduct = async (e) => {
// //   e.preventDefault();
// //   setLoading(true);
  
// //   try {
// //     const productData = {
// //       title: formData.title,
// //       price: parseFloat(formData.price),
// //       description: formData.description,
// //       category: formData.category,
// //       image: formData.image,
// //       stock: parseInt(formData.stock) || 100
// //     };

// //     if (editingItem) {
// //       await dispatch(updateProduct({ 
// //         id: editingItem.id, 
// //         productData 
// //       })).unwrap();
// //       alert('Product updated successfully!');
// //     } else {
// //       await dispatch(createProduct(productData)).unwrap();
// //       alert('Product added successfully!');
// //     }
    
// //     await fetchDashboardStats();
// //     setShowModal(false);
// //     setEditingItem(null);
// //     setFormData({
// //       title: '',
// //       price: '',
// //       description: '',
// //       category: '',
// //       image: '',
// //       stock: ''
// //     });
// //   } catch (error) {
// //     console.error('Error saving product:', error);
// //     alert(error.message || 'Failed to save product');
// //   }
// //   setLoading(false);
// // };

// //   // Order Management
// //   const handleUpdateOrderStatus = async (orderId, newStatus) => {
// //     try {
// //       await apiRequest(`${API_URL}/admin/orders/${orderId}/status`, {
// //         method: 'PUT',
// //         body: JSON.stringify({ status: newStatus })
// //       });
// //       await fetchOrders();
// //       await fetchDashboardStats();
// //       alert(`Order #${orderId} status updated to ${newStatus}`);
// //     } catch (error) {
// //       console.error('Error updating order:', error);
// //       alert('Failed to update order status');
// //     }
// //   };

// //   // NEW: Delete order function
// //   const handleDeleteOrder = async (orderId) => {
// //     if (window.confirm('Are you sure you want to delete this order?')) {
// //       try {
// //         await apiRequest(`${API_URL}/admin/orders/${orderId}`, {
// //           method: 'DELETE'
// //         });
// //         await fetchOrders();
// //         await fetchDashboardStats();
// //         alert('Order deleted successfully!');
// //       } catch (error) {
// //         console.error('Error deleting order:', error);
// //         alert('Failed to delete order');
// //       }
// //     }
// //   };

// //   // User Management
// //   const handleUpdateUserRole = async (userId, newRole) => {
// //     try {
// //       await apiRequest(`${API_URL}/admin/users/${userId}`, {
// //         method: 'PUT',
// //         body: JSON.stringify({ role: newRole })
// //       });
// //       await fetchUsers();
// //       alert(`User role updated to ${newRole}`);
// //     } catch (error) {
// //       console.error('Error updating user role:', error);
// //       alert('Failed to update user role');
// //     }
// //   };

// //   const handleDeleteUser = async (userId) => {
// //     if (window.confirm('Are you sure you want to delete this user?')) {
// //       try {
// //         await apiRequest(`${API_URL}/admin/users/${userId}`, {
// //           method: 'DELETE'
// //         });
// //         await fetchUsers();
// //         await fetchDashboardStats();
// //         alert('User deleted successfully!');
// //       } catch (error) {
// //         console.error('Error deleting user:', error);
// //         alert(error.message || 'Failed to delete user');
// //       }
// //     }
// //   };

// //   // NEW: Helper functions for orders
// //   const getStatusBadgeClass = (status) => {
// //     switch(status?.toLowerCase()) {
// //       case 'pending': return 'pending';
// //       case 'processing': return 'processing';
// //       case 'shipped': return 'shipped';
// //       case 'delivered': return 'delivered';
// //       case 'cancelled': return 'cancelled';
// //       default: return '';
// //     }
// //   };

// //   const filteredOrders = orderFilter === 'all' 
// //     ? orders 
// //     : orders.filter(order => order.status?.toLowerCase() === orderFilter);

// //   const getStatusCount = (status) => {
// //     if (status === 'all') return orders.length;
// //     return orders.filter(o => o.status?.toLowerCase() === status).length;
// //   };

// //   // Dashboard Components
// //   const Dashboard = () => (
// //     <div className="dashboard">
// //       <div className="stats-grid">
// //         <div className="stat-card">
// //           <div className="stat-icon">📦</div>
// //           <div className="stat-info">
// //             <h3>Total Products</h3>
// //             <p className="stat-number">{dashboardStats.totalProducts}</p>
// //           </div>
// //         </div>
// //         <div className="stat-card">
// //           <div className="stat-icon">🛒</div>
// //           <div className="stat-info">
// //             <h3>Total Orders</h3>
// //             <p className="stat-number">{dashboardStats.totalOrders}</p>
// //           </div>
// //         </div>
// //         <div className="stat-card">
// //           <div className="stat-icon">👥</div>
// //           <div className="stat-info">
// //             <h3>Total Users</h3>
// //             <p className="stat-number">{dashboardStats.totalUsers}</p>
// //           </div>
// //         </div>
// //         <div className="stat-card">
// //           <div className="stat-icon">💰</div>
// //           <div className="stat-info">
// //             <h3>Total Revenue</h3>
// //             <p className="stat-number">${(dashboardStats.totalRevenue || 0).toLocaleString()}</p>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="recent-activity">
// //         <h3>Recent Orders</h3>
// //         <table className="data-table">
// //           <thead>
// //             <tr><th>Order ID</th><th>Customer</th><th>Total</th><th>Status</th><th>Date</th></tr>
// //           </thead>
// //           <tbody>
// //             {(dashboardStats.recentOrders || []).slice(0, 5).map(order => (
// //               <tr key={order.id}>
// //                 <td>#{order.id}</td>
// //                 <td>{order.User?.name || 'Guest'}</td>
// //                 <td>${order.total_amount || order.total}</td>
// //                 <td><span className={`status-badge ${getStatusBadgeClass(order.status)}`}>{order.status}</span></td>
// //                 <td>{new Date(order.createdAt).toLocaleDateString()}</td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );

// //   const ProductsManagement = () => (
// //     <div className="products-management">
// //       <div className="section-header">
// //         <h2>Products Management</h2>
// //         <button className="btn-primary" onClick={handleAddProduct}>+ Add New Product</button>
// //       </div>
      
// //       {(productsLoading || loading) ? (
// //         <div className="loading">Loading...</div>
// //       ) : (
// //         <table className="data-table">
// //           <thead>
// //             <tr>
// //               <th>Image</th>
// //               <th>Title</th>
// //               <th>Category</th>
// //               <th>Price</th>
// //               <th>Stock</th>
// //               <th>Actions</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {products.map(product => (
// //               <tr key={product.id}>
// //                 <td>
// //                   <img 
// //                     src={product.image} 
// //                     alt={product.title} 
// //                     className="product-thumb"
// //                     onError={(e) => {
// //                       e.target.src = 'https://via.placeholder.com/50';
// //                     }}
// //                   />
// //                 </td>
// //                 <td>{product.title.substring(0, 50)}...</td>
// //                 <td>{product.category}</td>
// //                 <td>${product.price}</td>
// //                 <td>{product.stock || 100}</td>
// //                 <td className="actions">
// //                   <button className="btn-edit" onClick={() => handleEditProduct(product)}>✏️ Edit</button>
// //                   <button className="btn-delete" onClick={() => handleDeleteProduct(product.id)}>🗑️ Delete</button>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       )}
// //     </div>
// //   );

// //   // UPDATED: Orders Management with filtering and view details
// //   const OrdersManagement = () => (
// //     <div className="orders-management">
// //       <div className="section-header">
// //         <h2>Orders Management</h2>
// //         <button className="btn-refresh" onClick={fetchOrders}>🔄 Refresh</button>
// //       </div>

// //       {/* Filter Buttons */}
// //       <div className="filter-section">
// //         <div className="filter-buttons">
// //           <button className={`filter-btn ${orderFilter === 'all' ? 'active' : ''}`} onClick={() => setOrderFilter('all')}>
// //             All ({getStatusCount('all')})
// //           </button>
// //           <button className={`filter-btn ${orderFilter === 'pending' ? 'active' : ''}`} onClick={() => setOrderFilter('pending')}>
// //             Pending ({getStatusCount('pending')})
// //           </button>
// //           <button className={`filter-btn ${orderFilter === 'processing' ? 'active' : ''}`} onClick={() => setOrderFilter('processing')}>
// //             Processing ({getStatusCount('processing')})
// //           </button>
// //           <button className={`filter-btn ${orderFilter === 'shipped' ? 'active' : ''}`} onClick={() => setOrderFilter('shipped')}>
// //             Shipped ({getStatusCount('shipped')})
// //           </button>
// //           <button className={`filter-btn ${orderFilter === 'delivered' ? 'active' : ''}`} onClick={() => setOrderFilter('delivered')}>
// //             Delivered ({getStatusCount('delivered')})
// //           </button>
// //           <button className={`filter-btn ${orderFilter === 'cancelled' ? 'active' : ''}`} onClick={() => setOrderFilter('cancelled')}>
// //             Cancelled ({getStatusCount('cancelled')})
// //           </button>
// //         </div>
// //       </div>
      
// //       <table className="data-table">
// //         <thead>
// //           <tr>
// //             <th>Order ID</th>
// //             <th>Customer</th>
// //             <th>Email</th>
// //             <th>Items</th>
// //             <th>Total</th>
// //             <th>Status</th>
// //             <th>Date</th>
// //             <th>Actions</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {filteredOrders.map(order => (
// //             <tr key={order.id}>
// //               <td>#{order.id}</td>
// //               <td>{order.User?.name || order.customer || 'Guest'}</td>
// //               <td>{order.User?.email || order.email || 'N/A'}</td>
// //               <td>{order.OrderItems?.length || order.items || 0}</td>
// //               <td>${order.total_amount || order.total}</td>
// //               <td>
// //                 <select 
// //                   value={order.status} 
// //                   onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
// //                   className={`status-select ${order.status}`}
// //                 >
// //                   <option value="pending">Pending</option>
// //                   <option value="processing">Processing</option>
// //                   <option value="shipped">Shipped</option>
// //                   <option value="delivered">Delivered</option>
// //                   <option value="cancelled">Cancelled</option>
// //                 </select>
// //               </td>
// //               <td>{new Date(order.createdAt).toLocaleDateString()}</td>
// //               <td className="actions">
// //                 <button className="btn-view" onClick={() => { setSelectedOrder(order); setShowOrderModal(true); }}>
// //                   👁️ View
// //                 </button>
// //                 <button className="btn-delete" onClick={() => handleDeleteOrder(order.id)}>🗑️ Delete</button>
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
      
// //       {filteredOrders.length === 0 && (
// //         <div className="no-orders">No orders found</div>
// //       )}
// //     </div>
// //   );

// //   const UsersManagement = () => (
// //     <div className="users-management">
// //       <div className="section-header">
// //         <h2>Users Management</h2>
// //       </div>
      
// //       <table className="data-table">
// //         <thead>
// //           <tr>
// //             <th>ID</th>
// //             <th>Name</th>
// //             <th>Email</th>
// //             <th>Role</th>
// //             <th>Joined Date</th>
// //             <th>Actions</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {users.map(user => (
// //             <tr key={user.id}>
// //               <td>{user.id}</td>
// //               <td>{user.name}</td>
// //               <td>{user.email}</td>
// //               <td>
// //                 <select 
// //                   value={user.role} 
// //                   onChange={(e) => handleUpdateUserRole(user.id, e.target.value)}
// //                   className="role-select"
// //                   disabled={user.email === 'admin@shop.co'}
// //                 >
// //                   <option value="user">User</option>
// //                   <option value="admin">Admin</option>
// //                 </select>
// //               </td>
// //               <td>{new Date(user.createdAt).toLocaleDateString()}</td>
// //               <td className="actions">
// //                 <button 
// //                   className="btn-delete" 
// //                   onClick={() => handleDeleteUser(user.id)}
// //                   disabled={user.email === 'admin@shop.co'}
// //                 >
// //                   🗑️ Delete
// //                 </button>
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );

// //   return (
// //     <div className="admin-panel">
// //       <div className="admin-sidebar">
// //         <div className="admin-logo">
// //           <h2>SHOP.CO Admin</h2>
// //         </div>
// //         <nav className="admin-nav">
// //           <button className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
// //             📊 Dashboard
// //           </button>
// //           <button className={activeTab === 'products' ? 'active' : ''} onClick={() => setActiveTab('products')}>
// //             📦 Products
// //           </button>
// //           <button className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>
// //             🛒 Orders
// //           </button>
// //           <button className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>
// //             👥 Users
// //           </button>
// //         </nav>
// //       </div>

// //       <div className="admin-content">
// //         <div className="admin-header">
// //           <h1>Welcome back, {user?.name || 'Admin'}!</h1>
// //           <button className="btn-logout" onClick={() => navigate('/')}>View Store →</button>
// //         </div>

// //         <div className="admin-main">
// //           {activeTab === 'dashboard' && <Dashboard />}
// //           {activeTab === 'products' && <ProductsManagement />}
// //           {activeTab === 'orders' && <OrdersManagement />}
// //           {activeTab === 'users' && <UsersManagement />}
// //         </div>
// //       </div>

// //       {/* Product Modal */}
// //       {showModal && (
// //         <div className="modal-overlay" onClick={() => setShowModal(false)}>
// //           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
// //             <h2>{editingItem ? 'Edit Product' : 'Add New Product'}</h2>
// //             <form onSubmit={handleSubmitProduct}>
// //               <div className="form-group">
// //                 <label>Product Title *</label>
// //                 <input
// //                   type="text"
// //                   value={formData.title}
// //                   onChange={(e) => setFormData({ ...formData, title: e.target.value })}
// //                   required
// //                   className="form-input"
// //                 />
// //               </div>
// //               <div className="form-group">
// //                 <label>Price ($) *</label>
// //                 <input
// //                   type="number"
// //                   step="0.01"
// //                   value={formData.price}
// //                   onChange={(e) => setFormData({ ...formData, price: e.target.value })}
// //                   required
// //                   className="form-input"
// //                 />
// //               </div>
// //               <div className="form-group">
// //                 <label>Category *</label>
// //                 <select
// //                   value={formData.category}
// //                   onChange={(e) => setFormData({ ...formData, category: e.target.value })}
// //                   required
// //                   className="form-input"
// //                 >
// //                   <option value="">Select Category</option>
// //                   <option value="men's clothing">Men's Clothing</option>
// //                   <option value="women's clothing">Women's Clothing</option>
// //                   <option value="jewelery">Jewelery</option>
// //                   <option value="electronics">Electronics</option>
// //                 </select>
// //               </div>
// //               <div className="form-group">
// //                 <label>Description *</label>
// //                 <textarea
// //                   value={formData.description}
// //                   onChange={(e) => setFormData({ ...formData, description: e.target.value })}
// //                   required
// //                   className="form-input"
// //                   rows="3"
// //                 />
// //               </div>
// //               <div className="form-group">
// //                 <label>Image URL *</label>
// //                 <input
// //                   type="url"
// //                   value={formData.image}
// //                   onChange={(e) => setFormData({ ...formData, image: e.target.value })}
// //                   required
// //                   className="form-input"
// //                 />
// //               </div>
// //               <div className="form-group">
// //                 <label>Stock Quantity</label>
// //                 <input
// //                   type="number"
// //                   value={formData.stock}
// //                   onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
// //                   className="form-input"
// //                 />
// //               </div>
// //               <div className="modal-actions">
// //                 <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
// //                 <button type="submit" className="btn-primary" disabled={loading}>
// //                   {loading ? 'Saving...' : (editingItem ? 'Update' : 'Add')}
// //                 </button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       )}

// //       {/* NEW: Order Details Modal */}
// //       {showOrderModal && selectedOrder && (
// //         <div className="modal-overlay" onClick={() => setShowOrderModal(false)}>
// //           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
// //             <div className="modal-header">
// //               <h2>Order Details #{selectedOrder.id}</h2>
// //               <button className="modal-close" onClick={() => setShowOrderModal(false)}>&times;</button>
// //             </div>
            
// //             <div className="info-card">
// //               <h4>Order Information</h4>
// //               <p><strong>Order ID:</strong> #{selectedOrder.id}</p>
// //               <p><strong>Order Date:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
// //               <p><strong>Last Updated:</strong> {new Date(selectedOrder.updatedAt).toLocaleString()}</p>
// //               <p><strong>Status:</strong> <span className={`status-badge ${getStatusBadgeClass(selectedOrder.status)}`}>{selectedOrder.status?.toUpperCase()}</span></p>
// //               <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod || 'N/A'}</p>
// //             </div>

// //             <div className="info-card">
// //               <h4>Customer Information</h4>
// //               <p><strong>Name:</strong> {selectedOrder.User?.name || 'Guest'}</p>
// //               <p><strong>Email:</strong> {selectedOrder.User?.email || 'N/A'}</p>
// //               <p><strong>User ID:</strong> {selectedOrder.userId || 'N/A'}</p>
// //             </div>

// //             <div className="info-card">
// //               <h4>Shipping Address</h4>
// //               <p>{selectedOrder.shippingAddress || 'No address provided'}</p>
// //             </div>

// //             <div className="info-card">
// //               <h4>Payment Summary</h4>
// //               <p><strong>Total Amount:</strong> ${selectedOrder.total_amount || selectedOrder.total}</p>
// //             </div>

// //             <div className="modal-actions">
// //               <button className="btn-secondary" onClick={() => setShowOrderModal(false)}>Close</button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       <style>{`
// //         .admin-panel {
// //           display: flex;
// //           min-height: 100vh;
// //           background: #f5f5f5;
// //         }

// //         .admin-sidebar {
// //           width: 280px;
// //           background: linear-gradient(135deg, #000 0%, #1a1a1a 100%);
// //           color: white;
// //           padding: 30px 20px;
// //           position: fixed;
// //           height: 100vh;
// //           overflow-y: auto;
// //         }

// //         .admin-logo h2 {
// //           margin-bottom: 30px;
// //           text-align: center;
// //           font-size: 24px;
// //         }

// //         .admin-nav {
// //           display: flex;
// //           flex-direction: column;
// //           gap: 10px;
// //         }

// //         .admin-nav button {
// //           padding: 12px 20px;
// //           background: transparent;
// //           border: none;
// //           color: #ccc;
// //           text-align: left;
// //           font-size: 16px;
// //           cursor: pointer;
// //           border-radius: 8px;
// //           transition: all 0.3s;
// //         }

// //         .admin-nav button:hover {
// //           background: rgba(255,255,255,0.1);
// //           color: white;
// //         }

// //         .admin-nav button.active {
// //           background: #fff;
// //           color: #000;
// //           font-weight: 600;
// //         }

// //         .admin-content {
// //           flex: 1;
// //           margin-left: 280px;
// //           padding: 20px;
// //         }

// //         .admin-header {
// //           background: white;
// //           padding: 20px 30px;
// //           border-radius: 12px;
// //           display: flex;
// //           justify-content: space-between;
// //           align-items: center;
// //           margin-bottom: 30px;
// //           box-shadow: 0 2px 8px rgba(0,0,0,0.1);
// //         }

// //         .btn-logout {
// //           padding: 10px 20px;
// //           background: #000;
// //           color: white;
// //           border: none;
// //           border-radius: 6px;
// //           cursor: pointer;
// //         }

// //         .admin-main {
// //           background: white;
// //           border-radius: 12px;
// //           padding: 30px;
// //           box-shadow: 0 2px 8px rgba(0,0,0,0.1);
// //         }

// //         .stats-grid {
// //           display: grid;
// //           grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
// //           gap: 20px;
// //           margin-bottom: 40px;
// //         }

// //         .stat-card {
// //           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
// //           color: white;
// //           padding: 25px;
// //           border-radius: 12px;
// //           display: flex;
// //           align-items: center;
// //           gap: 20px;
// //         }

// //         .stat-icon {
// //           font-size: 48px;
// //         }

// //         .stat-info h3 {
// //           font-size: 14px;
// //           margin-bottom: 5px;
// //           opacity: 0.9;
// //         }

// //         .stat-number {
// //           font-size: 32px;
// //           font-weight: bold;
// //           margin: 0;
// //         }

// //         .section-header {
// //           display: flex;
// //           justify-content: space-between;
// //           align-items: center;
// //           margin-bottom: 30px;
// //         }

// //         .btn-primary {
// //           background: #000;
// //           color: white;
// //           padding: 10px 20px;
// //           border: none;
// //           border-radius: 6px;
// //           cursor: pointer;
// //           font-size: 14px;
// //         }

// //         .btn-primary:disabled {
// //           opacity: 0.6;
// //           cursor: not-allowed;
// //         }

// //         .btn-secondary {
// //           background: #ccc;
// //           color: #000;
// //           padding: 10px 20px;
// //           border: none;
// //           border-radius: 6px;
// //           cursor: pointer;
// //         }

// //         .btn-refresh {
// //           background: #4caf50;
// //           color: white;
// //           padding: 8px 16px;
// //           border: none;
// //           border-radius: 6px;
// //           cursor: pointer;
// //         }

// //         .btn-view {
// //           background: #2196f3;
// //           color: white;
// //           padding: 5px 10px;
// //           border: none;
// //           border-radius: 4px;
// //           cursor: pointer;
// //         }

// //         .filter-section {
// //           margin-bottom: 20px;
// //         }

// //         .filter-buttons {
// //           display: flex;
// //           gap: 10px;
// //           flex-wrap: wrap;
// //           margin-bottom: 20px;
// //         }

// //         .filter-btn {
// //           padding: 8px 16px;
// //           border: 1px solid #ddd;
// //           background: white;
// //           border-radius: 20px;
// //           cursor: pointer;
// //           transition: all 0.2s;
// //         }

// //         .filter-btn:hover {
// //           background: #f0f0f0;
// //         }

// //         .filter-btn.active {
// //           background: #000;
// //           color: white;
// //           border-color: #000;
// //         }

// //         .data-table {
// //           width: 100%;
// //           border-collapse: collapse;
// //         }

// //         .data-table th,
// //         .data-table td {
// //           padding: 12px;
// //           text-align: left;
// //           border-bottom: 1px solid #e0e0e0;
// //         }

// //         .data-table th {
// //           background: #f8f8f8;
// //           font-weight: 600;
// //         }

// //         .product-thumb {
// //           width: 50px;
// //           height: 50px;
// //           object-fit: cover;
// //           border-radius: 8px;
// //         }

// //         .status-badge {
// //           padding: 4px 12px;
// //           border-radius: 20px;
// //           font-size: 12px;
// //           font-weight: 600;
// //           display: inline-block;
// //         }

// //         .status-badge.pending { background: #ff9800; color: white; }
// //         .status-badge.processing { background: #2196f3; color: white; }
// //         .status-badge.shipped { background: #9c27b0; color: white; }
// //         .status-badge.delivered { background: #4caf50; color: white; }
// //         .status-badge.cancelled { background: #f44336; color: white; }

// //         .status-select {
// //           padding: 5px 10px;
// //           border-radius: 6px;
// //           border: 1px solid #ddd;
// //         }

// //         .role-select {
// //           padding: 5px 10px;
// //           border-radius: 6px;
// //           border: 1px solid #ddd;
// //         }

// //         .actions {
// //           display: flex;
// //           gap: 10px;
// //         }

// //         .btn-edit, .btn-delete {
// //           padding: 5px 10px;
// //           border: none;
// //           border-radius: 6px;
// //           cursor: pointer;
// //         }

// //         .btn-edit {
// //           background: #2196f3;
// //           color: white;
// //         }

// //         .btn-delete {
// //           background: #f44336;
// //           color: white;
// //         }

// //         .btn-delete:disabled {
// //           opacity: 0.5;
// //           cursor: not-allowed;
// //         }

// //         .modal-overlay {
// //           position: fixed;
// //           top: 0;
// //           left: 0;
// //           right: 0;
// //           bottom: 0;
// //           background: rgba(0,0,0,0.7);
// //           display: flex;
// //           justify-content: center;
// //           align-items: center;
// //           z-index: 1000;
// //         }

// //         .modal-content {
// //           background: white;
// //           padding: 30px;
// //           border-radius: 12px;
// //           width: 90%;
// //           max-width: 600px;
// //           max-height: 80vh;
// //           overflow-y: auto;
// //         }

// //         .modal-header {
// //           display: flex;
// //           justify-content: space-between;
// //           align-items: center;
// //           margin-bottom: 20px;
// //           padding-bottom: 15px;
// //           border-bottom: 1px solid #eee;
// //         }

// //         .modal-close {
// //           background: none;
// //           border: none;
// //           font-size: 28px;
// //           cursor: pointer;
// //           color: #999;
// //         }

// //         .info-card {
// //           background: #fafafa;
// //           padding: 15px;
// //           border-radius: 12px;
// //           margin-bottom: 15px;
// //         }

// //         .info-card h4 {
// //           margin-bottom: 10px;
// //           color: #333;
// //         }

// //         .info-card p {
// //           margin: 8px 0;
// //           font-size: 14px;
// //         }

// //         .form-group {
// //           margin-bottom: 20px;
// //         }

// //         .form-group label {
// //           display: block;
// //           margin-bottom: 8px;
// //           font-weight: 600;
// //         }

// //         .form-input {
// //           width: 100%;
// //           padding: 10px;
// //           border: 1px solid #ddd;
// //           border-radius: 6px;
// //           font-size: 14px;
// //         }

// //         .modal-actions {
// //           display: flex;
// //           justify-content: flex-end;
// //           gap: 15px;
// //           margin-top: 20px;
// //         }

// //         .loading {
// //           text-align: center;
// //           padding: 40px;
// //           font-size: 18px;
// //           color: #666;
// //         }

// //         .no-orders {
// //           text-align: center;
// //           padding: 40px;
// //           color: #999;
// //         }

// //         @media (max-width: 768px) {
// //           .admin-sidebar {
// //             width: 80px;
// //             padding: 20px 10px;
// //           }
// //           .admin-sidebar h2 {
// //             display: none;
// //           }
// //           .admin-nav button {
// //             font-size: 20px;
// //             text-align: center;
// //             padding: 12px;
// //           }
// //           .admin-content {
// //             margin-left: 80px;
// //           }
// //           .stats-grid {
// //             grid-template-columns: 1fr;
// //           }
// //           .data-table {
// //             font-size: 12px;
// //           }
// //           .actions {
// //             flex-direction: column;
// //           }
// //           .product-thumb {
// //             width: 30px;
// //             height: 30px;
// //           }
// //           .filter-buttons {
// //             gap: 5px;
// //           }
// //           .filter-btn {
// //             font-size: 12px;
// //             padding: 5px 10px;
// //           }
// //         }
// //       `}</style>
// //     </div>
// //   );
// // };

// // export default Admin;



// // Admin.jsx - Complete Admin Panel with Dress Style Management (FIXED)
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import {
//   fetchProducts,
//   createProduct,
//   updateProduct,
//   deleteProduct,
//   clearError
// } from '../redux/slices/productSlice';

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// const Admin = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
  
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [orders, setOrders] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [editingItem, setEditingItem] = useState(null);
//   const [dashboardStats, setDashboardStats] = useState({
//     totalUsers: 0,
//     totalProducts: 0,
//     totalOrders: 0,
//     totalRevenue: 0,
//     recentOrders: []
//   });
  
//   // Dress style options
//   const dressStyleOptions = ['Casual', 'Formal', 'Party', 'Gym'];
//   const categoryOptions = ['Men', 'Women', 'Accessories', 'Kids'];
  
//   const [formData, setFormData] = useState({
//     title: '',
//     name: '',
//     price: '',
//     oldPrice: '',
//     description: '',
//     category: '',
//     dressStyle: 'Casual',
//     image: '',
//     stock: '',
//     isNewArrival: false,
//     isOnSale: false,
//     sizes: ['Small', 'Medium', 'Large', 'X-Large'],
//     colors: ['Black', 'White', 'Red', 'Blue']
//   });

//   // Order filter states
//   const [orderFilter, setOrderFilter] = useState('all');
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [showOrderModal, setShowOrderModal] = useState(false);

//   // Get products from Redux store
//   const { products, loading: productsLoading, error } = useSelector((state) => state.products);
//   const { isAuthenticated, user } = useSelector((state) => state.auth);

//   // Get auth token
//   const getAuthToken = () => {
//     const userData = localStorage.getItem('user');
//     return userData ? JSON.parse(userData).token : null;
//   };

//   // Helper function for API calls
//   const apiRequest = async (url, options = {}) => {
//     try {
//       const response = await fetch(url, {
//         ...options,
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${getAuthToken()}`,
//           ...options.headers
//         }
//       });
      
//       if (!response.ok) {
//         const error = await response.json().catch(() => ({}));
//         throw new Error(error.message || error.error || 'API request failed');
//       }
      
//       return await response.json();
//     } catch (error) {
//       console.error('API Error:', error);
//       throw error;
//     }
//   };

//   // Check if user is admin
//   useEffect(() => {
//     if (!isAuthenticated || user?.email !== 'admin@shop.co') {
//       navigate('/login');
//     } else {
//       loadDashboardData();
//     }
//   }, [isAuthenticated, user, navigate]);

//   useEffect(() => {
//     if (error) {
//       alert(error);
//       dispatch(clearError());
//     }
//   }, [error, dispatch]);

//   const loadDashboardData = async () => {
//     await Promise.all([
//       dispatch(fetchProducts()),
//       fetchDashboardStats(),
//       fetchOrders(),
//       fetchUsers()
//     ]);
//   };

//   const fetchDashboardStats = async () => {
//     try {
//       const stats = await apiRequest(`${API_URL}/admin/dashboard/stats`);
//       setDashboardStats(stats);
//     } catch (error) {
//       console.error('Error fetching stats:', error);
//     }
//   };

//   const fetchOrders = async () => {
//     try {
//       const data = await apiRequest(`${API_URL}/admin/orders`);
//       setOrders(data);
//       const totalRevenue = Array.isArray(data) ? data.reduce((sum, order) => {
//         if (order.status !== 'cancelled') {
//           return sum + (parseFloat(order.total_amount || order.total) || 0);
//         }
//         return sum;
//       }, 0) : 0;
      
//       setDashboardStats(prev => ({
//         ...prev,
//         totalOrders: Array.isArray(data) ? data.length : 0,
//         totalRevenue: totalRevenue,
//         recentOrders: Array.isArray(data) ? data.slice(0, 5) : []
//       }));
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//       alert('Failed to fetch orders');
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       const data = await apiRequest(`${API_URL}/admin/users`);
//       setUsers(data);
//       setDashboardStats(prev => ({
//         ...prev,
//         totalUsers: data.length
//       }));
//     } catch (error) {
//       console.error('Error fetching users:', error);
//       alert('Failed to fetch users');
//     }
//   };

//   // Product CRUD Operations
//   const handleAddProduct = () => {
//     setEditingItem(null);
//     setFormData({
//       title: '',
//       name: '',
//       price: '',
//       oldPrice: '',
//       description: '',
//       category: '',
//       dressStyle: 'Casual',
//       image: '',
//       stock: '',
//       isNewArrival: false,
//       isOnSale: false,
//       sizes: ['Small', 'Medium', 'Large', 'X-Large'],
//       colors: ['Black', 'White', 'Red', 'Blue']
//     });
//     setShowModal(true);
//   };

//   const handleEditProduct = (product) => {
//     setEditingItem(product);
//     setFormData({
//       title: product.title || '',
//       name: product.name || '',
//       price: product.price || '',
//       oldPrice: product.oldPrice || '',
//       description: product.description || '',
//       category: product.category || '',
//       dressStyle: product.dressStyle || 'Casual',
//       image: product.image || '',
//       stock: product.stock || 100,
//       isNewArrival: product.isNewArrival || false,
//       isOnSale: product.isOnSale || false,
//       sizes: product.sizes || ['Small', 'Medium', 'Large', 'X-Large'],
//       colors: product.colors || ['Black', 'White', 'Red', 'Blue']
//     });
//     setShowModal(true);
//   };

//   const handleDeleteProduct = async (id) => {
//     if (window.confirm('Are you sure you want to delete this product?')) {
//       setLoading(true);
//       try {
//         await dispatch(deleteProduct(id)).unwrap();
//         alert('Product deleted successfully!');
//         await fetchDashboardStats();
//       } catch (error) {
//         console.error('Error deleting product:', error);
//         alert(error.message || 'Failed to delete product');
//       }
//       setLoading(false);
//     }
//   };

//   const handleSubmitProduct = async (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//     try {
//       const productData = {
//         title: formData.title,
//         name: formData.name || formData.title,
//         price: parseFloat(formData.price),
//         oldPrice: formData.oldPrice ? parseFloat(formData.oldPrice) : null,
//         description: formData.description,
//         category: formData.category,
//         dressStyle: formData.dressStyle,
//         image: formData.image,
//         stock: parseInt(formData.stock) || 100,
//         isNewArrival: formData.isNewArrival,
//         isOnSale: formData.isOnSale,
//         sizes: formData.sizes,
//         colors: formData.colors
//       };

//       if (editingItem) {
//         await dispatch(updateProduct({ 
//           id: editingItem.id, 
//           productData 
//         })).unwrap();
//         alert('Product updated successfully!');
//       } else {
//         await dispatch(createProduct(productData)).unwrap();
//         alert('Product added successfully!');
//       }
      
//       await fetchDashboardStats();
//       setShowModal(false);
//       setEditingItem(null);
//       setFormData({
//         title: '',
//         name: '',
//         price: '',
//         oldPrice: '',
//         description: '',
//         category: '',
//         dressStyle: 'Casual',
//         image: '',
//         stock: '',
//         isNewArrival: false,
//         isOnSale: false,
//         sizes: ['Small', 'Medium', 'Large', 'X-Large'],
//         colors: ['Black', 'White', 'Red', 'Blue']
//       });
//     } catch (error) {
//       console.error('Error saving product:', error);
//       alert(error.message || 'Failed to save product');
//     }
//     setLoading(false);
//   };

//   // Order Management
//   const handleUpdateOrderStatus = async (orderId, newStatus) => {
//     try {
//       await apiRequest(`${API_URL}/admin/orders/${orderId}/status`, {
//         method: 'PUT',
//         body: JSON.stringify({ status: newStatus })
//       });
//       await fetchOrders();
//       await fetchDashboardStats();
//       alert(`Order #${orderId} status updated to ${newStatus}`);
//     } catch (error) {
//       console.error('Error updating order:', error);
//       alert('Failed to update order status');
//     }
//   };

//   const handleDeleteOrder = async (orderId) => {
//     if (window.confirm('Are you sure you want to delete this order?')) {
//       try {
//         await apiRequest(`${API_URL}/admin/orders/${orderId}`, {
//           method: 'DELETE'
//         });
//         await fetchOrders();
//         await fetchDashboardStats();
//         alert('Order deleted successfully!');
//       } catch (error) {
//         console.error('Error deleting order:', error);
//         alert('Failed to delete order');
//       }
//     }
//   };

//   // User Management
//   const handleUpdateUserRole = async (userId, newRole) => {
//     try {
//       await apiRequest(`${API_URL}/admin/users/${userId}`, {
//         method: 'PUT',
//         body: JSON.stringify({ role: newRole })
//       });
//       await fetchUsers();
//       alert(`User role updated to ${newRole}`);
//     } catch (error) {
//       console.error('Error updating user role:', error);
//       alert('Failed to update user role');
//     }
//   };

//   const handleDeleteUser = async (userId) => {
//     if (window.confirm('Are you sure you want to delete this user?')) {
//       try {
//         await apiRequest(`${API_URL}/admin/users/${userId}`, {
//           method: 'DELETE'
//         });
//         await fetchUsers();
//         await fetchDashboardStats();
//         alert('User deleted successfully!');
//       } catch (error) {
//         console.error('Error deleting user:', error);
//         alert(error.message || 'Failed to delete user');
//       }
//     }
//   };

//   // Helper functions for orders
//   const getStatusBadgeClass = (status) => {
//     switch(status?.toLowerCase()) {
//       case 'pending': return 'pending';
//       case 'processing': return 'processing';
//       case 'shipped': return 'shipped';
//       case 'delivered': return 'delivered';
//       case 'cancelled': return 'cancelled';
//       default: return '';
//     }
//   };

//   const getDressStyleBadgeClass = (dressStyle) => {
//     switch(dressStyle?.toLowerCase()) {
//       case 'casual': return 'casual';
//       case 'formal': return 'formal';
//       case 'party': return 'party';
//       case 'gym': return 'gym';
//       default: return '';
//     }
//   };

//   const filteredOrders = orderFilter === 'all' 
//     ? orders 
//     : orders.filter(order => order.status?.toLowerCase() === orderFilter);

//   const getStatusCount = (status) => {
//     if (status === 'all') return orders.length;
//     return orders.filter(o => o.status?.toLowerCase() === status).length;
//   };

//   // Dashboard Component
//   const Dashboard = () => (
//     <div className="dashboard">
//       <div className="stats-grid">
//         <div className="stat-card">
//           <div className="stat-icon">📦</div>
//           <div className="stat-info">
//             <h3>Total Products</h3>
//             <p className="stat-number">{dashboardStats.totalProducts}</p>
//           </div>
//         </div>
//         <div className="stat-card">
//           <div className="stat-icon">🛒</div>
//           <div className="stat-info">
//             <h3>Total Orders</h3>
//             <p className="stat-number">{dashboardStats.totalOrders}</p>
//           </div>
//         </div>
//         <div className="stat-card">
//           <div className="stat-icon">👥</div>
//           <div className="stat-info">
//             <h3>Total Users</h3>
//             <p className="stat-number">{dashboardStats.totalUsers}</p>
//           </div>
//         </div>
//         <div className="stat-card">
//           <div className="stat-icon">💰</div>
//           <div className="stat-info">
//             <h3>Total Revenue</h3>
//             <p className="stat-number">${(dashboardStats.totalRevenue || 0).toLocaleString()}</p>
//           </div>
//         </div>
//       </div>

//       <div className="recent-activity">
//         <h3>Recent Orders</h3>
//         <table className="data-table">
//           <thead>
//             <tr>
//               <th>Order ID</th>
//               <th>Customer</th>
//               <th>Total</th>
//               <th>Status</th>
//               <th>Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {(dashboardStats.recentOrders || []).slice(0, 5).map(order => (
//               <tr key={order.id}>
//                 <td>#{order.id}</td>
//                 <td>{order.User?.name || 'Guest'}</td>
//                 <td>${order.total_amount || order.total}</td>
//                 <td><span className={`status-badge ${getStatusBadgeClass(order.status)}`}>{order.status}</span></td>
//                 <td>{new Date(order.createdAt).toLocaleDateString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );

//   // Products Management Component with Dress Style
//   const ProductsManagement = () => (
//     <div className="products-management">
//       <div className="section-header">
//         <h2>Products Management</h2>
//         <button className="btn-primary" onClick={handleAddProduct}>+ Add New Product</button>
//       </div>
      
//       {(productsLoading || loading) ? (
//         <div className="loading">Loading...</div>
//       ) : (
//         <table className="data-table">
//           <thead>
//             <tr>
//               <th>Image</th>
//               <th>Title</th>
//               <th>Category</th>
//               <th>Dress Style</th>
//               <th>Price</th>
//               <th>Stock</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map(product => (
//               <tr key={product.id}>
//                 <td>
//                   <img 
//                     src={product.image} 
//                     alt={product.title} 
//                     className="product-thumb"
//                     onError={(e) => {
//                       e.target.src = 'https://via.placeholder.com/50';
//                     }}
//                   />
//                 </td>
//                 <td>{product.title?.substring(0, 50)}...</td>
//                 <td>{product.category}</td>
//                 <td>
//                   <span className={`dress-style-badge ${getDressStyleBadgeClass(product.dressStyle)}`}>
//                     {product.dressStyle || 'Casual'}
//                   </span>
//                 </td>
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

//   // Orders Management Component
//   const OrdersManagement = () => (
//     <div className="orders-management">
//       <div className="section-header">
//         <h2>Orders Management</h2>
//         <button className="btn-refresh" onClick={fetchOrders}>🔄 Refresh</button>
//       </div>

//       <div className="filter-section">
//         <div className="filter-buttons">
//           <button className={`filter-btn ${orderFilter === 'all' ? 'active' : ''}`} onClick={() => setOrderFilter('all')}>
//             All ({getStatusCount('all')})
//           </button>
//           <button className={`filter-btn ${orderFilter === 'pending' ? 'active' : ''}`} onClick={() => setOrderFilter('pending')}>
//             Pending ({getStatusCount('pending')})
//           </button>
//           <button className={`filter-btn ${orderFilter === 'processing' ? 'active' : ''}`} onClick={() => setOrderFilter('processing')}>
//             Processing ({getStatusCount('processing')})
//           </button>
//           <button className={`filter-btn ${orderFilter === 'shipped' ? 'active' : ''}`} onClick={() => setOrderFilter('shipped')}>
//             Shipped ({getStatusCount('shipped')})
//           </button>
//           <button className={`filter-btn ${orderFilter === 'delivered' ? 'active' : ''}`} onClick={() => setOrderFilter('delivered')}>
//             Delivered ({getStatusCount('delivered')})
//           </button>
//           <button className={`filter-btn ${orderFilter === 'cancelled' ? 'active' : ''}`} onClick={() => setOrderFilter('cancelled')}>
//             Cancelled ({getStatusCount('cancelled')})
//           </button>
//         </div>
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
//           {filteredOrders.map(order => (
//             <tr key={order.id}>
//               <td>#{order.id}</td>
//               <td>{order.User?.name || order.customer || 'Guest'}</td>
//               <td>{order.User?.email || order.email || 'N/A'}</td>
//               <td>{order.OrderItems?.length || order.items || 0}</td>
//               <td>${order.total_amount || order.total}</td>
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
//               <td>{new Date(order.createdAt).toLocaleDateString()}</td>
//               <td className="actions">
//                 <button className="btn-view" onClick={() => { setSelectedOrder(order); setShowOrderModal(true); }}>
//                   👁️ View
//                 </button>
//                 <button className="btn-delete" onClick={() => handleDeleteOrder(order.id)}>🗑️ Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
      
//       {filteredOrders.length === 0 && (
//         <div className="no-orders">No orders found</div>
//       )}
//     </div>
//   );

//   // Users Management Component
//   const UsersManagement = () => (
//     <div className="users-management">
//       <div className="section-header">
//         <h2>Users Management</h2>
//       </div>
      
//       <table className="data-table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Role</th>
//             <th>Joined Date</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map(user => (
//             <tr key={user.id}>
//               <td>{user.id}</td>
//               <td>{user.name}</td>
//               <td>{user.email}</td>
//               <td>
//                 <select 
//                   value={user.role} 
//                   onChange={(e) => handleUpdateUserRole(user.id, e.target.value)}
//                   className="role-select"
//                   disabled={user.email === 'admin@shop.co'}
//                 >
//                   <option value="user">User</option>
//                   <option value="admin">Admin</option>
//                 </select>
//               </td>
//               <td>{new Date(user.createdAt).toLocaleDateString()}</td>
//               <td className="actions">
//                 <button 
//                   className="btn-delete" 
//                   onClick={() => handleDeleteUser(user.id)}
//                   disabled={user.email === 'admin@shop.co'}
//                 >
//                   🗑️ Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
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
//         </div>
//       </div>

//       {/* Product Modal with Dress Style */}
//       {showModal && (
//         <div className="modal-overlay" onClick={() => setShowModal(false)}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <div className="modal-header">
//               <h2>{editingItem ? 'Edit Product' : 'Add New Product'}</h2>
//               <button className="modal-close" onClick={() => setShowModal(false)}>&times;</button>
//             </div>
//             <form onSubmit={handleSubmitProduct}>
//               <div className="form-group">
//                 <label>Product Title *</label>
//                 <input
//                   type="text"
//                   value={formData.title}
//                   onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                   required
//                   className="form-input"
//                   placeholder="Enter product title"
//                 />
//               </div>

//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Price ($) *</label>
//                   <input
//                     type="number"
//                     step="0.01"
//                     value={formData.price}
//                     onChange={(e) => setFormData({ ...formData, price: e.target.value })}
//                     required
//                     className="form-input"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Old Price ($)</label>
//                   <input
//                     type="number"
//                     step="0.01"
//                     value={formData.oldPrice}
//                     onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
//                     className="form-input"
//                   />
//                 </div>
//               </div>

//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Category *</label>
//                   <select
//                     value={formData.category}
//                     onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//                     required
//                     className="form-input"
//                   >
//                     <option value="">Select Category</option>
//                     {categoryOptions.map(cat => (
//                       <option key={cat} value={cat}>{cat}</option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="form-group">
//                   <label>Dress Style *</label>
//                   <select
//                     value={formData.dressStyle}
//                     onChange={(e) => setFormData({ ...formData, dressStyle: e.target.value })}
//                     required
//                     className="form-input"
//                   >
//                     {dressStyleOptions.map(style => (
//                       <option key={style} value={style}>{style}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               <div className="form-group">
//                 <label>Description *</label>
//                 <textarea
//                   value={formData.description}
//                   onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                   required
//                   className="form-input"
//                   rows="3"
//                   placeholder="Enter product description"
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Image URL *</label>
//                 <input
//                   type="url"
//                   value={formData.image}
//                   onChange={(e) => setFormData({ ...formData, image: e.target.value })}
//                   required
//                   className="form-input"
//                   placeholder="https://example.com/image.jpg"
//                 />
//               </div>

//               <div className="form-row">
//                 <div className="form-group">
//                   <label>Stock Quantity</label>
//                   <input
//                     type="number"
//                     value={formData.stock}
//                     onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
//                     className="form-input"
//                   />
//                 </div>
//               </div>

//               <div className="checkbox-group">
//                 <label className="checkbox-label">
//                   <input
//                     type="checkbox"
//                     checked={formData.isNewArrival}
//                     onChange={(e) => setFormData({ ...formData, isNewArrival: e.target.checked })}
//                   />
//                   New Arrival
//                 </label>
//                 <label className="checkbox-label">
//                   <input
//                     type="checkbox"
//                     checked={formData.isOnSale}
//                     onChange={(e) => setFormData({ ...formData, isOnSale: e.target.checked })}
//                   />
//                   On Sale
//                 </label>
//               </div>

//               <div className="modal-actions">
//                 <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
//                 <button type="submit" className="btn-primary" disabled={loading}>
//                   {loading ? 'Saving...' : (editingItem ? 'Update' : 'Add')}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Order Details Modal */}
//       {showOrderModal && selectedOrder && (
//         <div className="modal-overlay" onClick={() => setShowOrderModal(false)}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <div className="modal-header">
//               <h2>Order Details #{selectedOrder.id}</h2>
//               <button className="modal-close" onClick={() => setShowOrderModal(false)}>&times;</button>
//             </div>
            
//             <div className="info-card">
//               <h4>Order Information</h4>
//               <p><strong>Order ID:</strong> #{selectedOrder.id}</p>
//               <p><strong>Order Date:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
//               <p><strong>Last Updated:</strong> {new Date(selectedOrder.updatedAt).toLocaleString()}</p>
//               <p><strong>Status:</strong> <span className={`status-badge ${getStatusBadgeClass(selectedOrder.status)}`}>{selectedOrder.status?.toUpperCase()}</span></p>
//               <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod || 'N/A'}</p>
//             </div>

//             <div className="info-card">
//               <h4>Customer Information</h4>
//               <p><strong>Name:</strong> {selectedOrder.User?.name || 'Guest'}</p>
//               <p><strong>Email:</strong> {selectedOrder.User?.email || 'N/A'}</p>
//               <p><strong>User ID:</strong> {selectedOrder.userId || 'N/A'}</p>
//             </div>

//             <div className="info-card">
//               <h4>Shipping Address</h4>
//               <p>{selectedOrder.shippingAddress || 'No address provided'}</p>
//             </div>

//             <div className="info-card">
//               <h4>Payment Summary</h4>
//               <p><strong>Total Amount:</strong> ${selectedOrder.total_amount || selectedOrder.total}</p>
//             </div>

//             <div className="modal-actions">
//               <button className="btn-secondary" onClick={() => setShowOrderModal(false)}>Close</button>
//             </div>
//           </div>
//         </div>
//       )}

//       <style>{`
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

//         .stat-card:nth-child(1) { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
//         .stat-card:nth-child(2) { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); }
//         .stat-card:nth-child(3) { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
//         .stat-card:nth-child(4) { background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); }

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

//         .btn-primary {
//           background: #000;
//           color: white;
//           padding: 10px 20px;
//           border: none;
//           border-radius: 6px;
//           cursor: pointer;
//           font-size: 14px;
//         }

//         .btn-primary:disabled {
//           opacity: 0.6;
//           cursor: not-allowed;
//         }

//         .btn-secondary {
//           background: #ccc;
//           color: #000;
//           padding: 10px 20px;
//           border: none;
//           border-radius: 6px;
//           cursor: pointer;
//         }

//         .btn-refresh {
//           background: #4caf50;
//           color: white;
//           padding: 8px 16px;
//           border: none;
//           border-radius: 6px;
//           cursor: pointer;
//         }

//         .btn-view {
//           background: #2196f3;
//           color: white;
//           padding: 5px 10px;
//           border: none;
//           border-radius: 4px;
//           cursor: pointer;
//         }

//         .filter-section {
//           margin-bottom: 20px;
//         }

//         .filter-buttons {
//           display: flex;
//           gap: 10px;
//           flex-wrap: wrap;
//           margin-bottom: 20px;
//         }

//         .filter-btn {
//           padding: 8px 16px;
//           border: 1px solid #ddd;
//           background: white;
//           border-radius: 20px;
//           cursor: pointer;
//           transition: all 0.2s;
//         }

//         .filter-btn:hover {
//           background: #f0f0f0;
//         }

//         .filter-btn.active {
//           background: #000;
//           color: white;
//           border-color: #000;
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
//           display: inline-block;
//         }

//         .status-badge.pending { background: #ff9800; color: white; }
//         .status-badge.processing { background: #2196f3; color: white; }
//         .status-badge.shipped { background: #9c27b0; color: white; }
//         .status-badge.delivered { background: #4caf50; color: white; }
//         .status-badge.cancelled { background: #f44336; color: white; }

//         .dress-style-badge {
//           padding: 4px 12px;
//           border-radius: 20px;
//           font-size: 12px;
//           font-weight: 600;
//           display: inline-block;
//         }

//         .dress-style-badge.casual { background: #4caf50; color: white; }
//         .dress-style-badge.formal { background: #2196f3; color: white; }
//         .dress-style-badge.party { background: #ff9800; color: white; }
//         .dress-style-badge.gym { background: #f44336; color: white; }

//         .status-select {
//           padding: 5px 10px;
//           border-radius: 6px;
//           border: 1px solid #ddd;
//         }

//         .role-select {
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

//         .btn-delete:disabled {
//           opacity: 0.5;
//           cursor: not-allowed;
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

//         .modal-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 20px;
//           padding-bottom: 15px;
//           border-bottom: 1px solid #eee;
//         }

//         .modal-close {
//           background: none;
//           border: none;
//           font-size: 28px;
//           cursor: pointer;
//           color: #999;
//         }

//         .info-card {
//           background: #fafafa;
//           padding: 15px;
//           border-radius: 12px;
//           margin-bottom: 15px;
//         }

//         .info-card h4 {
//           margin-bottom: 10px;
//           color: #333;
//         }

//         .info-card p {
//           margin: 8px 0;
//           font-size: 14px;
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

//         .form-row {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 15px;
//         }

//         .checkbox-group {
//           display: flex;
//           gap: 20px;
//           margin: 20px 0;
//         }

//         .checkbox-label {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           cursor: pointer;
//         }

//         .modal-actions {
//           display: flex;
//           justify-content: flex-end;
//           gap: 15px;
//           margin-top: 20px;
//         }

//         .loading {
//           text-align: center;
//           padding: 40px;
//           font-size: 18px;
//           color: #666;
//         }

//         .no-orders {
//           text-align: center;
//           padding: 40px;
//           color: #999;
//         }

//         @media (max-width: 768px) {
//           .admin-sidebar {
//             width: 80px;
//             padding: 20px 10px;
//           }
//           .admin-sidebar h2 {
//             display: none;
//           }
//           .admin-nav button {
//             font-size: 20px;
//             text-align: center;
//             padding: 12px;
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
//           .actions {
//             flex-direction: column;
//           }
//           .product-thumb {
//             width: 30px;
//             height: 30px;
//           }
//           .filter-buttons {
//             gap: 5px;
//           }
//           .filter-btn {
//             font-size: 12px;
//             padding: 5px 10px;
//           }
//           .form-row {
//             grid-template-columns: 1fr;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Admin;







// // // Admin.jsx - Complete Admin Panel with Brand Selection in Products
// // import React, { useState, useEffect } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { useNavigate } from 'react-router-dom';
// // import {
// //   fetchProducts,
// //   createProduct,
// //   updateProduct,
// //   deleteProduct,
// //   clearError
// // } from '../redux/slices/productSlice';

// // const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// // const Admin = () => {
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
  
// //   const [activeTab, setActiveTab] = useState('dashboard');
// //   const [orders, setOrders] = useState([]);
// //   const [users, setUsers] = useState([]);
// //   const [brands, setBrands] = useState([]);
// //   const [brandsLoading, setBrandsLoading] = useState(false);
// //   const [brandsError, setBrandsError] = useState(null);
// //   const [brandSearchTerm, setBrandSearchTerm] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [showModal, setShowModal] = useState(false);
// //   const [showBrandModal, setShowBrandModal] = useState(false);
// //   const [editingItem, setEditingItem] = useState(null);
// //   const [editingBrand, setEditingBrand] = useState(null);
// //   const [dashboardStats, setDashboardStats] = useState({
// //     totalUsers: 0,
// //     totalProducts: 0,
// //     totalOrders: 0,
// //     totalRevenue: 0,
// //     recentOrders: []
// //   });
  
// //   // Brand form data
// //   const [brandFormData, setBrandFormData] = useState({
// //     name: '',
// //     description: '',
// //     logo: '',
// //     website: '',
// //     isActive: true
// //   });
  
// //   // Dress style options
// //   const dressStyleOptions = ['Casual', 'Formal', 'Party', 'Gym'];
// //   const categoryOptions = ['Men', 'Women', 'Accessories', 'Kids'];
// //   const productCategoryOptions = ['T-Shirts', 'Jeans', 'Jackets', 'Shoes', 'Dresses', 'Accessories', 'Hoodies', 'Pants'];
// //   const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
// //   const colorOptions = ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange', 'Pink', 'Gray', 'Brown'];
  
// //   const [formData, setFormData] = useState({
// //     title: '',
// //     name: '',
// //     price: '',
// //     oldPrice: '',
// //     description: '',
// //     category: '',
// //     productCategory: '',
// //     brandId: '',
// //     dressStyle: 'Casual',
// //     image: '',
// //     stock: '',
// //     isNewArrival: false,
// //     isOnSale: false,
// //     sizes: [],
// //     colors: []
// //   });

// //   // Order filter states
// //   const [orderFilter, setOrderFilter] = useState('all');
// //   const [selectedOrder, setSelectedOrder] = useState(null);
// //   const [showOrderModal, setShowOrderModal] = useState(false);

// //   // Get products from Redux store
// //   const { products, loading: productsLoading, error } = useSelector((state) => state.products);
// //   const { isAuthenticated, user } = useSelector((state) => state.auth);

// //   // Get auth token
// //   const getAuthToken = () => {
// //     const userData = localStorage.getItem('user');
// //     return userData ? JSON.parse(userData).token : null;
// //   };

// //   // Helper function for API calls
// //   const apiRequest = async (url, options = {}) => {
// //     try {
// //       const response = await fetch(url, {
// //         ...options,
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'Authorization': `Bearer ${getAuthToken()}`,
// //           ...options.headers
// //         }
// //       });
      
// //       if (!response.ok) {
// //         const error = await response.json().catch(() => ({}));
// //         throw new Error(error.message || error.error || 'API request failed');
// //       }
      
// //       return await response.json();
// //     } catch (error) {
// //       console.error('API Error:', error);
// //       throw error;
// //     }
// //   };

// //   // Check if user is admin
// //   useEffect(() => {
// //     if (!isAuthenticated || user?.email !== 'admin@shop.co') {
// //       navigate('/login');
// //     } else {
// //       loadDashboardData();
// //     }
// //   }, [isAuthenticated, user, navigate]);

// //   useEffect(() => {
// //     if (error) {
// //       alert(error);
// //       dispatch(clearError());
// //     }
// //   }, [error, dispatch]);

// //   // Fetch brands
// //   useEffect(() => {
// //     if (activeTab === 'brands' || activeTab === 'products') {
// //       fetchBrands();
// //     }
// //   }, [activeTab, brandSearchTerm]);

// //   const fetchBrands = async () => {
// //     try {
// //       setBrandsLoading(true);
// //       setBrandsError(null);
      
// //       const url = brandSearchTerm 
// //         ? `${API_URL}/brands?search=${brandSearchTerm}&limit=100`
// //         : `${API_URL}/brands?limit=100`;
        
// //       const data = await apiRequest(url);
      
// //       if (data.success) {
// //         setBrands(data.brands || []);
// //       } else {
// //         throw new Error(data.message || "Failed to fetch brands");
// //       }
// //     } catch (error) {
// //       console.error("Error fetching brands:", error);
// //       setBrandsError(error.message);
// //     } finally {
// //       setBrandsLoading(false);
// //     }
// //   };

// //   const loadDashboardData = async () => {
// //     await Promise.all([
// //       dispatch(fetchProducts()),
// //       fetchDashboardStats(),
// //       fetchOrders(),
// //       fetchUsers()
// //     ]);
// //   };

// //   const fetchDashboardStats = async () => {
// //     try {
// //       const stats = await apiRequest(`${API_URL}/admin/dashboard/stats`);
// //       setDashboardStats(stats);
// //     } catch (error) {
// //       console.error('Error fetching stats:', error);
// //     }
// //   };

// //   const fetchOrders = async () => {
// //     try {
// //       const data = await apiRequest(`${API_URL}/admin/orders`);
// //       setOrders(data);
// //       const totalRevenue = Array.isArray(data) ? data.reduce((sum, order) => {
// //         if (order.status !== 'cancelled') {
// //           return sum + (parseFloat(order.total_amount || order.total) || 0);
// //         }
// //         return sum;
// //       }, 0) : 0;
      
// //       setDashboardStats(prev => ({
// //         ...prev,
// //         totalOrders: Array.isArray(data) ? data.length : 0,
// //         totalRevenue: totalRevenue,
// //         recentOrders: Array.isArray(data) ? data.slice(0, 5) : []
// //       }));
// //     } catch (error) {
// //       console.error('Error fetching orders:', error);
// //       alert('Failed to fetch orders');
// //     }
// //   };

// //   const fetchUsers = async () => {
// //     try {
// //       const data = await apiRequest(`${API_URL}/admin/users`);
// //       setUsers(data);
// //       setDashboardStats(prev => ({
// //         ...prev,
// //         totalUsers: data.length
// //       }));
// //     } catch (error) {
// //       console.error('Error fetching users:', error);
// //       alert('Failed to fetch users');
// //     }
// //   };

// //   // Brand CRUD Operations
// //   const handleAddBrand = () => {
// //     setEditingBrand(null);
// //     setBrandFormData({
// //       name: '',
// //       description: '',
// //       logo: '',
// //       website: '',
// //       isActive: true
// //     });
// //     setShowBrandModal(true);
// //   };

// //   const handleEditBrand = (brand) => {
// //     setEditingBrand(brand);
// //     setBrandFormData({
// //       name: brand.name || '',
// //       description: brand.description || '',
// //       logo: brand.logo || '',
// //       website: brand.website || '',
// //       isActive: brand.isActive !== undefined ? brand.isActive : true
// //     });
// //     setShowBrandModal(true);
// //   };

// //   const handleDeleteBrand = async (brandId) => {
// //     if (window.confirm('Are you sure you want to delete this brand?')) {
// //       try {
// //         await apiRequest(`${API_URL}/brands/${brandId}`, {
// //           method: 'DELETE'
// //         });
// //         await fetchBrands();
// //         alert('Brand deleted successfully!');
// //       } catch (error) {
// //         console.error('Error deleting brand:', error);
// //         alert(error.message || 'Failed to delete brand');
// //       }
// //     }
// //   };

// //   const handleSubmitBrand = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
    
// //     try {
// //       const brandData = {
// //         name: brandFormData.name,
// //         description: brandFormData.description,
// //         logo: brandFormData.logo,
// //         website: brandFormData.website,
// //         isActive: brandFormData.isActive
// //       };

// //       if (editingBrand) {
// //         await apiRequest(`${API_URL}/brands/${editingBrand.id}`, {
// //           method: 'PUT',
// //           body: JSON.stringify(brandData)
// //         });
// //         alert('Brand updated successfully!');
// //       } else {
// //         await apiRequest(`${API_URL}/brands`, {
// //           method: 'POST',
// //           body: JSON.stringify(brandData)
// //         });
// //         alert('Brand added successfully!');
// //       }
      
// //       await fetchBrands();
// //       setShowBrandModal(false);
// //       setEditingBrand(null);
// //       setBrandFormData({
// //         name: '',
// //         description: '',
// //         logo: '',
// //         website: '',
// //         isActive: true
// //       });
// //     } catch (error) {
// //       console.error('Error saving brand:', error);
// //       alert(error.message || 'Failed to save brand');
// //     }
// //     setLoading(false);
// //   };

// //   // Product CRUD Operations
// //   const handleAddProduct = () => {
// //     setEditingItem(null);
// //     setFormData({
// //       title: '',
// //       name: '',
// //       price: '',
// //       oldPrice: '',
// //       description: '',
// //       category: '',
// //       productCategory: '',
// //       brandId: '',
// //       dressStyle: 'Casual',
// //       image: '',
// //       stock: '',
// //       isNewArrival: false,
// //       isOnSale: false,
// //       sizes: [],
// //       colors: []
// //     });
// //     setShowModal(true);
// //   };

// //   const handleEditProduct = (product) => {
// //     setEditingItem(product);
// //     setFormData({
// //       title: product.title || '',
// //       name: product.name || '',
// //       price: product.price || '',
// //       oldPrice: product.oldPrice || '',
// //       description: product.description || '',
// //       category: product.category || '',
// //       productCategory: product.productCategory || '',
// //       brandId: product.brandId || '',
// //       dressStyle: product.dressStyle || 'Casual',
// //       image: product.image || '',
// //       stock: product.stock || 100,
// //       isNewArrival: product.isNewArrival || false,
// //       isOnSale: product.isOnSale || false,
// //       sizes: product.sizes || [],
// //       colors: product.colors || []
// //     });
// //     setShowModal(true);
// //   };

// //   const handleDeleteProduct = async (id) => {
// //     if (window.confirm('Are you sure you want to delete this product?')) {
// //       setLoading(true);
// //       try {
// //         await dispatch(deleteProduct(id)).unwrap();
// //         alert('Product deleted successfully!');
// //         await fetchDashboardStats();
// //       } catch (error) {
// //         console.error('Error deleting product:', error);
// //         alert(error.message || 'Failed to delete product');
// //       }
// //       setLoading(false);
// //     }
// //   };

// //   const handleSubmitProduct = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
    
// //     try {
// //       const productData = {
// //         title: formData.title,
// //         name: formData.name || formData.title,
// //         price: parseFloat(formData.price),
// //         oldPrice: formData.oldPrice ? parseFloat(formData.oldPrice) : null,
// //         description: formData.description,
// //         category: formData.category,
// //         productCategory: formData.productCategory,
// //         brandId: formData.brandId || null,
// //         dressStyle: formData.dressStyle,
// //         image: formData.image,
// //         stock: parseInt(formData.stock) || 100,
// //         isNewArrival: formData.isNewArrival,
// //         isOnSale: formData.isOnSale,
// //         sizes: formData.sizes,
// //         colors: formData.colors
// //       };

// //       if (editingItem) {
// //         await dispatch(updateProduct({ 
// //           id: editingItem.id, 
// //           productData 
// //         })).unwrap();
// //         alert('Product updated successfully!');
// //       } else {
// //         await dispatch(createProduct(productData)).unwrap();
// //         alert('Product added successfully!');
// //       }
      
// //       await fetchDashboardStats();
// //       setShowModal(false);
// //       setEditingItem(null);
// //       setFormData({
// //         title: '',
// //         name: '',
// //         price: '',
// //         oldPrice: '',
// //         description: '',
// //         category: '',
// //         productCategory: '',
// //         brandId: '',
// //         dressStyle: 'Casual',
// //         image: '',
// //         stock: '',
// //         isNewArrival: false,
// //         isOnSale: false,
// //         sizes: [],
// //         colors: []
// //       });
// //     } catch (error) {
// //       console.error('Error saving product:', error);
// //       alert(error.message || 'Failed to save product');
// //     }
// //     setLoading(false);
// //   };

// //   // Order Management
// //   const handleUpdateOrderStatus = async (orderId, newStatus) => {
// //     try {
// //       await apiRequest(`${API_URL}/admin/orders/${orderId}/status`, {
// //         method: 'PUT',
// //         body: JSON.stringify({ status: newStatus })
// //       });
// //       await fetchOrders();
// //       await fetchDashboardStats();
// //       alert(`Order #${orderId} status updated to ${newStatus}`);
// //     } catch (error) {
// //       console.error('Error updating order:', error);
// //       alert('Failed to update order status');
// //     }
// //   };

// //   const handleDeleteOrder = async (orderId) => {
// //     if (window.confirm('Are you sure you want to delete this order?')) {
// //       try {
// //         await apiRequest(`${API_URL}/admin/orders/${orderId}`, {
// //           method: 'DELETE'
// //         });
// //         await fetchOrders();
// //         await fetchDashboardStats();
// //         alert('Order deleted successfully!');
// //       } catch (error) {
// //         console.error('Error deleting order:', error);
// //         alert('Failed to delete order');
// //       }
// //     }
// //   };

// //   // User Management
// //   const handleUpdateUserRole = async (userId, newRole) => {
// //     try {
// //       await apiRequest(`${API_URL}/admin/users/${userId}`, {
// //         method: 'PUT',
// //         body: JSON.stringify({ role: newRole })
// //       });
// //       await fetchUsers();
// //       alert(`User role updated to ${newRole}`);
// //     } catch (error) {
// //       console.error('Error updating user role:', error);
// //       alert('Failed to update user role');
// //     }
// //   };

// //   const handleDeleteUser = async (userId) => {
// //     if (window.confirm('Are you sure you want to delete this user?')) {
// //       try {
// //         await apiRequest(`${API_URL}/admin/users/${userId}`, {
// //           method: 'DELETE'
// //         });
// //         await fetchUsers();
// //         await fetchDashboardStats();
// //         alert('User deleted successfully!');
// //       } catch (error) {
// //         console.error('Error deleting user:', error);
// //         alert(error.message || 'Failed to delete user');
// //       }
// //     }
// //   };

// //   // Helper functions for orders
// //   const getStatusBadgeClass = (status) => {
// //     switch(status?.toLowerCase()) {
// //       case 'pending': return 'pending';
// //       case 'processing': return 'processing';
// //       case 'shipped': return 'shipped';
// //       case 'delivered': return 'delivered';
// //       case 'cancelled': return 'cancelled';
// //       default: return '';
// //     }
// //   };

// //   const getDressStyleBadgeClass = (dressStyle) => {
// //     switch(dressStyle?.toLowerCase()) {
// //       case 'casual': return 'casual';
// //       case 'formal': return 'formal';
// //       case 'party': return 'party';
// //       case 'gym': return 'gym';
// //       default: return '';
// //     }
// //   };

// //   const filteredOrders = orderFilter === 'all' 
// //     ? orders 
// //     : orders.filter(order => order.status?.toLowerCase() === orderFilter);

// //   const getStatusCount = (status) => {
// //     if (status === 'all') return orders.length;
// //     return orders.filter(o => o.status?.toLowerCase() === status).length;
// //   };

// //   // Dashboard Component
// //   const Dashboard = () => (
// //     <div className="dashboard">
// //       <div className="stats-grid">
// //         <div className="stat-card">
// //           <div className="stat-icon">📦</div>
// //           <div className="stat-info">
// //             <h3>Total Products</h3>
// //             <p className="stat-number">{dashboardStats.totalProducts}</p>
// //           </div>
// //         </div>
// //         <div className="stat-card">
// //           <div className="stat-icon">🛒</div>
// //           <div className="stat-info">
// //             <h3>Total Orders</h3>
// //             <p className="stat-number">{dashboardStats.totalOrders}</p>
// //           </div>
// //         </div>
// //         <div className="stat-card">
// //           <div className="stat-icon">👥</div>
// //           <div className="stat-info">
// //             <h3>Total Users</h3>
// //             <p className="stat-number">{dashboardStats.totalUsers}</p>
// //           </div>
// //         </div>
// //         <div className="stat-card">
// //           <div className="stat-icon">💰</div>
// //           <div className="stat-info">
// //             <h3>Total Revenue</h3>
// //             <p className="stat-number">${(dashboardStats.totalRevenue || 0).toLocaleString()}</p>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="recent-activity">
// //         <h3>Recent Orders</h3>
// //         <table className="data-table">
// //           <thead>
// //             <tr>
// //               <th>Order ID</th>
// //               <th>Customer</th>
// //               <th>Total</th>
// //               <th>Status</th>
// //               <th>Date</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {(dashboardStats.recentOrders || []).slice(0, 5).map(order => (
// //               <tr key={order.id}>
// //                 <td>#{order.id}</td>
// //                 <td>{order.User?.name || 'Guest'}</td>
// //                 <td>${order.total_amount || order.total}</td>
// //                 <td><span className={`status-badge ${getStatusBadgeClass(order.status)}`}>{order.status}</span></td>
// //                 <td>{new Date(order.createdAt).toLocaleDateString()}</td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );

// //   // Products Management Component with Dress Style
// //   const ProductsManagement = () => (
// //     <div className="products-management">
// //       <div className="section-header">
// //         <h2>Products Management</h2>
// //         <button className="btn-primary" onClick={handleAddProduct}>+ Add New Product</button>
// //       </div>
      
// //       {(productsLoading || loading) ? (
// //         <div className="loading">Loading...</div>
// //       ) : (
// //         <table className="data-table">
// //           <thead>
// //             <tr>
// //               <th>Image</th>
// //               <th>Title</th>
// //               <th>Brand</th>
// //               <th>Category</th>
// //               <th>Product Category</th>
// //               <th>Dress Style</th>
// //               <th>Price</th>
// //               <th>Stock</th>
// //               <th>Actions</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {products.map(product => {
// //               const brand = brands.find(b => b.id === product.brandId);
// //               return (
// //                 <tr key={product.id}>
// //                   <td>
// //                     <img 
// //                       src={product.image} 
// //                       alt={product.title} 
// //                       className="product-thumb"
// //                       onError={(e) => {
// //                         e.target.src = 'https://via.placeholder.com/50';
// //                       }}
// //                     />
// //                   </td>
// //                   <td>{product.title?.substring(0, 50)}...</td>
// //                   <td>{brand?.name || 'No Brand'}</td>
// //                   <td>{product.category}</td>
// //                   <td>{product.productCategory || '-'}</td>
// //                   <td>
// //                     <span className={`dress-style-badge ${getDressStyleBadgeClass(product.dressStyle)}`}>
// //                       {product.dressStyle || 'Casual'}
// //                     </span>
// //                   </td>
// //                   <td>${product.price}</td>
// //                   <td>{product.stock || 100}</td>
// //                   <td className="actions">
// //                     <button className="btn-edit" onClick={() => handleEditProduct(product)}>✏️ Edit</button>
// //                     <button className="btn-delete" onClick={() => handleDeleteProduct(product.id)}>🗑️ Delete</button>
// //                   </td>
// //                 </tr>
// //               );
// //             })}
// //           </tbody>
// //         </table>
// //       )}
// //     </div>
// //   );

// //   // Orders Management Component
// //   const OrdersManagement = () => (
// //     <div className="orders-management">
// //       <div className="section-header">
// //         <h2>Orders Management</h2>
// //         <button className="btn-refresh" onClick={fetchOrders}>🔄 Refresh</button>
// //       </div>

// //       <div className="filter-section">
// //         <div className="filter-buttons">
// //           <button className={`filter-btn ${orderFilter === 'all' ? 'active' : ''}`} onClick={() => setOrderFilter('all')}>
// //             All ({getStatusCount('all')})
// //           </button>
// //           <button className={`filter-btn ${orderFilter === 'pending' ? 'active' : ''}`} onClick={() => setOrderFilter('pending')}>
// //             Pending ({getStatusCount('pending')})
// //           </button>
// //           <button className={`filter-btn ${orderFilter === 'processing' ? 'active' : ''}`} onClick={() => setOrderFilter('processing')}>
// //             Processing ({getStatusCount('processing')})
// //           </button>
// //           <button className={`filter-btn ${orderFilter === 'shipped' ? 'active' : ''}`} onClick={() => setOrderFilter('shipped')}>
// //             Shipped ({getStatusCount('shipped')})
// //           </button>
// //           <button className={`filter-btn ${orderFilter === 'delivered' ? 'active' : ''}`} onClick={() => setOrderFilter('delivered')}>
// //             Delivered ({getStatusCount('delivered')})
// //           </button>
// //           <button className={`filter-btn ${orderFilter === 'cancelled' ? 'active' : ''}`} onClick={() => setOrderFilter('cancelled')}>
// //             Cancelled ({getStatusCount('cancelled')})
// //           </button>
// //         </div>
// //       </div>
      
// //       <table className="data-table">
// //         <thead>
// //           <tr>
// //             <th>Order ID</th>
// //             <th>Customer</th>
// //             <th>Email</th>
// //             <th>Items</th>
// //             <th>Total</th>
// //             <th>Status</th>
// //             <th>Date</th>
// //             <th>Actions</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {filteredOrders.map(order => (
// //             <tr key={order.id}>
// //               <td>#{order.id}</td>
// //               <td>{order.User?.name || order.customer || 'Guest'}</td>
// //               <td>{order.User?.email || order.email || 'N/A'}</td>
// //               <td>{order.OrderItems?.length || order.items || 0}</td>
// //               <td>${order.total_amount || order.total}</td>
// //               <td>
// //                 <select 
// //                   value={order.status} 
// //                   onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
// //                   className={`status-select ${order.status}`}
// //                 >
// //                   <option value="pending">Pending</option>
// //                   <option value="processing">Processing</option>
// //                   <option value="shipped">Shipped</option>
// //                   <option value="delivered">Delivered</option>
// //                   <option value="cancelled">Cancelled</option>
// //                 </select>
// //               </td>
// //               <td>{new Date(order.createdAt).toLocaleDateString()}</td>
// //               <td className="actions">
// //                 <button className="btn-view" onClick={() => { setSelectedOrder(order); setShowOrderModal(true); }}>
// //                   👁️ View
// //                 </button>
// //                 <button className="btn-delete" onClick={() => handleDeleteOrder(order.id)}>🗑️ Delete</button>
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
      
// //       {filteredOrders.length === 0 && (
// //         <div className="no-orders">No orders found</div>
// //       )}
// //     </div>
// //   );

// //   // Users Management Component
// //   const UsersManagement = () => (
// //     <div className="users-management">
// //       <div className="section-header">
// //         <h2>Users Management</h2>
// //       </div>
      
// //       <table className="data-table">
// //         <thead>
// //           <tr>
// //             <th>ID</th>
// //             <th>Name</th>
// //             <th>Email</th>
// //             <th>Role</th>
// //             <th>Joined Date</th>
// //             <th>Actions</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {users.map(user => (
// //             <tr key={user.id}>
// //               <td>{user.id}</td>
// //               <td>{user.name}</td>
// //               <td>{user.email}</td>
// //               <td>
// //                 <select 
// //                   value={user.role} 
// //                   onChange={(e) => handleUpdateUserRole(user.id, e.target.value)}
// //                   className="role-select"
// //                   disabled={user.email === 'admin@shop.co'}
// //                 >
// //                   <option value="user">User</option>
// //                   <option value="admin">Admin</option>
// //                 </select>
// //               </td>
// //               <td>{new Date(user.createdAt).toLocaleDateString()}</td>
// //               <td className="actions">
// //                 <button 
// //                   className="btn-delete" 
// //                   onClick={() => handleDeleteUser(user.id)}
// //                   disabled={user.email === 'admin@shop.co'}
// //                 >
// //                   🗑️ Delete
// //                 </button>
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );

// //   // Brands Management Component
// //   const BrandsManagement = () => (
// //     <div className="brands-management">
// //       <div className="section-header">
// //         <h2>Brands Management</h2>
// //         <button className="btn-primary" onClick={handleAddBrand}>
// //           + Add New Brand
// //         </button>
// //       </div>

// //       {/* Search Bar */}
// //       <div className="search-bar">
// //         <input
// //           type="text"
// //           placeholder="Search brands..."
// //           value={brandSearchTerm}
// //           onChange={(e) => setBrandSearchTerm(e.target.value)}
// //           className="search-input"
// //         />
// //         {brandSearchTerm && (
// //           <button 
// //             className="clear-search"
// //             onClick={() => setBrandSearchTerm("")}
// //           >
// //             ✕
// //           </button>
// //         )}
// //       </div>

// //       {brandsLoading ? (
// //         <div className="loading">Loading brands...</div>
// //       ) : brandsError ? (
// //         <div className="error-container">
// //           <div className="error-box">
// //             <span className="error-icon">⚠️</span>
// //             <h3>Something went wrong</h3>
// //             <p className="error-message">{brandsError}</p>
// //             <button onClick={fetchBrands} className="retry-button">
// //               Retry
// //             </button>
// //           </div>
// //         </div>
// //       ) : brands.length === 0 ? (
// //         <div className="empty-state">
// //           <p>No brands found {brandSearchTerm && `for "${brandSearchTerm}"`}</p>
// //           {brandSearchTerm && (
// //             <button onClick={() => setBrandSearchTerm("")} className="btn-secondary">
// //               Clear Search
// //             </button>
// //           )}
// //         </div>
// //       ) : (
// //         <div className="brands-grid">
// //           {brands.map((brand) => (
// //             <div key={brand.id} className="brand-card">
// //               {brand.logo ? (
// //                 <img
// //                   src={brand.logo}
// //                   alt={brand.name}
// //                   className="brand-logo"
// //                   loading="lazy"
// //                   onError={(e) => {
// //                     e.target.onerror = null;
// //                     e.target.src = "/placeholder-brand.png";
// //                   }}
// //                 />
// //               ) : (
// //                 <div className="brand-placeholder">
// //                   <span>{brand.name.charAt(0).toUpperCase()}</span>
// //                 </div>
// //               )}
// //               <div className="brand-info">
// //                 <h3>{brand.name}</h3>
// //                 {brand.description && (
// //                   <p className="brand-description">
// //                     {brand.description.length > 100 
// //                       ? `${brand.description.substring(0, 100)}...` 
// //                       : brand.description}
// //                   </p>
// //                 )}
// //                 {brand.website && (
// //                   <a href={brand.website} target="_blank" rel="noopener noreferrer" className="brand-website">
// //                     🌐 {brand.website}
// //                   </a>
// //                 )}
// //                 <span className={`brand-status ${brand.isActive !== false ? 'active' : 'inactive'}`}>
// //                   {brand.isActive !== false ? 'Active' : 'Inactive'}
// //                 </span>
// //               </div>
// //               <div className="brand-actions">
// //                 <button className="btn-edit" onClick={() => handleEditBrand(brand)}>✏️ Edit</button>
// //                 <button className="btn-delete" onClick={() => handleDeleteBrand(brand.id)}>🗑️ Delete</button>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );

// //   // Categories Management Component
// //   const CategoriesManagement = () => (
// //     <div className="categories-management">
// //       <div className="section-header">
// //         <h2>Categories Management</h2>
// //         <button className="btn-primary" onClick={() => alert('Add Category functionality coming soon!')}>
// //           + Add New Category
// //         </button>
// //       </div>
// //       <div className="placeholder-content">
// //         <p>Category management features will be available here.</p>
// //         <div className="placeholder-icon">📂</div>
// //       </div>
// //     </div>
// //   );

// //   // Settings Component
// //   const Settings = () => (
// //     <div className="settings">
// //       <div className="section-header">
// //         <h2>Settings</h2>
// //       </div>
// //       <div className="settings-grid">
// //         <div className="settings-card">
// //           <h3>General Settings</h3>
// //           <div className="settings-item">
// //             <label>Store Name</label>
// //             <input type="text" value="SHOP.CO" className="form-input" disabled />
// //           </div>
// //           <div className="settings-item">
// //             <label>Store Email</label>
// //             <input type="email" value="admin@shop.co" className="form-input" disabled />
// //           </div>
// //         </div>
// //         <div className="settings-card">
// //           <h3>Appearance</h3>
// //           <div className="settings-item">
// //             <label>Theme</label>
// //             <select className="form-input" disabled>
// //               <option>Light</option>
// //               <option>Dark</option>
// //             </select>
// //           </div>
// //         </div>
// //         <div className="settings-card">
// //           <h3>System Info</h3>
// //           <div className="settings-item">
// //             <label>Version</label>
// //             <span>1.0.0</span>
// //           </div>
// //           <div className="settings-item">
// //             <label>Environment</label>
// //             <span>{import.meta.env.VITE_ENV || 'Development'}</span>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );

// //   return (
// //     <div className="admin-panel">
// //       <div className="admin-sidebar">
// //         <div className="admin-logo">
// //           <h2>SHOP.CO</h2>
// //           <p>Admin Panel</p>
// //         </div>
// //         <nav className="admin-nav">
// //           <button 
// //             className={activeTab === 'dashboard' ? 'active' : ''} 
// //             onClick={() => setActiveTab('dashboard')}
// //           >
// //             <span className="nav-icon">📊</span>
// //             <span className="nav-label">Dashboard</span>
// //           </button>
// //           <button 
// //             className={activeTab === 'products' ? 'active' : ''} 
// //             onClick={() => setActiveTab('products')}
// //           >
// //             <span className="nav-icon">📦</span>
// //             <span className="nav-label">Products</span>
// //           </button>
// //           <button 
// //             className={activeTab === 'orders' ? 'active' : ''} 
// //             onClick={() => setActiveTab('orders')}
// //           >
// //             <span className="nav-icon">🛒</span>
// //             <span className="nav-label">Orders</span>
// //           </button>
// //           <button 
// //             className={activeTab === 'users' ? 'active' : ''} 
// //             onClick={() => setActiveTab('users')}
// //           >
// //             <span className="nav-icon">👥</span>
// //             <span className="nav-label">Users</span>
// //           </button>
// //           <button 
// //             className={activeTab === 'brands' ? 'active' : ''} 
// //             onClick={() => setActiveTab('brands')}
// //           >
// //             <span className="nav-icon">🏷️</span>
// //             <span className="nav-label">Brands</span>
// //           </button>
// //           <button 
// //             className={activeTab === 'categories' ? 'active' : ''} 
// //             onClick={() => setActiveTab('categories')}
// //           >
// //             <span className="nav-icon">📂</span>
// //             <span className="nav-label">Categories</span>
// //           </button>
// //           <button 
// //             className={activeTab === 'settings' ? 'active' : ''} 
// //             onClick={() => setActiveTab('settings')}
// //           >
// //             <span className="nav-icon">⚙️</span>
// //             <span className="nav-label">Settings</span>
// //           </button>
// //         </nav>
// //         <div className="sidebar-footer">
// //           <button className="btn-logout-sidebar" onClick={() => navigate('/')}>
// //             <span className="nav-icon">🏠</span>
// //             <span className="nav-label">View Store</span>
// //           </button>
// //         </div>
// //       </div>

// //       <div className="admin-content">
// //         <div className="admin-header">
// //           <div>
// //             <h1>Welcome back, {user?.name || 'Admin'}!</h1>
// //             <p className="subtitle">Manage your store efficiently</p>
// //           </div>
// //           <div className="header-actions">
// //             <span className="admin-badge">Admin</span>
// //           </div>
// //         </div>

// //         <div className="admin-main">
// //           {activeTab === 'dashboard' && <Dashboard />}
// //           {activeTab === 'products' && <ProductsManagement />}
// //           {activeTab === 'orders' && <OrdersManagement />}
// //           {activeTab === 'users' && <UsersManagement />}
// //           {activeTab === 'brands' && <BrandsManagement />}
// //           {activeTab === 'categories' && <CategoriesManagement />}
// //           {activeTab === 'settings' && <Settings />}
// //         </div>
// //       </div>

// //       {/* Product Modal with Brand Selection */}
// //       {showModal && (
// //         <div className="modal-overlay" onClick={() => setShowModal(false)}>
// //           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
// //             <div className="modal-header">
// //               <h2>{editingItem ? 'Edit Product' : 'Add New Product'}</h2>
// //               <button className="modal-close" onClick={() => setShowModal(false)}>&times;</button>
// //             </div>
// //             <form onSubmit={handleSubmitProduct}>
// //               {/* Product Name */}
// //               <div className="form-group">
// //                 <label>Product Name *</label>
// //                 <input
// //                   type="text"
// //                   value={formData.title}
// //                   onChange={(e) => setFormData({ ...formData, title: e.target.value })}
// //                   required
// //                   className="form-input"
// //                   placeholder="Enter product name"
// //                 />
// //               </div>

// //               {/* Brand Selection - Optional */}
// //               <div className="form-group">
// //                 <label>Brand <span style={{color: '#999', fontWeight: 'normal'}}>(Optional)</span></label>
// //                 <select
// //                   value={formData.brandId}
// //                   onChange={(e) => setFormData({ ...formData, brandId: e.target.value })}
// //                   className="form-input"
// //                 >
// //                   <option value="">Select Brand (Optional)</option>
// //                   {brands.filter(b => b.isActive !== false).map(brand => (
// //                     <option key={brand.id} value={brand.id}>
// //                       {brand.name}
// //                     </option>
// //                   ))}
// //                 </select>
// //                 {brands.length === 0 && (
// //                   <small style={{color: '#999', display: 'block', marginTop: '5px'}}>
// //                     No brands available. <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('brands'); setShowModal(false); }}>Add a brand first</a>
// //                   </small>
// //                 )}
// //               </div>

// //               {/* Category */}
// //               <div className="form-group">
// //                 <label>Category *</label>
// //                 <select
// //                   value={formData.category}
// //                   onChange={(e) => setFormData({ ...formData, category: e.target.value })}
// //                   required
// //                   className="form-input"
// //                 >
// //                   <option value="">Select Category</option>
// //                   {categoryOptions.map(cat => (
// //                     <option key={cat} value={cat}>{cat}</option>
// //                   ))}
// //                 </select>
// //               </div>

// //               {/* Product Category */}
// //               <div className="form-group">
// //                 <label>Product Category</label>
// //                 <select
// //                   value={formData.productCategory}
// //                   onChange={(e) => setFormData({ ...formData, productCategory: e.target.value })}
// //                   className="form-input"
// //                 >
// //                   <option value="">Select Product Category</option>
// //                   {productCategoryOptions.map(cat => (
// //                     <option key={cat} value={cat}>{cat}</option>
// //                   ))}
// //                 </select>
// //               </div>

// //               {/* Dress Style */}
// //               <div className="form-group">
// //                 <label>Dress Style *</label>
// //                 <select
// //                   value={formData.dressStyle}
// //                   onChange={(e) => setFormData({ ...formData, dressStyle: e.target.value })}
// //                   required
// //                   className="form-input"
// //                 >
// //                   {dressStyleOptions.map(style => (
// //                     <option key={style} value={style}>{style}</option>
// //                   ))}
// //                 </select>
// //               </div>

// //               {/* Price and Old Price */}
// //               <div className="form-row">
// //                 <div className="form-group">
// //                   <label>Price ($) *</label>
// //                   <input
// //                     type="number"
// //                     step="0.01"
// //                     value={formData.price}
// //                     onChange={(e) => setFormData({ ...formData, price: e.target.value })}
// //                     required
// //                     className="form-input"
// //                     placeholder="0.00"
// //                   />
// //                 </div>
// //                 <div className="form-group">
// //                   <label>Old Price ($)</label>
// //                   <input
// //                     type="number"
// //                     step="0.01"
// //                     value={formData.oldPrice}
// //                     onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
// //                     className="form-input"
// //                     placeholder="0.00"
// //                   />
// //                 </div>
// //               </div>

// //               {/* Description */}
// //               <div className="form-group">
// //                 <label>Description *</label>
// //                 <textarea
// //                   value={formData.description}
// //                   onChange={(e) => setFormData({ ...formData, description: e.target.value })}
// //                   required
// //                   className="form-input"
// //                   rows="3"
// //                   placeholder="Enter product description"
// //                 />
// //               </div>

// //               {/* Image URL */}
// //               <div className="form-group">
// //                 <label>Image URL *</label>
// //                 <input
// //                   type="url"
// //                   value={formData.image}
// //                   onChange={(e) => setFormData({ ...formData, image: e.target.value })}
// //                   required
// //                   className="form-input"
// //                   placeholder="https://example.com/image.jpg"
// //                 />
// //               </div>

// //               {/* Stock */}
// //               <div className="form-group">
// //                 <label>Stock Quantity</label>
// //                 <input
// //                   type="number"
// //                   value={formData.stock}
// //                   onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
// //                   className="form-input"
// //                   placeholder="100"
// //                 />
// //               </div>

// //               {/* Sizes */}
// //               <div className="form-group">
// //                 <label>Sizes <span style={{color: '#999', fontWeight: 'normal'}}>(Select multiple)</span></label>
// //                 <select
// //                   multiple
// //                   value={formData.sizes}
// //                   onChange={(e) => {
// //                     const selected = Array.from(e.target.selectedOptions, option => option.value);
// //                     setFormData({ ...formData, sizes: selected });
// //                   }}
// //                   className="form-input"
// //                   style={{height: '100px'}}
// //                 >
// //                   {sizeOptions.map(size => (
// //                     <option key={size} value={size}>{size}</option>
// //                   ))}
// //                 </select>
// //                 <small style={{color: '#999'}}>Hold Ctrl/Cmd to select multiple</small>
// //               </div>

// //               {/* Colors */}
// //               <div className="form-group">
// //                 <label>Colors <span style={{color: '#999', fontWeight: 'normal'}}>(Select multiple)</span></label>
// //                 <select
// //                   multiple
// //                   value={formData.colors}
// //                   onChange={(e) => {
// //                     const selected = Array.from(e.target.selectedOptions, option => option.value);
// //                     setFormData({ ...formData, colors: selected });
// //                   }}
// //                   className="form-input"
// //                   style={{height: '100px'}}
// //                 >
// //                   {colorOptions.map(color => (
// //                     <option key={color} value={color}>{color}</option>
// //                   ))}
// //                 </select>
// //                 <small style={{color: '#999'}}>Hold Ctrl/Cmd to select multiple</small>
// //               </div>

// //               {/* Checkboxes */}
// //               <div className="checkbox-group">
// //                 <label className="checkbox-label">
// //                   <input
// //                     type="checkbox"
// //                     checked={formData.isNewArrival}
// //                     onChange={(e) => setFormData({ ...formData, isNewArrival: e.target.checked })}
// //                   />
// //                   New Arrival
// //                 </label>
// //                 <label className="checkbox-label">
// //                   <input
// //                     type="checkbox"
// //                     checked={formData.isOnSale}
// //                     onChange={(e) => setFormData({ ...formData, isOnSale: e.target.checked })}
// //                   />
// //                   On Sale
// //                 </label>
// //               </div>

// //               <div className="modal-actions">
// //                 <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
// //                 <button type="submit" className="btn-primary" disabled={loading}>
// //                   {loading ? 'Saving...' : (editingItem ? 'Update' : 'Add')}
// //                 </button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       )}

// //       {/* Brand Modal */}
// //       {showBrandModal && (
// //         <div className="modal-overlay" onClick={() => setShowBrandModal(false)}>
// //           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
// //             <div className="modal-header">
// //               <h2>{editingBrand ? 'Edit Brand' : 'Add New Brand'}</h2>
// //               <button className="modal-close" onClick={() => setShowBrandModal(false)}>&times;</button>
// //             </div>
// //             <form onSubmit={handleSubmitBrand}>
// //               <div className="form-group">
// //                 <label>Brand Name *</label>
// //                 <input
// //                   type="text"
// //                   value={brandFormData.name}
// //                   onChange={(e) => setBrandFormData({ ...brandFormData, name: e.target.value })}
// //                   required
// //                   className="form-input"
// //                   placeholder="Enter brand name"
// //                 />
// //               </div>

// //               <div className="form-group">
// //                 <label>Description</label>
// //                 <textarea
// //                   value={brandFormData.description}
// //                   onChange={(e) => setBrandFormData({ ...brandFormData, description: e.target.value })}
// //                   className="form-input"
// //                   rows="3"
// //                   placeholder="Enter brand description"
// //                 />
// //               </div>

// //               <div className="form-group">
// //                 <label>Logo URL</label>
// //                 <input
// //                   type="url"
// //                   value={brandFormData.logo}
// //                   onChange={(e) => setBrandFormData({ ...brandFormData, logo: e.target.value })}
// //                   className="form-input"
// //                   placeholder="https://example.com/logo.png"
// //                 />
// //               </div>

// //               <div className="form-group">
// //                 <label>Website</label>
// //                 <input
// //                   type="url"
// //                   value={brandFormData.website}
// //                   onChange={(e) => setBrandFormData({ ...brandFormData, website: e.target.value })}
// //                   className="form-input"
// //                   placeholder="https://example.com"
// //                 />
// //               </div>

// //               <div className="checkbox-group">
// //                 <label className="checkbox-label">
// //                   <input
// //                     type="checkbox"
// //                     checked={brandFormData.isActive}
// //                     onChange={(e) => setBrandFormData({ ...brandFormData, isActive: e.target.checked })}
// //                   />
// //                   Active
// //                 </label>
// //               </div>

// //               <div className="modal-actions">
// //                 <button type="button" className="btn-secondary" onClick={() => setShowBrandModal(false)}>Cancel</button>
// //                 <button type="submit" className="btn-primary" disabled={loading}>
// //                   {loading ? 'Saving...' : (editingBrand ? 'Update' : 'Add')}
// //                 </button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       )}

// //       {/* Order Details Modal */}
// //       {showOrderModal && selectedOrder && (
// //         <div className="modal-overlay" onClick={() => setShowOrderModal(false)}>
// //           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
// //             <div className="modal-header">
// //               <h2>Order Details #{selectedOrder.id}</h2>
// //               <button className="modal-close" onClick={() => setShowOrderModal(false)}>&times;</button>
// //             </div>
            
// //             <div className="info-card">
// //               <h4>Order Information</h4>
// //               <p><strong>Order ID:</strong> #{selectedOrder.id}</p>
// //               <p><strong>Order Date:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
// //               <p><strong>Last Updated:</strong> {new Date(selectedOrder.updatedAt).toLocaleString()}</p>
// //               <p><strong>Status:</strong> <span className={`status-badge ${getStatusBadgeClass(selectedOrder.status)}`}>{selectedOrder.status?.toUpperCase()}</span></p>
// //               <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod || 'N/A'}</p>
// //             </div>

// //             <div className="info-card">
// //               <h4>Customer Information</h4>
// //               <p><strong>Name:</strong> {selectedOrder.User?.name || 'Guest'}</p>
// //               <p><strong>Email:</strong> {selectedOrder.User?.email || 'N/A'}</p>
// //               <p><strong>User ID:</strong> {selectedOrder.userId || 'N/A'}</p>
// //             </div>

// //             <div className="info-card">
// //               <h4>Shipping Address</h4>
// //               <p>{selectedOrder.shippingAddress || 'No address provided'}</p>
// //             </div>

// //             <div className="info-card">
// //               <h4>Payment Summary</h4>
// //               <p><strong>Total Amount:</strong> ${selectedOrder.total_amount || selectedOrder.total}</p>
// //             </div>

// //             <div className="modal-actions">
// //               <button className="btn-secondary" onClick={() => setShowOrderModal(false)}>Close</button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       <style>{`
// //         .admin-panel {
// //           display: flex;
// //           min-height: 100vh;
// //           background: #f5f5f5;
// //         }

// //         .admin-sidebar {
// //           width: 250px;
// //           background: linear-gradient(180deg, #000 0%, #1a1a1a 100%);
// //           color: white;
// //           padding: 30px 20px;
// //           position: fixed;
// //           height: 100vh;
// //           overflow-y: auto;
// //           display: flex;
// //           flex-direction: column;
// //           z-index: 100;
// //         }

// //         .admin-logo {
// //           margin-bottom: 40px;
// //           text-align: center;
// //           padding-bottom: 20px;
// //           border-bottom: 1px solid rgba(255,255,255,0.1);
// //         }

// //         .admin-logo h2 {
// //           margin: 0;
// //           font-size: 28px;
// //           font-weight: 700;
// //           letter-spacing: -1px;
// //         }

// //         .admin-logo p {
// //           margin: 5px 0 0 0;
// //           font-size: 12px;
// //           opacity: 0.6;
// //           letter-spacing: 2px;
// //           text-transform: uppercase;
// //         }

// //         .admin-nav {
// //           display: flex;
// //           flex-direction: column;
// //           gap: 5px;
// //           flex: 1;
// //         }

// //         .admin-nav button {
// //           padding: 12px 16px;
// //           background: transparent;
// //           border: none;
// //           color: rgba(255,255,255,0.7);
// //           text-align: left;
// //           font-size: 15px;
// //           cursor: pointer;
// //           border-radius: 10px;
// //           transition: all 0.3s;
// //           display: flex;
// //           align-items: center;
// //           gap: 12px;
// //         }

// //         .admin-nav button:hover {
// //           background: rgba(255,255,255,0.08);
// //           color: white;
// //         }

// //         .admin-nav button.active {
// //           background: rgba(255,255,255,0.12);
// //           color: white;
// //           font-weight: 600;
// //           box-shadow: inset 3px 0 0 #fff;
// //         }

// //         .nav-icon {
// //           font-size: 20px;
// //           width: 28px;
// //           text-align: center;
// //         }

// //         .nav-label {
// //           font-size: 14px;
// //         }

// //         .sidebar-footer {
// //           margin-top: auto;
// //           padding-top: 20px;
// //           border-top: 1px solid rgba(255,255,255,0.1);
// //         }

// //         .btn-logout-sidebar {
// //           padding: 12px 16px;
// //           background: transparent;
// //           border: none;
// //           color: rgba(255,255,255,0.7);
// //           text-align: left;
// //           font-size: 15px;
// //           cursor: pointer;
// //           border-radius: 10px;
// //           transition: all 0.3s;
// //           display: flex;
// //           align-items: center;
// //           gap: 12px;
// //           width: 100%;
// //         }

// //         .btn-logout-sidebar:hover {
// //           background: rgba(255,255,255,0.08);
// //           color: white;
// //         }

// //         .admin-content {
// //           flex: 1;
// //           margin-left: 250px;
// //           padding: 20px 30px;
// //           min-height: 100vh;
// //         }

// //         .admin-header {
// //           background: white;
// //           padding: 20px 30px;
// //           border-radius: 16px;
// //           display: flex;
// //           justify-content: space-between;
// //           align-items: center;
// //           margin-bottom: 25px;
// //           box-shadow: 0 2px 12px rgba(0,0,0,0.06);
// //         }

// //         .admin-header h1 {
// //           margin: 0;
// //           font-size: 24px;
// //           color: #1a1a1a;
// //         }

// //         .admin-header .subtitle {
// //           margin: 4px 0 0 0;
// //           color: #888;
// //           font-size: 14px;
// //         }

// //         .header-actions {
// //           display: flex;
// //           align-items: center;
// //           gap: 15px;
// //         }

// //         .admin-badge {
// //           background: #000;
// //           color: white;
// //           padding: 6px 16px;
// //           border-radius: 20px;
// //           font-size: 12px;
// //           font-weight: 600;
// //           letter-spacing: 0.5px;
// //         }

// //         .admin-main {
// //           background: white;
// //           border-radius: 16px;
// //           padding: 30px;
// //           box-shadow: 0 2px 12px rgba(0,0,0,0.06);
// //         }

// //         .stats-grid {
// //           display: grid;
// //           grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
// //           gap: 20px;
// //           margin-bottom: 40px;
// //         }

// //         .stat-card {
// //           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
// //           color: white;
// //           padding: 25px;
// //           border-radius: 14px;
// //           display: flex;
// //           align-items: center;
// //           gap: 20px;
// //           transition: transform 0.2s;
// //         }

// //         .stat-card:hover {
// //           transform: translateY(-4px);
// //         }

// //         .stat-card:nth-child(1) { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
// //         .stat-card:nth-child(2) { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); }
// //         .stat-card:nth-child(3) { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
// //         .stat-card:nth-child(4) { background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); }

// //         .stat-icon {
// //           font-size: 40px;
// //         }

// //         .stat-info h3 {
// //           font-size: 13px;
// //           margin: 0 0 4px 0;
// //           opacity: 0.9;
// //           font-weight: 500;
// //         }

// //         .stat-number {
// //           font-size: 28px;
// //           font-weight: 700;
// //           margin: 0;
// //         }

// //         .section-header {
// //           display: flex;
// //           justify-content: space-between;
// //           align-items: center;
// //           margin-bottom: 25px;
// //           flex-wrap: wrap;
// //           gap: 10px;
// //         }

// //         .section-header h2 {
// //           margin: 0;
// //           font-size: 22px;
// //           color: #1a1a1a;
// //         }

// //         .btn-primary {
// //           background: #000;
// //           color: white;
// //           padding: 10px 24px;
// //           border: none;
// //           border-radius: 8px;
// //           cursor: pointer;
// //           font-size: 14px;
// //           font-weight: 600;
// //           transition: all 0.3s;
// //         }

// //         .btn-primary:hover {
// //           background: #333;
// //           transform: translateY(-2px);
// //           box-shadow: 0 4px 12px rgba(0,0,0,0.2);
// //         }

// //         .btn-primary:disabled {
// //           opacity: 0.6;
// //           cursor: not-allowed;
// //           transform: none;
// //         }

// //         .btn-secondary {
// //           background: #e0e0e0;
// //           color: #333;
// //           padding: 10px 24px;
// //           border: none;
// //           border-radius: 8px;
// //           cursor: pointer;
// //           font-weight: 600;
// //           transition: all 0.3s;
// //         }

// //         .btn-secondary:hover {
// //           background: #d0d0d0;
// //         }

// //         .btn-refresh {
// //           background: #4caf50;
// //           color: white;
// //           padding: 8px 18px;
// //           border: none;
// //           border-radius: 8px;
// //           cursor: pointer;
// //           font-weight: 600;
// //           transition: all 0.3s;
// //         }

// //         .btn-refresh:hover {
// //           background: #43a047;
// //         }

// //         .btn-view {
// //           background: #2196f3;
// //           color: white;
// //           padding: 5px 12px;
// //           border: none;
// //           border-radius: 6px;
// //           cursor: pointer;
// //           font-size: 13px;
// //           transition: all 0.3s;
// //         }

// //         .btn-view:hover {
// //           background: #1976d2;
// //         }

// //         .filter-section {
// //           margin-bottom: 20px;
// //         }

// //         .filter-buttons {
// //           display: flex;
// //           gap: 8px;
// //           flex-wrap: wrap;
// //           margin-bottom: 20px;
// //         }

// //         .filter-btn {
// //           padding: 6px 16px;
// //           border: 1px solid #e0e0e0;
// //           background: white;
// //           border-radius: 20px;
// //           cursor: pointer;
// //           transition: all 0.2s;
// //           font-size: 13px;
// //           font-weight: 500;
// //         }

// //         .filter-btn:hover {
// //           background: #f5f5f5;
// //         }

// //         .filter-btn.active {
// //           background: #000;
// //           color: white;
// //           border-color: #000;
// //         }

// //         .data-table {
// //           width: 100%;
// //           border-collapse: collapse;
// //           font-size: 14px;
// //         }

// //         .data-table th,
// //         .data-table td {
// //           padding: 12px 15px;
// //           text-align: left;
// //           border-bottom: 1px solid #f0f0f0;
// //         }

// //         .data-table th {
// //           background: #f8f8f8;
// //           font-weight: 600;
// //           color: #555;
// //           font-size: 12px;
// //           text-transform: uppercase;
// //           letter-spacing: 0.5px;
// //         }

// //         .data-table tr:hover td {
// //           background: #fafafa;
// //         }

// //         .product-thumb {
// //           width: 45px;
// //           height: 45px;
// //           object-fit: cover;
// //           border-radius: 8px;
// //           border: 1px solid #eee;
// //         }

// //         .status-badge {
// //           padding: 4px 12px;
// //           border-radius: 20px;
// //           font-size: 12px;
// //           font-weight: 600;
// //           display: inline-block;
// //         }

// //         .status-badge.pending { background: #fff3e0; color: #e65100; }
// //         .status-badge.processing { background: #e3f2fd; color: #0d47a1; }
// //         .status-badge.shipped { background: #f3e5f5; color: #4a148c; }
// //         .status-badge.delivered { background: #e8f5e9; color: #1b5e20; }
// //         .status-badge.cancelled { background: #ffebee; color: #b71c1c; }

// //         .dress-style-badge {
// //           padding: 4px 12px;
// //           border-radius: 20px;
// //           font-size: 12px;
// //           font-weight: 600;
// //           display: inline-block;
// //         }

// //         .dress-style-badge.casual { background: #e8f5e9; color: #2e7d32; }
// //         .dress-style-badge.formal { background: #e3f2fd; color: #0d47a1; }
// //         .dress-style-badge.party { background: #fff3e0; color: #e65100; }
// //         .dress-style-badge.gym { background: #ffebee; color: #b71c1c; }

// //         .status-select {
// //           padding: 5px 10px;
// //           border-radius: 6px;
// //           border: 1px solid #e0e0e0;
// //           background: white;
// //           font-size: 13px;
// //           cursor: pointer;
// //         }

// //         .role-select {
// //           padding: 5px 10px;
// //           border-radius: 6px;
// //           border: 1px solid #e0e0e0;
// //           background: white;
// //           font-size: 13px;
// //           cursor: pointer;
// //         }

// //         .actions {
// //           display: flex;
// //           gap: 8px;
// //           flex-wrap: wrap;
// //         }

// //         .btn-edit, .btn-delete {
// //           padding: 5px 12px;
// //           border: none;
// //           border-radius: 6px;
// //           cursor: pointer;
// //           font-size: 13px;
// //           transition: all 0.3s;
// //         }

// //         .btn-edit {
// //           background: #e3f2fd;
// //           color: #0d47a1;
// //         }

// //         .btn-edit:hover {
// //           background: #bbdefb;
// //         }

// //         .btn-delete {
// //           background: #ffebee;
// //           color: #b71c1c;
// //         }

// //         .btn-delete:hover {
// //           background: #ffcdd2;
// //         }

// //         .btn-delete:disabled {
// //           opacity: 0.5;
// //           cursor: not-allowed;
// //         }

// //         .modal-overlay {
// //           position: fixed;
// //           top: 0;
// //           left: 0;
// //           right: 0;
// //           bottom: 0;
// //           background: rgba(0,0,0,0.6);
// //           display: flex;
// //           justify-content: center;
// //           align-items: center;
// //           z-index: 1000;
// //           animation: fadeIn 0.3s;
// //         }

// //         @keyframes fadeIn {
// //           from { opacity: 0; }
// //           to { opacity: 1; }
// //         }

// //         .modal-content {
// //           background: white;
// //           padding: 30px;
// //           border-radius: 16px;
// //           width: 90%;
// //           max-width: 600px;
// //           max-height: 85vh;
// //           overflow-y: auto;
// //           animation: slideUp 0.3s;
// //         }

// //         @keyframes slideUp {
// //           from { transform: translateY(30px); opacity: 0; }
// //           to { transform: translateY(0); opacity: 1; }
// //         }

// //         .modal-header {
// //           display: flex;
// //           justify-content: space-between;
// //           align-items: center;
// //           margin-bottom: 20px;
// //           padding-bottom: 15px;
// //           border-bottom: 2px solid #f0f0f0;
// //         }

// //         .modal-header h2 {
// //           margin: 0;
// //           font-size: 22px;
// //         }

// //         .modal-close {
// //           background: none;
// //           border: none;
// //           font-size: 30px;
// //           cursor: pointer;
// //           color: #999;
// //           transition: color 0.3s;
// //         }

// //         .modal-close:hover {
// //           color: #333;
// //         }

// //         .info-card {
// //           background: #f8f8f8;
// //           padding: 16px 20px;
// //           border-radius: 12px;
// //           margin-bottom: 15px;
// //         }

// //         .info-card h4 {
// //           margin: 0 0 10px 0;
// //           color: #333;
// //           font-size: 15px;
// //         }

// //         .info-card p {
// //           margin: 6px 0;
// //           font-size: 14px;
// //           color: #555;
// //         }

// //         .info-card p strong {
// //           color: #333;
// //         }

// //         .form-group {
// //           margin-bottom: 18px;
// //         }

// //         .form-group label {
// //           display: block;
// //           margin-bottom: 6px;
// //           font-weight: 600;
// //           font-size: 14px;
// //           color: #333;
// //         }

// //         .form-input {
// //           width: 100%;
// //           padding: 10px 14px;
// //           border: 1px solid #e0e0e0;
// //           border-radius: 8px;
// //           font-size: 14px;
// //           transition: border-color 0.3s;
// //           box-sizing: border-box;
// //         }

// //         .form-input:focus {
// //           border-color: #000;
// //           outline: none;
// //         }

// //         .form-row {
// //           display: grid;
// //           grid-template-columns: 1fr 1fr;
// //           gap: 15px;
// //         }

// //         .checkbox-group {
// //           display: flex;
// //           gap: 25px;
// //           margin: 20px 0;
// //           flex-wrap: wrap;
// //         }

// //         .checkbox-label {
// //           display: flex;
// //           align-items: center;
// //           gap: 8px;
// //           cursor: pointer;
// //           font-weight: 500;
// //           font-size: 14px;
// //         }

// //         .checkbox-label input[type="checkbox"] {
// //           width: 18px;
// //           height: 18px;
// //           cursor: pointer;
// //         }

// //         .modal-actions {
// //           display: flex;
// //           justify-content: flex-end;
// //           gap: 12px;
// //           margin-top: 25px;
// //           padding-top: 20px;
// //           border-top: 1px solid #f0f0f0;
// //         }

// //         .loading {
// //           text-align: center;
// //           padding: 60px 20px;
// //           font-size: 16px;
// //           color: #888;
// //         }

// //         .no-orders {
// //           text-align: center;
// //           padding: 40px 20px;
// //           color: #999;
// //           font-size: 15px;
// //         }

// //         /* Brands Management Styles */
// //         .search-bar {
// //           display: flex;
// //           align-items: center;
// //           gap: 10px;
// //           margin-bottom: 25px;
// //           position: relative;
// //         }

// //         .search-input {
// //           flex: 1;
// //           padding: 10px 40px 10px 16px;
// //           border: 1px solid #e0e0e0;
// //           border-radius: 8px;
// //           font-size: 14px;
// //           transition: border-color 0.3s;
// //         }

// //         .search-input:focus {
// //           border-color: #000;
// //           outline: none;
// //         }

// //         .clear-search {
// //           position: absolute;
// //           right: 10px;
// //           background: none;
// //           border: none;
// //           font-size: 18px;
// //           cursor: pointer;
// //           color: #999;
// //           padding: 5px;
// //         }

// //         .clear-search:hover {
// //           color: #333;
// //         }

// //         .brands-grid {
// //           display: grid;
// //           grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
// //           gap: 20px;
// //           margin-top: 20px;
// //         }

// //         .brand-card {
// //           background: white;
// //           border: 1px solid #f0f0f0;
// //           border-radius: 12px;
// //           padding: 20px;
// //           transition: all 0.3s;
// //           display: flex;
// //           flex-direction: column;
// //           align-items: center;
// //           text-align: center;
// //         }

// //         .brand-card:hover {
// //           box-shadow: 0 4px 16px rgba(0,0,0,0.08);
// //           transform: translateY(-2px);
// //         }

// //         .brand-logo {
// //           width: 100px;
// //           height: 100px;
// //           object-fit: contain;
// //           border-radius: 8px;
// //           margin-bottom: 15px;
// //           background: #f8f8f8;
// //           padding: 10px;
// //         }

// //         .brand-placeholder {
// //           width: 100px;
// //           height: 100px;
// //           border-radius: 8px;
// //           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
// //           display: flex;
// //           align-items: center;
// //           justify-content: center;
// //           margin-bottom: 15px;
// //         }

// //         .brand-placeholder span {
// //           font-size: 48px;
// //           font-weight: 700;
// //           color: white;
// //         }

// //         .brand-info {
// //           flex: 1;
// //           width: 100%;
// //         }

// //         .brand-info h3 {
// //           margin: 0 0 8px 0;
// //           font-size: 18px;
// //           color: #1a1a1a;
// //         }

// //         .brand-description {
// //           margin: 0 0 10px 0;
// //           font-size: 14px;
// //           color: #666;
// //           line-height: 1.5;
// //         }

// //         .brand-website {
// //           display: inline-block;
// //           margin-bottom: 10px;
// //           color: #2196f3;
// //           text-decoration: none;
// //           font-size: 13px;
// //           word-break: break-all;
// //         }

// //         .brand-website:hover {
// //           text-decoration: underline;
// //         }

// //         .brand-status {
// //           display: inline-block;
// //           padding: 4px 12px;
// //           border-radius: 20px;
// //           font-size: 12px;
// //           font-weight: 600;
// //         }

// //         .brand-status.active {
// //           background: #e8f5e9;
// //           color: #2e7d32;
// //         }

// //         .brand-status.inactive {
// //           background: #ffebee;
// //           color: #b71c1c;
// //         }

// //         .brand-actions {
// //           margin-top: 15px;
// //           display: flex;
// //           gap: 10px;
// //           width: 100%;
// //           justify-content: center;
// //         }

// //         .error-container {
// //           text-align: center;
// //           padding: 40px 20px;
// //         }

// //         .error-box {
// //           background: #fff3f3;
// //           border: 1px solid #ffcdd2;
// //           border-radius: 12px;
// //           padding: 30px;
// //           max-width: 400px;
// //           margin: 0 auto;
// //         }

// //         .error-icon {
// //           font-size: 48px;
// //           display: block;
// //           margin-bottom: 15px;
// //         }

// //         .error-message {
// //           color: #b71c1c;
// //           margin: 10px 0 20px 0;
// //         }

// //         .retry-button {
// //           background: #f44336;
// //           color: white;
// //           border: none;
// //           padding: 10px 24px;
// //           border-radius: 8px;
// //           cursor: pointer;
// //           font-weight: 600;
// //           transition: background 0.3s;
// //         }

// //         .retry-button:hover {
// //           background: #d32f2f;
// //         }

// //         .empty-state {
// //           text-align: center;
// //           padding: 60px 20px;
// //           color: #888;
// //         }

// //         .empty-state p {
// //           font-size: 16px;
// //           margin-bottom: 15px;
// //         }

// //         /* Categories and Settings */
// //         .placeholder-content {
// //           text-align: center;
// //           padding: 60px 20px;
// //           color: #888;
// //         }

// //         .placeholder-icon {
// //           font-size: 64px;
// //           margin-top: 20px;
// //           opacity: 0.5;
// //         }

// //         .settings-grid {
// //           display: grid;
// //           grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
// //           gap: 25px;
// //         }

// //         .settings-card {
// //           background: #f8f8f8;
// //           padding: 25px;
// //           border-radius: 12px;
// //         }

// //         .settings-card h3 {
// //           margin: 0 0 20px 0;
// //           font-size: 17px;
// //           color: #333;
// //         }

// //         .settings-item {
// //           margin-bottom: 15px;
// //         }

// //         .settings-item label {
// //           display: block;
// //           font-size: 13px;
// //           font-weight: 600;
// //           color: #666;
// //           margin-bottom: 5px;
// //         }

// //         .settings-item .form-input {
// //           background: white;
// //         }

// //         .settings-item span {
// //           display: inline-block;
// //           padding: 8px 0;
// //           font-size: 14px;
// //           color: #333;
// //         }

// //         /* Responsive */
// //         @media (max-width: 1024px) {
// //           .admin-sidebar {
// //             width: 80px;
// //             padding: 20px 10px;
// //           }
// //           .admin-logo h2 {
// //             font-size: 16px;
// //           }
// //           .admin-logo p {
// //             display: none;
// //           }
// //           .admin-nav button {
// //             padding: 10px 12px;
// //             justify-content: center;
// //           }
// //           .nav-label {
// //             display: none;
// //           }
// //           .sidebar-footer .nav-label {
// //             display: none;
// //           }
// //           .btn-logout-sidebar {
// //             justify-content: center;
// //             padding: 10px 12px;
// //           }
// //           .admin-content {
// //             margin-left: 80px;
// //             padding: 15px;
// //           }
// //           .brands-grid {
// //             grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
// //           }
// //         }

// //         @media (max-width: 768px) {
// //           .admin-sidebar {
// //             width: 60px;
// //             padding: 15px 8px;
// //           }
// //           .admin-logo h2 {
// //             font-size: 12px;
// //           }
// //           .admin-nav button {
// //             padding: 8px;
// //             font-size: 18px;
// //           }
// //           .admin-content {
// //             margin-left: 60px;
// //             padding: 10px;
// //           }
// //           .admin-header {
// //             flex-direction: column;
// //             align-items: flex-start;
// //             gap: 10px;
// //             padding: 15px;
// //           }
// //           .admin-header h1 {
// //             font-size: 18px;
// //           }
// //           .stats-grid {
// //             grid-template-columns: 1fr 1fr;
// //           }
// //           .data-table {
// //             font-size: 12px;
// //           }
// //           .data-table th,
// //           .data-table td {
// //             padding: 8px 10px;
// //           }
// //           .actions {
// //             flex-direction: column;
// //           }
// //           .product-thumb {
// //             width: 30px;
// //             height: 30px;
// //           }
// //           .filter-buttons {
// //             gap: 5px;
// //           }
// //           .filter-btn {
// //             font-size: 11px;
// //             padding: 4px 10px;
// //           }
// //           .form-row {
// //             grid-template-columns: 1fr;
// //           }
// //           .admin-main {
// //             padding: 15px;
// //           }
// //           .settings-grid {
// //             grid-template-columns: 1fr;
// //           }
// //           .modal-content {
// //             padding: 20px;
// //             width: 95%;
// //           }
// //           .brands-grid {
// //             grid-template-columns: 1fr 1fr;
// //           }
// //           .brand-card {
// //             padding: 15px;
// //           }
// //           .brand-logo {
// //             width: 70px;
// //             height: 70px;
// //           }
// //           .brand-placeholder {
// //             width: 70px;
// //             height: 70px;
// //           }
// //           .brand-placeholder span {
// //             font-size: 32px;
// //           }
// //         }

// //         @media (max-width: 480px) {
// //           .stats-grid {
// //             grid-template-columns: 1fr;
// //           }
// //           .stat-card {
// //             padding: 18px;
// //           }
// //           .stat-number {
// //             font-size: 22px;
// //           }
// //           .section-header {
// //             flex-direction: column;
// //             align-items: flex-start;
// //           }
// //           .brands-grid {
// //             grid-template-columns: 1fr;
// //           }
// //           .search-input {
// //             font-size: 13px;
// //             padding: 8px 35px 8px 12px;
// //           }
// //         }
// //       `}</style>
// //     </div>
// //   );
// // };

// // export default Admin;














// // // Admin.jsx - Complete Admin Panel with Brand-Product Relationship
// // import React, { useState, useEffect } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { useNavigate } from 'react-router-dom';
// // import {
// //   fetchProducts,
// //   createProduct,
// //   updateProduct,
// //   deleteProduct,
// //   clearError
// // } from '../redux/slices/productSlice';

// // const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// // const Admin = () => {
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
  
// //   const [activeTab, setActiveTab] = useState('dashboard');
// //   const [orders, setOrders] = useState([]);
// //   const [users, setUsers] = useState([]);
// //   const [brands, setBrands] = useState([]);
// //   const [brandsLoading, setBrandsLoading] = useState(false);
// //   const [brandsError, setBrandsError] = useState(null);
// //   const [brandSearchTerm, setBrandSearchTerm] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [showModal, setShowModal] = useState(false);
// //   const [showBrandModal, setShowBrandModal] = useState(false);
// //   const [editingItem, setEditingItem] = useState(null);
// //   const [editingBrand, setEditingBrand] = useState(null);
// //   const [selectedBrand, setSelectedBrand] = useState(null);
// //   const [dashboardStats, setDashboardStats] = useState({
// //     totalUsers: 0,
// //     totalProducts: 0,
// //     totalOrders: 0,
// //     totalRevenue: 0,
// //     recentOrders: []
// //   });
  
// //   // Brand form data
// //   const [brandFormData, setBrandFormData] = useState({
// //     name: '',
// //     description: '',
// //     logo: '',
// //     website: '',
// //     isActive: true
// //   });
  
// //   // Dress style options
// //   const dressStyleOptions = ['Casual', 'Formal', 'Party', 'Gym'];
// //   const categoryOptions = ['Men', 'Women', 'Accessories', 'Kids'];
// //   const productCategoryOptions = ['T-Shirts', 'Jeans', 'Jackets', 'Shoes', 'Dresses', 'Accessories', 'Hoodies', 'Pants'];
// //   const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
// //   const colorOptions = ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange', 'Pink', 'Gray', 'Brown'];
  
// //   const [formData, setFormData] = useState({
// //     title: '',
// //     name: '',
// //     price: '',
// //     oldPrice: '',
// //     description: '',
// //     category: '',
// //     productCategory: '',
// //     brandId: '',
// //     dressStyle: 'Casual',
// //     image: '',
// //     stock: '',
// //     isNewArrival: false,
// //     isOnSale: false,
// //     sizes: [],
// //     colors: []
// //   });

// //   // Order filter states
// //   const [orderFilter, setOrderFilter] = useState('all');
// //   const [selectedOrder, setSelectedOrder] = useState(null);
// //   const [showOrderModal, setShowOrderModal] = useState(false);

// //   // Get products from Redux store
// //   const { products, loading: productsLoading, error } = useSelector((state) => state.products);
// //   const { isAuthenticated, user } = useSelector((state) => state.auth);

// //   // Get auth token
// //   const getAuthToken = () => {
// //     const userData = localStorage.getItem('user');
// //     return userData ? JSON.parse(userData).token : null;
// //   };

// //   // Helper function for API calls
// //   const apiRequest = async (url, options = {}) => {
// //     try {
// //       const response = await fetch(url, {
// //         ...options,
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'Authorization': `Bearer ${getAuthToken()}`,
// //           ...options.headers
// //         }
// //       });
      
// //       if (!response.ok) {
// //         const error = await response.json().catch(() => ({}));
// //         throw new Error(error.message || error.error || 'API request failed');
// //       }
      
// //       return await response.json();
// //     } catch (error) {
// //       console.error('API Error:', error);
// //       throw error;
// //     }
// //   };

// //   // Check if user is admin
// //   useEffect(() => {
// //     if (!isAuthenticated || user?.email !== 'admin@shop.co') {
// //       navigate('/login');
// //     } else {
// //       loadDashboardData();
// //     }
// //   }, [isAuthenticated, user, navigate]);

// //   useEffect(() => {
// //     if (error) {
// //       alert(error);
// //       dispatch(clearError());
// //     }
// //   }, [error, dispatch]);

// //   // Fetch brands
// //   useEffect(() => {
// //     if (activeTab === 'brands' || activeTab === 'products') {
// //       fetchBrands();
// //     }
// //   }, [activeTab, brandSearchTerm]);

// //   const fetchBrands = async () => {
// //     try {
// //       setBrandsLoading(true);
// //       setBrandsError(null);
      
// //       const url = brandSearchTerm 
// //         ? `${API_URL}/brands?search=${brandSearchTerm}&limit=100`
// //         : `${API_URL}/brands?limit=100`;
        
// //       const data = await apiRequest(url);
      
// //       if (data.success) {
// //         setBrands(data.brands || []);
// //       } else {
// //         throw new Error(data.message || "Failed to fetch brands");
// //       }
// //     } catch (error) {
// //       console.error("Error fetching brands:", error);
// //       setBrandsError(error.message);
// //     } finally {
// //       setBrandsLoading(false);
// //     }
// //   };

// //   // Fetch brand with its products
// //   const fetchBrandWithProducts = async (brandId) => {
// //     try {
// //       const data = await apiRequest(`${API_URL}/brands/${brandId}`);
// //       if (data.success) {
// //         setSelectedBrand(data.brand);
// //         return data.brand;
// //       }
// //     } catch (error) {
// //       console.error('Error fetching brand with products:', error);
// //       alert('Failed to fetch brand details');
// //     }
// //   };

// //   const loadDashboardData = async () => {
// //     await Promise.all([
// //       dispatch(fetchProducts()),
// //       fetchDashboardStats(),
// //       fetchOrders(),
// //       fetchUsers()
// //     ]);
// //   };

// //   const fetchDashboardStats = async () => {
// //     try {
// //       const stats = await apiRequest(`${API_URL}/admin/dashboard/stats`);
// //       setDashboardStats(stats);
// //     } catch (error) {
// //       console.error('Error fetching stats:', error);
// //     }
// //   };

// //   const fetchOrders = async () => {
// //     try {
// //       const data = await apiRequest(`${API_URL}/admin/orders`);
// //       setOrders(data);
// //       const totalRevenue = Array.isArray(data) ? data.reduce((sum, order) => {
// //         if (order.status !== 'cancelled') {
// //           return sum + (parseFloat(order.total_amount || order.total) || 0);
// //         }
// //         return sum;
// //       }, 0) : 0;
      
// //       setDashboardStats(prev => ({
// //         ...prev,
// //         totalOrders: Array.isArray(data) ? data.length : 0,
// //         totalRevenue: totalRevenue,
// //         recentOrders: Array.isArray(data) ? data.slice(0, 5) : []
// //       }));
// //     } catch (error) {
// //       console.error('Error fetching orders:', error);
// //       alert('Failed to fetch orders');
// //     }
// //   };

// //   const fetchUsers = async () => {
// //     try {
// //       const data = await apiRequest(`${API_URL}/admin/users`);
// //       setUsers(data);
// //       setDashboardStats(prev => ({
// //         ...prev,
// //         totalUsers: data.length
// //       }));
// //     } catch (error) {
// //       console.error('Error fetching users:', error);
// //       alert('Failed to fetch users');
// //     }
// //   };

// //   // Brand CRUD Operations
// //   const handleAddBrand = () => {
// //     setEditingBrand(null);
// //     setBrandFormData({
// //       name: '',
// //       description: '',
// //       logo: '',
// //       website: '',
// //       isActive: true
// //     });
// //     setShowBrandModal(true);
// //   };

// //   const handleEditBrand = (brand) => {
// //     setEditingBrand(brand);
// //     setBrandFormData({
// //       name: brand.name || '',
// //       description: brand.description || '',
// //       logo: brand.logo || '',
// //       website: brand.website || '',
// //       isActive: brand.isActive !== undefined ? brand.isActive : true
// //     });
// //     setShowBrandModal(true);
// //   };

// //   const handleDeleteBrand = async (brandId) => {
// //     if (window.confirm('Are you sure you want to delete this brand?')) {
// //       try {
// //         await apiRequest(`${API_URL}/brands/${brandId}`, {
// //           method: 'DELETE'
// //         });
// //         await fetchBrands();
// //         alert('Brand deleted successfully!');
// //       } catch (error) {
// //         console.error('Error deleting brand:', error);
// //         alert(error.message || 'Failed to delete brand');
// //       }
// //     }
// //   };

// //   const handleSubmitBrand = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
    
// //     try {
// //       // ✅ No id field - database auto-generates it
// //       const brandData = {
// //         name: brandFormData.name,
// //         description: brandFormData.description,
// //         logo: brandFormData.logo,
// //         website: brandFormData.website,
// //         isActive: brandFormData.isActive
// //       };

// //       if (editingBrand) {
// //         await apiRequest(`${API_URL}/brands/${editingBrand.id}`, {
// //           method: 'PUT',
// //           body: JSON.stringify(brandData)
// //         });
// //         alert('Brand updated successfully!');
// //       } else {
// //         // ✅ Create brand - no id in request body
// //         await apiRequest(`${API_URL}/brands`, {
// //           method: 'POST',
// //           body: JSON.stringify(brandData)
// //         });
// //         alert('Brand added successfully!');
// //       }
      
// //       await fetchBrands();
// //       setShowBrandModal(false);
// //       setEditingBrand(null);
// //       setBrandFormData({
// //         name: '',
// //         description: '',
// //         logo: '',
// //         website: '',
// //         isActive: true
// //       });
// //     } catch (error) {
// //       console.error('Error saving brand:', error);
// //       alert(error.message || 'Failed to save brand');
// //     }
// //     setLoading(false);
// //   };

// //   // Product CRUD Operations
// //   const handleAddProduct = () => {
// //     setEditingItem(null);
// //     setFormData({
// //       title: '',
// //       name: '',
// //       price: '',
// //       oldPrice: '',
// //       description: '',
// //       category: '',
// //       productCategory: '',
// //       brandId: '',
// //       dressStyle: 'Casual',
// //       image: '',
// //       stock: '',
// //       isNewArrival: false,
// //       isOnSale: false,
// //       sizes: [],
// //       colors: []
// //     });
// //     setShowModal(true);
// //   };

// //   const handleEditProduct = (product) => {
// //     setEditingItem(product);
// //     setFormData({
// //       title: product.title || '',
// //       name: product.name || '',
// //       price: product.price || '',
// //       oldPrice: product.oldPrice || '',
// //       description: product.description || '',
// //       category: product.category || '',
// //       productCategory: product.productCategory || '',
// //       brandId: product.brandId || '',
// //       dressStyle: product.dressStyle || 'Casual',
// //       image: product.image || '',
// //       stock: product.stock || 100,
// //       isNewArrival: product.isNewArrival || false,
// //       isOnSale: product.isOnSale || false,
// //       sizes: product.sizes || [],
// //       colors: product.colors || []
// //     });
// //     setShowModal(true);
// //   };

// //   const handleDeleteProduct = async (id) => {
// //     if (window.confirm('Are you sure you want to delete this product?')) {
// //       setLoading(true);
// //       try {
// //         await dispatch(deleteProduct(id)).unwrap();
// //         alert('Product deleted successfully!');
// //         await fetchDashboardStats();
// //       } catch (error) {
// //         console.error('Error deleting product:', error);
// //         alert(error.message || 'Failed to delete product');
// //       }
// //       setLoading(false);
// //     }
// //   };

// //   const handleSubmitProduct = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
    
// //     try {
// //       const productData = {
// //         title: formData.title,
// //         name: formData.name || formData.title,
// //         price: parseFloat(formData.price),
// //         oldPrice: formData.oldPrice ? parseFloat(formData.oldPrice) : null,
// //         description: formData.description,
// //         category: formData.category,
// //         productCategory: formData.productCategory,
// //         brandId: formData.brandId || null, // ✅ Optional brand association
// //         dressStyle: formData.dressStyle,
// //         image: formData.image,
// //         stock: parseInt(formData.stock) || 100,
// //         isNewArrival: formData.isNewArrival,
// //         isOnSale: formData.isOnSale,
// //         sizes: formData.sizes,
// //         colors: formData.colors
// //       };

// //       if (editingItem) {
// //         await dispatch(updateProduct({ 
// //           id: editingItem.id, 
// //           productData 
// //         })).unwrap();
// //         alert('Product updated successfully!');
// //       } else {
// //         await dispatch(createProduct(productData)).unwrap();
// //         alert('Product added successfully!');
// //       }
      
// //       await fetchDashboardStats();
// //       setShowModal(false);
// //       setEditingItem(null);
// //       setFormData({
// //         title: '',
// //         name: '',
// //         price: '',
// //         oldPrice: '',
// //         description: '',
// //         category: '',
// //         productCategory: '',
// //         brandId: '',
// //         dressStyle: 'Casual',
// //         image: '',
// //         stock: '',
// //         isNewArrival: false,
// //         isOnSale: false,
// //         sizes: [],
// //         colors: []
// //       });
// //     } catch (error) {
// //       console.error('Error saving product:', error);
// //       alert(error.message || 'Failed to save product');
// //     }
// //     setLoading(false);
// //   };

// //   // Order Management
// //   const handleUpdateOrderStatus = async (orderId, newStatus) => {
// //     try {
// //       await apiRequest(`${API_URL}/admin/orders/${orderId}/status`, {
// //         method: 'PUT',
// //         body: JSON.stringify({ status: newStatus })
// //       });
// //       await fetchOrders();
// //       await fetchDashboardStats();
// //       alert(`Order #${orderId} status updated to ${newStatus}`);
// //     } catch (error) {
// //       console.error('Error updating order:', error);
// //       alert('Failed to update order status');
// //     }
// //   };

// //   const handleDeleteOrder = async (orderId) => {
// //     if (window.confirm('Are you sure you want to delete this order?')) {
// //       try {
// //         await apiRequest(`${API_URL}/admin/orders/${orderId}`, {
// //           method: 'DELETE'
// //         });
// //         await fetchOrders();
// //         await fetchDashboardStats();
// //         alert('Order deleted successfully!');
// //       } catch (error) {
// //         console.error('Error deleting order:', error);
// //         alert('Failed to delete order');
// //       }
// //     }
// //   };

// //   // User Management
// //   const handleUpdateUserRole = async (userId, newRole) => {
// //     try {
// //       await apiRequest(`${API_URL}/admin/users/${userId}`, {
// //         method: 'PUT',
// //         body: JSON.stringify({ role: newRole })
// //       });
// //       await fetchUsers();
// //       alert(`User role updated to ${newRole}`);
// //     } catch (error) {
// //       console.error('Error updating user role:', error);
// //       alert('Failed to update user role');
// //     }
// //   };

// //   const handleDeleteUser = async (userId) => {
// //     if (window.confirm('Are you sure you want to delete this user?')) {
// //       try {
// //         await apiRequest(`${API_URL}/admin/users/${userId}`, {
// //           method: 'DELETE'
// //         });
// //         await fetchUsers();
// //         await fetchDashboardStats();
// //         alert('User deleted successfully!');
// //       } catch (error) {
// //         console.error('Error deleting user:', error);
// //         alert(error.message || 'Failed to delete user');
// //       }
// //     }
// //   };

// //   // Helper functions for orders
// //   const getStatusBadgeClass = (status) => {
// //     switch(status?.toLowerCase()) {
// //       case 'pending': return 'pending';
// //       case 'processing': return 'processing';
// //       case 'shipped': return 'shipped';
// //       case 'delivered': return 'delivered';
// //       case 'cancelled': return 'cancelled';
// //       default: return '';
// //     }
// //   };

// //   const getDressStyleBadgeClass = (dressStyle) => {
// //     switch(dressStyle?.toLowerCase()) {
// //       case 'casual': return 'casual';
// //       case 'formal': return 'formal';
// //       case 'party': return 'party';
// //       case 'gym': return 'gym';
// //       default: return '';
// //     }
// //   };

// //   const filteredOrders = orderFilter === 'all' 
// //     ? orders 
// //     : orders.filter(order => order.status?.toLowerCase() === orderFilter);

// //   const getStatusCount = (status) => {
// //     if (status === 'all') return orders.length;
// //     return orders.filter(o => o.status?.toLowerCase() === status).length;
// //   };

// //   // Dashboard Component
// //   const Dashboard = () => (
// //     <div className="dashboard">
// //       <div className="stats-grid">
// //         <div className="stat-card">
// //           <div className="stat-icon">📦</div>
// //           <div className="stat-info">
// //             <h3>Total Products</h3>
// //             <p className="stat-number">{dashboardStats.totalProducts}</p>
// //           </div>
// //         </div>
// //         <div className="stat-card">
// //           <div className="stat-icon">🛒</div>
// //           <div className="stat-info">
// //             <h3>Total Orders</h3>
// //             <p className="stat-number">{dashboardStats.totalOrders}</p>
// //           </div>
// //         </div>
// //         <div className="stat-card">
// //           <div className="stat-icon">👥</div>
// //           <div className="stat-info">
// //             <h3>Total Users</h3>
// //             <p className="stat-number">{dashboardStats.totalUsers}</p>
// //           </div>
// //         </div>
// //         <div className="stat-card">
// //           <div className="stat-icon">💰</div>
// //           <div className="stat-info">
// //             <h3>Total Revenue</h3>
// //             <p className="stat-number">${(dashboardStats.totalRevenue || 0).toLocaleString()}</p>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="recent-activity">
// //         <h3>Recent Orders</h3>
// //         <table className="data-table">
// //           <thead>
// //             <tr>
// //               <th>Order ID</th>
// //               <th>Customer</th>
// //               <th>Total</th>
// //               <th>Status</th>
// //               <th>Date</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {(dashboardStats.recentOrders || []).slice(0, 5).map(order => (
// //               <tr key={order.id}>
// //                 <td>#{order.id}</td>
// //                 <td>{order.User?.name || 'Guest'}</td>
// //                 <td>${order.total_amount || order.total}</td>
// //                 <td><span className={`status-badge ${getStatusBadgeClass(order.status)}`}>{order.status}</span></td>
// //                 <td>{new Date(order.createdAt).toLocaleDateString()}</td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );

// //   // Products Management Component with Brand
// //   const ProductsManagement = () => (
// //     <div className="products-management">
// //       <div className="section-header">
// //         <h2>Products Management</h2>
// //         <button className="btn-primary" onClick={handleAddProduct}>+ Add New Product</button>
// //       </div>
      
// //       {(productsLoading || loading) ? (
// //         <div className="loading">Loading...</div>
// //       ) : (
// //         <table className="data-table">
// //           <thead>
// //             <tr>
// //               <th>Image</th>
// //               <th>Title</th>
// //               <th>Brand</th>
// //               <th>Category</th>
// //               <th>Product Category</th>
// //               <th>Dress Style</th>
// //               <th>Price</th>
// //               <th>Stock</th>
// //               <th>Actions</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {products.map(product => {
// //               const brand = brands.find(b => b.id === product.brandId);
// //               return (
// //                 <tr key={product.id}>
// //                   <td>
// //                     <img 
// //                       src={product.image} 
// //                       alt={product.title} 
// //                       className="product-thumb"
// //                       onError={(e) => {
// //                         e.target.src = 'https://via.placeholder.com/50';
// //                       }}
// //                     />
// //                   </td>
// //                   <td>{product.title?.substring(0, 50)}...</td>
// //                   <td>
// //                     {brand ? (
// //                       <span className="brand-tag">{brand.name}</span>
// //                     ) : (
// //                       <span className="no-brand">No Brand</span>
// //                     )}
// //                   </td>
// //                   <td>{product.category}</td>
// //                   <td>{product.productCategory || '-'}</td>
// //                   <td>
// //                     <span className={`dress-style-badge ${getDressStyleBadgeClass(product.dressStyle)}`}>
// //                       {product.dressStyle || 'Casual'}
// //                     </span>
// //                   </td>
// //                   <td>${product.price}</td>
// //                   <td>{product.stock || 100}</td>
// //                   <td className="actions">
// //                     <button className="btn-edit" onClick={() => handleEditProduct(product)}>✏️ Edit</button>
// //                     <button className="btn-delete" onClick={() => handleDeleteProduct(product.id)}>🗑️ Delete</button>
// //                   </td>
// //                 </tr>
// //               );
// //             })}
// //           </tbody>
// //         </table>
// //       )}
// //     </div>
// //   );

// //   // Orders Management Component
// //   const OrdersManagement = () => (
// //     <div className="orders-management">
// //       <div className="section-header">
// //         <h2>Orders Management</h2>
// //         <button className="btn-refresh" onClick={fetchOrders}>🔄 Refresh</button>
// //       </div>

// //       <div className="filter-section">
// //         <div className="filter-buttons">
// //           <button className={`filter-btn ${orderFilter === 'all' ? 'active' : ''}`} onClick={() => setOrderFilter('all')}>
// //             All ({getStatusCount('all')})
// //           </button>
// //           <button className={`filter-btn ${orderFilter === 'pending' ? 'active' : ''}`} onClick={() => setOrderFilter('pending')}>
// //             Pending ({getStatusCount('pending')})
// //           </button>
// //           <button className={`filter-btn ${orderFilter === 'processing' ? 'active' : ''}`} onClick={() => setOrderFilter('processing')}>
// //             Processing ({getStatusCount('processing')})
// //           </button>
// //           <button className={`filter-btn ${orderFilter === 'shipped' ? 'active' : ''}`} onClick={() => setOrderFilter('shipped')}>
// //             Shipped ({getStatusCount('shipped')})
// //           </button>
// //           <button className={`filter-btn ${orderFilter === 'delivered' ? 'active' : ''}`} onClick={() => setOrderFilter('delivered')}>
// //             Delivered ({getStatusCount('delivered')})
// //           </button>
// //           <button className={`filter-btn ${orderFilter === 'cancelled' ? 'active' : ''}`} onClick={() => setOrderFilter('cancelled')}>
// //             Cancelled ({getStatusCount('cancelled')})
// //           </button>
// //         </div>
// //       </div>
      
// //       <table className="data-table">
// //         <thead>
// //           <tr>
// //             <th>Order ID</th>
// //             <th>Customer</th>
// //             <th>Email</th>
// //             <th>Items</th>
// //             <th>Total</th>
// //             <th>Status</th>
// //             <th>Date</th>
// //             <th>Actions</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {filteredOrders.map(order => (
// //             <tr key={order.id}>
// //               <td>#{order.id}</td>
// //               <td>{order.User?.name || order.customer || 'Guest'}</td>
// //               <td>{order.User?.email || order.email || 'N/A'}</td>
// //               <td>{order.OrderItems?.length || order.items || 0}</td>
// //               <td>${order.total_amount || order.total}</td>
// //               <td>
// //                 <select 
// //                   value={order.status} 
// //                   onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
// //                   className={`status-select ${order.status}`}
// //                 >
// //                   <option value="pending">Pending</option>
// //                   <option value="processing">Processing</option>
// //                   <option value="shipped">Shipped</option>
// //                   <option value="delivered">Delivered</option>
// //                   <option value="cancelled">Cancelled</option>
// //                 </select>
// //               </td>
// //               <td>{new Date(order.createdAt).toLocaleDateString()}</td>
// //               <td className="actions">
// //                 <button className="btn-view" onClick={() => { setSelectedOrder(order); setShowOrderModal(true); }}>
// //                   👁️ View
// //                 </button>
// //                 <button className="btn-delete" onClick={() => handleDeleteOrder(order.id)}>🗑️ Delete</button>
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
      
// //       {filteredOrders.length === 0 && (
// //         <div className="no-orders">No orders found</div>
// //       )}
// //     </div>
// //   );

// //   // Users Management Component
// //   const UsersManagement = () => (
// //     <div className="users-management">
// //       <div className="section-header">
// //         <h2>Users Management</h2>
// //       </div>
      
// //       <table className="data-table">
// //         <thead>
// //           <tr>
// //             <th>ID</th>
// //             <th>Name</th>
// //             <th>Email</th>
// //             <th>Role</th>
// //             <th>Joined Date</th>
// //             <th>Actions</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {users.map(user => (
// //             <tr key={user.id}>
// //               <td>{user.id}</td>
// //               <td>{user.name}</td>
// //               <td>{user.email}</td>
// //               <td>
// //                 <select 
// //                   value={user.role} 
// //                   onChange={(e) => handleUpdateUserRole(user.id, e.target.value)}
// //                   className="role-select"
// //                   disabled={user.email === 'admin@shop.co'}
// //                 >
// //                   <option value="user">User</option>
// //                   <option value="admin">Admin</option>
// //                 </select>
// //               </td>
// //               <td>{new Date(user.createdAt).toLocaleDateString()}</td>
// //               <td className="actions">
// //                 <button 
// //                   className="btn-delete" 
// //                   onClick={() => handleDeleteUser(user.id)}
// //                   disabled={user.email === 'admin@shop.co'}
// //                 >
// //                   🗑️ Delete
// //                 </button>
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );

// //   // Brands Management Component with Products Display
// //   const BrandsManagement = () => (
// //     <div className="brands-management">
// //       <div className="section-header">
// //         <h2>Brands Management</h2>
// //         <button className="btn-primary" onClick={handleAddBrand}>
// //           + Add New Brand
// //         </button>
// //       </div>

// //       {/* Search Bar */}
// //       <div className="search-bar">
// //         <input
// //           type="text"
// //           placeholder="Search brands..."
// //           value={brandSearchTerm}
// //           onChange={(e) => setBrandSearchTerm(e.target.value)}
// //           className="search-input"
// //         />
// //         {brandSearchTerm && (
// //           <button 
// //             className="clear-search"
// //             onClick={() => setBrandSearchTerm("")}
// //           >
// //             ✕
// //           </button>
// //         )}
// //       </div>

// //       {brandsLoading ? (
// //         <div className="loading">Loading brands...</div>
// //       ) : brandsError ? (
// //         <div className="error-container">
// //           <div className="error-box">
// //             <span className="error-icon">⚠️</span>
// //             <h3>Something went wrong</h3>
// //             <p className="error-message">{brandsError}</p>
// //             <button onClick={fetchBrands} className="retry-button">
// //               Retry
// //             </button>
// //           </div>
// //         </div>
// //       ) : brands.length === 0 ? (
// //         <div className="empty-state">
// //           <p>No brands found {brandSearchTerm && `for "${brandSearchTerm}"`}</p>
// //           {brandSearchTerm && (
// //             <button onClick={() => setBrandSearchTerm("")} className="btn-secondary">
// //               Clear Search
// //             </button>
// //           )}
// //         </div>
// //       ) : (
// //         <div className="brands-grid">
// //           {brands.map((brand) => (
// //             <div key={brand.id} className="brand-card">
// //               {brand.logo ? (
// //                 <img
// //                   src={brand.logo}
// //                   alt={brand.name}
// //                   className="brand-logo"
// //                   loading="lazy"
// //                   onError={(e) => {
// //                     e.target.onerror = null;
// //                     e.target.src = "/placeholder-brand.png";
// //                   }}
// //                 />
// //               ) : (
// //                 <div className="brand-placeholder">
// //                   <span>{brand.name.charAt(0).toUpperCase()}</span>
// //                 </div>
// //               )}
// //               <div className="brand-info">
// //                 <h3>{brand.name}</h3>
// //                 {brand.description && (
// //                   <p className="brand-description">
// //                     {brand.description.length > 100 
// //                       ? `${brand.description.substring(0, 100)}...` 
// //                       : brand.description}
// //                   </p>
// //                 )}
// //                 {brand.website && (
// //                   <a href={brand.website} target="_blank" rel="noopener noreferrer" className="brand-website">
// //                     🌐 {brand.website}
// //                   </a>
// //                 )}
// //                 <span className={`brand-status ${brand.isActive !== false ? 'active' : 'inactive'}`}>
// //                   {brand.isActive !== false ? 'Active' : 'Inactive'}
// //                 </span>
                
// //                 {/* ✅ Display products count */}
// //                 <div className="brand-products-info">
// //                   <span className="product-count">
// //                     📦 {brand.productCount || 0} products
// //                   </span>
// //                   <button 
// //                     className="btn-view-products"
// //                     onClick={() => fetchBrandWithProducts(brand.id)}
// //                   >
// //                     View Products
// //                   </button>
// //                 </div>
// //               </div>
// //               <div className="brand-actions">
// //                 <button className="btn-edit" onClick={() => handleEditBrand(brand)}>✏️ Edit</button>
// //                 <button className="btn-delete" onClick={() => handleDeleteBrand(brand.id)}>🗑️ Delete</button>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       )}

// //       {/* ✅ Brand Products Modal */}
// //       {selectedBrand && (
// //         <div className="modal-overlay" onClick={() => setSelectedBrand(null)}>
// //           <div className="modal-content large-modal" onClick={(e) => e.stopPropagation()}>
// //             <div className="modal-header">
// //               <h2>Products for {selectedBrand.name}</h2>
// //               <button className="modal-close" onClick={() => setSelectedBrand(null)}>&times;</button>
// //             </div>
            
// //             {selectedBrand.products && selectedBrand.products.length > 0 ? (
// //               <table className="data-table">
// //                 <thead>
// //                   <tr>
// //                     <th>Image</th>
// //                     <th>Title</th>
// //                     <th>Price</th>
// //                     <th>Category</th>
// //                     <th>Stock</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {selectedBrand.products.map(product => (
// //                     <tr key={product.id}>
// //                       <td>
// //                         <img 
// //                           src={product.image} 
// //                           alt={product.title} 
// //                           className="product-thumb"
// //                           onError={(e) => {
// //                             e.target.src = 'https://via.placeholder.com/50';
// //                           }}
// //                         />
// //                       </td>
// //                       <td>{product.title}</td>
// //                       <td>${product.price}</td>
// //                       <td>{product.category}</td>
// //                       <td>{product.stock}</td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             ) : (
// //               <div className="empty-state">
// //                 <p>No products found for this brand</p>
// //               </div>
// //             )}
            
// //             <div className="modal-actions">
// //               <button className="btn-secondary" onClick={() => setSelectedBrand(null)}>Close</button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );

// //   // Categories Management Component
// //   const CategoriesManagement = () => (
// //     <div className="categories-management">
// //       <div className="section-header">
// //         <h2>Categories Management</h2>
// //         <button className="btn-primary" onClick={() => alert('Add Category functionality coming soon!')}>
// //           + Add New Category
// //         </button>
// //       </div>
// //       <div className="placeholder-content">
// //         <p>Category management features will be available here.</p>
// //         <div className="placeholder-icon">📂</div>
// //       </div>
// //     </div>
// //   );

// //   // Settings Component
// //   const Settings = () => (
// //     <div className="settings">
// //       <div className="section-header">
// //         <h2>Settings</h2>
// //       </div>
// //       <div className="settings-grid">
// //         <div className="settings-card">
// //           <h3>General Settings</h3>
// //           <div className="settings-item">
// //             <label>Store Name</label>
// //             <input type="text" value="SHOP.CO" className="form-input" disabled />
// //           </div>
// //           <div className="settings-item">
// //             <label>Store Email</label>
// //             <input type="email" value="admin@shop.co" className="form-input" disabled />
// //           </div>
// //         </div>
// //         <div className="settings-card">
// //           <h3>Appearance</h3>
// //           <div className="settings-item">
// //             <label>Theme</label>
// //             <select className="form-input" disabled>
// //               <option>Light</option>
// //               <option>Dark</option>
// //             </select>
// //           </div>
// //         </div>
// //         <div className="settings-card">
// //           <h3>System Info</h3>
// //           <div className="settings-item">
// //             <label>Version</label>
// //             <span>1.0.0</span>
// //           </div>
// //           <div className="settings-item">
// //             <label>Environment</label>
// //             <span>{import.meta.env.VITE_ENV || 'Development'}</span>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );

// //   return (
// //     <div className="admin-panel">
// //       <div className="admin-sidebar">
// //         <div className="admin-logo">
// //           <h2>SHOP.CO</h2>
// //           <p>Admin Panel</p>
// //         </div>
// //         <nav className="admin-nav">
// //           <button 
// //             className={activeTab === 'dashboard' ? 'active' : ''} 
// //             onClick={() => setActiveTab('dashboard')}
// //           >
// //             <span className="nav-icon">📊</span>
// //             <span className="nav-label">Dashboard</span>
// //           </button>
// //           <button 
// //             className={activeTab === 'products' ? 'active' : ''} 
// //             onClick={() => setActiveTab('products')}
// //           >
// //             <span className="nav-icon">📦</span>
// //             <span className="nav-label">Products</span>
// //           </button>
// //           <button 
// //             className={activeTab === 'orders' ? 'active' : ''} 
// //             onClick={() => setActiveTab('orders')}
// //           >
// //             <span className="nav-icon">🛒</span>
// //             <span className="nav-label">Orders</span>
// //           </button>
// //           <button 
// //             className={activeTab === 'users' ? 'active' : ''} 
// //             onClick={() => setActiveTab('users')}
// //           >
// //             <span className="nav-icon">👥</span>
// //             <span className="nav-label">Users</span>
// //           </button>
// //           <button 
// //             className={activeTab === 'brands' ? 'active' : ''} 
// //             onClick={() => setActiveTab('brands')}
// //           >
// //             <span className="nav-icon">🏷️</span>
// //             <span className="nav-label">Brands</span>
// //           </button>
// //           <button 
// //             className={activeTab === 'categories' ? 'active' : ''} 
// //             onClick={() => setActiveTab('categories')}
// //           >
// //             <span className="nav-icon">📂</span>
// //             <span className="nav-label">Categories</span>
// //           </button>
// //           <button 
// //             className={activeTab === 'settings' ? 'active' : ''} 
// //             onClick={() => setActiveTab('settings')}
// //           >
// //             <span className="nav-icon">⚙️</span>
// //             <span className="nav-label">Settings</span>
// //           </button>
// //         </nav>
// //         <div className="sidebar-footer">
// //           <button className="btn-logout-sidebar" onClick={() => navigate('/')}>
// //             <span className="nav-icon">🏠</span>
// //             <span className="nav-label">View Store</span>
// //           </button>
// //         </div>
// //       </div>

// //       <div className="admin-content">
// //         <div className="admin-header">
// //           <div>
// //             <h1>Welcome back, {user?.name || 'Admin'}!</h1>
// //             <p className="subtitle">Manage your store efficiently</p>
// //           </div>
// //           <div className="header-actions">
// //             <span className="admin-badge">Admin</span>
// //           </div>
// //         </div>

// //         <div className="admin-main">
// //           {activeTab === 'dashboard' && <Dashboard />}
// //           {activeTab === 'products' && <ProductsManagement />}
// //           {activeTab === 'orders' && <OrdersManagement />}
// //           {activeTab === 'users' && <UsersManagement />}
// //           {activeTab === 'brands' && <BrandsManagement />}
// //           {activeTab === 'categories' && <CategoriesManagement />}
// //           {activeTab === 'settings' && <Settings />}
// //         </div>
// //       </div>

// //       {/* Product Modal with Brand Selection */}
// //       {showModal && (
// //         <div className="modal-overlay" onClick={() => setShowModal(false)}>
// //           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
// //             <div className="modal-header">
// //               <h2>{editingItem ? 'Edit Product' : 'Add New Product'}</h2>
// //               <button className="modal-close" onClick={() => setShowModal(false)}>&times;</button>
// //             </div>
// //             <form onSubmit={handleSubmitProduct}>
// //               {/* Product Name */}
// //               <div className="form-group">
// //                 <label>Product Name *</label>
// //                 <input
// //                   type="text"
// //                   value={formData.title}
// //                   onChange={(e) => setFormData({ ...formData, title: e.target.value })}
// //                   required
// //                   className="form-input"
// //                   placeholder="Enter product name"
// //                 />
// //               </div>

// //               {/* Brand Selection - Optional */}
// //               <div className="form-group">
// //                 <label>Brand <span style={{color: '#999', fontWeight: 'normal'}}>(Optional)</span></label>
// //                 <select
// //                   value={formData.brandId}
// //                   onChange={(e) => setFormData({ ...formData, brandId: e.target.value })}
// //                   className="form-input"
// //                 >
// //                   <option value="">Select Brand (Optional)</option>
// //                   {brands.filter(b => b.isActive !== false).map(brand => (
// //                     <option key={brand.id} value={brand.id}>
// //                       {brand.name}
// //                     </option>
// //                   ))}
// //                 </select>
// //                 {brands.length === 0 && (
// //                   <small style={{color: '#999', display: 'block', marginTop: '5px'}}>
// //                     No brands available. <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('brands'); setShowModal(false); }}>Add a brand first</a>
// //                   </small>
// //                 )}
// //               </div>

// //               {/* Category */}
// //               <div className="form-group">
// //                 <label>Category *</label>
// //                 <select
// //                   value={formData.category}
// //                   onChange={(e) => setFormData({ ...formData, category: e.target.value })}
// //                   required
// //                   className="form-input"
// //                 >
// //                   <option value="">Select Category</option>
// //                   {categoryOptions.map(cat => (
// //                     <option key={cat} value={cat}>{cat}</option>
// //                   ))}
// //                 </select>
// //               </div>

// //               {/* Product Category */}
// //               <div className="form-group">
// //                 <label>Product Category</label>
// //                 <select
// //                   value={formData.productCategory}
// //                   onChange={(e) => setFormData({ ...formData, productCategory: e.target.value })}
// //                   className="form-input"
// //                 >
// //                   <option value="">Select Product Category</option>
// //                   {productCategoryOptions.map(cat => (
// //                     <option key={cat} value={cat}>{cat}</option>
// //                   ))}
// //                 </select>
// //               </div>

// //               {/* Dress Style */}
// //               <div className="form-group">
// //                 <label>Dress Style *</label>
// //                 <select
// //                   value={formData.dressStyle}
// //                   onChange={(e) => setFormData({ ...formData, dressStyle: e.target.value })}
// //                   required
// //                   className="form-input"
// //                 >
// //                   {dressStyleOptions.map(style => (
// //                     <option key={style} value={style}>{style}</option>
// //                   ))}
// //                 </select>
// //               </div>

// //               {/* Price and Old Price */}
// //               <div className="form-row">
// //                 <div className="form-group">
// //                   <label>Price ($) *</label>
// //                   <input
// //                     type="number"
// //                     step="0.01"
// //                     value={formData.price}
// //                     onChange={(e) => setFormData({ ...formData, price: e.target.value })}
// //                     required
// //                     className="form-input"
// //                     placeholder="0.00"
// //                   />
// //                 </div>
// //                 <div className="form-group">
// //                   <label>Old Price ($)</label>
// //                   <input
// //                     type="number"
// //                     step="0.01"
// //                     value={formData.oldPrice}
// //                     onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
// //                     className="form-input"
// //                     placeholder="0.00"
// //                   />
// //                 </div>
// //               </div>

// //               {/* Description */}
// //               <div className="form-group">
// //                 <label>Description *</label>
// //                 <textarea
// //                   value={formData.description}
// //                   onChange={(e) => setFormData({ ...formData, description: e.target.value })}
// //                   required
// //                   className="form-input"
// //                   rows="3"
// //                   placeholder="Enter product description"
// //                 />
// //               </div>

// //               {/* Image URL */}
// //               <div className="form-group">
// //                 <label>Image URL *</label>
// //                 <input
// //                   type="url"
// //                   value={formData.image}
// //                   onChange={(e) => setFormData({ ...formData, image: e.target.value })}
// //                   required
// //                   className="form-input"
// //                   placeholder="https://example.com/image.jpg"
// //                 />
// //               </div>

// //               {/* Stock */}
// //               <div className="form-group">
// //                 <label>Stock Quantity</label>
// //                 <input
// //                   type="number"
// //                   value={formData.stock}
// //                   onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
// //                   className="form-input"
// //                   placeholder="100"
// //                 />
// //               </div>

// //               {/* Sizes */}
// //               <div className="form-group">
// //                 <label>Sizes <span style={{color: '#999', fontWeight: 'normal'}}>(Select multiple)</span></label>
// //                 <select
// //                   multiple
// //                   value={formData.sizes}
// //                   onChange={(e) => {
// //                     const selected = Array.from(e.target.selectedOptions, option => option.value);
// //                     setFormData({ ...formData, sizes: selected });
// //                   }}
// //                   className="form-input"
// //                   style={{height: '100px'}}
// //                 >
// //                   {sizeOptions.map(size => (
// //                     <option key={size} value={size}>{size}</option>
// //                   ))}
// //                 </select>
// //                 <small style={{color: '#999'}}>Hold Ctrl/Cmd to select multiple</small>
// //               </div>

// //               {/* Colors */}
// //               <div className="form-group">
// //                 <label>Colors <span style={{color: '#999', fontWeight: 'normal'}}>(Select multiple)</span></label>
// //                 <select
// //                   multiple
// //                   value={formData.colors}
// //                   onChange={(e) => {
// //                     const selected = Array.from(e.target.selectedOptions, option => option.value);
// //                     setFormData({ ...formData, colors: selected });
// //                   }}
// //                   className="form-input"
// //                   style={{height: '100px'}}
// //                 >
// //                   {colorOptions.map(color => (
// //                     <option key={color} value={color}>{color}</option>
// //                   ))}
// //                 </select>
// //                 <small style={{color: '#999'}}>Hold Ctrl/Cmd to select multiple</small>
// //               </div>

// //               {/* Checkboxes */}
// //               <div className="checkbox-group">
// //                 <label className="checkbox-label">
// //                   <input
// //                     type="checkbox"
// //                     checked={formData.isNewArrival}
// //                     onChange={(e) => setFormData({ ...formData, isNewArrival: e.target.checked })}
// //                   />
// //                   New Arrival
// //                 </label>
// //                 <label className="checkbox-label">
// //                   <input
// //                     type="checkbox"
// //                     checked={formData.isOnSale}
// //                     onChange={(e) => setFormData({ ...formData, isOnSale: e.target.checked })}
// //                   />
// //                   On Sale
// //                 </label>
// //               </div>

// //               <div className="modal-actions">
// //                 <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
// //                 <button type="submit" className="btn-primary" disabled={loading}>
// //                   {loading ? 'Saving...' : (editingItem ? 'Update' : 'Add')}
// //                 </button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       )}

// //       {/* Brand Modal - No ID field */}
// //       {showBrandModal && (
// //         <div className="modal-overlay" onClick={() => setShowBrandModal(false)}>
// //           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
// //             <div className="modal-header">
// //               <h2>{editingBrand ? 'Edit Brand' : 'Add New Brand'}</h2>
// //               <button className="modal-close" onClick={() => setShowBrandModal(false)}>&times;</button>
// //             </div>
// //             <form onSubmit={handleSubmitBrand}>
// //               <div className="form-group">
// //                 <label>Brand Name *</label>
// //                 <input
// //                   type="text"
// //                   value={brandFormData.name}
// //                   onChange={(e) => setBrandFormData({ ...brandFormData, name: e.target.value })}
// //                   required
// //                   className="form-input"
// //                   placeholder="Enter brand name"
// //                 />
// //               </div>

// //               <div className="form-group">
// //                 <label>Description</label>
// //                 <textarea
// //                   value={brandFormData.description}
// //                   onChange={(e) => setBrandFormData({ ...brandFormData, description: e.target.value })}
// //                   className="form-input"
// //                   rows="3"
// //                   placeholder="Enter brand description"
// //                 />
// //               </div>

// //               <div className="form-group">
// //                 <label>Logo URL</label>
// //                 <input
// //                   type="url"
// //                   value={brandFormData.logo}
// //                   onChange={(e) => setBrandFormData({ ...brandFormData, logo: e.target.value })}
// //                   className="form-input"
// //                   placeholder="https://example.com/logo.png"
// //                 />
// //               </div>

// //               <div className="form-group">
// //                 <label>Website</label>
// //                 <input
// //                   type="url"
// //                   value={brandFormData.website}
// //                   onChange={(e) => setBrandFormData({ ...brandFormData, website: e.target.value })}
// //                   className="form-input"
// //                   placeholder="https://example.com"
// //                 />
// //               </div>

// //               <div className="checkbox-group">
// //                 <label className="checkbox-label">
// //                   <input
// //                     type="checkbox"
// //                     checked={brandFormData.isActive}
// //                     onChange={(e) => setBrandFormData({ ...brandFormData, isActive: e.target.checked })}
// //                   />
// //                   Active
// //                 </label>
// //               </div>

// //               <div className="modal-actions">
// //                 <button type="button" className="btn-secondary" onClick={() => setShowBrandModal(false)}>Cancel</button>
// //                 <button type="submit" className="btn-primary" disabled={loading}>
// //                   {loading ? 'Saving...' : (editingBrand ? 'Update' : 'Add')}
// //                 </button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       )}

// //       {/* Order Details Modal */}
// //       {showOrderModal && selectedOrder && (
// //         <div className="modal-overlay" onClick={() => setShowOrderModal(false)}>
// //           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
// //             <div className="modal-header">
// //               <h2>Order Details #{selectedOrder.id}</h2>
// //               <button className="modal-close" onClick={() => setShowOrderModal(false)}>&times;</button>
// //             </div>
            
// //             <div className="info-card">
// //               <h4>Order Information</h4>
// //               <p><strong>Order ID:</strong> #{selectedOrder.id}</p>
// //               <p><strong>Order Date:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
// //               <p><strong>Last Updated:</strong> {new Date(selectedOrder.updatedAt).toLocaleString()}</p>
// //               <p><strong>Status:</strong> <span className={`status-badge ${getStatusBadgeClass(selectedOrder.status)}`}>{selectedOrder.status?.toUpperCase()}</span></p>
// //               <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod || 'N/A'}</p>
// //             </div>

// //             <div className="info-card">
// //               <h4>Customer Information</h4>
// //               <p><strong>Name:</strong> {selectedOrder.User?.name || 'Guest'}</p>
// //               <p><strong>Email:</strong> {selectedOrder.User?.email || 'N/A'}</p>
// //               <p><strong>User ID:</strong> {selectedOrder.userId || 'N/A'}</p>
// //             </div>

// //             <div className="info-card">
// //               <h4>Shipping Address</h4>
// //               <p>{selectedOrder.shippingAddress || 'No address provided'}</p>
// //             </div>

// //             <div className="info-card">
// //               <h4>Payment Summary</h4>
// //               <p><strong>Total Amount:</strong> ${selectedOrder.total_amount || selectedOrder.total}</p>
// //             </div>

// //             <div className="modal-actions">
// //               <button className="btn-secondary" onClick={() => setShowOrderModal(false)}>Close</button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       <style>{`
// //         .admin-panel {
// //           display: flex;
// //           min-height: 100vh;
// //           background: #f5f5f5;
// //         }

// //         .admin-sidebar {
// //           width: 250px;
// //           background: linear-gradient(180deg, #000 0%, #1a1a1a 100%);
// //           color: white;
// //           padding: 30px 20px;
// //           position: fixed;
// //           height: 100vh;
// //           overflow-y: auto;
// //           display: flex;
// //           flex-direction: column;
// //           z-index: 100;
// //         }

// //         .admin-logo {
// //           margin-bottom: 40px;
// //           text-align: center;
// //           padding-bottom: 20px;
// //           border-bottom: 1px solid rgba(255,255,255,0.1);
// //         }

// //         .admin-logo h2 {
// //           margin: 0;
// //           font-size: 28px;
// //           font-weight: 700;
// //           letter-spacing: -1px;
// //         }

// //         .admin-logo p {
// //           margin: 5px 0 0 0;
// //           font-size: 12px;
// //           opacity: 0.6;
// //           letter-spacing: 2px;
// //           text-transform: uppercase;
// //         }

// //         .admin-nav {
// //           display: flex;
// //           flex-direction: column;
// //           gap: 5px;
// //           flex: 1;
// //         }

// //         .admin-nav button {
// //           padding: 12px 16px;
// //           background: transparent;
// //           border: none;
// //           color: rgba(255,255,255,0.7);
// //           text-align: left;
// //           font-size: 15px;
// //           cursor: pointer;
// //           border-radius: 10px;
// //           transition: all 0.3s;
// //           display: flex;
// //           align-items: center;
// //           gap: 12px;
// //         }

// //         .admin-nav button:hover {
// //           background: rgba(255,255,255,0.08);
// //           color: white;
// //         }

// //         .admin-nav button.active {
// //           background: rgba(255,255,255,0.12);
// //           color: white;
// //           font-weight: 600;
// //           box-shadow: inset 3px 0 0 #fff;
// //         }

// //         .nav-icon {
// //           font-size: 20px;
// //           width: 28px;
// //           text-align: center;
// //         }

// //         .nav-label {
// //           font-size: 14px;
// //         }

// //         .sidebar-footer {
// //           margin-top: auto;
// //           padding-top: 20px;
// //           border-top: 1px solid rgba(255,255,255,0.1);
// //         }

// //         .btn-logout-sidebar {
// //           padding: 12px 16px;
// //           background: transparent;
// //           border: none;
// //           color: rgba(255,255,255,0.7);
// //           text-align: left;
// //           font-size: 15px;
// //           cursor: pointer;
// //           border-radius: 10px;
// //           transition: all 0.3s;
// //           display: flex;
// //           align-items: center;
// //           gap: 12px;
// //           width: 100%;
// //         }

// //         .btn-logout-sidebar:hover {
// //           background: rgba(255,255,255,0.08);
// //           color: white;
// //         }

// //         .admin-content {
// //           flex: 1;
// //           margin-left: 250px;
// //           padding: 20px 30px;
// //           min-height: 100vh;
// //         }

// //         .admin-header {
// //           background: white;
// //           padding: 20px 30px;
// //           border-radius: 16px;
// //           display: flex;
// //           justify-content: space-between;
// //           align-items: center;
// //           margin-bottom: 25px;
// //           box-shadow: 0 2px 12px rgba(0,0,0,0.06);
// //         }

// //         .admin-header h1 {
// //           margin: 0;
// //           font-size: 24px;
// //           color: #1a1a1a;
// //         }

// //         .admin-header .subtitle {
// //           margin: 4px 0 0 0;
// //           color: #888;
// //           font-size: 14px;
// //         }

// //         .header-actions {
// //           display: flex;
// //           align-items: center;
// //           gap: 15px;
// //         }

// //         .admin-badge {
// //           background: #000;
// //           color: white;
// //           padding: 6px 16px;
// //           border-radius: 20px;
// //           font-size: 12px;
// //           font-weight: 600;
// //           letter-spacing: 0.5px;
// //         }

// //         .admin-main {
// //           background: white;
// //           border-radius: 16px;
// //           padding: 30px;
// //           box-shadow: 0 2px 12px rgba(0,0,0,0.06);
// //         }

// //         .stats-grid {
// //           display: grid;
// //           grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
// //           gap: 20px;
// //           margin-bottom: 40px;
// //         }

// //         .stat-card {
// //           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
// //           color: white;
// //           padding: 25px;
// //           border-radius: 14px;
// //           display: flex;
// //           align-items: center;
// //           gap: 20px;
// //           transition: transform 0.2s;
// //         }

// //         .stat-card:hover {
// //           transform: translateY(-4px);
// //         }

// //         .stat-card:nth-child(1) { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
// //         .stat-card:nth-child(2) { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); }
// //         .stat-card:nth-child(3) { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
// //         .stat-card:nth-child(4) { background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); }

// //         .stat-icon {
// //           font-size: 40px;
// //         }

// //         .stat-info h3 {
// //           font-size: 13px;
// //           margin: 0 0 4px 0;
// //           opacity: 0.9;
// //           font-weight: 500;
// //         }

// //         .stat-number {
// //           font-size: 28px;
// //           font-weight: 700;
// //           margin: 0;
// //         }

// //         .section-header {
// //           display: flex;
// //           justify-content: space-between;
// //           align-items: center;
// //           margin-bottom: 25px;
// //           flex-wrap: wrap;
// //           gap: 10px;
// //         }

// //         .section-header h2 {
// //           margin: 0;
// //           font-size: 22px;
// //           color: #1a1a1a;
// //         }

// //         .btn-primary {
// //           background: #000;
// //           color: white;
// //           padding: 10px 24px;
// //           border: none;
// //           border-radius: 8px;
// //           cursor: pointer;
// //           font-size: 14px;
// //           font-weight: 600;
// //           transition: all 0.3s;
// //         }

// //         .btn-primary:hover {
// //           background: #333;
// //           transform: translateY(-2px);
// //           box-shadow: 0 4px 12px rgba(0,0,0,0.2);
// //         }

// //         .btn-primary:disabled {
// //           opacity: 0.6;
// //           cursor: not-allowed;
// //           transform: none;
// //         }

// //         .btn-secondary {
// //           background: #e0e0e0;
// //           color: #333;
// //           padding: 10px 24px;
// //           border: none;
// //           border-radius: 8px;
// //           cursor: pointer;
// //           font-weight: 600;
// //           transition: all 0.3s;
// //         }

// //         .btn-secondary:hover {
// //           background: #d0d0d0;
// //         }

// //         .btn-refresh {
// //           background: #4caf50;
// //           color: white;
// //           padding: 8px 18px;
// //           border: none;
// //           border-radius: 8px;
// //           cursor: pointer;
// //           font-weight: 600;
// //           transition: all 0.3s;
// //         }

// //         .btn-refresh:hover {
// //           background: #43a047;
// //         }

// //         .btn-view {
// //           background: #2196f3;
// //           color: white;
// //           padding: 5px 12px;
// //           border: none;
// //           border-radius: 6px;
// //           cursor: pointer;
// //           font-size: 13px;
// //           transition: all 0.3s;
// //         }

// //         .btn-view:hover {
// //           background: #1976d2;
// //         }

// //         .btn-view-products {
// //           background: #4caf50;
// //           color: white;
// //           padding: 4px 12px;
// //           border: none;
// //           border-radius: 6px;
// //           cursor: pointer;
// //           font-size: 12px;
// //           transition: all 0.3s;
// //           margin-top: 5px;
// //         }

// //         .btn-view-products:hover {
// //           background: #388e3c;
// //         }

// //         .filter-section {
// //           margin-bottom: 20px;
// //         }

// //         .filter-buttons {
// //           display: flex;
// //           gap: 8px;
// //           flex-wrap: wrap;
// //           margin-bottom: 20px;
// //         }

// //         .filter-btn {
// //           padding: 6px 16px;
// //           border: 1px solid #e0e0e0;
// //           background: white;
// //           border-radius: 20px;
// //           cursor: pointer;
// //           transition: all 0.2s;
// //           font-size: 13px;
// //           font-weight: 500;
// //         }

// //         .filter-btn:hover {
// //           background: #f5f5f5;
// //         }

// //         .filter-btn.active {
// //           background: #000;
// //           color: white;
// //           border-color: #000;
// //         }

// //         .data-table {
// //           width: 100%;
// //           border-collapse: collapse;
// //           font-size: 14px;
// //         }

// //         .data-table th,
// //         .data-table td {
// //           padding: 12px 15px;
// //           text-align: left;
// //           border-bottom: 1px solid #f0f0f0;
// //         }

// //         .data-table th {
// //           background: #f8f8f8;
// //           font-weight: 600;
// //           color: #555;
// //           font-size: 12px;
// //           text-transform: uppercase;
// //           letter-spacing: 0.5px;
// //         }

// //         .data-table tr:hover td {
// //           background: #fafafa;
// //         }

// //         .product-thumb {
// //           width: 45px;
// //           height: 45px;
// //           object-fit: cover;
// //           border-radius: 8px;
// //           border: 1px solid #eee;
// //         }

// //         .status-badge {
// //           padding: 4px 12px;
// //           border-radius: 20px;
// //           font-size: 12px;
// //           font-weight: 600;
// //           display: inline-block;
// //         }

// //         .status-badge.pending { background: #fff3e0; color: #e65100; }
// //         .status-badge.processing { background: #e3f2fd; color: #0d47a1; }
// //         .status-badge.shipped { background: #f3e5f5; color: #4a148c; }
// //         .status-badge.delivered { background: #e8f5e9; color: #1b5e20; }
// //         .status-badge.cancelled { background: #ffebee; color: #b71c1c; }

// //         .dress-style-badge {
// //           padding: 4px 12px;
// //           border-radius: 20px;
// //           font-size: 12px;
// //           font-weight: 600;
// //           display: inline-block;
// //         }

// //         .dress-style-badge.casual { background: #e8f5e9; color: #2e7d32; }
// //         .dress-style-badge.formal { background: #e3f2fd; color: #0d47a1; }
// //         .dress-style-badge.party { background: #fff3e0; color: #e65100; }
// //         .dress-style-badge.gym { background: #ffebee; color: #b71c1c; }

// //         .brand-tag {
// //           background: #e8f5e9;
// //           color: #2e7d32;
// //           padding: 2px 10px;
// //           border-radius: 12px;
// //           font-size: 12px;
// //           font-weight: 600;
// //         }

// //         .no-brand {
// //           color: #999;
// //           font-size: 12px;
// //           font-style: italic;
// //         }

// //         .status-select {
// //           padding: 5px 10px;
// //           border-radius: 6px;
// //           border: 1px solid #e0e0e0;
// //           background: white;
// //           font-size: 13px;
// //           cursor: pointer;
// //         }

// //         .role-select {
// //           padding: 5px 10px;
// //           border-radius: 6px;
// //           border: 1px solid #e0e0e0;
// //           background: white;
// //           font-size: 13px;
// //           cursor: pointer;
// //         }

// //         .actions {
// //           display: flex;
// //           gap: 8px;
// //           flex-wrap: wrap;
// //         }

// //         .btn-edit, .btn-delete {
// //           padding: 5px 12px;
// //           border: none;
// //           border-radius: 6px;
// //           cursor: pointer;
// //           font-size: 13px;
// //           transition: all 0.3s;
// //         }

// //         .btn-edit {
// //           background: #e3f2fd;
// //           color: #0d47a1;
// //         }

// //         .btn-edit:hover {
// //           background: #bbdefb;
// //         }

// //         .btn-delete {
// //           background: #ffebee;
// //           color: #b71c1c;
// //         }

// //         .btn-delete:hover {
// //           background: #ffcdd2;
// //         }

// //         .btn-delete:disabled {
// //           opacity: 0.5;
// //           cursor: not-allowed;
// //         }

// //         .modal-overlay {
// //           position: fixed;
// //           top: 0;
// //           left: 0;
// //           right: 0;
// //           bottom: 0;
// //           background: rgba(0,0,0,0.6);
// //           display: flex;
// //           justify-content: center;
// //           align-items: center;
// //           z-index: 1000;
// //           animation: fadeIn 0.3s;
// //         }

// //         @keyframes fadeIn {
// //           from { opacity: 0; }
// //           to { opacity: 1; }
// //         }

// //         .modal-content {
// //           background: white;
// //           padding: 30px;
// //           border-radius: 16px;
// //           width: 90%;
// //           max-width: 600px;
// //           max-height: 85vh;
// //           overflow-y: auto;
// //           animation: slideUp 0.3s;
// //         }

// //         .modal-content.large-modal {
// //           max-width: 800px;
// //         }

// //         @keyframes slideUp {
// //           from { transform: translateY(30px); opacity: 0; }
// //           to { transform: translateY(0); opacity: 1; }
// //         }

// //         .modal-header {
// //           display: flex;
// //           justify-content: space-between;
// //           align-items: center;
// //           margin-bottom: 20px;
// //           padding-bottom: 15px;
// //           border-bottom: 2px solid #f0f0f0;
// //         }

// //         .modal-header h2 {
// //           margin: 0;
// //           font-size: 22px;
// //         }

// //         .modal-close {
// //           background: none;
// //           border: none;
// //           font-size: 30px;
// //           cursor: pointer;
// //           color: #999;
// //           transition: color 0.3s;
// //         }

// //         .modal-close:hover {
// //           color: #333;
// //         }

// //         .info-card {
// //           background: #f8f8f8;
// //           padding: 16px 20px;
// //           border-radius: 12px;
// //           margin-bottom: 15px;
// //         }

// //         .info-card h4 {
// //           margin: 0 0 10px 0;
// //           color: #333;
// //           font-size: 15px;
// //         }

// //         .info-card p {
// //           margin: 6px 0;
// //           font-size: 14px;
// //           color: #555;
// //         }

// //         .info-card p strong {
// //           color: #333;
// //         }

// //         .form-group {
// //           margin-bottom: 18px;
// //         }

// //         .form-group label {
// //           display: block;
// //           margin-bottom: 6px;
// //           font-weight: 600;
// //           font-size: 14px;
// //           color: #333;
// //         }

// //         .form-input {
// //           width: 100%;
// //           padding: 10px 14px;
// //           border: 1px solid #e0e0e0;
// //           border-radius: 8px;
// //           font-size: 14px;
// //           transition: border-color 0.3s;
// //           box-sizing: border-box;
// //         }

// //         .form-input:focus {
// //           border-color: #000;
// //           outline: none;
// //         }

// //         .form-row {
// //           display: grid;
// //           grid-template-columns: 1fr 1fr;
// //           gap: 15px;
// //         }

// //         .checkbox-group {
// //           display: flex;
// //           gap: 25px;
// //           margin: 20px 0;
// //           flex-wrap: wrap;
// //         }

// //         .checkbox-label {
// //           display: flex;
// //           align-items: center;
// //           gap: 8px;
// //           cursor: pointer;
// //           font-weight: 500;
// //           font-size: 14px;
// //         }

// //         .checkbox-label input[type="checkbox"] {
// //           width: 18px;
// //           height: 18px;
// //           cursor: pointer;
// //         }

// //         .modal-actions {
// //           display: flex;
// //           justify-content: flex-end;
// //           gap: 12px;
// //           margin-top: 25px;
// //           padding-top: 20px;
// //           border-top: 1px solid #f0f0f0;
// //         }

// //         .loading {
// //           text-align: center;
// //           padding: 60px 20px;
// //           font-size: 16px;
// //           color: #888;
// //         }

// //         .no-orders {
// //           text-align: center;
// //           padding: 40px 20px;
// //           color: #999;
// //           font-size: 15px;
// //         }

// //         /* Brands Management Styles */
// //         .search-bar {
// //           display: flex;
// //           align-items: center;
// //           gap: 10px;
// //           margin-bottom: 25px;
// //           position: relative;
// //         }

// //         .search-input {
// //           flex: 1;
// //           padding: 10px 40px 10px 16px;
// //           border: 1px solid #e0e0e0;
// //           border-radius: 8px;
// //           font-size: 14px;
// //           transition: border-color 0.3s;
// //         }

// //         .search-input:focus {
// //           border-color: #000;
// //           outline: none;
// //         }

// //         .clear-search {
// //           position: absolute;
// //           right: 10px;
// //           background: none;
// //           border: none;
// //           font-size: 18px;
// //           cursor: pointer;
// //           color: #999;
// //           padding: 5px;
// //         }

// //         .clear-search:hover {
// //           color: #333;
// //         }

// //         .brands-grid {
// //           display: grid;
// //           grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
// //           gap: 20px;
// //           margin-top: 20px;
// //         }

// //         .brand-card {
// //           background: white;
// //           border: 1px solid #f0f0f0;
// //           border-radius: 12px;
// //           padding: 20px;
// //           transition: all 0.3s;
// //           display: flex;
// //           flex-direction: column;
// //           align-items: center;
// //           text-align: center;
// //         }

// //         .brand-card:hover {
// //           box-shadow: 0 4px 16px rgba(0,0,0,0.08);
// //           transform: translateY(-2px);
// //         }

// //         .brand-logo {
// //           width: 100px;
// //           height: 100px;
// //           object-fit: contain;
// //           border-radius: 8px;
// //           margin-bottom: 15px;
// //           background: #f8f8f8;
// //           padding: 10px;
// //         }

// //         .brand-placeholder {
// //           width: 100px;
// //           height: 100px;
// //           border-radius: 8px;
// //           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
// //           display: flex;
// //           align-items: center;
// //           justify-content: center;
// //           margin-bottom: 15px;
// //         }

// //         .brand-placeholder span {
// //           font-size: 48px;
// //           font-weight: 700;
// //           color: white;
// //         }

// //         .brand-info {
// //           flex: 1;
// //           width: 100%;
// //         }

// //         .brand-info h3 {
// //           margin: 0 0 8px 0;
// //           font-size: 18px;
// //           color: #1a1a1a;
// //         }

// //         .brand-description {
// //           margin: 0 0 10px 0;
// //           font-size: 14px;
// //           color: #666;
// //           line-height: 1.5;
// //         }

// //         .brand-website {
// //           display: inline-block;
// //           margin-bottom: 10px;
// //           color: #2196f3;
// //           text-decoration: none;
// //           font-size: 13px;
// //           word-break: break-all;
// //         }

// //         .brand-website:hover {
// //           text-decoration: underline;
// //         }

// //         .brand-status {
// //           display: inline-block;
// //           padding: 4px 12px;
// //           border-radius: 20px;
// //           font-size: 12px;
// //           font-weight: 600;
// //         }

// //         .brand-status.active {
// //           background: #e8f5e9;
// //           color: #2e7d32;
// //         }

// //         .brand-status.inactive {
// //           background: #ffebee;
// //           color: #b71c1c;
// //         }

// //         .brand-products-info {
// //           margin-top: 10px;
// //           display: flex;
// //           flex-direction: column;
// //           gap: 5px;
// //           align-items: center;
// //         }

// //         .product-count {
// //           font-size: 13px;
// //           color: #666;
// //         }

// //         .brand-actions {
// //           margin-top: 15px;
// //           display: flex;
// //           gap: 10px;
// //           width: 100%;
// //           justify-content: center;
// //         }

// //         .error-container {
// //           text-align: center;
// //           padding: 40px 20px;
// //         }

// //         .error-box {
// //           background: #fff3f3;
// //           border: 1px solid #ffcdd2;
// //           border-radius: 12px;
// //           padding: 30px;
// //           max-width: 400px;
// //           margin: 0 auto;
// //         }

// //         .error-icon {
// //           font-size: 48px;
// //           display: block;
// //           margin-bottom: 15px;
// //         }

// //         .error-message {
// //           color: #b71c1c;
// //           margin: 10px 0 20px 0;
// //         }

// //         .retry-button {
// //           background: #f44336;
// //           color: white;
// //           border: none;
// //           padding: 10px 24px;
// //           border-radius: 8px;
// //           cursor: pointer;
// //           font-weight: 600;
// //           transition: background 0.3s;
// //         }

// //         .retry-button:hover {
// //           background: #d32f2f;
// //         }

// //         .empty-state {
// //           text-align: center;
// //           padding: 60px 20px;
// //           color: #888;
// //         }

// //         .empty-state p {
// //           font-size: 16px;
// //           margin-bottom: 15px;
// //         }

// //         /* Categories and Settings */
// //         .placeholder-content {
// //           text-align: center;
// //           padding: 60px 20px;
// //           color: #888;
// //         }

// //         .placeholder-icon {
// //           font-size: 64px;
// //           margin-top: 20px;
// //           opacity: 0.5;
// //         }

// //         .settings-grid {
// //           display: grid;
// //           grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
// //           gap: 25px;
// //         }

// //         .settings-card {
// //           background: #f8f8f8;
// //           padding: 25px;
// //           border-radius: 12px;
// //         }

// //         .settings-card h3 {
// //           margin: 0 0 20px 0;
// //           font-size: 17px;
// //           color: #333;
// //         }

// //         .settings-item {
// //           margin-bottom: 15px;
// //         }

// //         .settings-item label {
// //           display: block;
// //           font-size: 13px;
// //           font-weight: 600;
// //           color: #666;
// //           margin-bottom: 5px;
// //         }

// //         .settings-item .form-input {
// //           background: white;
// //         }

// //         .settings-item span {
// //           display: inline-block;
// //           padding: 8px 0;
// //           font-size: 14px;
// //           color: #333;
// //         }

// //         /* Responsive */
// //         @media (max-width: 1024px) {
// //           .admin-sidebar {
// //             width: 80px;
// //             padding: 20px 10px;
// //           }
// //           .admin-logo h2 {
// //             font-size: 16px;
// //           }
// //           .admin-logo p {
// //             display: none;
// //           }
// //           .admin-nav button {
// //             padding: 10px 12px;
// //             justify-content: center;
// //           }
// //           .nav-label {
// //             display: none;
// //           }
// //           .sidebar-footer .nav-label {
// //             display: none;
// //           }
// //           .btn-logout-sidebar {
// //             justify-content: center;
// //             padding: 10px 12px;
// //           }
// //           .admin-content {
// //             margin-left: 80px;
// //             padding: 15px;
// //           }
// //           .brands-grid {
// //             grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
// //           }
// //         }

// //         @media (max-width: 768px) {
// //           .admin-sidebar {
// //             width: 60px;
// //             padding: 15px 8px;
// //           }
// //           .admin-logo h2 {
// //             font-size: 12px;
// //           }
// //           .admin-nav button {
// //             padding: 8px;
// //             font-size: 18px;
// //           }
// //           .admin-content {
// //             margin-left: 60px;
// //             padding: 10px;
// //           }
// //           .admin-header {
// //             flex-direction: column;
// //             align-items: flex-start;
// //             gap: 10px;
// //             padding: 15px;
// //           }
// //           .admin-header h1 {
// //             font-size: 18px;
// //           }
// //           .stats-grid {
// //             grid-template-columns: 1fr 1fr;
// //           }
// //           .data-table {
// //             font-size: 12px;
// //           }
// //           .data-table th,
// //           .data-table td {
// //             padding: 8px 10px;
// //           }
// //           .actions {
// //             flex-direction: column;
// //           }
// //           .product-thumb {
// //             width: 30px;
// //             height: 30px;
// //           }
// //           .filter-buttons {
// //             gap: 5px;
// //           }
// //           .filter-btn {
// //             font-size: 11px;
// //             padding: 4px 10px;
// //           }
// //           .form-row {
// //             grid-template-columns: 1fr;
// //           }
// //           .admin-main {
// //             padding: 15px;
// //           }
// //           .settings-grid {
// //             grid-template-columns: 1fr;
// //           }
// //           .modal-content {
// //             padding: 20px;
// //             width: 95%;
// //           }
// //           .modal-content.large-modal {
// //             max-width: 95%;
// //           }
// //           .brands-grid {
// //             grid-template-columns: 1fr 1fr;
// //           }
// //           .brand-card {
// //             padding: 15px;
// //           }
// //           .brand-logo {
// //             width: 70px;
// //             height: 70px;
// //           }
// //           .brand-placeholder {
// //             width: 70px;
// //             height: 70px;
// //           }
// //           .brand-placeholder span {
// //             font-size: 32px;
// //           }
// //         }

// //         @media (max-width: 480px) {
// //           .stats-grid {
// //             grid-template-columns: 1fr;
// //           }
// //           .stat-card {
// //             padding: 18px;
// //           }
// //           .stat-number {
// //             font-size: 22px;
// //           }
// //           .section-header {
// //             flex-direction: column;
// //             align-items: flex-start;
// //           }
// //           .brands-grid {
// //             grid-template-columns: 1fr;
// //           }
// //           .search-input {
// //             font-size: 13px;
// //             padding: 8px 35px 8px 12px;
// //           }
// //         }
// //       `}</style>
// //     </div>
// //   );
// // };

// // export default Admin;



// Admin.jsx - Complete Admin Panel with Brand-Product Relationship
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { GrFormView } from "react-icons/gr";
import { RiDashboardFill } from "react-icons/ri";
import { FaBoxOpen } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { TbMoneybag } from "react-icons/tb";
import { FaStore } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";



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
  const [brands, setBrands] = useState([]);
  const [brandsLoading, setBrandsLoading] = useState(false);
  const [brandsError, setBrandsError] = useState(null);
  const [brandSearchTerm, setBrandSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showBrandModal, setShowBrandModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editingBrand, setEditingBrand] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [showBrandProductsModal, setShowBrandProductsModal] = useState(false);
  const [brandProducts, setBrandProducts] = useState([]);
  const [loadingBrandProducts, setLoadingBrandProducts] = useState(false);
  const [productSortBy, setProductSortBy] = useState('newest');
  const [dashboardStats, setDashboardStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    recentOrders: []
  });
  
  // Brand form data
  const [brandFormData, setBrandFormData] = useState({
    name: '',
    description: '',
    logo: '',
    website: '',
    isActive: true
  });
  
  // Dress style options
  const dressStyleOptions = ['Casual', 'Formal', 'Party', 'Gym'];
  const categoryOptions = ['Men', 'Women', 'Accessories', 'Kids'];
  const productCategoryOptions = ['T-Shirts', 'Jeans', 'Jackets', 'Shoes', 'Dresses', 'Accessories', 'Hoodies', 'Pants'];
  const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colorOptions = ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange', 'Pink', 'Gray', 'Brown'];
  
  const [formData, setFormData] = useState({
    title: '',
    name: '',
    price: '',
    oldPrice: '',
    description: '',
    category: '',
    productCategory: '',
    brandId: '',
    dressStyle: 'Casual',
    image: '',
    stock: '',
    isNewArrival: false,
    isOnSale: false,
    sizes: [],
    colors: []
  });

  // Order filter states
  const [orderFilter, setOrderFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

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
      const token = getAuthToken();
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
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

  // Fetch brands
  useEffect(() => {
    if (activeTab === 'brands' || activeTab === 'products') {
      fetchBrands();
    }
  }, [activeTab, brandSearchTerm]);

  const fetchBrands = async () => {
    try {
      setBrandsLoading(true);
      setBrandsError(null);
      
      // ✅ Use admin endpoint to get ALL brands (including inactive)
      const url = brandSearchTerm 
        ? `${API_URL}/brands/admin/all?search=${brandSearchTerm}&limit=100`
        : `${API_URL}/brands/admin/all?limit=100`;
        
      const data = await apiRequest(url);
      
      if (data.success) {
        setBrands(data.brands || []);
      } else {
        throw new Error(data.message || "Failed to fetch brands");
      }
    } catch (error) {
      console.error("Error fetching brands:", error);
      setBrandsError(error.message);
    } finally {
      setBrandsLoading(false);
    }
  };

  // Fetch products for a specific brand
  const fetchBrandProducts = async (brandId) => {
    try {
      setLoadingBrandProducts(true);
      const data = await apiRequest(`${API_URL}/brands/${brandId}/products`);
      
      if (data.success) {
        setBrandProducts(data.products || []);
        const brand = brands.find(b => b.id === brandId);
        setSelectedBrand(brand || { id: brandId, name: 'Brand' });
        setShowBrandProductsModal(true);
      } else {
        throw new Error(data.message || 'Failed to fetch brand products');
      }
    } catch (error) {
      console.error('Error fetching brand products:', error);
      setBrandProducts([]);
      const brand = brands.find(b => b.id === brandId);
      setSelectedBrand(brand || { id: brandId, name: 'Brand' });
      setShowBrandProductsModal(true);
    } finally {
      setLoadingBrandProducts(false);
    }
  };

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
      const totalRevenue = Array.isArray(data) ? data.reduce((sum, order) => {
        if (order.status !== 'cancelled') {
          return sum + (parseFloat(order.total_amount || order.total) || 0);
        }
        return sum;
      }, 0) : 0;
      
      setDashboardStats(prev => ({
        ...prev,
        totalOrders: Array.isArray(data) ? data.length : 0,
        totalRevenue: totalRevenue,
        recentOrders: Array.isArray(data) ? data.slice(0, 5) : []
      }));
    } catch (error) {
      console.error('Error fetching orders:', error);
      alert('Failed to fetch orders');
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await apiRequest(`${API_URL}/admin/users`);
      setUsers(data);
      setDashboardStats(prev => ({
        ...prev,
        totalUsers: data.length
      }));
    } catch (error) {
      console.error('Error fetching users:', error);
      alert('Failed to fetch users');
    }
  };

  // Brand CRUD Operations
  const handleAddBrand = () => {
    setEditingBrand(null);
    setBrandFormData({
      name: '',
      description: '',
      logo: '',
      website: '',
      isActive: true
    });
    setShowBrandModal(true);
  };

  const handleEditBrand = (brand) => {
    setEditingBrand(brand);
    setBrandFormData({
      name: brand.name || '',
      description: brand.description || '',
      logo: brand.logo || '',
      website: brand.website || '',
      isActive: brand.isActive !== undefined ? brand.isActive : true
    });
    setShowBrandModal(true);
  };

  const handleDeleteBrand = async (brandId) => {
    if (window.confirm('Are you sure you want to delete this brand? This will also remove brand association from products.')) {
      try {
        await apiRequest(`${API_URL}/brands/${brandId}`, {
          method: 'DELETE'
        });
        await fetchBrands();
        alert('Brand deleted successfully!');
      } catch (error) {
        console.error('Error deleting brand:', error);
        alert(error.message || 'Failed to delete brand');
      }
    }
  };

  const handleSubmitBrand = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // ✅ NO id field - database auto-generates it
      const brandData = {
        name: brandFormData.name.trim(),
        description: brandFormData.description?.trim() || '',
        logo: brandFormData.logo?.trim() || '',
        website: brandFormData.website?.trim() || '',
        isActive: brandFormData.isActive
      };

      if (editingBrand) {
        await apiRequest(`${API_URL}/brands/${editingBrand.id}`, {
          method: 'PUT',
          body: JSON.stringify(brandData)
        });
        alert('Brand updated successfully!');
      } else {
        // ✅ Create brand - no id in request body
        await apiRequest(`${API_URL}/brands`, {
          method: 'POST',
          body: JSON.stringify(brandData)
        });
        alert('Brand added successfully!');
      }
      
      await fetchBrands();
      setShowBrandModal(false);
      setEditingBrand(null);
      setBrandFormData({
        name: '',
        description: '',
        logo: '',
        website: '',
        isActive: true
      });
    } catch (error) {
      console.error('Error saving brand:', error);
      alert(error.message || 'Failed to save brand');
    }
    setLoading(false);
  };

  // Product CRUD Operations
  const handleAddProduct = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      name: '',
      price: '',
      oldPrice: '',
      description: '',
      category: '',
      productCategory: '',
      brandId: '',
      dressStyle: 'Casual',
      image: '',
      stock: '',
      isNewArrival: false,
      isOnSale: false,
      sizes: [],
      colors: []
    });
    setShowModal(true);
  };

  const handleAddProductToBrand = (brandId) => {
    setEditingItem(null);
    setFormData({
      title: '',
      name: '',
      price: '',
      oldPrice: '',
      description: '',
      category: '',
      productCategory: '',
      brandId: brandId, // ✅ Pre-select the brand
      dressStyle: 'Casual',
      image: '',
      stock: '',
      isNewArrival: false,
      isOnSale: false,
      sizes: [],
      colors: []
    });
    setShowModal(true);
  };

  const handleEditProduct = (product) => {
    setEditingItem(product);
    setFormData({
      title: product.title || '',
      name: product.name || '',
      price: product.price || '',
      oldPrice: product.oldPrice || '',
      description: product.description || '',
      category: product.category || '',
      productCategory: product.productCategory || '',
      brandId: product.brandId || '',
      dressStyle: product.dressStyle || 'Casual',
      image: product.image || '',
      stock: product.stock || 100,
      isNewArrival: product.isNewArrival || false,
      isOnSale: product.isOnSale || false,
      sizes: product.sizes || [],
      colors: product.colors || []
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
        if (showBrandProductsModal) {
          // Refresh brand products if modal is open
          await fetchBrandProducts(selectedBrand?.id);
        }
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
      // ✅ Build product data WITHOUT id
      const productData = {
        title: formData.title.trim(),
        name: formData.name?.trim() || formData.title.trim(),
        price: parseFloat(formData.price),
        oldPrice: formData.oldPrice ? parseFloat(formData.oldPrice) : null,
        description: formData.description.trim(),
        category: formData.category,
        productCategory: formData.productCategory || null,
        brandId: formData.brandId || null, // ✅ This links product to brand
        dressStyle: formData.dressStyle,
        image: formData.image.trim(),
        stock: parseInt(formData.stock) || 100,
        isNewArrival: formData.isNewArrival || false,
        isOnSale: formData.isOnSale || false,
        sizes: formData.sizes || [],
        colors: formData.colors || []
      };

      // ✅ EXPLICITLY REMOVE id if it exists (safety measure)
      delete productData.id;

      // ✅ Remove empty/null values
      Object.keys(productData).forEach(key => {
        if (productData[key] === null || productData[key] === undefined || productData[key] === '') {
          delete productData[key];
        }
      });

      if (editingItem) {
        // For update, keep the ID separate from product data
        await dispatch(updateProduct({ 
          id: editingItem.id, 
          productData 
        })).unwrap();
        alert('✅ Product updated successfully!');
      } else {
        // ✅ Create new product - NO ID is sent to backend
        await dispatch(createProduct(productData)).unwrap();
        alert('✅ Product added successfully!');
      }
      
      await fetchDashboardStats();
      await fetchBrands(); // Refresh brands to update product counts
      
      // If brand products modal is open, refresh it
      if (showBrandProductsModal && selectedBrand) {
        await fetchBrandProducts(selectedBrand.id);
      }
      
      setShowModal(false);
      setEditingItem(null);
      resetForm();
      
    } catch (error) {
      console.error('Error saving product:', error);
      alert(`❌ Failed to save product: ${error.message || 'Unknown error'}`);
    }
    setLoading(false);
  };

  // Reset form helper
  const resetForm = () => {
    setFormData({
      title: '',
      name: '',
      price: '',
      oldPrice: '',
      description: '',
      category: '',
      productCategory: '',
      brandId: '',
      dressStyle: 'Casual',
      image: '',
      stock: '',
      isNewArrival: false,
      isOnSale: false,
      sizes: [],
      colors: []
    });
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

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
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

  // Helper functions
  const getStatusBadgeClass = (status) => {
    switch(status?.toLowerCase()) {
      case 'pending': return 'pending';
      case 'processing': return 'processing';
      case 'shipped': return 'shipped';
      case 'delivered': return 'delivered';
      case 'cancelled': return 'cancelled';
      default: return '';
    }
  };

  const getDressStyleBadgeClass = (dressStyle) => {
    switch(dressStyle?.toLowerCase()) {
      case 'casual': return 'casual';
      case 'formal': return 'formal';
      case 'party': return 'party';
      case 'gym': return 'gym';
      default: return '';
    }
  };

  // Sort products
  const getSortedProducts = () => {
    const sorted = [...products];
    switch (productSortBy) {
      case 'price_low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price_high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'name_asc':
        return sorted.sort((a, b) => a.title?.localeCompare(b.title));
      case 'name_desc':
        return sorted.sort((a, b) => b.title?.localeCompare(a.title));
      case 'newest':
      default:
        return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
  };

  const filteredOrders = orderFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status?.toLowerCase() === orderFilter);

  const getStatusCount = (status) => {
    if (status === 'all') return orders.length;
    return orders.filter(o => o.status?.toLowerCase() === status).length;
  };

  // Dashboard Component
  const Dashboard = () => (
    <div className="dashboard">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon"><FaBoxOpen /></div>
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
          <div className="stat-icon"><FaUsers /></div>
          <div className="stat-info">
            <h3>Total Users</h3>
            <p className="stat-number">{dashboardStats.totalUsers}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><TbMoneybag />
</div>
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
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {(dashboardStats.recentOrders || []).slice(0, 5).map(order => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.User?.name || 'Guest'}</td>
                <td>${order.total_amount || order.total}</td>
                <td><span className={`status-badge ${getStatusBadgeClass(order.status)}`}>{order.status}</span></td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Products Management Component with Brand
  const ProductsManagement = () => {
    const sortedProducts = getSortedProducts();
    
    return (
      <div className="products-management">
        <div className="section-header">
          <h2>Products Management</h2>
          <div className="section-controls">
            <select 
              value={productSortBy} 
              onChange={(e) => setProductSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="newest">Newest First</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="name_asc">Name: A to Z</option>
              <option value="name_desc">Name: Z to A</option>
            </select>
            <button className="btn-primary" onClick={handleAddProduct}>+ Add New Product</button>
          </div>
        </div>
        
        {(productsLoading || loading) ? (
          <div className="loading">Loading...</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Product Category</th>
                <th>Dress Style</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedProducts.map(product => {
                const brand = brands.find(b => b.id === product.brandId);
                return (
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
                    <td>{product.title?.substring(0, 50)}...</td>
                    <td>
                      {brand ? (
                        <span className="brand-tag">{brand.name}</span>
                      ) : (
                        <span className="no-brand">No Brand</span>
                      )}
                    </td>
                    <td>{product.category}</td>
                    <td>{product.productCategory || '-'}</td>
                    <td>
                      <span className={`dress-style-badge ${getDressStyleBadgeClass(product.dressStyle)}`}>
                        {product.dressStyle || 'Casual'}
                      </span>
                    </td>
                    <td>${product.price}</td>
                    <td>{product.stock || 100}</td>
                    <td className="actions">
                      <button className="btn-edit" onClick={() => handleEditProduct(product)}><MdEdit /> Edit</button>
                      <button className="btn-delete" onClick={() => handleDeleteProduct(product.id)}><MdDelete /> Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    );
  };

  // Orders Management Component
  const OrdersManagement = () => (
    <div className="orders-management">
      <div className="section-header">
        <h2>Orders Management</h2>
        <button className="btn-refresh" onClick={fetchOrders}>🔄 Refresh</button>
      </div>

      <div className="filter-section">
        <div className="filter-buttons">
          <button className={`filter-btn ${orderFilter === 'all' ? 'active' : ''}`} onClick={() => setOrderFilter('all')}>
            All ({getStatusCount('all')})
          </button>
          <button className={`filter-btn ${orderFilter === 'pending' ? 'active' : ''}`} onClick={() => setOrderFilter('pending')}>
            Pending ({getStatusCount('pending')})
          </button>
          <button className={`filter-btn ${orderFilter === 'processing' ? 'active' : ''}`} onClick={() => setOrderFilter('processing')}>
            Processing ({getStatusCount('processing')})
          </button>
          <button className={`filter-btn ${orderFilter === 'shipped' ? 'active' : ''}`} onClick={() => setOrderFilter('shipped')}>
            Shipped ({getStatusCount('shipped')})
          </button>
          <button className={`filter-btn ${orderFilter === 'delivered' ? 'active' : ''}`} onClick={() => setOrderFilter('delivered')}>
            Delivered ({getStatusCount('delivered')})
          </button>
          <button className={`filter-btn ${orderFilter === 'cancelled' ? 'active' : ''}`} onClick={() => setOrderFilter('cancelled')}>
            Cancelled ({getStatusCount('cancelled')})
          </button>
        </div>
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
          {filteredOrders.map(order => (
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
                <button className="btn-view" onClick={() => { setSelectedOrder(order); setShowOrderModal(true); }}>
                  <GrFormView />
 View
                </button>
                <button className="btn-delete" onClick={() => handleDeleteOrder(order.id)}><MdDelete /> Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {filteredOrders.length === 0 && (
        <div className="no-orders">No orders found</div>
      )}
    </div>
  );

  // Users Management Component
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
                  <MdDelete /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Brands Management Component with Products Display
  const BrandsManagement = () => (
    <div className="brands-management">
      <div className="section-header">
        <h2>Brands Management</h2>
        <button className="btn-primary" onClick={handleAddBrand}>
          + Add New Brand
        </button>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search brands..."
          value={brandSearchTerm}
          onChange={(e) => setBrandSearchTerm(e.target.value)}
          className="search-input"
        />
        {brandSearchTerm && (
          <button 
            className="clear-search"
            onClick={() => setBrandSearchTerm("")}
          >
            ✕
          </button>
        )}
      </div>

      {brandsLoading ? (
        <div className="loading">Loading brands...</div>
      ) : brandsError ? (
        <div className="error-container">
          <div className="error-box">
            <span className="error-icon">⚠️</span>
            <h3>Something went wrong</h3>
            <p className="error-message">{brandsError}</p>
            <button onClick={fetchBrands} className="retry-button">
              Retry
            </button>
          </div>
        </div>
      ) : brands.length === 0 ? (
        <div className="empty-state">
          <p>No brands found {brandSearchTerm && `for "${brandSearchTerm}"`}</p>
          {brandSearchTerm && (
            <button onClick={() => setBrandSearchTerm("")} className="btn-secondary">
              Clear Search
            </button>
          )}
        </div>
      ) : (
        <div className="brands-grid">
          {brands.map((brand) => (
            <div key={brand.id} className="brand-card">
              {brand.logo ? (
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="brand-logo"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/placeholder-brand.png";
                  }}
                />
              ) : (
                <div className="brand-placeholder">
                  <span>{brand.name.charAt(0).toUpperCase()}</span>
                </div>
              )}
              <div className="brand-info">
                <h3>{brand.name}</h3>
                {brand.description && (
                  <p className="brand-description">
                    {brand.description.length > 100 
                      ? `${brand.description.substring(0, 100)}...` 
                      : brand.description}
                  </p>
                )}
                <span className={`brand-status ${brand.isActive !== false ? 'active' : 'inactive'}`}>
                  {brand.isActive !== false ? 'Active' : 'Inactive'}
                </span>
                
                {/* ✅ Display products under this brand */}
                <div className="brand-products-info">
                  <span className="product-count">
                    📦 {brand.productCount || 0} products
                  </span>
                  <div className="brand-product-actions">
                    <button 
                      className="btn-view-products"
                      onClick={() => fetchBrandProducts(brand.id)}
                    >
                      View Products
                    </button>
                    <button 
                      className="btn-add-product"
                      onClick={() => {
                        setActiveTab('products');
                        handleAddProductToBrand(brand.id);
                      }}
                    >
                      + Add Product
                    </button>
                  </div>
                </div>
              </div>
              <div className="brand-actions">
                <button className="btn-edit" onClick={() => handleEditBrand(brand)}><MdEdit /> Edit</button>
                <button className="btn-delete" onClick={() => handleDeleteBrand(brand.id)}><MdDelete /> Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Categories Management Component
  const CategoriesManagement = () => (
    <div className="categories-management">
      <div className="section-header">
        <h2>Categories Management</h2>
        <button className="btn-primary" onClick={() => alert('Add Category functionality coming soon!')}>
          + Add New Category
        </button>
      </div>
      <div className="placeholder-content">
        <p>Category management features will be available here.</p>
        <div className="placeholder-icon">📂</div>
      </div>
    </div>
  );

  // Settings Component
  const Settings = () => (
    <div className="settings">
      <div className="section-header">
        <h2>Settings</h2>
      </div>
      <div className="settings-grid">
        <div className="settings-card">
          <h3>General Settings</h3>
          <div className="settings-item">
            <label>Store Name</label>
            <input type="text" value="SHOP.CO" className="form-input" disabled />
          </div>
          <div className="settings-item">
            <label>Store Email</label>
            <input type="email" value="admin@shop.co" className="form-input" disabled />
          </div>
        </div>
        <div className="settings-card">
          <h3>Appearance</h3>
          <div className="settings-item">
            <label>Theme</label>
            <select className="form-input" disabled>
              <option>Light</option>
              <option>Dark</option>
            </select>
          </div>
        </div>
        <div className="settings-card">
          <h3>System Info</h3>
          <div className="settings-item">
            <label>Version</label>
            <span>1.0.0</span>
          </div>
          <div className="settings-item">
            <label>Environment</label>
            <span>{import.meta.env.VITE_ENV || 'Development'}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="admin-panel">
      <div className="admin-sidebar">
        <div className="admin-logo">
          <h2>SHOP.CO</h2>
          <p>Admin Panel</p>
        </div>
        <nav className="admin-nav">
          <button 
            className={activeTab === 'dashboard' ? 'active' : ''} 
            onClick={() => setActiveTab('dashboard')}
          >
            <span className="nav-icon"><RiDashboardFill /></span>
            <span className="nav-label">Dashboard</span>
          </button>
          <button 
            className={activeTab === 'products' ? 'active' : ''} 
            onClick={() => setActiveTab('products')}
          >
            <span className="nav-icon">📦</span>
            <span className="nav-label">Products</span>
          </button>
          <button 
            className={activeTab === 'orders' ? 'active' : ''} 
            onClick={() => setActiveTab('orders')}
          >
            <span className="nav-icon">🛒</span>
            <span className="nav-label">Orders</span>
          </button>
          <button 
            className={activeTab === 'users' ? 'active' : ''} 
            onClick={() => setActiveTab('users')}
          >
            <span className="nav-icon">👥</span>
            <span className="nav-label">Users</span>
          </button>
          <button 
            className={activeTab === 'brands' ? 'active' : ''} 
            onClick={() => setActiveTab('brands')}
          >
            <span className="nav-icon">🏷️</span>
            <span className="nav-label">Brands</span>
          </button>
          <button 
            className={activeTab === 'categories' ? 'active' : ''} 
            onClick={() => setActiveTab('categories')}
          >
            <span className="nav-icon">📂</span>
            <span className="nav-label">Categories</span>
          </button>
          <button 
            className={activeTab === 'settings' ? 'active' : ''} 
            onClick={() => setActiveTab('settings')}
          >
            <span className="nav-icon">⚙️</span>
            <span className="nav-label">Settings</span>
          </button>
        </nav>
        <div className="sidebar-footer">
          <button className="btn-logout-sidebar" onClick={() => navigate('/')}>
            <span className="nav-icon"><FaStore />
</span>
            <span className="nav-label">View Store</span>
          </button>
        </div>
      </div>

      <div className="admin-content">
        <div className="admin-header">
          <div>
            <h1>Welcome back, {user?.name || 'Admin'}!</h1>
            <p className="subtitle">Manage your store efficiently</p>
          </div>
          <div className="header-actions">
            <span className="admin-badge"><RiAdminFill /> 
 Admin</span>
          </div>
        </div>

        <div className="admin-main">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'products' && <ProductsManagement />}
          {activeTab === 'orders' && <OrdersManagement />}
          {activeTab === 'users' && <UsersManagement />}
          {activeTab === 'brands' && <BrandsManagement />}
          {activeTab === 'categories' && <CategoriesManagement />}
          {activeTab === 'settings' && <Settings />}
        </div>
      </div>

      {/* Product Modal with Brand Selection */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingItem ? 'Edit Product' : 'Add New Product'}</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>&times;</button>
            </div>
            <form onSubmit={handleSubmitProduct}>
              {/* Product Name */}
              <div className="form-group">
                <label>Product Name *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="form-input"
                  placeholder="Enter product name"
                />
              </div>

              {/* Brand Selection - Required for adding to brand */}
              <div className="form-group">
                <label>Brand</label>
                <select
                  value={formData.brandId}
                  onChange={(e) => setFormData({ ...formData, brandId: e.target.value })}
                  className="form-input"
                  required
                >
                  <option value="">Select a Brand</option>
                  {brands.filter(b => b.isActive !== false).map(brand => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
                {brands.length === 0 && (
                  <small style={{color: '#999', display: 'block', marginTop: '5px'}}>
                    No brands available. Please <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('brands'); setShowModal(false); }}>add a brand first</a>
                  </small>
                )}
                <small style={{color: '#666', display: 'block', marginTop: '5px'}}>
                  ⚠️ Select a brand to associate this product with
                </small>
              </div>

              {/* Category */}
              <div className="form-group">
                <label>Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                  className="form-input"
                >
                  <option value="">Select Category</option>
                  {categoryOptions.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Product Category */}
              <div className="form-group">
                <label>Product Category</label>
                <select
                  value={formData.productCategory}
                  onChange={(e) => setFormData({ ...formData, productCategory: e.target.value })}
                  className="form-input"
                >
                  <option value="">Select Product Category</option>
                  {productCategoryOptions.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Dress Style */}
              <div className="form-group">
                <label>Dress Style *</label>
                <select
                  value={formData.dressStyle}
                  onChange={(e) => setFormData({ ...formData, dressStyle: e.target.value })}
                  required
                  className="form-input"
                >
                  {dressStyleOptions.map(style => (
                    <option key={style} value={style}>{style}</option>
                  ))}
                </select>
              </div>

              {/* Price and Old Price */}
              <div className="form-row">
                <div className="form-group">
                  <label>Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                    className="form-input"
                    placeholder="0.00"
                  />
                </div>
                <div className="form-group">
                  <label>Old Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.oldPrice}
                    onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
                    className="form-input"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="form-group">
                <label>Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  className="form-input"
                  rows="3"
                  placeholder="Enter product description"
                />
              </div>

              {/* Image URL */}
              <div className="form-group">
                <label>Image URL *</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  required
                  className="form-input"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              {/* Stock */}
              <div className="form-group">
                <label>Stock Quantity</label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="form-input"
                  placeholder="100"
                />
              </div>

              {/* Sizes */}
              <div className="form-group">
                <label>Sizes <span style={{color: '#999', fontWeight: 'normal'}}>(Select multiple)</span></label>
                <select
                  multiple
                  value={formData.sizes}
                  onChange={(e) => {
                    const selected = Array.from(e.target.selectedOptions, option => option.value);
                    setFormData({ ...formData, sizes: selected });
                  }}
                  className="form-input"
                  style={{height: '100px'}}
                >
                  {sizeOptions.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
                <small style={{color: '#999'}}>Hold Ctrl/Cmd to select multiple</small>
              </div>

              {/* Colors */}
              <div className="form-group">
                <label>Colors <span style={{color: '#999', fontWeight: 'normal'}}>(Select multiple)</span></label>
                <select
                  multiple
                  value={formData.colors}
                  onChange={(e) => {
                    const selected = Array.from(e.target.selectedOptions, option => option.value);
                    setFormData({ ...formData, colors: selected });
                  }}
                  className="form-input"
                  style={{height: '100px'}}
                >
                  {colorOptions.map(color => (
                    <option key={color} value={color}>{color}</option>
                  ))}
                </select>
                <small style={{color: '#999'}}>Hold Ctrl/Cmd to select multiple</small>
              </div>

              {/* Checkboxes */}
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.isNewArrival}
                    onChange={(e) => setFormData({ ...formData, isNewArrival: e.target.checked })}
                  />
                  New Arrival
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.isOnSale}
                    onChange={(e) => setFormData({ ...formData, isOnSale: e.target.checked })}
                  />
                  On Sale
                </label>
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

      {/* Brand Modal - No ID field */}
      {showBrandModal && (
        <div className="modal-overlay" onClick={() => setShowBrandModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingBrand ? 'Edit Brand' : 'Add New Brand'}</h2>
              <button className="modal-close" onClick={() => setShowBrandModal(false)}>&times;</button>
            </div>
            <form onSubmit={handleSubmitBrand}>
              <div className="form-group">
                <label>Brand Name *</label>
                <input
                  type="text"
                  value={brandFormData.name}
                  onChange={(e) => setBrandFormData({ ...brandFormData, name: e.target.value })}
                  required
                  className="form-input"
                  placeholder="Enter brand name"
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={brandFormData.description}
                  onChange={(e) => setBrandFormData({ ...brandFormData, description: e.target.value })}
                  className="form-input"
                  rows="3"
                  placeholder="Enter brand description"
                />
              </div>

              <div className="form-group">
                <label>Logo URL</label>
                <input
                  type="url"
                  value={brandFormData.logo}
                  onChange={(e) => setBrandFormData({ ...brandFormData, logo: e.target.value })}
                  className="form-input"
                  placeholder="https://example.com/logo.png"
                />
              </div>

              <div className="form-group">
                <label>Website</label>
                <input
                  type="url"
                  value={brandFormData.website}
                  onChange={(e) => setBrandFormData({ ...brandFormData, website: e.target.value })}
                  className="form-input"
                  placeholder="https://example.com"
                />
              </div>

              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={brandFormData.isActive}
                    onChange={(e) => setBrandFormData({ ...brandFormData, isActive: e.target.checked })}
                  />
                  Active
                </label>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowBrandModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? 'Saving...' : (editingBrand ? 'Update' : 'Add')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Brand Products Modal */}
      {showBrandProductsModal && selectedBrand && (
        <div className="modal-overlay" onClick={() => setShowBrandProductsModal(false)}>
          <div className="modal-content large-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Products for {selectedBrand.name}</h2>
              <button className="modal-close" onClick={() => setShowBrandProductsModal(false)}>&times;</button>
            </div>
            
            {loadingBrandProducts ? (
              <div className="loading">Loading products...</div>
            ) : brandProducts.length > 0 ? (
              <>
                <div className="brand-products-header">
                  <span>Total: {brandProducts.length} products</span>
                  <button 
                    className="btn-primary"
                    onClick={() => {
                      setShowBrandProductsModal(false);
                      handleAddProductToBrand(selectedBrand.id);
                    }}
                  >
                    + Add Product to {selectedBrand.name}
                  </button>
                </div>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Category</th>
                      <th>Stock</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {brandProducts.map(product => (
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
                        <td>{product.title}</td>
                        <td>${product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.stock}</td>
                        <td className="actions">
                          <button 
                            className="btn-edit" 
                            onClick={() => {
                              setShowBrandProductsModal(false);
                              handleEditProduct(product);
                            }}
                          >
                            ✏️ Edit
                          </button>
                          <button 
                            className="btn-delete" 
                            onClick={() => {
                              if (window.confirm(`Delete "${product.title}"?`)) {
                                handleDeleteProduct(product.id);
                              }
                            }}
                          >
                            🗑️ Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <div className="empty-state">
                <p>No products found for {selectedBrand.name}</p>
                <button 
                  className="btn-primary"
                  onClick={() => {
                    setShowBrandProductsModal(false);
                    handleAddProductToBrand(selectedBrand.id);
                  }}
                >
                  + Add First Product to {selectedBrand.name}
                </button>
              </div>
            )}
            
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowBrandProductsModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {showOrderModal && selectedOrder && (
        <div className="modal-overlay" onClick={() => setShowOrderModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Order Details #{selectedOrder.id}</h2>
              <button className="modal-close" onClick={() => setShowOrderModal(false)}>&times;</button>
            </div>
            
            <div className="info-card">
              <h4>Order Information</h4>
              <p><strong>Order ID:</strong> #{selectedOrder.id}</p>
              <p><strong>Order Date:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
              <p><strong>Last Updated:</strong> {new Date(selectedOrder.updatedAt).toLocaleString()}</p>
              <p><strong>Status:</strong> <span className={`status-badge ${getStatusBadgeClass(selectedOrder.status)}`}>{selectedOrder.status?.toUpperCase()}</span></p>
              <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod || 'N/A'}</p>
            </div>

            <div className="info-card">
              <h4>Customer Information</h4>
              <p><strong>Name:</strong> {selectedOrder.User?.name || 'Guest'}</p>
              <p><strong>Email:</strong> {selectedOrder.User?.email || 'N/A'}</p>
              <p><strong>User ID:</strong> {selectedOrder.userId || 'N/A'}</p>
            </div>

            <div className="info-card">
              <h4>Shipping Address</h4>
              <p>{selectedOrder.shippingAddress || 'No address provided'}</p>
            </div>

            <div className="info-card">
              <h4>Payment Summary</h4>
              <p><strong>Total Amount:</strong> ${selectedOrder.total_amount || selectedOrder.total}</p>
            </div>

            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowOrderModal(false)}>Close</button>
            </div>
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
          width: 250px;
          background: linear-gradient(180deg, #000 0%, #1a1a1a 100%);
          color: white;
          padding: 30px 20px;
          position: fixed;
          height: 100vh;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          z-index: 100;
        }

        .admin-logo {
          margin-bottom: 40px;
          text-align: center;
          padding-bottom: 20px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .admin-logo h2 {
          margin: 0;
          font-size: 28px;
          font-weight: 700;
          letter-spacing: -1px;
        }

        .admin-logo p {
          margin: 5px 0 0 0;
          font-size: 12px;
          opacity: 0.6;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .admin-nav {
          display: flex;
          flex-direction: column;
          gap: 5px;
          flex: 1;
        }

        .admin-nav button {
          padding: 12px 16px;
          background: transparent;
          border: none;
          color: rgba(255,255,255,0.7);
          text-align: left;
          font-size: 15px;
          cursor: pointer;
          border-radius: 10px;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .admin-nav button:hover {
          background: rgba(255,255,255,0.08);
          color: white;
        }

        .admin-nav button.active {
          background: rgba(255,255,255,0.12);
          color: white;
          font-weight: 600;
          box-shadow: inset 3px 0 0 #fff;
        }

        .nav-icon {
          font-size: 20px;
          width: 28px;
          text-align: center;
        }

        .nav-label {
          font-size: 14px;
        }

        .sidebar-footer {
          margin-top: auto;
          padding-top: 20px;
          border-top: 1px solid rgba(255,255,255,0.1);
        }

        .btn-logout-sidebar {
          padding: 12px 16px;
          background: transparent;
          border: none;
          color: rgba(255,255,255,0.7);
          text-align: left;
          font-size: 15px;
          cursor: pointer;
          border-radius: 10px;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
        }

        .btn-logout-sidebar:hover {
          background: rgba(255,255,255,0.08);
          color: white;
        }

        .admin-content {
          flex: 1;
          margin-left: 250px;
          padding: 20px 30px;
          min-height: 100vh;
        }

        .admin-header {
          background: white;
          padding: 20px 30px;
          border-radius: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
        }

        .admin-header h1 {
          margin: 0;
          font-size: 24px;
          color: #1a1a1a;
        }

        .admin-header .subtitle {
          margin: 4px 0 0 0;
          color: #888;
          font-size: 14px;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .admin-badge {
          background: #000;
          color: white;
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        .admin-main {
          background: white;
          border-radius: 16px;
          padding: 30px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .stat-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 25px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          gap: 20px;
          transition: transform 0.2s;
        }

        .stat-card:hover {
          transform: translateY(-4px);
        }

        .stat-card:nth-child(1) { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        .stat-card:nth-child(2) { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); }
        .stat-card:nth-child(3) { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
        .stat-card:nth-child(4) { background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); }

        .stat-icon {
          font-size: 40px;
        }

        .stat-info h3 {
          font-size: 13px;
          margin: 0 0 4px 0;
          opacity: 0.9;
          font-weight: 500;
        }

        .stat-number {
          font-size: 28px;
          font-weight: 700;
          margin: 0;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
          flex-wrap: wrap;
          gap: 10px;
        }

        .section-header h2 {
          margin: 0;
          font-size: 22px;
          color: #1a1a1a;
        }

        .section-controls {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .sort-select {
          padding: 8px 16px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          font-size: 14px;
          background: white;
          cursor: pointer;
          transition: border-color 0.3s;
        }

        .sort-select:focus {
          border-color: #000;
          outline: none;
        }

        .btn-primary {
          background: #000;
          color: white;
          padding: 10px 24px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          transition: all 0.3s;
        }

        .btn-primary:hover {
          background: #333;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .btn-secondary {
          background: #e0e0e0;
          color: #333;
          padding: 10px 24px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s;
        }

        .btn-secondary:hover {
          background: #d0d0d0;
        }

        .btn-refresh {
          background: #4caf50;
          color: white;
          padding: 8px 18px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s;
        }

        .btn-refresh:hover {
          background: #43a047;
        }

        .btn-view {
          background: #2196f3;
          color: white;
          padding: 5px 12px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 13px;
          transition: all 0.3s;
        }

        .btn-view:hover {
          background: #1976d2;
        }

        .btn-view-products {
          background: #4caf50;
          color: white;
          padding: 6px 14px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 600;
          transition: all 0.3s;
        }

        .btn-view-products:hover {
          background: #388e3c;
        }

        .btn-add-product {
          background: #ff9800;
          color: white;
          padding: 6px 14px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 600;
          transition: all 0.3s;
        }

        .btn-add-product:hover {
          background: #f57c00;
        }

        .filter-section {
          margin-bottom: 20px;
        }

        .filter-buttons {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }

        .filter-btn {
          padding: 6px 16px;
          border: 1px solid #e0e0e0;
          background: white;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 13px;
          font-weight: 500;
        }

        .filter-btn:hover {
          background: #f5f5f5;
        }

        .filter-btn.active {
          background: #000;
          color: white;
          border-color: #000;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }

        .data-table th,
        .data-table td {
          padding: 12px 15px;
          text-align: left;
          border-bottom: 1px solid #f0f0f0;
        }

        .data-table th {
          background: #f8f8f8;
          font-weight: 600;
          color: #555;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .data-table tr:hover td {
          background: #fafafa;
        }

        .product-thumb {
          width: 45px;
          height: 45px;
          object-fit: cover;
          border-radius: 8px;
          border: 1px solid #eee;
        }

        .status-badge {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          display: inline-block;
        }

        .status-badge.pending { background: #fff3e0; color: #e65100; }
        .status-badge.processing { background: #e3f2fd; color: #0d47a1; }
        .status-badge.shipped { background: #f3e5f5; color: #4a148c; }
        .status-badge.delivered { background: #e8f5e9; color: #1b5e20; }
        .status-badge.cancelled { background: #ffebee; color: #b71c1c; }

        .dress-style-badge {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          display: inline-block;
        }

        .dress-style-badge.casual { background: #e8f5e9; color: #2e7d32; }
        .dress-style-badge.formal { background: #e3f2fd; color: #0d47a1; }
        .dress-style-badge.party { background: #fff3e0; color: #e65100; }
        .dress-style-badge.gym { background: #ffebee; color: #b71c1c; }

        .brand-tag {
          background: #e8f5e9;
          color: #2e7d32;
          padding: 2px 10px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
        }

        .no-brand {
          color: #999;
          font-size: 12px;
          font-style: italic;
        }

        .status-select {
          padding: 5px 10px;
          border-radius: 6px;
          border: 1px solid #e0e0e0;
          background: white;
          font-size: 13px;
          cursor: pointer;
        }

        .role-select {
          padding: 5px 10px;
          border-radius: 6px;
          border: 1px solid #e0e0e0;
          background: white;
          font-size: 13px;
          cursor: pointer;
        }

        .actions {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .btn-edit, .btn-delete {
          padding: 5px 12px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 13px;
          transition: all 0.3s;
        }

        .btn-edit {
          background: #e3f2fd;
          color: #0d47a1;
        }

        .btn-edit:hover {
          background: #bbdefb;
        }

        .btn-delete {
          background: #ffebee;
          color: #b71c1c;
        }

        .btn-delete:hover {
          background: #ffcdd2;
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
          background: rgba(0,0,0,0.6);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          animation: fadeIn 0.3s;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-content {
          background: white;
          padding: 30px;
          border-radius: 16px;
          width: 90%;
          max-width: 600px;
          max-height: 85vh;
          overflow-y: auto;
          animation: slideUp 0.3s;
        }

        .modal-content.large-modal {
          max-width: 900px;
        }

        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 2px solid #f0f0f0;
        }

        .modal-header h2 {
          margin: 0;
          font-size: 22px;
        }

        .modal-close {
          background: none;
          border: none;
          font-size: 30px;
          cursor: pointer;
          color: #999;
          transition: color 0.3s;
        }

        .modal-close:hover {
          color: #333;
        }

        .info-card {
          background: #f8f8f8;
          padding: 16px 20px;
          border-radius: 12px;
          margin-bottom: 15px;
        }

        .info-card h4 {
          margin: 0 0 10px 0;
          color: #333;
          font-size: 15px;
        }

        .info-card p {
          margin: 6px 0;
          font-size: 14px;
          color: #555;
        }

        .info-card p strong {
          color: #333;
        }

        .form-group {
          margin-bottom: 18px;
        }

        .form-group label {
          display: block;
          margin-bottom: 6px;
          font-weight: 600;
          font-size: 14px;
          color: #333;
        }

        .form-input {
          width: 100%;
          padding: 10px 14px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          font-size: 14px;
          transition: border-color 0.3s;
          box-sizing: border-box;
        }

        .form-input:focus {
          border-color: #000;
          outline: none;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }

        .checkbox-group {
          display: flex;
          gap: 25px;
          margin: 20px 0;
          flex-wrap: wrap;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-weight: 500;
          font-size: 14px;
        }

        .checkbox-label input[type="checkbox"] {
          width: 18px;
          height: 18px;
          cursor: pointer;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 25px;
          padding-top: 20px;
          border-top: 1px solid #f0f0f0;
        }

        .loading {
          text-align: center;
          padding: 60px 20px;
          font-size: 16px;
          color: #888;
        }

        .no-orders {
          text-align: center;
          padding: 40px 20px;
          color: #999;
          font-size: 15px;
        }

        /* Brands Management Styles */
        .search-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 25px;
          position: relative;
        }

        .search-input {
          flex: 1;
          padding: 10px 40px 10px 16px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          font-size: 14px;
          transition: border-color 0.3s;
        }

        .search-input:focus {
          border-color: #000;
          outline: none;
        }

        .clear-search {
          position: absolute;
          right: 10px;
          background: none;
          border: none;
          font-size: 18px;
          cursor: pointer;
          color: #999;
          padding: 5px;
        }

        .clear-search:hover {
          color: #333;
        }

        .brands-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }

        .brand-card {
          background: white;
          border: 1px solid #f0f0f0;
          border-radius: 12px;
          padding: 20px;
          transition: all 0.3s;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .brand-card:hover {
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
          transform: translateY(-2px);
        }

        .brand-logo {
          width: 100px;
          height: 100px;
          object-fit: contain;
          border-radius: 8px;
          margin-bottom: 15px;
          background: #f8f8f8;
          padding: 10px;
        }

        .brand-placeholder {
          width: 100px;
          height: 100px;
          border-radius: 8px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 15px;
        }

        .brand-placeholder span {
          font-size: 48px;
          font-weight: 700;
          color: white;
        }

        .brand-info {
          flex: 1;
          width: 100%;
        }

        .brand-info h3 {
          margin: 0 0 8px 0;
          font-size: 18px;
          color: #1a1a1a;
        }

        .brand-description {
          margin: 0 0 10px 0;
          font-size: 14px;
          color: #666;
          line-height: 1.5;
        }

        .brand-status {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }

        .brand-status.active {
          background: #e8f5e9;
          color: #2e7d32;
        }

        .brand-status.inactive {
          background: #ffebee;
          color: #b71c1c;
        }

        .brand-products-info {
          margin-top: 10px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          align-items: center;
          width: 100%;
        }

        .product-count {
          font-size: 13px;
          color: #666;
          font-weight: 500;
        }

        .brand-product-actions {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          justify-content: center;
          width: 100%;
        }

        .brand-products-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding: 10px 0;
          border-bottom: 1px solid #f0f0f0;
        }

        .brand-products-header span {
          font-size: 14px;
          color: #666;
          font-weight: 500;
        }

        .brand-actions {
          margin-top: 15px;
          display: flex;
          gap: 10px;
          width: 100%;
          justify-content: center;
        }

        .error-container {
          text-align: center;
          padding: 40px 20px;
        }

        .error-box {
          background: #fff3f3;
          border: 1px solid #ffcdd2;
          border-radius: 12px;
          padding: 30px;
          max-width: 400px;
          margin: 0 auto;
        }

        .error-icon {
          font-size: 48px;
          display: block;
          margin-bottom: 15px;
        }

        .error-message {
          color: #b71c1c;
          margin: 10px 0 20px 0;
        }

        .retry-button {
          background: #f44336;
          color: white;
          border: none;
          padding: 10px 24px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: background 0.3s;
        }

        .retry-button:hover {
          background: #d32f2f;
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: #888;
        }

        .empty-state p {
          font-size: 16px;
          margin-bottom: 15px;
        }

        /* Categories and Settings */
        .placeholder-content {
          text-align: center;
          padding: 60px 20px;
          color: #888;
        }

        .placeholder-icon {
          font-size: 64px;
          margin-top: 20px;
          opacity: 0.5;
        }

        .settings-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 25px;
        }

        .settings-card {
          background: #f8f8f8;
          padding: 25px;
          border-radius: 12px;
        }

        .settings-card h3 {
          margin: 0 0 20px 0;
          font-size: 17px;
          color: #333;
        }

        .settings-item {
          margin-bottom: 15px;
        }

        .settings-item label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #666;
          margin-bottom: 5px;
        }

        .settings-item .form-input {
          background: white;
        }

        .settings-item span {
          display: inline-block;
          padding: 8px 0;
          font-size: 14px;
          color: #333;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .admin-sidebar {
            width: 80px;
            padding: 20px 10px;
          }
          .admin-logo h2 {
            font-size: 16px;
          }
          .admin-logo p {
            display: none;
          }
          .admin-nav button {
            padding: 10px 12px;
            justify-content: center;
          }
          .nav-label {
            display: none;
          }
          .sidebar-footer .nav-label {
            display: none;
          }
          .btn-logout-sidebar {
            justify-content: center;
            padding: 10px 12px;
          }
          .admin-content {
            margin-left: 80px;
            padding: 15px;
          }
          .brands-grid {
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .admin-sidebar {
            width: 60px;
            padding: 15px 8px;
          }
          .admin-logo h2 {
            font-size: 12px;
          }
          .admin-nav button {
            padding: 8px;
            font-size: 18px;
          }
          .admin-content {
            margin-left: 60px;
            padding: 10px;
          }
          .admin-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
            padding: 15px;
          }
          .admin-header h1 {
            font-size: 18px;
          }
          .stats-grid {
            grid-template-columns: 1fr 1fr;
          }
          .data-table {
            font-size: 12px;
          }
          .data-table th,
          .data-table td {
            padding: 8px 10px;
          }
          .actions {
            flex-direction: column;
          }
          .product-thumb {
            width: 30px;
            height: 30px;
          }
          .filter-buttons {
            gap: 5px;
          }
          .filter-btn {
            font-size: 11px;
            padding: 4px 10px;
          }
          .form-row {
            grid-template-columns: 1fr;
          }
          .admin-main {
            padding: 15px;
          }
          .settings-grid {
            grid-template-columns: 1fr;
          }
          .modal-content {
            padding: 20px;
            width: 95%;
          }
          .modal-content.large-modal {
            max-width: 95%;
          }
          .brands-grid {
            grid-template-columns: 1fr 1fr;
          }
          .brand-card {
            padding: 15px;
          }
          .brand-logo {
            width: 70px;
            height: 70px;
          }
          .brand-placeholder {
            width: 70px;
            height: 70px;
          }
          .brand-placeholder span {
            font-size: 32px;
          }
          .brand-product-actions {
            flex-direction: column;
            align-items: center;
          }
          .brand-products-header {
            flex-direction: column;
            gap: 10px;
            align-items: flex-start;
          }
          .section-controls {
            flex-direction: column;
            align-items: stretch;
          }
          .sort-select {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
          .stat-card {
            padding: 18px;
          }
          .stat-number {
            font-size: 22px;
          }
          .section-header {
            flex-direction: column;
            align-items: flex-start;
          }
          .brands-grid {
            grid-template-columns: 1fr;
          }
          .search-input {
            font-size: 13px;
            padding: 8px 35px 8px 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default Admin;