import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard'; // Đảm bảo bạn đã tạo component ProductCard

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const images = [
    require('../assets/speak.png'),
    require('../assets/speak2.jpg'),
    require('../assets/speak3.jpg'),
    require('../assets/speak4.jpg'),
    require('../assets/speak5.jpg'),
    require('../assets/speak6.jpg'),
    require('../assets/speak7.jpg'),
    require('../assets/speak8.jpg'),
    require('../assets/speak9.jpg'),
    require('../assets/speak10.jpg'),
    require('../assets/speak11.jpg'),
  ];

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

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {courses.map((course) => (
        <ProductCard
          key={course._id}
          title={course.title}
          description={course.description}
          image={getRandomImage()}  // Pass the image correctly here
        />
      ))}
    </div>
  );
};

export default CourseList;
