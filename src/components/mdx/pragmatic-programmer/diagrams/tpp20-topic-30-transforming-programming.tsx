"use client";

import { useState } from "react";

import { Tpp20DedicatedFrame } from "./tpp20-dedicated-frame";

const unitId = "tpp20-topic-30-transforming-programming";
const c = {
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
};

const dataflows = {
  mutable: {
    label: "共享 request 原地补字段",
    stages: [
      ["request.address", "'上海市 浦东新区 世纪大道 1号'", c.success],
      ["parse", "request.city='上海'；其他字段半填", c.warning],
      ["normalize", "覆盖原 address；postcode=undefined", c.warning],
      ["geocode", "throw INVALID_POSTCODE", c.danger],
      ["caller", "拿到已被部分修改的 request", c.danger],
    ],
    retry: "第二次 parse 读取已标准化一半的 address，结果不再等于第一次",
    verdict: "数据形状没有表达完成阶段；错误发生后无法区分原输入与半成品。",
    color: c.danger,
  },
  typed: {
    label: "不可变类型变换",
    stages: [
      ["RawAddress", "原字符串 + input hash", c.success],
      ["ParsedAddress", "city/district/street tokens", c.success],
      ["NormalizedAddress", "canonical street；postcode missing", c.success],
      ["Result", "Err MissingPostcode(last=Normalized)", c.warning],
      ["caller", "原 Raw 与最后有效值都保留", c.success],
    ],
    retry: "补 postcode 后从同一 RawAddress 重放，或显式从 Normalized 继续",
    verdict: "每个函数只接收满足自己前置形状的数据；错误通道也是数据。",
    color: c.success,
  },
} as const;
type DataflowId = keyof typeof dataflows;

