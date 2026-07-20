"use client";

import { useState } from "react";

import { Tpp20DedicatedFrame } from "./tpp20-dedicated-frame";

const unitId = "tpp20-chapter-04-pragmatic-paranoia";
const c = {
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
};

const designs = {
  optimistic: {
    label: "乐观路径",
    stages: [
      ["HTTP", "接收任意 Content-Length/MIME", c.warning],
      ["临时盘", "写完整文件后再看大小", c.danger],
      ["解析器", "假设 invoice.pages > 0", c.danger],
      ["数据库", "写 invoice，再异步清理 temp", c.warning],
      ["响应", "深层异常统一返回 500", c.danger],
    ],
    owner: "temp fd 在 parser 抛错时没有明确关闭者",
    radius: "一个坏输入占满临时盘，随后所有租户上传失败",
    color: c.danger,
  },
  paranoid: {
    label: "务实防线",
    stages: [
      ["HTTP 契约", "<=10 MB；PDF；tenant=T-7", c.success],
      ["流式校验", "读取到 10 MB+1 byte 立即拒绝", c.success],
      ["领域断言", "pages >= 1；total >= 0", c.success],
      ["资源作用域", "withTempFile 保证 close + unlink", c.success],
      ["失败响应", "413/422 + request R-91", c.accent],
    ],
    owner: "临时文件由 withTempFile 作用域唯一拥有",
    radius: "坏输入只影响 request R-91，不进入解析、数据库或其他租户",
    color: c.success,
  },
} as const;
type DesignId = keyof typeof designs;

