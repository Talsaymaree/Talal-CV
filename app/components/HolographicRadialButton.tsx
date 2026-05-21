"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────── */
export type HoloIcon = "home" | "folder" | "person" | "question" | "settings" | "mail";

export interface HoloRegion {
    icon: HoloIcon;
    label: string;
    onClick?: () => void;
}

export interface HolographicRadialButtonProps {
    regions: [HoloRegion, HoloRegion, HoloRegion];
    size?: number;
    className?: string;
    idleIcon?: HoloIcon;
}

/* ─────────────────────────────────────────────────────────
   ICONS
───────────────────────────────────────────────────────── */
const ICON_STROKE = 1.2;

const ICONS: Record<HoloIcon, React.ReactNode> = {
    home: (
        <path strokeLinecap="round" strokeLinejoin="round"
            d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H14v-5h-4v5H4a1 1 0 0 1-1-1V9.5z" />
    ),
    folder: (
        <path strokeLinecap="round" strokeLinejoin="round"
            d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
    ),
    person: (
        <>
            <circle cx="12" cy="8" r="4" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
        </>
    ),
    question: (
        <>
            <circle cx="12" cy="12" r="9" />
            <path strokeLinecap="round" strokeLinejoin="round"
                d="M10 9.5a2 2 0 0 1 3.9.5c0 1.5-2 2-2 3M12 17h.01" />
        </>
    ),
    settings: (
        <>
            <circle cx="12" cy="12" r="3" />
            <path strokeLinecap="round" strokeLinejoin="round"
                d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06-.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </>
    ),
    mail: (
        <>
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path strokeLinecap="round" strokeLinejoin="round" d="m2 7 10 7 10-7" />
        </>
    ),
};

/* ─────────────────────────────────────────────────────────
   KEYFRAMES
───────────────────────────────────────────────────────── */
const CSS = `
  @keyframes hbSpin     { to { transform: rotate( 360deg); } }
  @keyframes hbSpinR    { to { transform: rotate(-360deg); } }
  @keyframes hbSpinSlow { to { transform: rotate( 360deg); } }
  @keyframes hbGlow     { 0%,100%{opacity:.16;} 50%{opacity:.44;} }
  @keyframes hbIconIn   { from{opacity:0;transform:scale(.6);} to{opacity:1;transform:scale(1);} }
  @keyframes hbPip      { 0%,100%{opacity:.3;r:1.5} 50%{opacity:1;r:3} }
  @keyframes hbRingPulse{ 0%,100%{opacity:.18;} 50%{opacity:.50;} }
  @keyframes hbSweep    { 0%{transform:translateY(24%);} 100%{transform:translateY(-24%);} }
  @keyframes hbDrift    { 0%,100%{opacity:.18;transform:translateY(0);} 50%{opacity:.4;transform:translateY(-8px);} }
  @media (prefers-reduced-motion: reduce) {
    .hb-spin, .hb-halo, .hb-slow { animation:none!important; }
  }
  .hb-btn { -webkit-tap-highlight-color:transparent; }
  .hb-btn:focus-visible { outline:2px solid rgba(0,220,255,.75); outline-offset:14px; border-radius:50%; }
  .hb-btn:focus:not(:focus-visible){ outline:none; }
  .hb-sweep { animation: hbSweep 3.8s linear infinite; transform-box: fill-box; }
  .hb-drift { animation: hbDrift 4.4s ease-in-out infinite; }
`;

/* ─────────────────────────────────────────────────────────
   GLOBE WIREFRAME — 3D PROJECTION MATH
───────────────────────────────────────────────────────── */
const toRad = (d: number) => (d * Math.PI) / 180;
const ELEV  = -22;  // degrees: we look from above (tilted view)
const ELEV_R = toRad(ELEV);
const cosE = Math.cos(ELEV_R), sinE = Math.sin(ELEV_R);

/** Project a (lat, lon) sphere point into screen (x, y).
 *  Returns depth z for visibility & opacity decisions. */
function project(lat: number, lon: number, yawDeg: number, GR: number, H: number) {
    const latR = toRad(lat);
    const lonR = toRad(lon + yawDeg);
    // 3-D position on unit sphere
    const x3 =  Math.cos(latR) * Math.sin(lonR);
    const y3 =  Math.sin(latR);
    const z3 =  Math.cos(latR) * Math.cos(lonR);
    // Rotate around X axis for elevation tilt
    const xR =  x3;
    const yR =  y3 * cosE - z3 * sinE;
    const zR =  y3 * sinE + z3 * cosE;
    return { x: H + GR * xR, y: H - GR * yR, z: zR };
}

