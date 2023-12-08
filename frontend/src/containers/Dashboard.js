import { Button, CssBaseline, Grid, Typography,useMediaQuery } from '@mui/material';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { unSetUserToken } from '../features/authSlice';
import { getToken, removeToken } from "../services/LocalStorageService"
import ChangePassword from './auth/ChangePassword';
import { useGetLoggedUserQuery } from '../services/userAuthApi';
import { useEffect, useState } from 'react';
import { setUserInfo, unsetUserInfo } from '../features/userSlice';
import { Fullscreen } from '@mui/icons-material';
import Signature from './Signature';
import { useTheme } from '@mui/material/styles';


const Dashboard = () => {

  const handleLogout = () => {
    // unSetting the user and token information 
    dispatch(unsetUserInfo({ name: "", email: "", role: "" }))
    dispatch(unSetUserToken({ access_token: null }))
    removeToken()
    navigate('/login')
  }


  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { access_token } = getToken()
  const { data, isSuccess } = useGetLoggedUserQuery(access_token)
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleHome = () => {
    navigate('/')
  }
// user data initial state
  const [userData, setUserData] = useState({
    email: "",
    name: ""
  })

  // Store User Data in Local State
  useEffect(() => {
    if (data && isSuccess) {
      setUserData({
        email: data.email,
        name: data.name,
        role: data.role
      })
    }
  }, [data, isSuccess])

  // Store User Data in Redux Store
  useEffect(() => {
    if (data && isSuccess) {
      dispatch(setUserInfo({
        email: data.email,
        name: data.name,
        role: data.role
      }))
    }
  }, [data, isSuccess, dispatch])

  return (
    <>
      <CssBaseline />
      <Grid container>
        <Grid item xs={12} sm={4} sx={{ p: 3, color: 'white', height: isMobile ? "auto" : "675px" }}>
          <Typography variant='h2' sx={{ color: "#2a9961" }}>Dashboard: </Typography>
          <Typography variant='h5' sx={{ marginTop: "30px", color: "#2a9961" }}>Email: {userData.email}</Typography>
          <Typography variant='h6' sx={{ marginTop: "20px", color: "#2a9961" }}>Name: {userData.name}</Typography>
          <Typography variant='h6' sx={{ marginTop: "20px", color: "#2a9961" }}>Role: {userData.role}</Typography>
        </Grid>
        <Grid item xs={12} sm={8} sx={{ p: 3 }}>
          <Signature />
          <ChangePassword />
        </Grid>
        <Grid item xs={6} sm={3} sx={{ p: 2 }}>
          <Button variant='contained'  size='large' onClick={handleLogout} sx={{ backgroundColor:"#2a9961",":hover": { backgroundColor: "white", color:"black" } ,width: '100%', marginBottom: isMobile ? "10px" : "20px" }}>Logout</Button>
        </Grid>
        <Grid item xs={6} sm={3} sx={{ p: 2 }}>
          <Button variant='contained'  size='large' onClick={handleHome} sx={{ backgroundColor:"#2a9961",":hover": { backgroundColor: "white", color:"black"} ,width: '100%', marginBottom: isMobile ? "10px" : "20px" }}>Home</Button>
        </Grid>
      </Grid>
    </>
  );

};

export default Dashboard;