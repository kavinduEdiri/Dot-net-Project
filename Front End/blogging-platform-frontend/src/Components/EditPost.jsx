import React, { useEffect, useState } from 'react';
import { Container, TextField, Button, IconButton, CircularProgress } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Notification from './Notification';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  title: Yup.string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters'),
  content: Yup.string()
    .required('Content is required')
    .min(10, 'Content must be at least 10 characters'),
});

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    title: '',
    content: '',
    categoryId: '',
  });
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationSeverity, setNotificationSeverity] = useState('success');

  const handleNotificationClose = () => {
    setNotificationOpen(false);
  };

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No authentication token found.');

        const response = await axios.get(`https://localhost:9000/api/Posts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status !== 200) {
          throw new Error('Failed to fetch post data');
        }

        const data = response.data;
        setInitialValues({
          title: data.Title || data.title || '',
          content: data.Content || data.content || '',
          categoryId: data.CategoryId || data.categoryId || '',
        });
      } catch (error) {
        console.error('Error fetching post data:', error.message, error.response?.data);
        setNotificationMessage(`Failed to fetch post data: ${error.message}`);
        setNotificationSeverity('error');
        setNotificationOpen(true);
      }
    };
    fetchPostData();
  }, [id]);

  return (
    <Container maxWidth="sm">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <IconButton onClick={() => navigate('/posts')}>
          <ArrowBackIcon />
        </IconButton>
      </div>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No authentication token found.');

            const postData = {
              Title: values.title,
              Content: values.content,
              CategoryId: parseInt(values.categoryId, 10) || 0,
            };

            const response = await axios.put(
              `https://localhost:9000/api/Posts/${id}`,
              postData,
              {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (response.status !== 200) {
              throw new Error(`Failed to update post with status ${response.status}`);
            }

            setNotificationMessage('Post updated successfully!');
            setNotificationSeverity('success');
            setNotificationOpen(true);

            setTimeout(() => {
              navigate('/posts', { state: { updatedPost: response.data } });
            }, 2000);
          } catch (error) {
            console.error('Error updating post:', error.message, error.response?.data);
            let errorMessage = 'Failed to update the post.';
            if (error.response?.data?.title) {
              errorMessage = error.response.data.title; // e.g., "Post title must be unique"
            } else if (error.response?.data?.Errors?.length > 0) {
              errorMessage = error.response.data.Errors.map(err => err.ErrorMessage).join(', ');
            } else if (error.response?.data?.Message) {
              errorMessage = error.response.data.Message;
            }
            setNotificationMessage(errorMessage);
            setNotificationSeverity('error');
            setNotificationOpen(true);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, errors, touched, isSubmitting }) => (
          <Form>
            <Field
              as={TextField}
              label="Title"
              variant="outlined"
              fullWidth
              margin="normal"
              name="title"
              error={touched.title && !!errors.title}
              helperText={touched.title && errors.title}
            />
            <Field
              as={TextField}
              label="Content"
              variant="outlined"
              fullWidth
              margin="normal"
              multiline
              rows={8}
              name="content"
              error={touched.content && !!errors.content}
              helperText={touched.content && errors.content}
            />
            <Field
              as={TextField}
              label="Category Id"
              variant="outlined"
              fullWidth
              margin="normal"
              name="categoryId"
              InputProps={{ readOnly: true }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isSubmitting}
            >
              {isSubmitting ? <CircularProgress size={24} /> : 'Save'}
            </Button>
          </Form>
        )}
      </Formik>

      <Notification
        open={notificationOpen}
        message={notificationMessage}
        onClose={handleNotificationClose}
        severity={notificationSeverity}
      />
    </Container>
  );
};

export default EditPost;