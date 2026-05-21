import React, { useEffect } from "react";
import gsap from "gsap";

const PreLoader: React.FC = () => {
    useEffect(() => {
        document.body.style.overflowY = "hidden";
        window.scrollTo(0, 0);

        gsap.to(".preloader", {
            duration: 1.2,
            delay: 0.8,
            height: "0vh",
            ease: "Power3.easeOut",
            onComplete: () => {
                window.scrollTo(0, 0);
                document.body.style.overflowY = "scroll";
                gsap.set(".preloader", { display: "none" });
            },
        });
    }, []);

    return (
        <div
            className="preloader"
            style={{
                height: "100vh",
                width: "100%",
                background: "#0E1016",
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 55,
            }}
        />
    );
};

export default PreLoader;
