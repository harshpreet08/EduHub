import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Snackbar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { styled } from "@mui/material/styles";
import Navbar from "./NavBar";

const StyledSnackbar = styled(Snackbar)({
  "& .MuiSnackbarContent-root": {
    backgroundColor: "#38a13c",
  },
});

function EditBlog() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8000/api/blog/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFormData(data);
      })
      .catch((error) => {
        console.error("Error fetching blog post:", error);
      });
  }, [id]);

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/blog/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowSuccess(true);
      } else {
        console.error("Failed to update blog post:", response.status);
      }
    } catch (error) {
      console.error("Error updating blog post:", error);
    }
  };

  const handleCloseSnackbar = () => {
    setShowSuccess(false);
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          maxWidth: 600,
          width: "100%",
          margin: "0 auto",
          paddingX: { xs: 0, md: "20px" },
          paddingY: "20px",
        }}
      >
        <IconButton
          aria-label="go-back"
          onClick={() => navigate(-1)}
          sx={{
            position: "relative",
            left: "8px",
            top: "8px",
            color: "primary.main",
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </IconButton>
        <Typography variant="h3" gutterBottom sx={{ textAlign: "center" }}>
          Edit Blog
        </Typography>
        <Box mt={4}>
          <TextField
            label="Title"
            name="title"
            required
            fullWidth
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            sx={{ width: "100%" }}
          />
        </Box>
        <Box mt={4}>
          <TextField
            label="Description"
            name="description"
            multiline
            rows={8}
            required
            fullWidth
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            sx={{ width: "100%" }}
          />
        </Box>
        <Box mt={4} sx={{ textAlign: "center" }}>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Update Blog
          </Button>
        </Box>
        <StyledSnackbar
          open={showSuccess}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message="Success! Blog Updated."
        />
      </Box>
    </>
  );
}

export default EditBlog;
