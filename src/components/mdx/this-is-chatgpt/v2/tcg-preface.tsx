"use client";

import { useState, type ReactNode } from "react";
import {
  useTeachingTimeline,
  type TeachingTimeline,
} from "@/components/mdx/anim/use-teaching-timeline";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";

const ink = "var(--text-primary)",
  muted = "var(--text-secondary)",
  accent = "var(--color-accent)",
  border = "var(--color-border)",
  paper = "var(--bg)",
  danger = "var(--danger)";
const control =
  "min-h-11 min-w-11 max-w-full rounded border border-border bg-bg px-2 py-2 text-sm text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
const loomSteps = ["记忆配对", "独立词槽", "组合织线", "查询输出"].map(
  (label) => ({ label }),
);
const frontierSteps = [
  "初态",
  "读一位",
  "读两位",
  "读三位",
  "读四位",
  "读五位",
  "独立扫描",
].map((label) => ({ label }));
const cycleSteps = ["原串", "一次置换", "两次置换", "独立反例"].map(
  (label) => ({ label }),
);
// Canonicalize drawing coordinates, not the finite mathematical models.
function svg(n: number) {
  if (!Number.isFinite(n)) throw new Error("Non-finite SVG coordinate");
  return n.toFixed(9);
}
function useFrames(steps: { label: string }[]) {
  return useTeachingTimeline({
    steps,
    build(tl) {
      const clock = { value: 0 };
      steps.forEach((s, i) => tl.label(s.label, i * 1200));
      tl.add(
        clock,
        { value: steps.length, duration: steps.length * 1200, ease: "linear" },
        0,
      );
    },
  });
}
function rewind(t: TeachingTimeline) {
  t.pause();
  t.seek(0);
}
function Lab({
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
      className="not-prose my-6 min-w-0 rounded-xl border border-border p-3 text-primary [&_button]:min-h-11 [&_button]:min-w-11 [&_input]:min-h-11 [&_input]:min-w-11 [&_.mt-4.flex]:flex-wrap"
    >
      <h3 className="mb-3 text-base font-semibold">{title}</h3>
      {children}
    </section>
  );
}
function Choice({
  name,
  label,
  value,
  options,
  change,
}: {
  name: string;
  label: string;
  value: string;
  options: readonly (readonly [string, string])[];
  change: (v: string) => void;
}) {
  return (
    <label className="flex min-w-0 flex-col gap-1 text-sm text-secondary">
      {label}
      <select
        data-param={name}
        aria-label={label}
        className={control}
        value={value}
        onChange={(e) => change(e.target.value)}
      >
        {options.map(([v, text]) => (
          <option key={v} value={v}>
            {text}
          </option>
        ))}
      </select>
    </label>
  );
}
function Fault({
  id,
  active,
  click,
  children,
}: {
  id: string;
  active: boolean;
  click: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      className={control}
      data-fault={id}
      aria-pressed={active}
      onClick={click}
    >
      {children}：{active ? "开" : "关"}
    </button>
  );
}
function Reset({ id, click }: { id: string; click: () => void }) {
  return (
    <button type="button" data-reset={id} className={control} onClick={click}>
      完整重置
    </button>
  );
}

