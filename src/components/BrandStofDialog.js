import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {  Grid, Input, InputAdornment, InputLabel } from '@mui/material';
import { Form, Formik } from 'formik';
import OilBarrelIcon from '@mui/icons-material/OilBarrel';
import EuroIcon from '@mui/icons-material/Euro';
import { autoApi } from '../utilities/autoApi';
import { Item } from './Item';
import { toaster } from '../utilities/toaster';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { addBrandStof } from '../features/auto/autosAsyncThunk';
import { ThemeProvider  } from '@mui/material/styles';






export const BrandStofDialog = ({ open, dialogClose, auto }) => {

  const dispatch=useDispatch();


  return (
    open &&
    <Dialog open={open} onClose={dialogClose}>
      <DialogTitle>Brandstof</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
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
                        <InputLabel >Brandstof</InputLabel>
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
                        <InputLabel >Price</InputLabel>
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
                        <Button onClick={dialogClose}>Cancel</Button>
                        <Button onClick={handleSubmit}>Save</Button>
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
              RefuelingCapacity:{auto.tankVolume-(auto.availableBrandStof||0)}
              </p>
             
            </Item>
          </Grid>
        </Grid>
        
      </DialogContent>

    </Dialog>
  );
}
