import API from "../../services/API";
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createRatingPost = createAsyncThunk(
    'rating/createRatingPost',
    async ({ review,rating,prouser,reqId,user}, { rejectWithValue }) => {
      try {
        const {response} = await API.post('/rating/create-rating', {
            review,rating,prouser,reqId,user
        });
        if(response)
        {
          localStorage.setItem('rating', JSON.stringify(response.data))

        }
        return response.data;
      } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
          } else {
            return rejectWithValue(error.message);
          }
      }
    }
  );

  export const getRatingOfUser = createAsyncThunk('request/getRequestOfUser', async ({id}, { rejectWithValue }) => {
    try {
      const response = await API.get(`/rating/get-rating/${id}`);
      console.log("createAsyncThunk rating of user",response);
      if(response)
      {
        localStorage.setItem('rating', JSON.stringify(response.data))

      }
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  });