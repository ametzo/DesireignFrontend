import React from "react";

function LoginLoader() {
    return (
        <button className="flex w-full h-full p-1 bg-customGray items-center justify-center">
            <div className="w-[25px] h-[25px] rounded-full border-4 border-r-transparent animate-spin"></div>
        </button>
    );
}

export default LoginLoader;
