"use client";

import { useCallback, useState } from "react";

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

// 概念领域词汇：loop suite / indentation / iteration / binding / range
//                / exclusive stop / step / comprehension / alias / slice
//                / shallow copy / nested / tuple / immutability / PEP 8
//                —— 贯穿数据结构与注释。

// ---- 模式1：loop suite 缩进决定执行次数 ----
type IndentCase = {
  id: string;
  label: string;
  lines: { code: string; inSuite: boolean }[];
  execCount: number[]; // 每行执行次数（3 个元素）
  note: string;
  status: string;
};

const INDENT_CASES: IndentCase[] = [
  {
    id: "correct",
    label: "正确缩进",
    lines: [
      { code: "for magician in magicians:", inSuite: false },
      { code: '    print(f"{magician.title()}...")', inSuite: true },
      { code: '    print("I cannot wait...")', inSuite: true },
      { code: 'print("Thank you, everyone...")', inSuite: false },
    ],
    execCount: [3, 3, 3, 1],
    note: "冒号后缩进相同的语句组成 loop suite，随 iteration 执行；print(Thank you) 不缩进，只执行一次。",
    status: "3 次 cycle + 1 次 closing = 预期输出",
  },
  {
    id: "inside",
    label: "总结多缩进",
    lines: [
      { code: "for magician in magicians:", inSuite: false },
      { code: '    print(f"{magician.title()}...")', inSuite: true },
      { code: '    print("I cannot wait...")', inSuite: true },
      { code: '    print("Thank you, everyone...")', inSuite: true },
    ],
    execCount: [3, 3, 3, 3],
    note: "多缩进四空格让 closing 也加入 suite，随每个元素重复一次；缩进=控制流，不只是排版。",
    status: "3 次 thanks —— 每个元素循环一次",
  },
  {
    id: "missing-colon",
    label: "忘记冒号",
    lines: [
      { code: "for magician in magicians", inSuite: false },
      { code: "    print(...)", inSuite: true },
    ],
    execCount: [0, 0],
    note: "缺少冒号，Python 在解析阶段就抛出 SyntaxError；任何一行都不执行。",
    status: "SyntaxError —— 行数 = 0",
  },
];

// ---- 模式2：range 数轴 ----
type RangePreset = {
  id: string;
  label: string;
  range: [number, number, number]; // start, stop, step
  values: number[];
  output: string;
};

const RANGE_PRESETS: RangePreset[] = [
  {
    id: "even",
    label: "range(2, 11, 2)",
    range: [2, 11, 2],
    values: [2, 4, 6, 8, 10],
    output: "[2, 4, 6, 8, 10] —— 偶数到 stop=11（exclusive）",
  },
  {
    id: "squares",
    label: "range(1, 11)",
    range: [1, 11, 1],
    values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    output: "[1..10] —— range 从 start=1，stop=11 不进入",
  },
  {
    id: "reverse",
    label: "range(10, 1, -2)",
    range: [10, 1, -2],
    values: [10, 8, 6, 4, 2],
    output: "[10, 8, 6, 4, 2] —— 负 step 要求 start > stop",
  },
  {
    id: "stop5",
    label: "range(5)",
    range: [0, 5, 1],
    values: [0, 1, 2, 3, 4],
    output: "[0, 1, 2, 3, 4] —— 默认 start=0, step=1",
  },
];

// ---- 模式3：alias vs slice copy vs tuple ----
type IdentityCase = {
  id: string;
  label: string;
  op: string;
  note: string;
  outer: { name: string; slots: number }; // 外层槽位数
  shareInner: boolean; // 内层是否共享
  outerChanged: boolean; // 外层是否改变（append 后）
  innerChanged: boolean; // 内层是否改变（修改 nested 后）
  tupleSlot?: boolean; // 是否限制 slot 增删
};

