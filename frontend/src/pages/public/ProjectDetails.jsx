import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar, MapPin, User } from "lucide-react";

import { getProjectById } from "../../services/projectService";

const ProjectDetails = () => {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getProjectById(id);

        const projectData =
          response.data?.project || response.data || response.project;

        setProject(projectData);
      } catch (error) {
        console.error("Failed to fetch project:", error);
        setError("Unable to load this project.");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <main className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 w-32 rounded bg-slate-200" />

            <div className="mt-10 aspect-[16/8] rounded-2xl bg-slate-200" />

            <div className="mt-10 grid gap-10 lg:grid-cols-[2fr_1fr]">
              <div className="space-y-4">
                <div className="h-8 w-3/4 rounded bg-slate-200" />
                <div className="h-4 w-full rounded bg-slate-200" />
                <div className="h-4 w-5/6 rounded bg-slate-200" />
              </div>

              <div className="h-72 rounded-2xl bg-slate-200" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !project) {
    return (
      <main className="bg-slate-50 py-20">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h1 className="text-2xl font-bold text-slate-900">
            Project not found
          </h1>

          <p className="mt-3 text-slate-500">
            {error || "The project you're looking for doesn't exist."}
          </p>

          <Link
            to="/projects"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
          >
            <ArrowLeft size={17} />
            Back to projects
          </Link>
        </div>
      </main>
    );
  }

  const images = project.images?.filter(Boolean) || [];
  const heroImage = images[0] || "/images/project-placeholder.jpg";

  return (
    <main className="bg-slate-50">
      {/* Back navigation */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-950"
          >
            <ArrowLeft size={17} />
            Back to projects
          </Link>
        </div>
      </section>

      {/* Hero */}
      <section className="bg-white pb-12 pt-8 sm:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500">
                {project.category}
              </span>

              <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                {project.title}
              </h1>

              {project.location && (
                <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">
                  <MapPin size={17} />
                  {project.location}
                </div>
              )}
            </div>

            {project.status && (
              <div className="lg:flex lg:justify-end">
                <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium capitalize text-slate-600">
                  {project.status}
                </span>
              </div>
            )}
          </div>

          {/* Main image */}
          <div className="mt-10 overflow-hidden rounded-2xl bg-slate-200">
            <img
              src={heroImage}
              alt={project.title}
              className="aspect-[16/9] w-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/images/project-placeholder.jpg";
              }}
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.6fr_0.8fr] lg:px-8">
          {/* Left */}
          <div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500">
                Project Overview
              </p>

              <h2 className="mt-3 text-2xl font-bold text-slate-950 sm:text-3xl">
                Built with attention to every detail
              </h2>

              <p className="mt-6 whitespace-pre-line leading-8 text-slate-600">
                {project.description}
              </p>
            </div>

            {/* Gallery */}
            {images.length > 1 && (
              <div className="mt-14">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500">
                  Gallery
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {images.slice(1).map((image, index) => (
                    <div
                      key={`${image}-${index}`}
                      className="overflow-hidden rounded-2xl bg-slate-200"
                    >
                      <img
                        src={image}
                        alt={`${project.title} ${index + 2}`}
                        className="aspect-[4/3] h-full w-full object-cover transition duration-500 hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.src =
                            "/images/project-placeholder.jpg";
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-bold text-slate-950">
                Project Details
              </h3>

              <div className="mt-6 space-y-5">
                <DetailItem
                  icon={<User size={18} />}
                  label="Client"
                  value={project.client}
                />

                <DetailItem
                  icon={<MapPin size={18} />}
                  label="Location"
                  value={project.location}
                />

                <DetailItem
                  icon={<Calendar size={18} />}
                  label="Start Date"
                  value={formatDate(project.startDate)}
                />

                <DetailItem
                  icon={<Calendar size={18} />}
                  label="Completion"
                  value={formatDate(project.completionDate)}
                />
              </div>

              <Link
                to="/quote"
                state={{
                  projectId: project._id,
                  projectTitle: project.title,
                }}
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
              >
                Start a similar project
                <ArrowRight size={17} />
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

const DetailItem = ({ icon, label, value }) => {
  if (!value) return null;

  return (
    <div className="flex gap-3">
      <div className="mt-0.5 text-amber-500">{icon}</div>

      <div>
        <p className="text-xs font-medium text-slate-400">{label}</p>

        <p className="mt-1 text-sm font-medium text-slate-700">{value}</p>
      </div>
    </div>
  );
};

const formatDate = (date) => {
  if (!date) return null;

  return new Intl.DateTimeFormat("en-IN", {
    month: "short",
    year: "numeric",
  }).format(new Date(date));
};

export default ProjectDetails;
