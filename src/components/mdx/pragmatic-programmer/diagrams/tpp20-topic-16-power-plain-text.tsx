"use client";

import { useState, type ReactNode } from "react";

const c = {
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
};

function TextFrame({
  eyebrow,
  title,
  description,
  kind,
  reset,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  kind: string;
  reset: () => void;
  children: ReactNode;
}) {
  return (
    <section
      className="not-prose my-6 overflow-hidden rounded-card border border-border bg-elevated text-primary shadow-sm"
      aria-label={`${title}实验`}
      data-tpp20-unit="tpp20-topic-16-power-plain-text"
      data-visual-kind={kind}
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border bg-bg/70 px-4 py-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-accent">{eyebrow}</p>
          <h3 className="mt-1 text-base font-semibold">{title}</h3>
          <p className="mt-1 max-w-3xl text-xs leading-5 text-secondary">
            {description}
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-control border border-border bg-bg px-3 text-sm font-semibold hover:border-accent"
          aria-label={`重置${title}实验`}
        >
          <span aria-hidden="true">↺</span>
          <span className="ml-2">重置</span>
        </button>
      </header>
      {children}
    </section>
  );
}

const representations = {
  binary: {
    label: "专有二进制",
    file: "shipping.ruleset (v7 app only)",
    content: "52 53 45 54 07 00 C4 01 88 13 00 00 02 9A …",
    operations: [
      ["人读", "只能看到十六进制", c.danger],
      ["搜索", "rg 找不到“上海仓”", c.danger],
      ["比较", "整个块从 C4 变 C5", c.warning],
      ["处理", "必须安装 v7 GUI", c.danger],
    ],
    result:
      "知识存在文件里，却只能由特定版本应用解释；版本库看不到“阈值 500 → 550”的语义。",
    color: c.danger,
  },
  yaml: {
    label: "UTF-8 YAML",
    file: "shipping.yaml (UTF-8, LF)",
    content: "warehouse: 上海仓\nfree_shipping: CNY 500\nhazardous: deny",
    operations: [
      ["人读", "直接读出仓库、金额与例外", c.success],
      ["搜索", "rg '上海仓|CNY 500'", c.success],
      ["比较", "一行显示 500 → 550", c.success],
      ["处理", "编辑器、Shell、CI 都可读", c.success],
    ],
    result:
      "领域知识与格式约定一起可见；任何工具都能读取，但仍需 schema 约束类型和必填字段。",
    color: c.success,
  },
} as const;
type RepresentationId = keyof typeof representations;

