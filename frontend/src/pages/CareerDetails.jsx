import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  MapPin,
} from "lucide-react";

import { getCareerById } from "../services/careerService";

const CareerDetails = () => {
  const { id } = useParams();

  const [career, setCareer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCareer = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getCareerById(id);

        const careerData =
          response.data?.career ||
          response.career ||
          response.data;

        setCareer(careerData);
      } catch (error) {
        console.error("Failed to fetch career:", error);

        setError(
          error.response?.data?.message ||
            "Unable to load this job opportunity."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCareer();
  }, [id]);

  if (loading) {
    return <CareerDetailsSkeleton />;
  }

  if (error || !career) {
    return (
      <main className="bg-slate-50 py-20">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h1 className="text-2xl font-bold text-slate-950">
            Job not found
          </h1>

          <p className="mt-3 text-slate-500">
            {error ||
              "This position may no longer be available."}
          </p>

          <Link
            to="/careers"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <ArrowLeft size={17} />
            Back to careers
          </Link>
        </div>
      </main>
    );
  }

  const deadline = career.deadline
    ? new Date(career.deadline)
    : null;

  const isExpired =
    deadline && deadline.getTime() < Date.now();

  return (
    <main className="bg-slate-50">
      {/* Header */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            to="/careers"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-950"
          >
            <ArrowLeft size={17} />
            Back to careers
          </Link>

          <div className="mt-10 max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500">
              {career.department}
            </p>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              {career.title}
            </h1>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <MapPin size={17} />
                {career.location}
              </span>

              <span className="flex items-center gap-2">
                <BriefcaseBusiness size={17} />
                {career.employmentType}
              </span>

              {career.experience && (
                <span>
                  Experience: {career.experience}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">

          {/* Main Content */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">

            {/* Description */}
            <section>
              <h2 className="text-xl font-bold text-slate-950 sm:text-2xl">
                About the role
              </h2>

              <p className="mt-5 whitespace-pre-line leading-8 text-slate-600">
                {career.description}
              </p>
            </section>

            {/* Requirements */}
            {career.requirements?.length > 0 && (
              <section className="mt-10 border-t border-slate-200 pt-10">
                <h2 className="text-xl font-bold text-slate-950 sm:text-2xl">
                  Requirements
                </h2>

                <div className="mt-5 space-y-4">
                  {career.requirements.map(
                    (requirement, index) => (
                      <div
                        key={`${requirement}-${index}`}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle2
                          size={20}
                          className="mt-1 shrink-0 text-amber-500"
                        />

                        <p className="leading-7 text-slate-600">
                          {requirement}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </section>
            )}
          </div>

          {/* Job Summary */}
          <aside>
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-lg font-bold text-slate-950">
                Job details
              </h2>

              <div className="mt-6 space-y-5">

                <JobDetail
                  icon={<BriefcaseBusiness size={18} />}
                  label="Employment Type"
                  value={career.employmentType}
                />

                <JobDetail
                  icon={<MapPin size={18} />}
                  label="Location"
                  value={career.location}
                />

                {career.experience && (
                  <JobDetail
                    label="Experience"
                    value={career.experience}
                  />
                )}

                {career.salary && (
                  <JobDetail
                    label="Salary"
                    value={career.salary}
                  />
                )}

                {deadline && (
                  <JobDetail
                    icon={<CalendarDays size={18} />}
                    label="Application Deadline"
                    value={deadline.toLocaleDateString(
                      "en-IN",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  />
                )}

              </div>

              {/* Apply */}
              {career.isActive && !isExpired ? (
                <Link
                  to={`/careers/${career._id}/apply`}
                  className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
                >
                  Apply Now
                  <ArrowRight size={17} />
                </Link>
              ) : (
                <div className="mt-7 rounded-xl bg-slate-100 px-4 py-3 text-center text-sm font-semibold text-slate-500">
                  Applications closed
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

const JobDetail = ({ icon, label, value }) => {
  return (
    <div className="flex gap-3">
      {icon && (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
          {icon}
        </div>
      )}

      <div>
        <p className="text-xs font-medium text-slate-400">
          {label}
        </p>

        <p className="mt-1 text-sm font-semibold text-slate-900">
          {value}
        </p>
      </div>
    </div>
  );
};

const CareerDetailsSkeleton = () => {
  return (
    <main className="animate-pulse bg-slate-50">
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="h-5 w-32 rounded bg-slate-200" />

          <div className="mt-10 h-12 w-2/3 rounded bg-slate-200" />

          <div className="mt-6 h-5 w-1/2 rounded bg-slate-200" />
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
          <div className="h-96 rounded-2xl bg-slate-200" />

          <div className="h-80 rounded-2xl bg-slate-200" />
        </div>
      </section>
    </main>
  );
};

export default CareerDetails;