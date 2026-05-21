"use client";

import { useEffect, useRef, useState } from "react";

const SCENE_CSS = `
    @keyframes holoPulse {
        0%, 100% { opacity: .3; }
        50% { opacity: .62; }
    }
    @keyframes holoLineFlow {
        to { stroke-dashoffset: -18; }
    }
    @keyframes holoOrbFloat {
        0%, 100% { transform: translate3d(0, 0, 0); }
        50% { transform: translate3d(0, -10px, 0); }
    }
    @keyframes holoGlow {
        0%, 100% { opacity: .6; filter: blur(18px); }
        50% { opacity: .92; filter: blur(24px); }
    }
    @keyframes holoBeam {
        0%, 100% { opacity: .18; transform: translateY(0); }
        50% { opacity: .42; transform: translateY(-10px); }
    }
    @keyframes holoSweep {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    @keyframes holoDrift {
        0%, 100% { transform: translate3d(0, 0, 0); }
        50% { transform: translate3d(0, -6px, 0); }
    }
`;

const NETWORK_NODES = [
    { x: 0, y: 28 }, { x: 7, y: 18 }, { x: 13, y: 26 }, { x: 21, y: 22 }, { x: 34, y: 28 },
    { x: 47, y: 34 }, { x: 60, y: 30 }, { x: 71, y: 38 }, { x: 82, y: 34 }, { x: 94, y: 26 },
    { x: 100, y: 50 }, { x: 89, y: 58 }, { x: 76, y: 54 }, { x: 62, y: 58 }, { x: 50, y: 48 },
    { x: 41, y: 61 }, { x: 29, y: 53 }, { x: 17, y: 60 }, { x: 6, y: 45 }, { x: 12, y: 77 },
    { x: 28, y: 70 }, { x: 42, y: 76 }, { x: 57, y: 68 }, { x: 71, y: 74 }, { x: 87, y: 68 },
    { x: 95, y: 82 }, { x: 77, y: 92 }, { x: 58, y: 86 }, { x: 39, y: 92 }, { x: 18, y: 84 },
];

const NETWORK_EDGES: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [3, 4], [0, 2], [1, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9],
    [8, 10], [10, 11], [11, 12], [12, 13], [13, 14], [14, 15], [15, 16], [16, 17], [17, 18],
    [18, 0], [5, 14], [6, 13], [7, 12], [10, 24], [24, 25], [25, 26], [26, 27], [27, 28],
    [28, 29], [17, 29], [16, 20], [20, 21], [21, 22], [22, 23], [23, 24], [15, 21], [14, 22],
    [6, 24], [3, 15], [2, 18], [1, 17], [20, 29], [23, 26], [9, 24], [4, 14],
];

const PROJECTS = [
    "100 Gecs",
    "Alexander Wang",
    "Archive",
    "Balenciaga Store Madison Ave",
    "Berlin Atonal",
    "Caroline Polachek",
    "David Rudnick",
    "Day for Night",
    "Dazed Beauty",
    "DJ Python",
    "FACT Magazine Residency",
    "Fractal Fantasy",
    "Google I/O",
    "Jon Rafman for Balenciaga",
    "MA+Creative",
    "Midland Agency",
    "Nike",
    "Objekt Live A/V",
    "Olive Young",
    "ON Kunstmuseum Basel",
    "Pitch Festival",
    "Rubberband",
    "Suicideyear",
    "Wxaxrxp",
    "Xerces Blau",
    "Yves Tumor",
];

