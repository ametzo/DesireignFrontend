import React from "react";
import { Link } from "react-router-dom";
import { FaUserFriends } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";
import { BsFillFileEarmarkSpreadsheetFill } from "react-icons/bs";
import { RiCustomerService2Line } from "react-icons/ri";
import { GrUserWorker } from "react-icons/gr";
import { RiServiceFill } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";
import { TbReportSearch } from "react-icons/tb";
import Card from "../../components/Card";
import { useSelector } from "react-redux";

const dashboardData = [
    {
        icon: FaUserFriends,
        title: "User Roles",
        link: "user-roles",
        roleNo: 1001,
    },
    { icon: FaUserPlus, title: "Sub Users", link: "subUser", roleNo: 1002 },
    {
        icon: BsFillFileEarmarkSpreadsheetFill,
        title: "Leads",
        link: "leads",
        roleNo: 1003,
    },
    {
        icon: RiCustomerService2Line,
        title: "Customers",
        link: "customer",
        roleNo: 1004,
    },
    { icon: GrUserWorker, title: "Workers", link: "worker", roleNo: 1005 },
    { icon: RiServiceFill, title: "Services", link: "service", roleNo: 1006 },
    { icon: TbReportSearch, title: "Reports", link: "reports", roleNo: 1007 },
    { icon: BiSupport, title: "Support", link: "support", roleNo: 1008 },
];

function Dashboard() {
    const { roles, admin } = useSelector((state) => state.admin);

    // Function to check if any role has the necessary permissions for a specific card
    const hasPermissionForCard = (roleNo, cardLink) => {
        // Loop through all roles
        if (roles) {
            for (let role of roles) {
                if (role?.stepNumber === roleNo) {
                    console.log("Role", role);
                    // Check if the role has the 'view' permission for this card's link
                    if (role?.permissions.includes(`view`)) {
                        return true;
                    }
                }
            }
            return false;
        }
    };

    // Filter cards based on role permissions
    const filteredData = dashboardData.filter((item) =>
        hasPermissionForCard(item?.roleNo, item?.link)
    );

    console.log(filteredData, "filter");

    return (
        <div className="bg-mainBg h-full flex flex-col items-center pt-[40px] md:pt-[120px] px-4 lg:px-16">
            <div className="container mx-auto flex-grow">
                <div className="flex flex-wrap justify-center mx-3 mt-7 md:mx-0">
                    {filteredData.map((item, index) => (
                        <Card
                            key={index}
                            icon={item.icon}
                            title={item.title}
                            link={item.link}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
