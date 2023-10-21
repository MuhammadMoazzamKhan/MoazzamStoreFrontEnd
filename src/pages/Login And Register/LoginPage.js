import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import './LogandSig.css'
// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography, Divider, Stack, Button } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
// hooks
import useResponsive from '../../hooks/useResponsive';
// sections
import { LoginForm } from '../../sections/auth/login';
import { loginFail, loginRequest, loginSuccess } from '../../reduxStore/slice/UserSlice';
import Loading from '../Loader/Loading';
// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(2, 2),
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { loading, isAuthenticated, user, error } = useSelector(state => state.user);

  const fetchDataToChild = (e) => {
    const { email, password } = e
    login(email, password)
  }

  const login = async (email, password) => {
    try {
      (loginRequest())
      const { data } = await axios.post('http://localhost:8000/api/v1/login', {
        email,
        password
      }, { withCredentials: true })
      dispatch(loginSuccess({ user: data }))
    } catch (error) {
      dispatch(loginFail({ error: error.response.data }))
    }
  }


  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard/account")
    }
  }, [dispatch,isAuthenticated])


  return (
    <>
      <Helmet>
        <title> Login | Moazzam Store </title>
      </Helmet>
      {loading ? <Loading /> :
        <StyledRoot>
          <Container maxWidth="sm">
            <StyledSection>
              <Typography variant="h4" gutterBottom>
                Sign in
              </Typography>

              <Typography variant="body2" sx={{ mb: 2 }} >
                Don’t have an account? {''}
                <NavLink to="/dashboard/register" variant="subtitle2">Get started</NavLink>
              </Typography>
              <Typography variant="subtitle2" align="center" sx={{ color: 'red', mb: 3 }} gutterBottom>
                {error && error.error.message}
              </Typography>
              {/* <Stack direction="row" spacing={2}>
              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:facebook-fill" color="#1877F2" width={22} height={22} />
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={22} height={22} />
              </Button>
            </Stack> */}

              {/* <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider> */}

              <LoginForm fetchDataToChild={fetchDataToChild} />
            </StyledSection>
          </Container>
        </StyledRoot>}
    </>
  );
}