function SidebarPanel() {
    return (
        <aside
            style={{
                width: 308,
                height: "min(76vh, 860px)",
                minHeight: 640,
                padding: "18px 16px 16px",
                color: "rgba(243, 248, 255, 0.95)",
                background: "linear-gradient(180deg, rgba(14, 82, 168, 0.76) 0%, rgba(8, 55, 118, 0.56) 48%, rgba(5, 34, 81, 0.66) 100%)",
                border: "1px solid rgba(221, 242, 255, 0.82)",
                clipPath: "polygon(18px 0, calc(100% - 32px) 0, 100% 18px, 100% calc(100% - 18px), calc(100% - 18px) 100%, 18px 100%, 0 calc(100% - 18px), 0 18px)",
                boxShadow: "0 0 0 1px rgba(255,255,255,.06) inset, 0 16px 44px rgba(0, 0, 0, 0.18)",
                backdropFilter: "blur(5px)",
                pointerEvents: "auto",
                overflow: "hidden",
            }}
        >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 14, height: "100%" }}>
                <div
                    aria-hidden
                    style={{
                        width: 110,
                        height: 110,
                        alignSelf: "center",
                        borderRadius: "50%",
                        background: [
                            "radial-gradient(circle at 30% 24%, rgba(255,255,255,.98), rgba(234, 239, 255, .95) 32%, rgba(137, 179, 255, .72) 62%, rgba(31, 82, 178, .18) 100%)",
                            "linear-gradient(120deg, transparent 0%, rgba(255,255,255,.3) 34%, transparent 56%)",
                        ].join(","),
                        boxShadow: "0 0 26px rgba(144, 213, 255, 0.22)",
                        position: "relative",
                    }}
                >
                    <div style={{ position: "absolute", inset: 18, borderRadius: "50%", border: "6px solid rgba(71, 134, 255, .74)", borderTopColor: "transparent", borderLeftColor: "rgba(82,144,255,.98)" }} />
                    <div style={{ position: "absolute", inset: 34, borderRadius: "50%", border: "5px solid rgba(67, 131, 255, .76)", borderBottomColor: "transparent", borderRightColor: "rgba(88,160,255,.98)" }} />
                    <div style={{ position: "absolute", left: "50%", top: 12, bottom: 12, width: 8, transform: "translateX(-50%)", borderRadius: 999, background: "rgba(74, 137, 255, .8)" }} />
                </div>

                <div
                    style={{
                        width: "100%",
                        textAlign: "center",
                        fontFamily: "'Courier New', monospace",
                        fontSize: 20,
                        letterSpacing: ".03em",
                    }}
                >
                    ezramiller.biz
                </div>

                <div style={{ width: "100%", height: 1, marginTop: 4, background: "linear-gradient(90deg, transparent, rgba(218,239,255,.36), transparent)" }} />

                <div
                    style={{
                        width: "100%",
                        overflow: "auto",
                        paddingRight: 6,
                        fontFamily: "'Courier New', monospace",
                        fontSize: 11,
                        lineHeight: 1.5,
                    }}
                >
                    <div>Home</div>
                    <div>Contact</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span>v</span>
                        <span>Projects</span>
                    </div>

                    <div style={{ paddingLeft: 14, marginTop: 2 }}>
                        {PROJECTS.map((project, index) => (
                            <div key={project} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <span style={{ width: 8, opacity: index % 4 === 0 ? 0.92 : 0.18 }}>{index % 4 === 0 ? ">" : ""}</span>
                                <span>{project}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );
}

function NetworkOverlay({ pointerX, pointerY, engaged }: { pointerX: number; pointerY: number; engaged: boolean }) {
    return (
        <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                opacity: 0.78,
                mixBlendMode: "screen",
            }}
        >
            {NETWORK_EDGES.map(([from, to], index) => (
                <line
                    key={index}
                    x1={NETWORK_NODES[from].x + pointerX * (from % 3) * 0.8}
                    y1={NETWORK_NODES[from].y + pointerY * (from % 4) * 0.55}
                    x2={NETWORK_NODES[to].x + pointerX * (to % 3) * 0.8}
                    y2={NETWORK_NODES[to].y + pointerY * (to % 4) * 0.55}
                    stroke={engaged ? "rgba(224, 247, 255, 0.34)" : "rgba(212, 243, 255, 0.24)"}
                    strokeWidth="0.09"
                    style={{ animation: `holoLineFlow ${12 + (index % 6) * 1.8}s linear infinite` }}
                />
            ))}
            {NETWORK_NODES.map((node, index) => (
                <circle
                    key={index}
                    cx={node.x + pointerX * ((index % 5) - 2) * 0.32}
                    cy={node.y + pointerY * ((index % 4) - 1.5) * 0.24}
                    r={engaged ? "0.24" : "0.18"}
                    fill="rgba(235, 250, 255, 0.96)"
                    style={{ animation: `holoPulse ${2.8 + (index % 5) * .8}s ease-in-out infinite` }}
                />
            ))}
        </svg>
    );
}

