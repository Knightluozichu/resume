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

// 概念领域词汇：conditional test / equality / membership / and / or
//                / short circuit / branch / first-match / guard / else
//                / requested / available / banned / decision table

type TestDef = {
  id: string;
  label: string;
  expr: string;
  value: string;
  result: boolean;
  desc: string;
};

const TEST_DEFS: TestDef[] = [
  {
    id: "eq",
    label: "==",
    expr: 'name.lower() == "ada lovelace"',
    value: "Ada Lovelace",
    result: true,
    desc: "字符串比较值相等；先规范化再比，不影响原始拼写",
  },
  {
    id: "ge",
    label: ">=",
    expr: "age >= 18",
    value: "age=36",
    result: true,
    desc: "数值比较，operand 类型一致；链式范围共享中间项",
  },
  {
    id: "in",
    label: "in",
    expr: '"python" in skills',
    value: "skills=[math, python]",
    result: true,
    desc: "collection 成员检查：list 元素、dict key、str substring",
  },
  {
    id: "not",
    label: "not in",
    expr: '"cobol" not in skills',
    value: "skills=[math, python]",
    result: true,
    desc: "取反成员检查：用 not in 比 not (x in y) 清晰",
  },
];

// hit: 高亮的 branch 节点；status: 描述与配色分类
type BranchScenario = {
  id: string;
  score: string;
  hit: "guard" | "excellent" | "pass" | "else";
  status: "guard" | "narrow" | "else";
  output: string;
};

const BRANCH_SCENARIOS: BranchScenario[] = [
  {
    id: "invalid",
    score: "-5",
    hit: "guard",
    status: "guard",
    output: "invalid",
  },
  {
    id: "excellent",
    score: "95",
    hit: "excellent",
    status: "narrow",
    output: "excellent",
  },
  { id: "pass", score: "80", hit: "pass", status: "narrow", output: "pass" },
  { id: "retry", score: "40", hit: "else", status: "else", output: "retry" },
];

type ToppingCase = {
  id: string;
  topping: string;
  available: boolean;
  banned: boolean;
  special: boolean;
  output: string;
  rule: string;
};

const TOPPING_CASES: ToppingCase[] = [
  {
    id: "mush",
    topping: "mushrooms",
    available: true,
    banned: false,
    special: false,
    output: "Adding mushrooms.",
    rule: "membership 命中",
  },
  {
    id: "pine",
    topping: "pineapple",
    available: false,
    banned: false,
    special: false,
    output: "Sorry, unavailable.",
    rule: "membership 未命中",
  },
  {
    id: "gp",
    topping: "green peppers",
    available: true,
    banned: false,
    special: true,
    output: "Skipping green peppers.",
    rule: "special branch 拦截",
  },
  {
    id: "bacon",
    topping: "bacon",
    available: true,
    banned: true,
    special: false,
    output: "Banned by policy.",
    rule: "banned 高于 available",
  },
];

const VIEW_W = 860;
const VIEW_H = 384;

