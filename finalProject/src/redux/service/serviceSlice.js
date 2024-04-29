import {createSlice} from "@reduxjs/toolkit"
import { createServicePost, deleteServiceOfUser, getAllService, getAllServiceByCategory, getServiceOfUser, updateServiceOfUser } from "./serviceAction"

const token = localStorage.getItem("token") ? localStorage.getItem("token") : null
const storedServicePosts = localStorage.getItem('servicePosts');
const serviceSlice = createSlice({
    name: "service",
    initialState:{
        loading: false,
        servicePosts: storedServicePosts?JSON.parse(storedServicePosts): [],
        token,
        error: null
    },
    reducers:{},
    extraReducers:(builder)=>{
    /******************************** */
        // Create Service Post 
    builder.addCase(createServicePost.pending,(state)=>
    {
        state.loading =true;
        state.error=null
    })
    builder.addCase(createServicePost.rejected,(state,{payload})=>
    {
        state.loading =false;
        state.error =payload;
    })
    builder.addCase(createServicePost.fulfilled,(state,{payload})=>
    {
        state.loading =false;
        console.log(payload);
        state.servicePosts =payload
        state.error =null
    })

    /******************************** */
    // Get all post of specific user
    builder.addCase(getServiceOfUser.pending,(state)=>
    {
        state.loading =true;
        state.error=null
    })
    builder.addCase(getServiceOfUser.rejected,(state,{payload})=>
    {
        state.loading =false;
        state.error =payload;
    })
    builder.addCase(getServiceOfUser.fulfilled,(state,{payload})=>
    {
        state.loading =false;
        console.log("specific",payload);
        state.servicePosts =payload
        state.error =null
    }) 

    /******************************** */
    // Get all post 
    builder.addCase(getAllService.pending,(state)=>
    {
        state.loading =true;
        state.error=null
    })
    builder.addCase(getAllService.rejected,(state,{payload})=>
    {
        state.loading =false;
        state.error =payload;
    })
    builder.addCase(getAllService.fulfilled,(state,{payload})=>
    {
        state.loading =false;
        console.log("All",payload);
        state.servicePosts =payload
        state.error =null
    }) 
    /******************************** */
    // Get all post by category 
    builder.addCase(getAllServiceByCategory.pending,(state)=>
    {
        state.loading =true;
        state.error=null
    })
    builder.addCase(getAllServiceByCategory.rejected,(state,{payload})=>
    {
        state.loading =false;
        state.error =payload;
    })
    builder.addCase(getAllServiceByCategory.fulfilled,(state,{payload})=>
    {
        state.loading =false;
        console.log("All",payload);
        state.servicePosts =payload
        state.error =null
    }) 
    /******************************** */
    // UPDATE a post
    builder.addCase(updateServiceOfUser.pending,(state)=>
    {
        state.loading =true;
        state.error=null
    })
    builder.addCase(updateServiceOfUser.rejected,(state,{payload})=>
    {
        state.loading =false;
        state.error =payload;
    })
    builder.addCase(updateServiceOfUser.fulfilled,(state,{payload})=>
    {
        state.loading =false;
        console.log("update",payload);
        state.servicePosts =payload
        state.error =null
    }) 
    /******************************** */
    // DELETE
    builder.addCase(deleteServiceOfUser.pending,(state)=>
    {
        state.loading =true;
        state.error=null
    })
    builder.addCase(deleteServiceOfUser.rejected,(state,{payload})=>
    {
        state.loading =false;
        state.error =payload;
    })
    builder.addCase(deleteServiceOfUser.fulfilled,(state,{payload})=>
    {
        state.loading =false;
        console.log("update",payload);
        state.servicePosts =payload
        state.error =null
    }) 
 
    
    }
})
export default serviceSlice;
