import axios from 'axios';


const baseURL=process.env.REACT_APP_BASEURL||'http://localhost:8080/api'
export const autoApi=axios.create({
    baseURL:`${baseURL}/autos`
})

autoApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.authorization = token;
        }
        return config;
    },
    (error) => Promise.reject(error),
);
