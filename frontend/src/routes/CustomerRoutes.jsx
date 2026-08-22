import ProtectedRoutes from "./ProtectedRoutes";
import CustomerLayout from "../layouts/CustomerLayout";

import CustomerDashboard from "../pages/account/CustomerDashboard";
import AccountProfile from "../pages/account/AccountProfile";

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
        element: <AccountProfile />
      }
    ],
  },
];

export default customerRoutes;
