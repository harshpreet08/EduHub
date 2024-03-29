import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PdfIcon from "@mui/icons-material/PictureAsPdf";
import DownloadIcon from "@mui/icons-material/Download";
import "./ChapterDetailsPage.css";
import axios from "axios";
import NavBar from "../../Components/NavBar.jsx";

function ChapterDetailsPage() {
  const params = useParams();
  //console.log("params",params)
  const { id:courseId } = params;
 
  // const decodedTitle = decodeURIComponent(title);
  const [chapters, setChapters] = useState([]);

  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedSubchapter, setSelectedSubchapter] = useState(null);
  const [expandedAccordion, setExpandedAccordion] = useState(null);
  const [courseDescription, setCourseDescription] = useState("");


  
    

    useEffect(() => {

      const fetchCourseDetails = async () => {
        try {
          const response = await axios.get(
            `https://webbackend-3087.onrender.com/api/courses/${courseId}`
          );
          if (response.data) {
            setCourseDescription(response.data.description);
          }
        } catch (error) {
          console.error("Error fetching course details:", error);
        }
      };

      const fetchChapters = async () => {
        try {
          //console.log(courseId)
          const response = await axios.get(
            `https://webbackend-3087.onrender.com/api/courses/${courseId}/chapters`
          );
          console.log(response.data);
          setChapters(response.data);
          
        } catch (error) {
          console.error("Error fetching chapters:", error);
        }
      };
      fetchCourseDetails();
      fetchChapters();
    }, []);


  // const chapters = [
  //   {
  //     id: 1,
  //     title: "Chapter 1: Introduction to Organic Chemistry",
  //     subchapters: [
  //       {
  //         id: 1,
  //         title: "Introduction to Organic Compounds",
  //         description: "Description of Introduction to Organic Compounds",
  //         contentUrl: "videoUrl1.mp4",
  //       },
  //       {
  //         id: 2,
  //         title: "Structure and Bonding in Organic Molecules",
  //         description:
  //           "Description of Structure and Bonding in Organic Molecules",
  //         contentUrl: "videoUrl2.mp4",
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     title: "Chapter 2: Alkanes and Cycloalkanes",
  //     subchapters: [
  //       {
  //         id: 1,
  //         title: "Structure and Nomenclature of Alkanes",
  //         description: "Description of Structure and Nomenclature of Alkanes",
  //         contentUrl: "pdfUrl1.pdf",
  //       },
  //       {
  //         id: 2,
  //         title: "Physical Properties of Alkanes",
  //         description: "Description of Physical Properties of Alkanes",
  //         contentUrl: "pdfUrl2.pdf",
  //       },
  //     ],
  //   },

  //   {
  //     id: 3,
  //     title: "Chapter 3: Alkanes and Cycloalkanes",
  //     subchapters: [
  //       {
  //         id: 1,
  //         title: "Structure and Nomenclature of Alkanes",
  //         description: "Description of Structure and Nomenclature of Alkanes",
  //         contentUrl: "pdfUrl1.pdf",
  //       },
  //       {
  //         id: 2,
  //         title: "Physical Properties of Alkanes",
  //         description: "Description of Physical Properties of Alkanes",
  //         contentUrl: "pdfUrl2.pdf",
  //       },
  //     ],
  //   },
  // ];

  // const additionalData = [
  //   {
  //     id: 1,
  //     title: "Chapter 1: Introduction to Organic Chemistry",
  //     duration: "1 hour",
  //     level: "Beginner",
  //   },
  //   {
  //     id: 2,
  //     title: "Chapter 2: Alkanes and Cycloalkanes",
  //     duration: "2 hours",
  //     level: "Intermediate",
  //   },
  // ];

  const handleSubchapterClick = (chapterId, subchapterId) => {
    console.log("Clicked subchapter:", chapterId, subchapterId);
    setSelectedChapter(chapterId);
    setSelectedSubchapter(subchapterId);
  };

  const renderSubchapterContent = () => {
    if (selectedSubchapter === null) {
      return (
        <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
          <Typography variant="h5" gutterBottom style={{ textAlign: "left" }}>
            {/* {decodedTitle} */}
          </Typography>
          <Typography
            variant="body1"
            style={{ marginTop: "20px", textAlign: "left", fontSize: "1.5rem"}}
          >
            {courseDescription}
          </Typography>
        </Paper>
      );
    } else {
      const subchapter = chapters
        .find((chapter) => chapter.id === selectedChapter)
        ?.subchapters.find(
          (subchapter) => subchapter.id === selectedSubchapter
        );
      if (!subchapter) return null;
       // Extracting the URL from contentUrl
    const httpIndex = subchapter.contentUrl.indexOf("http");
    const extractedUrl = subchapter.contentUrl.substring(httpIndex);
    const fileExtension = extractedUrl.split(".").pop();
    console.log("Extarcted URL===", extractedUrl);

      if (
        extractedUrl.endsWith(".mp4") ||
        extractedUrl.endsWith(".webm")
      ) {
        // const youtubeVideoUrl =
        //   "https://www.youtube.com/embed/B_ketdzJtY8?si=ujxmJMLMBAxiqoMn";
        return (
          <Paper
            elevation={3}
            style={{ padding: "20px", marginBottom: "20px" }}
          >
             <Typography variant="h5" gutterBottom style={{ textAlign: "left" }}>
              {subchapter.title}
            </Typography>
            {/* Use video element to render video content */}
            <video controls key={selectedSubchapter} style={{ width: "100%" }}>
              <source src={extractedUrl} type={`video/${fileExtension}`} />
              Your browser does not support the video tag.
            </video>
            {/* <div
              style={{
                position: "relative",
                paddingBottom: "56.25%",
                height: 0,
              }}
            >
                
              {/* <iframe
                width="100%"
                height="100%"
                src={contentUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
              ></iframe>
             */}
            {/* </div> */} 
            <Typography variant="h5" gutterBottom style={{ textAlign: "left" }}>
              {subchapter.description}
            </Typography>
          </Paper>
        );
      } else if (extractedUrl.endsWith(".pdf")) {
        return (
          
          <Paper
            elevation={3}
            style={{ padding: "20px", marginBottom: "20px" }}
          >
            <Typography variant="h5" gutterBottom style={{ textAlign: "left" }}>
              {subchapter.title}
            </Typography>
            <Typography variant="h5" gutterBottom style={{ textAlign: "left" }}>
              {subchapter.description}
            </Typography>
            <div style={{ display: "flex", alignItems: "center" }}>
              <PdfIcon style={{ marginRight: "8px" }} />
              <a
                href={extractedUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "#000000" }}
              >
                <Typography variant="body1" style={{ textAlign: "left" }}>
                  Download PDF
                </Typography>
              </a>
              <DownloadIcon
                style={{ marginLeft: "8px", cursor: "pointer" }}
                onClick={() => window.open(extractedUrl, "_blank")}
              />
            </div>
          </Paper>
        );
      }
    }
  };

  const handleChangeAccordion = (panel) => (event, isExpanded) => {
    setExpandedAccordion(isExpanded ? panel : null);
  };

  return (
    <div>
      {/* <NavBar /> */}
    <div className="chapter-details-page">
      <Container maxWidth="xl" className="chapter-details-container">
        <Grid container spacing={3}>
          <Grid item xs={12} md={8.5}>
            {renderSubchapterContent()}
          </Grid>
          <Grid item xs={12} md={3.5}>
            <Paper elevation={3} className="chapter-details-paper">
              <Typography
                variant="h5"
                gutterBottom
                className="course-outline-title"
              >
                Course Outline
              </Typography>
              {chapters.map((chapter) => (
                <Accordion
                  key={chapter.id}
                  expanded={expandedAccordion === `panel${chapter.id}`}
                  onChange={handleChangeAccordion(`panel${chapter.id}`)}
                  className={`chapter ${
                    selectedChapter === chapter.id ? "selected" : ""
                  }`}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${chapter.id}-content`}
                    id={`panel${chapter.id}-header`}
                    className="chapter-accordion-summary"
                  >
                    <Typography variant="subtitle1">
                      {chapter.title}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List>
                      {chapter.subchapters.map((subchapter, subIndex) => (
                        <ListItem
                          button
                          key={subIndex}
                          onClick={() =>
                            handleSubchapterClick(chapter.id, subchapter.id)
                          }
                          style={{
                            textAlign: "left",
                            border: "1px solid #e0e0e0",
                          }}
                          className={`subchapter-item ${
                            selectedChapter === chapter.id &&
                            selectedSubchapter === subchapter.id
                              ? "selected"
                              : ""
                          }`}
                        >
                          <ListItemText primary={subchapter.title} />
                        </ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
    </div>
  );
}

export default ChapterDetailsPage;
