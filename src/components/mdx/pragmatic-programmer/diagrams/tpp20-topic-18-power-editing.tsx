"use client";

import { useState } from "react";

import { Tpp20DedicatedFrame } from "./tpp20-dedicated-frame";

const unitId = "tpp20-topic-18-power-editing";
const c = {
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
};

const navigations = {
  text: {
    label: "文本搜索 customer.id",
    hits: [
      ["src/order.ts:18", "customer.id", "真实符号引用", "改", c.success],
      ["src/audit.ts:9", '"customer.id"', "审计事件协议键", "误改", c.danger],
      ["schema.sql:41", "customer_id", "数据库字段", "漏掉", c.warning],
      ["docs/migration.md:7", "customer.id", "旧版本说明", "误改", c.danger],
    ],
    selection: "选中 3 个文本命中；其中只有 1 个属于 TypeScript 符号。",
    verdict: "字面相同不代表语义相同，字面不同也可能属于同一迁移边界。",
    color: c.danger,
  },
  symbol: {
    label: "跳转到定义 + 查找引用",
    hits: [
      ["src/customer.ts:4", "Customer.id", "符号定义", "改", c.success],
      [
        "src/order.ts:18",
        "customer.id",
        "类型解析到 Customer.id",
        "改",
        c.success,
      ],
      ["src/refund.ts:27", "owner.id", "owner: Customer", "改", c.success],
      [
        "src/audit.ts:9",
        '"customer.id"',
        "字符串协议键，不是符号",
        "保留",
        c.accent,
      ],
    ],
    selection: "语言服务选中 3 个符号位置；协议键作为单独迁移任务保留。",
    verdict: "结构导航用定义和类型关系确定变更集合，预览仍需人检查跨语言边界。",
    color: c.success,
  },
} as const;
type NavigationId = keyof typeof navigations;

