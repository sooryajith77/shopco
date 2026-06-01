// import React from 'react';

// const Orders = () => {
//   return (
//     <div className="orders-page">
//       <div className="container">
//         <h1>My Orders</h1>
//         <div className="orders-list">
//           <p>You haven't placed any orders yet.</p>
//           <button className="btn-primary">Start Shopping</button>
//         </div>
//       </div>
      
//       <style jsx>{`
//         .orders-page {
//           padding: 60px 0;
//         }
//         .orders-list {
//           text-align: center;
//           padding: 60px 0;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Orders;




import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Fix for environment variables in React
const API_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:5000/api';

// If using Create React App, you need REACT_APP_ prefix:
// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// If using Vite, use import.meta.env:
// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [trackingId, setTrackingId] = useState('');
  const [trackedOrder, setTrackedOrder] = useState(null);
  const [showTrackModal, setShowTrackModal] = useState(false);

  // Get auth token
  const getToken = () => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const parsed = JSON.parse(user);
        return parsed.token || null;
      } catch (e) {
        return null;
      }
    }
    return null;
  };

  // Fetch orders from PostgreSQL
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const token = getToken();
      
      // First try to get from API
      if (token) {
        const response = await fetch(`${API_URL}/orders`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          // Handle different response structures
          if (data.orders) {
            setOrders(data.orders);
          } else if (data.data) {
            setOrders(data.data);
          } else if (Array.isArray(data)) {
            setOrders(data);
          } else {
            setOrders([]);
          }
          setLoading(false);
          return;
        }
      }
      
      // Fallback to localStorage
      const savedOrders = localStorage.getItem('orders');
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      // Fallback to localStorage
      const savedOrders = localStorage.getItem('orders');
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'pending': return '#ff9800';
      case 'processing': return '#2196f3';
      case 'shipped': return '#4caf50';
      case 'delivered': return '#00bcd4';
      case 'cancelled': return '#f44336';
      default: return '#999';
    }
  };

  const getStatusBadgeClass = (status) => {
    switch(status?.toLowerCase()) {
      case 'pending': return 'status-pending';
      case 'processing': return 'status-processing';
      case 'shipped': return 'status-shipped';
      case 'delivered': return 'status-delivered';
      case 'cancelled': return 'status-cancelled';
      default: return '';
    }
  };

  const getStatusStep = (status) => {
    const steps = ['pending', 'processing', 'shipped', 'delivered'];
    return steps.indexOf(status?.toLowerCase());
  };

  const getStatusProgress = (orderStatus) => {
    const steps = ['pending', 'processing', 'shipped', 'delivered'];
    const currentStep = steps.indexOf(orderStatus?.toLowerCase());
    if (currentStep === -1) return 0;
    return (currentStep / (steps.length - 1)) * 100;
  };

  const cancelOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        const token = getToken();
        if (token) {
          const response = await fetch(`${API_URL}/orders/${orderId}/cancel`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });

          if (response.ok) {
            fetchOrders();
            alert('Order cancelled successfully');
            return;
          }
        }
        
        // Fallback to localStorage
        const updatedOrders = orders.map(order => {
          if (order.id === orderId && (order.status === 'pending' || order.status === 'processing')) {
            return {
              ...order,
              status: 'cancelled',
              statusHistory: [
                ...(order.statusHistory || []),
                {
                  status: 'cancelled',
                  date: new Date().toISOString(),
                  note: 'Order cancelled by customer'
                }
              ]
            };
          }
          return order;
        });
        setOrders(updatedOrders);
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
        alert('Order cancelled successfully');
      } catch (error) {
        console.error('Error cancelling order:', error);
        alert('Failed to cancel order');
      }
    }
  };

  const reorder = async (order) => {
    try {
      // Add to cart logic
      const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
      
      // Get product details
      const productToReorder = {
        id: order.product?.id || order.productId,
        title: order.product?.title || order.product_name,
        name: order.product?.name || order.product_name,
        image: order.product?.image || order.image,
        price: order.price || order.unit_price,
        selectedSize: order.size,
        selectedColor: order.color,
        quantity: order.quantity || 1
      };
      
      cartItems.push(productToReorder);
      localStorage.setItem('cart', JSON.stringify(cartItems));
      
      alert('Item added to cart!');
      navigate('/cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart');
    }
  };

  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowDetailsModal(true);
  };

  const handleTrackOrder = () => {
    if (!trackingId) {
      alert('Please enter tracking ID');
      return;
    }
    
    // Search in orders
    const order = orders.find(o => 
      (o.tracking_number === trackingId) || 
      (o.trackingNumber === trackingId) ||
      (o.trackingId === trackingId)
    );
    
    if (order) {
      setTrackedOrder(order);
    } else {
      // Check localStorage
      const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      const foundOrder = savedOrders.find(o => 
        o.trackingId === trackingId || 
        o.trackingNumber === trackingId
      );
      if (foundOrder) {
        setTrackedOrder(foundOrder);
      } else {
        alert('Order not found. Please check your tracking ID.');
        setTrackedOrder(null);
      }
    }
  };

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status?.toLowerCase() === filter);

  const getStatusCount = (status) => {
    if (status === 'all') return orders.length;
    return orders.filter(o => o.status?.toLowerCase() === status).length;
  };

  if (loading) {
    return (
      <div className="orders-page">
        <div className="container">
          <div className="loading-spinner">Loading your orders...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .orders-page {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: #f5f5f5;
          min-height: 100vh;
          padding: 40px 0;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .loading-spinner {
          text-align: center;
          padding: 60px;
          font-size: 18px;
          color: #666;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          flex-wrap: wrap;
          gap: 20px;
        }

        .page-header h1 {
          font-size: 32px;
          color: #333;
        }

        .track-btn {
          background: #2196f3;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 30px;
          cursor: pointer;
          font-size: 16px;
          font-weight: 600;
          transition: background 0.2s;
        }

        .track-btn:hover {
          background: #1976d2;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .stat-card {
          background: white;
          padding: 20px;
          border-radius: 16px;
          text-align: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          cursor: pointer;
          transition: all 0.2s;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .stat-card.active {
          border: 2px solid #000;
          background: #fafafa;
        }

        .stat-number {
          font-size: 32px;
          font-weight: bold;
          margin: 10px 0;
        }

        .stat-label {
          color: #666;
          font-size: 14px;
        }

        .filter-section {
          margin-bottom: 30px;
        }

        .filter-buttons {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 10px 24px;
          border: 1px solid #ddd;
          background: white;
          border-radius: 30px;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 14px;
        }

        .filter-btn:hover {
          background: #f0f0f0;
        }

        .filter-btn.active {
          background: #000;
          color: white;
          border-color: #000;
        }

        .orders-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .order-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          transition: box-shadow 0.2s;
        }

        .order-card:hover {
          box-shadow: 0 4px 16px rgba(0,0,0,0.1);
        }

        .order-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 15px;
          padding-bottom: 15px;
          border-bottom: 1px solid #eee;
          margin-bottom: 15px;
        }

        .order-info {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .order-id {
          font-weight: 600;
          color: #333;
          font-size: 16px;
        }

        .order-date {
          color: #999;
          font-size: 12px;
        }

        .tracking-info {
          font-family: monospace;
          font-size: 12px;
          color: #666;
          background: #f5f5f5;
          padding: 4px 8px;
          border-radius: 4px;
          display: inline-block;
        }

        .order-status {
          text-align: right;
        }

        .status-badge {
          display: inline-block;
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .status-pending {
          background: #fff3e0;
          color: #ff9800;
        }

        .status-processing {
          background: #e3f2fd;
          color: #2196f3;
        }

        .status-shipped {
          background: #e8f5e9;
          color: #4caf50;
        }

        .status-delivered {
          background: #e0f7fa;
          color: #00bcd4;
        }

        .status-cancelled {
          background: #ffebee;
          color: #f44336;
        }

        .order-progress {
          margin: 20px 0;
        }

        .progress-bar-bg {
          height: 4px;
          background: #e0e0e0;
          border-radius: 2px;
          overflow: hidden;
        }

        .progress-bar-fill {
          height: 100%;
          background: #4caf50;
          border-radius: 2px;
          transition: width 0.3s;
        }

        .progress-steps {
          display: flex;
          justify-content: space-between;
          margin-top: 12px;
        }

        .progress-step {
          text-align: center;
          flex: 1;
          font-size: 10px;
          color: #999;
        }

        .progress-step.active {
          color: #4caf50;
          font-weight: 600;
        }

        .product-details {
          display: flex;
          gap: 20px;
          margin: 20px 0;
          padding: 15px;
          background: #fafafa;
          border-radius: 12px;
          flex-wrap: wrap;
          align-items: center;
        }

        .product-image {
          width: 80px;
          height: 80px;
          border-radius: 8px;
          object-fit: cover;
        }

        .product-info {
          flex: 1;
        }

        .product-name {
          font-weight: 600;
          margin-bottom: 8px;
        }

        .product-meta {
          font-size: 14px;
          color: #666;
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
        }

        .order-total {
          font-size: 18px;
          font-weight: bold;
          color: #000;
        }

        .order-actions {
          display: flex;
          gap: 12px;
          margin-top: 20px;
          flex-wrap: wrap;
        }

        .btn {
          padding: 10px 20px;
          border: none;
          border-radius: 30px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s;
        }

        .btn-primary {
          background: #000;
          color: white;
        }

        .btn-primary:hover {
          background: #333;
        }

        .btn-outline {
          background: white;
          border: 1px solid #ddd;
          color: #333;
        }

        .btn-outline:hover {
          background: #f5f5f5;
        }

        .btn-danger {
          background: #f44336;
          color: white;
        }

        .btn-danger:hover {
          background: #d32f2f;
        }

        .empty-state {
          text-align: center;
          padding: 80px 20px;
          background: white;
          border-radius: 16px;
        }

        .empty-icon {
          font-size: 64px;
          margin-bottom: 20px;
        }

        .empty-state h3 {
          margin-bottom: 10px;
          color: #333;
        }

        .empty-state p {
          color: #666;
          margin-bottom: 30px;
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
          border-radius: 20px;
          width: 90%;
          max-width: 600px;
          max-height: 80vh;
          overflow-y: auto;
          padding: 30px;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 1px solid #eee;
        }

        .modal-close {
          background: none;
          border: none;
          font-size: 28px;
          cursor: pointer;
          color: #999;
        }

        .track-form {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }

        .track-form input {
          flex: 1;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 30px;
          font-size: 14px;
        }

        .track-form button {
          padding: 12px 24px;
          background: #000;
          color: white;
          border: none;
          border-radius: 30px;
          cursor: pointer;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
          margin: 20px 0;
        }

        .info-card {
          background: #fafafa;
          padding: 15px;
          border-radius: 12px;
        }

        .info-card h4 {
          margin-bottom: 10px;
          font-size: 14px;
          color: #666;
        }

        .info-card p {
          margin: 8px 0;
          font-size: 14px;
        }

        @media (max-width: 768px) {
          .order-header {
            flex-direction: column;
          }
          
          .order-status {
            text-align: left;
          }
          
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .product-details {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          
          .product-meta {
            justify-content: center;
          }
        }
      `}</style>

      <div className="container">
        <div className="page-header">
          <h1>My Orders</h1>
          <button className="track-btn" onClick={() => setShowTrackModal(true)}>
            🔍 Track Order
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="stats-grid">
          <div className={`stat-card ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
            <div className="stat-label">Total Orders</div>
            <div className="stat-number">{getStatusCount('all')}</div>
          </div>
          <div className={`stat-card ${filter === 'pending' ? 'active' : ''}`} onClick={() => setFilter('pending')}>
            <div className="stat-label">Pending</div>
            <div className="stat-number" style={{ color: '#ff9800' }}>{getStatusCount('pending')}</div>
          </div>
          <div className={`stat-card ${filter === 'processing' ? 'active' : ''}`} onClick={() => setFilter('processing')}>
            <div className="stat-label">Processing</div>
            <div className="stat-number" style={{ color: '#2196f3' }}>{getStatusCount('processing')}</div>
          </div>
          <div className={`stat-card ${filter === 'shipped' ? 'active' : ''}`} onClick={() => setFilter('shipped')}>
            <div className="stat-label">Shipped</div>
            <div className="stat-number" style={{ color: '#4caf50' }}>{getStatusCount('shipped')}</div>
          </div>
          <div className={`stat-card ${filter === 'delivered' ? 'active' : ''}`} onClick={() => setFilter('delivered')}>
            <div className="stat-label">Delivered</div>
            <div className="stat-number" style={{ color: '#00bcd4' }}>{getStatusCount('delivered')}</div>
          </div>
          <div className={`stat-card ${filter === 'cancelled' ? 'active' : ''}`} onClick={() => setFilter('cancelled')}>
            <div className="stat-label">Cancelled</div>
            <div className="stat-number" style={{ color: '#f44336' }}>{getStatusCount('cancelled')}</div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="filter-section">
          <div className="filter-buttons">
            <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All Orders</button>
            <button className={`filter-btn ${filter === 'pending' ? 'active' : ''}`} onClick={() => setFilter('pending')}>Pending</button>
            <button className={`filter-btn ${filter === 'processing' ? 'active' : ''}`} onClick={() => setFilter('processing')}>Processing</button>
            <button className={`filter-btn ${filter === 'shipped' ? 'active' : ''}`} onClick={() => setFilter('shipped')}>Shipped</button>
            <button className={`filter-btn ${filter === 'delivered' ? 'active' : ''}`} onClick={() => setFilter('delivered')}>Delivered</button>
            <button className={`filter-btn ${filter === 'cancelled' ? 'active' : ''}`} onClick={() => setFilter('cancelled')}>Cancelled</button>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length > 0 ? (
          <div className="orders-list">
            {filteredOrders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <div className="order-id">Order #{order.order_number || order.orderId}</div>
                    <div className="order-date">{new Date(order.created_at || order.orderDate).toLocaleDateString()}</div>
                    <div className="tracking-info">Tracking: {order.tracking_number || order.trackingId}</div>
                  </div>
                  <div className="order-status">
                    <span className={`status-badge ${getStatusBadgeClass(order.status)}`}>
                      {order.status?.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                {order.status !== 'cancelled' && (
                  <div className="order-progress">
                    <div className="progress-bar-bg">
                      <div className="progress-bar-fill" style={{ width: `${getStatusProgress(order.status)}%` }}></div>
                    </div>
                    <div className="progress-steps">
                      <div className={`progress-step ${getStatusStep(order.status) >= 0 ? 'active' : ''}`}>Placed</div>
                      <div className={`progress-step ${getStatusStep(order.status) >= 1 ? 'active' : ''}`}>Processing</div>
                      <div className={`progress-step ${getStatusStep(order.status) >= 2 ? 'active' : ''}`}>Shipped</div>
                      <div className={`progress-step ${getStatusStep(order.status) >= 3 ? 'active' : ''}`}>Delivered</div>
                    </div>
                  </div>
                )}

                {/* Product Details */}
                <div className="product-details">
                  <img 
                    src={order.product?.image || order.image || 'https://via.placeholder.com/80'} 
                    alt={order.product?.name || order.product_name} 
                    className="product-image"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/80'; }}
                  />
                  <div className="product-info">
                    <div className="product-name">{order.product?.title || order.product?.name || order.product_name}</div>
                    <div className="product-meta">
                      <span>Size: {order.size}</span>
                      <span>Color: {order.color}</span>
                      <span>Quantity: {order.quantity}</span>
                      <span>Price: ${order.price || order.unit_price}</span>
                    </div>
                  </div>
                  <div className="order-total">
                    Total: ${order.total_amount || order.totalPrice}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="order-actions">
                  <button className="btn btn-outline" onClick={() => viewOrderDetails(order)}>View Details</button>
                  <button className="btn btn-outline" onClick={() => reorder(order)}>Reorder</button>
                  {(order.status === 'pending' || order.status === 'processing') && (
                    <button className="btn btn-danger" onClick={() => cancelOrder(order.id)}>Cancel Order</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📦</div>
            <h3>No orders found</h3>
            <p>You haven't placed any orders yet. Start shopping to see your orders here!</p>
            <button className="btn btn-primary" onClick={() => navigate('/shop')}>Start Shopping</button>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {showDetailsModal && selectedOrder && (
        <div className="modal-overlay" onClick={() => setShowDetailsModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Order Details #{selectedOrder.order_number || selectedOrder.orderId}</h2>
              <button className="modal-close" onClick={() => setShowDetailsModal(false)}>&times;</button>
            </div>
            
            <div className="info-card">
              <h4>Order Information</h4>
              <p><strong>Order Date:</strong> {new Date(selectedOrder.created_at || selectedOrder.orderDate).toLocaleString()}</p>
              <p><strong>Tracking ID:</strong> {selectedOrder.tracking_number || selectedOrder.trackingId}</p>
              <p><strong>Payment Method:</strong> {(selectedOrder.payment_method || selectedOrder.paymentMethod)?.toUpperCase()}</p>
              <p><strong>Status:</strong> <span className={`status-badge ${getStatusBadgeClass(selectedOrder.status)}`}>{selectedOrder.status?.toUpperCase()}</span></p>
            </div>

            <div className="info-card">
              <h4>Shipping Address</h4>
              <p>{selectedOrder.shipping_name || selectedOrder.fullName}</p>
              <p>{selectedOrder.shipping_address || selectedOrder.address}</p>
              <p>{selectedOrder.shipping_city || selectedOrder.city}, {selectedOrder.shipping_state || selectedOrder.state} - {selectedOrder.shipping_zip || selectedOrder.zipCode}</p>
              <p>Phone: {selectedOrder.shipping_phone || selectedOrder.phone}</p>
              <p>Email: {selectedOrder.email}</p>
            </div>

            <div className="info-card">
              <h4>Product Details</h4>
              <p><strong>Product:</strong> {selectedOrder.product?.name || selectedOrder.product_name}</p>
              <p><strong>Size:</strong> {selectedOrder.size}</p>
              <p><strong>Color:</strong> {selectedOrder.color}</p>
              <p><strong>Quantity:</strong> {selectedOrder.quantity}</p>
              <p><strong>Unit Price:</strong> ${selectedOrder.price || selectedOrder.unit_price}</p>
              <p><strong>Total Price:</strong> ${selectedOrder.total_amount || selectedOrder.totalPrice}</p>
            </div>

            {selectedOrder.statusHistory && (
              <div className="info-card">
                <h4>Status History</h4>
                {selectedOrder.statusHistory.map((history, idx) => (
                  <div key={idx} style={{ marginBottom: 12, padding: 8, background: '#f5f5f5', borderRadius: 8 }}>
                    <strong>{history.status?.toUpperCase()}</strong> - {new Date(history.date).toLocaleString()}
                    <p style={{ fontSize: 12, marginTop: 4, color: '#666' }}>{history.note}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Track Order Modal */}
      {showTrackModal && (
        <div className="modal-overlay" onClick={() => { setShowTrackModal(false); setTrackedOrder(null); setTrackingId(''); }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Track Your Order</h2>
              <button className="modal-close" onClick={() => { setShowTrackModal(false); setTrackedOrder(null); setTrackingId(''); }}>&times;</button>
            </div>
            
            <div className="track-form">
              <input 
                type="text" 
                placeholder="Enter Tracking ID" 
                value={trackingId} 
                onChange={(e) => setTrackingId(e.target.value)} 
              />
              <button onClick={handleTrackOrder}>Track</button>
            </div>
            
            {trackedOrder && (
              <div>
                <div className="info-card">
                  <h4>Order #{trackedOrder.order_number || trackedOrder.orderId}</h4>
                  <p><strong>Date:</strong> {new Date(trackedOrder.created_at || trackedOrder.orderDate).toLocaleDateString()}</p>
                  <p><strong>Status:</strong> <span className={`status-badge ${getStatusBadgeClass(trackedOrder.status)}`}>{trackedOrder.status?.toUpperCase()}</span></p>
                </div>

                <div className="order-progress">
                  <div className="progress-bar-bg">
                    <div className="progress-bar-fill" style={{ width: `${getStatusProgress(trackedOrder.status)}%` }}></div>
                  </div>
                  <div className="progress-steps">
                    <div className={`progress-step ${getStatusStep(trackedOrder.status) >= 0 ? 'active' : ''}`}>Placed</div>
                    <div className={`progress-step ${getStatusStep(trackedOrder.status) >= 1 ? 'active' : ''}`}>Processing</div>
                    <div className={`progress-step ${getStatusStep(trackedOrder.status) >= 2 ? 'active' : ''}`}>Shipped</div>
                    <div className={`progress-step ${getStatusStep(trackedOrder.status) >= 3 ? 'active' : ''}`}>Delivered</div>
                  </div>
                </div>

                <div className="info-card">
                  <h4>Product</h4>
                  <p><strong>{trackedOrder.product?.name || trackedOrder.product_name}</strong></p>
                  <p>Size: {trackedOrder.size} | Color: {trackedOrder.color} | Quantity: {trackedOrder.quantity}</p>
                  <p><strong>Total: ${trackedOrder.total_amount || trackedOrder.totalPrice}</strong></p>
                </div>

                <div className="info-card">
                  <h4>Shipping Address</h4>
                  <p>{trackedOrder.shipping_name || trackedOrder.fullName}</p>
                  <p>{trackedOrder.shipping_address || trackedOrder.address}, {trackedOrder.shipping_city || trackedOrder.city}</p>
                  <p>Phone: {trackedOrder.shipping_phone || trackedOrder.phone}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;