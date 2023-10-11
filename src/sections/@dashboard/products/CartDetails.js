import React from 'react'
import {
    Stack,
    Drawer,
    Divider,
    Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ReactStars from 'react-stars'
import Scrollbar from '../../../components/scrollbar';
import { fCurrency } from '../../../utils/formatNumber';


const StyledProductImg = styled('img')({
    width: '100%',
    height: '40%',
    objectFit: 'contain',
    marginBottom: 10
});
const CartDetails = ({ openFilter, onCloseFilter, cartData,disRate }) => {
    const { title, image, price, rating, description } = cartData;
    return (
        <div>
            <Drawer
                anchor="right"
                open={openFilter}
                onClose={onCloseFilter}
                PaperProps={{
                    sx: { width: 280, border: 'none', overflow: 'hidden' },
                }}
            >
                <StyledProductImg style={{ objectFit: "contain" }} alt={title} src={image} />
                <Divider />
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
                    <Typography variant="subtitle1" sx={{ ml: 1 }}>
                        {title}
                    </Typography>
                </Stack>
                <Divider />
                <Scrollbar>
                    <Stack spacing={3} sx={{ p: 3 }}>
                        <div>
                            <Typography variant="subtitle1" gutterBottom>
                                {description}
                            </Typography>
                        </div>
                        <Stack alignItems="center">
                        <ReactStars
                            edit={false}
                            value={rating.rate}
                            size={25}
                        />
                        <Typography variant="subtitle1">
                            <Typography
                                component="span"
                                variant="body1"
                                sx={{
                                    color: 'text.disabled',
                                    textDecoration: 'line-through',
                                }}
                            >
                                {disRate && fCurrency(disRate)}
                            </Typography>
                            &nbsp;
                            {fCurrency(price)}
                        </Typography>
                        </Stack>
                    </Stack>
                </Scrollbar>
            </Drawer>
        </div>
    )
}

export default CartDetails
