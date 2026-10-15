"use client";

import { useState } from "react";
import { useTeachingTimeline } from "@/components/mdx/anim/use-teaching-timeline";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";

const C = {
  bg: "var(--bg)",
  border: "var(--border)",
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  accent: "var(--accent)",
  danger: "var(--danger)",
  success: "var(--success)",
};
const panel =
  "not-prose my-6 min-w-0 rounded-xl border border-border bg-bg p-3 sm:p-5 text-primary [&_button]:min-h-11 [&_button]:min-w-11 [&_button]:focus-visible:outline-2 [&_button]:focus-visible:outline-offset-2 [&_button]:focus-visible:outline-accent [&_input]:h-11 [&_input]:min-w-11 [&_select]:min-h-11 [&_select]:w-full [&_select]:min-w-0 [&_select]:rounded-md [&_select]:border [&_select]:border-border [&_select]:bg-bg [&_select]:px-2 [&_select]:text-primary [&_select]:focus-visible:outline-2 [&_select]:focus-visible:outline-accent [&_input]:focus-visible:outline-2 [&_input]:focus-visible:outline-accent";
const button = "rounded-md border border-border px-3 py-2 text-sm";
const steps = [
  { label: "输入", caption: "冻结输入与假设" },
  { label: "操作", caption: "施加选定变化" },
  { label: "输出", caption: "计算预测结果" },
  { label: "核对", caption: "对照真值与边界" },
] as const;
function useDebateTrace() {
  return useTeachingTimeline({
    steps,
    build: (tl) => {
      const clock = { t: 0 };
      steps.forEach((s, i) => {
        tl.label(s.label, i * 1000);
      });
      tl.add(clock, { t: 4, duration: 4000, ease: "linear" }, 0);
    },
  });
}
const captions = Object.fromEntries(steps.map((s) => [s.label, s.caption]));

export function Llm01DebatesFutureContextContractLab() {
  const [strategy, setStrategy] = useState("memory");
  const [holdout, setHoldout] = useState(0);
  const [leak, setLeak] = useState(false);
  const trace = useDebateTrace();
  const correct = strategy === "rule" || leak ? 3 : 0;
  const reset = () => {
    setStrategy("memory");
    setHoldout(0);
    setLeak(false);
    trace.seek(0);
    trace.pause();
  };
  return (
    <section
      className={panel}
      data-lab="compositional-grid"
      data-visual-kind="held-out-cartesian-grid"
      aria-label="组合泛化实验"
    >
      <h3 className="text-lg font-semibold">
        实验一 · 未见组合，不等于未见零件
      </h3>
      <p className="my-2 text-sm text-secondary">
        目标值 /
        预测值；虚线格为留出组合，问号表示查表器没有答案。粗框按轨迹依次检查留出格。
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-sm">
          预测机制
          <select
            aria-label="预测机制"
            value={strategy}
            onChange={(e) => setStrategy(e.target.value)}
          >
            <option value="memory">记忆查表</option>
            <option value="rule">组合规则</option>
          </select>
        </label>
        <label className="text-sm">
          留出组
          <select
            aria-label="留出组"
            value={holdout}
            onChange={(e) => setHoldout(Number(e.target.value))}
          >
            <option value={0}>余数 0</option>
            <option value={1}>余数 1</option>
            <option value={2}>余数 2</option>
          </select>
        </label>
      </div>
      <svg
        className="mx-auto mt-3 block w-full max-w-[440px]"
        viewBox="0 0 330 350"
        role="img"
        aria-label={`3乘3属性组合网格，留出组${holdout}，${correct}个留出预测正确`}
      >
        <g fontSize={16} fill={C.text} textAnchor="middle">
          <text x={184} y={25}>
            列属性：1、2、3
          </text>
          {[0, 1, 2].map((c) => (
            <text key={c} x={97 + c * 83} y={56}>
              {c + 1}
            </text>
          ))}
          {[0, 1, 2].map((r) => (
            <text key={r} x={24} y={105 + r * 72}>
              {["A", "B", "C"][r]}
            </text>
          ))}
          {Array.from({ length: 9 }, (_, i) => {
            const r = Math.floor(i / 3),
              c = i % 3,
              held = (r + c) % 3 === holdout;
            const target = 1 + ((r + c) % 3);
            const prediction =
              held && strategy === "memory" && !leak ? "?" : target;
            const heldIndex = Array.from({ length: i }, (_, j) => j).filter(
              (j) => (Math.floor(j / 3) + (j % 3)) % 3 === holdout,
            ).length;
            const active = held && heldIndex === Math.min(2, trace.currentStep);
            return (
              <g key={i}>
                <rect
                  x={58 + c * 83}
                  y={73 + r * 72}
                  width={77}
                  height={60}
                  rx={7}
                  fill={held ? C.bg : C.border}
                  stroke={held && leak ? C.danger : active ? C.accent : C.muted}
                  strokeWidth={active ? 3 : 1}
                  strokeDasharray={held ? "5 3" : undefined}
                />
                <text x={97 + c * 83} y={109 + r * 72}>
                  {target} / {prediction}
                </text>
              </g>
            );
          })}
          <text x={165} y={317} fill={leak ? C.danger : C.accent}>
            留出正确：{correct} / 3
          </text>
          <text x={165} y={342}>
            {leak ? "切分失效：答案进入记忆" : "训练格 6；留出格 3"}
          </text>
        </g>
      </svg>
      <button
        type="button"
        className={button}
        aria-pressed={leak}
        onClick={() => setLeak(!leak)}
      >
        故障：泄漏留出答案 · {leak ? "已注入" : "未注入"}
      </button>
      <p className="mt-3 text-sm" data-result>
        {leak
          ? "虚高：查表器也能命中；这不是未见组合测试。"
          : strategy === "rule"
            ? "规则在3个留出格均正确，但规则由人写入，未发生学习。"
            : "查表器在训练格全对，3个留出格均无答案。"}
      </p>
      <TimelineControls
        timeline={trace}
        labelText={captions}
        reset={{ label: "完整重置", onClick: reset }}
      />
    </section>
  );
}

