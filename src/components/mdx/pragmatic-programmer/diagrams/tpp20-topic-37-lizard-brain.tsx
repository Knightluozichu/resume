"use client";

import { useState } from "react";

import { Tpp20DedicatedFrame } from "./tpp20-dedicated-frame";

const unitId = "tpp20-topic-37-lizard-brain";
const color = {
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
};

const signals = {
  avoid: {
    label: "总想跳过一个测试",
    symptom: "每次准备写 token-expired 用例，就先去整理 import",
    hidden: "也许校验器同时读取当前时间和全局缓存，无法固定边界",
    probe: "注入 FakeClock，只运行 expired-at-now / expired-1ms 两例",
    outcome: "首差：比较使用 < 而契约要求 ≤",
    action: "修正边界；保留时钟端口与两条回归",
    tone: color.warning,
  },
  rename: {
    label: "一个名字改了又改",
    symptom: "AuthManager → TokenHelper → AccessUtil，仍不满意",
    hidden: "对象同时解析 token、决定权限、刷新 session，没有单一领域角色",
    probe: "列出三类输入输出；画 ParseToken / Authorize / RefreshSession 边界",
    outcome: "首差：调用者只需要 AuthorizeDecision，却获得可变 session",
    action: "拆端口后命名自然落到动作与领域结果",
    tone: color.accent,
  },
  thrash: {
    label: "开始随机改代码",
    symptom: "连续改 if、加日志、重启服务，没有写预期",
    hidden: "不知道 401 来自签名、过期还是权限拒绝",
    probe: "冻结 requestId；只在三道边界记录 typed result",
    outcome: "首差：signature PASS / expiry PASS / role lookup MISS",
    action: "停止改 token；修复角色映射并加缺失角色测试",
    tone: color.danger,
  },
} as const;
type SignalId = keyof typeof signals;

