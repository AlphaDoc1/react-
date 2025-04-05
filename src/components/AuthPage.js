import {
  Badge,
  Email,
  Lock,
  Person,
  Phone,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Container,
  Fade,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [shake, setShake] = useState(false);
  const [form, setForm] = useState({
    username: '',
    password: '',
    fullName: '',
    email: '',
    phoneNumber: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const response = await api.post('/auth/login', {
          username: form.username,
          password: form.password
        });
        setMessage(response.data);
        localStorage.setItem('username', form.username);
        localStorage.setItem('token', response.data.token || 'dummy');
        navigate('/dashboard');
      } else {
        const response = await api.post('/auth/register', form);
        setMessage(response.data);
        setIsLogin(true);
      }
    } catch (error) {
      setMessage(error.response?.data || 'An error occurred');
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)',
        padding: 2
      }}
    >
      <Container component="main" maxWidth="xs">
        <Fade in={true} timeout={1000}>
          <Paper
            elevation={12}
            className={shake ? 'shake' : ''}
            sx={{
              padding: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderRadius: 3,
              background: 'linear-gradient(to bottom right, #ffffff, #f8f9fa)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              position: 'relative',
              overflow: 'hidden',
              '@keyframes shake': {
                '0%, 100%': {
                  transform: 'translateX(0)',
                },
                '10%, 30%, 50%, 70%, 90%': {
                  transform: 'translateX(-5px)',
                },
                '20%, 40%, 60%, 80%': {
                  transform: 'translateX(5px)',
                },
              },
              '&.shake': {
                animation: 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
              },
              '&:before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #4299E1 0%, #38B2AC 100%)'
              }
            }}
          >
            <Typography
              component="h1"
              variant="h4"
              sx={{
                mb: 4,
                color: '#1A365D',
                fontWeight: 700,
                textAlign: 'center',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                position: 'relative',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -10,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '60px',
                  height: '3px',
                  background: 'linear-gradient(90deg, #4299E1 0%, #38B2AC 100%)',
                  borderRadius: '2px'
                }
              }}
            >
              {isLogin ? 'Welcome Back!' : 'Create Account'}
            </Typography>

            <Box 
              component="form" 
              onSubmit={handleSubmit} 
              sx={{ 
                mt: 1, 
                width: '100%',
                '& .MuiTextField-root': {
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#4299E1',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#38B2AC',
                    }
                  }
                }
              }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                name="username"
                label="Username"
                value={form.username}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person sx={{ color: '#4299E1' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: '#4299E1' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />

              <Fade in={!isLogin} timeout={500}>
                <Box sx={{ display: !isLogin ? 'block' : 'none' }}>
                  <TextField
                    margin="normal"
                    fullWidth
                    name="fullName"
                    label="Full Name"
                    value={form.fullName}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Badge sx={{ color: '#4299E1' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mb: 2 }}
                  />

                  <TextField
                    margin="normal"
                    fullWidth
                    name="email"
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email sx={{ color: '#4299E1' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mb: 2 }}
                  />

                  <TextField
                    margin="normal"
                    fullWidth
                    name="phoneNumber"
                    label="Phone Number"
                    value={form.phoneNumber}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Phone sx={{ color: '#4299E1' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mb: 2 }}
                  />
                </Box>
              </Fade>

              {message && (
                <Fade in={true}>
                  <Alert 
                    severity={message.includes('success') ? 'success' : 'error'} 
                    sx={{ 
                      mb: 2,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                  >
                    {message}
                  </Alert>
                </Fade>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  py: 1.5,
                  background: 'linear-gradient(135deg, #4299E1 0%, #38B2AC 100%)',
                  color: 'white',
                  fontWeight: 600,
                  boxShadow: '0 4px 12px rgba(66, 153, 225, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #3182CE 0%, #319795 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 16px rgba(66, 153, 225, 0.4)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                {isLogin ? 'Sign In' : 'Create Account'}
              </Button>

              <Button
                fullWidth
                onClick={() => setIsLogin(!isLogin)}
                sx={{
                  color: '#4A5568',
                  fontWeight: 500,
                  '&:hover': {
                    color: '#1A365D',
                    background: 'rgba(66, 153, 225, 0.1)',
                    transform: 'translateY(-1px)'
                  },
                  transition: 'all 0.2s ease'
                }}
              >
                {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
              </Button>
            </Box>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
}

export default AuthPage;
