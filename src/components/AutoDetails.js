import { CircularProgress, createTheme, Grid, Pagination } from '@mui/material';
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
  const [isLoadedTotalCost, setisLoadedTotalCost] = useState(true)
  const [isLoadedTotalAutousage, setisLoadedTotalAutousage] = useState(true)
  const [brandStofs, setBrandStofs] = useState([])
  const [autoUsages, setAutoUsages] = useState([])
  const [totalBrandCost, settotalBrandCost] = useState({})
  const [totalAutoUsage, settotalAutoUsage] = useState({})
  const [autoUsagePage, setautoUsagePage] = useState(1)
  const [brandStofPage, setbrandStofPage] = useState(1)

  useEffect(() => {
    getBrandStofs()
    getAutoUsages()
    getTotalBrandCost()
    getTotalAutoUsages()
  }, [])


  const getBrandStofs = async () => {
    setIsLoaded(false)
    try {
      const response = await autoApi.get(`${autoId}/brandstofs`);
      setBrandStofs(response.data.data)
      toaster('success', response.data.message)
    } catch (error) {
      toaster('error', error.response.data.message)
    }
    setIsLoaded(true)
  }
  const getAutoUsages = async () => {
    setIsLoadedAutoUsage(false)
    try {
      const response = await autoApi.get(`${autoId}/auto-usages`);
      setAutoUsages(response.data.data)
      toaster('success', response.data.message)
    } catch (error) {
      toaster('error', error.response.data.message)
    }
    setIsLoadedAutoUsage(true)
  }

  const getTotalBrandCost = async () => {
    setisLoadedTotalCost(false)
    try {
      const response = await autoApi.get(`${autoId}/brandstofs/totalcost`)
      settotalBrandCost(response.data.data)
    } catch (error) {
      toaster('error', error.response.data.message)
    }
    setisLoadedTotalCost(true)
  }
  const getTotalAutoUsages = async () => {
    setisLoadedTotalAutousage(false)
    try {
      const response = await autoApi.get(`${autoId}/auto-usages/totalcost`)
      settotalAutoUsage(response.data.data)
    } catch (error) {
      toaster('error', error.response.data.message)
    }
    setisLoadedTotalAutousage(true)
  }
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <ThemeProvider theme={mdTheme}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
            {!isLoadedTotalAutousage ? <CircularProgress className='circular' /> :
                <Item>
                  <h3>Total AutoUsage</h3>
                  <p>plateNumber :{totalAutoUsage.plateNumber}</p>
                  <p>Total distance:{totalAutoUsage.totalDistance}</p>
                  <p>Count of Usage:{totalAutoUsage.countOfUsage}</p>
                  <p>Total brandstofverbruik:{totalAutoUsage.brandStofVerbruik} $</p>
                </Item>
              }
              <h2>Recent Auto Usages</h2>
              {!isLoadedAutoUsage ? <CircularProgress className='circular' /> :
                autoUsages.slice((autoUsagePage - 1) * 3, autoUsagePage * 3).map((autousage, index) => (
                  <div key={index}>
                    <Item >
                      <p>distance : {autousage.distance}</p>
                      <p>brandStofVerbruik : {autousage.brandStofVerbruik}</p>
                      <p>date : {autousage.date}</p>
                    </Item>
                    <br />
                  </div>
                ))
              }
              <Pagination count={5} onChange={(event, page) => setautoUsagePage(page)} color="primary" sx={{ marginTop: '5px' }} />
            </Grid>
            <Grid item xs={6}>
              {!isLoadedTotalCost ? <CircularProgress className='circular' /> :
                <Item>
                  <h3>Total BrandCost</h3>
                  <p>Plate number:{totalBrandCost.plateNumber}</p>
                  <p>Count of Refueling:{totalBrandCost.countOfRefueling}</p>
                  <p>totalCost:{totalBrandCost.totalCost} $</p>
                </Item>
              }

              <h2>Recent brandstof buys </h2>
              {!isLoaded ? <CircularProgress className='circular' /> :
                brandStofs.slice((brandStofPage - 1) * 3, brandStofPage * 3).map((brandstof, index) => (
                  <div key={index}>
                    <Item>
                      <p>brandStofAmount : {brandstof.brandStofAmount}</p>
                      <p>price : {brandstof.price}</p>
                      <p>refuelingDate : {moment(brandstof.refuelingDate).format('YYYY-MM-DD HH:mm:ss')}</p>
                    </Item>
                    <br />
                  </div>
                ))
              }
              <Pagination count={5} onChange={(event, page) => setbrandStofPage(page)} color="primary" sx={{ marginTop: '5px' }} />
            </Grid>
          </Grid>
        </ThemeProvider>

      </Box>
    </>
  )
}
