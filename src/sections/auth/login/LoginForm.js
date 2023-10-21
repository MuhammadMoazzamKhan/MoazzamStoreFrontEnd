import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm({fetchDataToChild}) {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [inputsValue, setInputsValue] = useState({email: "", password: '' });

  const onChange = (e) => {
    setInputsValue({...inputsValue,[e.target.name]: e.target.value})
  }

  const loginForm = (e) => {
    e.preventDefault();
    fetchDataToChild(inputsValue)
  };

  return (
    <>
          <form  className='fromhere' onSubmit={loginForm}>

        <TextField name="email" required onChange={onChange} label="Email address" />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          onChange={onChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          required
        />

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained">
        Login
      </LoadingButton>
      </form>
    </>
  );
}
