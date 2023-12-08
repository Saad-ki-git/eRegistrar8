import { TextField, Button, Box, Alert, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../../services/userAuthApi'
import SignatureCanvas from 'react-signature-canvas';


const Registration = () => {
  const [server_error, setServerError] = useState({});
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [role, setRole] = useState(''); // Default role is set to 'student'
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
      password2: data.get('password2'),
      role: role,
    };
  
    try {
      const res = await registerUser(actualData);
  
      if (res.error) {
        setServerError(res.error.data.errors);
      }
  
      if (res.data) {
        setRegistrationSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      }
    } catch (error) {
      console.error('Error occurred during registration:', error);
      // Handle the error, for example, you can set an error state here.
    }
  };
  


  return <div>
    <Box component='form' noValidate sx={{ mt: 1, maxHeight: "700px", overflowY: 'auto', }} id='registration-form' onSubmit={handleSubmit}>
      {/* name field */}
      <TextField margin='normal' required fullWidth id='name' name='name' label='Name' />
      {/* if there is any error with the name field show the error and this error is from backend */}
      {server_error.name ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.name[0]}</Typography> : ""}
      <TextField margin='normal' required fullWidth id='email' name='email' label='Email Address' />
      {server_error.email ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.email[0]}</Typography> : ""}
      <TextField margin='normal' required fullWidth id='password' name='password' label='Password' type='password' />
      {server_error.password ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.password[0]}</Typography> : ""}
      <TextField margin='normal' required fullWidth id='password2' name='password2' label='Confirm Password' type='password' />
      {server_error.password2 ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.password2[0]}</Typography> : ""}
      <Box textAlign='center'>
        <Box textAlign='center'>

          <FormControl fullWidth margin='normal' style={{ minWidth: 200 }}>
            <InputLabel htmlFor='role' id='role-label' margin='normal' name='role'  >
              Role
            </InputLabel>
            <Select
              labelId='role-label'
              id='role'
              name='role'
              value={role}
              required
              onChange={(e) => setRole(e.target.value)}
              style={{ minWidth: 200 }}
            >
              <MenuItem value='Chairman'>Chairman</MenuItem>
              <MenuItem value='Coordinator'>Coordinator</MenuItem>
              <MenuItem value='PA to Chairman'>PA to Chairman</MenuItem>
              <MenuItem value='Assistant Professor'>Assistant Professor</MenuItem>
            </Select>
          </FormControl>

          <Button type='submit' variant="contained" color="success" sx={{ mt: 3, mb: 2, px: 5 }}>Join</Button>
        </Box>
        {server_error.non_field_errors ? <Alert severity='error'>{server_error.non_field_errors[0]}</Alert> : ''}
        {registrationSuccess && (
          <Alert severity='success' style={{ marginTop: '10px' }}>
            Registration successful! An email is sent to you please verify          </Alert>
        )}
      </Box>
      {server_error.non_field_errors ? <Alert severity='error'>{server_error.non_field_errors[0]}</Alert> : ''}
    </Box>
  </div>;
};

export default Registration;