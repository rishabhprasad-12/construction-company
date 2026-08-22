import { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  MapPin,
  Calendar,
  Building2,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";

import api from "../../api/axios";
import { getMyApplications } from "../../services/jobApplicationService";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getMyApplications();

        setApplications(response.data || []);
      } catch (error) {
        console.error(error);

        setError(
          error.response?.data?.message || "Failed to load applications",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const getStatusStyles = (status) => {
    const styles = {
      pending: "bg-amber-100 text-amber-700",
      reviewed: "bg-blue-100 text-blue-700",
      shortlisted: "bg-purple-100 text-purple-700",
      accepted: "bg-green-100 text-green-700",
      rejected: "bg-red-100 text-red-700",
    };

    return styles[status?.toLowerCase()] || "bg-slate-100 text-slate-600";
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Loader2 size={20} className="animate-spin" />
          Loading applications...
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold text-amber-600">MY CAREER</p>

          <h1 className="mt-1 text-2xl font-bold text-slate-950 sm:text-3xl">
            My Applications
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Track the status of your job applications.
          </p>
        </div>

        <Link
          to="/careers"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          <BriefcaseBusiness size={18} />
          Browse Careers
        </Link>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Empty State */}
      {!error && applications.length === 0 && (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-600">
            <BriefcaseBusiness size={26} />
          </div>

          <h2 className="mt-5 text-lg font-bold text-slate-950">
            No applications yet
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            You haven't applied for any positions yet. Explore our available
            opportunities and find the right role for you.
          </p>

          <Link
            to="/careers"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
          >
            Explore Careers
            <ArrowRight size={17} />
          </Link>
        </div>
      )}

      {/* Applications */}
      {!error && applications.length > 0 && (
        <div className="mt-8 space-y-4">
          {applications.map((application) => {
            const career = application.career;

            return (
              <article
                key={application._id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6"
              >
                <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
                  {/* Main Content */}
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-lg font-bold text-slate-950">
                        {career?.title || "Job Position"}
                      </h2>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusStyles(
                          application.status,
                        )}`}
                      >
                        {application.status || "pending"}
                      </span>
                    </div>

                    {/* Job Details */}
                    <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
                      {career?.department && (
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <Building2 size={16} />
                          {career.department}
                        </div>
                      )}

                      {career?.location && (
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <MapPin size={16} />
                          {career.location}
                        </div>
                      )}

                      {career?.employmentType && (
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <BriefcaseBusiness size={16} />
                          {career.employmentType}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Applied Date */}
                  <div className="shrink-0 border-t border-slate-100 pt-4 md:border-l md:border-t-0 md:pl-6 md:pt-0">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Applied
                    </p>

                    <p className="mt-1 flex items-center gap-2 text-sm font-medium text-slate-700">
                      <Calendar size={15} />

                      {application.createdAt
                        ? new Date(application.createdAt).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyApplications;
