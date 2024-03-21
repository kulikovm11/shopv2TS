import React, {FC, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

import {IProduct} from "../../../models";
import {productsService} from "../../../services";
import style from './ProdDescStyle.module.css'
import {Divider} from "@mui/material";
import {Tab, Tabs} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {SliderComponent} from "../Slider/SliderComponent";


interface ProductDescriptionProps {
    prodId:string
    state:IProduct
    children?: React.ReactNode;

}





const ProductDescription:FC<ProductDescriptionProps> = ({prodId,state}) => {

    const [product, setProduct] = useState<IProduct | null> (null)
    const [key, setKey] = useState<string>('home');
    const navigate = useNavigate()




    useEffect(() => {
        if (state){
            setProduct({...state})
        }else {
            productsService.getById(prodId!).then(({data}) => setProduct(data))
        }
    },[prodId, state])






    return (
        <div className={style.Wrapper}>
            <div className={style.Top_part}>


                        <SliderComponent images={product?.images || []}/>





                    <div className={style.Description}>
                        <span className={style.Title}>{product?.title}</span>
                        <Divider/>
                        <span className={style.Brand}>{product?.brand}</span>
                        <Divider/>


                        <div className={style.Actions}>
                            <div className={style.Price}>
                                {product?.price?.toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </div>
                            <div className={style.Buttons}>
                                <Button variant="contained" onClick={()=>navigate(-1)}>Back</Button>
                                <Button size="small"><ShoppingCartIcon fontSize='medium'/></Button>
                                <Button size="small"><FavoriteIcon fontSize='medium'/></Button>
                            </div>

                        </div>

                    </div>

            </div>

            <div className={style.Tabs}>
                    <Tabs
                        id="controlled-tab-example"
                        activeKey={key}
                        onSelect={(k) => k !== null && setKey(k)}
                        className="mb-3"
                    >
                        <Tab eventKey="home" title="Description">
                            {product?.description}
                        </Tab>
                        <Tab eventKey="reviews" title="Reviews" >
                            Rate: {product?.rating}
                            Tab content for Contact
                        </Tab>
                        <Tab eventKey="similar" title="Similar">
                            Tab content for Profile
                        </Tab>
                    </Tabs>
            </div>
        </div>
    );
};

export {ProductDescription};
