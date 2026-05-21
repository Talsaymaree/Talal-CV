import { projects } from "../../components/work/projectDetails";
import { notFound } from "next/navigation";
import ProjectDetailLayout from "../../components/work/ProjectDetailLayout";

type ProjectPageProps = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    return projects
        .filter((p) => p.caseStudy)
        .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);
    if (!project) return {};
    return {
        title: `${project.name} — Talal Al-Saymaree`,
        description: project.description,
    };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);
    if (!project) return notFound();
    return <ProjectDetailLayout slug={slug} />;
}
