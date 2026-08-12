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

const ENVIRONMENTS = {
  host: {
    label: "宿主机",
    runtime: "系统运行时",
    boundary: "用户目录、端口与进程共享宿主机",
    evidence: "操作系统、架构、版本命令和清理脚本",
  },
  container: {
    label: "容器",
    runtime: "镜像内运行时",
    boundary: "镜像、网络、数据卷与宿主端口显式连接",
    evidence: "镜像摘要、启动参数、卷映射和网络标识",
  },
  ci: {
    label: "持续集成",
    runtime: "干净构建代理",
    boundary: "依赖缓存、凭据和制品目录按任务隔离",
    evidence: "提交哈希、锁文件、日志和制品摘要",
  },
} as const;

type Environment = keyof typeof ENVIRONMENTS;

export function BdpCh02EnvironmentContractLab() {
  const [environment, setEnvironment] = useState<Environment>("container");
  const [locked, setLocked] = useState(false);
  const active = ENVIRONMENTS[environment];

  function reset() {
    setEnvironment("container");
    setLocked(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bdp-ch02-environment-contract"
      aria-label={
        "环境合同实验：当前为" +
        active.label +
        "，运行时是" +
        active.runtime +
        "，边界是" +
        active.boundary +
        "；合同" +
        (locked ? "已锁定" : "未锁定") +
        "。"
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 02 · 环境合同实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">先锁定边界，再启动节点</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换运行环境，观察哪些输入必须写入合同，避免“在我机器上能跑”成为唯一证据。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.86fr_1.14fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择运行边界</p>
          <div className="grid gap-2">
            <ChoiceButton active={environment === "host"} onClick={() => setEnvironment("host")}>宿主机</ChoiceButton>
            <ChoiceButton active={environment === "container"} onClick={() => setEnvironment("container")}>容器</ChoiceButton>
            <ChoiceButton active={environment === "ci"} onClick={() => setEnvironment("ci")}>持续集成</ChoiceButton>
          </div>
          <ChoiceButton active={locked} onClick={() => setLocked((value) => !value)}>{locked ? "解除合同锁定" : "锁定环境合同"}</ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            当前：{active.label}。{active.boundary}。{locked ? " 已记录" + active.evidence + "。" : " 还要记录" + active.evidence + "。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 320"
          role="img"
          aria-label={
            "环境合同链路：操作系统到" +
            active.runtime +
            "，再连接网络、数据和证据；当前合同" +
            (locked ? "已锁定" : "未锁定") +
            "。"
          }
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">OS → Runtime → Network → Data → Evidence</text>
          <rect x="20" y="78" width="132" height="132" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="86" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">OS</text>
          <text x="86" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">系统与架构</text>
          <text x="86" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">输入基线</text>
          <path d="M168 144 H190" stroke="var(--border)" strokeWidth="3" />
          <rect x="202" y="78" width="132" height="132" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="268" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Runtime</text>
          <text x="268" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.runtime}</text>
          <text x="268" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">版本与依赖</text>
          <path d="M350 144 H372" stroke="var(--border)" strokeWidth="3" />
          <rect x="384" y="78" width="132" height="132" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="450" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Boundary</text>
          <text x="450" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">网络与端口</text>
          <text x="450" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">访问边界</text>
          <path d="M532 144 H554" stroke="var(--border)" strokeWidth="3" />
          <rect x="566" y="78" width="174" height="132" rx="14" fill={locked ? "var(--success)" : "var(--warning)"} fillOpacity="0.12" stroke={locked ? "var(--success)" : "var(--warning)"} strokeWidth="2" />
          <text x="653" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Evidence</text>
          <text x="653" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{locked ? "合同已锁定" : "等待记录"}</text>
          <text x="653" y="178" textAnchor="middle" fontSize="11" fill={locked ? "var(--success)" : "var(--warning)"}>{active.evidence}</text>
          <text x="380" y="254" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">可复现不是复制终端，而是复制输入、边界和观察点</text>
          <text x="380" y="280" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">先锁合同，再允许实验写入数据目录</text>
        </svg>
      </div>
    </section>
  );
}

const FAILURE_CASES = {
  normal: {
    label: "正常样本",
    variable: "合法请求与足额资源",
    expected: "状态提交并达到确认阈值",
    evidence: "前后状态、回执、版本、确认深度",
  },
  boundary: {
    label: "边界样本",
    variable: "零值、最大值或恰好阈值",
    expected: "按规则明确接受或拒绝",
    evidence: "边界值、分支、资源消耗、回退点",
  },
  fault: {
    label: "故障样本",
    variable: "签名、nonce、网络或权限一项",
    expected: "提交前拒绝且原状态不变",
    evidence: "原始错误、首个差异、恢复动作",
  },
} as const;

type FailureCase = keyof typeof FAILURE_CASES;

export function BdpCh02FailureMatrixLab() {
  const [caseType, setCaseType] = useState<FailureCase>("normal");
  const [captured, setCaptured] = useState(false);
  const active = FAILURE_CASES[caseType];

  function reset() {
    setCaseType("normal");
    setCaptured(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bdp-ch02-failure-matrix"
      aria-label={
        "故障矩阵实验：当前为" +
        active.label +
        "，只改变" +
        active.variable +
        "，预期" +
        active.expected +
        "；证据" +
        (captured ? "已保存" : "未保存") +
        "。"
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 02 · 故障矩阵实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">一次只改变一个变量</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">选择样本类型，比较预期、实际和证据，练习在首个偏差处停止，而不是把失败藏在重试里。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
        <svg
          viewBox="0 0 760 320"
          role="img"
          aria-label={
            "故障矩阵链路：样本" +
            active.label +
            "只改变" +
            active.variable +
            "，期待" +
            active.expected +
            "，证据" +
            (captured ? "已保存" : "未保存") +
            "。"
          }
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Sample → Variable → Expected → Evidence</text>
          <rect x="28" y="78" width="164" height="132" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="110" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Sample</text>
          <text x="110" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.label}</text>
          <text x="110" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">固定上下文</text>
          <path d="M214 144 H248" stroke="var(--border)" strokeWidth="3" />
          <rect x="260" y="78" width="164" height="132" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="342" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Variable</text>
          <text x="342" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.variable}</text>
          <text x="342" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">只改一项</text>
          <path d="M446 144 H480" stroke="var(--border)" strokeWidth="3" />
          <rect x="492" y="78" width="240" height="132" rx="14" fill={captured ? "var(--success)" : "var(--warning)"} fillOpacity="0.12" stroke={captured ? "var(--success)" : "var(--warning)"} strokeWidth="2" />
          <text x="612" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Evidence</text>
          <text x="612" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.expected}</text>
          <text x="612" y="178" textAnchor="middle" fontSize="11" fill={captured ? "var(--success)" : "var(--warning)"}>{captured ? "证据已保存" : "先保存原始对象"}</text>
          <text x="380" y="254" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">差异可归因的前提，是其余输入保持不变</text>
          <text x="380" y="280" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{active.evidence}</text>
        </svg>

        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择样本</p>
          <div className="grid gap-2">
            <ChoiceButton active={caseType === "normal"} onClick={() => setCaseType("normal")}>正常样本</ChoiceButton>
            <ChoiceButton active={caseType === "boundary"} onClick={() => setCaseType("boundary")}>边界样本</ChoiceButton>
            <ChoiceButton active={caseType === "fault"} onClick={() => setCaseType("fault")}>故障样本</ChoiceButton>
          </div>
          <ChoiceButton active={captured} onClick={() => setCaptured((value) => !value)}>{captured ? "撤销证据记录" : "保存原始证据"}</ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.label}只改变：{active.variable}。预期：{active.expected}。{captured ? " 已保存" + active.evidence + "。" : " 尚未保存" + active.evidence + "。"}
          </p>
        </div>
      </div>
    </section>
  );
}

