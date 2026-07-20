"use client";

import { useState } from "react";

import { Tpp20DedicatedFrame } from "./tpp20-dedicated-frame";

const unitId = "tpp20-topic-32-configuration";
const color = {
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
};

const payloads = {
  valid: {
    label: "合法 v17",
    source: "checkout.yaml@v17",
    body: "retry.max: 3\nfraud.threshold: 0.82\nregion: cn-east",
    stages: [
      ["读取", "bytes sha256:8dc…", color.success],
      ["解析", "3 keys / YAML 1.2", color.success],
      ["模式校验", "ConfigV3 ✓", color.success],
      ["构造快照", "immutable snapshot #17", color.success],
      ["激活", "current ← #17", color.success],
    ],
    result: "服务只看到已校验的 ConfigSnapshot#17",
    tone: color.success,
  },
  missing: {
    label: "缺必填项",
    source: "checkout.yaml@v18",
    body: "retry.max: 3\nregion: cn-east\n# fraud.threshold missing",
    stages: [
      ["读取", "bytes sha256:41b…", color.success],
      ["解析", "2 keys / YAML 1.2", color.success],
      ["模式校验", "required fraud.threshold", color.danger],
      ["构造快照", "not called", color.warning],
      ["激活", "not called；current=#17", color.warning],
    ],
    result: "REJECT v18；运行态没有半更新",
    tone: color.danger,
  },
  illegal: {
    label: "非法阈值",
    source: "checkout.yaml@v19",
    body: "retry.max: 3\nfraud.threshold: 1.4\nregion: cn-east",
    stages: [
      ["读取", "bytes sha256:c20…", color.success],
      ["解析", "3 keys / YAML 1.2", color.success],
      ["模式校验", "threshold must be 0…1", color.danger],
      ["构造快照", "not called", color.warning],
      ["激活", "not called；current=#17", color.warning],
    ],
    result: "REJECT v19；错误带字段路径与原值",
    tone: color.danger,
  },
  stale: {
    label: "过期版本",
    source: "checkout.yaml@v16",
    body: "retry.max: 2\nfraud.threshold: 0.78\nregion: cn-east",
    stages: [
      ["读取", "bytes sha256:9ea…", color.success],
      ["解析", "3 keys / YAML 1.2", color.success],
      ["模式校验", "ConfigV3 ✓", color.success],
      ["版本门", "16 < active 17", color.danger],
      ["激活", "not called；current=#17", color.warning],
    ],
    result: "REJECT stale write；防止乱序回滚策略",
    tone: color.warning,
  },
} as const;
type PayloadId = keyof typeof payloads;

