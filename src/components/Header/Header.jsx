import React, { useRef, useState } from "react";
import { PiUserCircleLight } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useHandleClickOutside } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { logoutAdmin } from "../../redux/slices/adminSlice";
import DashboardModal from "../../features/Dashboard/DashboardModal";
import logo from "../../../src/assets/images/logoNoBg.png";
import { config } from "../../constants";

function Header() {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); // For user dropdown
    const [isDashboardModalOpen, setIsDashboardModalOpen] = useState(false); // For dashboard modal

    const dispatch = useDispatch();
    const { admin } = useSelector((state) => state.admin);

    // Refs for each modal dropdown to handle outside clicks
    const userMenuRef = useRef();
    const dashboardModalRef = useRef();

    // Use custom hook to detect outside clicks
    useHandleClickOutside(userMenuRef, () => setIsUserMenuOpen(false)); // Close user menu
    useHandleClickOutside(dashboardModalRef, () =>
        setIsDashboardModalOpen(false)
    ); // Close dashboard modal

    // Toggle functions
    const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);
    const toggleDashboardModal = () =>
        setIsDashboardModalOpen(!isDashboardModalOpen);

    return (
        <div>
            <nav className="fixed top-0 inset-x-0 z-20 bg-mainBg">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 md:px-6 lg:px-4">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="flex pt-1 w-[250px] h-[80px]  ">
                            <div className=" flex  items-center justify-start ">
                                <Link to="">
                                    <img
                                        className="w-full h-full object-contain hover:cursor-pointer"
                                        src={logo}
                                        alt="Desireign"
                                    />
                                </Link>
                            </div>
                        </div>
                        <div className="flex items-center pr-2 sm:ml-6 sm:pr-0">
                            {/* Dashboard Modal Toggle */}
                            <div className="relative">
                                <div
                                    className="flex items-center rounded-full text-sm focus:outline-none"
                                    id="headlessui-menu-button"
                                    type="button"
                                    aria-haspopup="menu"
                                    aria-expanded={
                                        isDashboardModalOpen ? "true" : "false"
                                    }
                                    onClick={toggleDashboardModal}
                                >
                                    <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        stroke-width="0"
                                        viewBox="0 0 24 24"
                                        className="text-2xl md:text-3xl text-black cursor-pointer"
                                        height="1em"
                                        width="1em"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill="none"
                                            d="M0 0h24v24H0V0z"
                                        ></path>
                                        <path d="M19 5v2h-4V5h4M9 5v6H5V5h4m10 8v6h-4v-6h4M9 17v2H5v-2h4M21 3h-8v6h8V3zM11 3H3v10h8V3zm10 8h-8v10h8V11zm-10 4H3v6h8v-6z"></path>
                                    </svg>
                                </div>{" "}
                                {/* Dashboard Modal */}
                                {isDashboardModalOpen && (
                                    <div
                                        className=" bg-white border rounded-lg shadow-lg"
                                        ref={dashboardModalRef}
                                    >
                                        <DashboardModal
                                            isDashboardModalOpen={
                                                isDashboardModalOpen
                                            }
                                            setIsDashboardModalOpen={
                                                setIsDashboardModalOpen
                                            }
                                        />
                                    </div>
                                )}
                            </div>

                            {/* User Dropdown */}
                            <div
                                className="relative ml-5 hover:cursor-pointer"
                                ref={userMenuRef}
                            >
                                <div>
                                    <div
                                        className="flex items-center rounded-full text-sm focus:outline-none"
                                        onClick={toggleUserMenu}
                                    >
                                        <PiUserCircleLight className="text-black text-3xl" />
                                        <div className="hidden sm:ml-2 sm:flex sm:flex-col sm:justify-start items-start text-black font-medium">
                                            <p className="text-xs md:text-sm lg:text-md">
                                                {admin.name}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {new Date(
                                                    admin.lastLoggedIn
                                                ).toLocaleTimeString([], {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </p>
                                        </div>
                                    </div>

                                    {/* User Dropdown Menu */}
                                    {isUserMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                                            <div className="py-2">
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                                                >
                                                    Profile
                                                </a>
                                                <a
                                                    href="#"
                                                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                                                >
                                                    Settings
                                                </a>
                                                <Link
                                                    to="/"
                                                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                                                    onClick={() => {
                                                        dispatch(logoutAdmin());
                                                    }}
                                                >
                                                    Logout
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;