export function Llm01DebatesFutureComputeTraceLab() {
  const [u, setU] = useState(0);
  const [operation, setOperation] = useState("observe");
  const [confound, setConfound] = useState(false);
  const trace = useDebateTrace();
  const intervening = operation !== "observe";
  const cut = intervening && !confound && trace.currentStep >= 1;
  const x = cut ? Number(operation) : u;
  const yA = trace.currentStep >= 2 ? x : u;
  const yB = u;
  const reset = () => {
    setU(0);
    setOperation("observe");
    setConfound(false);
    trace.seek(0);
    trace.pause();
  };
  return (
    <section
      className={panel}
      data-lab="causal-intervention"
      data-visual-kind="observational-equivalence-do-graph"
      aria-label="因果干预实验"
    >
      <h3 className="text-lg font-semibold">实验二 · 相同观察，不同干预</h3>
      <p className="my-2 text-sm text-secondary">
        A：X=U，Y=X。B：X=U，Y=U。选干预后，单步到“操作”切入边，到“输出”传播数值。
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-sm">
          外生变量 U
          <select
            aria-label="外生变量 U"
            value={u}
            onChange={(e) => setU(Number(e.target.value))}
          >
            <option value={0}>0</option>
            <option value={1}>1</option>
          </select>
        </label>
        <label className="text-sm">
          操作方式
          <select
            aria-label="操作方式"
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
          >
            <option value="observe">只观察</option>
            <option value="0">do(X=0)</option>
            <option value="1">do(X=1)</option>
          </select>
        </label>
      </div>
      <svg
        className="mx-auto mt-3 block w-full max-w-[440px]"
        viewBox="0 0 330 420"
        role="img"
        aria-label={`两张因果图，${cut ? "X入边切断" : "保留观察边"}，A的Y为${yA}，B的Y为${yB}`}
      >
        <defs>
          <marker
            id="debate-arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill={C.muted} />
          </marker>
        </defs>
        {[0, 1].map((model) => {
          const top = 30 + model * 180;
          return (
            <g key={model} fontSize={16} fill={C.text} textAnchor="middle">
              <text x={165} y={top}>
                {model === 0
                  ? "A：中介链 U → X → Y"
                  : "B：共同原因 U → X，U → Y"}
              </text>
              <path
                d={`M 143 ${top + 53} L 83 ${top + 102}`}
                fill="none"
                stroke={cut ? C.danger : C.muted}
                strokeWidth={2}
                strokeDasharray={cut ? "5 4" : undefined}
                markerEnd="url(#debate-arrow)"
              />
              {cut && (
                <path
                  d={`M 101 ${top + 69} l 16 16 m -16 0 l 16 -16`}
                  stroke={C.danger}
                  strokeWidth={3}
                />
              )}
              <path
                d={
                  model === 0
                    ? `M 95 ${top + 125} L 234 ${top + 125}`
                    : `M 187 ${top + 53} L 247 ${top + 102}`
                }
                fill="none"
                stroke={C.muted}
                strokeWidth={2}
                markerEnd="url(#debate-arrow)"
              />
              {[
                [165, top + 40, "U", u],
                [65, top + 125, "X", x],
                [265, top + 125, "Y", model === 0 ? yA : yB],
              ].map(([cx, cy, label, value]) => (
                <g key={label}>
                  <circle
                    cx={Number(cx)}
                    cy={Number(cy)}
                    r={28}
                    fill={C.bg}
                    stroke={label === "X" && cut ? C.accent : C.border}
                    strokeWidth={3}
                  />
                  <text x={cx} y={Number(cy) + 6}>
                    {label}={value}
                  </text>
                </g>
              ))}
            </g>
          );
        })}
        <text
          x={165}
          y={405}
          fontSize={16}
          fill={yA !== yB ? C.accent : C.text}
          textAnchor="middle"
        >
          Y差：{Math.abs(yA - yB)} · {cut ? "替换X方程" : "未切边"}
        </text>
      </svg>
      <button
        type="button"
        className={button}
        aria-pressed={confound}
        onClick={() => setConfound(!confound)}
      >
        故障：以观察冒充干预 · {confound ? "已注入" : "未注入"}
      </button>
      <p className="mt-3 text-sm" data-result>
        {confound && intervening
          ? "故障保留了U→X，显示的仍是观察结果；不实施目标do操作，不能据此排除另一模型。"
          : cut
            ? `操作后 X=${x}；A预测Y=${yA}，B预测Y=${yB}。${x === u ? "本次干预恰与U相同，没有区分力。" : "推进到输出后可区分两模型。"}`
            : "观察样本都满足X=Y=U；相关相同不能选择因果方向。"}
      </p>
      <TimelineControls
        timeline={trace}
        labelText={captions}
        reset={{ label: "完整重置", onClick: reset }}
      />
    </section>
  );
}

