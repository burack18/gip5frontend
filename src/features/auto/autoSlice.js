import { createSlice } from "@reduxjs/toolkit"
import { toaster } from "../../utilities/toaster"
import { addAuto, deleteAuto, fetchAutos } from "./autosAsyncThunk"

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
        .addCase(deleteAuto.pending,(state,action)=>{
            state.isLoaded=false;
        })
        .addCase(deleteAuto.fulfilled,(state,action)=>{
            state.isLoaded=true;
            console.log(action)
            state.data=state.data.filter(x=>x.autoId!==action.payload.autoId)
            toaster('success',action.payload.message)
        })
        .addCase(deleteAuto.rejected,(state,action)=>{
            state.isLoaded=true;
            toaster('error',action.payload.message)
        }) 
    }
})

export default autosSlice.reducer;