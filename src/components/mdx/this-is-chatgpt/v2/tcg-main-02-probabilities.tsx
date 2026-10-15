"use client";

import { useId, useState, type ReactNode } from "react";
import { useTeachingTimeline } from "@/components/mdx/anim/use-teaching-timeline";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";

// Original finite character corpora. No tokenization, sampling, fitted neural net or API.
const vocabulary = ["a", "b", "c"];
const corpora: Record<string, string[]> = {
  mixed: ["abac", "abab", "ac"],
  shifted: ["acac", "ac", "bc"],
};
const ink = "var(--text-primary)";
const muted = "var(--text-secondary)";
const accent = "var(--color-accent)";
const border = "var(--color-border)";
const paper = "var(--bg)";
const danger = "var(--danger)";
const control =
  "min-h-11 min-w-11 rounded border border-border bg-bg px-2 text-sm text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
const trieSteps = ["首个窗口", "累计一半", "全部窗口", "边界核对"].map(
  (label) => ({ label }),
);
const massSteps = ["条件计数", "加入伪计数", "归一化", "质量核对"].map(
  (label) => ({ label }),
);
const lossSteps = ["冻结训练集", "评分第3字", "评分第4字", "汇总损失"].map(
  (label) => ({ label }),
);

function windows(docs: string[], n: number, join = false) {
  return (join ? [docs.join("")] : docs).flatMap((doc) =>
    Array.from({ length: Math.max(0, doc.length - n + 1) }, (_, i) =>
      doc.slice(i, i + n),
    ),
  );
}
function counts(docs: string[], context: string) {
  const ws = windows(docs, context.length + 1);
  return vocabulary.map((x) => ws.filter((w) => w === context + x).length);
}
function distribution(raw: number[], alpha: number, fault = false) {
  const observed = raw.reduce((s, c) => s + c, 0);
  const denominator = observed + (fault ? 0 : vocabulary.length * alpha);
  return {
    denominator,
    p: denominator === 0 ? null : raw.map((c) => (c + alpha) / denominator),
  };
}
function score(
  docs: string[],
  text: string,
  n: number,
  alpha: number,
  leak = false,
) {
  const train = leak ? [...docs, text] : docs;
  let product = 1;
  let loss = 0;
  return [2, 3].map((i) => {
    const context = n === 1 ? "" : text.slice(i - n + 1, i);
    const raw = counts(train, context);
    const { p } = distribution(raw, alpha);
    const probability = p?.[vocabulary.indexOf(text[i])] ?? null;
    const increment =
      probability === null
        ? null
        : probability === 0
          ? Infinity
          : -Math.log2(probability);
    product = probability === null ? NaN : product * probability;
    loss = increment === null ? NaN : loss + increment;
    return {
      context,
      char: text[i],
      raw,
      probability,
      increment,
      product,
      loss,
    };
  });
}
function value(n: number | null, digits = 3) {
  return n === null || Number.isNaN(n)
    ? "未定义"
    : n === Infinity
      ? "∞"
      : n.toFixed(digits);
}
function useTrace(steps: { label: string }[]) {
  return useTeachingTimeline({
    steps,
    build: (tl) => {
      const cursor = { value: 0 };
      steps.forEach((step, i) => tl.label(step.label, i * 1300));
      tl.add(
        cursor,
        { value: steps.length, duration: steps.length * 1300, ease: "linear" },
        0,
      );
    },
  });
}
function Lab({
  kind,
  title,
  children,
}: {
  kind: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      data-visual-kind={kind}
      aria-label={title}
      className="not-prose my-6 min-w-0 rounded-xl border border-border p-3 text-primary [&_button]:min-h-11 [&_button]:min-w-11 [&_input]:min-h-11 [&_input]:min-w-11 [&_button]:focus-visible:outline-2 [&_button]:focus-visible:outline-accent [&_.mt-4.flex]:flex-wrap"
    >
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-secondary">
        本站原创字符算例 · 确定性计算 · 非 ChatGPT 实现
      </p>
      {children}
    </section>
  );
}
function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex min-w-0 flex-col gap-1 text-sm">
      <span>{label}</span>
      {children}
    </label>
  );
}
function CorpusSelect({
  selected,
  onChange,
}: {
  selected: string;
  onChange: (s: string) => void;
}) {
  return (
    <Field label="训练文档组">
      <select
        className={control}
        aria-label="训练文档组"
        value={selected}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="mixed">A：abac / abab / ac</option>
        <option value="shifted">B：acac / ac / bc</option>
      </select>
    </Field>
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
      data-fault
      aria-pressed={active}
      className={`${control} mt-3 w-full text-left`}
      onClick={onClick}
    >
      {active ? "撤销故障：" : "注入故障："}
      {children}
    </button>
  );
}

