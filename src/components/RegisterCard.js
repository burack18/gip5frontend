import { Button, Card, CardActions, CardContent, Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
import {useNavigate} from 'react-router-dom'
import { useTranslation } from 'react-i18next';

export const RegisterCard = () => {
  const {t}=useTranslation();
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
             {t('login.success')}
             {t('login.success.message')} {time} seconds
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">{t('share')}</Button>
              <Button size="small">{t('learnmore')}</Button>
            </CardActions>
          </Card>
        </Container>
  
      );
}
