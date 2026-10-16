"use client";

import { useRef, useState, type RefObject } from "react";

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

/** 绘制坐标收敛：仅用于 SVG 绘制坐标，不参与任何数学结果。 */
function px(n: number): number {
  return Number.isFinite(n) ? Number(n.toFixed(9)) : 0;
}

type FaultToggleProps = {
  param: string;
  label: string;
  hint: string;
  checked: boolean;
  onChange: (next: boolean) => void;
};

function FaultToggle({
  param,
  label,
  hint,
  checked,
  onChange,
}: FaultToggleProps) {
  return (
    <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-control border border-border bg-bg px-3 py-2">
      <input
        type="checkbox"
        data-param={param}
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-5 w-5 shrink-0 accent-accent"
      />
      <span className="text-sm font-medium text-primary">{label}</span>
      <span className="text-xs text-secondary">{hint}</span>
    </label>
  );
}

function StageStrip({
  steps,
  stageRefs,
  activeIndex,
}: {
  steps: readonly TeachingStep[];
  stageRefs: RefObject<Array<SVGGElement | null>>;
  activeIndex: number;
}) {
  return (
    <g>
      {steps.map((step, index) => {
        const isActive = index === activeIndex;
        return (
          <g
            key={`stage-${step.label}`}
            ref={(node) => {
              stageRefs.current[index] = node;
            }}
            style={{ opacity: 0 }}
          >
            <rect
              x={px(30 + index * 174)}
              y="26"
              width="164"
              height="52"
              rx="10"
              fill={isActive ? C.accent : C.elevated}
              fillOpacity={isActive ? 0.12 : 1}
              stroke={isActive ? C.accent : C.border}
              strokeWidth={isActive ? 2 : 1.5}
            />
            <text
              x={px(30 + index * 174 + 14)}
              y="48"
              fontSize="12"
              fontWeight="700"
              fill={isActive ? C.accent : C.primary}
            >
              {index + 1} · {step.label}
            </text>
            <text
              x={px(30 + index * 174 + 14)}
              y="66"
              fontSize="11"
              fill={C.secondary}
            >
              {step.caption}
            </text>
          </g>
        );
      })}
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Lab 1 · 开放寻址：探测序列与墓碑删除（主实验）                          */
/* ------------------------------------------------------------------ */

type ProbeStrategy = "linear" | "quadratic" | "double";

const OA_M = 11;
const OA_KEYS = [12, 23, 34, 45, 56, 67, 90, 102] as const;
const OA_DELETE_KEY = 12;
const OA_SEARCH_KEY = 56;

function h1(k: number): number {
  return k % OA_M;
}

function h2(k: number): number {
  return 1 + (k % (OA_M - 1));
}

function probeSlot(strategy: ProbeStrategy, k: number, i: number): number {
  if (strategy === "linear") return (h1(k) + i) % OA_M;
  if (strategy === "quadratic") return (h1(k) + i * i) % OA_M;
  return (h1(k) + i * h2(k)) % OA_M;
}

type Placement = {
  slotOf: Map<number, number>;
  probeCount: Map<number, number>;
  conflicts: number;
  failed: number[];
};

/** 按策略把前 n 个键依次插入，记录每个键的落槽与探测次数。 */
function placeOpenAddressing(
  keys: readonly number[],
  strategy: ProbeStrategy,
): Placement {
  const slotOf = new Map<number, number>();
  const probeCount = new Map<number, number>();
  const occupied = new Set<number>();
  let conflicts = 0;
  const failed: number[] = [];
  for (const k of keys) {
    let placed = false;
    for (let i = 0; i < OA_M; i += 1) {
      const s = probeSlot(strategy, k, i);
      if (i > 0) conflicts += 1;
      if (!occupied.has(s)) {
        occupied.add(s);
        slotOf.set(k, s);
        probeCount.set(k, i + 1);
        placed = true;
        break;
      }
    }
    if (!placed) failed.push(k);
  }
  return { slotOf, probeCount, conflicts, failed };
}

/** 查找 key 的探测路径回放：遇空槽即停（对应不成功搜索），命中即停。 */
function probePathFor(
  strategy: ProbeStrategy,
  placement: Placement,
  key: number,
): number[] {
  const occupiedSlots = new Set(placement.slotOf.values());
  const path: number[] = [];
  const seen = new Set<number>();
  for (let i = 0; i < OA_M; i += 1) {
    const s = probeSlot(strategy, key, i);
    if (seen.has(s)) break;
    seen.add(s);
    path.push(s);
    if (!occupiedSlots.has(s)) break;
    if (placement.slotOf.get(key) === s) break;
  }
  return path;
}

function longestOccupiedRun(slotOf: Map<number, number>): number {
  const occupied = new Set(slotOf.values());
  let best = 0;
  for (const s of occupied) {
    if (occupied.has((s + OA_M - 1) % OA_M)) continue;
    let run = 1;
    let cur = s;
    while (occupied.has((cur + 1) % OA_M)) {
      run += 1;
      cur = (cur + 1) % OA_M;
    }
    best = Math.max(best, run);
  }
  return best;
}

const OA_STEPS: readonly TeachingStep[] = [
  { label: "hash", caption: "h₁(k)=k mod 11 定家槽" },
  { label: "insert", caption: "冲突按策略顺延落位" },
  { label: "probe", caption: "查找 56 的探测路径" },
  { label: "delete", caption: "删 12：写 EMPTY 还是墓碑" },
  { label: "verify", caption: "再查 56：是否失联" },
];

const OA_LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  OA_STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

const OA_STRATEGY_LABEL: Readonly<Record<ProbeStrategy, string>> = {
  linear: "线性探测 +1",
  quadratic: "二次探测 +i²",
  double: "双重散列 i·h₂(k)",
};

const OA_COUNT_OPTIONS = [6, 7, 8] as const;

const OA_CELL_W = 70;
const OA_GAP = 8;
const OA_X0 = 25;
const OA_SLOT_Y = 240;
const OA_SLOT_H = 64;

function oaSlotX(s: number): number {
  return OA_X0 + s * (OA_CELL_W + OA_GAP);
}

export function Clrs4Chapter11OpenAddressingLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [strategy, setStrategy] = useState<ProbeStrategy>("linear");
  const [count, setCount] = useState<number>(8);
  const [badDelete, setBadDelete] = useState(false);

  const timeline = useTeachingTimeline({
    steps: OA_STEPS,
    build: (tl) => {
      OA_STEPS.forEach((step, index) => {
        tl.add(
          stageRefs.current[index]!,
          index === 0
            ? { opacity: [1, 1], duration: T * 0.55, ease: "out(3)" }
            : { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" },
          index * T,
        );
        tl.label(step.label, index * T);
      });
    },
  });

  const stepIndex = Math.min(timeline.currentStep, OA_STEPS.length - 1);
  const keys = OA_KEYS.slice(0, count);
  const placement = placeOpenAddressing(keys, strategy);
  const alpha = keys.length / OA_M;
  const expectedMiss = 1 / (1 - alpha);
  const maxRun = longestOccupiedRun(placement.slotOf);
  const deleteSlot = placement.slotOf.get(OA_DELETE_KEY);
  const searchPath = probePathFor(strategy, placement, OA_SEARCH_KEY);
  const searchProbes = searchPath.length;
  const foundSlot = placement.slotOf.get(OA_SEARCH_KEY);
  const searchFound = foundSlot !== undefined;
  const faultStopsEarly =
    badDelete &&
    deleteSlot !== undefined &&
    searchPath.includes(deleteSlot) &&
    foundSlot !== deleteSlot;
  const faultProbeCount = faultStopsEarly
    ? searchPath.indexOf(deleteSlot) + 1
    : searchProbes;
  const conflictKeys = keys.filter(
    (k) => (placement.probeCount.get(k) ?? 1) > 1,
  );
  const maxProbeOfKey = Math.max(
    1,
    ...keys.map((k) => placement.probeCount.get(k) ?? 1),
  );

  function reset() {
    timeline.goToStep(0);
    setStrategy("linear");
    setCount(8);
    setBadDelete(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="clrs4-ch11-open-addressing-probes"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              CLRS 4e · Chapter 11 · Open Addressing
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              探测实验：同一把钥匙，三种走法，删除一次见分晓
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              固定键集与前 11 个槽，切换探测策略观察落位形状与最长连续占用段；
              步进到删除步，注入「删除直接写 EMPTY」故障，看查找 56
              为什么会在一个确实存在的关键词上报告“不存在”，而墓碑如何救回它。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-3">
          <label className="block text-xs text-secondary">
            <span className="mb-1 block font-semibold text-primary">
              探测策略
            </span>
            <select
              data-param="probe-strategy"
              aria-label="选择线性探测、二次探测或双重散列"
              value={strategy}
              onChange={(event) =>
                setStrategy(event.target.value as ProbeStrategy)
              }
              className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
            >
              <option value="linear">线性探测 (h₁(k)+i) mod 11</option>
              <option value="quadratic">二次探测 (h₁(k)+i²) mod 11</option>
              <option value="double">双重散列 (h₁(k)+i·h₂(k)) mod 11</option>
            </select>
          </label>
          <label className="block text-xs text-secondary">
            <span className="mb-1 block font-semibold text-primary">
              键数量 n（α = n/11）
            </span>
            <select
              data-param="key-count"
              aria-label="选择插入键的数量以改变负载因子"
              value={count}
              onChange={(event) => setCount(Number(event.target.value))}
              className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
            >
              {OA_COUNT_OPTIONS.map((n) => (
                <option key={n} value={n}>
                  n = {n} · α = {(n / OA_M).toFixed(2)}
                </option>
              ))}
            </select>
          </label>
          <FaultToggle
            param="bad-delete"
            label="注入故障：删除写 EMPTY"
            hint="不写墓碑直接清空槽位，观察查找失联"
            checked={badDelete}
            onChange={setBadDelete}
          />
        </div>

        <svg
          viewBox="0 0 900 620"
          role="img"
          aria-label="CLRS 4e Chapter 11 专属开放寻址实验。覆盖 open addressing、开放寻址、probe sequence、探测序列、linear probing、线性探测、quadratic probing、二次探测、double hashing、双重散列、primary clustering、一次聚集、tombstone、墓碑，展示 k mod 11 家槽、三种探测策略的落位、查找 56 的探测路径编号、删除 12 时写墓碑与写 EMPTY 的区别、故障下搜索提前停止导致关键词失联、负载因子 alpha 与期望失败探测 1/(1-alpha)、最长连续占用段，并支持播放、暂停、单步、拖进度、切换策略、改变键数量、注入故障和重置。"
          className="mx-auto block h-auto w-full"
        >
          <rect x="0" y="0" width="900" height="620" rx="14" fill={C.bg} />

          <StageStrip
            steps={OA_STEPS}
            stageRefs={stageRefs}
            activeIndex={stepIndex}
          />

          {stepIndex === 0 && (
            <g>
              <text
                x="30"
                y="120"
                fontSize="13"
                fontWeight="700"
                fill={C.primary}
              >
                待插入键（顺序固定）与它们的家槽 h₁(k) = k mod {OA_M}
              </text>
              {keys.map((k, i) => (
                <g key={`key-${k}`}>
                  <rect
                    x={px(30 + i * 105)}
                    y="140"
                    width="92"
                    height="46"
                    rx="9"
                    fill={C.elevated}
                    stroke={C.border}
                    strokeWidth="1.5"
                  />
                  <text
                    x={px(30 + i * 105 + 46)}
                    y="160"
                    textAnchor="middle"
                    fontSize="14"
                    fontWeight="700"
                    fill={C.primary}
                  >
                    {k}
                  </text>
                  <text
                    x={px(30 + i * 105 + 46)}
                    y="178"
                    textAnchor="middle"
                    fontSize="11"
                    fill={C.secondary}
                  >
                    家槽 {h1(k)}
                  </text>
                  <line
                    x1={px(30 + i * 105 + 46)}
                    y1="186"
                    x2={px(oaSlotX(h1(k)) + OA_CELL_W / 2)}
                    y2={px(OA_SLOT_Y - 6)}
                    stroke={C.border}
                    strokeWidth="1.2"
                    strokeDasharray="4 4"
                  />
                </g>
              ))}
              <text x="30" y="348" fontSize="11" fill={C.secondary}>
                先预测：{keys.length} 个键挤进 {OA_M}{" "}
                个槽，平均每条链分几个？换成“占用段”来看呢？
              </text>
            </g>
          )}

          {stepIndex >= 1 && (
            <g>
              <text
                x="30"
                y="120"
                fontSize="12"
                fontWeight="700"
                fill={C.primary}
              >
                落位结果 · 策略 = {OA_STRATEGY_LABEL[strategy]} · n ={" "}
                {keys.length}
                ，α = {alpha.toFixed(2)} · 冲突顺延总次数 {placement.conflicts}
                {placement.failed.length > 0 &&
                  ` · 插入失败键 ${placement.failed.join(", ")}（探测序列未覆盖全表）`}
              </text>
              {Array.from({ length: OA_M }, (_, s) => {
                const occupant = keys.find(
                  (k) => placement.slotOf.get(k) === s,
                );
                const probes = occupant
                  ? (placement.probeCount.get(occupant) ?? 1)
                  : 0;
                const inRun =
                  strategy === "linear" &&
                  maxRun >= 4 &&
                  occupant !== undefined;
                return (
                  <g key={`slot-${s}`}>
                    <rect
                      x={px(oaSlotX(s))}
                      y={OA_SLOT_Y}
                      width={OA_CELL_W}
                      height={OA_SLOT_H}
                      rx="10"
                      fill={
                        stepIndex >= 3 && s === deleteSlot
                          ? badDelete
                            ? C.danger
                            : C.warning
                          : inRun
                            ? C.accent
                            : C.elevated
                      }
                      fillOpacity={
                        stepIndex >= 3 && s === deleteSlot
                          ? 0.16
                          : inRun
                            ? 0.1
                            : 1
                      }
                      stroke={
                        stepIndex >= 3 && s === deleteSlot
                          ? badDelete
                            ? C.danger
                            : C.warning
                          : inRun
                            ? C.accent
                            : C.border
                      }
                      strokeWidth="1.5"
                    />
                    <text
                      x={px(oaSlotX(s) + OA_CELL_W / 2)}
                      y={px(OA_SLOT_Y + 16)}
                      textAnchor="middle"
                      fontSize="11"
                      fill={C.secondary}
                    >
                      槽 {s}
                    </text>
                    {stepIndex >= 3 && s === deleteSlot ? (
                      <text
                        x={px(oaSlotX(s) + OA_CELL_W / 2)}
                        y={px(OA_SLOT_Y + 42)}
                        textAnchor="middle"
                        fontSize="12"
                        fontWeight="700"
                        fill={badDelete ? C.danger : C.warning}
                      >
                        {badDelete ? "EMPTY" : "墓碑"}
                      </text>
                    ) : occupant !== undefined ? (
                      <g>
                        <text
                          x={px(oaSlotX(s) + OA_CELL_W / 2)}
                          y={px(OA_SLOT_Y + 42)}
                          textAnchor="middle"
                          fontSize="15"
                          fontWeight="700"
                          fill={C.primary}
                        >
                          {occupant}
                        </text>
                        {probes > 1 && (
                          <text
                            x={px(oaSlotX(s) + OA_CELL_W - 8)}
                            y={px(OA_SLOT_Y + 18)}
                            textAnchor="end"
                            fontSize="11"
                            fill={C.accent}
                          >
                            {probes} 探
                          </text>
                        )}
                      </g>
                    ) : (
                      <text
                        x={px(oaSlotX(s) + OA_CELL_W / 2)}
                        y={px(OA_SLOT_Y + 42)}
                        textAnchor="middle"
                        fontSize="11"
                        fill={C.secondary}
                      >
                        空
                      </text>
                    )}
                  </g>
                );
              })}

              {stepIndex === 1 && (
                <g>
                  <text x="30" y="352" fontSize="11" fill={C.secondary}>
                    发生过冲突的键：{conflictKeys.join("、") || "无"}
                    ；单键最多探测 {maxProbeOfKey} 次；最长连续占用段 = {maxRun}{" "}
                    个槽。
                  </text>
                  <text x="30" y="376" fontSize="11" fill={C.secondary}>
                    {strategy === "linear"
                      ? "线性探测的一次聚集：占用段越长，落进段内的家槽越多，段就越长——正反馈。"
                      : strategy === "quadratic"
                        ? "二次探测缓解一次聚集，但同家槽的键共享同一条偏移序列（二次聚集）。"
                        : "双重散列的步长随键变化，探测模式最接近独立，聚集最轻。"}
                  </text>
                </g>
              )}

              {stepIndex >= 2 && stepIndex < 3 && (
                <g>
                  {searchPath.map((s, i) => (
                    <g key={`probe-${s}`}>
                      {i > 0 && (
                        <line
                          x1={px(oaSlotX(searchPath[i - 1]!) + OA_CELL_W / 2)}
                          y1={px(OA_SLOT_Y - 4)}
                          x2={px(oaSlotX(s) + OA_CELL_W / 2)}
                          y2={px(OA_SLOT_Y - 4)}
                          stroke={C.accent}
                          strokeWidth="2"
                          markerEnd="url(#oa-arrow)"
                        />
                      )}
                      <circle
                        cx={px(oaSlotX(s) + OA_CELL_W / 2)}
                        cy={px(OA_SLOT_Y - 26)}
                        r="12"
                        fill={C.accent}
                        fillOpacity="0.15"
                        stroke={C.accent}
                        strokeWidth="1.5"
                      />
                      <text
                        x={px(oaSlotX(s) + OA_CELL_W / 2)}
                        y={px(OA_SLOT_Y - 22)}
                        textAnchor="middle"
                        fontSize="11"
                        fontWeight="700"
                        fill={C.accent}
                      >
                        {i + 1}
                      </text>
                    </g>
                  ))}
                  <defs>
                    <marker
                      id="oa-arrow"
                      markerWidth="8"
                      markerHeight="8"
                      refX="6"
                      refY="4"
                      orient="auto"
                    >
                      <path d="M0,0 L8,4 L0,8 Z" fill={C.accent} />
                    </marker>
                  </defs>
                  <text x="30" y="352" fontSize="11" fill={C.secondary}>
                    查找 {OA_SEARCH_KEY}：家槽 {h1(OA_SEARCH_KEY)}
                    ，沿探测序列逐一核对，共 {searchProbes} 次探测
                    {searchFound ? "，命中" : "，未命中"}。
                  </text>
                </g>
              )}

              {stepIndex === 3 && (
                <g>
                  <text
                    x="30"
                    y="352"
                    fontSize="12"
                    fontWeight="700"
                    fill={badDelete ? C.danger : C.warning}
                  >
                    删除 {OA_DELETE_KEY}（原在槽 {deleteSlot}）：
                    {badDelete
                      ? "故障已注入——槽被写成 EMPTY，搜索到它会当成“表到此结束”。"
                      : "正确做法——写墓碑（TOMB）：搜索跳过继续，插入可复用此槽。"}
                  </text>
                  <text x="30" y="376" fontSize="11" fill={C.secondary}>
                    {badDelete
                      ? "先预测：再查 56 时，探测路径会在第几个槽停下？它会报告什么？"
                      : "墓碑不是垃圾：它保留了“键可能放在更后面”的证据。"}
                  </text>
                </g>
              )}

              {stepIndex >= 4 && (
                <g>
                  <rect
                    x="30"
                    y="336"
                    width="840"
                    height="76"
                    rx="12"
                    fill={C.elevated}
                    stroke={faultStopsEarly ? C.danger : C.success}
                    strokeWidth="1.5"
                  />
                  <text
                    x="52"
                    y="366"
                    fontSize="13"
                    fontWeight="700"
                    fill={faultStopsEarly ? C.danger : C.success}
                  >
                    {faultStopsEarly
                      ? `故障复现：查 ${OA_SEARCH_KEY} 在第 ${faultProbeCount} 个探测槽（原 ${OA_DELETE_KEY} 位）遇到 EMPTY，搜索停止——报告“不存在”，但键明明在槽 ${foundSlot}。`
                      : `验证通过：查 ${OA_SEARCH_KEY} 跳过墓碑继续探测 ${searchProbes} 次，在槽 ${foundSlot} 命中。`}
                  </text>
                  <text x="52" y="392" fontSize="11" fill={C.secondary}>
                    {faultStopsEarly
                      ? `原因：56 当初因冲突被放到更后面的槽，搜索把 EMPTY 当作“后面什么都没有”的证明——这是错误的证明。`
                      : "墓碑让搜索知道“这里曾经有过人，后面可能还有人”，期望成本只多一点常数。"}
                  </text>
                </g>
              )}
            </g>
          )}

          <rect
            x="30"
            y="440"
            width="840"
            height="150"
            rx="12"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text x="52" y="470" fontSize="13" fontWeight="700" fill={C.primary}>
            成本读数：负载越满，探测越长
          </text>
          <text x="52" y="496" fontSize="11" fill={C.secondary}>
            本配置 α = {alpha.toFixed(2)}；均匀假设下不成功搜索期望探测 ≈
            1/(1−α) = {expectedMiss.toFixed(1)} 次（{OA_M} 槽满前急升）
          </text>
          <text x="52" y="520" fontSize="11" fill={C.secondary}>
            实际查找 {OA_SEARCH_KEY} 探测 {searchProbes} 次；最长连续占用段{" "}
            {maxRun}；策略 {OA_STRATEGY_LABEL[strategy]}
          </text>
          <text x="52" y="544" fontSize="11" fill={C.secondary}>
            生产阈值参考：开放寻址常在 α 到 0.7–0.9
            前扩容；墓碑过多时重建整表清理。
          </text>
          <text x="52" y="568" fontSize="11" fill={C.secondary}>
            因果链：冲突 → 探测序列变长 → 聚集放大冲突；删除写 EMPTY 破坏探测链
            → 查找失联。
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={OA_LABEL_TEXT}
          caption="先预测换策略后最长连续占用段怎么变，再步进到删除步注入 EMPTY 故障，看查找 56 在哪种删除下失联、哪种下获救。"
          reset={{
            label: "重置实验",
            ariaLabel: "重置开放寻址探测实验",
            onClick: reset,
          }}
        />

        <dl className="mt-4 grid grid-cols-2 gap-2 text-xs text-secondary sm:grid-cols-4">
          <div className="rounded-control border border-border bg-bg px-3 py-2">
            <dt className="text-secondary">查找 56 探测次数（读回）</dt>
            <dd
              className="text-sm font-semibold text-primary"
              data-readout="search-probes"
            >
              {searchProbes}
            </dd>
          </div>
          <div className="rounded-control border border-border bg-bg px-3 py-2">
            <dt className="text-secondary">期望失败探测 1/(1−α)（读回）</dt>
            <dd
              className="text-sm font-semibold text-primary"
              data-readout="expected-probes"
            >
              {expectedMiss.toFixed(1)}
            </dd>
          </div>
          <div className="rounded-control border border-border bg-bg px-3 py-2">
            <dt className="text-secondary">最长连续占用段（读回）</dt>
            <dd
              className="text-sm font-semibold text-primary"
              data-readout="max-run"
            >
              {maxRun}
            </dd>
          </div>
          <div className="rounded-control border border-border bg-bg px-3 py-2">
            <dt className="text-secondary">故障状态（读回）</dt>
            <dd
              className="text-sm font-semibold text-primary"
              data-readout="fault-state"
            >
              {badDelete ? "EMPTY 故障已注入" : "关"}
            </dd>
          </div>
        </dl>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        开放寻址把“冲突怎么办”编码进每条键自己的探测序列：序列的质量决定聚集程度，
        而删除时留下的墓碑还是 EMPTY，决定后来的搜索能不能走完这条序列。
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Lab 2 · 链式散列：负载因子与除法法 m 取 2 的幂故障（辅实验）              */
/* ------------------------------------------------------------------ */

const CHAIN_STEPS: readonly TeachingStep[] = [
  { label: "keys", caption: "键集与 k mod m" },
  { label: "hash", caption: "散列进桶" },
  { label: "chain", caption: "同桶键串成链" },
  { label: "search", caption: "沿链逐节点比较" },
  { label: "balance", caption: "最长链 vs 期望 1+α" },
];

const CHAIN_LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  CHAIN_STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

const SPREAD_KEYS = [5, 14, 23, 32, 41, 50, 59, 68] as const;
const MULTIPLE8_KEYS = [8, 16, 24, 32, 40, 48, 56, 64] as const;

type ChainLayout = {
  m: number;
  buckets: number[][];
  longest: number;
  searchKey: number;
  searchComparisons: number;
  hotBucket: number;
};

function buildChains(keys: readonly number[], m: number): ChainLayout {
  const buckets: number[][] = Array.from({ length: m }, () => []);
  for (const k of keys) buckets[k % m]!.push(k);
  let hotBucket = 0;
  buckets.forEach((chain, i) => {
    if (chain.length > buckets[hotBucket]!.length) hotBucket = i;
  });
  const searchKey = buckets[hotBucket]![buckets[hotBucket]!.length - 1]!;
  return {
    m,
    buckets,
    longest: buckets[hotBucket]!.length,
    searchKey,
    searchComparisons: buckets[hotBucket]!.length,
    hotBucket,
  };
}

export function Clrs4Chapter11ChainingLoadLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [keySet, setKeySet] = useState<"spread" | "multiple8">("spread");
  const [pow2Modulus, setPow2Modulus] = useState(false);

  const timeline = useTeachingTimeline({
    steps: CHAIN_STEPS,
    build: (tl) => {
      CHAIN_STEPS.forEach((step, index) => {
        tl.add(
          stageRefs.current[index]!,
          index === 0
            ? { opacity: [1, 1], duration: T * 0.55, ease: "out(3)" }
            : { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" },
          index * T,
        );
        tl.label(step.label, index * T);
      });
    },
  });

  const stepIndex = Math.min(timeline.currentStep, CHAIN_STEPS.length - 1);
  const keys = keySet === "spread" ? SPREAD_KEYS : MULTIPLE8_KEYS;
  const m = pow2Modulus ? 8 : 7;
  const layout = buildChains(keys, m);
  const n = keys.length;
  const alpha = n / m;
  const expected = 1 + alpha;
  const wasted = layout.buckets.filter((b) => b.length === 0).length;
  const cellW = px((900 - 60 - (m - 1) * 10) / m);
  const x0 = 30;
  const bucketY = 150;
  const nodeH = 42;
  const nodeGap = 14;
  const chainBottom = 222 + layout.longest * (nodeH + nodeGap);
  const panelY = chainBottom + 92;
  const svgH = panelY + 76;

  function reset() {
    timeline.goToStep(0);
    setKeySet("spread");
    setPow2Modulus(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="clrs4-ch11-chaining-load"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              CLRS 4e · Chapter 11 · Chaining &amp; Hash Functions
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              负载实验：α 相同，链长可以天差地别
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              切换键集与模数 m，观察桶链的分布形状：同是 α≈1，分散样本每链 1–2
              个节点，而“全是 8 的倍数”的键在 m=8
              下挤进同一条链。故障开关让除法法取 2
              的幂，亲眼看低位规律如何废掉一半桶。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-3">
          <label className="block text-xs text-secondary">
            <span className="mb-1 block font-semibold text-primary">键集</span>
            <select
              data-param="key-set"
              aria-label="选择分散样本或 8 的倍数键集"
              value={keySet}
              onChange={(event) =>
                setKeySet(event.target.value as "spread" | "multiple8")
              }
              className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
            >
              <option value="spread">
                分散样本 5,14,…,68（ mod {m} 各奔东西）
              </option>
              <option value="multiple8">8 的倍数 8,16,…,64（低位全零）</option>
            </select>
          </label>
          <FaultToggle
            param="pow2-modulus"
            label="注入故障：m 取 2³ = 8"
            hint="除法法取 2 的幂，k mod 8 只看键的低位"
            checked={pow2Modulus}
            onChange={setPow2Modulus}
          />
        </div>

        <svg
          viewBox={`0 0 900 ${svgH}`}
          role="img"
          aria-label="CLRS 4e Chapter 11 专属链式散列负载实验。覆盖 hash tables、散列表、chaining、链式散列、collision、冲突、load factor、负载因子、division method、除法散列法，展示键集 k mod m 落入桶、同桶键串成链表、沿链比较查找目标键、最长链长度、空桶数量、期望失败查找 1+alpha 与实际比较次数的对照、m 取 2 的幂时 8 的倍数键集体撞桶 0 的故障、改回素数 m 等于 7 后的修复效果，并支持播放、暂停、单步、拖进度、切换键集、注入故障和重置。"
          className="mx-auto block h-auto w-full"
        >
          <rect x="0" y="0" width="900" height={svgH} rx="14" fill={C.bg} />

          <StageStrip
            steps={CHAIN_STEPS}
            stageRefs={stageRefs}
            activeIndex={stepIndex}
          />

          {stepIndex === 0 && (
            <g>
              <text
                x="30"
                y="120"
                fontSize="13"
                fontWeight="700"
                fill={C.primary}
              >
                键集（n = {n}）与 k mod {m}：除法散列 h(k) = k mod m
              </text>
              {keys.map((k, i) => (
                <g key={`key-${k}`}>
                  <rect
                    x={px(30 + i * 105)}
                    y="140"
                    width="92"
                    height="46"
                    rx="9"
                    fill={C.elevated}
                    stroke={C.border}
                    strokeWidth="1.5"
                  />
                  <text
                    x={px(30 + i * 105 + 46)}
                    y="160"
                    textAnchor="middle"
                    fontSize="14"
                    fontWeight="700"
                    fill={C.primary}
                  >
                    {k}
                  </text>
                  <text
                    x={px(30 + i * 105 + 46)}
                    y="178"
                    textAnchor="middle"
                    fontSize="11"
                    fill={C.secondary}
                  >
                    mod {m} = {k % m}
                  </text>
                </g>
              ))}
              <text x="30" y="230" fontSize="11" fill={C.secondary}>
                先预测：换成“全是 8 的倍数”的键、m 又取
                8，最长一条链会装下几个键？
              </text>
            </g>
          )}

          {stepIndex >= 1 && (
            <g>
              {layout.buckets.map((chain, b) => {
                const x = px(x0 + b * (cellW + 10));
                const isHot = b === layout.hotBucket;
                return (
                  <g key={`bucket-${b}`}>
                    <rect
                      x={x}
                      y={bucketY}
                      width={cellW}
                      height="46"
                      rx="9"
                      fill={isHot && chain.length > 2 ? C.danger : C.accent}
                      fillOpacity={isHot && chain.length > 2 ? 0.14 : 0.1}
                      stroke={isHot && chain.length > 2 ? C.danger : C.accent}
                      strokeWidth="1.5"
                    />
                    <text
                      x={px(x0 + b * (cellW + 10) + cellW / 2)}
                      y={px(bucketY + 20)}
                      textAnchor="middle"
                      fontSize="12"
                      fontWeight="700"
                      fill={isHot && chain.length > 2 ? C.danger : C.accent}
                    >
                      桶 {b}
                    </text>
                    <text
                      x={px(x0 + b * (cellW + 10) + cellW / 2)}
                      y={px(bucketY + 38)}
                      textAnchor="middle"
                      fontSize="11"
                      fill={C.secondary}
                    >
                      {chain.length} 个键
                    </text>
                  </g>
                );
              })}

              {stepIndex >= 2 &&
                layout.buckets.map((chain, b) => {
                  const x = px(x0 + b * (cellW + 10));
                  return (
                    <g key={`chain-${b}`}>
                      {chain.map((k, j) => {
                        const y = px(222 + j * (nodeH + nodeGap));
                        const isSearchNode =
                          stepIndex >= 3 && k === layout.searchKey;
                        const isHotChain =
                          stepIndex >= 3 && b === layout.hotBucket;
                        return (
                          <g key={`node-${b}-${k}`}>
                            {j > 0 && (
                              <line
                                x1={px(x0 + b * (cellW + 10) + cellW / 2)}
                                y1={px(
                                  222 + (j - 1) * (nodeH + nodeGap) + nodeH,
                                )}
                                x2={px(x0 + b * (cellW + 10) + cellW / 2)}
                                y2={px(y - 4)}
                                stroke={C.border}
                                strokeWidth="2"
                              />
                            )}
                            <rect
                              x={x}
                              y={y}
                              width={cellW}
                              height={nodeH}
                              rx="8"
                              fill={isSearchNode ? C.success : C.elevated}
                              fillOpacity={isSearchNode ? 0.16 : 1}
                              stroke={
                                isSearchNode
                                  ? C.success
                                  : isHotChain && stepIndex >= 3
                                    ? C.danger
                                    : C.border
                              }
                              strokeWidth="1.5"
                            />
                            <text
                              x={px(x0 + b * (cellW + 10) + cellW / 2)}
                              y={px(y + 26)}
                              textAnchor="middle"
                              fontSize="14"
                              fontWeight="700"
                              fill={C.primary}
                            >
                              {k}
                            </text>
                            {stepIndex >= 3 && isHotChain && (
                              <text
                                x={px(x0 + b * (cellW + 10) + cellW / 2)}
                                y={px(y + 40)}
                                textAnchor="middle"
                                fontSize="11"
                                fill={C.danger}
                              >
                                第 {j + 1} 次比较
                              </text>
                            )}
                          </g>
                        );
                      })}
                    </g>
                  );
                })}

              {stepIndex >= 3 && (
                <g>
                  <text
                    x="30"
                    y={px(chainBottom + 26)}
                    fontSize="12"
                    fontWeight="700"
                    fill={C.primary}
                  >
                    查找 {layout.searchKey}：进桶 {layout.hotBucket}，沿链比较{" "}
                    {layout.searchComparisons} 次才命中（链尾）。
                  </text>
                  <text
                    x="30"
                    y={px(chainBottom + 50)}
                    fontSize="11"
                    fill={C.secondary}
                  >
                    链式散列里“查找成本 =
                    链长”：不成功查找要走完整条链，成功查找平均走半条。
                  </text>
                </g>
              )}

              {stepIndex >= 4 && (
                <g>
                  <rect
                    x="30"
                    y={px(panelY)}
                    width="840"
                    height="60"
                    rx="12"
                    fill={C.elevated}
                    stroke={C.border}
                    strokeWidth="1.5"
                  />
                  <text
                    x="52"
                    y={px(panelY + 24)}
                    fontSize="12"
                    fontWeight="700"
                    fill={C.primary}
                  >
                    平衡判读：m = {m}，n = {n}，α = {alpha.toFixed(2)}
                    ，期望失败查找 1+α ≈ {expected.toFixed(2)}{" "}
                    次比较；实际最长链 {layout.longest}。
                  </text>
                  <text
                    x="52"
                    y={px(panelY + 46)}
                    fontSize="11"
                    fill={C.secondary}
                  >
                    {layout.longest > expected + 1
                      ? `分布坏了：${wasted} 个空桶被浪费，故障根因是 m 与键的低位规律共享结构——换素数 m=7 或换散列函数。`
                      : "分布健康：实际链长贴近期望，均匀假设在这个键集上近似成立。"}
                  </text>
                </g>
              )}
            </g>
          )}
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={CHAIN_LABEL_TEXT}
          caption="先预测 m=8 遇上 8 的倍数键的最长链，再步进入桶与成链，最后注入 2 的幂故障并改回素数 m 对比修复效果。"
          reset={{
            label: "重置实验",
            ariaLabel: "重置链式散列负载实验",
            onClick: reset,
          }}
        />

        <dl className="mt-4 grid grid-cols-2 gap-2 text-xs text-secondary sm:grid-cols-4">
          <div className="rounded-control border border-border bg-bg px-3 py-2">
            <dt className="text-secondary">模数 m（读回）</dt>
            <dd
              className="text-sm font-semibold text-primary"
              data-readout="modulus"
            >
              {m}
              {pow2Modulus ? "（2 的幂·故障）" : "（素数）"}
            </dd>
          </div>
          <div className="rounded-control border border-border bg-bg px-3 py-2">
            <dt className="text-secondary">最长链（读回）</dt>
            <dd
              className="text-sm font-semibold text-primary"
              data-readout="longest-chain"
            >
              {layout.longest}
            </dd>
          </div>
          <div className="rounded-control border border-border bg-bg px-3 py-2">
            <dt className="text-secondary">期望 1+α（读回）</dt>
            <dd
              className="text-sm font-semibold text-primary"
              data-readout="expected-chain"
            >
              {expected.toFixed(2)}
            </dd>
          </div>
          <div className="rounded-control border border-border bg-bg px-3 py-2">
            <dt className="text-secondary">查找比较次数（读回）</dt>
            <dd
              className="text-sm font-semibold text-primary"
              data-readout="search-comparisons"
            >
              {layout.searchComparisons}
            </dd>
          </div>
        </dl>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        负载因子 α 只给平均值：1+α
        是“随机键进随机桶”的合同价，键与模数共享结构时，
        实际链长可以把这个价格掀翻几个数量级。
      </figcaption>
    </figure>
  );
}
