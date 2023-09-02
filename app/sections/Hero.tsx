import { spaceGrotesk } from "../fonts/spaceGrotesk";
import { motion } from "framer-motion";
import "./Hero.css";
import HeroBackground from "../components/background/HeroBackground";
import React from "react";
import Typewriter from "typewriter-effect";
const Hero = () => {
    return (
        <motion.section
            className="relative z-10 flex h-[100vh] w-full justify-center"
            id="home"
            initial="initial"
            animate="animate"
        >
            <HeroBackground />
            <div className="mt-10 flex flex-col items-center justify-center sm:mt-0">
                <div
                    className={`relative flex flex-col items-center justify-center ${spaceGrotesk.className} pointer-events-none text-6xl font-bold`}
                >
                    <Typewriter 
                        options={{
                            strings: ['React.js', 'Vue.js', 'Angular', 'Three.js', 'Photoshop', 'After Effects', 'Firebase', 'Git', 'HTML', 'CSS', 'Material UI', 'UI/UX', '3D Printing', '3D Animation', 'TypeScript', 'JavaScript'],
                            autoStart: true,
                            loop: true,
                            skipAddStyles: true,
                            cursorClassName: 'Typewriter__cursor',
                        }}          />
                </div>
            </div>
        </motion.section>
    );
};

export default Hero;
