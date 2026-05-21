"use client";
import React, {useState} from "react";
import { ScrollerMotion } from "scroller-motion";
import { useEffectOnce, useEventListener } from 'usehooks-ts';

import PreLoader from "./components/other/PreLoader";

import Color from "./components/overlay/Color";

import NavBar from "./sections/NavBar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Work from "./sections/Work";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import Tools from "./sections/Tools.tsx";

export default function Home() {

    const [isMobile, setIsMobile] = useState(false);

    useEffectOnce(() => {
        window.scrollTo({
            top: 0,
            left: 0,
        });
        setIsMobile(window.innerWidth < 768);
    });

    useEventListener('resize', () => {
        setIsMobile(window.innerWidth < 768);
    });

    return (
        <>
            <PreLoader />
            <Color />
            <NavBar />
            {/*<ScrollerMotion // Weird, stuff happening with this
                disabled={isMobile}
                spring={{ mass: 1, stiffness:800, bounce: 300, damping: 100 }}
            >*/}
            <main
                className="flex flex-col items-center justify-center bg-black"
            >
                <Hero />
                <About />
                <Work />
                <Tools />
                { /* <Blog /> TODO: Low Priority */ }
                <Contact />
                <Footer />
            </main>
            {/*</ScrollerMotion>*/}
        </>
    );
}
