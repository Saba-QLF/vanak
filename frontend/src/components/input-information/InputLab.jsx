import React, { useState, useEffect, useRef, useCallback } from "react";
import "./InputLab.css";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import axios from "axios";
import { Table as BTable } from "react-bootstrap";
import { FiPlus, FiSave } from "react-icons/fi";
import { BsFillTrash3Fill } from "react-icons/bs";
import PropTypes from "prop-types";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";

const MultiSelectCell = ({
  rowIndex,
  fieldKey,
  data,
  setData,
  options, // آرایه‌ای از آبجکت‌هایی با { label, value }
  placeholder = "جستجو..."
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState(
    data[rowIndex]?.[fieldKey]?.split(" - ") || []
  );

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
    opt.label.toLowerCase().split(" ").some((word) =>
      word.startsWith(searchTerm.toLowerCase())
    )
  );

  const handleAddItem = (newValue) => {
    if (!selectedItems.includes(newValue)) {
      const updated = [...selectedItems, newValue];
      console.log(`Row ${rowIndex}: Adding "${newValue}"`, updated);
      setSelectedItems(updated);
      setData((prevData) => {
        const newData = [...prevData];
        newData[rowIndex] = {
          ...newData[rowIndex],
          [fieldKey]: updated.join(" - ")
        };
        return newData;
      });
    }
    setSearchTerm("");
  };

  const handleRemoveItem = (valueToRemove) => {
    const updated = selectedItems.filter((s) => s !== valueToRemove);
    console.log(`Row ${rowIndex}: Removing "${valueToRemove}"`, updated);
    setSelectedItems(updated);
    setData((prevData) => {
      const newData = [...prevData];
      newData[rowIndex] = {
        ...newData[rowIndex],
        [fieldKey]: updated.join(" - ")
      };
      return newData;
    });
  };

  return (
    <div className="multi-select-container">
      <div className="selected-items">
        {selectedItems.map((item, index) => (
          <span key={index} className="selected-item">
            {item}
            <button className="remove-btn" onClick={() => handleRemoveItem(item)}>
              ×
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm.trim() && filteredOptions.length > 0 && (
        <div className="dropdown-options">
          {filteredOptions.map((option) => (
            <div
              key={option.value}
              className="dropdown-item"
              onClick={() => handleAddItem(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

function InputLab({ isDirty, setIsDirty }) {
  const [selectedType, setSelectedType] = useState("");
  const [date, setDate] = useState(null);
  const [data, setData] = useState([]);
  const [deviceOptions, setDeviceOptions] = useState([]);
  const [supplierOptions, setSupplierOptions] = useState([]);
  const inputRefs = useRef({});

 
  // دریافت لیست دستگاه‌ها
  useEffect(() => {
    axios
      .get("/api/devices/")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setDeviceOptions(response.data);
          console.log("Device options:", response.data);
        }
      })
      .catch((error) => {
        console.error("خطا در دریافت لیست دستگاه‌ها:", error);
      });
  }, []);

  // دریافت لیست تأمین‌کنندگان
  useEffect(() => {
    axios
      .get("/api/suppliers/")
      .then((response) => {
        if (Array.isArray(response.data)) {
          const suppliers = response.data.map((supplier) => ({
            label: supplier.name,
            value: supplier.name
          }));
          setSupplierOptions(suppliers);
          console.log("Supplier options:", suppliers);
        }
      })
      .catch((error) => {
        console.error("خطا در دریافت تأمین‌کنندگان:", error);
      });
  }, []);

  const handleInputChange = (rowIndex, field, value) => {
    setData((prevData) =>
      prevData.map((row, idx) =>
        idx === rowIndex ? { ...row, [field]: value } : row
      )
    );
    setIsDirty(true);
    console.log(`Row ${rowIndex}: Field ${field} updated to ${value}`);
    // برای ستون‌های coliformcount و moldyeastcount فوکوس اجباری نگیریم
    if (field !== "coliformcount" && field !== "moldyeastcount") {
      setTimeout(() => {
        const refKey = `${rowIndex}-${field}`;
        if (inputRefs.current[refKey]) {
          inputRefs.current[refKey].focus();
        }
      }, 0);
    }
  }; // ← اینجا تابع تمام می‌شود

  const columnHelper = createColumnHelper();

  const generateColumns = (fields) =>
    fields.map((field) =>
      columnHelper.accessor(field.key, {
        header: () => field.label,
        cell: (info) => {
          const rowIndex = info.row.index;
          const fieldKey = field.key;
          return (
            <input
              ref={(el) => (inputRefs.current[`${rowIndex}-${fieldKey}`] = el)}
              type={field.type || "text"}
              value={data[rowIndex]?.[fieldKey] || ""}
              onChange={(e) =>
                handleInputChange(rowIndex, fieldKey, e.target.value)
              }
            />
          );
        },
        id: field.key
      })
    );

  const multiSelectSupplierProcessReport = columnHelper.accessor("supplier", {
    id: "supplier_process",
    header: "تأمین‌کننده",
    cell: (info) => {
      const rowIndex = info.row.index;
      return (
        <MultiSelectCell
          rowIndex={rowIndex}
          fieldKey="supplier"
          data={data}
          setData={setData}
          options={supplierOptions}
          placeholder="جستجوی تأمین‌کننده..."
        />
      );
    }
  });

  const multiSelectSupplierOutputMilk = columnHelper.accessor("supplier", {
    id: "supplier_outputmilk",
    header: "محل ارسال",
    cell: (info) => {
      const rowIndex = info.row.index;
      return (
        <MultiSelectCell
          rowIndex={rowIndex}
          fieldKey="supplier"
          data={data}
          setData={setData}
          options={supplierOptions}
          placeholder="جستجوی محل ارسال..."
        />
      );
    }
  });

  const sampleNameDevices = columnHelper.accessor("samplename", {
    id: "samplename_devices",
    header: "نام نمونه",
    cell: (info) => {
      const rowIndex = info.row.index;
      const refKey = `${rowIndex}-samplename`; // کلید یکتا برای شناسایی
  
      return (
        <input
          type="text"
          ref={(el) => (inputRefs.current[refKey] = el)}  // این خط اضافه شود
          value={data[rowIndex]?.samplename || ""}
          onChange={(e) => handleInputChange(rowIndex, "samplename", e.target.value)}
          placeholder="نام نمونه را وارد کنید..."
          style={{ width: "100%" }}
        />
      );
    }
  });
  
  
  const columnsConfig = {
    ProcessReport: [
      columnHelper.accessor("palletnumber", {
        header: "شماره پالت",
        cell: (info) => {
          const rowIndex = info.row.index;
          return (
            <input
              ref={(el) => (inputRefs.current[`${rowIndex}-palletnumber`] = el)}
              type="text"
              value={data[rowIndex]?.palletnumber || ""}
              onChange={(e) =>
                handleInputChange(rowIndex, "palletnumber", e.target.value)
              }
            />
          );
        },
        id: "palletnumber"
      }),
      multiSelectSupplierProcessReport,
      columnHelper.accessor("color", {
        header: "رنگ",
        cell: (info) => {
          const rowIndex = info.row.index;
          return (
            <input
              ref={(el) => (inputRefs.current[`${rowIndex}-color`] = el)}
              type="text"
              value={data[rowIndex]?.color || ""}
              onChange={(e) =>
                handleInputChange(rowIndex, "color", e.target.value)
              }
            />
          );
        },
        id: "color"
      }),
      columnHelper.accessor("fatbutter", {
        header: "چربی (%)",
        cell: (info) => {
          const rowIndex = info.row.index;
          return (
            <input
              ref={(el) => (inputRefs.current[`${rowIndex}-fatbutter`] = el)}
              type="number"
              value={data[rowIndex]?.fatbutter || ""}
              onChange={(e) =>
                handleInputChange(rowIndex, "fatbutter", e.target.value)
              }
            />
          );
        },
        id: "fatbutter"
      }),
      columnHelper.accessor("tanknumber", {
        header: "شماره مخزن",
        cell: (info) => {
          const rowIndex = info.row.index;
          return (
            <input
              ref={(el) => (inputRefs.current[`${rowIndex}-tanknumber`] = el)}
              type="text"
              value={data[rowIndex]?.tanknumber || ""}
              onChange={(e) =>
                handleInputChange(rowIndex, "tanknumber", e.target.value)
              }
            />
          );
        },
        id: "tanknumber"
      }),
      columnHelper.accessor("acidbutter", {
        header: "اسیدیته",
        cell: (info) => {
          const rowIndex = info.row.index;
          return (
            <input
              ref={(el) => (inputRefs.current[`${rowIndex}-acidbutter`] = el)}
              type="number"
              value={data[rowIndex]?.acidbutter || ""}
              onChange={(e) =>
                handleInputChange(rowIndex, "acidbutter", e.target.value)
              }
            />
          );
        },
        id: "acidbutter"
      }),
      columnHelper.accessor("phbuttermilk", {
        header: "PH دوغ",
        cell: (info) => {
          const rowIndex = info.row.index;
          return (
            <input
              ref={(el) => (inputRefs.current[`${rowIndex}-phbuttermilk`] = el)}
              type="number"
              value={data[rowIndex]?.phbuttermilk || ""}
              onChange={(e) =>
                handleInputChange(rowIndex, "phbuttermilk", e.target.value)
              }
            />
          );
        },
        id: "phbuttermilk"
      }),
      columnHelper.accessor("acidbuttermilk", {
        header: "Acid دوغ",
        cell: (info) => {
          const rowIndex = info.row.index;
          return (
            <input
              ref={(el) => (inputRefs.current[`${rowIndex}-acidbuttermilk`] = el)}
              type="number"
              value={data[rowIndex]?.acidbuttermilk || ""}
              onChange={(e) =>
                handleInputChange(rowIndex, "acidbuttermilk", e.target.value)
              }
            />
          );
        },
        id: "acidbuttermilk"
      }),
      columnHelper.accessor("fatbuttermilk", {
        header: "چربی دوغ",
        cell: (info) => {
          const rowIndex = info.row.index;
          return (
            <input
              ref={(el) => (inputRefs.current[`${rowIndex}-fatbuttermilk`] = el)}
              type="number"
              value={data[rowIndex]?.fatbuttermilk || ""}
              onChange={(e) =>
                handleInputChange(rowIndex, "fatbuttermilk", e.target.value)
              }
            />
          );
        },
        id: "fatbuttermilk"
      }),
      columnHelper.accessor("snfbuttermilk", {
        header: "SNF دوغ",
        cell: (info) => {
          const rowIndex = info.row.index;
          return (
            <input
              ref={(el) => (inputRefs.current[`${rowIndex}-snfbuttermilk`] = el)}
              type="number"
              value={data[rowIndex]?.snfbuttermilk || ""}
              onChange={(e) =>
                handleInputChange(rowIndex, "snfbuttermilk", e.target.value)
              }
            />
          );
        },
        id: "snfbuttermilk"
      })
    ],
    OutputMilk: [
      multiSelectSupplierOutputMilk,
      ...generateColumns([
        { key: "ph", label: "PH", type: "number" },
        { key: "acid", label: "Acid", type: "number" },
        { key: "fat", label: "چربی (%)", type: "number" },
        { key: "snf", label: "SNF", type: "number" },
        { key: "weight", label: "وزن", type: "number" }
      ])
    ],
    InputCream: [
      columnHelper.accessor("supplier", {
        id: "supplier_cream",
        header: "نام تأمین‌کننده",
        cell: (info) => {
          const rowIndex = info.row.index;
          return (
            <MultiSelectCell
              rowIndex={rowIndex}
              fieldKey="supplier"
              data={data}
              setData={setData}
              options={supplierOptions}
              placeholder="جستجوی تأمین‌کننده..."
            />
          );
        }
      }),
      ...generateColumns([
        { key: "ph", label: "PH", type: "number" },
        { key: "acid", label: "Acid", type: "number" },
        { key: "fat", label: "چربی (%)", type: "number" },
        { key: "snf", label: "SNF", type: "number" },
        { key: "weight", label: "وزن", type: "number" },
        //{ key: "inputdata", label: "تاریخ داده ورودی", type: "text" }
      ])
    ],
    Devices: [
      columnHelper.accessor("testdevice", {
        id: "testdevice",
        header: "دستگاه",
        cell: (info) => {
          const rowIndex = info.row.index;
          return (
            <select
              value={data[rowIndex]?.testdevice || ""}
              onChange={(e) =>
                handleInputChange(rowIndex, "testdevice", e.target.value)
              }
            >
              <option value="">انتخاب کنید</option>
              {deviceOptions.map((device) => (
                <option key={device.id} value={device.name}>
                  {device.name}
                </option>
              ))}
            </select>
          );
        }
      }),
        sampleNameDevices,
      //multiSelectSampleNameDevices,
      columnHelper.accessor("sampleweight", {
        id: "sampleweight",
        header: "وزن نمونه",
        cell: (info) => {
          const rowIndex = info.row.index;
          const refKey = `${rowIndex}-sampleweight`;
          return (
            <input
              ref={(el) => (inputRefs.current[refKey] = el)}
              type="number"
              value={data[rowIndex]?.sampleweight || ""}
              onChange={(e) =>
                handleInputChange(rowIndex, "sampleweight", e.target.value)
              }
            />
          );
        }
      }),
      columnHelper.accessor("coliformcount", {
        id: "coliformcount",
        header: "کلی فرم",
        cell: (info) => {
          const rowIndex = info.row.index;
          const inputRef = useRef(null);
          const currentValue = data[rowIndex]?.coliformcount || "";
      
          return (
            <>
              <input
                type="text"
                list={`coliform-options-${rowIndex}`}
                placeholder="عدد یا گزینه وارد کنید"
                style={{ marginRight: "8px", width: "100%" }}
                defaultValue={currentValue} // مقدار اولیه تنظیم شود
                ref={inputRef}
                onChange={(e) => {
                  if (inputRef.current) {
                    inputRef.current.value = e.target.value; // مقدار را موقتاً در `ref` نگه‌دار
                  }
                }}
                onBlur={(e) => {
                  const val = e.target.value.trim();
                  const validList = ["<10", ">100", "غ ق ش"];
                  const isNumber = /^\d+$/.test(val);
      
                  if (validList.includes(val) || isNumber) {
                    handleInputChange(rowIndex, "coliformcount", val); // مقدار معتبر را ذخیره کن
                  } else {
                    inputRef.current.value = currentValue; // مقدار را به مقدار قبلی بازگردان
                  }
                }}
              />
              <datalist id={`coliform-options-${rowIndex}`}>
                <option value="<10">کمتر از 10</option>
                <option value=">100">بیشتر از 100</option>
                <option value="غ ق ش">غ ق ش</option>
              </datalist>
            </>
          );
        }
      }),
      
      
      columnHelper.accessor("ecolicount", {
        id: "ecolicount",
        header: "اشرشیاکلی",
        cell: (info) => {
          const rowIndex = info.row.index;
          return (
            <select
              value={data[rowIndex]?.ecolicount || ""}
              onChange={(e) =>
                handleInputChange(rowIndex, "ecolicount", e.target.value)
              }
            >
              <option value="">انتخاب کنید</option>
              <option value="مثبت">مثبت</option>
              <option value="منفی">منفی</option>
            </select>
          );
        }
      }),
      columnHelper.accessor("moldyeastcount", {
        id: "moldyeastcount",
        header: "کپک و مخمر",
        cell: (info) => {
          const rowIndex = info.row.index;
          const inputRef = useRef(null);
          const currentValue = data[rowIndex]?.moldyeastcount || "";
      
          return (
            <>
              <input
                type="text"
                list={`moldyeast-options-${rowIndex}`}
                placeholder="عدد یا گزینه وارد کنید"
                style={{ marginRight: "8px", width: "100%" }}
                defaultValue={currentValue} // مقدار اولیه تنظیم شود
                ref={inputRef}
                onChange={(e) => {
                  if (inputRef.current) {
                    inputRef.current.value = e.target.value; // مقدار را موقتاً در `ref` نگه‌دار
                  }
                }}
                onBlur={(e) => {
                  const val = e.target.value.trim();
                  const validList = ["مثبت", "منفی"];
                  const isNumber = /^\d+$/.test(val);
      
                  if (validList.includes(val) || isNumber) {
                    handleInputChange(rowIndex, "moldyeastcount", val); // مقدار معتبر را ذخیره کن
                  } else {
                    inputRef.current.value = currentValue; // مقدار را به مقدار قبلی بازگردان
                  }
                }}
              />
              <datalist id={`moldyeast-options-${rowIndex}`}>
                <option value="مثبت">مثبت</option>
                <option value="منفی">منفی</option>
              </datalist>
            </>
          );
        }
      }),
      
      columnHelper.accessor("coldcount", {
        id: "coldcount",
        header: "شمارش کلی/سرماگرا",
        cell: (info) => {
          const rowIndex = info.row.index;
          return (
            <select
              value={data[rowIndex]?.coldcount || ""}
              onChange={(e) =>
                handleInputChange(rowIndex, "coldcount", e.target.value)
              }
            >
              <option value="">انتخاب کنید</option>
              <option value="مثبت">مثبت</option>
              <option value="منفی">منفی</option>
            </select>
          );
        }
      })
    ]
  };

  const deleteColumn = columnHelper.display({
    id: "action",
    header: "حذف",
    cell: (info) => {
      const rowIndex = info.row.index;
      return (
        <button className="delete-button" onClick={() => deleteRow(rowIndex)}>
          <BsFillTrash3Fill />
        </button>
      );
    }
  });

  const dynamicColumns = columnsConfig[selectedType] || [];
  const tableColumns = [...dynamicColumns, deleteColumn];

  const table = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel()
  });

  const addRow = () => {
    setData((prevData) => [...prevData, {}]);
    setIsDirty(true);
    console.log("Row added. Current data:", [...data, {}]);
  };

  const deleteRow = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
    setIsDirty(true);
    console.log(`Row ${index} deleted. Current data:`, newData);
  };

  const saveData = async () => {
    console.log("Saving data...", data);
  
    // دریافت نام و نام خانوادگی از sessionStorage
    const firstName = sessionStorage.getItem("firstname");
    const lastName = sessionStorage.getItem("lastname");
    const fullname = `${firstName} ${lastName}`; // ترکیب نام و نام خانوادگی
  
    // اضافه کردن نام و نام خانوادگی به داده‌های ذخیره‌شده
    const updatedData = data.map((row) => ({
      ...row,
      firstName,
      lastName
    }));
  
    try {
      await axios.post("/api/save_data/", {
        tableType: selectedType,
        date: date?.format("YYYY/MM/DD"),
        data: updatedData,
        full_name: fullname

      });
  
      alert("✅ داده‌ها با موفقیت ذخیره شد!");
      setIsDirty(false);
      console.log("Data saved with user info:", updatedData);
    } catch (error) {
      console.error("❌ خطا در ذخیره داده‌ها:", error);
      alert("خطایی در ذخیره داده‌ها رخ داد!");
    }
  };
  

  const handleBeforeUnload = useCallback(
    (event) => {
      if (isDirty) {
        const message =
          "تغییرات شما ذخیره نشده است. آیا مطمئن هستید که صفحه را ترک کنید؟";
        event.returnValue = message;
        return message;
      }
    },
    [isDirty]
  );

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [handleBeforeUnload]);

  return (
    <div className="input-lab-container">
      <div className="filter-row">
        <div className="filter-item">
          <label htmlFor="productType">نوع جدول:</label>
          <select
            id="productType"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">انتخاب کنید</option>
            <option value="ProcessReport">مشخصات کره و دوغ مخزن</option>
            <option value="OutputMilk">مشخصات دوغ خروجی</option>
            <option value="InputCream">مشخصات خامه‌های ورودی</option>
            <option value="Devices">گزارش کیفی بسته‌بندی</option>
          </select>
        </div>
        <div className="filter-item">
          <label>تاریخ:</label>
          <DatePicker
            value={date}
            onChange={setDate}
            calendar={persian}
            locale={persian_fa}
            inputClass="date-input"
            format="YYYY/MM/DD"
          />
        </div>
      </div>
      {selectedType && (
        <BTable striped bordered hover responsive>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </BTable>
      )}
      <button onClick={addRow}>
        <FiPlus />
      </button>
      <button onClick={saveData}>
        <FiSave />
      </button>
    </div>
  );
}

InputLab.propTypes = {
  isDirty: PropTypes.bool,
  setIsDirty: PropTypes.func
};

export default InputLab;
