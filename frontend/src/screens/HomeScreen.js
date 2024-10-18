import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import skyImage from '../assets/1s.jpg';
import companyImage from '../assets/company.jpg';

const HomeScreen = () => {
  const courses = [
    { title: 'Beginner', description: 'Mô tả khóa học 1', price: '500.000' },
    { title: 'Vowels', description: 'Mô tả khóa học 2', price: '700.000' },
    { title: 'Consonants', description: 'Mô tả khóa học 3', price: '600.000' },
    { title: 'Number', description: 'Mô tả khóa học 4', price: '600.000' },
    { title: 'Fluency', description: 'Mô tả khóa học 5', price: '600.000' },
    { title: 'Simple Sentences', description: 'Mô tả khóa học 6', price: '600.000' },
    { title: 'Poem', description: 'Mô tả khóa học 7', price: '600.000' },
  ];

  const homeScreenStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f4f7fa', // Màu nền sáng nhẹ
  };
  
  const introductionStyle = {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#3b82f6', // Màu xanh nổi bật
    color: '#fff', // Màu chữ trắng
    fontFamily: '"Poppins", sans-serif', // Sử dụng font chữ hiện đại
  };
  
  const frameStyle = {
    position: 'relative',
    margin: '20px auto',
    padding: '30px 20px 20px 20px',
    backgroundImage: `url(${skyImage})`, 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '20px 20px 0 0',
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.3)', // Tăng bóng đổ
    width: '80%',
    color: '#fff', // Màu chữ trắng
  };
  
  const framePointerStyle = {
    position: 'absolute',
    bottom: '-20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundImage: `url(${skyImage})`, 
    backgroundSize: 'cover', // Ensure the background image covers the entire area
    backgroundPosition: 'center', // Center the image
    width: '60px',
    height: '20px',
    backgroundColor: '#fff',
    clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
  };
  
  const productsStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    margin: '0 auto',
    maxWidth: '84.5%',
    padding: '0 30px',
  };
  
  const companyIntroStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '60px 40px',
    backgroundColor: '#fff', // Nền trắng để tạo cảm giác sạch sẽ
    marginTop: '40px',
    borderRadius: '10px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
    borderTop: '3px solid #3b82f6', 
    color: '#374151', // Màu tối hơn cho nội dung văn bản
    fontFamily: '"Poppins", sans-serif', // Font chữ Poppins cho cảm giác hiện đại
    lineHeight: '1.8',
    maxWidth: '1200px',
    margin: '40px auto',
  };
  
  const textStyle = {
    flex: '1',
    paddingRight: '20px',
    fontSize: '18px', // Giữ kích thước văn bản hợp lý
  };
  
  const imageStyle = {
    flex: '1',
    maxWidth: '100%',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)', // Tăng bóng đổ cho ảnh
  };
  
  return (
    <div style={homeScreenStyle}>
      <Header />
      <div style={introductionStyle}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '10px' }}>
          Welcome to the English Speaking Practice Website
        </h1>
        <p style={{ fontSize: '20px', marginBottom: '20px' }}>
          Explore the courses and improve your English communication skills!
        </p>
      </div>
      <div style={frameStyle}>
        <div style={framePointerStyle}></div>
        <h2 style={{ fontSize: '28px', fontWeight: 'bold' }}>Course Overview</h2>
        <p style={{ fontSize: '18px' }}>
          Join us to embark on a journey towards mastering English speaking with structured lessons and practical exercises!
        </p>
      </div>
      <div style={productsStyle}>
        {courses.map((course, index) => (
          <ProductCard key={index} {...course} />
        ))}
      </div>
      <div style={companyIntroStyle}>
        <div style={textStyle}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>About Our Company</h2>
          <p style={{ marginBottom: '15px' }}>
            We are committed to providing top-notch English learning resources to help individuals 
            around the world improve their communication skills. With a strong focus on interactive 
            learning, we strive to create courses that not only teach English but also make learning 
            an enjoyable experience.
          </p>
          <p>
            Our team of experienced instructors and developers is dedicated to helping you achieve 
            fluency and confidence in English through our structured lessons and advanced learning tools.
          </p>
        </div>
        <div>
          <img src={companyImage} alt="Our Company" style={imageStyle} />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default HomeScreen;
