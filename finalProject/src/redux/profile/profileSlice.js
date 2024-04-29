import {createSlice} from "@reduxjs/toolkit"
import { createProfile, getAllProfileOfUser, getProfileOfUser, updateProfileOfUser } from "./profileAction";

const storedProfilePosts = localStorage.getItem('userProfile');

const storedXProfilePosts = localStorage.getItem('userXProfile');
const profileSlice = createSlice({
    name: 'users',
    initialState: {
        loading: false,
        profile: storedProfilePosts?JSON.parse(storedProfilePosts) :null,
        extraprofile:storedXProfilePosts?storedXProfilePosts:null,
        error: null
    },
    reducers:{
    },
    extraReducers :(builder)=>{
        // createProfile
        builder.addCase(createProfile.pending,(state)=>{
            state.loading = true;
            state.error=null
        })
        builder.addCase(createProfile.fulfilled,(state,{payload})=>{
            state.loading = false;
            // console.log(payload);
            state.profile = payload;
            state.error=null

        })
        builder.addCase(createProfile.rejected,(state,{payload})=>{
            state.loading = false;
            state.error = payload;
        })

        // get profile of user
        builder.addCase(getProfileOfUser.pending,(state)=>{
            state.loading = true;
            state.error=null
        })
        builder.addCase(getProfileOfUser.fulfilled,(state,{payload})=>{
            state.loading = false;
            // console.log(payload);
            state.profile = payload;
            state.error=null

        })
        builder.addCase(getProfileOfUser.rejected,(state,{payload})=>{
            state.loading = false;
            state.error = payload;
        })

         // update profile of user
         builder.addCase(updateProfileOfUser.pending,(state)=>{
            state.loading = true;
            state.error=null
        })
        builder.addCase(updateProfileOfUser.fulfilled,(state,{payload})=>{
            state.loading = false;
            // console.log(payload);
            state.profile = payload;
            state.error=null

        })
        builder.addCase(updateProfileOfUser.rejected,(state,{payload})=>{
            state.loading = false;
            state.error = payload;
        })

        // get profile of all user
        builder.addCase(getAllProfileOfUser.pending,(state)=>{
            state.loading = true;
            state.error=null
        })
        builder.addCase(getAllProfileOfUser.fulfilled,(state,{payload})=>{
            state.loading = false;
            // console.log(payload);
            state.extraprofile = payload;
            state.error=null

        })
        builder.addCase(getAllProfileOfUser.rejected,(state,{payload})=>{
            state.loading = false;
            state.error = payload;
        })

       
    }


})
export default profileSlice;