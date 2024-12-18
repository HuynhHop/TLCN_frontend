import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DarkModeContext } from '../Context/darkModeContext';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import '../Style/editcourse.scss';

const EditCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useContext(DarkModeContext);
  const [course, setCourse] = useState({
    title: '',
    description: '',
    lessons: [],
  });
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`http://localhost:8080/v1/api/course/${courseId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (data.success) {
          setCourse(data.data);
        } else {
          console.error('Failed to fetch course');
        }
      } catch (error) {
        console.error('Error fetching course:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [courseId, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  const handleRemoveLesson = (lessonId) => {
    setCourse((prevCourse) => ({
      ...prevCourse,
      lessons: prevCourse.lessons.filter((lesson) => lesson._id !== lessonId),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/v1/api/course/${courseId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: course.title,
          description: course.description,
          lesson: course.lessons.map((lesson) => lesson._id),
        }),
      });
      const data = await response.json();
      if (data.success) {
        alert('Course updated successfully!');
        navigate('/admin/courses');
      } else {
        alert(data.message || 'Failed to update the course.');
      }
    } catch (error) {
      console.error('Error updating course:', error);
      alert('An error occurred while trying to update the course.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="editCourse">
      <Sidebar />
      <div className="editCourseContainer">
        <Navbar />
        <div className="editCourseForm">
          <h2>Edit Course</h2>
          <form onSubmit={handleSubmit}>
            <div className="formGroup">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={course.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="formGroup">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={course.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="formGroup">
              <label>Lessons</label>
              <ul>
                {course.lessons.map((lesson) => (
                  <li key={lesson._id}>
                    {lesson.title}
                    <button
                      type="button"
                      onClick={() => handleRemoveLesson(lesson._id)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <button type="submit">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCourse;
