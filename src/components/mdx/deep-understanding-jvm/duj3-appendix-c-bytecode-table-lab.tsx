"use client";

import { useId, useState } from "react";

const COLORS = {
  background: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
} as const;

const FAMILIES = [
  {
    key: "load-store",
    label: "加载/存储",
    opcode: "iload_1",
    bytes: "1B",
    operand: "局部变量槽 1",
    before: "…",
    after: "…, int",
    effect: "取槽位 1，压入 int",
    rule: "槽位存在且类型为 int",
  },
  {
    key: "stack-op",
    label: "栈运算",
    opcode: "iadd",
    bytes: "60",
    operand: "无显式操作数",
    before: "…, int, int",
    after: "…, int",
    effect: "取两个 int，压回一个 int",
    rule: "栈顶两个元素都必须是 int",
  },
  {
    key: "branch",
    label: "控制转移",
    opcode: "ifeq",
    bytes: "99 00 08",
    operand: "分支偏移 +8",
    before: "…, int",
    after: "目标偏移 / 下一条",
    effect: "取 int，按零值选择路径",
    rule: "目标必须落在合法指令边界",
  },
  {
    key: "invoke",
    label: "方法调用",
    opcode: "invokevirtual",
    bytes: "B6 00 07",
    operand: "常量池索引 7",
    before: "…, receiver, args",
    after: "…, return",
    effect: "取接收者与参数，压回返回值",
    rule: "描述符与调用点栈类型一致",
  },
] as const;

const LENSES = [
  {
    key: "encoding",
    label: "编码",
    detail: "先核对字节、助记符、版本和偏移",
  },
  {
    key: "stack",
    label: "栈效应",
    detail: "逐项核对栈前、消耗顺序和栈后",
  },
  {
    key: "verification",
    label: "验证约束",
    detail: "定位类型、控制流和调用合同的拒绝点",
  },
] as const;

type FamilyKey = (typeof FAMILIES)[number]["key"];
type LensKey = (typeof LENSES)[number]["key"];

