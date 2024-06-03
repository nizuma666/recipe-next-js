// utils/api.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL, // Replace with your API base URL
  timeout: 5000, // Set a timeout if needed
  headers: {
    'Content-Type': 'application/json',
    // Add custom headers here
  },
});

export const GetRecipes = async (url, options = {}) => {
  try {
    const response = await axiosInstance.get(url, options);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Data fetching failed');
  }
};
