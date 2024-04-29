import API from "../../services/API";
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createServicePost = createAsyncThunk(
    'service/createServicePost',
    async ({ date, time, address, contactInfo, details, servicePrice,category }, { rejectWithValue }) => {
      try {
        const {response} = await API.post('/service/service-posts', {
          date,
          time,
          address,
          contactInfo,
          details,
          servicePrice,
          category
        });
        if(response)
        {
          localStorage.setItem('servicePosts', JSON.stringify(response.data))
  
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

  export const getServiceOfUser = createAsyncThunk('service/getServiceOfUser', async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('/service/service-posts');
      console.log(response);
      if(response)
      {
        localStorage.setItem('servicePosts', JSON.stringify(response.data))

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
  
  export const getAllService = createAsyncThunk('service/getAllService', async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('/service/service-all-posts');
      console.log(response);
      if(response)
      {
        localStorage.setItem('servicePosts', JSON.stringify(response.data))

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
  export const getAllServiceByCategory = createAsyncThunk('service/getCategoryService', async ({category}, { rejectWithValue }) => {
    try {
      const response = await API.get('/service/service-all-posts', {
        params: { category }, // Pass category as a query parameter
      });
      console.log("param,response",category);
      console.log(response);
      if(response)
      {
        localStorage.setItem('servicePosts', JSON.stringify(response.data))

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

  export const updateServiceOfUser = createAsyncThunk('service/updateServiceOfUser', async ({  postId,
    date,
    time,
    address,
    contactInfo,
    details,
    servicePrice,seen}, { rejectWithValue }) => {
    try {
      const response = await API.put(`/service/service-posts/${postId}`,{  postId,
        date,
        time,
        address,
        contactInfo,
        details,
        servicePrice,seen});
      console.log(response);
      if(response)
      {
        localStorage.setItem('servicePosts', JSON.stringify(response.data))

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

  export const deleteServiceOfUser = createAsyncThunk('service/deleteServiceOfUser', async ({postId}, { rejectWithValue }) => {
    try {
      const response = await API.delete(`/service/service-posts/${postId}`);
      console.log(response);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  });