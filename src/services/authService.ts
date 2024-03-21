import {IAuth, ILoginUser, IToken, IUser} from "../models";
import {apiService} from "./apiService";
import {urls} from "../constants/urls";
import {IRes} from "../types/axiosRes.type";
import  {AxiosResponse} from "axios";

class AuthService{

    private readonly accessKey = 'access'
    register(user:IUser):IRes<IUser>{
        return apiService.post(urls.auth.register, user,{
            headers:{ 'Content-Type': 'application/json' }
        })
    }

    async login(user:IAuth):Promise<ILoginUser>{
        const {data}:AxiosResponse<ILoginUser> = await apiService.post(urls.auth.logIn, user ,{
            headers: { 'Content-Type': 'application/json' }
        })
        this.setToken(data)
        return data
    }



    private setToken (data:{token:IToken}):void {
        localStorage.setItem(this.accessKey, JSON.stringify(data.token))
    }
    public getToken ():string {
       return localStorage.getItem(this.accessKey)
    }

    deleteToken ():void{
        localStorage.removeItem(this.accessKey)
    }


}

export const authService = new AuthService()
