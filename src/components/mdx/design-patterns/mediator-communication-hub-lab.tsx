"use client";

import { useId, useMemo, useState } from "react";

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

// 原始广播基线：与正文 M1/M2 同一注册、排除发送者和同步通知合同。
interface Participant {
  readonly name: string;
  notify(message: MessageKind): void;
}

interface ChatMediator {
  register(participant: Participant): void;
  send(sender: Participant, message: MessageKind): string[];
}

export class RoomMediator implements ChatMediator {
  private readonly participants: Participant[] = [];

  register(participant: Participant) {
    this.participants.push(participant);
  }

  send(sender: Participant, message: MessageKind) {
    const recipients = this.participants.filter(
      (participant) => participant !== sender,
    );
    recipients.forEach((participant) => participant.notify(message));
    return recipients.map((participant) => participant.name);
  }
}

type Delivery = {
  recipient: ParticipantId;
  message: MessageKind;
  route: "mediator" | "direct";
};

// 每次 UI 操作只运行一轮；列表记录真实 notify 回调，不把集合当投递次数。
export function runMediatorRound(
  sender: ParticipantId,
  message: MessageKind,
  directLinks: boolean,
) {
  const deliveries: Delivery[] = [];
  let route: Delivery["route"] = "mediator";
  const participants = PARTICIPANTS.map(({ id, name }) => ({
    id,
    name,
    notify(received: MessageKind) {
      deliveries.push({ recipient: id, message: received, route });
    },
  }));
  const mediator = new RoomMediator();
  participants.forEach((participant) => mediator.register(participant));
  const senderObject = participants.find(
    (participant) => participant.id === sender,
  )!;
  const recipients = mediator.send(senderObject, message);
  if (directLinks) {
    route = "direct";
    participants[0].notify(message); // 故障：直接通知 Alice，允许重复与自收。
  }
  return { recipients, deliveries };
}

function toneClass(tone: Tone) {
  if (tone === "success") return "border-success text-success";
  if (tone === "warning") return "border-warning text-warning";
  return "border-border text-secondary";
}

