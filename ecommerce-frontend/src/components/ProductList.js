import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../utils/api';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Pagination,
} from '@mui/material';

const companies = ["AMZ", "FLP", "SNP", "MYN", "AZO"];
const categories = ["Phone", "Computer", "TV", "Earphone", "Tablet", "Charger", "House", "Keypod", "Bluetooth", "Pendrive", "Remote", "Speaker", "Headset", "Laptop", "PL"];

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ company: '', category: '', minPrice: '', maxPrice: '' });
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadProducts();
  }, [filters, page]);

  const loadProducts = async () => {
    const data = await fetchProducts(filters.company, filters.category, 10, filters.minPrice, filters.maxPrice);
    setProducts(data);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          All Products
        </Typography>
        <Box mb={4}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select name="category" value={filters.category} onChange={handleFilterChange}>
              {categories.map(category => (
                <MenuItem key={category} value={category}>{category}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            margin="normal"
            label="Min Price"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleFilterChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Max Price"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleFilterChange}
          />
        </Box>
        <Grid container spacing={4}>
          {products.map(product => (
            <Grid item key={product.productName} xs={12} sm={6} md={4}>
              <Card>
                <Link to={`/product/${product.productName}`}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={`https://picsum.photos/200?random=${Math.floor(Math.random() * 1000)}`}
                    alt={product.productName}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>{product.productName}</Typography>
                    <Typography>Company: {product.company}</Typography>
                    <Typography>Category: {product.category}</Typography>
                    <Typography>Price: ${product.price}</Typography>
                    <Typography>Rating: {product.rating}</Typography>
                    <Typography>Discount: {product.discount}%</Typography>
                    <Typography>Availability: {product.availability}</Typography>
                  </CardContent>
                </Link>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box mt={4}>
          <Pagination count={10} page={page} onChange={handlePageChange} />
        </Box>
      </Box>
    </Container>
  );
}

export default AllProducts;
