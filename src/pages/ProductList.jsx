import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import { fetchProducts } from '../redux/slices/productSlice';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  useEffect(() => {
    let filtered = [...products];
    
    if (category !== 'all') {
      filtered = filtered.filter(p => p.category === category);
    }
    
    if (sortBy === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    }
    
    setFilteredProducts(filtered);
  }, [products, category, sortBy]);

  if (loading) return <Loader />;

  return (
    <div className="product-list">
      <div className="container">
        <div className="filters">
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="all">All Categories</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
            <option value="jewelery">Jewelery</option>
            <option value="electronics">Electronics</option>
          </select>
          
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
        
        <div className="grid-4">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .product-list {
          padding: 40px 0;
        }
        .filters {
          display: flex;
          justify-content: space-between;
          margin-bottom: 40px;
        }
        .filters select {
          padding: 10px 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 16px;
        }
      `}</style>
    </div>
  );
};

export default ProductList;