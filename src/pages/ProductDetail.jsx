













import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';
import Loader from '../components/Loader';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedProduct, loading, products = [] } = useSelector((state) => state.products);
  const { orders = [] } = useSelector((state) => state.orders || { orders: [] });
  
  const [selectedSize, setSelectedSize] = useState('Medium');
  const [selectedColor, setSelectedColor] = useState('dark');
  const [activeTab, setActiveTab] = useState('product-details');
  const [visibleReviews, setVisibleReviews] = useState(4);
  const [reviewSort, setReviewSort] = useState('latest');
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showTrackModal, setShowTrackModal] = useState(false);
  const [trackingId, setTrackingId] = useState('');
  const [trackedOrder, setTrackedOrder] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [adminView, setAdminView] = useState(false);
  const [orderFilter, setOrderFilter] = useState('all');
  const [similarProducts, setSimilarProducts] = useState([]);

  const [savedAddresses, setSavedAddresses] = useState([]);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [loadingAddresses, setLoadingAddresses] = useState(false);

  const [orderDetails, setOrderDetails] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    paymentMethod: 'cod'
  });

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  // Fetch similar products when selectedProduct changes
  useEffect(() => {
    if (selectedProduct && selectedProduct.category) {
      fetchSimilarProducts(selectedProduct.category, selectedProduct.id);
    }
  }, [selectedProduct]);

  const fetchSimilarProducts = async (category, currentProductId) => {
    try {
      // Try to fetch from API first
      const response = await fetch(`http://localhost:5000/api/products?category=${category}&limit=4`);
      if (response.ok) {
        const data = await response.json();
        if (data.products) {
          // Filter out current product and get random products
          let filtered = data.products.filter(p => p.id !== currentProductId);
          // Shuffle and take first 4
          const shuffled = [...filtered].sort(() => 0.5 - Math.random());
          setSimilarProducts(shuffled.slice(0, 4));
          return;
        }
      }
      throw new Error('API fetch failed');
    } catch (error) {
      // Fallback to local products array or generate mock data
      generateMockSimilarProducts(category, currentProductId);
    }
  };

  const generateMockSimilarProducts = (category, currentProductId) => {
    const mockProductsByCategory = {
      'men': [
        { id: 101, name: "Classic Fit Polo", price: 89, originalPrice: 129, discount: 31, image: "/api/placeholder/200/200", category: "men" },
        { id: 102, name: "Slim Fit Denim Jeans", price: 79, originalPrice: 99, discount: 20, image: "/api/placeholder/200/200", category: "men" },
        { id: 103, name: "Casual Hoodie", price: 65, originalPrice: 85, discount: 23, image: "/api/placeholder/200/200", category: "men" },
        { id: 104, name: "Summer Shorts", price: 45, originalPrice: 60, discount: 25, image: "/api/placeholder/200/200", category: "men" },
        { id: 105, name: "Leather Jacket", price: 199, originalPrice: 299, discount: 33, image: "/api/placeholder/200/200", category: "men" },
        { id: 106, name: "Cotton Cargo Pants", price: 69, originalPrice: 89, discount: 22, image: "/api/placeholder/200/200", category: "men" }
      ],
      'women': [
        { id: 201, name: "Floral Summer Dress", price: 79, originalPrice: 119, discount: 33, image: "/api/placeholder/200/200", category: "women" },
        { id: 202, name: "High Waist Jeans", price: 69, originalPrice: 89, discount: 22, image: "/api/placeholder/200/200", category: "women" },
        { id: 203, name: "Cozy Knit Sweater", price: 59, originalPrice: 79, discount: 25, image: "/api/placeholder/200/200", category: "women" },
        { id: 204, name: "Leather Handbag", price: 129, originalPrice: 199, discount: 35, image: "/api/placeholder/200/200", category: "women" },
        { id: 205, name: "Running Leggings", price: 49, originalPrice: 69, discount: 29, image: "/api/placeholder/200/200", category: "women" },
        { id: 206, name: "Silk Blouse", price: 89, originalPrice: 129, discount: 31, image: "/api/placeholder/200/200", category: "women" }
      ],
      'accessories': [
        { id: 301, name: "Leather Belt", price: 35, originalPrice: 50, discount: 30, image: "/api/placeholder/200/200", category: "accessories" },
        { id: 302, name: "Aviator Sunglasses", price: 49, originalPrice: 79, discount: 38, image: "/api/placeholder/200/200", category: "accessories" },
        { id: 303, name: "Wool Beanie", price: 19, originalPrice: 29, discount: 34, image: "/api/placeholder/200/200", category: "accessories" },
        { id: 304, name: "Leather Wallet", price: 29, originalPrice: 45, discount: 35, image: "/api/placeholder/200/200", category: "accessories" },
        { id: 305, name: "Smart Watch", price: 199, originalPrice: 299, discount: 33, image: "/api/placeholder/200/200", category: "accessories" },
        { id: 306, name: "Silk Scarf", price: 25, originalPrice: 40, discount: 37, image: "/api/placeholder/200/200", category: "accessories" }
      ],
      'default': [
        { id: 401, name: "Polo with Contrast Trims", price: 212, originalPrice: 242, discount: 12, image: "/api/placeholder/200/200", category: "default" },
        { id: 402, name: "Gradient Graphic T-shirt", price: 145, originalPrice: 145, discount: null, image: "/api/placeholder/200/200", category: "default" },
        { id: 403, name: "Polo with Tipping Details", price: 180, originalPrice: 180, discount: null, image: "/api/placeholder/200/200", category: "default" },
        { id: 404, name: "Black Striped T-shirt", price: 120, originalPrice: 150, discount: 20, image: "/api/placeholder/200/200", category: "default" },
        { id: 405, name: "Denim Jacket", price: 159, originalPrice: 199, discount: 20, image: "/api/placeholder/200/200", category: "default" },
        { id: 406, name: "Chino Pants", price: 89, originalPrice: 109, discount: 18, image: "/api/placeholder/200/200", category: "default" }
      ]
    };

    const categoryProducts = mockProductsByCategory[category?.toLowerCase()] || mockProductsByCategory['default'];
    // Filter out current product and get random 4
    let filtered = categoryProducts.filter(p => p.id !== currentProductId && p.id !== selectedProduct?.id);
    // Shuffle array
    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    setSimilarProducts(shuffled.slice(0, 4));
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      dispatch(addToCart({ ...selectedProduct, selectedSize, selectedColor, quantity }));
      alert('Added to cart successfully!');
    }
  };

  useEffect(() => {
    if (showOrderModal) {
      fetchSavedAddresses();
    }
  }, [showOrderModal]);

  const fetchSavedAddresses = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return;
    
    setLoadingAddresses(true);
    try {
      const response = await fetch('http://localhost:5000/api/addresses', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setSavedAddresses(data.addresses);
        const defaultAddr = data.addresses.find(addr => addr.isDefault);
        if (defaultAddr) {
          setSelectedAddressId(defaultAddr.id);
          populateOrderForm(defaultAddr);
        }
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    } finally {
      setLoadingAddresses(false);
    }
  };

  const populateOrderForm = (address) => {
    setOrderDetails({
      fullName: address.fullName,
      email: address.email,
      address: address.address,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      phone: address.phone,
      paymentMethod: 'cod'
    });
  };

  const handleAddressSelect = (addressId) => {
    const address = savedAddresses.find(a => a.id === addressId);
    if (address) {
      setSelectedAddressId(addressId);
      populateOrderForm(address);
    }
  };

  const saveAddressAfterOrder = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return;
    
    const addressExists = savedAddresses.some(addr => 
      addr.address === orderDetails.address && 
      addr.city === orderDetails.city &&
      addr.zipCode === orderDetails.zipCode
    );
    
    if (addressExists) return;
    
    try {
      await fetch('http://localhost:5000/api/addresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          fullName: orderDetails.fullName,
          email: orderDetails.email,
          phone: orderDetails.phone,
          address: orderDetails.address,
          city: orderDetails.city,
          state: orderDetails.state,
          zipCode: orderDetails.zipCode,
          isDefault: savedAddresses.length === 0,
          addressType: 'home'
        })
      });
    } catch (error) {
      console.error('Error saving address:', error);
    }
  };

  const handleBuyNow = () => {
    setShowOrderModal(true);
  };

  const handleOrderChange = (e) => {
    setOrderDetails({
      ...orderDetails,
      [e.target.name]: e.target.value
    });
  };

  const incrementQuantity = () => {
    if (quantity < 10) setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user) {
      alert('Please login first');
      navigate('/login');
      return;
    }
    
    const totalPrice = selectedProduct.price * quantity;
    
    const orderData = {
      fullName: orderDetails.fullName,
      email: orderDetails.email,
      phone: orderDetails.phone,
      address: orderDetails.address,
      city: orderDetails.city,
      state: orderDetails.state,
      zipCode: orderDetails.zipCode,
      paymentMethod: orderDetails.paymentMethod,
      shippingAddress: `${orderDetails.address}, ${orderDetails.city}, ${orderDetails.state} ${orderDetails.zipCode}`,
      items: [{
        productId: selectedProduct.id,
        quantity: quantity,
        price: selectedProduct.price,
        size: selectedSize,
        color: selectedColor
      }]
    };
    
    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(orderData)
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        alert(`✅ Order placed successfully!\n\n📦 Order ID: ${data.order?.orderId || data.order?.id}\n🔍 Tracking ID: ${data.trackingId}\n💰 Total: $${totalPrice.toFixed(2)}\n\nYou can track your order using the Tracking ID.`);
        
        setShowOrderModal(false);
        
        setOrderDetails({
          fullName: '',
          email: '',
          address: '',
          city: '',
          state: '',
          zipCode: '',
          phone: '',
          paymentMethod: 'cod'
        });
        setQuantity(1);
        
        navigate('/orders');
      } else {
        alert(data.message || 'Order failed. Please try again.');
      }
    } catch (error) {
      console.error('Order error:', error);
      alert('Failed to place order. Make sure backend is running on port 5000');
    }
  };

  const handleTrackOrder = () => {
    if (!trackingId) {
      alert('Please enter tracking ID');
      return;
    }
    
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const order = existingOrders.find(o => o.trackingId === trackingId);
    
    if (order) {
      setTrackedOrder(order);
    } else {
      alert('Order not found. Please check your tracking ID.');
      setTrackedOrder(null);
    }
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const orderIndex = existingOrders.findIndex(o => o.id === orderId);
    
    if (orderIndex !== -1) {
      existingOrders[orderIndex].status = newStatus;
      existingOrders[orderIndex].statusHistory.push({
        status: newStatus,
        date: new Date().toISOString(),
        note: `Order status updated to ${newStatus}`
      });
      localStorage.setItem('orders', JSON.stringify(existingOrders));
      alert(`Order status updated to ${newStatus}`);
      if (trackedOrder && trackedOrder.id === orderId) {
        setTrackedOrder(existingOrders[orderIndex]);
      }
    }
  };

  const deleteOrder = (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      const filteredOrders = existingOrders.filter(o => o.id !== orderId);
      localStorage.setItem('orders', JSON.stringify(filteredOrders));
      alert('Order deleted successfully');
      if (trackedOrder && trackedOrder.id === orderId) {
        setTrackedOrder(null);
      }
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return '#ff9800';
      case 'processing': return '#2196f3';
      case 'shipped': return '#4caf50';
      case 'delivered': return '#00bcd4';
      case 'cancelled': return '#f44336';
      default: return '#999';
    }
  };

  const loadMoreReviews = () => {
    setVisibleReviews(prev => prev + 3);
  };

  if (loading) return <Loader />;
  if (!selectedProduct) return <div className="not-found">Product not found</div>;
