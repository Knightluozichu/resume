/**
 * POEAA 全书共享 SVG 原语。
 *
 * 提供 6 类可复用图形元素，供各章节/模式专属解剖图组合使用：
 *   - PoeaaBox：UML 风格类/模块框（标题区 + 属性区 + 方法区）
 *   - PoeaaArrow：带标签箭头（实线/虚线、实心/空心）
 *   - PoeaaSwimlane：泳道容器（时序图）
 *   - PoeaaLayerStack：层叠盒子（分层架构图）
 *   - PoeaaStateNode：状态机节点（圆角矩形）
 *   - PoeaaComparePanel：左右对比面板
 *
 * Server Component（无 "use client"），全部使用 DESIGN token 配色。
 * 遵守 docs/diagram-layout-rules.md。
 */

import type { ReactNode } from "react";

// ─── DESIGN tokens ───────────────────────────────────────────────────────────

export const T = {
  accent: "var(--accent)",
  accentGlow: "var(--accent-glow)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  border: "var(--border)",
  elevated: "var(--bg-elevated)",
  bg: "var(--bg)",
  success: "#3FB97F",
  warning: "#E5B567",
  danger: "#E5675C",
} as const;

// ─── PoeaaBox：UML 风格类/模块框 ─────────────────────────────────────────────

export type PoeaaBoxProps = {
  x: number;
  y: number;
  width: number;
  /** 标题栏高度（默认 28） */
  titleH?: number;
  title: string;
  /** 属性行 */
  attributes?: readonly string[];
  /** 方法行 */
  methods?: readonly string[];
  /** 标题栏强调色（默认 accent） */
  color?: string;
  /** 是否虚线边框（接口风格） */
  dashed?: boolean;
  /** 标题是否斜体（接口/抽象） */
  italic?: boolean;
};

export function PoeaaBox({
  x,
  y,
  width,
  titleH = 28,
  title,
  attributes = [],
  methods = [],
  color = T.accent,
  dashed = false,
  italic = false,
}: PoeaaBoxProps) {
  const LINE_H = 18;
  const PAD = 12;
  const attrH = attributes.length > 0 ? attributes.length * LINE_H + PAD : 0;
  const methH = methods.length > 0 ? methods.length * LINE_H + PAD : 0;
  const totalH = titleH + attrH + methH;

  return (
    <g>
      {/* 外框 */}
      <rect
        x={x}
        y={y}
        width={width}
        height={totalH}
        rx="8"
        fill={T.elevated}
        stroke={color}
        strokeWidth="1.5"
        strokeDasharray={dashed ? "6 3" : undefined}
      />
      {/* 标题栏背景 */}
      <rect
        x={x}
        y={y}
        width={width}
        height={titleH}
        rx="8"
        fill={color}
        fillOpacity="0.1"
      />
      {/* 标题栏底部分隔线（覆盖底部圆角） */}
      <rect
        x={x}
        y={y + titleH - 8}
        width={width}
        height={8}
        fill={color}
        fillOpacity="0.1"
      />
      <line
        x1={x}
        y1={y + titleH}
        x2={x + width}
        y2={y + titleH}
        stroke={T.border}
        strokeWidth="1"
      />
      {/* 标题文字 */}
      <text
        x={x + width / 2}
        y={y + titleH / 2 + 5}
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fontStyle={italic ? "italic" : "normal"}
        fill={T.primary}
        fontFamily="monospace"
      >
        {title}
      </text>
      {/* 属性区 */}
      {attributes.length > 0 && (
        <>
          {attributes.map((attr, i) => (
            <text
              key={`attr-${i}`}
              x={x + PAD}
              y={y + titleH + PAD + i * LINE_H + 10}
              fontSize="11"
              fill={T.secondary}
              fontFamily="monospace"
            >
              {attr}
            </text>
          ))}
          {/* 属性/方法分隔线 */}
          {methods.length > 0 && (
            <line
              x1={x}
              y1={y + titleH + attrH}
              x2={x + width}
              y2={y + titleH + attrH}
              stroke={T.border}
              strokeWidth="1"
            />
          )}
        </>
      )}
      {/* 方法区 */}
      {methods.map((meth, i) => (
        <text
          key={`meth-${i}`}
          x={x + PAD}
          y={y + titleH + attrH + PAD + i * LINE_H + 10}
          fontSize="11"
          fill={T.primary}
          fontFamily="monospace"
        >
          {meth}
        </text>
      ))}
    </g>
  );
}

