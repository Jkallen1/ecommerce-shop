import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProductDetails(id)
      .then((product) => setProduct(product))
      .catch((error) => console.error('Error fetching product details:', error));
  }, [id]);

  async function fetchProductDetails(productId) {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${productId}`);

      if (!response.ok) {
        throw new Error('Error fetching product details');
      }

      const productData = await response.json();

      if (Object.keys(productData).length === 0) {
        throw new Error('Empty response');
      }

      return productData;
    } catch (error) {
      throw error;
    }
  }

  if (!product) {
    return <p>Loading Product Details...</p>;
  }

  return (
    <div>
      <h1>Product Details</h1>
      <p>Product ID: {id}</p>
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{product.description}</p>
    </div>
  );
}

export default ProductDetails;
