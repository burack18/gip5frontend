import { Button, Card, CardActions, CardContent, Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
import {useNavigate} from 'react-router-dom'

export const RegisterCard = () => {
    const [time, setTime] = useState(5)
    const navigate=useNavigate();
    let newIntervalId;
    useEffect(() => {
         newIntervalId = setInterval(() => {
            setTime(time=>time-1)
          }, 1000);
          return ()=>clearInterval(newIntervalId)         
    }, [time])
  
    if(time===0)navigate('/login')
          
      return (
        <Container>
          <Card sx={{ maxWidth: 345, margin: 'auto',marginTop:'5%' }}>
            <div style={{margin:'auto',width:'25%'}}>
              <VerifiedUserRoundedIcon fontSize='large' color='success' />
            </div>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
             Login Successfully
             We will send you to Login Page In {time} seconds
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Container>
  
      );
}
