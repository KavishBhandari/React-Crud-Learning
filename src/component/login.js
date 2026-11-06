import { useState, useRef } from "react";
import { SignIn } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {

    const [isLogin, setLogin] = useState(true);
    //const [errorMessage, setErrorMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState({});   // { name: "", email: "", password: "", server: "" }

    const navigate = useNavigate();
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const { userLogin } = useAuth();

    const toggleSignInForm = () => {
        setLogin(!isLogin)
        setErrorMessage({})
    };

    const mapServerErrors = (messages) => {
        console.log("messages :::: ", messages)
        const result = {};
        messages.forEach((msg) => {
            const lower = msg.toLowerCase();
            if (lower.startsWith("name")) result.name = result.name || msg;
            else if (lower.startsWith("email")) result.email = result.email || msg;
            else if (lower.startsWith("password")) result.password = result.password || msg;
            else result.server = msg;      // e.g. "Invalid credentials"
        });
        return result;
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMessage({})
        console.log("name::", name?.current?.value);
        console.log("email::", email?.current?.value);
        console.log("password::", password?.current?.value);

        const newErrors = {};
        if (!email?.current?.value) {
            newErrors.email = "Email is required."
        }
        else if (!(/\S+@\S+\.\S+/.test(email?.current?.value))) {
            newErrors.email = "Please enter valid emailId."
        }
        if (password?.current?.value.length < 4) {
            newErrors.password = "Minimum password length is 5"
        }

        if (Object.keys(newErrors).length > 0) {
            const errorMsg = setErrorMessage(newErrors);
            console.log("errorMsg :::::::", newErrors);
            return errorMsg;
        }


        let data = null;
        try {
            if (isLogin) {
                data = await SignIn(email?.current?.value, password?.current?.value);
                if (data?.statusCode === 200) {
                    userLogin(data?.data?.user, data?.data?.accessToken)
                    navigate("/product");
                }
            }
        } catch (error) {
            console.log("catch Error :::::::", error.message)
            setErrorMessage(mapServerErrors(error.messages || [error.message]))
        }
    };



    console.log("errorMessage ::::", errorMessage);

    return (
        <>

            <div className="flex min-h-screen ">
                <div className="w-[50%] bg-sky-500">

                </div>

                <div className="border-2 mx-auto my-auto rounded-md justify-items-center">
                    <h1 className="p-2">{isLogin ? "SignIn" : "Signup"}</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="p-2">
                            {!isLogin && (
                                <input ref={name} type="text" placeholder="Name" className="w-full border rounded-md p-2" />
                            )}
                        </div>

                        <div className="p-2">
                            <input ref={email} type="text" placeholder="Email" className="w-full border rounded-md p-2" />
                            {errorMessage.email && <p className="text-red-500 text-sm">{errorMessage.email}</p>}
                        </div>

                        <div className="p-2">
                            <input ref={password} type="password" placeholder="Password" className="w-full border rounded-md p-2" />
                            {errorMessage.password && <p className="text-red-500 text-sm">{errorMessage.password}</p>}
                        </div>

                        {/* The error message appears here */}
                        {errorMessage.server && <p className="text-red-500 text-sm">{errorMessage.server}</p>}
                        <button className="p-2">{isLogin ? "Login" : "SignUp"}</button>
                        <p className="p-2" onClick={toggleSignInForm}>
                            {isLogin ? "already registered do login." : "new on this platform please signup."}
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;