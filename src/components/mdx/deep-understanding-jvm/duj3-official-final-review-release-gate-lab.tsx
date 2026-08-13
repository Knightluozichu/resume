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

const DOMAINS = [
  {
    key: "memory",
    label: "内存与 GC",
    nodes: "第2–5章",
    question: "哪个区域先偏离？",
    evidence: "GC 日志 / 堆快照",
    boundary: "不直接推出业务泄漏",
  },
  {
    key: "execution",
    label: "类文件与执行",
    nodes: "第6–9章",
    question: "类文件合同是否满足？",
    evidence: "javap / 加载轨迹",
    boundary: "实现行为需标版本",
  },
  {
    key: "compiler",
    label: "编译与优化",
    nodes: "第10–11章",
    question: "优化假设何时失效？",
    evidence: "编译事件 / 回退",
    boundary: "不替代性能基准",
  },
  {
    key: "concurrency",
    label: "内存模型与并发",
    nodes: "第12–13章",
    question: "哪条关系支撑观察？",
    evidence: "线程转储 / 重复运行",
    boundary: "不等于锁优化保证",
  },
] as const;

const LENSES = [
  {
    key: "contract",
    label: "规范合同",
    detail: "先定位 Java、JVMS 或 JLS 的适用规则",
  },
  {
    key: "runtime",
    label: "运行证据",
    detail: "再保存同一环境指纹下的原始输出",
  },
  {
    key: "release",
    label: "发布裁决",
    detail: "最后检查反例、恢复轨迹与结论范围",
  },
] as const;

type DomainKey = (typeof DOMAINS)[number]["key"];
type LensKey = (typeof LENSES)[number]["key"];

export function Duj3OfficialFinalReviewReleaseGateLab() {
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const arrowId = `duj3-official-final-review-arrow-${instanceId}`;
  const [domainKey, setDomainKey] = useState<DomainKey>("execution");
  const [lensKey, setLensKey] = useState<LensKey>("runtime");
  const [brokenEvidence, setBrokenEvidence] = useState(false);

  const domain = DOMAINS.find((item) => item.key === domainKey) ?? DOMAINS[1];
  const lens = LENSES.find((item) => item.key === lensKey) ?? LENSES[1];
  const verdict = brokenEvidence
    ? {
        color: COLORS.warning,
        title: "暂停：发布门关闭",
        detail:
          "跨层证据链缺少原始输出或恢复记录；保留首差和失败样本，补齐同一环境指纹后再裁决。",
      }
    : {
        color: COLORS.success,
        title: "可继续：发布门等待完整档案",
        detail: `${domain.label}聚焦“${lens.label}”：${lens.detail}。当前状态只表示复核路径完整，不代表生产性能承诺。`,
      };

  function reset() {
    setDomainKey("execution");
    setLensKey("runtime");
    setBrokenEvidence(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="duj3-official-final-review-release-gate-lab"
      data-unit-id="duj3-official-final-review"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              DUJ3 · 全书总复习
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              跨层证据发布门
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              选择故障域与复核镜头；故障开关会断开一条跨层证据链。
            </p>
          </div>
          <button
            type="button"
            aria-label="重置跨层证据发布门"
            onClick={reset}
            className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
          >
            重置
          </button>
        </div>

        <div className="mb-4 flex flex-wrap gap-2" aria-label="选择故障域">
          <span className="self-center text-xs text-secondary">故障域：</span>
          {DOMAINS.map((item) => (
            <button
              key={item.key}
              type="button"
              aria-pressed={domainKey === item.key}
              onClick={() => setDomainKey(item.key)}
              className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors ${
                domainKey === item.key
                  ? "border-accent text-accent"
                  : "border-border text-secondary hover:border-accent hover:text-primary"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mb-4 grid gap-3 md:grid-cols-[1fr_auto]">
          <div className="flex flex-wrap gap-2" aria-label="选择复核镜头">
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
            aria-pressed={brokenEvidence}
            onClick={() => setBrokenEvidence((value) => !value)}
            className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors ${
              brokenEvidence
                ? "border-warning text-warning"
                : "border-border text-secondary hover:border-warning hover:text-warning"
            }`}
          >
            {brokenEvidence ? "恢复完整证据" : "注入跨层证据断裂"}
          </button>
        </div>

        <svg
          aria-label="跨层证据发布门：从问题边界连接到运行证据和发布裁决；支持故障域、复核镜头、证据断裂故障和重置。"
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
            当前：{domain.label} · {domain.nodes} · 只改变复核焦点
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
              fill={lensKey === "contract" ? "var(--bg)" : COLORS.elevated}
              height="276"
              rx="12"
              stroke={lensKey === "contract" ? COLORS.accent : COLORS.border}
              strokeWidth={lensKey === "contract" ? "2" : "1"}
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
              问题边界
            </text>
            <text fill={COLORS.primary} fontSize="14" x="60" y="164">
              {domain.question}
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="60" y="210">
              节点：{domain.nodes}
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="60" y="238">
              输入：症状 + 成功条件
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="60" y="266">
              首差：需要定位
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="60" y="306">
              当前镜头：{lensKey === "contract" ? "是" : "否"}
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="60" y="334">
              故障：{brokenEvidence ? "已注入" : "未注入"}
            </text>
          </g>

          <g>
            <rect
              fill={lensKey === "runtime" ? "var(--bg)" : COLORS.elevated}
              height="276"
              rx="12"
              stroke={lensKey === "runtime" ? COLORS.accent : COLORS.border}
              strokeWidth={lensKey === "runtime" ? "2" : "1"}
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
              运行证据
            </text>
            <text fill={COLORS.primary} fontSize="14" x="288" y="164">
              {brokenEvidence ? "原始输出缺口" : domain.evidence}
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="288" y="212">
              版本：JDK + 供应商
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="288" y="240">
              参数：启动与工作量
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="288" y="268">
              日志：保留原始文本
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="288" y="306">
              当前镜头：{lensKey === "runtime" ? "是" : "否"}
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="288" y="334">
              状态：{brokenEvidence ? "待补证据" : "可追溯"}
            </text>
          </g>

          <g>
            <rect
              fill={lensKey === "release" ? "var(--bg)" : COLORS.elevated}
              height="276"
              rx="12"
              stroke={lensKey === "release" ? COLORS.accent : COLORS.border}
              strokeWidth={lensKey === "release" ? "2" : "1"}
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
              发布裁决
            </text>
            <text fill={COLORS.primary} fontSize="14" x="516" y="164">
              {brokenEvidence ? "发布门关闭" : "检查恢复轨迹"}
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="516" y="212">
              反例：正常 / 边界 / 故障
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="516" y="240">
              恢复：回到同一基线
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="516" y="268">
              范围：规范 / 实现 / 环境
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="516" y="306">
              当前镜头：{lensKey === "release" ? "是" : "否"}
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="516" y="334">
              结论：{brokenEvidence ? "不可交付" : domain.boundary}
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
          记录合同：问题边界、适用规范、实现版本、原始输出、首差、反例、恢复轨迹和结论范围。
        </p>
      </div>
    </figure>
  );
}
