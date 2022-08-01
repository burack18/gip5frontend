import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { toaster } from "../../utilities/toaster";

const initialStateUser={
    data:{},
    isLoaded:false,
    error:''
}

export const userSlice=createSlice({
    name:'user',
    initialState:initialStateUser,
    reducers:{
        logout(state){
            state.data={}
            state.error=''
            state.isLoaded=true
            toaster('success','Successfully Logout')
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(loginUser.pending,(state,action)=>{
            state.isLoaded=false
            state.error=''
            state.data={}
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.isLoaded=true
            console.log(action.payload.data?.data)
            state.data=action.payload.data?.data
            toaster('success',action.payload.data.message)
       })
        .addCase(loginUser.rejected,(state,action)=>{
            state.error=action.error.message
            state.isLoaded=true
            state.data={}
            toaster('error',action.error.message)
        });
        
    }
})

export const loginUser=createAsyncThunk(
     'loginUser',
     async(credentials)=>{
        let response;
        try {
            response=await axios.post(`${process.env.REACT_APP_BASEURL}/auth/login`,credentials);     
        } catch (error) {
            console.log(error)
            const customError = {
                name: "Login Error",
                message: error.response.data.message,
                data: error.response.data 
              };
              throw customError;           
        }
        return response
     }
)

export const {logout}=userSlice.actions;
export default userSlice.reducer;