import axios from 'axios';

export const fetchCategories = async () => {
  const response = await axios.get('https://fakestoreapi.com/products/categories');
  return response.data;
};

export const fetchProducts = async () => {
  const response = await axios.get('https://fakestoreapi.com/products');
  return response.data;
};

export const fetchProductsByCategory = async (category: string) => {
  const response = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
  return response.data;
};
export const fetchProductById = async (id: number) => {
  const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
  return response.data;
};