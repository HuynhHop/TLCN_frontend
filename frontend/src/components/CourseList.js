// components/CourseList.js
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard'; // Đảm bảo bạn đã tạo component ProductCard

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lấy danh sách khóa học từ API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:8080/v1/api/course/'); // Thay URL của API thật
        const data = await response.json();

        if (data.success) {
          setCourses(data.data); // Lưu danh sách khóa học vào state
        } else {
          setError('Không thể tải danh sách khóa học');
        }
      } catch (error) {
        setError('Lỗi khi tải dữ liệu');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {courses.map((course) => (
        <ProductCard
          key={course._id}
          title={course.title}
          description={course.description}
        />
      ))}
    </div>
  );
};

export default CourseList;