export function Tpp20Chapter04PragmaticParanoiaSystemLab() {
  const [id, setId] = useState<DesignId>("optimistic");
  const design = designs[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="第 4 章专属解剖图 · 发票上传的五道边界"
      title="坏输入会停在自己的请求里，还是把失败扩散到共享资源？"
      description="切换乐观路径与务实防线。固定 11 MB 发票、tenant T-7 和 request R-91，逐段检查真实合同、断言与资源所有者。"
      kind="pragmatic-paranoia-upload-boundaries"
      reset={() => setId("optimistic")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-2">
          {(Object.keys(designs) as DesignId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {designs[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-2 lg:grid-cols-5">
          {design.stages.map(([stage, contract, color], index) => (
            <div
              key={stage}
              className="relative rounded-control border bg-bg p-3"
              style={{ borderColor: color }}
            >
              <span className="text-xs font-semibold" style={{ color }}>
                {index + 1}. {stage}
              </span>
              <strong className="mt-2 block text-sm leading-5">
                {contract}
              </strong>
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
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <p className="rounded-control border border-border bg-bg p-3 text-sm">
            <strong className="text-secondary">资源所有权：</strong>{" "}
            {design.owner}
          </p>
          <p
            className="rounded-control border bg-bg p-3 text-sm"
            style={{ borderColor: design.color }}
          >
            <strong style={{ color: design.color }}>损害半径：</strong>{" "}
            {design.radius}
          </p>
        </div>
      </div>
    </Tpp20DedicatedFrame>
  );
}

const failureTiming = {
  late: {
    label: "晚失败：上传完成后检查",
    events: [
      ["网络", "传输 11 MB", "11 MB", c.warning],
      ["临时盘", "写入 invoice-R91.tmp", "11 MB", c.warning],
      ["worker", "PDF 解析", "1.8 s", c.warning],
      ["校验", "size > 10 MB", "拒绝", c.danger],
    ],
    cleanup: "异常分支忘记 unlink，临时文件保留",
    response: "2.4 s 后返回 422；客户端以为内容错误而不是大小超限",
    color: c.danger,
  },
  early: {
    label: "快失败：边界流式计数",
    events: [
      ["HTTP", "声明 Content-Length=11 MB", "立即检查", c.success],
      ["读取", "不进入 body stream", "0 byte", c.success],
      ["资源", "不创建 temp / worker", "0", c.success],
      ["响应", "413 PAYLOAD_TOO_LARGE", "18 ms", c.success],
    ],
    cleanup: "没有已取得资源需要清理",
    response: "响应给出 max=10MB、actual=11MB、request=R-91",
    color: c.success,
  },
  chunked: {
    label: "边界反例：没有 Content-Length",
    events: [
      ["HTTP", "Transfer-Encoding: chunked", "大小未知", c.warning],
      ["读取", "流式计数到 10 MB+1", "首个越界 byte", c.success],
      ["资源", "终止流并 unlink temp", "close 完成", c.success],
      ["响应", "413 PAYLOAD_TOO_LARGE", "1.1 s", c.accent],
    ],
    cleanup: "作用域清理已写入的 10 MB 临时片段",
    response: "快失败不是只信请求头，而是在最早可靠边界拒绝",
    color: c.accent,
  },
} as const;
type FailureTimingId = keyof typeof failureTiming;

export function Tpp20Chapter04PragmaticParanoiaFeedbackLab() {
  const [id, setId] = useState<FailureTimingId>("late");
  const timing = failureTiming[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="第 4 章专属实验 · 失败时点决定资源损耗"
      title="同一份 11 MB 文件，越界事实最早在哪一刻可靠可知？"
      description="比较晚校验、请求头早拒绝和 chunked 反例。每格直接显示已经消耗的字节、临时盘、worker 时间与清理动作。"
      kind="pragmatic-paranoia-fail-fast"
      reset={() => setId("late")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(failureTiming) as FailureTimingId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {failureTiming[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-2 md:grid-cols-4">
          {timing.events.map(([stage, action, cost], index) => (
            <div
              key={stage}
              className="relative rounded-control border bg-bg p-3"
              style={{ borderColor: timing.color }}
            >
              <span
                className="text-xs font-semibold"
                style={{ color: timing.color }}
              >
                {index + 1}. {stage}
              </span>
              <strong className="mt-2 block text-sm">{action}</strong>
              <code className="mt-2 block text-xs text-secondary">
                cost={cost}
              </code>
              {index < 3 && (
                <span
                  className="absolute -right-3 top-1/2 hidden text-lg md:block"
                  style={{ color: timing.color }}
                  aria-hidden="true"
                >
                  →
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <p className="rounded-control border border-border bg-bg p-3 text-sm">
            <strong>清理：</strong> {timing.cleanup}
          </p>
          <p
            className="rounded-control border bg-bg p-3 text-sm"
            style={{ borderColor: timing.color }}
          >
            <strong>结果：</strong> {timing.response}
          </p>
        </div>
      </div>
    </Tpp20DedicatedFrame>
  );
}

const assertions = {
  absent: {
    label: "撤掉领域断言",
    parsed: "pages = 0；total = -12.50 CNY",
    stages: [
      ["解析", "返回空页和负金额", c.warning],
      ["映射", "构造 Invoice", c.warning],
      ["数据库", "commit invoice I-44", c.danger],
      ["下游", "退款任务把 -12.50 当贷项", c.danger],
    ],
    invariant: "没有地方声明 pages >= 1 && total >= 0",
    result: "异常状态穿过多个边界，最终以另一种业务含义出现。",
    color: c.danger,
  },
  asserted: {
    label: "断言领域不变量",
    parsed: "pages = 0；total = -12.50 CNY",
    stages: [
      ["解析", "返回候选字段", c.success],
      ["构造", "assert pages >= 1", c.danger],
      ["数据库", "未开始 transaction", c.success],
      ["下游", "没有事件", c.success],
    ],
    invariant:
      "InvariantViolation invoice.pages expected >=1 actual=0 request=R-91",
    result: "断言在状态首次变非法的位置停止；响应转为 422 并保存失败样本。",
    color: c.success,
  },
  recovered: {
    label: "修复解析器并回归",
    parsed: "pages = 1；total = 12.50 CNY",
    stages: [
      ["解析", "识别旋转扫描页", c.success],
      ["构造", "两个不变量通过", c.success],
      ["数据库", "commit I-44", c.success],
      ["下游", "发票事件 total=12.50", c.success],
    ],
    invariant: "原失败 PDF + 空文件 + 负金额伪造样本全部进入回归",
    result: "修复保留断言；不能因为当前解析器看似正确就移除防线。",
    color: c.accent,
  },
} as const;
type AssertionId = keyof typeof assertions;

export function Tpp20Chapter04PragmaticParanoiaEvidenceLab() {
  const [id, setId] = useState<AssertionId>("absent");
  const assertion = assertions[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="第 4 章专属复核 · 断言停在首个非法状态"
      title="解析器返回 0 页负金额时，系统最远会写到哪里？"
      description="比较无断言、有不变量断言和解析器修复。断言不是替代输入校验，而是防止内部状态越过承诺边界。"
      kind="pragmatic-paranoia-invariant-containment"
      reset={() => setId("absent")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(assertions) as AssertionId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {assertions[key].label}
            </button>
          ))}
        </div>
        <code className="mt-4 block rounded-control border border-border bg-bg p-3 text-xs">
          {assertion.parsed}
        </code>
        <div className="mt-3 grid gap-2 md:grid-cols-4">
          {assertion.stages.map(([stage, state, color], index) => (
            <div
              key={stage}
              className="relative rounded-control border bg-bg p-3"
              style={{ borderColor: color }}
            >
              <span className="text-xs font-semibold" style={{ color }}>
                {index + 1}. {stage}
              </span>
              <strong className="mt-2 block text-sm leading-5">{state}</strong>
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
        <p
          className="mt-3 rounded-control border border-border bg-bg p-3 font-mono text-xs"
          style={{ color: assertion.color }}
        >
          {assertion.invariant}
        </p>
        <p
          className="mt-3 rounded-control border-l-4 bg-bg p-3 text-sm leading-6"
          style={{ borderColor: assertion.color }}
        >
          {assertion.result}
        </p>
      </div>
    </Tpp20DedicatedFrame>
  );
}
