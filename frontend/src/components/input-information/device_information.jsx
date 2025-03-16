import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table as BTable } from "react-bootstrap";
import { FiPlus, FiSave } from "react-icons/fi";
import { BsFillTrash3Fill } from "react-icons/bs";
import { PiNotePencilDuotone } from "react-icons/pi";
import Header from "../Header/Headerd";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const DeviceEntry = ({ isDirty, setIsDirty }) => {
  const [devices, setDevices] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newDeviceName, setNewDeviceName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/devices/")
      .then((response) => {
        setDevices(response.data);
      })
      .catch((error) => {
        console.error("خطا در دریافت لیست دستگاه‌ها:", error);
      });
  }, []);

  const handleEditChange = (index, value) => {
    const updatedDevices = [...devices];
    updatedDevices[index].name = value;
    setDevices(updatedDevices);
    setIsDirty(true); // فرم تغییر کرده است
  };

  const startEditing = (index) => {
    setEditingIndex(index);
  };

  const deleteRow = (index) => {
    const updatedDevices = devices.filter((_, i) => i !== index);
    setDevices(updatedDevices);
    setIsDirty(true); // حذف یک سطر تغییر محسوب می‌شود
  };

  const addRow = () => {
    if (newDeviceName.trim() === "") return;
    setDevices([...devices, { name: newDeviceName }]);
    setNewDeviceName("");
    setIsDirty(true); // اضافه کردن سطر جدید یعنی تغییر در فرم
  };

  const saveData = () => {
    axios
      .post("/api/devices/save/", devices)
      .then(() => {
        alert("✅ اطلاعات ذخیره شد!");
        setIsDirty(false); 
      })
      .catch((error) => {
        console.error("❌ خطا در ذخیره اطلاعات:", error);
      });
  };

  const handleBeforeUnload = (event) => {
    if (isDirty) {
      const message = "تغییرات شما ذخیره نشده است. آیا مطمئن هستید که می‌خواهید ترک کنید؟";
      event.returnValue = message;
      return message;
    }
  };

  const handleNavigation = (newPath) => {
    if (isDirty) {
      const confirmLeave = window.confirm(
        "تغییرات شما ذخیره نشده است. آیا مطمئن هستید که می‌خواهید ترک کنید؟"
      );
      if (confirmLeave) {
        navigate(newPath);
      }
    } else {
      navigate(newPath);
    }
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]);

  return (
    <div className="page">
      {/* نمایش هدر */}
      <Header />

      {/* فاصله دادن بین هدر و جدول */}
      <div style={{ marginTop: "40px" }} className="container">
        {/* جدول دستگاه‌ها */}
        <BTable striped bordered hover responsive className="device-table">
          <thead>
            <tr>
              <th>نام دستگاه</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((device, index) => (
              <tr key={index}>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={device.name}
                      onChange={(e) => handleEditChange(index, e.target.value)}
                      className="edit-input"
                    />
                  ) : (
                    device.name
                  )}
                </td>
                <td className="actions">
                  <button onClick={() => startEditing(index)} className="edit-btn">
                    <PiNotePencilDuotone />
                  </button>
                  <button onClick={() => deleteRow(index)} className="delete-btn">
                    <BsFillTrash3Fill />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </BTable>

        {/* افزودن سطر جدید */}
        <div className="add-row">
          <input
            type="text"
            placeholder="نام دستگاه جدید"
            value={newDeviceName}
            onChange={(e) => setNewDeviceName(e.target.value)}
            className="new-device-input"
          />
          <button onClick={addRow} className="add-btn">
            <FiPlus />
          </button>
        </div>

        {/* دکمه ذخیره اطلاعات */}
        <button onClick={saveData} className="save-btn">
          <FiSave /> ذخیره اطلاعات
        </button>

        {/* دکمه ناوبری به صفحه دیگر */}
        <button onClick={() => handleNavigation("/home")} className="navigate-btn">
          به صفحه دیگر بروید
        </button>
      </div>
    </div>
  );
};

DeviceEntry.propTypes = {
  isDirty: PropTypes.bool.isRequired,
  setIsDirty: PropTypes.func.isRequired,
};

export default DeviceEntry;
