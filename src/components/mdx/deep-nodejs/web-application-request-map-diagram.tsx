"use client";

import { useState } from "react";

type LensId = "request" | "middleware" | "output";

type Lens = {
  id: LensId;
  label: string;
  question: string;
  evidence: string;
  accent: string;
  concepts: readonly string[];
};

const CHAPTER_CONCEPTS =
  "第8章 构建Web应用; 8.1 基础功能; 8.1.1 请求方法; 8.1.2 路径解析; 8.1.3 查询字符串; 8.1.4 Cookie; 8.1.5 Session; 8.1.6 缓存; 8.1.7 Basic认证; 8.2 数据上传; 8.2.1 表单数据; 8.2.2 其他格式; 8.2.3 附件上传; 8.2.4 数据上传与安全; 8.3 路由解析; 8.3.1 文件路径型; 8.3.2 MVC; 8.3.3 RESTful; 8.4 中间件; 8.4.1 异常处理; 8.4.2 中间件与性能; 8.4.3 小结; 8.5 页面渲染; 8.5.1 内容响应; 8.5.2 视图渲染; 8.5.3 模板; 8.5.4 BigPipe; 8.6 总结; 8.7 参考资源";

const LENSES: readonly Lens[] = [
  {
    id: "request",
    label: "Request / identity",
    question: "不可信输入怎样变成已验证的 principal 与可匹配 route？",
    evidence: "method/path/query schema + cookie flags + session rotation + cache scope + auth decision",
    accent: "var(--accent)",
    concepts: [
      "第8章 构建Web应用",
      "8.1 基础功能",
      "8.1.1 请求方法",
      "8.1.2 路径解析",
      "8.1.3 查询字符串",
      "8.1.4 Cookie",
      "8.1.5 Session",
      "8.1.6 缓存",
      "8.1.7 Basic认证",
    ],
  },
  {
    id: "middleware",
    label: "Upload / middleware",
    question: "body、附件和中间件链怎样受限，并且只产生一个响应？",
    evidence: "body/field/file limits + temp owner + parser state + next/error guard + deadline budget",
    accent: "var(--warning)",
    concepts: [
      "8.2 数据上传",
      "8.2.1 表单数据",
      "8.2.2 其他格式",
      "8.2.3 附件上传",
      "8.2.4 数据上传与安全",
      "8.3 路由解析",
      "8.3.1 文件路径型",
      "8.3.2 MVC",
      "8.3.3 RESTful",
      "8.4 中间件",
      "8.4.1 异常处理",
    ],
  },
  {
    id: "output",
    label: "Render / recovery",
    question: "内容、模板和分块响应如何编码、缓存并在失败时收敛？",
    evidence: "context encoder + header commit + chunk order + private cache + cleanup/replay trace",
    accent: "var(--success)",
    concepts: [
      "8.4.2 中间件与性能",
      "8.4.3 小结",
      "8.5 页面渲染",
      "8.5.1 内容响应",
      "8.5.2 视图渲染",
      "8.5.3 模板",
      "8.5.4 BigPipe",
      "8.6 总结",
      "8.7 参考资源",
    ],
  },
];

const CONCEPTS = CHAPTER_CONCEPTS.split("; ");

