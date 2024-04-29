import {configureStore} from "@reduxjs/toolkit"
import authSlice from "./auth/authSlice";
import serviceSlice from "./service/serviceSlice";
import requestSlice from "./request/requestSlice";
import profileSlice from "./profile/profileSlice";
import themeSlice from "./themeSlice";
import ratingSlice from "./rating/ratingSlice";

const store = configureStore({
    reducer:{
        auth: authSlice.reducer,
        service: serviceSlice.reducer,
        request: requestSlice.reducer,
        users: profileSlice.reducer,
        theme: themeSlice.reducer,
        rating: ratingSlice.reducer
    }
})
export default store;