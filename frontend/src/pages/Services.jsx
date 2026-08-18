import { useEffect, useMemo, useState } from "react";

import SectionHeading from "../components/common/SectionHeading";
import ServiceCard from "../components/home/ServiceCard";
import { getServices } from "../services/serviceService";

const Services = () => {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getServices();

      // Adjust this if your backend response structure is different
      const servicesData =
        response.data?.services || response.services || response.data || [];

      setServices(servicesData);
    } catch (error) {
      console.error("Failed to fetch services:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load services. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const filteredServices = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    if (!searchValue) return services;

    return services.filter((service) =>
      service.title?.toLowerCase().includes(searchValue),
    );
  }, [services, search]);

  const clearSearch = () => {
    setSearch("");
  };

  return (
    <main className="bg-slate-50">
      {/* Page Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <SectionHeading
            eyebrow="Our Services"
            title="Built around your construction needs"
            description="From planning and design to construction and renovation, explore the services we provide."
          />
        </div>
      </section>

      {/* Services */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Top Bar */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              {!loading && !error && (
                <p className="text-sm text-slate-500">
                  {filteredServices.length}{" "}
                  {filteredServices.length === 1 ? "service" : "services"}{" "}
                  available
                </p>
              )}
            </div>

            {/* Search */}
            <div className="w-full sm:max-w-xs">
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search services..."
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
                    <div className="h-6 w-3/4 rounded bg-slate-200" />
                    <div className="h-4 w-full rounded bg-slate-200" />
                    <div className="h-4 w-2/3 rounded bg-slate-200" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="mt-10 rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
              <h2 className="text-lg font-semibold text-red-700">
                Something went wrong
              </h2>

              <p className="mt-2 text-sm text-red-600">{error}</p>

              <button
                type="button"
                onClick={fetchServices}
                className="mt-5 rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && filteredServices.length === 0 && (
            <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-10 text-center">
              <h2 className="text-xl font-bold text-slate-950">
                No services found
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Try searching for a different service.
              </p>

              {search && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="mt-5 text-sm font-semibold text-amber-500 transition hover:text-amber-600"
                >
                  Clear search
                </button>
              )}
            </div>
          )}

          {/* Services Grid */}
          {!loading && !error && filteredServices.length > 0 && (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredServices.map((service) => (
                <ServiceCard key={service._id} service={service} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Services;
