import { useRoutes } from "react-router-dom";

import publicRoutes  from "../routes/PublicRoutes";
import customerRoutes from "../routes/CustomerRoutes";

const AppRoutes = () => {
  return useRoutes([...publicRoutes, ...customerRoutes]);
};

export default AppRoutes;