console.log("Selected Product:", selectedProduct);
console.log(selectedProduct.image);
console.log(selectedProduct.product?.image);
  const allReviews = [
    { id: 1, name: "Samantha D.", date: "Posted on August 14, 2023", rating: 4.5, text: "Absolutely love this shirt! The design is unique and the fabric feels so comfortable." },
    { id: 2, name: "Alex M.", date: "Posted on August 6, 2023", rating: 5, text: "The shirt exceeded my expectations! The quality is top notch." },
    { id: 3, name: "Ethan R.", date: "Posted on August 16, 2023", rating: 5, text: "This t-shirt is a must-have for anyone who appreciates good design." },
    { id: 4, name: "Olivia P.", date: "Posted on August 17, 2023", rating: 5, text: "I love this shirt! It looks super comfy and versatile." },
    { id: 5, name: "Liam K.", date: "Posted on August 18, 2023", rating: 5, text: "This t-shirt is a piece of contemporary art." },
    { id: 6, name: "Ava H.", date: "Posted on August 19, 2023", rating: 5, text: "I'm really impressed with how well-designed this shirt is!" }
  ];

  const getSortedReviews = () => {
    const sorted = [...allReviews];
    switch(reviewSort) {
      case 'highest':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'lowest':
        return sorted.sort((a, b) => a.rating - b.rating);
      default:
        return sorted.sort((a, b) => new Date(b.date.split(' ')[2]) - new Date(a.date.split(' ')[2]));
    }
  };

  const sortedReviews = getSortedReviews();
  const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
  const filteredOrders = orderFilter === 'all' ? existingOrders : existingOrders.filter(o => o.status === orderFilter);

  const handleSimilarProductClick = (productId) => {
    navigate(`/product/${productId}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="product-detail-page">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .product-detail-page {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
          background: white;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .breadcrumb {
          padding: 20px 0;
          color: #666;
          font-size: 14px;
          border-bottom: 1px solid #eee;
        }

        .product-detail-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          padding: 40px 0;
        }

        .product-gallery {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .main-image img {
          width: 100%;
          height: auto;
          border-radius: 20px;
          background: #f5f5f5;
        }

        .thumbnail-list {
          display: flex;
          gap: 15px;
        }

        .thumbnail {
          width: 80px;
          height: 80px;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          border: 2px solid transparent;
        }

        .thumbnail.active {
          border-color: #000;
        }

        .thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .product-info h1 {
          font-size: 32px;
          margin-bottom: 15px;
        }

        .rating {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }

        .stars {
          color: #ffc107;
          font-size: 18px;
        }

        .rating-value {
          color: #666;
        }

        .price-section {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .current-price {
          font-size: 28px;
          font-weight: bold;
        }

        .original-price {
          font-size: 20px;
          color: #999;
          text-decoration: line-through;
        }

        .discount-badge {
          background: #ff6b6b;
          color: white;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: bold;
        }

        .description {
          color: #666;
          line-height: 1.6;
          margin-bottom: 25px;
        }

        .option-section {
          margin-bottom: 25px;
        }

        .option-section label {
          display: block;
          font-weight: 500;
          margin-bottom: 12px;
          color: #333;
        }

        .quantity-selector {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .qty-btn {
          width: 40px;
          height: 40px;
          border: 1px solid #ddd;
          background: white;
          border-radius: 8px;
          cursor: pointer;
          font-size: 18px;
        }

        .quantity {
          font-size: 18px;
          font-weight: 600;
          min-width: 40px;
          text-align: center;
        }

        .color-options {
          display: flex;
          gap: 12px;
        }

        .color-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 2px solid #ddd;
          cursor: pointer;
          transition: all 0.2s;
        }

        .color-btn.active {
          border-color: #000;
          box-shadow: 0 0 0 2px white, 0 0 0 4px #000;
        }

        .size-options {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .size-btn {
          padding: 10px 24px;
          border: 1px solid #ddd;
          background: white;
          border-radius: 30px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .size-btn.active {
          background: #000;
          color: white;
          border-color: #000;
        }

        .add-to-cart-btn, .buy-btn {
          width: 100%;
          padding: 16px;
          border: none;
          border-radius: 30px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }

        .add-to-cart-btn {
          background: #000;
          color: white;
          margin-bottom: 12px;
        }

        .add-to-cart-btn:hover {
          background: #333;
        }

        .buy-btn {
          background: #ebee0a;
          color: #000;
        }

        .buy-btn:hover {
          background: #ddbf14;
        }

        .tabs-section {
          margin: 40px 0;
          border-top: 1px solid #eee;
          border-bottom: 1px solid #eee;
        }

        .tabs-header {
          display: flex;
          gap: 40px;
          padding: 20px 0;
          border-bottom: 1px solid #eee;
        }

        .tab-btn {
          background: none;
          border: none;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          padding: 8px 0;
          color: #666;
          position: relative;
        }

        .tab-btn.active {
          color: #000;
        }

        .tab-btn.active::after {
          content: '';
          position: absolute;
          bottom: -21px;
          left: 0;
          right: 0;
          height: 2px;
          background: #000;
        }

        .tab-content {
          padding: 30px 0;
        }

        .reviews-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .reviews-sort {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .reviews-sort select {
          padding: 8px 16px;
          border: 1px solid #ddd;
          border-radius: 8px;
          background: white;
          cursor: pointer;
        }

        .write-review-btn {
          background: #000;
          color: white;
          padding: 8px 20px;
          border: none;
          border-radius: 20px;
          cursor: pointer;
        }

        .reviews-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .review-card {
          padding: 20px;
          border: 1px solid #eee;
          border-radius: 16px;
        }

        .review-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 12px;
        }

        .reviewer-info h4 {
          margin: 0 0 5px 0;
        }

        .review-rating {
          color: #ffc107;
        }

        .rating-number {
          color: #666;
          margin-left: 8px;
          font-size: 12px;
        }

        .review-date {
          font-size: 12px;
          color: #999;
        }

        .review-text {
          margin: 0;
          line-height: 1.5;
          color: #444;
        }

        .load-more-btn {
          display: block;
          width: 200px;
          margin: 30px auto 0;
          padding: 12px;
          background: white;
          border: 1px solid #ddd;
          border-radius: 30px;
          cursor: pointer;
        }

        .admin-orders-section {
          margin: 40px 0;
          padding: 20px;
          background: #f5f5f5;
          border-radius: 20px;
        }

        .admin-orders-section h2 {
          margin-bottom: 20px;
        }

        .filter-buttons {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }

        .filter-buttons button {
          padding: 8px 16px;
          border: 1px solid #ddd;
          background: white;
          border-radius: 20px;
          cursor: pointer;
        }

        .filter-buttons button.active {
          background: #000;
          color: white;
        }

        .orders-table {
          width: 100%;
          overflow-x: auto;
        }

        .orders-table table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          border-radius: 10px;
          overflow: hidden;
        }

        .orders-table th,
        .orders-table td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #eee;
        }

        .orders-table th {
          background: #fafafa;
          font-weight: 600;
        }

        .status-select {
          padding: 6px 12px;
          border-radius: 20px;
          border: 1px solid #ddd;
          cursor: pointer;
        }

        .tracking-id {
          font-family: monospace;
          font-size: 12px;
          background: #f5f5f5;
          padding: 4px 8px;
          border-radius: 4px;
        }

        .copy-btn, .view-btn, .delete-btn {
          padding: 4px 8px;
          margin: 0 4px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .copy-btn { background: #e0e0e0; }
        .view-btn { background: #2196f3; color: white; }
        .delete-btn { background: #f44336; color: white; }

        .similar-products {
          margin: 60px 0;
        }

        .similar-products h2 {
          text-align: center;
          margin-bottom: 40px;
        }

        .similar-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .similar-card {
          text-align: center;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .similar-card:hover {
          transform: translateY(-4px);
        }

        .similar-card img {
          width: 100%;
          border-radius: 16px;
          background: #f5f5f5;
          margin-bottom: 12px;
        }

        .similar-card h4 {
          margin: 10px 0;
          font-size: 14px;
        }

        .price-row {
          display: flex;
          justify-content: center;
          gap: 10px;
          align-items: center;
        }

        .price-row .price {
          font-weight: 600;
        }

        .price-row .original-price {
          font-size: 14px;
          color: #999;
          text-decoration: line-through;
        }

        .discount {
          background: #ff6b6b;
          color: white;
          padding: 2px 6px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: bold;
        }

        .category-badge {
          display: inline-block;
          background: #e0e0e0;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 11px;
          margin-top: 8px;
          color: #666;
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
          border-radius: 20px;
          width: 90%;
          max-width: 500px;
          max-height: 80vh;
          overflow-y: auto;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .modal-close {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
        }

        .modal-content input,
        .modal-content select {
          width: 100%;
          padding: 12px;
          margin-bottom: 15px;
          border: 1px solid #ddd;
          border-radius: 8px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .order-summary {
          background: #f5f5f5;
          padding: 15px;
          border-radius: 10px;
          margin: 15px 0;
        }

        .summary-item {
          display: flex;
          justify-content: space-between;
          margin: 8px 0;
        }

        .summary-total {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
          padding-top: 10px;
          border-top: 1px solid #ddd;
        }

        .confirm-order-btn {
          width: 100%;
          padding: 14px;
          background: #000;
          color: white;
          border: none;
          border-radius: 30px;
          cursor: pointer;
        }

        .saved-addresses {
          margin-bottom: 20px;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 12px;
        }

        .saved-addresses h4 {
          margin-bottom: 12px;
          font-size: 14px;
          color: #333;
        }

        .address-list {
          max-height: 250px;
          overflow-y: auto;
          margin-bottom: 10px;
        }

        .address-card {
          display: flex;
          gap: 12px;
          padding: 12px;
          margin-bottom: 8px;
          background: white;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .address-card:hover {
          border-color: #000;
          background: #fafafa;
        }

        .address-card.selected {
          border-color: #4caf50;
          background: #f0fff4;
        }

        .address-radio {
          padding-top: 3px;
        }

        .address-details {
          flex: 1;
        }

        .address-details p {
          margin: 3px 0;
          font-size: 13px;
        }

        .default-badge {
          background: #4caf50;
          color: white;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 10px;
          margin-left: 8px;
        }

        .new-address-btn {
          width: 100%;
          padding: 10px;
          background: #f0f0f0;
          border: 1px dashed #999;
          border-radius: 8px;
          cursor: pointer;
          font-size: 13px;
          color: #666;
        }

        .new-address-btn:hover {
          background: #e0e0e0;
        }

        .not-found {
          text-align: center;
          padding: 100px;
          font-size: 24px;
        }

        @media (max-width: 768px) {
          .product-detail-content {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          .similar-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="breadcrumb">
        <div className="container">
          <span>Shop</span> &gt; <span>{selectedProduct.category || 'Products'}</span> &gt; <span>{selectedProduct.title || selectedProduct.name}</span>
        </div>
      </div>

      <div className="container">
        <div className="product-detail-content">
          <div className="product-gallery">
            <div className="main-image">
              <img src={selectedProduct.image} alt={selectedProduct.title} />
              
            </div>
            <div className="thumbnail-list">
              <div className={`thumbnail ${selectedColor === 'dark' ? 'active' : ''}`} onClick={() => setSelectedColor('dark')}>
                <img src={selectedProduct.image} alt="thumb 1" />
              </div>
              <div className={`thumbnail ${selectedColor === 'brown' ? 'active' : ''}`} onClick={() => setSelectedColor('brown')}>
                <img src={selectedProduct.image} alt="thumb 2" />
              </div>
              <div className={`thumbnail ${selectedColor === 'green' ? 'active' : ''}`} onClick={() => setSelectedColor('green')}>
                <img src={selectedProduct.image} alt="thumb 3" />
              </div>
            </div>
          </div>
          
          <div className="product-info">
            <h1>{selectedProduct.title || selectedProduct.name}</h1>
            <div className="rating">
              <span className="stars">★★★★☆</span>
              <span className="rating-value">4.5/5</span>
            </div>
            <div className="price-section">
              <span className="current-price">${selectedProduct.price}</span>
              {selectedProduct.originalPrice && (
                <>
                  <span className="original-price">${selectedProduct.originalPrice}</span>
                  <span className="discount-badge">-{Math.round(((selectedProduct.originalPrice - selectedProduct.price) / selectedProduct.originalPrice) * 100)}%</span>
                </>
              )}
            </div>
            <p className="description">
              {selectedProduct.description || "The graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style."}
            </p>
            
            <div className="option-section">
              <label>Colors</label>
              <div className="color-options">
                <button className={`color-btn ${selectedColor === 'dark' ? 'active' : ''}`} style={{ backgroundColor: '#2d2d2d' }} onClick={() => setSelectedColor('dark')}></button>
                <button className={`color-btn ${selectedColor === 'brown' ? 'active' : ''}`} style={{ backgroundColor: '#8B4513' }} onClick={() => setSelectedColor('brown')}></button>
                <button className={`color-btn ${selectedColor === 'green' ? 'active' : ''}`} style={{ backgroundColor: '#4a6741' }} onClick={() => setSelectedColor('green')}></button>
              </div>
            </div>

            <div className="option-section">
              <label>Size</label>
              <div className="size-options">
                {['Small', 'Medium', 'Large', 'X-Large'].map(size => (
                  <button key={size} className={`size-btn ${selectedSize === size ? 'active' : ''}`} onClick={() => setSelectedSize(size)}>
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="option-section">
              <label>Quantity</label>
              <div className="quantity-selector">
                <button className="qty-btn" onClick={decrementQuantity}>-</button>
                <span className="quantity">{quantity}</span>
                <button className="qty-btn" onClick={incrementQuantity}>+</button>
              </div>
            </div>

            <button onClick={handleAddToCart} className="add-to-cart-btn">Add to Cart</button>
            <button onClick={handleBuyNow} className="buy-btn">Buy Now</button>
          </div>
        </div>

        <div className="tabs-section">
          <div className="tabs-header">
            <button className={`tab-btn ${activeTab === 'product-details' ? 'active' : ''}`} onClick={() => setActiveTab('product-details')}>Product Details</button>
            <button className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => setActiveTab('reviews')}>Rating & Reviews</button>
            <button className={`tab-btn ${activeTab === 'faqs' ? 'active' : ''}`} onClick={() => setActiveTab('faqs')}>FAQs</button>
          </div>
          
          <div className="tab-content">
            {activeTab === 'product-details' && (
              <div className="product-details-tab">
                <p>{selectedProduct.detailedDescription || "Detailed product information goes here. Crafted from premium quality materials, this product offers exceptional comfort and durability."}</p>
                <ul>
                  <li>100% Premium quality materials</li>
                  <li>Machine wash cold</li>
                  <li>Premium quality finish</li>
                  <li>Regular fit</li>
                </ul>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div className="reviews-tab">
                <div className="reviews-header">
                  <h3>All Reviews ({allReviews.length})</h3>
                  <div className="reviews-sort">
                    <select value={reviewSort} onChange={(e) => setReviewSort(e.target.value)}>
                      <option value="latest">Latest</option>
                      <option value="highest">Highest Rating</option>
                      <option value="lowest">Lowest Rating</option>
                    </select>
                    <button className="write-review-btn">Write a review</button>
                  </div>
                </div>
                <div className="reviews-list">
                  {sortedReviews.slice(0, visibleReviews).map(review => (
                    <div key={review.id} className="review-card">
                      <div className="review-header">
                        <div className="reviewer-info">
                          <h4>{review.name}</h4>
                          <div className="review-rating">
                            {'★'.repeat(Math.floor(review.rating))}{'☆'.repeat(5 - Math.floor(review.rating))}
                            <span className="rating-number">{review.rating}/5</span>
                          </div>
                        </div>
                        <span className="review-date">{review.date}</span>
                      </div>
                      <p className="review-text">{review.text}</p>
                    </div>
                  ))}
                </div>
                {visibleReviews < sortedReviews.length && (
                  <button onClick={loadMoreReviews} className="load-more-btn">Load More Reviews</button>
                )}
              </div>
            )}
            
            {activeTab === 'faqs' && (
              <div className="faqs-tab">
                <div className="faq-item">
                  <h4>What is the return policy?</h4>
                  <p>We offer 30-day returns on all unworn items with original tags attached.</p>
                </div>
                <div className="faq-item">
                  <h4>How do I care for this product?</h4>
                  <p>Machine wash cold with like colors, tumble dry low, do not bleach.</p>
                </div>
                <div className="faq-item">
                  <h4>What sizes are available?</h4>
                  <p>Small, Medium, Large, and X-Large are available.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Similar Products Section */}
        <div className="similar-products">
          <h2>YOU MIGHT ALSO LIKE</h2>
          {similarProducts.length > 0 ? (
            <div className="similar-grid">
              {similarProducts.map(product => (
                <div key={product.id} className="similar-card" onClick={() => handleSimilarProductClick(product.id)}>
                  <img src={product.image} alt={product.name} />
                  <h4>{product.name}</h4>
                  <div className="price-row">
                    <span className="price">${product.price}</span>
                    {product.originalPrice && product.originalPrice !== product.price && (
                      <>
                        <span className="original-price">${product.originalPrice}</span>
                        {product.discount && <span className="discount">-{product.discount}%</span>}
                      </>
                    )}
                  </div>
                  {product.category && <div className="category-badge">{product.category}</div>}
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p>Loading similar products...</p>
            </div>
          )}
        </div>
      </div>

      {/* Order Modal */}
      {showOrderModal && (
        <div className="modal-overlay" onClick={() => setShowOrderModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
            <div className="modal-header">
              <h2>Complete Your Order</h2>
              <button className="modal-close" onClick={() => setShowOrderModal(false)}>&times;</button>
            </div>
            
            {savedAddresses.length > 0 && (
              <div className="saved-addresses">
                <h4>Select Saved Address</h4>
                <div className="address-list">
                  {savedAddresses.map(addr => (
                    <div 
                      key={addr.id} 
                      className={`address-card ${selectedAddressId === addr.id ? 'selected' : ''}`}
                      onClick={() => handleAddressSelect(addr.id)}
                    >
                      <div className="address-radio">
                        <input 
                          type="radio" 
                          checked={selectedAddressId === addr.id}
                          onChange={() => handleAddressSelect(addr.id)}
                        />
                      </div>
                      <div className="address-details">
                        <p><strong>{addr.fullName}</strong> {addr.isDefault && <span className="default-badge">Default</span>}</p>
                        <p>{addr.address}</p>
                        <p>{addr.city}, {addr.state} {addr.zipCode}</p>
                        <p>📞 {addr.phone} | 📧 {addr.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button 
                  type="button" 
                  className="new-address-btn"
                  onClick={() => {
                    setSelectedAddressId(null);
                    setOrderDetails({
                      fullName: '',
                      email: '',
                      address: '',
                      city: '',
                      state: '',
                      zipCode: '',
                      phone: '',
                      paymentMethod: 'cod'
                    });
                  }}
                >
                  + Use New Address
                </button>
              </div>
            )}
            
            <form onSubmit={async (e) => {
              await handleOrderSubmit(e);
              await saveAddressAfterOrder();
            }}>
              <input type="text" name="fullName" placeholder="Full Name" required onChange={handleOrderChange} value={orderDetails.fullName} />
              <input type="email" name="email" placeholder="Email Address" required onChange={handleOrderChange} value={orderDetails.email} />
              <input type="text" name="address" placeholder="Street Address" required onChange={handleOrderChange} value={orderDetails.address} />
              <div className="form-row">
                <input type="text" name="city" placeholder="City" required onChange={handleOrderChange} value={orderDetails.city} />
                <input type="text" name="state" placeholder="State" required onChange={handleOrderChange} value={orderDetails.state} />
                <input type="text" name="zipCode" placeholder="Zip Code" required onChange={handleOrderChange} value={orderDetails.zipCode} />
              </div>
              <input type="tel" name="phone" placeholder="Phone Number" required onChange={handleOrderChange} value={orderDetails.phone} />
              <select name="paymentMethod" onChange={handleOrderChange} value={orderDetails.paymentMethod}>
                <option value="cod">Cash on Delivery</option>
                <option value="card">Credit/Debit Card</option>
                <option value="upi">UPI</option>
              </select>
              
              <div className="order-summary">
                <h3>Order Summary</h3>
                <div className="summary-item"><span>{selectedProduct.title || selectedProduct.name}</span><span>${selectedProduct.price}</span></div>
                <div className="summary-item"><span>Quantity:</span><span>{quantity}</span></div>
                <div className="summary-item"><span>Size:</span><span>{selectedSize}</span></div>
                <div className="summary-item"><span>Color:</span><span>{selectedColor}</span></div>
                <div className="summary-total"><strong>Total:</strong><strong>${(selectedProduct.price * quantity).toFixed(2)}</strong></div>
              </div>
              
              <button type="submit" className="confirm-order-btn">Place Order</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;