export function TcgPrefaceContextContractLab() {
  const [m, setM] = useState(2),
    [query, setQuery] = useState("cross"),
    [fault, setFault] = useState(false);
  const t = useFrames(loomSteps),
    frame = t.currentStep;
  const subjects = ["甲", "乙", "丙"].slice(0, m),
    verbs = ["走", "停", "等"].slice(0, m);
  const pairs = subjects
    .flatMap((s, i) => verbs.map((v, j) => ({ s, v, i, j })))
    .filter((p) => !fault || p.i === p.j);
  const qi = 0,
    qj = query === "cross" ? 1 : 0,
    memory = qi === qj,
    generated = !fault || memory;
  const queryText = subjects[qi] + verbs[qj],
    reset = () => {
      rewind(t);
      setM(2);
      setQuery("cross");
      setFault(false);
    };
  return (
    <Lab
      id="preface-recombination"
      kind="slot-product-recombination-loom"
      title="实验一 · 记住配对，还是独立组合？"
    >
      <div
        data-controls="recombination"
        className="flex flex-wrap items-end gap-3"
      >
        <Choice
          name="slot-vocabulary"
          label="每槽词数"
          value={String(m)}
          options={[
            ["2", "2个"],
            ["3", "3个"],
          ]}
          change={(v) => {
            rewind(t);
            setM(Number(v));
          }}
        />
        <Choice
          name="slot-query"
          label="查询配对"
          value={query}
          options={[
            ["cross", "交叉：甲停"],
            ["diagonal", "已存：甲走"],
          ]}
          change={(v) => {
            rewind(t);
            setQuery(v);
          }}
        />
        <Fault
          id="bind-slots"
          active={fault}
          click={() => {
            rewind(t);
            setFault(!fault);
          }}
        >
          误绑两个槽
        </Fault>
        <Reset id="recombination" click={reset} />
      </div>
      <svg
        viewBox="0 0 330 530"
        role="img"
        aria-label={`两个词槽织线；查表${m}条，当前规则${pairs.length}条，查询${queryText}`}
        className="mt-4 block w-full"
        fontSize="16"
        fill={ink}
      >
        <text x="12" y="23">
          主语槽
        </text>
        <text x="218" y="23">
          动作槽
        </text>
        {subjects.map((s, i) => (
          <g key={s}>
            <circle
              cx="62"
              cy={svg(60 + i * 52)}
              r="19"
              fill={paper}
              stroke={accent}
            />
            <text x="62" y={svg(66 + i * 52)} textAnchor="middle">
              {s}
            </text>
          </g>
        ))}
        {verbs.map((v, j) => (
          <g key={v}>
            <circle
              cx="256"
              cy={svg(60 + j * 52)}
              r="19"
              fill={paper}
              stroke={accent}
            />
            <text x="256" y={svg(66 + j * 52)} textAnchor="middle">
              {v}
            </text>
          </g>
        ))}
        {subjects.flatMap((s, i) =>
          verbs.map((v, j) => {
            const bound = i === j,
              live = !fault || bound,
              visible = frame >= 2 || bound;
            return (
              <path
                key={s + v}
                data-weave={`${i}-${j}`}
                d={`M 81 ${svg(60 + i * 52)} C 140 ${svg(60 + i * 52)} 178 ${svg(60 + j * 52)} 237 ${svg(60 + j * 52)}`}
                fill="none"
                stroke={
                  frame >= 3 && i === qi && j === qj
                    ? danger
                    : bound
                      ? accent
                      : muted
                }
                strokeWidth={svg(frame >= 3 && i === qi && j === qj ? 3 : 1.5)}
                strokeDasharray={!live ? "5 5" : undefined}
                opacity={visible ? (live ? 1 : 0.25) : 0}
              />
            );
          }),
        )}
        <text x="12" y="206" fill={muted}>
          {frame < 2
            ? "实线：表中存过的同索引配对"
            : "虚线：故障删掉的交叉组合"}
        </text>
        <text x="12" y="240">
          表内记录：{subjects.map((s, i) => s + verbs[i]).join("、")}
        </text>
        <path
          d="M 165 254 L 165 276 L 158 267 M 165 276 L 172 267"
          stroke={accent}
          fill="none"
        />
        <text x="12" y="304">
          独立槽输出（当前 {pairs.length} 种）
        </text>
        {pairs.map((p, k) => (
          <g key={p.s + p.v} opacity={frame >= 2 ? 1 : 0.18}>
            <circle
              cx={svg(40 + (k % 3) * 104)}
              cy={svg(340 + Math.floor(k / 3) * 46)}
              r="19"
              stroke={p.i === qi && p.j === qj ? danger : accent}
              fill={paper}
            />
            <text
              x={svg(40 + (k % 3) * 104)}
              y={svg(346 + Math.floor(k / 3) * 46)}
              textAnchor="middle"
            >
              {p.s + p.v}
            </text>
          </g>
        ))}
        <text x="12" y="492" fill={frame >= 3 ? ink : muted}>
          查询 {queryText}：表{memory ? "有" : "缺"} / 规则
          {generated ? "有" : "缺"}
        </text>
        <text x="12" y="519" fill={muted}>
          有限人造词槽；不是 ChatGPT 实现
        </text>
      </svg>
      <p
        data-readout="recombination"
        data-memory={m}
        data-generated={pairs.length}
        data-query={queryText}
        data-memory-hit={String(memory)}
        data-rule-hit={String(generated)}
        className="text-sm"
      >
        表 {m} 条；规则 {pairs.length} 种；{queryText}：查表
        {memory ? "命中" : "缺项"}，组合{generated ? "可产出" : "缺项"}。
        {fault ? "槽被绑定，不再独立。" : "两槽独立，组合数为词数的平方。"}
      </p>
      <TimelineControls timeline={t} />
    </Lab>
  );
}

