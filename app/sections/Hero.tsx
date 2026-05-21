import { spaceGrotesk } from "../fonts/spaceGrotesk";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import "./Hero.css";
import HeroBackground from "../components/background/HeroBackground";
import React, { useRef } from "react";
import Typewriter from "typewriter-effect";

const Hero = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const prefersReducedMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });
    const backgroundY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, 120]);
    const contentY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, -70]);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0.55]);

    return (
        <motion.section
            ref={sectionRef}
            className="relative z-10 flex h-[100vh] w-full justify-center"
            id="home"
        >
            <motion.div className="absolute inset-0 z-0" style={{ y: backgroundY }}>
                <HeroBackground />
            </motion.div>
            <motion.div
                className="relative z-10 mt-10 flex flex-col items-center justify-center gap-4 sm:mt-0"
                style={{ y: contentY, opacity: contentOpacity }}
            >
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                    className={`${spaceGrotesk.className} pointer-events-none text-[11px] font-semibold uppercase tracking-[0.35em] text-[#8F97A3]`}
                    style={{ textShadow: "0 0 30px rgba(0,0,0,0.9)" }}
                >
                    Senior Web Engineer
                </motion.p>
                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                    className={`${spaceGrotesk.className} pointer-events-none text-center text-[48px] font-bold leading-none tracking-tight text-[#F0F2F5] sm:text-[64px] lg:text-[88px]`}
                    style={{ textShadow: "0 0 18px rgba(240,242,245,0.18), 0 0 46px rgba(0,0,0,0.95)" }}
                >
                    Talal Al-Saymaree
                </motion.h1>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
                    className={`relative flex flex-col items-center justify-center ${spaceGrotesk.className} pointer-events-none text-4xl font-bold text-[#AEB6C1] sm:text-5xl`}
                >
                    <Typewriter
                        options={{
                            strings: ['Next.js SSR/ISR', 'React.js', 'API Integration', 'GraphQL / REST', 'Web Performance', 'Core Web Vitals', 'Node.js', 'CI/CD', 'TypeScript', 'WCAG Accessibility', 'Web Security', 'Firebase', 'Vue.js', 'Git'],
                            autoStart: true,
                            loop: true,
                            skipAddStyles: true,
                            cursorClassName: 'Typewriter__cursor',
                        }}
                    />
                </motion.div>
            </motion.div>
        </motion.section>
    );
};

export default Hero;
