"use client";

import { useState } from "react";

const OFFICIAL_CONCEPTS = [
  "模式名称与分类",
  "意图",
  "别名",
  "动机",
  "适用性",
  "结构",
  "参与者",
  "协作",
  "后果",
  "实现",
  "示例代码",
  "已知应用",
  "相关模式",
] as const;

const ABSTRACTIONS = {
  alert: {
    label: "告警抽象",
    title: "服务不可用",
    body: "支付 API 在 5 分钟内连续失败",
  },
  digest: {
    label: "摘要抽象",
    title: "每日运行摘要",
    body: "今日 24 个任务完成，1 个任务需要复核",
  },
} as const;

const CHANNELS = {
  email: { label: "邮件实现", method: "EmailChannel.deliver()" },
  sms: { label: "短信实现", method: "SmsChannel.deliver()" },
  push: { label: "推送实现", method: "PushChannel.deliver()" },
} as const;

type Abstraction = keyof typeof ABSTRACTIONS;
type Channel = keyof typeof CHANNELS;

type TraceEvent = {
  id: number;
  label: string;
  detail: string;
  tone: "success" | "warning" | "neutral";
};

function eventTone(tone: TraceEvent["tone"]) {
  if (tone === "success") return "border-success text-success";
  if (tone === "warning") return "border-warning text-warning";
  return "border-border text-secondary";
}

