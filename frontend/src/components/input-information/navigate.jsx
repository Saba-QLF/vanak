import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const useNavigationPrompt = (isFormDirty, isSaved) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            if (isFormDirty && !isSaved) {
                event.preventDefault();
                event.returnValue = "آیا مطمئن هستید که می‌خواهید بدون ذخیره تغییرات خارج شوید؟";
            }
        };

        const handleNavigation = (event) => {
            if (isFormDirty && !isSaved) {
                const confirmLeave = window.confirm("شما تغییراتی انجام داده‌اید، آیا می‌خواهید بدون ذخیره خارج شوید؟");
                if (!confirmLeave) {
                    event.preventDefault();
                }
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        window.addEventListener("popstate", handleNavigation);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            window.removeEventListener("popstate", handleNavigation);
        };
    }, [isFormDirty, isSaved, navigate, location]);
};

export default useNavigationPrompt;
