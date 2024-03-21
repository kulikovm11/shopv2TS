import {useEffect, useState} from "react";
import {IProduct} from "../models";
import {productsService} from "../services";


const useProducts = () => {

    const [products, setProducts] = useState<IProduct[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const page = parseInt(searchParams.get('page') || '1');
        setCurrentPage(page);

        try {
            setIsLoading(true);
            productsService.getAll(100, page).then(({ data }) => {
                setProducts([...data.products]);
                setIsLoading(false);
            });
        } catch (err) {
            console.error(err);
        }
    }, []);
    return { currentPage, isLoading, products, setCurrentPage };
}

export {useProducts}




