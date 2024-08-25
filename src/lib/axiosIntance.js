import axios from "axios";

export const axiosInstance = axios.create({
    // baseURL: "https://ecommerce-server-voxn.onrender.com"
    // baseURL: "https://urban-nest-silk.vercel.app"
    baseURL: "http://localhost:4000"
})