"use client";

import { useState } from "react";

import { Tpp20DedicatedFrame } from "./tpp20-dedicated-frame";

const unitId = "tpp20-topic-21-text-manipulation";
const c = {
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
};

const csvParsers = {
  split: {
    label: "按逗号/换行切分",
    command: "line.split(',')",
    records: [
      ["O-17", "上海,浦东", "被拆成 4 列", c.danger],
      ["O-18", "备注第一行↵备注第二行", "被拆成 2 条记录", c.danger],
      ["O-19", "普通地址", "3 列", c.success],
    ],
    count: "输入 3 条业务记录 → 得到 4 行、2 个坏列数",
    verdict: "分隔符出现在带引号字段内部；字面切分破坏了业务记录边界。",
    color: c.danger,
  },
  csv: {
    label: "RFC 4180 状态机解析",
    command: "parseCsv({ columns: true, bom: true })",
    records: [
      ["O-17", "上海,浦东", "address = 单个字段", c.success],
      ["O-18", "备注第一行↵备注第二行", "note = 单个字段", c.success],
      ["O-19", "普通地址", "3 列", c.success],
    ],
    count: "输入 3 条业务记录 → 输出 3 个对象、0 个静默丢失",
    verdict:
      "解析器跟踪引号、转义和记录状态；结构边界由格式规范而不是字符本身决定。",
    color: c.success,
  },
} as const;
type CsvParserId = keyof typeof csvParsers;

export function Tpp20Topic21TextManipulationSystemLab() {
  const [id, setId] = useState<CsvParserId>("split");
  const parser = csvParsers[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 21 专属解剖图 · CSV 记录边界"
      title="逗号和换行出现在引号里时，一条订单在哪里结束？"
      description="固定三条订单：地址含逗号、备注含换行、普通记录。只改变解析器，比较实际生成的字段与记录数。"
      kind="text-processing-csv-parser"
      reset={() => setId("split")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-2">
          {(Object.keys(csvParsers) as CsvParserId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {csvParsers[key].label}
            </button>
          ))}
        </div>
        <code className="mt-4 block rounded-control border border-border bg-bg p-3 text-xs">
          {parser.command}
        </code>
        <div className="mt-3 overflow-hidden rounded-control border border-border bg-bg">
          {parser.records.map(([order, value, result, color]) => (
            <div
              key={order}
              className="grid gap-2 border-b border-border px-3 py-3 last:border-b-0 sm:grid-cols-[4rem_1.2fr_1fr]"
            >
              <code className="text-xs" style={{ color }}>
                {order}
              </code>
              <span className="whitespace-pre-wrap text-sm">
                {value.replace("↵", "↵\n")}
              </span>
              <strong className="text-sm" style={{ color }}>
                {result}
              </strong>
            </div>
          ))}
        </div>
        <p
          className="mt-3 rounded-control border border-border bg-bg p-3 font-mono text-xs"
          style={{ color: parser.color }}
        >
          {parser.count}
        </p>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm leading-6"
          style={{ borderColor: parser.color }}
        >
          {parser.verdict}
        </p>
      </div>
    </Tpp20DedicatedFrame>
  );
}

const redactions = {
  loose: {
    label: "过宽：包含 @ 就替换",
    pattern: "/\\S+@\\S+/g",
    rows: [
      ["联系 alice@example.com 处理", "联系 [EMAIL] 处理", c.success],
      ["文档 https://x/@scope/pkg", "文档 https://[EMAIL]", c.danger],
      ["订单 O-17@retry-2", "订单 [EMAIL]", c.danger],
      ["边界 (bob@example.com).", "边界 [EMAIL]", c.warning],
    ],
    summary: "1 个真实邮箱正确；2 个非邮箱误伤；尾部句点被吞掉。",
    color: c.danger,
  },
  bounded: {
    label: "有边界：邮箱语法 + 捕获标点",
    pattern: "/(?<![\\w/@])([\\w.+-]+@[\\w.-]+\\.[A-Za-z]{2,})(?![\\w/])/g",
    rows: [
      ["联系 alice@example.com 处理", "联系 [EMAIL] 处理", c.success],
      ["文档 https://x/@scope/pkg", "文档 https://x/@scope/pkg", c.success],
      ["订单 O-17@retry-2", "订单 O-17@retry-2", c.success],
      ["边界 (bob@example.com).", "边界 ([EMAIL]).", c.success],
    ],
    summary: "2 个邮箱被替换；URL、订单 id 和标点保持原身份。",
    color: c.success,
  },
  unicode: {
    label: "反例：国际化地址",
    pattern: "同一 ASCII 邮箱模式",
    rows: [
      ["联系 用户@例子.公司", "未替换", c.warning],
      ["联系 alice@example.com", "联系 [EMAIL]", c.success],
      ["策略", "产品当前只允许 ASCII 邮箱", c.accent],
      ["后续", "国际化前先扩输入合同与测试", c.accent],
    ],
    summary: "正则边界必须和产品允许的邮箱集合一致，不能宣称覆盖所有合法地址。",
    color: c.warning,
  },
} as const;
type RedactionId = keyof typeof redactions;

