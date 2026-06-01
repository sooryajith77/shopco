// // pages/Home.jsx
// import React, { useEffect, useState } from 'react';
// import ProductCard from '../components/ProductCard';
// import Loader from '../components/Loader';
// import './Home.css';
// import modelImg from "../assets/b26fea69ccfd8aa5825862cdb9604a4fb4930464.jpg";

// // Mock product data for demo (replace with your Redux fetch)
// const mockProducts = [
//   { id: 1, name: 'Classic Denim Jacket', price: 89.99, rating: 4.5, image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=400' },
//   { id: 2, name: 'Silk Blouse', price: 59.99, rating: 4.8, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400' },
//   { id: 3, name: 'Wool Coat', price: 199.99, rating: 4.9, image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=400' },
//   { id: 4, name: 'Leather Boots', price: 149.99, rating: 4.7, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400' },
//   { id: 5, name: 'Summer Dress', price: 49.99, rating: 4.6, image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400' },
//   { id: 6, name: 'Sports Hoodie', price: 69.99, rating: 4.4, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400' },
//   { id: 7, name: 'Tailored Blazer', price: 129.99, rating: 4.8, image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400' },
//   { id: 8, name: 'Running Shoes', price: 89.99, rating: 4.7, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400' },
// ];

// const Home = () => {
//   const [loading, setLoading] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [newArrivals, setNewArrivals] = useState([]);
//   const [topSelling, setTopSelling] = useState([]);

//   useEffect(() => {
//     setLoading(true);
//     // Simulate API fetch
//     setTimeout(() => {
//       setProducts(mockProducts);
//       setLoading(false);
//     }, 800);
//   }, []);

//   useEffect(() => {
//     if (products.length > 0) {
//       setNewArrivals(products.slice(0, 4));
//       setTopSelling(products.slice(4, 8));
//     }
//   }, [products]);

//   if (loading) return <Loader />;

//   return (
//     <div className="home">
//       {/* Hero Section */}
//       <section className="hero">
//         <div className="container">
//           <div className="hero-wrapper">
//             <div className="hero-content">
//               <h1>FIND CLOTHES THAT MATCHES YOUR STYLE</h1>
//               <p>Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.</p>
//               <button className="btn-primary" onClick={() => window.location.href = '/products'}>
//                 Shop Now <span>→</span>
//               </button>
              
//               <div className="stats">
//                 <div className="stat">
//                   <h3>200+</h3>
//                   <p>International Brands</p>
//                 </div>
//                 <div className="stat">
//                   <h3>2,000+</h3>
//                   <p>High-Quality Products</p>
//                 </div>
//                 <div className="stat">
//                   <h3>30,000+</h3>
//                   <p>Happy Customers</p>
//                 </div>
//               </div>
//             </div>
            
//             <div className="hero-image">
//               <img src={modelImg} alt="Fashion Model" />
//             </div>
//           </div>
//         </div>
//       </section>
      
//       <section className="brands">
//         <div className="container">
//           <div className="brand-logos">
//             <span>VERSACE</span>
//             <span>ZARA</span>
//             <span>GUCCI</span>
//             <span>PRADA</span>
//             <span>Calvin Klein</span>
//           </div>
//         </div>
//       </section>

//       {/* New Arrivals */}
//       {newArrivals.length > 0 && (
//         <section className="products-section">
//           <div className="container">
//             <h2 className="section-title">NEW ARRIVALS</h2>
//             <div className="grid-6">
//               {newArrivals.map(product => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//             </div>
//             <div className="view-all">
//               <button 
//                 className="btn-secondary" 
//                 onClick={() => window.location.href = '/products'}
//               >
//                 View All
//               </button>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Top Selling */}
//       {topSelling.length > 0 && (
//         <section className="products-section">
//           <div className="container">
//             <h2 className="section-title">TOP SELLING</h2>
//             <div className="grid-6">
//               {topSelling.map(product => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//             </div>
//             <div className="view-all">
//               <button className="btn-secondary" onClick={() => window.location.href = '/products'}>
//                 View All
//               </button>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Dress Style */}
//       <section className="dress-style">
//         <div className="container">
//           <h2 className="section-title">BROWSE BY DRESS STYLE</h2>
//           <div className="style-grid">
//             <div className="style-card casual">
//               <span>Casual</span>
//             </div>
//             <div className="style-card formal">
//               <span>Formal</span>
//             </div>
//             <div className="style-card party">
//               <span>Party</span>
//             </div>
//             <div className="style-card gym">
//               <span>Gym</span>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section className="testimonials">
//         <div className="container">
//           <h2 className="section-title">OUR HAPPY CUSTOMERS</h2>
//           <div className="testimonial-grid">
//             <div className="testimonial-card">
//               <div className="stars">★★★★★</div>
//               <h4>Sarah M.</h4>
//               <p>"I love this dress! It's so comfortable and stylish. The quality is amazing and the fit is perfect."</p>
//             </div>
//             <div className="testimonial-card">
//               <div className="stars">★★★★★</div>
//               <h4>Alex X.</h4>
//               <p>"This dress is perfect for a casual day out. Great value for money and the material is excellent."</p>
//             </div>
//             <div className="testimonial-card">
//               <div className="stars">★★★★★</div>
//               <h4>James L.</h4>
//               <p>"I love this dress! It's so versatile and looks great with jeans. Highly recommended!"</p>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;



// pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import './Home.css';
import modelImg from "../assets/b26fea69ccfd8aa5825862cdb9604a4fb4930464.jpg";

// Mock product data for demo (replace with your Redux fetch)
const mockProducts = [
  { id: 1, name: 'Classic Denim Jacket', price: 89.99, rating: 4.5, image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=400' },
  { id: 2, name: 'Silk Blouse', price: 59.99, rating: 4.8, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400' },
  { id: 3, name: 'Wool Coat', price: 199.99, rating: 4.9, image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=400' },
  { id: 4, name: 'Leather Boots', price: 149.99, rating: 4.7, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400' },
  { id: 5, name: 'Summer Dress', price: 49.99, rating: 4.6, image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400' },
  { id: 6, name: 'Sports Hoodie', price: 69.99, rating: 4.4, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400' },
  { id: 7, name: 'Tailored Blazer', price: 129.99, rating: 4.8, image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400' },
  { id: 8, name: 'Running Shoes', price: 89.99, rating: 4.7, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400' },
];

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [topSelling, setTopSelling] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    // Simulate API fetch
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      setNewArrivals(products.slice(0, 4));
      setTopSelling(products.slice(4, 8));
    }
  }, [products]);

  // Function to navigate to category page
  const handleCategoryClick = (category) => {
    navigate(`/category/${category.toLowerCase()}`);
  };

  if (loading) return <Loader />;

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-wrapper">
            <div className="hero-content">
              <h1>FIND CLOTHES THAT MATCHES YOUR STYLE</h1>
              <p>Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.</p>
              <button className="btn-primary" onClick={() => navigate('/products')}>
                Shop Now <span>→</span>
              </button>
              
              <div className="stats">
                <div className="stat">
                  <h3>200+</h3>
                  <p>International Brands</p>
                </div>
                <div className="stat">
                  <h3>2,000+</h3>
                  <p>High-Quality Products</p>
                </div>
                <div className="stat">
                  <h3>30,000+</h3>
                  <p>Happy Customers</p>
                </div>
              </div>
            </div>
            
            <div className="hero-image">
              <img src={modelImg} alt="Fashion Model" />
            </div>
          </div>
        </div>
      </section>
      
      <section className="brands">
        <div className="container">
          <div className="brand-logos">
            <span>VERSACE</span>
            <span>ZARA</span>
            <span>GUCCI</span>
            <span>PRADA</span>
            <span>Calvin Klein</span>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="products-section">
          <div className="container">
            <h2 className="section-title">NEW ARRIVALS</h2>
            <div className="grid-6">
              {newArrivals.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="view-all">
              <button 
                className="btn-secondary" 
                onClick={() => navigate('/products')}
              >
                View All
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Top Selling */}
      {topSelling.length > 0 && (
        <section className="products-section">
          <div className="container">
            <h2 className="section-title">TOP SELLING</h2>
            <div className="grid-6">
              {topSelling.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="view-all">
              <button className="btn-secondary" onClick={() => navigate('/products')}>
                View All
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Dress Style - Click to route to category page */}
      <section className="dress-style">
        <div className="container">
          <h2 className="section-title">BROWSE BY DRESS STYLE</h2>
          <div className="style-grid">
     <div 
  className="style-card casual"
  onClick={() => handleCategoryClick('Casual')}
  style={{ cursor: 'pointer' }}
>
  <img 
    src="https://images.pexels.com/photos/10017724/pexels-photo-10017724.jpeg"
    alt="Casual"
    className="style-img"
  />
  <span>Casual</span>
</div>
                <div 
  className="style-card casual"
  onClick={() => handleCategoryClick('Casual')}
  style={{ cursor: 'pointer' }}
>
  <img 
    src="https://m.media-amazon.com/images/I/71hU6vBZwfL._AC_UY1100_.jpg"
    alt="Casual"
    className="style-img"
  />
  <span>Gym</span>
</div>
               <div 
  className="style-card casual"
  onClick={() => handleCategoryClick('Casual')}
  style={{ cursor: 'pointer' }}
>
  <img 
    src="https://www.shaadidukaan.com/vogue/wp-content/uploads/2026/01/Men-formal-outfit-3.webp"
    alt="Casual"
    className="style-img"
  />
  <span>formal</span>
</div>
            <div 
  className="style-card casual"
  onClick={() => handleCategoryClick('Casual')}
  style={{ cursor: 'pointer' }}
>
  <img 
    src="https://styl-inc.com/wp-content/uploads/2021/01/Top-Trending-Dress-Colour-Combination-for-Men-in-2020-featured-Image.png"
    alt="Casual"
    className="style-img"
  />
  <span>Party</span>
</div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">OUR HAPPY CUSTOMERS</h2>
          <div className="testimonial-grid">
            <div className="testimonial-card">
              <div className="stars">★★★★★</div>
              <h4>Sarah M.</h4>
              <p>"I love this dress! It's so comfortable and stylish. The quality is amazing and the fit is perfect."</p>
            </div>
            <div className="testimonial-card">
              <div className="stars">★★★★★</div>
              <h4>Alex X.</h4>
              <p>"This dress is perfect for a casual day out. Great value for money and the material is excellent."</p>
            </div>
            <div className="testimonial-card">
              <div className="stars">★★★★★</div>
              <h4>James L.</h4>
              <p>"I love this dress! It's so versatile and looks great with jeans. Highly recommended!"</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;




