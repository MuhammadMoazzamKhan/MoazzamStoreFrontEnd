import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover, ListItemIcon } from '@mui/material';
import { BiSolidDashboard } from 'react-icons/bi'
import { AiFillHome } from 'react-icons/ai'
import { ImProfile } from 'react-icons/im'
import { TbLogout } from 'react-icons/tb'
import axios from 'axios';
import { logoutFail, logoutSuccess } from '../../../reduxStore/slice/UserSlice';

// ----------------------------------------------------------------------





// ----------------------------------------------------------------------

export default function AccountPopover() {
  const navigate = useNavigate()
  const { user } = useSelector(state => state.user);
  const [open, setOpen] = useState(null);
  const dispatch = useDispatch()

  const logout = async () => {
    try {
      const {data} = await axios.post('http://localhost:8000/api/v1/logout',{ withCredentials: true });
      dispatch(logoutSuccess())
    } catch (error) {
      dispatch(logoutFail({ error: error.response.data }))
    }
  }

  const home = () => {
    navigate('/dashboard/products')
    handleClose()
  }

  const profile = () => {
    navigate('/dashboard/account')
    handleClose()
  }

  const logoutbtn = () => {
    logout()
    handleClose()
  }

  const dashboard = () => {
    navigate('/dashboard/app')
    handleClose()
  }

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const MENU_OPTIONS = [
    {
      label: 'Home',
      icon: <AiFillHome />,
      func: home
    },
    {
      label: 'Profile',
      icon: <ImProfile />,
      func: profile
    },
    {
      label: 'Logout',
      icon: <TbLogout size={18} />,
      func: logoutbtn
    }
  ];

  if (user.user.role === "admin") {
    MENU_OPTIONS.unshift({
      label: 'Dashboard',
      icon: <BiSolidDashboard />,
      func: dashboard
    })
  }
  const handleClose = () => {
    setOpen(null);
  };



  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={user.user.avatar.url} alt={user.user.name} />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user.user.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user.user.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={option.func}>
              <ListItemIcon>
                {option.icon && option.icon}
              </ListItemIcon>
              <Typography variant="inherit">{option.label}</Typography>
            </MenuItem>
          ))}
        </Stack>
      </Popover>
    </>
  );
}
