"use client";

import { useRef, useState } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

const C = {
  bg: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  accent: "var(--accent)",
  danger: "var(--danger)",
  success: "var(--success)",
  warning: "var(--warning)",
} as const;

const T = TEACHING_BEAT_MS;

/** 仅用于 SVG 绘制坐标：消除浮点尾差，避免 SSR hydration 失配；数学结果从不舍入。 */
const rd = (n: number) => Number(n.toFixed(9));

/* ================= Lab 1：环形队列 —— head/tail 在环上追跑 ================= */

const QUEUE_CAP = 8;
const QCX = 450;
const QCY = 300;
const QR = 190;
const SLOT_R = 33;

function slotAngle(i: number) {
  return -90 + i * (360 / QUEUE_CAP);
}

function polar(angleDeg: number, r: number) {
  const a = (angleDeg * Math.PI) / 180;
  return { x: rd(QCX + r * Math.cos(a)), y: rd(QCY + r * Math.sin(a)) };
}

function slotPos(i: number) {
  return polar(slotAngle(i), QR);
}

type QueueOp = { k: "E"; v: number } | { k: "D" };

type QueueEvent = {
  op: "enqueue" | "dequeue";
  slot: number;
  value: number | null;
  wrapped: boolean;
  overflow: boolean;
};

type QueueState = {
  buf: readonly (number | null)[];
  head: number;
  tail: number;
  size: number;
  ev: QueueEvent | null;
};

/** 顺序模型模拟：enqueue 写 tail 槽，dequeue 读 head 槽，linearFault 时 tail 不做模回绕。 */
function runQueue(ops: readonly QueueOp[], linearFault: boolean): QueueState[] {
  const cap = QUEUE_CAP;
  const buf: (number | null)[] = Array.from({ length: cap }, () => null);
  let head = 0;
  let tail = 0;
  let size = 0;
  return ops.map((op) => {
    let ev: QueueEvent;
    if (op.k === "E") {
      const wrapped = tail === cap - 1;
      if (linearFault && tail >= cap) {
        // The faulty linear implementation never wraps tail. Keep the invalid
        // index visible as state, but do not write outside the modeled buffer.
        ev = {
          op: "enqueue",
          slot: tail,
          value: op.v,
          wrapped: false,
          overflow: true,
        };
      } else {
        const slot = tail % cap;
        buf[slot] = op.v;
        tail = linearFault ? tail + 1 : (tail + 1) % cap;
        size += 1;
        ev = { op: "enqueue", slot, value: op.v, wrapped, overflow: false };
      }
    } else {
      const slot = head;
      const value = buf[slot];
      buf[slot] = null;
      head = (head + 1) % cap;
      size -= 1;
      ev = { op: "dequeue", slot, value, wrapped: false, overflow: false };
    }
    return { buf: buf.slice(), head, tail, size, ev };
  });
}

const WRAP_STEPS: readonly TeachingStep[] = [
  { label: "enqueue 11", caption: "写入 tail 指向的槽 0，tail 前进到 1" },
  { label: "enqueue 22", caption: "写入槽 1，tail = 2" },
  { label: "enqueue 33", caption: "写入槽 2，tail = 3" },
  { label: "enqueue 44", caption: "写入槽 3，tail = 4" },
  { label: "enqueue 55", caption: "写入槽 4，tail = 5" },
  { label: "enqueue 66", caption: "写入槽 5，tail = 6，尚未回绕" },
  {
    label: "dequeue → 11",
    caption: "读出 head 槽 0 的 11，head 前进到 1，槽 0 变空",
  },
  { label: "dequeue → 22", caption: "读出槽 1 的 22，head = 2，槽 1 变空" },
  { label: "enqueue 77", caption: "写入槽 6，tail = 7，依旧线性前进" },
  {
    label: "enqueue 88",
    caption: "写入槽 7 后 tail = 8 = 容量，下一步必须回绕",
  },
  { label: "enqueue 99", caption: "tail 回绕到槽 0 —— 正是最早出队腾出的位置" },
];

const FULL_STEPS: readonly TeachingStep[] = [
  { label: "enqueue 11", caption: "写入槽 0，tail = 1" },
  { label: "enqueue 22", caption: "写入槽 1，tail = 2" },
  { label: "enqueue 33", caption: "写入槽 2，tail = 3" },
  { label: "enqueue 44", caption: "写入槽 3，tail = 4" },
  { label: "enqueue 55", caption: "写入槽 4，tail = 5" },
  { label: "enqueue 66", caption: "写入槽 5，tail = 6" },
  { label: "enqueue 77", caption: "写入槽 6，tail = 7" },
  { label: "enqueue 88", caption: "写入槽 7，tail 回绕到 0 —— 与 head 重合" },
  {
    label: "判读 head == tail",
    caption: "只凭 head == tail：空队列与满队列无法区分",
  },
];

type QueueScenarioKey = "wrap" | "full";

const QUEUE_SCENARIOS: Record<
  QueueScenarioKey,
  {
    label: string;
    note: string;
    ops: readonly QueueOp[];
    steps: readonly TeachingStep[];
  }
> = {
  wrap: {
    label: "回绕复用 · 出队空槽被再次入队",
    note: "容量 8：先装 6 个、出队 2 个，tail 越过末尾后复用最早空出的槽",
    ops: [
      { k: "E", v: 11 },
      { k: "E", v: 22 },
      { k: "E", v: 33 },
      { k: "E", v: 44 },
      { k: "E", v: 55 },
      { k: "E", v: 66 },
      { k: "D" },
      { k: "D" },
      { k: "E", v: 77 },
      { k: "E", v: 88 },
      { k: "E", v: 99 },
    ],
    steps: WRAP_STEPS,
  },
  full: {
    label: "装满歧义 · head 与 tail 重合",
    note: "容量 8：连续入队 8 次，tail 恰好追上 head",
    ops: [
      { k: "E", v: 11 },
      { k: "E", v: 22 },
      { k: "E", v: 33 },
      { k: "E", v: 44 },
      { k: "E", v: 55 },
      { k: "E", v: 66 },
      { k: "E", v: 77 },
      { k: "E", v: 88 },
    ],
    steps: FULL_STEPS,
  },
};

