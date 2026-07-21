/**
 * <Poeaa24Ch09DomainLogicMap>：领域逻辑模式族地图（POEAA 第9章概览）。
 *
 * 展示 4 个模式在「复杂度 vs 结构化程度」象限中的适用位置：
 *   Transaction Script / Domain Model / Table Module / Service Layer
 *
 * 纯静态展示，无交互。Server Component。
 */

import { T, DiagramTitle, DiagramCaption } from "../poeaa-svg-primitives";

const VIEW_W = 720;
const VIEW_H = 400;

// 象限区域
const QX = 80;
const QY = 72;
const QW = 560;
const QH = 260;

export function Poeaa24Ch09DomainLogicMap() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="领域逻辑模式族地图。横轴为业务规则复杂度（低到高），纵轴为结构化程度（低到高）。事务脚本在左下（低复杂度、低结构化），表模块在左上（低复杂度、高结构化），领域模型在右上（高复杂度、低结构化），服务层横跨顶部作为应用入口。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <DiagramTitle x={VIEW_W / 2} y={40} text="领域逻辑模式族：适用象限" />

          {/* 坐标轴 */}
          <defs>
            <marker id="ch09-ax" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0 0 L7 4 L0 8 z" fill={T.secondary} />
            </marker>
          </defs>
          {/* X 轴 */}
          <line x1={QX} y1={QY + QH} x2={QX + QW} y2={QY + QH} stroke={T.secondary} strokeWidth="1.2" markerEnd="url(#ch09-ax)" />
          <text x={QX + QW / 2} y={QY + QH + 24} textAnchor="middle" fontSize="11" fill={T.secondary}>业务规则复杂度 →</text>
          {/* Y 轴 */}
          <line x1={QX} y1={QY + QH} x2={QX} y2={QY} stroke={T.secondary} strokeWidth="1.2" markerEnd="url(#ch09-ax)" />
          <text x={QX - 12} y={QY + QH / 2} textAnchor="middle" fontSize="11" fill={T.secondary} writingMode="vertical-rl">结构化程度 →</text>

          {/* 象限分隔 */}
          <line x1={QX + QW / 2} y1={QY} x2={QX + QW / 2} y2={QY + QH} stroke={T.border} strokeWidth="0.8" strokeDasharray="4 3" />
          <line x1={QX} y1={QY + QH / 2} x2={QX + QW} y2={QY + QH / 2} stroke={T.border} strokeWidth="0.8" strokeDasharray="4 3" />

          {/* Transaction Script - 左下 */}
          <rect x={QX + 40} y={QY + QH / 2 + 30} width={180} height={72} rx="8" fill="#3FB97F" fillOpacity="0.08" stroke="#3FB97F" strokeWidth="1.5" />
          <text x={QX + 130} y={QY + QH / 2 + 56} textAnchor="middle" fontSize="13" fontWeight="700" fill="#3FB97F">Transaction Script</text>
          <text x={QX + 130} y={QY + QH / 2 + 76} textAnchor="middle" fontSize="10" fill={T.secondary}>一个用例 = 一个过程</text>
          <text x={QX + 130} y={QY + QH / 2 + 92} textAnchor="middle" fontSize="10" fill={T.secondary}>规则少、分支少</text>

          {/* Table Module - 左上 */}
          <rect x={QX + 40} y={QY + 30} width={180} height={72} rx="8" fill="#E5B567" fillOpacity="0.08" stroke="#E5B567" strokeWidth="1.5" />
          <text x={QX + 130} y={QY + 56} textAnchor="middle" fontSize="13" fontWeight="700" fill="#E5B567">Table Module</text>
          <text x={QX + 130} y={QY + 76} textAnchor="middle" fontSize="10" fill={T.secondary}>一个类管一张表</text>
          <text x={QX + 130} y={QY + 92} textAnchor="middle" fontSize="10" fill={T.secondary}>结构化查询为主</text>

          {/* Domain Model - 右上 */}
          <rect x={QX + QW / 2 + 40} y={QY + QH / 2 + 30} width={180} height={72} rx="8" fill={T.accent} fillOpacity="0.08" stroke={T.accent} strokeWidth="1.5" />
          <text x={QX + QW / 2 + 130} y={QY + QH / 2 + 56} textAnchor="middle" fontSize="13" fontWeight="700" fill={T.accent}>Domain Model</text>
          <text x={QX + QW / 2 + 130} y={QY + QH / 2 + 76} textAnchor="middle" fontSize="10" fill={T.secondary}>对象网络 + 多态</text>
          <text x={QX + QW / 2 + 130} y={QY + QH / 2 + 92} textAnchor="middle" fontSize="10" fill={T.secondary}>规则复杂、频繁变化</text>

          {/* Service Layer - 横跨顶部 */}
          <rect x={QX + QW / 2 + 40} y={QY + 30} width={180} height={72} rx="8" fill={T.primary} fillOpacity="0.04" stroke={T.primary} strokeWidth="1.2" strokeDasharray="5 3" />
          <text x={QX + QW / 2 + 130} y={QY + 56} textAnchor="middle" fontSize="13" fontWeight="700" fill={T.primary}>Service Layer</text>
          <text x={QX + QW / 2 + 130} y={QY + 76} textAnchor="middle" fontSize="10" fill={T.secondary}>应用入口 + 事务边界</text>
          <text x={QX + QW / 2 + 130} y={QY + 92} textAnchor="middle" fontSize="10" fill={T.secondary}>横跨所有复杂度</text>

          <DiagramCaption x={VIEW_W / 2} y={VIEW_H - 12} text="复杂度增长时，从 Transaction Script 向 Domain Model 迁移；Service Layer 始终作为应用入口" />
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        领域逻辑模式族包含四个模式。Transaction Script 和 Table Module 适合简单场景，
        Domain Model 适合复杂规则，Service Layer 作为应用入口横跨所有复杂度。
      </figcaption>
    </figure>
  );
}
