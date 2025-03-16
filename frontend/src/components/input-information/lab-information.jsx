import React from "react";
import Header from "../Header/Headerv";
import "/src/assets/font.css";
import LabApp from "/src/components/input-information/InputLab.jsx";

const LabInformation = ({ isDirty, setIsDirty }) => {
  return (
    <div className="page"> 
      {/* هدر */}
      <Header />

      {/* باکس فرم / فیلدها */}
      <div className="ihead">
        <div className="button-container">
          <LabApp isDirty={isDirty} setIsDirty={setIsDirty} />
        </div>
      </div>
    </div>
  );
};

export default LabInformation;
