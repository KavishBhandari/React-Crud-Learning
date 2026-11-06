import api from "./api";

export const SignIn = async (email, password) => {
    const res = await api.post("/auth/signin", {email, password});
    return res.data;
};