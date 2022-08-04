import { createSlice } from "@reduxjs/toolkit"
import { toaster } from "../../utilities/toaster"
import { addAuto, fetchAutos } from "./autosAsyncThunk"

const initialState={
    data:[],
    isLoaded:false,
    error:''
}

const autosSlice=createSlice({
    name:'autos',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchAutos.pending,(state,action)=>{
            state.isLoaded=false;
        })
        .addCase(fetchAutos.fulfilled,(state,action)=>{ 
            state.isLoaded=true;
            state.data=action.payload.data
            toaster('success',action.payload.message)
        })
        .addCase(fetchAutos.rejected,(state,action)=>{
            state.error=action.error.message;
            state.data=[];
            toaster('error',action.payload.message)
        })        
        .addCase(addAuto.pending,(state,action)=>{
            state.isLoaded=false;
        })
        .addCase(addAuto.fulfilled,(state,action)=>{
            state.isLoaded=true;
            state.data.push(action.payload.data)
            toaster('success',action.payload.message)
        })
        .addCase(addAuto.rejected,(state,action)=>{
            state.isLoaded=true;
            toaster('error',action.payload.message)
        })        
    }
})

export default autosSlice.reducer;