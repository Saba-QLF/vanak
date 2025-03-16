import React from "react";
//import "./daily_lab_report.css";
import Header from "../Header/HeaderL";

import "/src/assets/font.css";  
import ReportApp from "/src/components/daily_lab_report/report";

const LabInformation = () => {
  return (
    <div className="page"> 
      {/* هدر */}
      <Header />

      {/* باکس فرم / فیلدها */}
      
      <div className="button-container">
        <ReportApp  />
      </div>
      {/* ادامه محتوای صفحه */}
    </div>
  );
};

export default LabInformation;