// ─── PoeaaArrow：带标签箭头 ──────────────────────────────────────────────────

export type PoeaaArrowProps = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label?: string;
  color?: string;
  dashed?: boolean;
  /** 空心箭头（继承/实现） */
  open?: boolean;
  /** 标签偏移（默认箭头中点上方） */
  labelDx?: number;
  labelDy?: number;
  markerId: string;
};

export function PoeaaArrow({
  x1,
  y1,
  x2,
  y2,
  label,
  color = T.accent,
  dashed = false,
  open = false,
  labelDx = 0,
  labelDy = -8,
  markerId,
}: PoeaaArrowProps) {
  const midX = (x1 + x2) / 2 + labelDx;
  const midY = (y1 + y2) / 2 + labelDy;

  return (
    <g>
      <defs>
        <marker
          id={markerId}
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="5"
          orient="auto"
        >
          {open ? (
            <path
              d="M1 1 L9 5 L1 9"
              fill="none"
              stroke={color}
              strokeWidth="1.5"
            />
          ) : (
            <path d="M0 0 L9 5 L0 10 z" fill={color} />
          )}
        </marker>
      </defs>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth="1.5"
        strokeDasharray={dashed ? "6 3" : undefined}
        markerEnd={`url(#${markerId})`}
      />
      {label && (
        <text
          x={midX}
          y={midY}
          textAnchor="middle"
          fontSize="11"
          fill={color}
        >
          {label}
        </text>
      )}
    </g>
  );
}

// ─── PoeaaSwimlane：泳道容器 ─────────────────────────────────────────────────

export type PoeaaSwimlaneProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  color?: string;
  children?: ReactNode;
};

export function PoeaaSwimlane({
  x,
  y,
  width,
  height,
  label,
  color = T.accent,
  children,
}: PoeaaSwimlaneProps) {
  return (
    <g>
      {/* 泳道背景 */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx="8"
        fill={color}
        fillOpacity="0.04"
        stroke={color}
        strokeWidth="1"
        strokeOpacity="0.4"
      />
      {/* 泳道标签 */}
      <rect
        x={x}
        y={y}
        width={width}
        height={28}
        rx="8"
        fill={color}
        fillOpacity="0.1"
      />
      <rect
        x={x}
        y={y + 20}
        width={width}
        height={8}
        fill={color}
        fillOpacity="0.1"
      />
      <text
        x={x + width / 2}
        y={y + 18}
        textAnchor="middle"
        fontSize="12"
        fontWeight="600"
        fill={color}
      >
        {label}
      </text>
      {children}
    </g>
  );
}

// ─── PoeaaLayerStack：层叠盒子 ───────────────────────────────────────────────

export type LayerDef = {
  label: string;
  en?: string;
  color: string;
  items?: readonly string[];
};

export type PoeaaLayerStackProps = {
  x: number;
  y: number;
  width: number;
  layers: readonly LayerDef[];
  layerH?: number;
  gap?: number;
};

export function PoeaaLayerStack({
  x,
  y,
  width,
  layers,
  layerH = 48,
  gap = 8,
}: PoeaaLayerStackProps) {
  return (
    <g>
      {layers.map((layer, i) => {
        const ly = y + i * (layerH + gap);
        return (
          <g key={layer.label}>
            <rect
              x={x}
              y={ly}
              width={width}
              height={layerH}
              rx="8"
              fill={layer.color}
              fillOpacity="0.08"
              stroke={layer.color}
              strokeWidth="1.5"
            />
            <text
              x={x + 16}
              y={ly + (layer.en ? 20 : layerH / 2 + 5)}
              fontSize="13"
              fontWeight="600"
              fill={layer.color}
            >
              {layer.label}
            </text>
            {layer.en && (
              <text
                x={x + 16}
                y={ly + 36}
                fontSize="11"
                fill={T.secondary}
              >
                {layer.en}
              </text>
            )}
            {/* 层内组件标签 */}
            {layer.items &&
              layer.items.map((item, j) => {
                const cols = layer.items!.length;
                const cellW = (width - 32) / cols;
                const cx = x + 16 + j * cellW + cellW / 2;
                return (
                  <text
                    key={item}
                    x={cx}
                    y={ly + layerH - 10}
                    textAnchor="middle"
                    fontSize="10"
                    fill={T.secondary}
                  >
                    {item}
                  </text>
                );
              })}
          </g>
        );
      })}
    </g>
  );
}

// ─── PoeaaStateNode：状态机节点 ──────────────────────────────────────────────

export type PoeaaStateNodeProps = {
  x: number;
  y: number;
  width?: number;
  height?: number;
  label: string;
  sub?: string;
  color?: string;
  /** 是否为初始/终止态（圆形） */
  circle?: boolean;
};

export function PoeaaStateNode({
  x,
  y,
  width = 120,
  height = 44,
  label,
  sub,
  color = T.accent,
  circle = false,
}: PoeaaStateNodeProps) {
  if (circle) {
    const r = 12;
    return (
      <g>
        <circle
          cx={x + r}
          cy={y + r}
          r={r}
          fill={color}
          fillOpacity="0.15"
          stroke={color}
          strokeWidth="2"
        />
        <circle cx={x + r} cy={y + r} r={5} fill={color} />
      </g>
    );
  }

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx="10"
        fill={T.elevated}
        stroke={color}
        strokeWidth="1.5"
      />
      <text
        x={x + width / 2}
        y={y + (sub ? height / 2 - 2 : height / 2 + 5)}
        textAnchor="middle"
        fontSize="12"
        fontWeight="600"
        fill={T.primary}
      >
        {label}
      </text>
      {sub && (
        <text
          x={x + width / 2}
          y={y + height / 2 + 14}
          textAnchor="middle"
          fontSize="10"
          fill={T.secondary}
        >
          {sub}
        </text>
      )}
    </g>
  );
}

