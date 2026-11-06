import axios from "axios"
import { BASE_API_URL } from "../utils/constant"

export const getCategories = async () => {
    const res = await axios.get(`${BASE_API_URL}/category/getAllCategory`);
    return res?.data;
}; 