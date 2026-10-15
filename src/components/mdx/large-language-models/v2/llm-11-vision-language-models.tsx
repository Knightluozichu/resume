"use client";

import { useCallback, useState, type ReactNode } from "react";
import { useTeachingTimeline } from "@/components/mdx/anim/use-teaching-timeline";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";

const C = {
  ink: "var(--text-primary)",
  muted: "var(--text-secondary)",
  accent: "var(--accent)",
  line: "var(--border)",
  fill: "var(--bg-elevated)",
  danger: "var(--danger)",
};
const control =
  "min-h-11 min-w-11 rounded border border-border bg-elevated px-2 text-sm text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
const clipSteps = ["向量归一化", "余弦矩阵", "双向配对损失"].map((label) => ({
  label,
}));
const prefixSteps = ["矩阵乘法", "重排前缀", "拼接检查"].map((label) => ({
  label,
}));
const crossSteps = ["时间可见性", "遮罩与归一化", "加权视觉输出"].map(
  (label) => ({ label }),
);
function useTrace(steps: { label: string }[]) {
  const build = useCallback(
    (tl: Parameters<Parameters<typeof useTeachingTimeline>[0]["build"]>[0]) => {
      const clock = { value: 0 };
      steps.forEach((s, i) => tl.label(s.label, i * 1000));
      tl.add(
        clock,
        { value: steps.length, duration: steps.length * 1000, ease: "linear" },
        0,
      );
    },
    [steps],
  );
  return useTeachingTimeline({ steps, build });
}
function Frame({
  id,
  kind,
  title,
  children,
}: {
  id: string;
  kind: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      data-lab={id}
      data-visual-kind={kind}
      aria-label={title}
      className="not-prose my-6 min-w-0 rounded-xl border border-border bg-elevated p-3 text-primary sm:p-5 [&_button]:min-h-11 [&_button]:min-w-11 [&_button]:focus-visible:outline-2 [&_button]:focus-visible:outline-offset-2 [&_button]:focus-visible:outline-accent [&_input]:min-h-11 [&_input]:focus-visible:outline-2 [&_input]:focus-visible:outline-accent [&_svg]:mx-auto [&_svg]:block [&_svg]:w-full [&_svg]:max-w-[520px]"
    >
      <h3 className="mb-2 text-base font-semibold">{title}</h3>
      <p className="mb-3 text-sm text-secondary">
        手工给定小矩阵的真实计算；不运行图像编码器或LLM，不训练模型。
      </p>
      {children}
    </section>
  );
}
function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex min-w-0 flex-col gap-1 text-sm">
      {label}
      {children}
    </label>
  );
}
function Fault({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      data-fault={active ? "active" : "inactive"}
      aria-pressed={active}
      onClick={onClick}
      className={`${control} my-3 w-full text-left`}
    >
      {active ? "恢复正常：" : "注入故障："}
      {children}
    </button>
  );
}
function Cell({
  x,
  y,
  w = 64,
  h = 40,
  text,
  active = false,
  danger = false,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  text: string;
  active?: boolean;
  danger?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={4}
        fill={C.fill}
        stroke={danger ? C.danger : active ? C.accent : C.line}
        strokeWidth={active || danger ? 2.5 : 1}
      />
      <text
        x={x + w / 2}
        y={y + h / 2 + 6}
        textAnchor="middle"
        fill={danger ? C.danger : C.ink}
      >
        {text}
      </text>
    </g>
  );
}
const fmt = (n: number) => n.toFixed(3);
const dot = (a: number[], b: number[]) =>
  a.reduce((s, x, i) => s + x * b[i], 0);
const unit = (v: number[]) => v.map((x) => x / Math.hypot(...v));
function softmax(v: number[]) {
  const m = Math.max(...v);
  const e = v.map((x) => Math.exp(x - m));
  const sum = e.reduce((a, b) => a + b, 0);
  return e.map((x) => x / sum);
}

