import axios from 'axios';
const API_BASE_URL = "http://127.0.0.1:8000/categories";



export const fetchProducts = async (company = 'AMZ', category = 'Laptop', top = 10, minPrice = 1, maxPrice = 10000) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${category}/products`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}