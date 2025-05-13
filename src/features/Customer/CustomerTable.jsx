import React from "react";
import CustomersTableRow from "./CustomerTableRow";

function CustomersTable({
    CustomerList,
    setCustomerList,
    hasDeletePermission,
    hasEditPermission,
}) {
    console.log(CustomerList, "CustomerList");
    return (
        <div class="overflow-x-auto">
            <table class="leads-table">
                <thead class="table-header">
                    <tr>
                        <th>No .</th>
                        <th>Company</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>City</th>
                        {/* <th>Status</th> */}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {CustomerList &&
                        CustomerList.map((customer, index) => {
                            return (
                                <CustomersTableRow
                                    key={customer?._id}
                                    customer={customer}
                                    index={index}
                                    setCustomerList={setCustomerList}
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

export default CustomersTable;