/** Sample N+1 points along a circle of latitude or longitude. */
function sampleCircle(
    fixedLat: number | null,
    fixedLon: number | null,
    yawDeg: number, GR: number, H: number,
    N = 64,
) {
    return Array.from({ length: N + 1 }, (_, i) => {
        const t = i / N;
        const lat = fixedLat !== null ? fixedLat : (t - 0.5) * 180;
        const lon = fixedLon !== null ? fixedLon : t * 360;
        return project(lat, lon, yawDeg, GR, H);
    });
}

/** Build an SVG points string, splitting on hemisphere crossings so back-face
 *  segments don't draw a chord across the front. */
function toPolylines(pts: { x: number; y: number; z: number }[], threshold = 0): string[] {
    const segs: string[] = [];
    let current: string[] = [];
    for (const p of pts) {
        if (p.z >= threshold) {
            current.push(`${p.x.toFixed(1)},${p.y.toFixed(1)}`);
        } else {
            if (current.length > 1) segs.push(current.join(" "));
            current = [];
        }
    }
    if (current.length > 1) segs.push(current.join(" "));
    return segs;
}

/* ─────────────────────────────────────────────────────────
   GEOGRAPHIC NODES — approximate major city/region positions
───────────────────────────────────────────────────────── */
const GEO_NODES: [number, number][] = [
    [51,   0],   //  0 London
    [48,   2],   //  1 Paris
    [40, -74],   //  2 New York
    [37,-122],   //  3 San Francisco
    [35, 139],   //  4 Tokyo
    [35, 105],   //  5 Shanghai
    [19,  72],   //  6 Mumbai
    [ 1, 104],   //  7 Singapore
    [-23, -43],  //  8 Rio
    [-34,  18],  //  9 Cape Town
    [55,  37],   // 10 Moscow
    [30,  31],   // 11 Cairo
    [-33, 151],  // 12 Sydney
    [60,  25],   // 13 Helsinki
    [-15, -50],  // 14 Brazil
    [45, -75],   // 15 Montreal
    [25,-100],   // 16 Mexico City
    [-35, -65],  // 17 Buenos Aires
    [52,  13],   // 18 Berlin
    [41,  29],   // 19 Istanbul
    [22, 114],   // 20 Hong Kong
    [37, 127],   // 21 Seoul
    [64, -22],   // 22 Iceland
    [-26,  28],  // 23 Johannesburg
    [14,  -17],  // 24 Dakar
    [13,  80],   // 25 Chennai
    [-12, 130],  // 26 Darwin
];

const GEO_EDGES: [number, number][] = [
    [0,1],[0,13],[0,18],[1,18],[1,11],[2,15],[2,3],[2,0],[3,16],[15,16],[16,8],
    [8,14],[8,17],[17,9],[9,23],[23,11],[11,19],[19,10],[10,13],[10,18],
    [4,21],[4,20],[4,5],[5,6],[5,20],[6,7],[6,25],[7,12],[7,20],
    [12,26],[26,12],[20,21],[21,4],[0,22],[22,13],[24,11],[24,9],[25,7],
];

/* ─────────────────────────────────────────────────────────
   SPINNING SEGMENTED RING
───────────────────────────────────────────────────────── */
function SegRing({ cx, cy, r, count, gap, sw, color, dur, rev, op }: {
    cx: number; cy: number; r: number; count: number; gap: number;
    sw: number; color: string; dur: string; rev?: boolean; op: number;
}) {
    const circ = 2 * Math.PI * r;
    const slot = circ / count;
    return (
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={color}
            strokeWidth={sw}
            strokeDasharray={`${slot * (1 - gap)} ${slot * gap}`}
            strokeLinecap="butt" opacity={op}
            style={{
                transformOrigin: `${cx}px ${cy}px`,
                animation: `${rev ? "hbSpinR" : "hbSpin"} ${dur} linear infinite`,
            }}
        />
    );
}

