import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProtectedRoute from './components/ProtectedRoute';
import ProfileScreen from './screens/ProfileScreen';
import SearchScreen from './screens/SearchScreen';
import TalkAIScreen from './screens/TalkAIScreen';
import PackageScreen from './screens/PackageScreen';
import PaymentSuccessScreen from './screens/PaymentSuccessScreen';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/search-results" element={<SearchScreen />} />
        <Route path="/talkai" element={<TalkAIScreen />} />
        <Route path="/package" element={<PackageScreen />} />
        <Route path="/payment-success" element={<PaymentSuccessScreen />} />
        <Route path="/profile" element={<ProtectedRoute><ProfileScreen /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
