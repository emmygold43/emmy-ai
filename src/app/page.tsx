"use client";

import Link from "next/link";

function EmmyLogo({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <div className={compact ? "emmyLogo compactLogo" : "emmyLogo"}>
      <svg
        viewBox="0 0 600 520"
        xmlns="http://www.w3.org/2000/svg"
        className="emmySvg"
      >
        <defs>
          <linearGradient
            id="emmyGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#9b5cff" />
            <stop offset="45%" stopColor="#d946ef" />
            <stop offset="75%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>

          <linearGradient
            id="orbitGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="35%" stopColor="#a855f7" />
            <stop offset="70%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
          </linearGradient>

          <radialGradient id="orbGradient">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="25%" stopColor="#67e8f9" />
            <stop offset="60%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
          </radialGradient>

          <filter id="emmyGlow">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="softGlow">
            <feGaussianBlur stdDeviation="18" />
          </filter>
        </defs>

        {/* Soft glow behind logo */}
        <ellipse
          cx="300"
          cy="260"
          rx="150"
          ry="120"
          fill="#8b5cf6"
          opacity="0.18"
          filter="url(#softGlow)"
        />

        {/* Main E */}
        <path
          d="M195 120
             C155 145 135 185 135 245
             C135 325 190 375 270 375
             C330 375 375 350 405 310
             L355 275
             C333 300 308 315 270 315
             C225 315 198 287 195 250
             H335
             V205
             H195
             C203 172 230 155 270 155
             C305 155 330 168 350 190
             L397 150
             C365 115 320 95 270 95
             C240 95 215 103 195 120Z"
          fill="url(#emmyGradient)"
          filter="url(#emmyGlow)"
        />

        {/* Inner highlight */}
        <path
          d="M205 135
             C175 160 160 195 160 245
             C160 310 205 350 270 350
             C315 350 348 333 375 300"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* Orbit */}
        <ellipse
          cx="300"
          cy="245"
          rx="215"
          ry="75"
          fill="none"
          stroke="url(#orbitGradient)"
          strokeWidth="5"
          opacity="0.85"
          className="logoOrbitSvg"
        />

        {/* Second orbit */}
        <ellipse
          cx="300"
          cy="245"
          rx="215"
          ry="75"
          fill="none"
          stroke="#36dfff"
          strokeWidth="2"
          opacity="0.5"
          transform="rotate(65 300 245)"
          className="reverseOrbit"
        />

        {/* Orbiting orb */}
        <circle
          cx="505"
          cy="245"
          r="25"
          fill="url(#orbGradient)"
          className="logoOrbSvg"
        />

        <circle
          cx="505"
          cy="245"
          r="5"
          fill="white"
        />

        {/* Ground glow */}
        <ellipse
          cx="300"
          cy="390"
          rx="130"
          ry="20"
          fill="#8b5cf6"
          opacity="0.2"
          filter="url(#softGlow)"
          className="groundGlow"
        />
      </svg>

      {!compact && (
        <div className="logoWordmark">
          <div className="logoName">
            <span>EMMY</span>
            <strong>AI</strong>
          </div>

          <div className="logoTagline">
            YOUR INTELLIGENT WORKSPACE
          </div>

          <div className="logoDecoration">
            <i />
            <b>✦</b>
            <i />
          </div>
        </div>
      )}
    </div>
  );
}

