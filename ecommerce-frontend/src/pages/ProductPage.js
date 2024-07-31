// src/ProductPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import ProductDetail from '../components/ProductDetails';

const ProductPage = () => {
  const { productId } = useParams();
  return (
    <div className="product-page">
      <h1>Product Details</h1>
      <ProductDetail productId={productId} />
    </div>
  );
};

export default ProductPage;