export function PccIfStatementsLab() {
  const [mode, setMode] = useState<"tests" | "branch" | "table">("tests");
  const [testSel, setTestSel] = useState("eq");
  const [branchSel, setBranchSel] = useState("excellent");
  const [tableSel, setTableSel] = useState("mush");
  const [faultOn, setFaultOn] = useState(false);

  const reset = useCallback(() => {
    setTestSel("eq");
    setBranchSel("excellent");
    setTableSel("mush");
    setFaultOn(false);
  }, []);

  const test = TEST_DEFS.find((t) => t.id === testSel) ?? TEST_DEFS[0];
  const scenario =
    BRANCH_SCENARIOS.find((s) => s.id === branchSel) ?? BRANCH_SCENARIOS[0];
  const topping =
    TOPPING_CASES.find((c) => c.id === tableSel) ?? TOPPING_CASES[0];

  const branchActive = (node: string) => scenario.hit === node;

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-medium" style={{ color: C.primary }}>
          ⚡ if Statements：tests / branch 链 / 三列表决策
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
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {(["tests", "branch", "table"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`rounded-control border px-3 py-1.5 text-xs font-medium transition-colors ${mode === m ? "border-accent bg-accent/10" : "border-border hover:border-accent"}`}
              style={{ color: mode === m ? C.accent : C.secondary }}
            >
              {m === "tests"
                ? "conditional tests"
                : m === "branch"
                  ? "branch 链"
                  : "三列表决策"}
            </button>
          ))}
        </div>

        {mode === "tests" ? (
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            className="w-full"
            role="img"
            aria-label="conditional tests 逻辑组合可视化"
          >
            <text
              x={VIEW_W / 2}
              y={26}
              textAnchor="middle"
              fontSize={15}
              fontWeight={600}
              fill={C.primary}
            >
              conditional tests：operand 比较 → boolean → and/or
            </text>
            <text
              x={VIEW_W / 2}
              y={46}
              textAnchor="middle"
              fontSize={11}
              fill={C.secondary}
            >
              and/or 按 short-circuit 组合；每项测试给出输入与 boolean
            </text>

            {TEST_DEFS.map((t, i) => {
              const x = 60 + i * 185;
              const y = 80;
              const active = testSel === t.id;
              return (
                <g key={`t${i}`}>
                  <rect
                    x={x}
                    y={y}
                    width={170}
                    height={86}
                    rx={6}
                    fill={active ? C.accent : C.elevated}
                    fillOpacity={active ? 0.14 : 1}
                    stroke={active ? C.accent : C.border}
                    strokeWidth={active ? 2 : 1.2}
                  />
                  <text
                    x={x + 85}
                    y={y + 22}
                    textAnchor="middle"
                    fontSize={12}
                    fontWeight={700}
                    fill={C.primary}
                  >
                    {t.label}
                  </text>
                  <text
                    x={x + 85}
                    y={y + 42}
                    textAnchor="middle"
                    fontSize={11}
                    fill={C.secondary}
                  >
                    {t.value}
                  </text>
                  <text
                    x={x + 85}
                    y={y + 66}
                    textAnchor="middle"
                    fontSize={12}
                    fontWeight={700}
                    fill={t.result ? C.success : C.danger}
                  >
                    {t.result ? "True" : "False"}
                  </text>
                </g>
              );
            })}

            <line
              x1={230}
              y1={200}
              x2={400}
              y2={240}
              stroke={C.border}
              strokeWidth={2}
            />
            <line
              x1={230}
              y1={200}
              x2={400}
              y2={280}
              stroke={C.border}
              strokeWidth={2}
            />
            <circle cx={230} cy={200} r={6} fill={C.secondary} />
            <text
              x={420}
              y={246}
              textAnchor="middle"
              fontSize={12}
              fill={C.border}
            >
              and →
            </text>
            <text
              x={420}
              y={286}
              textAnchor="middle"
              fontSize={12}
              fill={C.border}
            >
              or →
            </text>

            <rect
              x={140}
              y={240}
              width={580}
              height={80}
              rx={8}
              fill={C.bg}
              stroke={C.border}
            />
            <text
              x={VIEW_W / 2}
              y={272}
              textAnchor="middle"
              fontSize={14}
              fontWeight={700}
              fill={
                faultOn && test.id === "eq"
                  ? C.danger
                  : test.result
                    ? C.success
                    : C.danger
              }
            >
              {faultOn && test.id === "eq"
                ? "True（normalization 覆盖原值）"
                : test.result
                  ? `True — ${test.desc}`
                  : `False — ${test.desc}`}
            </text>
            <text
              x={VIEW_W / 2}
              y={300}
              textAnchor="middle"
              fontSize={11}
              fill={C.secondary}
            >
              {faultOn && test.id === "eq"
                ? "故障注入：先 lower() 存储就丢失了原始拼写；应同时保留 raw 与 normalized"
                : test.expr}
            </text>
          </svg>
        ) : mode === "branch" ? (
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            className="w-full"
            role="img"
            aria-label="first-match branch 链可视化"
          >
            <text
              x={VIEW_W / 2}
              y={26}
              textAnchor="middle"
              fontSize={15}
              fontWeight={600}
              fill={C.primary}
            >
              first-match branch：guard → 条件从高到低 → else
            </text>
            <text
              x={VIEW_W / 2}
              y={46}
              textAnchor="middle"
              fontSize={11}
              fill={C.secondary}
            >
              宽条件会遮蔽窄条件；else 承接合法域剩余，不接收非法输入
            </text>

            <g>
              <rect
                x={60}
                y={80}
                width={180}
                height={80}
                rx={8}
                fill={branchActive("guard") ? C.danger : C.elevated}
                stroke={branchActive("guard") ? C.danger : C.border}
                strokeWidth={branchActive("guard") ? 2 : 1.5}
              />
              <text
                x={150}
                y={120}
                textAnchor="middle"
                fontSize={14}
                fontWeight={700}
                fill={C.primary}
              >
                guard 0 ≤ n ≤ 100
              </text>
              <text
                x={150}
                y={140}
                textAnchor="middle"
                fontSize={11}
                fill={C.secondary}
              >
                非法 input
              </text>
            </g>

            <line
              x1={240}
              y1={120}
              x2={300}
              y2={70}
              stroke={branchActive("excellent") ? C.accent : C.border}
              strokeWidth={branchActive("excellent") ? 2 : 1}
            />
            <line
              x1={240}
              y1={120}
              x2={300}
              y2={190}
              stroke={branchActive("pass") ? C.accent : C.border}
              strokeWidth={branchActive("pass") ? 2 : 1}
            />
            <line
              x1={240}
              y1={120}
              x2={300}
              y2={310}
              stroke={branchActive("else") ? C.accent : C.border}
              strokeWidth={branchActive("else") ? 2 : 1}
            />
            <line
              x1={240}
              y1={120}
              x2={300}
              y2={120}
              stroke={C.border}
              strokeWidth={2}
              opacity={0.3}
            />

            <g>
              <rect
                x={300}
                y={50}
                width={136}
                height={48}
                rx={6}
                fill={branchActive("excellent") ? C.accent : C.elevated}
                fillOpacity={branchActive("excellent") ? 0.14 : 1}
                stroke={branchActive("excellent") ? C.accent : C.border}
                strokeWidth={branchActive("excellent") ? 2 : 1}
              />
              <text
                x={368}
                y={80}
                textAnchor="middle"
                fontSize={12}
                fontWeight={600}
                fill={C.primary}
              >
                if n ≥ 90
              </text>
              {branchActive("excellent") && (
                <text
                  x={368}
                  y={102}
                  textAnchor="middle"
                  fontSize={11}
                  fill={C.accent}
                >
                  → excellent
                </text>
              )}
            </g>
            <g>
              <rect
                x={300}
                y={166}
                width={136}
                height={48}
                rx={6}
                fill={branchActive("pass") ? C.accent : C.elevated}
                fillOpacity={branchActive("pass") ? 0.14 : 1}
                stroke={branchActive("pass") ? C.accent : C.border}
                strokeWidth={branchActive("pass") ? 2 : 1}
              />
              <text
                x={368}
                y={196}
                textAnchor="middle"
                fontSize={12}
                fontWeight={600}
                fill={C.primary}
              >
                elif n ≥ 75
              </text>
              {branchActive("pass") && (
                <text
                  x={368}
                  y={218}
                  textAnchor="middle"
                  fontSize={11}
                  fill={C.accent}
                >
                  → pass
                </text>
              )}
            </g>
            <g>
              <rect
                x={300}
                y={286}
                width={136}
                height={48}
                rx={6}
                fill={branchActive("else") ? C.warning : C.elevated}
                fillOpacity={branchActive("else") ? 0.14 : 1}
                stroke={branchActive("else") ? C.warning : C.border}
                strokeWidth={branchActive("else") ? 2 : 1}
              />
              <text
                x={368}
                y={316}
                textAnchor="middle"
                fontSize={12}
                fontWeight={600}
                fill={C.primary}
              >
                else
              </text>
              {branchActive("else") && (
                <text
                  x={368}
                  y={338}
                  textAnchor="middle"
                  fontSize={11}
                  fill={C.warning}
                >
                  → retry
                </text>
              )}
            </g>

            <g>
              <rect
                x={600}
                y={50}
                width={200}
                height={52}
                rx={8}
                fill={branchActive("guard") ? C.danger : C.elevated}
                fillOpacity={branchActive("guard") ? 0.1 : 1}
                stroke={branchActive("guard") ? C.danger : C.border}
                strokeWidth={branchActive("guard") ? 2 : 1.5}
              />
              <text
                x={700}
                y={82}
                textAnchor="middle"
                fontSize={12}
                fontWeight={700}
                fill={branchActive("guard") ? C.danger : C.primary}
              >
                invalid → raise / guard
              </text>
            </g>

            <rect
              x={60}
              y={290}
              width={740}
              height={60}
              rx={8}
              fill={C.bg}
              stroke={C.border}
            />
            <text
              x={VIEW_W / 2}
              y={322}
              textAnchor="middle"
              fontSize={14}
              fontWeight={700}
              fill={C.primary}
            >
              score={scenario.score} →{" "}
              <tspan
                fill={
                  scenario.status === "guard"
                    ? C.danger
                    : scenario.status === "else"
                      ? C.warning
                      : C.success
                }
              >
                {scenario.output}
              </tspan>
            </text>
            <text
              x={VIEW_W / 2}
              y={342}
              textAnchor="middle"
              fontSize={11}
              fill={C.secondary}
            >
              {scenario.status === "narrow"
                ? "首条True执行，后续elif不再求值（first-match）"
                : scenario.status === "guard"
                  ? "guard 拦截非法，不做narrow匹配"
                  : "else 只在guard合法且低于75时执行"}
            </text>
          </svg>
        ) : (
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            className="w-full"
            role="img"
            aria-label="三列表决策可视化"
          >
            <text
              x={VIEW_W / 2}
              y={26}
              textAnchor="middle"
              fontSize={15}
              fontWeight={600}
              fill={C.primary}
            >
              三列表决策：requested × available × banned × special
            </text>
            <text
              x={VIEW_W / 2}
              y={46}
              textAnchor="middle"
              fontSize={11}
              fill={C.secondary}
            >
              available membership、banned 拦截、special 分流；安全优先级公开
            </text>

            <text
              x={120}
              y={76}
              fontSize={12}
              fontWeight={700}
              fill={C.secondary}
            >
              requested
            </text>
            <text
              x={260}
              y={76}
              fontSize={12}
              fontWeight={700}
              fill={C.secondary}
            >
              available
            </text>
            <text
              x={400}
              y={76}
              fontSize={12}
              fontWeight={700}
              fill={C.secondary}
            >
              banned
            </text>
            <text
              x={540}
              y={76}
              fontSize={12}
              fontWeight={700}
              fill={C.secondary}
            >
              special
            </text>
            <text
              x={700}
              y={76}
              fontSize={12}
              fontWeight={700}
              fill={C.secondary}
            >
              judgment
            </text>

            <text
              x={120}
              y={110}
              fontSize={13}
              fontWeight={600}
              fill={C.primary}
            >
              {topping.topping}
            </text>

            <rect
              x={250}
              y={95}
              width={86}
              height={22}
              rx={4}
              fill={topping.available ? C.success : C.border}
              opacity={topping.available ? 0.2 : 0.3}
              stroke={topping.available ? C.success : C.border}
            />
            <text
              x={293}
              y={110}
              textAnchor="middle"
              fontSize={11}
              fontWeight={700}
              fill={topping.available ? C.success : C.secondary}
            >
              {topping.available ? "true" : "false"}
            </text>

            <rect
              x={390}
              y={95}
              width={86}
              height={22}
              rx={4}
              fill={topping.banned ? C.danger : C.border}
              opacity={topping.banned ? 0.2 : 0.3}
              stroke={topping.banned ? C.danger : C.border}
            />
            <text
              x={433}
              y={110}
              textAnchor="middle"
              fontSize={11}
              fontWeight={700}
              fill={topping.banned ? C.danger : C.secondary}
            >
              {topping.banned ? "true" : "false"}
            </text>

            <rect
              x={530}
              y={95}
              width={86}
              height={22}
              rx={4}
              fill={topping.special ? C.warning : C.border}
              opacity={topping.special ? 0.2 : 0.3}
              stroke={topping.special ? C.warning : C.border}
            />
            <text
              x={573}
              y={110}
              textAnchor="middle"
              fontSize={11}
              fontWeight={700}
              fill={topping.special ? C.warning : C.secondary}
            >
              {topping.special ? "true" : "false"}
            </text>

            <rect
              x={660}
              y={90}
              width={160}
              height={30}
              rx={6}
              fill={C.bg}
              stroke={C.border}
            />
            <text
              x={740}
              y={110}
              textAnchor="middle"
              fontSize={11}
              fontWeight={700}
              fill={topping.rule === "membership 未命中" ? C.danger : C.success}
            >
              {topping.output}
            </text>

            <rect
              x={60}
              y={150}
              width={740}
              height={140}
              rx={8}
              fill={C.bg}
              stroke={C.border}
            />
            <text
              x={VIEW_W / 2}
              y={178}
              fontSize={13}
              fontWeight={700}
              fill={C.primary}
            >
              执行规则：{topping.rule}
            </text>
            <text x={VIEW_W / 2} y={202} fontSize={12} fill={C.secondary}>
              {topping.banned
                ? "banned 拦截优先于 available membership；安全规则先于用户意图"
                : topping.special
                  ? "special branch 在 membership 后拦截输出；单元素选择流向"
                  : topping.output.startsWith("Sorry")
                    ? "在 available set 中找不到 → membership 未命中"
                    : "available membership 命中 → 直接加入"}
            </text>
            <text x={VIEW_W / 2} y={230} fontSize={11} fill={C.secondary}>
              empty list 不等于 无需检查；先 guard，再每元素按顺序自主判断
            </text>
            <text x={VIEW_W / 2} y={254} fontSize={11} fill={C.secondary}>
              输入独立来源：requested、available、banned
              不同职责，防止合并成不明 list
            </text>
            <text x={VIEW_W / 2} y={278} fontSize={11} fill={C.danger}>
              {faultOn
                ? "警告 故障：banned 与 available 被合并，规则来源混淆"
                : ""}
            </text>
          </svg>
        )}

        <div className="mt-3 flex flex-wrap items-center gap-2">
          {mode === "tests"
            ? TEST_DEFS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTestSel(t.id)}
                  className={`rounded-control border px-2.5 py-1 text-xs font-medium transition-colors ${testSel === t.id ? "border-accent bg-accent/10" : "border-border hover:border-accent"}`}
                  style={{ color: testSel === t.id ? C.accent : C.secondary }}
                >
                  {t.label}
                </button>
              ))
            : mode === "branch"
              ? BRANCH_SCENARIOS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setBranchSel(s.id)}
                    className={`rounded-control border px-2.5 py-1 text-xs font-medium transition-colors ${branchSel === s.id ? "border-accent bg-accent/10" : "border-border hover:border-accent"}`}
                    style={{
                      color: branchSel === s.id ? C.accent : C.secondary,
                    }}
                  >
                    {s.score}
                  </button>
                ))
              : TOPPING_CASES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setTableSel(c.id)}
                    className={`rounded-control border px-2.5 py-1 text-xs font-medium transition-colors ${tableSel === c.id ? "border-accent bg-accent/10" : "border-border hover:border-accent"}`}
                    style={{
                      color: tableSel === c.id ? C.accent : C.secondary,
                    }}
                  >
                    {c.topping}
                  </button>
                ))}
        </div>

        <div
          className="mt-3 rounded-control border border-border p-3"
          style={{ background: C.bg }}
        >
          <div className="text-xs font-semibold" style={{ color: C.primary }}>
            {mode === "tests"
              ? `测试 ${test.label}：${test.expr}`
              : mode === "branch"
                ? `score=${scenario.score} → ${scenario.output}`
                : `${topping.topping} → ${topping.output}`}
          </div>
          <div
            className="mt-1 text-xs leading-relaxed"
            style={{ color: C.secondary }}
          >
            {mode === "tests"
              ? test.desc +
                "；and/or 用 short-circuit：左侧决定类型后不再计算右侧；副作用不放逻辑表达式。"
              : mode === "branch"
                ? "guard 拦截非法范围；窄条件从高到低；首条True执行是 first-match branch；else 不接收非法输入。"
                : "三 list 分工：requested 用户意图、available 系统能力、banned 安全策略；special 拦截特定值；来源不可合并。"}
          </div>
          {faultOn && (
            <div
              className="mt-2 text-xs leading-relaxed"
              style={{ color: C.danger }}
            >
              {mode === "tests"
                ? "故障：把 name.lower() 存成单一结果，丢失了原始拼写；应同时保留 raw 和 normalized。"
                : mode === "branch"
                  ? "故障：先宽后窄遮蔽窄分支，让非法输入落到 pass；guard 必须跑到 narrow 判断前。"
                  : "故障：banned 与 available 合并成 list，规则来源混淆。"}
            </div>
          )}
        </div>

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
            注入故障：先宽后窄遮蔽 narrow / 合并三 list 来源混淆 / lower
            覆盖原值
          </span>
        </label>
      </div>
    </div>
  );
}
