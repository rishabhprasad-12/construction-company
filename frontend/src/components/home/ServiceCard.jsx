import {
  Building2,
  Home,
  Hammer,
  PenTool,
  Paintbrush,
  HardHat,
  ArrowUpRight,
} from "lucide-react";

const iconMap = {
  Home,
  Building2,
  Hammer,
  PenTool,
  Paintbrush,
  HardHat,
};

const ServiceCard = ({ service }) => {
  const Icon = iconMap[service.icon] || Building2;

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-xl">
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-500 transition-colors group-hover:bg-amber-500 group-hover:text-slate-950">
          <Icon size={23} />
        </div>

        <ArrowUpRight
          size={20}
          className="text-slate-300 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-amber-500"
        />
      </div>

      <h3 className="mt-7 text-xl font-bold text-slate-900">{service.title}</h3>

      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
        {service.description}
      </p>

      <div className="mt-6 h-px w-10 bg-amber-500 transition-all duration-300 group-hover:w-20" />
    </div>
  );
};

export default ServiceCard;
