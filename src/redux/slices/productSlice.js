// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// // Direct API calls instead of importing from api.js to avoid circular dependency
// const API_URL = import.meta.env.VITE_API_URL || 'https://fakestoreapi.com';

// const handleResponse = async (response) => {
//   if (!response.ok) {
//     const error = await response.json().catch(() => ({}));
//     throw new Error(error.message || `HTTP error! status: ${response.status}`);
//   }
//   return response.json();
// };

// // Direct API functions
// const getAllProducts = async () => {
//   const response = await fetch(`${API_URL}/products`);
//   return handleResponse(response);
// };

// const getProductById = async (id) => {
//   const response = await fetch(`${API_URL}/products/${id}`);
//   return handleResponse(response);
// };

// export const fetchProducts = createAsyncThunk(
//   'products/fetchProducts',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await getAllProducts();
//       return response;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const fetchProductById = createAsyncThunk(
//   'products/fetchProductById',
//   async (id, { rejectWithValue }) => {
//     try {
//       const response = await getProductById(id);
//       return response;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const fetchCategories = createAsyncThunk(
//   'products/fetchCategories',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await fetch(`${API_URL}/products/categories`);
//       const data = await handleResponse(response);
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const initialState = {
//   products: [],
//   selectedProduct: null,
//   categories: [],
//   loading: false,
//   error: null,
// };

// const productSlice = createSlice({
//   name: 'products',
//   initialState,
//   reducers: {
//     clearSelectedProduct: (state) => {
//       state.selectedProduct = null;
//     },
//     clearError: (state) => {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch all products
//       .addCase(fetchProducts.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchProducts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.products = action.payload;
//       })
//       .addCase(fetchProducts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Fetch single product
//       .addCase(fetchProductById.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchProductById.fulfilled, (state, action) => {
//         state.loading = false;
//         state.selectedProduct = action.payload;
//       })
//       .addCase(fetchProductById.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Fetch categories
//       .addCase(fetchCategories.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchCategories.fulfilled, (state, action) => {
//         state.loading = false;
//         state.categories = action.payload;
//       })
//       .addCase(fetchCategories.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { clearSelectedProduct, clearError } = productSlice.actions;
// export default productSlice.reducer;


// productSlice.js - Updated to handle rating properly




import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Direct API calls to your PostgreSQL backend
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// Get token from localStorage
const getToken = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user).token : null;
};

// Public API functions
const getAllProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  return handleResponse(response);
};

const getProductById = async (id) => {
  const response = await fetch(`${API_URL}/products/${id}`);
  return handleResponse(response);
};

const getProductsByCategory = async (category) => {
  const response = await fetch(`${API_URL}/products/category/${category}`);
  return handleResponse(response);
};

const getAllCategories = async () => {
  const response = await fetch(`${API_URL}/products/categories`);
  return handleResponse(response);
};

// Admin API functions (require authentication)
const createProductAdmin = async (productData) => {
  const token = getToken();
  // Remove rating if it's an object, or convert it properly
  const cleanData = { ...productData };
  if (cleanData.rating && typeof cleanData.rating === 'object') {
    delete cleanData.rating; // Let the database use default value
  }
  
  const response = await fetch(`${API_URL}/admin/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(cleanData)
  });
  return handleResponse(response);
};

const updateProductAdmin = async (id, productData) => {
  const token = getToken();
  // Remove rating if it's an object
  const cleanData = { ...productData };
  if (cleanData.rating && typeof cleanData.rating === 'object') {
    delete cleanData.rating;
  }
  
  const response = await fetch(`${API_URL}/admin/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(cleanData)
  });
  return handleResponse(response);
};

const deleteProductAdmin = async (id) => {
  const token = getToken();
  const response = await fetch(`${API_URL}/admin/products/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return handleResponse(response);
};

// Async thunks for public routes
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllProducts();
      return response.products || response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getProductById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllCategories();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async (category, { rejectWithValue }) => {
    try {
      const response = await getProductsByCategory(category);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Admin async thunks (require authentication)
export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const response = await createProductAdmin(productData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const response = await updateProductAdmin(id, productData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      await deleteProductAdmin(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  products: [],
  selectedProduct: null,
  categories: [],
  loading: false,
  error: null,
  totalProducts: 0,
  currentPage: 1,
  totalPages: 1,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.totalProducts = action.payload.length;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch single product
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch products by category
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create product (Admin)
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update product (Admin)
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        if (state.selectedProduct?.id === action.payload.id) {
          state.selectedProduct = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete product (Admin)
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(p => p.id !== action.payload);
        if (state.selectedProduct?.id === action.payload) {
          state.selectedProduct = null;
        }
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedProduct, clearError, setCurrentPage } = productSlice.actions;
export default productSlice.reducer;