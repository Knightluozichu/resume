"use client";

import { useCallback, useMemo, useState } from "react";

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

// 概念领域词汇：list / index / zero-based / negative index / boundary / len
//                / slot / append / insert / pop / remove / del / mutation
//                / alias / sorted / sort / reverse / return value / IndexError
//                / side effect —— 贯穿数据结构与注释。

// ---- 模式1：索引访问 ----
const SLOT_ITEMS = ["Python", "Rust", "Go", "C++"];

// ---- 模式2：列表变更（副作用 vs 返回值）----
type MutationOp = {
  id: string;
  label: string;
  before: string[];
  after: string[];
  returned: string; // 返回值（"None" 或元素）
  changed: number[]; // after 中受影响的槽位 index
  desc: string;
};

const MUTATION_OPS: MutationOp[] = [
  {
    id: "append",
    label: 'append("deploy")',
    before: ["design", "test"],
    after: ["design", "test", "deploy"],
    returned: "None",
    changed: [2],
    desc: "在尾部添加一个槽位并引用新元素；append 返回 None，副作用是 list 变长。",
  },
  {
    id: "insert",
    label: 'insert(1, "implement")',
    before: ["design", "test"],
    after: ["design", "implement", "test"],
    returned: "None",
    changed: [1],
    desc: "在索引 1 前插入，后续元素右移；insert 返回 None。",
  },
  {
    id: "pop",
    label: "pop(0)",
    before: ["design", "test", "deploy"],
    after: ["test", "deploy"],
    returned: '"design"',
    changed: [0, 1],
    desc: "删除并返回索引 0 的元素，后续元素左移；pop 返回被移除的对象。",
  },
  {
    id: "remove",
    label: 'remove("test")',
    before: ["implement", "test", "deploy", "test"],
    after: ["implement", "deploy", "test"],
    returned: "None",
    changed: [1, 2],
    desc: "只删除第一个匹配值；remove 返回 None（找不到则 ValueError）。",
  },
  {
    id: "del",
    label: "del tasks[0]",
    before: ["implement", "deploy", "test"],
    after: ["deploy", "test"],
    returned: "(无返回)",
    changed: [0, 1],
    desc: "del 按位置删除并丢弃元素，语句本身无 return value。",
  },
];

// ---- 模式3：sorted vs sort ----
type SortOp = {
  id: "sorted" | "sort";
  label: string;
  before: string[];
  afterOriginal: string[]; // 原 list 操作后
  afterResult: string[]; // 操作产生的新 list（sort 为原 list）
  returned: string;
  desc: string;
};

const SORT_OPS: SortOp[] = [
  {
    id: "sorted",
    label: "sorted(items, key=str.casefold)",
    before: ["banana", "Apple", "cherry"],
    afterOriginal: ["banana", "Apple", "cherry"],
    afterResult: ["Apple", "banana", "cherry"],
    returned: "new list",
    desc: "sorted 创建新 list，原 items 不变，返回新对象；适合大小写不敏感排序。",
  },
  {
    id: "sort",
    label: "items.sort(key=str.casefold)",
    before: ["banana", "Apple", "cherry"],
    afterOriginal: ["Apple", "banana", "cherry"],
    afterResult: ["Apple", "banana", "cherry"],
    returned: "None",
    desc: "sort 原地重排同一 list，返回 None；所有 alias 都会看到变化（destructive）。",
  },
];

const VIEW_W = 860;
const VIEW_H = 384;

// 槽位常量
const SLOT_W = 150;
const SLOT_H = 56;
const SLOT_GAP = 14;

function slotsLeft(count: number): number {
  const total = count * SLOT_W + (count - 1) * SLOT_GAP;
  return (VIEW_W - total) / 2;
}

export function PccIntroducingListsLab() {
  const [mode, setMode] = useState<"index" | "mutation" | "sort">("index");
  const [indexSel, setIndexSel] = useState<number>(0); // 选中的索引（正负）
  const [mutSel, setMutSel] = useState("append");
  const [sortSel, setSortSel] = useState<"sorted" | "sort">("sorted");
  const [faultOn, setFaultOn] = useState(false);

  const reset = useCallback(() => {
    setIndexSel(0);
    setMutSel("append");
    setSortSel("sorted");
    setFaultOn(false);
  }, []);

  const mutation = useMemo(
    () => MUTATION_OPS.find((o) => o.id === mutSel) ?? MUTATION_OPS[0],
    [mutSel],
  );
  const sortOp = useMemo(
    () => SORT_OPS.find((o) => o.id === sortSel) ?? SORT_OPS[0],
    [sortSel],
  );

  // 索引访问信息
  const n = SLOT_ITEMS.length;
  const validIndex =
    indexSel >= 0 && indexSel <= n - 1
      ? indexSel
      : indexSel < 0 && Math.abs(indexSel) <= n
        ? n + indexSel
        : null;
  const indexError = validIndex === null;
  const accessed = !indexError ? SLOT_ITEMS[validIndex] : null;

  let infoTitle = "列表槽位：索引访问 / 变更副作用 / 排序语义";
  let infoBody = "选一个模式与操作，看 list 槽位、返回值与副作用如何联动。";
  if (mode === "index") {
    infoTitle = indexError
      ? `IndexError：索引 ${indexSel} 越界`
      : `访问 items[${indexSel}] → "${accessed}"`;
    infoBody = indexError
      ? `长度 n=${n}，有效正索引 0..${n - 1}，负索引换算 n+i 后仍在范围内。索引 ${indexSel} 越界，说明长度假设失效。`
      : `zero-based：正索引 ${indexSel} 与负索引 ${indexSel - n} 指向同一槽位 ${validIndex}（n+(${indexSel - n})）。`;
  } else if (mode === "mutation") {
    infoTitle = `${mutation.label} → return ${mutation.returned}`;
    infoBody = mutation.desc;
  } else {
    infoTitle = `${sortOp.label} → return ${sortOp.returned}`;
    infoBody = sortOp.desc;
  }

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-medium" style={{ color: C.primary }}>
          ⚡ 列表槽位：索引、变更与排序语义
        </span>
        <button
          onClick={reset}
          className="rounded-control border border-border px-3 py-1 text-xs transition-colors hover:border-accent"
          style={{ color: C.secondary }}
        >
          重置
        </button>
      </div>

      <div className="p-4">
        {/* 模式切换 */}
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {(["index", "mutation", "sort"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`rounded-control border px-3 py-1.5 text-xs font-medium transition-colors ${
                mode === m
                  ? "border-accent bg-accent/10"
                  : "border-border hover:border-accent"
              }`}
              style={{ color: mode === m ? C.accent : C.secondary }}
            >
              {m === "index"
                ? "索引访问"
                : m === "mutation"
                  ? "变更操作"
                  : "排序对比"}
            </button>
          ))}
        </div>

        {/* 主可视化区 */}
        {mode === "index" ? (
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            className="w-full"
            role="img"
            aria-label="列表槽位索引访问可视化，切换正负索引看同一槽位，越界处显示 IndexError"
          >
            <text
              x={VIEW_W / 2}
              y={26}
              textAnchor="middle"
              fontSize={15}
              fontWeight={600}
              fill={C.primary}
            >
              索引访问：positive 与 negative 指向同一槽位
            </text>
            <text
              x={VIEW_W / 2}
              y={46}
              textAnchor="middle"
              fontSize={11}
              fill={C.secondary}
            >
              长 n=4，正索引 0..3，负索引 -4..-1；负索引换算 n+i 后仍须在范围内
            </text>

            {/* 槽位 */}
            {SLOT_ITEMS.map((item, i) => {
              const x = slotsLeft(n) + i * (SLOT_W + SLOT_GAP);
              const y = 120;
              const active = !indexError && i === validIndex;
              const color = active ? C.accent : C.border;
              return (
                <g key={`slot-${i}`} opacity={indexError || active ? 1 : 0.5}>
                  <rect
                    x={x}
                    y={y}
                    width={SLOT_W}
                    height={SLOT_H}
                    rx={6}
                    fill={active ? C.accent : C.elevated}
                    fillOpacity={active ? 0.14 : 1}
                    stroke={color}
                    strokeWidth={active ? 2 : 1.5}
                  />
                  <text
                    x={x + SLOT_W / 2}
                    y={y + SLOT_H / 2 + 4}
                    textAnchor="middle"
                    fontSize={13}
                    fontWeight={700}
                    fill={C.primary}
                  >
                    {item}
                  </text>
                  {/* 正索引（上方） */}
                  <text
                    x={x + SLOT_W / 2}
                    y={y - 10}
                    textAnchor="middle"
                    fontSize={12}
                    fill={indexSel === i ? C.accent : C.secondary}
                    fontWeight={indexSel === i ? 700 : 400}
                  >
                    [{i}]
                  </text>
                  {/* 负索引（下方） */}
                  <text
                    x={x + SLOT_W / 2}
                    y={y + SLOT_H + 18}
                    textAnchor="middle"
                    fontSize={12}
                    fill={indexSel === i - n ? C.accent : C.secondary}
                    fontWeight={indexSel === i - n ? 700 : 400}
                  >
                    [{i - n}]
                  </text>
                </g>
              );
            })}

            {/* 越界槽位（IndexError） */}
            <g opacity={indexError ? 1 : 0.35}>
              <rect
                x={slotsLeft(n) + n * (SLOT_W + SLOT_GAP)}
                y={120}
                width={SLOT_W}
                height={SLOT_H}
                rx={6}
                fill={C.danger}
                fillOpacity={indexError ? 0.12 : 0.03}
                stroke={indexError ? C.danger : C.border}
                strokeWidth={indexError ? 2 : 1}
                strokeDasharray="5 3"
              />
              <text
                x={slotsLeft(n) + n * (SLOT_W + SLOT_GAP) + SLOT_W / 2}
                y={120 + SLOT_H / 2 + 3}
                textAnchor="middle"
                fontSize={12}
                fontWeight={700}
                fill={C.danger}
              >
                {indexError ? `IndexError [${indexSel}]` : "out of range"}
              </text>
              <text
                x={slotsLeft(n) + n * (SLOT_W + SLOT_GAP) + SLOT_W / 2}
                y={120 - 10}
                textAnchor="middle"
                fontSize={12}
                fill={C.danger}
              >
                [4] / [5]
              </text>
            </g>

            {/* 索引选择提示 */}
            <text
              x={VIEW_W / 2}
              y={330}
              textAnchor="middle"
              fontSize={12}
              fill={indexError ? C.danger : C.primary}
              fontWeight={600}
            >
              {indexError
                ? `索引 ${indexSel} 已越界：对应位置为 ${indexSel >= 0 ? indexSel : n + indexSel}（有效 0..3）`
                : `items[${indexSel}] = items[${validIndex - n < 0 ? validIndex - n : validIndex}] 指向槽位 ${validIndex} = "${accessed}"`}
            </text>
            <text
              x={VIEW_W / 2}
              y={352}
              textAnchor="middle"
              fontSize={11}
              fill={C.secondary}
            >
              返回的是槽位里引用的值本身，不是槽位；为空列表时任何索引都
              IndexError
            </text>
          </svg>
        ) : mode === "mutation" ? (
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            className="w-full"
            role="img"
            aria-label="列表变更操作可视化，before 与 after 槽位对比，显示副作用与返回值"
          >
            <text
              x={VIEW_W / 2}
              y={26}
              textAnchor="middle"
              fontSize={15}
              fontWeight={600}
              fill={C.primary}
            >
              变更操作：副作用（list 变化） vs return value
            </text>
            <text
              x={VIEW_W / 2}
              y={46}
              textAnchor="middle"
              fontSize={11}
              fill={C.secondary}
            >
              append/insert/remove/del 返回 None；pop 返回被移除元素 ——
              副作用与返回值要对齐契约
            </text>

            {/* before */}
            <text
              x={60}
              y={76}
              fontSize={12}
              fontWeight={700}
              fill={C.secondary}
            >
              before
            </text>
            {mutation.before.map((item, i) => {
              const x = slotsLeft(3) + i * (SLOT_W + SLOT_GAP);
              return (
                <g key={`b-${i}`}>
                  <rect
                    x={x}
                    y={86}
                    width={SLOT_W}
                    height={SLOT_H}
                    rx={6}
                    fill={C.elevated}
                    stroke={C.border}
                    strokeWidth={1.5}
                  />
                  <text
                    x={x + SLOT_W / 2}
                    y={86 + SLOT_H / 2 + 4}
                    textAnchor="middle"
                    fontSize={12}
                    fontWeight={600}
                    fill={C.primary}
                  >
                    {item}
                  </text>
                </g>
              );
            })}

            {/* 箭头 down */}
            <text
              x={VIEW_W / 2}
              y={170}
              textAnchor="middle"
              fontSize={11}
              fill={C.accent}
            >
              ▼ {mutation.label}
            </text>

            {/* after */}
            <text
              x={60}
              y={196}
              fontSize={12}
              fontWeight={700}
              fill={C.secondary}
            >
              after
            </text>
            {mutation.after.map((item, i) => {
              const x = slotsLeft(3) + i * (SLOT_W + SLOT_GAP);
              const changed = mutation.changed.includes(i);
              return (
                <g key={`a-${i}`}>
                  <rect
                    x={x}
                    y={206}
                    width={SLOT_W}
                    height={SLOT_H}
                    rx={6}
                    fill={changed ? C.accent : C.elevated}
                    fillOpacity={changed ? 0.14 : 1}
                    stroke={changed ? C.accent : C.border}
                    strokeWidth={changed ? 2 : 1.5}
                  />
                  <text
                    x={x + SLOT_W / 2}
                    y={206 + SLOT_H / 2 + 4}
                    textAnchor="middle"
                    fontSize={12}
                    fontWeight={600}
                    fill={C.primary}
                  >
                    {item}
                  </text>
                  <text
                    x={x + SLOT_W / 2}
                    y={206 - 6}
                    textAnchor="middle"
                    fontSize={11}
                    fill={changed ? C.accent : C.secondary}
                  >
                    [{i}]
                  </text>
                </g>
              );
            })}

            {/* 返回值面板 */}
            <g>
              <rect
                x={60}
                y={292}
                width={VIEW_W - 120}
                height={56}
                rx={8}
                fill={C.bg}
                stroke={mutation.returned === "None" ? C.border : C.success}
                strokeWidth={1.5}
              />
              <text
                x={80}
                y={314}
                fontSize={12}
                fontWeight={700}
                fill={mutation.returned === "None" ? C.secondary : C.success}
              >
                return value: {mutation.returned}
              </text>
              <text x={80} y={333} fontSize={11} fill={C.secondary}>
                {mutation.returned === "None"
                  ? "副作用在 list 本体，调用者需读原 list"
                  : "副作用在 list 本体，调用者还可消费返回值"}
              </text>
            </g>
          </svg>
        ) : (
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            className="w-full"
            role="img"
            aria-label="sorted 新列表与 sort 原地改变的并排对比"
          >
            <text
              x={VIEW_W / 2}
              y={26}
              textAnchor="middle"
              fontSize={15}
              fontWeight={600}
              fill={C.primary}
            >
              sorted(新 list) vs sort(原地 destructive)
            </text>
            <text
              x={VIEW_W / 2}
              y={46}
              textAnchor="middle"
              fontSize={11}
              fill={C.secondary}
            >
              sorted 不改变原 items 并返回新对象；sort 重排同一 list 并返回
              None，所有 alias 看到变化
            </text>

            {/* 左：original 输入 */}
            <text
              x={260}
              y={76}
              textAnchor="middle"
              fontSize={12}
              fontWeight={700}
              fill={C.secondary}
            >
              original items
            </text>
            {sortOp.before.map((item, i) => {
              const x = 110 + i * (SLOT_W + 10);
              return (
                <g key={`orig-${i}`}>
                  <rect
                    x={x}
                    y={90}
                    width={SLOT_W}
                    height={46}
                    rx={6}
                    fill={C.elevated}
                    stroke={C.border}
                    strokeWidth={1.5}
                  />
                  <text
                    x={x + SLOT_W / 2}
                    y={90 + 29}
                    textAnchor="middle"
                    fontSize={12}
                    fontWeight={600}
                    fill={C.primary}
                  >
                    {item}
                  </text>
                </g>
              );
            })}

            {/* 右：展示当前选择的操作 */}
            <text
              x={620}
              y={76}
              textAnchor="middle"
              fontSize={12}
              fontWeight={700}
              fill={sortOp.id === "sorted" ? C.accent : C.danger}
            >
              {sortOp.id === "sorted"
                ? "sorted() 返回新 list，原不变"
                : "sort() 原地重排，返回 None"}
            </text>

            {/* original 操作后 */}
            <text x={360} y={160} fontSize={11} fill={C.secondary}>
              original items after:
            </text>
            {sortOp.afterOriginal.map((item, i) => {
              const x = 240 + i * (SLOT_W + 10);
              const changed = sortOp.id === "sort" && sortOp.before[i] !== item;
              return (
                <g key={`oa-${i}`}>
                  <rect
                    x={x}
                    y={172}
                    width={SLOT_W}
                    height={46}
                    rx={6}
                    fill={changed ? C.danger : C.elevated}
                    fillOpacity={changed ? 0.12 : 1}
                    stroke={changed ? C.danger : C.border}
                    strokeWidth={changed ? 2 : 1.5}
                  />
                  <text
                    x={x + SLOT_W / 2}
                    y={172 + 29}
                    textAnchor="middle"
                    fontSize={12}
                    fontWeight={600}
                    fill={C.primary}
                  >
                    {item}
                  </text>
                </g>
              );
            })}

            {/* 结果 / 新 list */}
            <text x={360} y={252} fontSize={11} fill={C.secondary}>
              {sortOp.id === "sorted"
                ? "new sorted list:"
                : "same list identity (destructive):"}
            </text>
            {sortOp.afterResult.map((item, i) => {
              const x = 240 + i * (SLOT_W + 10);
              return (
                <g key={`res-${i}`}>
                  <rect
                    x={x}
                    y={264}
                    width={SLOT_W}
                    height={46}
                    rx={6}
                    fill={sortOp.id === "sorted" ? C.accent : C.danger}
                    fillOpacity={0.12}
                    stroke={sortOp.id === "sorted" ? C.accent : C.danger}
                    strokeWidth={2}
                  />
                  <text
                    x={x + SLOT_W / 2}
                    y={264 + 29}
                    textAnchor="middle"
                    fontSize={12}
                    fontWeight={600}
                    fill={C.primary}
                  >
                    {item}
                  </text>
                </g>
              );
            })}

            {/* 返回值 */}
            <text
              x={VIEW_W / 2}
              y={350}
              textAnchor="middle"
              fontSize={13}
              fontWeight={700}
              fill={sortOp.id === "sorted" ? C.accent : C.danger}
            >
              return value: {sortOp.returned}
            </text>
          </svg>
        )}

        {/* 操作按钮行 */}
        {mode === "index" ? (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-xs" style={{ color: C.secondary }}>
              正索引：
            </span>
            {[0, 1, 2, 3].map((i) => (
              <button
                key={`p${i}`}
                onClick={() => setIndexSel(i)}
                className={`rounded-control border px-3 py-1.5 text-xs font-medium transition-colors ${indexSel === i ? "border-accent bg-accent/10" : "border-border hover:border-accent"}`}
                style={{ color: indexSel === i ? C.accent : C.secondary }}
              >
                [{i}]
              </button>
            ))}
            <span className="ml-2 text-xs" style={{ color: C.secondary }}>
              负索引：
            </span>
            {[-1, -2, -3, -4].map((i) => (
              <button
                key={`n${i}`}
                onClick={() => setIndexSel(i)}
                className={`rounded-control border px-3 py-1.5 text-xs font-medium transition-colors ${indexSel === i ? "border-accent bg-accent/10" : "border-border hover:border-accent"}`}
                style={{ color: indexSel === i ? C.accent : C.secondary }}
              >
                [{i}]
              </button>
            ))}
            <span className="ml-2 text-xs" style={{ color: C.secondary }}>
              越界：
            </span>
            {[4, 5].map((i) => (
              <button
                key={`e${i}`}
                onClick={() => setIndexSel(i)}
                className={`rounded-control border px-3 py-1.5 text-xs font-medium transition-colors ${indexSel === i ? "border-danger bg-danger/10" : "border-border hover:border-accent"}`}
                style={{ color: indexSel === i ? C.danger : C.secondary }}
              >
                [{i}]
              </button>
            ))}
          </div>
        ) : mode === "mutation" ? (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {MUTATION_OPS.map((op) => (
              <button
                key={op.id}
                onClick={() => setMutSel(op.id)}
                className={`rounded-control border px-3 py-1.5 text-xs font-medium transition-colors ${mutSel === op.id ? "border-accent bg-accent/10" : "border-border hover:border-accent"}`}
                style={{ color: mutSel === op.id ? C.accent : C.secondary }}
              >
                {op.label}
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {SORT_OPS.map((op) => (
              <button
                key={op.id}
                onClick={() => setSortSel(op.id)}
                className={`rounded-control border px-3 py-1.5 text-xs font-medium transition-colors ${sortSel === op.id ? (op.id === "sorted" ? "border-accent bg-accent/10" : "border-danger bg-danger/10") : "border-border hover:border-accent"}`}
                style={{
                  color:
                    sortSel === op.id
                      ? op.id === "sorted"
                        ? C.accent
                        : C.danger
                      : C.secondary,
                }}
              >
                {op.id}()
              </button>
            ))}
          </div>
        )}

        {/* 信息面板 */}
        <div
          className="mt-3 rounded-control border border-border p-3"
          style={{ background: C.bg }}
        >
          <div
            className="text-xs font-semibold"
            style={{
              color: indexError && mode === "index" ? C.danger : C.primary,
            }}
          >
            {infoTitle}
          </div>
          <div
            className="mt-1 text-xs leading-relaxed"
            style={{ color: C.secondary }}
          >
            {infoBody}
          </div>
          {faultOn && (
            <div
              className="mt-2 text-xs leading-relaxed"
              style={{ color: C.danger }}
            >
              注入故障：迭代同一 list
              时随时删除元素会跳过候选、改变索引语义；应先在复制上筛选，或用
              comprehension 构建新列表。
            </div>
          )}
        </div>

        {/* 故障注入开关 */}
        <label
          className="mt-3 flex cursor-pointer items-center gap-2 rounded-control border border-border p-3"
          style={{ background: C.bg }}
        >
          <input
            type="checkbox"
            checked={faultOn}
            onChange={(e) => setFaultOn(e.target.checked)}
            className="h-4 w-4 cursor-pointer"
          />
          <span
            className="text-xs"
            style={{ color: faultOn ? C.danger : C.secondary }}
          >
            注入故障：迭代中删除元素导致跳项（在复制上筛选才是最安全做法）
          </span>
        </label>
      </div>
    </div>
  );
}
