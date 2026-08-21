import { FileText, BriefcaseBusiness, Clock3, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { useAuth } from "../../context/AuthContext";
import { getMyQuotes } from "../../services/quoteService";
import { getMyApplications } from "../../services/jobApplicationService";

const CustomerDashboard = () => {
  const { user } = useAuth();

  const [quotes, setQuotes] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const [quotesResponse, applicationsResponse] = await Promise.all([
          getMyQuotes(),
          getMyApplications(),
        ]);

        setQuotes(quotesResponse.data || []);
        setApplications(applicationsResponse.data || []);
      } catch (error) {
        console.error(error?.response?.data?.message);
        setError("unable to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const totalQuotes = quotes.length;

  const pendingQuote = quotes.filter(
    (quote) => quote.status === "pending",
  ).length;

  // Temporary data — replace with API data later
  const stats = [
    {
      title: "Total Quotations",
      value: totalQuotes,
      icon: FileText,
      description: "Quotes you have requested",
    },
    {
      title: "Pending Quotations",
      value: pendingQuote,
      icon: Clock3,
      description: "Currently under review",
    },
    {
      title: "Job Applications",
      value: 0,
      icon: BriefcaseBusiness,
      description: "Applications you have submitted",
    },
  ];

  return (
    <div>
      {/* Welcome Section */}
      <section className="rounded-2xl bg-slate-950 p-6 sm:p-8">
        <p className="text-sm font-medium text-amber-500">CUSTOMER DASHBOARD</p>

        <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
          Welcome back, {user?.name || "User"}!
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
          Manage your quotations, job applications, and account information from
          one place.
        </p>
      </section>

      {/* Statistics */}
      <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {stat.title}
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-slate-950">
                    {stat.value}
                  </h2>
                </div>

                <div className="rounded-xl bg-amber-100 p-3 text-amber-600">
                  <Icon size={22} />
                </div>
              </div>

              <p className="mt-4 text-xs text-slate-500">{stat.description}</p>
            </div>
          );
        })}
      </section>

      {/* Quick Actions */}
      <section className="mt-8">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold text-amber-600">
              QUICK ACTIONS
            </p>

            <h2 className="mt-1 text-xl font-bold text-slate-950">
              What would you like to do?
            </h2>
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {/* Get Quote */}
          <Link
            to="/quote"
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-amber-300 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-amber-100 p-3 text-amber-600">
                <FileText size={24} />
              </div>

              <ArrowRight
                size={20}
                className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-amber-600"
              />
            </div>

            <h3 className="mt-5 text-lg font-bold text-slate-950">
              Request a Quote
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Tell us about your construction project and get a customized
              quotation.
            </p>
          </Link>

          {/* Browse Careers */}
          <Link
            to="/careers"
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-amber-300 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-slate-100 p-3 text-slate-700">
                <BriefcaseBusiness size={24} />
              </div>

              <ArrowRight
                size={20}
                className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-amber-600"
              />
            </div>

            <h3 className="mt-5 text-lg font-bold text-slate-950">
              Explore Careers
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Browse available positions and submit your job application.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default CustomerDashboard;
