"use client";

import { useId, useState, type ReactNode } from "react";
import { TimelineControls } from "@/components/mdx/anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
  type TeachingTimeline,
} from "@/components/mdx/anim/use-teaching-timeline";

const C = {
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  line: "var(--border)",
  bg: "var(--bg)",
  accent: "var(--accent)",
  danger: "var(--danger)",
};
const shell =
  "not-prose my-6 min-w-0 rounded-xl border border-border bg-elevated p-3 text-primary sm:p-5 [&_button]:min-h-11 [&_button]:min-w-11 [&_select]:min-h-11 [&_select]:min-w-11 [&_input]:min-h-11 [&_input]:min-w-11 [&_.mt-4.flex]:flex-wrap [&_:focus-visible]:outline-2 [&_:focus-visible]:outline-offset-2 [&_:focus-visible]:outline-accent";
const parseSteps = ["词序", "附着边", "场景约束"].map((label) => ({ label }));
const unitSteps = ["带单位的项", "维度约束", "运算结果"].map((label) => ({
  label,
}));
const reduceSteps = ["初始项", "内层归约", "外层归约"].map((label) => ({
  label,
}));
function useGrammarTrace(steps: readonly TeachingStep[]) {
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
// Only drawing coordinates are canonicalized. Domain values retain their precision.
function coord(n: number) {
  if (!Number.isFinite(n)) throw new Error("non-finite drawing coordinate");
  return Number(n.toFixed(9));
}
function display(n: number) {
  return Number(n.toFixed(6)).toString();
}
function Choice({
  domain,
  label,
  value,
  onChange,
  children,
}: {
  domain: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: ReactNode;
}) {
  return (
    <label className="block min-w-0 text-sm">
      {label}
      <select
        data-control={domain}
        className="mt-1 w-full rounded border border-border bg-bg px-2 py-2 text-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {children}
      </select>
    </label>
  );
}
function Drawing({
  label,
  height,
  children,
}: {
  label: string;
  height: number;
  children: ReactNode;
}) {
  return (
    <svg
      role="img"
      aria-label={label}
      viewBox={`0 0 280 ${height}`}
      className="mx-auto mt-4 block h-auto w-full max-w-[280px]"
      style={{ fontSize: 14 }}
      fill={C.text}
    >
      {children}
    </svg>
  );
}
function Fault({
  domain,
  active,
  onClick,
  children,
}: {
  domain: string;
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      data-fault={domain}
      data-active={active}
      aria-pressed={active}
      onClick={onClick}
      className="mt-3 w-full rounded border border-border px-2 py-2 text-sm"
    >
      {active ? "恢复规则：" : "注入故障："}
      {children}
    </button>
  );
}
function Controls({
  domain,
  trace,
  reset,
}: {
  domain: string;
  trace: TeachingTimeline;
  reset: () => void;
}) {
  return (
    <div
      data-controls={domain}
      data-playing={trace.isPlaying}
      data-frame={trace.currentStep}
    >
      <TimelineControls
        timeline={trace}
        caption="参数改变回到首帧；完整重置也停止播放。"
      />
      <button
        type="button"
        data-reset={domain}
        onClick={reset}
        className="mt-3 w-full rounded border border-border px-2 py-2 text-sm"
      >
        完整重置
      </button>
    </div>
  );
}
function Arrow({ id }: { id: string }) {
  return (
    <defs>
      <marker
        id={id}
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto"
      >
        <path d="M0 0 L10 5 L0 10 z" fill="context-stroke" />
      </marker>
    </defs>
  );
}

type Attachment = "event" | "entity";
type Owner = "observer" | "man";
function parseCase(attachment: Attachment, owner: Owner, fault: boolean) {
  const retained = fault ? ["event"] : ["event", "entity"];
  const required = owner === "observer" ? "event" : "entity";
  return {
    syntacticTrees: 2,
    retainedTrees: retained.length,
    compatibleTrees: retained.filter((a) => a === required).length,
    selectedRetained: retained.includes(attachment),
    selectedCompatible:
      attachment === required && retained.includes(attachment),
    parent: attachment === "event" ? "VP" : "NP",
    required,
  };
}

export function TcgMain15SemanticGrammarContextContractLab() {
  const [attachment, setAttachment] = useState<Attachment>("event");
  const [owner, setOwner] = useState<Owner>("observer");
  const [fault, setFault] = useState(false);
  const trace = useGrammarTrace(parseSteps);
  const id = useId();
  const result = parseCase(attachment, owner, fault);
  const reset = () => {
    setAttachment("event");
    setOwner("observer");
    setFault(false);
    trace.seek(0);
  };
  const ppParent = attachment === "event" ? [165, 85] : [120, 140];
  const treeColor = result.selectedRetained ? C.accent : C.danger;
  return (
    <section
      data-lab="pp-attachment"
      aria-label="介词短语附着树实验"
      className={shell}
    >
      <h3 className="text-base font-semibold">实验一 · 同一句话的两棵树</h3>
      <p className="my-2 text-sm text-secondary">
        固定词序 I saw man with
        telescope。下图显示所选树；计数覆盖两种附着。场景拥有者是人为约束，不是词义真值。
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Choice
          domain="pp-attachment"
          label="介词短语附着"
          value={attachment}
          onChange={(v) => {
            setAttachment(v as Attachment);
            trace.seek(0);
          }}
        >
          <option value="event">VP：观察事件用望远镜</option>
          <option value="entity">NP：男子带望远镜</option>
        </Choice>
        <Choice
          domain="telescope-owner"
          label="给定场景：谁拥有望远镜"
          value={owner}
          onChange={(v) => {
            setOwner(v as Owner);
            trace.seek(0);
          }}
        >
          <option value="observer">观察者 I</option>
          <option value="man">男子 man</option>
        </Choice>
      </div>
      <Fault
        domain="prune-np-attachment"
        active={fault}
        onClick={() => {
          setFault(!fault);
          trace.seek(0);
        }}
      >
        贪心删除 NP 附着候选
      </Fault>
      <Drawing
        label="PP的父边在VP和NP之间切换，下方场景连线显示拥有者"
        height={530}
      >
        <Arrow id={`${id}-scene`} />
        <text x="140" y="23" textAnchor="middle">
          所选树：PP → {result.parent}
        </text>
        <g
          stroke={C.line}
          strokeWidth="2"
          fill="none"
          opacity={trace.currentStep === 0 ? 0.25 : 1}
        >
          <path d="M125 45 L25 85 L20 260 M125 45 L165 85 M165 85 L70 140 L70 260 M165 85 L120 140 L120 260" />
          <path d="M205 190 L170 225 L170 260 M205 190 L228 225 L228 260" />
          <path
            data-geometry="pp-parent-edge"
            d={`M${coord(ppParent[0])} ${coord(ppParent[1] + 8)} L205 178`}
            stroke={treeColor}
            strokeWidth="3"
          />
        </g>
        {[
          [125, 45, "S"],
          [25, 85, "N"],
          [165, 85, "VP"],
          [70, 140, "V"],
          [120, 140, "NP"],
          [205, 190, "PP"],
          [170, 225, "P"],
          [228, 225, "N"],
        ].map(([x, y, label]) => (
          <text
            key={`${label}-${x}`}
            x={Number(x)}
            y={Number(y)}
            textAnchor="middle"
            paintOrder="stroke"
            stroke={C.bg}
            strokeWidth="5"
            strokeLinejoin="round"
          >
            {label}
          </text>
        ))}
        {["I", "saw", "man", "with", "telescope"].map((w, i) => (
          <text
            key={w}
            x={[20, 70, 120, 170, 228][i]}
            y="282"
            textAnchor="middle"
          >
            {w}
          </text>
        ))}
        {!result.selectedRetained && (
          <path
            data-geometry="pruned-tree"
            d="M35 65 L245 250 M245 65 L35 250"
            stroke={C.danger}
            strokeWidth="3"
            fill="none"
          />
        )}
        <text x="140" y="315" textAnchor="middle">
          保留候选 {result.retainedTrees} / 2
        </text>
        <text
          x="140"
          y="341"
          textAnchor="middle"
          fill={result.compatibleTrees ? C.accent : C.danger}
        >
          场景相容候选 {result.compatibleTrees}
        </text>
        <path d="M15 365 H265" stroke={C.line} />
        <text x="140" y="391" textAnchor="middle">
          给定场景（不由句子证明）
        </text>
        <circle cx="60" cy="432" r="23" fill="none" stroke={C.line} />
        <circle cx="220" cy="432" r="23" fill="none" stroke={C.line} />
        <text x="60" y="437" textAnchor="middle">
          I
        </text>
        <text x="220" y="437" textAnchor="middle">
          man
        </text>
        <path
          data-geometry="owner-relation"
          d={`M${owner === "observer" ? 60 : 220} 455 V480`}
          stroke={trace.currentStep === 2 ? C.accent : C.line}
          strokeWidth="2"
          markerEnd={`url(#${id}-scene)`}
        />
        <rect
          x={owner === "observer" ? 30 : 190}
          y="490"
          width="60"
          height="12"
          fill={C.accent}
        />
        <text x="140" y="525" textAnchor="middle">
          矩形 = telescope
        </text>
      </Drawing>
      <output
        data-readout="pp-attachment"
        className="mt-3 block break-words text-sm"
        aria-live="polite"
      >
        句法树=2；保留={result.retainedTrees}；场景相容={result.compatibleTrees}
        ；当前树{result.selectedRetained ? "保留" : "被误删"}，
        {result.selectedCompatible ? "相容" : "不相容"}。
      </output>
      <Controls domain="pp-attachment" trace={trace} reset={reset} />
    </section>
  );
}

type Unit = "cm" | "m" | "s";
type Operation = "add" | "divide";
const units: Record<Unit, { scale: number; dim: [number, number] }> = {
  cm: { scale: 0.01, dim: [1, 0] },
  m: { scale: 1, dim: [1, 0] },
  s: { scale: 1, dim: [0, 1] },
};
function quantityCase(operation: Operation, unit: Unit, fault: boolean) {
  const leftDim: [number, number] = fault ? [0, 0] : [1, 0];
  const rightDim: [number, number] = fault ? [0, 0] : [...units[unit].dim];
  const rightBase = 30 * (fault ? 1 : units[unit].scale);
  const accepted =
    operation === "divide" || leftDim.every((d, i) => d === rightDim[i]);
  const dimension = accepted
    ? operation === "add"
      ? leftDim
      : leftDim.map((d, i) => d - rightDim[i])
    : null;
  const value = accepted
    ? operation === "add"
      ? 2 + rightBase
      : 2 / rightBase
    : null;
  return { leftDim, rightDim, rightBase, accepted, dimension, value };
}
function dimPoint(dim: readonly number[]) {
  return [coord(145 + dim[0] * 65), coord(405 - dim[1] * 65)];
}

export function TcgMain15SemanticGrammarComputeTraceLab() {
  const [operation, setOperation] = useState<Operation>("add");
  const [unit, setUnit] = useState<Unit>("cm");
  const [fault, setFault] = useState(false);
  const trace = useGrammarTrace(unitSteps);
  const result = quantityCase(operation, unit, fault);
  const reset = () => {
    setOperation("add");
    setUnit("cm");
    setFault(false);
    trace.seek(0);
  };
  const left = dimPoint(result.leftDim),
    right = dimPoint(result.rightDim);
  const out = result.dimension ? dimPoint(result.dimension) : null;
  return (
    <section
      data-lab="dimension-unification"
      aria-label="单位维度约束实验"
      className={shell}
    >
      <h3 className="text-base font-semibold">实验二 · 单位不是数值后的装饰</h3>
      <p className="my-2 text-sm text-secondary">
        固定左项 2m、右项 30u。L/T
        格点表示长度／时间指数，不是量的大小；重叠点表示维度相同。
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Choice
          domain="quantity-operation"
          label="运算规则"
          value={operation}
          onChange={(v) => {
            setOperation(v as Operation);
            trace.seek(0);
          }}
        >
          <option value="add">Add：同维度才能相加</option>
          <option value="divide">Divide：维度指数相减</option>
        </Choice>
        <Choice
          domain="right-unit"
          label="右项单位 u"
          value={unit}
          onChange={(v) => {
            setUnit(v as Unit);
            trace.seek(0);
          }}
        >
          <option value="cm">cm：厘米</option>
          <option value="m">m：米</option>
          <option value="s">s：秒</option>
        </Choice>
      </div>
      <Fault
        domain="erase-units"
        active={fault}
        onClick={() => {
          setFault(!fault);
          trace.seek(0);
        }}
      >
        运算前剥掉单位与换算比例
      </Fault>
      <Drawing
        label="项的维度约束连线及L T指数格点，加法检查相等，除法减去指数"
        height={505}
      >
        <text x="58" y="26" textAnchor="middle">
          {fault ? "2" : "2m"}
        </text>
        <text x="222" y="26" textAnchor="middle">
          {fault ? "30" : `30${unit}`}
        </text>
        <path
          d="M58 38 V90 L140 130 M222 38 V90 L140 130"
          stroke={
            trace.currentStep >= 1
              ? result.accepted
                ? C.accent
                : C.danger
              : C.line
          }
          strokeWidth="2"
          fill="none"
        />
        <text x="58" y="67" textAnchor="middle">
          ({result.leftDim.join(",")})
        </text>
        <text x="222" y="67" textAnchor="middle">
          ({result.rightDim.join(",")})
        </text>
        {!result.accepted && (
          <path
            d="M125 90 L155 115 M155 90 L125 115"
            stroke={C.danger}
            strokeWidth="3"
          />
        )}
        <text x="140" y="153" textAnchor="middle">
          {operation === "add" ? "Add：d左 = d右 ?" : "Divide：d左 − d右"}
        </text>
        <text x="140" y="184" textAnchor="middle">
          右项基准值 {display(result.rightBase)}
        </text>
        <text
          x="140"
          y="215"
          textAnchor="middle"
          fill={result.accepted ? C.accent : C.danger}
        >
          {result.accepted
            ? `结果 ${display(result.value!)} · (${result.dimension!.join(",")})`
            : "拒绝：长度不能加时间"}
        </text>
        <text x="140" y="247" textAnchor="middle">
          量值标尺：一格 = 5 基准单位
        </text>
        <g stroke={C.line} fill="none">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <path
              key={i}
              d={`M${coord(45 + i * 30)} 263 v12 M${coord(45 + i * 30)} 285 v12`}
            />
          ))}
        </g>
        <text x="8" y="274">
          左
        </text>
        <text x="8" y="296">
          右
        </text>
        <path
          data-geometry="left-magnitude"
          d="M45 270 H57"
          stroke={C.accent}
          strokeWidth="4"
        />
        <path
          data-geometry="right-magnitude"
          d={`M45 292 H${coord(45 + result.rightBase * 6)}`}
          stroke={C.muted}
          strokeWidth="4"
        />
        <g fill="none" stroke={C.line}>
          {[-1, 0, 1].map((i) => (
            <path
              key={i}
              d={`M80 ${coord(405 - i * 65)} H210 M${coord(145 + i * 65)} 340 V470`}
            />
          ))}
        </g>
        <path d="M65 405 H235 M145 485 V320" stroke={C.muted} fill="none" />
        <text x="244" y="410">
          L
        </text>
        <text x="151" y="320">
          T
        </text>
        <text x="148" y="425">
          0
        </text>
        <text x="205" y="425">
          1
        </text>
        <text x="74" y="425">
          −1
        </text>
        <text x="123" y="345">
          1
        </text>
        <text x="119" y="475">
          −1
        </text>
        <circle
          data-geometry="left-dimension"
          cx={left[0]}
          cy={left[1]}
          r="10"
          fill="none"
          stroke={C.accent}
          strokeWidth="3"
        />
        <rect
          data-geometry="right-dimension"
          x={coord(right[0] - 6)}
          y={coord(right[1] - 6)}
          width="12"
          height="12"
          fill={C.muted}
        />
        {out && (
          <>
            <path
              data-geometry="dimension-result"
              d={`M145 405 L${out[0]} ${out[1]}`}
              stroke={C.accent}
              strokeWidth="3"
              opacity={trace.currentStep === 2 ? 1 : 0.3}
            />
            <circle
              cx={out[0]}
              cy={out[1]}
              r="16"
              fill="none"
              stroke={C.accent}
              strokeDasharray="3 3"
            />
          </>
        )}
        <text x="140" y="503" textAnchor="middle">
          ○左项 ■右项 ◌结果
        </text>
      </Drawing>
      <output
        data-readout="dimension-unification"
        className="mt-3 block break-words text-sm"
        aria-live="polite"
      >
        {result.accepted
          ? `接受；value=${display(result.value!)}；dimension=(${result.dimension!.join(",")})`
          : "拒绝；value=null；dimension=null"}
        。
        {fault
          ? "故障已丢失原单位；无量纲结果不是原问题答案。"
          : "数值换到 m、s 基准后才运算。"}
      </output>
      <Controls domain="dimension-unification" trace={trace} reset={reset} />
    </section>
  );
}

