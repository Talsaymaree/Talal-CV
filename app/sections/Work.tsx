import ProjectGrid from "../components/work/ProjectGrid";
import DesignCarousel from "../components/design/DesignCarousel";
import React from "react";

const Work = () => {
    return (
        <section
            className="relative z-10 flex w-full flex-col items-center justify-center bg-[#0E1016] bg-cover bg-center py-10 md:py-10 lg:py-10"
            id="work"
        >
            <h2 className="mb-10 hidden text-[36px] text-[#e4ded7] md:mb-16 md:text-[42px] lg:mb-16 lg:text-[72px]">
        Featured Work
            </h2>

            <ProjectGrid />
            <DesignCarousel />
        </section>
    );
};

export default Work;
