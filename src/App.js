import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import axios from 'axios';
import { useSelector } from 'react-redux';

// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import StoreState from './store/StoreState';
import "./index.css"
import { store } from './reduxStore';
import { loginRequest,loginSuccess,LoadUserFail } from './reduxStore/slice/UserSlice';
// ----------------------------------------------------------------------

export default function App() {

  const { isAuthenticated } = useSelector(state => state.user);

  

  const userDetails = async () => {
    try {
      store.dispatch(loginRequest())
      const { data } = await axios.get('http://localhost:8000/api/v1/me',{withCredentials:true})
      store.dispatch(loginSuccess({ user: data }))
    } catch (error) {
      store.dispatch(LoadUserFail({ error: error.response.data }))
    }
  }

  useEffect(()=>{
    userDetails()
  },[store.dispatch])

  return (
    <StoreState>
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <ScrollToTop />
          <StyledChart />
          <Router isAuthenticated={isAuthenticated} />
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
    </StoreState>
  );
}