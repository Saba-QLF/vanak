import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Header/HeaderL";
import { Container, Row, Col, Form, Table } from "react-bootstrap";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "/src/assets/font.css";

import { createColumnHelper } from "@tanstack/react-table";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

function DynamicTabsPage() {
  const [filters, setFilters] = useState({
    tableType: "",
    fromDate: null,
    toDate: null,
  });
  const [records, setRecords] = useState({ data: [], columns: [] });
  const [tabs, setTabs] = useState([]);
  const [activeTabId, setActiveTabId] = useState(null);
  const [muiTabIndex, setMuiTabIndex] = useState(0);

  const tableTypeDisplayMap = {
    InputCream: "مشخصات خامه‌های ورودی",
    ProcessReport: "مشخصات کره و دوغ مخزن",
    Outputmilk: "مشخصات دوغ خروجی",
    Devices: "گزارش ستون بسته‌بندی",
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    if (field === "tableType" && value === "") {
      setRecords({ data: [], columns: [] });
      setTabs([]);
      setActiveTabId(null);
      setMuiTabIndex(0);
    }
  };

  useEffect(() => {
    if (!filters.tableType) return;

    const fetchRecords = async () => {
      try {
        const response = await axios.get("/api/records/", {
          params: {
            tableType: filters.tableType,
            fromDate: filters.fromDate ? filters.fromDate.format("YYYY/MM/DD") : null,
            toDate: filters.toDate ? filters.toDate.format("YYYY/MM/DD") : null,
          },
        });

        const columnHelper = createColumnHelper();
        const columns = [
          columnHelper.accessor("date", { header: "تاریخ ثبت" }),
          columnHelper.accessor("fullname", { header: "نام کاربر ثبت‌کننده" }),
        ];

        setRecords({ data: response.data, columns });

        const tableContent = (
          <div>
            {response.data.length > 0 ? (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    {columns.map((col, idx) => (
                      <th key={idx}>{col.header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {response.data.map((rec, rIdx) => (
                    <tr key={rIdx}>
                      {columns.map((col, cIdx) => {
                        const accessorKey = col.accessorKey || col.id;
                        const cellValue = rec[accessorKey];
                        if (accessorKey === "date") {
                          return (
                            <td
                              key={cIdx}
                              style={{ color: "blue", cursor: "pointer" }}
                              onClick={() => handleOpenTab(rec)}
                            >
                              {cellValue}
                            </td>
                          );
                        }
                        return <td key={cIdx}>{cellValue}</td>;
                      })}
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p>داده‌ای برای نمایش وجود ندارد.</p>
            )}
          </div>
        );

        const pinnedTitle = tableTypeDisplayMap[filters.tableType] || filters.tableType;

        setTabs((prevTabs) => {
          const pinnedTab = prevTabs.find((tab) => tab.id === "pinned-table-type");
          if (pinnedTab) {
            return prevTabs.map((tab) =>
              tab.id === "pinned-table-type"
                ? { ...tab, title: pinnedTitle, content: tableContent }
                : tab
            );
          } else {
            return [
              ...prevTabs,
              {
                id: "pinned-table-type",
                title: pinnedTitle,
                content: tableContent,
                closable: false,
              },
            ];
          }
        });
        setActiveTabId("pinned-table-type");
      } catch (error) {
        console.error("خطا در دریافت اطلاعات:", error);
        alert("خطایی در دریافت اطلاعات رخ داد.");
      }
    };

    fetchRecords();
  }, [filters.tableType, filters.fromDate, filters.toDate]);

  const detailColumnsMap = {
    InputCream: [
      { header: "نام تأمین کننده", key: "supplier" },
      { header: "PH", key: "ph" },
      { header: "Acid", key: "acid" },
      { header: "Fat", key: "fat" },
      { header: "SNF", key: "snf" },
      { header: "وزن", key: "weight" },
    ],
    ProcessReport: [
      { header: "رنگ", key: "color" },
      { header: "شماره پالت", key: "palletnumber" },
      { header: "نام تأمین کننده", key: "supplier" },
      { header: "Fat", key: "fatbutter" },
      { header: "شماره مخزن", key: "tanknumber" },
      { header: "اسیدیته", key: "acidbutter" },
      { header: "PH دوغ مخزن", key: "phbuttermilk" },
      { header: "Acid دوغ مخزن", key: "acidbuttermilk" },
      { header: "Fat دوغ مخزن", key: "fatbuttermilk" },
      { header: "SNF دوغ مخزن", key: "snfbuttermilk" },
    ],
    Outputmilk: [
      { header: "محل ارسال", key: "supplier" },
      { header: "PH", key: "ph" },
      { header: "Acid", key: "acid" },
      { header: "Fat", key: "fat" },
      { header: "SNF", key: "snf" },
      { header: "وزن", key: "weight" },
    ],
    Devices: [
      { header: "دستگاه", key: "testdevice" },
      { header: "نام نمونه", key: "samplename" },
      { header: "وزن", key: "sampleweight" },
      { header: "کلی فرم", key: "coliformcount" },
      { header: "اشرشیاکلی", key: "ecolicount" },
      { header: "کپک و مخمر", key: "moldyeastcount" },
      { header: "شمارش کلی/سرماگرا", key: "coldcount" },
    ],
  };

  const handleOpenTab = async (record) => {
    try {
      const res = await axios.get("/api/records/details/", {
        params: {
          batchid: record.batchid,
          tableType: filters.tableType,
        },
      });

      const detailData = res.data;
      const detailColumns = detailColumnsMap[filters.tableType] || [];
      const detailTitle = tableTypeDisplayMap[filters.tableType] || filters.tableType;

      const detailTable = (
        <div>
          <h5 style={{ textAlign: "center", marginBottom: "15px" }}>
            {detailTitle}
          </h5>
          {detailData.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  {detailColumns.map((col, idx) => (
                    <th key={idx}>{col.header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {detailData.map((row, rIdx) => (
                  <tr key={rIdx}>
                    {detailColumns.map((col, cIdx) => (
                      <td key={cIdx}>{row[col.key]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>داده‌ای برای نمایش جزئیات وجود ندارد.</p>
          )}
        </div>
      );

      const newTab = {
        id: Date.now().toString(),
        title: `${record.date}`,
        content: detailTable,
        closable: true,
      };

      setTabs((prev) => [...prev, newTab]);
      setActiveTabId(newTab.id);
    } catch (error) {
      console.error("خطا در دریافت جزئیات:", error);
      alert("خطایی در دریافت جزئیات رخ داد!");
    }
  };

  const handleCloseTab = (tabId) => {
    const closingTab = tabs.find((t) => t.id === tabId);
    if (!closingTab || closingTab.closable === false) return;
    setTabs((prev) => prev.filter((tab) => tab.id !== tabId));
    if (activeTabId === tabId) {
      const remaining = tabs.filter((t) => t.id !== tabId);
      setActiveTabId(remaining.length > 0 ? remaining[remaining.length - 1].id : null);
    }
  };

  const handleMuiTabChange = (event, newIndex) => {
    setMuiTabIndex(newIndex);
    if (tabs[newIndex]) {
      setActiveTabId(tabs[newIndex].id);
    }
  };

  useEffect(() => {
    const idx = tabs.findIndex((t) => t.id === activeTabId);
    if (idx !== -1) {
      setMuiTabIndex(idx);
    }
  }, [tabs, activeTabId]);

  return (
    <Container
      fluid
      style={{
        maxWidth: "1300px",
        margin: "0 auto",
        // overflowX: "hidden" را حذف یا کامنت کنید
        //overflowX: "hidden",
      }}
    >
      {/* بخش فیلترها */}
      <Row
        style={{
          display: "flex",
          flexWrap: "wrap",        // در صورت کمبود فضا، فیلدها در خط بعدی قرار بگیرند
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "20px",
          padding: "10px 15px",
          marginBottom: "15px",
        }}
      >
        {/* انتخاب نوع جدول */}
        <Col
          md={3}
          style={{
            position: "relative",
            background: "white",
            borderRadius: "12px",
            padding: "14px 18px",
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
            transition: "all 0.3s ease-in-out",
          }}
        >
          <Form.Group>
            <Form.Label
              style={{
                position: "absolute",
                top: "10px",
                right: "18px",
                fontSize: "14px",
                color: "#888",
                background: "white",
                padding: "0 6px",
                transition: "all 0.3s ease-in-out",
              }}
            >
              نوع جدول:
            </Form.Label>
            <Form.Select
              value={filters.tableType}
              onChange={(e) => handleFilterChange("tableType", e.target.value)}
              style={{
                width: "100%",
                height: "62px",
                fontSize: "14px",
                padding: "10px 14px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                backgroundColor: "transparent",
              }}
            >
              <option value="">انتخاب کنید</option>
              <option value="InputCream">مشخصات خامه‌های ورودی</option>
              <option value="ProcessReport">مشخصات کره و دوغ مخزن</option>
              <option value="Outputmilk">مشخصات دوغ خروجی</option>
              <option value="Devices">گزارش ستون بسته‌بندی</option>
            </Form.Select>
          </Form.Group>
        </Col>

        {/* تاریخ شروع */}
        <Col
          md={3}
          style={{
            position: "relative",
            background: "white",
            borderRadius: "12px",
            padding: "14px 18px",
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
            transition: "all 0.3s ease-in-out",
          }}
        >
          <Form.Group>
            <Form.Label
              style={{
                position: "absolute",
                top: "10px",
                right: "18px",
                fontSize: "14px",
                color: "#888",
                background: "white",
                padding: "0 6px",
                transition: "all 0.3s ease-in-out",
              }}
            >
              از تاریخ:
            </Form.Label>
            <DatePicker
              value={filters.fromDate}
              onChange={(date) => handleFilterChange("fromDate", date)}
              calendar={persian}
              locale={persian_fa}
              format="YYYY/MM/DD"
              inputClass="date-input"
              style={{
                width: "100%",
                height: "62px",
                fontSize: "14px",
                padding: "10px 14px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                backgroundColor: "transparent",
                zIndex: 9999 // در صورت نیاز برای نمایش بالاتر از سایر المان‌ها
              }}
            />
          </Form.Group>
        </Col>

        {/* تاریخ پایان */}
        <Col
          md={3}
          style={{
            position: "relative",
            background: "white",
            borderRadius: "12px",
            padding: "14px 18px",
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
            transition: "all 0.3s ease-in-out",
          }}
        >
          <Form.Group>
            <Form.Label
              style={{
                position: "absolute",
                top: "10px",
                right: "18px",
                fontSize: "14px",
                color: "#888",
                background: "white",
                padding: "0 6px",
                transition: "all 0.3s ease-in-out",
              }}
            >
              تا تاریخ:
            </Form.Label>
            <DatePicker
              value={filters.toDate}
              onChange={(date) => handleFilterChange("toDate", date)}
              calendar={persian}
              locale={persian_fa}
              format="YYYY/MM/DD"
              inputClass="date-input"
              style={{
                width: "100%",
                height: "62px",
                fontSize: "14px",
                padding: "10px 14px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                backgroundColor: "transparent",
                zIndex: 9999 // در صورت نیاز
              }}
            />
          </Form.Group>
        </Col>
      </Row>

      {tabs.length > 0 && (
        <>
          <Row>
            <Col>
              <div
                style={{
                  width: tabs.length > 4 ? "800px" : "100%",
                  overflowX: "auto",
                }}
              >
                <Tabs
                  variant="scrollable"
                  scrollButtons="auto"
                  allowScrollButtonsMobile
                  value={muiTabIndex}
                  onChange={handleMuiTabChange}
                  sx={{
                    minHeight: "48px",
                    fontFamily: "Vazirmatn-Light",
                    ".MuiTab-root": {
                      minHeight: "48px",
                      fontSize: "1.0rem",
                      fontFamily: "Vazirmatn-Light",
                    },
                  }}
                >
                  {tabs.map((tab) => (
                    <Tab
                      key={tab.id}
                      label={
                        <div style={{ display: "flex", alignItems: "center" }}>
                          {tab.title}
                          {tab.closable !== false && (
                            <span
                              style={{
                                marginLeft: 8,
                                color: "#797d7f",
                                cursor: "pointer",
                                fontSize: "1.4rem",
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCloseTab(tab.id);
                              }}
                            >
                              &times;
                            </span>
                          )}
                        </div>
                      }
                    />
                  ))}
                </Tabs>
              </div>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col>
              {tabs.map(
                (tab, index) =>
                  index === muiTabIndex && <div key={tab.id}>{tab.content}</div>
              )}
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}

export default DynamicTabsPage;
