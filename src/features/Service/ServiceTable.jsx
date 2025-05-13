import React from "react";
import ServicesTableRow from "./ServiceTableRow";

function ServicesTable({
    ServiceList,
    setServiceList,
    hasDeletePermission,
    hasEditPermission,
}) {
    console.log(ServiceList, "ServiceList");
    return (
        <div class="overflow-x-auto">
            <table class="leads-table">
                <thead class="table-header">
                    <tr>
                        <th>No .</th>
                        <th>Customer</th>
                        <th>Project</th>
                        {/* <th>Service Count</th> */}
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {ServiceList &&
                        ServiceList.map((service, index) => {
                            return (
                                <ServicesTableRow
                                    key={service?._id}
                                    service={service}
                                    index={index}
                                    setServiceList={setServiceList}
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

export default ServicesTable;
