import { useEffect, useState } from "react";
import { getCategories } from "../services/categoryService";

const Category = () => {

    const [categoryData, setCategoryData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchCategory = async () => {
        try {
            const categoryData =  await getCategories();
            setCategoryData(categoryData);
        } catch (error) {
            setError(error?.message || "Internal Server Error")
        }finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategory();
    }, []); 
 
    return (
        <>
            <p>It is a category component.</p>
        </>
    );
};

export default Category;