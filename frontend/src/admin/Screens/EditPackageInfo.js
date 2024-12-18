import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import "../Style/editpackageinfo.scss"; // Thêm style tương ứng

const EditPackageInfo = () => {
  const { packageinforId } = useParams(); // Lấy ID từ URL
  const [packageData, setPackageData] = useState({
    packageName: "",
    description: "",
    price: "",
    timeDuration: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/v1/api/packageinfo/${packageinforId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch package data");
        }

        const data = await response.json();
        if (data.success) {
          setPackageData(data.data);
        } else {
          setError("Package not found");
        }
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPackageData();
  }, [packageinforId, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPackageData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/v1/api/packageinfo/${packageinforId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(packageData),
      });

      const data = await response.json();
      if (data.success) {
        alert("PackageInfo updated successfully!");
        navigate(`/admin/packageinfors/${packageinforId}`);
      } else {
        alert(data.message || "Failed to update package info.");
      }
    } catch (error) {
      console.error("Error updating package info:", error);
      setError("An error occurred while updating the package info.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="editPackageInfo">
      <Sidebar />
      <div className="editPackageInfoContainer">
        <Navbar />
        <div className="editForm">
          <h1>Edit Package Info</h1>
          <form onSubmit={handleSubmit}>
            <div className="formGroup">
              <label htmlFor="packageName">Package Name</label>
              <input
                type="text"
                id="packageName"
                name="packageName"
                value={packageData.packageName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="formGroup">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={packageData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="formGroup">
              <label htmlFor="price">Price (VNĐ)</label>
              <input
                type="number"
                id="price"
                name="price"
                value={packageData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="formGroup">
              <label htmlFor="timeDuration">Time Duration (Days)</label>
              <input
                type="number"
                id="timeDuration"
                name="timeDuration"
                value={packageData.timeDuration}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="submitButton">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPackageInfo;