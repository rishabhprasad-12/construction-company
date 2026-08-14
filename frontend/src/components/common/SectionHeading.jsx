const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = "center",
  theme = "light",
}) => {
  const alignment = {
    left: "items-start text-left",
    center: "items-center text-center",
  };

  const themes = {
    light: {
      title: "text-slate-900",
      description: "text-slate-600",
    },

    dark: {
      title: "text-white",
      description: "text-slate-400",
    },
  };

  return (
    <div className={`max-w-2xl mx-auto flex flex-col ${alignment[align]}`}>
      {eyebrow && (
        <span className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-500">
          {eyebrow}
        </span>
      )}

      <h2
        className={`text-3xl font-bold tracking-tight sm:text-4xl ${themes[theme].title}`}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`mt-4 text-base leading-7 sm:text-lg ${themes[theme].description}`}
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
