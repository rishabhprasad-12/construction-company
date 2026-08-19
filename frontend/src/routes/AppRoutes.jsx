import { useRoutes } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import Services from "../pages/Services";
import About from "../pages/About";
import Projects from "../pages/Projects";
import Careers from "../pages/Careers";
import Contacts from "../pages/Contacts";
import ProjectDetails from "../pages/ProjectDetails";
import Quote from "../pages/Quote";
import ServiceDetails from "../pages/ServiceDetails";
import CareerDetails from "../pages/CareerDetails";
import JobApplication from "../pages/JobApplication";

import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";

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
          path: "services/:id",
          element: <ServiceDetails />
        },
        {
          path: "projects",
          element: <Projects />
        },
        {
          path: "projects/:id",
          element: <ProjectDetails />
        },
        {
          path: "careers",
          element: <Careers />,
        },
        {
           path: "/careers/:id",
          element: <CareerDetails />
        },
        {
          path: "/careers/:id/apply",
          element: <JobApplication />
        },
        {
          path: "contacts",
          element: <Contacts />
        },
        {
          path: "quote",
          element: <Quote />
        }
      ]
    },
    {
      path: "/auth/login",
      element: <Login />
    },
    {
      path: "/auth/register",
      element: <Register />
    }
  ]);

  return routes;
}

export default AppRoutes;