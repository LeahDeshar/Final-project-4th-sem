import {createSlice} from "@reduxjs/toolkit"
import { createRequestPost, deleteRequestOfUser, getAllRequest, getAllRequestByCategory, getAllRequestByPost, getRequestOfCustomer, getRequestOfUser, updateRequestOfCustomer, updateRequestOfUser } from "./requestAction";

const token = localStorage.getItem("token") ? localStorage.getItem("token") : null

const storedRequestPosts = localStorage.getItem('requestPosts');
const requestSlice = createSlice({
    name: "request",
    initialState:{
        loading: false,
        requestPosts: storedRequestPosts ? JSON.parse(storedRequestPosts) : [],
        token,
        error: null
    },
    reducers:{},
    extraReducers:(builder)=>{
    /******************************** */
        // Create Request Post 
    builder.addCase(createRequestPost.pending,(state)=>
    {
        state.loading =true;
        state.error=null
    })
    builder.addCase(createRequestPost.rejected,(state,{payload})=>
    {
        state.loading =false;
        state.error =payload;
    })
    builder.addCase(createRequestPost.fulfilled,(state,{payload})=>
    {
        state.loading =false;
        console.log(payload);
        state.requestPosts =payload
        state.error =null
    })

    /******************************** */
    // Get all req of specific user
    builder.addCase(getRequestOfUser.pending,(state)=>
    {
        state.loading =true;
        state.error=null
    })
    builder.addCase(getRequestOfUser.rejected,(state,{payload})=>
    {
        state.loading =false;
        state.error =payload;
    })
    builder.addCase(getRequestOfUser.fulfilled,(state,{payload})=>
    {
        state.loading =false;
        console.log("request here reached getRequestOfUser");
        console.log("specific",payload);
        state.requestPosts =payload
        state.error =null
    }) 
    /******************************** */
    // Get all req of specific customer
    builder.addCase(getRequestOfCustomer.pending,(state)=>
    {
        state.loading =true;
        state.error=null
    })
    builder.addCase(getRequestOfCustomer.rejected,(state,{payload})=>
    {
        state.loading =false;
        state.error =payload;
    })
    builder.addCase(getRequestOfCustomer.fulfilled,(state,{payload})=>
    {
        state.loading =false;
        console.log("request here reached getRequestOfCustomer");
        console.log("specific",payload);
        state.requestPosts =payload
        state.error =null
    }) 

    /******************************** */
    // Get all req 
    builder.addCase(getAllRequest.pending,(state)=>
    {
        state.loading =true;
        state.error=null
    })
    builder.addCase(getAllRequest.rejected,(state,{payload})=>
    {
        state.loading =false;
        state.error =payload;
    })
    builder.addCase(getAllRequest.fulfilled,(state,{payload})=>
    {
        state.loading =false;
        console.log("All",payload);
        state.requestPosts =payload
        state.error =null
    }) 
    /******************************** */
    // Get all post by category 
    builder.addCase(getAllRequestByCategory.pending,(state)=>
    {
        state.loading =true;
        state.error=null
    })
    builder.addCase(getAllRequestByCategory.rejected,(state,{payload})=>
    {
        state.loading =false;
        state.error =payload;
        state.requestPosts = []
    })
    builder.addCase(getAllRequestByCategory.fulfilled,(state,{payload})=>
    {
        state.loading =false;
        console.log("All",payload);
        state.requestPosts =payload
        state.error =null
    }) 
     /******************************** */
    // Get all post by posted by user 
    builder.addCase(getAllRequestByPost.pending,(state)=>
    {
        state.loading =true;
        state.error=null
    })
    builder.addCase(getAllRequestByPost.rejected,(state,{payload})=>
    {
        state.loading =false;
        state.error =payload;
    })
    builder.addCase(getAllRequestByPost.fulfilled,(state,{payload})=>
    {
        state.loading =false;
        console.log("getAllRequestByPost",payload);
        state.requestPosts =payload
        state.error =null
    }) 
    /******************************** */
    // UPDATE a post
    builder.addCase(updateRequestOfUser.pending,(state)=>
    {
        state.loading =true;
        state.error=null
    })
    builder.addCase(updateRequestOfUser.rejected,(state,{payload})=>
    {
        state.loading =false;
        state.error =payload;
    })
    builder.addCase(updateRequestOfUser.fulfilled,(state,{payload})=>
    {
        state.loading =false;
        console.log("update",payload);
        state.requestPosts =payload
        state.error =null
    }) 
    /******************************** */
    // UPDATE a post/customer
    builder.addCase(updateRequestOfCustomer.pending,(state)=>
    {
        state.loading =true;
        state.error=null
    })
    builder.addCase(updateRequestOfCustomer.rejected,(state,{payload})=>
    {
        state.loading =false;
        state.error =payload;
    })
    builder.addCase(updateRequestOfCustomer.fulfilled,(state,{payload})=>
    {
        state.loading =false;
        console.log("updateRequestOfCustomer",payload);
        state.requestPosts =payload
        state.error =null
    }) 
    /******************************** */
    // DELETE
    builder.addCase(deleteRequestOfUser.pending,(state)=>
    {
        state.loading =true;
        state.error=null
    })
    builder.addCase(deleteRequestOfUser.rejected,(state,{payload})=>
    {
        state.loading =false;
        state.error =payload;
    })
    builder.addCase(deleteRequestOfUser.fulfilled,(state,{payload})=>
    {
        state.loading =false;
        console.log("delete",payload);
        state.requestPosts =payload
        state.error =null
    }) 
 
    
    }
})
export default requestSlice;
