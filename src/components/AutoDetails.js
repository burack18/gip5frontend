import { CircularProgress, createTheme, Grid, Pagination } from '@mui/material';
import { Box, } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ThemeProvider } from 'styled-components';
import { autoApi } from '../utilities/autoApi';
import { Item } from './Item';
import moment from 'moment';
import { toaster } from '../utilities/toaster';
import { useTranslation } from 'react-i18next';

export const AutoDetails = () => {

  const { autoId } = useParams();
  const mdTheme = createTheme();
  const { t } = useTranslation();
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
            {!isLoadedTotalAutousage? <CircularProgress className='circular' /> :
              totalAutoUsage?
                <Item>
                  <h3>{t('autodetails.totalautousage')}</h3>
                  <p>{t('autotable.platenumber')} :{totalAutoUsage?.plateNumber}</p>
                  <p>{t('totaldistance')}:{totalAutoUsage?.totalDistance}</p>
                  <p>{t('countusage')}:{totalAutoUsage?.countOfUsage}</p>
                  <p>{t('totalfuelusage')}:{totalAutoUsage?.brandStofVerbruik} </p>
                  <p>{(totalAutoUsage?.brandStofVerbruik/totalAutoUsage.totalDistance).toFixed(2)}Liter Brandstof per km</p>
                </Item>:<Item>{t('nodata')}</Item>
              }
              <h2>{t('recent.autousage')}</h2>
              {!isLoadedAutoUsage ? <CircularProgress className='circular' /> :
                autoUsages.slice((autoUsagePage - 1) * 3, autoUsagePage * 3).map((autousage, index) => (
                  <div key={index}>
                    <Item >
                      <p>{t('autousage.distance')} : {autousage.distance}</p>
                      <p>{t('autousage.fuelusage')} : {autousage.brandStofVerbruik}</p>
                      <p>{t('date')} : {autousage.date}</p>
                    </Item>
                    <br />
                  </div>
                ))
              }
              <Pagination count={5} onChange={(event, page) => setautoUsagePage(page)} color="primary" sx={{ marginTop: '5px' }} />
            </Grid>
            <Grid item xs={6}>
              {!isLoadedTotalCost &&!isLoadedTotalAutousage ? <CircularProgress className='circular' /> :
                totalBrandCost?
                <Item>
                  <h3>{t('deposit.allbrandcost')}</h3>
                  <p>{t('autotable.platenumber')} :{totalBrandCost?.plateNumber}</p>
                  <p>{t('countofrefueling')}:{totalBrandCost?.countOfRefueling}</p>
                  <p>{t('totalcost')}:{totalBrandCost?.totalCost} $</p>
                  <p>{(totalBrandCost?.totalCost/totalAutoUsage?.totalDistance).toFixed(2)}$ Cost per km</p>               
                </Item>:<Item>{t('nodata')}</Item>
              }

              <h2>{t('recentefuelbuys')} </h2>
              {!isLoaded ? <CircularProgress className='circular' /> :
                brandStofs.slice((brandStofPage - 1) * 3, brandStofPage * 3).map((brandstof, index) => (
                  <div key={index}>
                    <Item>
                      <p>{t('fuelamount')} : {brandstof.brandStofAmount}</p>
                      <p>{t('price')} : {brandstof.price}</p>
                      <p>{t('refuelingdate')} : {moment(brandstof.refuelingDate).format('YYYY-MM-DD HH:mm:ss')}</p>
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
