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

const PROJECT_STAGES = ["初始化", "编译", "迁移"];
const PROJECT_DETAILS = [
  "contracts、migrations、test 与 Network Profile",
  "ABI、bytecode、Compiler 与编译日志",
  "migration 编号、Receipt、地址与 Runtime Code",
];

export function BdpCh10ProjectLab() {
  const [stage, setStage] = useState(0);
  const [verified, setVerified] = useState(false);

  function reset() {
    setStage(0);
    setVerified(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bdp-ch10-project-lifecycle"
      aria-label={`项目生命周期实验：当前阶段${PROJECT_STAGES[stage]}，证据${verified ? "已核对" : "未核对"}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 10 · 项目生命周期</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">从空目录到可重放实例</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">推进阶段，观察每一步新增的工程证据。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择项目阶段</p>
          <div className="grid gap-2">
            {PROJECT_STAGES.map((label, index) => (
              <ChoiceButton
                key={label}
                active={stage === index}
                onClick={() => {
                  setStage(index);
                  setVerified(false);
                }}
              >
                {`${index + 1}. ${label}`}
              </ChoiceButton>
            ))}
          </div>
          <ChoiceButton active={verified} onClick={() => setVerified((value) => !value)}>
            {verified ? "取消证据核对" : "核对当前证据"}
          </ChoiceButton>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {PROJECT_STAGES[stage]}：{PROJECT_DETAILS[stage]}。{verified ? "证据已归档，可交给下一步复核。" : "先预测，再检查该阶段是否具备可重放字段。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 330"
          role="img"
          aria-label={`项目生命周期图：${PROJECT_STAGES.join("、")}；当前${PROJECT_STAGES[stage]}；${verified ? "证据已核对" : "证据待核对"}。`}
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Project → Artifact → Migration → Network</text>
          {PROJECT_STAGES.map((label, index) => {
            const reached = stage >= index;
            const color = reached ? "var(--success)" : "var(--accent)";
            const x = 26 + index * 180;
            return (
              <g key={label}>
                <rect x={x} y="80" width="148" height="132" rx="14" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="2" />
                <text x={x + 74} y="116" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{label}</text>
                <text x={x + 74} y="148" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{PROJECT_DETAILS[index].split("、")[0]}</text>
                <text x={x + 74} y="174" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{reached ? "已到达" : "待到达"}</text>
                {index < PROJECT_STAGES.length - 1 ? <path d={`M${x + 154} 146 H${x + 172}`} stroke="var(--border)" strokeWidth="3" /> : null}
              </g>
            );
          })}
          <rect x="566" y="80" width="166" height="132" rx="14" fill={verified ? "var(--success)" : "var(--warning)"} fillOpacity="0.12" stroke={verified ? "var(--success)" : "var(--warning)"} strokeWidth="2" />
          <text x="649" y="116" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">证据</text>
          <text x="649" y="148" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{verified ? "可复核" : "缺核对"}</text>
          <text x="649" y="176" textAnchor="middle" fontSize="11" fill={verified ? "var(--success)" : "var(--warning)"}>{verified ? "PASS" : "PENDING"}</text>
          <text x="380" y="268" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">迁移前固定版本、网络、账户和 artifact；迁移后保存 Receipt 与地址</text>
          <text x="380" y="292" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">当前阶段：{PROJECT_STAGES[stage]} · {verified ? "字段已核对" : "字段未核对"}</text>
        </svg>
      </div>
    </section>
  );
}

const INTERACTIONS = {
  trade: { label: "交易", input: "账户、nonce、Gas 与签名", output: "Receipt、事件与前后状态" },
  call: { label: "只读调用", input: "provider、区块与调用参数", output: "result 或模拟 error" },
  abstract: { label: "合约抽象", input: "ABI、网络地址与账户", output: "可定位的实例方法" },
} as const;

type InteractionKind = keyof typeof INTERACTIONS;

export function BdpCh10InteractionLab() {
  const [kind, setKind] = useState<InteractionKind>("trade");
  const [stage, setStage] = useState(0);
  const [fault, setFault] = useState(false);
  const active = INTERACTIONS[kind];
  const stages = ["绑定输入", "执行路径", "观察结果", "状态断言"];

  function reset() {
    setKind("trade");
    setStage(0);
    setFault(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bdp-ch10-interaction-boundary"
      aria-label={`合约交互实验：${active.label}，当前阶段${stages[stage]}，${fault ? "已注入错误" : "未注入错误"}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 10 · 交互边界</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">有返回值不等于状态已改变</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">切换交互类型，比较它们需要保存的输入与结果。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择交互类型</p>
          <div className="grid gap-2">
            {(Object.keys(INTERACTIONS) as InteractionKind[]).map((value) => (
              <ChoiceButton
                key={value}
                active={kind === value}
                onClick={() => {
                  setKind(value);
                  setStage(0);
                  setFault(false);
                }}
              >
                {INTERACTIONS[value].label}
              </ChoiceButton>
            ))}
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <ChoiceButton active={stage > 0} onClick={() => setStage((value) => Math.min(value + 1, 3))}>推进一个阶段</ChoiceButton>
            <ChoiceButton active={fault} onClick={() => setFault((value) => !value)}>注入错误</ChoiceButton>
          </div>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.label}需要：{active.input}。当前在“{stages[stage]}”；{fault ? "保留错误对象并停止发布。" : active.output + "是下一步的观察结果。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 330"
          role="img"
          aria-label={`交互边界图：${active.label}从${active.input}到${active.output}，当前${stages[stage]}。`}
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Input → Contract Instance → Result → Assertion</text>
          {stages.map((label, index) => {
            const reached = stage >= index;
            const color = fault && index >= 1 ? "var(--warning)" : reached ? "var(--success)" : "var(--accent)";
            const x = 24 + index * 184;
            return (
              <g key={label}>
                <rect x={x} y="82" width="150" height="128" rx="14" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="2" />
                <text x={x + 75} y="118" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{label}</text>
                <text x={x + 75} y="151" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{index === 0 ? active.input.split("、")[0] : index === 1 ? active.label : index === 2 ? active.output.split("、")[0] : "证据"}</text>
                <text x={x + 75} y="177" textAnchor="middle" fontSize="11" fill={color}>{fault && index >= 1 ? "STOP" : reached ? "已记录" : "待记录"}</text>
                {index < stages.length - 1 ? <path d={`M${x + 156} 146 H${x + 176}`} stroke="var(--border)" strokeWidth="3" /> : null}
              </g>
            );
          })}
          <text x="380" y="268" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">交易等 Receipt；call 等 result；抽象层必须绑定正确网络和 ABI</text>
          <text x="380" y="292" textAnchor="middle" fontSize="11" fill={fault ? "var(--warning)" : "var(--text-secondary)"}>{fault ? "错误已保留：不把模拟结果当成状态提交" : `当前路径：${active.label} · ${stages[stage]}`}</text>
        </svg>
      </div>
    </section>
  );
}

const TEST_MODES = {
  javascript: { label: "JavaScript", fixture: "账户、部署实例、Receipt", assertion: "事件与前后状态" },
  solidity: { label: "Solidity", fixture: "EVM 内 Fixture 与 helper", assertion: "权限与回滚条件" },
  both: { label: "组合测试", fixture: "同一起点的跨层样本", assertion: "成功、边界与失败证据" },
} as const;

type TestMode = keyof typeof TEST_MODES;

export function BdpCh10TestLab() {
  const [mode, setMode] = useState<TestMode>("javascript");
  const [asserted, setAsserted] = useState(false);
  const [failure, setFailure] = useState(false);
  const active = TEST_MODES[mode];
  const stages = ["Fixture", "Test", "Transaction", "Assertion"];

  function reset() {
    setMode("javascript");
    setAsserted(false);
    setFailure(false);
  }

  return (
    <section
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bdp-ch10-test-evidence"
      aria-label={`测试证据实验：${active.label}，${failure ? "已注入失败路径" : "成功路径"}，断言${asserted ? "已完成" : "未完成"}。`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Chapter 10 · 测试证据</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">成功与回滚都要可观察</h3>
          <p className="mt-1 text-sm leading-6 text-secondary">选择测试层，切换失败路径并完成最终断言。</p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="space-y-3 rounded-card border border-border bg-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">选择测试方式</p>
          <div className="grid gap-2">
            {(Object.keys(TEST_MODES) as TestMode[]).map((value) => (
              <ChoiceButton
                key={value}
                active={mode === value}
                onClick={() => {
                  setMode(value);
                  setAsserted(false);
                  setFailure(false);
                }}
              >
                {TEST_MODES[value].label}
              </ChoiceButton>
            ))}
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <ChoiceButton active={asserted} onClick={() => setAsserted((value) => !value)}>{asserted ? "清除断言" : "完成断言"}</ChoiceButton>
            <ChoiceButton active={failure} onClick={() => setFailure((value) => !value)}>切换失败路径</ChoiceButton>
          </div>
          <p className="rounded-control border border-accent bg-accent/10 p-3 text-sm leading-6 text-secondary" aria-live="polite">
            {active.label}从{active.fixture}开始，重点断言{active.assertion}。{failure ? "失败原因与原状态必须保留。" : asserted ? "成功路径已留下可复核证据。" : "先写预期断言，再运行用例。"}
          </p>
        </div>

        <svg
          viewBox="0 0 760 330"
          role="img"
          aria-label={`测试证据图：${active.label}从${active.fixture}经过${stages.join("、")}，${failure ? "失败原因已保留" : asserted ? "断言已完成" : "断言未完成"}。`}
          className="block h-auto w-full rounded-card border border-border bg-bg"
        >
          <text x="380" y="30" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)">Fixture → Test → Transaction → Assertion</text>
          {stages.map((label, index) => {
            const reached = index === 0 || asserted;
            const color = failure && index >= 2 ? "var(--warning)" : reached ? "var(--success)" : "var(--accent)";
            const x = 24 + index * 184;
            return (
              <g key={label}>
                <rect x={x} y="82" width="150" height="128" rx="14" fill={color} fillOpacity="0.12" stroke={color} strokeWidth="2" />
                <text x={x + 75} y="118" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{label}</text>
                <text x={x + 75} y="151" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{index === 0 ? active.fixture.split("、")[0] : index === 1 ? active.label : index === 2 ? "状态变化" : "证据"}</text>
                <text x={x + 75} y="177" textAnchor="middle" fontSize="11" fill={color}>{failure && index >= 2 ? "回滚" : reached ? "已记录" : "待记录"}</text>
                {index < stages.length - 1 ? <path d={`M${x + 156} 146 H${x + 176}`} stroke="var(--border)" strokeWidth="3" /> : null}
              </g>
            );
          })}
          <text x="380" y="268" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">JavaScript 便于编排；Solidity 贴近 EVM；两者都要断言结果</text>
          <text x="380" y="292" textAnchor="middle" fontSize="11" fill={failure ? "var(--warning)" : asserted ? "var(--success)" : "var(--text-secondary)"}>{failure ? "失败证据：错误 + 原状态 + 回滚分支" : asserted ? "断言完成：成功与边界可复核" : "断言待完成：不要只保存截图"}</text>
        </svg>
      </div>
    </section>
  );
}
