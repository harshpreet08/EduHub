import React from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Container,
  IconButton,
  Grid,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faHeart,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { blogs } from "./BlogListPage";

function BlogDetailsPage() {
  const { id } = useParams();
  const blog = blogs.find((blog) => blog.id === parseInt(id));

  if (!blog) {
    return (
      <Container maxWidth="md">
        <Box textAlign="center" mt={10}>
          <Typography variant="h4">Blog not found!</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <Card
          sx={{
            position: "relative",
            border: "1px solid white",
            boxShadow: "none",
          }}
        >
          <CardContent>
            <IconButton
              aria-label="go-back"
              onClick={() => window.history.back()}
              sx={{
                position: "absolute",
                left: "8px",
                top: "8px",
                color: "primary.main",
              }}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </IconButton>
            <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
              {blog.title}
            </Typography>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              paragraph
              sx={{ textAlign: "center" }}
            >
              by {blog.author}
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            height="200"
            image={blog.image}
            alt={blog.title}
          />
          <CardContent>
            <Typography
              variant="body1"
              color="textSecondary"
              paragraph
              sx={{
                fontSize: "1.2rem",
                marginBottom: "70px",
                marginTop: "20px",
              }}
            >
              {blog.description}
            </Typography>
          </CardContent>
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              marginLeft: "8px",
              marginBottom: "8px",
            }}
          >
            <Grid container spacing={2}>
              <Grid item>
                <IconButton aria-label="thumbs-up">
                  <FontAwesomeIcon icon={faThumbsUp} />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton aria-label="thumbs-down">
                  <FontAwesomeIcon icon={faThumbsDown} />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton aria-label="heart">
                  <FontAwesomeIcon icon={faHeart} />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Box>
    </Container>
  );
}

export default BlogDetailsPage;
