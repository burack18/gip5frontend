import { CircularProgress, createTheme, Grid } from '@mui/material';
import { Box, } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ThemeProvider } from 'styled-components';
import { autoApi } from '../utilities/autoApi';
import { Item } from './Item';
import moment from 'moment';
import { toaster } from '../utilities/toaster';

export const AutoDetails = () => {

  const { autoId } = useParams();
  const mdTheme = createTheme();

  const [isLoaded, setIsLoaded] = useState(true)
  const [isLoadedAutoUsage, setIsLoadedAutoUsage] = useState(true)
  const [brandStofs, setBrandStofs] = useState([])
  const [autoUsages, setAutoUsages] = useState([])

  useEffect(() => {
    getBrandStofs()
    getAutoUsages()
  }, [])


  const getBrandStofs = async () => {
    setIsLoaded(false)
    try {
      const response = await autoApi.get(`${autoId}/brandstofs`);
      setBrandStofs(response.data.data)
      toaster('success',response.data.message)
    } catch (error) {
      toaster('error',error.response.data.message)
    }
    setIsLoaded(true)
  }
  const getAutoUsages=async()=>{
    setIsLoadedAutoUsage(false)
    try {
      const response=await autoApi.get(`${autoId}/auto-usages`);
      setAutoUsages(response.data.data)   
      toaster('success',response.data.message)
    } catch (error) {
      toaster('error',error.response.data.message)
    }
    setIsLoadedAutoUsage(true)
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <ThemeProvider theme={mdTheme}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <h2>Recent Auto Usages</h2>
              {!isLoadedAutoUsage ? <CircularProgress className='circular' /> :
                autoUsages.map((autousage, index) => (
                  <div key={index}>
                  <Item >
                    <p>distance : {autousage.distance}</p>
                    <p>brandStofVerbruik : {autousage.brandStofVerbruik}</p>
                    <p>date : {autousage.date}</p>
                  </Item>
                  <br/>
                  </div>
                ))
              }
            </Grid>
            <Grid item xs={6}>
              <h2>Recent brandstof buys </h2>
              {!isLoaded ? <CircularProgress className='circular' /> :
                brandStofs.map((brandstof, index) => (
                  <div key={index}>
                  <Item>
                    <p>brandStofAmount : {brandstof.brandStofAmount}</p>
                    <p>price : {brandstof.price}</p>
                    <p>refuelingDate : {moment(brandstof.refuelingDate).format('YYYY-MM-DD HH:mm:ss')}</p>
                  </Item>
                  <br/>
                  </div>
                ))
              }
            </Grid>
          </Grid>
        </ThemeProvider>

      </Box>
    </>
  )
}
