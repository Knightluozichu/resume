"use client";

import { useCallback, useMemo, useState } from "react";

const C = {
  bg: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  accent: "var(--accent)",
  danger: "var(--danger)",
  success: "var(--success)",
  warning: "var(--warning)",
} as const;

// 概念领域词汇：contract stack / layer / consumer / frame / record / request
//                / state lifetime / invariant / evidence / producer / consumer
//                / boundary / identity / release / lineage —— 贯穿数据与注释。

// ---- 模式1：program contract stack（第1–11章六层 → 三项目消费）----
type StackLayer = {
  id: string;
  layer: string;
  chapters: string;
  provides: string;
};

const STACK_LAYERS: StackLayer[] = [
  { id: "test", layer: "tests / oracle", chapters: "ch11", provides: "pytest+fixture 隔离" },
  { id: "boundary", layer: "I/O boundary", chapters: "ch10", provides: "file/JSON/exception" },
  { id: "abstraction", layer: "function · class", chapters: "ch8–9", provides: "ownership+invariant" },
  { id: "control", layer: "control state", chapters: "ch5–7", provides: "branch/loop/dict/while" },
  { id: "value", layer: "values", chapters: "ch2–4", provides: "string/number/list/slice" },
  { id: "env", layer: "environment", chapters: "ch1", provides: "interpreter/executable" },
];

type ConsumerProject = {
  id: string;
  name: string;
  colors: string;
  consumesTop: string[]; // 重点消费的层 id
};

const PROJECTS: ConsumerProject[] = [
  { id: "alien", name: "Alien Invasion", colors: "accent", consumesTop: ["control", "abstraction", "value"] },
  { id: "data", name: "Data Visualization", colors: "accent", consumesTop: ["boundary", "value", "abstraction"] },
  { id: "web", name: "Learning Log", colors: "accent", consumesTop: ["abstraction", "boundary", "test"] },
];

// ---- 模式2：三项目验收矩阵 ----
type MatrixRow = { dim: string; cells: [string, string, string] };
const ACCEPT_MATRIX: MatrixRow[] = [
  {
    dim: "state lifetime",
    cells: ["跨 frame 持续 tick", "跨 record 流到 artifact", "跨 request/session/db"],
  },
  {
    dim: "owner / invariant",
    cells: ["每帧 transition 唯一 owner", "accepted+skipped=raw 守恒", "server 设置 owner"],
  },
  {
    dim: "typical failure",
    cells: ["bullet leak / 双倍 transition", "valid-empty vs invalid response", "IDOR / cross-user write"],
  },
  {
    dim: "evidence",
    cells: ["state trace snapshot", "lineage report + chart", "two-user matrix + release log"],
  },
];

const MATRIX_PROJECTS = ["Alien Invasion", "Data Visualization", "Learning Log"];

// ---- 模式3：Failure taxonomy → 证据 ----
type FailureCat = {
  id: string;
  cat: string;
  evidence: string;
  example: string;
};

const FAILURE_CATS: FailureCat[] = [
  { id: "environment", cat: "Environment failure", evidence: "executable/config/secret 名", example: "DEBUG=False 与 allowed hosts 配错" },
  { id: "syntax", cat: "Syntax/type failure", evidence: "异常类型+行号", example: "form 字段拼写导致 binding 失败" },
  { id: "state", cat: "State failure", evidence: "before/event/after trace", example: "bullet 越界未清除，Group 无界增长" },
  { id: "boundary", cat: "Boundary failure", evidence: "counts/path/status 守恒", example: "API 200 但 JSON schema drift" },
  { id: "identity", cat: "Identity failure", evidence: "user-object-action matrix", example: "other user 可构造 URL 直写 Entry" },
  { id: "release", cat: "Release failure", evidence: "commit 绑定 build/migration/health", example: "本地过 static，线上 collectstatic 失败" },
];

const VIEW_W = 860;
const VIEW_H = 384;

