import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axiosBase from "../../axios";
import { BtnLoader, PageLoader } from "../../components";
import MultipleSelectDropdown from "../../components/MultipleSelectDropdown";
import SelectDropdown from "../../components/SelectDropDown";
import { formatDate } from "../../utils";

function LeadDetailPage() {
    const [formData, setFormData] = useState({
        date: "",
        name: "",
        company: "",
        phone: "",
        email: "",
        city: "",
        calledBy: "",
        userStatus: "not-contacted-yet",
        assigned: "",
    });

    const [isPageLoading, setIsPageLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const jwtToken = localStorage.getItem("jwtToken");
    const navigate = useNavigate();
    const { id } = useParams();
    const [comment, setComment] = useState(""); // State for the comment text
    const [comments, setComments] = useState([]);
    const [admins, setAdmins] = useState([]);
    const fetchCustomer = async () => {
        try {
            setIsPageLoading(true);
            const response = await axiosBase.get(`/leads/single/${id}`, {
                headers: { authorization: `Bearer ${jwtToken}` },
            });

            const {
                date,
                name,
                company,
                phone,
                email,
                city,
                calledBy,
                userStatus,
                password,
                assigned,
            } = response.data;

            setFormData({
                date,
                name,
                company,
                phone,
                email,
                city,
                calledBy,
                userStatus,
                password,
                assigned,
            });

            setIsPageLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchComments = async () => {
        try {
            setIsPageLoading(true);
            const response = await axiosBase.get(`/leads/comments/all/${id}`, {
                headers: { authorization: `Bearer ${jwtToken}` },
            });

            setComments(response.data);

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

    const handleAssignSubmit = async () => {
        // e.preventDefault();
        setIsLoading(true);

        let response = await axiosBase.patch(
            `/leads/assign/update/${id}`,
            { assigned: formData.assigned },
            {
                headers: { Authorization: `Bearer ${jwtToken}` },
            }
        );

        setIsLoading(false);
    };

    useEffect(() => {
        setIsLoading(true);
        fetchCustomer();
        fetchComments();
        fetchUsers();
        setIsLoading(false);
    }, []);

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let response = await axiosBase.post(
            `/leads/comments/add`,
            { text: comment, leadId: id },
            {
                headers: { Authorization: `Bearer ${jwtToken}` },
            }
        );

        setComments((prev) => [...prev, response.data]);
        setComment("");
    };
    return (
        <div className="bg-mainBg  mt-[65px] py-8">
            <div className="container mx-auto px-4">
                <div className="flex justify-end items-center  p-4 ">
                    <h2 className="flex justify-start text-2xl font-bold text-gray-800 text-center w-full">
                        Lead Details Page
                    </h2>
                </div>
                <hr className="border-t border-gray-300" />
                {isPageLoading ? (
                    <PageLoader />
                ) : (
                    <div className="card-body  p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Left Column: Comment Section */}
                            <div className="col-span-2">
                                <div className="mb-4">
                                    <label
                                        htmlFor="commentTxtBx"
                                        className="form-label text-lg font-medium"
                                    >
                                        Write New Comment
                                    </label>
                                    <div className="input-group input-group-flat mt-2">
                                        <textarea
                                            id="commentTxtBx"
                                            name="comment"
                                            value={comment}
                                            onChange={handleCommentChange}
                                            className="form-control w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customGray"
                                            placeholder="Write your comment..."
                                            required
                                        />
                                    </div>{" "}
                                    <button
                                        type="submit"
                                        onClick={handleSubmit}
                                        className="  mt-4 px-4 py-2  text-white rounded-md  mb-10"
                                    >
                                        Submit
                                    </button>
                                </div>

                                {/* Comment Table */}
                                <div class="overflow-x-auto">
                                    <table class="leads-table">
                                        <thead class="table-header">
                                            <tr>
                                                <th className="px-4 py-2 text-left">
                                                    Comment
                                                </th>
                                                <th className="px-4 py-2 text-left">
                                                    Commented By &amp; At
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {comments.map((comment) => (
                                                <tr
                                                    class="table-row"
                                                    key={comment.id}
                                                >
                                                    <td className="px-4 py-2">
                                                        {comment.text}
                                                    </td>
                                                    <td className="px-4 py-2 w-[200px]">
                                                        <div className="">
                                                            {
                                                                comment
                                                                    .createdBy
                                                                    ?.name
                                                            }
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {formatDate(
                                                                comment.createdAt
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {/* Right Column: Information Table */}
                            <div className="col-span-1">
                                <h3 className="text-lg font-semibold mb-4">
                                    Information
                                </h3>
                                <table className="leads-table">
                                    <tbody>
                                        <tr class="table-row">
                                            <td className="px-4 py-2 font-medium">
                                                Date
                                            </td>
                                            <td className="px-4 py-2">
                                                {formData?.date}
                                            </td>
                                        </tr>
                                        <tr class="table-row">
                                            <td className="px-4 py-2 font-medium">
                                                Name
                                            </td>
                                            <td className="px-4 py-2">
                                                {" "}
                                                {formData?.name}
                                            </td>
                                        </tr>
                                        <tr class="table-row">
                                            <td className="px-4 py-2 font-medium">
                                                Company
                                            </td>
                                            <td className="px-4 py-2">
                                                {" "}
                                                {formData?.company}
                                            </td>
                                        </tr>
                                        <tr class="table-row">
                                            <td className="px-4 py-2 font-medium">
                                                Phone
                                            </td>
                                            <td className="px-4 py-2">
                                                {" "}
                                                {formData?.phone}
                                            </td>
                                        </tr>
                                        <tr class="table-row">
                                            <td className="px-4 py-2 font-medium">
                                                Email
                                            </td>
                                            <td className="px-4 py-2">
                                                {formData?.email}
                                            </td>
                                        </tr>

                                        <tr class="table-row">
                                            <td className="px-4 py-2 font-medium">
                                                City
                                            </td>
                                            <td className="px-4 py-2">
                                                {" "}
                                                {formData?.city}
                                            </td>
                                        </tr>
                                        <tr class="table-row">
                                            <td className="px-4 py-2 font-medium">
                                                User Status
                                            </td>
                                            <td className="px-4 py-2 text-gray-500 capitalize">
                                                {formData?.userStatus}
                                            </td>
                                        </tr>

                                        <tr class="table-row">
                                            <td className="px-4 py-2 font-medium w-[50px]">
                                                Assign{" "}
                                            </td>{" "}
                                            <td className="px-4 py-2 font-medium ">
                                                <div className="actions ">
                                                    <SelectDropdown
                                                        data={admins}
                                                        valueName={"_id"}
                                                        displayName={"name"}
                                                        placeholder="Select employee"
                                                        selectedData={
                                                            formData.assigned ||
                                                            ""
                                                        }
                                                        setSelectedData={(
                                                            val
                                                        ) => {
                                                            setFormData(
                                                                (prev) => {
                                                                    return {
                                                                        ...prev,
                                                                        ["assigned"]:
                                                                            val,
                                                                    };
                                                                }
                                                            );
                                                        }}
                                                    />{" "}
                                                    {isLoading ? (
                                                        <BtnLoader />
                                                    ) : (
                                                        <button
                                                            type="submit"
                                                            onClick={
                                                                handleAssignSubmit
                                                            }
                                                            className=" px-4 py-2  text-white rounded-md  "
                                                        >
                                                            Submit
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>{" "}
                        </div>
                    </div>
                )}
            </div>{" "}
        </div>
    );
}

export default LeadDetailPage;
