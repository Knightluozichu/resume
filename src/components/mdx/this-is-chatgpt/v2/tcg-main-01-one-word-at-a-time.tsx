"use client";

import { useCallback, useMemo, useState, type ReactNode } from "react";
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
  "min-h-11 min-w-11 w-full rounded border border-border bg-elevated px-2 text-sm text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
function useTrace(labels: string[]) {
  const labelsKey = JSON.stringify(labels);
  const steps = useMemo(
    () => (JSON.parse(labelsKey) as string[]).map((label) => ({ label })),
    [labelsKey],
  );
  const build = useCallback(
    (tl: Parameters<Parameters<typeof useTeachingTimeline>[0]["build"]>[0]) => {
      steps.forEach(({ label }, i) => tl.label(label, i * 1100));
      tl.add(
        { tick: 0 },
        { tick: steps.length, duration: steps.length * 1100, ease: "linear" },
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
      className="not-prose my-6 min-w-0 rounded-xl border border-border bg-elevated p-3 text-primary sm:p-5 [&_button]:min-h-11 [&_button]:min-w-11 [&_button]:focus-visible:outline-2 [&_button]:focus-visible:outline-offset-2 [&_button]:focus-visible:outline-accent [&_input]:min-h-11 [&_input]:min-w-11 [&_input]:focus-visible:outline-2 [&_input]:focus-visible:outline-accent [&_svg]:mx-auto [&_svg]:block [&_svg]:w-full [&_svg]:max-w-[520px]"
    >
      <h3 className="mb-2 text-base font-semibold">{title}</h3>
      <p className="mb-3 text-sm text-secondary">
        本站手工数据的可复算模拟，不调用真实模型，不是原文实验复现。
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
      className={`${control} my-3 text-left`}
    >
      {active ? "撤销故障：" : "注入故障："}
      {children}
    </button>
  );
}
function f(n: number) {
  return n.toFixed(3);
}

type TokenSpan = { start: number; end: number; bytes: number[] };
const lexicons = {
  pieces: ["re", "play", "ing", " ", "eat", "s", "!"],
  coarse: ["猫", " eats", "replaying", "!"],
};
function splitBytes(
  text: string,
  vocabulary: keyof typeof lexicons,
): TokenSpan[] {
  const bytes = [...new TextEncoder().encode(text)];
  const words = lexicons[vocabulary]
    .map((word) => [...new TextEncoder().encode(word)])
    .sort((a, b) => b.length - a.length);
  const spans: TokenSpan[] = [];
  for (let start = 0; start < bytes.length; ) {
    const match = words.find((word) =>
      word.every((byte, i) => bytes[start + i] === byte),
    );
    const end = start + (match?.length ?? 1);
    spans.push({ start, end, bytes: bytes.slice(start, end) });
    start = end;
  }
  return spans;
}
function tokenDecode(bytes: number[]) {
  try {
    return {
      ok: true,
      text: new TextDecoder("utf-8", { fatal: true }).decode(
        new Uint8Array(bytes),
      ),
    };
  } catch {
    return { ok: false, text: "不完整UTF-8" };
  }
}

export function TcgMain01OneWordAtATimeContextContractLab() {
  const [text, setText] = useState("猫 eats");
  const [vocabulary, setVocabulary] = useState<keyof typeof lexicons>("pieces");
  const [fault, setFault] = useState(false);
  const spans = splitBytes(text, vocabulary);
  const trace = useTrace(spans.map((_, i) => `查看token ${i + 1}`));
  const current = Math.min(trace.currentStep, spans.length - 1);
  const bytes = [...new TextEncoder().encode(text)];
  let offset = 0;
  const characters = [...text].map((char) => {
    const start = offset;
    offset += new TextEncoder().encode(char).length;
    return { char, start, end: offset };
  });
  const dx = 248 / bytes.length;
  const selected = spans[current];
  const broken = spans.findIndex((span) => !tokenDecode(span.bytes).ok);
  const reconstructed = tokenDecode(spans.flatMap((span) => span.bytes)).text;
  const reset = () => {
    trace.seek(0);
    setText("猫 eats");
    setVocabulary("pieces");
    setFault(false);
  };
  const rewind = () => trace.seek(0);
  return (
    <Frame
      id="tokens"
      kind="token-span-segmentation"
      title="实验 1 · 字符边界不等于 token 边界"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="输入文本">
          <select
            className={control}
            value={text}
            onChange={(e) => {
              rewind();
              setText(e.target.value);
            }}
          >
            <option value="猫 eats">猫 eats</option>
            <option value="replaying!">replaying!</option>
          </select>
        </Field>
        <Field label="手工词表">
          <select
            className={control}
            value={vocabulary}
            onChange={(e) => {
              rewind();
              setVocabulary(e.target.value as keyof typeof lexicons);
            }}
          >
            <option value="pieces">碎片词表 + 单字节兜底</option>
            <option value="coarse">较长片段词表</option>
          </select>
        </Field>
      </div>
      <Fault
        active={fault}
        onClick={() => {
          rewind();
          setFault(!fault);
        }}
      >
        逐 token 严格解码，不先拼字节
      </Fault>
      <svg
        viewBox="0 0 300 335"
        role="img"
        aria-label="UTF-8字节坐标上的字符跨度与手工token跨度"
        fontSize="14"
      >
        <text x="14" y="24" fill={C.ink}>
          同一条字节轴，三种边界
        </text>
        <text x="14" y="53" fill={C.muted}>
          字符（Unicode 码点）
        </text>
        {characters.map((char) => (
          <g key={char.start}>
            <rect
              x={26 + char.start * dx}
              y="64"
              width={(char.end - char.start) * dx}
              height="34"
              fill={C.fill}
              stroke={C.line}
            />
            <text
              x={26 + ((char.start + char.end) / 2) * dx}
              y="86"
              textAnchor="middle"
              fill={C.ink}
            >
              {char.char === " " ? "␠" : char.char}
            </text>
          </g>
        ))}
        <text x="14" y="128" fill={C.muted}>
          UTF-8 字节（十六进制）
        </text>
        {bytes.map((byte, i) => (
          <g key={i}>
            <rect
              x={26 + i * dx}
              y="140"
              width={dx}
              height="34"
              fill={C.fill}
              stroke={C.line}
            />
            <text
              x={26 + (i + 0.5) * dx}
              y="162"
              textAnchor="middle"
              fill={C.ink}
            >
              {byte.toString(16).toUpperCase().padStart(2, "0")}
            </text>
          </g>
        ))}
        <text x="14" y="204" fill={C.muted}>
          token 序号（格宽 = 字节数）
        </text>
        {spans.map((span, i) => (
          <g key={span.start}>
            <rect
              x={26 + span.start * dx}
              y="216"
              width={(span.end - span.start) * dx}
              height="34"
              fill={C.accent}
              fillOpacity={i === current ? 0.3 : 0.08}
              stroke={
                fault && !tokenDecode(span.bytes).ok
                  ? C.danger
                  : i === current
                    ? C.accent
                    : C.line
              }
              strokeWidth={i === current ? 2 : 1}
            />
            <text
              x={26 + ((span.start + span.end) / 2) * dx}
              y="238"
              textAnchor="middle"
              fill={C.ink}
            >
              {i + 1}
            </text>
          </g>
        ))}
        <text x="14" y="280" fill={C.ink}>
          当前 #{current + 1}：字节 [{selected.start}, {selected.end})
        </text>
        <text x="14" y="307" fill={C.muted}>
          码点 {characters.length} · 字节 {bytes.length} · token {spans.length}
        </text>
      </svg>
      <div className="space-y-2 text-sm" aria-live="polite" data-output>
        <p>
          英语词段（仅按 ASCII 字母）：
          {(text.match(/[A-Za-z]+/g) ?? []).join(" / ")}
          。这不是中文分词器；空格与标点也占字节。
        </p>
        <p>
          当前 token 字节：
          <code className="break-all">
            {selected.bytes
              .map((b) => b.toString(16).padStart(2, "0"))
              .join(" ")}
          </code>
          ；单独解码：{tokenDecode(selected.bytes).text}。
        </p>
        <p className={fault && broken >= 0 ? "text-danger" : "text-primary"}>
          {fault && broken >= 0
            ? `失败：token ${broken + 1} 不是完整 UTF-8；逐块解码拒绝，输出中止。`
            : `拼接后严格解码通过：${reconstructed}${fault ? "（当前词表未触发故障）" : ""}`}
        </p>
        <p className="text-secondary">
          碎片词表：re / play / ing / ␠ / eat / s / !；较长词表：猫 / ␠eats /
          replaying / !。其余字节逐个兜底，未实现真实 tokenizer
          的训练或合并规则。
        </p>
      </div>
      <TimelineControls
        timeline={trace}
        reset={{ label: "完整重置", onClick: reset }}
      />
    </Frame>
  );
}

const trees = {
  A: {
    root: [0.6, 0.4],
    children: [
      [0.51, 0.49],
      [0.99, 0.01],
    ],
  },
  B: {
    root: [0.2, 0.8],
    children: [
      [0.9, 0.1],
      [0.25, 0.75],
    ],
  },
};
const branchLabels = ["读取上下文", "追加首个 token", "重算并追加第二个 token"];
export function TcgMain01OneWordAtATimeComputeTraceLab() {
  const [context, setContext] = useState<keyof typeof trees>("A");
  const [first, setFirst] = useState(0);
  const [fault, setFault] = useState(false);
  const trace = useTrace(branchLabels);
  const tree = trees[context];
  const children = fault ? [tree.root, tree.root] : tree.children;
  const joints = children.flatMap((row, i) => row.map((p) => p * tree.root[i]));
  const best = joints.indexOf(Math.max(...joints));
  const row = children[first];
  const second = row[0] >= row[1] ? 0 : 1;
  const path = 2 * first + second;
  const reset = () => {
    trace.seek(0);
    setContext("A");
    setFirst(0);
    setFault(false);
  };
  const leafX = [32, 110, 190, 268];
  return (
    <Frame
      id="branching"
      kind="autoregressive-context-branching"
      title="实验 2 · 局部最大不等于整条路径最大"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="手工上下文表">
          <select
            className={control}
            value={context}
            onChange={(e) => {
              trace.seek(0);
              setContext(e.target.value as keyof typeof trees);
            }}
          >
            <option value="A">上下文 A</option>
            <option value="B">上下文 B</option>
          </select>
        </Field>
        <Field label="第一步指定分支">
          <select
            className={control}
            value={first}
            onChange={(e) => {
              trace.seek(0);
              setFirst(Number(e.target.value));
            }}
          >
            <option value="0">选择 A</option>
            <option value="1">选择 B</option>
          </select>
        </Field>
      </div>
      <Fault
        active={fault}
        onClick={() => {
          trace.seek(0);
          setFault(!fault);
        }}
      >
        第二步照抄根分布，忽略已追加的词
      </Fault>
      <svg
        viewBox="0 0 300 375"
        role="img"
        aria-label="两步条件续写树，边上标条件概率，叶子标联合概率"
        fontSize="14"
      >
        <text x="150" y="25" textAnchor="middle" fill={C.ink}>
          上下文 {context}
        </text>
        {[0, 1].map((i) => (
          <g key={i}>
            <path
              d={`M150 38 L${i === 0 ? 75 : 225} 104`}
              fill="none"
              stroke={trace.currentStep >= 1 && first === i ? C.accent : C.line}
              strokeWidth="2"
            />
            <text
              x={i === 0 ? 84 : 216}
              y="65"
              textAnchor="middle"
              fill={C.muted}
            >
              {f(tree.root[i])}
            </text>
            <rect
              x={i === 0 ? 49 : 199}
              y="104"
              width="52"
              height="34"
              rx="5"
              fill={C.fill}
              stroke={trace.currentStep >= 1 && first === i ? C.accent : C.line}
            />
            <text
              x={i === 0 ? 75 : 225}
              y="126"
              textAnchor="middle"
              fill={C.ink}
            >
              {i === 0 ? "A" : "B"}
            </text>
            {[0, 1].map((j) => {
              const k = i * 2 + j;
              return (
                <g key={j}>
                  <path
                    d={`M${i === 0 ? 75 : 225} 138 L${leafX[k]} 222`}
                    fill="none"
                    stroke={
                      trace.currentStep >= 2 && path === k
                        ? C.accent
                        : fault
                          ? C.danger
                          : C.line
                    }
                    strokeWidth="2"
                  />
                  <text
                    x={leafX[k]}
                    y="180"
                    textAnchor="middle"
                    fill={fault ? C.danger : C.muted}
                  >
                    {f(children[i][j])}
                  </text>
                  <rect
                    x={leafX[k] - 22}
                    y="222"
                    width="44"
                    height="32"
                    rx="5"
                    fill={C.fill}
                    stroke={
                      trace.currentStep >= 2 && path === k ? C.accent : C.line
                    }
                  />
                  <text x={leafX[k]} y="243" textAnchor="middle" fill={C.ink}>
                    {j === 0 ? "x" : "停"}
                  </text>
                  <text x={leafX[k]} y="278" textAnchor="middle" fill={C.ink}>
                    {f(joints[k])}
                  </text>
                </g>
              );
            })}
          </g>
        ))}
        <text x="14" y="309" fill={C.muted}>
          叶子数字 = 两条边概率相乘
        </text>
        <text x="14" y="337" fill={C.ink}>
          选定路径：{first === 0 ? "A" : "B"} → {second === 0 ? "x" : "停"}
        </text>
        <text x="14" y="362" fill={C.ink}>
          {f(tree.root[first])} × {f(row[second])} = {f(joints[path])}
        </text>
      </svg>
      <div className="space-y-2 text-sm" aria-live="polite" data-output>
        <p>
          当前前缀：
          <code>
            {trace.currentStep === 0
              ? `上下文${context}`
              : `上下文${context} + ${first === 0 ? "A" : "B"}${trace.currentStep >= 2 ? (second === 0 ? " + x" : " + EOS") : ""}`}
          </code>
          。第二步在所选分支内取最大值；“停”是 EOS，遇到它便终止。
        </p>
        <p>
          两步全树最大：{best < 2 ? "A" : "B"} → {best % 2 === 0 ? "x" : "停"}
          ，联合概率 {f(joints[best])}。四叶之和{" "}
          {f(joints.reduce((a, b) => a + b, 0))}。
        </p>
        <p className={fault ? "text-danger" : "text-secondary"}>
          {fault
            ? `故障：第二步被替换成根分布 [${tree.root.join(", ")}]，根本身不变；不能再说条件表使用了追加后的前缀。`
            : "正常：第一步之后重新查对应条件表。上下文 A 下贪心走 A→x=.306，但 B→x=.396 更大。全树比较只是教学枚举，不是贪心算法偷看未来。"}
        </p>
        <p className="text-secondary">
          这里只枚举两步；x 之后未定义后续分布，不能声称 x
          永远停止或代表真实语言能力。
        </p>
      </div>
      <TimelineControls
        timeline={trace}
        reset={{ label: "完整重置", onClick: reset }}
      />
    </Frame>
  );
}

const samplingLabels = ["原始概率", "温度变换", "逆 CDF 选区间"];
const bases = { skew: [0.6, 0.3, 0.1], tie: [0.5, 0.25, 0.25] };
function transformed(base: number[], temperature: number, normalize: boolean) {
  if (temperature === 0)
    return base.map((_, i) => (i === base.indexOf(Math.max(...base)) ? 1 : 0));
  if (temperature === 1) return [...base];
  if (!normalize) return base.map((p) => p ** (1 / temperature));
  const logs = base.map((p) => Math.log(p) / temperature);
  const weights = logs.map((p) => Math.exp(p - Math.max(...logs)));
  const total = weights.reduce((a, b) => a + b, 0);
  return weights.map((p) => p / total);
}
function choose(weights: number[], u: number) {
  let end = 0;
  for (let i = 0; i < weights.length; i++) {
    end += weights[i];
    if (u < end) return i;
  }
  return -1;
}
export function TcgMain01OneWordAtATimeEvidenceGateLab() {
  const [baseKey, setBaseKey] = useState<keyof typeof bases>("skew");
  const [temperature, setTemperature] = useState(0.5);
  const [draw, setDraw] = useState(60);
  const [fault, setFault] = useState(false);
  const trace = useTrace(samplingLabels);
  const base = bases[baseKey];
  const q = transformed(base, temperature, !fault);
  const total = q.reduce((a, b) => a + b, 0);
  const u = draw / 100;
  const picked = choose(q, u);
  const reset = () => {
    trace.seek(0);
    setBaseKey("skew");
    setTemperature(0.5);
    setDraw(60);
    setFault(false);
  };
  const intervals = q.map((p, i) => {
    const start = q.slice(0, i).reduce((a, b) => a + b, 0);
    return [start, start + p];
  });
  const strip = (weights: number[], y: number, active: boolean) => {
    let sum = 0;
    return weights.map((p, i) => {
      const start = sum;
      sum += p;
      const w = Math.max(0, Math.min(1, sum) - Math.min(1, start)) * 260;
      return (
        <g key={i}>
          <rect
            x={20 + Math.min(1, start) * 260}
            y={y}
            width={w}
            height="38"
            fill={C.accent}
            fillOpacity={0.12 + 0.12 * i}
            stroke={active && picked === i ? C.accent : C.line}
            strokeWidth={active && picked === i ? 2 : 1}
          />
          {w >= 18 && (
            <text
              x={20 + Math.min(1, start) * 260 + w / 2}
              y={y + 25}
              textAnchor="middle"
              fill={C.ink}
            >
              {"ABC"[i]}
            </text>
          )}
        </g>
      );
    });
  };
  return (
    <Frame
      id="sampling"
      kind="temperature-inverse-cdf-sampling"
      title="实验 3 · 温度改区间，随机数选位置"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="基础分布 p(A,B,C)">
          <select
            className={control}
            value={baseKey}
            onChange={(e) => {
              trace.seek(0);
              setBaseKey(e.target.value as keyof typeof bases);
            }}
          >
            <option value="skew">0.60 / 0.30 / 0.10</option>
            <option value="tie">0.50 / 0.25 / 0.25</option>
          </select>
        </Field>
        <Field label="温度 T">
          <select
            className={control}
            value={temperature}
            onChange={(e) => {
              trace.seek(0);
              setTemperature(Number(e.target.value));
            }}
          >
            <option value="0.5">0.5 · 更集中</option>
            <option value="1">1 · 原分布</option>
            <option value="2">2 · 更均匀</option>
            <option value="0">0 · 贪心约定</option>
          </select>
        </Field>
        <Field label={`固定抽样数 u = ${u.toFixed(2)}（不是温度）`}>
          <input
            type="range"
            aria-label="固定抽样数"
            min="0"
            max="99"
            step="1"
            value={draw}
            onChange={(e) => {
              trace.seek(0);
              setDraw(Number(e.target.value));
            }}
            className="w-full accent-accent"
          />
        </Field>
      </div>
      <Fault
        active={fault}
        onClick={() => {
          trace.seek(0);
          setFault(!fault);
        }}
      >
        只做幂变换，漏掉归一化
      </Fault>
      <svg
        viewBox="0 0 300 350"
        role="img"
        aria-label="基础概率和温度变换后的累计区间，竖线指固定抽样数"
        fontSize="14"
      >
        <text x="14" y="28" fill={C.ink}>
          区间左闭右开；边界点归右侧
        </text>
        <text x="14" y="58" fill={C.muted}>
          基础分布 p
        </text>
        {strip(base, 72, false)}
        <text x="20" y="130" fill={C.muted}>
          0
        </text>
        <text x="280" y="130" textAnchor="end" fill={C.muted}>
          1
        </text>
        <text
          x="14"
          y="159"
          fill={fault && temperature !== 0 ? C.danger : C.muted}
        >
          {temperature === 0
            ? "T=0：直接取最大项"
            : fault
              ? "错误权重（未归一化）"
              : `变换后 q，T=${temperature}`}
        </text>
        <rect
          x="20"
          y="174"
          width="260"
          height="38"
          fill={C.fill}
          stroke={C.line}
        />
        {strip(q, 174, trace.currentStep >= 2)}
        <path
          d={`M${20 + 260 * u} 168 V228`}
          stroke={picked < 0 ? C.danger : C.ink}
          strokeWidth="2"
        />
        <text x="20" y="248" fill={C.ink}>
          u={u.toFixed(2)} → {picked < 0 ? "没有可选区间" : "ABC"[picked]}
        </text>
        <text x="20" y="277" fill={C.ink}>
          权重总和 = {f(total)}
        </text>
        <text x="20" y="305" fill={C.muted}>
          {total > 1.000001
            ? "超出 1 的区间未绘入单位轴"
            : total < 0.999999
              ? "右侧空白不属于任何候选"
              : "整个 [0,1) 都有合法候选"}
        </text>
        <text x="20" y="332" fill={C.muted}>
          {temperature === 0
            ? "贪心不需要随机数，不计算 1/T"
            : "qᵢ = pᵢ^(1/T) / Σⱼ pⱼ^(1/T)"}
        </text>
      </svg>
      <div className="space-y-2 text-sm" aria-live="polite" data-output>
        {intervals.map(([left, right], i) => (
          <p key={i}>
            {"ABC"[i]}：权重 {q[i].toFixed(6)}，区间 [{left.toFixed(6)},{" "}
            {right.toFixed(6)})
          </p>
        ))}
        <p
          className={
            fault && temperature !== 0 ? "text-danger" : "text-secondary"
          }
        >
          {temperature === 0
            ? "T=0 采用固定的最大项选择，并列最大取首项；故障开关不作用于这个独立分支。"
            : fault
              ? `未归一化总和 ${total.toFixed(6)}；${picked < 0 ? "本次 u 落在空洞，采样失败。" : "即使本次有输出，这也不是公式规定的概率分布（T=1 时故障潜伏）。"}`
              : "固定 p、T、u 后结果可重复；只换 u 才是在同一分布上换一次抽样。温度不增加知识，不保证事实正确。"}
        </p>
      </div>
      <TimelineControls
        timeline={trace}
        reset={{ label: "完整重置", onClick: reset }}
      />
    </Frame>
  );
}
