import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Link } from '@mui/material';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = true, sx }, ) => {
 
  const logo = (
    <Box
      component="img"
      src="https://dynamic.brandcrowd.com/asset/logo/2b9e0c76-8dc3-4da4-9eb7-fd513aa207e4/logo-search-grid-1x?logoTemplateVersion=1&v=638228416273100000&text=Moazzam+Khan&colorpalette=blue"
      sx={{ width: 150, height: 125, cursor: 'pointer', borderRadius : "25px",...sx }}
    />
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return (
    <Link to="/products" component={RouterLink} sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
};

export default Logo;