export function Duj3AppendixCBytecodeTableLab() {
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const arrowId = `duj3-appendix-c-bytecode-table-arrow-${instanceId}`;
  const [familyKey, setFamilyKey] = useState<FamilyKey>("stack-op");
  const [lensKey, setLensKey] = useState<LensKey>("stack");
  const [missingValue, setMissingValue] = useState(false);

  const family = FAMILIES.find((item) => item.key === familyKey) ?? FAMILIES[1];
  const lens = LENSES.find((item) => item.key === lensKey) ?? LENSES[1];
  const before = missingValue ? "…, int" : family.before;
  const verdict = missingValue
    ? {
        color: COLORS.warning,
        title: "拒绝：栈前状态不满足",
        detail: `当前 ${family.opcode} 需要“${family.rule}”，但输入被删掉了一项。先保留失败状态，再恢复完整栈。`,
      }
    : {
        color: COLORS.success,
        title: "可继续：栈效应已对齐",
        detail: `${family.label}当前聚焦“${lens.label}”：${lens.detail}。结论仍需带版本、偏移和原始输出。`,
      };

  function reset() {
    setFamilyKey("stack-op");
    setLensKey("stack");
    setMissingValue(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="duj3-appendix-c-bytecode-table-lab"
      data-unit-id="duj3-appendix-c-bytecode-table"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              DUJ3 · 附录 C
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              字节码栈效应复核台
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              选择指令族，再切换编码、栈效应和验证约束；故障开关会删除一个输入栈值。
            </p>
          </div>
          <button
            type="button"
            aria-label="重置字节码栈效应复核台"
            onClick={reset}
            className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
          >
            重置
          </button>
        </div>

        <div className="mb-4 flex flex-wrap gap-2" aria-label="选择指令族">
          <span className="self-center text-xs text-secondary">指令族：</span>
          {FAMILIES.map((item) => (
            <button
              key={item.key}
              type="button"
              aria-pressed={familyKey === item.key}
              onClick={() => setFamilyKey(item.key)}
              className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors ${
                familyKey === item.key
                  ? "border-accent text-accent"
                  : "border-border text-secondary hover:border-accent hover:text-primary"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mb-4 grid gap-3 md:grid-cols-[1fr_auto]">
          <div className="flex flex-wrap gap-2" aria-label="选择复核镜头">
            <span className="self-center text-xs text-secondary">镜头：</span>
            {LENSES.map((item) => (
              <button
                key={item.key}
                type="button"
                aria-pressed={lensKey === item.key}
                onClick={() => setLensKey(item.key)}
                className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors ${
                  lensKey === item.key
                    ? "border-accent text-accent"
                    : "border-border text-secondary hover:border-accent hover:text-primary"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            aria-pressed={missingValue}
            onClick={() => setMissingValue((value) => !value)}
            className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors ${
              missingValue
                ? "border-warning text-warning"
                : "border-border text-secondary hover:border-warning hover:text-warning"
            }`}
          >
            {missingValue ? "恢复完整栈" : "注入缺少栈值"}
          </button>
        </div>

        <svg
          aria-label="字节码栈效应复核图：从操作码和操作数连接到栈前栈后，再连接到验证约束；支持指令族、镜头、缺值故障和重置。"
          className="h-auto w-full"
          role="img"
          viewBox="0 0 760 560"
        >
          <defs>
            <marker
              id={arrowId}
              markerHeight="8"
              markerWidth="8"
              orient="auto"
              refX="6"
              refY="4"
              viewBox="0 0 8 8"
            >
              <path d="M0 0L8 4L0 8Z" fill={COLORS.secondary} />
            </marker>
          </defs>

          <rect
            fill={COLORS.background}
            height="520"
            rx="16"
            stroke={COLORS.border}
            width="720"
            x="20"
            y="20"
          />
          <text fill={COLORS.secondary} fontSize="13" x="48" y="54">
            当前：{family.label} · {family.opcode} · 只改变复核焦点
          </text>

          <line
            markerEnd={`url(#${arrowId})`}
            stroke={COLORS.secondary}
            strokeWidth="2"
            x1="204"
            x2="274"
            y1="216"
            y2="216"
          />
          <line
            markerEnd={`url(#${arrowId})`}
            stroke={COLORS.secondary}
            strokeWidth="2"
            x1="486"
            x2="556"
            y1="216"
            y2="216"
          />

          <g>
            <rect
              fill={lensKey === "encoding" ? "var(--bg)" : COLORS.elevated}
              height="276"
              rx="12"
              stroke={lensKey === "encoding" ? COLORS.accent : COLORS.border}
              strokeWidth={lensKey === "encoding" ? "2" : "1"}
              width="224"
              x="40"
              y="88"
            />
            <text
              fill={COLORS.accent}
              fontSize="13"
              fontWeight="600"
              x="60"
              y="122"
            >
              编码与操作数
            </text>
            <text fill={COLORS.primary} fontSize="14" x="60" y="164">
              {family.opcode}
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="60" y="202">
              bytes：{family.bytes}
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="60" y="228">
              operand：{family.operand}
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="60" y="272">
              偏移：0 · 版本：当前记录
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="60" y="314">
              当前焦点：{lensKey === "encoding" ? "是" : "否"}
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="60" y="340">
              证据：javap + JVMS
            </text>
          </g>

          <g>
            <rect
              fill={lensKey === "stack" ? "var(--bg)" : COLORS.elevated}
              height="276"
              rx="12"
              stroke={lensKey === "stack" ? COLORS.accent : COLORS.border}
              strokeWidth={lensKey === "stack" ? "2" : "1"}
              width="224"
              x="268"
              y="88"
            />
            <text
              fill={COLORS.accent}
              fontSize="13"
              fontWeight="600"
              x="288"
              y="122"
            >
              栈前 → 栈后
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="288" y="160">
              before
            </text>
            <text fill={COLORS.primary} fontSize="14" x="288" y="188">
              {before}
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="288" y="226">
              effect：{family.effect}
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="288" y="266">
              after
            </text>
            <text fill={COLORS.primary} fontSize="14" x="288" y="294">
              {family.after}
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="288" y="336">
              当前焦点：{lensKey === "stack" ? "是" : "否"}
            </text>
          </g>

          <g>
            <rect
              fill={lensKey === "verification" ? "var(--bg)" : COLORS.elevated}
              height="276"
              rx="12"
              stroke={
                lensKey === "verification" ? COLORS.accent : COLORS.border
              }
              strokeWidth={lensKey === "verification" ? "2" : "1"}
              width="224"
              x="496"
              y="88"
            />
            <text
              fill={COLORS.accent}
              fontSize="13"
              fontWeight="600"
              x="516"
              y="122"
            >
              验证约束
            </text>
            <text fill={COLORS.primary} fontSize="14" x="516" y="164">
              {family.rule}
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="516" y="212">
              类文件：版本可追溯
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="516" y="238">
              控制流：目标可定位
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="516" y="264">
              调用点：描述符一致
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="516" y="314">
              当前焦点：{lensKey === "verification" ? "是" : "否"}
            </text>
            <text fill={COLORS.secondary} fontSize="12" x="516" y="340">
              失败：保留原始错误
            </text>
          </g>

          <rect
            fill={verdict.color}
            height="82"
            rx="12"
            width="676"
            x="42"
            y="394"
          />
          <text
            fill={COLORS.background}
            fontSize="14"
            fontWeight="700"
            x="64"
            y="426"
          >
            {verdict.title}
          </text>
          <text fill={COLORS.background} fontSize="12" x="64" y="452">
            {verdict.detail}
          </text>
        </svg>

        <p className="mt-3 text-xs leading-5 text-secondary">
          记录合同：类文件版本、方法偏移、完整栈状态、工具版本、原始输出和退出码。
        </p>
      </div>
    </figure>
  );
}
