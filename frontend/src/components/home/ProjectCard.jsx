import { ArrowUpRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  return (
    <Link
      to={`/projects/${project._id}`}
      className="group block overflow-hidden rounded-2xl bg-white shadow-sm"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
        <img
          src={
            project.images?.[0] ||
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80"
          }
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

        {/* Status */}
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold capitalize text-slate-900 backdrop-blur-sm">
          {project.status}
        </span>

        {/* Arrow */}
        <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-slate-950 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <ArrowUpRight size={19} />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-amber-500">
          {project.category}
        </p>

        <h3 className="mt-2 text-xl font-bold text-slate-900">
          {project.title}
        </h3>

        <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
          <MapPin size={15} />
          {project.location}
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
