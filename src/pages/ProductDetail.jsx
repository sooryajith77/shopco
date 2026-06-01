// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProductById } from '../redux/slices/productSlice';
// import { addToCart } from '../redux/slices/cartSlice';
// import Loader from '../components/Loader';

// const ProductDetail = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const { selectedProduct, loading } = useSelector((state) => state.products);
//   const [selectedSize, setSelectedSize] = useState('Medium');
//   const [selectedColor, setSelectedColor] = useState('dark');
//   const [activeTab, setActiveTab] = useState('product-details');
//   const [visibleReviews, setVisibleReviews] = useState(4);
//   const [reviewSort, setReviewSort] = useState('latest'); // 'latest', 'highest', 'lowest'

//   useEffect(() => {
//     dispatch(fetchProductById(id));
//   }, [dispatch, id]);

//   const handleAddToCart = () => {
//     if (selectedProduct) {
//       dispatch(addToCart({ ...selectedProduct, selectedSize, selectedColor }));
//     }
//   };

//   const loadMoreReviews = () => {
//     setVisibleReviews(prev => prev + 3);
//   };

//   if (loading) return <Loader />;
//   if (!selectedProduct) return <div>Product not found</div>;

//   // Sample review data (in real app, this would come from API)
//   const allReviews = [
//     { id: 1, name: "Samantha D.", date: "Posted on August 14, 2023", rating: 4.5, text: "Absolutely love this shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail in its because my head is going to shit!" },
//     { id: 2, name: "Alex M.", date: "Posted on August 6, 2023", rating: 5, text: "The shirt exceeded my expectations! The cotton was vibrant and the print quality is top notch. Being a USLOL designer myself, I'm quite picky about aesthetics, and this t-shirt instantly gets a 'faultless up finish'." },
//     { id: 3, name: "Ethan R.", date: "Posted on August 16, 2023", rating: 5, text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalist yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt!" },
//     { id: 4, name: "Olivia P.", date: "Posted on August 17, 2023", rating: 5, text: "I'm LOVED this shirt! It looks super comfy and versatile. This t-shirt not only represents true pride in one's identity but also makes me feel confident in my own skin." },
//     { id: 5, name: "Liam K.", date: "Posted on August 18, 2023", rating: 5, text: "This t-shirt is a piece of contemporary art. The fabric is soft, and the design showcases various details that make it stand out. It's like wearing a piece of art that reflects my passion for bold designs and fashion." },
//     { id: 6, name: "Ava H.", date: "Posted on August 19, 2023", rating: 5, text: "I'm really impressed with how well-designed this shirt is! The color palette is beautiful, and the fit is perfect. I can't wait to wear this shirt again." }
//   ];

//   // Sort reviews based on selected option
//   const getSortedReviews = () => {
//     const sorted = [...allReviews];
//     switch(reviewSort) {
//       case 'highest':
//         return sorted.sort((a, b) => b.rating - a.rating);
//       case 'lowest':
//         return sorted.sort((a, b) => a.rating - b.rating);
//       case 'latest':
//       default:
//         return sorted.sort((a, b) => new Date(b.date.split(' ')[2]) - new Date(a.date.split(' ')[2]));
//     }
//   };

//   const sortedReviews = getSortedReviews();

//   const similarProducts = [
//     { id: 1, name: "Polo with Contrast Trims", price: 212, originalPrice: 242, discount: null, image: "/api/placeholder/200/200" },
//     { id: 2, name: "Gradient Graphic T-shirt", price: 145, originalPrice: 145, discount: null, image: "/api/placeholder/200/200" },
//     { id: 3, name: "Polo with Tipping Details", price: 180, originalPrice: 180, discount: null, image: "/api/placeholder/200/200" },
//     { id: 4, name: "Black Striped T-shirt", price: 120, originalPrice: 150, discount: 20, image: "/api/placeholder/200/200" }
//   ];

//   return (
//     <div className="product-detail-page">
//       {/* Breadcrumb */}
//       <div className="breadcrumb">
//         <div className="container">
//           <span>Shop</span> &gt; <span>Co Sale</span> &gt; <span>New Arrivals</span> &gt; <span>Brands</span>
//         </div>
//       </div>

//       {/* Main Product Section */}
//       <div className="container">
//         <div className="product-detail-content">
//           <div className="product-gallery">
//             <div className="main-image">
//               <img src={selectedProduct.image} alt={selectedProduct.title} />
//             </div>
//             <div className="thumbnail-list">
//               <div className={`thumbnail ${selectedColor === 'dark' ? 'active' : ''}`} onClick={() => setSelectedColor('dark')}>
//                 <img src={selectedProduct.image} alt="thumb 1" />
//               </div>
//               <div className={`thumbnail ${selectedColor === 'brown' ? 'active' : ''}`} onClick={() => setSelectedColor('brown')}>
//                 <img src={selectedProduct.image} alt="thumb 2" />
//               </div>
//               <div className={`thumbnail ${selectedColor === 'green' ? 'active' : ''}`} onClick={() => setSelectedColor('green')}>
//                 <img src={selectedProduct.image} alt="thumb 3" />
//               </div>
//             </div>
//           </div>
          
//           <div className="product-info">
//             <h1>ONE LIFE GRAPHIC T-SHIRT</h1>
//             <div className="rating">
//               <span className="stars">★★★★☆</span>
//               <span className="rating-value">4.5/5</span>
//             </div>
//             <div className="price-section">
//               <span className="current-price">$260</span>
//               <span className="original-price">$300</span>
//               <span className="discount-badge">-40%</span>
//             </div>
//             <p className="description">
//               The graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.
//             </p>
            
//             {/* Color Options */}
//             <div className="option-section">
//               <label>Slider Colors</label>
//               <div className="color-options">
//                 <button 
//                   className={`color-btn ${selectedColor === 'dark' ? 'active' : ''}`} 
//                   style={{ backgroundColor: '#2d2d2d' }}
//                   onClick={() => setSelectedColor('dark')}
//                 ></button>
//                 <button 
//                   className={`color-btn ${selectedColor === 'brown' ? 'active' : ''}`} 
//                   style={{ backgroundColor: '#8B4513' }}
//                   onClick={() => setSelectedColor('brown')}
//                 ></button>
//                 <button 
//                   className={`color-btn ${selectedColor === 'green' ? 'active' : ''}`} 
//                   style={{ backgroundColor: '#4a6741' }}
//                   onClick={() => setSelectedColor('green')}
//                 ></button>
//               </div>
//             </div>

