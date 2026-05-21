"use client";

import { ProjectProps } from "./projectDetails";
import Link from "next/link";
import Image from "next/image";
import Container from "../container/Container";
import React, { useRef, useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { SiGithub } from "react-icons/si";
import { BsLink45Deg, BsArrowRight } from "react-icons/bs";

const ProjectCard = ({
    id,
    slug,
    name,
    description,
    technologies,
    techNames,
    techLinks,
    github,
    liveUrl,
    image,
    iframeUrl,
    embedAllowed,
    caseStudy,
}: ProjectProps) => {
    const isEven = id % 2 === 0;
    const cardRef = useRef<HTMLDivElement>(null);
    const iframeContainerRef = useRef<HTMLDivElement>(null);
    const [iframeScale, setIframeScale] = useState(0.3);
    const canEmbed = Boolean(iframeUrl && embedAllowed);
    const hasLivePreview = Boolean(iframeUrl);
    const prefersReducedMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"],
    });
    const mediaY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [-30, 30]);
    const contentY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [14, -14]);

    useEffect(() => {
        if (!iframeContainerRef.current || !canEmbed) return;
        const update = () => {
            setIframeScale(iframeContainerRef.current!.offsetWidth / 1440);
        };
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, [canEmbed]);

    return (
        <div ref={cardRef} className="relative z-10 h-[550px] w-full overflow-hidden rounded-[25px] sm:h-[700px] md:h-[650px] lg:h-[500px]">
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
                {!hasLivePreview && (
                    <Image
                        src={image}
                        alt={name}
                        width={500}
                        height={500}
                        className={`absolute -bottom-2 w-[70%] object-contain sm:w-[85%] md:w-[60%] lg:max-w-[55%] ${
                            isEven ? "right-0" : "left-0"
                        }`}
                        priority={id < 2}
                    />
                )}

                <motion.div
                    className={`absolute text-white ${
                        !isEven
                            ? "right-0 top-32 mr-0 ml-10 md:right-0 md:ml-0 lg:right-0 lg:top-16 lg:mr-4"
                            : "left-10 top-32 ml-0 md:mr-12 lg:top-28 lg:ml-4"
                    } mb-10 md:mb-16 lg:mb-14`}
                    style={{ y: contentY }}
                >
                    <h3 className="max-w-[90%] text-[40px] leading-none text-white md:text-[44px] lg:max-w-[450px] lg:text-[48px]">
                        {name}
                    </h3>
                    <p className="mt-4 w-[90%] max-w-[457px] text-[16px] font-semibold leading-relaxed text-[#95979D]">
                        {description}
                    </p>

                    <div className="mt-6 flex flex-wrap items-center gap-4">
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

                    <div className="mt-9 mb-9 grid grid-cols-6 gap-5">
                        {technologies.map((IconComponent, index) => (
                            <div key={index} className="relative">
                                <Link
                                    href={techLinks[index]}
                                    target="_blank"
                                    aria-label={`Learn more about ${techNames[index]}`}
                                    className="w-[20px] text-[20px] md:w-[25px] md:text-[24px] lg:w-[30px] lg:text-[28px]"
                                    title={techNames[index]}
                                    data-blobity-tooltip={techNames[index]}
                                    data-blobity-magnetic="false"
                                >
                                    <IconComponent />
                                </Link>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </Container>

            {hasLivePreview ? (
                <motion.div
                    ref={iframeContainerRef}
                    className={`absolute bottom-0 overflow-hidden rounded-t-xl ring-1 ring-white/10 ${
                        isEven ? "right-0" : "left-0"
                    } w-[70%] sm:w-[85%] md:w-[60%] lg:max-w-[55%]`}
                    style={{ aspectRatio: "16/10", y: mediaY }}
                >
                    <div className="absolute inset-x-0 top-0 z-10 flex h-7 items-center gap-1.5 bg-[#1e1e1e] px-3">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                        <div className="ml-2 flex-1 truncate rounded bg-white/10 px-2 py-0.5 text-[9px] text-white/40">
                            {iframeUrl}
                        </div>
                    </div>
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
                                pointerEvents: "none",
                                display: "block",
                            }}
                        />
                    ) : (
                        <Image
                            src={image}
                            alt={name}
                            fill
                            sizes="(max-width: 768px) 85vw, (max-width: 1024px) 60vw, 55vw"
                            className="object-cover"
                        />
                    )}
                </motion.div>
            ) : null}
        </div>
    );
};

export default ProjectCard;
