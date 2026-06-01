import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, updateQuantity } from '../redux/slices/cartSlice';
import Footer from '../components/Footer'; 

const Cart = () => {
  const dispatch = useDispatch();
  const { items, totalAmount } = useSelector((state) => state.cart);
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const discountRate = 0.20; // 20% discount
  const deliveryFee = 15;

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleApplyPromo = () => {
    if (promoCode.trim().toLowerCase() === 'save20') {
      setDiscountApplied(true);
    } else {
      alert('Invalid promo code. Try "SAVE20"');
    }
  };

  // Calculate totals with discount
  const subtotal = totalAmount;
  const discountAmount = discountApplied ? subtotal * discountRate : 0;
  const total = subtotal - discountAmount + deliveryFee;

  if (items.length === 0) {
    return (
      <>
        <div className="cart-page">
          <div className="container">
            <div className="breadcrumb">
              <Link to="/">Home</Link> <span>/</span> <span><strong>Cart</strong></span>
            </div>
            <div className="empty-cart">
              <h2>Your cart is empty</h2>
              <p>Add some style to your bag ✨</p>
              <Link to="/products" className="btn-primary">Continue Shopping</Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="cart-page">
        <div className="container">
          {/* Breadcrumb */}
          <div className="breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span><strong>Cart</strong></span>
          </div>

          <h1>YOUR CART</h1>

          <div className="cart-content">
            {/* Cart Items Section */}
            <div className="cart-items">
              {items.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="item-details">
                    <h3>{item.title}</h3>
                    <div className="item-attributes">
                      <span>Size: {item.size || 'Large'}</span>
                      <span>Color: {item.color || 'White'}</span>
                    </div>
                    <div className="item-price">${item.price}</div>
                    <div className="item-actions">
                      <div className="quantity-controls">
                        <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                      </div>
                      <button className="remove-btn" onClick={() => handleRemove(item.id)}>Remove</button>
                    </div>
                  </div>
                  <div className="item-total">
                    <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary Section */}
            <div className="cart-summary">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discountApplied && (
                <div className="summary-row discount">
                  <span>Discount (-20%)</span>
                  <span className="discount-amount">-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="summary-row">
                <span>Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              {/* Promo Code Input */}
              <div className="promo-section">
                <div className="promo-input-group">
                  <input
                    type="text"
                    placeholder="Add promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="promo-input"
                  />
                  <button onClick={handleApplyPromo} className="apply-btn">Apply</button>
                </div>
                {discountApplied && (
                  <div className="promo-success">
                    ✓ Promo code applied! 20% discount
                  </div>
                )}
              </div>

              <button className="checkout-btn">Proceed to Checkout</button>
            </div>
          </div>
        </div>
      </div>

      {/* Imported Footer Component */}
     

      <style jsx>{`
        .cart-page {
          padding: 40px 0 60px;
          background: #ffffff;
        }

        .container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .breadcrumb {
          margin-bottom: 24px;
          font-size: 14px;
          color: #666;
        }

        .breadcrumb a {
          color: #666;
          text-decoration: none;
        }

        .breadcrumb a:hover {
          color: #000;
        }

        .breadcrumb span {
          margin: 0 8px;
        }

        h1 {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 32px;
          letter-spacing: -0.5px;
        }

        .cart-content {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 40px;
        }

        /* Cart Items */
        .cart-items {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .cart-item {
          display: flex;
          gap: 20px;
          padding: 20px;
          background: #fff;
          border: 1px solid #e8e8ec;
          border-radius: 20px;
          transition: all 0.2s ease;
        }

        .cart-item:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .item-image {
          width: 120px;
          height: 120px;
          background: #f5f5f7;
          border-radius: 16px;
          overflow: hidden;
          flex-shrink: 0;
        }

        .item-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .item-details {
          flex: 1;
        }

        .item-details h3 {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .item-attributes {
          display: flex;
          gap: 16px;
          font-size: 14px;
          color: #666;
          margin-bottom: 8px;
        }

        .item-price {
          font-size: 18px;
          font-weight: 700;
          color: #000;
          margin-bottom: 12px;
        }

        .item-actions {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .quantity-controls {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #f5f5f7;
          border-radius: 40px;
          padding: 4px;
        }

        .quantity-controls button {
          width: 32px;
          height: 32px;
          border: none;
          background: transparent;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          border-radius: 50%;
          transition: background 0.2s;
        }

        .quantity-controls button:hover {
          background: #e8e8ec;
        }

        .quantity-controls span {
          min-width: 32px;
          text-align: center;
          font-weight: 500;
        }

        .remove-btn {
          background: none;
          border: none;
          color: #e74c3c;
          font-size: 14px;
          cursor: pointer;
          padding: 6px 12px;
          border-radius: 20px;
          transition: all 0.2s;
        }

        .remove-btn:hover {
          background: #fee;
          color: #c0392b;
        }

        .item-total {
          text-align: right;
          font-size: 18px;
          font-weight: 700;
          min-width: 80px;
        }

        /* Order Summary */
        .cart-summary {
          background: #fafafc;
          border-radius: 20px;
          padding: 24px;
          border: 1px solid #e8e8ec;
          position: sticky;
          top: 100px;
          height: fit-content;
        }

        .cart-summary h3 {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 20px;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid #e8e8ec;
          font-size: 15px;
        }

        .summary-row.discount {
          color: #27ae60;
          border-bottom: 1px solid #e8e8ec;
        }

        .discount-amount {
          font-weight: 600;
        }

        .summary-row.total {
          border-top: 2px solid #e8e8ec;
          border-bottom: none;
          font-size: 18px;
          font-weight: 800;
          padding-top: 16px;
          margin-top: 4px;
        }

        .promo-section {
          margin: 20px 0;
        }

        .promo-input-group {
          display: flex;
          gap: 12px;
        }

        .promo-input {
          flex: 1;
          padding: 12px 16px;
          border: 1px solid #e0e0e6;
          border-radius: 40px;
          font-size: 14px;
          font-family: 'Inter', sans-serif;
          outline: none;
          transition: border 0.2s;
        }

        .promo-input:focus {
          border-color: #000;
        }

        .apply-btn {
          padding: 0 24px;
          background: #1a1a2e;
          color: white;
          border: none;
          border-radius: 40px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .apply-btn:hover {
          background: #000;
        }

        .promo-success {
          margin-top: 12px;
          font-size: 13px;
          color: #27ae60;
          background: #e8f8ef;
          padding: 8px 12px;
          border-radius: 30px;
          text-align: center;
        }

        .checkout-btn {
          width: 100%;
          padding: 14px;
          background: #1a1a2e;
          color: white;
          border: none;
          border-radius: 40px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 16px;
          transition: all 0.2s;
        }

        .checkout-btn:hover {
          background: #000;
          transform: translateY(-1px);
        }

        /* Empty Cart */
        .empty-cart {
          text-align: center;
          padding: 80px 20px;
          background: #fefefe;
          border-radius: 24px;
        }

        .empty-cart h2 {
          font-size: 28px;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .empty-cart p {
          color: #666;
          margin-bottom: 24px;
        }

        .btn-primary {
          display: inline-block;
          padding: 12px 32px;
          background: #1a1a2e;
          color: white;
          text-decoration: none;
          border-radius: 40px;
          font-weight: 600;
          transition: background 0.2s;
        }

        .btn-primary:hover {
          background: #000;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .cart-content {
            grid-template-columns: 1fr;
          }

          .cart-summary {
            position: static;
          }
        }

        @media (max-width: 600px) {
          .cart-item {
            flex-direction: column;
            text-align: center;
          }

          .item-image {
            margin: 0 auto;
          }

          .item-total {
            text-align: center;
          }

          .item-actions {
            justify-content: center;
          }

          .item-attributes {
            justify-content: center;
          }

          h1 {
            font-size: 24px;
          }
        }
      `}</style>
    </>
  );
};

export default Cart;