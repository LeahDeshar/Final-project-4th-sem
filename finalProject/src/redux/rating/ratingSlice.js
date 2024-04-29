import { createSlice } from "@reduxjs/toolkit";
import {createRatingPost,getRatingOfUser} from "./ratingAction"

const storedRating = localStorage.getItem("rating") ? localStorage.getItem("rating") : null

const ratingSlice = createSlice({
    name: "rating",
    initialState:{
        loading: false,
        totalRating: storedRating ? JSON.parse(storedRating) : [],
        error: null
    },
    reducers:{},
    extraReducers:(builder)=>{
    /******************************** */
        // Create Rating  
    builder.addCase(createRatingPost.pending,(state)=>
    {
        state.loading =true;
        state.error=null
    })
    builder.addCase(createRatingPost.rejected,(state,{payload})=>
    {
        state.loading =false;
        state.error =payload;
    })
    builder.addCase(createRatingPost.fulfilled,(state,{payload})=>
    {
        state.loading =false;
        console.log(payload);
        state.totalRating =payload
        state.error =null
    })

    /******************************** */
    // Get all req of specific user
    builder.addCase(getRatingOfUser.pending,(state)=>
    {
        state.loading =true;
        state.error=null
    })
    builder.addCase(getRatingOfUser.rejected,(state,{payload})=>
    {
        state.loading =false;
        state.error =payload;
    })
    builder.addCase(getRatingOfUser.fulfilled,(state,{payload})=>
    {
        state.loading =false;
        console.log("Rating here reached getRequestOfUser");
        console.log("specific",payload);
        state.totalRating =payload
        state.error =null
    }) 
  }
})
export default ratingSlice;