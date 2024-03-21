import {useAppSelector} from "../../hooks";
import {Alert} from "@mui/material";


const Profile = () => {

const {currentUser,} = useAppSelector(state => state.authReducer)

    return (
        <div>
            {currentUser && <Alert severity="success">
                Hello <strong>{currentUser.firstName} {currentUser.lastName}</strong>
            </Alert>}

           {/*<ProductForm/>*/}
        </div>
    );
};

export {Profile};
