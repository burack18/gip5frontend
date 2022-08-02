import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Edit } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { AutoAddDialog } from './AutoAddDialog';




export default function Orders() {
  const [open, setOpen] = React.useState(false);


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
  const popUpAddAutoOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Title>Recent Orders</Title>
        <IconButton variant='contained' color='success' onClick={popUpAddAutoOpen} ><AddIcon /> AddAuto</IconButton>
      </div>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Ship To</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">
                <td><Button variant='contained' color='secondary' title='Edit' startIcon={<Edit />} onClick={() => getRow(row)} >Edit</Button></td>
                <td><Button variant='contained' color='error' title='Delete' startIcon={<DeleteIcon />} onClick={() => alert('as')}>Delete</Button></td>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
      {true && <AutoAddDialog open={open} handleClose={handleClose} />}
    </React.Fragment>
  );
}