function FigureLayer() {
    return (
        <>
            <div
                style={{
                    position: "absolute",
                    right: "-2vw",
                    top: "-4vh",
                    width: "44vw",
                    minWidth: 620,
                    height: "110vh",
                    background: "linear-gradient(180deg, rgba(15, 34, 78, 0.18) 0%, rgba(14, 32, 77, 0.72) 14%, rgba(10, 22, 55, 0.94) 100%)",
                    clipPath: "polygon(35% 0, 100% 0, 100% 100%, 56% 100%, 48% 72%, 40% 38%)",
                    opacity: 0.98,
                    filter: "blur(1px)",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    right: "10vw",
                    top: "-2vh",
                    width: "10vw",
                    minWidth: 120,
                    height: "44vh",
                    background: "linear-gradient(180deg, rgba(255,255,255,0.68), rgba(175,206,255,0.2) 36%, rgba(23,44,96,0.02) 80%)",
                    clipPath: "polygon(36% 0, 66% 0, 58% 100%, 28% 100%)",
                    filter: "blur(8px)",
                    opacity: 0.5,
                    transform: "rotate(8deg)",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    right: "18vw",
                    top: "8vh",
                    width: "18vw",
                    minWidth: 240,
                    height: "16vh",
                    borderRadius: "46% 54% 52% 48%",
                    background: "radial-gradient(circle at 42% 42%, rgba(255,240,255,0.72), rgba(157,205,255,0.62) 30%, rgba(33,196,255,0.52) 58%, transparent 78%)",
                    filter: "blur(10px)",
                    opacity: 0.88,
                    transform: "rotate(-12deg)",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    right: "3vw",
                    top: "16vh",
                    width: "27vw",
                    minWidth: 360,
                    height: "66vh",
                    background: "linear-gradient(180deg, rgba(15, 58, 156, 0.44) 0%, rgba(11, 28, 79, 0.86) 42%, rgba(8, 18, 48, 0.96) 100%)",
                    clipPath: "polygon(22% 0, 78% 0, 96% 12%, 100% 100%, 8% 100%, 0 10%)",
                    opacity: 0.98,
                }}
            />
            <div
                style={{
                    position: "absolute",
                    right: "9vw",
                    top: "16vh",
                    width: "13vw",
                    minWidth: 180,
                    height: "64vh",
                    background: "linear-gradient(180deg, rgba(110,185,255,0.44), rgba(31,121,255,0.14) 28%, rgba(6,16,44,0.02) 80%)",
                    clipPath: "polygon(44% 0, 64% 0, 56% 100%, 26% 100%)",
                    filter: "blur(10px)",
                    opacity: 0.7,
                    transform: "rotate(5deg)",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    left: "20vw",
                    bottom: "4vh",
                    width: "28vw",
                    minWidth: 420,
                    maxWidth: 720,
                    aspectRatio: "2.8 / .42",
                    borderRadius: "999px",
                    background: "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(242,246,255,0.96) 46%, rgba(164,197,255,0.58) 62%, rgba(27,48,108,0.88) 100%)",
                    boxShadow: "0 0 34px rgba(178, 222, 255, 0.4)",
                    transform: "perspective(900px) rotateX(72deg) rotateY(18deg) rotateZ(10deg)",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    left: "31vw",
                    bottom: "0.8vh",
                    width: "14vw",
                    minWidth: 240,
                    height: "14vh",
                    borderRadius: "56% 44% 52% 48%",
                    background: "radial-gradient(circle at 42% 48%, rgba(246,245,255,0.88), rgba(143,220,255,0.58) 34%, rgba(20,139,255,0.12) 74%)",
                    filter: "blur(10px)",
                    opacity: 0.95,
                    transform: "rotate(4deg)",
                }}
            />
        </>
    );
}