function CircularQueueLab() {
  const flashRef = useRef<SVGGElement | null>(null);
  const infoRef = useRef<SVGGElement | null>(null);
  const [scenario, setScenario] = useState<QueueScenarioKey>("wrap");
  const [fault, setFault] = useState(false);

  const selected = QUEUE_SCENARIOS[scenario];
  const steps = selected.steps;
  const timeline = useTeachingTimeline({
    steps,
    build: (tl) => {
      tl.add(infoRef.current!, { opacity: [1, 1] }, 0);
      steps.forEach((step, index) => {
        tl.add(
          flashRef.current!,
          { opacity: [0, 1], duration: T * 0.45, ease: "out(2)" },
          index * T,
        );
        tl.label(step.label, index * T);
      });
    },
  });

  const linearFault = scenario === "wrap" && fault;
  const states = runQueue(selected.ops, linearFault);
  const s = timeline.currentStep;
  const st = states[Math.min(s, states.length - 1)];
  const judge = scenario === "full" && s === steps.length - 1;
  const logical: number[] = [];
  for (let t = 0; t < st.size; t += 1) {
    const v = st.buf[(st.head + t) % QUEUE_CAP];
    if (v !== null) logical.push(v);
  }

  const overflowNow = st.ev?.overflow === true;
  const judgeMisread = judge && fault;
  const flashSlot =
    judge && fault ? st.head : st.ev && !st.ev.overflow ? st.ev.slot : -1;

  function reset() {
    timeline.goToStep(0);
    setScenario("wrap");
    setFault(false);
  }

  const headM = polar(slotAngle(st.head), QR + 52);
  const tailAngle =
    st.tail < QUEUE_CAP ? slotAngle(st.tail) : slotAngle(QUEUE_CAP - 1);
  const tailR = st.tail < QUEUE_CAP ? QR + 52 : QR + 66;
  const tailM = polar(tailAngle, tailR);
  const faultDesc =
    scenario === "wrap"
      ? "现象：tail 走到 8 越界，第 11 步写入被拒，队列明明有空槽却报满。原因：出队只移动 head，槽 0/1 已空但 tail 不会回头。修法：tail = (tail + 1) mod 8，让队列在环上循环。"
      : "现象：装满后 head == tail，若丢掉 size 只凭指针相等判空，会把满队列当成空队列。原因：空与满在指针层面是同一张快照。修法：额外维护 size（本实验做法），或永远保留一个空槽。";

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="clrs4-ch10-circular-queue"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Lab 1 · 环形队列：head/tail 在环上追跑
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              同一批槽位，为什么出队后还能继续入队
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              先预测：连续入队 8 次之后，head 和 tail
              会是什么关系？再沿时间线逐步核对每一次写入与读出，看 tail
              怎样越过末尾回到起点，以及“指针重合”为什么说不清空还是满。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <div className="mb-3 flex flex-wrap items-end gap-3">
          <label className="block min-w-56 flex-1 text-xs text-secondary">
            <span className="mb-1 block font-semibold text-primary">
              选择操作脚本
            </span>
            <select
              aria-label="选择环形队列操作脚本：回绕复用或装满歧义"
              data-param="queue-scenario"
              value={scenario}
              onChange={(event) => {
                setScenario(event.target.value as QueueScenarioKey);
                timeline.goToStep(0);
              }}
              className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
            >
              {(Object.keys(QUEUE_SCENARIOS) as QueueScenarioKey[]).map(
                (key) => (
                  <option key={key} value={key}>
                    {QUEUE_SCENARIOS[key].label}
                  </option>
                ),
              )}
            </select>
          </label>
          <button
            type="button"
            aria-pressed={fault}
            data-fault="queue-ambiguity"
            onClick={() => setFault((v) => !v)}
            className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
              fault
                ? "border-[var(--danger)] text-[var(--danger)]"
                : "border-border text-secondary hover:text-primary"
            }`}
          >
            {fault
              ? "● 故障已注入"
              : scenario === "wrap"
                ? "◇ 注入故障：tail 不回绕（线性队列）"
                : "◇ 注入故障：丢 size，用 head==tail 判空"}
          </button>
        </div>

        <svg
          viewBox="0 0 900 620"
          role="img"
          aria-label="环形队列实验：八个槽位围成一圈，环形箭头标示回绕方向，head 与 tail 游标分别指向读出槽与写入槽，逐步展示入队、出队、tail 回绕复用空槽，以及装满时 head 与 tail 重合的判读歧义，支持脚本切换、故障注入与步进播放。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="clrs4-ch10-q-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker
              id="clrs4-ch10-q-accent"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.accent} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="620" rx="14" fill={C.bg} />
          <text x="30" y="32" fontSize="15" fontWeight="700" fill={C.primary}>
            {selected.label} · 容量 {QUEUE_CAP}
          </text>
          <text
            x="870"
            y="32"
            textAnchor="end"
            fontSize="12"
            fill={overflowNow || judgeMisread ? C.danger : C.secondary}
          >
            {overflowNow
              ? "● 溢出"
              : judgeMisread
                ? "● 误判"
                : `阶段 ${s + 1} / ${steps.length}`}
          </text>
          <text x="30" y="54" fontSize="12" fill={C.secondary}>
            {selected.note}
          </text>

          {Array.from({ length: QUEUE_CAP }, (_, i) => {
            const a1 = slotAngle(i) + 12;
            const a2 = slotAngle(i) + 33;
            const p1 = polar(a1, QR);
            const p2 = polar(a2, QR);
            return (
              <path
                key={`ring-arrow-${i}`}
                d={`M ${p1.x} ${p1.y} A ${QR} ${QR} 0 0 1 ${p2.x} ${p2.y}`}
                fill="none"
                stroke={C.border}
                strokeWidth="1.5"
                markerEnd="url(#clrs4-ch10-q-arrow)"
              />
            );
          })}

          {st.buf.map((value, i) => {
            const p = slotPos(i);
            const isEv = i === flashSlot;
            const emptied = st.ev?.op === "dequeue" && st.ev.slot === i;
            const misread = judgeMisread && i === st.head;
            const stroke = misread
              ? C.danger
              : isEv
                ? C.warning
                : value !== null
                  ? C.accent
                  : C.border;
            return (
              <g key={`slot-${i}`}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={SLOT_R}
                  fill={
                    misread
                      ? C.danger
                      : isEv
                        ? C.warning
                        : value !== null
                          ? C.accent
                          : C.elevated
                  }
                  fillOpacity={
                    misread || isEv ? 0.16 : value !== null ? 0.1 : 1
                  }
                  stroke={stroke}
                  strokeWidth={isEv || misread ? 2.5 : 1.5}
                  strokeDasharray={
                    value !== null || isEv || misread ? "none" : "5 4"
                  }
                />
                {value !== null && (
                  <text
                    x={p.x}
                    y={rd(p.y - 2)}
                    textAnchor="middle"
                    fontSize="16"
                    fontWeight="700"
                    fill={C.primary}
                  >
                    {value}
                  </text>
                )}
                <text
                  x={p.x}
                  y={rd(p.y + (value !== null ? 16 : 4))}
                  textAnchor="middle"
                  fontSize="11"
                  fill={C.secondary}
                >
                  #{i}
                  {emptied ? " 空" : ""}
                </text>
              </g>
            );
          })}

          <g
            ref={(node) => {
              flashRef.current = node;
            }}
            style={{ opacity: 0 }}
          >
            {flashSlot >= 0 && (
              <circle
                cx={slotPos(flashSlot).x}
                cy={slotPos(flashSlot).y}
                r={rd(SLOT_R + 7)}
                fill="none"
                stroke={C.warning}
                strokeWidth="2"
                strokeDasharray="4 4"
              />
            )}
          </g>

          <line
            x1={headM.x}
            y1={headM.y}
            x2={slotPos(st.head).x}
            y2={rd(slotPos(st.head).y - SLOT_R)}
            stroke={C.accent}
            strokeWidth="1.5"
          />
          <circle
            cx={headM.x}
            cy={headM.y}
            r="14"
            fill={C.bg}
            stroke={C.accent}
            strokeWidth="2"
          />
          <text
            x={headM.x}
            y={rd(headM.y + 4)}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={C.accent}
          >
            H
          </text>

          {overflowNow ? (
            <g>
              <line
                x1={tailM.x}
                y1={tailM.y}
                x2={slotPos(QUEUE_CAP - 1).x}
                y2={rd(slotPos(QUEUE_CAP - 1).y - SLOT_R)}
                stroke={C.danger}
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
              <circle
                cx={tailM.x}
                cy={tailM.y}
                r="16"
                fill={C.bg}
                stroke={C.danger}
                strokeWidth="2"
                strokeDasharray="4 3"
              />
              <text
                x={tailM.x}
                y={rd(tailM.y + 4)}
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill={C.danger}
              >
                ✕
              </text>
            </g>
          ) : (
            <g>
              <line
                x1={tailM.x}
                y1={tailM.y}
                x2={slotPos(st.tail).x}
                y2={rd(slotPos(st.tail).y - SLOT_R)}
                stroke={C.warning}
                strokeWidth="1.5"
              />
              <circle
                cx={tailM.x}
                cy={tailM.y}
                r="14"
                fill={C.bg}
                stroke={C.warning}
                strokeWidth="2"
              />
              <text
                x={tailM.x}
                y={rd(tailM.y + 4)}
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill={C.warning}
              >
                T
              </text>
            </g>
          )}

          <text
            x={QCX}
            y={QCY - 12}
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={C.primary}
          >
            size = {st.size} / {QUEUE_CAP}
          </text>
          <text
            x={QCX}
            y={rd(QCY + 12)}
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            head = {st.head}
            {st.tail < QUEUE_CAP
              ? ` · tail = ${st.tail}`
              : ` · tail = ${st.tail} ✕ 越界`}
          </text>
          <text
            x={QCX}
            y={rd(QCY + 36)}
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            {judge ? "head == tail —— 空还是满？" : ""}
          </text>

          <g
            ref={(node) => {
              infoRef.current = node;
            }}
            style={{ opacity: 1 }}
          >
            <rect
              x="30"
              y="556"
              width="840"
              height="46"
              rx="10"
              fill={C.elevated}
              stroke={C.border}
              strokeWidth="1.5"
            />
            <text
              x="52"
              y="577"
              fontSize="12"
              fontWeight="700"
              fill={C.primary}
            >
              {s + 1} · {steps[s].label}
            </text>
            <text x="52" y="594" fontSize="11" fill={C.secondary}>
              {steps[s].caption}
            </text>
            <text
              x="848"
              y="577"
              textAnchor="end"
              fontSize="11"
              fontWeight="700"
              fill={
                overflowNow || judgeMisread
                  ? C.danger
                  : judge
                    ? C.success
                    : C.secondary
              }
            >
              {overflowNow
                ? "溢出：tail 越界，写入被拒"
                : judgeMisread
                  ? "误判：满队列被当成空"
                  : judge
                    ? "size = 8 → 满队列"
                    : `阶段 ${s + 1} / ${steps.length}`}
            </text>
          </g>
        </svg>

        <div
          data-readout="circular-queue"
          className="mt-3 rounded-control border border-border bg-bg px-3 py-2 text-xs leading-6 text-secondary"
        >
          size {st.size}/{QUEUE_CAP} · head {st.head} · tail {st.tail}
          {st.ev?.wrapped ? "（本步 tail 回绕）" : ""} · 逻辑序 [
          {logical.join(", ")}]
          {overflowNow ? (
            <span className="font-semibold text-[var(--danger)]">
              {" "}
              · 溢出：环形修法是 (tail+1) mod {QUEUE_CAP}
            </span>
          ) : judge ? (
            <span
              className={
                fault
                  ? "font-semibold text-[var(--danger)]"
                  : "font-semibold text-[var(--success)]"
              }
            >
              {" "}
              ·{" "}
              {fault
                ? "丢 size 后 head==tail → 误判为空"
                : "size=8 → 满，enqueue 应报 overflow"}
            </span>
          ) : null}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <p className="max-w-3xl text-xs leading-5 text-secondary">
            {faultDesc}
          </p>
        </div>

        <TimelineControls
          timeline={timeline}
          labelText={Object.fromEntries(
            steps.map((st2) => [st2.label, st2.caption ?? st2.label]),
          )}
          caption="先预测每一步 head/tail 的位置，再逐步核对：槽位怎样被复用，以及重合那一刻凭什么判空满。"
          reset={{
            label: "重置实验",
            ariaLabel: "重置环形队列实验",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        环形队列用模运算把数组首尾相接：出队腾出的槽会被后续入队复用，head 与
        tail 在环上追跑；空与满必须用 size（或留一个空槽）区分。
      </figcaption>
    </figure>
  );
}

/* ================= Lab 2：哨兵双向链表 —— 常数时间的指针手术 ================= */

type ListScenarioKey = "erase" | "insert";
type LNode = "S" | "A" | "B" | "C" | "X";
type EdgeStatus = "base" | "new" | "cut" | "stale" | "walk";
type ListEdge = {
  lane: "top" | "bottom";
  from: LNode;
  to: LNode;
  status: EdgeStatus;
};
type NodeMode = "normal" | "sentinel" | "ghost" | "gone";
type ListScene = {
  nodes: ReadonlyArray<{ name: LNode; mode: NodeMode }>;
  edges: readonly ListEdge[];
  verdict: { ok: boolean; text: string } | null;
};

const ERASE_POS: Record<LNode, number> = {
  S: 120,
  A: 300,
  B: 480,
  C: 660,
  X: 0,
};
const INSERT_POS: Record<LNode, number> = {
  S: 120,
  X: 300,
  A: 480,
  B: 660,
  C: 840,
};
const NODE_TOP = 190;
const NODE_BOTTOM = 258;

function eraseScene(s: number, fault: boolean): ListScene {
  const ghostB = fault && s >= 2;
  const nodes: Array<{ name: LNode; mode: NodeMode }> = [
    { name: "S", mode: "sentinel" },
    { name: "A", mode: "normal" },
    { name: "B", mode: s <= 1 ? "normal" : ghostB ? "ghost" : "gone" },
    { name: "C", mode: "normal" },
  ];
  let edges: readonly ListEdge[];
  if (s === 0) {
    edges = [
      { lane: "top", from: "S", to: "A", status: "base" },
      { lane: "top", from: "A", to: "B", status: "base" },
      { lane: "top", from: "B", to: "C", status: "base" },
      { lane: "top", from: "C", to: "S", status: "base" },
      { lane: "bottom", from: "A", to: "S", status: "base" },
      { lane: "bottom", from: "B", to: "A", status: "base" },
      { lane: "bottom", from: "C", to: "B", status: "base" },
      { lane: "bottom", from: "S", to: "C", status: "base" },
    ];
  } else if (s === 1) {
    edges = [
      { lane: "top", from: "S", to: "A", status: "base" },
      { lane: "top", from: "A", to: "B", status: "cut" },
      { lane: "top", from: "A", to: "C", status: "new" },
      { lane: "top", from: "B", to: "C", status: "base" },
      { lane: "top", from: "C", to: "S", status: "base" },
      { lane: "bottom", from: "A", to: "S", status: "base" },
      { lane: "bottom", from: "B", to: "A", status: "base" },
      { lane: "bottom", from: "C", to: "B", status: "base" },
      { lane: "bottom", from: "S", to: "C", status: "base" },
    ];
  } else if (s === 2 && !fault) {
    edges = [
      { lane: "top", from: "S", to: "A", status: "base" },
      { lane: "top", from: "A", to: "C", status: "base" },
      { lane: "top", from: "C", to: "S", status: "base" },
      { lane: "bottom", from: "A", to: "S", status: "base" },
      { lane: "bottom", from: "C", to: "A", status: "new" },
      { lane: "bottom", from: "S", to: "C", status: "base" },
    ];
  } else if (s === 2 && fault) {
    edges = [
      { lane: "top", from: "S", to: "A", status: "base" },
      { lane: "top", from: "A", to: "B", status: "cut" },
      { lane: "top", from: "A", to: "C", status: "new" },
      { lane: "top", from: "B", to: "C", status: "base" },
      { lane: "top", from: "C", to: "S", status: "base" },
      { lane: "bottom", from: "A", to: "S", status: "base" },
      { lane: "bottom", from: "B", to: "A", status: "base" },
      { lane: "bottom", from: "C", to: "B", status: "stale" },
      { lane: "bottom", from: "S", to: "C", status: "base" },
    ];
  } else if (s === 3 && !fault) {
    edges = [
      { lane: "top", from: "S", to: "A", status: "walk" },
      { lane: "top", from: "A", to: "C", status: "walk" },
      { lane: "top", from: "C", to: "S", status: "walk" },
      { lane: "bottom", from: "A", to: "S", status: "base" },
      { lane: "bottom", from: "C", to: "A", status: "base" },
      { lane: "bottom", from: "S", to: "C", status: "base" },
    ];
  } else if (s === 3 && fault) {
    edges = [
      { lane: "top", from: "S", to: "A", status: "walk" },
      { lane: "top", from: "A", to: "C", status: "walk" },
      { lane: "top", from: "C", to: "S", status: "walk" },
      { lane: "bottom", from: "A", to: "S", status: "base" },
      { lane: "bottom", from: "C", to: "B", status: "stale" },
      { lane: "bottom", from: "S", to: "C", status: "base" },
    ];
  } else if (!fault) {
    edges = [
      { lane: "top", from: "S", to: "A", status: "base" },
      { lane: "top", from: "A", to: "C", status: "base" },
      { lane: "top", from: "C", to: "S", status: "base" },
      { lane: "bottom", from: "A", to: "S", status: "walk" },
      { lane: "bottom", from: "C", to: "A", status: "walk" },
      { lane: "bottom", from: "S", to: "C", status: "walk" },
    ];
  } else {
    edges = [
      { lane: "top", from: "S", to: "A", status: "base" },
      { lane: "top", from: "A", to: "C", status: "base" },
      { lane: "top", from: "C", to: "S", status: "base" },
      { lane: "bottom", from: "A", to: "S", status: "base" },
      { lane: "bottom", from: "C", to: "B", status: "stale" },
      { lane: "bottom", from: "S", to: "C", status: "base" },
    ];
  }
  const verdict: ListScene["verdict"] =
    s === 4
      ? fault
        ? {
            ok: false,
            text: "反向走查断在 C：C.prev 仍指向已摘链的 B —— next 侧手术被跳过",
          }
        : { ok: true, text: "反向走查 S←C←A←S：prev 与 next 全部互逆 ✓" }
      : null;
  return { nodes, edges, verdict };
}

function insertScene(s: number, fault: boolean): ListScene {
  const nodes: Array<{ name: LNode; mode: NodeMode }> = [
    { name: "S", mode: "sentinel" },
    { name: "X", mode: s === 0 ? "ghost" : "normal" },
    { name: "A", mode: "normal" },
    { name: "B", mode: "normal" },
    { name: "C", mode: "normal" },
  ];
  let edges: readonly ListEdge[];
  if (s === 0) {
    edges = [
      { lane: "top", from: "S", to: "A", status: "base" },
      { lane: "top", from: "A", to: "B", status: "base" },
      { lane: "top", from: "B", to: "C", status: "base" },
      { lane: "top", from: "C", to: "S", status: "base" },
      { lane: "bottom", from: "A", to: "S", status: "base" },
      { lane: "bottom", from: "B", to: "A", status: "base" },
      { lane: "bottom", from: "C", to: "B", status: "base" },
      { lane: "bottom", from: "S", to: "C", status: "base" },
    ];
  } else if (s === 1) {
    edges = [
      { lane: "top", from: "S", to: "A", status: "base" },
      { lane: "top", from: "A", to: "B", status: "base" },
      { lane: "top", from: "B", to: "C", status: "base" },
      { lane: "top", from: "C", to: "S", status: "base" },
      { lane: "top", from: "X", to: "A", status: "new" },
      { lane: "bottom", from: "A", to: "S", status: "base" },
      { lane: "bottom", from: "B", to: "A", status: "base" },
      { lane: "bottom", from: "C", to: "B", status: "base" },
      { lane: "bottom", from: "S", to: "C", status: "base" },
      { lane: "bottom", from: "X", to: "S", status: "new" },
    ];
  } else if (s === 2) {
    edges = [
      { lane: "top", from: "S", to: "X", status: "new" },
      { lane: "top", from: "S", to: "A", status: "cut" },
      { lane: "top", from: "X", to: "A", status: "base" },
      { lane: "top", from: "A", to: "B", status: "base" },
      { lane: "top", from: "B", to: "C", status: "base" },
      { lane: "top", from: "C", to: "S", status: "base" },
      { lane: "bottom", from: "A", to: "S", status: "base" },
      { lane: "bottom", from: "B", to: "A", status: "base" },
      { lane: "bottom", from: "C", to: "B", status: "base" },
      { lane: "bottom", from: "S", to: "C", status: "base" },
      { lane: "bottom", from: "X", to: "S", status: "base" },
    ];
  } else if (s === 3 && !fault) {
    edges = [
      { lane: "top", from: "S", to: "X", status: "base" },
      { lane: "top", from: "X", to: "A", status: "base" },
      { lane: "top", from: "A", to: "B", status: "base" },
      { lane: "top", from: "B", to: "C", status: "base" },
      { lane: "top", from: "C", to: "S", status: "base" },
      { lane: "bottom", from: "A", to: "X", status: "new" },
      { lane: "bottom", from: "A", to: "S", status: "cut" },
      { lane: "bottom", from: "B", to: "A", status: "base" },
      { lane: "bottom", from: "C", to: "B", status: "base" },
      { lane: "bottom", from: "S", to: "C", status: "base" },
      { lane: "bottom", from: "X", to: "S", status: "base" },
    ];
  } else if (s === 3 && fault) {
    edges = insertScene(2, false).edges;
  } else if (!fault) {
    edges = [
      { lane: "top", from: "S", to: "X", status: "walk" },
      { lane: "top", from: "X", to: "A", status: "walk" },
      { lane: "top", from: "A", to: "B", status: "walk" },
      { lane: "top", from: "B", to: "C", status: "walk" },
      { lane: "top", from: "C", to: "S", status: "walk" },
      { lane: "bottom", from: "A", to: "X", status: "base" },
      { lane: "bottom", from: "B", to: "A", status: "base" },
      { lane: "bottom", from: "C", to: "B", status: "base" },
      { lane: "bottom", from: "S", to: "C", status: "base" },
      { lane: "bottom", from: "X", to: "S", status: "base" },
    ];
  } else {
    edges = [
      { lane: "top", from: "S", to: "X", status: "walk" },
      { lane: "top", from: "X", to: "A", status: "walk" },
      { lane: "top", from: "A", to: "B", status: "walk" },
      { lane: "top", from: "B", to: "C", status: "walk" },
      { lane: "top", from: "C", to: "S", status: "walk" },
      { lane: "bottom", from: "A", to: "S", status: "stale" },
      { lane: "bottom", from: "B", to: "A", status: "base" },
      { lane: "bottom", from: "C", to: "B", status: "base" },
      { lane: "bottom", from: "S", to: "C", status: "base" },
      { lane: "bottom", from: "X", to: "S", status: "base" },
    ];
  }
  const verdict: ListScene["verdict"] =
    s === 4
      ? fault
        ? {
            ok: false,
            text: "反向走查 S←C←B←A←S 漏掉 X：A.prev 未更新，X 只能从正向到达",
          }
        : { ok: true, text: "双向走查均通过：X 与前后邻居的指针互逆 ✓" }
      : null;
  return { nodes, edges, verdict };
}

const ERASE_STEPS: readonly TeachingStep[] = [
  {
    label: "handle",
    caption: "已持有 B 的地址：删除入口是节点本身，不是按值搜索",
  },
  {
    label: "prev 侧手术",
    caption: "B.prev.next ← B.next：A 的 next 绕过 B 直指 C",
  },
  {
    label: "next 侧手术",
    caption: "B.next.prev ← B.prev：C 的 prev 绕过 B 直指 A",
  },
  { label: "正向走查", caption: "从哨兵沿 next：S→A→C→S，恰好一圈回到哨兵" },
  {
    label: "反向校验",
    caption: "沿 prev 反向走查：每条 prev 与 next 互逆才合格",
  },
];

const INSERT_STEPS: readonly TeachingStep[] = [
  {
    label: "handle",
    caption: "目标：在哨兵与 A 之间插入 X——表头插入也走同一段代码",
  },
  { label: "接好 X", caption: "X.next ← A，X.prev ← S：新节点先自认邻居" },
  {
    label: "改前驱",
    caption: "S.next ← X：前驱的 next 指向新节点，旧边 S→A 退役",
  },
  {
    label: "改后继",
    caption: "A.prev ← X：后继的 prev 指向新节点，旧边 A→S 退役",
  },
  { label: "双向走查", caption: "正向 S→X→A→B→C→S，反向逐一互逆" },
];

const LIST_SCENARIOS: Record<
  ListScenarioKey,
  { label: string; steps: readonly TeachingStep[] }
> = {
  erase: { label: "删除 B · 已知 handle", steps: ERASE_STEPS },
  insert: { label: "表头插入 X · 哨兵与 A 之间", steps: INSERT_STEPS },
};

function edgePath(
  lane: "top" | "bottom",
  fromX: number,
  toX: number,
): { d: string; labelX: number; labelY: number; span: "adjacent" | "return" } {
  const span = Math.abs(toX - fromX) > 220 ? "return" : "adjacent";
  if (lane === "top") {
    const high = span === "return" ? 64 : 136;
    const f = fromX < toX ? fromX + 28 : fromX + 20;
    const t = fromX < toX ? toX - 28 : toX - 20;
    return {
      d: `M ${f} ${NODE_TOP - 4} C ${f} ${high} ${t} ${high} ${t} ${NODE_TOP - 4}`,
      labelX: rd((f + t) / 2),
      labelY: high - 8,
      span,
    };
  }
  const low = span === "return" ? 384 : 312;
  const f = fromX < toX ? fromX + 20 : fromX - 28;
  const t = fromX < toX ? toX + 28 : toX + 28;
  return {
    d: `M ${f} ${NODE_BOTTOM + 4} C ${f} ${low} ${t} ${low} ${t} ${NODE_BOTTOM + 4}`,
    labelX: rd((f + t) / 2),
    labelY: low + 16,
    span,
  };
}

function SentinelListLab() {
  const flashRef = useRef<SVGGElement | null>(null);
  const infoRef = useRef<SVGGElement | null>(null);
  const [scenario, setScenario] = useState<ListScenarioKey>("erase");
  const [fault, setFault] = useState(false);

  const selected = LIST_SCENARIOS[scenario];
  const steps = selected.steps;
  const timeline = useTeachingTimeline({
    steps,
    build: (tl) => {
      tl.add(infoRef.current!, { opacity: [1, 1] }, 0);
      steps.forEach((step, index) => {
        tl.add(
          flashRef.current!,
          { opacity: [0, 1], duration: T * 0.45, ease: "out(2)" },
          index * T,
        );
        tl.label(step.label, index * T);
      });
    },
  });

  const s = timeline.currentStep;
  const pos = scenario === "erase" ? ERASE_POS : INSERT_POS;
  const scene =
    scenario === "erase" ? eraseScene(s, fault) : insertScene(s, fault);
  const visible = new Set(
    scene.nodes.filter((n) => n.mode !== "gone").map((n) => n.name),
  );
  const touched = new Set<LNode>();
  scene.edges.forEach((e) => {
    if (e.status === "new" || e.status === "stale") {
      if (visible.has(e.from)) touched.add(e.from);
      if (visible.has(e.to)) touched.add(e.to);
    }
  });

  function reset() {
    timeline.goToStep(0);
    setScenario("erase");
    setFault(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="clrs4-ch10-sentinel-list"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Lab 2 · 哨兵双向链表：常数时间的指针手术
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              四条指针改写，为什么不需要任何 if
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              先预测：删除 B 需要动几个指针、遍历几个节点？再沿时间线看“绕过
              B”的两侧手术，最后用正向、反向两次走查验收——反向那遍专门抓“只改了一侧”的半断链。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <div className="mb-3 flex flex-wrap items-end gap-3">
          <label className="block min-w-56 flex-1 text-xs text-secondary">
            <span className="mb-1 block font-semibold text-primary">
              选择操作
            </span>
            <select
              aria-label="选择哨兵链表操作：删除已知节点 B，或在表头插入 X"
              data-param="list-scenario"
              value={scenario}
              onChange={(event) => {
                setScenario(event.target.value as ListScenarioKey);
                timeline.goToStep(0);
              }}
              className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
            >
              {(Object.keys(LIST_SCENARIOS) as ListScenarioKey[]).map((key) => (
                <option key={key} value={key}>
                  {LIST_SCENARIOS[key].label}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            aria-pressed={fault}
            data-fault="half-pointer-surgery"
            onClick={() => setFault((v) => !v)}
            className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
              fault
                ? "border-[var(--danger)] text-[var(--danger)]"
                : "border-border text-secondary hover:text-primary"
            }`}
          >
            {fault
              ? "● 故障已注入：只做一半指针手术"
              : "◇ 注入故障：只做一半指针手术"}
          </button>
        </div>

        <svg
          viewBox="0 0 900 560"
          role="img"
          aria-label="哨兵双向链表实验：上排 next 指针与下排 prev 指针在两个节点之间成对绕行，逐步展示删除已知节点或表头插入的四条指针改写，最后以正向与反向走查验收，故障注入可制造只改一侧指针的半断链，支持操作切换与步进播放。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="clrs4-ch10-l-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker
              id="clrs4-ch10-l-accent"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.accent} />
            </marker>
            <marker
              id="clrs4-ch10-l-danger"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.danger} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="560" rx="14" fill={C.bg} />
          <text x="30" y="32" fontSize="15" fontWeight="700" fill={C.primary}>
            {selected.label} · 阶段 {s + 1} / {steps.length}
          </text>
          <text
            x="870"
            y="32"
            textAnchor="end"
            fontSize="12"
            fill={C.secondary}
          >
            上排 next · 下排 prev
          </text>

          {scene.edges.map((e) => {
            if (!visible.has(e.from) || !visible.has(e.to)) return null;
            const g = edgePath(e.lane, pos[e.from], pos[e.to]);
            const stroke =
              e.status === "base"
                ? C.border
                : e.status === "walk" || e.status === "new"
                  ? C.accent
                  : C.danger;
            const marker =
              e.status === "base"
                ? "url(#clrs4-ch10-l-arrow)"
                : e.status === "walk" || e.status === "new"
                  ? "url(#clrs4-ch10-l-accent)"
                  : "url(#clrs4-ch10-l-danger)";
            const label =
              e.status === "new"
                ? "改写"
                : e.status === "cut"
                  ? "断开"
                  : e.status === "stale"
                    ? "残留"
                    : null;
            return (
              <g key={`${e.lane}-${e.from}-${e.to}`}>
                <path
                  d={g.d}
                  fill="none"
                  stroke={stroke}
                  strokeWidth={
                    e.status === "walk" ? 3 : e.status === "base" ? 1.5 : 2.25
                  }
                  strokeDasharray={
                    e.status === "cut"
                      ? "7 5"
                      : e.status === "stale"
                        ? "2 3"
                        : "none"
                  }
                  strokeOpacity={e.status === "cut" ? 0.75 : 1}
                  markerEnd={marker}
                />
                {label && (
                  <text
                    x={g.labelX}
                    y={g.labelY}
                    textAnchor="middle"
                    fontSize="11"
                    fill={stroke}
                  >
                    {label}
                  </text>
                )}
              </g>
            );
          })}

          <g
            ref={(node) => {
              flashRef.current = node;
            }}
            style={{ opacity: 0 }}
          >
            {Array.from(touched).map((name) => (
              <circle
                key={`flash-${name}`}
                cx={pos[name]}
                cy={rd((NODE_TOP + NODE_BOTTOM) / 2)}
                r="42"
                fill="none"
                stroke={C.warning}
                strokeWidth="2"
                strokeDasharray="4 4"
              />
            ))}
          </g>

          {scene.nodes.map((n) => {
            if (n.mode === "gone") return null;
            const x = pos[n.name];
            const isSentinel = n.mode === "sentinel";
            const isGhost = n.mode === "ghost";
            return (
              <g key={`node-${n.name}`} opacity={isGhost ? 0.55 : 1}>
                <rect
                  x={rd(x - 55)}
                  y={NODE_TOP}
                  width="110"
                  height="64"
                  rx="10"
                  fill={isSentinel ? C.accent : C.elevated}
                  fillOpacity={isSentinel ? 0.12 : 1}
                  stroke={
                    isSentinel ? C.accent : isGhost ? C.secondary : C.border
                  }
                  strokeWidth={isSentinel ? 2 : 1.5}
                  strokeDasharray={isGhost ? "5 4" : "none"}
                />
                <text
                  x={rd(x - 45)}
                  y={rd(NODE_TOP + 16)}
                  fontSize="11"
                  fill={C.secondary}
                >
                  prev
                </text>
                <text
                  x={rd(x + 45)}
                  y={rd(NODE_TOP + 16)}
                  textAnchor="end"
                  fontSize="11"
                  fill={C.secondary}
                >
                  next
                </text>
                <text
                  x={x}
                  y={rd(NODE_TOP + 46)}
                  textAnchor="middle"
                  fontSize="18"
                  fontWeight="700"
                  fill={C.primary}
                >
                  {n.name}
                </text>
                {isSentinel && (
                  <text
                    x={x}
                    y={rd(NODE_BOTTOM + 22)}
                    textAnchor="middle"
                    fontSize="11"
                    fill={C.accent}
                  >
                    哨兵 · 空表时自环
                  </text>
                )}
              </g>
            );
          })}

          <g
            ref={(node) => {
              infoRef.current = node;
            }}
            style={{ opacity: 1 }}
          >
            <rect
              x="30"
              y="452"
              width="840"
              height="84"
              rx="10"
              fill={C.elevated}
              stroke={C.border}
              strokeWidth="1.5"
            />
            <text
              x="52"
              y="476"
              fontSize="12"
              fontWeight="700"
              fill={C.primary}
            >
              {s + 1} · {steps[s].label}
            </text>
            <text x="52" y="495" fontSize="11" fill={C.secondary}>
              {steps[s].caption}
            </text>
            <text
              x="52"
              y="520"
              fontSize="12"
              fontWeight="700"
              fill={
                scene.verdict
                  ? scene.verdict.ok
                    ? C.success
                    : C.danger
                  : fault
                    ? C.danger
                    : C.secondary
              }
            >
              {scene.verdict
                ? scene.verdict.text
                : fault && s >= 2
                  ? "故障注入中：另一侧指针未同步改写"
                  : "每次手术只动两条指针，与链表长度无关"}
            </text>
          </g>
        </svg>

        <div
          data-readout="sentinel-list"
          className="mt-3 rounded-control border border-border bg-bg px-3 py-2 text-xs leading-6 text-secondary"
        >
          阶段 {s + 1}/{steps.length} · {steps[s].label} ·{" "}
          {scene.verdict ? (
            <span
              className={
                scene.verdict.ok
                  ? "font-semibold text-[var(--success)]"
                  : "font-semibold text-[var(--danger)]"
              }
            >
              {scene.verdict.ok ? "双向校验通过" : "双向校验失败：存在半断链"}
            </span>
          ) : (
            "走查待执行"
          )}
          {fault ? " · 故障：只改一侧指针" : ""}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <p className="max-w-3xl text-xs leading-5 text-secondary">
            现象：反向走查断链或漏节点，正向却一切正常。原因：删除/插入必须成对改写
            next 与 prev
            两侧，只改一侧就是半断链。修法：按“前驱绕过、后继绕过”的固定四句改写，再用反向走查验收（Lab
            2 的最后一步）。
          </p>
        </div>

        <TimelineControls
          timeline={timeline}
          labelText={Object.fromEntries(
            steps.map((st2) => [st2.label, st2.caption ?? st2.label]),
          )}
          caption="先预测要动几条指针，再逐步核对两侧手术，最后看反向走查能不能抓到半断链。"
          reset={{
            label: "重置实验",
            ariaLabel: "重置哨兵链表实验",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        循环哨兵让空表、表头、表尾共享同一段无分支代码：哨兵的 next/prev
        永远有效，删除与插入都只改写常数条指针。
      </figcaption>
    </figure>
  );
}