//             {/* Size Options */}
//             <div className="option-section">
//               <label>Size</label>
//               <div className="size-options">
//                 {['Small', 'Medium', 'Large', 'X-Large'].map(size => (
//                   <button 
//                     key={size}
//                     className={`size-btn ${selectedSize === size ? 'active' : ''}`}
//                     onClick={() => setSelectedSize(size)}
//                   >
//                     {size}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <button onClick={handleAddToCart} className="add-to-cart-btn">
//               Add to Cart
//             </button><br></br>< br></br>
//             <button onClick={() => handleBuy(product)} className="buy-btn">
//   Buy Now
// </button>
//           </div>
//         </div>

//         {/* Tabs Section */}
//         <div className="tabs-section">
//           <div className="tabs-header">
//             <button 
//               className={`tab-btn ${activeTab === 'product-details' ? 'active' : ''}`}
//               onClick={() => setActiveTab('product-details')}
//             >
//               Product Details
//             </button>
//             <button 
//               className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
//               onClick={() => setActiveTab('reviews')}
//             >
//               Rating & Reviews
//             </button>
//             <button 
//               className={`tab-btn ${activeTab === 'faqs' ? 'active' : ''}`}
//               onClick={() => setActiveTab('faqs')}
//             >
//               FAQs
//             </button>
//           </div>
          
//           <div className="tab-content">
//             {activeTab === 'product-details' && (
//               <div className="product-details-tab">
//                 <p>Detailed product information goes here. Crafted from premium quality materials, this t-shirt offers exceptional comfort and durability. The unique graphic design makes it a standout piece in any wardrobe.</p>
//                 <ul>
//                   <li>100% Cotton fabric</li>
//                   <li>Machine wash cold</li>
//                   <li>Premium quality print</li>
//                   <li>Regular fit</li>
//                 </ul>
//               </div>
//             )}
            
//             {activeTab === 'reviews' && (
//               <div className="reviews-tab">
//                 <div className="reviews-header">
//                   <h3>All Reviews ({allReviews.length})</h3>
//                   {/* Sort Dropdown - Right side */}
//                   <div className="reviews-sort">
//                     <select value={reviewSort} onChange={(e) => setReviewSort(e.target.value)}>
//                       <option value="latest">Latest</option>
//                       <option value="highest">Highest Rating</option>
//                       <option value="lowest">Lowest Rating</option>
                      
//                     </select>
//                     <b className='review'>wite a review</b>
                    
//                   </div>
//                 </div>
//                 <div className="reviews-list">
//                   {sortedReviews.slice(0, visibleReviews).map(review => (
//                     <div key={review.id} className="review-card">
//                       <div className="review-header">
//                         <div className="reviewer-info">
//                           <h4>{review.name}</h4>
//                           <div className="review-rating">
//                             {'★'.repeat(Math.floor(review.rating))}
//                             {'☆'.repeat(5 - Math.floor(review.rating))}
//                             <span className="rating-number">{review.rating}/5</span>
//                           </div>
//                         </div>
//                         <span className="review-date">{review.date}</span>
//                       </div>
//                       <p className="review-text">{review.text}</p>
//                     </div>
//                   ))}
//                 </div>
//                 {visibleReviews < sortedReviews.length && (
//                   <button onClick={loadMoreReviews} className="load-more-btn">
//                     Load More Reviews
//                   </button>
//                 )}
//               </div>
//             )}
            
//             {activeTab === 'faqs' && (
//               <div className="faqs-tab">
//                 <div className="faq-item">
//                   <h4>What is the return policy?</h4>
//                   <p>We offer 30-day returns on all unworn items with original tags attached.</p>
//                 </div>
//                 <div className="faq-item">
//                   <h4>How do I care for this shirt?</h4>
//                   <p>Machine wash cold with like colors, tumble dry low, do not bleach.</p>
//                 </div>
//                 <div className="faq-item">
//                   <h4>What sizes are available?</h4>
//                   <p>Small, Medium, Large, and X-Large are available.</p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* You Might Also Like */}
//         <div className="similar-products">
//           <h2>YOU MIGHT ALSO LIKE</h2>
//           <div className="similar-grid">
//             {similarProducts.map(product => (
//               <div key={product.id} className="similar-card">
//                 <img src={product.image} alt={product.name} />
//                 <h4>{product.name}</h4>
//                 <div className="price-row">
//                   <span className="price">${product.price}</span>
//                   {product.originalPrice !== product.price && (
//                     <>
//                       <span className="original-price">${product.originalPrice}</span>
//                       {product.discount && <span className="discount">-{product.discount}%</span>}
//                     </>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Newsletter Section */}
//         <div className="newsletter-section">
//           <h3>STAY UPDATED ABOUT OUR LATEST OFFERS</h3>
//           <div className="newsletter-form">
//             <input type="email" placeholder="Enter your email address" />
//             <button>Subscribe</button>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         .product-detail-page {
//           font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
//           background: white;
//         }

//         .container {
//           max-width: 1200px;
//           margin: 0 auto;
//           padding: 0 20px;
//         }

//         .breadcrumb {
//           padding: 20px 0;
//           color: #666;
//           font-size: 14px;
//           border-bottom: 1px solid #eee;
//         }

//         .product-detail-content {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 60px;
//           padding: 40px 0;
//         }

//         .product-gallery {
//           display: flex;
//           flex-direction: column;
//           gap: 20px;
//         }

//         .main-image img {
//           width: 100%;
//           height: auto;
//           border-radius: 20px;
//           background: #f5f5f5;
//         }

//         .thumbnail-list {
//           display: flex;
//           gap: 15px;
//         }

//         .thumbnail {
//           width: 80px;
//           height: 80px;
//           border-radius: 12px;
//           overflow: hidden;
//           cursor: pointer;
//           border: 2px solid transparent;
//         }

//         .thumbnail.active {
//           border-color: #000;
//         }

//         .thumbnail img {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//         }
// .review{
//           background-color: black;
// color:white;
// padding:5px;
// border-radius:20px
// }
//         .product-info h1 {
//           font-size: 32px;
//           margin-bottom: 15px;
//         }

//         .rating {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           margin-bottom: 20px;
//         }

