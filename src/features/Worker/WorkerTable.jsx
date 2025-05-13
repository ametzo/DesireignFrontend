import React from "react";
import WorkersTableRow from "./WorkerTableRow";

function WorkersTable({
    WorkerList,
    setWorkerList,
    hasDeletePermission,
    hasEditPermission,
}) {
    console.log(WorkerList, "WorkerList");
    return (
        <div class="overflow-x-auto">
            <table class="leads-table">
                <thead class="table-header">
                    <tr>
                        <th>No .</th>
                        <th>Employee Name</th>
                        <th>Address</th>
                        <th>Phone</th>
                        {/* <th>Job Title</th>
                        <th>Email</th>
                        <th>Location</th>
                        <th>Join Date</th> */}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {WorkerList &&
                        WorkerList.map((worker, index) => {
                            return (
                                <WorkersTableRow
                                    key={worker?._id}
                                    worker={worker}
                                    index={index}
                                    setWorkerList={setWorkerList}
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

export default WorkersTable;
