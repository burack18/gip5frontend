import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import {  CircularProgress, createTheme, Fab, IconButton, Pagination } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Edit } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { AutoAddDialog } from './AutoAddDialog';
import { deleteAuto, fetchAutos } from '../features/auto/autosAsyncThunk';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LocalGasStationOutlinedIcon from '@mui/icons-material/LocalGasStationOutlined';
import { useNavigate } from 'react-router-dom';
import { BrandStofDialog } from './BrandStofDialog';
import { ThemeProvider } from 'styled-components';
import { useTranslation } from 'react-i18next';


export default function AutoTable({ transition }) {
  const { t } = useTranslation();

  const [open, setOpen] = React.useState(false);
  const [isBrandStofDialogOpen, setIsBrandStofDialogOpen] = React.useState(false);
  const [autoInitval, setAutoInitval] = React.useState({})
  const dispatch = useDispatch();
  const autos = useSelector(state => state.autos);
  const [pageNumber, setPageNumber] = React.useState(1);
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(fetchAutos())
  }, [])

  const dialogClose = () => {
    setAutoInitval({})
    setIsBrandStofDialogOpen(false)
  }

  const dialogOpen = (auto) => {
    setAutoInitval(auto)
    setIsBrandStofDialogOpen(true)
  }

  const popUpAddAutoOpen = (type, auto = {}) => {
    if (type === 'addmode') setAutoInitval({})
    else if (type === 'editMode') setAutoInitval(auto)
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };
  const deleteAutoById = (autoId) => {
    dispatch(deleteAuto(autoId))
  }
  const mdTheme = createTheme();
  return (
    <React.Fragment>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Title>{t('autotable.autolist')}</Title>
        <IconButton variant='contained' color='success' onClick={() => popUpAddAutoOpen('addmode')} ><AddIcon />{t('autotable.addauto')}</IconButton>
      </div>
      {
        autos.isLoaded ?
          <Table size="medium" >
            <TableHead>
              <TableRow>

                <TableCell>Merk</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>{t('autotable.platenumber')}</TableCell>
                <TableCell>{t('datatable.constructionyear')}</TableCell>
                <TableCell>Tank Volume</TableCell>
                <TableCell>Brandstof</TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
              {autos.data.slice((pageNumber - 1) * 5, pageNumber * 5).map((auto,index) => (
                <TableRow key={index}>
                  <TableCell>{auto.merk}</TableCell>
                  <TableCell>{auto.model}</TableCell>
                  <TableCell>{auto.plateNumber}</TableCell>
                  <TableCell>{auto.yearOfConstruction}</TableCell>
                  <TableCell>{auto.tankVolume}</TableCell>
                  <TableCell>{auto.availableBrandStof||0}</TableCell>
                  <td>            
                    <Fab variant='contained' size='small' style={{ float: 'right', marginLeft: '5px' }} color='error' title='Delete'  onClick={() => deleteAutoById(auto.autoId)}><DeleteIcon /></Fab>
                    <Fab variant='contained' size='small' style={{ float: 'right', marginLeft: '5px' }} color='secondary' title='Edit' onClick={() => popUpAddAutoOpen('editMode', auto)} ><Edit /></Fab>
                    <Fab variant='contained' size='small' style={{ float: 'right', marginLeft: '5px' }} color='info'  title='Details' onClick={() => navigate(`${auto.autoId}/details`)} ><InfoOutlinedIcon /></Fab>
                    <Fab variant='contained' size='small' style={{ float: 'right', marginLeft: '5px' }} color='warning'  title='Brandstof' onClick={() => dialogOpen(auto)} ><LocalGasStationOutlinedIcon /></Fab>
                  </td>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          : <CircularProgress className='circular' />
      }
      <Pagination count={5} onChange={(event, page) => setPageNumber(page)} color="primary" sx={{ marginTop: '5px' }} />
      <AutoAddDialog autoInitval={autoInitval} open={open} transition={transition} handleClose={handleClose} />
      <ThemeProvider theme={mdTheme}>
        <BrandStofDialog open={isBrandStofDialogOpen} dialogClose={dialogClose} auto={autoInitval} />
      </ThemeProvider>
    </React.Fragment>
  );
}