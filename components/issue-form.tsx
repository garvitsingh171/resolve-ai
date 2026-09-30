"use client";

import { useEffect, useState } from "react";
import { ResolutionCard, type ResolveResponse } from "@/components/resolution-card";

const examples = ["Payment deducted but order failed", "Password reset but unable to sign in", "API token returning HTTP 401"];
const stages = ["Understanding issue", "Searching knowledge base", "Retrieving relevant context", "Generating resolution"];

export function IssueForm() {
  const [issue, setIssue] = useState("");
  const [result, setResult] = useState<ResolveResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (!isLoading) return;
    const interval = window.setInterval(() => setStage((current) => Math.min(current + 1, stages.length - 1)), 900);
    return () => window.clearInterval(interval);
  }, [isLoading]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null); setResult(null); setStage(0); setIsLoading(true);
    try {
      const response = await fetch("/api/resolve", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ issue }) });
      const body: unknown = await response.json();
      if (!response.ok || !isResolveResponse(body)) throw new Error(isErrorResponse(body) ? body.error : "Unable to resolve this issue.");
      setResult(body);
    } catch (caught) { setError(caught instanceof Error ? caught.message : "Unable to resolve this issue."); }
    finally { setIsLoading(false); }
  }

  return <><section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_18px_45px_-30px_rgba(15,23,42,.35)] sm:p-8"><div className="flex items-center justify-between gap-3"><div><h2 className="text-xl font-semibold tracking-tight text-slate-950">Issue workspace</h2><p className="mt-1 text-sm text-slate-600">Describe the problem. Your resolution will show the retrieved sources.</p></div><span className="hidden rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700 sm:block">Knowledge-grounded</span></div><form onSubmit={handleSubmit} className="mt-7"><label htmlFor="issue" className="text-sm font-semibold text-slate-800">Describe the issue</label><textarea id="issue" value={issue} onChange={(event) => setIssue(event.target.value)} required minLength={10} maxLength={2000} rows={6} disabled={isLoading} placeholder="My payment failed but the amount was deducted from my bank account..." className="mt-2 w-full resize-y rounded-xl border border-slate-300 bg-slate-50 p-4 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-60" /><div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div className="flex flex-wrap gap-2" aria-label="Example issues">{examples.map((example) => <button type="button" key={example} disabled={isLoading} onClick={() => setIssue(example)} className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 disabled:opacity-50">{example}</button>)}</div><button type="submit" disabled={isLoading || issue.trim().length < 10} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-45">{isLoading && <span className="size-3 animate-spin rounded-full border-2 border-white/40 border-t-white" />} {isLoading ? "Resolving issue" : "Resolve issue"}</button></div></form>{isLoading && <ol aria-label="Resolution progress" className="mt-7 grid gap-2 border-t border-slate-100 pt-5 sm:grid-cols-4">{stages.map((name, index) => <li key={name} className={`flex items-center gap-2 text-sm ${index <= stage ? "font-medium text-indigo-700" : "text-slate-400"}`}><span className={`grid size-5 place-items-center rounded-full text-[10px] ${index <= stage ? "bg-indigo-100" : "bg-slate-100"}`}>{index < stage ? "✓" : index + 1}</span>{name}</li>)}</ol>}{error && <p role="alert" className="mt-5 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">{error}</p>}</section>{result && <ResolutionCard result={result} />}</>;
}

function isErrorResponse(value: unknown): value is { error: string } { return typeof value === "object" && value !== null && "error" in value && typeof value.error === "string"; }
function isResolveResponse(value: unknown): value is ResolveResponse { return typeof value === "object" && value !== null && "resolution" in value && "sources" in value; }
