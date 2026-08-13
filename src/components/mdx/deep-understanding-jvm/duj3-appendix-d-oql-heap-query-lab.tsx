"use client";

import { useId, useState } from "react";

const COLORS = {
  background: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
} as const;

const TARGETS = [
  {
    key: "class",
    label: "类实例",
    query: "instanceof java.util.HashMap",
    result: "命中 14 个实例",
    path: "root → cache → map",
  },
  {
    key: "field",
    label: "字段路径",
    query: "cache.entries[].value",
    result: "展开 6 条字段边",
    path: "root → service → cache → entry",
  },
  {
    key: "root",
    label: "GC Root路径",
    query: "path-to-gc-root(target)",
    result: "保留路径 1 条",
    path: "thread → threadLocal → target",
  },
] as const;

const LENSES = [
  {
    key: "snapshot",
    label: "快照",
    detail: "锁定时间、工具、进程和哈希",
  },
  {
    key: "query",
    label: "查询",
    detail: "保存完整条件、过滤和返回数量",
  },
  {
    key: "path",
    label: "保留路径",
    detail: "沿对象图回到 GC Root，不把命中当成保留",
  },
] as const;

type TargetKey = (typeof TARGETS)[number]["key"];
type LensKey = (typeof LENSES)[number]["key"];

