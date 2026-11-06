import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {

    const { user } = useAuth();

    return (
        <>
            <div className="flex items-center border-b-2 p-2 rounded-md ">
                <div className="bold">
                    ShopSphere
                </div>
                <div className="border-2 rounded-md ml-6 p-2 w-2/5">
                    Search Products, brands, categories
                </div>
                <div className="mx-24">
                    <nav>
                        <ul className="flex gap-4"  >
                            <li><Link to="/brand">Brand</Link></li>
                            <li><Link to="/category">Category</Link></li>
                        </ul>
                    </nav>
                </div>
                <div className="flex-1 justify-items-end">
                    <p>{user.name}</p>
                </div>
            </div>
        </>
    )
};

export default Header;