export function Tpp20Topic16PowerPlainTextSystemLab() {
  const [id, setId] = useState<RepresentationId>("binary");
  const representation = representations[id];
  return (
    <TextFrame
      eyebrow="Topic 16 专属解剖图 · 同一份运费规则"
      title="知识是只被某个应用拥有，还是能被人和多种工具读取？"
      description="固定上海仓满 CNY 500 免运费、危险品拒绝的规则，只改变表示方式；逐项执行阅读、搜索、差异比较和自动处理。"
      kind="plain-text-rule-representation"
      reset={() => setId("binary")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-2">
          {(Object.keys(representations) as RepresentationId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {representations[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 rounded-control border border-border bg-bg p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <strong className="text-sm">{representation.file}</strong>
            <span className="rounded-full border border-border px-2 py-1 text-xs">
              同一领域规则
            </span>
          </div>
          <pre className="mt-3 overflow-x-auto whitespace-pre-wrap rounded-control border border-border bg-elevated p-3 text-xs leading-6">
            {representation.content}
          </pre>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {representation.operations.map(([action, evidence]) => (
              <div
                key={action}
                className="rounded-control border bg-bg p-3"
                style={{ borderColor: representation.color }}
              >
                <span
                  className="text-xs font-semibold"
                  style={{ color: representation.color }}
                >
                  {action}
                </span>
                <strong className="mt-2 block text-sm leading-5">
                  {evidence}
                </strong>
              </div>
            ))}
          </div>
        </div>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm leading-6"
          style={{ borderColor: representation.color }}
        >
          {representation.result}
        </p>
      </div>
    </TextFrame>
  );
}

const decodings = {
  utf8: {
    label: "UTF-8 → UTF-8",
    declaration: "Content-Type: text/yaml; charset=utf-8",
    bytes: "E4 B8 8A E6 B5 B7 E4 BB 93",
    visible: "上海仓",
    parser: "warehouse = 上海仓",
    lookup: "命中 warehouse/shanghai",
    note: "声明、实际字节和解码器一致，领域身份在传输后保持不变。",
    color: c.success,
  },
  gbk: {
    label: "UTF-8 → 按 GBK 猜测",
    declaration: "缺少 charset；消费者默认 GBK",
    bytes: "E4 B8 8A E6 B5 B7 E4 BB 93",
    visible: "涓婃捣浠�",
    parser: "warehouse = 涓婃捣浠�",
    lookup: "仓库键不存在",
    note: "字节没有损坏，首差发生在解码约定；手工改乱码会丢失原始身份。",
    color: c.danger,
  },
  recovered: {
    label: "恢复：按声明重新解码",
    declaration: "拒绝无 charset 输入；从原始 bytes 重放 UTF-8",
    bytes: "E4 B8 8A E6 B5 B7 E4 BB 93",
    visible: "上海仓",
    parser: "warehouse = 上海仓",
    lookup: "命中 warehouse/shanghai",
    note: "恢复从原始字节重放，不从乱码字符串二次转码；同时新增边界测试。",
    color: c.accent,
  },
} as const;
type DecodingId = keyof typeof decodings;

export function Tpp20Topic16PowerPlainTextFeedbackLab() {
  const [id, setId] = useState<DecodingId>("utf8");
  const decoding = decodings[id];
  return (
    <TextFrame
      eyebrow="Topic 16 专属实验 · 相同字节，不同解码合同"
      title="只改变字符编码解释，“上海仓”在哪一步失去身份？"
      description="三种运行共享完全相同的 UTF-8 字节。观察传输声明、可见字符串、YAML 值和仓库查找，首差应停在解码器。"
      kind="plain-text-encoding-boundary"
      reset={() => setId("utf8")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(decodings) as DecodingId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {decodings[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 overflow-hidden rounded-control border border-border bg-bg">
          {[
            ["传输声明", decoding.declaration],
            ["原始字节", decoding.bytes],
            ["解码结果", decoding.visible],
            ["结构解析", decoding.parser],
            ["领域查找", decoding.lookup],
          ].map(([stage, value], index) => (
            <div
              key={stage}
              className="grid gap-1 border-b border-border px-3 py-3 last:border-b-0 sm:grid-cols-[7rem_1fr]"
            >
              <strong
                className="text-xs"
                style={{ color: index >= 2 ? decoding.color : undefined }}
              >
                {index + 1}. {stage}
              </strong>
              <code className="text-xs leading-5">{value}</code>
            </div>
          ))}
        </div>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm leading-6"
          style={{ borderColor: decoding.color }}
        >
          {decoding.note}
        </p>
      </div>
    </TextFrame>
  );
}

const structures = {
  prose: {
    label: "无结构便签",
    source: "上海仓满五百免运费，危险的不能寄，偏远地区另说。",
    fields: [
      ["warehouse", "可能是上海仓", c.warning],
      ["threshold", "500？元还是分？", c.danger],
      ["hazardous", "“不能寄”没有布尔值", c.danger],
      ["remote", "“另说”没有规则", c.danger],
    ],
    verdict: "它是纯文本，却没有可判定结构；不同读者会生成不同配置。",
    color: c.danger,
  },
  yaml: {
    label: "结构化文本 + schema",
    source:
      "warehouse: shanghai\nthreshold: { currency: CNY, amount: 500 }\nhazardous: deny\nremote: manual-review",
    fields: [
      ["warehouse", "enum: shanghai", c.success],
      ["threshold", "Money(CNY, 500)", c.success],
      ["hazardous", "enum: deny", c.success],
      ["remote", "enum: manual-review", c.success],
    ],
    verdict: "文本仍可读和 diff；schema 负责拒绝缺字段、错类型与未知枚举。",
    color: c.success,
  },
  invalid: {
    label: "故障：结构存在但类型错误",
    source: "warehouse: shanghai\nthreshold: 500\nhazardous: no\nremote: later",
    fields: [
      ["warehouse", "通过", c.success],
      ["threshold", "期望 Money，收到 number", c.danger],
      ["hazardous", "期望 deny/allow，收到 boolean", c.danger],
      ["remote", "未知枚举 later", c.danger],
    ],
    verdict: "纯文本与 YAML 语法通过都不等于领域有效；错误要落到具体字段。",
    color: c.warning,
  },
} as const;
type StructureId = keyof typeof structures;

export function Tpp20Topic16PowerPlainTextEvidenceLab() {
  const [id, setId] = useState<StructureId>("prose");
  const structure = structures[id];
  return (
    <TextFrame
      eyebrow="Topic 16 专属复核 · 可读不等于无结构"
      title="撤掉结构约定后，运费知识还能无歧义地重建吗？"
      description="比较自由便签、schema 约束的 YAML 和类型错误样本。复核者只接收源文本与 schema，不接收作者口头解释。"
      kind="plain-text-structure-schema"
      reset={() => setId("prose")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(structures) as StructureId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {structures[key].label}
            </button>
          ))}
        </div>
        <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-control border border-border bg-bg p-3 text-xs leading-6">
          {structure.source}
        </pre>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {structure.fields.map(([field, value, color]) => (
            <div
              key={field}
              className="grid grid-cols-[7rem_1fr] gap-2 rounded-control border bg-bg p-3"
              style={{ borderColor: color }}
            >
              <code className="text-xs font-semibold" style={{ color }}>
                {field}
              </code>
              <span className="text-sm">{value}</span>
            </div>
          ))}
        </div>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm leading-6"
          style={{ borderColor: structure.color }}
        >
          {structure.verdict}
        </p>
      </div>
    </TextFrame>
  );
}