function GlobeHologram({
    pointerX,
    pointerY,
    engaged,
}: {
    pointerX: number;
    pointerY: number;
    engaged: boolean;
}) {
    const rotateX = -(pointerY * 7);
    const rotateY = pointerX * 10;
    const shiftX = pointerX * 24;
    const shiftY = pointerY * 18;
    const glowOpacity = engaged ? 0.9 : 0.62;
    const lineOpacity = engaged ? 0.64 : 0.44;

    return (
        <div
            style={{
                position: "absolute",
                left: "clamp(430px, 41vw, 860px)",
                top: "50%",
                width: "min(30vw, 520px)",
                minWidth: 340,
                aspectRatio: "1 / 1",
                transform: `translate(calc(-50% + ${shiftX}px), calc(-48% + ${shiftY}px)) perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                animation: "holoOrbFloat 6s ease-in-out infinite",
                transition: "transform 120ms ease-out",
                transformStyle: "preserve-3d",
                pointerEvents: "auto",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    inset: "-16%",
                    background: "radial-gradient(circle, rgba(101, 228, 255, 0.46) 0%, rgba(59, 179, 255, 0.26) 28%, rgba(30, 114, 255, 0.08) 56%, transparent 74%)",
                    animation: "holoGlow 4.4s ease-in-out infinite",
                    opacity: glowOpacity,
                    transition: "opacity 160ms ease-out",
                }}
            />

            <div
                style={{
                    position: "absolute",
                    left: `calc(50% + ${pointerX * 14}px)`,
                    top: `calc(-16% + ${pointerY * 8}px)`,
                    width: "20%",
                    height: "44%",
                    transform: "translateX(-50%)",
                    background: "linear-gradient(180deg, rgba(222,250,255,0.82) 0%, rgba(99,223,255,0.38) 34%, rgba(29,132,255,0.06) 82%, transparent 100%)",
                    clipPath: "polygon(45% 0, 65% 0, 100% 100%, 0 100%)",
                    filter: "blur(16px)",
                    opacity: 0.82,
                    animation: "holoBeam 4s ease-in-out infinite",
                }}
            />

            <div
                style={{
                    position: "absolute",
                    inset: "16%",
                    borderRadius: "50%",
                    background: "radial-gradient(circle at 38% 34%, rgba(255,255,255,.22), transparent 32%)",
                    filter: "blur(10px)",
                    transform: `translate(${pointerX * 16}px, ${pointerY * 10}px)`,
                    transition: "transform 120ms ease-out",
                    animation: "holoDrift 5.4s ease-in-out infinite",
                }}
            />

            <svg viewBox="0 0 100 100" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
                <defs>
                    <radialGradient id="globeFill" cx="42%" cy="32%" r="58%">
                        <stop offset="0%" stopColor="rgba(240,252,255,0.95)" />
                        <stop offset="24%" stopColor="rgba(166,235,255,0.88)" />
                        <stop offset="48%" stopColor="rgba(96,212,255,0.56)" />
                        <stop offset="72%" stopColor="rgba(45,143,255,0.3)" />
                        <stop offset="100%" stopColor="rgba(7,43,90,0.08)" />
                    </radialGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2.6" />
                    </filter>
                </defs>

                <g style={{ transformOrigin: "50px 50px", animation: "holoSweep 18s linear infinite" }}>
                    <ellipse cx="50" cy="54" rx="34" ry="11" fill="none" stroke="rgba(128,224,255,.24)" strokeWidth="3.2" transform="rotate(-10 50 54)" />
                    <ellipse cx="50" cy="54" rx="27" ry="7.4" fill="none" stroke="rgba(111,213,255,.16)" strokeWidth="1.6" transform="rotate(22 50 54)" />
                </g>

                <circle cx="50" cy="50" r="31" fill="url(#globeFill)" stroke="rgba(227,250,255,.9)" strokeWidth="1.4" />
                <circle cx="50" cy="50" r="35" fill="none" stroke="rgba(180,240,255,.08)" strokeWidth="8" filter="url(#glow)" />

                <ellipse cx="50" cy="50" rx="29.6" ry="11.5" fill="none" stroke="rgba(209,248,255,.15)" strokeWidth=".9" />
                <ellipse cx="50" cy="50" rx="29.6" ry="21" fill="none" stroke="rgba(209,248,255,.15)" strokeWidth=".7" />
                <ellipse cx="50" cy="50" rx="16" ry="29.6" fill="none" stroke="rgba(209,248,255,.14)" strokeWidth=".7" />
                <ellipse cx="50" cy="50" rx="8" ry="29.6" fill="none" stroke="rgba(209,248,255,.12)" strokeWidth=".6" />

                <path
                    d="M33 40 C37 31, 48 28, 58 31 C64 33, 69 36, 71 42 C68 46, 64 47, 60 48 C55 49, 51 52, 49 57 C42 57, 36 54, 31 49 C30 45, 31 42, 33 40 Z"
                    fill="rgba(208,247,255,.34)"
                    stroke="rgba(228,251,255,.32)"
                    strokeWidth=".35"
                />
                <path
                    d="M49 58 C52 55, 57 53, 61 54 C64 56, 66 59, 66 64 C61 69, 56 73, 51 76 C46 74, 43 70, 42 66 C44 63, 46 60, 49 58 Z"
                    fill="rgba(206,246,255,.28)"
                    stroke="rgba(228,251,255,.28)"
                    strokeWidth=".35"
                />
                <path
                    d="M66 43 C70 41, 75 42, 78 46 C77 51, 74 55, 71 58 C67 58, 64 55, 63 51 C64 48, 65 45, 66 43 Z"
                    fill="rgba(200,244,255,.2)"
                />

                {[
                    [34, 44, 45, 39], [45, 39, 59, 36], [59, 36, 69, 43], [45, 39, 49, 58],
                    [49, 58, 61, 54], [61, 54, 70, 50], [49, 58, 44, 66], [44, 66, 52, 75],
                    [52, 75, 61, 67], [70, 50, 61, 67], [59, 36, 70, 50],
                ].map(([x1, y1, x2, y2], index) => (
                    <line
                        key={index}
                        x1={x1 + pointerX * ((index % 3) - 1) * 0.9}
                        y1={y1 + pointerY * ((index % 4) - 1.5) * 0.9}
                        x2={x2 + pointerX * (((index + 1) % 3) - 1) * 0.9}
                        y2={y2 + pointerY * (((index + 1) % 4) - 1.5) * 0.9}
                        stroke={`rgba(230,252,255,${lineOpacity})`}
                        strokeWidth={engaged ? ".58" : ".45"}
                    />
                ))}

                {[
                    [34, 44], [45, 39], [59, 36], [69, 43], [49, 58], [61, 54], [70, 50], [44, 66], [52, 75], [61, 67],
                ].map(([cx, cy], index) => (
                    <circle
                        key={index}
                        cx={cx + pointerX * ((index % 4) - 1.5) * 0.7}
                        cy={cy + pointerY * ((index % 3) - 1) * 0.7}
                        r={engaged ? "1.18" : "1"}
                        fill="rgba(238,253,255,.94)"
                    />
                ))}

                <ellipse
                    cx={50 + pointerX * 3}
                    cy={38 + pointerY * 2}
                    rx="14"
                    ry="5.2"
                    fill="rgba(255,255,255,.12)"
                    filter="url(#glow)"
                />
            </svg>
        </div>
    );
}

export default function HoloDemoPage() {
    const frameRef = useRef<HTMLDivElement>(null);
    const [pointer, setPointer] = useState({ x: 0, y: 0, engaged: false });

    useEffect(() => {
        const reset = () => setPointer((current) => ({ ...current, x: 0, y: 0, engaged: false }));
        window.addEventListener("mouseleave", reset);
        return () => window.removeEventListener("mouseleave", reset);
    }, []);

    return (
        <main
            ref={frameRef}
            onPointerMove={(event) => {
                const rect = frameRef.current?.getBoundingClientRect();
                if (!rect) return;
                const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
                const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
                setPointer({ x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)), engaged: true });
            }}
            onPointerLeave={() => setPointer({ x: 0, y: 0, engaged: false })}
            style={{
                minHeight: "100vh",
                position: "relative",
                overflow: "hidden",
                background: "#061220",
                isolation: "isolate",
            }}
        >
            <style>{SCENE_CSS}</style>

            <div
                aria-hidden
                style={{
                    position: "absolute",
                    inset: 0,
                    overflow: "hidden",
                    pointerEvents: "none",
                    background: [
                        "radial-gradient(circle at 40% 18%, rgba(73, 207, 255, 0.42), transparent 18%)",
                        "radial-gradient(circle at 49% 50%, rgba(36, 182, 255, 0.46), transparent 24%)",
                        "radial-gradient(circle at 69% 44%, rgba(47, 124, 255, 0.28), transparent 22%)",
                        "linear-gradient(100deg, #071521 0%, #0a355d 36%, #1284ca 58%, #0d4a86 76%, #0c1f3d 100%)",
                    ].join(","),
                }}
            />

            <div
                aria-hidden
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: "radial-gradient(rgba(184, 228, 255, 0.14) 1px, transparent 1.2px)",
                    backgroundSize: "12px 12px",
                    opacity: 0.42,
                    mixBlendMode: "screen",
                }}
            />

            <FigureLayer />
            <NetworkOverlay pointerX={pointer.x} pointerY={pointer.y} engaged={pointer.engaged} />
            <GlobeHologram pointerX={pointer.x} pointerY={pointer.y} engaged={pointer.engaged} />

            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(90deg, rgba(3,10,21,0.42) 0%, rgba(3,10,21,0.1) 38%, rgba(3,10,21,0.34) 100%)",
                    pointerEvents: "none",
                }}
            />

            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 2,
                    pointerEvents: "none",
                    display: "flex",
                    alignItems: "flex-start",
                    padding: "clamp(34px, 3vw, 54px)",
                }}
            >
                <SidebarPanel />
            </div>
        </main>
    );
}
