"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
import { SiGithub } from "react-icons/si";
import { BsLink45Deg, BsArrowLeft } from "react-icons/bs";
import { spaceGrotesk } from "../../fonts/spaceGrotesk";
import { projects } from "./projectDetails";

const ProjectDetailLayout = ({ slug }: { slug: string }) => {
    const project = projects.find((p) => p.slug === slug)!;
    const iframeContainerRef = useRef<HTMLDivElement>(null);
    const [iframeScale, setIframeScale] = useState(0.5);
    const canEmbed = Boolean(project.iframeUrl && project.embedAllowed);

    useEffect(() => {
        if (!iframeContainerRef.current || !canEmbed) return;
        const update = () => {
            setIframeScale(iframeContainerRef.current!.offsetWidth / 1440);
        };
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, [canEmbed]);

    const currentIndex = projects.findIndex((p) => p.slug === slug);
    const nextProject = projects[(currentIndex + 1) % projects.length];

    return (
        <main className="min-h-screen w-full bg-[#0E1016] text-[#e4ded7]">
            {/* Back nav */}
            <div className="mx-auto flex w-[90%] max-w-[1200px] items-center pt-10 pb-6">
                <Link
                    href="/#work"
                    className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#7E848F] transition-colors hover:text-[#e4ded7]"
                >
                    <BsArrowLeft />
                    <span>Back to Work</span>
                </Link>
            </div>

            {/* Hero band */}
            <div className="mx-auto w-[90%] max-w-[1200px] pb-16">
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#7E848F]">
                    {project.caseStudy?.year} — {project.caseStudy?.role}
                </p>
                <h1
                    className={`${spaceGrotesk.className} text-[56px] font-bold leading-none tracking-tight text-[#e4ded7] sm:text-[72px] lg:text-[100px]`}
                >
                    {project.name}
                </h1>
                <p className="mt-6 max-w-[680px] text-[17px] font-medium leading-relaxed text-[#95979D]">
                    {project.description}
                </p>

                {/* Links */}
                <div className="mt-8 flex flex-wrap items-center gap-6">
                    {project.liveUrl && (
                        <Link
                            href={project.liveUrl}
                            target="_blank"
                            className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-70"
                        >
                            <BsLink45Deg className="text-[18px]" />
                            <span>Visit Site</span>
                        </Link>
                    )}
                    {project.github && (
                        <Link
                            href={project.github}
                            target="_blank"
                            className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-wide text-[#95979D] transition-opacity hover:opacity-70"
                        >
                            <SiGithub className="text-[16px]" />
                            <span>GitHub</span>
                        </Link>
                    )}
                </div>

                {/* Tech icons */}
                <div className="mt-8 flex flex-wrap gap-5">
                    {project.technologies.map((IconComponent, index) => (
                        <Link
                            key={index}
                            href={project.techLinks[index]}
                            target="_blank"
                            title={project.techNames[index]}
                            aria-label={project.techNames[index]}
                            className="text-[28px] text-[#95979D] transition-colors hover:text-[#e4ded7]"
                        >
                            <IconComponent />
                        </Link>
                    ))}
                </div>
            </div>

            {/* Preview */}
            {project.iframeUrl ? (
                <div className="mx-auto w-[90%] max-w-[1200px] pb-20">
                    <div
                        ref={canEmbed ? iframeContainerRef : null}
                        className="relative w-full overflow-hidden rounded-2xl ring-1 ring-white/10"
                        style={{ aspectRatio: "16/10" }}
                    >
                        <div className="absolute inset-x-0 top-0 z-10 flex h-8 items-center gap-1.5 bg-[#1e1e1e] px-4">
                            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                            <div className="ml-3 flex-1 truncate rounded bg-white/10 px-3 py-0.5 text-[10px] text-white/40">
                                {project.iframeUrl}
                            </div>
                        </div>
                        {canEmbed ? (
                            <iframe
                                src={project.iframeUrl}
                                title={project.name}
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
                                src={project.image}
                                alt={project.name}
                                fill
                                sizes="90vw"
                                className="object-cover"
                            />
                        )}
                    </div>
                </div>
            ) : (
                <div className="mx-auto w-[90%] max-w-[1200px] pb-20">
                    <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "16/9" }}>
                        <Image
                            src={project.image}
                            alt={project.name}
                            fill
                            sizes="90vw"
                            className="object-cover"
                        />
                    </div>
                </div>
            )}

            {/* Case study body */}
            {project.caseStudy && (
                <div className="mx-auto w-[90%] max-w-[1200px] pb-20">
                    <div className="flex flex-col gap-16">
                        {[
                            { label: "Challenge", body: project.caseStudy.challenge },
                            { label: "Solution", body: project.caseStudy.solution },
                            { label: "Outcome", body: project.caseStudy.outcome },
                        ].map(({ label, body }) => (
                            <div key={label} className="grid grid-cols-1 gap-4 border-t border-white/10 pt-10 lg:grid-cols-[180px_1fr]">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#7E848F]">
                                    {label}
                                </p>
                                <p className="max-w-[720px] text-[18px] font-medium leading-relaxed text-[#e4ded7] md:text-[20px]">
                                    {body}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Next project */}
            <div className="border-t border-white/10">
                <Link
                    href={`/work/${nextProject.slug}`}
                    className="mx-auto flex w-[90%] max-w-[1200px] items-center justify-between py-16 transition-opacity hover:opacity-70"
                >
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#7E848F]">
                            Next Project
                        </p>
                        <p className={`${spaceGrotesk.className} mt-2 text-[32px] font-bold text-[#e4ded7] lg:text-[48px]`}>
                            {nextProject.name}
                        </p>
                    </div>
                    <BsArrowLeft className="rotate-180 text-[32px] text-[#7E848F]" />
                </Link>
            </div>
        </main>
    );
};

export default ProjectDetailLayout;
