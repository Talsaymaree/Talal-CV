import React, { useRef } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import DesignCard from "./DesignCard";
import { designs, DesignProps } from "./designDetails";

interface CarouselRefType {
  slidePrev: () => void;
  slideNext: () => void;
}

const DesignCarousel = () => {
    const carouselRef = useRef<CarouselRefType | null>(null);

    // Create an array of DesignCard components based on your designs data
    const designCards = designs.map((design: DesignProps) => (
        <DesignCard
            id={design.id}
            key={design.id}
            name={design.name}
            description={design.description}
            image={design.image}
            available={design.available}
        />
    ));

    // Function to navigate to the previous slide
    const handlePrevClick = () => {
        if (carouselRef.current) {
            carouselRef.current.slidePrev();
        }
    };

    // Function to navigate to the next slide
    const handleNextClick = () => {
        if (carouselRef.current) {
            carouselRef.current.slideNext();
        }
    };

    return (
        <>
            <div className="my-10 flex gap-4 text-[#e4ded7] md:my-16  lg:my-20 ">
                <h4 className={`text-[16px] md:text-[20px] lg:text-[34px] ${"text-[#e4ded7]"}`}>
          Some examples of my design work:
                </h4>
            </div>
            <div className="grid w-[100%] grid-cols-4  gap-x-3  lg:grid-cols-4">
                {/* Custom Previous Button */}
                <button className="custom-prev-button" onClick={handlePrevClick}>
          Previous
                </button>

                {/* AliceCarousel */}
                <div className="col-span-2"> {/* Adjust the width as needed */}
                    <AliceCarousel
                        ref={carouselRef as React.RefObject<AliceCarousel>} // Assign the ref with the correct type
                        mouseTracking
                        items={designCards}
                        autoPlay
                        autoPlayInterval={1800}
                        infinite
                        disableButtonsControls={true}
                        autoPlayControls={true}
                    />
                </div>

                {/* Custom Next Button */}
                <button className="custom-next-button" onClick={handleNextClick}>
          Next
                </button>
            </div>

            {/* Custom CSS for Pause Button */}
            <style>
                {`
          .alice-carousel__play-btn-wrapper {
            /* Your custom CSS styles for the Pause button here */
            background-color: transparent;
            padding: 1px;
          }
        `}
            </style>
        </>
    );
};

export default DesignCarousel;