export function Tpp20Topic21TextManipulationFeedbackLab() {
  const [id, setId] = useState<RedactionId>("loose");
  const redaction = redactions[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 21 专属实验 · 邮件脱敏的正则边界"
      title="同一个 @ 字符，什么时候属于邮箱，什么时候属于 URL 或订单 id？"
      description="切换过宽模式、边界模式和国际化反例。输入文本固定，逐行展示替换后的真实输出。"
      kind="text-processing-regex-boundary"
      reset={() => setId("loose")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(redactions) as RedactionId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {redactions[key].label}
            </button>
          ))}
        </div>
        <code className="mt-4 block overflow-x-auto rounded-control border border-border bg-bg p-3 text-xs">
          {redaction.pattern}
        </code>
        <div className="mt-3 overflow-hidden rounded-control border border-border bg-bg">
          {redaction.rows.map(([input, output, color], index) => (
            <div
              key={`${input}-${index}`}
              className="grid gap-2 border-b border-border px-3 py-3 last:border-b-0 md:grid-cols-2"
            >
              <code className="text-xs leading-5 text-secondary">
                in: {input}
              </code>
              <code className="text-xs leading-5" style={{ color }}>
                out: {output}
              </code>
            </div>
          ))}
        </div>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm leading-6"
          style={{ borderColor: redaction.color }}
        >
          {redaction.summary}
        </p>
      </div>
    </Tpp20DedicatedFrame>
  );
}

const batches = {
  silent: {
    label: "静默跳过异常行",
    input: "orders-2026-07.csv · sha256 49a…",
    counts: [
      ["物理行", "10,043", c.accent],
      ["解析记录", "10,000", c.success],
      ["输出记录", "9,997", c.warning],
      ["拒绝记录", "0（未保存）", c.danger],
    ],
    equation: "10,000 ≠ 9,997 + 0",
    verdict: "3 条业务记录静默消失，任务仍 exit 0；无法回放缺失对象。",
    color: c.danger,
  },
  reconciled: {
    label: "守恒核对 + 拒绝文件",
    input: "orders-2026-07.csv · sha256 49a…",
    counts: [
      ["物理行", "10,043", c.accent],
      ["解析记录", "10,000", c.success],
      ["输出记录", "9,997", c.success],
      ["拒绝记录", "3 → rejected.ndjson", c.success],
    ],
    equation: "10,000 = 9,997 + 3",
    verdict:
      "每条拒绝记录保存源坐标、错误码和原始片段；修复后可只重放这 3 条。",
    color: c.success,
  },
  recovered: {
    label: "修复并重放拒绝集",
    input: "rejected.ndjson · 3 records · parser commit 7de",
    counts: [
      ["拒绝输入", "3", c.accent],
      ["修复解析", "3", c.success],
      ["新增输出", "3", c.success],
      ["仍拒绝", "0", c.success],
    ],
    equation: "原输出 9,997 + 重放 3 = 10,000",
    verdict: "输出主键去重后总数闭合；保留原失败文件和修复 commit。",
    color: c.accent,
  },
} as const;
type BatchId = keyof typeof batches;

export function Tpp20Topic21TextManipulationEvidenceLab() {
  const [id, setId] = useState<BatchId>("silent");
  const batch = batches[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 21 专属复核 · 批处理记录守恒"
      title="任务 exit 0 时，输入记录是否都进入输出或拒绝集？"
      description="比较静默跳过、守恒核对和拒绝集重放。物理行数不等于 CSV 记录数，因此核对从结构解析后的记录开始。"
      kind="text-processing-record-reconciliation"
      reset={() => setId("silent")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(batches) as BatchId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {batches[key].label}
            </button>
          ))}
        </div>
        <code className="mt-4 block rounded-control border border-border bg-bg p-3 text-xs">
          {batch.input}
        </code>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {batch.counts.map(([label, value, color]) => (
            <div
              key={label}
              className="rounded-control border bg-bg p-3"
              style={{ borderColor: color }}
            >
              <span className="text-xs font-semibold" style={{ color }}>
                {label}
              </span>
              <strong className="mt-2 block font-mono text-sm">{value}</strong>
            </div>
          ))}
        </div>
        <code
          className="mt-3 block rounded-control border bg-bg p-3 text-sm"
          style={{ borderColor: batch.color, color: batch.color }}
        >
          {batch.equation}
        </code>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm leading-6"
          style={{ borderColor: batch.color }}
        >
          {batch.verdict}
        </p>
      </div>
    </Tpp20DedicatedFrame>
  );
}