//         .stars {
//           color: #ffc107;
//           font-size: 18px;
//         }

//         .rating-value {
//           color: #666;
//         }

//         .price-section {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//           margin-bottom: 20px;
//         }

//         .current-price {
//           font-size: 28px;
//           font-weight: bold;
//         }

//         .original-price {
//           font-size: 20px;
//           color: #999;
//           text-decoration: line-through;
//         }

//         .discount-badge {
//           background: #ff6b6b;
//           color: white;
//           padding: 4px 10px;
//           border-radius: 20px;
//           font-size: 14px;
//           font-weight: bold;
//         }

//         .description {
//           color: #666;
//           line-height: 1.6;
//           margin-bottom: 25px;
//         }

//         .option-section {
//           margin-bottom: 25px;
//         }

//         .option-section label {
//           display: block;
//           font-weight: 500;
//           margin-bottom: 12px;
//           color: #333;
//         }

//         .color-options {
//           display: flex;
//           gap: 12px;
//         }

//         .color-btn {
//           width: 36px;
//           height: 36px;
//           border-radius: 50%;
//           border: 2px solid #ddd;
//           cursor: pointer;
//           transition: all 0.2s;
//         }

//         .color-btn.active {
//           border-color: #000;
//           box-shadow: 0 0 0 2px white, 0 0 0 4px #000;
//         }

//         .size-options {
//           display: flex;
//           gap: 12px;
//           flex-wrap: wrap;
//         }

//         .size-btn {
//           padding: 10px 24px;
//           border: 1px solid #ddd;
//           background: white;
//           border-radius: 30px;
//           cursor: pointer;
//           transition: all 0.2s;
//         }

//         .size-btn.active {
//           background: #000;
//           color: white;
//           border-color: #000;
//         }

//         .add-to-cart-btn {
//           width: 100%;
//           padding: 16px;
//           background: #000;
//           color: white;
//           border: none;
//           border-radius: 30px;
//           font-size: 16px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: background 0.2s;
//         }

//         .buy-btn {
//           width: 100%;
//           padding: 16px;
//           background: #ebee0a;
//           color: white;
//           border: none;
//           border-radius: 30px;
//           font-size: 16px;
//           font-weight: 600;
//           cursor: pointer;
//           transition: background 0.2s;
//         }

//         .buy-btn:hover {
//           background: #ddbf14;
//         }
//         .add-to-cart-btn:hover {
//           background: #333333;
//         }

//         .tabs-section {
//           margin: 40px 0;
//           border-top: 1px solid #eee;
//           border-bottom: 1px solid #eee;
//         }

//         .tabs-header {
//           display: flex;
//           gap: 40px;
//           padding: 20px 0;
//           border-bottom: 1px solid #eee;
//         }

//         .tab-btn {
//           background: none;
//           border: none;
//           font-size: 16px;
//           font-weight: 500;
//           cursor: pointer;
//           padding: 8px 0;
//           color: #666;
//           position: relative;
//         }

//         .tab-btn.active {
//           color: #000;
//         }

//         .tab-btn.active::after {
//           content: '';
//           position: absolute;
//           bottom: -21px;
//           left: 0;
//           right: 0;
//           height: 2px;
//           background: #000;
//         }

//         .tab-content {
//           padding: 30px 0;
//         }

//         .reviews-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 24px;
//           flex-wrap: wrap;
//           gap: 16px;
//         }

//         .reviews-header h3 {
//           margin: 0;
//         }

//         .reviews-sort select {
//           padding: 8px 16px;
//           border: 1px solid #ddd;
//           border-radius: 8px;
//           background: white;
//           font-size: 14px;
//           cursor: pointer;
//           outline: none;
//         }

//         .reviews-sort select:hover {
//           border-color: #999;
//         }

//         .reviews-list {
//           display: flex;
//           flex-direction: column;
//           gap: 24px;
//         }

//         .review-card {
//           padding: 20px;
//           border: 1px solid #eee;
//           border-radius: 16px;
//           transition: box-shadow 0.2s;
//         }

//         .review-card:hover {
//           box-shadow: 0 2px 8px rgba(0,0,0,0.05);
//         }

//         .review-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: flex-start;
//           flex-wrap: wrap;
//           gap: 12px;
//           margin-bottom: 12px;
//         }

//         .reviewer-info h4 {
//           margin: 0 0 5px 0;
//           font-size: 16px;
//         }

//         .review-rating {
//           color: #ffc107;
//           font-size: 14px;
//         }

//         .rating-number {
//           color: #666;
//           margin-left: 8px;
//           font-size: 12px;
//         }

//         .review-date {
//           font-size: 12px;
//           color: #999;
//         }

//         .review-text {
//           margin: 0;
//           line-height: 1.5;
//           color: #444;
//         }

//         .load-more-btn {
//           display: block;
//           width: 200px;
//           margin: 30px auto 0;
//           padding: 12px;
//           background: white;
//           border: 1px solid #ddd;
//           border-radius: 30px;
//           cursor: pointer;
//           transition: all 0.2s;
//         }

//         .load-more-btn:hover {
//           background: #f5f5f5;
//           border-color: #ccc;
//         }

//         .similar-products {
//           margin: 60px 0;
//         }

//         .similar-products h2 {
//           text-align: center;
//           margin-bottom: 40px;
//         }

//         .similar-grid {
//           display: grid;
//           grid-template-columns: repeat(4, 1fr);
//           gap: 20px;
//         }

//         .similar-card {
//           text-align: center;
//           cursor: pointer;
//           transition: transform 0.2s;
//         }

//         .similar-card:hover {
//           transform: translateY(-4px);
//         }

//         .similar-card img {
//           width: 100%;
//           border-radius: 16px;
//           background: #f5f5f5;
//           margin-bottom: 12px;
//         }

//         .similar-card h4 {
//           margin: 10px 0;
//           font-size: 14px;
//         }

//         .price-row {
//           display: flex;
//           justify-content: center;
//           gap: 10px;
//           align-items: center;
//         }

//         .price-row .price {
//           font-weight: 600;
//         }

//         .price-row .original-price {
//           font-size: 14px;
//           color: #999;
//           text-decoration: line-through;
//         }

//         .price-row .discount {
//           color: #ff6b6b;
//           font-size: 12px;
//         }

