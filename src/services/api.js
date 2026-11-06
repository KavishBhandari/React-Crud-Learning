import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { "Content-Type": "application/json" },
});

// Runs before every request: adds the token if the user is logged in
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Runs after every response: turns server errors into simple messages
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const data = error.response?.data;
    let messages;

    if (!error.response) {
      // server down, no internet, CORS failure
      messages = ["Cannot reach the server. Please try again later."];
    } else if (Array.isArray(data?.message)) {
      // validation errors: ["email must be an email", "password ..."]
      messages = data.message;
    } else {
      // single message: "Invalid credentials"
      messages = [data?.message || "Something went wrong"];
    }

    const err = new Error(messages.join(", "));
    err.messages = messages;
    err.status = error.response?.status;
    return Promise.reject(err);
  }
);

export default api;