import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';
import axios from 'axios';
import { toaster } from '../utilities/toaster';
import { CircularProgress } from '@mui/material';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

export default function Deposits({dateFilter}) {
  const { t } = useTranslation();

const [isLoaded, setisLoaded] = React.useState(true)
const [totalCost, setTotalCost] = React.useState({})
const [isLoadedTotalAutousage, setisLoadedTotalAutousage] = React.useState(true)
const [totalAutoUsage, settotalAutoUsage] = React.useState({})
const autos=useSelector(state=>state.autos);

React.useEffect(() => {
getTotalBrandCost()
getTotalAutoUsages()
}, [autos,dateFilter])

const getTotalAutoUsages = async () => {
  setisLoadedTotalAutousage(false)
  try {
    const url=!dateFilter||dateFilter===999?`${process.env.REACT_APP_BASEURL}/auto-usages`
    :`${process.env.REACT_APP_BASEURL}/auto-usages?date=${moment().subtract(dateFilter,'months').format('MM/DD/yyyy')}`
    const token=localStorage.getItem('token')
    const response = await axios.get(`${url}`,{
      headers:{
        'Authorization':token
      }
    })
    settotalAutoUsage(response.data)
  } catch (error) {
  }
  setisLoadedTotalAutousage(true)
}

const getTotalBrandCost = async () => {
  setisLoaded(false)
  try {
    const url=!dateFilter||dateFilter===999?`${process.env.REACT_APP_BASEURL}/brandstofs/totalcost`
    :`${process.env.REACT_APP_BASEURL}/brandstofs/totalcost?date=${moment().subtract(dateFilter,'months').format('MM/DD/yyyy')}`
    const token=localStorage.getItem('token')
    const response = await axios.get(url,{
      headers:{
        'Authorization':token
      }
    })
    setTotalCost(response.data.data)
  } catch (error) {
    toaster('error', error.response.data.message)
  }
  setisLoaded(true)
}
  return (
    !isLoaded ? <CircularProgress className='circular' /> :
    totalCost?
    <React.Fragment>
      <Title>{t('deposit.allbrandcost')}</Title>
      <Typography component="p" variant="h4">
        ${totalCost.totalCost}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {moment().format('MM/dd/yyyy')}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {isLoadedTotalAutousage&&<>{(totalCost.totalCost/totalAutoUsage.totalDistance).toFixed(2)} € per km</>}
      </Typography>
      <div>
        <p>{t('deposit.totalrefueling')} : {totalCost.countOfRefueling} </p>{}
      </div>
    </React.Fragment>:
    <div>No data</div>
  );
}