export function TcgMain02ProbabilitiesContextContractLab() {
  const [corpus, setCorpus] = useState("mixed");
  const [n, setN] = useState(2);
  const [probe, setProbe] = useState("aba");
  const [fault, setFault] = useState(false);
  const timeline = useTrace(trieSteps);
  const docs = corpora[corpus];
  const ws = windows(docs, n, fault);
  const correct = windows(docs, n);
  const limit = [1, Math.ceil(ws.length / 2), ws.length, ws.length][
    timeline.currentStep
  ];
  const current = ws.slice(0, limit);
  const query = probe.slice(0, n);
  const leaves = [...new Set([...ws, query])].sort();
  const prefixes = [
    ...new Set([
      "",
      ...leaves.flatMap((w) =>
        Array.from({ length: n }, (_, i) => w.slice(0, i + 1)),
      ),
    ]),
  ];
  const x = (prefix: string) => {
    const indexes = leaves.flatMap((w, i) => (w.startsWith(prefix) ? [i] : []));
    return (
      indexes.reduce(
        (s, i) => s + 28 + (i * 274) / Math.max(1, leaves.length - 1),
        0,
      ) / indexes.length
    );
  };
  const y = (prefix: string) => 55 + prefix.length * 82;
  const count = (prefix: string) =>
    current.filter((w) => w.startsWith(prefix)).length;
  const rewind = () => {
    timeline.pause();
    timeline.seek(0);
  };
  const reset = () => {
    rewind();
    setCorpus("mixed");
    setN(2);
    setProbe("aba");
    setFault(false);
  };
  return (
    <Lab kind="ngram-prefix-count-trie" title="实验一：窗口进入前缀计数树">
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <CorpusSelect
          selected={corpus}
          onChange={(s) => {
            rewind();
            setCorpus(s);
          }}
        />
        <Field label="窗口长度 n">
          <select
            aria-label="窗口长度 n"
            className={control}
            value={n}
            onChange={(e) => {
              rewind();
              setN(Number(e.target.value));
            }}
          >
            <option value={2}>2 字符</option>
            <option value={3}>3 字符</option>
          </select>
        </Field>
        <Field label="查询路径">
          <select
            aria-label="查询路径"
            className={control}
            value={probe}
            onChange={(e) => {
              rewind();
              setProbe(e.target.value);
            }}
          >
            <option value="aba">aba 的前 n 字</option>
            <option value="aaa">aaa 的前 n 字</option>
          </select>
        </Field>
      </div>
      <p className="mt-3 break-words text-sm" data-input>
        文档边界：{docs.join(" | ")}；查询 {query}
        。每条边追加一个字符；虚线节点表示当前计数为零。
      </p>
      <svg
        viewBox={`0 0 330 ${n * 82 + 105}`}
        role="img"
        aria-label={`长度${n}的窗口计数树，已计${limit}个；查询${query}计数${count(query)}`}
        className="mt-2 block w-full"
        style={{ maxWidth: 660, marginInline: "auto", fontSize: 16 }}
      >
        <text x={165} y={20} textAnchor="middle" fill={muted}>
          根与每层计数都等于已计窗口数
        </text>
        {prefixes.filter(Boolean).map((p) => (
          <line
            key={`e${p}`}
            x1={x(p.slice(0, -1))}
            y1={y(p) - 82 + 22}
            x2={x(p)}
            y2={y(p) - 20}
            stroke={query.startsWith(p) ? accent : border}
            strokeWidth={query.startsWith(p) ? 3 : 1.5}
            strokeDasharray={count(p) ? undefined : "4 3"}
          />
        ))}
        {prefixes.map((p) => (
          <g key={p}>
            <rect
              x={x(p) - 24}
              y={y(p) - 19}
              width={48}
              height={43}
              rx={8}
              fill={paper}
              stroke={query.startsWith(p) ? accent : border}
              strokeWidth={query.startsWith(p) ? 2 : 1}
              strokeDasharray={count(p) ? undefined : "4 3"}
            />
            <text x={x(p)} y={y(p) - 2} textAnchor="middle" fill={ink}>
              {p || "根"}
            </text>
            <text
              x={x(p)}
              y={y(p) + 17}
              textAnchor="middle"
              fill={count(p) ? ink : muted}
            >
              {count(p)}
            </text>
          </g>
        ))}
      </svg>
      <div
        className="space-y-1 break-words text-sm"
        aria-live="polite"
        data-result
      >
        <p>
          已累计 {limit}/{ws.length} 个窗口：{current.join(" · ")}
        </p>
        <p>
          正确边界共 {correct.length} 个窗口；当前规则共 {ws.length}{" "}
          个。可能的完整串共 3^{n} = {3 ** n} 种，当前规则实际见到{" "}
          {new Set(ws).size} 种。
        </p>
        <p>
          完整数据中 C({query}) = {ws.filter((w) => w === query).length}
          ；边界参考值 = {correct.filter((w) => w === query).length}。
        </p>
      </div>
      <Fault
        active={fault}
        onClick={() => {
          timeline.pause();
          timeline.goToStep(3);
          setFault(!fault);
        }}
      >
        拼接文档再滑窗，制造跨边界记录
      </Fault>
      <TimelineControls
        timeline={timeline}
        caption="单步累计真实窗口；这是观测计数树，不是生成候选树。"
        reset={{ label: "完整重置", onClick: reset }}
      />
    </Lab>
  );
}

