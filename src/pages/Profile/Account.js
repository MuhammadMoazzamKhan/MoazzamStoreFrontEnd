import './Account.css'
import axios from 'axios';
import React, { useEffect } from 'react'
import { Typography, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Account = () => {
  const { user } = useSelector(state => state.user)
  const { name, avatar, email } = user.user;
  console.log(user.user)

  return (
    <Container>
      <div className='profileContainer'>
        <div>
          <Typography className='profileHeading' variant="h4" >
            {`${name}'s Profile`}
          </Typography>
          <img className='profileImg' src={avatar.url} alt={name} />
          <NavLink className='editBtn'> Edit Profile</NavLink>
        </div>
        <div >
          <div className='block-1'>
            <h4>
              Name
            </h4>
            <p>
              {name}
            </p>
          </div>
          <div className='block-2'>
            <h4>
              Email
            </h4>
            <p>
              {email}
            </p>
          </div>
          <div className='block-3'>
            <h4>
              Joined On
            </h4>
            <p>
              {email}
            </p>
          </div>
          <div className='block-4'>
          <NavLink to='/orders'> My Orders</NavLink>
          <NavLink to='/password/update' >Change Password</NavLink>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Account