//         .newsletter-section {
//           background: #f5f5f5;
//           border-radius: 20px;
//           padding: 40px;
//           text-align: center;
//           margin: 60px 0;
//         }

//         .newsletter-section h3 {
//           margin-bottom: 20px;
//         }

//         .newsletter-form {
//           display: flex;
//           gap: 12px;
//           justify-content: center;
//         }

//         .newsletter-form input {
//           padding: 14px 20px;
//           border: 1px solid #ddd;
//           border-radius: 30px;
//           width: 300px;
//           outline: none;
//         }

//         .newsletter-form input:focus {
//           border-color: #000;
//         }

//         .newsletter-form button {
//           padding: 14px 30px;
//           background: #000;
//           color: white;
//           border: none;
//           border-radius: 30px;
//           cursor: pointer;
//           transition: background 0.2s;
//         }

//         .newsletter-form button:hover {
//           background: #333;
//         }

//         @media (max-width: 768px) {
//           .product-detail-content {
//             grid-template-columns: 1fr;
//             gap: 30px;
//           }
//           .similar-grid {
//             grid-template-columns: repeat(2, 1fr);
//           }
//           .newsletter-form {
//             flex-direction: column;
//             align-items: center;
//           }
//           .tabs-header {
//             gap: 20px;
//           }
//           .reviews-header {
//             flex-direction: column;
//             align-items: flex-start;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ProductDetail;










// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProductById } from '../redux/slices/productSlice';
// import { addToCart } from '../redux/slices/cartSlice';
// import { createOrder } from '../redux/slices/orderSlice';
// import Loader from '../components/Loader';
// import '../styles/ProductDetail.css';

// const ProductDetail = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const { selectedProduct, loading, error } = useSelector((state) => state.products);
//   const [selectedSize, setSelectedSize] = useState('M');
//   const [selectedColor, setSelectedColor] = useState('');
//   const [activeTab, setActiveTab] = useState('product-details');
//   const [visibleReviews, setVisibleReviews] = useState(4);
//   const [reviewSort, setReviewSort] = useState('latest');
//   const [showOrderModal, setShowOrderModal] = useState(false);
//   const [quantity, setQuantity] = useState(1);
//   const [orderDetails, setOrderDetails] = useState({
//     fullName: '',
//     email: '',
//     address: '',
//     city: '',
//     state: '',
//     zipCode: '',
//     phone: '',
//     paymentMethod: 'cod'
//   });

//   // Get available colors from product or use defaults
//   const availableColors = selectedProduct?.colors || ['Black', 'White', 'Gray'];
//   const availableSizes = selectedProduct?.sizes || ['XS', 'S', 'M', 'L', 'XL'];

//   useEffect(() => {
//     if (id) {
//       dispatch(fetchProductById(id));
//     }
//   }, [dispatch, id]);

//   useEffect(() => {
//     // Set default color when product loads
//     if (selectedProduct?.colors?.length > 0 && !selectedColor) {
//       setSelectedColor(selectedProduct.colors[0]);
//     }
//   }, [selectedProduct, selectedColor]);

//   const handleAddToCart = () => {
//     if (selectedProduct) {
//       const cartItem = {
//         ...selectedProduct,
//         selectedSize,
//         selectedColor,
//         quantity
//       };
//       dispatch(addToCart(cartItem));
//       alert('Added to cart successfully!');
//     }
//   };

//   const handleBuyNow = () => {
//     setShowOrderModal(true);
//   };

//   const handleOrderSubmit = async (e) => {
//     e.preventDefault();
    
//     const orderData = {
//       ...orderDetails,
//       productId: selectedProduct.id,
//       productName: selectedProduct.name || selectedProduct.title,
//       productImage: selectedProduct.image,
//       size: selectedSize,
//       color: selectedColor,
//       quantity: quantity,
//       price: selectedProduct.price,
//       totalPrice: selectedProduct.price * quantity,
//       orderDate: new Date().toISOString(),
//       status: 'pending',
//       trackingId: 'TRK' + Math.floor(Math.random() * 1000000) + Date.now()
//     };
    
//     try {
//       await dispatch(createOrder(orderData)).unwrap();
//       setShowOrderModal(false);
//       // Reset form
//       setOrderDetails({
//         fullName: '',
//         email: '',
//         address: '',
//         city: '',
//         state: '',
//         zipCode: '',
//         phone: '',
//         paymentMethod: 'cod'
//       });
//       setQuantity(1);
//       alert(`Order placed successfully! Your tracking ID is: ${orderData.trackingId}\nYou can track your order in My Orders section.`);
//     } catch (error) {
//       alert('Error placing order. Please try again.');
//     }
//   };

//   const handleOrderChange = (e) => {
//     setOrderDetails({
//       ...orderDetails,
//       [e.target.name]: e.target.value
//     });
//   };

//   const incrementQuantity = () => {
//     if (quantity < (selectedProduct?.stock || 10)) {
//       setQuantity(prev => prev + 1);
//     }
//   };

//   const decrementQuantity = () => {
//     if (quantity > 1) {
//       setQuantity(prev => prev - 1);
//     }
//   };

//   if (loading) return <Loader />;
//   if (error) return <div className="error-container">Error: {error}</div>;
//   if (!selectedProduct) return <div className="not-found">Product not found</div>;

//   // Use product reviews if available, otherwise use sample data
//   const allReviews = selectedProduct?.reviews || [
//     { id: 1, userName: "Samantha D.", date: "2024-01-15", rating: 4.5, comment: "Absolutely love this product! The quality is amazing." },
//     { id: 2, userName: "Alex M.", date: "2024-01-10", rating: 5, comment: "Exceeded my expectations! Will definitely buy again." },
//     { id: 3, userName: "Ethan R.", date: "2024-01-05", rating: 4, comment: "Great product, fast shipping." }
//   ];

//   const getSortedReviews = () => {
//     const sorted = [...allReviews];
//     switch(reviewSort) {
//       case 'highest':
//         return sorted.sort((a, b) => b.rating - a.rating);
//       case 'lowest':
//         return sorted.sort((a, b) => a.rating - b.rating);
//       default:
//         return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
//     }
//   };

//   const sortedReviews = getSortedReviews();
//   const averageRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
//   const discount = selectedProduct.originalPrice ? 
//     Math.round(((selectedProduct.originalPrice - selectedProduct.price) / selectedProduct.originalPrice) * 100) : 0;

