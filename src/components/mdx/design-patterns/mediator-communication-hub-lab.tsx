"use client";

import { useMemo, useState } from "react";

type ParticipantId = "alice" | "bob" | "monitor";
type MessageKind = "deploy" | "question" | "alert";
type Tone = "success" | "warning" | "neutral";

type Trace = {
  id: number;
  label: string;
  detail: string;
  tone: Tone;
};

const PARTICIPANTS: Array<{ id: ParticipantId; name: string; role: string }> = [
  { id: "alice", name: "Alice", role: "产品参与者" },
  { id: "bob", name: "Bob", role: "工程参与者" },
  { id: "monitor", name: "Monitor", role: "审计参与者" },
];

const MESSAGES: Record<MessageKind, { label: string; detail: string }> = {
  deploy: { label: "deploy", detail: "发布准备完成" },
  question: { label: "question", detail: "需要协作确认" },
  alert: { label: "alert", detail: "检测到风险" },
};

function toneClass(tone: Tone) {
  if (tone === "success") return "border-success text-success";
  if (tone === "warning") return "border-warning text-warning";
  return "border-border text-secondary";
}

export function MediatorCommunicationHubLab() {
  const [sender, setSender] = useState<ParticipantId>("alice");
  const [messageKind, setMessageKind] = useState<MessageKind>("deploy");
  const [directLinks, setDirectLinks] = useState(false);
  const [sentCount, setSentCount] = useState(0);
  const [lastRecipients, setLastRecipients] = useState<ParticipantId[]>([]);
  const [traces, setTraces] = useState<Trace[]>([]);
  const [status, setStatus] = useState(
    "基线：Alice 准备通过 ChatMediator 发送 deploy。",
  );

  const senderName = useMemo(
    () => PARTICIPANTS.find((participant) => participant.id === sender)?.name ?? sender,
    [sender],
  );

  function addTrace(label: string, detail: string, tone: Tone) {
    setTraces((items) => [
      ...items,
      { id: items.length + 1, label, detail, tone },
    ]);
  }

  function chooseSender(next: ParticipantId) {
    setSender(next);
    const name = PARTICIPANTS.find((participant) => participant.id === next)?.name;
    setStatus(`${name} 已成为发送者；先预测中介者会通知哪些参与者。`);
    addTrace("选择发送者", `${name} 只依赖 ChatMediator，不直接持有其他参与者。`, "neutral");
  }

  function chooseMessage(next: MessageKind) {
    setMessageKind(next);
    setStatus(`消息已改为 ${MESSAGES[next].label}：${MESSAGES[next].detail}。`);
    addTrace("选择消息", `${senderName} 将把 ${MESSAGES[next].label} 交给中介者路由。`, "neutral");
  }

  function sendMessage() {
    const recipients = PARTICIPANTS.filter(
      (participant) => participant.id !== sender,
    ).map((participant) => participant.id);
    const recipientNames = recipients
      .map((id) => PARTICIPANTS.find((participant) => participant.id === id)?.name)
      .join("、");
    setSentCount((count) => count + 1);
    setLastRecipients(recipients);
    if (directLinks) {
      setStatus(
        `反例：${senderName} 除了经过中介者，还直接调用了 Alice，依赖边重新扩散。`,
      );
      addTrace(
        "旁路直连",
        `${senderName} → Alice 绕过 ChatMediator；消息可能到达，但协作协议不再集中。`,
        "warning",
      );
      return;
    }
    setStatus(
      `ChatMediator 已路由 ${MESSAGES[messageKind].label}：${senderName} → ${recipientNames}。`,
    );
    addTrace(
      "中介者路由",
      `${senderName} → ChatMediator → ${recipientNames}；发送者不接收自己的消息。`,
      "success",
    );
  }

  function toggleDirectLinks() {
    const next = !directLinks;
    setDirectLinks(next);
    setStatus(
      next
        ? "已注入旁路直连反例；下一次发送会显示额外依赖边。"
        : "旁路直连已关闭；下一次发送恢复单向中介者路径。",
    );
    addTrace(
      next ? "注入反例" : "关闭反例",
      next
        ? "参与者重新认识具体对象，路由中心不再是唯一协作入口。"
        : "参与者只保留中介者依赖，可以重新验收协议。",
      next ? "warning" : "success",
    );
  }

  function reset() {
    setSender("alice");
    setMessageKind("deploy");
    setDirectLinks(false);
    setSentCount(0);
    setLastRecipients([]);
    setTraces([]);
    setStatus("基线：Alice 准备通过 ChatMediator 发送 deploy。");
  }

  return (
    <section
      aria-label="中介者模式聊天室协作实验"
      className="mdx-figure not-prose mx-auto my-8"
      data-unit-id="designpatterns-20"
      data-visual-kind="mediator-communication-hub-lab"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              MEDIATOR · ROUTE · BOUNDARY
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              聊天室中介者路由实验台
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              选择发送者和消息，观察 ChatMediator 如何把一次事件路由给其他参与者，再注入旁路直连反例。
            </p>
          </div>
          <button
            aria-label="重置中介者模式聊天室协作实验"
            className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
            onClick={reset}
            type="button"
          >
            重置实验
          </button>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="min-w-0 space-y-4">
            <div>
              <p className="text-xs font-semibold text-secondary">选择发送者</p>
              <div className="mt-2 grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
                {(["bob", "alice", "monitor"] as ParticipantId[]).map((id) => {
                  const participant = PARTICIPANTS.find((item) => item.id === id);
                  if (!participant) return null;
                  return (
                    <button
                      aria-pressed={sender === id}
                      className={
                        "min-h-11 min-w-0 rounded-control border px-3 py-2 text-left text-xs transition-colors " +
                        (sender === id
                          ? "border-accent text-accent"
                          : "border-border text-secondary hover:border-accent hover:text-primary")
                      }
                      key={id}
                      onClick={() => chooseSender(id)}
                      type="button"
                    >
                      {participant.name} · {participant.role}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-secondary">选择消息类型</p>
              <div className="mt-2 grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
                {(["question", "deploy", "alert"] as MessageKind[]).map((kind) => (
                  <button
                    aria-pressed={messageKind === kind}
                    className={
                      "min-h-11 min-w-0 rounded-control border px-3 py-2 text-left text-xs transition-colors " +
                      (messageKind === kind
                        ? "border-accent text-accent"
                        : "border-border text-secondary hover:border-accent hover:text-primary")
                    }
                    key={kind}
                    onClick={() => chooseMessage(kind)}
                    type="button"
                  >
                    {MESSAGES[kind].label} · {MESSAGES[kind].detail}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              <button
                className="min-h-11 rounded-control border border-accent px-3 py-2 text-left text-xs text-accent transition-colors hover:bg-accent/10"
                onClick={sendMessage}
                type="button"
              >
                通过 ChatMediator 发送
              </button>
              <button
                aria-pressed={directLinks}
                className={
                  "min-h-11 rounded-control border px-3 py-2 text-left text-xs transition-colors " +
                  (directLinks
                    ? "border-warning text-warning"
                    : "border-border text-secondary hover:border-warning hover:text-primary")
                }
                onClick={toggleDirectLinks}
                type="button"
              >
                {directLinks ? "关闭旁路直连反例" : "注入旁路直连反例"}
              </button>
            </div>
            <p className="text-xs leading-5 text-secondary">
              先预测接收者，再发送一次；打开反例后重复发送，比较路径和耦合边的变化。
            </p>
          </div>

          <div className="min-w-0 rounded-card border border-border bg-[var(--bg)] p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                PARTICIPANTS → MEDIATOR → PARTICIPANTS
              </p>
              <span className="rounded-control border border-border px-2 py-1 text-xs text-secondary">
                已发送 {sentCount} 次
              </span>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
              <div className="grid gap-2">
                {PARTICIPANTS.map((participant) => {
                  const isSender = participant.id === sender;
                  const received = lastRecipients.includes(participant.id);
                  return (
                    <div
                      className={
                        "min-w-0 rounded-control border p-3 transition-colors " +
                        (isSender
                          ? "border-accent bg-accent/10"
                          : received
                            ? "border-success bg-success/5"
                            : "border-border")
                      }
                      key={participant.id}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-primary">{participant.name}</span>
                        <span className="text-[11px] text-secondary">
                          {isSender ? "发送者" : received ? "本轮接收" : "待命"}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-secondary">{participant.role}</p>
                    </div>
                  );
                })}
              </div>

              <div className="hidden text-center text-xs text-accent sm:block" aria-hidden="true">
                →
                <span className="mt-1 block text-[10px] text-secondary">send</span>
              </div>

              <div className="min-w-0 rounded-card border border-accent/60 bg-accent/10 p-4 text-center">
                <p className="text-xs font-semibold text-accent">ChatMediator</p>
                <p className="mt-2 text-xs leading-5 text-secondary">
                  {directLinks ? "中心之外出现旁路边" : "集中保存路由协议"}
                </p>
                <div className="mt-3 border-t border-accent/30 pt-3 text-left text-xs text-secondary">
                  <span className="text-accent">当前消息：</span> {MESSAGES[messageKind].label}
                </div>
              </div>
            </div>

            <p aria-live="polite" className="mt-4 rounded-control border border-border px-3 py-2 text-xs leading-5 text-primary" role="status">
              {status}
            </p>

            <div className="mt-4 space-y-2">
              <p className="text-xs font-semibold text-secondary">事件轨迹</p>
              {traces.length === 0 ? (
                <p className="rounded-control border border-dashed border-border px-3 py-3 text-xs text-secondary">
                  还没有事件；先点击一个不是当前状态的发送者按钮。
                </p>
              ) : (
                traces.slice(-4).map((trace) => (
                  <div className={"rounded-control border px-3 py-2 text-xs " + toneClass(trace.tone)} key={trace.id}>
                    <p className="font-semibold">{trace.id}. {trace.label}</p>
                    <p className="mt-1 leading-5 text-secondary">{trace.detail}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