/* ─────────────────────────────────────────────────────────
   PERSPECTIVE ORBITAL RING
───────────────────────────────────────────────────────── */
function PRing({ cx, cy, rx, ry, rot = 0, sw, color, op, frontOnly, dur, rev }: {
    cx: number; cy: number; rx: number; ry: number; rot?: number;
    sw: number; color: string; op: number; frontOnly?: boolean;
    dur?: string; rev?: boolean;
}) {
    const st: React.CSSProperties = {
        transformOrigin: `${cx}px ${cy}px`,
        transform: `rotate(${rot}deg)`,
        ...(dur ? { animation: `${rev ? "hbSpinR" : "hbSpin"} ${dur} linear infinite` } : {}),
    };
    if (frontOnly) {
        return (
            <path d={`M ${cx - rx} ${cy} A ${rx} ${ry} 0 0 1 ${cx + rx} ${cy}`}
                fill="none" stroke={color}
                strokeWidth={sw * 1.5} opacity={Math.min(1, op * 1.8)}
                style={st}
            />
        );
    }
    return <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none"
        stroke={color} strokeWidth={sw} opacity={op} style={st} />;
}

/* ─────────────────────────────────────────────────────────
   HALO ARC — section of a tilted perspective ellipse
───────────────────────────────────────────────────────── */
const GAP_DEG = 6;

const SECTION_BOUNDS = [
    { start: -150, end:  -30, mid:  -90 },
    { start:  -30, end:   90, mid:   30 },
    { start:   90, end:  210, mid:  150 },
] as const;

function angleToSection(deg: number): number {
    if (deg >= -150 && deg < -30) return 0;
    if (deg >= -30  && deg <  90) return 1;
    return 2;
}

function haloArc(
    cx: number,
    cy: number,
    rx: number,
    ry: number,
    rotDeg: number,
    startDeg: number,
    endDeg: number,
    gapDeg: number,
): string {
    const rr = toRad(rotDeg);
    const s  = toRad(startDeg + gapDeg / 2);
    const e  = toRad(endDeg   - gapDeg / 2);
    const ux1 = rx * Math.cos(s), uy1 = ry * Math.sin(s);
    const ux2 = rx * Math.cos(e), uy2 = ry * Math.sin(e);
    const x1 = cx + ux1 * Math.cos(rr) - uy1 * Math.sin(rr);
    const y1 = cy + ux1 * Math.sin(rr) + uy1 * Math.cos(rr);
    const x2 = cx + ux2 * Math.cos(rr) - uy2 * Math.sin(rr);
    const y2 = cy + ux2 * Math.sin(rr) + uy2 * Math.cos(rr);
    const span = (endDeg - gapDeg / 2) - (startDeg + gapDeg / 2);
    return `M ${x1} ${y1} A ${rx} ${ry} ${rotDeg} ${span > 180 ? 1 : 0} 1 ${x2} ${y2}`;
}

/* ─────────────────────────────────────────────────────────
   AUDIO — synthesised video-game menu blip (Web Audio API)
───────────────────────────────────────────────────────── */
// Subtle descending tones per section — cold, hollow
const SECTION_FREQS = [420, 380, 340];

function playHoverSound(section: number) {
    try {
        const ctx = new AudioContext();
        const t   = ctx.currentTime;
        const f   = SECTION_FREQS[section] ?? 380;

        // Single triangle tone — drops slightly in pitch, fades fast
        const osc = ctx.createOscillator();
        const env = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(f, t);
        osc.frequency.exponentialRampToValueAtTime(f * 0.82, t + 0.12);
        env.gain.setValueAtTime(0.13, t);
        env.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
        osc.connect(env);
        env.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.18);

        // Tiny noise click at the front — mechanical texture
        const bufLen = Math.floor(ctx.sampleRate * 0.012);
        const buf    = ctx.createBuffer(1, bufLen, ctx.sampleRate);
        const data   = buf.getChannelData(0);
        for (let i = 0; i < bufLen; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / bufLen);
        const noise  = ctx.createBufferSource();
        const nEnv   = ctx.createGain();
        nEnv.gain.value = 0.07;
        noise.buffer = buf;
        noise.connect(nEnv);
        nEnv.connect(ctx.destination);
        noise.start(t);

        setTimeout(() => ctx.close(), 300);
    } catch {
        // Web Audio unavailable — fail silently
    }
}

