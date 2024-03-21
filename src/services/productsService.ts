import {IDeletedProduct, IProduct, IResponse} from "../models";
import {apiService} from "./apiService";
import {urls} from "../constants/urls";
import {IRes} from "../types/axiosRes.type";

const productsService = {
    getAll:(limit:number, page:number|string):IRes<IResponse> =>apiService.get(`${urls.products.products}?limit=${limit}`),
    getById:(id:string):IRes<IProduct> =>apiService.get(`${urls.products.byId(id)}`),
    createProduct:(newProduct:IProduct):IRes<IProduct> => apiService.post(urls.products.addProduct, newProduct),
    updById:(id:string, product:IProduct):IRes<IProduct> => apiService.put(`${urls.products.products}/${id}`, product),
    deleteById:(id:string):IRes<IDeletedProduct> => apiService.delete(`${urls.products.products}/${id}`)
}


export {productsService}
