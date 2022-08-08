import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {  Grid, Input, InputAdornment, InputLabel } from '@mui/material';
import { Form, Formik } from 'formik';
import OilBarrelIcon from '@mui/icons-material/OilBarrel';
import EuroIcon from '@mui/icons-material/Euro';
import { Item } from './Item';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { addBrandStof } from '../features/auto/autosAsyncThunk';
import { useTranslation } from 'react-i18next';






export const BrandStofDialog = ({ open, dialogClose, auto }) => {
  const {t} =useTranslation();
  const dispatch=useDispatch();


  return (
    open &&
    <Dialog open={open} onClose={dialogClose}>
      <DialogTitle>{t('fuel')}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t('addbrandstof.info')}
        </DialogContentText>
  
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <Item>
              <Formik

                initialValues={{
                  brandStofAmount: 0,
                  price: 0
                }}
                onSubmit={(values) => {
                  dispatch(addBrandStof({autoId:auto.autoId,values})).unwrap().then(x=>dialogClose())
                }}


              >
                {({ handleChange, values, handleSubmit }) => (
                  <div>
                    <Form style={{ marginTop: '5%' }}>
                      <div>
                        <InputLabel >{t('fuel')}</InputLabel>
                        <Input
                          name='brandStofAmount'
                          required
                          id="outlined-required"
                          type='number'
                          label="Required"
                          placeholder='0L'
                          onChange={handleChange}
                          value={values.brandStofAmount}
                          startAdornment={<InputAdornment position="start"><OilBarrelIcon /></InputAdornment>}
                        />
                      </div>
                      <div>
                        <InputLabel >{t('price')}</InputLabel>
                        <Input
                          name='price'
                          required
                          id="standard-adornment-amount"
                          type='number'
                          placeholder='0'
                          onChange={handleChange}
                          value={values.price}
                          startAdornment={<InputAdornment position="start"><EuroIcon /></InputAdornment>}
                        />
                      </div>
                      <DialogActions>
                        <Button onClick={dialogClose}>{t('cancel')}</Button>
                        <Button onClick={handleSubmit}>{t('save')}</Button>
                      </DialogActions>
                    </Form>
                  </div>
                )}

              </Formik></Item>
          </Grid>
          <Grid item xs={5}>

            <Item >
             <p style={{color:'black',textAlign:'left'}}>
             TankVolume:{auto.tankVolume}L
              </p> 
              <p style={{color:'black',textAlign:'left'}}>
              Brandstof:{auto.availableBrandStof||0}
              </p>
              <p style={{color:'black',textAlign:'left'}}>
              {t('capacity')}:{auto.tankVolume-(auto.availableBrandStof||0)}
              </p>
             
            </Item>
          </Grid>
        </Grid>
        
      </DialogContent>

    </Dialog>
  );
}
