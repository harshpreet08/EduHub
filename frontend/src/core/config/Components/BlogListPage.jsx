import React from "react";
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

const blogs = [
  {
    id: 1,
    title: "First Blog",
    description: "This is the description of the first blog.",
    image:
      "https://www.nasa.gov/wp-content/uploads/2018/07/s75-31690.jpeg?w=2048", // Placeholder image URL
  },
  {
    id: 2,
    title: "Second Blog",
    description: "This is the description of the second blog.",
    image: "https://1000logos.net/wp-content/uploads/2020/08/MongoDB-Logo.png", // Placeholder image URL
  },
  {
    id: 3,
    title: "Third Blog",
    description: "This is the description of the third blog.",
    image: "https://1000logos.net/wp-content/uploads/2021/03/Paytm_Logo.jpg", // Placeholder image URL
  },
];

function BlogList() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        maxWidth: { xs: 600, md: 800, lg: 1000 },
        width: "100%",
        margin: "0 auto",
        paddingX: { xs: 0, md: "20px" }, // Adjust padding on X-axis for larger screens
        paddingY: "20px", // Keep padding on Y-axis consistent
      }}
    >
      <Typography variant="h3" gutterBottom sx={{ textAlign: "center" }}>
        Blog List
      </Typography>
      <Grid container spacing={2}>
        {blogs.map((blog) => (
          <Grid key={blog.id} item xs={12} sm={6} md={4}>
            <Card
              sx={{
                marginBottom: "20px",
                boxShadow: 3,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={blog.image}
                alt={blog.title}
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
      <Box sx={{ textAlign: "center", marginTop: "20px" }}>
        <Button
          onClick={() => navigate("/blogform")}
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
    </Box>
  );
}

export default BlogList;