// ─── PoeaaComparePanel：左右对比面板 ─────────────────────────────────────────

export type PoeaaComparePanelProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  leftTitle: string;
  rightTitle: string;
  leftColor?: string;
  rightColor?: string;
  children?: ReactNode;
};

export function PoeaaComparePanel({
  x,
  y,
  width,
  height,
  leftTitle,
  rightTitle,
  leftColor = T.success,
  rightColor = T.warning,
  children,
}: PoeaaComparePanelProps) {
  const halfW = (width - 16) / 2;

  return (
    <g>
      {/* 左面板 */}
      <rect
        x={x}
        y={y}
        width={halfW}
        height={height}
        rx="8"
        fill={leftColor}
        fillOpacity="0.05"
        stroke={leftColor}
        strokeWidth="1.2"
      />
      <text
        x={x + halfW / 2}
        y={y + 20}
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={leftColor}
      >
        {leftTitle}
      </text>
      <line
        x1={x}
        y1={y + 32}
        x2={x + halfW}
        y2={y + 32}
        stroke={leftColor}
        strokeWidth="0.8"
        strokeOpacity="0.4"
      />
      {/* 右面板 */}
      <rect
        x={x + halfW + 16}
        y={y}
        width={halfW}
        height={height}
        rx="8"
        fill={rightColor}
        fillOpacity="0.05"
        stroke={rightColor}
        strokeWidth="1.2"
      />
      <text
        x={x + halfW + 16 + halfW / 2}
        y={y + 20}
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={rightColor}
      >
        {rightTitle}
      </text>
      <line
        x1={x + halfW + 16}
        y1={y + 32}
        x2={x + width}
        y2={y + 32}
        stroke={rightColor}
        strokeWidth="0.8"
        strokeOpacity="0.4"
      />
      {/* VS 标记 */}
      <text
        x={x + width / 2}
        y={y + height / 2 + 4}
        textAnchor="middle"
        fontSize="11"
        fontWeight="700"
        fill={T.secondary}
      >
        VS
      </text>
      {children}
    </g>
  );
}

// ─── 辅助：图标题 ────────────────────────────────────────────────────────────

export function DiagramTitle({
  x,
  y,
  text,
}: {
  x: number;
  y: number;
  text: string;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fontSize="16"
      fontWeight="700"
      fill={T.primary}
    >
      {text}
    </text>
  );
}

// ─── 辅助：图底部总结 ────────────────────────────────────────────────────────

export function DiagramCaption({
  x,
  y,
  text,
}: {
  x: number;
  y: number;
  text: string;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fontSize="11"
      fill={T.secondary}
    >
      {text}
    </text>
  );
}
