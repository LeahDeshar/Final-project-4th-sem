// import API from "../../services/API";
import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/API';
export const createProfile = createAsyncThunk(
  'users/createProfile',
  async (formData, { rejectWithValue }) => {
    console.log("passing the profile" );
    try {
      const { data } = await API.post('/users/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getProfileOfUser = createAsyncThunk('users/getProfileOfUser', async ({id}, { rejectWithValue }) => {
    try {
      // console.log(id);
      const response = await API.get(`/users/profile/${id}`);
      console.log("profile of user",response);
      if(response)
      {
        localStorage.setItem('userProfile', JSON.stringify(response.data))

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


  export const updateProfileOfUser = createAsyncThunk('users/updateProfileOfUser', async (formData, { rejectWithValue }) => {
    try {
      const response = await API.put(`/users/profile`,formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
      if(response)
      {
        localStorage.setItem('userProfile', JSON.stringify(response.data))

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

  export const getAllProfileOfUser = createAsyncThunk('users/getAllProfileOfUser', async (_, { rejectWithValue }) => {
    try {
      // console.log(id);
      const response = await API.get(`/users/profile-all`);
      console.log("profile of user",response);
      if(response)
      {
        localStorage.setItem('userXProfile', JSON.stringify(response.data))

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