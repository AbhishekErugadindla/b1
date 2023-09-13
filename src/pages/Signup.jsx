import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { authActions } from "../store";
import { useDispatch } from 'react-redux';

const Signup = () => {
  const dispatch = useDispatch();

  const history = useNavigate();
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    try {
      const res = await axios.post('http://3.7.252.28:5000/api/signup', {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      }, {
        withCredentials: true, // Set withCredentials to true
      });
      const data = res.data;
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await sendRequest();

      if (data) {
        // Signup successful, redirect to login
        dispatch(authActions.signup());
        history("/login");
      } else {
        // Handle signup error here, e.g., display an error message
        console.error('Signup failed');
      }
    } catch (error) {
      // Handle network or other errors here
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          marginLeft="auto"
          marginRight="auto"
          width={300}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            variant="h3"
            style={{
              marginTop: '30px',
              marginBottom: '20px',
              fontWeight: 'bold',
            }}
          >
            Sign Up
          </Typography>
          <TextField
            name="name"
            onChange={handleChange}
            value={inputs.name}
            variant="outlined"
            placeholder="Name"
            margin="normal"
          />
          <TextField
            name="email"
            onChange={handleChange}
            type="email"
            value={inputs.email}
            variant="outlined"
            placeholder="Email"
            margin="normal"
          />
          <TextField
            name="password"
            onChange={handleChange}
            type="password"
            value={inputs.password}
            variant="outlined"
            placeholder="Password"
            margin="normal"
          />
          <Button
            style={{
              borderRadius: 10,
              backgroundColor: 'black',
              padding: '9px 9px',
              fontSize: '15px',
            }}
            variant="contained"
            type="submit"
          >
            Signup
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Signup;