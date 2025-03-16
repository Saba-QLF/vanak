import { useState } from "react";
import { Col, Row, Form } from "react-bootstrap";
import DataTable from "./datatable.jsx";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

export default function DataDashbordApp() {
    return <DataDashbord />;
}

function DataDashbord() {
    const [filters, setFilters] = useState({
        date: null,
        tableType: "",
    });

    const [showTable, setShowTable] = useState(false);

    // تبدیل اعداد فارسی به انگلیسی
   // const convertToEnglishNumbers = (str) => {
      //  return str.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
   // };

    // تغییر مقدار ورودی فیلترها
    const handleInputChange = (name, value) => {
        if (name === "date" && value) {
            const formattedDate = (value.format("YYYY/MM/DD"));
            setFilters((prevFilters) => ({ ...prevFilters, [name]: formattedDate }));
        } else {
            setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));

            // ✅ اگر مقدار نوع جدول "انتخاب کنید" باشد، جدول نمایش داده نشود
            if (name === "tableType" && value === "") {
                setShowTable(false);
            }
        }
    };

    // دکمه نمایش جدول
    const handleSearch = () => {
        if (filters.date && filters.tableType) {
            console.log("📌 تاریخ ارسالی به سرور:", filters.date);
            console.log("📌 نوع جدول انتخاب‌شده:", filters.tableType);
            setShowTable(true);
        } else {
            alert("لطفاً تمام فیلدها را پر کنید.");
        }
    };

    return (
        <Col md={12} xs={12} className="p-5">
            <Row>
                {/* ✅ بخش فیلترها */}
                <Col md={12} xs={12} className="px-3 py-2">
                    <div className="border p-3 filter-row">
                        <div className="filter-container">
                            
                            {/* ✅ فیلد نوع جدول */}
                            <div className="filter-item">
                                <Form.Group className="mb-3">
                                    <Form.Label>نوع جدول:</Form.Label>
                                    <Form.Select
                                        name="tableType"
                                        value={filters.tableType}
                                        onChange={(e) => handleInputChange("tableType", e.target.value)}
                                    >
                                        <option value="">انتخاب کنید</option>
                                        <option value="InputCream">- مشخصات خامه‌های ورودی</option>
                                        <option value="ProcessReport">- مشخصات کره و دوغ مخزن</option>
                                        <option value="Outputmilk">- مشخصات دوغ خروجی</option>
                                        <option value="Devices">- گزارش ستون بسته بندی</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>

                            {/* ✅ فیلد تاریخ */}
                            <div className="filter-item">
                                <Form.Group className="mb-3">
                                    <Form.Label>تاریخ:</Form.Label>
                                    <DatePicker
                                        value={filters.date}
                                        onChange={(value) => handleInputChange("date", value)}
                                        calendar={persian}
                                        locale={persian_fa}
                                        inputClass="date-input"
                                        format="YYYY/MM/DD"
                                    />
                                </Form.Group>
                            </div>
                        </div>

                        {/* ✅ دکمه نمایش جدول */}
                        <div className="button-container">
                            <button className="search-button" onClick={handleSearch}>
                             نمایش جدول
                            </button>
                        </div>
                    </div>
                </Col>
            </Row>

            {/* ✅ نمایش جدول در صورت انتخاب فیلترها */}
            {showTable && (
                <Row className="mt-4">
                    <Col md={12}>
                        <DataTable filters={filters} />
                    </Col>
                </Row>
            )}
        </Col>
    );
}
