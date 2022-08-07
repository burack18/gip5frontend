import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import Chart from './Chart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Deposits from './Deposits';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Button, FilledInput, InputAdornment, ListItemButton, ListItemIcon, Select, Tooltip } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/user/userSlice';
import Slide from '@mui/material/Slide';
import { fetchAutos } from '../features/auto/autosAsyncThunk';
import AutoTable from './AutoTable'
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { FormControl, Input, InputLabel, TextField } from '@mui/material';
import { Formik, Field, Form } from 'formik';
import { Label } from 'recharts';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import moment from 'moment';
import { autoApi } from '../utilities/autoApi';
import { toaster } from '../utilities/toaster';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);



export const AutoUsageAdd = () => {

  const mdTheme = createTheme();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const user = useSelector(state => state.user);
  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
  const [open, setOpen] = React.useState(true);
  const autos = useSelector(state => state.autos);
  console.log(autos)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleDrawer = () => {
    setOpen(!open);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (setting) => {
    if (setting == 'Logout') {
      dispatch(logout())
      navigate('/login')
    }
    setAnchorElUser(null);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <div>
              <Tooltip title="Open settings">
                {user.data.username === undefined ? <Button variant='contained' color='error' >Login</Button>
                  : <IconButton color="inherit" onClick={handleOpenUserMenu}>
                    <AccountCircleIcon />
                  </IconButton>
                }

              </Tooltip>
            </div>
          </Toolbar>
          <Menu
            sx={{ mt: '35px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                <Typography textAlign="center" >{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav" >
            <ListItemButton onClick={() => navigate('/dashboard')} >
              <ListItemIcon >
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Customers" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText primary="Reports" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate('/auto-usage')}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Auto Usage Add" />
            </ListItemButton>
            <Divider sx={{ my: 1 }} />
            <React.Fragment>
              <ListSubheader component="div" inset>
                Saved reports
              </ListSubheader>
              <ListItemButton>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Current month" />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Last quarter" />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Year-end sale" />
              </ListItemButton>
            </React.Fragment>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container>
            <Formik
              initialValues={{
                distance: 0,
                brandStofVerbruik: '',
                date: moment(),
                auto:0
              }}
              onSubmit={async(values) => {
                try {
                  const response=await autoApi.post(`${values.auto}/auto-usages`,values);
                  toaster('success',response.data.message)
                  navigate('/dashboard')
                } catch (error) {
                  console.log(error)
                  toaster('error',error.response.data.message)             
                }
              }}
            >
              {({ handleChange,setFieldValue, values, handleSubmit }) => (
                <div>
                  <Container>
                    <Typography sx={{ ml: 2, flex: 1, marginTop: 5 }} variant="h6" component="div">
                      Autousage add form
                    </Typography>

                    <Form style={{ marginTop: '5%' }}>
                      <Grid container spacing={2}>
                        <Grid item xs={3}>
                          <FormControl fullWidth>
                            <InputLabel>asd</InputLabel>
                            <Select                             
                              name='auto'
                              required
                              id="outlined-required"
                              onChange={handleChange}
                              value={values.auto}
                              defaultValue={0}                      
                            >
                              {autos.data.map((auto, index) => <MenuItem key={index} value={auto.autoId}>{auto.merk}</MenuItem>)}

                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                          <FormControl fullWidth>
                            <InputLabel >Distance</InputLabel>
                            <Input
                              name='distance'
                              id="outlined-number"
                              label="Number"
                              type="number"
                              endAdornment='km'
                              onChange={(e)=>setFieldValue('distance',e.target.value)}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                        </Grid>
                        <Grid item xs={3}>
                          <FormControl fullWidth>
                            <InputLabel >Brand Verbruik</InputLabel>
                            <FilledInput
                              name='brandStofVerbruik'
                              required
                              id="outlined-required"
                              onChange={handleChange}
                              value={values.brandStofVerbruik}
                              endAdornment={<InputAdornment position="end">Liter</InputAdornment>}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                          <FormControl fullWidth>
                            
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                              label="Date"
                              value={values.date}
                              name='date'
                              onChange={(e)=>setFieldValue('date',moment(e))}
                              renderInput={(params) => (
                                <TextField {...params} helperText={params?.inputProps?.placeholder} />
                              )}
                            />
                            </LocalizationProvider>
                          </FormControl>
                        </Grid>
                      </Grid>
                      <Button onClick={handleSubmit} size='large' style={{ marginTop: '10px' }} variant="outlined" startIcon={<SaveIcon />}>
                        Save
                      </Button>
                    </Form>
                  </Container>
                </div>
              )}

            </Formik>
          </Container>
        </Box>
      </Box>


    </ThemeProvider >
  )
}