/** CLIP式双向目标；目标置换不应暗中改变相似度。 */
export function Llm11VisionLanguageModelsContextContractLab() {
  const [third, setThird] = useState("opposite");
  const [tau, setTau] = useState("1");
  const [fault, setFault] = useState(false);
  const timeline = useTrace(clipSteps);
  const images = [
    [1, 0],
    [0, 1],
    [1, 1],
  ].map(unit);
  const texts = [[1, 0], [0, 1], third === "opposite" ? [-1, 0] : [1, 1]].map(
    unit,
  );
  const cos = images.map((i) => texts.map((t) => dot(i, t)));
  const scores = cos.map((row) => row.map((x) => x / Number(tau)));
  const probs = scores.map(softmax);
  const targets = fault ? [1, 0, 2] : [0, 1, 2];
  const rowLoss =
    -probs.reduce((s, row, i) => s + Math.log(row[targets[i]]), 0) / 3;
  const colLoss =
    -scores.reduce(
      (s, _, j) =>
        s + Math.log(softmax(scores.map((row) => row[j]))[targets.indexOf(j)]),
      0,
    ) / 3;
  const reset = () => {
    timeline.pause();
    timeline.seek(0);
    setThird("opposite");
    setTau("1");
    setFault(false);
  };
  return (
    <Frame
      id="clip"
      kind="clip-cosine-pairing-matrix"
      title="实验一：相似度不等于正确配对"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="第三个文本向量">
          <select
            aria-label="第三个文本向量"
            value={third}
            onChange={(e) => setThird(e.target.value)}
            className={control}
          >
            <option value="opposite">反向 (−1, 0)</option>
            <option value="diagonal">对角 (1, 1)</option>
          </select>
        </Field>
        <Field label="温度 τ">
          <select
            aria-label="温度 τ"
            value={tau}
            onChange={(e) => setTau(e.target.value)}
            className={control}
          >
            <option value="1">1</option>
            <option value="0.5">0.5</option>
          </select>
        </Field>
      </div>
      <Fault active={fault} onClick={() => setFault(!fault)}>
        只交换前两个目标配对
      </Fault>
      <svg
        viewBox="0 0 330 345"
        role="img"
        aria-label="三乘三余弦矩阵，圆圈标记监督目标；底部列出图像检索概率"
        fontSize="16"
      >
        <text
          x="10"
          y="22"
          fill={timeline.currentStep === 0 ? C.accent : C.ink}
        >
          I₀=(1,0) I₁=(0,1) I₂=(1,1)
        </text>
        <text x="10" y="48" fill={C.muted}>
          先单位化；格内为 cos，不含温度
        </text>
        {[0, 1, 2].map((j) => (
          <text
            key={j}
            x={112 + j * 78}
            y="80"
            textAnchor="middle"
            fill={C.muted}
          >
            T{j}
          </text>
        ))}
        {cos.map((row, i) => (
          <g key={i}>
            <text x="18" y={117 + i * 54} fill={C.ink}>
              I{i}
            </text>
            {row.map((value, j) => (
              <g key={j}>
                <rect
                  x={76 + j * 78}
                  y={90 + i * 54}
                  width="72"
                  height="44"
                  rx="4"
                  fill={C.accent}
                  fillOpacity={0.06 + (value + 1) * 0.12}
                  stroke={timeline.currentStep === 1 ? C.accent : C.line}
                />
                <text
                  x={112 + j * 78}
                  y={117 + i * 54}
                  textAnchor="middle"
                  fill={C.ink}
                >
                  {fmt(value)}
                </text>
                {targets[i] === j && (
                  <circle
                    cx={139 + j * 78}
                    cy={96 + i * 54}
                    r="5"
                    fill={fault ? C.danger : C.accent}
                  />
                )}
              </g>
            ))}
          </g>
        ))}
        <text
          x="10"
          y="263"
          fill={timeline.currentStep === 2 ? C.accent : C.muted}
        >
          每行检索：argmax softmax(cos/τ)
        </text>
        {probs.map((p, i) => (
          <text key={i} x="10" y={287 + i * 20} fill={C.ink}>
            I{i} → T{p.indexOf(Math.max(...p))}，最高 p={fmt(Math.max(...p))}
          </text>
        ))}
      </svg>
      <div
        className="mt-3 space-y-1 text-sm"
        aria-live="polite"
        data-result="clip"
      >
        <p>
          目标 T：[{targets.join(", ")}]；L行 = {fmt(rowLoss)}；L列 ={" "}
          {fmt(colLoss)}
        </p>
        <p>
          L = (L行 + L列)/2 = <strong>{fmt((rowLoss + colLoss) / 2)}</strong>
          （自然对数）
        </p>
        <p>I₂ 的检索分布 = [{probs[2].map(fmt).join(", ")}]</p>
      </div>
      <p className="mt-3 text-sm text-secondary">
        圆点是监督目标，不是检索预测。故障改损失、不改余弦格或检索分布。降低正温度会放大分数差，但不会改变最大值位置；I₂初始并列时用较小索引打破平局。
      </p>
      <TimelineControls
        timeline={timeline}
        reset={{ label: "完整重置", onClick: reset }}
        caption="单步依次突出归一化、矩阵与双向目标；全部数值始终可核查。"
      />
    </Frame>
  );
}

