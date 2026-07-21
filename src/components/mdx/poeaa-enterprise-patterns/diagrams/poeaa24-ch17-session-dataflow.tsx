/**
 * <Poeaa24Ch17SessionDataFlow>：会话状态模式数据流向图（POEAA 第17章概览）。
 *
 * 展示 3 种存储位置的数据流向：
 *   Client Session State / Server Session State / Database Session State
 *
 * 纯静态展示，无交互。Server Component。
 */

import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 420;

const STRATEGIES = [
  {
    name: "Client Session",
    desc: "状态存在客户端",
    flow: "服务器 → 序列化 → Cookie/URL/隐藏字段 → 客户端",
    recovery: "无状态服务器，随时可切换节点",
    risk: "数据暴露、大小受限",
    color: "#3FB97F",
  },
  {
    name: "Server Session",
    desc: "状态存在服务器内存",
    flow: "客户端 → Session ID → 服务器内存 Map",
    recovery: "服务器崩溃 = 状态丢失",
    risk: "粘性会话、内存压力",
    color: "#E5B567",
  },
  {
    name: "Database Session",
    desc: "状态存在数据库",
    flow: "客户端 → Session ID → DB 表（持久化）",
    recovery: "服务器崩溃后可从 DB 恢复",
    risk: "每次请求都访问 DB",
    color: T.accent,
  },
] as const;

export function Poeaa24Ch17SessionDataFlow() {
  const startX = 48;
  const startY = 72;
  const rowH = 104;
  const boxW = 624;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="会话状态模式数据流向图。三种存储位置按行排列：Client Session 把状态序列化到客户端（Cookie/URL），服务器无状态；Server Session 把状态存在服务器内存，用 Session ID 关联；Database Session 把状态持久化到数据库表，崩溃后可恢复。每种标注数据流、恢复能力和风险。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle x={VIEW_W / 2} y={36} text="会话状态：三种存储位置的数据流" />

          {STRATEGIES.map((s, i) => {
            const y = startY + i * rowH;
            return (
              <g key={s.name}>
                <rect x={startX} y={y} width={boxW} height={92} rx="8" fill={s.color} fillOpacity="0.04" stroke={s.color} strokeWidth="1.5" />
                {/* 模式名 */}
                <text x={startX + 12} y={y + 22} fontSize="13" fontWeight="700" fill={s.color}>{s.name}</text>
                <text x={startX + 160} y={y + 22} fontSize="10" fill={T.secondary}>{s.desc}</text>
                {/* 数据流 */}
                <text x={startX + 12} y={y + 44} fontSize="10" fontFamily="monospace" fill={T.primary}>{s.flow}</text>
                {/* 恢复 + 风险 */}
                <text x={startX + 12} y={y + 64} fontSize="10" fill="#3FB97F">恢复：{s.recovery}</text>
                <text x={startX + 12} y={y + 82} fontSize="10" fill={T.danger}>风险：{s.risk}</text>
              </g>
            );
          })}

          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 12} text="选择依据：状态大小 × 恢复需求 × 服务器是否无状态" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        会话状态模式族包含三种存储位置。Client Session 让服务器无状态但数据暴露，
        Server Session 简单但崩溃即丢失，Database Session 可恢复但每次请求都访问 DB。
      </figcaption>
    </figure>
  );
}
