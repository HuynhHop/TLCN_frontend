import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import Chart from "../Config/Chart";
import List from "../Components/List";
import "../Style/single.scss";

const DetailPackageInfo = () => {
  const { packageinforId } = useParams(); // Lấy ID từ URL
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
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
  }, [packageinforId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1 className="title">Information</h1>
            <Link to={`/admin/packageinfors/${packageinforId}/edit`} style={{ textDecoration: "none" }}>
              <span className="editButton">Edit</span>
            </Link> 
            <div className="item">
              <div className="details">
                <h1 className="itemTitle">{packageData?.packageName || "Unknown Package"}</h1>

                <div className="detailItem">
                  <span className="itemKey">Description:</span>
                  <span className="itemValue">{packageData?.description || "N/A"}</span>
                </div>

                <div className="detailItem">
                  <span className="itemKey">Price:</span>
                  <span className="itemValue">
                    {packageData?.price ? `${packageData.price} VNĐ` : "N/A"}
                  </span>
                </div>

                <div className="detailItem">
                  <span className="itemKey">Time Duration:</span>
                  <span className="itemValue">
                    {packageData?.timeDuration ? `${packageData.timeDuration} Day` : "N/A"}
                  </span>
                </div>
              </div>
            </div> 
            </div>      
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="Package Spending ( Last 6 Months )" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          {/* <List /> */}
        </div>
      </div>
  );
};

export default DetailPackageInfo;
