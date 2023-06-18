import React from 'react';
import ProductDetails from './ProductDetails';

function Categories({ categories, onCategoryChange }) {
  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {categories.map((category) => (
          <li key={category} onClick={() => onCategoryChange(category)}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;