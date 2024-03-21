import {FC, useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";

import {productValidator} from "../../../validators";
import style from '/formStyle.module.css'
import {productsService} from "../../../services";
import {IProduct} from "../../../models";
import {ProductCard} from "../Product-card/ProductCard";






const ProductForm:FC = () => {

    const [prod, setProd] = useState<IProduct[]>([])
    const [updProd, setUpdProd] = useState<IProduct | null>(null);

    const {register,
        handleSubmit,
        reset,
        formState:{errors,isValid},
        setValue} = useForm<IProduct>({mode:'all', resolver:joiResolver(productValidator)});

    const submit:SubmitHandler<IProduct> = async (prod:IProduct) => {
       const {data} = await productsService.createProduct(prod)
        setProd(prevState => [...prevState,data])
        reset()
    }

    useEffect(() => {
        if (updProd){
            setValue('title', updProd.title)
            setValue('description', updProd.description)
            setValue('price', updProd.price)
        }
    },[setUpdProd])

    return (
        // <form onSubmit={handleSubmit(submit)}>
        //     <input type="text" placeholder={'title'} {...register('title',{
        //         pattern:{
        //             value: /^[A-Za-z0-9\s]+$/,
        //             message:'Only letters and digits.'},
        //         required:{value:true, message:'Required!'}
        //
        //     })}/>
        //     {errors.title && <span>{errors.title.message}</span>}
        //
        //     <input type="text" placeholder={'description'} {...register('description')}/>
        //
        //     <input type="number" placeholder={'price'} {...register('price',{
        //         valueAsNumber:true,
        //         required:{value:true, message:'Required!'},
        //         min:{value:0.1, message:'Minimum 1 cent'},
        //         max:{value:2000, message:'Maximum 2000 dollars'}
        //     })}/>
        //     {errors.price && <span>{errors.price.message}</span>}
        //     <button>Save</button>
        // </form>
        <>
        <form onSubmit={handleSubmit(submit)}>
            <input type="text" placeholder={'title'} {...register('title',)}/>
            {errors.title && <span>{errors.title.message}</span>}

            <input type="text" placeholder={'description'} {...register('description')}/>
            {errors.description && <span>{errors.description.message}</span>}

            <input type="number" placeholder={'price'} {...register('price',)}/>
            {errors.price && <span>{errors.price.message}</span>}
            <button disabled={!isValid}>Save</button>
        </form>

            {prod.map(p => (<div>
                {<ProductCard product={p}/>}
            </div>))}

        </>
    );
};

export {ProductForm};
