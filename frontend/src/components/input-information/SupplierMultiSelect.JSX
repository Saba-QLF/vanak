import React, { useState, useEffect, useRef } from "react";

function SupplierMultiSelectCell({
  rowIndex,
  fieldKey,
  data,
  setData,
  supplierOptions
}) {
  const selectedSuppliers = data[rowIndex]?.[fieldKey] || [];
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(supplierOptions);
  const inputRef = useRef(null);

  useEffect(() => {
    if (searchTerm.trim()) {
      setFilteredOptions(
        supplierOptions.filter((supplier) => {
          const words = supplier.label.toLowerCase().split(" ");
          return words.some((word) =>
            word.startsWith(searchTerm.toLowerCase())
          );
        })
      );
    } else {
      setFilteredOptions(supplierOptions);
    }
  }, [searchTerm, supplierOptions]);

  const handleAddSupplier = (supplierValue) => {
    if (supplierValue && !selectedSuppliers.includes(supplierValue)) {
      setData((prevData) => {
        const newData = [...prevData];
        newData[rowIndex] = {
          ...newData[rowIndex],
          [fieldKey]: [...selectedSuppliers, supplierValue]
        };
        return newData;
      });
    }
    setSearchTerm("");
  };

  const handleRemoveSupplier = (supplierValue) => {
    setData((prevData) => {
      const newData = [...prevData];
      newData[rowIndex][fieldKey] = newData[rowIndex][fieldKey].filter(
        (item) => item !== supplierValue
      );
      return newData;
    });
  };

  return (
    <div className="multi-select-container">
      <div className="selected-suppliers">
        {selectedSuppliers.map((supplierVal, index) => (
          <span key={index} className="selected-item">
            {supplierVal}
            <button
              className="remove-btn"
              onClick={() => handleRemoveSupplier(supplierVal)}
            >
              ×
            </button>
          </span>
        ))}
      </div>

      <input
        ref={inputRef}
        type="text"
        placeholder="نام تأمین‌کننده را تایپ کنید..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setFilteredOptions(supplierOptions)}
      />

      {searchTerm.trim() && filteredOptions.length > 0 && (
        <div className="dropdown-options">
          {filteredOptions.map((suppObj, idx) => (
            <div
              key={idx}
              className="dropdown-item"
              onClick={() => handleAddSupplier(suppObj.value)}
            >
              {suppObj.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SupplierMultiSelectCell;
