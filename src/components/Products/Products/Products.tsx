import {ChangeEvent, FC, useCallback, useEffect, useMemo, useState} from "react";

import {ProductCard} from "../Product-card/ProductCard";
import styles from './products.module.css'
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import * as React from "react";
import {LoaderComponent} from "../../Loader/LoaderComponent";
import {useNavigate} from "react-router-dom";
import {useProducts} from "../../../hooks";




const Products:FC = () =>  {

    const navigate = useNavigate();
    const perPage = 20;

    const { currentPage, isLoading, products, setCurrentPage} = useProducts()






    const handlePageChange = useCallback((event: ChangeEvent<any>, page: number) => {
        setCurrentPage(page);
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set('page', page.toString());
        const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
        navigate(newUrl);
    }, [setCurrentPage, navigate]);



    const startIndex = useMemo(() => (currentPage - 1) * perPage, [currentPage, perPage]);
    const endIndex = useMemo(() => Math.min(startIndex + perPage, products.length), [startIndex, perPage, products.length]);
    const itemsToRender = useMemo(()=> products.slice(startIndex,endIndex),[products,startIndex,endIndex])

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsPaginationVisible(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const [isPaginationVisible, setIsPaginationVisible] = useState(false);





    return (
        <div className={styles.WrapperContainer}>

             <div className={styles.Wrap}>
                {isLoading? null : itemsToRender.map(product=><ProductCard key={product.id} product={product}/>)}
            </div>

            {isLoading? <LoaderComponent/> : null}
            {isLoading ? null : (
                isPaginationVisible && (
                    <div className={styles.Paginator}>
                        <Stack spacing={2}>
                            <Pagination
                                count={Math.ceil(products.length / perPage)}
                                page={currentPage}
                                defaultPage={1}
                                variant="outlined"
                                shape="rounded"
                                onChange={handlePageChange}
                            />
                        </Stack>
                    </div>
                )
            )}

        </div>


    );
};

export {Products};

