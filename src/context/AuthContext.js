import { createContext, useState, useContext } from "react";

const AuthContext = createContext(null);

{/*{ children } is the content placed between <AuthProvider> and </AuthProvider>. In your app, that content is <App />*/}

export const AuthProvider = ({ children }) => {    
    const [user, setUser] = useState(() => {
        try {
            const saved = localStorage.getItem("user");
            return saved ? JSON.parse(saved) : null;
        } catch {
            return null;
        }
    });

    const userLogin = (userData, token) => {
        setUser(userData);
        console.log("user Info from context ::::", user);
        localStorage.setItem("user", JSON.stringify(userData));
        if (token) {
            localStorage.setItem("token", token);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    return (
        <>
            <AuthContext.Provider value={{ user, userLogin, logout }}>
                {children} {/*here app is render*/}
            </AuthContext.Provider>
        </>
    );
};

export const useAuth = () => useContext(AuthContext);

