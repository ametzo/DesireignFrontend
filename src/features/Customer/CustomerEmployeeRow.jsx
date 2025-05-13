import React, { useState } from "react";
import { MdDelete, MdRemoveRedEye } from "react-icons/md";
import { useParams } from "react-router-dom";
import CustomerEmployeeModal from "./CustomerEmployeeModal";
import { FaPen } from "react-icons/fa";
import axiosBase from "../../axios";
import { useSelector } from "react-redux";

function CustomerEmployeeRow({
    empl,
    rowIndex,
    customerId,
    setCompanyEmployees,
    companyEmployees,
}) {
    const [isModal, setIsModal] = useState({
        isOpen: false,
        isEdit: true,
        employeeIndex: null, // This tracks the index of the employee being edited
    });
    const { id } = useParams();
    const jwtToken = localStorage.getItem("jwtToken");

    const deleteRow = async (id) => {
        try {
            const isConfirm = window.confirm("Are you sure to delete?");
            if (isConfirm) {
                await axiosBase.delete(`/customers/employee/delete/${id}`, {
                    headers: { authorization: `Bearer ${jwtToken}` },
                });

                setCompanyEmployees((prevRoleList) => {
                    return prevRoleList.filter((role) => role._id !== id);
                });
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <tr class="table-row" key={rowIndex}>
            <td>{rowIndex + 1}</td>
            <td>{empl.name}</td>
            <td>{empl.designation}</td>
            <td>{empl.email}</td>
            <td>{empl.phone}</td>
            <td>{empl.userName}</td>

            <td>
                <div className="actions">
                    <button
                        className="action-button"
                        onClick={(e) => {
                            setIsModal({
                                isOpen: true,
                                isEdit: true,
                            });
                        }}
                    >
                        <FaPen className="text-7xl text-white" />
                    </button>
                    <button
                        className="action-button"
                        onClick={(e) => {
                            deleteRow(empl._id);
                        }}
                    >
                        <MdDelete className="text-7xl text-white" />{" "}
                    </button>
                </div>
            </td>
            {isModal?.isOpen && isModal.isEdit && (
                <CustomerEmployeeModal
                    setIsModal={setIsModal}
                    setCompanyEmployees={setCompanyEmployees}
                    isModal={isModal}
                    companyEmployees={companyEmployees}
                    customerId={id}
                    companyEmployee={empl}
                />
            )}
        </tr>
    );
}

export default CustomerEmployeeRow;
