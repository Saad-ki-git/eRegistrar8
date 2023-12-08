import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { getToken } from '../services/LocalStorageService';

const Navbar = () => {
  const { access_token } = getToken();

  const buttonStyle = {
    color: 'white',
    textTransform: 'none',
    backgroundColor: '#2a9961',
    height: '40px',
    transition: 'black 0.3s ease', // Add a smooth transition for the hover effect
    '&:hover': {
      backgroundColor: 'white', // Change the background color on hover
    },
  };
  

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: 'white',borderBottom:"1px sloid black",height:"120px" }}>
        <Toolbar>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
        <img src="https://www.aiou.edu.pk/sites/default/files/aiouLogo_0%20%282%29_0.png" alt="Aiou Logo" style={{ height: '100px', marginRight: '10px' }} />
      </Typography>

          <Button
            component={NavLink}
            to="/"
            sx={{
              ...buttonStyle,
              backgroundColor: 'transparent',
              '&.active': {
                backgroundColor: buttonStyle.backgroundColor,
              },
              marginRight: 2, // Add margin between buttons (adjust the value according to your preference)
            }}
            className="active"
          >
            Home
          </Button>
          <Button
            component={NavLink}
            to="/about"
            sx={{
              ...buttonStyle,
              backgroundColor: 'transparent',
              '&.active': {
                backgroundColor: buttonStyle.backgroundColor,
              },
              marginRight: 2, // Add margin between buttons (adjust the value according to your preference)
            }}
            className="active"
          >
            About
          </Button>

          {/* if access_token is true show dashboard */}
          {access_token ? (
            <Button
              component={NavLink}
              to="/dashboard"
              sx={{
                ...buttonStyle,
                backgroundColor: 'transparent',
                '&.active': {
                  backgroundColor: buttonStyle.backgroundColor,
                },
                marginRight: 2, // Add margin between buttons (adjust the value according to your preference)
              }}
              className="active"
            >
              Dashboard
            </Button>
          ) : (
            // else show login/registration page
            <Button
              component={NavLink}
              to="/login"
              sx={{
                ...buttonStyle,
                backgroundColor: 'transparent',
                '&.active': {
                  backgroundColor: buttonStyle.backgroundColor,
                },
                marginRight: 2, // Add margin between buttons (adjust the value according to your preference)
              }}
              className="active"
            >
              Login/Registration
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
