import React from "react";
import SupportTableRow from "./SupportTableRow";

function SupportTable({
    SupportList,
    setSupportList,
    hasDeletePermission,
    hasEditPermission,
}) {
    return (
        <div class="overflow-x-auto">
            <table class="leads-table">
                <thead class="table-header">
                    <tr>
                        <th>No.</th>
                        <th>Company</th>
                        <th>Subject</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {SupportList &&
                        SupportList.map((support, index) => {
                            return (
                                <SupportTableRow
                                    key={support?._id}
                                    support={support}
                                    index={index}
                                    setSupportList={setSupportList}
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

export default SupportTable;
