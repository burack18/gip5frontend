import { createAsyncThunk } from "@reduxjs/toolkit";
import { autoApi } from "../../utilities/autoApi";
export const fetchAutos=createAsyncThunk(
    'autos',
    async()=>{
        let response;
        try {
            response = await autoApi.get();
        } catch (error) {
            console.log(error)
            let Err={
                message:'error',
                isSuccess:false
            }
            throw Err;
        }
        return response.data;
    }
)

export const addAuto=createAsyncThunk(
    'addAuto',
    async(auto)=>{
        let response;
        try {
            response = await autoApi.post('',auto);
        } catch (error) {
            console.log(error)
            let Err={
                message:'error',
                isSuccess:false
            }
            throw Err;
        }
        return response.data;
    }
)
export const deleteAuto=createAsyncThunk(
    'deleteAuto',
    async(autoId)=>{
        let response;
        try {
            response = await autoApi.delete(`${autoId}`);
        } catch (error) {
            console.log(error)
            let Err={
                message:'error',
                isSuccess:false
            }
            throw Err;
        }
        return {...response.data,autoId};
    }
)
export const updateAuto=createAsyncThunk(
    'updateAuto',
    async(auto)=>{
        let response;
        try {
            response = await autoApi.put(`${auto.autoId}`,auto);
        } catch (error) {
            console.log(error)
            let Err={
                message:'error',
                isSuccess:false
            }
            throw Err;
        }
        return response.data;
    }
)

export const addBrandStof=createAsyncThunk(
    'addBrandStof',
    async({autoId,values})=>{
        let response;
        try {
            response = await autoApi.post(`${autoId}/brandstofs`,values);
        } catch (error) {
            let Err={
                message:error.response.data.message||'error',
                isSuccess:false
            }
            throw Err;
        }
        return {...response.data,autoId};
    }
)

