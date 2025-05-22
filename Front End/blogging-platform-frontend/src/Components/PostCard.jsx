import {
  CardActions,
  CardContent,
  Typography,
  Button,
  Card,
  CardActionArea,
  IconButton,
  Box,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";

const PostCard = ({ post, onDelete }) => {
  console.log("PostCard Props:", post);
  const handleDeleteClick = () => {
    onDelete(post.id);
  };

  return (
    <Card
      sx={{
        borderRadius: "15px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        backgroundColor: "#fff",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
        },
      }}
    >
      <CardActionArea>
        <CardContent sx={{ padding: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <IconButton
              aria-label="info"
              color="primary"
              component={Link}
              to={`/show/${post.id}`}
            >
              <InfoIcon />
            </IconButton>
            <IconButton
              aria-label="delete"
              color="error"
              onClick={handleDeleteClick}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
          <Typography
            variant="h5"
            component="h2"
            textAlign="center"
            sx={{
              fontWeight: "bold",
              color: "#333",
              mb: 1,
              whiteSpace: "normal",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {post.title}
          </Typography>
          <Typography
            variant="body2"
            component="p"
            textAlign="center"
            sx={{
              color: "#666",
              mb: 2,
              whiteSpace: "normal",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {post.content}
          </Typography>
          <CardActions sx={{ justifyContent: "center" }}>
            <Button
              size="small"
              variant="outlined"
              color="primary"
              sx={{
                borderRadius: "20px",
                textTransform: "none",
              }}
            >
              <Link
                to={`/edit/${post.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Edit Post
              </Link>
            </Button>
          </CardActions>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PostCard;