//   return (
//     <div className="product-detail-page">
//       {/* Breadcrumb */}
//       <div className="breadcrumb">
//         <div className="container">
//           <span>Home</span> &gt; 
//           <span>Shop</span> &gt; 
//           <span>{selectedProduct.category || 'Products'}</span> &gt; 
//           <span className="current">{selectedProduct.name || selectedProduct.title}</span>
//         </div>
//       </div>

//       <div className="container">
//         <div className="product-detail-content">
//           {/* Product Gallery */}
//           <div className="product-gallery">
//             <div className="main-image">
//               <img 
//                 src={selectedProduct.image || '/api/placeholder/500/500'} 
//                 alt={selectedProduct.name || selectedProduct.title}
//                 onError={(e) => { e.target.src = '/api/placeholder/500/500'; }}
//               />
//             </div>
//             {selectedProduct.images && selectedProduct.images.length > 0 && (
//               <div className="thumbnail-list">
//                 {selectedProduct.images.slice(0, 3).map((img, idx) => (
//                   <div key={idx} className="thumbnail">
//                     <img src={img} alt={`thumb ${idx + 1}`} />
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
          
//           {/* Product Info */}
//           <div className="product-info">
//             <h1>{selectedProduct.name || selectedProduct.title}</h1>
            
//             <div className="rating">
//               <span className="stars">
//                 {'★'.repeat(Math.floor(averageRating))}
//                 {'☆'.repeat(5 - Math.floor(averageRating))}
//               </span>
//               <span className="rating-value">{averageRating.toFixed(1)}/5</span>
//               <span className="review-count">({allReviews.length} reviews)</span>
//             </div>
            
//             <div className="price-section">
//               <span className="current-price">${selectedProduct.price}</span>
//               {selectedProduct.originalPrice && (
//                 <>
//                   <span className="original-price">${selectedProduct.originalPrice}</span>
//                   <span className="discount-badge">-{discount}%</span>
//                 </>
//               )}
//             </div>
            
//             <p className="description">
//               {selectedProduct.description || "Crafted from premium quality materials, this product offers exceptional comfort and durability."}
//             </p>
            
//             {/* Color Options */}
//             {availableColors.length > 0 && (
//               <div className="option-section">
//                 <label>Color: <span className="selected-value">{selectedColor}</span></label>
//                 <div className="color-options">
//                   {availableColors.map(color => (
//                     <button 
//                       key={color}
//                       className={`color-btn ${selectedColor === color ? 'active' : ''}`}
//                       style={{ backgroundColor: color.toLowerCase(), color: ['White', 'Yellow'].includes(color) ? '#000' : '#fff' }}
//                       onClick={() => setSelectedColor(color)}
//                       title={color}
//                     >
//                       {color}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Size Options */}
//             <div className="option-section">
//               <label>Size: <span className="selected-value">{selectedSize}</span></label>
//               <div className="size-options">
//                 {availableSizes.map(size => (
//                   <button 
//                     key={size}
//                     className={`size-btn ${selectedSize === size ? 'active' : ''}`}
//                     onClick={() => setSelectedSize(size)}
//                   >
//                     {size}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Quantity Selector */}
//             <div className="option-section">
//               <label>Quantity:</label>
//               <div className="quantity-selector">
//                 <button onClick={decrementQuantity} className="qty-btn">-</button>
//                 <span className="quantity">{quantity}</span>
//                 <button onClick={incrementQuantity} className="qty-btn">+</button>
//                 {selectedProduct.stock && (
//                   <span className="stock-info">{selectedProduct.stock} in stock</span>
//                 )}
//               </div>
//             </div>

//             <button onClick={handleAddToCart} className="add-to-cart-btn">
//               Add to Cart
//             </button>
//             <button onClick={handleBuyNow} className="buy-btn">
//               Buy Now
//             </button>
//           </div>
//         </div>

//         {/* Tabs Section */}
//         <div className="tabs-section">
//           <div className="tabs-header">
//             <button 
//               className={`tab-btn ${activeTab === 'product-details' ? 'active' : ''}`}
//               onClick={() => setActiveTab('product-details')}
//             >
//               Product Details
//             </button>
//             <button 
//               className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
//               onClick={() => setActiveTab('reviews')}
//             >
//               Reviews ({allReviews.length})
//             </button>
//             <button 
//               className={`tab-btn ${activeTab === 'faqs' ? 'active' : ''}`}
//               onClick={() => setActiveTab('faqs')}
//             >
//               FAQs
//             </button>
//           </div>
          
//           <div className="tab-content">
//             {activeTab === 'product-details' && (
//               <div className="product-details-tab">
//                 <p>{selectedProduct.detailedDescription || selectedProduct.description}</p>
//                 {selectedProduct.features && selectedProduct.features.length > 0 && (
//                   <>
//                     <h4>Features:</h4>
//                     <ul>
//                       {selectedProduct.features.map((feature, idx) => (
//                         <li key={idx}>{feature}</li>
//                       ))}
//                     </ul>
//                   </>
//                 )}
//                 <h4>Specifications:</h4>
//                 <ul>
//                   <li><strong>Material:</strong> {selectedProduct.material || 'Premium Quality'}</li>
//                   <li><strong>Care Instructions:</strong> {selectedProduct.careInstructions || 'Machine wash cold'}</li>
//                   <li><strong>Fit:</strong> {selectedProduct.fit || 'Regular fit'}</li>
//                 </ul>
//               </div>
//             )}
            
//             {activeTab === 'reviews' && (
//               <div className="reviews-tab">
//                 <div className="reviews-header">
//                   <h3>Customer Reviews</h3>
//                   <div className="reviews-sort">
//                     <select value={reviewSort} onChange={(e) => setReviewSort(e.target.value)}>
//                       <option value="latest">Latest</option>
//                       <option value="highest">Highest Rating</option>
//                       <option value="lowest">Lowest Rating</option>
//                     </select>
//                     <button className="write-review-btn">Write a Review</button>
//                   </div>
//                 </div>
//                 <div className="reviews-list">
//                   {sortedReviews.slice(0, visibleReviews).map(review => (
//                     <div key={review.id} className="review-card">
//                       <div className="review-header">
//                         <div className="reviewer-info">
//                           <h4>{review.userName}</h4>
//                           <div className="review-rating">
//                             {'★'.repeat(Math.floor(review.rating))}
//                             {'☆'.repeat(5 - Math.floor(review.rating))}
//                             <span className="rating-number">{review.rating}/5</span>
//                           </div>
//                         </div>
//                         <span className="review-date">{new Date(review.date).toLocaleDateString()}</span>
//                       </div>
//                       <p className="review-text">{review.comment}</p>
//                     </div>
//                   ))}
//                 </div>
//                 {visibleReviews < sortedReviews.length && (
//                   <button onClick={() => setVisibleReviews(prev => prev + 3)} className="load-more-btn">
//                     Load More Reviews
//                   </button>
//                 )}
//               </div>
//             )}
            
