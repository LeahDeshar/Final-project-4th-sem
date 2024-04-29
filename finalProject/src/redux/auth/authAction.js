// import API from "../../services/API";
import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/API';
export const userLogin = createAsyncThunk(
  'auth/login',
  async ({ role, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await API.post('/auth/login', { email, password, role });


      if (data.success) {
        localStorage.setItem('token', data.token);

        localStorage.setItem('curUser', JSON.stringify(data.user))
        console.log("aync thunk login",data);
      }
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        // return error.response.data.message;

        return rejectWithValue(error.response.data.message);
      } else {
        // return error.message;

        return rejectWithValue(error.message);
      }
    }
  }
);

export const userRegister = createAsyncThunk(
  'auth/register',
  async (
    {
      name,
      email,
      role,
      phonenumber,
      password

    },
    { rejectWithValue }
  ) => {
    try {
   
        const { data } = await API.post('/auth/register', {
          name,
          email,
          role,
          phonenumber,
          password
        });
        
        if (data.success) {
          localStorage.setItem('token', data.token);

          localStorage.setItem('curUser', JSON.stringify(data.user))
          console.log("aync thunk register",data.message);
        }
        return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        } else {
          console.log(" error");
        return rejectWithValue(error.message);
      }
    }
  }
);
// current user
export const getCurrentUser = createAsyncThunk('auth/getCurrentUser',async({rejectWithValue})=>
{
   
    try {
        const res = await API.get('/auth/current-user')
        if(res?.data)
        {
            return res.data
        }
    } catch (error) {
        if(error.response && error.response.data.message)
        {
            return rejectWithValue(error.response.data.message)
        }
        else 
        {
            return rejectWithValue(error.message)
        }
    }
})
// current user delete
export const deleteCurrentUser = createAsyncThunk('auth/deleteCurrentUser',async(_,{rejectWithValue})=>
{
   
  try {
    const res = await API.delete('/auth/current-user-delete')
    console.log(res.data);
        if(res?.data)
        {
            return res.data
        }
    } catch (error) {
        if(error.response && error.response.data.message)
        {
            return rejectWithValue(error.response.data.message)
        }
        else 
        {
            return rejectWithValue(error.message)
        }
    }
})

export const updateUserNoti =createAsyncThunk('auth/updateUserNoti', async (_,{ rejectWithValue }) => {
  try {
    const response = await API.put(`/auth/update-noti`);
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
export const updateproUserCategory = createAsyncThunk('auth/updateproUserCategory', async (category, { rejectWithValue }) => {
  try {
    console.log("object of category",category);
    const response = await API.put(`/auth/update-category`,  category);
    console.log("response of list update",response);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});