const projection = [
  [1, 0, 1],
  [0, 1, 0],
  [1, -1, 0],
  [0, 0, 1],
];
/** 固定LM宽度，改变前缀长度不能改变每个token的宽度。 */
export function Llm11VisionLanguageModelsComputeTraceLab() {
  const [vector, setVector] = useState("default");
  const [length, setLength] = useState("2");
  const [fault, setFault] = useState(false);
  const timeline = useTrace(prefixSteps);
  const v = vector === "default" ? [1, 2, 1] : [2, 0, -1];
  const m = Number(length);
  const p = projection.slice(0, 2 * m);
  const z = p.map((row) => dot(row, v));
  const prefix = Array.from({ length: m }, (_, i) =>
    z.slice(2 * i, 2 * i + (fault ? 1 : 2)),
  );
  const reset = () => {
    timeline.pause();
    timeline.seek(0);
    setVector("default");
    setLength("2");
    setFault(false);
  };
  return (
    <Frame
      id="prefix"
      kind="visual-prefix-project-reshape"
      title="实验二：投影、重排与序列拼接"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="视觉特征 v">
          <select
            aria-label="视觉特征 v"
            value={vector}
            onChange={(e) => setVector(e.target.value)}
            className={control}
          >
            <option value="default">(1, 2, 1)</option>
            <option value="alternate">(2, 0, −1)</option>
          </select>
        </Field>
        <Field label="前缀 token 数 m">
          <select
            aria-label="前缀 token 数 m"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className={control}
          >
            <option value="2">2</option>
            <option value="1">1</option>
          </select>
        </Field>
      </div>
      <Fault active={fault} onClick={() => setFault(!fault)}>
        仅丢掉前缀的最后一列
      </Fault>
      <svg
        viewBox="0 0 330 440"
        role="img"
        aria-label="投影矩阵每行与视觉向量相乘，重排为双列前缀，再与文本嵌入拼接"
        fontSize="16"
      >
        <text x="10" y="22" fill={C.ink}>
          P ({2 * m}×3) · v (3×1) = z
        </text>
        <text x="10" y="47" fill={C.muted}>
          v = [{v.join(", ")}]；每行点积
        </text>
        {p.map((row, i) => (
          <g key={i}>
            {row.map((n, j) => (
              <Cell
                key={j}
                x={10 + j * 42}
                y={62 + i * 38}
                w={39}
                h={34}
                text={String(n)}
                active={timeline.currentStep === 0}
              />
            ))}
            <text x="140" y={85 + i * 38} fill={C.muted}>
              · v =
            </text>
            <Cell
              x={209}
              y={62 + i * 38}
              w={105}
              h={34}
              text={String(z[i])}
              active={timeline.currentStep === 0}
            />
          </g>
        ))}
        <text x="10" y="239" fill={C.ink}>
          reshape：{m} 个 token × 2 维
        </text>
        {Array.from({ length: m }, (_, i) => (
          <g key={i}>
            <text x="10" y={276 + i * 43} fill={C.muted}>
              前缀{i}
            </text>
            {[0, 1].map((j) => (
              <Cell
                key={j}
                x={90 + j * 110}
                y={250 + i * 43}
                w={99}
                text={fault && j === 1 ? "丢弃" : String(z[2 * i + j])}
                danger={fault && j === 1}
                active={timeline.currentStep === 1}
              />
            ))}
          </g>
        ))}
        <text x="10" y="357" fill={C.ink}>
          文本 token：[0.5, −0.5]，宽度2
        </text>
        <path
          d="M 165 365 L 165 372"
          stroke={fault ? C.danger : C.accent}
          strokeWidth="2"
        />
        <rect
          x="10"
          y="375"
          width="304"
          height="54"
          rx="5"
          fill={C.fill}
          stroke={
            fault ? C.danger : timeline.currentStep === 2 ? C.accent : C.line
          }
          strokeWidth="2"
        />
        <text
          x="162"
          y="407"
          textAnchor="middle"
          fill={fault ? C.danger : C.ink}
        >
          {fault
            ? `拒绝：${m}×1 不能拼到宽度2`
            : `拼接成功：(${m}+1)×2 = ${m + 1}×2`}
        </text>
      </svg>
      <div
        className="mt-3 space-y-1 break-words text-sm"
        aria-live="polite"
        data-result="prefix"
      >
        <p>
          z = [{z.join(", ")}]；实际前缀 = {JSON.stringify(prefix)}
        </p>
        <p>
          {fault
            ? "shape 检查失败：不生成伪造的补零结果。"
            : `序列 = ${JSON.stringify([...prefix, [0.5, -0.5]])}`}
        </p>
      </div>
      <p className="mt-3 text-sm text-secondary">
        这是可训练视觉前缀接口的维度小例，不是 Frozen 的完整图像编码器。P
        未经学习；shape 合法不能证明语义对齐。冻结LM权重不等于切断前缀的梯度。
      </p>
      <TimelineControls
        timeline={timeline}
        reset={{ label: "完整重置", onClick: reset }}
        caption="逐行点积 → 重排 → 检查拼接，m改序列长度，D=2保持不变。"
      />
    </Frame>
  );
}