export function Tpp20Topic30TransformingProgrammingSystemLab() {
  const [id, setId] = useState<DataflowId>("mutable");
  const flow = dataflows[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 30 专属解剖图 · 地址到配送标签的数据形状"
      title="邮编缺失时，程序留下半修改 request 还是明确的最后有效值？"
      description="切换共享对象与不可变变换。固定同一上海地址且缺 postcode，沿解析、标准化、地理编码观察真实中间值。"
      kind="transforming-address-data-shapes"
      reset={() => setId("mutable")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-2">
          {(Object.keys(dataflows) as DataflowId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {dataflows[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 flex flex-col gap-2 lg:flex-row">
          {flow.stages.map(([shape, value, color], index) => (
            <div
              key={shape}
              className="relative flex-1 rounded-control border bg-bg p-3"
              style={{ borderColor: color }}
            >
              <code className="text-xs font-semibold" style={{ color }}>
                {shape}
              </code>
              <p className="mt-2 text-sm leading-5">{value}</p>
              {index < 4 && (
                <span
                  className="absolute -right-3 top-1/2 z-10 hidden text-lg lg:block"
                  style={{ color }}
                  aria-hidden="true"
                >
                  →
                </span>
              )}
            </div>
          ))}
        </div>
        <p className="mt-3 rounded-control border border-border bg-bg p-3 text-sm">
          <strong>重试：</strong> {flow.retry}
        </p>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm leading-6"
          style={{ borderColor: flow.color }}
        >
          {flow.verdict}
        </p>
      </div>
    </Tpp20DedicatedFrame>
  );
}

const inputs = {
  valid: {
    label: "合法上海地址",
    raw: "上海市浦东新区世纪大道1号, 200120",
    stages: [
      [
        "parse",
        "{ city: 上海, street: 世纪大道1号, postcode: 200120 }",
        c.success,
      ],
      ["normalize", "CN-31 / PUDONG / CENTURY-AVE-1", c.success],
      ["geocode", "31.2354, 121.5055", c.success],
      ["label", "route=SHA-PD-07；barcode B-91", c.success],
    ],
    output: "Ok ShippingLabel(B-91)",
    color: c.success,
  },
  missing: {
    label: "缺少邮编",
    raw: "上海市浦东新区世纪大道1号",
    stages: [
      [
        "parse",
        "{ city: 上海, street: 世纪大道1号, postcode: null }",
        c.success,
      ],
      ["normalize", "Err MissingPostcode(field=postcode)", c.danger],
      ["geocode", "not called", c.warning],
      ["label", "not called", c.warning],
    ],
    output: "Err MissingPostcode + RawAddress",
    color: c.danger,
  },
  unknown: {
    label: "未知行政区",
    raw: "上海市新城区测试路9号, 200000",
    stages: [
      ["parse", "city=上海, district=新城区", c.success],
      ["normalize", "district code not found", c.danger],
      ["geocode", "not called", c.warning],
      ["label", "not called", c.warning],
    ],
    output: "Err UnknownDistrict(value=新城区, dictionary=v12)",
    color: c.warning,
  },
} as const;
type InputId = keyof typeof inputs;

export function Tpp20Topic30TransformingProgrammingFeedbackLab() {
  const [id, setId] = useState<InputId>("valid");
  const input = inputs[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 30 专属实验 · 成功与错误走同一显式数据流"
      title="哪一个变换拒绝输入，后续函数是否还会被调用？"
      description="选择合法、缺邮编或未知行政区地址。每格显示真实输出值；失败后后续阶段必须是 not called，而非空对象。"
      kind="transforming-address-result-channel"
      reset={() => setId("valid")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(inputs) as InputId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {inputs[key].label}
            </button>
          ))}
        </div>
        <code className="mt-4 block rounded-control border border-border bg-bg p-3 text-xs">
          RawAddress: {input.raw}
        </code>
        <div className="mt-3 grid gap-2 md:grid-cols-4">
          {input.stages.map(([stage, value, color], index) => (
            <div
              key={stage}
              className="relative rounded-control border bg-bg p-3"
              style={{ borderColor: color }}
            >
              <span className="text-xs font-semibold" style={{ color }}>
                {index + 1}. {stage}
              </span>
              <code className="mt-2 block text-xs leading-5">{value}</code>
              {index < 3 && (
                <span
                  className="absolute -right-3 top-1/2 hidden text-lg md:block"
                  style={{ color }}
                  aria-hidden="true"
                >
                  →
                </span>
              )}
            </div>
          ))}
        </div>
        <code
          className="mt-3 block rounded-control border bg-bg p-3 text-xs"
          style={{ borderColor: input.color, color: input.color }}
        >
          Result: {input.output}
        </code>
      </div>
    </Tpp20DedicatedFrame>
  );
}

const purity = {
  hidden: {
    label: "伪纯函数：读取全局设置",
    signature: "renderLabel(address)",
    run1: "global locale=zh-CN, timezone=Asia/Shanghai → 2026-07-20 / 上海市",
    run2: "global locale=en-US, timezone=UTC → 07/19/2026 / Shanghai",
    hash: "同一 address hash，两个 label hash",
    dependency: "locale/timezone/dictionary version 不在参数中",
    verdict: "函数签名说只依赖 address，运行结果却依赖调用时的全局环境。",
    color: c.danger,
  },
  explicit: {
    label: "纯函数：依赖显式输入",
    signature: "renderLabel(address, { locale, timezone, dictionaryV })",
    run1: "ctx={zh-CN, Asia/Shanghai, v12} → label sha256 4a1…",
    run2: "同 ctx 重放 → label sha256 4a1…",
    hash: "相同 address + ctx → 相同 bytes",
    dependency: "所有影响输出的值均可序列化、版本化",
    verdict: "并发和时间变化不改变结果；切 locale 是一份不同的显式输入。",
    color: c.success,
  },
  dictionary: {
    label: "反例：词典版本偷偷更新",
    signature: "renderLabel(address, ctx)；ctx 未含 dictionaryV",
    run1: "词典 v12：世纪大道 → CENTURY AVE",
    run2: "词典 v13：世纪大道 → SHIJI AVE",
    hash: "同 address/locale/timezone，输出仍变化",
    dependency: "外部参考数据也是输入，不因只读就自动纯",
    verdict: "把 dictionaryV 加入 ctx 与证据包，才能重建历史标签。",
    color: c.warning,
  },
} as const;
type PurityId = keyof typeof purity;

export function Tpp20Topic30TransformingProgrammingEvidenceLab() {
  const [id, setId] = useState<PurityId>("hidden");
  const sample = purity[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 30 专属复核 · 纯函数必须暴露所有输出依赖"
      title="同一个 address 为什么会渲染出两份不同标签？"
      description="比较全局设置、显式上下文与词典版本反例。证据使用输入/输出哈希，不用“看起来一样”判断可重放。"
      kind="transforming-pure-replay"
      reset={() => setId("hidden")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(purity) as PurityId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {purity[key].label}
            </button>
          ))}
        </div>
        <code className="mt-4 block rounded-control border border-border bg-bg p-3 text-xs">
          {sample.signature}
        </code>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <code className="rounded-control border border-border bg-bg p-3 text-xs leading-5">
            run 1: {sample.run1}
          </code>
          <code className="rounded-control border border-border bg-bg p-3 text-xs leading-5">
            run 2: {sample.run2}
          </code>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <p
            className="rounded-control border bg-bg p-3 text-sm"
            style={{ borderColor: sample.color }}
          >
            <strong>身份：</strong> {sample.hash}
          </p>
          <p className="rounded-control border border-border bg-bg p-3 text-sm">
            <strong>隐藏/显式依赖：</strong> {sample.dependency}
          </p>
        </div>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm leading-6"
          style={{ borderColor: sample.color }}
        >
          {sample.verdict}
        </p>
      </div>
    </Tpp20DedicatedFrame>
  );
}
