import { ChevronLeft, ChevronRight } from "lucide-react";

const CarouselArrow = ({ direction, onClick, disabled }) => {
  const isPrevious = direction === "previous";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={isPrevious ? "Previous slide" : "Next slide"}
      className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all ${
        disabled
          ? "cursor-not-allowed border-slate-200 text-slate-300"
          : "border-slate-300 bg-white text-slate-900 hover:border-amber-500 hover:bg-amber-500 hover:text-slate-950"
      }`}
    >
      {isPrevious ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
    </button>
  );
};

export default CarouselArrow;
