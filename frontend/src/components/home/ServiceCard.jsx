import { ArrowUpRight, Building2, Hammer, Home, PenTool } from "lucide-react";
import { Link } from "react-router-dom";

const getIcon = (title = "") => {
  const value = title.toLowerCase();

  if (value.includes("residential")) {
    return Home;
  }

  if (value.includes("commercial")) {
    return Building2;
  }

  if (value.includes("renovation")) {
    return Hammer;
  }

  return PenTool;
};

const ServiceCard = ({ service }) => {
  const Icon = getIcon(service.title);

  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-lg sm:p-6">
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-500 sm:h-11 sm:w-11">
          <Icon size={20} />
        </div>

        <ArrowUpRight
          size={17}
          className="text-slate-300 transition-colors group-hover:text-amber-500"
        />
      </div>

      <h3 className="mt-6 text-base font-bold leading-6 text-slate-900 sm:text-lg">
        {service.title}
      </h3>

      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
        {service.description}
      </p>

      <Link
        to={`/services/${service._id}`}
        className="mt-5 inline-flex text-sm font-semibold text-slate-900 hover:text-amber-500"
      >
        Learn more
      </Link>

      <div className="mt-5 h-px w-8 bg-amber-300 transition-all duration-300 group-hover:w-14" />
    </article>
  );
};

export default ServiceCard;