type Frontier = [number, number, number];
function frontier(n: number, fault: boolean): Frontier[] {
  const rows: Frontier[] = [[1, 0, 0]];
  for (let i = 0; i < n; i++) {
    const [a, b, x] = rows[i];
    rows.push([a + b, a + (fault ? b : 0), 2 * x + (fault ? 0 : b)]);
  }
  return rows;
}
function binaryWords(n: number): string[] {
  if (n === 0) return [""];
  return Array.from({ length: 2 ** n }, (_, i) =>
    i.toString(2).padStart(n, "0").replaceAll("0", "a").replaceAll("1", "b"),
  );
}
export function TcgPrefaceComputeTraceLab() {
  const [n, setN] = useState(4),
    [ending, setEnding] = useState("a"),
    [fault, setFault] = useState(false);
  const t = useFrames(frontierSteps),
    frame = t.currentStep,
    rows = frontier(n, fault),
    step = Math.min(frame, n);
  const accepted = rows[n][0] + (ending === "either" ? rows[n][1] : 0);
  const words = binaryWords(n),
    valid = (s: string) =>
      !s.includes("bb") && (ending === "either" || s.endsWith("a"));
  const oracle = words.filter(valid).length,
    wrong =
      words.find(
        (s) => (ending === "either" || s.endsWith("a")) && !valid(s),
      ) ?? "无";
  const reset = () => {
    rewind(t);
    setN(4);
    setEnding("a");
    setFault(false);
  };
  return (
    <Lab
      id="preface-automaton"
      kind="finite-automaton-language-frontier"
      title="实验二 · 生成合法串，还要独立检查"
    >
      <div data-controls="automaton" className="flex flex-wrap items-end gap-3">
        <Choice
          name="automaton-length"
          label="字符串长度"
          value={String(n)}
          options={[
            ["3", "3位"],
            ["4", "4位"],
            ["5", "5位"],
          ]}
          change={(v) => {
            rewind(t);
            setN(Number(v));
          }}
        />
        <Choice
          name="automaton-ending"
          label="末位限制"
          value={ending}
          options={[
            ["a", "必须为a"],
            ["either", "a或b均可"],
          ]}
          change={(v) => {
            rewind(t);
            setEnding(v);
          }}
        />
        <Fault
          id="allow-double-b"
          active={fault}
          click={() => {
            rewind(t);
            setFault(!fault);
          }}
        >
          错放行 bb
        </Fault>
        <Reset id="automaton" click={reset} />
      </div>
      <svg
        viewBox="0 0 330 550"
        role="img"
        aria-label={`无bb自动机前沿；长度${n}，机器接受${accepted}，独立扫描${oracle}`}
        className="mt-4 block w-full"
        fontSize="16"
        fill={ink}
      >
        <text x="12" y="23">
          A 非b结尾　B b结尾　X 拒绝
        </text>
        <circle cx="52" cy="63" r="19" stroke={accent} fill={paper} />
        <text x="52" y="69" textAnchor="middle">
          A
        </text>
        <circle cx="164" cy="63" r="19" stroke={accent} fill={paper} />
        <text x="164" y="69" textAnchor="middle">
          B
        </text>
        <circle
          cx="278"
          cy="63"
          r="19"
          stroke={fault ? border : danger}
          fill={paper}
        />
        <text x="278" y="69" textAnchor="middle">
          X
        </text>
        <path
          d="M 71 58 Q 108 30 145 58 M 138 50 L 145 58 L 134 59"
          stroke={accent}
          fill="none"
        />
        <text x="106" y="38">
          b
        </text>
        <path
          d="M 145 73 Q 108 101 71 73 M 79 72 L 71 73 L 77 82"
          stroke={muted}
          fill="none"
        />
        <text x="106" y="106">
          a
        </text>
        <path
          d={
            fault
              ? "M 160 43 C 128 4 202 4 172 43"
              : "M 183 63 L 259 63 M 251 56 L 259 63 L 251 70"
          }
          stroke={fault ? danger : muted}
          fill="none"
        />
        <text
          x={svg(fault ? 175 : 215)}
          y={svg(fault ? 21 : 54)}
          fill={fault ? danger : muted}
        >
          b
        </text>
        <text x="12" y="141" fill={muted}>
          A 读a留A；X 读任何字符留X
        </text>
        <text x="12" y="177">
          步
        </text>
        <text x="97" y="177">
          A
        </text>
        <text x="183" y="177">
          B
        </text>
        <text x="271" y="177">
          X
        </text>
        {rows.map((row, i) => (
          <g key={i} opacity={i <= step ? 1 : 0.15} data-frontier-row={i}>
            <text x="13" y={svg(210 + i * 42)}>
              {i}
            </text>
            {row.map((count, j) => (
              <g key={j}>
                <rect
                  x={svg(58 + j * 86)}
                  y={svg(184 + i * 42)}
                  width="78"
                  height="35"
                  rx="5"
                  fill={paper}
                  stroke={
                    i === n && j < 2 && (j === 0 || ending === "either")
                      ? accent
                      : border
                  }
                  strokeWidth={svg(i === step ? 2 : 1)}
                />
                <circle
                  cx={svg(67 + j * 86)}
                  cy={svg(201 + i * 42)}
                  r={svg(Math.sqrt(count) * 2.2)}
                  fill={j === 2 ? danger : accent}
                  opacity="0.35"
                />
                <text
                  x={svg(108 + j * 86)}
                  y={svg(210 + i * 42)}
                  textAnchor="middle"
                >
                  {count}
                </text>
              </g>
            ))}
          </g>
        ))}
        <text x="12" y="459">
          终态接受：{accepted} / {2 ** n}
        </text>
        <text
          x="12"
          y="490"
          fill={frame === 6 && accepted !== oracle ? danger : muted}
        >
          独立扫描：{oracle} / {2 ** n}
        </text>
        <text x="12" y="521" fill={fault ? danger : muted}>
          {fault ? `首个误收：${wrong}` : "检查：不含bb，且满足末位限制"}
        </text>
        <text x="12" y="546" fill={muted}>
          圆面积随路径数变；数字是精确计数
        </text>
      </svg>
      <p
        data-readout="automaton"
        data-accepted={accepted}
        data-oracle={oracle}
        data-total={2 ** n}
        data-counterexample={fault ? wrong : "无"}
        data-frontier={JSON.stringify(rows)}
        className="text-sm"
      >
        机器 {accepted}/{2 ** n}；扫描 {oracle}/{2 ** n}。
        {fault
          ? `反例 ${wrong} 被机器接收却含 bb。`
          : "两种算法在这个有限域一致；并非自然语言正确性的证明。"}
        {frame > n && frame < 6 ? "长度已用完，保留终态。" : ""}
      </p>
      <TimelineControls timeline={t} />
    </Lab>
  );
}

