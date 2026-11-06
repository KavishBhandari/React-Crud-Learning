import axios from "axios";
import { BASE_API_URL } from "../utils/constant";

export const fetchBrands = async (search) => {
    const brandRes = await axios.get(`${process.env.REACT_APP_API_URL}/brand/getBrands`, {
        params: search ? {search : search.trim()} : {}
    });
    return brandRes?.data?.data;
};

export const createBrand = async (name) => {
    const res = await axios.post(
        `${BASE_API_URL}/brand/addBrand`,
        {name}
    );  
    return res;
};

export const updateBrand = async (id, name) => {
    const res = await axios.put(
        `${BASE_API_URL}/brand/updateBrand/${id}`,
        {name}
    );
    return res;
};

export const deleteBrand = async (id) => {
    const res = await axios.put(
        `${BASE_API_URL}/brand/deleteBrand/${id}`
    );
    return res;
};

export const fetchBrandById = async (brandId) => {
    const res = await axios.get(
        `${BASE_API_URL}/brand/getBrand/${brandId}`
    );
    return res;
} 