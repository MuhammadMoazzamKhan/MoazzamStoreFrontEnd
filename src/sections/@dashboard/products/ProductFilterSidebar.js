import { useState } from 'react';
import PropTypes from 'prop-types';
import ReactStars from 'react-stars'

// @mui
import {
  Box,
  Slider,
  Radio,
  Stack,
  Button,
  Drawer,
  Divider,
  IconButton,
  Typography,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';

// ----------------------------------------------------------------------

export const FILTER_CATEGORY_OPTIONS = ['Electronics', 'Jewelery', "Men's clothing", "Women's clothing"];

// ----------------------------------------------------------------------

ShopFilterSidebar.propTypes = {
  openFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
};


export default function ShopFilterSidebar({ openFilter, onOpenFilter, onCloseFilter, fetchPrice }) {


  const [priceRangeValue, setPriceRangeValue] = useState([0, 2500]);
  const [value, setValue] = useState({ price:priceRangeValue, category: '', rating: 0 });
  const [minNum, setMinNum] = useState(0);
  const [maxNum, setMaxNum] = useState(2500);


  const minmin = 0;
  const maxmax = 2500;


  const handlePriceRangeChange = (event, newValue) => {
    setMinNum(newValue[0]);
    setMaxNum(newValue[1]);
    setPriceRangeValue(newValue);
    setValue({ ...value, price: newValue })
  };


  const ratingChanged = (newRating) => {
    setValue({ ...value, rating: newRating })

  }

  const getValue = () => {
    fetchPrice(value)
  }


  return (
    <>
      <Button disableRipple color="inherit" endIcon={<Iconify icon="ic:round-filter-list" />} onClick={onOpenFilter}>
        Filters&nbsp;
      </Button>

      <Drawer
        anchor="right"
        open={openFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 280, border: 'none', overflow: 'hidden' },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            Filters
          </Typography>
          <IconButton onClick={onCloseFilter}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>
        <Divider />
        <Box sx={{ width: "100%", p: 3, paddingBottom: 0 }}>
          <Typography variant="subtitle1" gutterBottom>
            Price
          </Typography>
          <Slider
            color='warning'
            getAriaLabel={() => "Price range"}
            value={priceRangeValue}
            onChange={handlePriceRangeChange}
            valueLabelDisplay="auto"
            min={minmin}
            max={maxmax}
          />
        </Box>
        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3, paddingBottom: 0 }}>
            <div>
              <Typography variant="subtitle1" gutterBottom>
                Category
              </Typography>
              <RadioGroup>
                {FILTER_CATEGORY_OPTIONS.map((item) => (
                  <FormControlLabel key={item} value={item} onClick={() => { setValue({ ...value, category: item }) }} control={<Radio />} label={item} />
                ))}
              </RadioGroup>
            </div>
          </Stack>
          <Divider />
          <Stack spacing={3} sx={{ p: 3, paddingBottom: 0 }}>
            <Typography variant="subtitle1" gutterBottom>
              Rating
              <ReactStars
                count={5}
                value={value.rating}
                onChange={ratingChanged}
                size={30}
                color2={'#ffd700'} />
            </Typography>
          </Stack>
          <Stack>
            <Button variant="contained" onClick={()=>{ getValue() ;onCloseFilter()}} sx={{ m: 2, color: "black", backgroundColor: "pink" }}>
              Apply Filter
            </Button>
          </Stack>
        </Scrollbar>
      </Drawer>
    </>
  );
}
