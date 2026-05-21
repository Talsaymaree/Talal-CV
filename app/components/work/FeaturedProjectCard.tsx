"use client";
import { ProjectProps } from "./projectDetails";
import Link from "next/link";
import React, { useRef, useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { SiGithub } from "react-icons/si";
import { BsLink45Deg, BsArrowRight } from "react-icons/bs";

const FeaturedProjectCard = ({
    slug,
    name,
    description,
    technologies,
    techNames,
    techLinks,
    github,
    liveUrl,
    iframeUrl,
    embedAllowed,
    image,
    caseStudy,
}: ProjectProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const iframeContainerRef = useRef<HTMLDivElement>(null);
    const [iframeScale, setIframeScale] = useState(0.5);
    const canEmbed = Boolean(iframeUrl && embedAllowed);
    const prefersReducedMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"],
    });
    const mediaY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [-46, 46]);
    const contentY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [20, -18]);

    useEffect(() => {
        if (!iframeContainerRef.current || !canEmbed) return;
        const update = () => {
            const el = iframeContainerRef.current!;
            const scaleX = el.offsetWidth / 1440;
            const scaleY = el.offsetHeight / 900;
            setIframeScale(Math.max(scaleX, scaleY));
        };
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, [canEmbed]);

    return (
        <div ref={cardRef} className="relative z-10 h-[560px] w-full overflow-hidden rounded-[25px] sm:h-[620px] lg:h-[680px]">
            {/* Full-bleed background: iframe or image */}
            <motion.div ref={iframeContainerRef} className="absolute -inset-y-14 inset-x-0 border-0 outline-none" style={{ y: mediaY }}>
                {canEmbed ? (
                    <iframe
                        src={iframeUrl}
                        title={name}
                        style={{
                            width: "1440px",
                            height: "900px",
                            transform: `scale(${iframeScale})`,
                            transformOrigin: "top left",
                            border: "none",
                            outline: "none",
                            pointerEvents: "none",
                            display: "block",
                        }}
                    />
                ) : iframeUrl ? (
                    <img
                        src={image}
                        alt={name}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <img
                        src={image}
                        alt={name}
                        className="h-full w-full object-cover"
                    />
                )}
            </motion.div>

            {/* Gradient overlays for readability */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{ background: "linear-gradient(to top, black 0%, black 30%, rgba(0,0,0,0.75) 55%, rgba(0,0,0,0.3) 75%, rgba(0,0,0,0.15) 100%)" }}
            />
            <div
                className="pointer-events-none absolute inset-0"
                style={{ background: "linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)" }}
            />

            {/* Featured badge — top left */}
            <div className="absolute left-8 top-8 w-fit rounded-full ring-1 ring-white/20 bg-black/40 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/70 backdrop-blur-sm lg:left-12 lg:top-10">
                Featured
            </div>

            {/* Content — bottom left */}
            <motion.div className="absolute bottom-0 left-0 p-8 lg:p-12" style={{ y: contentY }}>
                <h3 className="text-[42px] leading-none text-white sm:text-[52px] lg:text-[62px]">
                    {name}
                </h3>
                <p className="mt-3 max-w-[520px] text-[15px] font-semibold leading-relaxed text-[#95979D]">
                    {description}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-5">
                    {caseStudy && slug ? (
                        <Link
                            href={`/work/${slug}`}
                            aria-label={`View ${name} case study`}
                            className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-70"
                        >
                            <BsArrowRight className="text-[16px]" />
                            <span>Case Study</span>
                        </Link>
                    ) : null}
                    {liveUrl ? (
                        <Link
                            href={liveUrl}
                            target="_blank"
                            aria-label={`Visit ${name}`}
                            className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-wide text-[#95979D] transition-opacity hover:opacity-70"
                        >
                            <BsLink45Deg className="text-[18px]" />
                            <span>Visit Site</span>
                        </Link>
                    ) : null}
                    {github ? (
                        <Link
                            href={github}
                            target="_blank"
                            aria-label={`View ${name} source code`}
                            className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-wide text-[#95979D] transition-opacity hover:opacity-70"
                        >
                            <SiGithub className="text-[16px]" />
                            <span>GitHub</span>
                        </Link>
                    ) : null}
                </div>

                <div className="mt-6 flex flex-wrap gap-5">
                    {technologies.map((IconComponent, index) => (
                        <Link
                            key={index}
                            href={techLinks[index]}
                            target="_blank"
                            aria-label={`Learn more about ${techNames[index]}`}
                            title={techNames[index]}
                            className="text-[22px] text-[#95979D] transition-colors hover:text-white lg:text-[24px]"
                            data-blobity-tooltip={techNames[index]}
                            data-blobity-magnetic="false"
                        >
                            <IconComponent />
                        </Link>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default FeaturedProjectCard;
