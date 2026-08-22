import { useEffect, useState } from "react";
import {
  FileText,
  MapPin,
  Calendar,
  IndianRupee,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";

import { getMyQuotes } from "../../services/quoteService";

const MyQuotations = () => {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuotations = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getMyQuotes();

        setQuotations(response.data || []);
      } catch (error) {
        console.error(error);

        setError(error.response?.data?.message || "Failed to load quotations");
      } finally {
        setLoading(false);
      }
    };

    fetchQuotations();
  }, []);

  const getStatusStyles = (status) => {
    const styles = {
      pending: "bg-amber-100 text-amber-700",
      contacted: "bg-blue-100 text-blue-700",
      approved: "bg-green-100 text-green-700",
      rejected: "bg-red-100 text-red-700",
    };

    return styles[status?.toLowerCase()] || "bg-slate-100 text-slate-600";
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Loader2 size={20} className="animate-spin" />
          Loading quotations...
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold text-amber-600">MY REQUESTS</p>

          <h1 className="mt-1 text-2xl font-bold text-slate-950 sm:text-3xl">
            My Quotations
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Track and manage your construction quotation requests.
          </p>
        </div>

        <Link
          to="/quote"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          <FileText size={18} />
          Request New Quote
        </Link>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Empty State */}
      {!error && quotations.length === 0 && (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-600">
            <FileText size={26} />
          </div>

          <h2 className="mt-5 text-lg font-bold text-slate-950">
            No quotations yet
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            You haven't submitted any quotation requests yet. Tell us about your
            project and we'll help you get started.
          </p>

          <Link
            to="/quote"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
          >
            Request a Quote
            <ArrowRight size={17} />
          </Link>
        </div>
      )}

      {/* Quotation Cards */}
      {!error && quotations.length > 0 && (
        <div className="mt-8 space-y-4">
          {quotations.map((quotation) => (
            <article
              key={quotation._id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6"
            >
              <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
                {/* Main Information */}
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-lg font-bold text-slate-950">
                      {quotation.projectType}
                    </h2>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusStyles(
                        quotation.status,
                      )}`}
                    >
                      {quotation.status}
                    </span>
                  </div>

                  <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                    {quotation.projectDescription}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
                    {quotation.location && (
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <MapPin size={16} />
                        {quotation.location}
                      </div>
                    )}

                    {quotation.estimatedBudget && (
                      <div className="flex items-center gap-1 text-sm text-slate-500">
                        <IndianRupee size={16} />
                        {quotation.estimatedBudget}
                      </div>
                    )}

                    {quotation.preferredStartDate && (
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Calendar size={16} />
                        {new Date(
                          quotation.preferredStartDate,
                        ).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>

                {/* Created Date */}
                <div className="shrink-0 border-t border-slate-100 pt-4 md:border-l md:border-t-0 md:pl-6 md:pt-0">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Requested
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {new Date(quotation.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyQuotations;