//             {activeTab === 'faqs' && (
//               <div className="faqs-tab">
//                 <div className="faq-item">
//                   <h4>What is your return policy?</h4>
//                   <p>We offer 30-day returns on all unworn items with original tags attached.</p>
//                 </div>
//                 <div className="faq-item">
//                   <h4>How long does shipping take?</h4>
//                   <p>Standard shipping takes 3-5 business days. Express shipping available at checkout.</p>
//                 </div>
//                 <div className="faq-item">
//                   <h4>How do I care for this product?</h4>
//                   <p>Machine wash cold with like colors, tumble dry low, do not bleach.</p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Order Modal */}
//       {showOrderModal && (
//         <div className="modal-overlay" onClick={() => setShowOrderModal(false)}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <div className="modal-header">
//               <h2>Complete Your Order</h2>
//               <button className="modal-close" onClick={() => setShowOrderModal(false)}>&times;</button>
//             </div>
            
//             <form onSubmit={handleOrderSubmit}>
//               <div className="form-row">
//                 <input 
//                   type="text" 
//                   name="fullName" 
//                   placeholder="Full Name" 
//                   required 
//                   onChange={handleOrderChange} 
//                   value={orderDetails.fullName} 
//                 />
//                 <input 
//                   type="email" 
//                   name="email" 
//                   placeholder="Email Address" 
//                   required 
//                   onChange={handleOrderChange} 
//                   value={orderDetails.email} 
//                 />
//               </div>
              
//               <input 
//                 type="text" 
//                 name="address" 
//                 placeholder="Street Address" 
//                 required 
//                 onChange={handleOrderChange} 
//                 value={orderDetails.address} 
//               />
              
//               <div className="form-row">
//                 <input 
//                   type="text" 
//                   name="city" 
//                   placeholder="City" 
//                   required 
//                   onChange={handleOrderChange} 
//                   value={orderDetails.city} 
//                 />
//                 <input 
//                   type="text" 
//                   name="state" 
//                   placeholder="State" 
//                   required 
//                   onChange={handleOrderChange} 
//                   value={orderDetails.state} 
//                 />
//                 <input 
//                   type="text" 
//                   name="zipCode" 
//                   placeholder="Zip Code" 
//                   required 
//                   onChange={handleOrderChange} 
//                   value={orderDetails.zipCode} 
//                 />
//               </div>
              
//               <input 
//                 type="tel" 
//                 name="phone" 
//                 placeholder="Phone Number" 
//                 required 
//                 onChange={handleOrderChange} 
//                 value={orderDetails.phone} 
//               />
              
//               <select name="paymentMethod" onChange={handleOrderChange} value={orderDetails.paymentMethod}>
//                 <option value="cod">Cash on Delivery</option>
//                 <option value="card">Credit/Debit Card</option>
//                 <option value="upi">UPI</option>
//               </select>
              
//               <div className="order-summary">
//                 <h3>Order Summary</h3>
//                 <div className="summary-item">
//                   <span>{selectedProduct.name || selectedProduct.title}</span>
//                   <span>${selectedProduct.price}</span>
//                 </div>
//                 <div className="summary-item">
//                   <span>Quantity:</span>
//                   <span>{quantity}</span>
//                 </div>
//                 <div className="summary-item">
//                   <span>Size:</span>
//                   <span>{selectedSize}</span>
//                 </div>
//                 <div className="summary-item">
//                   <span>Color:</span>
//                   <span>{selectedColor}</span>
//                 </div>
//                 <div className="summary-total">
//                   <strong>Total:</strong>
//                   <strong>${(selectedProduct.price * quantity).toFixed(2)}</strong>
//                 </div>
//               </div>
              
