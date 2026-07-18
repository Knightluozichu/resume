"use client";

import { useMemo, useState } from "react";

const formCases = [
  { label: "GET empty form", method: "GET", csrf: "template token rendered", binding: "TopicForm() unbound", validation: "not run", outcome: "HTTP 200 form" },
  { label: "POST invalid", method: "POST", csrf: "valid token", binding: "TopicForm(data=request.POST)", validation: "text required → error", outcome: "HTTP 200 bound form + errors" },
  { label: "POST valid", method: "POST", csrf: "valid token", binding: "TopicForm(data=request.POST)", validation: "cleaned_data valid", outcome: "save → redirect topics" },
  { label: "POST no CSRF", method: "POST", csrf: "missing/invalid", binding: "view not trusted", validation: "rejected before view", outcome: "HTTP 403" },
];

export function PccFormLifecycleLab() {
  const [selected, setSelected] = useState(0);
  const item = formCases[selected];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="block text-sm text-primary">request case<select value={selected} onChange={(event) => setSelected(Number(event.target.value))} className="mt-2 min-h-11 w-full border border-border bg-bg px-3">{formCases.map((entry, index) => <option key={entry.label} value={index}>{entry.label}</option>)}</select></label>
        <div className="mt-4 grid gap-2 sm:grid-cols-5">{[["method", item.method], ["CSRF", item.csrf], ["binding", item.binding], ["validation", item.validation], ["outcome", item.outcome]].map(([label, value], index) => <div key={label} className={`min-h-28 border p-3 ${index === 4 ? "border-emerald-500/40 bg-emerald-500/10" : "border-border bg-bg"}`}><span className="text-xs text-secondary">{index + 1}. {label}</span><p className="mt-2 text-xs leading-5 text-primary">{value}</p></div>)}</div>
        <p className="mt-3 text-xs leading-5 text-secondary">valid POST保存后redirect，browser随后GET新URL；refresh不会重复提交。invalid POST保留bound data与field errors。</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">切换GET、invalid/valid POST与CSRF failure，追踪form binding、validation和response。</figcaption>
    </figure>
  );
}

const authActions = [
  { label: "register", allowed: "anonymous", effect: "create User → login() → session stores user id", next: "authenticated" },
  { label: "login", allowed: "anonymous", effect: "authenticate credentials → rotate session → set user", next: "authenticated" },
  { label: "logout", allowed: "authenticated", effect: "flush auth session", next: "anonymous" },
  { label: "visit protected", allowed: "authenticated", effect: "login_required checks request.user", next: "authenticated or redirect login" },
];

export function PccAuthSessionLab() {
  const [authenticated, setAuthenticated] = useState(false);
  const [selected, setSelected] = useState(0);
  const item = authActions[selected];
  const execute = () => {
    if (selected === 0 || selected === 1) setAuthenticated(true);
    if (selected === 2) setAuthenticated(false);
  };
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-3"><div className={`border p-4 text-center ${!authenticated ? "border-cyan-500 bg-cyan-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>AnonymousUser</div><div className={`border p-4 text-center ${authenticated ? "border-emerald-500 bg-emerald-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>Authenticated User</div></div>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{authActions.map((action, index) => <button key={action.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-violet-500 bg-violet-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{action.label}</button>)}</div>
        <div className="mt-3 grid gap-3 sm:grid-cols-[2fr_1fr]"><p className="border border-border bg-bg p-3 text-sm leading-6 text-primary">allowed from: {item.allowed}<br />effect: {item.effect}<br />next: {item.next}</p><button type="button" onClick={execute} className="min-h-20 border border-primary bg-primary px-3 text-sm text-bg">执行 action</button></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">执行register、login、logout与protected visit，观察session authentication状态。</figcaption>
    </figure>
  );
}

export function PccOwnershipAuthorizationLab() {
  const [user, setUser] = useState<"anonymous" | "alice" | "bob">("alice");
  const [owner, setOwner] = useState<"alice" | "bob">("alice");
  const [action, setAction] = useState<"view-list" | "view-detail" | "edit">("edit");
  const decision = useMemo(() => {
    if (user === "anonymous") return { result: "redirect login", reason: "authentication gate fails", color: "border-amber-500/40 bg-amber-500/10" };
    if (user !== owner) return { result: "HTTP 404", reason: "object owner mismatch", color: "border-rose-500/40 bg-rose-500/10" };
    return { result: "allow", reason: `${user} owns object and may ${action}`, color: "border-emerald-500/40 bg-emerald-500/10" };
  }, [user, owner, action]);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-3 sm:grid-cols-3"><label className="text-sm text-primary">request.user<select value={user} onChange={(event) => setUser(event.target.value as typeof user)} className="mt-2 min-h-11 w-full border border-border bg-bg px-3"><option>anonymous</option><option>alice</option><option>bob</option></select></label><label className="text-sm text-primary">object.owner<select value={owner} onChange={(event) => setOwner(event.target.value as typeof owner)} className="mt-2 min-h-11 w-full border border-border bg-bg px-3"><option>alice</option><option>bob</option></select></label><label className="text-sm text-primary">action<select value={action} onChange={(event) => setAction(event.target.value as typeof action)} className="mt-2 min-h-11 w-full border border-border bg-bg px-3"><option value="view-list">view-list</option><option value="view-detail">view-detail</option><option value="edit">edit</option></select></label></div>
        <div className={`mt-4 border p-4 ${decision.color}`}><strong className="text-lg text-primary">{decision.result}</strong><p className="mt-2 text-sm text-primary">{decision.reason}</p></div>
        <p className="mt-3 text-xs leading-5 text-secondary">authentication只确认identity；每次query还要scope到owner。404可避免向非owner泄露object是否存在。</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">组合current user、object owner与action，验证authentication和object-level authorization。</figcaption>
    </figure>
  );
}
