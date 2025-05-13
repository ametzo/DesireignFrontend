import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosBase from "../../axios";
import { PageLoader } from "../../components";
import Pagination from "../../components/Pagination";
import SelectDropdown from "../../components/SelectDropDown";
import ReportTable from "../../features/Reports/ReportTable";
import AddSubUserMOdal from "../../features/SubUsers/AddSubUserModal";
import SubUsersTable from "../../features/SubUsers/SubUsersTable";

function ReportListingPage() {
    const [reports, setReports] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState({
        skip: 0,
        limit: 10,
        totalreports: 0,
        searchQuery: "",
        toDate: "",
        fromDate: "",
        customerId: "",
        serviceId: "",
    });
    const [customers, setCustomers] = useState([]);
    const [services, setServices] = useState([]);
    const jwtToken = localStorage.getItem("jwtToken");
    const [error, setError] = useState("");

    const fetchCustomersList = async () => {
        try {
            setIsLoading(true);
            const response = await axiosBase.get(`/customers/list`, {
                headers: { authorization: `Bearer ${jwtToken}` },
            });

            setCustomers(response?.data);

            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchCustomersList();
    }, []);

    const fetchServiceList = async () => {
        try {
            const response = await axiosBase.get(
                `/services/${filters?.customerId}/company`,
                {
                    headers: { authorization: `Bearer ${jwtToken}` },
                }
            );

            setServices(response?.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (filters?.customerId) {
            fetchServiceList();
        }
    }, [filters?.customerId]);

    const fetchreports = async ({
        customerId = filters.customerId,
        serviceId = filters?.serviceId,
        fromDate = filters?.fromDate,
        toDate = filters?.toDate,
    }) => {
        try {
            if (customerId === "" || serviceId === "") {
                throw new Error("serviceId and customerId required");
            }
            setIsLoading(true);
            const response = await axiosBase.get(
                `/reports/all?skip=${filters?.skip}&limit=${filters?.limit}&customerId=${customerId}&serviceId=${serviceId}&fromDate=${fromDate}&toDate=${toDate}`,
                {
                    headers: { authorization: `Bearer ${jwtToken}` },
                }
            );

            setReports(response?.data?.reports);
            setFilters((prev) => {
                return {
                    ...prev,
                    totalReports: response?.data?.totalReports,
                };
            });
            setIsLoading(false);
            setError("");
        } catch (err) {
            setReports([]);
            setError("Please provide a customer and service");
        }
    };

    const downloadPdf = async () => {
        try {
            const response = await axiosBase.get(
                `/reports/pdf-download?skip=${filters?.skip}&limit=${filters?.limit}&customerId=${filters?.customerId}&serviceId=${filters?.serviceId}&fromDate=${filters?.fromDate}&toDate=${filters?.toDate}`,
                {
                    headers: { authorization: `Bearer ${jwtToken}` },
                    responseType: "arraybuffer",
                }
            );

            const blob = new Blob([response.data], {
                type: "application/pdf",
            });
            window.open(URL.createObjectURL(blob), "_blank");
        } catch (err) {
            console.log(err);
        }
    };

    const handleFilter = async () => {
        fetchreports({});
    };

    useEffect(() => {
        if (filters.searchQuery === "") {
            fetchreports({});
        }
    }, [filters.searchQuery]);

    useEffect(() => {
        fetchreports({});
    }, [filters.skip, filters.limit]);

    const handleClear = () => {
        // Clear the filters and then call handleFilter with updated values
        const clearedFilters = {
            customerId: "",
            fromDate: "",
            toDate: "",
            serviceId: "",
        };

        setFilters((prev) => {
            return {
                ...prev,
                ...clearedFilters,
            };
        });
        fetchreports(clearedFilters); // Call handleFilter immediately with cleared values
    };
    return (
        <div class="bg-mainBg  mt-[65px] py-8">
            <div class="container mx-auto px-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 class="text-2xl font-bold mb-4">Reports</h2>
                    <button
                        onClick={downloadPdf}
                        class="bg-customGray text-white hover:opacity-90 px-4 py-1 text-xs sm:text-base sm:px-6 sm:py-2"
                    >
                        Download Pdf
                    </button>
                </div>

                <div class=" mb-6">
                    {/* <h3 class="text-lg font-semibold mb-2">Filter</h3> */}
                    <hr class="mb-4" />
                    <div>
                        <div class="flex flex-col sm:flex-row sm:items-center sm:space-x-3">
                            <div>
                                <label
                                    for="Customer-search"
                                    class="font-medium  mb-2 block"
                                >
                                    Customer
                                </label>{" "}
                                <SelectDropdown
                                    data={customers}
                                    valueName={"_id"}
                                    displayName={"company"}
                                    placeholder="Select company"
                                    selectedData={filters?.customerId || ""}
                                    setSelectedData={(val) => {
                                        setFilters((prev) => {
                                            return {
                                                ...prev,
                                                serviceId: "",
                                                ["customerId"]: val,
                                            };
                                        });
                                    }}
                                />
                            </div>{" "}
                            <div>
                                <label
                                    for="Customer-search"
                                    class="font-medium  mb-2 block"
                                >
                                    Service
                                </label>{" "}
                                <SelectDropdown
                                    data={services}
                                    valueName={"_id"}
                                    displayName={"project"}
                                    placeholder="Select project"
                                    selectedData={filters?.serviceId || ""}
                                    setSelectedData={(val) => {
                                        setFilters((prev) => {
                                            return {
                                                ...prev,
                                                ["serviceId"]: val,
                                            };
                                        });
                                    }}
                                />
                            </div>{" "}
                            <div>
                                <label
                                    for="Customer-search"
                                    class="font-medium  mb-2 block"
                                >
                                    From Date
                                </label>{" "}
                                <input
                                    type="date"
                                    name="fromDate"
                                    value={filters?.fromDate}
                                    onChange={(e) => {
                                        setFilters((prev) => {
                                            return {
                                                ...prev,
                                                fromDate: e.target.value,
                                            };
                                        });
                                    }}
                                />
                            </div>{" "}
                            <div>
                                <label
                                    for="Customer-search"
                                    class="font-medium  mb-2 block"
                                >
                                    To Date
                                </label>{" "}
                                <input
                                    type="date"
                                    name="toDate"
                                    value={filters?.toDate}
                                    onChange={(e) => {
                                        setFilters((prev) => {
                                            return {
                                                ...prev,
                                                toDate: e.target.value,
                                            };
                                        });
                                    }}
                                />
                            </div>
                            <div className="pt-8">
                                <button
                                    class="ml-2 bg-customGray text-white px-6 py-2"
                                    onClick={handleFilter}
                                >
                                    Filter
                                </button>
                                <button
                                    className="ml-2 bg-white  px-6 py-2 text-customGray"
                                    onClick={handleClear}
                                >
                                    Clear
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {isLoading ? (
                    <PageLoader />
                ) : (
                    <div class=" py-6">
                        <h3 class="text-lg font-semibold  mb-4">Report List</h3>
                        <ReportTable
                            setReports={setReports}
                            reports={reports}
                        />
                        {error && (
                            <span className="text-sm block text-red-500 mt-2">
                                {error}
                            </span>
                        )}
                        <div className="flex justify-end">
                            <Pagination
                                limit={filters?.limit}
                                skip={filters?.skip}
                                total={filters?.totalReports}
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
                                download="Leads.csv"
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

export default ReportListingPage;
