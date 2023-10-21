import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
// @mui
import { Box, List, ListItemText } from '@mui/material';
import { ImProfile } from 'react-icons/im'
//
import { StyledNavItem, StyledNavItemIcon } from './styles';
// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
  const { isAuthenticated } = useSelector(state => state.user);
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => (
          <NavItem key={item.title} item={item} isAuthenticated={isAuthenticated} />
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item, isAuthenticated }) {
  const { info } = item;
  let { title, path, icon } = item;
  if (isAuthenticated && title === "login") {
    title = "account"
    path = "/dashboard/account"
    icon = <ImProfile size={20} />
  }
  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        '&.active': {
          color: 'text.primary',
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightBold',
        },
      }}
    >
      <StyledNavItemIcon >{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />

      {info && info}
    </StyledNavItem>
  );
}