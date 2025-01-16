import { useState } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Button, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function InputWithIcon() {
    const [userData, setUserdata] = useState({ username: '', email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });
    const navigate = useNavigate();
    const url = 'http://localhost:3000/login';
    const emailRegx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in)$/;
    const passwordRegx = /^[0-9a-zA-Z].{5,}$/;

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const handleLogIn = (event) => {
        event.preventDefault();
        const { username, email, password } = userData;

        if (!username || !email || !password) {
            setSnackbar({ open: true, message: 'Please fill all the fields', severity: 'warning' });
        }
        else if (!emailRegx.test(email)) {
            setSnackbar({ open: true, message: 'Enter Valid Email', severity: 'error' });
        }
        else if (!passwordRegx.test(password)) {
            setSnackbar({ open: true, message: 'Please make a strong Password', severity: 'error' });
        }
        else {
            axios.post(url, userData)
                .then((response) => {
                    setSnackbar({ open: true, message: 'Login Successful!', severity: 'success' });
                    console.log(response.data);
                    navigate('/Welcome')
                })
                .catch((error) => {setSnackbar({ open: true, message: 'Login Failed!', severity: 'error' });
                    console.log(error.config.data);
                });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserdata({ ...userData, [name]: value });
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <>
            <form onSubmit={handleLogIn} data-heading='WELCOME'>
                <Box
                    sx={{
                        '& > :not(style)': { m: 1 },
                        border: '1px solid #ccc',
                        padding: '10px',
                        borderRadius: '10px',
                        boxShadow: '0px 0px 10px purple',
                    }}
                >
                    <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-username">Username</InputLabel>
                        <OutlinedInput
                            onChange={handleChange}
                            name="username"
                            id="outlined-adornment-username"
                            endAdornment={
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-E-mail">E-Mail</InputLabel>
                            <OutlinedInput
                                name="email"
                                id="outlined-adornment-E-mail"
                                onChange={handleChange}
                                endAdornment={
                                    <InputAdornment position="start">
                                        <AlternateEmailIcon />
                                    </InputAdornment>
                                }
                                label="email"
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                name="password"
                                onChange={handleChange}
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="start">
                                        <IconButton
                                            aria-label={
                                                showPassword ? 'hide the password' : 'display the password'
                                            }
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            onMouseUp={handleMouseUpPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                    </Box>
                    <Button variant="outlined" color="secondary" type="submit" sx={{ width: '35ch' }}>
                        Login
                    </Button>
                </Box>
            </form>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={2000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
}