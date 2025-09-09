import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_BASEURL});
API.interceptors.request.use((req)=>{
    if(localStorage.getItem("token")) {
        req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    }
    console.log("Outgoing request to:", req.baseURL + req.url);  // ✅ Add this
 
    return req;
});

export default API;