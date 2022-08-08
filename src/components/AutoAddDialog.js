import * as React from 'react';
import './component-styles/auto-add-dialog.css'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SaveIcon from '@mui/icons-material/Save';


import CloseIcon from '@mui/icons-material/Close';

import { Container,  InputLabel, TextField } from '@mui/material';
import { Formik,  Form } from 'formik';
import { addAuto, updateAuto } from '../features/auto/autosAsyncThunk';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { useTranslation } from 'react-i18next';


export const AutoAddDialog = ({ autoInitval,open, handleClose,transition }) => {
 const dispatch=useDispatch();
 const { t } = useTranslation();
  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Brand Trucker
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <Container maxWidth="md">
          <Formik
            
            initialValues={{
              merk: autoInitval?.merk||'',
              model: autoInitval?.model||'',
              plateNumber: autoInitval?.plateNumber||'',
              yearOfConstruction:autoInitval?.yearOfConstruction||'',
              tankVolume:autoInitval?.tankVolume||''
            }}
            onSubmit={(values) => {
              if(autoInitval?.autoId!==undefined)
              dispatch(updateAuto({autoId:autoInitval.autoId,...values})).unwrap().then(x=>handleClose())
              else{
                dispatch(addAuto(values)).unwrap().then(x=>handleClose())
              }             
            }}


          >
            {({ handleChange, values, handleSubmit }) => (
              <div>
                <Typography sx={{ ml: 2, flex: 1 ,marginTop:5}} variant="h6" component="div">
                 {autoInitval.autoId?t('car.editform'):t('car.addform')} 
                </Typography>
                <Form style={{ marginTop: '5%' }}>
                  <div>
                    <InputLabel >Model</InputLabel>
                    <TextField
                      name='model'
                      required
                      id="outlined-required"
                      label="Required"
                      onChange={handleChange}
                      value={values.model}
                    />
                  </div>
                  <div>

                    <InputLabel >Merk</InputLabel>
                    <TextField
                      name='merk'
                      required
                      id="outlined-required"
                      label="Required"
                      onChange={handleChange}
                      value={values.merk}
                    />
                  </div>
                  <div>

                    <InputLabel >{t('autotable.platenumber')}</InputLabel>
                    <TextField
                      name='plateNumber'
                      required
                      id="outlined-required"
                      label="Required"
                      onChange={handleChange}
                      value={values.plateNumber}
                    />
                  </div>
                  <div>

                    <InputLabel >{t('datatable.constructionyear')}</InputLabel>
                    <TextField
                      name='yearOfConstruction'
                      required
                      id="outlined-required"
                      label="Required"
                      onChange={handleChange}
                      value={values.yearOfConstruction}
                    />
                  </div>
                  <div>

                    <InputLabel >Tank volume</InputLabel>
                    <TextField
                      name='tankVolume'
                      required
                      id="outlined-required"
                      label="Required"
                      onChange={handleChange}
                      value={values.tankVolume}
                    />
                  </div>
               
                  <Button onClick={handleSubmit} size='large' style={{ marginTop: '10px' }} variant="outlined" startIcon={<SaveIcon />}>
                    {t('save')}
                  </Button>
                </Form>
              </div>
            )}

          </Formik>
        </Container>
      </Dialog>
    </div>
  )
}
