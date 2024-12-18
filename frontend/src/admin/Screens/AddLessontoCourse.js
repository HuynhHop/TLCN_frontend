import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import "../Style/addlessontocourse.scss";
import { useParams, useNavigate } from 'react-router-dom';

const AddLessonToCourse = () => {
  const [availableLessons, setAvailableLessons] = useState([]); // Danh sách bài học từ API
  const [selectedLesson, setSelectedLesson] = useState(""); // Bài học được chọn
  const [courseTitle, setCourseTitle] = useState("");
  const [error, setError] = useState(""); // Thông báo lỗi
  const navigate = useNavigate();
  const { courseId } = useParams();

  // Fetch danh sách bài học từ API
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.get("http://localhost:8080/v1/api/lesson/");
        if (response.data.success) {
          setAvailableLessons(response.data.lessons);
        }
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
    };

    const fetchCourseData = async () => {
        try {
          // Lấy thông tin của khóa học từ API
          console.log("Course: ", courseId);
          const courseResponse = await axios.get(`http://localhost:8080/v1/api/course/${courseId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              "Content-Type": "application/json",
            },
          });
  
          if (courseResponse.data.success) {
            setCourseTitle(courseResponse.data.data.title); // Lưu title của khóa học
          } else {
            setError("Failed to fetch course data.");
          }
        } catch (error) {
          console.error("Error fetching course data:", error);
          setError("An error occurred while fetching course data.");
        }
    };
  
    fetchCourseData();
    fetchLessons();
  }, [courseId]);

  // Hàm thêm bài học vào khóa học
  const handleAddLesson = async () => {
    if (!selectedLesson) return;
  
    try {
      const response = await axios.put(
        `http://localhost:8080/v1/api/course/${courseId}/addLesson/${selectedLesson}`
      );
  
      if (response.data.success) {
        alert('Add Lesson to Course successfully!');
        navigate('/admin/courses');
      } else {
        setError("Failed to add lesson to course!");
      }
    } catch (error) {
      console.error("Error adding lesson to course:", error);
      setError("An error occurred while adding the lesson.");
    }
  };


  return (
    <div className="addLessonToCourse">
      <Sidebar />
      <div className="addLessonContainer">
        <Navbar />
        <div className="addLessonForm">
          <h2>Add Lessons to Course</h2>

          <div className="courseTitle">
            <h3>Course Title: {courseTitle}</h3>
          </div>

          {/* Select bài học */}
          <div className="formGroup">
            <label htmlFor="lessonSelect">Select a Lesson</label>
            <select
              id="lessonSelect"
              value={selectedLesson}
              onChange={(e) => setSelectedLesson(e.target.value)}
            >
              <option value="">-- Select a Lesson --</option>
              {availableLessons.map((lesson) => (
                <option key={lesson._id} value={lesson._id}>
                  {lesson.title}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="addLessonButton"
              onClick={handleAddLesson}
            >
              Add Lesson
            </button>
          </div>

          {/* Thông báo lỗi */}
          {error && <p className="errorMessage">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default AddLessonToCourse;