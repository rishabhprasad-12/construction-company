import { useState, useEffect } from "react";

import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import SectionHeading from "../common/SectionHeading";
import ProjectCard from "./ProjectCard";
import CardCarousel from "../common/CardCarousel";

import { getFeaturedProjects } from "../../services/projectService";

const FeaturedProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getFeaturedProjects();

        setProjects(response?.data || []);
      } catch (error) {
        console.error(error?.response?.data?.message);

        setError("Unable to load projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            align="center"
            eyebrow="Our Work"
            title="Projects we're proud to build"
            description="Explore some of the projects where our planning, craftsmanship and attention to detail come together."
          />
        </div>

        {/* Loading */}
        {loading && (
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse overflow-hidden rounded-2xl border border-slate-200"
              >
                <div className="aspect-[4/3] bg-slate-200" />

                <div className="space-y-3 p-6">
                  <div className="h-3 w-20 rounded bg-slate-200" />
                  <div className="h-5 w-40 rounded bg-slate-200" />
                  <div className="h-3 w-32 rounded bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="mt-12 rounded-xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && projects.length === 0 && (
          <div className="mt-12 rounded-xl border border-slate-200 bg-slate-50 p-10 text-center">
            <p className="text-slate-500">No featured projects available.</p>
          </div>
        )}

        {/* Projects */}
        {!loading && !error && projects.length > 0 && (
          <div className="mt-16">
            <CardCarousel
              desktopSlides={3}
              tabletSlides={2}
              totalSlides={projects.length}
            >
              {projects.map((project) => (
                <div key={project._id} className="px-3">
                  <ProjectCard project={project} />
                </div>
              ))}
            </CardCarousel>
          </div>
        )}

        <div className="mt-8 flex justify-center ">
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
