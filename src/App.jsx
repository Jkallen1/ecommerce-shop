import React, { useEffect, useState, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ProductDetails from './components/ProductDetails';
import Categories from './components/Categories';
import './App.css';
import FavouritesPage from './components/FavouritesPage';
import HeartIcon from './components/HeartIcon';
import { FavoritesProvider } from './context/FavouritesContext';


function App() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts(selectedCategory)
      .then((products) => setProducts(products))
      .catch((error) => setError(error.message));
  }, [selectedCategory]);

  useEffect(() => {
    fetchCategories()
      .then((categories) => setCategories(categories))
      .catch((error) => setError(error.message));
  }, []);

  async function fetchCategories() {
    try {
      const response = await fetch('https://fakestoreapi.com/products/categories');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const categories = await response.json();
      return categories;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function fetchProducts(category) {
    try {
      setLoader(true);
      const url = category
        ? `https://fakestoreapi.com/products/category/${category}`
        : 'https://fakestoreapi.com/products';
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const products = await response.json();
      return products;
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setLoader(false); // Set loader to false regardless of success or failure
    }
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <BrowserRouter>
      <FavoritesProvider>
        <div className="app">
          <nav>
            <h1>Fake Store</h1>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/favorites">Favorites</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <Categories
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategoryChange={handleCategoryChange}
                  />
                  {loader ? (
                    <p>Loading...</p>
                  ) : error ? (
                    <p>Error: {error}</p>
                  ) : (
                    <ul className="products">
                      {products.map((product) => (
                        <li key={product.id}>
                          <Link to={`/products/${product.id}`}>
                            <img src={product.image} alt={product.title} />
                            <span>{product.title}</span>
                          </Link>
                          <HeartIcon productId={product.id} />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              }
            />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/favorites" element={<FavouritesPage />} />
          </Routes>
        </div>
      </FavoritesProvider>
    </BrowserRouter>
  );
}

export default App;