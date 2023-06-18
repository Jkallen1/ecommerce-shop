import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

function ProductDetails() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetchProductDetails(productId)
        .then((product) => setProduct(product))
        .catch((error) => console.error('Error fetching product details:', error))
    }, [productId])

    async function fetchProductDetails(productId) {
        try {
            const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
            const product = await response.json();
            return product;
        } catch(error) {
            throw error;
        }
    }

    if (!product) {
        return <p>Loading Product Details...</p>;
    }

    return (
        <div>
            <h1>Product Details</h1>
            <p>Product ID: {productId}</p>
            <img src= {product.image} alt= {product.title} />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
        </div>
    );
}

export default ProductDetails;