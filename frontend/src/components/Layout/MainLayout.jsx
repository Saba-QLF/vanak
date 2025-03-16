// مسیر: src/components/Layout/MainLayout.jsx
import React from "react";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Log_out from "../Log_out/Log-out";

function MainLayout({ isDirty, setIsDirty }) {
  return (
    <div style={{ display: "flex" }}>
      {/* سایدبار */}
      <Sidebar isDirty={isDirty} setIsDirty={setIsDirty} />
      <Log_out  isDirty={isDirty} setIsDirty={setIsDirty} />

      <div style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
}

// تعریف prop-types برای اطمینان از اینکه isDirty و setIsDirty دریافت شده‌اند
MainLayout.propTypes = {
  isDirty: PropTypes.bool.isRequired,
  setIsDirty: PropTypes.func.isRequired,
};

export default MainLayout;
