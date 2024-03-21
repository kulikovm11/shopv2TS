import axios from "axios";
import {baseURL} from "../constants/urls";
import {authService} from "./authService";
import {createBrowserHistory} from "history"


const apiService = axios.create({baseURL})



apiService.interceptors.request.use(config=>{
    const access = authService.getToken();
    if (access){
        config.headers.Authorization = `Bearer ${access}`
        config.headers["Content-Type"] = 'application/json'
    }


    return config
})







export {
    apiService
}