/* ================= Lab 3：左孩子右兄弟 —— 任意叉树的二叉编码 ================= */

type TreeNode = "R" | "A" | "B" | "C" | "D" | "E";

const ORIGINAL_POS: Record<TreeNode, readonly [number, number]> = {
  R: [190, 90],
  A: [100, 210],
  B: [190, 210],
  C: [280, 210],
  D: [60, 330],
  E: [150, 330],
};

const LCRS_POS: Record<TreeNode, readonly [number, number]> = {
  R: [650, 90],
  A: [560, 210],
  B: [650, 210],
  C: [740, 210],
  D: [520, 330],
  E: [610, 330],
};

const ORIGINAL_EDGES: ReadonlyArray<readonly [TreeNode, TreeNode]> = [
  ["R", "A"],
  ["R", "B"],
  ["R", "C"],
  ["A", "D"],
  ["A", "E"],
];

const LEFT_CHILD_EDGES: ReadonlyArray<readonly [TreeNode, TreeNode]> = [
  ["R", "A"],
  ["A", "D"],
];

const RIGHT_SIBLING_EDGES: ReadonlyArray<readonly [TreeNode, TreeNode]> = [
  ["A", "B"],
  ["B", "C"],
  ["D", "E"],
];

const LCRS_CHILD: Record<TreeNode, string> = {
  R: "A",
  A: "D",
  B: "无（叶子）",
  C: "无（叶子）",
  D: "无（叶子）",
  E: "无（叶子）",
};