export function Duj3AppendixDOqlHeapQueryLab() {
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const arrowId = `duj3-appendix-d-oql-heap-query-arrow-${instanceId}`;
  const [targetKey, setTargetKey] = useState<TargetKey>("class");
  const [lensKey, setLensKey] = useState<LensKey>("snapshot");
  const [staleSnapshot, setStaleSnapshot] = useState(false);

  const target = TARGETS.find((item) => item.key === targetKey) ?? TARGETS[0];
  const lens = LENSES.find((item) => item.key === lensKey) ?? LENSES[0];
  const verdict = staleSnapshot
    ? {
        color: COLORS.warning,
        title: "暂停结论：快照版本不一致",
        detail:
          "对象数量来自另一份现场，不能直接拼成当前保留路径。先恢复同一快照，再比较查询、对象图和根路径。",
      }
    : {
        color: COLORS.success,
        title: "证据链完整：可以继续分析",
        detail: `${target.label}当前聚焦“${lens.label}”：${lens.detail}。结论仍需带快照哈希、工具版本和生命周期记录。`,
      };

  function reset() {
    setTargetKey("class");
    setLensKey("snapshot");
    setStaleSnapshot(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="duj3-appendix-d-oql-heap-query-lab"
      data-unit-id="duj3-appendix-d-oql"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              DUJ3 · 附录 D
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              堆快照与 OQL 复核台
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              选择查询目标，再切换快照、查询和保留路径镜头；故障开关会制造跨快照误读。
            </p>
          </div>
          <button
            type="button"
            aria-label="重置堆快照与 OQL 复核台"
            onClick={reset}
            className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
          >
            重置
          </button>
        </div>

        <div className="mb-4 flex flex-wrap gap-2" aria-label="选择查询目标">
          <span className="self-center text-xs text-secondary">目标：</span>
          {TARGETS.map((item) => (
            <button
              key={item.key}
              type="button"
              aria-pressed={targetKey === item.key}
              onClick={() => setTargetKey(item.key)}
              className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors ${
                targetKey === item.key
                  ? "border-accent text-accent"
                  : "border-border text-secondary hover:border-accent hover:text-primary"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mb-4 grid gap-3 md:grid-cols-[1fr_auto]">
          <div className="flex flex-wrap gap-2" aria-label="选择分析镜头">
            <span className="self-center text-xs text-secondary">镜头：</span>
            {LENSES.map((item) => (
              <button
                key={item.key}
                type="button"
                aria-pressed={lensKey === item.key}
                onClick={() => setLensKey(item.key)}
                className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors ${
                  lensKey === item.key
                    ? "border-accent text-accent"
                    : "border-border text-secondary hover:border-accent hover:text-primary"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            aria-pressed={staleSnapshot}
            onClick={() => setStaleSnapshot((value) => !value)}
            className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors ${
              staleSnapshot
                ? "border-warning text-warning"
                : "border-border text-secondary hover:border-warning hover:text-warning"
            }`}
          >
            {staleSnapshot ? "恢复同一快照" : "注入快照版本不一致"}
          </button>
        </div>

        <svg
          aria-label="堆快照与 OQL 复核图：从快照输入连接到查询条件，再连接到对象图和 GC Root 保留路径；支持目标、镜头、跨快照故障和重置。"
          className="h-auto w-full"
          role="img"
          viewBox="0 0 760 560"
        >
          <defs>
            <marker
              id={arrowId}
              markerHeight="8"
              markerWidth="8"
              orient="auto"
              refX="6"
              refY="4"
              viewBox="0 0 8 8"
            >
              <path d="M0 0L8 4L0 8Z" fill={COLORS.secondary} />
            </marker>
          </defs>

          <rect
            fill={COLORS.background}
            height="520"
            rx="16"
            stroke={COLORS.border}
            width="720"
            x="20"
            y="20"
          />
          <text fill={COLORS.secondary} fontSize="13" x="48" y="54">
            当前：{target.label} · 只改变观察焦点，不改变快照输入
          </text>

          <line
            markerEnd={`url(#${arrowId})`}
            stroke={COLORS.secondary}
            strokeWidth="2"
            x1="204"
            x2="274"
            y1="216"
            y2="216"
          />
          <line
            markerEnd={`url(#${arrowId})`}
            stroke={COLORS.secondary}
            strokeWidth="2"
            x1="486"
            x2="556"
            y1="216"
            y2="216"
          />

          <g>
            <rect
              fill={lensKey === "snapshot" ? "var(--bg)" : COLORS.elevated}
              height="276"
              rx="12"
              stroke={lensKey === "snapshot" ? COLORS.accent : COLORS.border}
              strokeWidth={lensKey === "snapshot" ? "2" : "1"}
              width="224"
              x="40"
              y="88"
            />
            <text
              fill={COLORS.accent}
              fontSize="13"
              fontWeight="600"
              x="60"
              y="122"
            >
              快照输入
            </text>
            <text fill={COLORS.primary} fontSize="14" x="60" y="164">
              heap-2026-08.hprof
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="60" y="204">
              时间：UTC 记录
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="60" y="230">
              哈希：可复核
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="60" y="270">
              进程：PID 与版本
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="60" y="314">
              当前焦点：{lensKey === "snapshot" ? "是" : "否"}
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="60" y="340">
              生命周期：保留中
            </text>
          </g>

          <g>
            <rect
              fill={lensKey === "query" ? "var(--bg)" : COLORS.elevated}
              height="276"
              rx="12"
              stroke={lensKey === "query" ? COLORS.accent : COLORS.border}
              strokeWidth={lensKey === "query" ? "2" : "1"}
              width="224"
              x="268"
              y="88"
            />
            <text
              fill={COLORS.accent}
              fontSize="13"
              fontWeight="600"
              x="288"
              y="122"
            >
              查询与对象图
            </text>
            <text fill={COLORS.primary} fontSize="13" x="288" y="164">
              {target.query}
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="288" y="208">
              结果：{target.result}
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="288" y="248">
              过滤：条件已保存
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="288" y="288">
              节点：字段边可展开
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="288" y="330">
              当前焦点：{lensKey === "query" ? "是" : "否"}
            </text>
          </g>

          <g>
            <rect
              fill={lensKey === "path" ? "var(--bg)" : COLORS.elevated}
              height="276"
              rx="12"
              stroke={lensKey === "path" ? COLORS.accent : COLORS.border}
              strokeWidth={lensKey === "path" ? "2" : "1"}
              width="224"
              x="496"
              y="88"
            />
            <text
              fill={COLORS.accent}
              fontSize="13"
              fontWeight="600"
              x="516"
              y="122"
            >
              GC Root 保留路径
            </text>
            <text fill={COLORS.primary} fontSize="14" x="516" y="164">
              {target.path}
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="516" y="208">
              根类型：线程 / 静态字段
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="516" y="248">
              路径：节点与字段可追溯
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="516" y="288">
              结论：命中不等于泄漏
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="516" y="330">
              当前焦点：{lensKey === "path" ? "是" : "否"}
            </text>
          </g>

          <rect
            fill={verdict.color}
            height="82"
            rx="12"
            width="676"
            x="42"
            y="394"
          />
          <text
            fill={COLORS.background}
            fontSize="14"
            fontWeight="700"
            x="64"
            y="426"
          >
            {verdict.title}
          </text>
          <text fill={COLORS.background} fontSize="12" x="64" y="452">
            {verdict.detail}
          </text>
        </svg>

        <p className="mt-3 text-xs leading-5 text-secondary">
          诊断合同：快照哈希、查询原文、对象图、保留路径、导出哈希和销毁记录。
        </p>
      </div>
    </figure>
  );
}
