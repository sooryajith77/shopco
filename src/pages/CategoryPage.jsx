// pages/CategoryPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import './CategoryPage.css';

// Mock product data with all fields
const mockProducts = [
  { id: 1, name: 'Gradient Graphic T-shirt', price: 145, originalPrice: null, rating: 3.5, discount: null, category: 'Casual', productCategory: 'T-shirts', color: 'red', size: 'Medium', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400' },
  { id: 2, name: 'Polo with Tipping Details', price: 180, originalPrice: null, rating: 4.5, discount: null, category: 'Formal', productCategory: 'Shirts', color: 'blue', size: 'Large', image: 'https://images.unsplash.com/photo-1586363104869-3c6d6c6e9b8c?w=400' },
  { id: 3, name: 'Black Striped T-shirt', price: 120, originalPrice: 150, rating: 5.0, discount: 30, category: 'Casual', productCategory: 'T-shirts', color: 'black', size: 'Small', image: 'https://static.vecteezy.com/system/resources/thumbnails/059/069/519/small/two-men-in-black-t-shirts-standing-in-front-of-a-gray-background-photo.jpeg' },
  { id: 4, name: 'Skinny Fit Jeans', price: 240, originalPrice: 260, rating: 3.5, discount: 20, category: 'Casual', productCategory: 'Jeans', color: 'blue', size: 'Medium', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400' },
  { id: 5, name: 'Checkered Shirt', price: 180, originalPrice: null, rating: 4.5, discount: null, category: 'Casual', productCategory: 'Shirts', color: 'red', size: 'Large', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400' },
  { id: 6, name: 'Sleeve Striped T-shirt', price: 130, originalPrice: 160, rating: 4.5, discount: 30, category: 'Casual', productCategory: 'T-shirts', color: 'green', size: 'Small', image: 'https://t4.ftcdn.net/jpg/12/04/58/65/360_F_1204586528_1uk4jMhRrpg96mwuIqtO7lxxOtlzu9Gw.jpg' },
  { id: 7, name: 'Vertical Striped Shirt', price: 212, originalPrice: 232, rating: 5.0, discount: 20, category: 'Formal', productCategory: 'Shirts', color: 'blue', size: 'Medium', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400' },
  { id: 8, name: 'Courage Graphic T-shirt', price: 145, originalPrice: null, rating: 4.0, discount: null, category: 'Casual', productCategory: 'T-shirts', color: 'black', size: 'Large', image: 'https://static.vecteezy.com/system/resources/thumbnails/028/252/048/small/men-s-t-shirt-realistic-mockup-in-different-colors-ai-generated-photo.jpg' },
  { id: 9, name: 'Loose Fit Bermuda Shorts', price: 80, originalPrice: null, rating: 3.0, discount: null, category: 'Casual', productCategory: 'Shorts', color: 'green', size: 'XX-Large', image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400' },
];

const CategoryPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  
  // Filter states
  const [priceRange, setPriceRange] = useState([60, 200]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedDressStyles, setSelectedDressStyles] = useState([]);
  const [selectedProductCategories, setSelectedProductCategories] = useState([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('Most Popular');
  const productsPerPage = 6;

  // Available filters (matching your screenshot)
  const productCategories = ['T-shirts', 'Shorts', 'Shirts', 'Hoodie', 'Jeans'];
const colorsList = [
  // Default & Neutrals
  { name: 'Default', value: 'default', hex: '#808080' },
  { name: 'White', value: 'white', hex: '#ffffff' },
  { name: 'Black', value: 'black', hex: '#000000' },
  { name: 'Gray', value: 'gray', hex: '#6b7280' },
  { name: 'Light Gray', value: 'lightgray', hex: '#d3d3d3' },
  { name: 'Dark Gray', value: 'darkgray', hex: '#374151' },
  { name: 'Silver', value: 'silver', hex: '#c0c0c0' },
  { name: 'Charcoal', value: 'charcoal', hex: '#36454f' },
  
  // Reds & Pinks
  { name: 'Red', value: 'red', hex: '#ef4444' },
  { name: 'Crimson', value: 'crimson', hex: '#dc143c' },
  { name: 'Maroon', value: 'maroon', hex: '#800000' },
  { name: 'Burgundy', value: 'burgundy', hex: '#800020' },
  { name: 'Pink', value: 'pink', hex: '#ec4899' },
  { name: 'Hot Pink', value: 'hotpink', hex: '#ff69b4' },
  { name: 'Light Pink', value: 'lightpink', hex: '#ffb6c1' },
  { name: 'Rose', value: 'rose', hex: '#ff007f' },
  
  // Oranges & Yellows
  { name: 'Orange', value: 'orange', hex: '#f97316' },
  { name: 'Coral', value: 'coral', hex: '#ff7f50' },
  { name: 'Salmon', value: 'salmon', hex: '#fa8072' },
  { name: 'Peach', value: 'peach', hex: '#ffcba4' },
  { name: 'Yellow', value: 'yellow', hex: '#eab308' },
  { name: 'Gold', value: 'gold', hex: '#ffd700' },
  { name: 'Mustard', value: 'mustard', hex: '#ffdb58' },
  { name: 'Amber', value: 'amber', hex: '#ffbf00' },
  
  // Greens
  { name: 'Green', value: 'green', hex: '#22c55e' },
  { name: 'Lime', value: 'lime', hex: '#84cc16' },
  { name: 'Forest Green', value: 'forestgreen', hex: '#228b22' },
  { name: 'Olive', value: 'olive', hex: '#808000' },
  { name: 'Mint', value: 'mint', hex: '#98fb98' },
  { name: 'Sage', value: 'sage', hex: '#9caf88' },
  { name: 'Emerald', value: 'emerald', hex: '#50c878' },
  { name: 'Teal', value: 'teal', hex: '#008080' },
  
  // Blues
  { name: 'Blue', value: 'blue', hex: '#3b82f6' },
  { name: 'Sky Blue', value: 'skyblue', hex: '#87ceeb' },
  { name: 'Light Blue', value: 'lightblue', hex: '#add8e6' },
  { name: 'Navy', value: 'navy', hex: '#1e3a8a' },
  { name: 'Royal Blue', value: 'royalblue', hex: '#4169e1' },
  { name: 'Cyan', value: 'cyan', hex: '#06b6d4' },
  { name: 'Turquoise', value: 'turquoise', hex: '#40e0d0' },
  { name: 'Aqua', value: 'aqua', hex: '#00ffff' },
  
  // Purples & Violets
  { name: 'Purple', value: 'purple', hex: '#a855f7' },
  { name: 'Lavender', value: 'lavender', hex: '#e9d5ff' },
  { name: 'Violet', value: 'violet', hex: '#8b5cf6' },
  { name: 'Indigo', value: 'indigo', hex: '#4b0082' },
  { name: 'Magenta', value: 'magenta', hex: '#ff00ff' },
  { name: 'Orchid', value: 'orchid', hex: '#da70d6' },
  { name: 'Plum', value: 'plum', hex: '#dda0dd' },
  
  // Browns & Beiges
  { name: 'Brown', value: 'brown', hex: '#8b4513' },
  { name: 'Tan', value: 'tan', hex: '#d2b48c' },
  { name: 'Beige', value: 'beige', hex: '#f5f5dc' },
  { name: 'Camel', value: 'camel', hex: '#c19a6b' },
  { name: 'Coffee', value: 'coffee', hex: '#6f4e37' },
  { name: 'Chestnut', value: 'chestnut', hex: '#954535' },
  
  // Special
  { name: 'Ivory', value: 'ivory', hex: '#fffff0' },
  { name: 'Cream', value: 'cream', hex: '#fffdd0' },
  { name: 'Lilac', value: 'lilac', hex: '#c8a2c8' },
  { name: 'Khaki', value: 'khaki', hex: '#f0e68c' },
  { name: 'Champagne', value: 'champagne', hex: '#f7e7ce' },
  { name: 'Copper', value: 'copper', hex: '#b87333' },
  { name: 'Bronze', value: 'bronze', hex: '#cd7f32' },
  { name: 'Rust', value: 'rust', hex: '#b7410e' },
];
  const sizes = ['XX-Small', 'Small', 'Medium', 'Large', 'XX-Large', '4X-Large'];
  const dressStyles = ['Casual', 'Formal', 'Party', 'Gym'];

  useEffect(() => {
    setLoading(true);
    const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
    setCategoryName(formattedCategory);
    
    setTimeout(() => {
      const filtered = mockProducts.filter(
        product => product.category === formattedCategory
      );
      setProducts(filtered);
      setFilteredProducts(filtered);
      setLoading(false);
    }, 500);
  }, [category]);

  // Apply all filters
  const applyFilters = () => {
    let filtered = [...products];

    // Filter by product categories (T-shirts, Shorts, etc.)
    if (selectedProductCategories.length > 0) {
      filtered = filtered.filter(product => 
        selectedProductCategories.includes(product.productCategory)
      );
    }

    // Filter by colors
    if (selectedColors.length > 0) {
      filtered = filtered.filter(product => selectedColors.includes(product.color));
    }

    // Filter by sizes
    if (selectedSizes.length > 0) {
      filtered = filtered.filter(product => selectedSizes.includes(product.size));
    }

    // Filter by dress styles
    if (selectedDressStyles.length > 0) {
      filtered = filtered.filter(product => selectedDressStyles.includes(product.category));
    }

    // Filter by price
    filtered = filtered.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Apply sorting
    if (sortBy === 'Price: Low to High') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Price: High to Low') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'Rating: High to Low') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  // Apply filters when any filter changes
  useEffect(() => {
    applyFilters();
  }, [selectedProductCategories, selectedColors, selectedSizes, selectedDressStyles, priceRange, products, sortBy]);

  // Handle product category selection
  const handleProductCategoryChange = (category) => {
    setSelectedProductCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  // Handle color selection
  const handleColorChange = (color) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  // Handle size selection
  const handleSizeChange = (size) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  // Handle dress style selection
  const handleDressStyleChange = (style) => {
    setSelectedDressStyles(prev =>
      prev.includes(style) ? prev.filter(s => s !== style) : [...prev, style]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedProductCategories([]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setSelectedDressStyles([]);
    setPriceRange([60, 200]);
    setSortBy('Most Popular');
  };

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  if (loading) return <Loader />;

  const activeFilterCount = selectedProductCategories.length + selectedColors.length + selectedSizes.length + selectedDressStyles.length;

  const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    return (
      <div className="rating">
        {'★'.repeat(fullStars)}{'☆'.repeat(5 - fullStars)}
        <span style={{ fontSize: '12px', color: '#666', marginLeft: '5px' }}>{rating}/5</span>
      </div>
    );
  };

  return (
    <div className="category-page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <span onClick={() => navigate('/')}>Home</span>
          <span> &gt; </span>
          <span className="active">{categoryName}</span>
        </div>

        <div className="page-layout">
          {/* Sidebar Filters */}
          <aside className="filters-sidebar">
            <h2 className="filters-title">Filters</h2>

            {/* Categories Filter */}
            <div className="filter-group">
              <h3 className="filter-heading">Categories</h3>
              <div className="filter-options">
                {productCategories.map(cat => (
                  <label key={cat} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={selectedProductCategories.includes(cat)}
                      onChange={() => handleProductCategoryChange(cat)}
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="filter-group">
              <h3 className="filter-heading">Price</h3>
              <div className="price-filter">
                <div className="price-inputs">
                  <div className="price-input">
                    <span>$</span>
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                      min="0"
                      max="500"
                    />
                  </div>
                  <span>-</span>
                  <div className="price-input">
                    <span>$</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 200])}
                      min="0"
                      max="500"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="price-slider"
                />
              </div>
            </div>

            {/* Colors Filter */}
            <div className="filter-group">
              <h3 className="filter-heading">Colors</h3>
              <div className="color-options">
                {colorsList.map(color => (
                  <div
                    key={color.value}
                    className={`color-circle ${selectedColors.includes(color.value) ? 'selected' : ''}`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => handleColorChange(color.value)}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Filter */}
            <div className="filter-group">
              <h3 className="filter-heading">Size</h3>
              <div className="size-options">
                {sizes.map(size => (
                  <button
                    key={size}
                    className={`size-btn ${selectedSizes.includes(size) ? 'active' : ''}`}
                    onClick={() => handleSizeChange(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Dress Style Filter */}
            <div className="filter-group">
              <h3 className="filter-heading">Dress Style</h3>
              <div className="filter-options">
                {dressStyles.map(style => (
                  <label key={style} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={selectedDressStyles.includes(style)}
                      onChange={() => handleDressStyleChange(style)}
                    />
                    <span>{style}</span>
                  </label>
                ))}
              </div>
            </div>

            <button className="apply-filter-btn" onClick={applyFilters}>
              Apply Filter
            </button>
          </aside>

          {/* Main Content */}
          <div className="main-content">
            {/* Mobile Filter Button */}
            <button
              className="mobile-filter-btn"
              onClick={() => setIsMobileFilterOpen(true)}
            >
              🔍 Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
            </button>

            {/* Header */}
            <div className="content-header">
              <div>
                <h1 className="category-title">{categoryName}</h1>
                <p className="product-count">
                  Showing {currentProducts.length} of {filteredProducts.length} Products
                </p>
              </div>
              <div className="sort-container">
                <span className="sort-label">Sort by:</span>
                <select
                  className="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option>Most Popular</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Rating: High to Low</option>
                </select>
              </div>
            </div>

            {/* Active Filters Display */}
            {activeFilterCount > 0 && (
              <div className="active-filters">
                {selectedProductCategories.map(cat => (
                  <span key={cat} className="filter-pill">
                    {cat}
                    <button onClick={() => handleProductCategoryChange(cat)}>✕</button>
                  </span>
                ))}
                {selectedColors.map(color => (
                  <span key={color} className="filter-pill">
                    {color}
                    <button onClick={() => handleColorChange(color)}>✕</button>
                  </span>
                ))}
                {selectedSizes.map(size => (
                  <span key={size} className="filter-pill">
                    {size}
                    <button onClick={() => handleSizeChange(size)}>✕</button>
                  </span>
                ))}
                {selectedDressStyles.map(style => (
                  <span key={style} className="filter-pill">
                    {style}
                    <button onClick={() => handleDressStyleChange(style)}>✕</button>
                  </span>
                ))}
                <button className="clear-all-btn" onClick={clearFilters}>
                  Clear All
                </button>
              </div>
            )}

            {/* Product Grid */}
            <div className="product-grid">
              {currentProducts.map(product => (
                <div
                  key={product.id}
                  className="product-card"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <img src={product.image} alt={product.name} className="product-image" />
                  <h3 className="product-name">{product.name}</h3>
                  <StarRating rating={product.rating} />
                  <div className="price-container">
                    <span className="current-price">${product.price}</span>
                    {product.originalPrice && (
                      <>
                        <span className="original-price">${product.originalPrice}</span>
                        <span className="discount">-{product.discount}%</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {filteredProducts.length === 0 && (
              <div className="no-products">
                <h3>No products found</h3>
                <p>Try adjusting your filters</p>
                <button className="clear-all-btn" onClick={clearFilters}>Clear Filters</button>
              </div>
            )}

            {/* Pagination */}
            {filteredProducts.length > 0 && totalPages > 1 && (
              <div className="pagination">
                <button
                  className={`page-btn ${currentPage === 1 ? 'disabled' : ''}`}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  ← Previous
                </button>
                <span className="page-info">Page {currentPage} of {totalPages}</span>
                <button
                  className={`page-btn ${currentPage === totalPages ? 'disabled' : ''}`}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {isMobileFilterOpen && (
        <>
          <div className="modal-overlay" onClick={() => setIsMobileFilterOpen(false)} />
          <div className="mobile-modal">
            <div className="modal-header">
              <h2>Filters</h2>
              <button onClick={() => setIsMobileFilterOpen(false)}>✕</button>
            </div>
            <div className="modal-body">
              {/* Same filter content as sidebar */}
              <div className="filter-group">
                <h3 className="filter-heading">Categories</h3>
                <div className="filter-options">
                  {productCategories.map(cat => (
                    <label key={cat} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={selectedProductCategories.includes(cat)}
                        onChange={() => handleProductCategoryChange(cat)}
                      />
                      <span>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="filter-group">
                <h3 className="filter-heading">Price</h3>
                <div className="price-filter">
                  <div className="price-inputs">
                    <div className="price-input">
                      <span>$</span>
                      <input type="number" value={priceRange[0]} onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])} />
                    </div>
                    <span>-</span>
                    <div className="price-input">
                      <span>$</span>
                      <input type="number" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 200])} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="filter-group">
                <h3 className="filter-heading">Colors</h3>
                <div className="color-options">
                  {colorsList.map(color => (
                    <div
                      key={color.value}
                      className={`color-circle ${selectedColors.includes(color.value) ? 'selected' : ''}`}
                      style={{ backgroundColor: color.hex }}
                      onClick={() => handleColorChange(color.value)}
                    />
                  ))}
                </div>
              </div>
              <div className="filter-group">
                <h3 className="filter-heading">Size</h3>
                <div className="size-options">
                  {sizes.map(size => (
                    <button
                      key={size}
                      className={`size-btn ${selectedSizes.includes(size) ? 'active' : ''}`}
                      onClick={() => handleSizeChange(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <div className="filter-group">
                <h3 className="filter-heading">Dress Style</h3>
                <div className="filter-options">
                  {dressStyles.map(style => (
                    <label key={style} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={selectedDressStyles.includes(style)}
                        onChange={() => handleDressStyleChange(style)}
                      />
                      <span>{style}</span>
                    </label>
                  ))}
                </div>
              </div>
              <button className="apply-filter-btn" onClick={() => { applyFilters(); setIsMobileFilterOpen(false); }}>Apply Filter</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryPage;