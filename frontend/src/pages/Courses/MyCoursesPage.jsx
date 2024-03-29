import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link
import CourseCard from "./CourseCard";
import SearchBar from "./SearchBar";
import StarIcon from "@mui/icons-material/Star";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ClearIcon from "@mui/icons-material/Clear";
import { IconButton } from "@mui/material"; // Import IconButton
import { useParams } from "react-router-dom";
import NavBar from "../../Components/NavBar.jsx";

import axios from "axios";
import "./MyCoursePage.css";

function MyCoursesPage() {
  const { userId } = useParams();
  console.log("userId====", userId);
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [ratingFilter, setRatingFilter] = useState(0);
  const [priceFilter, setPriceFilter] = useState("");
  const [instructors, setInstructors] = useState([]);
  const [instructorFilter, setInstructorFilter] = useState(""); // Define instructorFilter state
  const [uniqueRatings, setUniqueRatings] = useState([]);
  const [uniqueInstructors, setUniqueInstructors] = useState([]);

  useEffect(() => {
    const fetchCourses = async (userId) => {
      try {
        const response = await axios.get(
          `https://webbackend-3087.onrender.com/api/courses/all/${userId}`
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses(userId);
  }, [userId]);

  // useEffect(() => {
  //   const fetchInstructors = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://webbackend-3087.onrender.com/api/${userId}/instructors`
  //       );
  //       setInstructors(response.data);
  //     } catch (error) {
  //       console.error("Error fetching instructors:", error);
  //     }
  //   };

  //   if (userId) {
  //     fetchInstructors();
  //   }
  // }, [userId]);

  useEffect(() => {
    // Extract unique ratings from the courses
    // const ratings = [...new Set(courses.map((course) => course.rating))];
    // setUniqueRatings(ratings);

    // Extract unique instructors from the courses
    const instructors = [
      ...new Set(courses.map((course) => course.instructor)),
    ];
    setUniqueInstructors(instructors);
  }, [courses]);

  useEffect(() => {
    // Set default rating filter value to 5
    setRatingFilter(5);
  }, []);

  // Generate options for ratings dropdown dynamically
  const ratingOptions = [];
  for (let i = 1; i <= 5; i++) {
    ratingOptions.push(
      <option key={i} value={i}>
        {i} Star
      </option>
    );
  }

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value);
  };

  // Function to handle rating filter change
  const handleRatingFilterChange = (event) => {
    setRatingFilter(Number(event.target.value)); // Convert value to number
  };

  const handlePriceFilterChange = (event) => {
    setPriceFilter(event.target.value);
  };

  // Function to handle instructor filter change
  const handleInstructorFilterChange = (event) => {
    setInstructorFilter(event.target.value);
  };

  const clearFilters = () => {
    setFilterType("");
    setRatingFilter(0);
    setPriceFilter("");
    setInstructorFilter("");
  };

  const filteredCourses = courses.filter((course) => {

     // Check if the course title matches the search term
  const titleMatches = searchTerm === "" || course.title.toLowerCase().includes(searchTerm.toLowerCase());

  // Check if the course instructor matches the instructor filter
  const instructorMatches = instructorFilter === "" || course.instructor.toLowerCase() === instructorFilter.toLowerCase();

  // Return true if the title matches and the instructor matches (or if no filters are applied)
  return titleMatches && instructorMatches;
//       // Check if the search term matches the course title or instructor
//   const matchesSearchTerm =
//   searchTerm === "" ||
//   course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//   course.instructor.toLowerCase().includes(searchTerm.toLowerCase());

// // Return true if the search term matches or if there's no search term
// return matchesSearchTerm;




    // // Filter by course title or instructor based on the searchTerm
    // const matchesSearchTerm =
    //   searchTerm === "" ||
    //   course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //   course.instructor.toLowerCase().includes(searchTerm.toLowerCase());

    // // Apply other filters if they are set
    // const matchesRating = ratingFilter === 0 || course.rating >= ratingFilter;
    // const matchesPrice =
    //   priceFilter === "" ||
    //   course.price.toLowerCase() === priceFilter.toLowerCase();
    // const matchesInstructor =
    //   instructorFilter === "" ||
    //   course.instructor.toLowerCase() === instructorFilter.toLowerCase();

    // // Return true only if all filters match
    // return (
    //   matchesSearchTerm && matchesRating && matchesPrice && matchesInstructor
    // );

    // // Filter by course title
    // if (filterType === "title" && searchTerm) {
    //   return course.title.toLowerCase().includes(searchTerm.toLowerCase());
    // }
    // // Filter by course instructor
    // if (filterType === "instructor" && searchTerm) {
    //   return course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    // }
    // // Filter by rating
    // if (filterType === "rating" && ratingFilter > 0) {
    //   return course.rating >= ratingFilter;
    // }

    // // Filter by price
    // if (priceFilter === "free" && course.price === "Free") {
    //   return true;
    // }
    // if (priceFilter === "paid" && course.price === "Paid") {
    //   return true;
    // }

    // // Filter by instructor
    // if (instructorFilter && course.instructor === instructorFilter) {
    //   return true;
    // }

    // return true;
  });
  // Function to handle search term change
  const handleSearchh = (term) => {
    console.log("Search term:", term);
    setSearchTerm(term);
  };

  return (
    <div>
      {/* <NavBar /> */}

      <div className="my-courses-page">
        <div className="my-courses-filter-and-search">
          <SearchBar onSearch={handleSearchh} />
        </div>
        <div className="my-course-container">
          <div className="filter-container">
            <h2>
              <IconButton>
                <FilterAltIcon />
              </IconButton>
              <button className="clear-button" onClick={clearFilters}>
                Clear Filters
              </button>
            </h2>
            {/* Filter component or content */}
            {/* <div className="filter-group">
            <label className="filter-label" htmlFor="rating-filter">Rating</label>
            <input
              type="range"
              id="rating-filter"
              min="0"
              max="5"
              value={ratingFilter}
              onChange={handleRatingFilterChange}
            />
            <span>{ratingFilter}</span>
          </div> */}

            <div className="filter-group">
              <label className="filter-label" htmlFor="rating-filter">
                Rating
              </label>
              <select
                id="rating-filter"
                value={ratingFilter}
                onChange={handleRatingFilterChange}
              >
                {/* <option value={0}>All</option>
                {uniqueRatings.map((rating) => (
                  <option key={rating} value={rating}>
                    {rating}
                  </option>
                ))} */}
                {ratingOptions}
              </select>
            </div>

            {/* <div className="filter-group"> */}
            {/* <label className="filter-label">Price</label> */}
            {/* <div className="price-filter">
              <label>
                <input
                  type="radio"
                  name="price"
                  value="free"
                  checked={priceFilter === "free"}
                  onChange={handlePriceFilterChange}
                />
                Free
              </label>
              <label>
                <input
                  type="radio"
                  name="price"
                  value="paid"
                  checked={priceFilter === "paid"}
                  onChange={handlePriceFilterChange}
                />
                Paid
              </label>
            </div> */}
            {/* </div> */}

            <div className="filter-group">
              <label className="filter-label">Instructor</label>
              <select
                className="instructor-select"
                value={instructorFilter}
                onChange={handleInstructorFilterChange}
              >
                <option value="">Select an instructor</option>
                {uniqueInstructors.map((instructor) => (
                  <option key={instructor} value={instructor}>
                    {instructor}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="course-container-2">
            <div className="course-list">
              {filteredCourses.map((course) => (
                <Link key={course.id} to={`/chapter-details/${course.id}`}>
                  <CourseCard course={course} />
                </Link>
              ))}
            </div>
          </div>
        </div>
        {/* <div className="course-list">
        {filteredCourses.map(course => (
          // <Link key={course.id} to={`/course-details/${course.id}`}>
        <Link key={course.id} to={`/chapter-details/${course.id}`}> 
            <CourseCard course={course} />
          </Link>
        ))}
      </div> */}
      </div>
    </div>
  );
}

export default MyCoursesPage;
