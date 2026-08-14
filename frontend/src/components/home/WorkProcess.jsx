import { ClipboardList, Ruler, HardHat, KeyRound } from "lucide-react";

import SectionHeading from "../common/SectionHeading";

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Discuss",
    description:
      "We understand your requirements, budget, timeline and project goals.",
  },
  {
    number: "02",
    icon: Ruler,
    title: "Plan",
    description:
      "Our team develops the project plan, design approach and construction strategy.",
  },
  {
    number: "03",
    icon: HardHat,
    title: "Build",
    description:
      "Our professionals execute the project with consistent quality and progress monitoring.",
  },
  {
    number: "04",
    icon: KeyRound,
    title: "Deliver",
    description:
      "We complete the final checks and hand over a finished project ready for use.",
  },
];

const WorkProcess = () => {
  return (
    <section className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Process"
          title="From idea to completed project"
          description="A straightforward process keeps communication clear and every stage of your project organized."
        />

        <div className="relative mt-14">
          {/* Connecting Line */}
          <div className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-px bg-slate-200 lg:block" />

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div key={step.number} className="relative text-center">
                  {/* Number/Icon */}
                  <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full border-4 border-slate-50 bg-slate-950 text-amber-500">
                    <Icon size={21} />
                  </div>

                  <span className="mt-5 block text-xs font-bold tracking-widest text-amber-500">
                    STEP {step.number}
                  </span>

                  <h3 className="mt-2 text-xl font-bold text-slate-900">
                    {step.title}
                  </h3>

                  <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-slate-600">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkProcess;
