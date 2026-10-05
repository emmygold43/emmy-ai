"use client";

import { useState } from "react";
import puter from "@heyputer/puter.js";
import Link from "next/link";

export default function ResumeAnalyzer() {
  const [fileName, setFileName] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    setFileName(file.name);
    setAnalysis("");

    if (file.type === "text/plain") {
      const text = await file.text();
      setResumeText(text);
    } else {
      setResumeText("");
    }
  }

  async function analyzeResume() {
    if (!resumeText) return;

    setLoading(true);
    setAnalysis("");

    try {
      const prompt = `
You are an expert professional resume reviewer.

Analyze the following resume.

Give the response in this exact structure:

OVERALL SCORE: [number]/100

SUMMARY:
[short summary]

STRENGTHS:
- [strength 1]
- [strength 2]
- [strength 3]

WEAKNESSES:
- [weakness 1]
- [weakness 2]
- [weakness 3]

IMPROVEMENTS:
- [improvement 1]
- [improvement 2]
- [improvement 3]

ATS TIPS:
- [tip 1]
- [tip 2]
- [tip 3]

RESUME:
${resumeText}
`;

      const response = await puter.ai.chat(prompt);

      const data =
        typeof response === "string" ? JSON.parse(response) : response;

      setAnalysis(
        data.message?.content ??
          "The AI returned a response, but no text was found."
      );
    } catch (error) {
      console.error(error);

      setAnalysis(
        "Sorry, something went wrong while analyzing the resume. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function removeResume() {
    setFileName("");
    setResumeText("");
    setAnalysis("");
  }

  return (
    <main className="page">

      {/* =====================================================
          ANIMATED BACKGROUND
      ====================================================== */}

      <div className="background">

        <div className="glow glowOne" />
        <div className="glow glowTwo" />
        <div className="glow glowThree" />

        <div className="grid" />

        {Array.from({ length: 35 }).map((_, index) => (
          <span
            key={index}
            className="particle"
            style={
              {
                left: `${(index * 31) % 100}%`,
                top: `${(index * 53) % 100}%`,
                animationDelay: `${(index % 9) * 0.7}s`,
                animationDuration: `${5 + (index % 6)}s`,
              } as React.CSSProperties
            }
          />
        ))}

      </div>

      {/* =====================================================
          NAVIGATION
      ====================================================== */}

      <nav className="navbar">

        <Link href="/" className="brand">

          <div className="brandLogo">

            <div className="brandOrbital" />

            <span>E</span>

          </div>

          <div className="brandText">

            <strong>
              EMMY<span>AI</span>
            </strong>

            <small>
              YOUR INTELLIGENT WORKSPACE
            </small>

          </div>

        </Link>

        <div className="navRight">

          <div className="onlineStatus">
            <span />
            AI ONLINE
          </div>

          <Link href="/" className="backButton">
            ← DASHBOARD
          </Link>

        </div>

      </nav>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <section className="container">

        {/* HERO */}

        <div className="hero">

          <div className="eyebrow">
            <span />
            EMMY AI / TOOL 01
          </div>

          <h1>
            Your Resume.
            <br />
            <span>Decoded.</span>
          </h1>

          <p>
            Upload your resume and let EMMY AI analyze your
            professional profile, identify weaknesses, improve
            your ATS compatibility, and reveal opportunities.
          </p>

        </div>

        {/* ===================================================
            UPLOAD CARD
        ==================================================== */}

        {!fileName && (

          <section className="uploadCard">

            <div className="uploadGlow" />

            <div className="documentIcon">

              <div className="documentPaper">

                <div className="paperLine lineOne" />
                <div className="paperLine lineTwo" />
                <div className="paperLine lineThree" />
                <div className="paperLine lineFour" />

                <div className="paperScan" />

              </div>

            </div>

            <div className="uploadTitle">
              Upload your resume
            </div>

            <p className="uploadDescription">
              Give EMMY AI your resume and receive an
              intelligent professional assessment.
            </p>

            <label
              htmlFor="resume-upload"
              className="uploadButton"
            >
              <span>＋</span>
              CHOOSE RESUME

              <input
                id="resume-upload"
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileChange}
                className="hiddenInput"
              />

            </label>

            <div className="supported">
              PDF · DOC · DOCX · TXT
            </div>

            <div className="uploadDecoration">
              <span />
              <i>✦</i>
              <span />
            </div>

          </section>

        )}

        {/* ===================================================
            RESUME SELECTED
        ==================================================== */}

        {fileName && (

          <section className="resumeCard">

            <div className="sectionHeader">

              <div>

                <div className="sectionNumber">
                  01
                </div>

                <h2>
                  Resume Loaded
                </h2>

                <p>
                  Your document is ready for AI analysis.
                </p>

              </div>

              <button
                type="button"
                onClick={removeResume}
                className="secondaryButton"
              >
                REMOVE
              </button>

            </div>

            {/* FILE PREVIEW */}

            <div className="filePreview">

              <div className="largeDocumentIcon">

                <div className="largePaper">

                  <div />
                  <div />
                  <div />
                  <div />
                  <div />

                </div>

              </div>

              <div className="fileDetails">

                <span>
                  SELECTED RESUME
                </span>

                <strong>
                  {fileName}
                </strong>

                <small>
                  Document ready for EMMY AI
                </small>

              </div>

              <div className="readyBadge">
                <span />
                READY
              </div>

            </div>

            {/* TEXT */}

            {resumeText ? (

              <div className="resumeTextSection">

                <div className="textHeader">

                  <span>
                    EXTRACTED RESUME CONTENT
                  </span>

                  <span className="characterCount">
                    {resumeText.length.toLocaleString()} CHARACTERS
                  </span>

                </div>

                <div className="resumeText">

                  <pre>
                    {resumeText}
                  </pre>

                </div>

              </div>

            ) : (

              <div className="unsupportedMessage">

                <div className="warningIcon">
                  !
                </div>

                <div>

                  <strong>
                    TEXT EXTRACTION REQUIRED
                  </strong>

                  <p>
                    The current version can directly analyze TXT
                    resumes. PDF, DOC and DOCX support can be added
                    to the document-processing pipeline.
                  </p>

                </div>

              </div>

            )}

            <button
              type="button"
              onClick={analyzeResume}
              disabled={!resumeText || loading}
              className="analyzeButton"
            >

              {loading ? (

                <>
                  <span className="spinner" />

                  EMMY AI IS ANALYZING

                  <span className="dots">
                    ...
                  </span>
                </>

              ) : (

                <>
                  ✦ ANALYZE RESUME WITH AI

                  <span className="arrow">
                    →
                  </span>
                </>

              )}

            </button>

          </section>

        )}

        {/* ===================================================
            AI PROCESSING
        ==================================================== */}

        {loading && (

          <div className="processingCard">

            <div className="processingOrb">

              <div className="processingCore">
                ✦
              </div>

            </div>

            <div className="processingText">

              <strong>
                EMMY AI IS READING YOUR RESUME
              </strong>

              <p>
                Evaluating skills, experience, structure,
                keywords and ATS compatibility...
              </p>

            </div>

            <div className="processingLine">
              <span />
            </div>

          </div>

        )}

        {/* ===================================================
            AI RESULTS
        ==================================================== */}

        {analysis && !loading && (

          <section className="resultCard">

            <div className="sectionHeader">

              <div>

                <div className="sectionNumber">
                  02
                </div>

                <h2>
                  AI Assessment
                </h2>

                <p>
                  Your resume has been analyzed by EMMY AI.
                </p>

              </div>

              <div className="analyzedBadge">
                <span />
                ANALYZED
              </div>

            </div>

            <div className="analysisArea">

              <div className="analysisGlow" />

              <div className="analysisContent">
                {analysis}
              </div>

            </div>

            <div className="resultFooter">

              <div className="resultStat">

                <span>
                  AI ENGINE
                </span>

                <strong>
                  EMMY INTELLIGENCE
                </strong>

              </div>

              <div className="resultStat">

                <span>
                  ANALYSIS
                </span>

                <strong>
                  COMPLETE
                </strong>

              </div>

              <div className="resultStat">

                <span>
                  ATS REVIEW
                </span>

                <strong>
                  INCLUDED
                </strong>

              </div>

            </div>

          </section>

        )}

        {/* ===================================================
            HOW IT WORKS
        ==================================================== */}

        <section className="howSection">

          <div className="howHeading">

            <div className="eyebrow">
              <span />
              CAREER INTELLIGENCE
            </div>

            <h2>
              Understand.
              <br />
              <span>Improve.</span>
            </h2>

          </div>

          <div className="steps">

            <div className="stepCard">

              <div className="stepNumber">
                01
              </div>

              <div className="stepIcon">
                📄
              </div>

              <h3>
                Upload
              </h3>

              <p>
                Give EMMY AI your resume and
                let the analysis begin.
              </p>

            </div>

            <div className="stepLine" />

            <div className="stepCard">

              <div className="stepNumber">
                02
              </div>

              <div className="stepIcon">
                🧠
              </div>

              <h3>
                AI Analysis
              </h3>

              <p>
                EMMY evaluates your skills,
                structure and professional impact.
              </p>

            </div>

            <div className="stepLine" />

            <div className="stepCard">

              <div className="stepNumber">
                03
              </div>

              <div className="stepIcon">
                ✦
              </div>

              <h3>
                Improve
              </h3>

              <p>
                Receive actionable feedback and
                ATS optimization tips.
              </p>

            </div>

          </div>

        </section>

      </section>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer>

        <span>
          © 2026 EMMY AI
        </span>

        <span>
          YOUR INTELLIGENT WORKSPACE
        </span>

        <span className="systemStatus">
          <i />
          SYSTEM OPERATIONAL
        </span>

      </footer>

      {/* =====================================================
          CSS
      ====================================================== */}

      <style jsx>{`

        * {
          box-sizing: border-box;
        }

        .page {
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
          color: white;
          background:
            radial-gradient(
              circle at 50% 0%,
              rgba(124, 58, 237, 0.16),
              transparent 35%
            ),
            #03030a;
          font-family:
            Inter,
            ui-sans-serif,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        }

        /* =========================================
           BACKGROUND
        ========================================= */

        .background {
          position: fixed;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .glow {
          position: absolute;
          width: 650px;
          height: 650px;
          border-radius: 50%;
          filter: blur(130px);
          opacity: 0.13;
          animation: floatingGlow 14s ease-in-out infinite;
        }

        .glowOne {
          left: -300px;
          top: -200px;
          background: #7c3aed;
        }

        .glowTwo {
          right: -300px;
          top: 20%;
          background: #06b6d4;
          animation-delay: -5s;
        }

        .glowThree {
          left: 30%;
          bottom: -400px;
          background: #d946ef;
          animation-delay: -9s;
        }

        @keyframes floatingGlow {

          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }

          50% {
            transform: translate(60px, -40px) scale(1.1);
          }

        }

        .grid {
          position: absolute;
          inset: 0;
          opacity: 0.13;
          background-image:
            linear-gradient(
              rgba(139, 92, 246, 0.16) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(139, 92, 246, 0.16) 1px,
              transparent 1px
            );
          background-size: 70px 70px;
        }

        .particle {
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #a78bfa;
          box-shadow:
            0 0 12px #8b5cf6;
          opacity: 0;
          animation:
            particleFloat 7s ease-in-out infinite;
        }

        @keyframes particleFloat {

          0% {
            transform: translateY(40px);
            opacity: 0;
          }

          25% {
            opacity: 0.8;
          }

          75% {
            opacity: 0.4;
          }

          100% {
            transform: translateY(-150px);
            opacity: 0;
          }

        }

        /* =========================================
           NAVIGATION
        ========================================= */

        .navbar {
          position: relative;
          z-index: 10;
          width: min(1400px, calc(100% - 40px));
          margin: auto;
          padding: 20px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          color: white;
          text-decoration: none;
        }

        .brandLogo {
          width: 45px;
          height: 45px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background:
            linear-gradient(
              135deg,
              #a855f7,
              #7c3aed,
              #22d3ee
            );
          box-shadow:
            0 0 30px rgba(139,92,246,0.45);
          animation: logoPulse 4s ease-in-out infinite;
        }

        .brandLogo span {
          font-size: 25px;
          font-weight: 900;
          font-style: italic;
        }

        .brandOrbital {
          position: absolute;
          width: 58px;
          height: 20px;
          border: 1px solid rgba(34,211,238,0.8);
          border-radius: 50%;
          transform: rotate(-20deg);
          animation: orbitSpin 5s linear infinite;
        }

        @keyframes orbitSpin {

          from {
            transform: rotate(-20deg);
          }

          to {
            transform: rotate(340deg);
          }

        }

        @keyframes logoPulse {

          0%,
          100% {
            box-shadow:
              0 0 25px rgba(139,92,246,0.4);
          }

          50% {
            box-shadow:
              0 0 45px rgba(139,92,246,0.75);
          }

        }

        .brandText strong {
          display: block;
          font-size: 18px;
          letter-spacing: 3px;
        }

        .brandText strong span {
          color: #a78bfa;
        }

        .brandText small {
          display: block;
          margin-top: 3px;
          color: rgba(255,255,255,0.35);
          font-size: 7px;
          letter-spacing: 2px;
        }

        .navRight {
          display: flex;
          align-items: center;
          gap: 25px;
        }

        .onlineStatus {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255,255,255,0.45);
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 2px;
        }

        .onlineStatus span,
        .systemStatus i {
          width: 6px;
          height: 6px;
          display: inline-block;
          border-radius: 50%;
          background: #22c55e;
          box-shadow:
            0 0 12px #22c55e;
        }

        .backButton {
          padding: 10px 15px;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 1px;
          transition: 0.3s;
        }

        .backButton:hover {
          color: white;
          border-color: #8b5cf6;
          box-shadow:
            0 0 20px rgba(139,92,246,0.15);
          transform: translateY(-2px);
        }

        /* =========================================
           MAIN
        ========================================= */

        .container {
          position: relative;
          z-index: 2;
          width: min(1200px, calc(100% - 40px));
          margin: auto;
          padding: 90px 0;
        }

        .hero {
          max-width: 850px;
          margin-bottom: 55px;
        }

        .eyebrow {
          display: flex;
          align-items: center;
          gap: 9px;
          color: #a78bfa;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 3px;
        }

        .eyebrow span {
          width: 28px;
          height: 1px;
          background: #a78bfa;
          box-shadow:
            0 0 10px #a78bfa;
        }

        .hero h1 {
          margin: 20px 0;
          font-size: clamp(55px, 9vw, 105px);
          line-height: 0.88;
          letter-spacing: -6px;
          animation: heroAppear 1s ease both;
        }

        .hero h1 span {
          background:
            linear-gradient(
              90deg,
              #a78bfa,
              #22d3ee,
              #d946ef
            );
          -webkit-background-clip: text;
          color: transparent;
        }

        @keyframes heroAppear {

          from {
            opacity: 0;
            transform: translateY(30px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }

        }

        .hero p {
          max-width: 650px;
          color: rgba(255,255,255,0.45);
          font-size: 15px;
          line-height: 1.8;
        }

        /* =========================================
           UPLOAD CARD
        ========================================= */

        .uploadCard {
          position: relative;
          overflow: hidden;
          padding: 90px 30px;
          text-align: center;
          border-radius: 24px;
          border: 1px solid rgba(139,92,246,0.2);
          background:
            linear-gradient(
              145deg,
              rgba(139,92,246,0.09),
              rgba(255,255,255,0.025)
            );
          box-shadow:
            0 30px 100px rgba(0,0,0,0.3);
          animation: cardAppear 0.8s ease both;
        }

        @keyframes cardAppear {

          from {
            opacity: 0;
            transform: translateY(25px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }

        }

        .uploadGlow {
          position: absolute;
          width: 300px;
          height: 300px;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          background: #7c3aed;
          opacity: 0.07;
          filter: blur(90px);
          pointer-events: none;
        }

        /* =========================================
           DOCUMENT ICON
        ========================================= */

        .documentIcon {
          position: relative;
          width: 85px;
          height: 85px;
          margin: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 22px;
          background:
            linear-gradient(
              135deg,
              rgba(168,85,247,0.25),
              rgba(34,211,238,0.1)
            );
          border: 1px solid rgba(168,85,247,0.3);
          box-shadow:
            0 0 45px rgba(139,92,246,0.2);
          animation: iconFloat 4s ease-in-out infinite;
        }

        .documentPaper {
          position: relative;
          width: 38px;
          height: 48px;
          border-radius: 4px;
          background:
            linear-gradient(
              135deg,
              #ffffff,
              #d8d5ff
            );
          box-shadow:
            0 0 20px rgba(167,139,250,0.4);
          overflow: hidden;
        }

        .documentPaper::after {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          border-style: solid;
          border-width: 0 13px 13px 0;
          border-color:
            transparent
            #7c3aed
            transparent
            transparent;
        }

        .paperLine {
          position: absolute;
          left: 7px;
          right: 7px;
          height: 2px;
          border-radius: 2px;
          background: #8b5cf6;
          opacity: 0.5;
        }

        .lineOne {
          top: 18px;
        }

        .lineTwo {
          top: 24px;
        }

        .lineThree {
          top: 30px;
        }

        .lineFour {
          top: 36px;
          right: 15px;
        }

        .paperScan {
          position: absolute;
          left: 0;
          width: 100%;
          height: 2px;
          background: #22d3ee;
          box-shadow:
            0 0 8px #22d3ee;
          animation: scanPaper 2s linear infinite;
        }

        @keyframes scanPaper {

          from {
            top: 0;
          }

          to {
            top: 100%;
          }

        }

        @keyframes iconFloat {

          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-8px);
          }

        }

        .uploadTitle {
          position: relative;
          margin-top: 30px;
          font-size: 28px;
          font-weight: 700;
        }

        .uploadDescription {
          position: relative;
          max-width: 550px;
          margin: 12px auto 25px;
          color: rgba(255,255,255,0.4);
          line-height: 1.7;
          font-size: 13px;
        }

        .hiddenInput {
          display: none;
        }

        .uploadButton {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 28px;
          border-radius: 10px;
          cursor: pointer;
          color: white;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 2px;
          background:
            linear-gradient(
              135deg,
              #7c3aed,
              #a855f7
            );
          box-shadow:
            0 0 30px rgba(139,92,246,0.3);
          transition: 0.3s;
        }

        .uploadButton:hover {
          transform: translateY(-3px);
          box-shadow:
            0 0 45px rgba(139,92,246,0.5);
        }

        .uploadButton span {
          font-size: 18px;
        }

        .supported {
          position: relative;
          margin-top: 15px;
          color: rgba(255,255,255,0.22);
          font-size: 8px;
          letter-spacing: 2px;
        }

        .uploadDecoration {
          position: relative;
          margin-top: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .uploadDecoration span {
          width: 50px;
          height: 1px;
          background: rgba(255,255,255,0.08);
        }

        .uploadDecoration i {
          color: #a78bfa;
          font-style: normal;
        }

        /* =========================================
           RESUME CARD
        ========================================= */

        .resumeCard,
        .resultCard {
          padding: 30px;
          margin-top: 25px;
          border-radius: 24px;
          border: 1px solid rgba(255,255,255,0.08);
          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.055),
              rgba(255,255,255,0.018)
            );
          backdrop-filter: blur(20px);
          box-shadow:
            0 30px 100px rgba(0,0,0,0.25);
          animation: cardAppear 0.6s ease both;
        }

        .sectionHeader {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 25px;
        }

        .sectionNumber {
          color: #8b5cf6;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 2px;
        }

        .sectionHeader h2 {
          margin: 6px 0;
          font-size: 27px;
        }

        .sectionHeader p {
          margin: 0;
          color: rgba(255,255,255,0.35);
          font-size: 11px;
        }

        .secondaryButton {
          padding: 11px 16px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.55);
          cursor: pointer;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 1px;
          transition: 0.3s;
        }

        .secondaryButton:hover {
          color: #f87171;
          border-color: rgba(248,113,113,0.4);
        }

        /* =========================================
           FILE PREVIEW
        ========================================= */

        .filePreview {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 22px;
          border-radius: 14px;
          border: 1px solid rgba(139,92,246,0.15);
          background:
            rgba(139,92,246,0.05);
        }

        .largeDocumentIcon {
          width: 65px;
          height: 65px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          background:
            rgba(139,92,246,0.12);
        }

        .largePaper {
          position: relative;
          width: 30px;
          height: 40px;
          padding: 9px 5px;
          border-radius: 3px;
          background: #e9e7ff;
          box-shadow:
            0 0 20px rgba(139,92,246,0.3);
        }

        .largePaper::after {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          border-style: solid;
          border-width: 0 9px 9px 0;
          border-color:
            transparent
            #8b5cf6
            transparent
            transparent;
        }

        .largePaper div {
          height: 2px;
          margin-bottom: 4px;
          border-radius: 2px;
          background: #8b5cf6;
          opacity: 0.5;
        }

        .fileDetails {
          flex: 1;
          min-width: 0;
        }

        .fileDetails span {
          display: block;
          color: rgba(255,255,255,0.25);
          font-size: 7px;
          font-weight: 800;
          letter-spacing: 2px;
        }

        .fileDetails strong {
          display: block;
          margin-top: 5px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: white;
          font-size: 14px;
        }

        .fileDetails small {
          display: block;
          margin-top: 5px;
          color: rgba(255,255,255,0.3);
          font-size: 9px;
        }

        .readyBadge,
        .analyzedBadge {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 8px 11px;
          border-radius: 20px;
          color: #86efac;
          background: rgba(34,197,94,0.07);
          border: 1px solid rgba(34,197,94,0.15);
          font-size: 7px;
          font-weight: 900;
          letter-spacing: 1px;
        }

        .readyBadge span,
        .analyzedBadge span {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow:
            0 0 10px #22c55e;
        }

        /* =========================================
           RESUME TEXT
        ========================================= */

        .resumeTextSection {
          margin-top: 20px;
        }

        .textHeader {
          display: flex;
          justify-content: space-between;
          gap: 15px;
          margin-bottom: 8px;
          color: rgba(255,255,255,0.3);
          font-size: 7px;
          font-weight: 800;
          letter-spacing: 2px;
        }

        .characterCount {
          color: rgba(167,139,250,0.6);
        }

        .resumeText {
          max-height: 300px;
          overflow: auto;
          padding: 20px;
          border-radius: 12px;
          background: rgba(0,0,0,0.25);
          border: 1px solid rgba(255,255,255,0.05);
        }

        .resumeText::-webkit-scrollbar {
          width: 5px;
        }

        .resumeText::-webkit-scrollbar-thumb {
          border-radius: 10px;
          background: #6d28d9;
        }

        .resumeText pre {
          margin: 0;
          white-space: pre-wrap;
          color: rgba(255,255,255,0.55);
          font-family:
            "SFMono-Regular",
            Consolas,
            monospace;
          font-size: 11px;
          line-height: 1.8;
        }

        /* =========================================
           UNSUPPORTED FILE MESSAGE
        ========================================= */

        .unsupportedMessage {
          display: flex;
          gap: 15px;
          margin-top: 20px;
          padding: 18px;
          border-radius: 12px;
          background: rgba(245,158,11,0.05);
          border: 1px solid rgba(245,158,11,0.15);
        }

        .warningIcon {
          width: 35px;
          height: 35px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          color: #fcd34d;
          background: rgba(245,158,11,0.12);
          font-weight: 900;
        }

        .unsupportedMessage strong {
          color: #fcd34d;
          font-size: 8px;
          letter-spacing: 1px;
        }

        .unsupportedMessage p {
          margin: 5px 0 0;
          color: rgba(255,255,255,0.35);
          font-size: 10px;
          line-height: 1.6;
        }

        /* =========================================
           ANALYZE BUTTON
        ========================================= */

        .analyzeButton {
          width: 100%;
          margin-top: 20px;
          padding: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          color: white;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 2px;
          background:
            linear-gradient(
              135deg,
              #7c3aed,
              #a855f7,
              #6366f1
            );
          box-shadow:
            0 0 30px rgba(139,92,246,0.25);
          transition: 0.3s;
        }

        .analyzeButton:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow:
            0 0 50px rgba(139,92,246,0.45);
        }

        .analyzeButton:disabled {
          opacity: 0.5;
          cursor: wait;
        }

        .arrow {
          font-size: 18px;
        }

        .spinner {
          width: 15px;
          height: 15px;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.25);
          border-top-color: white;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .dots {
          animation: dots 1.2s steps(3,end) infinite;
        }

        @keyframes dots {

          0% {
            opacity: 0.2;
          }

          50% {
            opacity: 1;
          }

          100% {
            opacity: 0.2;
          }

        }

        /* =========================================
           PROCESSING
        ========================================= */

        .processingCard {
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          gap: 25px;
          margin-top: 20px;
          padding: 25px;
          border-radius: 18px;
          border: 1px solid rgba(139,92,246,0.2);
          background:
            rgba(124,58,237,0.06);
        }

        .processingOrb {
          width: 60px;
          height: 60px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background:
            radial-gradient(
              circle,
              #ffffff,
              #a78bfa 25%,
              #7c3aed 55%,
              #312e81
            );
          box-shadow:
            0 0 35px rgba(139,92,246,0.55);
          animation: thinking 2s ease-in-out infinite;
        }

        @keyframes thinking {

          0%,
          100% {
            transform: scale(1);
          }

          50% {
            transform: scale(1.15);
          }

        }

        .processingCore {
          font-size: 20px;
        }

        .processingText strong {
          display: block;
          color: #c4b5fd;
          font-size: 10px;
          letter-spacing: 2px;
        }

        .processingText p {
          margin: 6px 0 0;
          color: rgba(255,255,255,0.35);
          font-size: 11px;
        }

        .processingLine {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: rgba(139,92,246,0.1);
        }

        .processingLine span {
          display: block;
          width: 35%;
          height: 100%;
          background:
            linear-gradient(
              90deg,
              transparent,
              #a78bfa,
              #22d3ee,
              transparent
            );
          animation: progress 1.5s linear infinite;
        }

        @keyframes progress {

          from {
            transform: translateX(-150%);
          }

          to {
            transform: translateX(400%);
          }

        }

        /* =========================================
           AI RESULT
        ========================================= */

        .analysisArea {
          position: relative;
          overflow: hidden;
          min-height: 300px;
          padding: 30px;
          border-radius: 15px;
          background:
            radial-gradient(
              circle at 50% 0%,
              rgba(139,92,246,0.1),
              rgba(0,0,0,0.3)
            );
          border: 1px solid rgba(255,255,255,0.06);
        }

        .analysisGlow {
          position: absolute;
          top: -150px;
          left: 50%;
          width: 300px;
          height: 300px;
          transform: translateX(-50%);
          border-radius: 50%;
          background: #7c3aed;
          filter: blur(120px);
          opacity: 0.07;
          pointer-events: none;
        }

        .analysisContent {
          position: relative;
          white-space: pre-wrap;
          color: rgba(255,255,255,0.65);
          font-size: 12px;
          line-height: 2;
        }

        .resultFooter {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin-top: 15px;
        }

        .resultStat {
          padding: 15px;
          border-radius: 10px;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.05);
        }

        .resultStat span {
          display: block;
          color: rgba(255,255,255,0.22);
          font-size: 7px;
          letter-spacing: 2px;
        }

        .resultStat strong {
          display: block;
          margin-top: 5px;
          color: #a78bfa;
          font-size: 9px;
          letter-spacing: 1px;
        }

        /* =========================================
           HOW IT WORKS
        ========================================= */

        .howSection {
          margin-top: 100px;
        }

        .howHeading h2 {
          margin: 20px 0 40px;
          font-size: clamp(40px, 6vw, 70px);
          line-height: 0.95;
          letter-spacing: -3px;
        }

        .howHeading h2 span {
          color: #a78bfa;
        }

        .steps {
          display: grid;
          grid-template-columns: 1fr auto 1fr auto 1fr;
          align-items: stretch;
          gap: 15px;
        }

        .stepCard {
          padding: 25px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.025);
          transition: 0.3s;
        }

        .stepCard:hover {
          transform: translateY(-6px);
          border-color: rgba(139,92,246,0.3);
          box-shadow:
            0 20px 50px rgba(0,0,0,0.2);
        }

        .stepNumber {
          color: #8b5cf6;
          font-size: 8px;
          font-weight: 900;
          letter-spacing: 2px;
        }

        .stepIcon {
          margin-top: 25px;
          font-size: 28px;
        }

        .stepCard h3 {
          margin: 15px 0 8px;
          font-size: 18px;
        }

        .stepCard p {
          margin: 0;
          color: rgba(255,255,255,0.35);
          line-height: 1.6;
          font-size: 11px;
        }

        .stepLine {
          width: 30px;
          height: 1px;
          align-self: center;
          background:
            linear-gradient(
              90deg,
              transparent,
              #8b5cf6,
              transparent
            );
        }

        /* =========================================
           FOOTER
        ========================================= */

        footer {
          position: relative;
          z-index: 2;
          width: min(1200px, calc(100% - 40px));
          margin: auto;
          padding: 25px 0;
          display: flex;
          justify-content: space-between;
          border-top: 1px solid rgba(255,255,255,0.07);
          color: rgba(255,255,255,0.22);
          font-size: 8px;
          letter-spacing: 1px;
        }

        .systemStatus {
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .systemStatus i {
          width: 6px;
          height: 6px;
          display: inline-block;
          border-radius: 50%;
          background: #22c55e;
          box-shadow:
            0 0 12px #22c55e;
        }

        /* =========================================
           MOBILE
        ========================================= */

        @media (max-width: 800px) {

          .navbar {
            width: calc(100% - 25px);
          }

          .onlineStatus {
            display: none;
          }

          .container {
            width: calc(100% - 25px);
            padding-top: 60px;
          }

          .hero h1 {
            font-size: 65px;
            letter-spacing: -4px;
          }

          .steps {
            grid-template-columns: 1fr;
          }

          .stepLine {
            display: none;
          }

          .filePreview {
            flex-wrap: wrap;
          }

          .readyBadge {
            margin-left: 85px;
          }

          .resultFooter {
            grid-template-columns: 1fr;
          }

          .sectionHeader {
            align-items: flex-start;
          }

        }

        @media (max-width: 520px) {

          .brandText small {
            display: none;
          }

          .backButton {
            padding: 8px 10px;
            font-size: 8px;
          }

          .hero h1 {
            font-size: 55px;
          }

          .uploadCard {
            padding: 65px 20px;
          }

          .resumeCard,
          .resultCard {
            padding: 18px;
          }

          .sectionHeader {
            flex-direction: column;
          }

          .secondaryButton {
            align-self: flex-start;
          }

          .filePreview {
            align-items: flex-start;
          }

          .readyBadge {
            margin-left: 0;
          }

          footer {
            flex-direction: column;
            gap: 12px;
            text-align: center;
          }

        }

      `}</style>

    </main>
  );
}