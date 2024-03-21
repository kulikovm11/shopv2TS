const baseURL = 'https://dummyjson.com'

const products = '/products'


const urls ={
    products:{
        products,
        byId:(id:string):string => `${products}/id`,
        addProduct:`${products}/add`

    },
    auth:{
        register:`${baseURL}/users/add`,
        logIn:`${baseURL}/auth/login`,
        user:(id:number):string => `${baseURL}/users/${id.toString()}`
    }
}

export {urls, baseURL}
