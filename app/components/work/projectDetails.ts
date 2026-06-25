import {
    SiReact,
    SiVuedotjs,
    SiStrapi,
    SiGraphql,
    SiAwsamplify,
    SiGit,
    SiShopify,
    SiWordpress,
    SiAdobephotoshop,
    SiAdobeillustrator,
    SiCss3,
    SiFirebase,
    SiHtml5,
    SiJavascript,
    SiStripe,
    SiPaypal,
    SiVite,
    SiNodedotjs
} from "react-icons/si";
import {IconType} from "react-icons";

export type CaseStudy = {
    role: string;
    year: string;
    challenge: string;
    solution: string;
    outcome: string;
};

export type ProjectProps = {
  id: number;
  slug: string;
  name: string;
  description: string;
  technologies: IconType[];
  techNames: string[];
  techLinks: string[];
  github: string;
  liveUrl: string;
  image: string;
  iframeUrl?: string;
  embedAllowed?: boolean;
  available: boolean;
  caseStudy?: CaseStudy;
};

export const projects = [
    {
        id: 0,
        slug: "brkeuntd",
        name: "brkeuntd.com",
        description:
            "Custom music and merchandise platform — artist profiles, discography, editorial content, and a full storefront with Stripe, PayPal, and Printful fulfillment. Firebase backend for content, orders, and media management.",
        technologies: [SiReact, SiJavascript, SiFirebase, SiStripe, SiPaypal],
        techNames: ["React", "JavaScript", "Firebase", "Stripe", "PayPal"],
        techLinks: ["https://reactjs.org/", "https://developer.mozilla.org/en-US/docs/Web/JavaScript", "https://firebase.google.com/", "https://stripe.com/", "https://www.paypal.com/"],
        github: "",
        liveUrl: "https://brkeuntd.com/",
        image: "/projects/brkeuntd.png",
        iframeUrl: "https://brkeuntd.com/",
        embedAllowed: false,
        available: true,
        caseStudy: {
            role: "Designer & Full-Stack Developer",
            year: "2023",
            challenge: "Build a custom platform that combines editorial content, artist discovery, digital releases, and e-commerce in one experience — without relying on a rigid third-party website builder. The system needed to support artist and brand profiles, product pages, discography management, radio and streaming features, and a storefront for both physical and digital products, all manageable from one place.",
            solution: "Built with React on the frontend and Firebase on the backend — Firestore for structured content and product data, Firebase Hosting for deployment, Firebase Storage for media assets, and Cloud Functions for secure server-side workflows. Commerce features include Stripe and PayPal checkout flows, order handling, inventory-aware product logic, and Printful integration for on-demand merchandise fulfillment. Implemented admin workflows for managing products, releases, artists, and supporting media.",
            outcome: "A scalable, brand-driven platform that supports both storytelling and sales — giving the business direct control over content, fulfillment, and customer experience without dependency on external website builders or commerce platforms.",
        },
    },
    {
        id: 1,
        slug: "ch4ins4w",
        name: "ch4ins4w.com",
        description:
            "Full-stack artist portfolio platform — React 18 SPA with a custom blog CMS, gallery admin, moderated live chat, and serverless Cloud Functions integrating Twitch, Spotify, Bandcamp, and radio feeds. Built for independent content management without third-party builders.",
        technologies: [SiReact, SiVite, SiFirebase, SiNodedotjs, SiJavascript],
        techNames: ["React", "Vite", "Firebase", "Node.js", "JavaScript"],
        techLinks: ["https://react.dev/", "https://vitejs.dev/", "https://firebase.google.com/", "https://nodejs.org/", "https://developer.mozilla.org/en-US/docs/Web/JavaScript"],
        github: "",
        liveUrl: "https://ch4ins4w.com/",
        image: "/projects/ch4ins4w.png",
        iframeUrl: "https://ch4ins4w.com/",
        embedAllowed: false,
        available: true,
        caseStudy: {
            role: "Full-Stack Developer",
            year: "2024",
            challenge: "Most portfolio sites are static and hard to maintain — especially for creators who regularly publish new work across multiple platforms. This project needed to solve two problems at once: present the artist's identity in a memorable, visually distinctive way, and make ongoing content updates simple enough to manage independently without relying on third-party website builders.",
            solution: "Built the frontend as a React 18 SPA with Vite, using Firebase Hosting for deployment and Cloud Functions on Node.js 22 as a serverless backend. The site combines custom-designed portfolio sections with dynamic content modules — blog, gallery, contact, newsletter, live Twitch status, Spotify and Bandcamp release feeds, radio now-playing data, and Linktree aggregation. A private admin area allows the artist to create and edit blog content with a TipTap rich-text editor, upload gallery images via Firebase Storage, and moderate a live chat system backed by Firestore. Security handled via reCAPTCHA Enterprise, rate limiting, input sanitization, and Firestore security rules.",
            outcome: "Delivered a branded portfolio platform that goes beyond a static showcase — giving the artist a fast, scalable, and maintainable site with direct control over publishing and fan engagement, reducing dependency on external tools for content management and platform integrations.",
        },
    },
    {
        id: 3,
        slug: "tims-camps",
        name: "Tim Horton's Foundation Camps",
        description:
            "Developed an accessible frontend integrated with a Strapi GraphQL API for a high-traffic national campaign. Deployed via AWS Amplify with a full CI/CD pipeline.",
        technologies: [SiStrapi, SiGraphql, SiVuedotjs, SiAwsamplify, SiGit],
        techNames: ["Strapi", "GraphQL", "Vue.js", "AWS Amplify", "Git"],
        techLinks: ["https://strapi.io", "https://graphql.org", "https://vuejs.org", "https://aws.amazon.com/amplify/", "https://git-scm.com"],
        github: "",
        liveUrl: "https://www.timscamps.com/",
        image: "/projects/tims1.png",
        available: true,
        caseStudy: {
            role: "Frontend Developer — Ascend",
            year: "2022",
            challenge: "I was handed this project from the internal tech team mid-cycle — a multi-provincial raffle platform for Tim Horton's Foundation Camps that was already in flight. The codebase was built on Vue.js with a Strapi headless CMS served over GraphQL, a stack the production team had no familiarity with. The site needed to handle national campaign traffic across multiple Canadian provinces simultaneously, each with its own content rules and eligibility requirements. I had to get up to speed on an unfamiliar codebase, stabilize it for launch, and then bring the rest of the team along.",
            solution: "I refactored the frontend to handle the multi-provincial data structure cleanly, writing GraphQL queries that fetched province-scoped content without duplicating logic across pages. I set up the AWS Amplify deployment pipeline for automated preview and production builds tied to Git branches, which let the team ship updates safely during the live campaign window. After launch, I ran a hands-on workshop to train the production team on Strapi — how to manage content, update campaign fields, and query data — so they could maintain the site independently without going back to a developer for every change.",
            outcome: "The platform ran without incident through a high-traffic national campaign spanning multiple provinces. The production team left the workshop able to manage content and push updates on their own, which removed a bottleneck that had previously required developer intervention for routine changes.",
        },
    },
    {
        id: 4,
        slug: "blue-bombers",
        name: "Winnipeg Blue Bombers",
        description:
            "I have designed and deployed a raffle website for the Winnipeg Blue Bombers utilizing WordPress, Shopify, HTML, CSS, Adobe Photoshop, and Illustrator.",
        technologies: [SiWordpress, SiShopify, SiHtml5, SiCss3, SiAdobephotoshop, SiAdobeillustrator],
        techNames: ["WordPress", "Shopify", "HTML5", "CSS3", "Adobe Photoshop", "Adobe Illustrator"],
        techLinks: ["https://wordpress.com", "https://www.shopify.com/ca", "https://html.com", "https://www.w3.org/Style/CSS/Overview.en.html", "https://www.adobe.com/ca/products/photoshop.html", "https://www.adobe.com/ca/products/illustrator.html"],
        github: "",
        liveUrl: "https://www.bomberraffle.com/",
        image: "/projects/bluebombers.png",
        available: false,
        caseStudy: {
            role: "Designer & Developer — Ascend",
            year: "2021",
            challenge: "The Winnipeg Blue Bombers needed a raffle site that felt like a genuine extension of the team's brand — not a generic campaign page. The work had to hold up visually against a recognizable sports franchise identity while also functioning as a commerce-enabled platform. There was no existing design system to pull from, so everything from visual direction to technical build was built from scratch under a tight campaign timeline.",
            solution: "I owned the full project — from initial design concepts in Photoshop and Illustrator through to deployment. I built the site on WordPress with Shopify handling the commerce layer, designing custom page layouts that matched the team's blue and gold identity without feeling templated. All assets — imagery treatments, typography hierarchy, UI components — were created in-house to keep the visual language consistent with the franchise. The Shopify integration handled ticketing and transaction flows while WordPress managed the editorial and campaign content.",
            outcome: "Delivered a polished, on-brand raffle platform for a major CFL franchise on schedule. The site handled the campaign's full run and was praised internally at Ascend for the quality of the visual execution relative to the turnaround time.",
        },
    },
];
