import { useEffect, useState } from "react";
import { craeteProduct, getProduct, updateProduct } from "../services/productService";
import { getCategories } from "../services/categoryService";
import { fetchBrands } from "../services/brandService";

const Product = () => {
    const [product, setProduct] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [categoryData, setCategoryData] = useState([]);
    const [brandData, setBrandData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const [productData, setProductData] = useState({
        name: "",
        title: "",
        description: "",
        price: "",
        brand_id: "",
        category_id: "",
        produtImage: null,
        stock: ""
    });
    const [editId, setEditId] = useState(null);

    const openCreate = () => {
        setEditId(null);
        setShowForm(true);
        setError("");
        setProductData({
            name: "",
            title: "",
            description: "",
            price: "",
            brand_id: "",
            category_id: "",
            produtImage: null,
            stock: ""
        });
    };

    const openEdit = (elm) => {
        console.log("openEdit elm :::::::", elm)
        setEditId(elm?._id);
        setShowForm(true);
        setError("");
        setProductData({
            name: elm?.name ?? "",
            title: elm?.title ?? "",
            description: elm?.description ?? "",
            price: elm?.price ?? "",
            brand_id: elm?.Brand?._id ?? "",
            category_id: elm?.category?._id ?? "",
            produtImage: elm?.ProductImages[0]?.imageUrl ?? null,
            stock: elm?.stock ?? ""
        });
    };

    const fetchProducts = async () => {
        try {
            const data = await getProduct();
            setProduct(data);
        } catch (error) {
            setError(error.message);
        } /*finally {
            setLoading(false)
        }*/
    };

    const fetchCategories = async () => {
        try {
            const categoryData = await getCategories();
            setCategoryData(categoryData);
        } catch (error) {
            setError(error.message);
        } /*finally {
            setLoading(false)
        }*/
    };

    const getBrand = async () => {
        try {
            const brandData = await fetchBrands();
            setBrandData(brandData);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setProductData((prev) => {
            return {
                ...prev,
                [name]: files ? files[0] : value
            }
        });
    };

    const openForm = () => setShowForm(false);
    console.log("showForm :::::::",)

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("e ::::::::::", e);
        const formData = new FormData();
        formData.append("name", productData.name);
        formData.append("title", productData.title);
        formData.append("description", productData.description);
        formData.append("price", productData.price);
        formData.append("stock", productData.stock);

        formData.append("brand_id", productData.brand_id);
        formData.append("category_id", productData.category_id);
        formData.append("produtImage", productData?.Image);

        try {
            if (editId) {
                await updateProduct(editId, formData);
                setShowForm(false);

                setProductData({
                    Name: "",
                    title: "",
                    description: "",
                    price: "",
                    brand_id: "",
                    category_id: "",
                    produtImage: null,
                    stock: ""
                });

            } else {

                //formData.append("Name", productData.Name);

                /*if (productData?.Image) {
                    formData.append("produtImage", productData?.Image)
                }*/

                const response = await craeteProduct(formData);

                setShowForm(false);

                setProductData({
                    Name: "",
                    title: "",
                    description: "",
                    price: "",
                    brand_id: "",
                    category_id: "",
                    produtImage: null,
                    stock: ""
                });
            }
            openForm();
            //fetchProducts();

        } catch (error) {

        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)

            await Promise.all([
                fetchProducts(),
                fetchCategories(),
                getBrand()
            ])

            setLoading(false)
        }
        fetchData();
        //fetchProducts();
    }, []);

    const products = product?.produts?.data ?? [];

    const filterProducts = selectedCategory ? products.filter((elm) => {
        return elm?.category?.categoryName === selectedCategory
    }) : products;



    console.log(" filterProducts :::::::::", filterProducts);

    console.log("categoryData :::::::", categoryData?.data?.category);

    console.log("brandData :::::::", brandData);
    //console.log("product ::::", product);

    return (
        <>
            <div className="flex min-h-screen">
                <div className="w-1/5 bg-sky-500">
                    {loading && <p>Loading .....</p>}
                    {error && <p className="text-red-500">error</p>}
                    <div className="mx-2">
                        <p className="font-bold text-grey-600 ">Catgory</p>
                        {
                            categoryData?.data?.category.map((elm) => (
                                <div className="my-2" key={elm?._id}>
                                    <button className={`text-gray-700 hover:text-blue-600 ${selectedCategory === elm.categoryName
                                        ? "font-bold text-blue-600"
                                        : ""
                                        }`} onClick={() => {
                                            setSelectedCategory(elm.categoryName)
                                        }}>
                                        {elm.categoryName}
                                    </button>
                                    {/*<p className="text-grey-400">{elm.categoryName}</p>*/}
                                </div>
                            ))
                        }
                        <button className="my-2" onClick={() => {
                            setSelectedCategory(null)
                        }}>
                            Show All Products
                        </button>
                    </div>
                </div>

                <div className="w-4/5 m-2">
                    {loading && <p>Loading ......</p>}
                    {error && <p className="text-red-500">error</p>}
                    <div className="flex justify-end p-2">
                        <button className="border rounded-md p-1 bg-blue-200" onClick={
                            openCreate
                        }>
                            CreateProduct
                        </button>
                    </div>

                    <div className="flex flex-wrap border-2 gap-3 p-3">
                        {
                            filterProducts.map((elm) => (
                                <div className="border-2 p-3 w-[300px]" key={elm?._id}>
                                    <img
                                        alt={elm.name}
                                        src={elm.ProductImages?.[0]?.imageUrl}
                                        className="w-full h-48 object-cover"
                                    />
                                    <p>{elm?.category?.categoryName}</p>
                                    <h2>{elm.name}</h2>
                                    <p>{elm?.averageRating ?? 0}</p>
                                    <p>{elm?.Brand?.name}</p>
                                    <strong>{elm?.price}</strong>
                                    <div>
                                        {/*<button>Edit</button>*/}
                                        <button className="w-full bg-blue-500 border-1 rounded-md p-1">Add to cart</button>
                                        <div className="flex my-2 gap-1">
                                            <button className="border p-1 rounded-md w-1/2" onClick={() => openEdit(elm)}>Edit</button>
                                            <button className="border p-1 rounded-md w-1/2">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>

                {showForm && (
                    <div>
                        <h1 className="bg-sky-600 border rounded-md p-1">{editId ? "Update Product" : "Create Product"}</h1>
                        <form onSubmit={handleSubmit}>
                            <input
                                className="border rounded-md p-1 w-full m-2"
                                type="text"
                                name="name"
                                placeholder="ProductName"
                                value={productData?.name}
                                onChange={handleChange}
                            />
                            <input
                                className="border rounded-md p-1 w-full m-2"
                                type="text"
                                name="title"
                                placeholder="Title"
                                value={productData?.title}
                                onChange={handleChange}
                            />
                            <input
                                className="border rounded-md p-1 w-full m-2"
                                type="text"
                                name="description"
                                placeholder="Description"
                                value={productData?.description}
                                onChange={handleChange}
                            />
                            <input
                                className="border rounded-md p-1 w-full m-2"
                                type="text"
                                name="price"
                                placeholder="Price"
                                value={productData?.price}
                                onChange={handleChange}
                            />
                            {/*<input
                                className="border rounded-md p-1 w-full m-2"
                                type="text"
                                name="Brand"
                                placeholder="Brand"
                                value={productData?.Brand}
                                onChange={handleChange}
                            />*/}
                            {/*<input
                                className="border rounded-md p-1 w-full m-2"
                                type="text"
                                name="Category"
                                placeholder="Category"
                                value={productData?.Category}
                                onChange={handleChange}
                            />*/}

                            <select
                                name="category_id"
                                value={productData.Category}
                                onChange={handleChange}
                                className="border rounded-md p-1 w-full m-2"
                            >
                                <option value="">Select Category</option>

                                {categoryData?.data?.category.map((elm) => (
                                    <option key={elm._id} value={elm._id}>
                                        {elm.categoryName}
                                    </option>
                                ))}
                            </select>
                            <select
                                name="brand_id"
                                value={productData.Brand}
                                onChange={handleChange}
                                className="border rounded-md p-1 w-full m-2"
                            >
                                <option>Select Brands</option>

                                {brandData.map((elm) => (
                                    <option key={elm._id} value={elm._id}>
                                        {elm.name}
                                    </option>
                                ))}
                            </select>
                            <input
                                className="border rounded-md p-1 w-full m-2"
                                type="file"
                                name="Image"
                                placeholder="Image"
                                accept="image/*"
                                onChange={handleChange}
                            />
                            <input
                                className="border rounded-md p-1 w-full m-2"
                                type="text"
                                name="stock"
                                placeholder="Stock"
                                value={productData?.stock}
                                onChange={handleChange}
                            />

                            <div>
                                <button type="submit" className="border p-1 rounded-md bg-green-200 m-2">{editId ? "UpdateProduct" : "CreateProduct"}</button>
                                <button type="button" className="border p-1 rounded-md bg-red-200" onClick={openForm}>Cancel</button>
                            </div>
                        </form>
                    </div>)}
            </div>
        </>
    );
};
export default Product;