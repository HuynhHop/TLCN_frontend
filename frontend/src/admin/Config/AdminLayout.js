import React from "react";
import { Route, Routes } from 'react-router-dom';
import Home from "../Screens/Home";
import ManagerUser from "../Screens/ManagerUser";
import Single from "../Screens/Single";
import ManagerLesson from "../Screens/ManagerLesson";
import New from "../Screens/New";
import { DarkModeContext } from "../Context/darkModeContext";
import { userInputs, productInputs } from "../formData";
import "../Style/dark.scss";
import { useContext } from "react";

const AdminLayout = () => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="users" element={<ManagerUser />} />
        <Route path="users/:userId" element={<Single />} />
        <Route path="users/:userId/new" element={<New inputs={userInputs} title={"Add New User"} />} />
        <Route path="lessons" element={<ManagerLesson />} />
        <Route path="lessons/:lessonId" element={<Single />} />
        <Route path="lessons/:lessonId/new" element={<New inputs={productInputs} title={"Add New Lesson"} />} />
      </Routes>
    </div>
  );
};

export default AdminLayout;
