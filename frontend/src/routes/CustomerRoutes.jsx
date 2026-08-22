import ProtectedRoutes from "./ProtectedRoutes";
import CustomerLayout from "../layouts/CustomerLayout";

import CustomerDashboard from "../pages/account/CustomerDashboard";
import AccountProfile from "../pages/account/AccountProfile";
import MyQuotations from "../pages/account/MyQuotations";

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
    ],
  },
];

export default customerRoutes;
