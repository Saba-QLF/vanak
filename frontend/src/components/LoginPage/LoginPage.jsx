import React, { useState } from "react";
import "./LoginPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "./Final Eyerik 2-57.png";
import Eyric from "./Final Eyerik 2-53.png";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post("/api/login/", { username, password });
            console.log("Login successful:", response.data);
            const { firstname, lastname } = response.data;
            sessionStorage.setItem("firstname", firstname);
            sessionStorage.setItem("lastname", lastname);
            if (response.data.redirect) {
                navigate(response.data.redirect);
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("نام کاربری یا رمز عبور نادرست است");
        }
    };

    return (
        <div className="login-container">
            {/* بخش سمت چپ */}
            <div className="left-section">
                <div className="logo-circle">
                    <img src={logo} alt="Logo" className="logo-image" />
                    <h2>اتوماسیون پایش تولید آیریک</h2>
                </div>

                {/* لوگوی محو شده پایین سمت چپ */}
                <div className="logo-eyric">
                    <img src={Eyric} alt="Eyric" className="Eyric-image" />
                    <h2>All rights reserved</h2>
                </div>
            </div>

            {/* بخش سمت راست */}
            <div className="right-section">
                <div className="login-box">
                    <h3>ورود به حساب کاربری</h3>
                    {error && <p className="error-message">{error}</p>}
                    <form onSubmit={handleLogin}>
                        <div className="input-container">
                            <input 
                                type="text" 
                                placeholder="نام کاربری" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)} 
                                required
                            />
                        </div>
                        <div className="input-container">
                            <input 
                                type="password" 
                                placeholder="رمز عبور" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required
                            />
                        </div>
                        <div className="select-container">
                            <select defaultValue="ونک سرور">
                                <option value="ونک سرور">ونک سرور</option>
                            </select>
                        </div>
                        <button type="submit" className="login-btn">ورود</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
