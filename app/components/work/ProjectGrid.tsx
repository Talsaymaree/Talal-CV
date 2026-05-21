import ProjectCard from "./ProjectCard";
import FeaturedProjectCard from "./FeaturedProjectCard";
import {projects, ProjectProps} from "./projectDetails";
import React from "react";

const ProjectGrid = () => {
    const [featured, ...rest] = projects;

    return (
        <>
            <div className="mb-10 flex w-[90%] max-w-[1200px] flex-col gap-4 text-[#e4ded7] md:mb-16 lg:mb-20">
                <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#7E848F]">
                    Client And Product Work
                </p>
                <h4 className="max-w-[760px] text-[20px] leading-tight text-[#E8EBF0] md:text-[28px] lg:text-[38px]">
                    Production-focused web projects with an emphasis on delivery, integration, and polish.
                </h4>
            </div>

            <div className="grid w-[90%] grid-cols-1 gap-y-10 gap-x-6 lg:max-w-[1200px] lg:grid-cols-1">
                {/* index 0 → thumbnail LEFT */}
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
        </>
    );
};

export default ProjectGrid;
