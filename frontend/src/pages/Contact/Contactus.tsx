import { Box, Button, TextField, Typography } from "@mui/material";
import ContactImage from "../../Assests/contactpage.png";
import Navbar from "../../Components/NavBar";

const Contactus: React.FC = () => {
  return (
    <>
      <Navbar></Navbar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundImage: `url(${ContactImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          paddingTop: "100px", // Adjust as needed to leave space for the header
        }}
      >
        <Box
          sx={{
            backgroundColor: "#f0f0f0", // Background color of the box
            padding: "20px", // Padding around the box
            borderRadius: "8px", // Border radius
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)", // Box shadow
            maxWidth: "500px", // Max width of the box
            margin: "0 auto", // Center the box horizontally
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Contact Us
          </Typography>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "75vh",
              "& > :not(style)": { m: 1, width: "45ch" },
              marginTop: "-100px", // Adjust marginTop as needed
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Last Name"
              variant="standard"
              // sx={{ bgcolor: "#eaeaea" }}
              required
            />
            <TextField
              id="outlined-basic"
              label="Email"
              variant="standard"
              required
            />
            <TextField
              id="standard"
              label="Password"
              variant="standard"
              required
            />
            <Button variant="contained" sx={{ bgcolor: "#4a5cfb" }}>
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default Contactus;