const IDENTITY_CASES: IdentityCase[] = [
  {
    id: "alias",
    label: "alias = items",
    op: 'alias.append("x")',
    note: "alias 是同一 list 的另一名字；append/insert/del 都直接作用于唯一 object。",
    outer: { name: "alias", slots: 3 },
    shareInner: true,
    outerChanged: true,
    innerChanged: true,
  },
  {
    id: "slice",
    label: "copy = items[:]",
    op: 'copy.append("x")',
    note: "slice 创建新 outer，槽位独立，但 nested object 仍指向同一份；copy[0] 的字段修改会在 items[0] 上可见。",
    outer: { name: "copy", slots: 3 },
    shareInner: true,
    outerChanged: true,
    innerChanged: false, // 占位：copy 自身 outer 改变，items outer 不变
    tupleSlot: false,
  },
  {
    id: "itemscopy",
    label: "items 视角",
    op: "items 检查",
    note: "外层追加只在 copy 上发生，items outer 仍 3 槽；items[0] 的 nested object 与 copy[0] 共享。",
    outer: { name: "items", slots: 2 },
    shareInner: true,
    outerChanged: false,
    innerChanged: true,
    tupleSlot: false,
  },
  {
    id: "tuple",
    label: "tuple slots",
    op: "dimensions[0] = 1920",
    note: "tuple immutability 限制 slot 增删替换，TypeError；但 nested list 仍可被 mutation，immutability 不等于 deep freeze。",
    outer: { name: "tuple", slots: 2 },
    shareInner: true,
    outerChanged: false,
    innerChanged: false,
    tupleSlot: true,
  },
];

const VIEW_W = 860;
const VIEW_H = 384;

