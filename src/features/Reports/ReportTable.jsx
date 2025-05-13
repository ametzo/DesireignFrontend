import React from "react";
import ReportTableRow from "./ReportTableRow";
const activities = [
    { name: "isWatering", label: "Watering" },
    { name: "isTrimming", label: "Trimming" },
    { name: "isPestCheck", label: "Checking Pest And Disease Infection" },
    { name: "isFertilizer", label: "Fertilizer Application" },
    { name: "isToppingUp", label: "Topping Up And Soil Mix" },
];

function ReportTable({ reports, setReports }) {
    return (
        <div class="overflow-x-auto">
            <table className="leads-table">
                <thead className="table-header">
                    <tr>
                        <th>No.</th>
                        {/* <th>Company Name</th> 
                        <th>Service</th> */}
                        <th>Project No.</th>
                        <th>Service Date</th>
                        <th>Service Status</th>
                        <th>Serviced By</th>
                        {/* Main "Activities" Header */}
                        {activities.map((activity) => (
                            <th key={activity.name} className="text-center">
                                {activity.label}
                            </th>
                        ))}
                        <th>Service Start Time </th>
                        <th>Service End Time </th>
                        <th>Sign</th>
                        <th>Signed By</th>
                        <th>Signed Time</th>
                    </tr>
                </thead>
                <tbody>
                    {reports &&
                        reports.map((report, index) => {
                            return (
                                <ReportTableRow
                                    key={report?._id}
                                    report={report}
                                    index={index}
                                    setReports={setReports}
                                />
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
}

export default ReportTable;
