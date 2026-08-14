import { useRoutes } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import Services from "../pages/Services";
import About from "../pages/About";
import Projects from "../pages/Projects";
import Careers from "../pages/Careers";
import Contacts from "../pages/Contacts";

const AppRoutes = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: "about",
          element: <About />
        },
        {
          path: "services",
          element: <Services />
        },
        {
          path: "projects",
          element: <Projects />
        },
        {
          path: "careers",
          element: <Careers />,
        },
        {
          path: "contacts",
          element: <Contacts />
        }
      ]
    }
  ]);

  return routes;
}

export default AppRoutes;