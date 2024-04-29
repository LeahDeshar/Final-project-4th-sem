import {createSlice} from "@reduxjs/toolkit"
import { userLogin, userRegister,getCurrentUser, updateproUserCategory, updateUserNoti, deleteCurrentUser } from "./authAction";

const token = localStorage.getItem("token") ? localStorage.getItem("token") : null

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: false,
        user: JSON.parse(localStorage.getItem('curUser')) || null,
        token,
        error: null
    },
    reducers:{
        logout: (state) => {
            state.loading = false;
            state.user = null;
            state.token = null;
            state.error = null;
            localStorage.removeItem('curUser');
            localStorage.removeItem('token');
          },
    },
    extraReducers :(builder)=>{
        // login
        builder.addCase(userLogin.pending,(state)=>{
            state.loading = true;
            state.error=null
        })
        builder.addCase(userLogin.fulfilled,(state,{payload})=>{
            state.loading = false;
            // console.log(payload);
            state.user = payload.user;
            state.token = payload.token;
            state.error=null

        })
        builder.addCase(userLogin.rejected,(state,{payload})=>{
            state.loading = false;
            state.error = payload;
            console.log("error payload debug",payload );
        })
         // register
         builder.addCase(userRegister.pending,(state)=>{
            state.loading = true;
            state.error=null
        })
        builder.addCase(userRegister.fulfilled,(state,{payload})=>{
            state.loading = false;
            console.log(payload);

            state.user = payload.user;

        })
        builder.addCase(userRegister.rejected,(state,{payload})=>{
            state.loading = false;
            state.error = payload;
        })

        // User Delete
        builder.addCase(deleteCurrentUser.pending, (state) => {
            state.loading = true;
            state.error = null;
          });
          builder.addCase(deleteCurrentUser.fulfilled, (state) => {
            console.log("delete slice");
            // Reset the state to initial values or mark the user as logged out
            state.loading = false;
            state.user = null;
            state.token = null;
            state.error = null;
            localStorage.clear()
          });
          builder.addCase(deleteCurrentUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });
// ---------------------------------
// updateproUserCategory

        builder.addCase(updateproUserCategory.pending,(state)=>{
            state.loading = true;
            state.error=null
        })
        builder.addCase(updateproUserCategory.fulfilled,(state,{payload})=>{
            state.loading = false;
            console.log(payload);

            state.user = payload.user;

        })
        builder.addCase(updateproUserCategory.rejected,(state,{payload})=>{
            state.loading = false;
            state.error = payload;
        })
// ---------------------------------
// updateUserNoti
        builder.addCase(updateUserNoti.pending,(state)=>{
            state.loading = true;
            state.error=null
        })
        builder.addCase(updateUserNoti.fulfilled,(state,{payload})=>{
            state.loading = false;
            console.log(payload);

            state.user = payload.user;

        })
        builder.addCase(updateUserNoti.rejected,(state,{payload})=>{
            state.loading = false;
            state.error = payload;
        })

        
        // get current user
        builder.addCase(getCurrentUser.pending,(state)=>{
            state.loading = true;
            state.error=null
        })
        builder.addCase(getCurrentUser.fulfilled,(state,{payload})=>{
            state.loading = false;
            state.user = payload.user;
        })
        builder.addCase(getCurrentUser.rejected,(state,{payload})=>{
            state.loading = false;
            state.error = payload;
        })
    }

})
export default authSlice;
export const { logout } = authSlice.actions;