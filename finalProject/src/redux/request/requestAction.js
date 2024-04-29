import API from "../../services/API";
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createRequestPost = createAsyncThunk(
    'request/createRequestPost',
    async ({ start_date,end_date,req_pay,req_contact,req_comment,post,user}, { rejectWithValue }) => {
      try {
        const {response} = await API.post('/request/request-posts', {
            start_date,end_date,req_pay,req_contact,req_comment,post,user
        });
        if(response)
        {
          localStorage.setItem('requestPosts', JSON.stringify(response.data))

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

  export const getRequestOfUser = createAsyncThunk('request/getRequestOfUser', async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('/request/request-user-posts');
      console.log("req of user",response);
      if(response)
      {
        localStorage.setItem('requestPosts', JSON.stringify(response.data))

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
  export const getRequestOfCustomer = createAsyncThunk('request/getRequestOfCustomer', async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('/request/request-user-servicePosts');
      console.log("req of user",response);
      if(response)
      {
        localStorage.setItem('requestPosts', JSON.stringify(response.data))

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
  export const getAllRequest = createAsyncThunk('request/getAllRequest', async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('/request/request-all-posts');
      console.log(response);
      if(response)
      {
        localStorage.setItem('requestPosts', JSON.stringify(response.data))

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

  export const getAllRequestByCategory = createAsyncThunk('request/getAllRequestByCategory', async ({category}, { rejectWithValue }) => {
    try {
      const response = await API.get('/request/request-category-posts', {
        params: { category }, // Pass category as a query parameter
      });
      console.log("param,response",category);
      console.log(response);
      if(response)
      {
        localStorage.setItem('requestPosts', JSON.stringify(response.data))

      }
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        console.log(error.response.data.message);
        return rejectWithValue(error.response.data.message);
      } else {
        console.log(error.message);
        return rejectWithValue(error.message);
      }
    }
  });
  export const getAllRequestByPost = createAsyncThunk('request/getAllRequestByPost', async ({category}, { rejectWithValue }) => {
    try {
      const categoryName = category.toLowerCase()
      const response = await API.get(`/request/request-posts/${categoryName}`);
      console.log("category,response",category);
      console.log(response);
      if(response)
      {
        localStorage.setItem('requestPosts', JSON.stringify(response.data))

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

  export const updateRequestOfUser = createAsyncThunk('request/updateRequestOfUser', async ({  reqId,
    start_date, end_date, req_pay, req_contact, req_comment,req_pending,req_accepted,req_rejected }, { rejectWithValue }) => {
    try {
      const response = await API.put(`/request/request-posts/${reqId}`,{  start_date, end_date, req_pay, req_contact, req_comment,req_pending,req_accepted,req_rejected  });
      console.log(response);
      if(response)
      {
        localStorage.setItem('requestPosts', JSON.stringify(response.data))

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

  export const updateRequestOfCustomer = createAsyncThunk('request/updateRequestOfCustomer', async ({  reqId,
    start_date, end_date, req_pay, req_contact, req_comment,req_pending,req_accepted,req_rejected }, { rejectWithValue }) => {
    try {
      const response = await API.put(`/request/request-user-posts/${reqId}`,{  start_date, end_date, req_pay, req_contact, req_comment,req_pending,req_accepted,req_rejected  });
      console.log(response);
      if(response)
      {
        localStorage.setItem('requestPosts', JSON.stringify(response.data))

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

  export const deleteRequestOfUser = createAsyncThunk('request/deleteRequestOfUser', async ({reqId}, { rejectWithValue }) => {
    try {
      const response = await API.delete(`/request/request-posts/${reqId}`);
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