import React from "react";
import "./Home.css";
import Header from "../Header/Heeaderh";
import { useNavigate } from "react-router-dom";
import logoVanak from "./logo-vanak.png";


const Home = () => {
  const navigate = useNavigate();

  const handleGoToInput = () => {
    navigate("/lab-information");
  };

  const handleGoToReport = () => {
    navigate("/Lab_report");
  };

  return (
    <div className="page">
      <Header />

      <div className="home-content">
        <div className="button-row">
          {/* دکمه اول با رنگ #C4D9FF */}
          <button className="home-btn btn-lab" onClick={handleGoToInput}>
            ورود اطلاعات آزمایشگاه
          </button>

          {/* دکمه دوم با رنگ #C5BAFF */}
          <button className="home-btn btn-report" onClick={handleGoToReport}>
            گزارش ورود اطلاعات
          </button>
        </div>

        <div className="company-info">
          <img src={logoVanak} alt="لوگو شرکت" className="company-logo" />
          <span>شرکت فرخ مهر اسپادانا</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
