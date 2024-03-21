import {createAsyncThunk, createSlice, isFulfilled, isRejectedWithValue} from "@reduxjs/toolkit";
import {IAuth, ILoginUser, IUser} from "../../models";
import {AxiosError} from "axios";
import {authService} from "../../services";

interface IState{
    error:string|null
    currentUser:ILoginUser,



}

const initialState:IState ={
    error:null,
    currentUser:null,



}




const register = createAsyncThunk<void, IUser>(
    'authSlice/register',
    async (user, {rejectWithValue}) => {
        try {
            await authService.register(user)

        }catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)

        }
    }
)

const login = createAsyncThunk<ILoginUser,IAuth>(
    'authSlice/login',
    async (user, {rejectWithValue}) =>{
        try {
              const response = await authService.login(user)
            return response
        }catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)



const slice = createSlice({
    name:'authSlice',
    initialState,
    reducers:{
        logoutUser:(state)=>{
            state.currentUser = null
        }
    },
    extraReducers:builder =>
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.currentUser = action.payload
                console.log('check current user',action.payload)

            })

            .addMatcher(isFulfilled,state => {
                state.error = null
            })

            .addMatcher(isRejectedWithValue(),(state, action) => {
                state.error = action.payload as string
            })


})

const {actions,reducer:authReducer} = slice

const authActions = {
    ...actions,
    register,
    login,

}
export const {logoutUser} = slice.actions

export {authReducer,authActions}
