type Source = { id: number; title: string; category: string; similarity: number };
export function SourceCard({ source }: { source: Source }) {
  return <article className="rounded-xl border border-slate-200 bg-white p-4"><div className="flex items-start justify-between gap-3"><div><p className="font-medium text-slate-900">{source.title}</p><span className="mt-2 inline-block rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">{source.category}</span></div><span className="shrink-0 text-right text-xs text-slate-500"><strong className="block text-sm text-slate-800">{source.similarity.toFixed(2)}</strong>semantic similarity</span></div></article>;
}