function permute(s: string, operation: string) {
  return operation === "reverse"
    ? [...s].reverse().join("")
    : s.slice(1) + s.slice(0, 1);
}
export function TcgPrefaceEvidenceGateLab() {
  const [n, setN] = useState(3),
    [operation, setOperation] = useState("rotate"),
    [fault, setFault] = useState(false);
  const t = useFrames(cycleSteps),
    frame = t.currentStep,
    words = binaryWords(n);
  const twice = (s: string) => permute(permute(s, operation), operation);
  const counter = words.find((s) => twice(s) !== s),
    passed = words.filter((s) => twice(s) === s).length;
  const original = fault ? "a".repeat(n) : (counter ?? words[1]);
  const strings = [original, permute(original, operation), twice(original)];
  const sourceAt = (j: number) =>
    operation === "reverse" ? n - 1 - j : (j + 1) % n;
  const x = (i: number) => 48 + i * (234 / (n - 1));
  const reset = () => {
    rewind(t);
    setN(3);
    setOperation("rotate");
    setFault(false);
  };
  return (
    <Lab
      id="preface-permutation"
      kind="permutation-composition-cycle-counterexample"
      title="实验三 · 两次操作一定回到原串吗？"
    >
      <div
        data-controls="permutation"
        className="flex flex-wrap items-end gap-3"
      >
        <Choice
          name="permutation-length"
          label="有限域长度"
          value={String(n)}
          options={[
            ["2", "2位"],
            ["3", "3位"],
            ["4", "4位"],
          ]}
          change={(v) => {
            rewind(t);
            setN(Number(v));
          }}
        />
        <Choice
          name="permutation-operation"
          label="位置操作"
          value={operation}
          options={[
            ["rotate", "左循环移1位"],
            ["reverse", "反转"],
          ]}
          change={(v) => {
            rewind(t);
            setOperation(v);
          }}
        />
        <Fault
          id="uniform-tests-only"
          active={fault}
          click={() => {
            rewind(t);
            setFault(!fault);
          }}
        >
          只测全同串
        </Fault>
        <Reset id="permutation" click={reset} />
      </div>
      <svg
        viewBox="0 0 330 580"
        role="img"
        aria-label={`${operation === "rotate" ? "左移" : "反转"}两次位置接线；全域${passed}/${words.length}成立；反例${counter ?? "无"}`}
        className="mt-4 block w-full"
        fontSize="16"
        fill={ink}
      >
        <text x="12" y="23">
          圆内：字符；小标：原位置编号
        </text>
        {[0, 1].map((layer) =>
          Array.from({ length: n }, (_, j) => {
            const i = sourceAt(j),
              originalIndex = layer === 0 ? i : sourceAt(i);
            return (
              <path
                key={`${layer}-${j}`}
                data-permutation-wire={`${layer}-${i}-${j}`}
                d={`M ${svg(x(i))} ${svg(80 + layer * 108)} C ${svg(x(i))} ${svg(113 + layer * 108)} ${svg(x(j))} ${svg(116 + layer * 108)} ${svg(x(j))} ${svg(148 + layer * 108)}`}
                fill="none"
                stroke={originalIndex === j ? muted : accent}
                strokeWidth="2"
                opacity={frame > layer ? 1 : 0.12}
              />
            );
          }),
        )}
        {strings.map((s, layer) => (
          <g key={layer} opacity={frame >= layer ? 1 : 0.2}>
            {[...s].map((c, j) => {
              const origin =
                layer === 0
                  ? j
                  : layer === 1
                    ? sourceAt(j)
                    : sourceAt(sourceAt(j));
              return (
                <g key={j}>
                  <circle
                    cx={svg(x(j))}
                    cy={svg(60 + layer * 108)}
                    r="20"
                    stroke={layer === 2 && c !== original[j] ? danger : accent}
                    fill={paper}
                  />
                  <text
                    x={svg(x(j))}
                    y={svg(66 + layer * 108)}
                    textAnchor="middle"
                  >
                    {c}
                  </text>
                  <text
                    x={svg(x(j) + 22)}
                    y={svg(48 + layer * 108)}
                    fill={muted}
                  >
                    {origin}
                  </text>
                </g>
              );
            })}
          </g>
        ))}
        <text x="12" y="324">
          两次后：{strings[2] === original ? "字符相同" : "存在不同位置"}
        </text>
        <text x="12" y="355">
          位置复合 j → {operation === "rotate" ? "(j+2) mod n" : "j"}
        </text>
        <g opacity={frame === 3 ? 1 : 0.35}>
          <path d="M 12 376 L 318 376" stroke={border} strokeDasharray="5 5" />
          <text x="12" y="405">
            独立穷举全部 {words.length} 个输入
          </text>
          <text x="12" y="438">
            满足 F(F(s))=s：{passed}/{words.length}
          </text>
          <text x="12" y="473" fill={counter ? danger : muted}>
            {counter
              ? `${counter} → ${permute(counter, operation)} → ${twice(counter)}`
              : "当前有限域没有反例"}
          </text>
          {counter &&
            [...counter].map((c, i) => (
              <g key={i}>
                <circle
                  cx={svg(x(i))}
                  cy="510"
                  r="19"
                  fill={paper}
                  stroke={c !== twice(counter)[i] ? danger : border}
                  strokeDasharray={fault ? "4 3" : undefined}
                />
                <text x={svg(x(i))} y="516" textAnchor="middle">
                  {c !== twice(counter)[i] ? "≠" : "="}
                </text>
              </g>
            ))}
        </g>
        <text x="12" y="564" fill={fault ? danger : muted}>
          {fault
            ? "两条全同串通过 ≠ 全域命题成立"
            : "穷举结论仅限当前字母表和长度"}
        </text>
      </svg>
      <p
        data-readout="permutation"
        data-passed={passed}
        data-total={words.length}
        data-counterexample={counter ?? "无"}
        data-trace={strings.join("→")}
        data-tested={fault ? 2 : words.length}
        className="text-sm"
      >
        全域 {passed}/{words.length} 成立；首反例 {counter ?? "无"}。
        {fault
          ? "只测全同串得到2/2通过，但独立穷举不随之缩小。"
          : "接线显示位置的复合，字符重复可能掩盖位置移动。"}
      </p>
      <TimelineControls timeline={t} />
    </Lab>
  );
}
