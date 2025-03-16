import React from "react";
import Header from "../Header/Header.jsx";
import "./daily_lab_report.css";
import "/src/assets/font.css";  
import DataDashboardApp from "../../dataform.jsx";

const Stats = () => {
  return (
    <div className="page"> 
      {/* هدر */}
      <Header />
      
      {/* باکس محتوای اصلی */}
      <div className="lab">
        <div className="button-container">
        <div className="labale">  
          <DataDashboardApp />
        </div>
        </div>
        {/* اینجا می‌توانید ادامه محتوای صفحه را قرار دهید */}
      </div>
    </div>  
  );
};

export default Stats;
