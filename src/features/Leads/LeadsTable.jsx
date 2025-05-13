import React from "react";
import LeadsTableRow from "./LeadsTableRow";

function LeadsTable({
    LeadsList,
    setLeadsList,
    hasDeletePermission,
    hasEditPermission,
}) {
    console.log("LeadsTable", LeadsList);
    return (
        <div class="overflow-x-auto">
            <table class="leads-table">
                <thead class="table-header">
                    <tr>
                        <th>No.</th>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Company</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>City</th>
                        <th className="w-50 whitespace-nowrap">
                            {" "}
                            Called <span>By</span>
                        </th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {LeadsList &&
                        LeadsList?.map((lead, index) => {
                            return (
                                <LeadsTableRow
                                    key={lead?._id}
                                    lead={lead}
                                    index={index}
                                    setLeadsList={setLeadsList}
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

export default LeadsTable;
