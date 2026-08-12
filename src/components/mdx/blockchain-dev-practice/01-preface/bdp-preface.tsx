"use client";

import { useState } from "react";

const BUTTON_CLASS =
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
      className={BUTTON_CLASS + (active ? " border-accent bg-accent/10 text-accent" : "")}
    >
      {children}
    </button>
  );
}

const CONTEXTS = {
  historical: {
    label: "2018 基线",
    tool: "Geth / TestRPC / Truffle",
    assumption: "本地私链和浏览器 IDE",
    check: "锁版本、目录和账户",
  },
  current: {
    label: "现代隔离环境",
    tool: "当前客户端 / 编译器 / RPC",
    assumption: "默认安全和网络边界",
    check: "锁 API、网络和密钥上下文",
  },
} as const;

type Context = keyof typeof CONTEXTS;

export function BdpPrefaceContextLab() {
  const [context, setContext] = useState<Context>("historical");
  const [locked, setLocked] = useState(false);
  const active = CONTEXTS[context];

  function reset() {
    setContext("historical");
    setLocked(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bdp-preface-context"
      aria-label={`前言上下文实验：当前为${active.label}，工具为${active.tool}，假设是${active.assumption}；上下文${locked ? "已锁定" : "未锁定"}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Preface · 历史上下文实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">把历史工具与现代环境分开复现</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换书本的 2018 基线和当前隔离环境，观察哪些问题稳定、哪些默认值必须重新验证。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.86fr_1.14fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择上下文</p>
          <div className="grid grid-cols-2 gap-2">
            <ChoiceButton active={context === "historical"} onClick={() => setContext("historical")}>2018 基线</ChoiceButton>
            <ChoiceButton active={context === "current"} onClick={() => setContext("current")}>现代环境</ChoiceButton>
          </div>
          <ChoiceButton active={locked} onClick={() => setLocked((value) => !value)}>{locked ? "解除上下文锁定" : "锁定上下文记录"}</ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            当前：{active.label}。{locked ? `已记录${active.check}，可以运行无真实资产实验。` : "先记录工具、版本、网络和账户，再解释命令结果。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 320"
          role="img"
          aria-label={`前言上下文链路：${active.label}使用${active.tool}，建立假设${active.assumption}，检查${active.check}；上下文${locked ? "已锁定" : "未锁定"}。`}
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Edition → Toolchain → Assumption → Reproducible Context</text>
          <rect x="28" y="78" width="176" height="132" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="116" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{active.label}</text>
          <text x="116" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">历史坐标</text>
          <text x="116" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">书目 / 版本</text>
          <path d="M226 144 H260" stroke="var(--border)" strokeWidth="3" />
          <rect x="272" y="78" width="176" height="132" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="360" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Toolchain</text>
          <text x="360" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.tool}</text>
          <text x="360" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">命令 / API</text>
          <path d="M470 144 H504" stroke="var(--border)" strokeWidth="3" />
          <rect x="516" y="78" width="216" height="132" rx="14" fill={locked ? "var(--success)" : "var(--warning)"} fillOpacity="0.12" stroke={locked ? "var(--success)" : "var(--warning)"} strokeWidth="2" />
          <text x="624" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Context</text>
          <text x="624" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.assumption}</text>
          <text x="624" y="178" textAnchor="middle" fontSize="11" fill={locked ? "var(--success)" : "var(--warning)"}>{locked ? "可重放" : "先锁定"}</text>
          <text x="380" y="254" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">历史行为可以复现，历史默认值不能未经检查地继承</text>
          <text x="380" y="280" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">工具变了，问题坐标和安全边界仍要被说明</text>
        </svg>
      </div>
    </section>
  );
}

const TRACE_STAGES = {
  request: { label: "Request", detail: "签名请求", result: "进入节点观察" },
  execution: { label: "Execution", detail: "执行与回滚", result: "得到回执或错误" },
  confirmation: { label: "Confirmation", detail: "区块与确认", result: "状态达到阈值" },
} as const;

type TraceStage = keyof typeof TRACE_STAGES;

export function BdpPrefaceTraceLab() {
  const [stage, setStage] = useState<TraceStage>("request");
  const [raw, setRaw] = useState(false);
  const [state, setState] = useState(false);
  const active = TRACE_STAGES[stage];
  const ready = raw && state;

  function reset() {
    setStage("request");
    setRaw(false);
    setState(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bdp-preface-state-trace"
      aria-label={`前言状态轨迹实验：当前阶段${active.label}，${active.detail}，结果${active.result}；原始对象${raw ? "已保存" : "未保存"}，状态${state ? "已对照" : "未对照"}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Preface · 状态轨迹实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">从“看到请求”追到“确认状态”</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">选择请求、执行或确认阶段，检查格式化摘要是否足以证明真实状态。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.12fr_0.88fr]">
        <svg
          viewBox="0 0 760 320"
          role="img"
          aria-label={`状态轨迹：${active.label}阶段${active.detail}，结果为${active.result}；原始对象${raw ? "已保存" : "未保存"}，前后状态${state ? "已对照" : "未对照"}，证据${ready ? "完整" : "不完整"}。`}
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Before State → Request → Execution → Confirmation</text>
          <rect x="28" y="78" width="176" height="132" rx="14" fill={stage === "request" ? "var(--accent)" : "var(--bg)"} fillOpacity={stage === "request" ? 0.12 : 1} stroke={stage === "request" ? "var(--accent)" : "var(--border)"} strokeWidth="2" />
          <text x="116" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Request</text>
          <text x="116" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">签名 / nonce / 输入</text>
          <text x="116" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">原始字节</text>
          <path d="M226 144 H260" stroke="var(--border)" strokeWidth="3" />
          <rect x="272" y="78" width="176" height="132" rx="14" fill={stage === "execution" ? "var(--accent)" : "var(--bg)"} fillOpacity={stage === "execution" ? 0.12 : 1} stroke={stage === "execution" ? "var(--accent)" : "var(--border)"} strokeWidth="2" />
          <text x="360" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Execution</text>
          <text x="360" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">执行 / 回滚</text>
          <text x="360" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Receipt / Error</text>
          <path d="M470 144 H504" stroke="var(--border)" strokeWidth="3" />
          <rect x="516" y="78" width="216" height="132" rx="14" fill={ready ? "var(--success)" : "var(--warning)"} fillOpacity="0.12" stroke={ready ? "var(--success)" : "var(--warning)"} strokeWidth="2" />
          <text x="624" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Confirmation</text>
          <text x="624" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.result}</text>
          <text x="624" y="178" textAnchor="middle" fontSize="11" fill={ready ? "var(--success)" : "var(--warning)"}>{ready ? "可复核" : "缺证据"}</text>
          <text x="380" y="254" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">pending、included 和 confirmed 是不同状态</text>
          <text x="380" y="280" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">原始对象和前后状态必须绑定到同一网络上下文</text>
        </svg>

        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择阶段</p>
          <div className="grid gap-2">
            <ChoiceButton active={stage === "request"} onClick={() => setStage("request")}>Request：签名请求</ChoiceButton>
            <ChoiceButton active={stage === "execution"} onClick={() => setStage("execution")}>Execution：执行回执</ChoiceButton>
            <ChoiceButton active={stage === "confirmation"} onClick={() => setStage("confirmation")}>Confirmation：确认深度</ChoiceButton>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <ChoiceButton active={raw} onClick={() => setRaw((value) => !value)}>{raw ? "撤销原始对象" : "保存原始对象"}</ChoiceButton>
            <ChoiceButton active={state} onClick={() => setState((value) => !value)}>{state ? "撤销状态对照" : "完成状态对照"}</ChoiceButton>
          </div>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            当前阶段：{active.detail}。{ready ? "证据可以解释请求、执行和确认之间的差异。" : "不要把界面提示或单个哈希当作后状态证明。"}
          </p>
        </div>
      </div>
    </section>
  );
}

