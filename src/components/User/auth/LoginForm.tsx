import { SubmitHandler, useForm } from "react-hook-form";
import { IAuth } from "../../../models";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { authActions } from "../../../redux";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";

const LoginForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { error } = useAppSelector((state) => state.authReducer);

    const {
        handleSubmit,
        register,
        formState: { isValid },
    } = useForm<IAuth>();

    const login: SubmitHandler<IAuth> = async (user) => {
        const { meta: { requestStatus }, payload: currentUser } = await dispatch(authActions.login(user));

        if (requestStatus === "fulfilled") {
            sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
            navigate("/profile");
        }
    };

    return (
        <form onSubmit={handleSubmit(login)}>
            <input type="text" placeholder={"username"} {...register("username", { required: true })} />
            <input type="text" placeholder={"password"} {...register("password", { required: true })} />
            <button disabled={!isValid}>Login</button>
            {error ? <Alert severity="error">Invalid username or password!</Alert> : null}
        </form>
    );
};

export { LoginForm };
