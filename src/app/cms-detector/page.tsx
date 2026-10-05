"use client";

import { useState } from "react";
import puter from "@heyputer/puter.js";
import Link from "next/link";

export default function CMSDetector() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const detectCMS = async () => {
    if (!url.trim()) {
      setResult("Please enter a website URL.");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const prompt = `
You are an expert website technology and CMS detector.

Analyze this website URL:

${url}

Determine the most likely CMS or website platform being used.

Possible platforms include:
- WordPress
- Shopify
- Wix
- Squarespace
- Webflow
- Joomla
- Drupal
- Ghost
- Blogger
- Magento
- Custom/Unknown

Return your answer in this exact format:

CMS: [CMS NAME]

CONFIDENCE: [High/Medium/Low]

EVIDENCE:
- [evidence 1]
- [evidence 2]
- [evidence 3]

SUMMARY:
[Short explanation]

If you cannot determine the CMS with confidence, say "Unknown/Custom" rather than making up information.
`;

      const response = await puter.ai.chat(prompt);

      let answer = "";

      if (typeof response === "string") {
        answer = response;
      } else if (
        response &&
        typeof response === "object" &&
        "message" in response
      ) {
        const message = (response as any).message;

        if (typeof message === "string") {
          answer = message;
        } else if (message?.content) {
          answer = message.content;
        }
      }

      if (!answer) {
        answer = JSON.stringify(response, null, 2);
      }

      setResult(answer);
    } catch (error: any) {
      console.error(error);

      setResult(
        `Error detecting CMS: ${
          error?.message || "Something went wrong. Please try again."
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  const clearScan = () => {
    setUrl("");
    setResult("");
  };

  return (
    <main className="page">
      {/* ANIMATED BACKGROUND */}
      <div className="background">
        <div className="backgroundGlow glowOne" />
        <div className="backgroundGlow glowTwo" />
        <div className="backgroundGlow glowThree" />

        <div className="grid" />

        <span className="particle particleOne" />
        <span className="particle particleTwo" />
        <span className="particle particleThree" />
        <span className="particle particleFour" />
        <span className="particle particleFive" />
        <span className="particle particleSix" />
        <span className="particle particleSeven" />
        <span className="particle particleEight" />
      </div>

      {/* NAVIGATION */}
      <header className="navbar">
        <div className="navInner">
          <Link href="/" className="brand">
            <div className="brandMark">
              <span className="brandMarkInner">E</span>
            </div>

            <div className="brandText">
              <div className="brandName">
                EMMY <span>AI</span>
              </div>

              <div className="brandTagline">
                INTELLIGENT WORKSPACE
              </div>
            </div>
          </Link>

          <div className="navRight">
            <div className="status">
              <span className="statusDot" />
              AI ONLINE
            </div>

            <Link href="/" className="dashboardButton">
              <span>←</span>
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <section className="content">
        {/* HERO */}
        <div className="hero">
          <div className="toolLabel">
            <span className="labelLine" />
            EMMY AI / TOOL 03
            <span className="labelLine" />
          </div>

          <h1>
            Understand Any
            <span> Website.</span>
          </h1>

          <p>
            Enter a website URL and let EMMY AI analyze its technology
            stack to identify the CMS or platform powering it.
          </p>
        </div>

        {/* SCANNER */}
        <div className="scannerCard">
          <div className="scannerTop">
            <div>
              <div className="scannerEyebrow">
                <span className="pulseDot" />
                WEBSITE INTELLIGENCE
              </div>

              <h2>Scan a Website</h2>

              <p>
                Discover what powers a website with AI-assisted
                technology detection.
              </p>
            </div>

            <div className="scannerIcon">
              <div className="scannerIconRing">
                <span>⌁</span>
              </div>
            </div>
          </div>

          <div className="inputArea">
            <label htmlFor="website-url">
              Website URL
            </label>

            <div className="inputWrapper">
              <div className="inputIcon">
                ◉
              </div>

              <input
                id="website-url"
                type="url"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  if (result) setResult("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    detectCMS();
                  }
                }}
                placeholder="https://example.com"
              />

              {url && (
                <button
                  type="button"
                  onClick={clearScan}
                  className="clearButton"
                >
                  ×
                </button>
              )}
            </div>

            <div className="inputHint">
              <span>⌁</span>
              Try https://wordpress.org
            </div>
          </div>

          <button
            onClick={detectCMS}
            disabled={loading}
            className="scanButton"
          >
            {loading ? (
              <>
                <span className="buttonSpinner" />
                ANALYZING WEBSITE...
              </>
            ) : (
              <>
                <span className="scanButtonIcon">⌕</span>
                DETECT CMS
                <span className="buttonArrow">→</span>
              </>
            )}
          </button>

          <div className="scannerFooter">
            <span>AI-POWERED ANALYSIS</span>
            <span className="footerDivider" />
            <span>FAST TECHNOLOGY DETECTION</span>
            <span className="footerDivider" />
            <span>EMMY AI</span>
          </div>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="loadingCard">
            <div className="scannerAnimation">
              <div className="scanCircle">
                <div className="scanCircleInner">
                  <span>⌁</span>
                </div>
              </div>

              <div className="scanBeam" />
            </div>

            <div className="loadingContent">
              <div className="loadingLabel">
                LIVE ANALYSIS
              </div>

              <h3>EMMY AI is scanning the website...</h3>

              <p>
                Analyzing available website information and looking
                for technology signals.
              </p>

              <div className="progressTrack">
                <div className="progressBar" />
              </div>

              <div className="analysisSteps">
                <span className="activeStep">
                  <i />
                  Inspecting URL
                </span>

                <span>
                  <i />
                  Detecting platform
                </span>

                <span>
                  <i />
                  Evaluating confidence
                </span>
              </div>
            </div>
          </div>
        )}

        {/* RESULT */}
        {result && !loading && (
          <div className="resultCard">
            <div className="resultHeader">
              <div>
                <div className="resultEyebrow">
                  <span className="resultDot" />
                  ANALYSIS COMPLETE
                </div>

                <h2>Detection Result</h2>

                <p>
                  EMMY AI has finished analyzing the submitted
                  website.
                </p>
              </div>

              <div className="resultBadge">
                ✓ SCAN COMPLETE
              </div>
            </div>

            <div className="resultBody">
              <div className="resultUrl">
                <span>SCANNED WEBSITE</span>
                <strong>{url}</strong>
              </div>

              <div className="resultOutput">
                <div className="outputTop">
                  <span>AI REPORT</span>
                  <span>EMMY AI</span>
                </div>

                <pre>
                  {result}
                </pre>
              </div>
            </div>

            <div className="resultActions">
              <button
                type="button"
                onClick={clearScan}
                className="secondaryButton"
              >
                Scan Another Website
              </button>
            </div>
          </div>
        )}

        {/* FEATURE CARDS */}
        <div className="sectionHeading">
          <span>WHAT EMMY AI CAN DO</span>
        </div>

        <div className="features">
          <div className="featureCard">
            <div className="featureNumber">01</div>

            <div className="featureIcon purple">
              ⌕
            </div>

            <h3>Detect</h3>

            <p>
              Analyze a website and identify its most likely CMS
              or website platform.
            </p>

            <div className="featureLine" />
          </div>

          <div className="featureCard">
            <div className="featureNumber">02</div>

            <div className="featureIcon cyan">
              ✦
            </div>

            <h3>AI Analysis</h3>

            <p>
              EMMY AI evaluates available signals and provides a
              confidence level with supporting evidence.
            </p>

            <div className="featureLine" />
          </div>

          <div className="featureCard">
            <div className="featureNumber">03</div>

            <div className="featureIcon pink">
              ⚡
            </div>

            <h3>Fast Results</h3>

            <p>
              Get a clear technology report without navigating
              complicated developer tools.
            </p>

            <div className="featureLine" />
          </div>
        </div>

        {/* SUPPORTED PLATFORMS */}
        <div className="platformSection">
          <div className="sectionHeading">
            <span>PLATFORM INTELLIGENCE</span>
          </div>

          <div className="platforms">
            <span>WORDPRESS</span>
            <span>SHOPIFY</span>
            <span>WIX</span>
            <span>SQUARESPACE</span>
            <span>WEBFLOW</span>
            <span>DRUPAL</span>
            <span>JOOMLA</span>
            <span>GHOST</span>
            <span>MAGENTO</span>
            <span>CUSTOM</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div>
          <span className="footerBrand">EMMY AI</span>
          <span className="footerText">
            YOUR INTELLIGENT WORKSPACE
          </span>
        </div>

        <div className="footerCopyright">
          © 2026 EMMY AI. ALL RIGHTS RESERVED.
        </div>
      </footer>

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .page {
          position: relative;
          min-height: 100vh;
          overflow-x: hidden;
          background:
            radial-gradient(
              circle at 50% -10%,
              rgba(124, 58, 237, 0.16),
              transparent 35%
            ),
            #03030a;
          color: white;
        }

        .background {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .backgroundGlow {
          position: absolute;
          border-radius: 999px;
          filter: blur(90px);
          opacity: 0.22;
        }

        .glowOne {
          top: 12%;
          left: -8%;
          width: 350px;
          height: 350px;
          background: #7c3aed;
          animation: driftOne 12s ease-in-out infinite;
        }

        .glowTwo {
          top: 45%;
          right: -10%;
          width: 400px;
          height: 400px;
          background: #06b6d4;
          animation: driftTwo 14s ease-in-out infinite;
        }

        .glowThree {
          bottom: -15%;
          left: 35%;
          width: 450px;
          height: 300px;
          background: #a855f7;
          animation: driftThree 16s ease-in-out infinite;
        }

        .grid {
          position: absolute;
          inset: 0;
          opacity: 0.22;
          background-image:
            linear-gradient(
              rgba(255, 255, 255, 0.035) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.035) 1px,
              transparent 1px
            );
          background-size: 55px 55px;
          mask-image: linear-gradient(
            to bottom,
            black,
            transparent 85%
          );
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: white;
          box-shadow:
            0 0 10px rgba(255, 255, 255, 0.8),
            0 0 20px rgba(139, 92, 246, 0.7);
          opacity: 0.5;
        }

        .particleOne {
          top: 18%;
          left: 14%;
          animation: floatParticle 8s ease-in-out infinite;
        }

        .particleTwo {
          top: 32%;
          right: 15%;
          animation: floatParticle 10s ease-in-out infinite 1s;
        }

        .particleThree {
          top: 62%;
          left: 8%;
          animation: floatParticle 9s ease-in-out infinite 2s;
        }

        .particleFour {
          top: 72%;
          right: 10%;
          animation: floatParticle 11s ease-in-out infinite 3s;
        }

        .particleFive {
          top: 45%;
          left: 25%;
          animation: floatParticle 12s ease-in-out infinite 1.5s;
        }

        .particleSix {
          top: 15%;
          right: 30%;
          animation: floatParticle 9s ease-in-out infinite 2.5s;
        }

        .particleSeven {
          bottom: 15%;
          left: 45%;
          animation: floatParticle 10s ease-in-out infinite 3.5s;
        }

        .particleEight {
          bottom: 28%;
          right: 35%;
          animation: floatParticle 8s ease-in-out infinite 4s;
        }

        .navbar {
          position: relative;
          z-index: 10;
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
          background: rgba(3, 3, 10, 0.72);
          backdrop-filter: blur(18px);
        }

        .navInner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 18px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          color: white;
          text-decoration: none;
        }

        .brandMark {
          position: relative;
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 13px;
          background:
            linear-gradient(
              135deg,
              rgba(168, 85, 247, 0.9),
              rgba(37, 99, 235, 0.9)
            );
          box-shadow:
            0 0 25px rgba(139, 92, 246, 0.35),
            inset 0 0 15px rgba(255, 255, 255, 0.12);
          animation: logoPulse 4s ease-in-out infinite;
        }

        .brandMark::before {
          content: "";
          position: absolute;
          inset: 2px;
          border-radius: 11px;
          background: #080810;
        }

        .brandMarkInner {
          position: relative;
          z-index: 2;
          font-size: 20px;
          font-weight: 900;
          font-style: italic;
          background: linear-gradient(
            135deg,
            #ffffff,
            #c4b5fd,
            #67e8f9
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .brandText {
          line-height: 1;
        }

        .brandName {
          font-size: 17px;
          font-weight: 800;
          letter-spacing: 0.04em;
        }

        .brandName span {
          color: #a78bfa;
        }

        .brandTagline {
          margin-top: 5px;
          font-size: 7px;
          letter-spacing: 0.22em;
          color: #64748b;
        }

        .navRight {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .status {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #94a3b8;
        }

        .statusDot,
        .pulseDot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 12px rgba(34, 197, 94, 0.8);
          animation: statusPulse 2s ease-in-out infinite;
        }

        .dashboardButton {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 14px;
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.035);
          color: #cbd5e1;
          font-size: 12px;
          text-decoration: none;
          transition: 0.25s ease;
        }

        .dashboardButton:hover {
          color: white;
          border-color: rgba(168, 85, 247, 0.4);
          background: rgba(139, 92, 246, 0.08);
          transform: translateY(-1px);
        }

        .content {
          position: relative;
          z-index: 2;
          max-width: 1000px;
          margin: 0 auto;
          padding: 75px 24px 90px;
        }

        .hero {
          text-align: center;
          max-width: 760px;
          margin: 0 auto 50px;
          animation: fadeUp 0.8s ease both;
        }

        .toolLabel {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 20px;
          color: #a78bfa;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.3em;
        }

        .labelLine {
          width: 32px;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(167, 139, 250, 0.7)
          );
        }

        .labelLine:last-child {
          transform: rotate(180deg);
        }

        .hero h1 {
          margin: 0;
          font-size: clamp(42px, 7vw, 72px);
          line-height: 0.98;
          letter-spacing: -0.055em;
          font-weight: 850;
        }

        .hero h1 span {
          display: block;
          background: linear-gradient(
            100deg,
            #c4b5fd,
            #a78bfa 35%,
            #67e8f9 85%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 200% auto;
          animation: gradientMove 5s linear infinite;
        }

        .hero p {
          max-width: 650px;
          margin: 24px auto 0;
          color: #94a3b8;
          font-size: 15px;
          line-height: 1.8;
        }

        .scannerCard {
          position: relative;
          padding: 30px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 24px;
          background:
            linear-gradient(
              145deg,
              rgba(255, 255, 255, 0.055),
              rgba(255, 255, 255, 0.018)
            );
          box-shadow:
            0 30px 90px rgba(0, 0, 0, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(22px);
          animation: fadeUp 0.9s ease 0.1s both;
        }

        .scannerCard::before {
          content: "";
          position: absolute;
          top: 0;
          left: 8%;
          right: 8%;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(168, 85, 247, 0.8),
            rgba(34, 211, 238, 0.7),
            transparent
          );
          box-shadow: 0 0 25px rgba(139, 92, 246, 0.4);
        }

        .scannerTop {
          display: flex;
          justify-content: space-between;
          gap: 30px;
          align-items: flex-start;
        }

        .scannerEyebrow {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #a78bfa;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.22em;
        }

        .scannerTop h2 {
          margin: 12px 0 7px;
          font-size: 25px;
          letter-spacing: -0.03em;
        }

        .scannerTop p {
          margin: 0;
          max-width: 550px;
          color: #64748b;
          font-size: 13px;
          line-height: 1.7;
        }

        .scannerIcon {
          flex-shrink: 0;
        }

        .scannerIconRing {
          width: 66px;
          height: 66px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(139, 92, 246, 0.35);
          border-radius: 20px;
          background:
            radial-gradient(
              circle,
              rgba(139, 92, 246, 0.2),
              rgba(139, 92, 246, 0.03)
            );
          box-shadow:
            0 0 35px rgba(139, 92, 246, 0.15),
            inset 0 0 20px rgba(255, 255, 255, 0.03);
          animation: iconFloat 4s ease-in-out infinite;
        }

        .scannerIconRing span {
          font-size: 29px;
          color: #c4b5fd;
          transform: rotate(-25deg);
        }

        .inputArea {
          margin-top: 30px;
        }

        .inputArea label {
          display: block;
          margin-bottom: 9px;
          color: #cbd5e1;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .inputWrapper {
          display: flex;
          align-items: center;
          min-height: 62px;
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 15px;
          background: rgba(0, 0, 0, 0.32);
          transition: 0.25s ease;
        }

        .inputWrapper:focus-within {
          border-color: rgba(139, 92, 246, 0.7);
          box-shadow:
            0 0 0 4px rgba(139, 92, 246, 0.07),
            0 0 30px rgba(139, 92, 246, 0.08);
        }

        .inputIcon {
          width: 55px;
          text-align: center;
          color: #8b5cf6;
          font-size: 17px;
        }

        .inputWrapper input {
          flex: 1;
          min-width: 0;
          border: none;
          outline: none;
          background: transparent;
          color: white;
          font-size: 14px;
          padding: 18px 5px;
        }

        .inputWrapper input::placeholder {
          color: #475569;
        }

        .clearButton {
          margin-right: 10px;
          width: 32px;
          height: 32px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.04);
          color: #64748b;
          cursor: pointer;
          transition: 0.2s ease;
        }

        .clearButton:hover {
          color: white;
          background: rgba(255, 255, 255, 0.08);
        }

        .inputHint {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-top: 9px;
          color: #475569;
          font-size: 11px;
        }

        .inputHint span {
          color: #8b5cf6;
        }

        .scanButton {
          position: relative;
          width: 100%;
          min-height: 58px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 22px;
          overflow: hidden;
          border: 0;
          border-radius: 14px;
          background: linear-gradient(
            100deg,
            #7c3aed,
            #8b5cf6,
            #06b6d4
          );
          color: white;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.12em;
          cursor: pointer;
          box-shadow:
            0 10px 35px rgba(124, 58, 237, 0.25),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          transition: 0.25s ease;
        }

        .scanButton::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 70%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.18),
            transparent
          );
          transform: skewX(-20deg);
          animation: buttonSweep 4s ease-in-out infinite;
        }

        .scanButton:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow:
            0 15px 45px rgba(124, 58, 237, 0.38),
            0 0 25px rgba(34, 211, 238, 0.12);
        }

        .scanButton:disabled {
          cursor: not-allowed;
          opacity: 0.7;
        }

        .scanButtonIcon {
          font-size: 19px;
        }

        .buttonArrow {
          position: absolute;
          right: 22px;
          font-size: 18px;
          transition: 0.25s ease;
        }

        .scanButton:hover .buttonArrow {
          transform: translateX(4px);
        }

        .buttonSpinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.35);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        .scannerFooter {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 20px;
          color: #475569;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.16em;
        }

        .footerDivider {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #475569;
        }

        .loadingCard {
          display: flex;
          align-items: center;
          gap: 35px;
          margin-top: 22px;
          padding: 30px;
          border: 1px solid rgba(139, 92, 246, 0.22);
          border-radius: 22px;
          background:
            linear-gradient(
              145deg,
              rgba(139, 92, 246, 0.09),
              rgba(255, 255, 255, 0.02)
            );
          box-shadow:
            0 25px 70px rgba(0, 0, 0, 0.25),
            inset 0 0 40px rgba(139, 92, 246, 0.04);
          animation: fadeUp 0.4s ease both;
        }

        .scannerAnimation {
          position: relative;
          flex-shrink: 0;
          width: 130px;
          height: 130px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .scanCircle {
          width: 92px;
          height: 92px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(139, 92, 246, 0.45);
          border-radius: 50%;
          box-shadow:
            0 0 25px rgba(139, 92, 246, 0.18),
            inset 0 0 25px rgba(139, 92, 246, 0.1);
          animation: scanRotate 3s linear infinite;
        }

        .scanCircle::before,
        .scanCircle::after {
          content: "";
          position: absolute;
          border: 1px solid rgba(34, 211, 238, 0.18);
          border-radius: 50%;
        }

        .scanCircle::before {
          width: 115px;
          height: 115px;
        }

        .scanCircle::after {
          width: 130px;
          height: 130px;
        }

        .scanCircleInner {
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          background: linear-gradient(
            135deg,
            #7c3aed,
            #06b6d4
          );
          box-shadow:
            0 0 30px rgba(139, 92, 246, 0.45);
        }

        .scanCircleInner span {
          font-size: 22px;
          transform: rotate(-20deg);
        }

        .scanBeam {
          position: absolute;
          width: 130px;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent,
            #67e8f9,
            transparent
          );
          box-shadow: 0 0 12px #22d3ee;
          animation: scanBeam 2s ease-in-out infinite;
        }

        .loadingContent {
          flex: 1;
        }

        .loadingLabel {
          color: #a78bfa;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.22em;
        }

        .loadingContent h3 {
          margin: 9px 0 7px;
          font-size: 21px;
        }

        .loadingContent p {
          margin: 0;
          color: #64748b;
          font-size: 13px;
          line-height: 1.7;
        }

        .progressTrack {
          width: 100%;
          height: 3px;
          margin-top: 22px;
          overflow: hidden;
          border-radius: 99px;
          background: rgba(255, 255, 255, 0.06);
        }

        .progressBar {
          width: 45%;
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(
            90deg,
            #8b5cf6,
            #22d3ee
          );
          box-shadow: 0 0 12px rgba(34, 211, 238, 0.5);
          animation: progressMove 2.2s ease-in-out infinite;
        }

        .analysisSteps {
          display: flex;
          flex-wrap: wrap;
          gap: 18px;
          margin-top: 16px;
          color: #475569;
          font-size: 10px;
        }

        .analysisSteps span {
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .analysisSteps i {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #334155;
        }

        .analysisSteps .activeStep {
          color: #a78bfa;
        }

        .analysisSteps .activeStep i {
          background: #a78bfa;
          box-shadow: 0 0 8px rgba(167, 139, 250, 0.8);
        }

        .resultCard {
          margin-top: 22px;
          overflow: hidden;
          border: 1px solid rgba(34, 211, 238, 0.14);
          border-radius: 22px;
          background:
            linear-gradient(
              145deg,
              rgba(255, 255, 255, 0.045),
              rgba(255, 255, 255, 0.015)
            );
          box-shadow:
            0 25px 70px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
          animation: resultReveal 0.65s ease both;
        }

        .resultHeader {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 25px;
          padding: 26px 28px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
        }

        .resultEyebrow {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #67e8f9;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.2em;
        }

        .resultDot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #22d3ee;
          box-shadow: 0 0 10px rgba(34, 211, 238, 0.8);
        }

        .resultHeader h2 {
          margin: 10px 0 5px;
          font-size: 23px;
        }

        .resultHeader p {
          margin: 0;
          color: #64748b;
          font-size: 12px;
        }

        .resultBadge {
          padding: 8px 11px;
          border: 1px solid rgba(34, 197, 94, 0.2);
          border-radius: 8px;
          background: rgba(34, 197, 94, 0.06);
          color: #86efac;
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 0.1em;
          white-space: nowrap;
        }

        .resultBody {
          padding: 25px 28px;
        }

        .resultUrl {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 20px;
          padding: 14px 16px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 12px;
          background: rgba(0, 0, 0, 0.2);
        }

        .resultUrl span {
          color: #475569;
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 0.16em;
        }

        .resultUrl strong {
          overflow: hidden;
          color: #cbd5e1;
          font-size: 12px;
          font-weight: 500;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .resultOutput {
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 14px;
          background: rgba(0, 0, 0, 0.28);
        }

        .outputTop {
          display: flex;
          justify-content: space-between;
          padding: 12px 15px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          color: #64748b;
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 0.15em;
        }

        .outputTop span:last-child {
          color: #8b5cf6;
        }

        .resultOutput pre {
          margin: 0;
          padding: 22px;
          overflow-x: auto;
          white-space: pre-wrap;
          word-break: break-word;
          color: #cbd5e1;
          font-family: inherit;
          font-size: 13px;
          line-height: 1.85;
        }

        .resultActions {
          display: flex;
          justify-content: flex-end;
          padding: 0 28px 26px;
        }

        .secondaryButton {
          padding: 10px 15px;
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 9px;
          background: rgba(255, 255, 255, 0.035);
          color: #94a3b8;
          font-size: 11px;
          cursor: pointer;
          transition: 0.2s ease;
        }

        .secondaryButton:hover {
          color: white;
          border-color: rgba(139, 92, 246, 0.4);
          background: rgba(139, 92, 246, 0.08);
        }

        .sectionHeading {
          display: flex;
          align-items: center;
          gap: 15px;
          margin: 60px 0 18px;
          color: #475569;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.24em;
        }

        .sectionHeading::after {
          content: "";
          flex: 1;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.08),
            transparent
          );
        }

        .features {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }

        .featureCard {
          position: relative;
          overflow: hidden;
          min-height: 235px;
          padding: 22px;
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.025);
          transition: 0.3s ease;
        }

        .featureCard:hover {
          transform: translateY(-4px);
          border-color: rgba(139, 92, 246, 0.25);
          background: rgba(139, 92, 246, 0.04);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
        }

        .featureNumber {
          position: absolute;
          top: 17px;
          right: 18px;
          color: #334155;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.1em;
        }

        .featureIcon {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 23px;
          border-radius: 13px;
          font-size: 20px;
          background: rgba(255, 255, 255, 0.04);
        }

        .featureIcon.purple {
          color: #c4b5fd;
          box-shadow: inset 0 0 20px rgba(139, 92, 246, 0.1);
        }

        .featureIcon.cyan {
          color: #67e8f9;
          box-shadow: inset 0 0 20px rgba(34, 211, 238, 0.08);
        }

        .featureIcon.pink {
          color: #f0abfc;
          box-shadow: inset 0 0 20px rgba(217, 70, 239, 0.08);
        }

        .featureCard h3 {
          margin: 0;
          font-size: 17px;
        }

        .featureCard p {
          margin: 10px 0 0;
          color: #64748b;
          font-size: 12px;
          line-height: 1.75;
        }

        .featureLine {
          position: absolute;
          right: 22px;
          bottom: 20px;
          left: 22px;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(139, 92, 246, 0.4),
            transparent
          );
        }

        .platformSection {
          margin-top: 15px;
        }

        .platforms {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
        }

        .platforms span {
          padding: 9px 12px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.02);
          color: #64748b;
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 0.13em;
          transition: 0.2s ease;
        }

        .platforms span:hover {
          color: #c4b5fd;
          border-color: rgba(139, 92, 246, 0.25);
          background: rgba(139, 92, 246, 0.05);
        }

        .footer {
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: space-between;
          gap: 20px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 28px 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          color: #475569;
          font-size: 9px;
          letter-spacing: 0.13em;
        }

        .footerBrand {
          color: #94a3b8;
          font-weight: 800;
        }

        .footerText {
          margin-left: 12px;
        }

        .footerCopyright {
          text-align: right;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(22px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes resultReveal {
          from {
            opacity: 0;
            transform: translateY(15px) scale(0.99);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }

          100% {
            background-position: 200% 50%;
          }
        }

        @keyframes logoPulse {
          0%,
          100% {
            box-shadow:
              0 0 25px rgba(139, 92, 246, 0.3),
              inset 0 0 15px rgba(255, 255, 255, 0.12);
          }

          50% {
            box-shadow:
              0 0 38px rgba(139, 92, 246, 0.55),
              0 0 55px rgba(34, 211, 238, 0.1),
              inset 0 0 15px rgba(255, 255, 255, 0.12);
          }
        }

        @keyframes statusPulse {
          0%,
          100% {
            opacity: 0.6;
            transform: scale(0.9);
          }

          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes iconFloat {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }

          50% {
            transform: translateY(-5px) rotate(3deg);
          }
        }

        @keyframes buttonSweep {
          0%,
          55% {
            left: -100%;
          }

          80%,
          100% {
            left: 150%;
          }
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes scanRotate {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes scanBeam {
          0%,
          100% {
            transform: rotate(0deg);
            opacity: 0.3;
          }

          50% {
            transform: rotate(180deg);
            opacity: 1;
          }
        }

        @keyframes progressMove {
          0% {
            transform: translateX(-120%);
          }

          100% {
            transform: translateX(230%);
          }
        }

        @keyframes floatParticle {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
            opacity: 0.25;
          }

          50% {
            transform: translate3d(10px, -22px, 0);
            opacity: 0.8;
          }
        }

        @keyframes driftOne {
          0%,
          100% {
            transform: translate(0, 0);
          }

          50% {
            transform: translate(70px, 35px);
          }
        }

        @keyframes driftTwo {
          0%,
          100% {
            transform: translate(0, 0);
          }

          50% {
            transform: translate(-60px, -40px);
          }
        }

        @keyframes driftThree {
          0%,
          100% {
            transform: translate(0, 0);
          }

          50% {
            transform: translate(50px, -30px);
          }
        }

        @media (max-width: 700px) {
          .navInner {
            padding: 15px 17px;
          }

          .brandTagline,
          .status {
            display: none;
          }

          .dashboardButton {
            padding: 8px 11px;
          }

          .content {
            padding: 55px 16px 70px;
          }

          .hero {
            margin-bottom: 35px;
          }

          .hero h1 {
            font-size: 43px;
          }

          .hero p {
            font-size: 13px;
          }

          .scannerCard {
            padding: 21px;
            border-radius: 19px;
          }

          .scannerTop {
            gap: 15px;
          }

          .scannerIcon {
            display: none;
          }

          .scannerTop h2 {
            font-size: 21px;
          }

          .inputWrapper {
            min-height: 57px;
          }

          .scanButton {
            min-height: 54px;
          }

          .scannerFooter {
            display: none;
          }

          .loadingCard {
            flex-direction: column;
            text-align: center;
            gap: 20px;
            padding: 25px 18px;
          }

          .loadingContent {
            width: 100%;
          }

          .analysisSteps {
            justify-content: center;
          }

          .resultHeader {
            flex-direction: column;
            padding: 21px;
          }

          .resultBody {
            padding: 20px;
          }

          .resultActions {
            padding: 0 20px 20px;
          }

          .features {
            grid-template-columns: 1fr;
          }

          .featureCard {
            min-height: 200px;
          }

          .footer {
            flex-direction: column;
            padding: 24px 17px;
          }

          .footerCopyright {
            text-align: left;
          }
        }
      `}</style>
    </main>
  );
}