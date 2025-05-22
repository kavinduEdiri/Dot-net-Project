import { Container, TextField, Button, IconButton, Typography, Box } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "./Notification";
import TableDisplay from "./Table";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { PostvalidationSchema } from "./AddPostValidation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { motion } from "framer-motion";

const AddPost = () => {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");
  const navigate = useNavigate();
  const tableRef = useRef(null);
  const [tableHeight, setTableHeight] = useState(0);

  // Calculate table height dynamically
  useEffect(() => {
    if (tableRef.current) {
      setTableHeight(tableRef.current.offsetHeight);
    }
  }, []);

  const handleNotificationClose = () => {
    setNotificationOpen(false);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        "https://localhost:9000/api/Posts",
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to add post");
      }

      const data = response.data;
      console.log("Post added successfully:", data);

      setNotificationMessage("Post added successfully");
      setNotificationSeverity("success");
      setNotificationOpen(true);

      setTimeout(() => {
        navigate("/posts", { state: { newPost: data } });
      }, 2000);
    } catch (error) {
      console.error("Error adding post:", error.message);
      setNotificationMessage("Post adding failed..!");
      setNotificationSeverity("error");
      setNotificationOpen(true);
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1E3A8A 0%, #3B82F6 50%, #93C5FD 100%)",
        padding: { xs: 2, md: 4 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decorative elements */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg"> {/* Increased maxWidth for better layout */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              color: "#fff",
              fontWeight: "bold",
              textShadow: "2px 2px 6px rgba(0,0,0,0.3)",
              mt: 4,
              textAlign: "center",
              fontSize: { xs: "2rem", md: "3rem" },
            }}
          >
            Create a New Post
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              mb: 4,
            }}
          >
            <IconButton
              onClick={() => navigate("/posts")}
              sx={{
                color: "#fff",
                backgroundColor: "rgba(255,255,255,0.1)",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.2)",
                  transform: "scale(1.1)",
                },
                transition: "all 0.3s ease",
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          </Box>
        </motion.div>

        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 3 }}>
          {/* Available Categories Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Box
              ref={tableRef}
              sx={{
                flex: "0 0 auto", // Fixed width, no grow
                width: { xs: "100%", sm: "300px" }, // Full width on mobile, fixed on larger screens
                maxHeight: "300px",
                overflowY: "auto",
                backgroundColor: "rgba(255,255,255,0.95)",
                borderRadius: "20px",
                boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                p: 3,
                backdropFilter: "blur(5px)",
                border: "1px solid rgba(255,255,255,0.2)",
                zIndex: 1,
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  color: "#1E3A8A",
                  textAlign: "center",
                  mb: 2,
                }}
              >
                Available Categories
              </Typography>
              <TableDisplay />
            </Box>
          </motion.div>

          {/* Post Details Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Box
              sx={{
                flex: "1 1 auto", // Grow to fill remaining space
                backgroundColor: "rgba(255,255,255,0.95)",
                borderRadius: "20px",
                boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                p: 4,
                backdropFilter: "blur(5px)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  color: "#1E3A8A",
                  textAlign: "center",
                  mb: 3,
                }}
              >
                Post Details
              </Typography>
              <Formik
                initialValues={{ title: "", content: "", categoryId: "" }}
                validationSchema={PostvalidationSchema}
                onSubmit={handleSubmit}
              >
                {(formik) => (
                  <Form onSubmit={formik.handleSubmit}>
                    <Field
                      type="text"
                      name="title"
                      as={TextField}
                      label="Title"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          backgroundColor: "#f9f9f9",
                          "&:hover fieldset": {
                            borderColor: "#3B82F6",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#1E3A8A",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "#666",
                        },
                      }}
                    />
                    <ErrorMessage
                      name="title"
                      component="div"
                      style={{ color: "#EF4444", marginTop: "5px", fontSize: "14px" }}
                    />

                    <Field
                      type="text"
                      name="content"
                      as={TextField}
                      label="Content"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      multiline
                      rows={8}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          backgroundColor: "#f9f9f9",
                          "&:hover fieldset": {
                            borderColor: "#3B82F6",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#1E3A8A",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "#666",
                        },
                      }}
                    />
                    <ErrorMessage
                      name="content"
                      component="div"
                      style={{ color: "#EF4444", marginTop: "5px", fontSize: "14px" }}
                    />

                    <Field
                      type="text"
                      name="categoryId"
                      as={TextField}
                      label="Category Id"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                          backgroundColor: "#f9f9f9",
                          "&:hover fieldset": {
                            borderColor: "#3B82F6",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#1E3A8A",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "#666",
                        },
                      }}
                    />
                    <ErrorMessage
                      name="categoryId"
                      component="div"
                      style={{ color: "#EF4444", marginTop: "5px", fontSize: "14px" }}
                    />

                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      disabled={formik.isSubmitting}
                      sx={{
                        mt: 3,
                        borderRadius: "25px",
                        padding: "12px",
                        fontSize: "1.1rem",
                        fontWeight: "bold",
                        background: "linear-gradient(90deg, #1E3A8A 0%, #3B82F6 100%)",
                        boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                        "&:hover": {
                          transform: "scale(1.02)",
                          boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
                          background: "linear-gradient(90deg, #3B82F6 0%, #1E3A8A 100%)",
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      Save Post
                    </Button>
                  </Form>
                )}
              </Formik>
            </Box>
          </motion.div>
        </Box>

        <Notification
          open={notificationOpen}
          message={notificationMessage}
          onClose={handleNotificationClose}
          severity={notificationSeverity}
        />
      </Container>
    </Box>
  );
};

export default AddPost;