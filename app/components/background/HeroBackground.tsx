import React from "react";

const HeroBackground: React.FC = () => {
    return (
        <div className="pointer-events-none absolute inset-0 z-0">
            <video className="h-full w-full object-cover opacity-10 saturate-50" autoPlay={true} playsInline={true} loop muted preload="auto">
                <source src="/hero.webm" type="video/webm" />
            </video>
            <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-[#0E1016] via-[#0E1016]/55 to-[#0E1016]/30"/>
            <div className="absolute inset-0 h-full w-full bg-[#0E1016]/35"/>
            <div className="absolute inset-0 h-full w-full bg-[radial-gradient(circle_at_center,rgba(14,16,22,0)_0%,rgba(14,16,22,0.08)_44%,rgba(14,16,22,0.46)_100%)]"/>
        </div>
    );
};

export default HeroBackground;
