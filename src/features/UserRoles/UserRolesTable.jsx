import React from "react";
import UserTableRow from "./UserTableRow";

function UserRolesTable({
    roleList,
    setRoleList,
    hasDeletePermission,
    hasEditPermission,
}) {
    return (
        <div class="overflow-x-auto">
            <table class="leads-table">
                <thead class="table-header">
                    <tr>
                        <th>No.</th>
                        <th>Role Name</th>
                        <th>Description</th>

                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {roleList &&
                        roleList.map((user, index) => {
                            return (
                                <UserTableRow
                                    key={user?._id}
                                    user={user}
                                    index={index}
                                    setRoleList={setRoleList}
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

export default UserRolesTable;
