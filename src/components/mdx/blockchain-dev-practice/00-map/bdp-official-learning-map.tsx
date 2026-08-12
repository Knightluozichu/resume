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

const LEARNING_ROUTES = {
  foundation: {
    label: "准备与基础",
    input: "环境 / 网络 / 账户",
    output: "可重放节点上下文",
    check: "版本、数据目录和网络身份",
  },
  ethereum: {
    label: "Ethereum 合约",
    input: "Solidity / 编译器",
    output: "部署与调用轨迹",
    check: "字节码、调用者和回执",
  },
  dapp: {
    label: "DApp 实战",
    input: "合约 / 前端 / 钱包",
    output: "用户操作到链上状态",
    check: "签名、交易和确认",
  },
  bitcoin: {
    label: "Bitcoin 扩展",
    input: "节点 / RPC / UTXO",
    output: "命令与编程接口",
    check: "网络、区块和确认深度",
  },
} as const;

type LearningRoute = keyof typeof LEARNING_ROUTES;

export function BdpMapRouteLab() {
  const [route, setRoute] = useState<LearningRoute>("foundation");
  const [mapped, setMapped] = useState(false);
  const active = LEARNING_ROUTES[route];

  function reset() {
    setRoute("foundation");
    setMapped(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bdp-learning-route-map"
      aria-label={`区块链学习路线实验：当前路线${active.label}，输入${active.input}，输出${active.output}；映射${mapped ? "已完成" : "未完成"}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Learning Map · 路线实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">从问题选择路线，不从工具名称开始</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">选择一条学习路线，检查它的输入、输出和验收条件，再决定下一步阅读与实验。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择路线</p>
          <div className="grid gap-2">
            <ChoiceButton active={route === "foundation"} onClick={() => setRoute("foundation")}>准备与基础</ChoiceButton>
            <ChoiceButton active={route === "ethereum"} onClick={() => setRoute("ethereum")}>Ethereum 合约</ChoiceButton>
            <ChoiceButton active={route === "dapp"} onClick={() => setRoute("dapp")}>DApp 实战</ChoiceButton>
            <ChoiceButton active={route === "bitcoin"} onClick={() => setRoute("bitcoin")}>Bitcoin 扩展</ChoiceButton>
          </div>
          <ChoiceButton active={mapped} onClick={() => setMapped((value) => !value)}>{mapped ? "撤销路线映射" : "完成路线映射"}</ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            当前路线：{active.label}。{mapped ? `已记录${active.check}，可以进入对应目录。` : "先写清问题、输入和可验证输出，不要把目录当成无条件的学习清单。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 320"
          role="img"
          aria-label={`学习路线数据流：${active.input}进入${active.label}，输出${active.output}，验收依据为${active.check}；路线映射${mapped ? "已完成" : "未完成"}。`}
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Problem → Route → Artifact → Check</text>
          <rect x="28" y="78" width="176" height="132" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="116" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Input</text>
          <text x="116" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.input}</text>
          <text x="116" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">问题边界</text>
          <path d="M226 144 H260" stroke="var(--border)" strokeWidth="3" />
          <rect x="272" y="78" width="176" height="132" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="360" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Route</text>
          <text x="360" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.label}</text>
          <text x="360" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">目录 / 最小实验</text>
          <path d="M470 144 H504" stroke="var(--border)" strokeWidth="3" />
          <rect x="516" y="78" width="216" height="132" rx="14" fill={mapped ? "var(--success)" : "var(--warning)"} fillOpacity="0.12" stroke={mapped ? "var(--success)" : "var(--warning)"} strokeWidth="2" />
          <text x="624" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Artifact</text>
          <text x="624" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.output}</text>
          <text x="624" y="178" textAnchor="middle" fontSize="11" fill={mapped ? "var(--success)" : "var(--warning)"}>{mapped ? "有验收合同" : "等待映射"}</text>
          <text x="380" y="254" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">学习地图的终点是可验证产物，不是读完目录</text>
          <text x="380" y="280" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">每条路线都保留版本、输入、输出和拒绝原因</text>
        </svg>
      </div>
    </section>
  );
}

const STATE_SAMPLES = {
  normal: { label: "正常", input: "合法请求", result: "状态提交", reason: "验证条件满足" },
  boundary: { label: "边界", input: "零值 / 最大值 / 恰好余额", result: "按规则接受或拒绝", reason: "阈值行为需记录" },
  failure: { label: "单故障", input: "签名 / nonce / 网络不匹配", result: "提交前拒绝", reason: "原状态保持不变" },
} as const;

type StateSample = keyof typeof STATE_SAMPLES;

export function BdpStateContractLab() {
  const [sample, setSample] = useState<StateSample>("normal");
  const [verified, setVerified] = useState(false);
  const [recorded, setRecorded] = useState(false);
  const active = STATE_SAMPLES[sample];
  const ready = verified && recorded;

  function reset() {
    setSample("normal");
    setVerified(false);
    setRecorded(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bdp-state-contract"
      aria-label={`区块链状态契约实验：${active.label}样本，输入${active.input}，结果${active.result}，验证${verified ? "完成" : "未完成"}，记录${recorded ? "完成" : "未完成"}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">State Contract · 状态实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">把“请求成功”拆成可检查的状态转移</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换正常、边界和单故障样本，观察验证、执行与证据记录如何共同决定是否改变状态。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <svg
          viewBox="0 0 760 320"
          role="img"
          aria-label={`状态契约链路：${active.label}样本，${active.input}经过验证，结果为${active.result}，原因是${active.reason}；验证${verified ? "完成" : "未完成"}，记录${recorded ? "完成" : "未完成"}。`}
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Before State → Verify → Apply / Reject → Evidence</text>
          <rect x="28" y="78" width="176" height="132" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="116" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Before</text>
          <text x="116" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.input}</text>
          <text x="116" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">保存状态摘要</text>
          <path d="M226 144 H260" stroke="var(--border)" strokeWidth="3" />
          <rect x="272" y="78" width="176" height="132" rx="14" fill={verified ? "var(--success)" : "var(--bg)"} fillOpacity={verified ? 0.12 : 1} stroke={verified ? "var(--success)" : "var(--border)"} strokeWidth="2" />
          <text x="360" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Verify</text>
          <text x="360" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{verified ? "条件已检查" : "等待检查"}</text>
          <text x="360" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{active.reason}</text>
          <path d="M470 144 H504" stroke="var(--border)" strokeWidth="3" />
          <rect x="516" y="78" width="216" height="132" rx="14" fill={ready ? "var(--success)" : "var(--warning)"} fillOpacity="0.12" stroke={ready ? "var(--success)" : "var(--warning)"} strokeWidth="2" />
          <text x="624" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Result</text>
          <text x="624" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.result}</text>
          <text x="624" y="178" textAnchor="middle" fontSize="11" fill={ready ? "var(--success)" : "var(--warning)"}>{ready ? "有原始记录" : "证据不完整"}</text>
          <text x="380" y="254" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">失败必须保留原状态，不能只返回一个模糊错误</text>
          <text x="380" y="280" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">输入、验证、回执和后状态要绑定到同一网络上下文</text>
        </svg>

        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择样本</p>
          <div className="grid grid-cols-3 gap-2">
            <ChoiceButton active={sample === "normal"} onClick={() => setSample("normal")}>正常</ChoiceButton>
            <ChoiceButton active={sample === "boundary"} onClick={() => setSample("boundary")}>边界</ChoiceButton>
            <ChoiceButton active={sample === "failure"} onClick={() => setSample("failure")}>单故障</ChoiceButton>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <ChoiceButton active={verified} onClick={() => setVerified((value) => !value)}>{verified ? "撤销验证" : "完成验证"}</ChoiceButton>
            <ChoiceButton active={recorded} onClick={() => setRecorded((value) => !value)}>{recorded ? "撤销原始记录" : "保存原始记录"}</ChoiceButton>
          </div>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            当前样本：{active.label}。{ready ? "可以比较预期与实际状态，并归档回执、错误对象和版本。" : "先完成验证和原始记录，再判断请求是否真的改变了链上状态。"}
          </p>
        </div>
      </div>
    </section>
  );
}

