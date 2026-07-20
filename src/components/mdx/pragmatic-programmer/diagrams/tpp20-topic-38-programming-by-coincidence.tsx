"use client";

import { useState } from "react";

import { Tpp20DedicatedFrame } from "./tpp20-dedicated-frame";

const unitId = "tpp20-topic-38-programming-by-coincidence";
const color = {
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
};

const environments = {
  laptop: {
    label: "开发机（偶然成功）",
    input: "orders/*.csv",
    assumptions: [
      "cwd=/app",
      "glob order=01,02",
      "TZ=Asia/Shanghai",
      "locale=zh-CN",
    ],
    trace: [
      "read 01-base.csv",
      "read 02-adjust.csv",
      "2026-07-20 00:10 → day 20",
      "total=¥91",
    ],
    result: "PASS，但四个影响结果的值不在接口中",
    tone: color.warning,
  },
  ci: {
    label: "CI（暴露巧合）",
    input: "orders/*.csv",
    assumptions: [
      "cwd=/workspace",
      "glob order=02,01",
      "TZ=UTC",
      "locale=en-US",
    ],
    trace: [
      "read 02-adjust.csv first",
      "base order missing",
      "timestamp → day 19",
      "total=$0",
    ],
    result: "FAIL；代码未改变，隐藏输入改变了",
    tone: color.danger,
  },
  explicit: {
    label: "显式运行上下文",
    input: "import(files, {zone, locale})",
    assumptions: [
      "files=[01,02]",
      "baseDir=/data/run-91",
      "zone=Asia/Shanghai",
      "locale=zh-CN",
    ],
    trace: [
      "verify file list hash",
      "apply declared order",
      "parse instant with zone",
      "total=Money(CNY,91)",
    ],
    result: "PASS；相同输入上下文产生相同输出哈希",
    tone: color.success,
  },
} as const;
type EnvironmentId = keyof typeof environments;

export function Tpp20Topic38ProgrammingByCoincidenceSystemLab() {
  const [id, setId] = useState<EnvironmentId>("laptop");
  const env = environments[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 38 专属解剖图 · CSV 导入器的隐藏输入"
      title="代码没改，为什么换一台机器结果就变了？"
      description="切换开发机、CI 与显式上下文。图逐项显示工作目录、文件顺序、时区和区域设置如何进入输出。"
      kind="coincidence-import-hidden-environment"
      reset={() => setId("laptop")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(environments) as EnvironmentId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {environments[key].label}
            </button>
          ))}
        </div>
        <code
          className="mt-4 block rounded-control border bg-bg p-3 text-xs"
          style={{ borderColor: env.tone }}
        >
          call: {env.input}
        </code>
        <div className="mt-3 grid gap-3 lg:grid-cols-2">
          <div className="rounded-control border border-border bg-bg p-3">
            <p className="text-xs font-semibold text-muted">实际输入</p>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {env.assumptions.map((item) => (
                <code
                  key={item}
                  className="rounded-control bg-surface p-2 text-xs"
                >
                  {item}
                </code>
              ))}
            </div>
          </div>
          <ol className="grid gap-2 sm:grid-cols-2">
            {env.trace.map((event, index) => (
              <li
                key={event}
                className="rounded-control border bg-bg p-3 text-xs"
                style={{ borderColor: env.tone }}
              >
                <strong>{index + 1}.</strong> {event}
              </li>
            ))}
          </ol>
        </div>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm"
          style={{ borderColor: env.tone }}
        >
          {env.result}
        </p>
      </div>
    </Tpp20DedicatedFrame>
  );
}

const variables = {
  order: {
    label: "只改文件顺序",
    fixed: "files, bytes, TZ, locale, code hash",
    before: "01-base → 02-adjust = ¥91",
    after: "02-adjust → 01-base = ERROR missing base",
    first: "applyAdjustment(order#7) before createOrder",
    repair: "调用方提供有语义的 ordered manifest",
    tone: color.danger,
  },
  zone: {
    label: "只改时区",
    fixed: "instant, files, order, locale, code hash",
    before: "Asia/Shanghai → businessDay 20",
    after: "UTC → businessDay 19",
    first: "toBusinessDay reads process.env.TZ",
    repair: "BusinessClock(zone) 成为导入参数",
    tone: color.warning,
  },
  cwd: {
    label: "只改工作目录",
    fixed: "relative pattern, TZ, locale, code hash",
    before: "/app/orders finds 2 files",
    after: "/workspace/orders finds 0 files",
    first: "glob resolves relative to process.cwd()",
    repair: "传入经过验证的 baseDir；空集合显式拒绝",
    tone: color.accent,
  },
  locale: {
    label: "只改区域设置",
    fixed: "raw '1,20', files, order, TZ, code hash",
    before: "de-DE parses 1.20",
    after: "en-US parses 120",
    first: "Number parser guesses separator",
    repair: "MoneyParser(locale,currency) 明确语法",
    tone: color.success,
  },
} as const;
type VariableId = keyof typeof variables;