export function Tpp20Topic37LizardBrainSystemLab() {
  const [id, setId] = useState<SignalId>("avoid");
  const signal = signals[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 37 专属解剖图 · 认证代码中的认知阻力"
      title="不舒服不是结论，但它能指向哪个未知量？"
      description="选择逃避测试、反复改名或随机试错。图把感觉转成可失败假设和最小探针，不用情绪直接裁决设计。"
      kind="lizard-brain-signal-hypothesis-probe"
      reset={() => setId("avoid")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(signals) as SignalId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {signals[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {[
            ["感觉信号", signal.symptom],
            ["候选未知", signal.hidden],
            ["最小探针", signal.probe],
            ["实际首差", signal.outcome],
            ["下一动作", signal.action],
          ].map(([label, value], index) => (
            <div
              key={label}
              className="relative rounded-control border bg-bg p-3"
              style={{
                borderColor: index >= 2 ? signal.tone : "var(--border)",
              }}
            >
              <p
                className="text-xs font-semibold"
                style={{ color: signal.tone }}
              >
                {index + 1}. {label}
              </p>
              <p className="mt-2 text-sm leading-6">{value}</p>
              {index < 4 && (
                <span
                  className="absolute -right-3 top-1/2 hidden text-lg lg:block"
                  style={{ color: signal.tone }}
                  aria-hidden="true"
                >
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </Tpp20DedicatedFrame>
  );
}

const responses = {
  push: {
    label: "继续硬改 45 分钟",
    events: [
      "无预测地改 if",
      "同时升级 jwt 库",
      "清空缓存",
      "测试偶然通过",
      "CI 再次 401",
    ],
    changes: "11 files / 3 variables",
    first: "unknown",
    recover: "回退整批改动后才能重建基线",
    tone: color.danger,
  },
  pause: {
    label: "暂停并写 10 分钟探针",
    events: [
      "写下怕碰的 expired case",
      "冻结 token/clock/cache",
      "预测 expiry boundary",
      "运行 2 个样本",
      "定位 ≤ 首差",
    ],
    changes: "1 port / 1 condition",
    first: "expiry.compare at t==exp",
    recover: "单提交修复，可立即重放",
    tone: color.success,
  },
  walk: {
    label: "保存问题后离开",
    events: [
      "保存 failing fixture",
      "写当前假设与未知",
      "commit WIP evidence",
      "休息后先读记录",
      "设计 FakeClock probe",
    ],
    changes: "0 production files",
    first: "next session starts from frozen failure",
    recover: "没有丢失上下文，也没有把疲劳写进代码",
    tone: color.accent,
  },
} as const;
type ResponseId = keyof typeof responses;

export function Tpp20Topic37LizardBrainFeedbackLab() {
  const [id, setId] = useState<ResponseId>("push");
  const response = responses[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 37 专属实验 · 同一阻塞的三种响应"
      title="暂停十分钟，真的比再改四十五分钟更慢吗？"
      description="固定 token 过期边界故障，只改变对认知阻力的响应。比较改动变量、首差可见性和恢复成本。"
      kind="lizard-brain-pause-response-timeline"
      reset={() => setId("push")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(responses) as ResponseId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {responses[key].label}
            </button>
          ))}
        </div>
        <ol className="mt-4 grid gap-2 sm:grid-cols-5">
          {response.events.map((event, index) => (
            <li
              key={event}
              className="rounded-control border border-border bg-bg p-3 text-xs"
            >
              <strong style={{ color: response.tone }}>{index + 1}.</strong>{" "}
              {event}
            </li>
          ))}
        </ol>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {[
            ["变更范围", response.changes],
            ["首差", response.first],
            ["恢复", response.recover],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-control border bg-bg p-3"
              style={{ borderColor: response.tone }}
            >
              <p className="text-xs font-semibold text-muted">{label}</p>
              <p className="mt-2 text-sm">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </Tpp20DedicatedFrame>
  );
}

const logs = {
  supported: {
    label: "假设被支持",
    hypothesis: "过期边界使用了严格小于",
    prediction: "t==exp 将被错误接受；t==exp-1ms 接受",
    observed: "ACCEPT / ACCEPT",
    interpretation: "第一例违反契约，位置在 expiry.compare",
    next: "改为 now < exp；重放矩阵",
    status: "SUPPORTED",
    tone: color.success,
  },
  rejected: {
    label: "假设被否定",
    hypothesis: "401 来自缓存旧公钥",
    prediction: "清空缓存后同 token 应通过",
    observed: "清空后仍 401；signature PASS",
    interpretation: "缓存不是首差，不能继续围绕它改代码",
    next: "转查 expiry 与 role 两个 typed result",
    status: "REJECTED",
    tone: color.warning,
  },
  vague: {
    label: "不可检验记录",
    hypothesis: "认证代码感觉很脆弱",
    prediction: "应该会出问题",
    observed: "加日志后暂时通过",
    interpretation: "输入、变量和失败条件均未冻结",
    next: "重写成只含一个可变条件的假设",
    status: "INVALID",
    tone: color.danger,
  },
} as const;
type LogId = keyof typeof logs;

export function Tpp20Topic37LizardBrainEvidenceLab() {
  const [id, setId] = useState<LogId>("supported");
  const log = logs[id];
  return (
    <Tpp20DedicatedFrame
      unitId={unitId}
      eyebrow="Topic 37 专属复核 · 直觉实验日志"
      title="实验是在验证假设，还是给既有感觉找证据？"
      description="对比被支持、被否定与不可检验的记录。好实验允许直觉输，并保存预测与观测的分叉。"
      kind="lizard-brain-falsifiable-experiment-log"
      reset={() => setId("supported")}
    >
      <div className="p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {(Object.keys(logs) as LogId[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setId(key)}
              aria-pressed={id === key}
              className={`min-h-11 rounded-control border p-3 text-left text-sm font-semibold ${id === key ? "border-accent bg-accent/10" : "border-border bg-bg"}`}
            >
              {logs[key].label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {[
            ["可失败假设", log.hypothesis],
            ["事前预测", log.prediction],
            ["原始观测", log.observed],
            ["解释", log.interpretation],
            ["下一动作", log.next],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-control border border-border bg-bg p-3"
            >
              <p className="text-xs font-semibold text-muted">{label}</p>
              <p className="mt-2 text-sm">{value}</p>
            </div>
          ))}
        </div>
        <code
          className="mt-3 block rounded-control border bg-bg p-3 text-sm font-semibold"
          style={{ borderColor: log.tone, color: log.tone }}
        >
          hypothesis status: {log.status}
        </code>
      </div>
    </Tpp20DedicatedFrame>
  );
}
