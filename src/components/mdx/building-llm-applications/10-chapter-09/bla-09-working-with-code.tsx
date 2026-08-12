"use client";

import { useState } from "react";

const BUTTON_CLASS =
  "min-h-11 rounded-lg border border-border bg-background px-3 py-2 text-left text-sm transition hover:border-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]";

function ResetButton({ onClick }: { onClick: () => void }) {
  return (
    <button className={BUTTON_CLASS} onClick={onClick} type="button">
      重置实验
    </button>
  );
}

function ModeButton({
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
      aria-pressed={active}
      className={`${BUTTON_CLASS} ${active ? "border-[var(--accent)] bg-[var(--accent)] text-white" : ""}`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

type ContractMode = "specify" | "compare" | "release";

const contractModes: Record<
  ContractMode,
  { label: string; input: string; model: string; check: string; result: string }
> = {
  specify: {
    label: "写清需求",
    input: "函数契约",
    model: "候选代码",
    check: "类型与依赖",
    result: "可测试产物",
  },
  compare: {
    label: "比较模型",
    input: "冻结样例",
    model: "同一提示",
    check: "质量/成本",
    result: "可解释差异",
  },
  release: {
    label: "发布判断",
    input: "回归集合",
    model: "版本快照",
    check: "门禁证据",
    result: "发布或回退",
  },
};

export function Bla09ContractLab() {
  const [mode, setMode] = useState<ContractMode>("specify");
  const [unknownDependency, setUnknownDependency] = useState(false);
  const current = contractModes[mode];
  const nodes = [
    { x: 35, label: "输入", value: current.input },
    { x: 215, label: "模型", value: current.model },
    { x: 395, label: "检查", value: unknownDependency ? "依赖缺口" : current.check },
    { x: 575, label: "决策", value: unknownDependency ? "暂停" : current.result },
  ];

  return (
    <section
      aria-label="代码任务合同实验"
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bla-09-code-contract"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Code contract
          </p>
          <h3 className="mt-1 text-lg font-semibold">先固定验收，再比较代码模型</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            切换需求、比较或发布路径，再打开未知依赖，观察为什么“能生成代码”还不等于“能安全交付”。
          </p>
        </div>
        <ResetButton
          onClick={() => {
            setMode("specify");
            setUnknownDependency(false);
          }}
        />
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {(Object.keys(contractModes) as ContractMode[]).map((id) => (
          <ModeButton active={mode === id} key={id} onClick={() => setMode(id)}>
            {contractModes[id].label}
          </ModeButton>
        ))}
      </div>
      <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-sm">
        <input
          checked={unknownDependency}
          className="size-4 accent-[var(--accent)]"
          onChange={(event) => setUnknownDependency(event.target.checked)}
          type="checkbox"
        />
        引入未锁定的依赖
      </label>
      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-2">
        <svg
          aria-label="代码任务从输入经过模型和验证进入发布决策的流程图"
          className="h-auto min-w-[680px] w-full"
          role="img"
          viewBox="0 0 760 330"
        >
          <defs>
            <marker
              id="bla-09-contract-arrow"
              markerHeight="7"
              markerWidth="7"
              orient="auto-start-reverse"
              refX="6"
              refY="3.5"
              viewBox="0 0 7 7"
            >
              <path d="M0,0 L7,3.5 L0,7 z" fill="var(--accent)" />
            </marker>
          </defs>
          <text fill="var(--muted)" fontSize="12" x="28" y="30">
            当前路径：{current.label} · 依赖：{unknownDependency ? "未锁定" : "已锁定"}
          </text>
          {nodes.map((node, index) => (
            <g key={node.label}>
              <rect
                fill="var(--surface)"
                height="106"
                rx="12"
                stroke={unknownDependency && index >= 2 ? "var(--danger)" : "var(--border)"}
                strokeWidth="2"
                width="145"
                x={node.x}
                y="92"
              />
              <text
                fill="var(--accent)"
                fontSize="13"
                fontWeight="700"
                textAnchor="middle"
                x={node.x + 72}
                y="122"
              >
                {node.label}
              </text>
              <text fill="var(--text)" fontSize="12" textAnchor="middle" x={node.x + 72} y="153">
                {node.value}
              </text>
              {index < nodes.length - 1 ? (
                <line
                  markerEnd="url(#bla-09-contract-arrow)"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  x1={node.x + 145}
                  x2={nodes[index + 1].x - 12}
                  y1="145"
                  y2="145"
                />
              ) : null}
            </g>
          ))}
          <rect
            fill={unknownDependency ? "var(--danger-soft)" : "var(--surface)"}
            height="55"
            rx="10"
            stroke={unknownDependency ? "var(--danger)" : "var(--border)"}
            width="680"
            x="35"
            y="240"
          />
          <text fill="var(--text)" fontSize="12" textAnchor="middle" x="375" y="273">
            {unknownDependency
              ? "观察：依赖无法复现，先停在验证节点，不把模型解释当成安全证明。"
              : "观察：合同、版本、验证和决策被放进同一条可回放链。"}
          </text>
        </svg>
      </div>
      <p aria-live="polite" className="mt-3 text-sm text-muted">
        {unknownDependency
          ? "记录依赖名称、版本和许可，再决定升级、替换或拒绝执行。"
          : `当前路径用“${current.check}”支撑“${current.result}”。`}
      </p>
    </section>
  );
}

type SandboxMode = "scan" | "run" | "stop";

const sandboxModes: Record<
  SandboxMode,
  { label: string; code: string; policy: string; outcome: string }
> = {
  scan: { label: "静态扫描", code: "导入与外联", policy: "语法/依赖", outcome: "允许或拒绝" },
  run: { label: "隔离执行", code: "函数与数据", policy: "限时/限存", outcome: "运行报告" },
  stop: { label: "超限中止", code: "异常路径", policy: "熔断/清理", outcome: "失败证据" },
};

export function Bla09SandboxLab() {
  const [mode, setMode] = useState<SandboxMode>("scan");
  const [network, setNetwork] = useState(false);
  const current = sandboxModes[mode];
  const values = [
    { x: 35, label: "代码", value: current.code },
    { x: 215, label: "策略", value: network ? "网络开放" : current.policy },
    { x: 395, label: "运行时", value: network ? "外联风险" : mode === "stop" ? "已终止" : "隔离" },
    { x: 575, label: "报告", value: network ? "阻断" : current.outcome },
  ];

  return (
    <section
      aria-label="代码沙箱实验"
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bla-09-sandbox-trace"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Sandbox trace</p>
          <h3 className="mt-1 text-lg font-semibold">让代码先经过边界，再接触数据</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            在扫描、执行和中止之间切换，再打开网络，观察同一段生成代码如何被策略层拦截。
          </p>
        </div>
        <ResetButton
          onClick={() => {
            setMode("scan");
            setNetwork(false);
          }}
        />
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {(Object.keys(sandboxModes) as SandboxMode[]).map((id) => (
          <ModeButton active={mode === id} key={id} onClick={() => setMode(id)}>
            {sandboxModes[id].label}
          </ModeButton>
        ))}
      </div>
      <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-sm">
        <input
          checked={network}
          className="size-4 accent-[var(--accent)]"
          onChange={(event) => setNetwork(event.target.checked)}
          type="checkbox"
        />
        允许执行环境访问网络
      </label>
      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-2">
        <svg
          aria-label="生成代码从静态扫描经过隔离策略进入运行报告的流程图"
          className="h-auto min-w-[680px] w-full"
          role="img"
          viewBox="0 0 760 330"
        >
          <defs>
            <marker
              id="bla-09-sandbox-arrow"
              markerHeight="7"
              markerWidth="7"
              orient="auto-start-reverse"
              refX="6"
              refY="3.5"
              viewBox="0 0 7 7"
            >
              <path d="M0,0 L7,3.5 L0,7 z" fill="var(--accent)" />
            </marker>
          </defs>
          <text fill="var(--muted)" fontSize="12" x="28" y="30">
            当前阶段：{current.label} · 网络：{network ? "开放" : "关闭"}
          </text>
          {values.map((node, index) => (
            <g key={node.label}>
              <rect
                fill="var(--surface)"
                height="106"
                rx="12"
                stroke={network && index >= 1 ? "var(--danger)" : "var(--border)"}
                strokeWidth="2"
                width="145"
                x={node.x}
                y="92"
              />
              <text fill="var(--accent)" fontSize="13" fontWeight="700" textAnchor="middle" x={node.x + 72} y="122">
                {node.label}
              </text>
              <text fill="var(--text)" fontSize="12" textAnchor="middle" x={node.x + 72} y="153">
                {node.value}
              </text>
              {index < values.length - 1 ? (
                <line
                  markerEnd="url(#bla-09-sandbox-arrow)"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  x1={node.x + 145}
                  x2={values[index + 1].x - 12}
                  y1="145"
                  y2="145"
                />
              ) : null}
            </g>
          ))}
          <rect
            fill={network ? "var(--danger-soft)" : "var(--surface)"}
            height="55"
            rx="10"
            stroke={network ? "var(--danger)" : "var(--border)"}
            width="680"
            x="35"
            y="240"
          />
          <text fill="var(--text)" fontSize="12" textAnchor="middle" x="375" y="273">
            {network
              ? "观察：网络通道打开后，沙箱不再能证明本地数据不会外泄。"
              : "观察：限时、限存、无网络和依赖白名单共同缩小执行爆炸半径。"}
          </text>
        </svg>
      </div>
      <p aria-live="polite" className="mt-3 text-sm text-muted">
        {network
          ? "先关闭网络并重新扫描；若业务确实需要外联，改用受控代理和逐请求审计。"
          : `当前策略“${current.policy}”把代码变成可观察的运行报告。`}
      </p>
    </section>
  );
}

type TestMode = "normal" | "boundary" | "adversarial";

const testModes: Record<
  TestMode,
  { label: string; sample: string; assertion: string; signal: string; gate: string }
> = {
  normal: { label: "正常样例", sample: "排序数组", assertion: "升序成立", signal: "通过", gate: "继续" },
  boundary: { label: "边界样例", sample: "空/重复值", assertion: "稳定性", signal: "差异", gate: "修订" },
  adversarial: { label: "对抗样例", sample: "超大输入", assertion: "资源上限", signal: "拒绝", gate: "回退" },
};

export function Bla09TestLab() {
  const [mode, setMode] = useState<TestMode>("normal");
  const [explanation, setExplanation] = useState(false);
  const current = testModes[mode];
  const cells = [
    { x: 35, label: "样例", value: current.sample },
    { x: 215, label: "断言", value: current.assertion },
    { x: 395, label: "差异", value: explanation ? "解释/实跑" : current.signal },
    { x: 575, label: "门禁", value: current.gate },
  ];

  return (
    <section
      aria-label="代码回归测试实验"
      className="not-prose my-8 overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5"
      data-visual-kind="bla-09-regression-grid"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Regression grid</p>
          <h3 className="mt-1 text-lg font-semibold">让测试暴露“解释”和“执行”的分叉</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            选择正常、边界或对抗样例，再要求保存解释和实跑结果，观察发布门禁如何拒绝漂亮但错误的答案。
          </p>
        </div>
        <ResetButton
          onClick={() => {
            setMode("normal");
            setExplanation(false);
          }}
        />
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {(Object.keys(testModes) as TestMode[]).map((id) => (
          <ModeButton active={mode === id} key={id} onClick={() => setMode(id)}>
            {testModes[id].label}
          </ModeButton>
        ))}
      </div>
      <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-2 text-sm">
        <input
          checked={explanation}
          className="size-4 accent-[var(--accent)]"
          onChange={(event) => setExplanation(event.target.checked)}
          type="checkbox"
        />
        保存模型解释与实际输出
      </label>
      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-background p-2">
        <svg
          aria-label="代码测试从样例经过断言和差异记录进入发布门禁的流程图"
          className="h-auto min-w-[680px] w-full"
          role="img"
          viewBox="0 0 760 330"
        >
          <defs>
            <marker
              id="bla-09-test-arrow"
              markerHeight="7"
              markerWidth="7"
              orient="auto-start-reverse"
              refX="6"
              refY="3.5"
              viewBox="0 0 7 7"
            >
              <path d="M0,0 L7,3.5 L0,7 z" fill="var(--accent)" />
            </marker>
          </defs>
          <text fill="var(--muted)" fontSize="12" x="28" y="30">
            当前集合：{current.label} · 证据：{explanation ? "双轨" : "只留结果"}
          </text>
          {cells.map((node, index) => (
            <g key={node.label}>
              <rect
                fill="var(--surface)"
                height="106"
                rx="12"
                stroke={mode !== "normal" && index >= 1 ? "var(--danger)" : "var(--border)"}
                strokeWidth="2"
                width="145"
                x={node.x}
                y="92"
              />
              <text fill="var(--accent)" fontSize="13" fontWeight="700" textAnchor="middle" x={node.x + 72} y="122">
                {node.label}
              </text>
              <text fill="var(--text)" fontSize="12" textAnchor="middle" x={node.x + 72} y="153">
                {node.value}
              </text>
              {index < cells.length - 1 ? (
                <line
                  markerEnd="url(#bla-09-test-arrow)"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  x1={node.x + 145}
                  x2={cells[index + 1].x - 12}
                  y1="145"
                  y2="145"
                />
              ) : null}
            </g>
          ))}
          <rect
            fill={mode !== "normal" && !explanation ? "var(--danger-soft)" : "var(--surface)"}
            height="55"
            rx="10"
            stroke={mode !== "normal" && !explanation ? "var(--danger)" : "var(--border)"}
            width="680"
            x="35"
            y="240"
          />
          <text fill="var(--text)" fontSize="12" textAnchor="middle" x="375" y="273">
            {mode !== "normal" && !explanation
              ? "观察：缺少解释与实跑对照，边界失败不能被平均通过率掩盖。"
              : "观察：逐样例保存断言、差异和资源信号，发布结论才有回放入口。"}
          </text>
        </svg>
      </div>
      <p aria-live="polite" className="mt-3 text-sm text-muted">
        {mode !== "normal" && !explanation
          ? "打开双轨证据并补充失败样例；不要用模型的自然语言替代执行日志。"
          : `当前集合用“${current.assertion}”检查，门禁动作是“${current.gate}”。`}
      </p>
    </section>
  );
}
