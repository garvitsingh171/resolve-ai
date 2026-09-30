const stages = ["Issue", "Embedding", "Vector search", "Relevant context", "Gemini", "Grounded resolution"];
export function ArchitectureFlow() {
  return <ol className="mt-9 grid gap-3 sm:grid-cols-6">{stages.map((stage, index) => <li key={stage} className="relative rounded-xl border border-slate-200 bg-white px-3 py-4 text-center shadow-sm"><span className="text-xs font-semibold text-indigo-600">0{index + 1}</span><p className="mt-1 text-sm font-semibold text-slate-800">{stage}</p>{index < stages.length - 1 && <span className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-slate-300 sm:block" aria-hidden="true">→</span>}</li>)}</ol>;
}
