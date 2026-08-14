import { Link } from "react-router-dom";

const Button = ({
  children,
  to,
  type = "button",
  variant = "primary",
  className = "",
  onClick,
}) => {
  const baseStyles =
    "inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200";

  const variants = {
    primary: "bg-amber-500 text-slate-950 hover:bg-amber-400",
    secondary: "bg-slate-900 text-white hover:bg-slate-800",
    outline: "border border-slate-300 text-slate-900 hover:bg-slate-100",
    light: "bg-white text-slate-900 hover:bg-slate-100",
  };

  const styles = `${baseStyles} ${variants[variant]} ${className}`;

  // If button is used for navigation
  if (to) {
    return (
      <Link to={to} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={styles}>
      {children}
    </button>
  );
};

export default Button;
