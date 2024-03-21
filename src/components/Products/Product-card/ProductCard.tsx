import * as React from 'react';
import { FC } from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {IProduct} from "../../../models";
import style from './cardStyle.module.css'
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Rating } from '@mui/material';
import {Link} from "react-router-dom";

interface CardProps {

    product:IProduct


}

const ProductCard: FC<CardProps> = ({product}) => {
    return (
        <Card className={style.Card_wrap}>
            <CardMedia
                sx={{ height: 140}}
                image={product.thumbnail}
                title={product.title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {product.title} from <span className={style.Brand_title}>{product.brand}</span>
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                    <span className={style.Price_title}>{product.price.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })} </span>
                </Typography>
                <Rating name="half-rating-read" value={product.rating} precision={0.5} readOnly />

            </CardContent>
            <CardActions>
                <Button size="small"><ShoppingCartIcon fontSize='medium'/></Button>
                <Button size="small"><FavoriteIcon fontSize='medium'/></Button>
                <Button variant="outlined" size="small"><Link to={(product.id).toString()} state={{...product}} style={{textDecoration:'none', color:'#1976d2'}}>More</Link></Button>
            </CardActions>
        </Card>
    );
};

export {ProductCard};