export function PccFinalReviewLab() {
  const [mode, setMode] = useState<"stack" | "matrix" | "failure">("stack");
  const [stackSel, setStackSel] = useState<string>("state"); // layer id 或 project id
  const [cellSel, setCellSel] = useState<{ row: number; col: number }>({ row: 0, col: 0 });
  const [failSel, setFailSel] = useState("boundary");
  const [faultOn, setFaultOn] = useState(false);

  const reset = useCallback(() => {
    setStackSel("state");
    setCellSel({ row: 0, col: 0 });
    setFailSel("boundary");
    setFaultOn(false);
  }, []);

  const layer = STACK_LAYERS.find((l) => l.id === stackSel);
  const project = PROJECTS.find((p) => p.id === stackSel);
  const failCat = FAILURE_CATS.find((f) => f.id === failSel) ?? FAILURE_CATS[0];

  let infoTitle = "20 章综合验收：contract stack / 三项目矩阵 / 故障分类";
  let infoBody = "切换三个视图，点层、点格子或点故障类，看证据需求如何随项目与错误类型改变。";
  if (mode === "stack") {
    if (layer) {
      infoTitle = `层：${layer.layer}（${layer.chapters}）`;
      infoBody = `提供 ${layer.provides}；${PROJECTS.filter((p) => p.consumesTop.includes(layer.id)).map((p) => p.name).join("、") || "所有项目"} 重点消费此层。`;
    } else if (project) {
      infoTitle = `项目：${project.name}`;
      infoBody = `重点消费层：${project.consumesTop.map((id) => STACK_LAYERS.find((l) => l.id === id)?.layer).join("、")}；缺口通常在项目里才放大暴露。`;
    }
  } else if (mode === "matrix") {
    const row = ACCEPT_MATRIX[cellSel.row];
    infoTitle = `${MATRIX_PROJECTS[cellSel.col]} × ${row.dim}`;
    infoBody = row.cells[cellSel.col] + "；同一维度三个项目的 promise 形状不同，evidence 不能用同一张截图替代。";
  } else {
    infoTitle = `${failCat.cat} → 证据`;
    infoBody = `证据型：${failCat.evidence}；实例：${failCat.example}。先分类再收证据，避免修错层。`;
  }

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-medium" style={{ color: C.primary }}>
          ⚡ 20 章综合验收：栈层 × 项目矩阵 × 故障分类
        </span>
        <button
          onClick={reset}
          className="rounded-control border border-border px-3 py-1 text-xs transition-colors hover:border-accent"
          style={{ color: C.secondary }}
        >
          重置
        </button>
      </div>

      <div className="p-4">
        {/* 模式切换 */}
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {(["stack", "matrix", "failure"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`rounded-control border px-3 py-1.5 text-xs font-medium transition-colors ${
                mode === m ? "border-accent bg-accent/10" : "border-border hover:border-accent"
              }`}
              style={{ color: mode === m ? C.accent : C.secondary }}
            >
              {m === "stack" ? "contract stack" : m === "matrix" ? "三项目矩阵" : "故障分类"}
            </button>
          ))}
        </div>

        {mode === "stack" ? (
          <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="w-full" role="img" aria-label="program contract stack 六层与三个项目消费关系，点层或点项目高亮">
            <text x={VIEW_W / 2} y={26} textAnchor="middle" fontSize={15} fontWeight={600} fill={C.primary}>
              program contract stack：第1–11章六层 → 三个项目消费
            </text>
            <text x={VIEW_W / 2} y={46} textAnchor="middle" fontSize={11} fill={C.secondary}>
              上层消费更上面是 oracle；项目同时依赖多层，某个项目缺口会回退到具体层
            </text>

            {/* 左：六层栈 */}
            {STACK_LAYERS.map((l, i) => {
              const x = 60;
              const w = 360;
              const h = 42;
              const y = 300 - i * (h + 6);
              const active = stackSel === l.id;
              const consumedBySel = project?.consumesTop.includes(l.id);
              const color = active ? C.accent : consumedBySel ? C.warning : C.border;
              return (
                <g key={`layer-${l.id}`} onClick={(e) => e.currentTarget ? undefined : undefined} opacity={active || !stackSel || consumedBySel ? 1 : 0.55}>
                  <rect x={x} y={y} width={w} height={h} rx={6}
                    fill={active ? C.accent : C.elevated} fillOpacity={active ? 0.14 : 1}
                    stroke={color} strokeWidth={active ? 2 : consumedBySel ? 1.8 : 1.2} />
                  <text x={x + 12} y={y + 18} fontSize={12} fontWeight={700} fill={C.primary}>{l.layer}</text>
                  <text x={x + 12} y={y + 34} fontSize={11} fill={C.secondary}>{l.chapters} · {l.provides}</text>
                </g>
              );
            })}

            {/* 右：三项目列 + 连线 */}
            {PROJECTS.map((p, i) => {
              const x = 500 + i * 110;
              const y = 120;
              const active = stackSel === p.id;
              return (
                <g key={`proj-${p.id}`} opacity={active || !layer || p.consumesTop.includes(stackSel) ? 1 : 0.5}>
                  <rect x={x} y={y} width={100} height={64} rx={8}
                    fill={active ? C.accent : C.elevated} fillOpacity={active ? 0.14 : 1}
                    stroke={active ? C.accent : C.border} strokeWidth={active ? 2 : 1.5} />
                  <text x={x + 50} y={y + 26} textAnchor="middle" fontSize={11} fontWeight={700} fill={C.primary}>
                    {p.name.split(" ")[0]}
                  </text>
                  <text x={x + 50} y={y + 42} textAnchor="middle" fontSize={11} fill={C.secondary}>
                    {p.name.split(" ").slice(1).join(" ") || "project"}
                  </text>
                  {/* 连向被重点消费的层 */}
                  {p.consumesTop.map((lid) => {
                    const li = STACK_LAYERS.findIndex((l) => l.id === lid);
                    const y2 = 300 - li * 48 + 21;
                    const highlight = active || stackSel === lid;
                    return (
                      <line key={`${p.id}-${lid}`} x1={x + 10} y1={y + 64} x2={420} y2={y2}
                        stroke={highlight ? C.accent : C.border} strokeWidth={highlight ? 2 : 1}
                        opacity={highlight ? 0.9 : 0.3} />
                    );
                  })}
                </g>
              );
            })}

            <text x={VIEW_W / 2} y={360} textAnchor="middle" fontSize={11} fill={C.secondary}>
              点层看哪些项目重点消费；点项目看它依赖的层（黄框）。缺口在项目里才放大暴露。
            </text>
          </svg>
        ) : mode === "matrix" ? (
          <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="w-full" role="img" aria-label="三项目验收矩阵，四维度对比，点格查看详情">
            <text x={VIEW_W / 2} y={26} textAnchor="middle" fontSize={15} fontWeight={600} fill={C.primary}>
              三项目验收矩阵：相同维度，不同 promise 形状
            </text>
            <text x={VIEW_W / 2} y={46} textAnchor="middle" fontSize={11} fill={C.secondary}>
              state lifetime / invariant / failure / evidence 四行 × 三项目列；点格读详情
            </text>

            {/* 表头 */}
            {MATRIX_PROJECTS.map((p, c) => (
              <text key={`h-${c}`} x={250 + c * 200} y={76} textAnchor="middle" fontSize={12} fontWeight={700} fill={C.primary}>
                {p}
              </text>
            ))}

            {/* 行 */}
            {ACCEPT_MATRIX.map((row, r) => {
              const y = 90 + r * 68;
              return (
                <g key={`row-${r}`}>
                  <text x={60} y={y + 30} fontSize={12} fontWeight={600} fill={C.secondary}>{row.dim}</text>
                  {row.cells.map((cell, c) => {
                    const active = cellSel.row === r && cellSel.col === c;
                    return (
                      <g key={`cell-${r}-${c}`} onClick={() => undefined}>
                        <rect x={150 + c * 200} y={y} width={188} height={56} rx={6}
                          fill={active ? C.accent : C.elevated} fillOpacity={active ? 0.14 : 1}
                          stroke={active ? C.accent : C.border} strokeWidth={active ? 2 : 1.2} />
                        <text x={244 + c * 200} y={y + 24} textAnchor="middle" fontSize={11} fontWeight={active ? 700 : 500} fill={C.primary}>
                          {cell.length > 22 ? cell.slice(0, 20) + "…" : cell}
                        </text>
                        <text x={244 + c * 200} y={y + 42} textAnchor="middle" fontSize={11} fill={C.secondary}>
                          {active ? "● 已选" : cell.length > 40 ? cell.slice(21, 40) + "…" : cell.slice(21)}
                        </text>
                      </g>
                    );
                  })}
                </g>
              );
            })}

            <text x={VIEW_W / 2} y={370} textAnchor="middle" fontSize={11} fill={C.secondary}>
              点击格子上方按钮下方即可选中；矩阵证明三者不能共用一套 evidence。
            </text>
          </svg>
        ) : (
          <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="w-full" role="img" aria-label="failure taxonomy 六类与对应证据类型">
            <text x={VIEW_W / 2} y={26} textAnchor="middle" fontSize={15} fontWeight={600} fill={C.primary}>
              failure taxonomy：先分类，再收对应证据
            </text>
            <text x={VIEW_W / 2} y={46} textAnchor="middle" fontSize={11} fill={C.secondary}>
              六类错误对应六种证据型；点一类看项目实例
            </text>

            {FAILURE_CATS.map((f, i) => {
              const col = i % 2;
              const row = Math.floor(i / 2);
              const x = 60 + col * 380;
              const y = 66 + row * 100;
              const active = failSel === f.id;
              return (
                <g key={`fail-${f.id}`}>
                  <rect x={x} y={y} width={360} height={90} rx={8}
                    fill={active ? C.danger : C.elevated} fillOpacity={active ? 0.1 : 1}
                    stroke={active ? C.danger : C.border} strokeWidth={active ? 2 : 1.2} />
                  <text x={x + 14} y={y + 22} fontSize={12} fontWeight={700} fill={active ? C.danger : C.primary}>
                    {f.cat}
                  </text>
                  <text x={x + 14} y={y + 44} fontSize={11} fill={C.secondary}>
                    证据：{f.evidence}
                  </text>
                  <text x={x + 14} y={y + 64} fontSize={11} fill={C.secondary}>
                    例：{f.example.length > 30 ? f.example.slice(0, 28) + "…" : f.example}
                  </text>
                  {active && <text x={x + 340} y={y + 22} textAnchor="end" fontSize={12} fill={C.danger}>●</text>}
                </g>
              );
            })}
          </svg>
        )}

        {/* 选择按钮行 */}
        {mode === "stack" ? (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {STACK_LAYERS.map((l) => (
              <button key={l.id} onClick={() => setStackSel(l.id)}
                className={`rounded-control border px-2.5 py-1 text-xs font-medium transition-colors ${stackSel === l.id ? "border-accent bg-accent/10" : "border-border hover:border-accent"}`}
                style={{ color: stackSel === l.id ? C.accent : C.secondary }}>{l.layer}</button>
            ))}
            <span className="mx-1 text-xs" style={{ color: C.secondary }}>|</span>
            {PROJECTS.map((p) => (
              <button key={p.id} onClick={() => setStackSel(p.id)}
                className={`rounded-control border px-2.5 py-1 text-xs font-medium transition-colors ${stackSel === p.id ? "border-accent bg-accent/10" : "border-border hover:border-accent"}`}
                style={{ color: stackSel === p.id ? C.accent : C.secondary }}>{p.name}</button>
            ))}
          </div>
        ) : mode === "matrix" ? (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {ACCEPT_MATRIX.map((row, r) => (
              <span key={`r${r}`} className="flex items-center gap-1">
                <span className="text-xs" style={{ color: C.secondary }}>{row.dim}:</span>
                {MATRIX_PROJECTS.map((_, c) => (
                  <button key={`${r}-${c}`} onClick={() => setCellSel({ row: r, col: c })}
                    className={`rounded-control border px-2 py-1 text-xs font-medium transition-colors ${cellSel.row === r && cellSel.col === c ? "border-accent bg-accent/10" : "border-border hover:border-accent"}`}
                    style={{ color: cellSel.row === r && cellSel.col === c ? C.accent : C.secondary }}>
                    {["A", "D", "L"][c]}
                  </button>
                ))}
              </span>
            ))}
          </div>
        ) : (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {FAILURE_CATS.map((f) => (
              <button key={f.id} onClick={() => setFailSel(f.id)}
                className={`rounded-control border px-2.5 py-1 text-xs font-medium transition-colors ${failSel === f.id ? "border-danger bg-danger/10" : "border-border hover:border-accent"}`}
                style={{ color: failSel === f.id ? C.danger : C.secondary }}>
                {f.cat.split(" ")[0]}
              </button>
            ))}
          </div>
        )}

        {/* 信息面板 */}
        <div className="mt-3 rounded-control border border-border p-3" style={{ background: C.bg }}>
          <div className="text-xs font-semibold" style={{ color: mode === "failure" ? C.danger : C.primary }}>
            {infoTitle}
          </div>
          <div className="mt-1 text-xs leading-relaxed" style={{ color: C.secondary }}>
            {infoBody}
          </div>
          {faultOn && (
            <div className="mt-2 text-xs leading-relaxed" style={{ color: C.danger }}>
              注入故障：用 CSS 隐藏 edit link 冒充 authorization——URL 可直接构造，真正边界必须在 query 里 scope owner，并用第二用户 fixture 验证 database 未变。
            </div>
          )}
        </div>

        {/* 故障注入开关 */}
        <label className="mt-3 flex cursor-pointer items-center gap-2 rounded-control border border-border p-3" style={{ background: C.bg }}>
          <input type="checkbox" checked={faultOn} onChange={(e) => setFaultOn(e.target.checked)} className="h-4 w-4 cursor-pointer" />
          <span className="text-xs" style={{ color: faultOn ? C.danger : C.secondary }}>
            注入故障：CSS 隐藏 link 冒充 authorization（边界必须在 query 层）
          </span>
        </label>
      </div>
    </div>
  );
}