const TOOLS = {
  curl: {
    label: "Curl",
    input: "HTTP 请求与原始响应",
    output: "状态码、响应体、请求上下文",
    check: "确认网络、端口和响应字段",
  },
  tree: {
    label: "tree",
    input: "目录和数据卷",
    output: "文件层级与边界",
    check: "确认密钥、配置和数据是否隔离",
  },
  jq: {
    label: "jq",
    input: "结构化 JSON",
    output: "字段提取与缺失检查",
    check: "确认脚本没有把空值当成功",
  },
} as const;

type Tool = keyof typeof TOOLS;

export function BdpCh02ToolchainLab() {
  const [tool, setTool] = useState<Tool>("curl");
  const [verified, setVerified] = useState(false);
  const active = TOOLS[tool];

  function reset() {
    setTool("curl");
    setVerified(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bdp-ch02-toolchain"
      aria-label={
        "工具链实验：当前工具为" +
        active.label +
        "，输入" +
        active.input +
        "，输出" +
        active.output +
        "，检查" +
        active.check +
        "；验证" +
        (verified ? "完成" : "未完成") +
        "。"
      }
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 02 · 工具证据实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">让每个工具只承担一个观察任务</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换 Curl、tree 和 jq，检查命令输出如何变成可归档、可复核的证据。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.84fr_1.16fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择工具</p>
          <div className="grid grid-cols-3 gap-2">
            <ChoiceButton active={tool === "curl"} onClick={() => setTool("curl")}>Curl</ChoiceButton>
            <ChoiceButton active={tool === "tree"} onClick={() => setTool("tree")}>tree</ChoiceButton>
            <ChoiceButton active={tool === "jq"} onClick={() => setTool("jq")}>jq</ChoiceButton>
          </div>
          <ChoiceButton active={verified} onClick={() => setVerified((value) => !value)}>{verified ? "撤销工具验证" : "完成工具验证"}</ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.label}接收“{active.input}”，产出“{active.output}”。验证重点：{active.check}。{verified ? " 已记录输入、输出和检查结果。" : " 还要记录输入、输出和检查结果。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 320"
          role="img"
          aria-label={
            "工具证据链路：" +
            active.label +
            "处理" +
            active.input +
            "并得到" +
            active.output +
            "，检查" +
            active.check +
            "；验证" +
            (verified ? "完成" : "未完成") +
            "。"
          }
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Input → Tool → Raw Output → Check</text>
          <rect x="28" y="78" width="164" height="132" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="110" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Input</text>
          <text x="110" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.input}</text>
          <text x="110" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">原始对象</text>
          <path d="M214 144 H248" stroke="var(--border)" strokeWidth="3" />
          <rect x="260" y="78" width="164" height="132" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="342" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Tool</text>
          <text x="342" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.label}</text>
          <text x="342" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">最小变换</text>
          <path d="M446 144 H480" stroke="var(--border)" strokeWidth="3" />
          <rect x="492" y="78" width="240" height="132" rx="14" fill={verified ? "var(--success)" : "var(--warning)"} fillOpacity="0.12" stroke={verified ? "var(--success)" : "var(--warning)"} strokeWidth="2" />
          <text x="612" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Check</text>
          <text x="612" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.output}</text>
          <text x="612" y="178" textAnchor="middle" fontSize="11" fill={verified ? "var(--success)" : "var(--warning)"}>{verified ? "已核对" : "等待核对"}</text>
          <text x="380" y="254" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">格式化摘要必须能回到原始输出和运行上下文</text>
          <text x="380" y="280" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{active.check}</text>
        </svg>
      </div>
    </section>
  );
}
