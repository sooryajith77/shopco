import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <div className="product-image">
          <img src={product.image} alt={product.title} />
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
          transition: transform 0.3s ease;
          text-decoration: none;
          color: #333;
        }
        .product-card:hover {
          transform: translateY(-5px);
        }
        .product-image {
          width: 100%;
          height: 300px;
          overflow: hidden;
          background: #f5f5f5;
        }
        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .product-title {
          padding: 15px 15px 5px;
          font-size: 16px;
          font-weight: 600;
          margin: 0;
        }
        .product-rating {
          padding: 0 15px;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .stars {
          color: #ffc107;
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
        }
        a {
          text-decoration: none;
          color: inherit;
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
          transition: background 0.3s;
        }
        .add-to-cart-btn:hover {
          background: #333;
        }
      `}</style>
    </div>
  );
};

export default ProductCard;