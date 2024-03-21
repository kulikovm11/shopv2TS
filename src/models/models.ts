
export interface IResponse{
    products:[IProduct];
    total:string;
    skip:string;
    limit:string;
}

export interface IProduct{
    id:number;
    title:string;
    description:string;
    price:number;
    discountPercentage:number;
    rating:number;
    stock:number;
    brand:string;
    category:string;
    thumbnail:string;
    images:[string];
}

export interface IDeletedProduct extends IProduct{
    isDeleted: boolean;
    deletedOn: Date;
}

export interface IUser{
    id:number;
    firstName:string;
    lastName:string;
    maidenName:string;
    age:number;
    gender:string;
    email:string;
    phone:string;
    username:string;
    password:string;
    birthDate:string;
    image:string;
}

export interface IAuth{
    username:string;
    password:string;
}

export interface ILoginUser{
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
    token:IToken;
}

export interface IToken {
    token:string
}