const MIGRATION_TOPICS = {
  tool: { label: "工具命令", oldValue: "历史命令与默认端口", currentValue: "当前 CLI / RPC", check: "行为差异与替代步骤" },
  config: { label: "配置默认值", oldValue: "旧网络 / 账户模型", currentValue: "显式网络与数据目录", check: "配置文件和安全边界" },
  security: { label: "安全上下文", oldValue: "教学账户与本地资产", currentValue: "隔离密钥与无真实资产", check: "权限、回滚和泄漏风险" },
} as const;

type MigrationTopic = keyof typeof MIGRATION_TOPICS;

export function BdpPrefaceMigrationLab() {
  const [topic, setTopic] = useState<MigrationTopic>("tool");
  const [documented, setDocumented] = useState(false);
  const active = MIGRATION_TOPICS[topic];

  function reset() {
    setTopic("tool");
    setDocumented(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bdp-preface-migration"
      aria-label={`前言迁移实验：当前主题${active.label}，历史假设${active.oldValue}，当前实现${active.currentValue}；文档${documented ? "已记录" : "未记录"}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Preface · 现代迁移实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">迁移是解释差异，不是改写历史</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">选择一个迁移主题，记录旧假设、当前实现、不可等价处和复测方法。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.84fr_1.16fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择迁移主题</p>
          <div className="grid gap-2">
            <ChoiceButton active={topic === "tool"} onClick={() => setTopic("tool")}>工具命令</ChoiceButton>
            <ChoiceButton active={topic === "config"} onClick={() => setTopic("config")}>配置默认值</ChoiceButton>
            <ChoiceButton active={topic === "security"} onClick={() => setTopic("security")}>安全上下文</ChoiceButton>
          </div>
          <ChoiceButton active={documented} onClick={() => setDocumented((value) => !value)}>{documented ? "撤销迁移记录" : "完成迁移记录"}</ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            当前主题：{active.label}。{documented ? `已记录${active.check}，可以在隔离环境复测。` : "先区分旧假设和当前实现，再决定是否可以等价迁移。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 320"
          role="img"
          aria-label={`迁移链路：${active.label}，从历史${active.oldValue}到当前${active.currentValue}，复测要求${active.check}；记录${documented ? "完成" : "未完成"}。`}
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Historical Assumption → Current Implementation → Difference → Retest</text>
          <rect x="28" y="78" width="176" height="132" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="116" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">2018</text>
          <text x="116" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.oldValue}</text>
          <text x="116" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">原书坐标</text>
          <path d="M226 144 H260" stroke="var(--border)" strokeWidth="3" />
          <rect x="272" y="78" width="176" height="132" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="360" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Current</text>
          <text x="360" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.currentValue}</text>
          <text x="360" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">实现选择</text>
          <path d="M470 144 H504" stroke="var(--border)" strokeWidth="3" />
          <rect x="516" y="78" width="216" height="132" rx="14" fill={documented ? "var(--success)" : "var(--warning)"} fillOpacity="0.12" stroke={documented ? "var(--success)" : "var(--warning)"} strokeWidth="2" />
          <text x="624" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Retest</text>
          <text x="624" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.check}</text>
          <text x="624" y="178" textAnchor="middle" fontSize="11" fill={documented ? "var(--success)" : "var(--warning)"}>{documented ? "可迁移" : "先记录"}</text>
          <text x="380" y="254" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">保留不变量，标出无法等价的部分</text>
          <text x="380" y="280" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">迁移记录必须包含差异、复测和回退点</text>
        </svg>
      </div>
    </section>
  );
}
