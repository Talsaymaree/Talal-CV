import React, { useState } from "react";
import DesignCard from "./DesignCard";
import { designs } from "./designDetails";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";

const DesignCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeDesign = designs[activeIndex];

    const handlePrevClick = () => {
        setActiveIndex((currentIndex) =>
            currentIndex === 0 ? designs.length - 1 : currentIndex - 1
        );
    };

    const handleNextClick = () => {
        setActiveIndex((currentIndex) =>
            currentIndex === designs.length - 1 ? 0 : currentIndex + 1
        );
    };

    return (
        <section className="relative z-10 w-full overflow-hidden bg-[#0E1016] pt-16 pb-20 md:pt-20 md:pb-28 lg:pt-20 lg:pb-32">
            <div className="mx-auto flex w-[90%] max-w-[1200px] items-end justify-between gap-6">
                <div className="max-w-[620px]">
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#95979D]">
                        Selected Design
                    </p>
                    <h4 className="text-[16px] text-[#e4ded7] md:text-[20px] lg:text-[34px]">
                        Some examples of my design work.
                    </h4>
                </div>

                <div className="hidden items-center gap-3 md:flex">
                    <button
                        type="button"
                        aria-label="Previous design"
                        onClick={handlePrevClick}
                        className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[#e4ded7] transition-all hover:border-white/35 hover:bg-white/10"
                    >
                        <BsArrowLeft className="text-[18px]" />
                    </button>
                    <div className="text-[12px] font-semibold uppercase tracking-[0.3em] text-[#95979D]">
                        {String(activeIndex + 1).padStart(2, "0")} / {String(designs.length).padStart(2, "0")}
                    </div>
                    <button
                        type="button"
                        aria-label="Next design"
                        onClick={handleNextClick}
                        className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[#e4ded7] transition-all hover:border-white/35 hover:bg-white/10"
                    >
                        <BsArrowRight className="text-[18px]" />
                    </button>
                </div>
            </div>

            <div className="mx-auto mt-8 w-[90%] max-w-[1200px]">
                <div className="relative overflow-hidden rounded-[28px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeDesign.id}
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -24 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <DesignCard
                                id={activeDesign.id}
                                name={activeDesign.name}
                                description={activeDesign.description}
                                image={activeDesign.image}
                                available={activeDesign.available}
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-3 md:hidden">
                <button
                    type="button"
                    aria-label="Previous design"
                    onClick={handlePrevClick}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[#e4ded7] transition-all hover:border-white/35 hover:bg-white/10"
                >
                    <BsArrowLeft className="text-[17px]" />
                </button>
                <div className="text-[12px] font-semibold uppercase tracking-[0.3em] text-[#95979D]">
                    {String(activeIndex + 1).padStart(2, "0")} / {String(designs.length).padStart(2, "0")}
                </div>
                <button
                    type="button"
                    aria-label="Next design"
                    onClick={handleNextClick}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[#e4ded7] transition-all hover:border-white/35 hover:bg-white/10"
                >
                    <BsArrowRight className="text-[17px]" />
                </button>
            </div>

            <div className="mt-5 flex items-center justify-center gap-2">
                {designs.map((design, index) => (
                    <button
                        key={design.id}
                        type="button"
                        aria-label={`Go to design ${index + 1}`}
                        onClick={() => setActiveIndex(index)}
                        className={`h-[6px] rounded-full transition-all ${
                            activeIndex === index
                                ? "w-12 bg-[#e4ded7]"
                                : "w-6 bg-white/15 hover:bg-white/30"
                        }`}
                    />
                ))}
            </div>
        </section>
    );
};

export default DesignCarousel;