const EVIDENCE_GATES = {
  source: { label: "Source", detail: "来源与版本", output: "可追溯输入", check: "摘要 / 版本 / 网络" },
  replay: { label: "Replay", detail: "空环境重放", output: "可复现结果", check: "固定输入 / 原始输出" },
  release: { label: "Release", detail: "边界与故障", output: "可签发证据", check: "拒绝原因 / 回退点" },
} as const;

type EvidenceGate = keyof typeof EVIDENCE_GATES;

export function BdpEvidenceGateLab() {
  const [gate, setGate] = useState<EvidenceGate>("source");
  const [complete, setComplete] = useState(false);
  const active = EVIDENCE_GATES[gate];
  const ready = complete && gate === "release";

  function reset() {
    setGate("source");
    setComplete(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bdp-evidence-gate"
      aria-label={`区块链证据门禁实验：当前阶段${active.label}，${active.detail}，输出${active.output}；检查${complete ? "完成" : "未完成"}，${ready ? "允许发布" : "尚不能发布"}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Evidence Gate · 发布实验</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">来源、重放、失败证据缺一不可</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">推进证据门禁，理解为什么来源、版本、重放、边界和失败证据是乘法关系。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">推进证据阶段</p>
          <div className="grid gap-2">
            <ChoiceButton active={gate === "source"} onClick={() => setGate("source")}>Source：来源与版本</ChoiceButton>
            <ChoiceButton active={gate === "replay"} onClick={() => setGate("replay")}>Replay：空环境重放</ChoiceButton>
            <ChoiceButton active={gate === "release"} onClick={() => setGate("release")}>Release：边界与故障</ChoiceButton>
          </div>
          <ChoiceButton active={complete} onClick={() => setComplete((value) => !value)}>{complete ? "撤销阶段检查" : "完成阶段检查"}</ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            当前阶段：{active.detail}。{ready ? "五类证据都已闭合，可以提交发布包。" : `还需确认${active.check}，不能只凭命令返回或界面截图发布。`}
          </p>
        </div>

        <svg
          viewBox="0 0 760 320"
          role="img"
          aria-label={`证据门禁链路：${active.label}阶段，${active.detail}，检查${complete ? "完成" : "未完成"}；输出${active.output}，${ready ? "允许发布" : "尚不能发布"}。`}
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Source × Version × Replay × Boundary × Failure</text>
          <rect x="28" y="78" width="176" height="132" rx="14" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="2" />
          <text x="116" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{active.label}</text>
          <text x="116" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.detail}</text>
          <text x="116" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{active.check}</text>
          <path d="M226 144 H260" stroke="var(--border)" strokeWidth="3" />
          <rect x="272" y="78" width="176" height="132" rx="14" fill={complete ? "var(--success)" : "var(--bg)"} fillOpacity={complete ? 0.12 : 1} stroke={complete ? "var(--success)" : "var(--border)"} strokeWidth="2" />
          <text x="360" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Evidence</text>
          <text x="360" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{complete ? "证据已归档" : "等待归档"}</text>
          <text x="360" y="178" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">原始对象 + 观察合同</text>
          <path d="M470 144 H504" stroke="var(--border)" strokeWidth="3" />
          <rect x="516" y="78" width="216" height="132" rx="14" fill={ready ? "var(--success)" : "var(--warning)"} fillOpacity="0.12" stroke={ready ? "var(--success)" : "var(--warning)"} strokeWidth="2" />
          <text x="624" y="112" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">Decision</text>
          <text x="624" y="145" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">{active.output}</text>
          <text x="624" y="178" textAnchor="middle" fontSize="11" fill={ready ? "var(--success)" : "var(--warning)"}>{ready ? "允许发布" : "阻止发布"}</text>
          <text x="380" y="254" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">乘法门禁：任一证据为零，结论就不能发布</text>
          <text x="380" y="280" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">历史工具可迁移，但来源和验证合同不能被省略</text>
        </svg>
      </div>
    </section>
  );
}
