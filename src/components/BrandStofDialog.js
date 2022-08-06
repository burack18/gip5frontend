import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export const BrandStofDialog = ({open,dialogClose}) => {

    const handleClickOpen = () => {
    //  setOpen(true);
    };
  
    const handleClose = () => {
      //setOpen(false);
    };
  
    return (
        open&&
        <Dialog open={open} onClose={dialogClose}>
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We
              will send updates occasionally.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={dialogClose}>Cancel</Button>
            <Button onClick={dialogClose}>Subscribe</Button>
          </DialogActions>
        </Dialog>
    );
}
