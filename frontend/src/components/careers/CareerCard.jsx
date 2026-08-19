import { Link } from "react-router-dom";
import { ArrowRight, BriefcaseBusiness, MapPin } from "lucide-react";

const CareerCard = ({ career }) => {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-slate-300 hover:shadow-md sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-500">
            {career.department}
          </p>

          <h2 className="mt-2 text-xl font-bold text-slate-950">
            {career.title}
          </h2>

          <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <MapPin size={16} />
              {career.location}
            </span>

            <span className="flex items-center gap-1.5">
              <BriefcaseBusiness size={16} />
              {career.employmentType}
            </span>
          </div>

          {career.experience && (
            <p className="mt-3 text-sm text-slate-500">
              Experience: {career.experience}
            </p>
          )}
        </div>

        <Link
          to={`/careers/${career._id}`}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:border-slate-950 hover:bg-slate-950 hover:text-white"
        >
          View Job
          <ArrowRight size={17} />
        </Link>
      </div>
    </div>
  );
};

export default CareerCard;
