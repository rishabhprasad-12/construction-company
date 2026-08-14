const SectionHeading = ({ eyebrow, title, description, align = "center" }) => {
  const alignment = {
    left: "items-starts text-left",
    right: "items-center text-center",
  };

  return (
    <div className={`max-w-2xl mx-auto flex flex-col ${alignment[align]}`}>
      {eyebrow && (
        <span className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-500">
          {eyebrow}
        </span>
      )}

      <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>

      {description && (
        <p className="mt-4 text-slate-600 text-base leading-7 sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
