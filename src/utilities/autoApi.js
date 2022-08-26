import axios from 'axios';
import i18next from 'i18next';


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
        if(i18next.language){
            config.headers.acceptLanguage=i18next.language;
        }
        return config;
    },
    (error) => Promise.reject(error),
);
