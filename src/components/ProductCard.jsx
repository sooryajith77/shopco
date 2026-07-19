// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { addToCart } from '../redux/slices/cartSlice';

// const ProductCard = ({ product }) => {
//   const dispatch = useDispatch();

//   const handleAddToCart = () => {
//     dispatch(addToCart(product));
//   };

//   return (
//     <div className="product-card">
//       <Link to={`/product/${product.id}`}>
//         <div className="product-image">
//           <img src={product.image} alt={product.title} />
//         </div>
//         <h3 className="product-title">{product.title}</h3>
//         <div className="product-rating">
//           <span className="stars">★★★★★</span>
//           <span className="rating-count">({product.rating?.count || 0})</span>
//         </div>
//         <div className="product-price">
//           <span className="current-price">${product.price}</span>
//           {product.oldPrice && (
//             <>
//               <span className="old-price">${product.oldPrice}</span>
//               <span className="discount">-{product.discount}%</span>
//             </>
//           )}
//         </div>
//       </Link>
//       <button onClick={handleAddToCart} className="add-to-cart-btn">
//         Add to Cart
//       </button>

//       <style jsx>{`
//         .product-card {
//           background: white;
//           border-radius: 12px;
//           overflow: hidden;
//           transition: transform 0.3s ease;
//           text-decoration: none;
//           color: #333;
//         }
//         .product-card:hover {
//           transform: translateY(-5px);
//         }
//         .product-image {
//           width: 100%;
//           height: 300px;
//           overflow: hidden;
//           background: #f5f5f5;
//         }
//         .product-image img {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//         }
//         .product-title {
//           padding: 15px 15px 5px;
//           font-size: 16px;
//           font-weight: 600;
//           margin: 0;
//         }
//         .product-rating {
//           padding: 0 15px;
//           display: flex;
//           align-items: center;
//           gap: 5px;
//         }
//         .stars {
//           color: #ffc107;
//         }
//         .rating-count {
//           color: #666;
//           font-size: 14px;
//         }
//         .product-price {
//           padding: 5px 15px 15px;
//           display: flex;
//           align-items: center;
//           gap: 10px;
//         }
//         .current-price {
//           font-size: 20px;
//           font-weight: 700;
//           color: #000;
//         }
//         .old-price {
//           text-decoration: line-through;
//           color: #999;
//           font-size: 14px;
//         }
//         .discount {
//           color: #ff4444;
//           font-weight: 600;
//         }
//         a {
//           text-decoration: none;
//           color: inherit;
//         }
//         .add-to-cart-btn {
//           width: calc(100% - 30px);
//           margin: 0 15px 15px;
//           padding: 10px;
//           background: #000;
//           color: white;
//           border: none;
//           border-radius: 8px;
//           cursor: pointer;
//           font-weight: 600;
//           transition: background 0.3s;
//         }
//         .add-to-cart-btn:hover {
//           background: #333;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ProductCard;











import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../redux/slices/wishlistSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { items: wishlistItems } = useSelector((state) => state.wishlist || { items: [] });
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  const [isInWishlist, setIsInWishlist] = useState(false);

  // Check if product is in wishlist
  useEffect(() => {
    if (wishlistItems && product) {
      const exists = wishlistItems.some(item => item.id === product.id);
      setIsInWishlist(exists);
    }
  }, [wishlistItems, product]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      if (window.confirm('Please login to add items to your wishlist. Would you like to login now?')) {
        window.location.href = '/login';
      }
      return;
    }

    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image-wrapper">
          <div className="product-image">
            <img src={product.image} alt={product.title} />
          </div>
          {/* Wishlist Button */}
          <button 
            className={`wishlist-btn ${isInWishlist ? 'active' : ''}`}
            onClick={handleWishlistToggle}
            aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <svg 
              viewBox="0 0 24 24" 
              fill={isInWishlist ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>
        <h3 className="product-title">{product.title}</h3>
        <div className="product-rating">
          <span className="stars">★★★★★</span>
          <span className="rating-count">({product.rating?.count || 0})</span>
        </div>
        <div className="product-price">
          <span className="current-price">${product.price}</span>
          {product.oldPrice && (
            <>
              <span className="old-price">${product.oldPrice}</span>
              <span className="discount">-{product.discount}%</span>
            </>
          )}
        </div>
      </Link>
      <button onClick={handleAddToCart} className="add-to-cart-btn">
        Add to Cart
      </button>

      <style jsx>{`
        .product-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          text-decoration: none;
          color: #333;
          position: relative;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.12);
        }
        .product-link {
          text-decoration: none;
          color: inherit;
          display: block;
        }
        .product-image-wrapper {
          position: relative;
          width: 100%;
          height: 300px;
          overflow: hidden;
          background: #f5f5f5;
        }
        .product-image {
          width: 100%;
          height: 100%;
        }
        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        .product-card:hover .product-image img {
          transform: scale(1.05);
        }
        
        /* Wishlist Button Styles */
        .wishlist-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: white;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          transition: all 0.3s ease;
          z-index: 10;
          padding: 8px;
        }
        .wishlist-btn svg {
          width: 22px;
          height: 22px;
          transition: all 0.3s ease;
        }
        .wishlist-btn {
          color: #666;
        }
        .wishlist-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        .wishlist-btn.active {
          color: #ff3b30;
        }
        .wishlist-btn.active svg {
          fill: #ff3b30;
        }
        .wishlist-btn.active:hover {
          transform: scale(1.1);
          color: #d32f2f;
        }
        
        .product-title {
          padding: 15px 15px 5px;
          font-size: 16px;
          font-weight: 600;
          margin: 0;
          line-height: 1.3;
        }
        .product-rating {
          padding: 0 15px;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .stars {
          color: #ffc107;
          font-size: 14px;
        }
        .rating-count {
          color: #666;
          font-size: 14px;
        }
        .product-price {
          padding: 5px 15px 15px;
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .current-price {
          font-size: 20px;
          font-weight: 700;
          color: #000;
        }
        .old-price {
          text-decoration: line-through;
          color: #999;
          font-size: 14px;
        }
        .discount {
          color: #ff4444;
          font-weight: 600;
          font-size: 14px;
        }
        .add-to-cart-btn {
          width: calc(100% - 30px);
          margin: 0 15px 15px;
          padding: 10px;
          background: #000;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        .add-to-cart-btn:hover {
          background: #333;
          transform: translateY(-2px);
        }
        .add-to-cart-btn:active {
          transform: scale(0.98);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .product-image-wrapper {
            height: 200px;
          }
          .wishlist-btn {
            width: 34px;
            height: 34px;
            top: 8px;
            right: 8px;
            padding: 6px;
          }
          .wishlist-btn svg {
            width: 18px;
            height: 18px;
          }
          .product-title {
            font-size: 14px;
          }
          .current-price {
            font-size: 17px;
          }
        }

        @media (max-width: 480px) {
          .product-image-wrapper {
            height: 160px;
          }
          .wishlist-btn {
            width: 30px;
            height: 30px;
            top: 6px;
            right: 6px;
            padding: 5px;
          }
          .wishlist-btn svg {
            width: 16px;
            height: 16px;
          }
          .product-title {
            font-size: 13px;
            padding: 10px 10px 5px;
          }
          .product-rating {
            padding: 0 10px;
          }
          .product-price {
            padding: 5px 10px 10px;
            gap: 6px;
          }
          .current-price {
            font-size: 15px;
          }
          .add-to-cart-btn {
            width: calc(100% - 20px);
            margin: 0 10px 10px;
            padding: 8px;
            font-size: 13px;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductCard;