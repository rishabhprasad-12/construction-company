import ProtectedRoutes from "./ProtectedRoutes";
import CustomerLayout from "../layouts/CustomerLayout";

import CustomerDashboard from "../pages/account/CustomerDashboard";

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
    ],
  },
];

export default customerRoutes;
