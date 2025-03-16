import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

// صفحات و کامپوننت‌ها
import LoginPage from "./components/LoginPage/LoginPage";
import MainLayout from "./components/Layout/MainLayout";
import Home from "./components/Home/Home";
import DailyLabReport from "./components/daily_lab_report/daily_lab_report";
import LabInformation from "./components/input-information/lab-information";
import InputDevice from "./components/input-information/device_information";
import Supplier from "./components/input-information/Supplier";
import LabReport from "./components/daily_lab_report/Lab_report";


function App() {
 
  const [isDirty, setIsDirty] = useState(false);

  
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        const message = "تغییرات شما ذخیره نشده است. آیا مطمئن هستید که می‌خواهید صفحه را ترک کنید؟";
        e.returnValue = message; // برای بعضی مرورگرها
        return message;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]);

  return (
    <Router>
      <Routes>
        {/* صفحه لاگین بدون سایدبار */}
        <Route path="/LoginPage" element={<LoginPage />} />

        {/* مسیرهای داخلی که در MainLayout قرار دارند (سایدبار و غیره) */}
        <Route element={<MainLayout isDirty={isDirty} setIsDirty={setIsDirty} />}>
          <Route path="/home" element={<Home setIsDirty={setIsDirty} />} />
          <Route path="/daily_lab_report" element={<DailyLabReport setIsDirty={setIsDirty} />} />
          <Route path="/lab-information" element={<LabInformation setIsDirty={setIsDirty} isDirty={isDirty} />} />
          <Route path="/Lab_report" element={<LabReport />} />

          <Route path="/device_information" element={<InputDevice setIsDirty={setIsDirty} />} />
          <Route path="/supplier" element={<Supplier setIsDirty={setIsDirty} />} />
          
        </Route>

        {/* هدایت مسیر اصلی به صفحه لاگین */}
        <Route path="/" element={<Navigate to="/LoginPage" />} />
      </Routes>
    </Router>
  );
}

export default App;