type Grouping = "sum-first" | "product-first";
type Atom = "number" | "blue";
function reductionTrace(grouping: Grouping, atom: Atom, fault: boolean) {
  const symbol = atom === "blue" ? "Blue" : "3";
  const initial =
    grouping === "sum-first"
      ? ["(", "2", "+", symbol, ")", "×", "4"]
      : ["2", "×", symbol, "+", "4"];
  const stuck = atom === "blue" && !fault;
  const n = atom === "blue" ? 0 : 3;
  const inner = grouping === "sum-first" ? 2 + n : 2 * n;
  const result = grouping === "sum-first" ? inner * 4 : inner + 4;
  return {
    stuck,
    result: stuck ? null : result,
    rows: stuck
      ? [initial, initial, initial]
      : [
          initial,
          [String(inner), grouping === "sum-first" ? "×" : "+", "4"],
          [String(result)],
        ],
    redex: grouping === "sum-first" ? [1, 3] : [0, 2],
    contractions: stuck ? 0 : 2,
  };
}

export function TcgMain15SemanticGrammarEvidenceGateLab() {
  const [grouping, setGrouping] = useState<Grouping>("sum-first");
  const [atom, setAtom] = useState<Atom>("number");
  const [fault, setFault] = useState(false);
  const trace = useGrammarTrace(reduceSteps);
  const result = reductionTrace(grouping, atom, fault);
  const reset = () => {
    setGrouping("sum-first");
    setAtom("number");
    setFault(false);
    trace.seek(0);
  };
  return (
    <section
      data-lab="expression-reduction"
      aria-label="表达式归约实验"
      className={shell}
    >
      <h3 className="text-base font-semibold">
        实验三 · 能排成项，不等于能算出数
      </h3>
      <p className="my-2 text-sm text-secondary">
        只定义两个数的加法／乘法。Blue
        是合法符号，却没有数值定义。每行是一个项，括线标出下一次归约范围。
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Choice
          domain="expression-grouping"
          label="表达式分组"
          value={grouping}
          onChange={(v) => {
            setGrouping(v as Grouping);
            trace.seek(0);
          }}
        >
          <option value="sum-first">先加：(2 + a) × 4</option>
          <option value="product-first">先乘：2 × a + 4</option>
        </Choice>
        <Choice
          domain="expression-atom"
          label="原子 a"
          value={atom}
          onChange={(v) => {
            setAtom(v as Atom);
            trace.seek(0);
          }}
        >
          <option value="number">数值 3</option>
          <option value="blue">未定义符号 Blue</option>
        </Choice>
      </div>
      <Fault
        domain="coerce-blue-zero"
        active={fault}
        onClick={() => {
          setFault(!fault);
          trace.seek(0);
        }}
      >
        把 Blue 偷换成数值 0
      </Fault>
      <Drawing
        label="三行表达式token带，数值子项逐次收缩，未定义符号使归约停滞"
        height={400}
      >
        <text x="140" y="22" textAnchor="middle">
          规则域：Number +/× Number
        </text>
        {result.rows.map((row, step) => {
          const w = 34,
            start = coord((280 - row.length * w) / 2),
            y = 64 + step * 100;
          const range =
            step === 0 || result.stuck ? result.redex : [0, row.length - 1];
          return (
            <g key={step} opacity={step <= trace.currentStep ? 1 : 0.3}>
              <text x="9" y={y - 10} fill={C.muted}>
                t{step}
              </text>
              {row.map((token, i) => (
                <g key={i}>
                  <rect
                    data-geometry="term-token"
                    x={coord(start + i * w)}
                    y={y}
                    width={w}
                    height="38"
                    fill={C.bg}
                    stroke={step === trace.currentStep ? C.accent : C.line}
                  />
                  <text
                    x={coord(start + i * w + w / 2)}
                    y={y + 25}
                    textAnchor="middle"
                  >
                    {token}
                  </text>
                </g>
              ))}
              {step < 2 && (
                <path
                  data-geometry="redex-bracket"
                  d={`M${coord(start + range[0] * w + 2)} ${y + 44} v7 H${coord(start + (range[1] + 1) * w - 2)} v-7`}
                  fill="none"
                  stroke={result.stuck ? C.danger : C.accent}
                  strokeWidth="2"
                />
              )}
              {result.stuck && step > 0 && (
                <text x="140" y={y + 68} textAnchor="middle" fill={C.danger}>
                  无数值规则：不收缩
                </text>
              )}
            </g>
          );
        })}
        <text
          x="140"
          y="365"
          textAnchor="middle"
          fill={result.stuck ? C.danger : C.accent}
        >
          {result.stuck
            ? "stuck ≠ 数值答案"
            : `最终值 ${result.result}；收缩 2 次`}
        </text>
        <text x="140" y="393" textAnchor="middle">
          本玩具最多执行两次归约
        </text>
      </Drawing>
      <output
        data-readout="expression-reduction"
        className="mt-3 block break-words text-sm"
        aria-live="polite"
      >
        当前项={result.rows[trace.currentStep].join(" ")}；stuck=
        {String(result.stuck)}；最终值={result.result ?? "null"}；实际收缩次数=
        {Math.min(trace.currentStep, result.contractions)}。
        {fault && atom === "blue"
          ? "错误强制转数，原符号没有这个定义。"
          : "符号未求值不等于自然语言没有意义。"}
      </output>
      <Controls domain="expression-reduction" trace={trace} reset={reset} />
    </section>
  );
}
