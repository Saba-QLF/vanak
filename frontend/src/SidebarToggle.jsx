import { useState } from "react";

const SidebarToggle = () => {
    const [isActive, setIsActive] = useState(false);

    const toggleSidebar = () => {
        setIsActive(!isActive);
    };

    return (
        <div className="flex">
            {/* سایدبار */}
            <div className={`sidebar ${isActive ? "active" : ""}`}>محتوای سایدبار</div>

            {/* دکمه تغییر وضعیت */}
            <button id="toggle-button" onClick={toggleSidebar} className="ml-4 p-2 bg-gray-800 text-white rounded">
                {isActive ? (
                    <i className="bxs-left-arrow"></i> // آیکون بستن
                ) : (
                    <i className="bxs-right-arrow"></i> // آیکون باز کردن
                )}
            </button>
        </div>
    );
};

export default SidebarToggle;