export function Tpp20Topic38ProgrammingByCoincidenceFeedbackLab() {
  const [id, setId] = useState<VariableId>("order");
  const sample = variables[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 38 专属实验 · 一次只改变一个隐藏条件"
      title="哪个环境条件真正造成首差？"
      description="选择文件顺序、时区、工作目录或 locale；其余输入与代码哈希冻结，避免同时换机器后凭感觉归因。"
      kind="coincidence-single-variable-causal-test"
      reset={() => setId("order")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-4">
          {(Object.keys(variables) as VariableId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {variables[key].label}
            </button>
          ))}
        </div>
        <code className="mt-4 block rounded-control border border-border bg-bg p-3 text-xs">
          fixed: {sample.fixed}
        </code>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <div className="rounded-control border border-success bg-bg p-3">
            <p className="text-xs text-muted">基线</p>
            <code className="mt-2 block text-xs">{sample.before}</code>
          </div>
          <div
            className="rounded-control border bg-bg p-3"
            style={{ borderColor: sample.tone }}
          >
            <p className="text-xs text-muted">单变量变化</p>
            <code className="mt-2 block text-xs">{sample.after}</code>
          </div>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <p
            className="rounded-control border bg-bg p-3 text-sm"
            style={{ borderColor: sample.tone }}
          >
            <strong>首差：</strong>
            {sample.first}
          </p>
          <p className="rounded-control border border-border bg-bg p-3 text-sm">
            <strong>显式设计：</strong>
            {sample.repair}
          </p>
        </div>
      </div>
    </Tpp20DedicatedFrame>
  );
}

const records = {
  valid: {
    label: "因果闭合",
    claim: "文件顺序决定 adjustment 是否有 base",
    intervention: "仅交换 manifest 两项",
    observation: "首差固定在 event #1",
    counter: "恢复原顺序后输出 hash 恢复",
    regression: "乱序 manifest 必须在读取前拒绝",
    status: "SUPPORTED",
    tone: color.success,
  },
  confounded: {
    label: "多变量混改",
    claim: "CI 的 glob 有问题",
    intervention: "改 cwd + 升级 glob + 切 TZ",
    observation: "最终导入通过",
    counter: "无法知道三个变化中谁必要",
    regression: "没有单变量失败样本",
    status: "INVALID",
    tone: color.danger,
  },
  cargo: {
    label: "复制默认行为",
    claim: "框架默认排序一直可靠",
    intervention: "无；只在当前版本观察",
    observation: "v3.2 恰好返回字典序",
    counter: "API 未承诺顺序，文件系统反例存在",
    regression: "升级时没有契约测试",
    status: "COINCIDENCE",
    tone: color.warning,
  },
} as const;
type RecordId = keyof typeof records;

export function Tpp20Topic38ProgrammingByCoincidenceEvidenceLab() {
  const [id, setId] = useState<RecordId>("valid");
  const rec = records[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 38 专属复核 · 成功必须有因果证据"
      title="它为什么工作：因为设计，还是因为今天的默认值？"
      description="对比闭合实验、多变量混改与未承诺默认行为。只有反事实可重放，才能把偶然成功升级为设计契约。"
      kind="coincidence-causal-evidence-ledger"
      reset={() => setId("valid")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(records) as RecordId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {records[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {[
            ["命题", rec.claim],
            ["干预", rec.intervention],
            ["观测", rec.observation],
            ["反事实", rec.counter],
            ["回归", rec.regression],
          ].map(([label, value], index) => (
            <div
              key={label}
              className="rounded-control border bg-bg p-3"
              style={{ borderColor: index >= 2 ? rec.tone : "var(--border)" }}
            >
              <p className="text-xs font-semibold text-muted">{label}</p>
              <p className="mt-2 text-sm">{value}</p>
            </div>
          ))}
        </div>
        <code
          className="mt-3 block rounded-control border bg-bg p-3 text-sm font-semibold"
          style={{ borderColor: rec.tone, color: rec.tone }}
        >
          evidence status: {rec.status}
        </code>
      </div>
    </Tpp20DedicatedFrame>
  );
}
