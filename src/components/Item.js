import styled from "styled-components";
import Paper from '@mui/material/Paper';


export const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    backgroundColor:  '#fff' ,
    padding: 15,
    textAlign: 'left',
    textDecorationColor:'black',
    color: theme.palette.text.secondary,
  }));