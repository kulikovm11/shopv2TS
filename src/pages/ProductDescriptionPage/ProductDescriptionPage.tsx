import {ProductDescription} from "../../components";
import {useLocation, useParams} from "react-router-dom";


const ProductDescriptionPage = () => {

    const {prodId} = useParams()
    const {state} = useLocation()


    return (
        <>
            {prodId && <ProductDescription prodId={prodId} state={state}/>}
        </>
    );
};

export {ProductDescriptionPage};
