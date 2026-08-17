import { MapPin, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  const image = project.images?.[0] || "/images/project-placeholder.jpg";

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Status */}
        <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm">
          {project.status}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-500">
          {project.category}
        </p>

        <div className="mt-2 flex items-start justify-between gap-3">
          <h3 className="text-base font-bold leading-6 text-slate-900 sm:text-lg">
            {project.title}
          </h3>

          <ArrowUpRight
            size={18}
            className="mt-1 shrink-0 text-slate-300 transition-colors group-hover:text-amber-500"
          />
        </div>

        <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
          <MapPin size={14} />
          <span>{project.location}</span>
        </div>

        <Link
          to={`/projects/${project._id}`}
          className="mt-5 inline-flex text-sm font-semibold text-slate-900 transition-colors hover:text-amber-500"
        >
          View project
        </Link>
      </div>
    </article>
  );
};

export default ProjectCard;
