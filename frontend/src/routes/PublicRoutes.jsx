import MainLayout from "../layouts/MainLayout";

import Home from "../pages/public/Home";
import Services from "../pages/public/Services";
import About from "../pages/public/About";
import Projects from "../pages/public/Projects";
import Careers from "../pages/public/Careers";
import Contacts from "../pages/public/Contacts";
import ProjectDetails from "../pages/public/ProjectDetails";
import Quote from "../pages/public/Quote";
import ServiceDetails from "../pages/public/ServiceDetails";
import CareerDetails from "../pages/public/CareerDetails";
import JobApplication from "../pages/public/JobApplication";

import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";

const publicRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "services/:id",
        element: <ServiceDetails />,
      },
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "projects/:id",
        element: <ProjectDetails />,
      },
      {
        path: "careers",
        element: <Careers />,
      },
      {
        path: "/careers/:id",
        element: <CareerDetails />,
      },
      {
        path: "/careers/:id/apply",
        element: <JobApplication />,
      },
      {
        path: "contacts",
        element: <Contacts />,
      },
      {
        path: "quote",
        element: <Quote />,
      },
    ],
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/register",
    element: <Register />,
  },
];

export default publicRoutes;