export function PccWorkingWithListsLab() {
  const [mode, setMode] = useState<"indent" | "range" | "identity">("indent");
  const [indentSel, setIndentSel] = useState("correct");
  const [rangeSel, setRangeSel] = useState("even");
  const [identSel, setIdentSel] = useState("alias");
  const [faultOn, setFaultOn] = useState(false);

  const reset = useCallback(() => {
    setIndentSel("correct");
    setRangeSel("even");
    setIdentSel("alias");
    setFaultOn(false);
  }, []);

  const indent =
    INDENT_CASES.find((c) => c.id === indentSel) ?? INDENT_CASES[0];
  const rangeP =
    RANGE_PRESETS.find((r) => r.id === rangeSel) ?? RANGE_PRESETS[0];
  const identity =
    IDENTITY_CASES.find((i) => i.id === identSel) ?? IDENTITY_CASES[0];

  let infoTitle = "";
  let infoBody = "";
  if (mode === "indent") {
    infoTitle = `${indent.label}：suite 计数 = [${indent.execCount.join(", ")}]`;
    infoBody = indent.note;
  } else if (mode === "range") {
    infoTitle = `${rangeP.range[0]}..${rangeP.range[1]} step=${rangeP.range[2]}`;
    infoBody = rangeP.output;
  } else {
    infoTitle = `${identity.label} → ${identSel === "copy" ? "outer 独立，inner 共享" : identity.tupleSlot ? "slot immutable" : "同一 object"}`;
    infoBody = identity.note;
  }

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-medium" style={{ color: C.primary }}>
          ⚡ Working with Lists：loop suite / range 数轴 / alias vs slice /
          tuple
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
          {(["indent", "range", "identity"] as const).map((m) => (
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
              {m === "indent"
                ? "loop suite 缩进"
                : m === "range"
                  ? "range 数轴"
                  : "alias / slice / tuple"}
            </button>
          ))}
        </div>

        {mode === "indent" ? (
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            className="w-full"
            role="img"
            aria-label="loop suite 缩进与执行次数可视化：4 行代码，suite 内行随 iteration 高亮"
          >
            <text
              x={VIEW_W / 2}
              y={26}
              textAnchor="middle"
              fontSize={15}
              fontWeight={600}
              fill={C.primary}
            >
              loop suite：缩进定义边界，边界决定执行次数
            </text>
            <text
              x={VIEW_W / 2}
              y={46}
              textAnchor="middle"
              fontSize={11}
              fill={C.secondary}
            >
              3 元素中 suite 内行每 iteration 执行一次；suite 外行只执行一次
            </text>

            {/* 代码行 + 执行计数 */}
            {indent.lines.map((line, i) => {
              const y = 70 + i * 52;
              const count = indent.execCount[i];
              const isInLoop = line.inSuite;
              const lineColor =
                count > 0 ? (count > 1 ? C.accent : C.success) : C.secondary;
              return (
                <g key={`l${i}`}>
                  {/* 行背景 */}
                  <rect
                    x={60}
                    y={y}
                    width={480}
                    height={40}
                    rx={4}
                    fill={isInLoop ? C.accent : C.elevated}
                    fillOpacity={isInLoop ? 0.1 : 1}
                    stroke={isInLoop ? C.accent : C.border}
                    strokeWidth={isInLoop ? 1.5 : 1}
                    strokeDasharray={count === 0 ? "4 3" : "none"}
                  />
                  <text
                    x={72}
                    y={y + 26}
                    fontSize={12}
                    fontFamily="monospace"
                    fill={C.primary}
                  >
                    {line.code.length > 42
                      ? line.code.slice(0, 40) + "…"
                      : line.code}
                  </text>
                  {/* 执行计数 */}
                  <text
                    x={560}
                    y={y + 26}
                    textAnchor="middle"
                    fontSize={14}
                    fontWeight={700}
                    fill={lineColor}
                  >
                    {count === 0 ? "SyntaxError" : `× ${count}`}
                  </text>
                  {/* iteration badge */}
                  {count > 0 && (
                    <text
                      x={640}
                      y={y + 26}
                      textAnchor="middle"
                      fontSize={11}
                      fill={C.secondary}
                    >
                      {count > 1 ? "×3 cycles" : "×1 after loop"}
                    </text>
                  )}
                </g>
              );
            })}

            {/* suite color key */}
            <rect
              x={VIEW_W - 220}
              y={70}
              width={200}
              height={72}
              rx={6}
              fill={C.bg}
              stroke={C.border}
            />
            <text x={VIEW_W - 200} y={90} fontSize={11} fill={C.secondary}>
              缩进相同 = suite；4 空格 vs 0 空格：
            </text>
            <text
              x={VIEW_W - 200}
              y={110}
              fontSize={12}
              fontWeight={700}
              fill={C.accent}
            >
              print(f&quot;...&quot;) 画蓝框
            </text>
            <text
              x={VIEW_W - 200}
              y={130}
              fontSize={12}
              fontWeight={700}
              fill={C.success}
            >
              print(&quot;Thank...&quot;) 画绿框
            </text>

            {/* 底部结论 */}
            <rect
              x={60}
              y={282}
              width={VIEW_W - 120}
              height={56}
              rx={8}
              fill={C.bg}
              stroke={C.border}
            />
            <text
              x={VIEW_W / 2}
              y={314}
              textAnchor="middle"
              fontSize={13}
              fontWeight={600}
              fill={C.primary}
            >
              {indent.status}
            </text>
          </svg>
        ) : mode === "range" ? (
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            className="w-full"
            role="img"
            aria-label="range 数轴：start、exclusive stop、step 生成整序列，stop 虚线表示不进入"
          >
            <text
              x={VIEW_W / 2}
              y={26}
              textAnchor="middle"
              fontSize={15}
              fontWeight={600}
              fill={C.primary}
            >
              range(start, stop, step)：stop 永远不进入结果
            </text>
            <text
              x={VIEW_W / 2}
              y={46}
              textAnchor="middle"
              fontSize={11}
              fill={C.secondary}
            >
              实心点 = 产生值；虚线 = stop 边界；负 step 时 start 需大于 stop
            </text>

            {/* 数轴 0..12 */}
            <line
              x1={80}
              y1={200}
              x2={780}
              y2={200}
              stroke={C.border}
              strokeWidth={2}
            />
            {Array.from({ length: 13 }, (_, i) => {
              const x = 80 + i * 58;
              const inRange = rangeP.values.includes(i);
              const isStop =
                rangeP.range[1] === i && !rangeP.values.includes(i);
              return (
                <g key={`n${i}`}>
                  <line
                    x1={x}
                    y1={195}
                    x2={x}
                    y2={205}
                    stroke={inRange ? C.accent : C.border}
                    strokeWidth={isStop ? 2 : 1}
                  />
                  <text
                    x={x}
                    y={220}
                    textAnchor="middle"
                    fontSize={11}
                    fill={inRange ? C.accent : C.secondary}
                    fontWeight={inRange ? 700 : 400}
                  >
                    {i}
                  </text>
                  {inRange && (
                    <circle
                      cx={x}
                      cy={180}
                      r={9}
                      fill={C.accent}
                      opacity={0.4}
                    />
                  )}
                  {isStop && (
                    <line
                      x1={x}
                      y1={170}
                      x2={x}
                      y2={230}
                      stroke={C.danger}
                      strokeWidth={2}
                      strokeDasharray="4 3"
                    />
                  )}
                </g>
              );
            })}

            {/* 生成的结果列表 */}
            <rect
              x={80}
              y={250}
              width={700}
              height={72}
              rx={8}
              fill={C.bg}
              stroke={C.border}
            />
            <text
              x={96}
              y={276}
              fontSize={13}
              fontWeight={700}
              fill={C.primary}
            >
              输出：
            </text>
            <text
              x={96}
              y={302}
              fontSize={13}
              fontFamily="monospace"
              fill={C.accent}
            >
              {JSON.stringify(rangeP.values)}
            </text>
            <text
              x={VIEW_W / 2}
              y={350}
              textAnchor="middle"
              fontSize={11}
              fill={C.secondary}
            >
              `{rangeP.label}`；exclusive stop={rangeP.range[1]}，step=
              {rangeP.range[2]}
            </text>
          </svg>
        ) : (
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            className="w-full"
            role="img"
            aria-label="alias vs slice copy vs nested tuple 的 identity graph：两个外层槽位与共享内层对象"
          >
            <text
              x={VIEW_W / 2}
              y={26}
              textAnchor="middle"
              fontSize={15}
              fontWeight={600}
              fill={C.primary}
            >
              {identSel === "tuple"
                ? "tuple：slot immutable，nested mutable"
                : `${identSel === "alias" ? "alias" : "slice copy"}：outer vs inner identity`}
            </text>
            <text
              x={VIEW_W / 2}
              y={46}
              textAnchor="middle"
              fontSize={11}
              fill={C.secondary}
            >
              slice 复制槽位不复制内层；tuple 只约束槽位，不冻结 nested object
            </text>

            {/* 左：items 外层 */}
            <text
              x={160}
              y={72}
              textAnchor="middle"
              fontSize={12}
              fontWeight={700}
              fill={C.primary}
            >
              items[:3]
            </text>
            {[0, 1].map((i) => {
              const x = 90 + i * 120;
              const y = 84;
              return (
                <g key={`il${i}`}>
                  <rect
                    x={x}
                    y={y}
                    width={104}
                    height={52}
                    rx={6}
                    fill={C.elevated}
                    stroke={
                      identity.outerChanged && identSel !== "itemscopy"
                        ? C.danger
                        : C.border
                    }
                    strokeWidth={1.5}
                  />
                  <text
                    x={x + 52}
                    y={y + 34}
                    textAnchor="middle"
                    fontSize={12}
                    fontWeight={600}
                    fill={C.primary}
                  >
                    items[{i}]
                  </text>
                </g>
              );
            })}
            <text
              x={180}
              y={158}
              textAnchor="middle"
              fontSize={11}
              fill={
                identity.outerChanged && identSel !== "itemscopy"
                  ? C.danger
                  : C.secondary
              }
            >
              {identSel === "itemscopy"
                ? "items outer 没有变化"
                : identSel === "tuple"
                  ? "tuple slot 不可变"
                  : "items outer 没有变化/alias 即 items outer"}
            </text>

            {/* 右：copy 外层（或 alias 指向同一份） */}
            <text
              x={490}
              y={72}
              textAnchor="middle"
              fontSize={12}
              fontWeight={700}
              fill={identSel === "alias" ? C.danger : C.primary}
            >
              {identSel === "alias"
                ? "alias（同一份 objects）"
                : identSel === "tuple"
                  ? "tuple 槽位"
                  : "copy = items[:]"}
            </text>
            {[0, 1].map((i) => {
              const x = 420 + i * 120;
              const y = 84;
              const isShared = identSel !== "itemscopy" && identSel !== "tuple";
              return (
                <g key={`cl${i}`}>
                  <rect
                    x={x}
                    y={y}
                    width={104}
                    height={52}
                    rx={6}
                    fill={isShared ? C.danger : C.elevated}
                    fillOpacity={isShared ? 0.06 : 1}
                    stroke={isShared ? C.danger : C.border}
                    strokeWidth={isShared ? 2 : 1.5}
                    strokeDasharray={identSel === "tuple" ? "4 3" : "none"}
                  />
                  <text
                    x={x + 52}
                    y={y + 34}
                    textAnchor="middle"
                    fontSize={12}
                    fontWeight={600}
                    fill={C.primary}
                  >
                    {identSel === "tuple" ? `(${i})` : `copy[${i}]`}
                  </text>
                </g>
              );
            })}
            <text
              x={490}
              y={158}
              textAnchor="middle"
              fontSize={11}
              fill={
                identSel === "tuple"
                  ? C.danger
                  : identSel === "alias"
                    ? C.danger
                    : C.secondary
              }
            >
              {identSel === "alias"
                ? "alias.append 修改唯一 list；items 可看到"
                : identSel === "tuple"
                  ? "slot[i] = x → TypeError；nested list 仍可变"
                  : "copy outer 独立，nested item 共享"}
            </text>

            {/* 中间：内层对象 identity */}
            <text
              x={VIEW_W / 2}
              y={190}
              textAnchor="middle"
              fontSize={12}
              fontWeight={700}
              fill={C.secondary}
            >
              nested object identity
            </text>
            <g>
              <circle
                cx={VIEW_W / 2 - 120}
                cy={230}
                r={20}
                fill={C.elevated}
                stroke={C.border}
                strokeWidth={1.5}
              />
              <circle
                cx={VIEW_W / 2 + 120}
                cy={230}
                r={20}
                fill={C.elevated}
                stroke={C.border}
                strokeWidth={1.5}
              />
              <text
                x={VIEW_W / 2 - 120}
                y={265}
                textAnchor="middle"
                fontSize={11}
                fill={C.secondary}
              >
                items[0]
              </text>
              <text
                x={VIEW_W / 2 + 120}
                y={265}
                textAnchor="middle"
                fontSize={11}
                fill={C.secondary}
              >
                items[1]
              </text>

              {/* 交叉连线：inner 是否共享 */}
              {identSel !== "itemscopy" && identSel !== "tuple" && (
                <>
                  <line
                    x1={190}
                    y1={136}
                    x2={VIEW_W / 2 - 120}
                    y2={230}
                    stroke={C.danger}
                    strokeWidth={1.8}
                    strokeDasharray="5 3"
                    opacity={0.8}
                  />
                  <line
                    x1={550}
                    y1={136}
                    x2={VIEW_W / 2 + 120}
                    y2={230}
                    stroke={C.danger}
                    strokeWidth={1.8}
                    strokeDasharray="5 3"
                    opacity={0.8}
                  />
                  <text
                    x={VIEW_W / 2}
                    y={230}
                    textAnchor="middle"
                    fontSize={11}
                    fill={C.danger}
                  >
                    共享 nested — inedx 槽各自独立，object identity 仍相同
                  </text>
                </>
              )}
              {(identSel === "itemscopy" || identSel === "alias") && (
                <>
                  <line
                    x1={190}
                    y1={136}
                    x2={VIEW_W / 2 - 120}
                    y2={230}
                    stroke={C.accent}
                    strokeWidth={1.8}
                  />
                  <line
                    x1={310}
                    y1={136}
                    x2={VIEW_W / 2 - 120}
                    y2={230}
                    stroke={C.accent}
                    strokeWidth={1.8}
                  />
                  <line
                    x1={430}
                    y1={136}
                    x2={VIEW_W / 2 + 120}
                    y2={230}
                    stroke={C.accent}
                    strokeWidth={1.8}
                  />
                  <line
                    x1={550}
                    y1={136}
                    x2={VIEW_W / 2 + 120}
                    y2={230}
                    stroke={C.accent}
                    strokeWidth={1.8}
                  />
                  <text
                    x={VIEW_W / 2}
                    y={230}
                    textAnchor="middle"
                    fontSize={11}
                    fill={C.accent}
                  >
                    {identSel === "alias"
                      ? "同一份槽位、同一份 object"
                      : "alias 看到同一份"}
                  </text>
                </>
              )}
              {identSel === "tuple" && (
                <>
                  <line
                    x1={430}
                    y1={136}
                    x2={VIEW_W / 2 - 120}
                    y2={230}
                    stroke={C.secondary}
                    strokeWidth={1.5}
                  />
                  <line
                    x1={430}
                    y1={136}
                    x2={VIEW_W / 2 + 120}
                    y2={230}
                    stroke={C.secondary}
                    strokeWidth={1.5}
                  />
                  <line
                    x1={540}
                    y1={136}
                    x2={VIEW_W / 2 - 120}
                    y2={230}
                    stroke={C.secondary}
                    strokeWidth={1.5}
                  />
                  <text
                    x={VIEW_W / 2}
                    y={230}
                    textAnchor="middle"
                    fontSize={11}
                    fill={C.secondary}
                  >
                    slot 槽不可改，nested object 仍可变
                  </text>
                </>
              )}
            </g>

            {/* 底部结论 */}
            <rect
              x={60}
              y={284}
              width={VIEW_W - 120}
              height={64}
              rx={8}
              fill={C.bg}
              stroke={C.border}
            />
            <text
              x={VIEW_W / 2}
              y={310}
              textAnchor="middle"
              fontSize={12}
              fontWeight={600}
              fill={C.primary}
            >
              {identity.label}：{identity.op}
            </text>
            <text
              x={VIEW_W / 2}
              y={330}
              textAnchor="middle"
              fontSize={11}
              fill={C.secondary}
            >
              {identity.note}
            </text>
          </svg>
        )}

        {/* 操作按钮行 */}
        {mode === "indent" ? (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {INDENT_CASES.map((c) => (
              <button
                key={c.id}
                onClick={() => setIndentSel(c.id)}
                className={`rounded-control border px-2.5 py-1 text-xs font-medium transition-colors ${indentSel === c.id ? "border-accent bg-accent/10" : "border-border hover:border-accent"}`}
                style={{ color: indentSel === c.id ? C.accent : C.secondary }}
              >
                {c.label}
              </button>
            ))}
          </div>
        ) : mode === "range" ? (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {RANGE_PRESETS.map((r) => (
              <button
                key={r.id}
                onClick={() => setRangeSel(r.id)}
                className={`rounded-control border px-2.5 py-1 text-xs font-medium transition-colors ${rangeSel === r.id ? "border-accent bg-accent/10" : "border-border hover:border-accent"}`}
                style={{ color: rangeSel === r.id ? C.accent : C.secondary }}
              >
                {r.label}
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {IDENTITY_CASES.map((c) => (
              <button
                key={c.id}
                onClick={() => setIdentSel(c.id)}
                className={`rounded-control border px-2.5 py-1 text-xs font-medium transition-colors ${identSel === c.id ? "border-accent bg-accent/10" : "border-border hover:border-accent"}`}
                style={{ color: identSel === c.id ? C.accent : C.secondary }}
              >
                {c.label}
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
            style={{ color: mode === "range" ? C.accent : C.primary }}
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
              style={{ color: identSel === "alias" ? C.danger : C.danger }}
            >
              {identSel === "alias"
                ? "故障：alias = items 后 alias.append 改动了 items——不是 Python 广播，是同一份 memory。"
                : identSel === "tuple"
                  ? "故障：tuple 里嵌套 list 仍可改，immutability 只到槽位，没到整个 object graph。"
                  : "故障：`copy = items[:]` 只复制层位，nested object 仍共享；deep copy 需显式重建。"}
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
            注入故障：shallow copy 深拷贝误解 / alias 共享写 / tuple
            deep-immutability 误解
          </span>
        </label>
      </div>
    </div>
  );
}
