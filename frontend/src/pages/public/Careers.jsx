import { useEffect, useMemo, useState } from "react";
import { BriefcaseBusiness, MapPin, Search } from "lucide-react";

import { getCareers } from "../../services/careerService";
import CareerCard from "../../components/careers/CareerCard";

const Careers = () => {
  const [careers, setCareers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCareers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getCareers();

      const careersData =
        response.data?.careers || response.careers || response.data || [];

      setCareers(careersData);
    } catch (error) {
      console.error("Failed to fetch careers:", error);

      setError(
        error.response?.data?.message || "Unable to load career opportunities.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCareers();
  }, []);

  const filteredCareers = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    if (!searchValue) return careers;

    return careers.filter((career) =>
      [career.title, career.department, career.location, career.employmentType]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(searchValue)),
    );
  }, [careers, search]);

  return (
    <main className="bg-slate-50">
      {/* Hero */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500">
            Careers
          </p>

          <h1 className="mx-auto mt-4 max-w-3xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            Build your career with us
          </h1>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-600">
            Join a team passionate about building quality spaces, solving real
            problems and creating meaningful work.
          </p>
        </div>
      </section>

      {/* Jobs */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Search */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              {!loading && !error && (
                <p className="text-sm text-slate-500">
                  {filteredCareers.length}{" "}
                  {filteredCareers.length === 1
                    ? "open position"
                    : "open positions"}
                </p>
              )}
            </div>

            <div className="relative w-full sm:max-w-sm">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search jobs..."
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10"
              />
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="mt-10 space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6"
                >
                  <div className="h-6 w-1/3 rounded bg-slate-200" />

                  <div className="mt-4 flex gap-3">
                    <div className="h-4 w-24 rounded bg-slate-200" />
                    <div className="h-4 w-24 rounded bg-slate-200" />
                  </div>

                  <div className="mt-5 h-4 w-3/4 rounded bg-slate-200" />
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="mt-10 rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
              <h2 className="font-semibold text-red-700">
                Unable to load careers
              </h2>

              <p className="mt-2 text-sm text-red-600">{error}</p>

              <button
                type="button"
                onClick={fetchCareers}
                className="mt-5 rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && filteredCareers.length === 0 && (
            <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-10 text-center">
              <BriefcaseBusiness size={40} className="mx-auto text-slate-400" />

              <h2 className="mt-4 text-xl font-bold text-slate-950">
                No positions found
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                {search
                  ? "Try searching for something else."
                  : "There are currently no open positions."}
              </p>
            </div>
          )}

          {/* Career Cards */}
          {!loading && !error && filteredCareers.length > 0 && (
            <div className="mt-8 space-y-4">
              {filteredCareers.map((career) => (
                <CareerCard key={career._id} career={career} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Careers;
