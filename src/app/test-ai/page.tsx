"use client";

import { useState } from "react";
import puter from "@heyputer/puter.js";

export default function TestAI() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function testPuter() {
    setLoading(true);
    setResult("");

    try {
      const response = await puter.ai.chat(
        "Reply with one short sentence confirming that Puter.js AI is working."
    );

        const data =
  typeof response === "string" ? JSON.parse(response) : response;

setResult(
  data.message?.content ?? "AI responded successfully."
);
    } catch (error) {
      setResult("Error: " + String(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-20 text-white">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-4xl font-bold">Puter.js AI Test</h1>

        <p className="mt-4 text-slate-400">
          We are testing whether EMMY AI can communicate with Puter.js.
        </p>

        <button
          onClick={testPuter}
          disabled={loading}
          className="mt-8 rounded-lg bg-white px-5 py-3 font-medium text-slate-950 disabled:opacity-50"
        >
          {loading ? "Testing AI..." : "Test Puter AI"}
        </button>

        {result && (
          <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-6">
            <h2 className="font-semibold">AI Response</h2>
            <p className="mt-3 whitespace-pre-wrap text-slate-300">
              {result}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}