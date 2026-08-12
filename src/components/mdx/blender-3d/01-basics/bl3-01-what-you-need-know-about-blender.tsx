"use client";

import { useState } from "react";

const CONTROL_CLASS =
  "min-h-11 rounded-control border border-border px-3 py-2 text-left text-sm text-secondary transition-colors hover:border-accent hover:text-primary";

function ResetButton({ onReset }: { onReset: () => void }) {
  return (
    <button
      type="button"
      onClick={onReset}
      className="min-h-11 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary"
    >
      重置实验
    </button>
  );
}

function ChoiceButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`${CONTROL_CLASS} ${active ? "border-accent bg-accent/10 text-accent" : ""}`}
    >
      {children}
    </button>
  );
}

const GOVERNANCE_MODES = {
  license: {
    title: "开源许可",
    detail: "代码可以被查看、修改和分发，但具体版本与第三方插件仍需单独核验。",
    signal: "许可证边界",
  },
  foundation: {
    title: "Blender Foundation",
    detail: "基金会维护项目使命与生态协调；治理身份不等于每个构建都由同一团队发布。",
    signal: "治理边界",
  },
  community: {
    title: "社区反馈",
    detail: "问题报告、开发者、工作室和用户共同形成反馈回路；报告必须能被别人重现。",
    signal: "复现证据",
  },
} as const;

type GovernanceMode = keyof typeof GOVERNANCE_MODES;

