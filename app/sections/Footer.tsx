import Link from "next/link";
import { motion } from "framer-motion";
import React from "react";

const Footer = () => {
    return (
        <motion.section
            className="flex w-full items-center justify-center bg-[#0E1016] px-4 pt-10 pb-28 font-bold uppercase sm:pb-32 md:min-h-[20vh] md:py-16 lg:min-h-[10vh] lg:pt-6 lg:pb-0"
            initial="initial"
            animate="animate"
        >
            <motion.div className="mx-auto flex w-[90%] flex-col items-center justify-between gap-3 text-center text-[12px] text-[#e4ded7] sm:text-[12px] md:flex-row md:gap-6 md:text-[14px] lg:max-w-[1440px] lg:text-[14px]">
                <p className="m-0 p-0">© Talal Al-Saymaree 2026</p>
                <div className="flex flex-col items-center sm:flex-row sm:gap-1 md:gap-2">
                    <p className="m-0 p-0">Design &amp; Deployed by</p>
                    <Link
                        href="https://github.com/Talsaymaree"
                        target="_blank"
                        aria-label="Talal Al-Saymaree's GitHub Profile"
                    >
                        <span className="underline underline-offset-2 hover:no-underline">
                            <span className="m-0 p-0">Talal Al-Saymaree</span>
                        </span>{" "}
                    </Link>
                </div>
            </motion.div>
        </motion.section>
    );
};

export default Footer;
