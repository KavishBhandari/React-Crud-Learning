import axios from "axios";
import { BASE_API_URL } from "../utils/constant";

export const getProduct = async () => {
  const productRes = await axios.get(`http://localhost:3000/product/productListing`)
  console.log("productRes ::::::::", productRes);
  return productRes.data.data;
};

export const craeteProduct = async (productCreationData) => {
  const prooductData = await axios.post(`${BASE_API_URL}/product/addProduct`, productCreationData);
  console.log("prooductData :::::", prooductData);
  return prooductData;
};

export const updateProduct = async (id, data) => {
  const productUpdatedData = await axios.put(`${BASE_API_URL}/product/updateProduct/${id}`, data);
  return productUpdatedData;
};