export function BridgeVariationAxisLab() {
  const [abstraction, setAbstraction] = useState<Abstraction>("alert");
  const [channel, setChannel] = useState<Channel>("email");
  const [coupled, setCoupled] = useState(false);
  const [sentCount, setSentCount] = useState(0);
  const [events, setEvents] = useState<TraceEvent[]>([]);

  const currentAbstraction = ABSTRACTIONS[abstraction];
  const currentChannel = CHANNELS[channel];

  function addEvent(label: string, detail: string, tone: TraceEvent["tone"]) {
    setEvents((current) => [
      ...current,
      { id: current.length + 1, label, detail, tone },
    ]);
  }

  function selectAbstraction(next: Abstraction) {
    setAbstraction(next);
    addEvent(
      "切换抽象侧",
      `${ABSTRACTIONS[next].label} 仍通过同一个 ChannelImplementor 协议发送`,
      coupled ? "warning" : "success",
    );
  }

  function selectChannel(next: Channel) {
    setChannel(next);
    addEvent(
      "切换实现侧",
      `${CHANNELS[next].label} 被注入，${ABSTRACTIONS[abstraction].label} 的领域组织不变`,
      coupled ? "warning" : "success",
    );
  }

  function sendNotification() {
    setSentCount((current) => current + 1);
    addEvent(
      "调用抽象操作",
      `${abstraction}.notify() → ${currentChannel.method} → ${currentChannel.label}`,
      coupled ? "warning" : "success",
    );
  }

  function toggleCoupling() {
    const next = !coupled;
    setCoupled(next);
    addEvent(
      next ? "注入耦合反例" : "恢复桥接边界",
      next
        ? "抽象子类开始知道具体通道；新增通道会回写领域组织"
        : "抽象只依赖 ChannelImplementor，两个变化轴重新独立",
      next ? "warning" : "success",
    );
  }

  function reset() {
    setAbstraction("alert");
    setChannel("email");
    setCoupled(false);
    setSentCount(0);
    setEvents([]);
  }

  return (
    <section
      aria-label="桥接模式变化轴实验"
      className="mdx-figure not-prose mx-auto my-8"
      data-unit-id="designpatterns-13"
      data-visual-kind="bridge-variation-axis-lab"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              BRIDGE · ORTHOGONAL VARIATION
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              通知变化轴实验台
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              独立切换通知抽象与发送通道；桥接边界只传递最小实现协议，不让一侧的变化污染另一侧。
            </p>
          </div>
          <button
            aria-label="重置桥接模式变化轴实验"
            className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
            onClick={reset}
            type="button"
          >
            重置实验
          </button>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="min-w-0 space-y-4">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-semibold text-secondary">抽象变化轴</p>
                <span className="text-xs text-secondary">
                  {OFFICIAL_CONCEPTS.length} 个目录节点
                </span>
              </div>
              <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
                {(Object.keys(ABSTRACTIONS) as Abstraction[]).map((key) => (
                  <button
                    aria-pressed={abstraction === key}
                    className={`min-h-11 min-w-0 rounded-control border px-3 py-2 text-left text-xs transition-colors ${
                      abstraction === key
                        ? "border-accent text-accent"
                        : "border-border text-secondary hover:border-accent hover:text-primary"
                    }`}
                    key={key}
                    onClick={() => selectAbstraction(key)}
                    type="button"
                  >
                    <span className="block break-words">{ABSTRACTIONS[key].label}</span>
                    <span className="mt-1 block text-[11px] text-secondary">
                      {ABSTRACTIONS[key].title}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-secondary">实现变化轴</p>
              <div className="mt-2 grid gap-2">
                {(Object.keys(CHANNELS) as Channel[]).map((key) => (
                  <button
                    aria-pressed={channel === key}
                    className={`min-h-11 min-w-0 rounded-control border px-3 py-2 text-left text-xs transition-colors ${
                      channel === key
                        ? "border-success text-success"
                        : "border-border text-secondary hover:border-accent hover:text-primary"
                    }`}
                    key={key}
                    onClick={() => selectChannel(key)}
                    type="button"
                  >
                    <span className="block break-words">{CHANNELS[key].label}</span>
                    <span className="mt-1 block font-mono text-[11px] text-secondary">
                      {CHANNELS[key].method}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <button
              className="min-h-11 w-full rounded-control border border-accent px-3 py-2 text-left text-xs text-accent transition-colors hover:bg-accent/10"
              onClick={sendNotification}
              type="button"
            >
              调用抽象操作 notify()
            </button>
            <button
              aria-pressed={coupled}
              className={`min-h-11 w-full rounded-control border px-3 py-2 text-left text-xs transition-colors ${
                coupled
                  ? "border-warning text-warning"
                  : "border-border text-secondary hover:border-warning hover:text-primary"
              }`}
              onClick={toggleCoupling}
              type="button"
            >
              {coupled ? "恢复桥接边界" : "注入耦合反例"}
            </button>
            <p className="text-xs leading-5 text-secondary">
              先选一项抽象，再独立替换通道；最后注入耦合，比较新增实现会不会迫使抽象侧改动。
            </p>
          </div>

          <div className="min-w-0 rounded-card border border-border bg-[var(--bg)] p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                ABSTRACTION → BRIDGE → IMPLEMENTOR
              </p>
              <span
                className={`rounded-control border px-2 py-1 text-xs ${
                  coupled
                    ? "border-warning text-warning"
                    : "border-success text-success"
                }`}
              >
                {coupled ? "独立性被破坏" : "两个轴已解耦"}
              </span>
            </div>

            <div className="mt-4 grid gap-2 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
              <div className="rounded-control border border-accent p-3">
                <p className="text-xs font-semibold text-accent">Abstraction</p>
                <p className="mt-2 break-words font-mono text-xs text-primary">
                  {abstraction}.notify()
                </p>
                <p className="mt-1 text-[11px] text-secondary">组织领域消息</p>
              </div>
              <span aria-hidden="true" className="hidden text-center text-accent md:block">
                →
              </span>
              <div className="rounded-control border border-border p-3">
                <p className="text-xs font-semibold text-secondary">Bridge ref</p>
                <p className="mt-2 break-words font-mono text-xs text-primary">
                  channel.deliver()
                </p>
                <p className="mt-1 text-[11px] text-secondary">翻译为实现原语</p>
              </div>
              <span aria-hidden="true" className="hidden text-center text-success md:block">
                →
              </span>
              <div className="rounded-control border border-success p-3">
                <p className="text-xs font-semibold text-success">Implementor</p>
                <p className="mt-2 break-words font-mono text-xs text-primary">
                  {currentChannel.method}
                </p>
                <p className="mt-1 text-[11px] text-secondary">承担通道差异</p>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-control border border-accent p-3">
                <p className="text-xs font-semibold text-accent">当前抽象</p>
                <p className="mt-2 break-words text-sm text-primary">
                  {currentAbstraction.label}
                </p>
              </div>
              <div className="rounded-control border border-success p-3">
                <p className="text-xs font-semibold text-success">当前实现</p>
                <p className="mt-2 break-words text-sm text-primary">
                  {currentChannel.label}
                </p>
              </div>
              <div className="rounded-control border border-border p-3">
                <p className="text-xs font-semibold text-secondary">发送次数</p>
                <p className="mt-2 font-mono text-lg text-primary">{sentCount}</p>
              </div>
            </div>

            <div className="mt-4 overflow-x-auto rounded-control border border-border p-3">
              <p className="text-xs font-semibold text-secondary">两条变化轴的组合矩阵</p>
              <div className="mt-3 min-w-[420px]">
                <div className="grid grid-cols-[1.1fr_repeat(3,1fr)] gap-1 text-[11px]">
                  <span className="px-2 py-2 text-secondary">抽象 \ 实现</span>
                  {(Object.keys(CHANNELS) as Channel[]).map((key) => (
                    <span className="px-2 py-2 text-center text-secondary" key={key}>
                      {CHANNELS[key].label.replace("实现", "")}
                    </span>
                  ))}
                  {(Object.keys(ABSTRACTIONS) as Abstraction[]).map((abstractKey) => (
                    <div className="contents" key={abstractKey}>
                      <span className="px-2 py-2 text-secondary">
                        {ABSTRACTIONS[abstractKey].label}
                      </span>
                      {(Object.keys(CHANNELS) as Channel[]).map((channelKey) => {
                        const active = abstractKey === abstraction && channelKey === channel;
                        return (
                          <span
                            className={`rounded-control border px-2 py-2 text-center font-mono ${
                              active
                                ? coupled
                                  ? "border-warning text-warning"
                                  : "border-accent text-accent"
                                : "border-border text-secondary"
                            }`}
                            key={`${abstractKey}-${channelKey}`}
                          >
                            {active ? "当前" : "可组合"}
                          </span>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              aria-live="polite"
              className={`mt-4 rounded-control border p-4 ${
                coupled ? "border-warning" : "border-success"
              }`}
              role="status"
            >
              <p className={`text-sm font-semibold ${coupled ? "text-warning" : "text-success"}`}>
                {coupled
                  ? "反例：抽象侧知道具体通道，变化轴重新相乘"
                  : `合同通过：${currentAbstraction.label} 可组合 ${currentChannel.label}`}
              </p>
              <p className="mt-2 text-xs leading-5 text-secondary">
                {coupled
                  ? "如果新增 PushChannel 还要修改 AlertEmailNotification、AlertSmsNotification 等抽象子类，就回到了子类乘积。"
                  : `${currentAbstraction.title}：${currentAbstraction.body}。抽象只依赖 ChannelImplementor，新增通道不改消息组织。`}
              </p>
            </div>

            <div className="mt-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-semibold text-secondary">变化事件轨迹</p>
                <span className="text-xs text-secondary">{events.length} 条</span>
              </div>
              <div className="mt-2 space-y-2">
                {events.length === 0 ? (
                  <p className="rounded-control border border-border px-3 py-3 text-xs text-secondary">
                    切换任一变化轴、发送通知或注入耦合后，这里会记录可观察证据。
                  </p>
                ) : (
                  events.map((event) => (
                    <div
                      className={`rounded-control border px-3 py-2 text-xs ${eventTone(event.tone)}`}
                      key={event.id}
                    >
                      <p className="font-semibold">{event.label}</p>
                      <p className="mt-1 leading-5 text-secondary">{event.detail}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
