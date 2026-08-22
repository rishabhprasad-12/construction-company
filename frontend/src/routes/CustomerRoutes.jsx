import ProtectedRoutes from "./ProtectedRoutes";
import CustomerLayout from "../layouts/CustomerLayout";

import CustomerDashboard from "../pages/account/CustomerDashboard";
import AccountProfile from "../pages/account/AccountProfile";
import MyQuotations from "../pages/account/MyQuotations";
import MyApplications from "../pages/account/MyApplication";

const customerRoutes = [
  {
    path: "/account",
    element: (
      <ProtectedRoutes allowedRoles={"customer"}>
        <CustomerLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        index: true,
        element: <CustomerDashboard />,
      },
      {
        path: "profile",
        element: <AccountProfile />,
      },
      {
        path: "quotations",
        element: <MyQuotations />,
      }, 
      {
        path: "applications",
        element: <MyApplications />
      }
    ],
  },
];

export default customerRoutes;
