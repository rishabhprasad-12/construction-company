import { useRef } from "react";
import CarouselArrow from "./CarouselArrow"

import SlickSliderComponent from "react-slick";
const Slider = SlickSliderComponent.default || SlickSliderComponent;

const CardCarousel = ({ children, desktopSlides = 3, tabletSlides = 2, totalSlides = 0 }) => {
  const slideRef = useRef(null);

  const showSlides = totalSlides > desktopSlides;

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: desktopSlides,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: tabletSlides,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "20px",
        },
      },
    ],
  };

  return (
    <div className="relative">
      {/* Custom Arrow */}
      {showSlides && (
        <div className="absolute -top-14 z-10 right-0 hidden items-center gap-2 sm:flex">
          <CarouselArrow
            direction="previous"
            onClick={() => slideRef.current?.slickPrev()}
          />

          <CarouselArrow
            direction="next"
            onClick={() => slideRef.current?.slickNext()}
          />
        </div>
      )}

      {/* Slider */}
      <div className="w-full overflow-hidden">
        <Slider ref={slideRef} {...settings}>
          {children}
        </Slider>
      </div>
    </div>
  );
};

export default CardCarousel;
