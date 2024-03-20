import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  CardMedia,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import BlogDetails from "./BlogDetails";
import Navbar from "./NavBar";
import CircularProgress from "@mui/material/CircularProgress";

function BlogList() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/blog")
      .then((response) => response.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      });
  }, []);

  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
    navigate(`/blog/${blog._id}`);
  };

  const handleClose = () => {
    setSelectedBlog(null);
  };

  return (
    <>
      <Navbar />
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            maxWidth: { xs: 600, md: 800, lg: 1000 },
            width: "100%",
            margin: "0 auto",
            paddingX: { xs: 0, md: "20px" },
            paddingY: "20px",
          }}
        >
          <Typography variant="h3" gutterBottom sx={{ textAlign: "center" }}>
            BLOG LIST
          </Typography>
          <Grid container spacing={2}>
            {blogs.map((blog) => (
              <Grid key={blog._id} item xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    marginBottom: "20px",
                    boxShadow: 3,
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                  onClick={() => handleBlogClick(blog)}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={blog.image}
                    alt={blog.title}
                    sx={{ objectFit: "cover", height: 140 }}
                  />
                  <CardContent sx={{ height: 160 }}>
                    <Typography variant="h5" component="h2" noWrap>
                      {blog.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      noWrap
                    >
                      {blog.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "flex-end" }}>
                    <Button size="small">Read More</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ textAlign: "center", marginTop: "60px" }}>
            <Button
              onClick={() => navigate("/newblog")}
              variant="contained"
              color="primary"
              size="large"
              sx={{
                borderRadius: "50px",
                padding: "15px 30px",
                fontWeight: "bold",
                boxShadow: 3,
                "&:hover": {
                  backgroundColor: "#1976D2",
                },
              }}
            >
              Post a New Blog
            </Button>
          </Box>

          {selectedBlog && (
            <BlogDetails blog={selectedBlog} onClose={handleClose} />
          )}
        </Box>
      )}
    </>
  );
}

export default BlogList;
