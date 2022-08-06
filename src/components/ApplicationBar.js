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
import { Button, Tooltip } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { logout } from '../features/user/userSlice';
import Slide from '@mui/material/Slide';
import { fetchAutos } from '../features/auto/autosAsyncThunk';
import AutoTable from './AutoTable'

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    })
}));

export const ApplicationBar = () => {
const mdTheme = createTheme();
const [anchorElUser, setAnchorElUser] = React.useState(null);
const user = useSelector(state => state.user);
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const navigate = useNavigate();
const dispatch = useDispatch();

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
            <AppBar position="absolute">
                <Toolbar
                    sx={{
                        pr: '24px', // keep right padding when drawer closed
                    }}
                >
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
                                : <IconButton color="inherit" onClick={(e)=>handleOpenUserMenu(e)}>
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
                        horizontal: 'left',
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
        </ThemeProvider>
    )
}
