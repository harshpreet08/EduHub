// import React, { useState, useRef } from "react";
// import {
//   TextField,
//   Button,
//   Box,
//   Typography,
//   IconButton,
//   Snackbar,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";

// function SimpleForm() {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     image: null,
//   });

//   const [showSuccess, setShowSuccess] = useState(false);
//   const [titleError, setTitleError] = useState(false);
//   const [descriptionError, setDescriptionError] = useState(false);

//   const fileInputRef = useRef(null);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setFormData((prevData) => ({
//       ...prevData,
//       image: file,
//     }));
//   };

//   const handleRemoveImage = () => {
//     setFormData((prevData) => ({
//       ...prevData,
//       image: null,
//     }));
//     fileInputRef.current.value = "";
//   };

//   const handleSubmit = () => {
//     if (!formData.title) {
//       setTitleError(true);
//     } else {
//       setTitleError(false);
//     }
//     if (!formData.description) {
//       setDescriptionError(true);
//     } else {
//       setDescriptionError(false);
//     }

//     if (formData.title && formData.description) {
//       setShowSuccess(true);
//     }
//   };

//   const handleCloseSnackbar = () => {
//     setShowSuccess(false);
//   };

//   return (
//     <Box
//       sx={{
//         maxWidth: 600,
//         width: "100%",
//         margin: "0 auto",
//         paddingX: { xs: 0, md: "20px" },
//         paddingY: "20px",
//       }}
//     >
//       {showSuccess && (
//         <Snackbar
//           open={showSuccess}
//           autoHideDuration={6000}
//           onClose={handleCloseSnackbar}
//           message="Success! Blog Created."
//         />
//       )}
//       <Typography variant="h3" gutterBottom sx={{ textAlign: "center" }}>
//         Start a new blog
//       </Typography>
//       <Box mt={4}>
//         <TextField
//           label="Title"
//           name="title"
//           required
//           fullWidth
//           error={titleError}
//           helperText={titleError ? "Title is required" : ""}
//           value={formData.title}
//           onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//           sx={{ width: "100%" }}
//         />
//       </Box>
//       <Box mt={4}>
//         <TextField
//           label="Description"
//           name="description"
//           multiline
//           rows={8}
//           required
//           fullWidth
//           error={descriptionError}
//           helperText={descriptionError ? "Description is required" : ""}
//           value={formData.description}
//           onChange={(e) =>
//             setFormData({ ...formData, description: e.target.value })
//           }
//           sx={{ width: "100%" }}
//         />
//       </Box>
//       <Box mt={4}>
//         <input
//           ref={fileInputRef}
//           type="file"
//           accept="image/*"
//           onChange={handleImageChange}
//           style={{ display: "none" }}
//           id="fileInput"
//         />
//         <Button variant="outlined" onClick={() => fileInputRef.current.click()}>
//           Attach Image
//         </Button>
//         {formData.image && (
//           <Box ml={2} display="flex" alignItems="center">
//             <img
//               src={URL.createObjectURL(formData.image)}
//               alt="Attached"
//               style={{ maxWidth: "200px", maxHeight: "200px" }}
//             />
//             <IconButton onClick={handleRemoveImage}>
//               <DeleteIcon />
//             </IconButton>
//           </Box>
//         )}
//       </Box>
//       <Box mt={4} sx={{ textAlign: "center" }}>
//         <Button onClick={handleSubmit} variant="contained" color="primary">
//           Create Blog
//         </Button>
//       </Box>
//     </Box>
//   );
// }

// export default SimpleForm;

import React, { useState, useRef } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Snackbar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";

// Styled Snackbar component with blue background color
const StyledSnackbar = styled(Snackbar)({
  "& .MuiSnackbarContent-root": {
    backgroundColor: "#38a13c",
  },
});

function SimpleForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  const handleRemoveImage = () => {
    setFormData((prevData) => ({
      ...prevData,
      image: null,
    }));
    fileInputRef.current.value = "";
  };

  const handleSubmit = () => {
    if (!formData.title) {
      setTitleError(true);
    } else {
      setTitleError(false);
    }
    if (!formData.description) {
      setDescriptionError(true);
    } else {
      setDescriptionError(false);
    }

    if (formData.title && formData.description) {
      setShowSuccess(true);
    }
  };

  const handleCloseSnackbar = () => {
    setShowSuccess(false);
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        width: "100%",
        margin: "0 auto",
        paddingX: { xs: 0, md: "20px" },
        paddingY: "20px",
      }}
    >
      <Typography variant="h3" gutterBottom sx={{ textAlign: "center" }}>
        Start a new blog
      </Typography>
      <Box mt={4}>
        <TextField
          label="Title"
          name="title"
          required
          fullWidth
          error={titleError}
          helperText={titleError ? "Title is required" : ""}
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
          error={descriptionError}
          helperText={descriptionError ? "Description is required" : ""}
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          sx={{ width: "100%" }}
        />
      </Box>
      <Box mt={4}>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
          id="fileInput"
        />
        <Button variant="outlined" onClick={() => fileInputRef.current.click()}>
          Attach Image
        </Button>
        {formData.image && (
          <Box ml={2} display="flex" alignItems="center">
            <img
              src={URL.createObjectURL(formData.image)}
              alt="Attached"
              style={{ maxWidth: "200px", maxHeight: "200px" }}
            />
            <IconButton onClick={handleRemoveImage}>
              <DeleteIcon />
            </IconButton>
          </Box>
        )}
      </Box>
      <Box mt={4} sx={{ textAlign: "center" }}>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Create Blog
        </Button>
      </Box>
      <StyledSnackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Success! Blog Created."
      />
    </Box>
  );
}

export default SimpleForm;
