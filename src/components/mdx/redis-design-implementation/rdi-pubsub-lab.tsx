"use client";

import { useState, useCallback } from "react";

const C = {
  bg: "var(--bg)", elevated: "var(--bg-elevated)", border: "var(--border)",
  primary: "var(--text-primary)", secondary: "var(--text-secondary)",
  accent: "var(--accent)", danger: "var(--danger)", success: "var(--success)", warning: "var(--warning)",
} as const;

type Subscriber = { id: number; channel: string; pattern?: string };

const INITIAL_SUBS: Subscriber[] = [
  { id: 1, channel: "news" },
  { id: 2, channel: "news" },
  { id: 3, channel: "sports" },
  { id: 4, channel: "tech", pattern: "tech.*" },
];

export function RdiPubsubLab() {
  const [subs, setSubs] = useState<Subscriber[]>(INITIAL_SUBS);
  const [channel, setChannel] = useState("news");
  const [nextId, setNextId] = useState(5);
  const [messages, setMessages] = useState<string[]>([]);
  const [log, setLog] = useState<string[]>([
    "发布订阅：PUBLISH 向频道广播，SUBSCRIBE/PSUBSCRIBE 订阅。消息即发即弃，无订阅者则丢弃。",
  ]);

  const publish = useCallback(() => {
    const delivered: string[] = [];
    const deliveredSubs: string[] = [];
    for (const s of subs) {
      const match = s.pattern ? new RegExp(`^${s.pattern.replace(".", "\\.").replace("*", ".*")}$`).test(channel) : s.channel === channel;
      if (match) {
        delivered.push(`SUB#${s.id}`);
        deliveredSubs.push(s.id.toString());
      }
    }
    setMessages((prev) => [{ channel, to: deliveredSubs, ts: Date.now() % 100000 }, ...prev].slice(0, 6));
    setLog((prev) => [...prev, `PUBLISH "${channel}"：${delivered.length > 0 ? `送达 ${delivered.length} 个订阅者（${delivered.join("、")}）` : "无订阅者在线，消息丢弃"}`]);
  }, [subs, channel]);

  const addSub = useCallback(() => {
    const channels = ["news", "sports", "tech"];
    const c = channels[(nextId - 5) % channels.length];
    const hasPattern = nextId % 3 === 0;
    setSubs((prev) => [...prev, hasPattern ? { id: nextId, channel: "tech", pattern: "tech.*" } : { id: nextId, channel: c }]);
    setNextId((p) => p + 1);
    setLog((prev) => [...prev, `新订阅者 SUB#${nextId}：${hasPattern ? "PSUBSCRIBE tech.*" : `SUBSCRIBE ${c}`}`]);
  }, [nextId]);

  const reset = useCallback(() => {
    setSubs(INITIAL_SUBS);
    setChannel("news");
    setNextId(5);
    setMessages([]);
    setLog(["发布订阅：PUBLISH 向频道广播，SUBSCRIBE/PSUBSCRIBE 订阅。消息即发即弃，无订阅者则丢弃。"]);
  }, []);

  const viewW = 820;
  const viewH = 360;
  const pubX = 60;
  const pubY = 100;
  const chanX = 260;
  const subStartX = 460;

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-medium" style={{ color: C.primary }}>⚡ 发布订阅消息传递</span>
        <button onClick={reset} className="rounded-control border border-border px-3 py-1 text-xs transition-colors hover:border-accent" style={{ color: C.secondary }}>重置</button>
      </div>
      <div className="p-4">
        <svg viewBox={`0 0 ${viewW} ${viewH}`} className="w-full" role="img" aria-label="发布订阅">
          <text x={viewW / 2} y={36} textAnchor="middle" fontSize={15} fill={C.primary} fontWeight={600}>
            发布者 → 频道/模式 → 订阅者
          </text>

          {/* 发布者 */}
          <rect x={pubX} y={pubY} width={130} height={48} rx={8} fill={C.accent} opacity={0.85} />
          <text x={pubX + 65} y={pubY + 30} textAnchor="middle" fontSize={12} fontWeight={600} fill={C.bg}>发布者</text>

          {/* 频道 */}
          <rect x={chanX} y={pubY} width={150} height={48} rx={8} fill={C.elevated} stroke={C.warning} strokeWidth={1.5} />
          <text x={chanX + 75} y={pubY + 22} textAnchor="middle" fontSize={12} fontWeight={600} fill={C.primary}>频道</text>
          <text x={chanX + 75} y={pubY + 40} textAnchor="middle" fontSize={11} fill={C.warning} fontFamily="monospace">{channel}</text>

          {/* 箭头 */}
          <text x={(pubX + 130 + chanX) / 2} y={pubY + 30} textAnchor="middle" fontSize={16} fill={C.accent}>→</text>

          {/* 订阅者 */}
          {subs.map((s, i) => {
            const x = subStartX + (i % 3) * 120;
            const y2 = pubY + Math.floor(i / 3) * 60;
            const isChannelMatch = s.channel === channel;
            const isPatternMatch = s.pattern && new RegExp(`^${s.pattern.replace(".", "\\.").replace("*", ".*")}$`).test(channel);
            const receives = isChannelMatch || isPatternMatch;
            return (
              <g key={s.id}>
                <rect
                  x={x} y={y2} width={100} height={40} rx={6}
                  fill={receives ? C.success : C.bg}
                  stroke={receives ? C.success : C.border}
                  strokeWidth={receives ? 1.5 : 1}
                  opacity={receives ? 0.9 : 0.7}
                />
                <text x={x + 50} y={y2 + 17} textAnchor="middle" fontSize={11} fontWeight={600} fill={receives ? C.bg : C.primary}>
                  SUB#{s.id}
                </text>
                <text x={x + 50} y={y2 + 33} textAnchor="middle" fontSize={11} fill={receives ? "rgba(255,255,255,0.85)" : C.secondary}>
                  {s.pattern ?? s.channel}
                </text>
                {receives && (
                  <text x={x + 50} y={y2 - 6} textAnchor="middle" fontSize={11} fill={C.success}>⬇ 接收</text>
                )}
              </g>
            );
          })}
        </svg>

        {/* 操作 */}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <input
            value={channel}
            onChange={(e) => setChannel(e.target.value)}
            placeholder="输入频道名"
            className="w-32 rounded-control border border-border px-2 py-1.5 text-xs"
            style={{ background: C.bg, color: C.primary }}
          />
          <button
            onClick={publish}
            className="rounded-control border border-accent px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent/10"
            style={{ color: C.accent, borderColor: C.accent }}
          >
            PUBLISH（广播到频道/匹配模式）
          </button>
          <button
            onClick={addSub}
            className="rounded-control border border-success px-3 py-1.5 text-xs font-medium transition-colors hover:bg-success/10"
            style={{ color: C.success, borderColor: C.success }}
          >
            + 新订阅者
          </button>
          <button onClick={reset} className="rounded-control border border-border px-3 py-1.5 text-xs transition-colors" style={{ color: C.secondary }}>重置</button>
        </div>

        {/* 消息历史 */}
        <div className="mt-3 rounded-control border border-border p-3" style={{ background: C.bg }}>
          <div className="mb-1 text-xs font-semibold" style={{ color: C.primary }}>最近消息</div>
          {messages.length === 0 ? (
            <div className="text-xs" style={{ color: C.secondary }}>暂无发布（消息即发即弃，不持久化）</div>
          ) : (
            <div className="flex flex-col gap-1 text-xs" style={{ color: C.secondary }}>
              {messages.map((m, i) => (
                <div key={i}>
                  <span className="font-mono" style={{ color: C.accent }}>PUBLISH "{m.channel}"</span>
                  {" → "}
                  <span style={{ color: m.to.length > 0 ? C.success : C.danger }}>
                    {m.to.length > 0 ? `送达 SUB#${m.to.join(", #")}` : "无订阅者，丢弃"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 日志 */}
        <div className="mt-3 rounded-control border border-border p-3" style={{ background: C.bg }}>
          <div className="mb-1 text-xs font-semibold" style={{ color: C.primary }}>操作日志</div>
          <ol className="flex flex-col gap-1 text-xs" style={{ color: C.secondary }}>
            {log.map((line, i) => (
              <li key={i} className="leading-relaxed">
                <span className="mr-1 font-mono" style={{ color: C.accent }}>{i + 1}.</span>
                {line}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}