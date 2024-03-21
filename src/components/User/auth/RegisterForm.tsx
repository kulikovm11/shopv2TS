import {SubmitHandler, useForm} from "react-hook-form";
import { IUser} from "../../../models";
import {joiResolver} from "@hookform/resolvers/joi";
import {authValidator} from "../../../validators";
import {useAppDispatch} from "../../../hooks";
import {authActions} from "../../../redux";
import {useNavigate} from "react-router-dom";

const RegisterForm = () => {

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

   const {register,
       handleSubmit,
       formState:{errors,isValid}
   } = useForm<IUser>({mode:'all', resolver:joiResolver(authValidator)})

    const registerUser:SubmitHandler<IUser> = async  (user) => {
        const {meta:{requestStatus}} = await dispatch(authActions.register(user))
        if (requestStatus === 'fulfilled'){
            navigate('/profile')
        }
    }

    return (
        <form onSubmit={handleSubmit(registerUser)}>
            <input type="text" placeholder={'firstName'} {...register('firstName')}/>
            <input type="text" placeholder={'lastName'} {...register('lastName')}/>
            <button disabled={!isValid}>Register</button>
            {Object.keys(errors).length > 0 && <div>{Object.values(errors)[0].message}</div> }
        </form>
    );
};

export {RegisterForm};

