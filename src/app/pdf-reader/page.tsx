"use client";

import { useState } from "react";
import puter from "@heyputer/puter.js";
import * as pdfjsLib from "pdfjs-dist";
import Link from "next/link";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function PDFReaderPage() {
  const [fileName, setFileName] = useState("");
  const [pdfText, setPdfText] = useState("");
  const [summary, setSummary] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function extractText(file: File) {
    setLoading(true);
    setError("");
    setSummary("");
    setAnswer("");
    setPdfText("");

    try {
      const arrayBuffer = await file.arrayBuffer();

      const pdf = await pdfjsLib.getDocument({
        data: arrayBuffer,
      }).promise;

      let fullText = "";

      for (
        let pageNumber = 1;
        pageNumber <= pdf.numPages;
        pageNumber++
      ) {
        const page = await pdf.getPage(pageNumber);
        const textContent = await page.getTextContent();

        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(" ");

        fullText += `\n\n--- Page ${pageNumber} ---\n${pageText}`;
      }

      if (!fullText.trim()) {
        throw new Error(
          "No readable text was found in this PDF. It may be a scanned image PDF."
        );
      }

      setPdfText(fullText);

      const prompt = `
You are EMMY AI, an intelligent PDF document reader.

Analyze the following PDF document.

Give me:
1. A clear summary
2. The main points
3. Important skills, experience, education, or qualifications if this is a resume
4. Any important observations

PDF CONTENT:
${fullText}
`;

      const response = await puter.ai.chat(prompt);

      let result = "";

      if (typeof response === "string") {
        result = response;
      } else if (
        response &&
        typeof response === "object" &&
        "message" in response
      ) {
        const message = (response as any).message;

        if (typeof message === "string") {
          result = message;
        } else if (message?.content) {
          result = message.content;
        }
      }

      if (!result) {
        result = JSON.stringify(response, null, 2);
      }

      setSummary(result);
    } catch (err: any) {
      console.error(err);
      setError(
        err?.message || "Something went wrong while reading the PDF."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("Please select a PDF file.");
      return;
    }

    setFileName(file.name);
    extractText(file);
  }

  async function askQuestion() {
    if (!question.trim()) return;

    if (!pdfText) {
      setError("Please upload a PDF first.");
      return;
    }

    setLoading(true);
    setError("");
    setAnswer("");

    try {
      const prompt = `
You are EMMY AI.

Answer the user's question using ONLY the information contained in this PDF.

If the answer cannot be found in the PDF, clearly say that the information is not available in the document.

PDF CONTENT:
${pdfText}

USER QUESTION:
${question}
`;

      const response = await puter.ai.chat(prompt);

      let result = "";

      if (typeof response === "string") {
        result = response;
      } else if (
        response &&
        typeof response === "object" &&
        "message" in response
      ) {
        const message = (response as any).message;

        if (typeof message === "string") {
          result = message;
        } else if (message?.content) {
          result = message.content;
        }
      }

      if (!result) {
        result = JSON.stringify(response, null, 2);
      }

      setAnswer(result);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Could not answer the question.");
    } finally {
      setLoading(false);
    }
  }

  function clearDocument() {
    setFileName("");
    setPdfText("");
    setSummary("");
    setQuestion("");
    setAnswer("");
    setError("");
  }

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

      {/* MAIN */}
      <section className="content">
        {/* HERO */}
        <div className="hero">
          <div className="toolLabel">
            <span className="labelLine" />
            EMMY AI / TOOL 04
            <span className="labelLine" />
          </div>

          <h1>
            Your Documents.
            <span> Understood.</span>
          </h1>

          <p>
            Upload a PDF and let EMMY AI read, summarize, analyze,
            and answer questions about your document.
          </p>
        </div>

        {/* UPLOAD CARD */}
        <div className="uploadCard">
          <div className="uploadTop">
            <div>
              <div className="uploadEyebrow">
                <span className="pulseDot" />
                DOCUMENT INTELLIGENCE
              </div>

              <h2>Upload a PDF</h2>

              <p>
                Give EMMY AI a document and turn it into an
                intelligent, searchable knowledge source.
              </p>
            </div>

            <div className="documentIcon">
              <div className="documentShape">
                <div className="documentFold" />
                <div className="documentLines">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            </div>
          </div>

          <label className="uploadZone">
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
            />

            <div className="uploadIcon">
              ↑
            </div>

            <div className="uploadTitle">
              Choose your PDF
            </div>

            <div className="uploadDescription">
              Click anywhere in this area to select a document
            </div>

            <div className="uploadFormat">
              PDF DOCUMENTS ONLY
            </div>
          </label>

          {fileName && (
            <div className="selectedFile">
              <div className="fileIcon">
                PDF
              </div>

              <div className="fileInfo">
                <span>SELECTED DOCUMENT</span>
                <strong>{fileName}</strong>
              </div>

              <button
                type="button"
                onClick={clearDocument}
                className="removeButton"
              >
                ×
              </button>
            </div>
          )}

          <div className="uploadFooter">
            <span>LOCAL PDF EXTRACTION</span>
            <span className="footerDivider" />
            <span>AI DOCUMENT ANALYSIS</span>
            <span className="footerDivider" />
            <span>EMMY AI</span>
          </div>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="loadingCard">
            <div className="documentScanner">
              <div className="scannerDocument">
                <div />
                <div />
                <div />
                <div />
              </div>

              <div className="scannerBeam" />
            </div>

            <div className="loadingContent">
              <div className="loadingLabel">
                AI DOCUMENT PROCESSING
              </div>

              <h3>
                EMMY AI is reading your document...
              </h3>

              <p>
                Extracting information and preparing your PDF
                for intelligent analysis.
              </p>

              <div className="progressTrack">
                <div className="progressBar" />
              </div>

              <div className="processingSteps">
                <span className="active">
                  <i />
                  Reading document
                </span>

                <span>
                  <i />
                  Extracting content
                </span>

                <span>
                  <i />
                  Preparing AI analysis
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ERROR */}
        {error && !loading && (
          <div className="errorCard">
            <div className="errorIcon">
              !
            </div>

            <div>
              <div className="errorLabel">
                DOCUMENT ERROR
              </div>

              <p>{error}</p>
            </div>
          </div>
        )}

        {/* SUMMARY */}
        {summary && !loading && (
          <div className="summaryCard">
            <div className="summaryHeader">
              <div>
                <div className="summaryEyebrow">
                  <span className="resultDot" />
                  ANALYSIS COMPLETE
                </div>

                <h2>AI Document Summary</h2>

                <p>
                  EMMY AI has finished reading and analyzing your
                  PDF.
                </p>
              </div>

              <div className="completeBadge">
                ✓ COMPLETE
              </div>
            </div>

            <div className="summaryBody">
              <div className="summaryLabel">
                EMMY AI REPORT
              </div>

              <div className="summaryText">
                {summary}
              </div>
            </div>
          </div>
        )}

        {/* ASK QUESTIONS */}
        {pdfText && (
          <div className="questionCard">
            <div className="questionHeader">
              <div>
                <div className="questionEyebrow">
                  <span>✦</span>
                  DOCUMENT CHAT
                </div>

                <h2>Ask Your Document</h2>

                <p>
                  Ask EMMY AI questions using information contained
                  in your uploaded PDF.
                </p>
              </div>

              <div className="chatIcon">
                ?
              </div>
            </div>

            <div className="questionArea">
              <label htmlFor="pdf-question">
                YOUR QUESTION
              </label>

              <textarea
                id="pdf-question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Example: What skills does this candidate have?"
              />

              <div className="questionBottom">
                <span>
                  Answers are based only on your PDF
                </span>

                <button
                  onClick={askQuestion}
                  disabled={loading || !question.trim()}
                  className="askButton"
                >
                  {loading ? (
                    <>
                      <span className="buttonSpinner" />
                      THINKING...
                    </>
                  ) : (
                    <>
                      ASK EMMY AI
                      <span>→</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {answer && (
              <div className="answerBox">
                <div className="answerHeader">
                  <span className="answerDot" />
                  EMMY AI ANSWER
                </div>

                <div className="answerText">
                  {answer}
                </div>
              </div>
            )}
          </div>
        )}

        {/* EXTRACTED TEXT */}
        {pdfText && (
          <details className="textDetails">
            <summary>
              <span>
                <b>⌘</b>
                View Extracted PDF Text
              </span>

              <span className="detailsArrow">
                +
              </span>
            </summary>

            <div className="extractedText">
              {pdfText}
            </div>
          </details>
        )}

        {/* FEATURES */}
        <div className="sectionHeading">
          <span>DOCUMENT INTELLIGENCE</span>
        </div>

        <div className="features">
          <div className="featureCard">
            <div className="featureNumber">
              01
            </div>

            <div className="featureIcon purple">
              ◫
            </div>

            <h3>
              Read
            </h3>

            <p>
              Extract readable text from PDF documents directly
              inside your browser.
            </p>

            <div className="featureLine" />
          </div>

          <div className="featureCard">
            <div className="featureNumber">
              02
            </div>

            <div className="featureIcon cyan">
              ✦
            </div>

            <h3>
              Understand
            </h3>

            <p>
              EMMY AI summarizes important information and
              identifies useful document insights.
            </p>

            <div className="featureLine" />
          </div>

          <div className="featureCard">
            <div className="featureNumber">
              03
            </div>

            <div className="featureIcon pink">
              ?
            </div>

            <h3>
              Ask
            </h3>

            <p>
              Ask natural-language questions and get answers
              grounded in the uploaded document.
            </p>

            <div className="featureLine" />
          </div>
        </div>

        {/* DOCUMENT CAPABILITIES */}
        <div className="capabilitySection">
          <div className="sectionHeading">
            <span>WHAT YOU CAN DO</span>
          </div>

          <div className="capabilities">
            <span>SUMMARIZE</span>
            <span>EXTRACT TEXT</span>
            <span>FIND SKILLS</span>
            <span>ANALYZE EXPERIENCE</span>
            <span>UNDERSTAND QUALIFICATIONS</span>
            <span>ASK QUESTIONS</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div>
          <span className="footerBrand">
            EMMY AI
          </span>

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
          top: 10%;
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

        .uploadCard {
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

        .uploadCard::before {
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

        .uploadTop {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 30px;
        }

        .uploadEyebrow {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #a78bfa;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.22em;
        }

        .uploadTop h2 {
          margin: 12px 0 7px;
          font-size: 25px;
          letter-spacing: -0.03em;
        }

        .uploadTop p {
          max-width: 570px;
          margin: 0;
          color: #64748b;
          font-size: 13px;
          line-height: 1.7;
        }

        .documentIcon {
          flex-shrink: 0;
        }

        .documentShape {
          position: relative;
          width: 65px;
          height: 78px;
          border: 1px solid rgba(139, 92, 246, 0.4);
          border-radius: 11px;
          background:
            linear-gradient(
              145deg,
              rgba(139, 92, 246, 0.15),
              rgba(34, 211, 238, 0.04)
            );
          box-shadow:
            0 0 35px rgba(139, 92, 246, 0.13);
          animation: iconFloat 4s ease-in-out infinite;
        }

        .documentFold {
          position: absolute;
          top: -1px;
          right: -1px;
          width: 23px;
          height: 23px;
          border-left: 1px solid rgba(139, 92, 246, 0.35);
          border-bottom: 1px solid rgba(139, 92, 246, 0.35);
          border-radius: 0 10px 0 8px;
          background: rgba(139, 92, 246, 0.12);
        }

        .documentLines {
          position: absolute;
          top: 35px;
          left: 13px;
          right: 13px;
          display: grid;
          gap: 6px;
        }

        .documentLines i {
          display: block;
          height: 3px;
          border-radius: 5px;
          background: rgba(196, 181, 253, 0.45);
        }

        .documentLines i:nth-child(2) {
          width: 75%;
        }

        .documentLines i:nth-child(3) {
          width: 55%;
        }

        .uploadZone {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 225px;
          margin-top: 28px;
          padding: 30px;
          overflow: hidden;
          border: 1px dashed rgba(139, 92, 246, 0.3);
          border-radius: 18px;
          background:
            radial-gradient(
              circle at center,
              rgba(139, 92, 246, 0.07),
              transparent 55%
            ),
            rgba(0, 0, 0, 0.18);
          cursor: pointer;
          transition: 0.3s ease;
        }

        .uploadZone:hover {
          border-color: rgba(34, 211, 238, 0.45);
          background:
            radial-gradient(
              circle at center,
              rgba(139, 92, 246, 0.11),
              transparent 55%
            ),
            rgba(0, 0, 0, 0.22);
          transform: translateY(-2px);
        }

        .uploadZone input {
          display: none;
        }

        .uploadIcon {
          width: 55px;
          height: 55px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 16px;
          background: rgba(139, 92, 246, 0.09);
          color: #c4b5fd;
          font-size: 27px;
          box-shadow: 0 0 25px rgba(139, 92, 246, 0.12);
          transition: 0.3s ease;
        }

        .uploadZone:hover .uploadIcon {
          transform: translateY(-4px);
          color: #67e8f9;
          box-shadow: 0 0 35px rgba(34, 211, 238, 0.15);
        }

        .uploadTitle {
          font-size: 17px;
          font-weight: 700;
        }

        .uploadDescription {
          margin-top: 7px;
          color: #64748b;
          font-size: 12px;
          text-align: center;
        }

        .uploadFormat {
          margin-top: 16px;
          padding: 6px 9px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 6px;
          color: #475569;
          font-size: 7px;
          font-weight: 800;
          letter-spacing: 0.15em;
        }

        .selectedFile {
          display: flex;
          align-items: center;
          gap: 13px;
          margin-top: 14px;
          padding: 14px;
          border: 1px solid rgba(34, 211, 238, 0.15);
          border-radius: 13px;
          background: rgba(34, 211, 238, 0.035);
          animation: fadeUp 0.35s ease both;
        }

        .fileIcon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border-radius: 10px;
          background: linear-gradient(
            135deg,
            #7c3aed,
            #06b6d4
          );
          color: white;
          font-size: 8px;
          font-weight: 900;
          letter-spacing: 0.08em;
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.2);
        }

        .fileInfo {
          flex: 1;
          min-width: 0;
        }

        .fileInfo span {
          display: block;
          color: #475569;
          font-size: 7px;
          font-weight: 800;
          letter-spacing: 0.15em;
        }

        .fileInfo strong {
          display: block;
          margin-top: 4px;
          overflow: hidden;
          color: #cbd5e1;
          font-size: 12px;
          font-weight: 500;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .removeButton {
          width: 32px;
          height: 32px;
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.03);
          color: #64748b;
          font-size: 20px;
          cursor: pointer;
          transition: 0.2s ease;
        }

        .removeButton:hover {
          color: #fda4af;
          border-color: rgba(244, 63, 94, 0.25);
          background: rgba(244, 63, 94, 0.05);
        }

        .uploadFooter {
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

        .documentScanner {
          position: relative;
          width: 130px;
          height: 130px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .scannerDocument {
          position: relative;
          width: 70px;
          height: 88px;
          padding: 26px 13px 12px;
          border: 1px solid rgba(139, 92, 246, 0.45);
          border-radius: 10px;
          background: rgba(139, 92, 246, 0.08);
          box-shadow:
            0 0 30px rgba(139, 92, 246, 0.15);
        }

        .scannerDocument::before {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          width: 20px;
          height: 20px;
          border-left: 1px solid rgba(139, 92, 246, 0.35);
          border-bottom: 1px solid rgba(139, 92, 246, 0.35);
          background: rgba(139, 92, 246, 0.1);
        }

        .scannerDocument div {
          height: 4px;
          margin-bottom: 7px;
          border-radius: 5px;
          background: rgba(196, 181, 253, 0.35);
        }

        .scannerDocument div:nth-child(2) {
          width: 80%;
        }

        .scannerDocument div:nth-child(3) {
          width: 90%;
        }

        .scannerDocument div:nth-child(4) {
          width: 60%;
        }

        .scannerBeam {
          position: absolute;
          left: 18px;
          right: 18px;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent,
            #22d3ee,
            transparent
          );
          box-shadow:
            0 0 12px #22d3ee,
            0 0 25px rgba(34, 211, 238, 0.5);
          animation: documentScan 2s ease-in-out infinite;
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

        .processingSteps {
          display: flex;
          flex-wrap: wrap;
          gap: 18px;
          margin-top: 16px;
          color: #475569;
          font-size: 10px;
        }

        .processingSteps span {
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .processingSteps i {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #334155;
        }

        .processingSteps .active {
          color: #a78bfa;
        }

        .processingSteps .active i {
          background: #a78bfa;
          box-shadow: 0 0 8px rgba(167, 139, 250, 0.8);
        }

        .errorCard {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-top: 22px;
          padding: 20px;
          border: 1px solid rgba(244, 63, 94, 0.18);
          border-radius: 17px;
          background: rgba(244, 63, 94, 0.045);
          animation: fadeUp 0.35s ease both;
        }

        .errorIcon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border: 1px solid rgba(244, 63, 94, 0.25);
          border-radius: 11px;
          color: #fda4af;
          font-weight: 800;
        }

        .errorLabel {
          color: #fb7185;
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 0.18em;
        }

        .errorCard p {
          margin: 6px 0 0;
          color: #94a3b8;
          font-size: 12px;
          line-height: 1.6;
        }

        .summaryCard {
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

        .summaryHeader {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 25px;
          padding: 26px 28px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
        }

        .summaryEyebrow {
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

        .summaryHeader h2 {
          margin: 10px 0 5px;
          font-size: 23px;
        }

        .summaryHeader p {
          margin: 0;
          color: #64748b;
          font-size: 12px;
        }

        .completeBadge {
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

        .summaryBody {
          padding: 25px 28px 29px;
        }

        .summaryLabel {
          margin-bottom: 14px;
          color: #475569;
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 0.18em;
        }

        .summaryText {
          padding: 21px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 14px;
          background: rgba(0, 0, 0, 0.28);
          color: #cbd5e1;
          font-size: 13px;
          line-height: 1.9;
          white-space: pre-wrap;
        }

        .questionCard {
          margin-top: 22px;
          padding: 28px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 22px;
          background:
            linear-gradient(
              145deg,
              rgba(255, 255, 255, 0.045),
              rgba(255, 255, 255, 0.015)
            );
          box-shadow:
            0 25px 70px rgba(0, 0, 0, 0.25);
          animation: fadeUp 0.6s ease both;
        }

        .questionHeader {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 20px;
        }

        .questionEyebrow {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #c4b5fd;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.2em;
        }

        .questionEyebrow span {
          color: #67e8f9;
        }

        .questionHeader h2 {
          margin: 10px 0 5px;
          font-size: 23px;
        }

        .questionHeader p {
          margin: 0;
          color: #64748b;
          font-size: 12px;
          line-height: 1.7;
        }

        .chatIcon {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 15px;
          background: rgba(139, 92, 246, 0.08);
          color: #c4b5fd;
          font-size: 21px;
          box-shadow: 0 0 25px rgba(139, 92, 246, 0.1);
        }

        .questionArea {
          margin-top: 25px;
        }

        .questionArea label {
          display: block;
          margin-bottom: 9px;
          color: #94a3b8;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.16em;
        }

        .questionArea textarea {
          width: 100%;
          min-height: 130px;
          resize: vertical;
          padding: 16px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 13px;
          outline: none;
          background: rgba(0, 0, 0, 0.3);
          color: white;
          font-family: inherit;
          font-size: 13px;
          line-height: 1.7;
          transition: 0.25s ease;
        }

        .questionArea textarea::placeholder {
          color: #475569;
        }

        .questionArea textarea:focus {
          border-color: rgba(139, 92, 246, 0.65);
          box-shadow:
            0 0 0 4px rgba(139, 92, 246, 0.06);
        }

        .questionBottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-top: 13px;
        }

        .questionBottom > span {
          color: #475569;
          font-size: 10px;
        }

        .askButton {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          min-width: 145px;
          padding: 12px 17px;
          border: 0;
          border-radius: 10px;
          background: linear-gradient(
            100deg,
            #7c3aed,
            #06b6d4
          );
          color: white;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.1em;
          cursor: pointer;
          box-shadow: 0 8px 25px rgba(124, 58, 237, 0.2);
          transition: 0.25s ease;
        }

        .askButton:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow:
            0 12px 30px rgba(124, 58, 237, 0.3);
        }

        .askButton:disabled {
          cursor: not-allowed;
          opacity: 0.45;
        }

        .askButton > span:last-child {
          font-size: 15px;
        }

        .buttonSpinner {
          width: 13px;
          height: 13px;
          border: 2px solid rgba(255, 255, 255, 0.35);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        .answerBox {
          margin-top: 25px;
          overflow: hidden;
          border: 1px solid rgba(34, 211, 238, 0.13);
          border-radius: 14px;
          background: rgba(0, 0, 0, 0.24);
          animation: fadeUp 0.4s ease both;
        }

        .answerHeader {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 13px 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          color: #67e8f9;
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 0.16em;
        }

        .answerDot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #22d3ee;
          box-shadow: 0 0 9px rgba(34, 211, 238, 0.7);
        }

        .answerText {
          padding: 19px;
          color: #cbd5e1;
          font-size: 13px;
          line-height: 1.85;
          white-space: pre-wrap;
        }

        .textDetails {
          margin-top: 15px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.018);
          overflow: hidden;
        }

        .textDetails summary {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 18px;
          color: #64748b;
          font-size: 11px;
          cursor: pointer;
          list-style: none;
          transition: 0.2s ease;
        }

        .textDetails summary::-webkit-details-marker {
          display: none;
        }

        .textDetails summary:hover {
          color: #cbd5e1;
          background: rgba(255, 255, 255, 0.025);
        }

        .textDetails summary > span:first-child {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .textDetails summary b {
          color: #8b5cf6;
        }

        .detailsArrow {
          font-size: 18px;
          transition: 0.25s ease;
        }

        .textDetails[open] .detailsArrow {
          transform: rotate(45deg);
        }

        .extractedText {
          max-height: 400px;
          overflow: auto;
          padding: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          color: #64748b;
          font-family: monospace;
          font-size: 11px;
          line-height: 1.7;
          white-space: pre-wrap;
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
          background: rgba(255, 255, 255, 0.04);
          font-size: 20px;
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

        .capabilitySection {
          margin-top: 15px;
        }

        .capabilities {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
        }

        .capabilities span {
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

        .capabilities span:hover {
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

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes documentScan {
          0%,
          100% {
            transform: translateY(-38px);
            opacity: 0.25;
          }

          50% {
            transform: translateY(38px);
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

          .uploadCard {
            padding: 21px;
            border-radius: 19px;
          }

          .uploadTop {
            gap: 15px;
          }

          .documentIcon {
            display: none;
          }

          .uploadTop h2 {
            font-size: 21px;
          }

          .uploadZone {
            min-height: 205px;
          }

          .uploadFooter {
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

          .processingSteps {
            justify-content: center;
          }

          .summaryHeader {
            flex-direction: column;
            padding: 21px;
          }

          .summaryBody {
            padding: 20px;
          }

          .questionCard {
            padding: 21px;
          }

          .questionHeader {
            gap: 12px;
          }

          .chatIcon {
            display: none;
          }

          .questionBottom {
            flex-direction: column;
            align-items: stretch;
          }

          .askButton {
            width: 100%;
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