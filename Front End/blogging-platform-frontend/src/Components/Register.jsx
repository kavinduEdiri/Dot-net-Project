// src/Components/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  MenuItem,
  Paper,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';

const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  role: Yup.string()
    .oneOf(['User', 'Admin'], 'Invalid role')
    .required('Role is required'),
});

const Register = () => {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: 8,
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        backgroundColor: '#fff',
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Register
      </Typography>

      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      <Formik
        initialValues={{ username: '', password: '', role: 'User' }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSuccessMessage('');
          setErrorMessage('');
          try {
            const response = await axios.post('https://localhost:9000/api/Auth/register', values);
            localStorage.setItem('token', response.data.token);
            setSuccessMessage('Registration successful! Redirecting to login...');
            setTimeout(() => navigate('/login'), 1500);
          } catch (error) {
            const errMsg = error.response?.data || 'Registration failed.';
            setErrorMessage(errMsg);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <Field
              as={TextField}
              fullWidth
              label="Username"
              name="username"
              margin="normal"
              error={touched.username && !!errors.username}
              helperText={touched.username && errors.username}
            />
            <Field
              as={TextField}
              fullWidth
              label="Password"
              name="password"
              type="password"
              margin="normal"
              error={touched.password && !!errors.password}
              helperText={touched.password && errors.password}
            />
            <Field
              as={TextField}
              select
              fullWidth
              label="Role"
              name="role"
              margin="normal"
              error={touched.role && !!errors.role}
              helperText={touched.role && errors.role}
            >
              <MenuItem value="User">User</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </Field>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isSubmitting}
              sx={{ mt: 2 }}
            >
              {isSubmitting ? <CircularProgress size={24} /> : 'Register'}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Register;