export function TcgMain02ProbabilitiesComputeTraceLab() {
  const [corpus, setCorpus] = useState("mixed");
  const [context, setContext] = useState("a");
  const [alpha, setAlpha] = useState(1);
  const [fault, setFault] = useState(false);
  const timeline = useTrace(massSteps);
  const id = useId().replace(/:/g, "");
  const raw = counts(corpora[corpus], context);
  const { denominator, p } = distribution(raw, alpha, fault);
  const sum = p?.reduce((a, b) => a + b, 0) ?? null;
  // Row-major mass packing: each small cell has area/mass 0.05, not one event.
  // Exact fractional intersections avoid rounding events into whole seats.
  const segments: {
    start: number;
    end: number;
    char: string;
    pseudo: boolean;
  }[] = [];
  let cumulative = 0;
  if (denominator > 0)
    vocabulary.forEach((char, i) => {
      const observedEnd = cumulative + raw[i] / denominator;
      segments.push({
        start: cumulative,
        end: observedEnd,
        char,
        pseudo: false,
      });
      const pseudoEnd = observedEnd + alpha / denominator;
      segments.push({ start: observedEnd, end: pseudoEnd, char, pseudo: true });
      cumulative = pseudoEnd;
    });
  const cells = Math.max(20, Math.ceil((sum ?? 1) * 20 - 1e-9));
  const rows = Math.ceil(cells / 5);
  const rewind = () => {
    timeline.pause();
    timeline.seek(0);
  };
  const reset = () => {
    rewind();
    setCorpus("mixed");
    setContext("a");
    setAlpha(1);
    setFault(false);
  };
  return (
    <Lab
      kind="conditional-smoothing-mass-grid"
      title="实验二：把条件计数分成概率质量"
    >
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <CorpusSelect
          selected={corpus}
          onChange={(s) => {
            rewind();
            setCorpus(s);
          }}
        />
        <Field label="条件字符 h">
          <select
            aria-label="条件字符 h"
            className={control}
            value={context}
            onChange={(e) => {
              rewind();
              setContext(e.target.value);
            }}
          >
            {vocabulary.map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </select>
        </Field>
        <Field label="伪计数 alpha">
          <select
            aria-label="伪计数 alpha"
            className={control}
            value={alpha}
            onChange={(e) => {
              rewind();
              setAlpha(Number(e.target.value));
            }}
          >
            <option value={0}>0：不平滑</option>
            <option value={0.5}>0.5：加半个</option>
            <option value={1}>1：加一个</option>
          </select>
        </Field>
      </div>
      <p className="mt-3 text-sm" data-input>
        文档：{corpora[corpus].join(" | ")}；固定字母表
        a,b,c。格子按行排列，每格面积代表 0.05 质量；分界允许穿过格子。
      </p>
      <svg
        viewBox={`0 0 330 ${rows * 25 + 190}`}
        role="img"
        aria-label={`条件${context}，计数${raw.join(",")}，分母${denominator}，质量和${value(sum)}`}
        className="mt-2 block w-full"
        style={{ maxWidth: 660, marginInline: "auto", fontSize: 16 }}
      >
        <defs>
          {vocabulary.map((char, i) => (
            <pattern
              key={char}
              id={`${id}-${char}`}
              width={8 + i * 2}
              height={8 + i * 2}
              patternUnits="userSpaceOnUse"
            >
              <rect
                width={12}
                height={12}
                fill={accent}
                opacity={0.13 + i * 0.17}
              />
              {i === 1 && (
                <path d="M0 10L10 0" stroke={accent} strokeWidth={1.5} />
              )}
              {i === 2 && <circle cx={4} cy={4} r={1.5} fill={accent} />}
            </pattern>
          ))}
        </defs>
        {vocabulary.map((char, i) => (
          <g key={char}>
            <rect
              x={35 + i * 90}
              y={12}
              width={18}
              height={18}
              fill={`url(#${id}-${char})`}
              stroke={accent}
            />
            <text x={60 + i * 90} y={27} fill={ink}>
              {char}
            </text>
            <text
              x={35 + i * 90}
              y={57}
              fill={timeline.currentStep === 0 ? accent : ink}
            >
              {raw[i]} + {alpha}
            </text>
          </g>
        ))}
        <text x={165} y={88} textAnchor="middle" fill={muted}>
          整块：观察值；内缩框：伪计数
        </text>
        {Array.from({ length: cells }, (_, j) => {
          const start = j / 20;
          const stop = (j + 1) / 20;
          const x = 35 + (j % 5) * 52;
          const y = 107 + Math.floor(j / 5) * 25;
          return (
            <g key={j}>
              <rect
                x={x}
                y={y}
                width={52}
                height={24}
                fill={paper}
                stroke={j >= 20 ? danger : border}
              />
              {segments.map((s, k) => {
                const a = Math.max(start, s.start);
                const b = Math.min(stop, s.end);
                return b <= a ? null : (
                  <rect
                    key={k}
                    x={x + (a - start) * 1040}
                    y={y + (s.pseudo ? 3 : 0)}
                    width={(b - a) * 1040}
                    height={s.pseudo ? 18 : 24}
                    fill={`url(#${id}-${s.char})`}
                    fillOpacity={s.pseudo ? 0.55 : 1}
                    stroke={s.pseudo ? accent : undefined}
                    strokeWidth={s.pseudo ? 1.5 : undefined}
                    opacity={timeline.currentStep === 1 && !s.pseudo ? 0.45 : 1}
                  />
                );
              })}
            </g>
          );
        })}
        {rows > 4 && (
          <line
            x1={25}
            x2={305}
            y1={206}
            y2={206}
            stroke={danger}
            strokeWidth={3}
          />
        )}
        <text
          x={165}
          y={rows * 25 + 134}
          textAnchor="middle"
          fill={sum !== null && sum > 1.000001 ? danger : ink}
        >
          {p ? `质量和 = ${value(sum)}` : "0 / 0：此行未定义"}
        </text>
        <text x={165} y={rows * 25 + 161} textAnchor="middle" fill={muted}>
          {rows > 4
            ? "红线后是溢出质量，不是合法分布"
            : "前 20 格的总容量恰好为 1"}
        </text>
      </svg>
      <div
        className="space-y-1 break-words text-sm"
        aria-live="polite"
        data-result
      >
        <p>
          C({context}a), C({context}b), C({context}c) = [{raw.join(", ")}]；分母
          = {denominator}。
        </p>
        <p>
          p(a|{context}), p(b|{context}), p(c|{context}) ={" "}
          {p
            ? `[${p.map((v) => value(v)).join(", ")}]`
            : "未定义（不是全零分布）"}
          。
        </p>
        <p>
          {p === null
            ? "没有可归一化的质量；alpha>0 才能给此未知条件一行分布。"
            : Math.abs((sum ?? 0) - 1) < 1e-9
              ? "归一化通过；这不等于经过真实事件的校准。"
              : "归一化失败：分母漏计了整个字母表的伪计数。"}
        </p>
      </div>
      <Fault
        active={fault}
        onClick={() => {
          timeline.pause();
          timeline.goToStep(3);
          setFault(!fault);
        }}
      >
        分母只用观察次数，漏加 3 × alpha
      </Fault>
      <TimelineControls
        timeline={timeline}
        caption="先看计数，再看伪计数内缩框，最后核对整行质量。"
        reset={{ label: "完整重置", onClick: reset }}
      />
    </Lab>
  );
}

export function TcgMain02ProbabilitiesEvidenceGateLab() {
  const [n, setN] = useState(2);
  const [alpha, setAlpha] = useState(1);
  const [text, setText] = useState("abcc");
  const [fault, setFault] = useState(false);
  const timeline = useTrace(lossSteps);
  const trace = score(corpora.mixed, text, n, alpha, fault);
  const reference = score(corpora.mixed, text, n, alpha);
  const lossY = (loss: number) =>
    65 + Math.min(8, Number.isFinite(loss) ? loss : 8) * 26;
  const rewind = () => {
    timeline.pause();
    timeline.seek(0);
  };
  const reset = () => {
    rewind();
    setN(2);
    setAlpha(1);
    setText("abcc");
    setFault(false);
  };
  return (
    <Lab
      kind="heldout-sequence-logprob-ladder"
      title="实验三：留出序列的损失阶梯"
    >
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Field label="评分阶数 n">
          <select
            aria-label="评分阶数 n"
            className={control}
            value={n}
            onChange={(e) => {
              rewind();
              setN(Number(e.target.value));
            }}
          >
            <option value={1}>1：无上下文</option>
            <option value={2}>2：看前 1 字</option>
            <option value={3}>3：看前 2 字</option>
          </select>
        </Field>
        <Field label="评分平滑 alpha">
          <select
            aria-label="评分平滑 alpha"
            className={control}
            value={alpha}
            onChange={(e) => {
              rewind();
              setAlpha(Number(e.target.value));
            }}
          >
            <option value={0}>0：不平滑</option>
            <option value={0.5}>0.5：加半个</option>
            <option value={1}>1：加一个</option>
          </select>
        </Field>
        <Field label="留出序列">
          <select
            aria-label="留出序列"
            className={control}
            value={text}
            onChange={(e) => {
              rewind();
              setText(e.target.value);
            }}
          >
            <option value="abcc">abcc：含未见转移</option>
            <option value="abba">abba：条件已见但有零转移</option>
          </select>
        </Field>
      </div>
      <p className="mt-3 break-words text-sm" data-input>
        训练：abac | abab | ac；留出：{text}。固定前缀 ab，只评第 3、4
        字；不含终止符，不是任意长度整句的概率。
      </p>
      <svg
        viewBox="0 0 330 370"
        role="img"
        aria-label={`留出${text}的两步条件概率及累计损失，总损失${value(trace[1].loss)}bit`}
        className="mt-2 block w-full"
        style={{ maxWidth: 660, marginInline: "auto", fontSize: 16 }}
      >
        <text x={165} y={22} textAnchor="middle" fill={ink}>
          向下累加 −log₂ p（bit）
        </text>
        {[0, 2, 4, 6, 8].map((v) => (
          <g key={v}>
            <line
              x1={42}
              x2={304}
              y1={lossY(v)}
              y2={lossY(v)}
              stroke={border}
            />
            <text x={29} y={lossY(v) + 5} textAnchor="end" fill={muted}>
              {v}
            </text>
          </g>
        ))}
        <text x={50} y={46} fill={muted}>
          起点
        </text>
        <circle cx={65} cy={65} r={4} fill={accent} />
        {trace.map((row, i) => {
          const priorLoss = i === 0 ? 0 : trace[i - 1].loss;
          const x0 = 65 + i * 112;
          const x1 = 65 + (i + 1) * 112;
          const active = timeline.currentStep >= i + 1;
          const finite = Number.isFinite(row.loss);
          return (
            <g key={i} opacity={active ? 1 : 0.4}>
              <path
                d={`M${x0} ${lossY(priorLoss)}H${x1}V${lossY(row.loss)}`}
                fill="none"
                stroke={fault ? danger : accent}
                strokeWidth={active ? 3 : 2}
                strokeDasharray={finite ? undefined : "5 4"}
              />
              <circle
                cx={x1}
                cy={lossY(row.loss)}
                r={5}
                fill={finite ? accent : paper}
                stroke={finite ? accent : danger}
              />
              <text
                x={x1 - 5}
                y={lossY(row.loss) + (i ? 27 : -12)}
                textAnchor="end"
                fill={finite ? ink : danger}
              >
                {value(row.loss)} bit
              </text>
              <text x={x0 + 56} y={315} textAnchor="middle" fill={ink}>
                {row.context || "∅"} → {row.char}
              </text>
              <text x={x0 + 56} y={342} textAnchor="middle" fill={muted}>
                p={value(row.probability)}
              </text>
            </g>
          );
        })}
      </svg>
      <div
        className="space-y-2 break-words text-sm"
        aria-live="polite"
        data-result
      >
        {trace.map((row, i) => (
          <p key={i}>
            第 {i + 3} 字：h={row.context || "∅"}，计数 [{row.raw.join(", ")}
            ]；p={value(row.probability)}，增量 {value(row.increment)}{" "}
            bit；累计乘积 {value(row.product, 6)}。
          </p>
        ))}
        <p>
          当前总损失 {value(trace[1].loss)} bit / 2 字，平均{" "}
          {value(trace[1].loss / 2)} bit/字；无泄漏参考{" "}
          {value(reference[1].loss)} bit。
        </p>
        <p>
          {fault
            ? "故障：留出串已被加入训练集；即使损失降低，也不是泛化改进。"
            : "留出串未进入计数；与已见片段重合不等于整串被用于训练。"}{" "}
          图上数值超过 8 bit 或非有限时收在底线并标原值，未以 epsilon 替代零。
        </p>
      </div>
      <Fault
        active={fault}
        onClick={() => {
          timeline.pause();
          timeline.goToStep(3);
          setFault(!fault);
        }}
      >
        先把留出串加入训练，再报告它的损失
      </Fault>
      <TimelineControls
        timeline={timeline}
        caption="只评相同的两个位置；概率连乘对应损失相加。灰色是尚未讲解的阶梯。"
        reset={{ label: "完整重置", onClick: reset }}
      />
    </Lab>
  );
}
