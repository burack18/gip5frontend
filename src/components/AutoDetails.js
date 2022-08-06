import { CircularProgress, createTheme, Grid } from '@mui/material';
import { Box, } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ThemeProvider } from 'styled-components';
import { autoApi } from '../utilities/autoApi';
import { Item } from './Item';

export const AutoDetails = () => {

  const { autoId } = useParams();
  const mdTheme = createTheme();

  const [isLoaded, setIsLoaded] = useState(true)
  const [isLoadedAutoUsage, setIsLoadedAutoUsage] = useState(true)
  const [brandStofs, setBrandStofs] = useState([])
  const [autoUsages, setAutoUsages] = useState([])

  useEffect(() => {
    getBrandStofs(autoId)
    getAutoUsages(autoId)
  }, [])


  const getBrandStofs = async (autoId) => {
    setIsLoaded(false)
    const response = await autoApi.get(`${autoId}/brandstofs`);
    console.log(response.data.data)
    setBrandStofs(response.data.data)
    setIsLoaded(true)
  }
  const getAutoUsages=async(autoId)=>{
    setIsLoadedAutoUsage(false)
    const response=await autoApi.get(`${autoId}/auto-usages`);
    console.log(response.data)
    setAutoUsages(response.data.data)
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
                  <>
                  <Item key={index}>
                    <p>distance : {autousage.distance}</p>
                    <p>brandStofVerbruik : {autousage.brandStofVerbruik}</p>
                    <p>date : {autousage.date}</p>
                  </Item>
                  <br/>
                  </>
                ))
              }
            </Grid>
            <Grid item xs={6}>
              <h2>Recent brandstof buys </h2>
              {!isLoaded ? <CircularProgress className='circular' /> :
                brandStofs.map((brandstof, index) => (
                  <>
                  <Item>
                    <p>brandStofAmount : {brandstof.brandStofAmount}</p>
                    <p>price : {brandstof.price}</p>
                    <p>refuelingDate : {brandstof.refuelingDate}</p>
                  </Item>
                  <br/>
                  </>
                ))
              }

            </Grid>
          </Grid>
        </ThemeProvider>

      </Box>
    </>
  )
}
