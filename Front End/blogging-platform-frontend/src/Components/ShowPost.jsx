import React, { useState, useEffect } from "react";
import { Container, TextField, IconButton } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ShowPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:9000/api/Posts/${id}`
        );
        if (response.status !== 200) {
          throw new Error("Failed to fetch post data");
        }
        const data = response.data;
        setTitle(data.title);
        setContent(data.content);
        setCategoryId(data.categoryId);
      } catch (error) {
        console.log("An error occurred while fetching data:", error);
      }
    };
    fetchPostData();
  }, [id]);

  return (
    <Container maxWidth="sm">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <IconButton onClick={() => navigate("/posts")}>
          <ArrowBackIcon />
        </IconButton>
      </div>
      {title && (
        <form>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={title}
            InputProps={{ readOnly: true }}
          />
          <TextField
            label="Content"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={8}
            value={content}
            InputProps={{ readOnly: true }}
          />
          <TextField
            label="Category Id"
            variant="outlined"
            fullWidth
            margin="normal"
            value={categoryId}
            InputProps={{ readOnly: true }}
          />
        </form>
      )}
    </Container>
  );
};

export default ShowPost;