export function MediatorCommunicationHubLab() {
  const markerId = useId();
  const [lastSender, setLastSender] = useState<ParticipantId | null>(null);
  const [sender, setSender] = useState<ParticipantId>("alice");
  const [messageKind, setMessageKind] = useState<MessageKind>("deploy");
  const [directLinks, setDirectLinks] = useState(false);
  const [sentCount, setSentCount] = useState(0);
  const [lastDeliveries, setLastDeliveries] = useState<Delivery[]>([]);
  const [traces, setTraces] = useState<Trace[]>([]);
  const [status, setStatus] = useState(
    "基线：Alice 准备通过 ChatMediator 发送 deploy。",
  );

  const senderName = useMemo(
    () =>
      PARTICIPANTS.find((participant) => participant.id === sender)?.name ??
      sender,
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
    const name = PARTICIPANTS.find(
      (participant) => participant.id === next,
    )?.name;
    setStatus(`${name} 已成为发送者；先预测中介者会通知哪些参与者。`);
    addTrace(
      "选择发送者",
      directLinks
        ? `${name} 已选中；旁路开启，发送时还会直接通知 Alice。`
        : `${name} 只依赖 ChatMediator，不直接持有其他参与者。`,
      "neutral",
    );
  }

  function chooseMessage(next: MessageKind) {
    setMessageKind(next);
    setStatus(`消息已改为 ${MESSAGES[next].label}：${MESSAGES[next].detail}。`);
    addTrace(
      "选择消息",
      `${senderName} 将把 ${MESSAGES[next].label} 交给中介者路由。`,
      "neutral",
    );
  }

  function sendMessage() {
    const { recipients, deliveries } = runMediatorRound(
      sender,
      messageKind,
      directLinks,
    );
    const sequence = deliveries
      .map((delivery) => {
        const name = PARTICIPANTS.find(
          (participant) => participant.id === delivery.recipient,
        )!.name;
        return `${name}（${delivery.route === "mediator" ? "中介者" : "旁路"}）`;
      })
      .join(" → ");
    setSentCount((count) => count + 1);
    setLastDeliveries(deliveries);
    setLastSender(sender);
    setStatus(
      `${directLinks ? "反例" : "广播基线"}：${senderName} 发送 ${messageKind}；实际投递 ${deliveries.length} 次：${sequence}。`,
    );
    addTrace(
      directLinks ? "旁路直连：追加一次实际投递" : "中介者路由",
      `${senderName} → ChatMediator → ${recipients.join("、")}；${directLinks ? "随后直接调用 Alice.notify，可能重复或自收。" : "发送者不接收自己的消息。"}`,
      directLinks ? "warning" : "success",
    );
  }

  function toggleDirectLinks() {
    const next = !directLinks;
    setDirectLinks(next);
    setStatus(
      next
        ? "已注入旁路直连反例；下一次发送会在中介者之后直接通知 Alice。"
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
    setLastDeliveries([]);
    setLastSender(null);
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
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-accent">
              MEDIATOR · ROUTE · BOUNDARY
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              聊天室中介者路由实验台
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              原始广播基线：三种消息都通知除发送者外的参与者，不对应练习改后的
              alert 专投规则。旁路会额外通知 Alice，投递列表保留重复与自收。
            </p>
          </div>
          <button
            aria-label="重置中介者模式聊天室协作实验"
            className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary"
            onClick={reset}
            type="button"
          >
            重置实验
          </button>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="min-w-0 space-y-4">
            <div>
              <p className="text-sm font-semibold text-secondary">选择发送者</p>
              <div className="mt-2 grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
                {(["bob", "alice", "monitor"] as ParticipantId[]).map((id) => {
                  const participant = PARTICIPANTS.find(
                    (item) => item.id === id,
                  );
                  if (!participant) return null;
                  return (
                    <button
                      aria-pressed={sender === id}
                      className={
                        "min-h-11 min-w-0 rounded-control border px-3 py-2 text-left text-sm transition-colors " +
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
              <p className="text-sm font-semibold text-secondary">
                选择消息类型
              </p>
              <div className="mt-2 grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
                {(["question", "deploy", "alert"] as MessageKind[]).map(
                  (kind) => (
                    <button
                      aria-pressed={messageKind === kind}
                      className={
                        "min-h-11 min-w-0 rounded-control border px-3 py-2 text-left text-sm transition-colors " +
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
                  ),
                )}
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              <button
                className="min-h-11 rounded-control border border-accent px-3 py-2 text-left text-sm text-accent transition-colors hover:bg-accent/10"
                onClick={sendMessage}
                type="button"
              >
                通过 ChatMediator 发送
              </button>
              <button
                aria-pressed={directLinks}
                className={
                  "min-h-11 rounded-control border px-3 py-2 text-left text-sm transition-colors " +
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
            <p className="text-sm leading-5 text-secondary">
              先预测接收者，再发送一次；打开反例后重复发送，比较路径和耦合边的变化。
            </p>
          </div>

          <div className="min-w-0 rounded-card border border-border bg-[var(--bg)] p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">
                PARTICIPANTS → MEDIATOR → PARTICIPANTS
              </p>
              <span className="rounded-control border border-border px-2 py-1 text-sm text-secondary">
                已发送 {sentCount} 次
              </span>
            </div>

            <svg
              aria-label="广播基线路由结构：高亮边来自最近一轮实际投递，旁路到 Alice 可重复或自收"
              className="mt-4 block w-full"
              data-last-sender={lastSender ?? "none"}
              data-delivery-count={lastDeliveries.length}
              data-testid="mediator-routing-diagram"
              role="img"
              viewBox="0 0 330 360"
            >
              <defs>
                <marker
                  id={markerId}
                  markerWidth="7"
                  markerHeight="7"
                  refX="6"
                  refY="3.5"
                  orient="auto-start-reverse"
                >
                  <path d="M0 0 L7 3.5 L0 7 Z" fill="context-stroke" />
                </marker>
              </defs>
              {PARTICIPANTS.map((participant) => {
                const points = {
                  alice: { x: 165, y: 48, edge: "M165 121 L165 80" },
                  bob: { x: 50, y: 288, edge: "M130 205 L78 258" },
                  monitor: { x: 280, y: 288, edge: "M200 205 L252 258" },
                }[participant.id];
                const count = lastDeliveries.filter(
                  (delivery) => delivery.recipient === participant.id,
                ).length;
                const routed = lastDeliveries.some(
                  (delivery) =>
                    delivery.recipient === participant.id &&
                    delivery.route === "mediator",
                );
                const sent = lastSender === participant.id;
                return (
                  <g
                    key={participant.id}
                    data-participant={participant.id}
                    data-received={count}
                  >
                    <path
                      d={points.edge}
                      fill="none"
                      stroke="var(--border)"
                      strokeWidth="2"
                    />
                    {(sent || routed) && (
                      <path
                        d={points.edge}
                        data-route={sent ? "send" : "mediator"}
                        data-from={sent ? participant.id : "hub"}
                        data-to={sent ? "hub" : participant.id}
                        fill="none"
                        stroke={sent ? "var(--accent)" : "var(--success)"}
                        strokeWidth="3"
                        markerStart={sent ? `url(#${markerId})` : undefined}
                        markerEnd={routed ? `url(#${markerId})` : undefined}
                      />
                    )}
                    <ellipse
                      cx={points.x}
                      cy={points.y}
                      rx="47"
                      ry="29"
                      fill="var(--bg)"
                      stroke={
                        sent
                          ? "var(--accent)"
                          : count
                            ? "var(--success)"
                            : "var(--border)"
                      }
                      strokeWidth="2"
                    />
                    <text
                      x={points.x}
                      y={points.y + 7}
                      textAnchor="middle"
                      fontSize="20"
                      fill="var(--text-primary)"
                    >
                      {participant.name}
                    </text>
                    <text
                      x={points.x + (participant.id === "alice" ? 100 : 0)}
                      y={points.y + (participant.id === "alice" ? 7 : 56)}
                      textAnchor="middle"
                      fontSize="20"
                      fill="var(--text-secondary)"
                    >
                      ×{count}
                    </text>
                  </g>
                );
              })}
              <circle
                cx="165"
                cy="170"
                r="48"
                fill="var(--bg)"
                stroke="var(--accent)"
                strokeWidth="2"
              />
              <text
                x="165"
                y="177"
                textAnchor="middle"
                fontSize="20"
                fill="var(--accent)"
              >
                Mediator
              </text>
              {lastDeliveries.some(
                (delivery) => delivery.route === "direct",
              ) && (
                <path
                  d={
                    lastSender === "alice"
                      ? "M132 27 C50 3 50 101 128 65"
                      : lastSender === "bob"
                        ? "M50 257 Q10 85 119 48"
                        : "M280 257 Q320 85 211 48"
                  }
                  data-route="direct"
                  data-from={lastSender ?? "none"}
                  data-to="alice"
                  data-self-delivery={lastSender === "alice"}
                  fill="none"
                  stroke="var(--warning)"
                  strokeWidth="3"
                  strokeDasharray="6 4"
                  markerEnd={`url(#${markerId})`}
                />
              )}
            </svg>
            <p className="text-sm leading-6 text-secondary">
              实线：经中介者发送与投递；虚线：真实旁路。× 表示本轮接收回调次数。
              图保留最近一轮结果，切换选项后需再发送；重置后无高亮边。
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
              <div className="grid gap-2">
                {PARTICIPANTS.map((participant) => {
                  const isSender = participant.id === (lastSender ?? sender);
                  const receivedCount = lastDeliveries.filter(
                    (delivery) => delivery.recipient === participant.id,
                  ).length;
                  const received = receivedCount > 0;
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
                        <span className="text-sm font-semibold text-primary">
                          {participant.name}
                        </span>
                        <span className="text-sm text-secondary">
                          {isSender
                            ? `${lastSender ? "上轮发送者" : "待发送者"}${received ? ` · 自收 ${receivedCount} 次` : ""}`
                            : received
                              ? `本轮接收 ${receivedCount} 次`
                              : "待命"}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-secondary">
                        {participant.role}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div
                className="hidden text-center text-sm text-accent sm:block"
                aria-hidden="true"
              >
                →<span className="mt-1 block text-sm text-secondary">send</span>
              </div>

              <div className="min-w-0 rounded-card border border-accent/60 bg-accent/10 p-4 text-center">
                <p className="text-sm font-semibold text-accent">
                  ChatMediator
                </p>
                <p className="mt-2 text-sm leading-5 text-secondary">
                  {directLinks
                    ? "中心之外追加真实旁路投递"
                    : "集中保存广播基线路由"}
                </p>
                <div className="mt-3 border-t border-accent/30 pt-3 text-left text-sm text-secondary">
                  <span className="text-accent">当前消息：</span>{" "}
                  {MESSAGES[messageKind].label}
                </div>
              </div>
            </div>

            <p
              aria-live="polite"
              className="mt-4 rounded-control border border-border px-3 py-2 text-sm leading-5 text-primary"
              role="status"
            >
              {status}
            </p>

            <div className="mt-4 space-y-2">
              <p className="text-sm font-semibold text-secondary">
                本轮实际投递（notify 回调）
              </p>
              {lastDeliveries.length === 0 ? (
                <p className="text-sm text-secondary">尚无投递。</p>
              ) : (
                <ol
                  className="space-y-1 text-sm text-secondary"
                  aria-label="本轮实际投递"
                >
                  {lastDeliveries.map((delivery, index) => (
                    <li key={index}>
                      {index + 1}.{" "}
                      {
                        PARTICIPANTS.find(
                          (participant) =>
                            participant.id === delivery.recipient,
                        )!.name
                      }
                      {" ← "}
                      {delivery.route === "mediator"
                        ? "ChatMediator"
                        : "旁路直连"}
                      {" · "}
                      {delivery.message}
                    </li>
                  ))}
                </ol>
              )}
              <p className="text-sm font-semibold text-secondary">事件轨迹</p>
              {traces.length === 0 ? (
                <p className="rounded-control border border-dashed border-border px-3 py-3 text-sm text-secondary">
                  还没有事件；先点击一个不是当前状态的发送者按钮。
                </p>
              ) : (
                traces.slice(-4).map((trace) => (
                  <div
                    className={
                      "rounded-control border px-3 py-2 text-sm " +
                      toneClass(trace.tone)
                    }
                    key={trace.id}
                  >
                    <p className="font-semibold">
                      {trace.id}. {trace.label}
                    </p>
                    <p className="mt-1 leading-5 text-secondary">
                      {trace.detail}
                    </p>
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
