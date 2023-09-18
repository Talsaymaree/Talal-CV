import {
    SiFramer,
    SiGithub,
    SiNextdotjs,
    SiReact,
    SiVuedotjs,
    SiStrapi,
    SiGraphql,
    SiTailwindcss,
    SiTypescript,
    SiAwsamplify,
    SiGit,
    SiShopify,
    SiWordpress,
    SiAdobephotoshop,
    SiAdobeillustrator,
    SiCss3,
    SiThreedotjs,
    SiFirebase,
    SiHtml5
} from "react-icons/si";
import {IconType} from "react-icons";

export type ProjectProps = {
  id: number;
  name: string;
  description: string;
  technologies: IconType[];
  techNames: string[];
  techLinks: string[];
  github: string;
  image: string;
  available: boolean;
};

export const projects = [
    {
        id: 0,
        name: "Portfolio 2023",
        description:
            "This portfolio was developed using the following technologies:",
        technologies: [SiTypescript, SiReact, SiNextdotjs, SiTailwindcss, SiFramer],
        techNames: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Framer Motion"],
        techLinks: ["https://www.typescriptlang.org/", "https://reactjs.org/", "https://nextjs.org/", "https://tailwindcss.com/", "https://www.framer.com/motion/"],
        github: "https://github.com/Talsaymaree",
        image: "/projects/portfolio.webp",
        available: true,
    },
    {
        id: 1,
        name: "Tim Horton's Foundation Camps",
        description:
            "While working for AscendFS I have developed and deployed a Canada wide raffle site for Tim Horton's Foundation Camps using Vue.js, Strapi and Graphql following the client's design guideline.",
        technologies: [SiStrapi, SiGraphql, SiVuedotjs, SiAwsamplify, SiGit],
        techNames: ["Strapi", "Graphql", "Vue.js", "AWS Amplify", "Git"],
        techLinks: ["https://strapi.io", "https://graphql.org", "https://vuejs.org", "https://aws.amazon.com/amplify/", "https://git-scm.com"],
        github: "https://github.com/Talsaymaree/",
        image: "/projects/tims1.webp",
        available: true,
    },
    {
        id: 2,
        name: "Winnipeg Blue Bombers",
        description:
            "I have designed and deployed a raffle website for Winnipeg Blue Bombers utilizing Wordpress, Shopify, HTML, CSS, Adobe Photoshop and Illustrator.",
        technologies: [SiWordpress, SiShopify, SiHtml5, SiCss3, SiAdobephotoshop, SiAdobeillustrator],
        techNames: ["Wordpress", "Shopify", "HTML5", "CSS3", "Adobe Photoshop", "Adobe Illustrator"],
        techLinks: ["https://wordpress.com", "https://www.shopify.com/ca", "https://html.com", "https://www.w3.org/Style/CSS/Overview.en.html", "https://www.adobe.com/ca/products/photoshop.html", "https://www.adobe.com/ca/products/illustrator.html"],
        github: "https://github.com/Talsaymaree/",
        image: "/projects/bluebombers.webp",
        available: false,
    },
    {
        id: 3,
        name: "Artist Website",
        description:
            "I have designed and deployed a website for an artist that required close attention to details that reflects art and showcase the work.",
        technologies: [SiReact, SiThreedotjs, SiFirebase, SiCss3, SiAdobephotoshop, SiAdobeillustrator],
        techNames: ["React", "Three.js", "Firebase", "CSS3", "Adobe Photoshop", "Adobe Illustrator"],
        techLinks: ["https://wordpress.com", "https://www.shopify.com/ca", "https://html.com", "https://www.w3.org/Style/CSS/Overview.en.html", "https://www.adobe.com/ca/products/photoshop.html", "https://www.adobe.com/ca/products/illustrator.html"],
        github: "https://github.com/Talsaymaree/",
        image: "/projects/artist.webp",
        available: false,
    },
];
