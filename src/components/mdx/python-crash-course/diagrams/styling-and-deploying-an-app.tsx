"use client";

import { useState } from "react";

export function PccResponsiveShellLab() {
  const [mobile, setMobile] = useState(false);
  const [authenticated, setAuthenticated] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-3"><button type="button" onClick={() => { setMobile((value) => !value); setMenuOpen(false); }} className="min-h-11 border border-border bg-bg text-sm text-primary">viewport: {mobile ? "mobile" : "desktop"}</button><button type="button" onClick={() => setAuthenticated((value) => !value)} className="min-h-11 border border-border bg-bg text-sm text-primary">session: {authenticated ? "authenticated" : "anonymous"}</button></div>
        <div className={`mx-auto mt-4 overflow-hidden border border-border bg-bg ${mobile ? "max-w-[360px]" : "w-full"}`}>
          <nav className="flex min-h-14 items-center justify-between border-b border-border px-4"><strong className="text-primary">Learning Log</strong>{mobile ? <button type="button" onClick={() => setMenuOpen((value) => !value)} className="h-10 w-10 border border-border text-primary" aria-label="Toggle navigation">☰</button> : <div className="flex gap-4 text-sm text-secondary"><span>Topics</span><span>{authenticated ? "Log out" : "Log in"}</span>{!authenticated && <span>Register</span>}</div>}</nav>
          {mobile && menuOpen && <div className="grid border-b border-border bg-elevated p-3 text-sm text-secondary"><span className="py-2">Topics</span><span className="py-2">{authenticated ? "Log out" : "Log in"}</span>{!authenticated && <span className="py-2">Register</span>}</div>}
          <main className="p-4"><div className="border border-border p-4"><h3 className="text-base font-semibold text-primary">Track your learning.</h3><p className="mt-2 text-sm leading-6 text-secondary">Create topics and record what you learn.</p><button type="button" className="mt-3 min-h-11 border border-primary bg-primary px-4 text-sm text-bg">Add a new topic</button></div></main>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">切换viewport与session，检查responsive navbar、navigation state与主要command。</figcaption>
    </figure>
  );
}

const configCases = [
  { label: "development", debug: "True", secret: "local non-production", hosts: "localhost, 127.0.0.1", database: "SQLite", result: "fast local feedback" },
  { label: "production valid", debug: "False", secret: "required env secret", hosts: "deployed hostname", database: "managed PostgreSQL URL", result: "boot + health check" },
  { label: "missing secret", debug: "False", secret: "absent", hosts: "deployed hostname", database: "configured", result: "fail fast before serving" },
  { label: "bad allowed host", debug: "False", secret: "configured", hosts: "does not include request host", database: "configured", result: "DisallowedHost + log evidence" },
];

export function PccProductionConfigLab() {
  const [selected, setSelected] = useState(1);
  const item = configCases[selected];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="block text-sm text-primary">environment case<select value={selected} onChange={(event) => setSelected(Number(event.target.value))} className="mt-2 min-h-11 w-full border border-border bg-bg px-3">{configCases.map((entry, index) => <option key={entry.label} value={index}>{entry.label}</option>)}</select></label>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">{[["DEBUG", item.debug], ["SECRET_KEY", item.secret], ["ALLOWED_HOSTS", item.hosts], ["DATABASE", item.database]].map(([label, value]) => <div key={label} className="min-h-28 border border-border bg-bg p-3"><span className="text-xs text-secondary">{label}</span><p className="mt-2 text-xs leading-5 text-primary">{value}</p></div>)}</div>
        <strong className={`mt-3 block border p-3 text-sm ${item.result.includes("boot") || item.result.includes("feedback") ? "border-emerald-500/40 bg-emerald-500/10 text-primary" : "border-rose-500/40 bg-rose-500/10 text-primary"}`}>outcome: {item.result}</strong>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">切换environment，验证DEBUG、secrets、hosts和database不是一套配置到处复用。</figcaption>
    </figure>
  );
}

const deployStages = [
  { label: "Git commit", artifact: "reviewed source + lock/requirements", failure: "uncommitted config is never deployed" },
  { label: "Build", artifact: "Python runtime + installed dependencies", failure: "missing package/version causes import failure" },
  { label: "Collect static", artifact: "versioned static files", failure: "CSS/JS 404 while app HTML works" },
  { label: "Migrate", artifact: "database schema at release revision", failure: "code expects columns not yet present" },
  { label: "Start Gunicorn", artifact: "WSGI workers listening on platform socket", failure: "boot exception or wrong bind target" },
  { label: "Health + smoke", artifact: "200 home, login, static and logs", failure: "release rolls back or remains unhealthy" },
];

export function PccDeploymentPipelineLab() {
  const [stage, setStage] = useState(0);
  const [completed, setCompleted] = useState(0);
  const item = deployStages[stage];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{deployStages.map((entry, index) => <button key={entry.label} type="button" onClick={() => setStage(index)} className={`min-h-14 border px-2 text-xs ${stage === index ? "border-cyan-500 bg-cyan-500/15 text-primary" : index < completed ? "border-emerald-500/40 bg-emerald-500/10 text-primary" : "border-border bg-bg text-secondary"}`}>{index + 1}. {entry.label}</button>)}</div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2"><div className="border border-emerald-500/40 bg-emerald-500/10 p-3"><span className="text-xs text-secondary">expected artifact</span><p className="mt-2 text-sm leading-6 text-primary">{item.artifact}</p></div><div className="border border-rose-500/40 bg-rose-500/10 p-3"><span className="text-xs text-secondary">failure evidence</span><p className="mt-2 text-sm leading-6 text-primary">{item.failure}</p></div></div>
        <button type="button" onClick={() => setCompleted((value) => Math.min(deployStages.length, value + 1))} className="mt-3 min-h-11 w-full border border-primary bg-primary text-sm text-bg">完成下一个release gate ({completed}/{deployStages.length})</button>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">逐个通过build、static、schema、process和health gates，保留每一步artifact与failure evidence。</figcaption>
    </figure>
  );
}
