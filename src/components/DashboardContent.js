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
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Chart from './Chart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Deposits from './Deposits';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Button, FormControl, InputLabel, ListItemButton, ListItemIcon, Select, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/user/userSlice';
import Slide from '@mui/material/Slide';
import AutoTable from './AutoTable'
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AddIcon from '@mui/icons-material/Add';
import LanguageIcon from '@mui/icons-material/Language';
import { US,NL, FR } from 'country-flag-icons/react/3x2';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

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

const drawerWidth = 250;

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



const mdTheme = createTheme();

function DashboardContent() {
  const { t } = useTranslation();
  const [dateFilter, setdateFilter] = React.useState(999)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [open, setOpen] = React.useState(true);




  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElUserLanguage, setanchorElUserLanguage] = React.useState(null);
  const handleOpenLanguageMenu = (event) => {
    setanchorElUserLanguage(event.currentTarget);
  };
  const handleCloseUserMenuLanguage = (language) => {
    if(language==='EN'){
      i18next.changeLanguage('en')
    }else if(language==='NL'){
      i18next.changeLanguage('nl')
    }
    else if(language==='FR'){
      i18next.changeLanguage('fr')
    }
    setanchorElUserLanguage(null);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (setting) => {
    if (setting === 'Logout' || setting === 'Uitloggen') {
      dispatch(logout())
      navigate('/login')
    }
    setAnchorElUser(null);
  };
  const settings = [t('dashboard.usermenu.profile'), 'Account', 'Dashboard', t('dashboard.usermenu.logout')];
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
              
                <IconButton onClick={handleOpenLanguageMenu}><LanguageIcon style={{color:'white'}}  /></IconButton>
              
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
            anchorEl={anchorElUserLanguage}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUserLanguage)}
            onClose={handleCloseUserMenuLanguage}
          >
              <MenuItem onClick={()=>handleCloseUserMenuLanguage('EN')}>
                <div>
                <span><US  style={{width:'20px',marginRight:'5px'}} /></span>EN                           
                </div>
              </MenuItem>
              <MenuItem onClick={()=>handleCloseUserMenuLanguage('NL')}>
                <div>
                <span><NL  style={{width:'20px',marginRight:'5px'}} /></span>NL                           
                </div>
              </MenuItem>   
              <MenuItem onClick={()=>handleCloseUserMenuLanguage('FR')}>
                <div>
                <span><FR  style={{width:'20px',marginRight:'5px'}} /></span>FR                           
                </div>
              </MenuItem>         
          </Menu>
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
            <ListItemButton onClick={() => navigate('/dashboard')}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
            <ListItemButton disabled>
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItemButton>
            <ListItemButton disabled>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Customers" />
            </ListItemButton>
            <ListItemButton disabled>
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText primary="Reports" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate('/auto-usage')}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary={t('dashboard.add.autousage')} />
            </ListItemButton>
            <Divider sx={{ my: 1 }} />
            <React.Fragment>
              <ListSubheader component="div" inset>
                {t('dashbard.savedreports')}
              </ListSubheader>
              <ListItemButton>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary={t('dashboard.currentMonth')} />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary={t('dashboard.lastQuarter')} />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary={t('dashboard.yearandsale')} />
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
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <FormControl style={{ width: '120px' }}>
              <InputLabel id="demo-simple-select-label">Filter</InputLabel>
              <Select labelId="demo-simple-select-label" value={dateFilter} onChange={(e) => setdateFilter(e.target.value)}>
                <MenuItem value={3}>3 {t('dashboard.maand')}</MenuItem>
                <MenuItem value={6}>6 {t('dashboard.maand')}</MenuItem>
                <MenuItem value={12}>12 {t('dashboard.maand')}(1 year)</MenuItem>
                <MenuItem value={999}>{t('dashboard.alltime')}</MenuItem>
              </Select >
            </FormControl>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Chart dateFilter={dateFilter} />
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Deposits dateFilter={dateFilter} />
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <AutoTable transition={Transition} />
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}