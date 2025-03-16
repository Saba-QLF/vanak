import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Table as BTable } from "react-bootstrap";
import { FiPlus, FiSave } from "react-icons/fi";
import { BsFillTrash3Fill } from "react-icons/bs";
import { PiNotePencilDuotone } from "react-icons/pi";
import Header from "../Header/Headert";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";


const SupplierEntry = ({ isDirty, setIsDirty }) => {
  // لیست تأمین‌کنندگان
  const [suppliers, setSuppliers] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newSupplier, setNewSupplier] = useState({ code: "", name: "" });
  const navigate = useNavigate();

  // دریافت لیست تأمین‌کنندگان از سرور
  useEffect(() => {
    axios
      .get("/api/suppliers/")
      .then((response) => {
        setSuppliers(response.data);
      })
      .catch((error) => {
        console.error("خطا در دریافت لیست تامین‌کنندگان:", error);
      });
  }, []);

  // تغییر مقادیر در یک سطر و علامت‌گذاری تغییر
  const handleEditChange = (index, field, value) => {
    const updatedSuppliers = [...suppliers];
    updatedSuppliers[index][field] = value;
    setSuppliers(updatedSuppliers);
    setIsDirty(true); // تغییر ذخیره نشده
  };

  // شروع ویرایش سطر
  const startEditing = (index) => {
    setEditingIndex(index);
  };

  // حذف یک سطر و علامت‌گذاری تغییر
  const deleteRow = (index) => {
    const updatedSuppliers = suppliers.filter((_, i) => i !== index);
    setSuppliers(updatedSuppliers);
    setIsDirty(true);
  };

  // افزودن سطر جدید و علامت‌گذاری تغییر
  const addRow = () => {
    if (newSupplier.name.trim() === "" || newSupplier.code.trim() === "") return;
    setSuppliers([...suppliers, { ...newSupplier }]);
    setNewSupplier({ code: "", name: "" }); // پاکسازی ورودی
    setIsDirty(true);
  };

  // ذخیره اطلاعات در سرور و پاکسازی وضعیت تغییرات ذخیره نشده
  const saveData = async () => {
    try {
      await axios.post("/api/suppliers/save/", suppliers);
      alert("✅ اطلاعات ذخیره شد!");
      setIsDirty(false); // تغییرات ذخیره شده است
    } catch (error) {
      console.error("❌ خطا در ذخیره اطلاعات:", error);
    }
  };

  // هندلر برای قبل از بستن صفحه (F5، بستن تب، یا دکمه Back)
  const handleBeforeUnload = useCallback((event) => {
    if (isDirty) {
      const message = "تغییرات شما ذخیره نشده است. آیا مطمئن هستید که می‌خواهید ترک کنید؟";
      event.returnValue = message;
      return message;
    }
  }, [isDirty]);

  // مدیریت ناوبری به صفحه دیگر (مثلاً با دکمه ناوبری)
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
  }, [handleBeforeUnload]);

  return (
    <div className="page">
      <Header />
      <div style={{ marginTop: "40px" }} className="container">
        {/* جدول تأمین‌کنندگان */}
        <BTable striped bordered hover responsive className="device-table">
          <thead>
            <tr>
              <th>کد تأمین‌کننده</th>
              <th>نام تأمین‌کننده</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier, index) => (
              <tr key={index}>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={supplier.code}
                      onChange={(e) => handleEditChange(index, "code", e.target.value)}
                      className="edit-input"
                    />
                  ) : (
                    supplier.code
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={supplier.name}
                      onChange={(e) => handleEditChange(index, "name", e.target.value)}
                      className="edit-input"
                    />
                  ) : (
                    supplier.name
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
            placeholder="کد تأمین‌کننده"
            value={newSupplier.code}
            onChange={(e) =>
              setNewSupplier({ ...newSupplier, code: e.target.value })
            }
            className="new-device-input"
          />
          <input
            type="text"
            placeholder="نام تأمین‌کننده"
            value={newSupplier.name}
            onChange={(e) =>
              setNewSupplier({ ...newSupplier, name: e.target.value })
            }
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

SupplierEntry.propTypes = {
  isDirty: PropTypes.bool.isRequired,
  setIsDirty: PropTypes.func.isRequired,
};

export default SupplierEntry;