/** image-causal mask与文本自注意力三角遮罩是不同轴上的约束。 */
export function Llm11VisionLanguageModelsEvidenceGateLab() {
  const [query, setQuery] = useState("0");
  const [direction, setDirection] = useState("x");
  const [fault, setFault] = useState(false);
  const timeline = useTrace(crossSteps);
  const row = Number(query);
  const q = direction === "x" ? [1, 0] : [0, 1];
  const logits = q.map((x) => x / Math.sqrt(2));
  const visibleImage = row === 0 ? 0 : 1;
  const allowed = [0, 1].map((i) => fault || i === visibleImage);
  const weights = softmax(logits.map((x, i) => (allowed[i] ? x : -Infinity)));
  const output = [2 * weights[0], 4 * weights[1]];
  const reset = () => {
    timeline.pause();
    timeline.seek(0);
    setQuery("0");
    setDirection("x");
    setFault(false);
  };
  return (
    <Frame
      id="cross"
      kind="image-causal-cross-attention"
      title="实验三：先限制可见图像，再做注意力"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="文本查询位置">
          <select
            aria-label="文本查询位置"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={control}
          >
            <option value="0">t₀（I₁尚在未来）</option>
            <option value="1">t₁（最近前图是I₁）</option>
          </select>
        </Field>
        <Field label="查询向量 q">
          <select
            aria-label="查询向量 q"
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
            className={control}
          >
            <option value="x">(1, 0)</option>
            <option value="y">(0, 1)</option>
          </select>
        </Field>
      </div>
      <Fault active={fault} onClick={() => setFault(!fault)}>
        只解除所选行的图像遮罩
      </Fault>
      <svg
        viewBox="0 0 330 495"
        role="img"
        aria-label="两图三文本时间轴，三乘二跨注意力可见性，与独立的三乘三文本因果遮罩"
        fontSize="16"
      >
        <path d="M 18 35 H 312" stroke={C.line} strokeWidth="2" />
        {["I₀", "t₀", "I₁", "t₁", "t₂"].map((label, i) => (
          <g key={label}>
            <circle
              cx={30 + i * 65}
              cy="35"
              r="6"
              fill={label.startsWith("I") ? C.accent : C.muted}
            />
            <text x={30 + i * 65} y="20" textAnchor="middle" fill={C.ink}>
              {label}
            </text>
          </g>
        ))}
        <text
          x="10"
          y="67"
          fill={timeline.currentStep === 0 ? C.accent : C.ink}
        >
          图像可见性（1允许，0遮住）
        </text>
        {[0, 1].map((j) => (
          <text
            key={j}
            x={140 + j * 100}
            y="92"
            textAnchor="middle"
            fill={C.muted}
          >
            I{j}
          </text>
        ))}
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <text x="30" y={127 + i * 43} fill={i === row ? C.accent : C.muted}>
              t{i}
            </text>
            {[0, 1].map((j) => (
              <Cell
                key={j}
                x={95 + j * 100}
                y={101 + i * 43}
                w={90}
                text={String(
                  (fault && i === row) || j === (i === 0 ? 0 : 1) ? 1 : 0,
                )}
                active={i === row}
                danger={fault && i === row && j !== visibleImage}
              />
            ))}
          </g>
        ))}
        <text x="10" y="253" fill={C.ink}>
          另一个矩阵：文本 self-attention
        </text>
        {[0, 1, 2].map((j) => (
          <text
            key={j}
            x={118 + j * 70}
            y="278"
            textAnchor="middle"
            fill={C.muted}
          >
            t{j}
          </text>
        ))}
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <text x="30" y={307 + i * 37} fill={C.muted}>
              t{i}
            </text>
            {[0, 1, 2].map((j) => (
              <Cell
                key={j}
                x={86 + j * 70}
                y={283 + i * 37}
                w={64}
                h={33}
                text={j <= i ? "1" : "0"}
              />
            ))}
          </g>
        ))}
        <text
          x="10"
          y="416"
          fill={timeline.currentStep === 1 ? C.accent : C.ink}
        >
          所选行权重：{weights.map(fmt).join(" / ")}
        </text>
        <rect
          x="10"
          y="434"
          width={Math.max(0, 300 * weights[0])}
          height="15"
          fill={C.accent}
        />
        <rect
          x={10 + 300 * weights[0]}
          y="434"
          width={Math.max(0, 300 * weights[1])}
          height="15"
          fill={C.muted}
        />
        <text
          x="10"
          y="479"
          fill={timeline.currentStep === 2 ? C.accent : C.ink}
        >
          输出 = [{output.map(fmt).join(", ")}]
        </text>
      </svg>
      <div
        className="mt-3 space-y-1 text-sm"
        aria-live="polite"
        data-result="cross"
      >
        <p>K = [[1,0],[0,1]]；V = [[2,0],[0,4]]</p>
        <p>qKᵀ/√2 = [{logits.map(fmt).join(", ")}]</p>
        <p>
          遮罩后 = [
          {logits.map((x, i) => (allowed[i] ? fmt(x) : "−∞")).join(", ")}
          ]；softmax后加权V。
        </p>
        <p>
          {fault
            ? row === 0
              ? "故障：未来I₁泄漏进t₀。"
              : "故障：混入前图I₀，违反本例最近单图策略，但不是未来泄漏。"
            : `正常：t${row} 只读取最近前置图像 I${visibleImage}。`}
        </p>
      </div>
      <p className="mt-3 text-sm text-secondary">
        采用 Flamingo
        的最近前图策略，简化为单头、每图1个视觉token。不是所有VLM的通用遮罩；文本下三角保持不变，不代表图像遮罩正确。注意力权重本身也不是因果解释。
      </p>
      <TimelineControls
        timeline={timeline}
        reset={{ label: "完整重置", onClick: reset }}
        caption="时间可见性 → masked softmax → 对视觉V加权。"
      />
    </Frame>
  );
}
