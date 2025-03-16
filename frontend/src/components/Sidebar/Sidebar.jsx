import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Sidebar.css";

// آیکن‌ها
import { LiaCampgroundSolid } from "react-icons/lia";
import { AiOutlineExperiment, AiOutlineFileProtect, AiOutlineSnippets } from "react-icons/ai";
import { MdOutlineEventNote } from "react-icons/md";

// لوگو برای فوتر
import finalEyerik from "./Final Eyerik 2-53.png";

const Sidebar = ({ isDirty, setIsDirty }) => {
  const [isLabOpen, setIsLabOpen] = useState(false);
  const [isReportsOpen, setIsReportsOpen] = useState(false);
  const [isDataEntryOpen, setIsDataEntryOpen] = useState(false);

  // منوی جدید "اطلاعات پایه"
  const [isBaseDataOpen, setIsBaseDataOpen] = useState(false);

  const [shuffledReports, setShuffledReports] = useState([]);

  const toggleLabMenu = () => setIsLabOpen(!isLabOpen);
  const toggleReports = () => {
    setIsReportsOpen(!isReportsOpen);
    shuffleReports();
  };
  const toggleDataEntry = () => setIsDataEntryOpen(!isDataEntryOpen);

  // منوی جدید "اطلاعات پایه"
  const toggleBaseData = () => setIsBaseDataOpen(!isBaseDataOpen);

  // لیست گزارشات آزمایشگاه، شامل "گزارش روزانه" و "گزارش ورود اطلاعات"
  const shuffleReports = () => {
    const reports = [
      { path: "/daily_lab_report", label: "گزارش روزانه آزمایشگاه" },
      { path: "/Lab_report", label: "گزارش ورود اطلاعات" },
    ];
    setShuffledReports([...reports].sort(() => Math.random() - 0.5));
  };

  const handleNavigation = (e) => {
    if (isDirty) {
      const confirmLeave = window.confirm(
        "تغییرات ذخیره نشده‌اند. آیا می‌خواهید صفحه را ترک کنید؟"
      );
      if (!confirmLeave) {
        e.preventDefault();
      } else {
        setIsDirty(false);
      }
    }
  };

  return (
    <div className="sidebar">
      <ul>
        {/* خانه */}
        <li>
          <Link to="/home" className="sidebar-link" onClick={handleNavigation}>
            خانه
            <LiaCampgroundSolid className="icon" />
          </Link>
        </li>

        {/* منوی اطلاعات پایه */}
        <li>
          <button className="sidebar-button" onClick={toggleBaseData}>
            {isBaseDataOpen ? "▾" : "▸"} اطلاعات پایه
            <MdOutlineEventNote className="icon" />
          </button>
          {isBaseDataOpen && (
            <ul className="submenu open">
              <li>
                <Link to="/supplier" className="sidebar-link" onClick={handleNavigation}>
                  ورود اطلاعات تأمین‌کننده
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* منوی آزمایشگاه */}
        <li>
          <button className="sidebar-button" onClick={toggleLabMenu}>
            {isLabOpen ? "▾" : "▸"} آزمایشگاه
            <AiOutlineExperiment className="icon" />
          </button>
          {isLabOpen && (
            <ul className="submenu open">
              {/* ورود اطلاعات (بدون تأمین‌کننده) */}
              <li>
                <button className="sidebar-button" onClick={toggleDataEntry}>
                  {isDataEntryOpen ? "▾" : "▸"} ورود اطلاعات
                  <AiOutlineFileProtect className="icon" />
                </button>
                {isDataEntryOpen && (
                  <ul className="submenu open">
                    <li>
                      <Link to="/lab-information" className="sidebar-link" onClick={handleNavigation}>
                        ورود اطلاعات آزمایشگاه
                      </Link>
                    </li>
                    <li>
                      <Link to="/device_information" className="sidebar-link" onClick={handleNavigation}>
                        ورود اطلاعات دستگاه
                      </Link>
                    </li>
                    {/* لینک "/supplier" حذف شد از اینجا */}
                  </ul>
                )}
              </li>

              {/* گزارشات آزمایشگاه */}
              <li>
                <button className="sidebar-button" onClick={toggleReports}>
                  {isReportsOpen ? "▾" : "▸"} گزارشات آزمایشگاه
                  <AiOutlineSnippets className="icon" />
                </button>
                {isReportsOpen && (
                  <ul className="submenu open">
                    {shuffledReports.map((report, index) => (
                      <li key={index}>
                        <Link to={report.path} className="sidebar-link" onClick={handleNavigation}>
                          {report.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            </ul>
          )}
        </li>
      </ul>

      {/* فوتر سایدبار */}
      <div className="sidebar-footer">
        <img src={finalEyerik} alt="لوگو" className="r-logo" />
        <span>All rights reserved</span>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  isDirty: PropTypes.bool.isRequired,
  setIsDirty: PropTypes.func.isRequired,
};

export default Sidebar;
