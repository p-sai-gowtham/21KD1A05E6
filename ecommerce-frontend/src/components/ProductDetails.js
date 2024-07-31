import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProducts } from '../utils/api';
import { Box, Container, Typography, Card, CardContent, CardMedia } from '@mui/material';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    const products = await fetchProducts(); // Adjust this to fetch products as needed
    const product = products.find(p => p.productName === id); // Find product by name
    setProduct(product);
  };

  if (!product) return <div>Loading...</div>;

  return (
    <Container>
      <Box my={4}>
        <Card>
          <CardMedia
            component="img"
            height="400"
            image={`https://picsum.photos/400?random=${Math.floor(Math.random() * 1000)}`}
            alt={product.productName}
          />
          <CardContent>
            <Typography variant="h4" gutterBottom>{product.productName}</Typography>
            <Typography>Company: {product.company}</Typography>
            <Typography>Category: {product.category}</Typography>
            <Typography>Price: ${product.price}</Typography>
            <Typography>Rating: {product.rating}</Typography>
            <Typography>Discount: {product.discount}%</Typography>
            <Typography>Availability: {product.availability}</Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default ProductDetails;
