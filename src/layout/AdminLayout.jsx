import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

// import { Sidebar, Header } from "../components";

export default function AdminLayout() {
    console.log("admin layout");

    return (
        <div>
            {/* <Sidebar /> */}
            <main className="">
                {/* <div className="layout"> */}
                <div>
                    <Header />
                    <div className="">
                        <Outlet />
                    </div>
                </div>
            </main>
            {(import.meta.env.VITE_NODE_ENV === "TEST_LIVE" ||
                import.meta.env.VITE_NODE_ENV === "TEST_LOCAL") && (
                <div className="fixed bg-red-500 top-0 left-[50%] translate-x-[-50%] px-3 rounded-b py-1 text-white text-sm font-[600] ">
                    DEBUG
                </div>
            )}
        </div>
    );
}
