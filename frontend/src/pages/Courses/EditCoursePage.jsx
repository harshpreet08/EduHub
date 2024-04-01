import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams hook

import {
  Button,
  Modal,
  TextField,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  ListItemSecondaryAction,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "./EditCoursePage.css"; // Import CSS file for styling
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ViewListIcon from "@mui/icons-material/ViewList";
import {
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material"; // Import Dialog from @mui/material

import axios from "axios";

import NavBar from "../../Components/NavBar.jsx";

function EditCoursePage() {
  const params = useParams();
  // console.log("aparemas", params);
  const { id: courseId } = params;
  const [showChapterModal, setShowChapterModal] = useState(false);
  const [showSubchapterModal, setShowSubchapterModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedCourseId, setSelectedCourseId] = useState(""); // State to hold courseId

  useEffect(() => {
    sessionStorage.setItem("courseId", courseId); // Store courseId in session storage
    setSelectedCourseId(courseId);
  }, [courseId]);


  const [chapterData, setChapterData] = useState({
    title: "",
    description: "",
  });
  const [subchapterData, setSubchapterData] = useState({
    title: "",
    description: "",
    file: null, 
  });
  const [chapters, setChapters] = useState([]);
  const [subchapters, setSubchapters] = useState([]);
  const [modalTitle, setModalTitle] = useState("Add New Chapter");
  const [errorMessage, setErrorMessage] = useState(""); // State to hold error message

  const [editedChapterIndex, setEditedChapterIndex] = useState(-1);
  const [modalSubchapterTitle, setModalSubchapterTitle] =
    useState("Add New Subchapter");
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
  const [editedSubchapterIndex, setEditedSubchapterIndex] = useState(-1);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);

  useEffect(() => {
    console.log("courseId=", courseId);
    fetchChapters(courseId);
  }, [courseId]);

  useEffect(() => {
    if (!showChapterModal) {
      // Reset chapterData when modal is closed
      setChapterData({ title: "", description: "" });
      setModalTitle("Add New Chapter");
      setEditedChapterIndex(-1);
    }
  }, [showChapterModal]);

  useEffect(() => {
    if (!showSubchapterModal) {
      // Reset subchapterData when modal is closed
      setSubchapterData({ title: "", description: "", file: null });
      setModalSubchapterTitle("Add New Subchapter");
      setEditedSubchapterIndex(-1);
    }
  }, [showSubchapterModal]);

  const fetchChapters = async (courseId) => {
    try {
      const response = await axios.get(
        `https://webbackend-3087.onrender.com/api/courses/${courseId}/chapters`
      );
      setChapters(response.data);

      // Fetch subchapters for each chapter
      const subchapterRequests = response.data.map((chapter) => {
        return axios.get(
          `https://webbackend-3087.onrender.com/api/courses/${courseId}/chapters/${chapter.id}/subchapters`
        );
      });

      const subchapterResponses = await Promise.all(subchapterRequests);
      const subchaptersData = subchapterResponses.map(
        (response) => response.data
      );
      setSubchapters(subchaptersData);
      // console.log("Chapters:", response.data);
      // console.log("Subchapters:", subchaptersData);
    } catch (error) {
      console.error("Error fetching chapters:", error);
    }
  };

  const handleChapterSubmit = async () => {
    try {
      if (modalTitle === "Add New Chapter") {
        console.log("courseId=", courseId);
        const response = await axios.post(
          `https://webbackend-3087.onrender.com/api/courses/${courseId}/chapters`,
          chapterData
        );
        setChapters([...chapters, response.data]);
        console.log("Chapter created successfully:", response.data);
      } else {
        // Find the index of the edited chapter
        console.log("editedChapterIndex=", editedChapterIndex);
        await axios.put(
          `https://webbackend-3087.onrender.com/api/courses/${courseId}/chapters/${chapters[editedChapterIndex].id}`,
          chapterData
        );

        const updatedChapters = chapters.map((chapter, index) => {
          if (index === editedChapterIndex) {
            return { ...chapter, ...chapterData }; // Merge the existing chapter data with the updated data
          }
          return chapter;
        });
        setChapters(updatedChapters);
      }
      setChapterData({ title: "", description: "" });
      setShowChapterModal(false);
      setModalTitle("Add New Chapter"); // Reset modal title after submission
      setEditedChapterIndex(-1); // Reset edited chapter index
    } catch (error) {
      console.error("Error submitting chapter:", error);
    }
  };

  const handleSubchapterSubmit = async () => {
    if (errorDialogOpen) {
      return;
    }
    if (chapters.length === 0) {
      // Show error dialog if no chapter exists
      console.log("Error");
      setErrorMessage("No chapter exists to add subchapter.");
      setErrorDialogOpen(true);
      return;
    }
    try {
      if (!chapters[selectedChapterIndex].subchapters) {
        chapters[selectedChapterIndex].subchapters = []; // Initialize as empty array if undefined
      }

      if (selectedChapterIndex < 0 || selectedChapterIndex >= chapters.length) {
        console.error(
          `Invalid selected chapter index: ${selectedChapterIndex}`
        );
        return;
      }
      const selectedChapter = chapters[selectedChapterIndex];
      if (!selectedChapter || !selectedChapter.subchapters) {
        console.error(`Selected chapter or its subchapters not found.`);
        return;
      }
      // Reset the upload progress
      setUploadProgress(0);
      const subchaptersArray = selectedChapter.subchapters;
      if (modalSubchapterTitle === "Add New Subchapter") {
        const formData = new FormData();
        formData.append("content", subchapterData.file);
        formData.append("title", subchapterData.title);
        formData.append("description", subchapterData.description);

        const response = await axios.post(
          `https://webbackend-3087.onrender.com/api/courses/${courseId}/chapters/${chapters[selectedChapterIndex].id}/subchapters`,
          formData,
          {
            onUploadProgress: (progressEvent) => {
              // Update upload progress
              const progress = Math.round(
                (progressEvent.loaded / progressEvent.total) * 100
              );
              setUploadProgress(progress);
            },
          }
        );
        // Hide progress bar
        setUploadProgress(100);
        console.log("Subchapter created successfully:", response.data);
        // alert("Subchapter saved successfully");

        // Update subchapters state with the new subchapter
        const updatedSubchapters = [...subchapters];
        updatedSubchapters[selectedChapterIndex].push(response.data);
        setSubchapters(updatedSubchapters);
      } else {
        // Editing an existing subchapter
        const formData = new FormData();
        formData.append("newContent", subchapterData.file);
        formData.append("newTitle", subchapterData.title);
        formData.append("newDescription", subchapterData.description);

        console.log("selectedChapterIndex==" + selectedChapterIndex);
        console.log("editedSubchapterIndex==" + editedSubchapterIndex);

        // Add null or undefined check here

        chapters.forEach((chapter, index) => {
          console.log(`Chapter ${index + 1}:`, chapter);
        });

        // const subchapter = chapters[selectedChapterIndex].subchapters[editedSubchapterIndex];
        const subchapter =
          subchapters[selectedChapterIndex][editedSubchapterIndex];

        console.log("Subchapter:", subchapter);

        if (subchapter) {
          const subchapterId = subchapter.id; // Access 'id' property if subchapter exists
          console.log("subchapterId=====" + subchapterId);
          console.log(
            "chapters[selectedChapterIndex].id=====" +
              chapters[selectedChapterIndex].id
          );
          console.log("courseId=====" + courseId);
          const response = await axios.put(
            `https://webbackend-3087.onrender.com/api/courses/${courseId}/chapters/${chapters[selectedChapterIndex].id}/subchapters/${subchapterId}`,
            formData
          );
          console.log("Subchapter updated successfully:", response.data);

          // Update subchapters state with the edited subchapter
          const updatedSubchapters = [...subchapters];
          updatedSubchapters[selectedChapterIndex][editedSubchapterIndex] =
            response.data;
          setSubchapters(updatedSubchapters);
        } else {
          console.error(
            `Subchapter not found at index ${editedSubchapterIndex}`
          );
          return; // Exit the function if subchapter is undefined
        }
      }

      setSubchapterData({ title: "", description: "", file: null });
      setShowSubchapterModal(false);
      setModalSubchapterTitle("Add New Subchapter"); // Reset modal title after submission
      setEditedSubchapterIndex(-1); // Reset edited subchapter index
    } catch (error) {
      console.error("Error submitting subchapter:", error);
      setErrorMessage("Error submitting subchapter:");
       setErrorDialogOpen(true);

      // Handle error gracefully (e.g., display error message)
    }
  };

  const handleChapterInputChange = (e) => {
    const { name, value } = e.target;
    setChapterData({ ...chapterData, [name]: value });
  };

  const handleSubchapterInputChange = (e) => {
    const { name, value } = e.target;
    setSubchapterData({ ...subchapterData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSubchapterData({ ...subchapterData, file });
  };

  const handleEditChapter = (index) => {
    // Handle edit chapter action
    const chapterToEdit = chapters[index];

    // Set the chapter data to edit
    setChapterData(chapterToEdit);

    // Open the chapter modal
    setShowChapterModal(true);
    setModalTitle("Edit Chapter"); // Set modal title to "Edit Chapter" for editing
    setEditedChapterIndex(index); // Set edited chapter index
    console.log("Edit chapter:", index);
  };

  const handleDeleteChapter = async (index) => {
    // Handle delete chapter action
    console.log("Delete chapter:", index);
    try {
      const chapterToDelete = chapters[index];
      await axios.delete(
        `https://webbackend-3087.onrender.com/api/courses/${courseId}/chapters/${chapterToDelete.id}`
      );
      const updatedChapters = chapters.filter((chapter, i) => i !== index);
      setChapters(updatedChapters);
      console.log("Chapter deleted successfully");
    } catch (error) {
      console.error("Error deleting chapter:", error);
    }
  };

  const handleEditSubchapter = (index) => {
    console.log("Editing subchapter:", index);
    console.log("Selected chapter index:", selectedChapterIndex);

    if (
      selectedChapterIndex >= 0 &&
      selectedChapterIndex < chapters.length &&
      subchapters[selectedChapterIndex]
    ) {
      const selectedChapterSubchapters = subchapters[selectedChapterIndex];

      if (index >= 0 && index < selectedChapterSubchapters.length) {
        const subchapterToEdit = selectedChapterSubchapters[index];

        // Verify if the subchapter to edit exists
        if (subchapterToEdit) {
          // Set the subchapter data to prefill the fields in the modal
          setSubchapterData({
            title: subchapterToEdit.title,
            description: subchapterToEdit.description,
            file: null, // Assuming the file input should not be prefilled
          });

          setShowSubchapterModal(true);
          setModalSubchapterTitle("Edit Subchapter");
          setEditedSubchapterIndex(index);
        } else {
          console.error(
            `Subchapter with index ${index} not found in selected chapter.`
          );
        }
      } else {
        console.error(`Invalid subchapter index: ${index}`);
      }
    } else {
      console.error(`No subchapters found for the selected chapter.`);
    }
  };

  const handleDeleteSubchapter = async (index) => {
    try {
      console.log("Deleting subchapter:", index);
      console.log("Selected chapter index:", selectedChapterIndex);
      console.log(
        "subchapters[selectedChapterIndex]:",
        subchapters[selectedChapterIndex]
      );

      if (
        selectedChapterIndex >= 0 &&
        selectedChapterIndex < chapters.length &&
        subchapters[selectedChapterIndex]
      ) {
        const selectedChapterSubchapters = [
          ...subchapters[selectedChapterIndex],
        ];

        if (index >= 0 && index < selectedChapterSubchapters.length) {
          const subchapterToDelete = selectedChapterSubchapters[index];

          // Verify if the subchapter to delete exists
          if (subchapterToDelete) {
            const response = await axios.delete(
              `https://webbackend-3087.onrender.com/api/courses/${courseId}/chapters/${chapters[selectedChapterIndex].id}/subchapters/${subchapterToDelete.id}`
            );

            if (response.status === 204) {
              // Subchapter deleted successfully
              console.log("Subchapter deleted successfully");
              const updatedSubchapters = selectedChapterSubchapters.filter(
                (_, i) => i !== index
              );
              const updatedChapters = [...subchapters];
              updatedChapters[selectedChapterIndex] = updatedSubchapters;
              setSubchapters(updatedChapters);
            } else {
              console.error("Failed to delete subchapter:", response.data);
            }
          } else {
            console.error(
              `Subchapter with index ${index} not found in selected chapter.`
            );
          }
        } else {
          console.error(`Invalid subchapter index: ${index}`);
        }
      } else {
        console.error(`No subchapters found for the selected chapter.`);
      }
    } catch (error) {
      console.error("Error deleting subchapter:", error);
    }
  };

  const handleViewSubchapters = (index) => {
    // Handle view subchapters action
    console.log("View subchapters:", index);
    setSelectedChapterIndex(index);
  };

  const handleDialogClose = () => {
    setErrorDialogOpen(false);
  };

  return (
    <div>
      <NavBar pages = {["Content", "Question Bank", "Tests"]}/>
      <div className="edit-course-page">
        <div className="container">
          <div className="container-left">
            <div
              style={{
                display: "flex",
                alignItems: "left",
                marginBottom: "1rem",
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                style={{ flex: 1, textAlign: "left" }}
              >
                Chapters
              </Typography>
              <Button
                onClick={() => setShowChapterModal(true)}
                variant="contained"
                startIcon={<AddIcon />}
                style={{
                  backgroundColor: "rgba(0,0,0, 0.87)",
                  marginLeft: "1rem",
                  fontSize: "0.7rem",
                }}
              >
                Add Chapter
              </Button>
            </div>

            <List>
              {chapters.map((chapter, index) => (
                <div
                  key={index}
                  onClick={() => handleViewSubchapters(index)}
                  className="course-card-container"
                >
                  <ListItem
                    className={
                      selectedChapterIndex === index ? "highlighted" : ""
                    }
                  >
                    <ListItemText
                      primary={chapter.title}
                      secondary={chapter.description}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={() => handleEditChapter(index)}
                        sx={{ marginRight: 0.5 }} 
                      >
                        <EditIcon style={{ color: 'blue' }}/>
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDeleteChapter(index)}
                      >
                        <DeleteIcon style={{ color: 'red' }} />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </div>
              ))}
            </List>
          </div>
          <div className="container-right">
            <div
              style={{
                display: "flex",
                alignItems: "left",
                marginBottom: "1rem",
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                style={{ flex: 1, textAlign: "left" }}
              >
                Subchapters
              </Typography>
              <Button
                onClick={() => {
                  setShowSubchapterModal(true);
                  setModalSubchapterTitle("Add New Subchapter"); // Reset modal title
                  setEditedSubchapterIndex(-1); // Reset edited subchapter index
                }}
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                style={{
                  backgroundColor: "rgba(0,0,0, 0.87)",
                  fontSize: "0.7rem",
                  marginLeft: "1rem",
                }}
              >
                Add Subchapter
              </Button>
            </div>

            <List>
              {selectedChapterIndex !== null &&
                subchapters[selectedChapterIndex] &&
                subchapters[selectedChapterIndex].map((subchapter, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={subchapter.title}
                      secondary={subchapter.description}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={() => {
                          setShowSubchapterModal(false); // Close the modal first
                          handleEditSubchapter(index);
                        }}
                        sx={{ marginRight: 0.5 }} 
                      >
                        <EditIcon style={{ color: 'blue' }} />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDeleteSubchapter(index)}
                      >
                        <DeleteIcon  style={{ color: 'red' }}/>
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
            </List>
          </div>
        </div>
        {/* Chapter Modal */}
        <Modal
          open={showChapterModal}
          onClose={() => setShowChapterModal(false)}
        >
          <Box className="modal">
            <Typography variant="h5" gutterBottom>
              {modalTitle}
            </Typography>
            <TextField
              label="Title"
              name="title"
              value={chapterData.title}
              onChange={handleChapterInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Description"
              name="description"
              value={chapterData.description}
              onChange={handleChapterInputChange}
              fullWidth
              margin="normal"
            />
            <Button
              onClick={handleChapterSubmit}
              variant="contained"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.87)",
                fontSize: "1rem",
              }}
            >
              Save Chapter
            </Button>
            <Button
              onClick={() => setShowChapterModal(false)}
              variant="contained"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.87)" }}
            >
              Close
            </Button>
          </Box>
        </Modal>
        {/* Subchapter Modal */}
        <Modal
          open={showSubchapterModal}
          onClose={() => setShowSubchapterModal(false)}
        >
          <Box className="modal">
            <Typography variant="h5" gutterBottom>
              {modalSubchapterTitle}
            </Typography>
            <TextField
              label="Title"
              name="title"
              value={subchapterData.title}
              onChange={handleSubchapterInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Description"
              name="description"
              value={subchapterData.description}
              onChange={handleSubchapterInputChange}
              fullWidth
              margin="normal"
            />
            <input
              type="file"
              onChange={handleFileChange}
              accept="video/*, .pdf"
            />

            {uploadProgress > 0 && uploadProgress < 100 && (
              <CircularProgress
                variant="determinate"
                value={uploadProgress}
                style={{ margin: "1rem 0" }}
              />
            )}

            <Button
              onClick={handleSubchapterSubmit}
              variant="contained"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.87)" }}
            >
              Save Subchapter
            </Button>
            <Button
              onClick={() => setShowSubchapterModal(false)}
              variant="contained"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.87)"
                
              }}
            >
              Close
            </Button>
          </Box>
        </Modal>
      </div>
      {/* Error Dialog */}
      <Dialog open={errorDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
        <div>{errorMessage}</div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditCoursePage;
