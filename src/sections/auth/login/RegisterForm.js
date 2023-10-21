import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
// @mui
import { Link, Stack, Box, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { loginFail, loginRequest, loginSuccess } from '../../../reduxStore/slice/UserSlice';
import Iconify from '../../../components/iconify';

import image from '../../../Images/profile-circle-icon-2048x2048-cqe5466q.png'
// ----------------------------------------------------------------------

export default function LoginForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(image);
  const [avatar, setAvatar] = useState('');
  const [inputsValue, setInputsValue] = useState({ name: '', email: "", password: '' });

  const { name, email, password } = inputsValue;

  const onChange = (e) => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          console.log(reader.result)
          setAvatarPreview(reader.result)
          setAvatar(reader.result)
        }
      }
      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0])
      }
    } else {
      setInputsValue({ ...inputsValue, [e.target.name]: e.target.value })
    }
  }

  const registerApi = async (myForm) => {
    try {
      dispatch(loginRequest())
      const { data } = await axios.post('http://localhost:8000/api/v1/register', myForm, { withCredentials: true })
      dispatch(loginSuccess({ user: data }))
    } catch (error) {
      dispatch(loginFail({ error: error.response.data }))
    }
  }

  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set('name', name)
    myForm.set('email', email)
    myForm.set('password', password)
    myForm.set('avatar', avatar)
    registerApi(myForm)
  };
  
  return (
    <>
      <form encType="multipart/form-data" className='fromhere' onSubmit={registerSubmit}>
        <TextField name="name" onChange={onChange} label="Name" />
        <TextField name="email" onChange={onChange} label="Email address" />

        <TextField
          name="password"
          label="Password"
          onChange={onChange}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <div id='registerImage'>
          <img src={avatarPreview} alt='' />
          <input type="file" name='avatar' accept='image/*' onChange={onChange} />
        </div>

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
