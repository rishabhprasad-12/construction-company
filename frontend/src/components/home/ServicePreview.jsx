import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import SectionHeading from "../common/SectionHeading";
import ServiceCard from "./ServiceCard";

const services = [
  {
    title: "Residential Construction",
    description:
      "Complete residential construction services from planning and foundation to finishing and handover.",
    icon: "Home",
  },
  {
    title: "Commercial Construction",
    description:
      "Professional construction solutions for offices, shopping complexes, business towers and commercial spaces.",
    icon: "Building2",
  },
  {
    title: "Renovation and Remodeling",
    description:
      "Modern renovation and remodeling services for residential and commercial properties.",
    icon: "Hammer",
  },
  {
    title: "Architectural Planning",
    description:
      "Architectural design, planning and consultation services for new construction projects.",
    icon: "PenTool",
  },
];

const ServicesPreview = () => {
  return (
    <section className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What We Do"
          title="Construction expertise built around your needs"
          description="From new construction to renovation and planning, we provide practical solutions with quality at every stage."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition-colors hover:text-amber-500"
          >
            View all services
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
