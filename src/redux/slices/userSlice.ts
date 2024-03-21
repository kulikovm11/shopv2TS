import {createSlice} from "@reduxjs/toolkit";



const initialState = {
    // currentUser : null,
    // cart: [],
    // isLoading: false,
    // formType: "signup",
    // showForm: false,
    // errorMessage: ""
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{

    }
})

export const {reducer:userReducer} = userSlice


