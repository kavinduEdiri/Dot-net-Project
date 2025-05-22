// src/Components/ListPost.jsx
import { Box, Grid, Typography, Button, Pagination } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Notification from './Notification';
import axios from 'axios';
import PostCard from './PostCard';

const ListPost = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationSeverity, setNotificationSeverity] = useState('success');
  const [error, setError] = useState(null);
  const pageSize = 6;
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found.');

      const response = await axios.get(
        `https://localhost:9000/api/Posts?pageNumber=${currentPage}&pageSize=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Full API Response:', response);
      console.log('API Response Data:', response.data);

      if (!response.data || typeof response.data !== 'object') {
        throw new Error('Response data is not a valid object');
      }

      const { posts: rawPosts, totalPages } = response.data;
      if (!Array.isArray(rawPosts)) {
        console.warn('Posts array is missing or not an array:', rawPosts);
        setPosts([]);
        setTotalPages(1);
        setError('No posts found in response.');
        return;
      }

      const mappedPosts = rawPosts.map(post => ({
        id: post.Id ?? post.id ?? 0,
        title: post.Title ?? post.title ?? 'Untitled',
        content: post.Content ?? post.content ?? 'No Content',
        categoryId: post.CategoryId ?? post.categoryId ?? 0,
      }));

      console.log('Mapped Posts:', mappedPosts);
      setPosts(mappedPosts);
      setTotalPages(totalPages || 1);
      setError(null);
    } catch (error) {
      console.error('Error fetching posts:', error.message, error.response?.data);
      setError('Failed to fetch posts. Please try again or log in.');
      setPosts([]);
      setTotalPages(1);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found.');

      const response = await axios.delete(`https://localhost:9000/api/Posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to delete post');
      }

      setPosts(posts.filter((post) => post.id !== postId));
      setNotificationMessage('Post Deleted Successfully...!');
      setNotificationSeverity('success');
      setNotificationOpen(true);
    } catch (error) {
      console.error('Error deleting post:', error.message);
      setNotificationMessage('Failed to delete post.');
      setNotificationSeverity('error');
      setNotificationOpen(true);
    }
  };

  const handleCloseNotification = () => {
    setNotificationOpen(false);
  };

  const handleClick = () => {
    navigate('/add-post');
  };

  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #6D83F2 0%, #A1C4FD 100%)',
        padding: { xs: 2, md: 4 },
        position: 'relative',
      }}
    >
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{
          color: '#fff',
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
          mb: 4,
        }}
      >
        Post Dashboard
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Button
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
          onClick={handleClick}
          sx={{
            borderRadius: '20px',
            padding: '10px 20px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '0 6px 15px rgba(0,0,0,0.3)',
            },
          }}
        >
          Add New Post
        </Button>
      </Box>

      {error && (
        <Typography variant="h6" align="center" sx={{ color: '#fff', mb: 3 }}>
          {error}
        </Typography>
      )}

      {posts.length === 0 && !error ? (
        <Typography variant="h6" align="center" sx={{ color: '#fff', mb: 3 }}>
          No posts available.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {posts.map((post) => (
            <Grid item key={post.id} xs={12} sm={6} md={4}>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                marginLeft={1}
                marginRight={1}
              >
                <PostCard key={post.id} post={post} onDelete={handleDeletePost} />
              </Box>
            </Grid>
          ))}
        </Grid>
      )}

      <Grid container justifyContent="center" sx={{ mt: 5, mb: 5 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          sx={{
            '& .MuiPaginationItem-root': {
              color: '#fff',
              backgroundColor: 'rgba(255,255,255,0.1)',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.2)',
              },
            },
            '& .Mui-selected': {
              backgroundColor: '#fff',
              color: '#6D83F2',
              '&:hover': {
                backgroundColor: '#fff',
              },
            },
          }}
        />
      </Grid>

      <Notification
        open={notificationOpen}
        message={notificationMessage}
        onClose={handleCloseNotification}
        severity={notificationSeverity}
      />
    </Box>
  );
};

export default ListPost;