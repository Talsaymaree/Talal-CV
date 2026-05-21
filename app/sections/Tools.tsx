import React from "react";
import "../animations/animate.css";
import AnimatedBody from "../animations/AnimatedBody";
import AnimatedTitle from "../animations/AnimatedTitle";
import {
    SiAdobeaftereffects,
    SiAdobeillustrator,
    SiAdobephotoshop, SiGit,
    SiGithub, SiStrapi,
    SiFirebase, SiJavascript, SiWordpress, SiVuedotjs,
    SiNextdotjs, SiNodedotjs, SiReact, SiTypescript, SiGraphql, SiShopify,
    SiVite, SiAwsamplify, SiStripe, SiPaypal
} from "react-icons/si";
import AnimatedTools from "../animations/AnimatedTools.tsx";

const Tools = () => {
    return (
        <section
            className="relative z-10 w-full items-center justify-center overflow-hidden bg-[#0E1016] bg-cover bg-center pt-16 pb-36 md:pt-20 md:pb-44 lg:pt-20 lg:pb-56"
            id="tools"
        >
            <div className="mx-auto flex w-[90%] flex-col items-center justify-center lg:max-w-[1212.8px]">
                <AnimatedTitle
                    text={"TOOLS I USE."}
                    className={
                        "mb-10 w-full text-left text-[40px] font-bold leading-[0.9em] tracking-tighter text-[#e4ded7] sm:text-[45px] md:mb-16 md:text-[60px] lg:text-[80px]"
                    }
                    wordSpace={"mr-[14px]"}
                    charSpace={"mr-[0.001em]"}
                />

                <div className="mx-auto w-[100%] lg:max-w-[1200px] justify-center">
                    <div className="mb-10 flex w-[100%] flex-col gap-4 text-[18px] font-bold leading-relaxed tracking-wide text-[#e4ded7] md:mb-16 md:gap-6 md:text-[40px] md:leading-relaxed lg:mb-16 lg:w-[50%]">
                        <AnimatedBody delay={0.1} text="Design" />
                        <div>
                            <AnimatedTools className="grid grid-cols-6 gap-4" delay={0.1} stepSize={0.1} iconSize={50}>
                                <SiAdobephotoshop size={50}/>
                                <SiAdobeillustrator size={50}/>
                                <SiAdobeaftereffects size={50}/>
                            </AnimatedTools>
                        </div>
                    </div>
                    <div className="mb-10 flex w-[100%] flex-col gap-4 text-[18px] font-bold leading-relaxed tracking-wide text-[#e4ded7] md:mb-16 md:gap-6 md:text-[40px] md:leading-relaxed lg:mb-16 lg:w-[50%]">
                        <AnimatedBody delay={0.2} text="Frontend" />
                        <div>
                            <AnimatedTools className="grid grid-cols-6 gap-4" delay={0.2} stepSize={0.1} iconSize={50}>
                                <SiTypescript size={50}/>
                                <SiJavascript size={50}/>
                                <SiReact size={50}/>
                                <SiNextdotjs size={50}/>
                                <SiVuedotjs size={50}/>
                                <SiVite size={50}/>
                            </AnimatedTools>
                        </div>
                    </div>
                    <div className="mb-10 flex w-[100%] flex-col gap-4 text-[18px] font-bold leading-relaxed tracking-wide text-[#e4ded7] md:mb-16 md:gap-6 md:text-[40px] md:leading-relaxed lg:mb-16 lg:w-[50%]">
                        <AnimatedBody delay={0.3} text="Backend" />
                        <div>
                            <AnimatedTools className="grid grid-cols-6 gap-4" delay={0.3} stepSize={0.1} iconSize={50}>
                                <SiNodedotjs size={50}/>
                                <SiStrapi size={50}/>
                                <SiFirebase size={50}/>
                                <SiGraphql size={50}/>
                            </AnimatedTools>
                        </div>
                    </div>
                    <div className="mb-10 flex w-[100%] flex-col gap-4 text-[18px] font-bold leading-relaxed tracking-wide text-[#e4ded7] md:mb-16 md:gap-6 md:text-[40px] md:leading-relaxed lg:mb-16 lg:w-[50%]">
                        <AnimatedBody delay={0.4} text="Platforms & Services" />
                        <div>
                            <AnimatedTools className="grid grid-cols-6 gap-4" delay={0.4} stepSize={0.1} iconSize={50}>
                                <SiGithub size={50}/>
                                <SiGit size={50}/>
                                <SiAwsamplify size={50}/>
                                <SiShopify size={50}/>
                                <SiWordpress size={50}/>
                                <SiStripe size={50}/>
                                <SiPaypal size={50}/>
                            </AnimatedTools>
                        </div>
                    </div>
                </div>




            </div>
        </section>
    );
};

export default Tools;
