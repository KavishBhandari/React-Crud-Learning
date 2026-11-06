import { useEffect, useState } from "react";
import { createBrand, deleteBrand, fetchBrandById, fetchBrands, updateBrand } from "../services/brandService";
import { useNavigate, useParams } from "react-router-dom";

const Brand = () => {
    const [brandData, setBrandData] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const [showForm, setShowForm] = useState(false);
    const [brandName, setBrandName] = useState("");
    const [editId, setEditId] = useState(null);

    const [search, setSearch] = useState("");

    const { id } = useParams();
    const navigate = useNavigate();

    // open in CREATE mode
    const openCreate = () => {
        setEditId(null);
        setBrandName("");
        setError("");
        setShowForm(true);
    };

    // open in UPDATE mode
    const openEdit = (brand) => {
        setEditId(brand._id);
        setBrandName(brand.name);
        setError("");
        setShowForm(true);
    };

    const closeForm = () => setShowForm(false);

    async function getBrands() {
        try {
            const data = await fetchBrands();
            setBrandData(data);
        } catch (error) {
            setError(error?.message || "Internal Server Error")
        } finally {
            setLoading(false)
        }
    };

    const getBrandById = async (id) => {
        try {
            const data = await fetchBrandById(id);
            console.log(" setBrandData ::::::", data);
            setBrandData(data?.data?.data ? [data?.data?.data] : []);

        } catch (error) {
            setError(error?.message || "Internal Server Error")
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        //getBrands()
        if (id) {
            getBrandById(id);
        } else {
            getBrands();
        }
    }, [id]);

    console.log("brandData ::::::", brandData);
    {/*flex flex-col items-center border-2 w-fit h-24 p-2*/ }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!brandName.trim()) return setError("Brand name is required");

        try {
            if (editId) {
                await updateBrand(editId, brandName.trim());
            }
            else {
                await createBrand(brandName.trim());
            }

            closeForm();
            getBrands(); // refresh the list
        } catch (err) {
            const msg = err?.response?.data?.message;
            setError(Array.isArray(msg) ? msg.join(", ") : msg || err.message);
        }
    };

    const handleDelete = async (brand) => {
        if (!window.confirm("Are you sure you want to delete this brand?")) return;
        try {
            await deleteBrand(brand?._id)
            getBrands();
        } catch (error) {
            setError(error.message)
        }
    };

    return (
        <>
            <div onClick={openCreate} className="m-2">
                <button className="border rounded-md p-1 bg-sky-500 text-sky-200"> + Add Brand </button>
            </div>

            {showForm && (
                <div className="border p-2 w-1/6 rounded-md">
                    <form onSubmit={handleSubmit}>
                        <div className="flex items-center justify-center p-2">
                            <h2 >{editId ? "Update Brand" : "Create Brand"}</h2>
                        </div>
                        <input
                            type="text"
                            placeholder="BrandName"
                            className="border rounded-md p-1 w-full"
                            value={brandName}
                            onChange={
                                (e) => setBrandName(e.target.value)
                            }
                        />
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <div className="p-2">
                            <button className="border rounded-md p-1 bg-grey-500">
                                {editId ? "Update" : "Create"}
                            </button>
                            <button className="border rounded-md p-1 bg-grey-500 m-1" onClick={closeForm}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div>
                {loading && <p>Loading .....</p>}
                <div className="flex gap-2 border m-3 p-2 ">
                    {

                        brandData.map((elm) => (
                            <div className="flex flex-col items-center justify-center border-2 h-24 w-fit min-w-24 px-3" key={elm?._id}>
                                <p onClick={() => {
                                    navigate(`/brand/${elm?._id}`)
                                }}>{elm.name}</p>
                                <div className="flex gap-2">
                                    <button className="text-sky-600 text-sm border rounded-md p-1 bg-gray-200" onClick={() => openEdit(elm)}>Edit</button>
                                    <button className="text-sky-600 text-sm border rounded-md p-1 bg-gray-200" onClick={() => handleDelete(elm)}>Delete</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            {/*showForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <form onSubmit={handleSubmit} className="bg-white rounded-md p-4 w-80 flex flex-col gap-3">
                        <h2 className="text-lg font-semibold">{editId ? "Update Brand" : "Create Brand"}</h2>

                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Brand name"
                            className="border rounded-md p-2"
                        />

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <div className="flex gap-2 justify-end">
                            <button type="button" onClick={closeForm} className="border rounded-md px-4 py-1">
                                Cancel
                            </button>
                            <button className="bg-sky-500 text-white rounded-md px-4 py-1">
                                {editId ? "Update" : "Create"}
                            </button>
                        </div>
                    </form>
                </div>
            )*/}

        </>
    );
};

export default Brand;