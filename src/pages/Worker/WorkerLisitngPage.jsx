import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axiosBase from "../../axios";
import { PageLoader } from "../../components";
import Pagination from "../../components/Pagination";
import WorkersTable from "../../features/Worker/WorkerTable";
import usePermission from "../../hooks/usePermission";
// import WorkersTable from "../../features/Worker/WorkerTable";
// import WorkerTable from "../../features/Leads/LeadsTable";

function WorkerListingPage() {
    const [WorkerList, setWorkerList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState({
        skip: 0,
        limit: 10,
        totalWorkerList: 0,
        searchQuery: "",
    });

    const jwtToken = localStorage.getItem("jwtToken");

    const fetchWorkerList = async () => {
        try {
            setIsLoading(true);
            const response = await axiosBase.get(
                `/workers/all?skip=${filters.skip}&limit=${filters.limit}&searchQuery=${filters.searchQuery}`,
                {
                    headers: { authorization: `Bearer ${jwtToken}` },
                }
            );

            setWorkerList(response?.data?.workers);
            setFilters((prev) => {
                return {
                    ...prev,
                    totalWorkerList: response?.data?.totalWorkers,
                };
            });
            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    const handleFilter = async () => {
        fetchWorkerList();
    };

    useEffect(() => {
        if (filters.searchQuery === "") {
            fetchWorkerList();
        }
    }, [filters.searchQuery]);

    useEffect(() => {
        fetchWorkerList();
    }, [filters.skip, filters.limit]);

    const hasAddPermission = usePermission("create");
    const hasEditPermission = usePermission("update");
    const hasDeletePermission = usePermission("delete");
    return (
        <div class="bg-mainBg  mt-[65px] py-8">
            <div class="container mx-auto px-4">
                <div class="flex flex-row justify-between items-center mb-4">
                    <h2 class="text-2xl font-bold mb-4">Worker</h2>

                    {hasAddPermission && (
                        <Link
                            to="add"
                            class="bg-customGray text-white hover:opacity-90 px-4 py-1 text-xs sm:text-base sm:px-6 sm:py-2"
                        >
                            Add Worker
                        </Link>
                    )}
                </div>

                <div class=" mb-6">
                    {/* <h3 class="text-lg font-semibold mb-2">Filter</h3> */}
                    <hr class="mb-4" />
                    <div>
                        <label
                            for="Customer-search"
                            class="font-medium  mb-2 block"
                        >
                            Search:
                        </label>
                        <div class="flex flex-col sm:flex-row sm:items-center sm:space-x-3">
                            <input
                                type="text"
                                name="search"
                                placeholder="Search..."
                                class="border border-gray-700 p-2 flex-grow sm:flex-grow-0 sm:w-48 mb-4 sm:mb-0 focus:outline-none focus:ring-2 focus:ring-customGray"
                                value={filters?.searchQuery}
                                onChange={(e) => {
                                    setFilters((prev) => {
                                        return {
                                            ...prev,
                                            searchQuery: e.target.value,
                                        };
                                    });
                                }}
                            />
                            <button
                                class="ml-2 bg-customGray text-white px-6 py-2"
                                onClick={handleFilter}
                            >
                                Filter
                            </button>
                            <button
                                className="ml-2 bg-white  px-6 py-2 text-customGray"
                                onClick={(e) => {
                                    setFilters((prev) => ({
                                        ...prev,
                                        searchQuery: "",
                                    }));
                                }}
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                </div>
                {isLoading ? (
                    <PageLoader />
                ) : (
                    <div class="py-6">
                        <h3 class="text-lg font-semibold  mb-4">Worker List</h3>
                        <WorkersTable
                            WorkerList={WorkerList}
                            setWorkerList={setWorkerList}
                            hasEditPermission={hasEditPermission}
                            hasDeletePermission={hasDeletePermission}
                        />
                        <div className="flex justify-end">
                            <Pagination
                                limit={filters?.limit}
                                skip={filters?.skip}
                                total={filters?.totalWorkerList}
                                incOrDecSkip={(number) =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        skip: number,
                                    }))
                                }
                                updateSkip={(skip) =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        skip,
                                    }))
                                }
                            />{" "}
                        </div>

                        <div class="mt-4 flex justify-between items-center">
                            <a
                                href="data:text/csv;charset=utf-8,%EF%BB%BFNo.,Date,Name,Company,Phone,Email,City,Called By,Status%0A1,2024-10-03,sadas,blazon,sdwa,sad@gmail.com,Kerala,roith,Notcontactedyet%0A"
                                download="Worker.csv"
                            >
                                <button class="bg-customGray text-white px-4 py-2">
                                    Download CSV
                                </button>
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default WorkerListingPage;
