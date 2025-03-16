import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { FiLogOut } from "react-icons/fi";
import "./Log_out.css";

const UserProfile = ({ isDirty, setIsDirty }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const firstName = sessionStorage.getItem("firstname");  
  const lastName = sessionStorage.getItem("lastname");
  const navigate = useNavigate(); 

  const handleLogout = () => {
    if (isDirty) {
      const confirmLeave = window.confirm(
        "تغییرات ذخیره نشده‌اند. آیا می‌خواهید از سیستم خارج شوید؟"
      );
      if (!confirmLeave) {
        // کاربر منصرف شده، پس هیچ کاری انجام نده
        return;
      } else {
        // کاربر تأیید کرد که می‌خواهد خارج شود
        // isDirty را ریست می‌کنیم تا برای ناوبری بعدی هشدار ندهد
        setIsDirty(false);
      }
    }

    // پاک‌سازی sessionStorage و هدایت به صفحه لاگین
    sessionStorage.clear();
    navigate("/LoginPage");
  };

  return (
    <div className="profile-container">
      <div
        className="profile-icon"
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
      >
        <VscAccount size={30} />
      </div>

      {menuOpen && firstName && lastName && (
        <div className="profile-menu">
          <div className="profile-header">
            <div className="user-info">
              <strong>
                {firstName} {lastName}
              </strong>
            </div>
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            <FiLogOut size={18} />
            خروج
          </button>
        </div>
      )}
    </div>
  );
};

UserProfile.propTypes = {
  isDirty: PropTypes.bool.isRequired,
  setIsDirty: PropTypes.func.isRequired,
};

export default UserProfile;
