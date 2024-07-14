import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAdmin: false,
    loader: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userExists: (state, action) => {
            console.log(action.payload , "14");
            state.user = action.payload;
            state.loader = false
        },
        userNotExist: (state) => {
            state.user = null;
            state.loader = false
        }
    }
})

export default authSlice
export const { userExists, userNotExist } = authSlice.actions