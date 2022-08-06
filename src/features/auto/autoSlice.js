import { createSlice } from "@reduxjs/toolkit"
import { toaster } from "../../utilities/toaster"
import { addAuto, addBrandStof, deleteAuto, fetchAutos, updateAuto } from "./autosAsyncThunk"

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
        .addCase(updateAuto.pending,(state,action)=>{
            state.isLoaded=false;
        })
        .addCase(updateAuto.fulfilled,(state,action)=>{
            state.isLoaded=true;
            var modifiedAutoIndex=state.data.findIndex(x=>x.autoId===action.payload.data.autoId);
            state.data.splice(modifiedAutoIndex,1,action.payload.data)              
            toaster('success',action.payload.message)
        })
        .addCase(updateAuto.rejected,(state,action)=>{
            state.isLoaded=true;
            toaster('error',action.payload.message)
        })
        .addCase(addBrandStof.pending,(state,action)=>{
            state.isLoaded=false;
        })
        .addCase(addBrandStof.fulfilled,(state,action)=>{
            state.isLoaded=true;
            console.log(action)
            var modifiedAutoIndex=state.data.find(x=>x.autoId===action.payload.autoId);
            let brandstof;
            if(modifiedAutoIndex.availableBrandStof){
                brandstof=action.payload.data.brandStofAmount+modifiedAutoIndex.availableBrandStof;
            }
            state.data.splice(modifiedAutoIndex,1,{...modifiedAutoIndex,availableBrandStof:brandstof})              
            
            toaster('success',action.payload.message)
        })
        .addCase(addBrandStof.rejected,(state,action)=>{
            state.isLoaded=true;
            toaster('error',action.payload.message)
        })
    }
})

export default autosSlice.reducer;
