"use client";

import { useState } from "react";

const projectNodes = [
  { label: "manage.py", owner: "project command entry", detail: "选择DJANGO_SETTINGS_MODULE，执行runserver、migration、shell等commands。" },
  { label: "learning_log/settings.py", owner: "project configuration", detail: "INSTALLED_APPS、database、templates、static与security settings。" },
  { label: "learning_log/urls.py", owner: "root URL router", detail: "把admin与/路径include到不同apps。" },
  { label: "learning_logs/models.py", owner: "app domain model", detail: "Topic、Entry与ForeignKey关系。" },
  { label: "learning_logs/views.py", owner: "app request handler", detail: "查询model并选择template/context。" },
  { label: "templates/learning_logs", owner: "app presentation", detail: "base、index、topics与topic页面templates。" },
];

export function PccDjangoProjectAppLab() {
  const [selected, setSelected] = useState(0);
  const item = projectNodes[selected];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-2 sm:grid-cols-2">{projectNodes.map((node, index) => <button key={node.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-3 text-left text-xs ${selected === index ? "border-cyan-500 bg-cyan-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{node.label}</button>)}</div>
        <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_2fr]"><strong className="border border-violet-500/40 bg-violet-500/10 p-3 text-sm text-primary">{item.owner}</strong><p className="border border-border bg-bg p-3 text-sm leading-6 text-primary">{item.detail}</p></div>
        <p className="mt-3 text-xs leading-5 text-secondary">project提供site-level configuration；app封装可复用domain capability。app必须加入INSTALLED_APPS，root router必须include它的URLs。</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">选择文件，区分Django project配置、app领域逻辑与presentation职责。</figcaption>
    </figure>
  );
}

const migrationCases = [
  { label: "model changed", model: "Entry adds date_added", migration: "not created", database: "column absent", command: "python manage.py makemigrations learning_logs" },
  { label: "migration created", model: "desired state recorded", migration: "0002_entry_date_added.py", database: "still old schema", command: "python manage.py sqlmigrate learning_logs 0002" },
  { label: "migration applied", model: "matches migration graph", migration: "marked applied", database: "column exists", command: "python manage.py migrate" },
  { label: "drift failure", model: "expects new column", migration: "file exists", database: "migration not applied", command: "python manage.py showmigrations" },
];

export function PccMigrationWorkflowLab() {
  const [selected, setSelected] = useState(0);
  const item = migrationCases[selected];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="block text-sm text-primary">migration state<select value={selected} onChange={(event) => setSelected(Number(event.target.value))} className="mt-2 min-h-11 w-full border border-border bg-bg px-3">{migrationCases.map((entry, index) => <option key={entry.label} value={index}>{entry.label}</option>)}</select></label>
        <div className="mt-4 grid gap-3 sm:grid-cols-3"><div className="border border-cyan-500/40 bg-cyan-500/10 p-3"><span className="text-xs text-secondary">models.py</span><p className="mt-2 text-sm text-primary">{item.model}</p></div><div className="border border-amber-500/40 bg-amber-500/10 p-3"><span className="text-xs text-secondary">migration graph</span><p className="mt-2 text-sm text-primary">{item.migration}</p></div><div className="border border-emerald-500/40 bg-emerald-500/10 p-3"><span className="text-xs text-secondary">database schema</span><p className="mt-2 text-sm text-primary">{item.database}</p></div></div>
        <code className="mt-3 block border border-border bg-bg p-3 text-xs text-primary">{item.command}</code>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">切换model、migration file与database状态，理解makemigrations和migrate不是同一步。</figcaption>
    </figure>
  );
}

const requestCases = [
  { path: "/", pattern: "path('', views.index)", view: "render(request, 'index.html')", query: "no model query", template: "index.html extends base.html" },
  { path: "/topics/", pattern: "path('topics/', views.topics)", view: "topics = Topic.objects.order_by('date_added')", query: "SELECT topics ORDER BY date_added", template: "topics.html fills content block" },
  { path: "/topics/7/", pattern: "path('topics/<int:topic_id>/', views.topic)", view: "get_object_or_404(Topic, id=7)", query: "Topic + related entries", template: "topic.html reuses base navigation" },
];

export function PccDjangoRequestFlowLab() {
  const [selected, setSelected] = useState(1);
  const item = requestCases[selected];
  const stages = [["browser", item.path], ["URL pattern", item.pattern], ["view", item.view], ["ORM", item.query], ["template", item.template], ["response", "HTTP 200 HTML"]];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 border border-border">{requestCases.map((entry, index) => <button key={entry.path} type="button" onClick={() => setSelected(index)} className={`min-h-11 text-sm ${selected === index ? "bg-primary text-bg" : "bg-bg text-primary"}`}>{entry.path}</button>)}</div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">{stages.map(([label, value], index) => <div key={label} className={`min-h-24 border p-3 ${index === 5 ? "border-emerald-500/40 bg-emerald-500/10" : "border-border bg-bg"}`}><span className="text-xs text-secondary">{index + 1}. {label}</span><code className="mt-2 block break-words text-xs leading-5 text-primary">{value}</code></div>)}</div>
        <p className="mt-3 text-xs leading-5 text-secondary">base.html定义navigation与content block；child template只填充差异。URL name用于反向生成link，避免硬编码path。</p>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">切换页面路径，追踪URL dispatch、view、ORM、template inheritance与HTTP response。</figcaption>
    </figure>
  );
}
