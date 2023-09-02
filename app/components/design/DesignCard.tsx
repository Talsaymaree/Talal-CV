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
    const isGif = image.endsWith('.gif'); 
    return (
        <motion.div
            className={`relative bg-cover bg-no-repeat bg-center z-10 h-[350px] w-full items-stretch justify-center py-0 sm:h-[300px] sm:w-[100%] md:h-[450px] md:w-[100%] lg:h-[500px]`}
            initial="initial"
            animate="animate"
        >
            <Container
                width="100%"
                height="100%"
                borderRadius={25}
                color="rgba(255, 255, 255, 0.1)"
                blur={false}
                grain={true}
                top="0px"
                left="0px"
                angle={0}
            >
                
                <Image
                    src={image}
                    alt={name}
                    width={500}
                    height={500}
                    className={`absolute -bottom-0 w-[70%] ${isGif ? 'w-[45%]' : 'w-[70%] sm:w-[75%] md:w-[78%]'} ${
                        id % 2 === 0 ? "right-0" : "left-0"
                    }`}
                    priority={true}
                />
                <div
                    className={`absolute top-0 text-[#0E1016] ${
                        id % 2 === 0 ? "left-0 ml-6 lg:ml-7" : "right-0 mr-6 lg:mr-7"
                    } mt-1 flex  items-center justify-center lg:mt-5`}
                >
                    {available ? (
                        <>
                        </>
                    ) : (
                        <div></div>
                    )}
                </div>
                <div
                    className={`absolute text-white  ${
                        !(id % 2 === 0)
                            ? "right-0 top-32 mr-0 ml-10 md:right-0 md:ml-0 lg:right-0 lg:top-25  lg:mr-4"
                            : "left-0 top-32 ml-0 md:mr-12 lg:top-42 lg:ml-4"
                    } mb-10  md:mb-16 lg:mb-14 `}
                >
                    <AnimatedTitle
                        text={name}
                        className={
                            "max-w-[90%] text-[40px] leading-none text-[#D1B000] md:text-[44px] md:leading-none lg:max-w-[450px] lg:text-[48px] lg:leading-none"
                        }
                        wordSpace={"mr-[0.25em]"}
                        charSpace={"-mr-[0.01em]"}
                    />
                    <AnimatedBody
                        text={description}
                        className={
                            "mt-4 w-[90%] max-w-[457px] text-[16px] font-semibold text-[#95979D] "
                        }
                    />
                </div>
            </Container>
        </motion.div>
    );
};

export default DesignCard;
