"use client";

import { ProjectProps } from "./projectDetails";
import Link from "next/link";
import React, { useRef, useEffect, useState } from "react";
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
    const iframeContainerRef = useRef<HTMLDivElement>(null);
    const [iframeScale, setIframeScale] = useState(0.3);
    const canEmbed = Boolean(iframeUrl && embedAllowed);
    const hasLivePreview = Boolean(iframeUrl);

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
        <div className="relative z-10 h-[550px] w-full overflow-hidden rounded-[25px] sm:h-[700px] md:h-[650px] lg:h-[500px]">
            <div ref={iframeContainerRef} className="absolute inset-0 border-0 outline-none">
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
                ) : (
                    <img
                        src={image}
                        alt={name}
                        className="h-full w-full bg-[#090B10] object-cover"
                    />
                )}
            </div>

            <div
                className="pointer-events-none absolute inset-0"
                style={{ background: "linear-gradient(to top, black 0%, black 32%, rgba(0,0,0,0.78) 58%, rgba(0,0,0,0.28) 78%, rgba(0,0,0,0.1) 100%)" }}
            />
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    background: isEven
                        ? "linear-gradient(to right, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.24) 52%, transparent 100%)"
                        : "linear-gradient(to left, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.24) 52%, transparent 100%)",
                }}
            />

            <div
                className={`absolute bottom-0 z-10 p-8 text-white lg:p-10 ${
                    isEven ? "left-0" : "right-0"
                }`}
            >
                <h3 className="max-w-full break-words text-[34px] leading-none text-white sm:text-[44px] md:max-w-[460px] md:text-[48px] lg:text-[54px]">
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
            </div>
        </div>
    );
};

export default ProjectCard;
