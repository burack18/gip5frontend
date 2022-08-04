import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { Button, CircularProgress, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Edit } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { AutoAddDialog } from './AutoAddDialog';
import Slide from '@mui/material/Slide';
import { deleteAuto, fetchAutos } from '../features/auto/autosAsyncThunk';
import { useDispatch, useSelector } from 'react-redux/es/exports';



export default function Orders({ transition }) {
  const [open, setOpen] = React.useState(false);
  const [autoInitval, setAutoInitval] = React.useState({})
  const dispatch = useDispatch();
  const autos = useSelector(state => state.autos);


  React.useEffect(() => {
    dispatch(fetchAutos())
  }, [])
  // Generate Order Data
  function createData(id, date, name, shipTo, paymentMethod, amount) {
    return { id, date, name, shipTo, paymentMethod, amount };
  }

  const rows = [
    createData(
      0,
      '16 Mar, 2019',
      'Elvis Presley',
      'Tupelo, MS',
      'VISA ⠀•••• 3719',
      312.44,
    )
  ];

  function preventDefault(event) {
    event.preventDefault();
  }
  const getRow = (e) => {
    console.log(e)
  }
  const popUpAddAutoOpen = (type,auto={}) => {
      if(type==='addmode')setAutoInitval({})
      else if(type==='editMode')setAutoInitval(auto)
     setOpen(true);
  }
  
  const handleClose = () => {
    setOpen(false);
  };
const deleteAutoById=(autoId)=>{
  dispatch(deleteAuto(autoId))
}

  return (
    <React.Fragment>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Title>Recent Orders</Title>
        <IconButton variant='contained' color='success' onClick={()=>popUpAddAutoOpen('addmode')} ><AddIcon /> AddAuto</IconButton>
      </div>
      {
        autos.isLoaded ?
          <Table size="small" >
            <TableHead>
              <TableRow>
                <TableCell>Auto Id</TableCell>
                <TableCell>Merk</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>Plate Number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
              {autos.data.map((auto) => (
                <TableRow key={auto.autoId}>
                  <TableCell>{auto.autoId}</TableCell>
                  <TableCell>{auto.merk}</TableCell>
                  <TableCell>{auto.model}</TableCell>
                  <TableCell>{auto.plateNumber}</TableCell>           
                    <Button variant='contained' style={{float:'right' ,marginLeft:'10px'}} color='error' title='Delete' startIcon={<DeleteIcon />} onClick={() => deleteAutoById(auto.autoId)}>Delete</Button>    
                    <Button variant='contained' style={{float:'right'}} color='secondary' title='Edit' startIcon={<Edit />} onClick={() => popUpAddAutoOpen('editMode',auto)} >Edit</Button> 
                </TableRow>
              ))}
            </TableBody>
          </Table>
          : <CircularProgress />
      }
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
      <AutoAddDialog autoInitval={autoInitval} open={open} transition={transition} handleClose={handleClose} />
    </React.Fragment>
  );
}