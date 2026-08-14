import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import SectionHeading from "../common/SectionHeading";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    _id: "1",
    title: "Green Valley Apartments",
    category: "Residential",
    location: "Ranchi, Jharkhand",
    status: "ongoing",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    _id: "2",
    title: "Skyline Business Tower",
    category: "Commercial",
    location: "Jamshedpur, Jharkhand",
    status: "ongoing",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    _id: "3",
    title: "Oakwood School Campus",
    category: "Institutional",
    location: "Bokaro, Jharkhand",
    status: "completed",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80",
    ],
  },
];

const FeaturedProjects = () => {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Our Work"
            title="Projects we're proud to build"
            description="Explore some of the projects where our planning, craftsmanship and attention to detail come together."
          />

          <Link
            to="/projects"
            className="hidden shrink-0 items-center gap-2 text-sm font-semibold text-slate-900 hover:text-amber-500 md:inline-flex"
          >
            View all projects
            <ArrowRight size={17} />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>

        <div className="mt-8 flex justify-center md:hidden">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-amber-500"
          >
            View all projects
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
