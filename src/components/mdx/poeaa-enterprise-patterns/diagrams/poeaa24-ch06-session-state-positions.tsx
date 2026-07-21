/**
 * <Poeaa24Ch06SessionStatePositions>：会话状态三种存储位置对比图（POEAA 第6章）。
 *
 * 展示 Client Session State / Server Session State / Database Session State
 * 三种方案的数据流、故障恢复和适用场景。
 *
 * 纯静态展示，无交互。Server Component。
 */

import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 440;

const PANEL_W = 208;
const PANEL_H = 280;
const PANEL_Y = 72;
const GAP = 16;
const START_X = 32;

const POSITIONS = [
  {
    title: "客户端会话",
    en: "Client Session State",
    color: "#3FB97F",
    where: "浏览器 / 移动设备",
    how: "Cookie · URL · 隐藏字段",
    pro: "服务器无状态，易扩展",
    con: "数据量受限，安全性差",
    fail: "清除缓存 = 状态丢失",
  },
  {
    title: "服务器会话",
    en: "Server Session State",
    color: T.accent,
    where: "应用服务器内存",
    how: "Session ID → 内存对象",
    pro: "读写快，数据量不限",
    con: "服务器故障 = 状态丢失",
    fail: "需粘性会话或复制",
  },
  {
    title: "数据库会话",
    en: "Database Session State",
    color: "#E5B567",
    where: "数据库表",
    how: "Session ID → 表行",
    pro: "持久化，任意节点可恢复",
    con: "每次读写都走数据库",
    fail: "性能瓶颈，需定期清理",
  },
] as const;

export function Poeaa24Ch06SessionStatePositions() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="会话状态三种存储位置对比。左：客户端会话，数据存在浏览器，服务器无状态易扩展，但数据量受限且安全性差。中：服务器会话，数据存在应用服务器内存，读写快但服务器故障会丢失状态。右：数据库会话，数据持久化到数据库表，任意节点可恢复但每次读写都走数据库。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle x={VIEW_W / 2} y={40} text="会话状态：三种存储位置" />

          {POSITIONS.map((p, i) => {
            const px = START_X + i * (PANEL_W + GAP);
            return (
              <g key={p.title}>
                <rect x={px} y={PANEL_Y} width={PANEL_W} height={PANEL_H} rx="10" fill={p.color} fillOpacity="0.04" stroke={p.color} strokeWidth="1.5" />
                <text x={px + PANEL_W / 2} y={PANEL_Y + 24} textAnchor="middle" fontSize="13" fontWeight="700" fill={p.color}>{p.title}</text>
                <text x={px + PANEL_W / 2} y={PANEL_Y + 42} textAnchor="middle" fontSize="10" fill={T.secondary}>{p.en}</text>
                <line x1={px} y1={PANEL_Y + 52} x2={px + PANEL_W} y2={PANEL_Y + 52} stroke={p.color} strokeWidth="0.8" strokeOpacity="0.4" />

                <text x={px + 14} y={PANEL_Y + 74} fontSize="11" fontWeight="600" fill={T.primary}>存储位置</text>
                <text x={px + 14} y={PANEL_Y + 92} fontSize="11" fill={T.secondary}>{p.where}</text>

                <text x={px + 14} y={PANEL_Y + 118} fontSize="11" fontWeight="600" fill={T.primary}>实现方式</text>
                <text x={px + 14} y={PANEL_Y + 136} fontSize="11" fill={T.secondary}>{p.how}</text>

                <text x={px + 14} y={PANEL_Y + 162} fontSize="11" fontWeight="600" fill={T.primary}>优势</text>
                <text x={px + 14} y={PANEL_Y + 180} fontSize="11" fill="#3FB97F">{p.pro}</text>

                <text x={px + 14} y={PANEL_Y + 206} fontSize="11" fontWeight="600" fill={T.primary}>代价</text>
                <text x={px + 14} y={PANEL_Y + 224} fontSize="11" fill={T.danger}>{p.con}</text>

                <text x={px + 14} y={PANEL_Y + 250} fontSize="11" fontWeight="600" fill={T.primary}>故障恢复</text>
                <text x={px + 14} y={PANEL_Y + 268} fontSize="11" fill="#E5B567">{p.fail}</text>
              </g>
            );
          })}

          {/* 底部选择轴 */}
          <line x1={32} y1={PANEL_Y + PANEL_H + 20} x2={688} y2={PANEL_Y + PANEL_H + 20} stroke={T.border} strokeWidth="1" />
          <defs>
            <marker id="ch06-axis" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0 0 L7 4 L0 8 z" fill={T.secondary} />
            </marker>
          </defs>
          <line x1={60} y1={PANEL_Y + PANEL_H + 44} x2={660} y2={PANEL_Y + PANEL_H + 44} stroke={T.secondary} strokeWidth="1.2" markerEnd="url(#ch06-axis)" />
          <text x={60} y={PANEL_Y + PANEL_H + 62} fontSize="10" fill={T.secondary}>简单 / 无状态</text>
          <text x={600} y={PANEL_Y + PANEL_H + 62} fontSize="10" fill={T.secondary}>持久 / 可恢复</text>

          <text x={160} y={PANEL_Y + PANEL_H + 40} textAnchor="middle" fontSize="10" fontWeight="600" fill="#3FB97F">客户端</text>
          <text x={360} y={PANEL_Y + PANEL_H + 40} textAnchor="middle" fontSize="10" fontWeight="600" fill={T.accent}>服务器</text>
          <text x={560} y={PANEL_Y + PANEL_H + 40} textAnchor="middle" fontSize="10" fontWeight="600" fill="#E5B567">数据库</text>

          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 12} text="选择轴：状态量 × 持久性需求 × 扩展性要求" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        客户端会话让服务器无状态但数据量受限；服务器会话读写快但故障会丢失；
        数据库会话最持久但性能最差。选择取决于状态量、持久性需求和扩展性要求。
      </figcaption>
    </figure>
  );
}
