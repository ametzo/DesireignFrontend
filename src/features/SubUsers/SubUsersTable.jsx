import React from "react";
import SubUserTableRow from "./SubUserTableRow";

function SubUsersTable({
    userList,
    setUserList,
    hasDeletePermission,
    hasEditPermission,
}) {
    return (
        <div class="overflow-x-auto">
            <table class="leads-table">
                <thead class="table-header">
                    <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>UserId</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Last Logged In</th>
                        <th>User Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {userList &&
                        userList.map((user, index) => {
                            return (
                                <SubUserTableRow
                                    key={user?._id}
                                    user={user}
                                    index={index}
                                    setUserList={setUserList}
                                    hasEditPermission={hasEditPermission}
                                    hasDeletePermission={hasDeletePermission}
                                />
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
}

export default SubUsersTable;
