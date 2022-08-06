import { createTheme, Grid } from '@mui/material';
import { Box, Container } from '@mui/system';
import React from 'react'
import { useParams } from 'react-router-dom'
import { ThemeProvider } from 'styled-components';
import { ApplicationBar } from './ApplicationBar';
import { Item } from './Item';

export const AutoDetails = () => {
    const {autoId}=useParams();
    const mdTheme = createTheme();
  return (
    <Container style={{marginTop:'10%'}}>
      <ApplicationBar />
      <Box sx={{ flexGrow: 1 }}>
        <ThemeProvider theme={mdTheme}>
        <Grid container spacing={2}>
        <Grid item xs={6}>
          <h2>Recent Auto Usages</h2>
          <Item>xs=8</Item>
        </Grid>
        <Grid item xs={6}>
          <h2>Recent brandstof buys </h2>
          <Item><h2>asdasd</h2></Item>
        </Grid>
      </Grid>
        </ThemeProvider>
      
    </Box>
    </Container>
  )
}