export function Tpp20Topic18PowerEditingSystemLab() {
  const [id, setId] = useState<NavigationId>("text");
  const navigation = navigations[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 18 专属解剖图 · Customer.id 重命名"
      title="搜索结果中的每个 id，真的属于同一个符号吗？"
      description="切换文本搜索与结构导航。固定 Customer.id → customerId 任务，逐个裁决代码、协议键、SQL 和文档命中。"
      kind="editing-symbol-navigation"
      reset={() => setId("text")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-2">
          {(Object.keys(navigations) as NavigationId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {navigations[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 overflow-hidden rounded-control border border-border bg-bg">
          {navigation.hits.map(([location, token, meaning, action], index) => (
            <div
              key={location}
              className="grid gap-2 border-b border-border px-3 py-3 last:border-b-0 md:grid-cols-[1fr_0.8fr_1.4fr_auto] md:items-center"
            >
              <code className="text-xs text-secondary">{location}</code>
              <code className="text-xs">{token}</code>
              <span className="text-sm">{meaning}</span>
              <strong
                className="text-xs"
                style={{
                  color:
                    index < navigation.hits.length
                      ? navigation.color
                      : undefined,
                }}
              >
                {action}
              </strong>
            </div>
          ))}
        </div>
        <p className="mt-3 rounded-control border border-border bg-bg p-3 text-sm">
          <strong style={{ color: navigation.color }}>
            {navigation.selection}
          </strong>
        </p>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm leading-6"
          style={{ borderColor: navigation.color }}
        >
          {navigation.verdict}
        </p>
      </div>
    </Tpp20DedicatedFrame>
  );
}

const macros = {
  original: {
    label: "原始夹具",
    lines: [
      "const order = makeOrder()",
      "order.customer.id = 'C-7'",
      "expect(save(order)).toBeTruthy()",
    ],
    cursor: "光标停在第 2 行 customer.id",
    operation: "尚未录制",
    result: "3 个测试文件各有一段相同形状，仍需确认结构相同。",
    color: c.warning,
  },
  recorded: {
    label: "录制一次结构变换",
    lines: [
      "const order = makeOrder()",
      "order.customerId = 'C-7'",
      "expect(save(order)).toBeTruthy()",
    ],
    cursor: "选择 customer.id → 改为 customerId → 保存",
    operation: "macro rename-customer-id（1 个撤销组）",
    result: "先在一个夹具上执行并运行对应测试，再决定是否重放。",
    color: c.accent,
  },
  replayed: {
    label: "在另外两处重放",
    lines: [
      "refund.customerId = 'C-8'",
      "shipment.customerId = 'C-9'",
      "3 files changed, 3 insertions, 3 deletions",
    ],
    cursor: "每次重放前确认语法树路径 *.customer.id",
    operation: "2 次重放；每次独立预览",
    result: "宏减少按键，不替代选择判断；第三处若结构不同就必须停止。",
    color: c.success,
  },
  mismatch: {
    label: "故障：形状不同仍重放",
    lines: [
      "audit['customer.id'] = 'C-9'",
      "↓ 错误宏只替换了 .id",
      "audit['customercustomerId'] = 'C-9'",
    ],
    cursor: "字符串下标不是属性访问",
    operation: "宏没有语义检查",
    result: "预览在 audit.ts 显示首差；撤销本次重放，不修改前两处正确变更。",
    color: c.danger,
  },
} as const;
type MacroId = keyof typeof macros;

export function Tpp20Topic18PowerEditingFeedbackLab() {
  const [id, setId] = useState<MacroId>("original");
  const macro = macros[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 18 专属实验 · 宏是可重放按键，不是语义证明"
      title="同一个编辑宏能安全应用到三个测试夹具吗？"
      description="沿录制、重放和结构不匹配故障前进。每次重放先检查当前语法形状，并保持独立撤销边界。"
      kind="editing-macro-replay"
      reset={() => setId("original")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {(Object.keys(macros) as MacroId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {macros[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 overflow-hidden rounded-control border border-border bg-bg">
          <div className="border-b border-border px-3 py-2 text-xs font-semibold text-secondary">
            fixture.ts
          </div>
          <ol className="py-2 font-mono text-xs leading-7">
            {macro.lines.map((line, index) => (
              <li
                key={`${line}-${index}`}
                className="grid grid-cols-[2rem_1fr] px-3"
              >
                <span className="text-secondary">{index + 1}</span>
                <span>{line}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <div className="rounded-control border border-border bg-bg p-3">
            <span className="text-xs font-semibold text-secondary">
              选择条件
            </span>
            <strong
              className="mt-1 block text-sm"
              style={{ color: macro.color }}
            >
              {macro.cursor}
            </strong>
          </div>
          <div className="rounded-control border border-border bg-bg p-3">
            <span className="text-xs font-semibold text-secondary">
              操作记录
            </span>
            <strong
              className="mt-1 block text-sm"
              style={{ color: macro.color }}
            >
              {macro.operation}
            </strong>
          </div>
        </div>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm leading-6"
          style={{ borderColor: macro.color }}
        >
          {macro.result}
        </p>
      </div>
    </Tpp20DedicatedFrame>
  );
}

const transactions = {
  mixed: {
    label: "故障：重命名混入格式化",
    diff: ["3 个符号重命名", "42 行自动格式化", "1 个无关 import 排序"],
    undo: "撤销一次只退掉最后一个 import",
    types: "tsc 通过",
    tests: "协议快照失败 2 个",
    decision: "无法单独撤销语义变更，也难以评审 46 行混合差异。",
    color: c.danger,
  },
  atomic: {
    label: "修复：一个意图一个事务",
    diff: [
      "Customer.id → customerId：3 处",
      "无格式噪声",
      "协议字符串保持不变",
    ],
    undo: "单次撤销恢复全部 3 处",
    types: "tsc 通过",
    tests: "unit 84/84；协议快照 12/12",
    decision: "编辑器事务、Git diff、类型检查和协议测试共同限定变更边界。",
    color: c.success,
  },
  reverted: {
    label: "撤销演练",
    diff: [
      "执行 undo transaction",
      "工作区回到 commit b21e",
      "重新应用同一 rename",
    ],
    undo: "输入哈希与撤销前基线一致",
    types: "撤销前后均可编译",
    tests: "重放后 96/96",
    decision: "真正验证了撤销路径，而不是只看到编辑器工具栏有一个撤销按钮。",
    color: c.accent,
  },
} as const;
type TransactionId = keyof typeof transactions;

export function Tpp20Topic18PowerEditingEvidenceLab() {
  const [id, setId] = useState<TransactionId>("mixed");
  const transaction = transactions[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 18 专属复核 · 编辑事务与撤销边界"
      title="批量修改能否作为一个意图被预览、验证和完整撤销？"
      description="比较混合差异、原子重命名与实际撤销演练。类型检查通过只是一个证据，协议测试和 diff 边界同样必须通过。"
      kind="editing-atomic-undo-proof"
      reset={() => setId("mixed")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(transactions) as TransactionId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {transactions[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-[1.2fr_1fr]">
          <div
            className="rounded-control border bg-bg p-4"
            style={{ borderColor: transaction.color }}
          >
            <strong className="text-xs" style={{ color: transaction.color }}>
              Git diff 内容
            </strong>
            <ul className="mt-2 space-y-2 text-sm">
              {transaction.diff.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="grid gap-2">
            {["undo", "types", "tests"].map((field) => {
              const labels = {
                undo: "撤销",
                types: "类型",
                tests: "测试",
              } as const;
              return (
                <div
                  key={field}
                  className="rounded-control border border-border bg-bg p-3"
                >
                  <span className="text-xs font-semibold text-secondary">
                    {labels[field as keyof typeof labels]}
                  </span>
                  <code className="mt-1 block text-xs leading-5">
                    {
                      transaction[
                        field as keyof Pick<
                          typeof transaction,
                          "undo" | "types" | "tests"
                        >
                      ]
                    }
                  </code>
                </div>
              );
            })}
          </div>
        </div>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm leading-6"
          style={{ borderColor: transaction.color }}
        >
          {transaction.decision}
        </p>
      </div>
    </Tpp20DedicatedFrame>
  );
}
