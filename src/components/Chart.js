import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import axios from 'axios';
import { toaster } from '../utilities/toaster';
import { useSelector } from 'react-redux';
import moment from 'moment';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  {month:'agustus',price: 0},
  {month:'mart',price: 5}
];

export default function Chart({dateFilter}) {
  const theme = useTheme();
  const [data, setData] = React.useState([])
  const [isLoaded, setIsLoaded] = React.useState(true)
  const autos=useSelector(state=>state.autos);

  React.useEffect(() => {    
      getData()
  }, [autos,dateFilter])
  

  const getData= async()=>{
    const url=!dateFilter||dateFilter===999?`${process.env.REACT_APP_BASEURL}/brandstofs/months`
    :`${process.env.REACT_APP_BASEURL}/brandstofs/months?date=${moment().subtract(dateFilter,'months').format('MM/DD/yyyy')}`
    setIsLoaded(false)
    try {
      const token=localStorage.getItem('token')
      const response=await axios.get(url,{
        headers:{
          'Authorization':token
        }
      })
      setData(response.data.data)
    } catch (error) {
      toaster('error',error.message)
    }    
    setIsLoaded(true)
  }

  return (
    <React.Fragment>
      <Title>Today</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="month"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Buys ($)
            </Label>
          </YAxis>
          <Line
            isAnimationActive={true}
            type="monotone"
            dataKey="price"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}