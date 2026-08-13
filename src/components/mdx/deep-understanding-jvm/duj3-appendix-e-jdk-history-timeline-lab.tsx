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

const TOPICS = [
  {
    key: "language",
    label: "语言层",
    version: "JDK 8",
    feature: "语言能力：正式状态",
    source: "JLS / JEP / 发布记录",
    boundary: "源码层已核对；运行时仍需探针",
  },
  {
    key: "runtime",
    label: "运行时层",
    version: "JDK 11",
    feature: "运行时能力：版本相关",
    source: "JVMS / OpenJDK / 构建输出",
    boundary: "类文件与默认值需分开验证",
  },
  {
    key: "tooling",
    label: "工具层",
    version: "JDK 17",
    feature: "工具链：发行版可用性",
    source: "工具手册 / --help / 退出码",
    boundary: "工具存在不等于脚本兼容",
  },
  {
    key: "release",
    label: "发布层",
    version: "JDK 25",
    feature: "发布节奏：当前复核",
    source: "OpenJDK 项目页 / 源码",
    boundary: "只覆盖已运行的当前证据",
  },
] as const;

const LENSES = [
  {
    key: "timeline",
    label: "时间线",
    detail: "固定发行版、日期与当时状态",
  },
  {
    key: "delivery",
    label: "交付状态",
    detail: "区分预览、实验、正式与后来结果",
  },
  {
    key: "compatibility",
    label: "兼容性",
    detail: "把源码、运行时和工具探针分开",
  },
] as const;

type TopicKey = (typeof TOPICS)[number]["key"];
type LensKey = (typeof LENSES)[number]["key"];

export function Duj3AppendixEJdkHistoryTimelineLab() {
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const arrowId = `duj3-appendix-e-jdk-history-arrow-${instanceId}`;
  const [topicKey, setTopicKey] = useState<TopicKey>("runtime");
  const [lensKey, setLensKey] = useState<LensKey>("delivery");
  const [backfillFault, setBackfillFault] = useState(false);

  const topic = TOPICS.find((item) => item.key === topicKey) ?? TOPICS[1];
  const lens = LENSES.find((item) => item.key === lensKey) ?? LENSES[1];
  const verdict = backfillFault
    ? {
        color: COLORS.warning,
        title: "暂停：历史时间边界被污染",
        detail:
          "事后回填没有日期，不能覆盖当时状态；先保留原始记录，再补采发布说明和复核日期。",
      }
    : {
        color: COLORS.success,
        title: "可继续：版本证据已分层",
        detail: `${topic.label}聚焦“${lens.label}”：${lens.detail}。兼容性结论仍只覆盖已运行的探针。`,
      };

  function reset() {
    setTopicKey("runtime");
    setLensKey("delivery");
    setBackfillFault(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="duj3-appendix-e-jdk-history-timeline-lab"
      data-unit-id="duj3-appendix-e-jdk-history"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              DUJ3 · 附录 E
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              JDK 版本历史复核台
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              选择一个版本层和观察镜头；故障开关会注入没有日期的事后回填记录。
            </p>
          </div>
          <button
            type="button"
            aria-label="重置 JDK 版本历史复核台"
            onClick={reset}
            className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
          >
            重置
          </button>
        </div>

        <div className="mb-4 flex flex-wrap gap-2" aria-label="选择版本层">
          <span className="self-center text-xs text-secondary">版本层：</span>
          {TOPICS.map((item) => (
            <button
              key={item.key}
              type="button"
              aria-pressed={topicKey === item.key}
              onClick={() => setTopicKey(item.key)}
              className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors ${
                topicKey === item.key
                  ? "border-accent text-accent"
                  : "border-border text-secondary hover:border-accent hover:text-primary"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mb-4 grid gap-3 md:grid-cols-[1fr_auto]">
          <div className="flex flex-wrap gap-2" aria-label="选择观察镜头">
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
            aria-pressed={backfillFault}
            onClick={() => setBackfillFault((value) => !value)}
            className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors ${
              backfillFault
                ? "border-warning text-warning"
                : "border-border text-secondary hover:border-warning hover:text-warning"
            }`}
          >
            {backfillFault ? "恢复时间边界" : "注入事后回填"}
          </button>
        </div>

        <svg
          aria-label="JDK 版本历史复核图：从版本锚点连接到功能交付和兼容性边界；支持版本层、观察镜头、事后回填故障和重置。"
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
            当前：{topic.label} · {topic.version} · 只改变复核焦点
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
              fill={lensKey === "timeline" ? "var(--bg)" : COLORS.elevated}
              height="276"
              rx="12"
              stroke={lensKey === "timeline" ? COLORS.accent : COLORS.border}
              strokeWidth={lensKey === "timeline" ? "2" : "1"}
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
              版本锚点
            </text>
            <text fill={COLORS.primary} fontSize="14" x="60" y="164">
              {topic.version}
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="60" y="202">
              日期：保留原始记录
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="60" y="230">
              供应商：不可省略
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="60" y="258">
              当前镜头：{lensKey === "timeline" ? "是" : "否"}
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="60" y="306">
              证据：version + date
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="60" y="334">
              回填：{backfillFault ? "缺少日期" : "边界完整"}
            </text>
          </g>

          <g>
            <rect
              fill={lensKey === "delivery" ? "var(--bg)" : COLORS.elevated}
              height="276"
              rx="12"
              stroke={lensKey === "delivery" ? COLORS.accent : COLORS.border}
              strokeWidth={lensKey === "delivery" ? "2" : "1"}
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
              功能交付
            </text>
            <text fill={COLORS.primary} fontSize="14" x="288" y="164">
              {topic.feature}
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="288" y="212">
              来源：{topic.source}
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="288" y="252">
              状态：预览 / 正式分开
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="288" y="292">
              当前镜头：{lensKey === "delivery" ? "是" : "否"}
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="288" y="332">
              结论：{backfillFault ? "待补证据" : "可追溯"}
            </text>
          </g>

          <g>
            <rect
              fill={lensKey === "compatibility" ? "var(--bg)" : COLORS.elevated}
              height="276"
              rx="12"
              stroke={
                lensKey === "compatibility" ? COLORS.accent : COLORS.border
              }
              strokeWidth={lensKey === "compatibility" ? "2" : "1"}
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
              兼容性边界
            </text>
            <text fill={COLORS.primary} fontSize="14" x="516" y="164">
              {backfillFault ? "结论冻结" : "探针分层"}
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="516" y="212">
              {topic.boundary}
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="516" y="252">
              源码：编译探针
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="516" y="280">
              运行时：启动与路径
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="516" y="308">
              工具：帮助与退出码
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="516" y="336">
              当前镜头：{lensKey === "compatibility" ? "是" : "否"}
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
          记录合同：发行版与日期、功能状态、规范或 JEP
          来源、供应商政策、工具输出、原始日志和探针退出码。
        </p>
      </div>
    </figure>
  );
}
