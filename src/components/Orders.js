import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { Button, CircularProgress, IconButton, Pagination, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Edit } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { AutoAddDialog } from './AutoAddDialog';
import Slide from '@mui/material/Slide';
import { deleteAuto, fetchAutos } from '../features/auto/autosAsyncThunk';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useNavigate } from 'react-router-dom';


export default function Orders({ transition }) {
  const [open, setOpen] = React.useState(false);
  const [autoInitval, setAutoInitval] = React.useState({})
  const dispatch = useDispatch();
  const autos = useSelector(state => state.autos);
  const [pageNumber, setPageNumber] = React.useState(1);
  const navigate=useNavigate();

  React.useEffect(() => {
    dispatch(fetchAutos())
  }, [])


  function preventDefault(event) {
    event.preventDefault();
  }
  const getRow = (e) => {
    console.log(e)
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

  return (
    <React.Fragment>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Title>List of Autos</Title>
        <IconButton variant='contained' color='success' onClick={() => popUpAddAutoOpen('addmode')} ><AddIcon /> AddAuto</IconButton>
      </div>
      {
        autos.isLoaded ?
          <Table size="medium" >
            <TableHead>
              <TableRow>
                <TableCell>Auto Id</TableCell>
                <TableCell>Merk</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>Plate Number</TableCell>
                <TableCell>Construction Year</TableCell>
                <TableCell>Tank Volume</TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
              {autos.data.slice((pageNumber-1)*5,pageNumber*5).map((auto) => (
                <TableRow key={auto.autoId}>
                  <TableCell>{auto.autoId}</TableCell>
                  <TableCell>{auto.merk}</TableCell>
                  <TableCell>{auto.model}</TableCell>
                  <TableCell>{auto.plateNumber}</TableCell>
                  <TableCell>{auto.yearOfConstruction}</TableCell>
                  <TableCell>{auto.tankVolume}</TableCell>
                  <Button variant='contained' style={{ float: 'right', marginLeft: '10px' }} color='error' title='Delete' startIcon={<DeleteIcon />} onClick={() => deleteAutoById(auto.autoId)}>Delete</Button>
                  <Button variant='contained' style={{ float: 'right' , marginLeft: '10px' }} color='secondary' title='Edit' startIcon={<Edit />} onClick={() => popUpAddAutoOpen('editMode', auto)} >Edit</Button>
                  <Button variant='contained' style={{ float: 'right' }} color='info' startIcon={<InfoOutlinedIcon />}  title='Edit' onClick={() => navigate(`${auto.autoId}/details`)} >View details</Button>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          : <CircularProgress className='circular' />
      }
        <Pagination count={5} onChange={(event,page)=>setPageNumber(page)} color="primary" sx={{marginTop:'5px'}} />
      <AutoAddDialog autoInitval={autoInitval} open={open} transition={transition} handleClose={handleClose} />
    </React.Fragment>
  );
}