/*
  Fixed particle system.

  IMPORTANT:
  We are NOT using Math.random() here.
  That prevents the Next.js hydration mismatch
  that caused the red "1 Issue" warning.
*/
function FloatingParticles() {
  return (
    <div className="particles">
      {Array.from({ length: 30 }).map((_, index) => (
        <span
          key={index}
          className="particle"
          style={
            {
              "--x": `${(index * 37) % 100}%`,
              "--y": `${(index * 61) % 100}%`,
              "--delay": `${(index % 8) * 0.8}s`,
              "--duration": `${6 + (index % 5)}s`,
              "--size": `${1 + (index % 3)}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

const tools = [
  {
    number: "01",
    icon: "📄",
    title: "AI Resume Analyzer",
    description:
      "Analyze resumes, score them, find weaknesses, and get intelligent improvement suggestions.",
    href: "/resume-analyzer",
    tag: "CAREER AI",
  },
  {
    number: "02",
    icon: "🎨",
    title: "AI Sketch & Image",
    description:
      "Turn ideas and sketches into polished creative visuals with AI-powered image generation.",
    href: "/sketch-to-image",
    tag: "CREATIVE AI",
  },
  {
    number: "03",
    icon: "🌐",
    title: "CMS Detector",
    description:
      "Analyze a website and discover its likely CMS, technology platform, evidence, and confidence.",
    href: "/cms-detector",
    tag: "WEB AI",
  },
  {
    number: "04",
    icon: "📚",
    title: "AI PDF Reader",
    description:
      "Upload PDFs, extract their content, summarize documents, and ask questions about them.",
    href: "/pdf-reader",
    tag: "DOCUMENT AI",
  },
];

export default function Home() {
  return (
    <main className="page">

      {/* =========================
          ANIMATED BACKGROUND
      ========================= */}

      <div className="background">
        <div className="aurora auroraOne" />
        <div className="aurora auroraTwo" />
        <div className="aurora auroraThree" />

        <div className="gridBackground" />
        <div className="stars" />
      </div>

      {/* Floating particles */}
      <FloatingParticles />

      {/* =========================
          NAVIGATION
      ========================= */}

      <nav className="navbar">

        <div className="navLogo">
          <EmmyLogo compact />
        </div>

        <div className="navLinks">
          <a href="#tools">AI TOOLS</a>
          <a href="#about">ABOUT</a>
        </div>

        <div className="aiStatus">
          <span className="statusDot" />
          <span>AI ONLINE</span>
        </div>

      </nav>

      {/* =========================
          HERO
      ========================= */}

      <section className="hero">

        <div className="heroGlow" />

        <div className="heroLogo">
          <EmmyLogo />
        </div>

        <div className="heroBadge">
          <span className="badgePulse" />
          NEXT-GENERATION AI WORKSPACE
        </div>

        <h1>
          Intelligence
          <br />
          <span>Reimagined.</span>
        </h1>

        <p className="heroDescription">
          Welcome to EMMY AI — your intelligent workspace for
          analyzing, creating, discovering, and understanding
          information with artificial intelligence.
        </p>

        <div className="heroButtons">

          <a href="#tools" className="primaryButton">
            <span>EXPLORE AI TOOLS</span>
            <b>→</b>
          </a>

          <a href="#about" className="secondaryButton">
            DISCOVER EMMY AI
          </a>

        </div>

        <div className="scrollIndicator">
          <span />
          SCROLL TO EXPLORE
        </div>

      </section>

      {/* =========================
          AI TOOLS
      ========================= */}

      <section id="tools" className="toolsSection">

        <div className="sectionHeader">

          <div>

            <div className="sectionEyebrow">
              <span />
              EMMY INTELLIGENCE
            </div>

            <h2>
              Powerful AI.
              <br />
              <span>One Workspace.</span>
            </h2>

          </div>

          <p>
            Everything you need to transform ideas, documents,
            websites, and professional information into useful
            intelligence.
          </p>

        </div>

        <div className="toolsGrid">

          {tools.map((tool) => (
            <Link
              href={tool.href}
              key={tool.number}
              className="toolCard"
            >

              <div className="cardGlow" />

              <div className="cardTop">

                <span className="toolNumber">
                  {tool.number}
                </span>

                <span className="toolTag">
                  {tool.tag}
                </span>

              </div>

              <div className="toolIcon">
                {tool.icon}
              </div>

              <h3>{tool.title}</h3>

              <p>{tool.description}</p>

              <div className="cardBottom">
                <span>LAUNCH TOOL</span>
                <b>↗</b>
              </div>

              <div className="cardCorner" />

            </Link>
          ))}

        </div>

      </section>

      {/* =========================
          AI CORE
      ========================= */}

      <section className="aiBanner">

        <div className="aiBannerGlow" />

        <div className="aiOrb">

          <div className="orbRing ringOne" />
          <div className="orbRing ringTwo" />

          <div className="orbCore">
            ✦
          </div>

        </div>

        <div className="aiBannerContent">

          <div className="sectionEyebrow">
            <span />
            EMMY AI CORE
          </div>

          <h2>
            Your ideas.
            <br />
            <span>Amplified by AI.</span>
          </h2>

          <p>
            EMMY AI is designed to make powerful artificial
            intelligence feel simple, fast, and accessible.
          </p>

        </div>

        <div className="aiPulse">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>

      </section>

      {/* =========================
          ABOUT
      ========================= */}

      <section id="about" className="aboutSection">

        <div className="aboutCard">

          <div className="aboutLogo">
            <EmmyLogo compact />
          </div>

          <div>

            <div className="sectionEyebrow">
              <span />
              ABOUT EMMY AI
            </div>

            <h2>
              Built for the
              <span> AI era.</span>
            </h2>

            <p>
              EMMY AI brings multiple intelligent tools together
              inside one beautiful workspace. Instead of jumping
              between different services, you can analyze,
              create, detect, and understand from one place.
            </p>

          </div>

        </div>

      </section>

      {/* =========================
          FOOTER
      ========================= */}

      <footer>

        <div className="footerLogo">
          <EmmyLogo compact />
        </div>

        <p>
          © 2026 EMMY AI. Your Intelligent Workspace.
        </p>

        <div className="footerStatus">
          <span className="statusDot" />
          SYSTEM OPERATIONAL
        </div>

      </footer>

      {/* =========================
          CSS
      ========================= */}

      <style jsx>{`

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        .page {
          min-height: 100vh;
          overflow: hidden;
          position: relative;
          background:
            radial-gradient(
              circle at 50% 10%,
              rgba(124, 58, 237, 0.16),
              transparent 35%
            ),
            #03040b;
          color: white;
          font-family:
            Inter,
            ui-sans-serif,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        }

        /* =========================
           BACKGROUND
        ========================= */

        .background {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        .gridBackground {
          position: absolute;
          inset: 0;
          opacity: 0.16;
          background-image:
            linear-gradient(
              rgba(139, 92, 246, 0.15) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(139, 92, 246, 0.15) 1px,
              transparent 1px
            );
          background-size: 70px 70px;
          mask-image: linear-gradient(
            to bottom,
            black,
            transparent 85%
          );
          animation: gridMove 20s linear infinite;
        }

        @keyframes gridMove {
          from {
            transform: translateY(0);
          }

          to {
            transform: translateY(70px);
          }
        }

        .aurora {
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.14;
          animation: auroraFloat 12s ease-in-out infinite;
        }

        .auroraOne {
          top: -250px;
          left: -150px;
          background: #8b5cf6;
        }

        .auroraTwo {
          top: 25%;
          right: -250px;
          background: #06b6d4;
          animation-delay: -4s;
        }

        .auroraThree {
          bottom: -300px;
          left: 35%;
          background: #ec4899;
          animation-delay: -8s;
        }

        @keyframes auroraFloat {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }

          50% {
            transform: translate(50px, -30px) scale(1.15);
          }
        }

        .stars {
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(
              circle,
              rgba(255, 255, 255, 0.7) 1px,
              transparent 1px
            );
          background-size: 120px 120px;
          opacity: 0.12;
        }

        /* =========================
           PARTICLES
        ========================= */

        .particles {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          overflow: hidden;
        }

        .particle {
          position: absolute;
          left: var(--x);
          top: var(--y);
          width: var(--size);
          height: var(--size);
          border-radius: 50%;
          background: white;
          opacity: 0;
          box-shadow:
            0 0 10px #a855f7,
            0 0 20px #6366f1;
          animation:
            particleFloat var(--duration) ease-in-out
            var(--delay) infinite;
        }

        @keyframes particleFloat {

          0% {
            transform: translateY(30px);
            opacity: 0;
          }

          20% {
            opacity: 0.8;
          }

          80% {
            opacity: 0.4;
          }

          100% {
            transform: translateY(-120px);
            opacity: 0;
          }

        }

        /* =========================
           NAVIGATION
        ========================= */

        .navbar {
          position: relative;
          z-index: 10;
          width: min(1400px, calc(100% - 50px));
          margin: auto;
          padding: 22px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
        }

        .navLogo {
          transform: scale(0.65);
          transform-origin: left center;
          margin-left: -50px;
        }

        .navLinks {
          display: flex;
          gap: 38px;
        }

        .navLinks a {
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          transition: 0.3s;
        }

        .navLinks a:hover {
          color: white;
          text-shadow: 0 0 15px #a855f7;
        }

        .aiStatus,
        .footerStatus {
          display: flex;
          align-items: center;
          gap: 9px;
          font-size: 10px;
          letter-spacing: 2px;
          color: rgba(255, 255, 255, 0.55);
          font-weight: 700;
        }

        .statusDot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow:
            0 0 8px #22c55e,
            0 0 18px #22c55e;
          animation: statusPulse 2s infinite;
        }

        @keyframes statusPulse {

          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }

          50% {
            opacity: 0.5;
            transform: scale(0.7);
          }

        }

        /* =========================
           LOGO
        ========================= */

        .emmyLogo {
          position: relative;
          width: 420px;
          margin: auto;
          text-align: center;
          animation: logoFloat 5s ease-in-out infinite;
        }

        .compactLogo {
          width: 210px;
        }

        .emmySvg {
          width: 100%;
          display: block;
          overflow: visible;
        }

        @keyframes logoFloat {

          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-10px);
          }

        }

        .logoOrbitSvg {
          transform-origin: 300px 245px;
          animation: orbitSpin 8s linear infinite;
        }

        .reverseOrbit {
          transform-origin: 300px 245px;
          animation: orbitReverse 11s linear infinite;
        }

        @keyframes orbitSpin {

          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }

        }

        @keyframes orbitReverse {

          from {
            transform: rotate(65deg);
          }

          to {
            transform: rotate(-295deg);
          }

        }

        .logoOrbSvg {
          transform-origin: 300px 245px;
          animation: orbPulse 2s ease-in-out infinite;
        }

        @keyframes orbPulse {

          0%,
          100% {
            opacity: 0.7;
          }

          50% {
            opacity: 1;
          }

        }

        .logoWordmark {
          margin-top: -15px;
        }

        .logoName {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
          font-size: 44px;
          font-weight: 800;
          letter-spacing: 7px;
        }

        .logoName strong {
          color: #8b5cf6;
          text-shadow:
            0 0 15px #8b5cf6,
            0 0 35px rgba(139, 92, 246, 0.6);
        }

        .logoTagline {
          margin-top: 8px;
          color: rgba(255, 255, 255, 0.4);
          font-size: 9px;
          letter-spacing: 5px;
          font-weight: 700;
        }

        .logoDecoration {
          margin: 14px auto 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .logoDecoration i {
          display: block;
          width: 55px;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            #8b5cf6,
            transparent
          );
        }

        .logoDecoration b {
          color: #22d3ee;
          font-size: 10px;
          animation: sparkle 2s infinite;
        }

        @keyframes sparkle {

          0%,
          100% {
            opacity: 0.5;
            transform: scale(0.8) rotate(0);
          }

          50% {
            opacity: 1;
            transform: scale(1.3) rotate(90deg);
          }

        }

        /* =========================
           HERO
        ========================= */

        .hero {
          position: relative;
          z-index: 3;
          min-height: 850px;
          padding: 65px 20px 120px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .heroGlow {
          position: absolute;
          width: 500px;
          height: 300px;
          border-radius: 50%;
          background: #7c3aed;
          filter: blur(150px);
          opacity: 0.1;
          top: 200px;
          pointer-events: none;
        }

        .heroLogo {
          position: relative;
          z-index: 2;
        }

        .heroBadge {
          margin-top: 15px;
          padding: 9px 16px;
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 999px;
          background: rgba(139, 92, 246, 0.08);
          color: rgba(255, 255, 255, 0.6);
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 2px;
          backdrop-filter: blur(15px);
          display: flex;
          align-items: center;
          gap: 8px;
          animation: fadeUp 1s ease both;
        }

        .badgePulse {
          width: 6px;
          height: 6px;
          background: #22d3ee;
          border-radius: 50%;
          box-shadow: 0 0 12px #22d3ee;
        }

        .hero h1 {
          margin: 30px 0 0;
          font-size: clamp(52px, 8vw, 105px);
          line-height: 0.92;
          letter-spacing: -5px;
          font-weight: 800;
          background: linear-gradient(
            180deg,
            #ffffff 20%,
            #c4b5fd 70%,
            #7c3aed
          );
          -webkit-background-clip: text;
          color: transparent;
          animation: fadeUp 1s 0.15s ease both;
        }

        .hero h1 span {
          background: linear-gradient(
            90deg,
            #a78bfa,
            #22d3ee,
            #d946ef
          );
          -webkit-background-clip: text;
          color: transparent;
        }

        .heroDescription {
          max-width: 650px;
          margin: 28px auto 0;
          color: rgba(255, 255, 255, 0.48);
          font-size: 16px;
          line-height: 1.8;
          animation: fadeUp 1s 0.3s ease both;
        }

        @keyframes fadeUp {

          from {
            opacity: 0;
            transform: translateY(25px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }

        }

        .heroButtons {
          margin-top: 35px;
          display: flex;
          gap: 15px;
          justify-content: center;
          animation: fadeUp 1s 0.45s ease both;
        }

        .primaryButton,
        .secondaryButton {
          text-decoration: none;
          padding: 15px 22px;
          border-radius: 10px;
          font-size: 10px;
          letter-spacing: 1.8px;
          font-weight: 800;
          transition: 0.3s;
        }

        .primaryButton {
          color: white;
          background: linear-gradient(
            135deg,
            #7c3aed,
            #a855f7
          );
          box-shadow:
            0 0 20px rgba(139, 92, 246, 0.3),
            inset 0 1px rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .primaryButton:hover {
          transform: translateY(-3px);
          box-shadow:
            0 0 35px rgba(139, 92, 246, 0.6),
            0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .primaryButton b {
          font-size: 17px;
        }

        .secondaryButton {
          color: rgba(255, 255, 255, 0.65);
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(15px);
        }

        .secondaryButton:hover {
          color: white;
          border-color: rgba(139, 92, 246, 0.5);
          transform: translateY(-3px);
        }

        .scrollIndicator {
          position: absolute;
          bottom: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          color: rgba(255, 255, 255, 0.25);
          font-size: 8px;
          letter-spacing: 3px;
        }

        .scrollIndicator span {
          width: 1px;
          height: 45px;
          background: linear-gradient(
            #8b5cf6,
            transparent
          );
          animation: scrollLine 2s infinite;
        }

        @keyframes scrollLine {

          0% {
            transform: scaleY(0);
            transform-origin: top;
          }

          50% {
            transform: scaleY(1);
            transform-origin: top;
          }

          51% {
            transform-origin: bottom;
          }

          100% {
            transform: scaleY(0);
            transform-origin: bottom;
          }

        }

        /* =========================
           TOOLS
        ========================= */

        .toolsSection {
          position: relative;
          z-index: 3;
          width: min(1400px, calc(100% - 40px));
          margin: auto;
          padding: 100px 0;
        }

        .sectionHeader {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: end;
          margin-bottom: 50px;
        }

        .sectionEyebrow {
          display: flex;
          align-items: center;
          gap: 9px;
          color: #a78bfa;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 3px;
        }

        .sectionEyebrow span {
          width: 25px;
          height: 1px;
          background: #a78bfa;
          box-shadow: 0 0 10px #a78bfa;
        }

        .sectionHeader h2,
        .aiBanner h2,
        .aboutCard h2 {
          margin: 15px 0 0;
          font-size: clamp(38px, 5vw, 68px);
          line-height: 0.95;
          letter-spacing: -3px;
        }

        .sectionHeader h2 span,
        .aiBanner h2 span,
        .aboutCard h2 span {
          color: #8b5cf6;
        }

        .sectionHeader > p {
          color: rgba(255, 255, 255, 0.4);
          line-height: 1.8;
          max-width: 450px;
          justify-self: end;
        }

        .toolsGrid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }

        .toolCard {
          position: relative;
          min-height: 400px;
          padding: 25px;
          overflow: hidden;
          border-radius: 20px;
          text-decoration: none;
          color: white;
          background:
            linear-gradient(
              145deg,
              rgba(255, 255, 255, 0.075),
              rgba(255, 255, 255, 0.025)
            );
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(20px);
          transition:
            transform 0.4s,
            border-color 0.4s,
            box-shadow 0.4s;
        }

        .toolCard:hover {
          transform: translateY(-12px);
          border-color: rgba(139, 92, 246, 0.5);
          box-shadow:
            0 20px 60px rgba(0, 0, 0, 0.4),
            0 0 35px rgba(139, 92, 246, 0.12);
        }

        .cardGlow {
          position: absolute;
          width: 150px;
          height: 150px;
          top: -80px;
          right: -80px;
          border-radius: 50%;
          background: #8b5cf6;
          filter: blur(70px);
          opacity: 0;
          transition: 0.5s;
        }

        .toolCard:hover .cardGlow {
          opacity: 0.4;
        }

        .cardTop {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .toolNumber {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.25);
          font-weight: 800;
          letter-spacing: 2px;
        }

        .toolTag {
          padding: 5px 8px;
          border-radius: 5px;
          background: rgba(139, 92, 246, 0.08);
          color: #a78bfa;
          font-size: 7px;
          letter-spacing: 1px;
          font-weight: 800;
        }

        .toolIcon {
          margin-top: 55px;
          width: 65px;
          height: 65px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 17px;
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.18);
          font-size: 28px;
          transition: 0.4s;
        }

        .toolCard:hover .toolIcon {
          transform: scale(1.12) rotate(-5deg);
          box-shadow:
            0 0 25px rgba(139, 92, 246, 0.25);
        }

        .toolCard h3 {
          margin: 25px 0 10px;
          font-size: 21px;
          letter-spacing: -0.5px;
        }

        .toolCard p {
          color: rgba(255, 255, 255, 0.4);
          font-size: 13px;
          line-height: 1.7;
          margin: 0;
        }

        .cardBottom {
          position: absolute;
          left: 25px;
          right: 25px;
          bottom: 22px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: rgba(255, 255, 255, 0.35);
          font-size: 8px;
          letter-spacing: 2px;
          font-weight: 800;
        }

        .cardBottom b {
          font-size: 18px;
          color: #a78bfa;
          transition: 0.3s;
        }

        .toolCard:hover .cardBottom b {
          transform: translate(4px, -4px);
        }

        .cardCorner {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 35px;
          height: 35px;
          border-right: 1px solid rgba(139, 92, 246, 0.5);
          border-bottom: 1px solid rgba(139, 92, 246, 0.5);
          border-radius: 0 0 20px 0;
        }

        /* =========================
           AI BANNER
        ========================= */

        .aiBanner {
          position: relative;
          z-index: 3;
          width: min(1400px, calc(100% - 40px));
          margin: 50px auto 120px;
          min-height: 380px;
          padding: 60px;
          border-radius: 30px;
          overflow: hidden;
          display: flex;
          align-items: center;
          gap: 80px;
          background:
            linear-gradient(
              120deg,
              rgba(124, 58, 237, 0.13),
              rgba(6, 182, 212, 0.05)
            );
          border: 1px solid rgba(139, 92, 246, 0.18);
        }

        .aiBannerGlow {
          position: absolute;
          width: 350px;
          height: 350px;
          left: 100px;
          top: 20px;
          border-radius: 50%;
          background: #7c3aed;
          filter: blur(120px);
          opacity: 0.15;
        }

        .aiOrb {
          position: relative;
          width: 230px;
          height: 230px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .orbRing {
          position: absolute;
          border: 1px solid rgba(139, 92, 246, 0.4);
          border-radius: 50%;
        }

        .ringOne {
          inset: 10px;
          animation: orbRotate 8s linear infinite;
        }

        .ringTwo {
          inset: 35px;
          border-color: rgba(34, 211, 238, 0.5);
          animation: orbRotate 5s linear infinite reverse;
        }

        @keyframes orbRotate {
          to {
            transform: rotate(360deg);
          }
        }

        .orbCore {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 35px;
          color: white;
          background:
            radial-gradient(
              circle at 35% 30%,
              #ffffff,
              #a78bfa 25%,
              #7c3aed 55%,
              #312e81
            );
          box-shadow:
            0 0 35px #8b5cf6,
            0 0 80px rgba(139, 92, 246, 0.5);
          animation: corePulse 3s ease-in-out infinite;
        }

        @keyframes corePulse {

          0%,
          100% {
            transform: scale(1);
            box-shadow:
              0 0 35px #8b5cf6,
              0 0 80px rgba(139, 92, 246, 0.5);
          }

          50% {
            transform: scale(1.08);
            box-shadow:
              0 0 50px #8b5cf6,
              0 0 110px rgba(139, 92, 246, 0.6);
          }

        }

        .aiBannerContent {
          position: relative;
          z-index: 2;
          max-width: 600px;
        }

        .aiBannerContent p {
          color: rgba(255, 255, 255, 0.42);
          line-height: 1.8;
          max-width: 500px;
          margin-top: 25px;
        }

        .aiPulse {
          position: absolute;
          right: 50px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          gap: 5px;
          align-items: center;
        }

        .aiPulse span {
          width: 2px;
          height: 30px;
          background: #8b5cf6;
          box-shadow: 0 0 10px #8b5cf6;
          animation: equalizer 1s ease-in-out infinite;
        }

        .aiPulse span:nth-child(2) {
          animation-delay: 0.15s;
        }

        .aiPulse span:nth-child(3) {
          animation-delay: 0.3s;
        }

        .aiPulse span:nth-child(4) {
          animation-delay: 0.45s;
        }

        .aiPulse span:nth-child(5) {
          animation-delay: 0.6s;
        }

        @keyframes equalizer {

          0%,
          100% {
            transform: scaleY(0.4);
          }

          50% {
            transform: scaleY(1.8);
          }

        }

        /* =========================
           ABOUT
        ========================= */

        .aboutSection {
          position: relative;
          z-index: 3;
          width: min(1100px, calc(100% - 40px));
          margin: 0 auto 120px;
        }

        .aboutCard {
          padding: 60px;
          border-radius: 25px;
          display: grid;
          grid-template-columns: 250px 1fr;
          gap: 60px;
          align-items: center;
          background: rgba(255, 255, 255, 0.025);
          border: 1px solid rgba(255, 255, 255, 0.07);
          backdrop-filter: blur(20px);
        }

        .aboutLogo {
          transform: scale(0.9);
        }

        .aboutCard p {
          color: rgba(255, 255, 255, 0.4);
          line-height: 1.9;
          max-width: 650px;
        }

        /* =========================
           FOOTER
        ========================= */

        footer {
          position: relative;
          z-index: 3;
          width: min(1400px, calc(100% - 40px));
          margin: auto;
          padding: 30px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.07);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .footerLogo {
          transform: scale(0.5);
          transform-origin: left center;
          margin-left: -45px;
        }

        footer p {
          color: rgba(255, 255, 255, 0.25);
          font-size: 10px;
        }

        /* =========================
           RESPONSIVE
        ========================= */

        @media (max-width: 1000px) {

          .toolsGrid {
            grid-template-columns: repeat(2, 1fr);
          }

          .sectionHeader {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .sectionHeader > p {
            justify-self: start;
          }

          .aiBanner {
            gap: 40px;
          }

        }

        @media (max-width: 700px) {

          .navbar {
            width: calc(100% - 30px);
          }

          .navLinks {
            display: none;
          }

          .aiStatus {
            font-size: 8px;
          }

          .hero {
            min-height: 750px;
            padding-top: 30px;
          }

          .emmyLogo {
            width: 300px;
          }

          .compactLogo {
            width: 180px;
          }

          .logoName {
            font-size: 31px;
            letter-spacing: 4px;
          }

          .logoTagline {
            font-size: 7px;
            letter-spacing: 3px;
          }

          .hero h1 {
            font-size: 54px;
            letter-spacing: -3px;
          }

          .heroDescription {
            font-size: 14px;
          }

          .heroButtons {
            flex-direction: column;
            width: 100%;
            max-width: 300px;
          }

          .primaryButton,
          .secondaryButton {
            justify-content: center;
            text-align: center;
          }

          .toolsGrid {
            grid-template-columns: 1fr;
          }

          .toolCard {
            min-height: 350px;
          }

          .aiBanner {
            padding: 40px 25px;
            flex-direction: column;
            text-align: center;
            gap: 25px;
          }

          .aiOrb {
            width: 180px;
            height: 180px;
          }

          .aiBannerContent {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .aiPulse {
            display: none;
          }

          .aboutCard {
            grid-template-columns: 1fr;
            padding: 40px 25px;
            text-align: center;
          }

          .aboutLogo {
            margin: auto;
          }

          .aboutCard .sectionEyebrow {
            justify-content: center;
          }

          footer {
            flex-direction: column;
            gap: 15px;
            text-align: center;
          }

          .footerLogo {
            margin-left: 0;
          }

        }

        @media (prefers-reduced-motion: reduce) {

          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
          }

        }

      `}</style>

    </main>
  );
}