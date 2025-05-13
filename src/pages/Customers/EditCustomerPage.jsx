import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axiosBase from "../../axios";
import { MdDelete } from "react-icons/md";
import { TiCancel } from "react-icons/ti";
import CustomerEmployeeModal from "../../features/Customer/CustomerEmployeeModal";
import CustomerEmployeeRow from "../../features/Customer/CustomerEmployeeRow";
import { BtnLoader, PageLoader } from "../../components";
import SelectDropdown from "../../components/SelectDropDown";

function EditCustomerPage() {
    const [formData, setFormData] = useState({
        company: "",
        phone: "",
        email: "",
        city: "",
        // userStatus: "not-contacted-yet",
        assigned: "",
        siteSupervisorName: "",
        siteSupervisorMobileNumber: "",
        siteSupervisorEmail: "",
        accountsName: "",
        accountsMobileNumber: "",
        accountsEmail: "",
        accountsName2: "",
        accountsMobileNumber2: "",
        accountsEmail2: "",
        vatCertificate: "",
        tradeLicense: "",
        contract: "",
    });
    const [isPageLoading, setIsPageLoading] = useState(false);
    const [admins, setAdmins] = useState([]);
    const [companyEmployees, setCompanyEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const jwtToken = localStorage.getItem("jwtToken");
    const navigate = useNavigate();
    const { id } = useParams();
    const [isModal, setIsModal] = useState({
        isOpen: false,
        isEdit: false,
        employeeIndex: null, // This tracks the index of the employee being edited
    });

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleInputChange = (e, rowIndex, field) => {
        const value = e.target.value;
        setCompanyEmployees((prev) => {
            const updatedEmployees = [...prev];
            updatedEmployees[rowIndex] = {
                ...updatedEmployees[rowIndex],
                [field]: value,
            };
            return updatedEmployees;
        });
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setIsLoading(true);

            let response = await axiosBase.patch(
                `/customers/update/${id}`,
                { ...formData },
                {
                    headers: { Authorization: `Bearer ${jwtToken}` },
                }
            );

            navigate("/customer");
            setIsLoading(false);
        } catch (err) {
            console.log(err);
            setError(err?.response?.data?.error);
            setIsLoading(false);
        }
    };

    const fetchCustomer = async () => {
        try {
            setIsPageLoading(true);
            const response = await axiosBase.get(`/customers/single/${id}`, {
                headers: { authorization: `Bearer ${jwtToken}` },
            });

            const { assigned, company, phone, email, city } =
                response?.data?.customer;

            setFormData({
                company,
                phone,
                email,
                city,
                // userStatus,
                assigned,
            });

            setCompanyEmployees(response?.data?.customerEmplyee);

            setIsPageLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchUsers = async () => {
        try {
            setIsPageLoading(true);
            const response = await axiosBase.get(`/auth/list`, {
                headers: { authorization: `Bearer ${jwtToken}` },
            });

            setAdmins(response.data);

            setIsPageLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchCustomer();
    }, []);

    useEffect(() => {
        fetchUsers();
    }, []);

    console.log(formData);

    return (
        <div className="bg-mainBg  mt-[65px] py-8">
            <div className="container mx-auto px-4">
                <div className="flex justify-end items-center  p-4 ">
                    <h2 className="flex justify-start text-2xl font-bold text-gray-800 text-center w-full">
                        Edit New Customer
                    </h2>
                </div>
                <hr className="border-t border-gray-300" />
                {isPageLoading ? (
                    <PageLoader />
                ) : (
                    <div className="bg-mainBg p-4 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-200">
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block  mb-2">
                                        Company *
                                    </label>
                                    <input
                                        type="text"
                                        name="company"
                                        className="w-full p-2 border border-gray-700"
                                        value={formData.company}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block  mb-2">
                                        Phone *
                                    </label>
                                    <input
                                        type="text"
                                        name="phone"
                                        className="w-full p-2 border border-gray-700"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block  mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="w-full p-2 border border-gray-700"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block  mb-2">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        className="w-full p-2 border border-gray-700"
                                        value={formData.city}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                {/* <div>
                                <label className="block  mb-2">
                                    Called By *
                                </label>
                                <input
                                    type="text"
                                    name="calledBy"
                                    className="w-full p-2 border border-gray-700"
                                    value={formData.calledBy}
                                    onChange={handleChange}
                                    required
                                />
                            </div>{" "} */}
                                {/* <div>
                                <label className="block  mb-2">
                                    Password*
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData?.password}
                                    onChange={handleChange}
                                    placeholder="Enter password"
                                    className="border border-gray-700 p-3 w-full focus:outline-none focus:ring-2 focus:ring-customGray"
                                    required
                                />
                            </div> */}
                                {/* <div>
                                    <label className="block  mb-2">
                                        User Status *
                                    </label>
                                    <select
                                        name="userStatus"
                                        className="w-full p-2 border border-gray-700"
                                        value={formData.userStatus}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="not-contacted-yet">
                                            Not contacted yet
                                        </option>
                                        <option value="contacted">
                                            Contacted
                                        </option>
                                        <option value="in-progress">
                                            In Progress
                                        </option>
                                        <option value="converted">
                                            Converted
                                        </option>
                                        <option value="lost">Lost</option>
                                    </select>
                                </div>{" "} */}
                                <div>
                                    <label className="block  mb-2">
                                        Sub Users *
                                    </label>
                                    <SelectDropdown
                                        data={admins}
                                        valueName={"_id"}
                                        displayName={"name"}
                                        placeholder="Select sub user"
                                        selectedData={formData.assigned || ""}
                                        setSelectedData={(val) => {
                                            setFormData((prev) => {
                                                return {
                                                    ...prev,
                                                    ["assigned"]: val,
                                                };
                                            });
                                        }}
                                    />{" "}
                                </div>
                            </div>
                            {error && (
                                <span className="text-sm block text-red-500 mt-2">
                                    {error}
                                </span>
                            )}
                            <div className="flex justify-center mt-8">
                                {isLoading ? (
                                    <BtnLoader />
                                ) : (
                                    <button
                                        type="submit"
                                        className="bg-customGray text-white w-full font-semibold px-6 py-3 hover:opacity-90"
                                    >
                                        SAVE
                                    </button>
                                )}
                            </div>
                        </form>{" "}
                        <div class=" px-6 pb-6 mt-5">
                            <div className="flex justify-end items-center  pt-4 ">
                                <h1 className="flex justify-start text-xl font-bold text-gray-800 text-center w-full">
                                    Assign Employees :
                                </h1>
                                <button
                                    className="flex bg-customGray text-white hover:opacity-90 px-4 py-1 text-xs sm:text-base sm:px-6 sm:py-2"
                                    onClick={(e) => {
                                        setIsModal({
                                            isOpen: true,
                                            isEdit: false,
                                        });
                                    }}
                                >
                                    <span className="flex items-center">
                                        Add{" "}
                                        <span className="align-middle">+</span>
                                    </span>
                                </button>
                            </div>
                            <div class="overflow-x-auto  pt-4  ">
                                <table className="leads-table">
                                    <thead className="table-header">
                                        <tr>
                                            <th>No.</th>
                                            <th>Full Name</th>
                                            <th>Designation</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>UserName </th>
                                            <th>Actions</th>
                                        </tr>{" "}
                                    </thead>
                                    <tbody>
                                        {companyEmployees.map(
                                            (empl, rowIndex) => (
                                                <CustomerEmployeeRow
                                                    empl={empl}
                                                    rowIndex={rowIndex}
                                                    handleInputChange={
                                                        handleInputChange
                                                    }
                                                    setCompanyEmployees={
                                                        setCompanyEmployees
                                                    }
                                                    companyEmployees={
                                                        companyEmployees
                                                    }
                                                />
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {isModal?.isOpen && isModal.isEdit == false && (
                <CustomerEmployeeModal
                    setIsModal={setIsModal}
                    setCompanyEmployees={setCompanyEmployees}
                    isModal={isModal}
                    companyEmployees={companyEmployees}
                    customerId={id}
                />
            )}
        </div>
    );
}

export default EditCustomerPage;