//               <button type="submit" className="confirm-order-btn">Place Order</button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductDetail;











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
  const { selectedProduct, loading } = useSelector((state) => state.products);
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
    // Load orders from localStorage
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders && !orders.length) {
      // Initialize orders in Redux if needed
    }
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (selectedProduct) {
      dispatch(addToCart({ ...selectedProduct, selectedSize, selectedColor, quantity }));
      alert('Added to cart successfully!');
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

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    
    const newOrder = {
      id: Date.now(),
      orderId: 'ORD' + Math.floor(Math.random() * 1000000),
      trackingId: 'TRK' + Math.floor(Math.random() * 1000000) + Date.now(),
      ...orderDetails,
      product: selectedProduct,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
      price: selectedProduct.price,
      totalPrice: selectedProduct.price * quantity,
      orderDate: new Date().toISOString(),
      status: 'pending',
      statusHistory: [{
        status: 'pending',
        date: new Date().toISOString(),
        note: 'Order placed successfully'
      }]
    };
    
    // Save to localStorage
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    existingOrders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(existingOrders));
    
    setShowOrderModal(false);
    alert(`Order placed successfully!\nTracking ID: ${newOrder.trackingId}\nYou can track your order using this ID.`);
    
    // Reset form
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
      // Refresh tracked order if it's the same
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

  const getStatusStep = (status) => {
    const steps = ['pending', 'processing', 'shipped', 'delivered'];
    return steps.indexOf(status);
  };

  const getStatusProgress = (orderStatus) => {
    const steps = ['pending', 'processing', 'shipped', 'delivered'];
    const currentStep = steps.indexOf(orderStatus);
    return (currentStep / (steps.length - 1)) * 100;
  };

  const loadMoreReviews = () => {
    setVisibleReviews(prev => prev + 3);
  };

  if (loading) return <Loader />;
  if (!selectedProduct) return <div className="not-found">Product not found</div>;

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

  const similarProducts = [
    { id: 1, name: "Polo with Contrast Trims", price: 212, originalPrice: 242, discount: null, image: "/api/placeholder/200/200" },
    { id: 2, name: "Gradient Graphic T-shirt", price: 145, originalPrice: 145, discount: null, image: "/api/placeholder/200/200" },
    { id: 3, name: "Polo with Tipping Details", price: 180, originalPrice: 180, discount: null, image: "/api/placeholder/200/200" },
    { id: 4, name: "Black Striped T-shirt", price: 120, originalPrice: 150, discount: 20, image: "/api/placeholder/200/200" }
  ];

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

        /* Header with admin toggle */
        .admin-header {
          background: #1a1a1a;
          color: white;
          padding: 10px 0;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .admin-header .container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .admin-toggle {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .admin-toggle label {
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .admin-toggle input {
          width: 40px;
          height: 20px;
          appearance: none;
          background: #555;
          border-radius: 20px;
          position: relative;
          cursor: pointer;
        }

        .admin-toggle input:checked {
          background: #4caf50;
        }

        .admin-toggle input::before {
          content: '';
          position: absolute;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          top: 1px;
          left: 2px;
          background: white;
          transition: transform 0.3s;
        }

        .admin-toggle input:checked::before {
          transform: translateX(20px);
        }

        .track-order-btn {
          background: #2196f3;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 20px;
          cursor: pointer;
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

        /* Tabs */
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

        /* Reviews */
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

        /* Admin Orders Table */
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

        /* Similar Products */
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

        /* Newsletter */
        .newsletter-section {
          background: #f5f5f5;
          border-radius: 20px;
          padding: 40px;
          text-align: center;
          margin: 60px 0;
        }

        .newsletter-form {
          display: flex;
          gap: 12px;
          justify-content: center;
        }

        .newsletter-form input {
          padding: 14px 20px;
          border: 1px solid #ddd;
          border-radius: 30px;
          width: 300px;
          outline: none;
        }

        .newsletter-form button {
          padding: 14px 30px;
          background: #000;
          color: white;
          border: none;
          border-radius: 30px;
          cursor: pointer;
        }

        /* Modal */
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

        /* Track Order */
        .track-container {
          background: white;
          border-radius: 20px;
          padding: 20px;
          margin: 20px 0;
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
        }

        .track-form button {
          padding: 12px 24px;
          background: #000;
          color: white;
          border: none;
          border-radius: 30px;
          cursor: pointer;
        }

        .progress-container {
          margin: 20px 0;
          position: relative;
        }

        .progress-bar {
          height: 4px;
          background: #4caf50;
          border-radius: 2px;
          transition: width 0.3s;
        }

        .progress-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: #e0e0e0;
          border-radius: 2px;
        }

        .steps {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
          position: relative;
        }

        .step {
          text-align: center;
          flex: 1;
        }

        .step-icon {
          width: 40px;
          height: 40px;
          background: #e0e0e0;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 10px;
        }

        .step.active .step-icon {
          background: #4caf50;
          color: white;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin: 20px 0;
        }

        .info-card {
          background: #fafafa;
          padding: 15px;
          border-radius: 12px;
        }

        .status-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
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
          .newsletter-form {
            flex-direction: column;
            align-items: center;
          }
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Admin Header */}
      <div className="admin-header">
        <div className="container">
          <div className="admin-toggle">
            <label>
              <input type="checkbox" checked={adminView} onChange={(e) => setAdminView(e.target.checked)} />
              Admin Mode
            </label>
            <button className="track-order-btn" onClick={() => setShowTrackModal(true)}>
              Track Order
            </button>
          </div>
        </div>
      </div>

      <div className="breadcrumb">
        <div className="container">
          <span>Shop</span> &gt; <span>Co Sale</span> &gt; <span>New Arrivals</span> &gt; <span>Brands</span>
        </div>
      </div>

      <div className="container">
        {/* Product Section */}
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
            <h1>ONE LIFE GRAPHIC T-SHIRT</h1>
            <div className="rating">
              <span className="stars">★★★★☆</span>
              <span className="rating-value">4.5/5</span>
            </div>
            <div className="price-section">
              <span className="current-price">$260</span>
              <span className="original-price">$300</span>
              <span className="discount-badge">-40%</span>
            </div>
            <p className="description">
              The graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.
            </p>
            
            <div className="option-section">
              <label>Slider Colors</label>
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

        {/* Tabs */}
        <div className="tabs-section">
          <div className="tabs-header">
            <button className={`tab-btn ${activeTab === 'product-details' ? 'active' : ''}`} onClick={() => setActiveTab('product-details')}>Product Details</button>
            <button className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => setActiveTab('reviews')}>Rating & Reviews</button>
            <button className={`tab-btn ${activeTab === 'faqs' ? 'active' : ''}`} onClick={() => setActiveTab('faqs')}>FAQs</button>
          </div>
          
          <div className="tab-content">
            {activeTab === 'product-details' && (
              <div className="product-details-tab">
                <p>Detailed product information goes here. Crafted from premium quality materials, this t-shirt offers exceptional comfort and durability.</p>
                <ul>
                  <li>100% Cotton fabric</li>
                  <li>Machine wash cold</li>
                  <li>Premium quality print</li>
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
                  <h4>How do I care for this shirt?</h4>
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

        {/* Admin Orders Section */}
        {adminView && (
          <div className="admin-orders-section">
            <h2>📋 Order Management Dashboard</h2>
            <div className="filter-buttons">
              <button className={orderFilter === 'all' ? 'active' : ''} onClick={() => setOrderFilter('all')}>All Orders</button>
              <button className={orderFilter === 'pending' ? 'active' : ''} onClick={() => setOrderFilter('pending')}>Pending</button>
              <button className={orderFilter === 'processing' ? 'active' : ''} onClick={() => setOrderFilter('processing')}>Processing</button>
              <button className={orderFilter === 'shipped' ? 'active' : ''} onClick={() => setOrderFilter('shipped')}>Shipped</button>
              <button className={orderFilter === 'delivered' ? 'active' : ''} onClick={() => setOrderFilter('delivered')}>Delivered</button>
              <button className={orderFilter === 'cancelled' ? 'active' : ''} onClick={() => setOrderFilter('cancelled')}>Cancelled</button>
            </div>
            
            <div className="orders-table">
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Product</th>
                    <th>Amount</th>
                    <th>Tracking ID</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map(order => (
                    <tr key={order.id}>
                      <td>{order.orderId}</td>
                      <td>{order.fullName}</td>
                      <td>{order.product?.title || order.product?.name}</td>
                      <td>${order.totalPrice}</td>
                      <td>
                        <span className="tracking-id">{order.trackingId}</span>
                        <button className="copy-btn" onClick={() => navigator.clipboard.writeText(order.trackingId)}>📋</button>
                      </td>
                      <td>
                        <select 
                          className="status-select" 
                          value={order.status}
                          style={{ backgroundColor: getStatusColor(order.status) + '20', borderColor: getStatusColor(order.status) }}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td>
                        <button className="view-btn" onClick={() => { setTrackingId(order.trackingId); setShowTrackModal(true); }}>Track</button>
                        <button className="delete-btn" onClick={() => deleteOrder(order.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredOrders.length === 0 && <p style={{ textAlign: 'center', padding: 40 }}>No orders found</p>}
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginTop: 30 }}>
              <div style={{ background: 'white', padding: 20, borderRadius: 12, textAlign: 'center' }}>
                <h4>Total Orders</h4>
                <p style={{ fontSize: 32, fontWeight: 'bold' }}>{existingOrders.length}</p>
              </div>
              <div style={{ background: 'white', padding: 20, borderRadius: 12, textAlign: 'center' }}>
                <h4>Pending</h4>
                <p style={{ fontSize: 32, fontWeight: 'bold', color: '#ff9800' }}>{existingOrders.filter(o => o.status === 'pending').length}</p>
              </div>
              <div style={{ background: 'white', padding: 20, borderRadius: 12, textAlign: 'center' }}>
                <h4>Total Revenue</h4>
                <p style={{ fontSize: 32, fontWeight: 'bold' }}>${existingOrders.reduce((sum, o) => sum + o.totalPrice, 0)}</p>
              </div>
              <div style={{ background: 'white', padding: 20, borderRadius: 12, textAlign: 'center' }}>
                <h4>Delivered</h4>
                <p style={{ fontSize: 32, fontWeight: 'bold', color: '#4caf50' }}>{existingOrders.filter(o => o.status === 'delivered').length}</p>
              </div>
            </div>
          </div>
        )}

        {/* Similar Products */}
        <div className="similar-products">
          <h2>YOU MIGHT ALSO LIKE</h2>
          <div className="similar-grid">
            {similarProducts.map(product => (
              <div key={product.id} className="similar-card">
                <img src={product.image} alt={product.name} />
                <h4>{product.name}</h4>
                <div className="price-row">
                  <span className="price">${product.price}</span>
                  {product.originalPrice !== product.price && (
                    <>
                      <span className="original-price">${product.originalPrice}</span>
                      {product.discount && <span className="discount">-{product.discount}%</span>}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="newsletter-section">
          <h3>STAY UPDATED ABOUT OUR LATEST OFFERS</h3>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email address" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>

      {/* Order Modal */}
      {showOrderModal && (
        <div className="modal-overlay" onClick={() => setShowOrderModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Complete Your Order</h2>
              <button className="modal-close" onClick={() => setShowOrderModal(false)}>&times;</button>
            </div>
            <form onSubmit={handleOrderSubmit}>
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
                <div className="summary-item"><span>{selectedProduct.title}</span><span>${selectedProduct.price}</span></div>
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

      {/* Track Order Modal */}
      {showTrackModal && (
        <div className="modal-overlay" onClick={() => { setShowTrackModal(false); setTrackedOrder(null); setTrackingId(''); }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 600 }}>
            <div className="modal-header">
              <h2>Track Your Order</h2>
              <button className="modal-close" onClick={() => { setShowTrackModal(false); setTrackedOrder(null); setTrackingId(''); }}>&times;</button>
            </div>
            
            <div className="track-container">
              <div className="track-form">
                <input type="text" placeholder="Enter Tracking ID" value={trackingId} onChange={(e) => setTrackingId(e.target.value)} />
                <button onClick={handleTrackOrder}>Track</button>
              </div>
              
              {trackedOrder && (
                <div>
                  <h3>Order Details</h3>
                  <p><strong>Order ID:</strong> {trackedOrder.orderId}</p>
                  <p><strong>Customer:</strong> {trackedOrder.fullName}</p>
                  
                  <div className="progress-container">
                    <div className="progress-bar" style={{ width: `${getStatusProgress(trackedOrder.status)}%` }}></div>
                    <div className="steps">
                      <div className={`step ${getStatusStep(trackedOrder.status) >= 0 ? 'active' : ''}`}>
                        <div className="step-icon">📝</div><div>Placed</div>
                      </div>
                      <div className={`step ${getStatusStep(trackedOrder.status) >= 1 ? 'active' : ''}`}>
                        <div className="step-icon">⚙️</div><div>Processing</div>
                      </div>
                      <div className={`step ${getStatusStep(trackedOrder.status) >= 2 ? 'active' : ''}`}>
                        <div className="step-icon">🚚</div><div>Shipped</div>
                      </div>
                      <div className={`step ${getStatusStep(trackedOrder.status) >= 3 ? 'active' : ''}`}>
                        <div className="step-icon">📦</div><div>Delivered</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="info-grid">
                    <div className="info-card">
                      <h4>Product Details</h4>
                      <p><strong>Product:</strong> {trackedOrder.product?.title}</p>
                      <p><strong>Size:</strong> {trackedOrder.size}</p>
                      <p><strong>Color:</strong> {trackedOrder.color}</p>
                      <p><strong>Quantity:</strong> {trackedOrder.quantity}</p>
                    </div>
                    <div className="info-card">
                      <h4>Shipping Info</h4>
                      <p><strong>Address:</strong> {trackedOrder.address}</p>
                      <p><strong>City:</strong> {trackedOrder.city}</p>
                      <p><strong>Phone:</strong> {trackedOrder.phone}</p>
                    </div>
                  </div>
                  
                  <div className="info-card">
                    <h4>Status History</h4>
                    {trackedOrder.statusHistory?.map((history, idx) => (
                      <div key={idx} style={{ marginBottom: 10, padding: 8, background: '#f5f5f5', borderRadius: 8 }}>
                        <strong>{history.status.toUpperCase()}</strong> - {new Date(history.date).toLocaleString()}
                        <p style={{ fontSize: 12, marginTop: 4 }}>{history.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;