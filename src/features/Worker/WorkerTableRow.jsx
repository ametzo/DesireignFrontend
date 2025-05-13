import React from "react";
import { formatDate } from "../../utils";
import { TiCancel } from "react-icons/ti";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosBase from "../../axios";

function WorkerTableRow({
    worker,
    index,
    setWorkerList,
    hasDeletePermission,
    hasEditPermission,
}) {
    const jwtToken = localStorage.getItem("jwtToken");

    const deleteRow = async (id) => {
        try {
            const isConfirm = window.confirm("Are you sure to delete?");
            if (isConfirm) {
                await axiosBase.delete(`/workers/delete/${id}`, {
                    headers: { authorization: `Bearer ${jwtToken}` },
                });

                setWorkerList((prevRoleList) => {
                    return prevRoleList.filter((role) => role._id !== id);
                });
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <tr class="table-row">
            <td>{index + 1}</td>
            <td>{worker.employeeName}</td>
            <td>{worker.address}</td>
            <td>{worker.phone}</td>
            {/* <td>{worker.jobTitle}</td>
            <td>{worker.email}</td>
            <td>{worker.location}</td>
            <td>{formatDate(worker?.joinDate)}</td> */}
            <td>
                <div className="actions">
                    {hasEditPermission && (
                        <Link to={`${worker?._id}/edit`}>
                            <button class="action-button">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 576 512"
                                >
                                    <path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"></path>
                                </svg>
                            </button>
                        </Link>
                    )}
                    {hasDeletePermission && (
                        <button
                            class="action-button"
                            onClick={(e) => {
                                deleteRow(worker._id);
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                viewBox="0 0 448 512"
                            >
                                <path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16C7.2 32 0 39.2 0 48v16h432V48c0-8.8-7.2-16-16-16z"></path>
                            </svg>
                        </button>
                    )}
                </div>
            </td>
        </tr>
    );
}

export default WorkerTableRow;
