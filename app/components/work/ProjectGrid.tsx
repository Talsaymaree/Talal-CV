import ProjectCard from "./ProjectCard";
import FeaturedProjectCard from "./FeaturedProjectCard";
import {projects, ProjectProps} from "./projectDetails";
import React from "react";

const ProjectGrid = () => {
    const [featured, ...rest] = projects;

    return (
        <div className="mx-auto grid w-[90%] gap-10 lg:max-w-[1320px] lg:grid-cols-[0.42fr_0.58fr] lg:gap-10">
            <div className="flex flex-col gap-4 text-[#e4ded7] lg:sticky lg:top-0 lg:h-screen lg:justify-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#7E848F]">
                    Selected Work
                </p>
                <h4 className="max-w-[760px] text-[28px] leading-tight text-[#E8EBF0] md:text-[42px] lg:text-[62px] lg:leading-[0.92] lg:tracking-[-0.05em]">
                    Web platforms, campaign builds, and product work shaped around real launches.
                </h4>
                <p className="max-w-[460px] text-[15px] font-semibold leading-relaxed text-[#7E848F] md:text-[17px]">
                    A mix of frontend engineering, creative direction, CMS integration, and production delivery across client and independent projects.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-y-8 gap-x-6 pb-10 lg:py-[22vh]">
                <FeaturedProjectCard
                    key={featured.id}
                    id={1}
                    slug={featured.slug}
                    name={featured.name}
                    description={featured.description}
                    technologies={featured.technologies}
                    techNames={featured.techNames}
                    techLinks={featured.techLinks}
                    github={featured.github}
                    liveUrl={featured.liveUrl}
                    image={featured.image}
                    iframeUrl={featured.iframeUrl}
                    embedAllowed={featured.embedAllowed}
                    available={featured.available}
                    caseStudy={featured.caseStudy}
                />
                {rest.map((project: ProjectProps, index: number) => (
                    <ProjectCard
                        id={index}
                        key={project.id}
                        slug={project.slug}
                        name={project.name}
                        description={project.description}
                        technologies={project.technologies}
                        techNames={project.techNames}
                        techLinks={project.techLinks}
                        github={project.github}
                        liveUrl={project.liveUrl}
                        image={project.image}
                        iframeUrl={project.iframeUrl}
                        embedAllowed={project.embedAllowed}
                        available={project.available}
                        caseStudy={project.caseStudy}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProjectGrid;
