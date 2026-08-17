import { useEffect, useMemo, useState } from "react";
import SectionHeading from "../components/common/SectionHeading";
import ProjectCard from "../components/home/ProjectCard";
import { getProjects } from "../services/projectService";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getProjects();
        console.log(response?.data)
        setProjects(response.data || []);
      } catch (error) {
        console.log(error);
        console.error(error?.response?.data?.message);
        setError("Unable to load projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(projects.map((project) => project.category).filter(Boolean)),
    ];

    return ["All", ...uniqueCategories];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return projects.filter((project) => {
      const matchesCategory =
        category === "All" || project.category === category;

      const matchesSearch =
        !searchValue ||
        project.title?.toLowerCase().includes(searchValue) ||
        project.location?.toLowerCase().includes(searchValue) ||
        project.category?.toLowerCase().includes(searchValue);

      return matchesCategory && matchesSearch;
    });
  }, [projects, search, category]);

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
  };

  return (
    <main className="bg-slate-50">
      {/* Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <SectionHeading
            eyebrow="Our Work"
            title="Projects built with purpose"
            description="Explore our construction projects across residential, commercial and institutional spaces."
          />
        </div>
      </section>

      {/* Projects */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Categories */}
            <div className="-mx-1 flex overflow-x-auto px-1 pb-1 scrollbar-hide">
              <div className="flex gap-2">
                {categories.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCategory(item)}
                    className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      category === item
                        ? "bg-slate-950 text-white"
                        : "bg-white text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Search */}
            <div className="w-full lg:max-w-xs">
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects..."
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10"
              />
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white"
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
            <div className="mt-10 rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
              <p className="text-sm text-red-600">{error}</p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-4 rounded-lg bg-slate-950 px-5 py-2.5 text-sm font-medium text-white"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && filteredProjects.length === 0 && (
            <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-10 text-center sm:p-12">
              <h3 className="text-lg font-bold text-slate-900">
                No projects found
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Try another search term or category.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 text-sm font-semibold text-amber-500 hover:text-amber-600"
              >
                Clear filters
              </button>
            </div>
          )}

          {/* Results */}
          {!loading && !error && filteredProjects.length > 0 && (
            <>
              <div className="mt-8 flex items-center justify-between">
                <p className="text-sm text-slate-500">
                  Showing{" "}
                  <span className="font-semibold text-slate-900">
                    {filteredProjects.length}
                  </span>{" "}
                  project
                  {filteredProjects.length !== 1 ? "s" : ""}
                </p>

                {(search || category !== "All") && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-sm font-medium text-slate-600 hover:text-amber-500"
                  >
                    Clear filters
                  </button>
                )}
              </div>

              <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default Projects;
