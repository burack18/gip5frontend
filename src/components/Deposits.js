import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { autoApi } from '../utilities/autoApi';
import axios from 'axios';
import { toaster } from '../utilities/toaster';
import { CircularProgress } from '@mui/material';
import moment from 'moment';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
const [isLoaded, setisLoaded] = React.useState(true)
const [totalCost, setTotalCost] = React.useState({})

React.useEffect(() => {
getTotalBrandCost()
}, [])


const getTotalBrandCost = async () => {
  setisLoaded(false)
  try {
    const token=localStorage.getItem('token')
    const response = await axios.get(`${process.env.REACT_APP_BASEURL}/brandstofs`,{
      headers:{
        'Authorization':token
      }
    })
    console.log(response)
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
      <Title>Recent Deposits</Title>
      <Typography component="p" variant="h4">
        ${totalCost.totalCost}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {moment().date().toLocaleString}
      </Typography>
      <div>
        <p>Total count of Refueling : {totalCost.countOfRefueling} </p>{}
      </div>
    </React.Fragment>:
    <div>No data</div>
  );
}