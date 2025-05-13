import React from "react";

export default function BtnLoader() {
    return (
        <button className="flex  h-full p-1 bg-customGray items-center justify-center">
            <div className="w-[25px] h-[25px] rounded-full border-4 border-r-transparent animate-spin"></div>
        </button>
    );
}
