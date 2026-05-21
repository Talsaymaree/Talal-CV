import { DesignProps } from "./designDetails";
import Image from "next/image";
import AnimatedTitle from "../../animations/AnimatedTitle";
import AnimatedBody from "../../animations/AnimatedBody";
import { motion } from "framer-motion";
import Container from "../container/Container";
import React from "react";

const DesignCard = ({
    id,
    name,
    description,
    image,
    available,
}: DesignProps) => {
    const isGif = image.endsWith(".gif");
    return (
        <motion.div
            className="relative z-10 h-[420px] w-full items-stretch justify-center py-0 sm:h-[460px] md:h-[540px] lg:h-[620px]"
            initial="initial"
            animate="animate"
        >
            <Container
                width="100%"
                height="100%"
                borderRadius={25}
                color="rgba(255, 255, 255, 0.1)"
                accent={false}
                blur={false}
                border={false}
                borderHighlight={false}
                grain={true}
                spotlight={false}
                top="0px"
                left="0px"
                angle={0}
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_55%)]" />
                <Image
                    src={image}
                    alt={name}
                    width={500}
                    height={500}
                    className={`absolute bottom-0 z-0 object-contain ${
                        isGif
                            ? "w-[44%] sm:w-[38%] md:w-[34%] lg:w-[30%]"
                            : "w-[76%] sm:w-[72%] md:w-[68%] lg:w-[62%]"
                    } ${id % 2 === 0 ? "right-0" : "left-0"}`}
                />
                <div
                    className={`absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-[#0E1016] via-[#0E1016]/82 to-transparent ${
                        id % 2 === 0 ? "" : ""
                    }`}
                />
                <div
                    className={`absolute top-6 z-10 ${
                        id % 2 === 0 ? "left-6 lg:left-8" : "right-6 lg:right-8"
                    }`}
                >
                    <div className="rounded-full border border-[#D1B000]/25 bg-[#D1B000]/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#D9C15C]">
                        {available ? "Featured" : "Archive"}
                    </div>
                </div>
                <div
                    className={`absolute z-10 text-white ${
                        !(id % 2 === 0)
                            ? "right-6 left-10 top-28 md:left-auto md:max-w-[48%] lg:right-8 lg:top-36"
                            : "left-6 right-10 top-28 md:max-w-[48%] lg:left-8 lg:top-36"
                    }`}
                >
                    <AnimatedTitle
                        text={name}
                        className={
                            "max-w-[95%] text-[36px] leading-none text-[#D9C15C] md:text-[44px] md:leading-none lg:max-w-[460px] lg:text-[54px] lg:leading-none"
                        }
                        wordSpace={"mr-[0.25em]"}
                        charSpace={"-mr-[0.01em]"}
                    />
                    <AnimatedBody
                        text={description}
                        className={
                            "mt-5 max-w-[470px] text-[15px] font-semibold leading-relaxed text-[#b5b8c0] md:text-[16px]"
                        }
                    />
                </div>
            </Container>
        </motion.div>
    );
};

export default DesignCard;
