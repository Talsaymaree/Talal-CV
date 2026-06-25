import React from "react";
import "../animations/animate.css";
import AnimatedBody from "../animations/AnimatedBody";
import AnimatedTitle from "../animations/AnimatedTitle";
import {
    SiAdobeaftereffects,
    SiAdobeillustrator,
    SiAdobephotoshop,
    SiGit,
    SiGithub,
    SiStrapi,
    SiFirebase,
    SiJavascript,
    SiWordpress,
    SiVuedotjs,
    SiNextdotjs,
    SiNodedotjs,
    SiReact,
    SiTypescript,
    SiGraphql,
    SiShopify,
    SiVite,
    SiAwsamplify,
    SiStripe,
    SiPaypal,
} from "react-icons/si";
import AnimatedTools from "../animations/AnimatedTools.tsx";

const toolGroups = [
    {
        label: "Design",
        delay: 0.1,
        icons: [SiAdobephotoshop, SiAdobeillustrator, SiAdobeaftereffects],
    },
    {
        label: "Frontend",
        delay: 0.2,
        icons: [SiTypescript, SiJavascript, SiReact, SiNextdotjs, SiVuedotjs, SiVite],
    },
    {
        label: "Backend",
        delay: 0.3,
        icons: [SiNodedotjs, SiStrapi, SiFirebase, SiGraphql],
    },
    {
        label: "Platforms & Services",
        delay: 0.4,
        icons: [SiGithub, SiGit, SiAwsamplify, SiShopify, SiWordpress, SiStripe, SiPaypal],
    },
];

const Tools = () => {
    return (
        <section
            className="relative z-10 flex min-h-screen w-full items-center overflow-hidden bg-[#0E1016] bg-cover bg-center py-20 md:py-24 lg:py-28"
            id="tools"
        >
            <div className="mx-auto flex w-[90%] flex-col lg:max-w-[1212.8px]">
                <div className="mb-12 max-w-[760px] md:mb-16">
                    <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#7E848F]">
                        Toolchain
                    </p>
                    <AnimatedTitle
                        text={"TOOLS I USE."}
                        className={
                            "mb-8 w-full text-left text-[44px] font-bold leading-[0.9em] tracking-tighter text-[#e4ded7] sm:text-[52px] md:text-[68px] lg:text-[92px]"
                        }
                        wordSpace={"mr-[14px]"}
                        charSpace={"mr-[0.001em]"}
                    />
                    <p className="max-w-[640px] text-[17px] font-semibold leading-relaxed text-[#7E848F] md:text-[20px]">
                        Tools grouped by actual role in the work: design assets, frontend implementation, backend services, deployment platforms, commerce, and source control.
                    </p>
                </div>

                <div className="grid gap-10 border-t border-white/10 pt-10 md:grid-cols-2">
                    {toolGroups.map((group, index) => (
                        <article key={group.label}>
                            <div className="mb-7 flex items-center justify-between gap-4">
                                <AnimatedBody delay={group.delay} text={group.label} className="text-[22px] font-bold text-[#e4ded7] md:text-[32px]" />
                                <span className="text-[12px] font-semibold uppercase tracking-[0.32em] text-[#7E848F]">
                                    0{index + 1}
                                </span>
                            </div>
                            <AnimatedTools className="grid grid-cols-4 gap-5 text-[#e4ded7] sm:grid-cols-6" delay={group.delay} stepSize={0.08} iconSize={50}>
                                {group.icons.map((Icon, iconIndex) => (
                                    <Icon key={iconIndex} size={50} />
                                ))}
                            </AnimatedTools>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Tools;