export function DnjWebApplicationRequestMapDiagram() {
  const [activeId, setActiveId] = useState<LensId>("request");
  const activeLens = LENSES.find((lens) => lens.id === activeId) ?? LENSES[0];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6 overflow-hidden rounded-card border border-border bg-elevated">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
        <div>
          <p className="text-xs font-medium text-accent">Web Application 请求图</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">从不可信请求走到唯一响应</h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-secondary">
            切换 request/identity、upload/middleware 或 render/recovery 视角，观察目录节点如何落到输入边界、身份和输出证据。
          </p>
        </div>
        <button
          type="button"
          aria-label="重置 Web Application 请求图"
          onClick={() => setActiveId("request")}
          className="min-h-11 rounded-control border border-border px-4 py-2 text-sm font-medium text-secondary transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          重置
        </button>
      </header>

      <div className="border-b border-border p-4">
        <div role="tablist" aria-label="Web Application 验收视角" className="grid gap-2 md:grid-cols-3">
          {LENSES.map((lens) => {
            const selected = lens.id === activeId;
            return (
              <button
                key={lens.id}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-pressed={selected}
                onClick={() => setActiveId(lens.id)}
                className={`min-h-11 rounded-control border px-3 py-3 text-left text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                  selected
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border text-secondary hover:border-accent hover:text-primary"
                }`}
              >
                {lens.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-4">
        <svg
          viewBox="0 0 560 860"
          role="img"
          aria-label={`Web Application request map. Active lens: ${activeLens.label}. Formal concepts: ${CHAPTER_CONCEPTS}`}
          className="mx-auto block h-auto w-full max-w-[760px]"
        >
          <title>Web Application request map</title>
          <text x="280" y="28" textAnchor="middle" fill="var(--text-primary)" fontSize="17" fontWeight="700">
            request → identity → route → response
          </text>
          <text x="280" y="50" textAnchor="middle" fill="var(--text-secondary)" fontSize="12">
            normalize、authenticate、middleware、encode 与 recover
          </text>

          {["untrusted input", "normalized request", "authorized handler", "encoded output"].map((stage, index) => {
            const x = 20 + index * 136;
            return (
              <g key={stage}>
                <rect
                  x={x}
                  y="68"
                  width="112"
                  height="34"
                  rx="9"
                  fill="var(--bg)"
                  stroke={index === 2 ? activeLens.accent : "var(--border)"}
                  strokeWidth={index === 2 ? "1.8" : "1"}
                />
                <text x={x + 56} y="90" textAnchor="middle" fill="var(--text-primary)" fontSize="11" fontWeight="600">
                  {stage}
                </text>
                {index < 3 && <path d={`M${x + 116} 85 H${x + 130}`} stroke="var(--text-secondary)" strokeWidth="1.5" />}
              </g>
            );
          })}

          {CONCEPTS.map((concept, index) => {
            const column = index % 3;
            const row = Math.floor(index / 3);
            const x = 20 + column * 176;
            const y = 126 + row * 44;
            const highlighted = activeLens.concepts.includes(concept);
            return (
              <g key={concept} opacity={highlighted ? 1 : 0.66}>
                <rect
                  x={x}
                  y={y}
                  width="168"
                  height="34"
                  rx="8"
                  fill={highlighted ? activeLens.accent : "var(--bg)"}
                  fillOpacity={highlighted ? "0.1" : "1"}
                  stroke={highlighted ? activeLens.accent : "var(--border)"}
                  strokeWidth={highlighted ? "1.8" : "1"}
                />
                <circle cx={x + 13} cy={y + 17} r="4.5" fill={highlighted ? activeLens.accent : "var(--border)"} />
                <text x={x + 24} y={y + 22} fill="var(--text-primary)" fontSize="11" fontWeight={highlighted ? "700" : "500"}>
                  {concept}
                </text>
              </g>
            );
          })}

          <path d="M20 566 H540" stroke="var(--border)" strokeWidth="1" strokeDasharray="5 5" />
          <text x="280" y="591" textAnchor="middle" fill={activeLens.accent} fontSize="12" fontWeight="700">
            {activeLens.label}
          </text>
          <text x="280" y="614" textAnchor="middle" fill="var(--text-primary)" fontSize="11">
            {activeLens.question}
          </text>
          <text x="280" y="638" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            {activeLens.evidence}
          </text>

          <rect x="20" y="668" width="520" height="122" rx="10" fill="var(--bg)" stroke="var(--border)" />
          <text x="40" y="694" fill="var(--text-primary)" fontSize="12" fontWeight="700">
            Web boundary gate
          </text>
          <text x="40" y="717" fill="var(--text-secondary)" fontSize="11">
            request：先限长、解析、schema 验证，再让 route 看到 typed input 和 principal。
          </text>
          <text x="40" y="739" fill="var(--text-secondary)" fontSize="11">
            middleware：next、response、error 只能选一条；upload 临时资源必须有 owner 和 cleanup。
          </text>
          <text x="40" y="761" fill="var(--text-secondary)" fontSize="11">
            output：按上下文编码，private cache 隔离身份，stream/chunk 失败也要收敛 trace。
          </text>
          <text x="280" y="824" textAnchor="middle" fill="var(--text-secondary)" fontSize="11">
            请求可以失败，但不能无界、无主或完成两次
          </text>
        </svg>
      </div>
      <figcaption className="border-t border-border px-4 pb-4 text-center text-xs leading-relaxed text-secondary">
        图 8-1：Web 应用请求路径；把输入规范化、身份恢复、路由、中间件和上下文输出放入同一张可重放状态图。
      </figcaption>
    </figure>
  );
}
