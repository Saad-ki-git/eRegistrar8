import { Grid, Card, Tabs, Typography, Tab, Box } from '@mui/material';
import { useState } from 'react';
import Pic1 from "../../assets/logo.png"
import Registration from './Registration';
import UserLogin from './UserLogin';
import { ShoppingBag } from '@mui/icons-material';

const TabPanel = (props) => {
  const { children, value, index } = props;
  return (
    <div role='tabpanel' hidden={value !== index}>
      {
        value === index && (
          <Box>{children}</Box>
        )
      }
    </div>
  )
}
const LoginReg = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }
  return <>
    <Grid container sx={{ height: '90vh' }}>
    <Grid
      item
      lg={7}
      sm={5}
      sx={{
        backgroundImage: `url(https://www.aiou.edu.pk/sites/default/files/aiouLogo_0%20%282%29_0.png)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain', // Set backgroundSize to 'contain' or specify a specific width and height, e.g., '200px 100px'
        backgroundPosition: 'center',
        height:"200px",
        marginTop:"160px",
        width:"500px",
        display: { xs: 'none', sm: 'block' },
      }}
    >
    </Grid>
      <Grid item lg={5} sm={7} xs={12}>
        <Card sx={{ width: '100%', height: '100%' }}>
          <Box sx={{ mx: 3, height: 530 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
      value={value}
      textColor='inherit'  // Set the textColor to 'inherit'
      indicatorColor='inherit'  // Set the indicatorColor to 'inherit'
      onChange={handleChange}
      sx={{ 
        '& .MuiTabs-indicator': {
          backgroundColor: 'white',  // Set the indicator color to white
        },
        '& .MuiTab-textColorInherit': {
          color: 'green',  // Set the text color to green
        },
        '& .MuiTab-root': {
          textTransform: 'none',
          fontWeight: 'bold',
        },
      }}
    >
      <Tab label='Login' />
      <Tab label='Registration' />
    </Tabs>

            </Box>
            <TabPanel value={value} index={0}>
              <UserLogin />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Registration />
            </TabPanel>
          </Box>
        </Card>
      </Grid>
    </Grid>
  </>;
};

export default LoginReg;