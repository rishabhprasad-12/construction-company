import { ArrowRight, CheckCircle2 } from "lucide-react";
import Button from "../common/Button";

const Hero = () => {
  return (
    <section className="relative isolate min-h-[calc(100vh-5rem)] overflow-hidden bg-slate-950">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1622649396178-b56dfd532226?q=80&w=2110&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Modern construction projects"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 -z-10 bg-slate-950/70" />

      {/* Gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/30" />

      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-200">
              Trusted Construction Partner
            </span>
          </div>

          {/* Heading */}
          <h1 className="max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Build for today.{" "}
            <span className="block text-amber-500">Designed for tomorrow.</span>
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            We deliver reliable construction solution for residential,
            commercial and industrial projects-with quality, precision and
            lasting value at every stage.
          </p>

          {/* CTA */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button to="/projects">
              Explore Page
              <ArrowRight size={18} />
            </Button>
            <Button to="/quote" variant="light">
              Get a Free Quote
            </Button>
          </div>

          {/* Trusted Points */}
          <div className="mt-10 mb-5 flex flex-col gap-3 text-sm text-slate-300 sm:flex-row sm:gap-6 sm:mb-10">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={17} className="text-amber-500" />
              Quality Construction
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2 size={17} className="text-amber-500" />
              One-Time Delivery
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2 size={17} className="text-amber-500" />
              Professional Team
            </div>
          </div>
        </div>
      </div>

      {/* Button Stats */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-slate-950/60 backdrop-blur-md">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/10 sm:grid-cols-4">
          <div className="px-4 py-5 text-center sm:px-6">
            <p className="text-2xl font-bold text-white">15+</p>
            <p className="mt-1 text-xs uppercase tracking-wider text-slate-400">
              Years Experience
            </p>
          </div>

          <div className="px-4 py-5 text-center sm:px-6">
            <p className="text-2xl font-bold text-white">150+</p>
            <p className="mt-1 text-xs uppercase tracking-wider text-slate-400">
              Projects
            </p>
          </div>

          <div className="px-4 py-5 text-center sm:px-6">
            <p className="text-2xl font-bold text-white">50+</p>
            <p className="mt-1 text-xs uppercase tracking-wider text-slate-400">
              Professionals
            </p>
          </div>

          <div className="px-4 py-5 text-center sm:px-6">
            <p className="text-2xl font-bold text-white">98%</p>
            <p className="mt-1 text-xs uppercase tracking-wider text-slate-400">
              Client Satisfaction
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