/* ─────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────── */
export default function HolographicRadialButton({
    regions,
    size = 300,
    className = "",
    idleIcon = "question",
}: HolographicRadialButtonProps) {
    const [active,  setActive]   = useState<number | null>(null);
    const [hovered, setHovered]  = useState(false);
    const [tilt,    setTilt]     = useState({ x: 0, y: 0 });
    const [yaw,     setYaw]      = useState(0);   // globe rotation angle

    /* ── Hover sound — fire when section changes ── */
    const prevActiveRef = useRef<number | null>(null);
    useEffect(() => {
        if (active !== null && active !== prevActiveRef.current) {
            playHoverSound(active);
        }
        prevActiveRef.current = active;
    }, [active]);

    /* ── Globe spin animation ── */
    const yawRef      = useRef(0);
    const lastTimeRef = useRef(0);
    const frameRef    = useRef<number>();

    useEffect(() => {
        const tick = (t: number) => {
            const dt = t - lastTimeRef.current;
            lastTimeRef.current = t;
            // ~18° per second → full rotation in 20s
            yawRef.current = (yawRef.current + dt * 0.018) % 360;
            setYaw(yawRef.current);
            frameRef.current = requestAnimationFrame(tick);
        };
        frameRef.current = requestAnimationFrame(tick);
        return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
    }, []);

    /* ── Sizing ── */
    const H   = size / 2;
    const GR  = H * 0.57;

    /* Halo ring */
    const HRX = H * 0.88;
    const HRY = H * 0.16;
    const HRO = -8;
    const HSW = H * 0.10;

    /* Icon */
    const ICON_SZ = GR * 1.05;

    /* Radial spokes pre-computed */
    const rr_rad = toRad(HRO);
    const sRX = HRX + HSW * 0.5, sRY = HRY + HSW * 0.3;
    const spokes = Array.from({ length: 72 }, (_, k) => {
        const θ = toRad(k * 5);
        const ux = sRX * Math.cos(θ), uy = sRY * Math.sin(θ);
        return {
            x: H + ux * Math.cos(rr_rad) - uy * Math.sin(rr_rad),
            y: H + ux * Math.sin(rr_rad) + uy * Math.cos(rr_rad),
        };
    });

    /* Interaction */
    const onPointerMove = useCallback((e: React.PointerEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width  / 2);
        const dy = e.clientY - (rect.top  + rect.height / 2);
        const dist = Math.hypot(dx, dy);
        const nx = (e.clientX - rect.left) / rect.width;
        const ny = (e.clientY - rect.top)  / rect.height;
        setTilt({ x: -(ny - 0.5) * 10, y: (nx - 0.5) * 10 });
        setActive(dist <= H ? angleToSection(Math.atan2(dy, dx) * 180 / Math.PI) : null);
    }, [H]);

    const onLeave = useCallback(() => {
        setActive(null); setHovered(false); setTilt({ x: 0, y: 0 });
    }, []);

    const handleClick = useCallback(() => {
        if (active !== null) regions[active].onClick?.();
    }, [active, regions]);

    /* ── Globe wireframe — computed from current yaw ── */
    const LAT_LINES = [-75, -60, -45, -30, -15, 0, 15, 30, 45, 60, 75];
    const LON_LINES = [0, 20, 40, 60, 80, 100, 120, 140, 160]; // every 20°

    // Project geo nodes
    const projNodes = GEO_NODES.map(([lat, lon]) => project(lat, lon, yaw, GR, H));

    const amb = hovered ? 0.72 : 0.44;
    const centerIcon = active === null ? idleIcon : regions[active].icon;

    return (
        <>
            <style>{CSS}</style>

            <div style={{ position: "relative", display: "inline-block", width: size, height: size }} className={className}>

                {/* Volumetric glow */}
                <div aria-hidden style={{
                    position: "absolute",
                    width: size * 3.2, height: size * 3.2,
                    top: "50%", left: "50%",
                    transform: "translate(-50%,-50%)",
                    borderRadius: "50%",
                    background: `radial-gradient(circle, rgba(215,250,255,${amb * 0.32}) 0%, rgba(79,218,255,${amb}) 16%, rgba(25,120,255,${amb * 0.48}) 42%, transparent 72%)`,
                    filter: `blur(${size * .28}px)`,
                    transition: "background .5s ease",
                    pointerEvents: "none",
                }} />

                <button
                    className="hb-btn"
                    onClick={handleClick}
                    onPointerMove={onPointerMove}
                    onPointerEnter={() => setHovered(true)}
                    onPointerLeave={onLeave}
                    aria-label={regions.map(r => r.label).join(" / ")}
                    style={{
                        position: "relative", width: size, height: size,
                        borderRadius: "50%", background: "transparent",
                        border: "none", padding: 0, cursor: "pointer",
                        transform: `perspective(${size * 5}px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                        transition: hovered ? "transform .06s linear" : "transform .75s cubic-bezier(.22,1,.36,1)",
                    }}
                >
                    <svg aria-hidden width={size} height={size} viewBox={`0 0 ${size} ${size}`}
                        style={{ position: "absolute", inset: 0, overflow: "visible", pointerEvents: "none" }}>

                        <defs>
                            {/* Globe base — very transparent so wireframe shows through */}
                            <radialGradient id="hbGF" cx="50%" cy="50%" r="50%" gradientUnits="objectBoundingBox">
                                <stop offset="0%"   stopColor="#72efff" stopOpacity=".28" />
                                <stop offset="32%"  stopColor="#0a8fe0" stopOpacity=".26" />
                                <stop offset="100%" stopColor="#03101e" stopOpacity=".48" />
                            </radialGradient>
                            {/* Globe limb glow */}
                            <radialGradient id="hbGL" cx="50%" cy="50%" r="50%" gradientUnits="objectBoundingBox">
                                <stop offset="52%"  stopColor="transparent"  stopOpacity="0"   />
                                <stop offset="80%"  stopColor="#2ca5ff"      stopOpacity=".48" />
                                <stop offset="92%"  stopColor="#92ecff"      stopOpacity=".88" />
                                <stop offset="100%" stopColor="#e6ffff"      stopOpacity=".98" />
                            </radialGradient>
                            {/* Specular */}
                            <radialGradient id="hbGS" cx="30%" cy="24%" r="38%" gradientUnits="objectBoundingBox">
                                <stop offset="0%"   stopColor="#ffffff" stopOpacity=".44" />
                                <stop offset="40%"  stopColor="#b7f4ff" stopOpacity=".16" />
                                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                            </radialGradient>
                            {/* Per-section halo glow */}
                            {SECTION_BOUNDS.map((sec, i) => {
                                const r = toRad(sec.mid), rr = toRad(HRO);
                                const ux = HRX * Math.cos(r), uy = HRY * Math.sin(r);
                                return (
                                    <radialGradient key={i} id={`hbHG${i}`}
                                        cx={H + ux * Math.cos(rr) - uy * Math.sin(rr)}
                                        cy={H + ux * Math.sin(rr) + uy * Math.cos(rr)}
                                        r={HRX * .55} gradientUnits="userSpaceOnUse">
                                        <stop offset="0%"   stopColor="#c7fbff" stopOpacity=".78" />
                                        <stop offset="100%" stopColor="#68dfff" stopOpacity="0" />
                                    </radialGradient>
                                );
                            })}
                            {/* Clip globe circle */}
                            <clipPath id="hbGC">
                                <circle cx={H} cy={H} r={GR * .99} />
                            </clipPath>
                            {/* Blur */}
                            <filter id="hbBl6"  x="-80%"  y="-80%"  width="260%" height="260%">
                                <feGaussianBlur stdDeviation="6" />
                            </filter>
                            <filter id="hbBl14" x="-120%" y="-120%" width="340%" height="340%">
                                <feGaussianBlur stdDeviation="14" />
                            </filter>
                            <path
                                id="hbOrbitA"
                                d={`M ${H - GR*1.22} ${H} A ${GR*1.22} ${GR*.19} 40 0 1 ${H + GR*1.22} ${H}`}
                            />
                            <path
                                id="hbOrbitB"
                                d={`M ${H - GR*1.44} ${H} A ${GR*1.44} ${GR*.23} -24 0 1 ${H + GR*1.44} ${H}`}
                            />
                            <path
                                id="hbOrbitC"
                                d={`M ${H - GR*1.30} ${H + GR*.05} A ${GR*1.30} ${GR*.16} 24 0 1 ${H + GR*1.12} ${H - GR*.02}`}
                            />
                        </defs>

                        {/* OUTER HUD RINGS */}
                        <SegRing cx={H} cy={H} r={H * .97} count={36} gap={.56} sw={.5}  color="#d8fdff" dur="10s"      op={.08} />
                        <SegRing cx={H} cy={H} r={H * .91} count={11} gap={.34} sw={1.2} color="#84eeff" dur="26s" rev op={.12} />

                        {/* PERSPECTIVE ORBITAL RINGS — back */}
                        <PRing cx={H} cy={H} rx={GR*1.14} ry={GR*.15} rot={70}  sw={.7}  color="#9ef2ff" op={.10} dur="18s" rev />
                        <PRing cx={H} cy={H} rx={GR*1.22} ry={GR*.19} rot={40}  sw={.9}  color="#62daff" op={.12} dur="30s"     />
                        <PRing cx={H} cy={H} rx={GR*1.44} ry={GR*.23} rot={-24} sw={1.3} color="#3fb6ff" op={.15} dur="22s" rev />

                        {/* RADIAL SPOKES — rotating */}
                        <g className="hb-slow" style={{ transformOrigin:`${H}px ${H}px`, animation:"hbSpinSlow 55s linear infinite" }}>
                            {spokes.map((pt, i) => (
                                <line key={i} x1={H} y1={H} x2={pt.x} y2={pt.y}
                                    stroke="rgba(185,238,255,.08)" strokeWidth={.4} />
                            ))}
                        </g>

                        {/* HALO RING BASE */}
                        <ellipse cx={H} cy={H} rx={HRX} ry={HRY} fill="none"
                            stroke="rgba(137,227,255,.12)" strokeWidth={HSW}
                            style={{ transform:`rotate(${HRO}deg)`, transformOrigin:`${H}px ${H}px` }}
                        />

                        {/* HALO SECTIONS — glow + crisp */}
                        {SECTION_BOUNDS.map((sec, i) => {
                            const isActive = active === i;
                            const d = haloArc(H, H, HRX, HRY, HRO, sec.start, sec.end, GAP_DEG);
                            return (
                                <React.Fragment key={i}>
                                    <path d={d} fill="none" stroke={`url(#hbHG${i})`}
                                        strokeWidth={HSW * 2.4} strokeLinecap="butt"
                                        filter="url(#hbBl6)"
                                        opacity={isActive ? 1 : 0}
                                        style={{ transition: "opacity .3s ease" }}
                                    />
                                    <path d={d} fill="none"
                                        stroke={isActive ? "rgba(216,252,255,.95)" : "rgba(125,221,255,.22)"}
                                        strokeWidth={HSW} strokeLinecap="butt"
                                        style={{ transition: "stroke .28s ease" }}
                                    />
                                </React.Fragment>
                            );
                        })}

                        {/* Halo rim lines */}
                        <ellipse cx={H} cy={H} rx={HRX - HSW/2} ry={HRY - HSW*(HRY/HRX)/2}
                            fill="none" stroke="rgba(183,245,255,.20)" strokeWidth={.6}
                            style={{ transform:`rotate(${HRO}deg)`, transformOrigin:`${H}px ${H}px` }}
                        />
                        <ellipse cx={H} cy={H} rx={HRX + HSW/2} ry={HRY + HSW*(HRY/HRX)/2}
                            fill="none" stroke="rgba(120,220,255,.14)" strokeWidth={.5}
                            style={{ transform:`rotate(${HRO}deg)`, transformOrigin:`${H}px ${H}px` }}
                        />

                        {/* GLOBE HALO PULSE */}
                        <circle cx={H} cy={H} r={GR * 1.12}
                            fill="none" stroke="rgba(157,240,255,.62)"
                            strokeWidth={GR * .34} filter="url(#hbBl14)"
                            className="hb-halo"
                            style={{ animation:"hbGlow 4.4s ease-in-out infinite" }}
                        />

                        {/* GLOBE BASE */}
                        <circle cx={H} cy={H} r={GR} fill="url(#hbGF)"
                            stroke="rgba(190,245,255,.62)" strokeWidth={1.1} />
                        <circle cx={H} cy={H} r={GR * 1.08}
                            fill="none" stroke="rgba(186,242,255,.18)"
                            strokeWidth={GR * .14} filter="url(#hbBl14)" />
                        <ellipse
                            cx={H}
                            cy={H - GR * .16}
                            rx={GR * .5}
                            ry={GR * .22}
                            fill="rgba(255,255,255,.1)"
                            filter="url(#hbBl14)"
                        />

                        {/* ── WIREFRAME GLOBE (clipped to sphere) ── */}
                        <g clipPath="url(#hbGC)">

                            {/* Pulsing inner ring — breathing energy ring */}
                            <circle cx={H} cy={H} r={GR * 0.52}
                                fill="none" stroke="rgba(193,247,255,.34)"
                                strokeWidth={GR * .08}
                                style={{ animation: "hbRingPulse 2.8s ease-in-out infinite" }}
                            />
                            <circle cx={H} cy={H} r={GR * 0.78}
                                fill="none" stroke="rgba(112,214,255,.18)"
                                strokeWidth={GR * .05}
                                style={{ animation: "hbRingPulse 3.6s ease-in-out 0.9s infinite" }}
                            />

                            {/* Latitude circles */}
                            {LAT_LINES.map((lat, i) => {
                                const pts = sampleCircle(lat, null, yaw, GR, H, 96);
                                const segs = toPolylines(pts, 0);
                                const bright = lat === 0;
                                return segs.map((seg, j) => (
                                    <polyline key={`lat-${i}-${j}`}
                                        fill="none"
                                        stroke={`rgba(183,244,255,${bright ? .42 : .18})`}
                                        strokeWidth={bright ? 1.0 : .55}
                                        points={seg}
                                    />
                                ));
                            })}

                            {/* Longitude circles (meridians) — both halves */}
                            {LON_LINES.flatMap((lon, i) =>
                                [lon, lon + 180].map((l, half) => {
                                    const pts = sampleCircle(null, l, yaw, GR, H, 96);
                                    const segs = toPolylines(pts, 0);
                                    return segs.map((seg, j) => (
                                        <polyline key={`lon-${i}-${half}-${j}`}
                                            fill="none"
                                            stroke="rgba(123,224,255,.18)"
                                            strokeWidth={.5}
                                            points={seg}
                                        />
                                    ));
                                })
                            )}

                            {/* Geo network edges */}
                            {GEO_EDGES.map(([a, b], i) => {
                                const pa = projNodes[a], pb = projNodes[b];
                                if (!pa || !pb) return null;
                                if (pa.z < 0 && pb.z < 0) return null;
                                const op = Math.max(0, Math.min(pa.z, pb.z)) * 0.7 + 0.15;
                                return (
                                    <line key={i}
                                        x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y}
                                        stroke={`rgba(209,249,255,${(op * 0.84).toFixed(2)})`}
                                        strokeWidth={.7}
                                    />
                                );
                            })}

                            {/* Geo nodes — glowing pulsing dots */}
                            {projNodes.map((p, i) => {
                                if (p.z < 0) return null;
                                const brightness = Math.max(0.2, p.z);
                                const r = 1.5 + brightness * 2;
                                const delay = `${((i * 0.23) % 2.8).toFixed(2)}s`;
                                const dur   = `${2.0 + (i % 5) * 0.35}s`;
                                return (
                                    <circle key={i} cx={p.x} cy={p.y} r={r}
                                        fill={`rgba(224,252,255,${(brightness * 0.82).toFixed(2)})`}
                                        style={{
                                            filter: `blur(${brightness > 0.5 ? 0.5 : 0}px)`,
                                            animation: `hbPip ${dur} ease-in-out ${delay} infinite`,
                                        }}
                                    />
                                );
                            })}

                            <g className="hb-sweep" opacity={0.75}>
                                <ellipse
                                    cx={H}
                                    cy={H}
                                    rx={GR * 0.96}
                                    ry={GR * 0.26}
                                    fill="rgba(220,252,255,.11)"
                                    filter="url(#hbBl14)"
                                />
                            </g>
                        </g>

                        {/* GLOBE LIMB + SPECULAR (on top of wireframe) */}
                        <circle cx={H} cy={H} r={GR} fill="url(#hbGL)" />
                        <circle cx={H} cy={H} r={GR} fill="url(#hbGS)" />

                        {/* PERSPECTIVE ORBITAL RINGS — front arc */}
                        <PRing cx={H} cy={H} rx={GR*1.22} ry={GR*.19} rot={40}  sw={.9}  color="#7ce7ff" op={.14} dur="30s"      frontOnly />
                        <PRing cx={H} cy={H} rx={GR*1.44} ry={GR*.23} rot={-24} sw={1.3} color="#4abfff" op={.17} dur="22s" rev  frontOnly />
                        <path
                            d={`M ${H - GR*1.18} ${H + GR*.03} A ${GR*1.24} ${GR*.17} 28 0 1 ${H + GR*1.05} ${H - GR*.01}`}
                            fill="none"
                            stroke="rgba(220,251,255,.48)"
                            strokeWidth={GR * .11}
                            strokeLinecap="round"
                            strokeDasharray={`${GR * .56} ${GR * .34} ${GR * .22} ${GR * .28}`}
                            filter="url(#hbBl6)"
                            style={{
                                transformOrigin: `${H}px ${H}px`,
                                animation: "hbSpin 11s linear infinite",
                            }}
                        />
                        <path
                            d={`M ${H - GR*1.06} ${H + GR*.07} A ${GR*1.08} ${GR*.14} 19 0 1 ${H + GR*.88} ${H + GR*.04}`}
                            fill="none"
                            stroke="rgba(132,227,255,.22)"
                            strokeWidth={GR * .05}
                            strokeLinecap="round"
                            strokeDasharray={`${GR * .18} ${GR * .2}`}
                            style={{
                                transformOrigin: `${H}px ${H}px`,
                                animation: "hbSpinR 9s linear infinite",
                            }}
                        />
                        <circle r={3.5} fill="rgba(236,254,255,.92)" filter="url(#hbBl6)" className="hb-drift">
                            <animateMotion dur="7.8s" repeatCount="indefinite" rotate="auto">
                                <mpath href="#hbOrbitA" />
                            </animateMotion>
                        </circle>
                        <circle r={2.8} fill="rgba(164,236,255,.86)" filter="url(#hbBl6)" className="hb-drift">
                            <animateMotion dur="10.4s" repeatCount="indefinite" rotate="auto-reverse">
                                <mpath href="#hbOrbitB" />
                            </animateMotion>
                        </circle>
                        <circle r={1.8} fill="rgba(226,252,255,.8)">
                            <animateMotion dur="5.6s" repeatCount="indefinite">
                                <mpath href="#hbOrbitA" />
                            </animateMotion>
                        </circle>
                        <circle r={2.1} fill="rgba(245,254,255,.82)" filter="url(#hbBl6)">
                            <animateMotion dur="8.9s" repeatCount="indefinite">
                                <mpath href="#hbOrbitC" />
                            </animateMotion>
                        </circle>

                        {/* CARDINAL DOTS */}
                        {[0, 90, 180, 270].map(deg => {
                            const r = toRad(deg);
                            return (
                                <circle key={deg}
                                    cx={H + Math.cos(r) * H * .91}
                                    cy={H + Math.sin(r) * H * .91}
                                    r={2} fill="#ebffff"
                                    opacity={hovered ? .5 : .18}
                                    style={{ transition: "opacity .4s" }}
                                />
                            );
                        })}

                        {/* CENTRAL ICON DISPLAY */}
                        <circle cx={H} cy={H} r={ICON_SZ * .54}
                            fill={active === null ? "rgba(182,245,255,.12)" : "rgba(133,223,255,.16)"}
                            filter="url(#hbBl6)"
                            style={{ transition: "fill .25s ease" }} />
                        <circle cx={H} cy={H} r={ICON_SZ * .34}
                            fill="none"
                            stroke={active === null ? "rgba(212,251,255,.48)" : "rgba(218,251,255,.76)"}
                            strokeWidth={1}
                            style={{ transition: "stroke .25s ease" }} />
                        <svg
                            x={H - ICON_SZ/2} y={H - ICON_SZ/2}
                            width={ICON_SZ} height={ICON_SZ}
                            viewBox="0 0 24 24" fill="none"
                            stroke="rgba(240,252,255,1)"
                            strokeWidth={ICON_STROKE}
                            strokeLinecap="round" strokeLinejoin="round"
                            style={{
                                opacity: 1,
                                filter: active === null
                                    ? `drop-shadow(0 0 ${ICON_SZ*.16}px rgba(207,250,255,.8))`
                                    : `drop-shadow(0 0 ${ICON_SZ*.18}px rgba(209,250,255,.92)) drop-shadow(0 0 ${ICON_SZ*.36}px rgba(72,190,255,.48))`,
                                transition: "filter .25s ease",
                                animation: active !== null ? "hbIconIn .25s ease-out" : undefined,
                            }}
                        >
                            {ICONS[centerIcon]}
                        </svg>

                        {/* IDLE CROSSHAIR */}
                        {active === null && (
                            <g opacity={hovered ? .26 : .14} style={{ transition: "opacity .3s" }}>
                                <line x1={H - GR*.28} y1={H} x2={H + GR*.28} y2={H}
                                    stroke="rgba(222,252,255,1)" strokeWidth={.7} />
                                <line x1={H} y1={H - GR*.28} x2={H} y2={H + GR*.28}
                                    stroke="rgba(222,252,255,1)" strokeWidth={.7} />
                                <circle cx={H} cy={H} r={GR*.07}
                                    fill="none" stroke="rgba(222,252,255,1)" strokeWidth={.7} />
                            </g>
                        )}
                    </svg>

                    <span style={{ position:"absolute", width:1, height:1, overflow:"hidden", clip:"rect(0,0,0,0)", whiteSpace:"nowrap" }}>
                        {regions.map(r => r.label).join(" / ")}
                    </span>
                </button>
            </div>
        </>
    );
}
