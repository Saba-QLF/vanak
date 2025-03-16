import React, { useState } from "react";
import "./chat.css";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const Chat = () => {
    const [selectedType, setSelectedType] = useState("");
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    };

    return (
        <div className="chat-container">
            <h2 className="chat-title">گزارشات تولید</h2>

            <div className="filter-row">
                <div className="filter-item">
                    <label htmlFor="productType">نوع تولید:</label>
                    <select id="productType" value={selectedType} onChange={handleTypeChange}>
                        <option value="">انتخاب کنید</option>
                        <option value="ProcessReport">مشخصات کره و دوغ مخزن</option>
                        <option value="Outputmilck">مشخصات دوغ خروجی</option>
                        <option value="InputCream">مشخصات خامه های ورودی</option>
                    </select>
                </div>
                <div className="filter-item">
                    <label>از تاریخ:</label>
                    <DatePicker
                        value={fromDate}
                        onChange={setFromDate}
                        calendar={persian}
                        locale={persian_fa}
                        inputClass="date-input"
                        format="YYYY/MM/DD"
                    />
                </div>
                <div className="filter-item">
                    <label>تا تاریخ:</label>
                    <DatePicker
                        value={toDate}
                        onChange={setToDate}
                        calendar={persian}
                        locale={persian_fa}
                        inputClass="date-input"
                        format="YYYY/MM/DD"
                    />
                </div>
            </div>

            {selectedType && (
                <div className="dynamic-filters">
                    {selectedType === "ProcessReport" && (
                        <div className="ProcessReport">
                            <h3>فیلترهای مربوط به کره و دوغ مخزن</h3>
                            <label htmlFor="PalletNumber">شماره پالت:</label>
                            <input id="PalletNumber" type="text" placeholder="شماره پالت را وارد کنید" />
                            <label htmlFor="supplier">تأمین‌کننده:</label>
                            <input id="supplier" type="text" placeholder="نام تأمین‌کننده را وارد کنید" />
                            <label htmlFor="Color">رنگ:</label>
                            <input id="Color" type="text" placeholder="رنگ را وارد کنید" />
                            
                            <label htmlFor="FatButter">درصد چربی:</label>
                            <input id="FatButter" type="number" placeholder="درصد چربی را وارد کنید" />

                            <label htmlFor="TankNumber">شماره مخزن:</label>
                            <input id="TankNumber" type="text" placeholder="شماره مخزن را وارد کنید" />

                            <label htmlFor="AcidButter">اسیدیته:</label>
                            <input id="AcidButter" type="number" placeholder="مقدار اسیدیته را وارد کنید" />

                            <label htmlFor="PHButtermilk"> دوغ مخزن (PH):</label>
                            <input id="PHButtermilk" type="number" placeholder="pH دوغ مخزن را وارد کنید" />

                            <label htmlFor="AcidButtermilk"> دوغ مخزن (Acid):</label>
                            <input id="AcidButtermilk" type="number" placeholder="اسید دوغ مخزن را وارد کنید" />

                            <label htmlFor="FatButtermilk">چربی دوغ مخزن (Fat Buttermilk):</label>
                            <input id="FatButtermilk" type="number" placeholder="چربی دوغ مخزن را وارد کنید" />

                            <label htmlFor="SNFButtermilk"> دوغ مخزن (SNF):</label>
                            <input id="SNFButtermilk" type="number" placeholder="SNF دوغ مخزن را وارد کنید" />
                        </div>
                    )}

                    {selectedType ==="Outputmilck" && (
                        <div className="filter-group">
                            <h3>فیلترهای مربوط به دوغ خروجی</h3>
                            <label htmlFor="supplier">محل ارسال:</label>
                            <input id="supplier" type="text" placeholder="محل ارسال را وارد کنید" />

                            <label htmlFor="PH"> PH:</label>
                            <input id="PH" type="number" placeholder="pH را وارد کنید" />

                            <label htmlFor="Acid"> (Acid):</label>
                            <input id="Acid" type="number" placeholder="مقدار اسید را وارد کنید" />

                            <label htmlFor="Fat">چربی (Fat):</label>
                            <input id="Fat" type="number" placeholder="چربی را وارد کنید" />

                            <label htmlFor="SNF"> SNF:</label>
                            <input id="SNF" type="number" placeholder="SNF را وارد کنید" />

                            <label htmlFor="Weight">وزن:</label>
                            <input id="Weight" type="number" placeholder="وزن را وارد کنید" />
                        </div>
                    )}

                    {selectedType === "InputCream" && (
                        <div className="filter-group">
                            <h3>فیلترهای مربوط به خامه ورودی</h3>
                            <label htmlFor="supplier">نام تامین کننده:</label>
                            <input id="supplier" type="text" placeholder="نام تامین کننده را وارد کنید" />
                            
                            <label htmlFor="PH"> PH:</label>
                            <input id="PH" type="number" placeholder="pH را وارد کنید" />

                            <label htmlFor="Acid"> Acid:</label>
                            <input id="Acid" type="number" placeholder="مقدار اسید را وارد کنید" />

                            <label htmlFor="Fat">چربی (Fat):</label>
                            <input id="Fat" type="number" placeholder="چربی را وارد کنید" />

                            <label htmlFor="SNF"> SNF:</label>
                            <input id="SNF" type="number" placeholder="SNF را وارد کنید" />

                            <label htmlFor="Weight">وزن:</label>
                            <input id="Weight" type="number" placeholder="وزن را وارد کنید" />
                        </div>
                    )}

                    <button className="filter-button">جستجو</button>
                </div>
            )}
        </div>
    );
};

export default Chat;
