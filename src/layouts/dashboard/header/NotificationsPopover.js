import PropTypes from 'prop-types';
import { noCase } from 'change-case';
import { useContext, useState } from 'react';
// @mui
import {
  Box,
  List,
  Button,
  Badge,
  Avatar,
  Divider,
  Popover,
  Typography,
  IconButton,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
  Stack,
} from '@mui/material';
import { FcCancel } from 'react-icons/fc';
import { CiSquarePlus, CiSquareMinus } from 'react-icons/ci';

// utils
// components
import Iconify from '../../../components/iconify';
import storeContext from '../../../store/storeContext';
import Scrollbar from '../../../components/scrollbar';

// ----------------------------------------------------------------------


export default function NotificationsPopover() {


  const { cart, deleteCart, updateQty } = useContext(storeContext)
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };
  return (
    <>
      <IconButton color={open ? 'primary' : 'default'} onClick={handleOpen} sx={{ width: 40, height: 40 }}>
        <Badge badgeContent={cart.length} color="error">
          <Iconify icon="eva:shopping-cart-fill" width={24} height={24} />
        </Badge>
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: -1.5,
            ml: .5,
            width: 360,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Add Products</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have added  {cart.length} products
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />
        <Scrollbar sx={{ height: { xs: 340, sm: 250 } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                Products
              </ListSubheader>
            }
          >
            <Divider sx={{ borderStyle: 'dashed' }} />
            {cart.map((cart) => (
              <NotificationItem deleteCart={deleteCart} updateQty={updateQty} key={cart.id} cart={cart} />
            ))}
          </List>

          {cart.length < 1 && <Stack sx={{height: 165}} direction="row" alignItems="center" justifyContent="center">
            <Typography variant="subtitle1"> 
              No product here
            </Typography>
          </Stack>}
          <Divider sx={{ borderStyle: 'dashed'}} />
          <Box sx={{ p: 1, width: "100%" }}>
            <Button disabled={cart.length < 1}  fullWidth disableRipple>
              View All
            </Button>
          </Box>
        </Scrollbar>
      </Popover>
    </>
  );
}

// ----------------------------------------------------------------------

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    createdAt: PropTypes.instanceOf(Date),
    id: PropTypes.string,
    isUnRead: PropTypes.bool,
    title: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    avatar: PropTypes.any,
  }),
};

function NotificationItem({ cart, deleteCart, updateQty }) {
  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
      }}
      className='noti-cursor'
    >
      <ListItemAvatar>
        <Avatar sx={{ width: 50, height: 50 }} alt="Remy Sharp" src={cart.image} />
      </ListItemAvatar>
      <ListItemText
        primary={cart.title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled',
            }}
          >
            ${Number(cart.price * cart.qty).toFixed(2) }
            <CiSquarePlus onClick={() =>
              updateQty("+", cart.id)
            } className='icon-cursor gapping' size={20} />
            {cart.qty}
            <CiSquareMinus onClick={() =>
              cart.qty > 1 && updateQty("-", cart.id)
            } className='icon-cursor gapping' size={20} />
            <FcCancel onClick={() => {
              deleteCart(cart.id)
            }} className='icon-cursor cancel-icon ' size={20} />
          </Typography>
        }
      />
    </ListItemButton>
  );
}