const LCRS_SIBLING: Record<TreeNode, string> = {
  R: "无（根无兄弟）",
  A: "B",
  B: "C",
  C: "无（最右兄弟）",
  D: "E",
  E: "无（最右兄弟）",
};

const PREORDER: Record<TreeNode, number> = {
  R: 1,
  A: 2,
  D: 3,
  E: 4,
  B: 5,
  C: 6,
};

const LCRS_STEPS: readonly TeachingStep[] = [
  {
    label: "原树形状",
    caption: "R 的孩子是 A B C；A 的孩子是 D E——分叉数不固定",
  },
  {
    label: "left-child 指针",
    caption: "每个节点只保留最左孩子：R.left=A，A.left=D",
  },
  {
    label: "right-sibling 指针",
    caption: "其余孩子沿兄弟链右移：A.right=B，B.right=C；D.right=E",
  },
  {
    label: "先序遍历核对",
    caption: "按编码遍历得到 R A D E B C，与原树先序完全一致",
  },
];

function LcRsTreeLab() {
  const flashRef = useRef<SVGGElement | null>(null);
  const infoRef = useRef<SVGGElement | null>(null);
  const [focus, setFocus] = useState<TreeNode>("A");
  const steps = LCRS_STEPS;
  const timeline = useTeachingTimeline({
    steps,
    build: (tl) => {
      tl.add(infoRef.current!, { opacity: [1, 1] }, 0);
      steps.forEach((step, index) => {
        tl.add(
          flashRef.current!,
          { opacity: [0, 1], duration: T * 0.45, ease: "out(2)" },
          index * T,
        );
        tl.label(step.label, index * T);
      });
    },
  });

  const s = timeline.currentStep;

  function reset() {
    timeline.goToStep(0);
    setFocus("A");
  }

  const focusHasEdge = (list: ReadonlyArray<readonly [TreeNode, TreeNode]>) =>
    list.some(([f, t]) => f === focus || t === focus);

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="clrs4-ch10-lcrs-tree"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Lab 3 · 左孩子右兄弟：任意叉树的二叉编码
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              固定两个指针，装下任意多个孩子
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              先预测：右边编码里，B
              的“向下指针”指向谁？再沿时间线看原树怎样被改写成 左孩子 +
              右兄弟两种边，最后核对编码树的先序遍历与原树一致。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <div className="mb-3 flex flex-wrap items-end gap-3">
          <label className="block min-w-56 flex-1 text-xs text-secondary">
            <span className="mb-1 block font-semibold text-primary">
              查看某节点的两个指针
            </span>
            <select
              aria-label="选择左孩子右兄弟编码树中的节点，查看它的 left-child 与 right-sibling 指针"
              data-param="lcrs-focus"
              value={focus}
              onChange={(event) => setFocus(event.target.value as TreeNode)}
              className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
            >
              {(Object.keys(LCRS_POS) as TreeNode[]).map((name) => (
                <option key={name} value={name}>
                  节点 {name}
                </option>
              ))}
            </select>
          </label>
          <div
            data-readout="lcrs-focus"
            className="min-h-11 flex-1 rounded-control border border-border bg-bg px-3 py-2 text-xs leading-5 text-secondary"
          >
            节点 {focus}：left-child → {LCRS_CHILD[focus]}；right-sibling →{" "}
            {LCRS_SIBLING[focus]}
          </div>
        </div>

        <svg
          viewBox="0 0 900 560"
          role="img"
          aria-label="左孩子右兄弟编码实验：左侧为原树（R 有孩子 A B C，A 有孩子 D E），右侧为二叉编码（left-child 边向下、right-sibling 边横向），逐步展示编码过程并用先序遍历核对，可通过下拉或点击节点查看任一节点的两个指针，支持步进播放。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="clrs4-ch10-t-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker
              id="clrs4-ch10-t-accent"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.accent} />
            </marker>
            <marker
              id="clrs4-ch10-t-warning"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.warning} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="560" rx="14" fill={C.bg} />
          <text x="30" y="32" fontSize="15" fontWeight="700" fill={C.primary}>
            左：原树形状 · 右：左孩子右兄弟编码
          </text>
          <text
            x="870"
            y="32"
            textAnchor="end"
            fontSize="12"
            fill={C.secondary}
          >
            阶段 {s + 1} / {steps.length}
          </text>
          <text
            x="190"
            y="60"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            原树（分叉任意）
          </text>
          <text
            x="650"
            y="60"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            编码树（每节点恰两个指针）
          </text>
          <text x="560" y="470" fontSize="11" fill={C.accent}>
            ■ left-child 只指最左孩子
          </text>
          <text x="560" y="490" fontSize="11" fill={C.warning}>
            ■ right-sibling 横向连成兄弟链
          </text>

          {ORIGINAL_EDGES.map(([f, t]) => {
            const [fx, fy] = ORIGINAL_POS[f];
            const [tx, ty] = ORIGINAL_POS[t];
            const active = f === focus;
            return (
              <line
                key={`orig-${f}-${t}`}
                x1={fx}
                y1={rd(fy + 26)}
                x2={tx}
                y2={rd(ty - 26)}
                stroke={active ? C.accent : C.border}
                strokeWidth={active ? 2.5 : 1.5}
                markerEnd={
                  active
                    ? "url(#clrs4-ch10-t-accent)"
                    : "url(#clrs4-ch10-t-arrow)"
                }
              />
            );
          })}

          {(Object.keys(ORIGINAL_POS) as TreeNode[]).map((name) => {
            const [x, y] = ORIGINAL_POS[name];
            const isFocus = name === focus;
            return (
              <g
                key={`orig-node-${name}`}
                onClick={() => setFocus(name)}
                style={{ cursor: "pointer" }}
              >
                <circle
                  cx={x}
                  cy={y}
                  r="26"
                  fill={isFocus ? C.accent : C.elevated}
                  fillOpacity={isFocus ? 0.16 : 1}
                  stroke={isFocus ? C.accent : C.border}
                  strokeWidth={isFocus ? 2.5 : 1.5}
                />
                <text
                  x={x}
                  y={rd(y + 5)}
                  textAnchor="middle"
                  fontSize="15"
                  fontWeight="700"
                  fill={C.primary}
                >
                  {name}
                </text>
                {s >= 3 && (
                  <text
                    x={rd(x + 34)}
                    y={rd(y - 22)}
                    fontSize="11"
                    fontWeight="700"
                    fill={C.secondary}
                  >
                    {"①②③④⑤⑥"[PREORDER[name] - 1]}
                  </text>
                )}
              </g>
            );
          })}

          {s >= 1 &&
            LEFT_CHILD_EDGES.map(([f, t]) => {
              const [fx, fy] = LCRS_POS[f];
              const [tx, ty] = LCRS_POS[t];
              const active = f === focus;
              return (
                <line
                  key={`lc-${f}-${t}`}
                  x1={rd(fx - 10)}
                  y1={rd(fy + 22)}
                  x2={rd(tx + 6)}
                  y2={rd(ty - 22)}
                  stroke={C.accent}
                  strokeWidth={active ? 4 : 2.5}
                  strokeOpacity={s === 1 ? 1 : 0.85}
                  markerEnd="url(#clrs4-ch10-t-accent)"
                />
              );
            })}

          {s >= 2 &&
            RIGHT_SIBLING_EDGES.map(([f, t]) => {
              const [fx, fy] = LCRS_POS[f];
              const [tx] = LCRS_POS[t];
              const active = f === focus || t === focus;
              return (
                <line
                  key={`rs-${f}-${t}`}
                  x1={rd(fx + 28)}
                  y1={fy}
                  x2={rd(tx - 28)}
                  y2={fy}
                  stroke={C.warning}
                  strokeWidth={active ? 4 : 2.5}
                  markerEnd="url(#clrs4-ch10-t-warning)"
                />
              );
            })}

          {(Object.keys(LCRS_POS) as TreeNode[]).map((name) => {
            const [x, y] = LCRS_POS[name];
            const isFocus = name === focus;
            const hasPointer =
              focusHasEdge(LEFT_CHILD_EDGES) ||
              focusHasEdge(RIGHT_SIBLING_EDGES);
            void hasPointer;
            return (
              <g
                key={`lcrs-node-${name}`}
                onClick={() => setFocus(name)}
                style={{ cursor: "pointer" }}
              >
                {isFocus && (
                  <circle
                    cx={x}
                    cy={y}
                    r="31"
                    fill="none"
                    stroke={C.primary}
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                )}
                <circle
                  cx={x}
                  cy={y}
                  r="26"
                  fill={isFocus ? C.accent : C.elevated}
                  fillOpacity={isFocus ? 0.16 : 1}
                  stroke={isFocus ? C.accent : C.border}
                  strokeWidth={isFocus ? 2.5 : 1.5}
                />
                <text
                  x={x}
                  y={rd(y + 5)}
                  textAnchor="middle"
                  fontSize="15"
                  fontWeight="700"
                  fill={C.primary}
                >
                  {name}
                </text>
                {s >= 3 && (
                  <text
                    x={rd(x + 34)}
                    y={rd(y - 22)}
                    fontSize="11"
                    fontWeight="700"
                    fill={C.secondary}
                  >
                    {"①②③④⑤⑥"[PREORDER[name] - 1]}
                  </text>
                )}
              </g>
            );
          })}

          <g
            ref={(node) => {
              flashRef.current = node;
            }}
            style={{ opacity: 0 }}
          >
            {(() => {
              const [fx, fy] = LCRS_POS[focus];
              return (
                <circle
                  cx={fx}
                  cy={fy}
                  r="38"
                  fill="none"
                  stroke={C.warning}
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
              );
            })()}
          </g>

          <g
            ref={(node) => {
              infoRef.current = node;
            }}
            style={{ opacity: 1 }}
          >
            <rect
              x="30"
              y="508"
              width="840"
              height="40"
              rx="10"
              fill={C.elevated}
              stroke={C.border}
              strokeWidth="1.5"
            />
            <text
              x="52"
              y="527"
              fontSize="12"
              fontWeight="700"
              fill={C.primary}
            >
              {s + 1} · {steps[s].label}
            </text>
            <text x="52" y="542" fontSize="11" fill={C.secondary}>
              {steps[s].caption}
            </text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={Object.fromEntries(
            steps.map((st2) => [st2.label, st2.caption ?? st2.label]),
          )}
          caption="先预测 B 的向下指针指向谁，再逐步核对两种边的分工；点节点或下拉可看任一节点的 left-child 与 right-sibling。"
          reset={{
            label: "重置实验",
            ariaLabel: "重置左孩子右兄弟编码实验",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        左孩子右兄弟表示把“分叉任意”的树压进“每节点两个指针”的二进制格子里：向下是
        left-child（只认最左），横向是
        right-sibling（兄弟排队），先序遍历与原树一致。
      </figcaption>
    </figure>
  );
}

export function Clrs4Chapter10ElementaryDataStructuresLab() {
  return (
    <div className="not-prose">
      <CircularQueueLab />
      <SentinelListLab />
      <LcRsTreeLab />
    </div>
  );
}
