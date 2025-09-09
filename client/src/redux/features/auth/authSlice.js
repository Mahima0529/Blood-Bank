// import {createSlice} from '@reduxjs/toolkit'

// const initialState ={
//     loading:false,
//     user:null,
//     token:null,
//     error:null
// };

// const authSlice =createSlice({
//     name:'auth',
//     initialState:initialState,
//     reducers:{},
//     extraReducers:{},
// });

// export default authSlice;

import { createSlice } from '@reduxjs/toolkit';
// import your async thunk here, e.g.:
// adjust this path as needed
import { getCurrentUser, loginUser, userRegister } from './authActions';

const token =localStorage.getItem('token')? localStorage.getItem('token'):null
const initialState = {
  loading: true,
  user: null,
  token,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    //login user
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });


       //registeruser
    builder
      .addCase(userRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

      
//   },
// });


//current user
builder
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
      
  },
});



export const { setTestData } = authSlice.actions;
export default authSlice.reducer;
