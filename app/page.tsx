import { ArchitectureFlow } from "@/components/architecture-flow";
import { IssueForm } from "@/components/issue-form";

export default function Home() {
  return (
    <main>
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6 sm:px-8">
        <a href="#workspace" className="flex items-center gap-2.5 font-semibold tracking-tight text-slate-950"><span className="grid size-8 place-items-center rounded-lg bg-slate-950 text-sm text-white">R</span>ResolveAI</a>
        <div className="hidden items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-800 sm:flex"><span className="size-1.5 rounded-full bg-emerald-500" />RAG-powered support intelligence</div>
      </header>
      <section className="mx-auto max-w-6xl px-5 pb-14 pt-12 sm:px-8 sm:pt-20"><div className="max-w-3xl"><p className="eyebrow">Grounded issue resolution</p><h1 className="mt-4 text-4xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-6xl">Resolve support issues with grounded AI.</h1><p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">ResolveAI combines semantic retrieval and Gemini to generate actionable resolutions grounded in verified support knowledge.</p><div className="mt-7 flex flex-wrap gap-2" aria-label="Technology used">{["Gemini", "RAG", "PostgreSQL", "pgvector", "Next.js"].map((technology) => <span key={technology} className="tech-chip">{technology}</span>)}</div></div></section>
      <section id="workspace" className="mx-auto max-w-6xl px-5 pb-16 sm:px-8"><IssueForm /></section>
      <section className="border-y border-slate-200 bg-white/60"><div className="mx-auto max-w-6xl px-5 py-14 sm:px-8"><div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="eyebrow">Retrieval-augmented generation</p><h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">How each resolution is grounded</h2></div><p className="max-w-lg text-sm leading-6 text-slate-600">ResolveAI retrieves relevant knowledge before generating an answer, reducing unsupported responses compared with an ungrounded chatbot.</p></div><ArchitectureFlow /></div></section>
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8"><p className="eyebrow">How it works</p><div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[["01", "Describe an issue", "Share the support or technical problem in your own words."], ["02", "Retrieve knowledge", "Relevant documentation is found with semantic vector search."], ["03", "Generate a resolution", "Gemini uses the retrieved context to form next steps."], ["04", "Verify the sources", "The retrieved documents stay visible alongside the answer."]].map(([number, title, body]) => <article key={number} className="rounded-2xl border border-slate-200 bg-white p-5"><span className="text-xs font-semibold text-indigo-700">{number}</span><h3 className="mt-6 font-semibold text-slate-900">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{body}</p></article>)}</div></section>
    </main>
  );
}
