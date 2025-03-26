import React from "react";
import { useNavigate } from "react-router-dom";
import { removeCookie } from "../../utils/cookieUtils";

const LogoutBtn = () => {
    const navi = useNavigate();

    const handleLogout = () => {
            alert("로그아웃 되었습니다");
            removeCookie('member')
            navi('/login', { replace: true })
    };

    return (
        <button
            className="bg-transparent hover:text-red-600 py-2 px-4 rounded shadow-lg transform hover:scale-105 transition-transform duration-100"
            onClick={handleLogout}
        >
            Logout
        </button>
    );
};

export default LogoutBtn;