export function Bl3Ch01GovernanceLab() {
  const [mode, setMode] = useState<GovernanceMode>("license");
  const active = GOVERNANCE_MODES[mode];

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bl3-ch01-governance-map"
      aria-label="Blender 第一章治理边界实验：许可证、基金会和社区反馈"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">
            Chapter 1 · 机制图
          </p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            软件身份不等于生产保证
          </h3>
          <p className="mt-1 text-sm leading-6 text-secondary">
            切换三层边界，观察每层能证明什么、不能替你证明什么。
          </p>
        </div>
        <ResetButton onReset={() => setMode("license")} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <svg
          viewBox="0 0 720 330"
          role="img"
          aria-label={`治理边界图：当前查看${active.title}，它提供${active.signal}，但不替代版本和插件验收。`}
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="360" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">
            Blender 生产信任链
          </text>
          <text x="360" y="56" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            身份、治理、反馈各自只承担一部分证明责任
          </text>
          <path d="M142 160 H578" fill="none" stroke="var(--border)" strokeWidth="3" />
          {(Object.keys(GOVERNANCE_MODES) as GovernanceMode[]).map((key, index) => {
            const x = 142 + index * 218;
            const selected = mode === key;
            return (
              <g key={key}>
                <circle cx={x} cy={160} r={34} fill="var(--bg)" stroke={selected ? "var(--accent)" : "var(--border)"} strokeWidth={selected ? 3 : 2} />
                <text x={x} y={156} textAnchor="middle" fontSize="13" fontWeight="700" fill={selected ? "var(--accent)" : "var(--text-primary)"}>
                  {index + 1}
                </text>
                <text x={x} y={178} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
                  {GOVERNANCE_MODES[key].title}
                </text>
                <rect x={x - 82} y={220} width={164} height={54} rx={10} fill="var(--bg)" stroke={selected ? "var(--accent)" : "var(--border)"} />
                <text x={x} y={244} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">
                  {GOVERNANCE_MODES[key].signal}
                </text>
                <text x={x} y={262} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
                  不能代替版本烟雾测试
                </text>
              </g>
            );
          })}
        </svg>

        <div className="rounded-card border border-border bg-bg p-4">
          <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
            {(Object.keys(GOVERNANCE_MODES) as GovernanceMode[]).map((key) => (
              <ChoiceButton key={key} active={mode === key} onClick={() => setMode(key)}>
                {GOVERNANCE_MODES[key].title}
              </ChoiceButton>
            ))}
          </div>
          <div className="mt-4 rounded-control border border-accent bg-accent/10 p-4" aria-live="polite">
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">当前证据</p>
            <p className="mt-2 font-semibold text-primary">{active.signal}</p>
            <p className="mt-2 text-sm leading-6 text-secondary">{active.detail}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

const RELEASE_LINES = {
  lts: {
    title: "2.83 LTS 基线",
    build: "原书项目的可重复参照",
    action: "冻结安装包、操作系统和插件清单",
  },
  current: {
    title: "当前版本",
    build: "新的入口需要重新观察",
    action: "对照同一 .blend 做打开、保存和渲染烟雾测试",
  },
} as const;

type ReleaseLine = keyof typeof RELEASE_LINES;

export function Bl3Ch01ReleaseEvidenceLab() {
  const [line, setLine] = useState<ReleaseLine>("lts");
  const [pluginsVerified, setPluginsVerified] = useState(false);
  const active = RELEASE_LINES[line];

  function reset() {
    setLine("lts");
    setPluginsVerified(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bl3-ch01-release-evidence"
      aria-label="Blender 第一章版本与插件证据实验"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">
            Chapter 1 · 证据台
          </p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            选择版本线，再决定能否交付
          </h3>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-2">
          <ChoiceButton active={line === "lts"} onClick={() => setLine("lts")}>
            Blender 2.83 LTS
          </ChoiceButton>
          <ChoiceButton active={line === "current"} onClick={() => setLine("current")}>
            当前版本
          </ChoiceButton>
          <button
            type="button"
            aria-pressed={pluginsVerified}
            onClick={() => setPluginsVerified((value) => !value)}
            className={`${CONTROL_CLASS} w-full ${pluginsVerified ? "border-accent bg-accent/10 text-accent" : ""}`}
          >
            {pluginsVerified ? "已核对插件清单" : "标记插件清单待核对"}
          </button>
        </div>

        <svg
          viewBox="0 0 760 300"
          role="img"
          aria-label={`版本证据图：${active.title}，构建记录为${active.build}，下一步是${active.action}。插件清单${pluginsVerified ? "已核对" : "尚未核对"}。`}
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">
            版本账本 · {active.title}
          </text>
          <rect x="34" y="74" width="206" height="112" rx="14" fill="var(--bg)" stroke="var(--accent)" strokeWidth="2" />
          <text x="137" y="104" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">构建身份</text>
          <text x="137" y="132" textAnchor="middle" fontSize="12" fill="var(--text-primary)">{active.build}</text>
          <text x="137" y="160" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">版本号 · OS · GPU</text>
          <path d="M258 130 H342" stroke="var(--border)" strokeWidth="3" />
          <text x="300" y="118" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">复现</text>
          <rect x="352" y="74" width="206" height="112" rx="14" fill="var(--bg)" stroke={pluginsVerified ? "var(--accent)" : "var(--border)"} strokeWidth="2" />
          <text x="455" y="104" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">插件边界</text>
          <text x="455" y="134" textAnchor="middle" fontSize="12" fill={pluginsVerified ? "var(--accent)" : "var(--text-secondary)"}>{pluginsVerified ? "清单已核对" : "待核对"}</text>
          <text x="455" y="160" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">路径 · 版本 · 许可证</text>
          <path d="M576 130 H660" stroke="var(--border)" strokeWidth="3" />
          <rect x="670" y="74" width="60" height="112" rx="14" fill="var(--bg)" stroke="var(--accent)" strokeWidth="2" />
          <text x="700" y="120" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">烟雾</text>
          <text x="700" y="148" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">测试</text>
          <text x="380" y="238" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.action}</text>
          <text x="380" y="266" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">没有这条证据，就不能把“能运行”写成“可复现”</text>
        </svg>
      </div>
    </section>
  );
}

const REPORT_SCENARIOS = {
  normal: {
    title: "正常样本",
    expected: "同一版本、同一插件清单，打开 .blend 后能完成保存与渲染。",
    evidence: "文件路径、构建号、插件清单、渲染截图",
  },
  boundary: {
    title: "边界样本",
    expected: "更换操作系统或版本后，入口变化被记录，关键 Datablock 仍能检查。",
    evidence: "版本账本、不可等价处、对照截图",
  },
  failure: {
    title: "故障样本",
    expected: "故意移除插件或改错路径，问题报告能让另一位读者重现失败。",
    evidence: "最小复现步骤、预期/实际、日志与恢复版本",
  },
} as const;

type ReportScenario = keyof typeof REPORT_SCENARIOS;

export function Bl3Ch01IssueReportLab() {
  const [scenario, setScenario] = useState<ReportScenario>("normal");
  const active = REPORT_SCENARIOS[scenario];

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bl3-ch01-issue-report"
      aria-label="Blender 第一章问题报告实验：正常、边界和故障样本"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">
            Chapter 1 · 复现台
          </p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            把“报错”变成别人能重放的问题
          </h3>
        </div>
        <ResetButton onReset={() => setScenario("normal")} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1.2fr]">
        <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
          {(Object.keys(REPORT_SCENARIOS) as ReportScenario[]).map((key) => (
            <ChoiceButton key={key} active={scenario === key} onClick={() => setScenario(key)}>
              {REPORT_SCENARIOS[key].title}
            </ChoiceButton>
          ))}
        </div>
        <svg
          viewBox="0 0 720 300"
          role="img"
          aria-label={`问题报告图：当前${active.title}，预期是${active.expected}，证据包括${active.evidence}。`}
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="360" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">
            {active.title} · 最小证据包
          </text>
          <circle cx="92" cy="136" r="32" fill="var(--bg)" stroke="var(--accent)" strokeWidth="3" />
          <text x="92" y="132" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">输入</text>
          <text x="92" y="151" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">版本</text>
          <path d="M132 136 H210" stroke="var(--border)" strokeWidth="3" />
          <circle cx="246" cy="136" r="32" fill="var(--bg)" stroke="var(--accent)" strokeWidth="3" />
          <text x="246" y="132" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">步骤</text>
          <text x="246" y="151" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">复现</text>
          <path d="M286 136 H364" stroke="var(--border)" strokeWidth="3" />
          <circle cx="400" cy="136" r="32" fill="var(--bg)" stroke="var(--accent)" strokeWidth="3" />
          <text x="400" y="132" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">预期</text>
          <text x="400" y="151" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">实际</text>
          <path d="M440 136 H518" stroke="var(--border)" strokeWidth="3" />
          <circle cx="554" cy="136" r="32" fill="var(--bg)" stroke={scenario === "failure" ? "var(--danger)" : "var(--accent)"} strokeWidth="3" />
          <text x="554" y="132" textAnchor="middle" fontSize="12" fontWeight="700" fill={scenario === "failure" ? "var(--danger)" : "var(--accent)"}>证据</text>
          <text x="554" y="151" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">交接</text>
          <rect x="58" y="218" width="604" height="48" rx="12" fill="var(--bg)" stroke={scenario === "failure" ? "var(--danger)" : "var(--border)"} />
          <text x="360" y="239" textAnchor="middle" fontSize="11" fill="var(--text-primary)">{active.expected}</text>
          <text x="360" y="257" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">需要保存：{active.evidence}</text>
        </svg>
      </div>
    </section>
  );
}
