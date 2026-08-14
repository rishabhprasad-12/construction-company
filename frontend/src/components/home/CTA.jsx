import { ArrowRight, Phone } from "lucide-react";

import Button from "../common/Button";

const CTA = () => {
  return (
    <section className="bg-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="rounded-4xl bg-amber-500 px-10 py-16 ">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-950/60">
                Start Your Project
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Have a project in mind?
              </h2>

              <p className="mt-4 max-w-xl text-base leading-7 text-slate-900/70">
                Tell us what you're planning and our team will help you
                understand the next steps.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button to="/quote" variant="secondary">
                Get a Free Quote
                <ArrowRight size={18} className="ml-2" />
              </Button>

              <a
                href="tel:+919876543210"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-950/20 px-6 py-3 font-medium text-slate-950 transition-colors hover:bg-slate-950/10"
              >
                <Phone size={17} />
                Call Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
