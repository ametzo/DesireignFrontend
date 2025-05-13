import AdminLayout from "../layout/AdminLayout";
import AddCustomerPage from "../pages/Customers/AddCustomerPage";
import CustomerListingPage from "../pages/Customers/CustomerListingPage";
import EditCustomerPage from "../pages/Customers/EditCustomerPage";
import Dashboard from "../pages/Dashboard/Dashboard";
import NotFound from "../pages/NotFound";
import AddLeadsPage from "../pages/Leads/AddLeadsPage";
import EditLeadsPage from "../pages/Leads/EditLeadPage";
import LeadDetailPage from "../pages/Leads/LeadDetailPage";
import LeadsListingPage from "../pages/Leads/LeadsListingPage";
import LoginPage from "../pages/LoginPage";
import AddServicePage from "../pages/Service/AddServicesPage";
import EditServicePage from "../pages/Service/EditServicePage";
import ServiceDetailPage from "../pages/Service/ServiceDetailPage";
import ServiceListingPage from "../pages/Service/ServiceListingPage";
import SubUserList from "../pages/SubUser/SubUserList";
import SupportChatPage from "../pages/Support/SupportChatPage";
import SupportListingPage from "../pages/Support/SupportListingPage";
import UserRoleListingPage from "../pages/UserRoles/UserRoleListingPage";
import AddWorkerPage from "../pages/Worker/AddWorkerPage";
import EditWorkerPage from "../pages/Worker/EditWorkerPage";
import WorkerListingPage from "../pages/Worker/WorkerLisitngPage";
import AdminPrivateRoute from "./AdminPrivateRouter";
import LoginProtectRouter from "./LoginProtectRouter";
import RoleBasedRouteWrapper from "./RoleBasedRouter";
import CustomerDetailPage from "../pages/Customers/CustomerDetailPage";
import SessionPage from "../pages/SessionPage";
import ReportListingPage from "../pages/Reports/ReportListingPage";
import PrivacyPolicy from "../pages/PrivacyAndPolicy";
import Support from "../pages/Support";

const ThemeRoutes = [
    {
        path: "/",
        element: (
            <AdminPrivateRoute>
                <RoleBasedRouteWrapper>
                    <AdminLayout />
                </RoleBasedRouteWrapper>
            </AdminPrivateRoute>
        ),
        children: [
            {
                path: "",
                element: (
                    // <DashboardPrivateRoute>
                    <Dashboard />
                    // </DashboardPrivateRoute>
                ),
            },
            {
                path: "/subUser",
                element: <SubUserList />,
            },
            {
                path: "/user-roles",
                element: <UserRoleListingPage />,
            },
            {
                path: "/leads",
                element: <LeadsListingPage />,
            },
            {
                path: "/leads/add",
                element: <AddLeadsPage />,
            },
            {
                path: "/leads/:id/edit",
                element: <EditLeadsPage />,
            },
            {
                path: "/leads/:id/details",
                element: <LeadDetailPage />,
            },
            {
                path: "/customer",
                element: <CustomerListingPage />,
            },
            {
                path: "/customer/add",
                element: <AddCustomerPage />,
            },
            {
                path: "/customer/:id/edit",
                element: <EditCustomerPage />,
            },
            {
                path: "/customer/:id/details",
                element: <CustomerDetailPage />,
            },

            {
                path: "/worker",
                element: <WorkerListingPage />,
            },
            {
                path: "/worker/add",
                element: <AddWorkerPage />,
            },
            {
                path: "/worker/:id/edit",
                element: <EditWorkerPage />,
            },
            {
                path: "/service",
                element: <ServiceListingPage />,
            },
            {
                path: "/service/:id/details",
                element: <ServiceDetailPage />,
            },
            {
                path: "/service/add",
                element: <AddServicePage />,
            },
            {
                path: "/service/:id/edit",
                element: <EditServicePage />,
            },
            {
                path: "/support",
                element: <SupportListingPage />,
            },
            {
                path: "/support/:id/chat",
                element: <SupportChatPage />,
            },
            {
                path: "/reports",
                element: <ReportListingPage />,
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ],
    },
    {
        path: "/login",
        element: (
            <LoginProtectRouter>
                <LoginPage />
            </LoginProtectRouter>
        ),
    },
    {
        path: "/session/:token",
        element: <SessionPage />,
    },
    {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
    },
    {
        path: "/supports",
        element: <Support />,
    },
];

export default ThemeRoutes;