const words = ["dax", "wug", "zup"];
function Referent({ kind, x, y }: { kind: number; x: number; y: number }) {
  const shape = { fill: C.bg, stroke: C.accent, strokeWidth: 3 };
  return kind === 0 ? (
    <circle cx={x} cy={y} r={19} {...shape} />
  ) : kind === 1 ? (
    <rect x={x - 18} y={y - 18} width={36} height={36} {...shape} />
  ) : (
    <path
      d={`M ${x} ${y - 22} L ${x + 22} ${y + 18} L ${x - 22} ${y + 18} Z`}
      {...shape}
    />
  );
}
export function Llm01DebatesFutureEvidenceGateLab() {
  const [permutation, setPermutation] = useState(0);
  const [channel, setChannel] = useState("text");
  const [stale, setStale] = useState(false);
  const trace = useDebateTrace();
  const anchored = channel === "point";
  const mapping = anchored && !stale ? permutation : 0;
  const correct = mapping === permutation ? 3 : 0;
  const reset = () => {
    setPermutation(0);
    setChannel("text");
    setStale(false);
    trace.seek(0);
    trace.pause();
  };
  return (
    <section
      className={panel}
      data-lab="referent-permutation"
      data-visual-kind="referent-permutation-bipartite"
      aria-label="符号落地实验"
    >
      <h3 className="text-lg font-semibold">实验三 · 换了所指，文字仍相同</h3>
      <p className="my-2 text-sm text-secondary">
        实线：系统当前指称。虚线：本轮真实约定。纯文本只展示候选0，不知道哪一个约定为真。
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-sm">
          真实指称置换
          <select
            aria-label="真实指称置换"
            value={permutation}
            onChange={(e) => setPermutation(Number(e.target.value))}
          >
            <option value={0}>循环 0</option>
            <option value={1}>循环 1</option>
            <option value={2}>循环 2</option>
          </select>
        </label>
        <label className="text-sm">
          可用通道
          <select
            aria-label="可用通道"
            value={channel}
            onChange={(e) => setChannel(e.target.value)}
          >
            <option value="text">仅同一段文字</option>
            <option value="point">另给外部指认</option>
          </select>
        </label>
      </div>
      <svg
        className="mx-auto mt-3 block w-full max-w-[440px]"
        viewBox="0 0 330 370"
        role="img"
        aria-label={`三个词与三个形状的二部指称图，真实循环${permutation}，系统循环${mapping}`}
      >
        <g fontSize={16} fill={C.text} textAnchor="middle">
          <text x={165} y={27}>
            同一文本：dax wug zup
          </text>
          {words.map((w, i) => (
            <g key={w}>
              <text x={55 + i * 110} y={70}>
                {w}
              </text>
              <path
                d={`M ${55 + i * 110} 86 L ${55 + ((i + permutation) % 3) * 110} 244`}
                stroke={C.muted}
                strokeWidth={2}
                strokeDasharray="5 5"
                fill="none"
              />
              <path
                d={`M ${55 + i * 110} 86 Q ${55 + i * 110} 170 ${55 + ((i + mapping) % 3) * 110} 244`}
                stroke={stale && anchored ? C.danger : C.accent}
                strokeWidth={trace.currentStep === i ? 4 : 2}
                fill="none"
              />
              <Referent kind={i} x={55 + i * 110} y={273} />
              <text x={55 + i * 110} y={317}>
                {["圆", "方", "三角"][i]}
              </text>
            </g>
          ))}
          <text x={165} y={354}>
            {anchored ? `指称命中 ${correct}/3` : "文本兼容3个循环候选"}
          </text>
        </g>
      </svg>
      <button
        type="button"
        className={button}
        aria-pressed={stale}
        onClick={() => setStale(!stale)}
      >
        故障：缓存旧指称 · {stale ? "已注入" : "未注入"}
      </button>
      <p className="mt-3 text-sm" data-result>
        {!anchored
          ? "即使候选0碰巧命中，也不是从文字识别了真实指称；还兼容另外两个循环约定。"
          : stale
            ? "指认通道存在，但缓存仍沿用循环0；换到循环1或2即可暴露失效。"
            : "外部指认更新映射，实线跟随虚线；这只验证给定约定下的指称一致性。"}
      </p>
      <TimelineControls
        timeline={trace}
        labelText={captions}
        reset={{ label: "完整重置", onClick: reset }}
      />
    </section>
  );
}
