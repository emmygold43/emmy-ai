"use client";

import { useState } from "react";
import puter from "@heyputer/puter.js";
import Link from "next/link";

export default function SketchToImage() {
  const [fileName, setFileName] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [imageData, setImageData] = useState("");
  const [generatedImage, setGeneratedImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    setFileName(file.name);
    setGeneratedImage("");
    setError("");

    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImageData(reader.result);
      }
    };

    reader.readAsDataURL(file);
  }

  async function generateImage() {
    if (!imageData) return;

    setLoading(true);
    setError("");
    setGeneratedImage("");

    try {
      const prompt = `
Transform this rough sketch into a polished, realistic finished image.

Keep the main objects, composition, layout, proportions, and core idea from the sketch.

Improve:
- details
- lighting
- textures
- proportions
- depth
- materials
- realism
- visual quality
- professional presentation

Create a beautiful, high-quality final image based on the uploaded sketch.

Do not completely change the original idea.
Preserve the important visual structure of the sketch.
`;

      const result = await puter.ai.txt2img(prompt, {
        input_image: imageData,
      });

      const generatedUrl = result.src;

      if (generatedUrl) {
        setGeneratedImage(generatedUrl);
      } else {
        setError(
          "The AI generated an image, but no image data was returned."
        );
      }
    } catch (error) {
      console.error("Image generation error:", error);

      setError(
        "Sorry, something went wrong while generating the image. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function downloadImage() {
    if (!generatedImage) return;

    const link = document.createElement("a");

    link.href = generatedImage;
    link.download = "emmy-ai-generated-image.png";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function removeSketch() {
    setFileName("");
    setPreviewUrl("");
    setImageData("");
    setGeneratedImage("");
    setError("");
  }

  return (
    <main className="page">

      {/* =========================================================
          ANIMATED BACKGROUND
      ========================================================== */}

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

      {/* =========================================================
          NAVIGATION
      ========================================================== */}

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

      {/* =========================================================
          MAIN CONTENT
      ========================================================== */}

      <section className="container">

        {/* HEADER */}

        <div className="hero">

          <div className="eyebrow">
            <span />
            EMMY AI / TOOL 02
          </div>

          <h1>
            Sketch
            <br />
            <span>Reimagined.</span>
          </h1>

          <p>
            Transform your hand-drawn ideas into polished,
            detailed visuals with AI-powered image generation.
          </p>

        </div>

        {/* =====================================================
            UPLOAD CARD
        ====================================================== */}

        {!previewUrl && (

          <section className="uploadCard">

            <div className="uploadGlow" />

            <div className="uploadIcon">
              🎨
            </div>

            <div className="uploadTitle">
              Upload your sketch
            </div>

            <p className="uploadDescription">
              Start with a hand-drawn sketch and let EMMY AI
              transform your idea into a finished visual.
            </p>

            <input
              id="sketch-upload"
              type="file"
              accept="image/png,image/jpeg,image/jpg"
              onChange={handleFileChange}
              className="hiddenInput"
            />

            <label
              htmlFor="sketch-upload"
              className="uploadButton"
            >
              <span>＋</span>
              CHOOSE SKETCH
            </label>

            <div className="supported">
              PNG · JPG · JPEG
            </div>

            <div className="uploadDecoration">
              <span />
              <i>✦</i>
              <span />
            </div>

          </section>

        )}

        {/* =====================================================
            PREVIEW SECTION
        ====================================================== */}

        {previewUrl && (

          <section className="previewCard">

            <div className="sectionHeader">

              <div>
                <div className="sectionNumber">
                  01
                </div>

                <h2>
                  Your Sketch
                </h2>

                <p>
                  Ready for EMMY AI to transform.
                </p>
              </div>

              <button
                type="button"
                onClick={removeSketch}
                className="secondaryButton"
              >
                REMOVE
              </button>

            </div>

            <div className="previewArea">

              <div className="imageFrame">

                <div className="corner cornerTL" />
                <div className="corner cornerTR" />
                <div className="corner cornerBL" />
                <div className="corner cornerBR" />

                <img
                  src={previewUrl}
                  alt="Uploaded sketch"
                  className="previewImage"
                />

              </div>

            </div>

            <div className="fileInfo">

              <div className="fileIcon">
                ✦
              </div>

              <div className="fileDetails">

                <span>
                  SELECTED SKETCH
                </span>

                <strong>
                  {fileName}
                </strong>

              </div>

            </div>

            <button
              type="button"
              onClick={generateImage}
              disabled={!imageData || loading}
              className="generateButton"
            >

              {loading ? (

                <>
                  <span className="spinner" />

                  EMMY AI IS CREATING

                  <span className="dots">
                    ...
                  </span>
                </>

              ) : (

                <>
                  ✦ GENERATE REAL IMAGE WITH AI

                  <span className="arrow">
                    →
                  </span>
                </>

              )}

            </button>

          </section>

        )}

        {/* =====================================================
            AI PROCESSING
        ====================================================== */}

        {loading && (

          <div className="processingCard">

            <div className="processingOrb">
              <div className="processingCore">
                ✦
              </div>
            </div>

            <div className="processingText">

              <strong>
                EMMY AI IS THINKING
              </strong>

              <p>
                Analyzing your sketch and creating
                a polished visual...
              </p>

            </div>

            <div className="processingLine">
              <span />
            </div>

          </div>

        )}

        {/* =====================================================
            GENERATED IMAGE
        ====================================================== */}

        {generatedImage && (

          <section className="resultCard">

            <div className="sectionHeader">

              <div>

                <div className="sectionNumber">
                  02
                </div>

                <h2>
                  AI Creation
                </h2>

                <p>
                  Your sketch has been reimagined.
                </p>

              </div>

              <button
                type="button"
                onClick={downloadImage}
                className="downloadButton"
              >
                ↓ DOWNLOAD
              </button>

            </div>

            <div className="resultArea">

              <img
                src={generatedImage}
                alt="AI generated image"
                className="generatedImage"
              />

            </div>

            <div className="successMessage">

              <div className="successIcon">
                ✓
              </div>

              <div>
                <strong>
                  IMAGE GENERATED SUCCESSFULLY
                </strong>

                <p>
                  Your original sketch has been transformed
                  into a polished AI-generated visual.
                </p>
              </div>

            </div>

          </section>

        )}

        {/* =====================================================
            ERROR
        ====================================================== */}

        {error && (

          <div className="errorCard">

            <div className="errorIcon">
              !
            </div>

            <div>

              <strong>
                GENERATION ERROR
              </strong>

              <p>
                {error}
              </p>

            </div>

          </div>

        )}

        {/* =====================================================
            HOW IT WORKS
        ====================================================== */}

        <section className="howSection">

          <div className="howHeading">

            <div className="eyebrow">
              <span />
              CREATIVE INTELLIGENCE
            </div>

            <h2>
              From idea.
              <br />
              <span>To reality.</span>
            </h2>

          </div>

          <div className="steps">

            <div className="stepCard">

              <div className="stepNumber">
                01
              </div>

              <div className="stepIcon">
                📝
              </div>

              <h3>
                Upload
              </h3>

              <p>
                Upload your hand-drawn sketch
                or rough concept.
              </p>

            </div>

            <div className="stepLine" />

            <div className="stepCard">

              <div className="stepNumber">
                02
              </div>

              <div className="stepIcon">
                ✦
              </div>

              <h3>
                AI Processing
              </h3>

              <p>
                EMMY AI analyzes the structure
                and visual intent.
              </p>

            </div>

            <div className="stepLine" />

            <div className="stepCard">

              <div className="stepNumber">
                03
              </div>

              <div className="stepIcon">
                🖼️
              </div>

              <h3>
                Reimagined
              </h3>

              <p>
                Receive a polished,
                AI-generated visual.
              </p>

            </div>

          </div>

        </section>

      </section>

      {/* =========================================================
          FOOTER
      ========================================================== */}

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

      {/* =========================================================
          CSS
      ========================================================== */}

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

        /* ========================================
           BACKGROUND
        ======================================== */

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

        /* ========================================
           NAVBAR
        ======================================== */

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

        /* ========================================
           CONTAINER
        ======================================== */

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

        /* ========================================
           UPLOAD
        ======================================== */

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

        .uploadIcon {
          position: relative;
          width: 85px;
          height: 85px;
          margin: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 22px;
          font-size: 38px;
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

        /* ========================================
           PREVIEW / RESULT
        ======================================== */

        .previewCard,
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

        .secondaryButton,
        .downloadButton {
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

        .downloadButton:hover {
          color: white;
          border-color: #8b5cf6;
          box-shadow:
            0 0 20px rgba(139,92,246,0.15);
        }

        .previewArea,
        .resultArea {
          position: relative;
          overflow: hidden;
          min-height: 400px;
          padding: 25px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 16px;
          background:
            radial-gradient(
              circle at center,
              rgba(139,92,246,0.08),
              rgba(0,0,0,0.3)
            );
          border: 1px solid rgba(255,255,255,0.06);
        }

        .imageFrame {
          position: relative;
          max-width: 100%;
        }

        .previewImage,
        .generatedImage {
          display: block;
          max-width: 100%;
          max-height: 650px;
          object-fit: contain;
          border-radius: 10px;
          box-shadow:
            0 20px 60px rgba(0,0,0,0.4);
        }

        .corner {
          position: absolute;
          width: 20px;
          height: 20px;
          z-index: 2;
          border-color: #a78bfa;
        }

        .cornerTL {
          left: -8px;
          top: -8px;
          border-left: 2px solid;
          border-top: 2px solid;
        }

        .cornerTR {
          right: -8px;
          top: -8px;
          border-right: 2px solid;
          border-top: 2px solid;
        }

        .cornerBL {
          left: -8px;
          bottom: -8px;
          border-left: 2px solid;
          border-bottom: 2px solid;
        }

        .cornerBR {
          right: -8px;
          bottom: -8px;
          border-right: 2px solid;
          border-bottom: 2px solid;
        }

        .fileInfo {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 18px;
          padding: 14px;
          border-radius: 10px;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.05);
        }

        .fileIcon {
          width: 35px;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          background: rgba(139,92,246,0.15);
          color: #a78bfa;
        }

        .fileDetails span {
          display: block;
          color: rgba(255,255,255,0.25);
          font-size: 7px;
          letter-spacing: 2px;
        }

        .fileDetails strong {
          display: block;
          max-width: 500px;
          margin-top: 3px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: rgba(255,255,255,0.7);
          font-size: 11px;
        }

        /* ========================================
           GENERATE BUTTON
        ======================================== */

        .generateButton {
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

        .generateButton:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow:
            0 0 50px rgba(139,92,246,0.45);
        }

        .generateButton:disabled {
          opacity: 0.6;
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

        /* ========================================
           PROCESSING
        ======================================== */

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

        /* ========================================
           SUCCESS
        ======================================== */

        .successMessage {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-top: 18px;
          padding: 15px;
          border-radius: 10px;
          background: rgba(34,197,94,0.05);
          border: 1px solid rgba(34,197,94,0.12);
        }

        .successIcon {
          width: 35px;
          height: 35px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          color: #86efac;
          background: rgba(34,197,94,0.12);
        }

        .successMessage strong {
          color: #86efac;
          font-size: 8px;
          letter-spacing: 1.5px;
        }

        .successMessage p {
          margin: 4px 0 0;
          color: rgba(255,255,255,0.3);
          font-size: 10px;
        }

        /* ========================================
           ERROR
        ======================================== */

        .errorCard {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-top: 20px;
          padding: 20px;
          border-radius: 14px;
          background: rgba(239,68,68,0.06);
          border: 1px solid rgba(239,68,68,0.2);
        }

        .errorIcon {
          width: 35px;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: rgba(239,68,68,0.15);
          color: #fca5a5;
          font-weight: 900;
        }

        .errorCard strong {
          color: #fca5a5;
          font-size: 9px;
          letter-spacing: 1.5px;
        }

        .errorCard p {
          margin: 5px 0 0;
          color: rgba(255,255,255,0.4);
          font-size: 11px;
        }

        /* ========================================
           HOW IT WORKS
        ======================================== */

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

        /* ========================================
           FOOTER
        ======================================== */

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

        /* ========================================
           MOBILE
        ======================================== */

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

          .sectionHeader {
            align-items: flex-start;
          }

          .previewArea,
          .resultArea {
            min-height: 280px;
            padding: 15px;
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

          .previewCard,
          .resultCard {
            padding: 18px;
          }

          .sectionHeader {
            flex-direction: column;
          }

          .secondaryButton,
          .downloadButton {
            align-self: flex-start;
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