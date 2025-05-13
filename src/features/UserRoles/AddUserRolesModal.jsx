import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axiosBase from "../../axios";
import { BtnLoader, PageLoader } from "../../components";
import { useHandleClickOutside } from "../../hooks";

const AddUserRolesModal = ({ isModal, setIsModal, roleId, setRoleList }) => {
    const [roleName, setRoleName] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(false);

    const [error, setError] = useState("");
    const [permissions, setPermissions] = useState([]);

    const wrapperRef = useRef();
    useHandleClickOutside(wrapperRef, () =>
        setIsModal({ isEdit: false, isOpen: false })
    );
    // Handle checkbox change for permissions
    const handleCheckboxChange = (index, permission) => {
        const updatedPermissions = [...permissions];
        const menu = updatedPermissions[index];

        // If the permission is already in the array, remove it, else add it
        if (menu.permissions.includes(permission)) {
            menu.permissions = menu.permissions.filter((p) => p !== permission);
        } else {
            menu.permissions.push(permission);
        }

        setPermissions(updatedPermissions);
    };

    const jwtToken = localStorage.getItem("jwtToken");

    const fetchroleList = async () => {
        try {
            setIsPageLoading(true);

            if (isModal.isEdit) {
                const response = await axiosBase.get(
                    `/roles/user-roles/${roleId}`,
                    {
                        headers: { authorization: `Bearer ${jwtToken}` },
                    }
                );
                setRoleName(response?.data.name);
                setDescription(response?.data.description);
                setPermissions(response?.data.roles);
            } else {
                const response = await axiosBase.get(`/roles/user-roles`, {
                    headers: { authorization: `Bearer ${jwtToken}` },
                });

                setPermissions(
                    response?.data.map((role) => {
                        return { ...role, permissions: [] };
                    })
                );
            }

            setIsPageLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchroleList();
    }, []);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setIsLoading(true);
            setError("");
            if (isModal.isEdit) {
                let response = await axiosBase.patch(
                    `/roles/update/${roleId}`,
                    {
                        roleName,
                        description,
                        roles: permissions?.map((role) => ({
                            processName: role.processName,
                            stepNumber: role.stepNumber,
                            permissions: role.permissions,
                        })),
                    },
                    {
                        headers: { Authorization: `Bearer ${jwtToken}` },
                    }
                );

                setRoleList((prev) =>
                    prev.map((role) =>
                        role._id === response.data._id
                            ? { ...role, roleName, description } // Replace the role with updated data
                            : role
                    )
                );
            } else {
                let response = await axiosBase.post(
                    "/roles/create",
                    {
                        roleName,
                        description,
                        roles: permissions?.map((role) => ({
                            processName: role.processName,
                            stepNumber: role.stepNumber,
                            permissions: role.permissions,
                        })),
                    },
                    {
                        headers: { Authorization: `Bearer ${jwtToken}` },
                    }
                );

                setRoleList((prev) => [
                    ...prev,
                    {
                        roleName,
                        description,
                        _id: response.data._id, // Use the newly created role ID
                    },
                ]);
            }

            // setUserList((prev) => [...prev, response.data]);
            setIsLoading(false);
            setIsModal({ isEdit: false, isOpen: false });
        } catch (err) {
            console.log(err);
            setError(err?.response?.data?.error);
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed  inset-0 w-full h-full bg-[#434343] bg-opacity-70 flex items-center justify-center z-40">
            {/* Modal Wrapper */}
            <div
                ref={wrapperRef}
                className="bg-mainBg pt-3 shadow-lg max-w-8xl w-full m-3 md:w-5/6 lg:w-2/3 xl:w-2/3 flex flex-col max-h-[90vh] "
            >
                <div className=" overflow-y-auto ">
                    {" "}
                    {/* Ensures internal scrolling */}
                    <div className=" p-3">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-800">
                                {isModal.isEdit ? "Edit" : "Add"} New Role
                            </h2>
                            <button
                                className="text-gray-600 hover:text-gray-800 bg-mainBg"
                                onClick={(e) => {
                                    setIsModal({
                                        isEdit: false,
                                        isOpen: false,
                                    });
                                }}
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                    {/* <hr className="border-t border-gray-300" /> */}
                    {isPageLoading ? (
                        <PageLoader />
                    ) : (
                        <div className="bg-mainBg p-4 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-200">
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <div className="flex justify-between space-x-4 mb-4">
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium ">
                                            Role name
                                        </label>
                                        <input
                                            type="text"
                                            name="roleName"
                                            value={roleName}
                                            onChange={(e) =>
                                                setRoleName(e.target.value)
                                            }
                                            autoComplete="off"
                                            className="border border-gray-700 p-3 w-full focus:outline-none focus:ring-2 focus:ring-customGray"
                                            placeholder="Enter Role Name"
                                            required
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium ">
                                            Description
                                        </label>
                                        <input
                                            type="text"
                                            name="description"
                                            value={description}
                                            onChange={(e) =>
                                                setDescription(e.target.value)
                                            }
                                            autoComplete="off"
                                            className="border border-gray-700 p-3 w-full focus:outline-none focus:ring-2 focus:ring-customGray"
                                            placeholder="Enter Description"
                                        />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                        Set permissions
                                    </h3>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full border-collapse bg-whiteGray shadow-sm text-sm">
                                            <thead>
                                                <tr className="bg-customGray text-white">
                                                    <th className="border border-gray-700 p-3 text-left">
                                                        NO
                                                    </th>
                                                    <th className="border border-gray-700 p-3 text-left">
                                                        MENU NAME
                                                    </th>
                                                    <th className="border border-gray-700 p-3 text-left">
                                                        VIEW
                                                    </th>
                                                    <th className="border border-gray-700 p-3 text-left">
                                                        CREATE
                                                    </th>
                                                    <th className="border border-gray-700 p-3 text-left">
                                                        EDIT
                                                    </th>
                                                    <th className="border border-gray-700 p-3 text-left">
                                                        DELETE
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {permissions.map(
                                                    (item, index) => (
                                                        <tr
                                                            key={item.id}
                                                            className="hover:bg-gray-100"
                                                        >
                                                            <td className="border border-gray-700 p-3 text-center">
                                                                {
                                                                    item.stepNumber
                                                                }
                                                            </td>
                                                            <td className="border border-gray-700 p-3">
                                                                {
                                                                    item.processName
                                                                }
                                                            </td>
                                                            {[
                                                                "view",
                                                                "create",
                                                                "update",
                                                                "delete",
                                                            ].map(
                                                                (
                                                                    permission
                                                                ) => (
                                                                    <td
                                                                        key={
                                                                            permission
                                                                        }
                                                                        className="border border-gray-700 p-3 text-center"
                                                                    >
                                                                        <label className="relative inline-flex items-center cursor-pointer">
                                                                            <input
                                                                                type="checkbox"
                                                                                name={`${item.menu}.${permission}`}
                                                                                className="sr-only peer"
                                                                                checked={item.permissions.includes(
                                                                                    permission
                                                                                )}
                                                                                onChange={() =>
                                                                                    handleCheckboxChange(
                                                                                        index,
                                                                                        permission
                                                                                    )
                                                                                }
                                                                            />
                                                                            <div className="w-12 h-5 bg-gray-300 rounded-full peer-checked:bg-customGray transition-colors"></div>
                                                                            <div className="absolute left-1 top-0.5 w-4 h-4 bg-white rounded-full transition-transform transform peer-checked:translate-x-6"></div>
                                                                        </label>
                                                                    </td>
                                                                )
                                                            )}
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                {error && (
                                    <span className="text-sm block text-red-500 mt-2">
                                        {error}
                                    </span>
                                )}
                                <div className="flex justify-end space-x-2 mt-4 border-t border-gray-200 pt-4">
                                    <button
                                        type="button"
                                        className="bg-whiteGray text-customGray border border-customGray hover:opacity-90 px-6 py-2 bg-white"
                                        onClick={(e) => {
                                            setIsModal({
                                                isEdit: false,
                                                isOpen: false,
                                            });
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    {isLoading ? (
                                        <BtnLoader />
                                    ) : (
                                        <button
                                            type="submit"
                                            className="bg-customGray text-white hover:opacity-90 px-6 py-2"
                                        >
                                            Save
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddUserRolesModal;
