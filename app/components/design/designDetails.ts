export type DesignProps = {
  id: number;
  name: string;
  description: string;
  image: string;
  available: boolean;
};

export const designs = [
    {
        id: 0,
        name: "Human Resources Logo",
        description:
            "Logos designed for Human Resources Record Label in 2020.",
        image: "/designs/hrlogos.webp",
        available: true,
    },
    {
        id: 1,
        name: "Embroidered Hat",
        description:
            "Hat design for Ch4ins4w.",
        image: "/designs/merch.webp",
        available: true,
    },
    {
        id: 2,
        name: "Cassette Tape 3D Promo Render",
        description:
            "Low poly render used to promoted Midnight II cassette tapes done in PlayStaion One aestethic.",
        image: "/designs/lowpolyrender.webp",
        available: true,
    },
    {
        id: 3,
        name: "GWC Logo",
        description:
            "Logo designed for a landscaping company based in California, Los Angles in 2022.",
        image: "/designs/gwc.webp",
        available: true,
    },
    {
        id: 4,
        name: "Press Release Kit",
        description:
            "Designed press kit for Kalibr+ compilation release called pipeline that was featured on bandcamp's New and Notable, Scene Noise Magazine and Arabnews.com.",
        image: "/designs/presskit.webp",
        available: true,
    },
    {
        id: 5,
        name: "Tshirt Design",
        description:
            "Tshirt design for an electronic music artist done using blender and photoshop.",
        image: "/designs/merch3.webp",
        available: true,
    },

    {
        id: 7,
        name: "Event Poster",
        description:
            "Poster design for 'OPEN BORDER' release event. ",
        image: "/designs/poster.webp",
        available: true,
    },    
    {
        id: 8,
        name: "Product Design",
        description:
            "Designed artwork for cassette tapes, J-card and laser engravings.",
        image: "/designs/product.webp",
        available: true,
    },     
];
