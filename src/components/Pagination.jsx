import React, { useState, useEffect } from "react";
import {
    MdKeyboardDoubleArrowLeft,
    MdOutlineKeyboardArrowLeft,
} from "react-icons/md";

const Pagination = ({ limit, skip, total, incOrDecSkip, updateSkip }) => {
    const totalPages = Math.ceil(total / limit);
    const currentPage = skip + 1;

    console.log(currentPage, totalPages, limit, skip, "current page: ");
    const handleFirstPage = () => {
        if (currentPage > 1) {
            updateSkip(0); // Set to the first page (skip = 0)
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            console.log(currentPage, skip);
            incOrDecSkip(skip - 1); // Decrease skip by the limit to go back a page
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            console.log(currentPage, skip);

            incOrDecSkip(skip + 1); // Increase skip by the limit to go forward a page
        }
    };

    const handleLastPage = () => {
        if (currentPage < totalPages) {
            updateSkip(totalPages - 1); // Set to the last page (skip = (totalPages - 1) * limit)
        }
    };

    return (
        <div className="flex bg-mainBg inline-flex items-center justify-end my-2 border space-x-1 sm:space-x-3 h-8 sm:h-12 px-2 sm:px-4">
            {/* First Page Button */}
            <div>
                <MdKeyboardDoubleArrowLeft
                    className={`text-customGray text-xl hover:text-customGray ${
                        currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    aria-label="Go to first page"
                    onClick={handleFirstPage}
                    disabled={currentPage === 1}
                />
            </div>

            {/* Previous Page Button */}

            <MdOutlineKeyboardArrowLeft
                className={`text-customGray text-xl hover:text-customGray ${
                    currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                aria-label="Go to previous page"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
            />

            {/* Page Indicator */}
            <span className="text-customGray font-semibold">
                {currentPage} / {totalPages}
            </span>

            {/* Next Page Button */}
            <div
                className={`text-customGray hover:text-customGray ${
                    currentPage === totalPages
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                }`}
                aria-label="Go to next page"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-right"
                >
                    <path d="m9 18 6-6-6-6"></path>
                </svg>
            </div>

            {/* Last Page Button */}
            <div
                className={`text-customGray hover:text-customGray ${
                    currentPage === totalPages
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                }`}
                aria-label="Go to last page"
                onClick={handleLastPage}
                disabled={currentPage === totalPages}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevrons-right"
                >
                    <path d="m6 17 5-5-5-5"></path>
                    <path d="m13 17 5-5-5-5"></path>
                </svg>
            </div>
        </div>
    );
};

export default Pagination;