export function Tpp20Topic32ConfigurationSystemLab() {
  const [id, setId] = useState<PayloadId>("valid");
  const payload = payloads[id];

  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 32 专属解剖图 · 配置进入运行态的五道边界"
      title="一份 YAML 何时才有资格成为当前策略？"
      description="切换合法、缺字段、非法阈值和过期版本。每一步显示真实产物；失败后的阶段必须是 not called，活动快照保持不变。"
      kind="configuration-validated-snapshot-pipeline"
      reset={() => setId("valid")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-4">
          {(Object.keys(payloads) as PayloadId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {payloads[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-3 lg:grid-cols-[0.75fr_1.25fr]">
          <div
            className="rounded-control border bg-bg p-3"
            style={{ borderColor: payload.tone }}
          >
            <code
              className="text-xs font-semibold"
              style={{ color: payload.tone }}
            >
              {payload.source}
            </code>
            <pre className="mt-2 whitespace-pre-wrap text-xs leading-5">
              {payload.body}
            </pre>
          </div>
          <ol className="grid gap-2 sm:grid-cols-5">
            {payload.stages.map(([stage, value, tone], index) => (
              <li
                key={stage}
                className="relative rounded-control border bg-bg p-3"
                style={{ borderColor: tone }}
              >
                <span className="text-xs font-semibold" style={{ color: tone }}>
                  {index + 1}. {stage}
                </span>
                <code className="mt-2 block text-xs leading-5">{value}</code>
                {index < payload.stages.length - 1 && (
                  <span
                    className="absolute -right-3 top-1/2 hidden text-lg sm:block"
                    style={{ color: tone }}
                    aria-hidden="true"
                  >
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm"
          style={{ borderColor: payload.tone }}
        >
          {payload.result}
        </p>
      </div>
    </Tpp20DedicatedFrame>
  );
}

const reloads = {
  safe: {
    label: "合法热更新",
    candidate: "#18 threshold=0.86",
    events: [
      "watch: v18 arrived",
      "parse + validate: PASS",
      "build immutable #18",
      "atomic swap #17 → #18",
      "in-flight request keeps #17",
    ],
    before: "R-104 reads #17 → 0.82",
    after: "R-105 reads #18 → 0.86",
    audit: "ACTIVATE v18 by deploy-bot；previous=v17",
    tone: color.success,
  },
  invalid: {
    label: "非法热更新",
    candidate: "#19 threshold=1.40",
    events: [
      "watch: v19 arrived",
      "parse: PASS",
      "validate: FAIL at threshold",
      "atomic swap: not called",
      "all requests keep #18",
    ],
    before: "R-106 reads #18 → 0.86",
    after: "R-107 reads #18 → 0.86",
    audit: "REJECT v19；value=1.40；schema max=1",
    tone: color.danger,
  },
  partial: {
    label: "反例：逐字段改",
    candidate: "mutable global config",
    events: [
      "write retry.max=5",
      "R-108 reads mixed state",
      "write threshold=0.90",
      "region write throws",
      "no coherent version exists",
    ],
    before: "R-108 sees retry from new / threshold from old",
    after: "无法证明任何请求使用哪一版",
    audit: "BROKEN；没有单一配置哈希可追溯",
    tone: color.warning,
  },
} as const;
type ReloadId = keyof typeof reloads;

export function Tpp20Topic32ConfigurationFeedbackLab() {
  const [id, setId] = useState<ReloadId>("safe");
  const reload = reloads[id];

  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 32 专属实验 · 动态配置必须原子换快照"
      title="更新到一半时到来的请求，究竟读哪一版？"
      description="比较合法候选、非法候选与逐字段写全局对象。观察活动指针、在途请求和审计事件，而非只看最终界面。"
      kind="configuration-atomic-hot-reload"
      reset={() => setId("safe")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(reloads) as ReloadId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {reloads[key].label}
            </button>
          ))}
        </div>
        <code
          className="mt-4 block rounded-control border bg-bg p-3 text-xs"
          style={{ borderColor: reload.tone }}
        >
          candidate: {reload.candidate}
        </code>
        <ol className="mt-3 grid gap-2 md:grid-cols-5">
          {reload.events.map((event, index) => (
            <li
              key={event}
              className="relative rounded-control border border-border bg-bg p-3 text-xs leading-5"
            >
              <strong style={{ color: reload.tone }}>{index + 1}</strong> ·{" "}
              {event}
              {index < reload.events.length - 1 && (
                <span
                  className="absolute -right-3 top-1/2 hidden text-lg md:block"
                  style={{ color: reload.tone }}
                  aria-hidden="true"
                >
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <code className="rounded-control border border-border bg-bg p-3 text-xs">
            切换边界前：{reload.before}
          </code>
          <code className="rounded-control border border-border bg-bg p-3 text-xs">
            切换边界后：{reload.after}
          </code>
        </div>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm"
          style={{ borderColor: reload.tone }}
        >
          {reload.audit}
        </p>
      </div>
    </Tpp20DedicatedFrame>
  );
}

const fields = {
  explicit: {
    label: "显式配置",
    key: "retry.max",
    raw: "3",
    effective: "3",
    provenance: "checkout.yaml@v18:2",
    decision: "使用用户给定值",
    tone: color.success,
  },
  defaulted: {
    label: "采用默认值",
    key: "retry.jitter",
    raw: "absent",
    effective: "0.20",
    provenance: "ConfigV3 default@schema:41",
    decision: "允许缺省，但审计必须注明 defaulted",
    tone: color.accent,
  },
  required: {
    label: "必填缺失",
    key: "fraud.threshold",
    raw: "absent",
    effective: "none",
    provenance: "ConfigV3 required@schema:18",
    decision: "拒绝整份候选，不猜一个‘安全值’",
    tone: color.danger,
  },
  unknown: {
    label: "未知字段",
    key: "fraud.treshold",
    raw: "0.82",
    effective: "none",
    provenance: "no schema entry；did-you-mean threshold",
    decision: "拒绝拼写错误，不静默忽略策略",
    tone: color.warning,
  },
} as const;
type FieldId = keyof typeof fields;

export function Tpp20Topic32ConfigurationEvidenceLab() {
  const [id, setId] = useState<FieldId>("explicit");
  const field = fields[id];

  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 32 专属复核 · 有效值必须带来源"
      title="这个运行值来自文件、默认值，还是一次拼写错误？"
      description="选择字段状态，追踪 raw value、effective value、模式坐标和裁决。默认值是有版本的策略，不是凭空出现的便利。"
      kind="configuration-value-provenance-ledger"
      reset={() => setId("explicit")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-4">
          {(Object.keys(fields) as FieldId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {fields[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["字段", field.key],
            ["原始值", field.raw],
            ["有效值", field.effective],
            ["来源", field.provenance],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-control border bg-bg p-3"
              style={{ borderColor: field.tone }}
            >
              <p className="text-xs font-semibold text-muted">{label}</p>
              <code className="mt-2 block break-words text-xs">{value}</code>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-control border border-border bg-bg p-3 text-xs leading-6">
          <code>
            audit: candidate=v18 · schema=ConfigV3 · key={field.key} · raw=
            {field.raw} · effective={field.effective}
          </code>
        </div>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm leading-6"
          style={{ borderColor: field.tone }}
        >
          {field.decision}
        </p>
      </div>
    </Tpp20DedicatedFrame>
  );
}
