import React from "react";
import logo from "../../src/assets/images/logo.jpg";

export default function PageLoader() {
    return (
        <div className="fixed inset-0 flex max-h-full max-w-full justify-center items-center bg-white z-50">
            <img
                className="object-contain max-h-full max-w-full"
                src={logo}
                alt="Desireign"
            />
        </div>
    );
}
