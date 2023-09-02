import React from "react";
import "../animations/animate.css";
import AnimatedBody from "../animations/AnimatedBody";
import AnimatedTitle from "../animations/AnimatedTitle";

const About = () => {
    return (
        <section
            className="relative z-10 w-full items-center justify-center overflow-hidden bg-[#0E1016] bg-cover bg-center pt-16 pb-26 md:pt-20 md:pb-14 lg:pt-20 lg:pb-26"
            id="about"
        >
            <div className="mx-auto flex w-[90%] flex-col items-center justify-center lg:max-w-[1212.8px]">
                <AnimatedTitle
                    text={"Talal Al-Saymaree"}
                    className={
                        "mb-10 text-left text-[40px] font-bold leading-[0.9em] tracking-tighter text-[#e4ded7] sm:text-[45px] md:mb-16 md:text-[60px] lg:text-[80px]"
                    }
                    wordSpace={"mr-[14px]"}
                    charSpace={"mr-[0.001em]"}
                />

                <div className="mx-auto flex w-[100%] flex-col lg:max-w-[1200px] lg:flex-row lg:gap-20">
                    <div className="mb-10 flex w-[100%] flex-col gap-4 text-[18px] font-medium  leading-relaxed tracking-wide text-[#e4ded7] md:mb-16 md:gap-6 md:text-[20px] md:leading-relaxed lg:mb-16  lg:max-w-[90%] lg:text-[24px] ">
                        <AnimatedBody text="My enthusiasm revolves around crafting software that seamlessly combines aesthetics with practicality. With more than 8 years of design experience and over 5 years of programming expertise, my journey has been a blend of art and technology." />

                        <AnimatedBody
                            delay={0.1}
                            text="Whether I'm crafting an elegant user interface or developing a sophisticated application, my constant aim is to produce something distinctive and inventive. I have a passion for exploring emerging technologies and keeping myself well-informed about the most current developments in the technology realm."
                        />

                        <AnimatedBody
                            delay={0.2}
                            text="Throughout my professional development, I've collaborated with a diverse range of clients and entities, including artists, record labels, streamers, small businesses, and well-established corporations. Whether I'm engaged in crafting websites, logos, business cards, advertising materials, 3d prints, products, press kits, or developing applications, websites, and interactive video games, my verstile skill set allows me wear many hats within one role. "
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
