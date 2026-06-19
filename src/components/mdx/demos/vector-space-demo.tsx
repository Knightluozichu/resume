"use client";

import { useState } from "react";

import { DemoStage } from "../controls";

/**
 * <VectorSpaceDemo>：2D 语义空间「embedding = 把意思变成位置，检索 = 找最近的邻居」
 * 交互演示（HEL-305，《RAG 检索增强生成》篇3·1，知识点 2/4）。
 *
 * 全书隐喻：AI Agent = 私人助理「小特」。RAG 的灵魂底层：把每段文本 embed 成一个向量
 * （空间里的一个点），意思相近的文本点离得近、聚成簇。检索一个问题，就是把问题也变成一个点，
 * 在空间里找离它最近的 top-k 个点（= 意思最相关的资料）。
 *
 * 这个 Demo：一个 2D 平面，散布几个短语点，意思相近的聚成簇（天气簇、股票簇、餐厅簇）。
 * 上方切换不同「查询点」，高亮离它最近的 top-k 个点（= 检索命中）。亲眼看见「换个查询，
 * 命中的簇就变了」——因为查询点落到了另一个簇附近。
 *
 * 关键教学点：embedding 把「意思」变成「空间位置」，检索就是「找空间里最近的邻居」——
 * 这就是为什么按意思（而不是关键词）找得回相关资料。
 *
 * 诚实声明：坐标是 canned 的、真实 embedding 是高维（几百~几千维），这里压成 2D 看个意思。
 * 必有重置（回第一个查询、k=2）。
 *
 * 为何 client：查询切换 / k 切换是真交互（受控状态），用状态直接算最近邻并高亮——这是
 * 「语义空间检索」在「没法在线跑 embedding」约束下的可视化落地。
 * 颜色 / 间距 / 圆角全部走 DESIGN token（硬规则 5）；单一坐标映射公式 toX/toY、
 * 所有 svg text 距 viewBox 边 ≥16px、点距边 ≥16px、字号 ≥10px（HEL-274/296/299 几何硬规则）。
 */

// —— 画布几何（viewBox 0 0 560 420；单一坐标映射；点 / text 距边 ≥16px）。 ——
const VIEW_W = 560;
const VIEW_H = 420;

// 绘图区（散点落在这个矩形内，四周留 ≥16px 给标题 / 坐标说明）。
const PAD_L = 28;
const PAD_R = 28;
const PAD_T = 56; // 上方留主标题 + 一句话
const PAD_B = 44; // 下方留坐标轴说明
const PLOT_W = VIEW_W - PAD_L - PAD_R;
const PLOT_H = VIEW_H - PAD_T - PAD_B;

// 单一坐标映射：归一化 [0,1] → SVG 像素。
const toX = (nx: number) => PAD_L + nx * PLOT_W;
const toY = (ny: number) => PAD_T + (1 - ny) * PLOT_H; // y 向上为正

type Point = {
  id: string;
  /** 短语文本。 */
  label: string;
  /** 归一化坐标（0–1，canned 示意值）。 */
  nx: number;
  ny: number;
  /** 簇：决定默认配色分组。 */
  cluster: "weather" | "stock" | "food";
};

// 三簇短语点（意思相近的挨在一起）。坐标 canned，刻意让簇内紧、簇间远。
const POINTS: readonly Point[] = [
  // 天气簇（左下）
  { id: "w1", label: "今天下雨吗", nx: 0.16, ny: 0.24, cluster: "weather" },
  { id: "w2", label: "明天天气", nx: 0.24, ny: 0.32, cluster: "weather" },
  { id: "w3", label: "带不带伞", nx: 0.13, ny: 0.36, cluster: "weather" },
  // 股票簇（右上）
  { id: "s1", label: "股票涨了吗", nx: 0.78, ny: 0.8, cluster: "stock" },
  { id: "s2", label: "苹果股价", nx: 0.86, ny: 0.72, cluster: "stock" },
  // 餐厅簇（右下）
  { id: "f1", label: "附近有啥好吃的", nx: 0.8, ny: 0.22, cluster: "food" },
  { id: "f2", label: "订个晚餐位子", nx: 0.88, ny: 0.32, cluster: "food" },
];

type Query = {
  id: string;
  /** 查询短语。 */
  text: string;
  /** 查询点归一化坐标（canned，刻意落在某簇附近）。 */
  nx: number;
  ny: number;
  /** 命中点题。 */
  insight: string;
};

const QUERIES: readonly Query[] = [
  {
    id: "q-weather",
    text: "出门要带伞吗？",
    nx: 0.2,
    ny: 0.3,
    insight:
      "查询点落在「天气簇」中间，最近的两个是「带不带伞」「今天下雨吗」——注意它们和查询一个共同的字都没几个，靠的是意思近（位置近），不是关键词。",
  },
  {
    id: "q-stock",
    text: "我的持仓涨了没？",
    nx: 0.82,
    ny: 0.76,
    insight:
      "换个查询，查询点跳到了「股票簇」附近，命中变成「股票涨了吗」「苹果股价」——同一套点，查询位置变了，最近邻就变了。",
  },
  {
    id: "q-food",
    text: "晚上去哪吃饭？",
    nx: 0.84,
    ny: 0.27,
    insight:
      "查询点落到「餐厅簇」，命中「附近有啥好吃的」「订个晚餐位子」。它和股票簇在右半边挨得不算太远，但餐厅簇更近，所以命中的是餐厅。",
  },
];

const CLUSTER_COLOR: Record<Point["cluster"], string> = {
  weather: "var(--accent)",
  stock: "var(--warning)",
  food: "var(--success)",
};

/** 欧氏距离（归一化空间）。 */
const dist = (ax: number, ay: number, bx: number, by: number) =>
  Math.hypot(ax - bx, ay - by);

const K_OPTIONS = [1, 2, 3] as const;
const INITIAL_K = 2;

export function VectorSpaceDemo() {
  const [queryId, setQueryId] = useState<string>(QUERIES[0].id);
  const [k, setK] = useState<number>(INITIAL_K);

  const reset = () => {
    setQueryId(QUERIES[0].id);
    setK(INITIAL_K);
  };

  const query = QUERIES.find((q) => q.id === queryId)!;

  // 算每个点到查询点的距离，排序取 top-k = 检索命中。
  const ranked = [...POINTS]
    .map((p) => ({ p, d: dist(p.nx, p.ny, query.nx, query.ny) }))
    .sort((a, b) => a.d - b.d);
  const hitIds = new Set(ranked.slice(0, k).map((r) => r.p.id));
  const hits = ranked.slice(0, k).map((r) => r.p.label);

  const qx = toX(query.nx);
  const qy = toY(query.ny);

  return (
    <DemoStage
      title="语义空间：embedding 把意思变成位置，检索 = 找最近的邻居"
      onReset={reset}
      controls={
        <>
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs text-secondary">换个查询：</span>
            {QUERIES.map((q) => (
              <button
                key={q.id}
                type="button"
                onClick={() => setQueryId(q.id)}
                aria-pressed={queryId === q.id}
                className={`rounded-control border px-3 py-1 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                  queryId === q.id
                    ? "border-accent text-accent"
                    : "border-border text-secondary hover:text-primary"
                }`}
              >
                {q.text}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs text-secondary">
              检索几个（top-k）：
            </span>
            {K_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setK(opt)}
                aria-pressed={k === opt}
                className={`rounded-control border px-3 py-1 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                  k === opt
                    ? "border-accent text-accent"
                    : "border-border text-secondary hover:text-primary"
                }`}
              >
                k = {opt}
              </button>
            ))}
          </div>
        </>
      }
    >
      <div className="w-full max-w-[560px]">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label={`2D 语义空间散点图。平面上散布七个短语点，意思相近的聚成三簇：天气簇（今天下雨吗、明天天气、带不带伞），股票簇（股票涨了吗、苹果股价），餐厅簇（附近有啥好吃的、订个晚餐位子）。当前查询是「${query.text}」，它也是空间里的一个点。检索取离查询点最近的 ${k} 个点作为命中：${hits.join("、")}。${query.insight} 关键：embedding 把意思变成空间位置，检索就是找空间里最近的邻居，所以按意思而不是关键词就能找回相关内容。`}
          className="mx-auto block h-auto w-full max-w-[560px]"
        >
          {/* —— 顶部主标题（左对齐，y≥20，距边 ≥16px）—— */}
          <text
            x={PAD_L}
            y={24}
            textAnchor="start"
            fontSize="11.5"
            fontWeight="700"
            fill="var(--text-secondary)"
          >
            意思相近的短语，位置就挨得近（聚成簇）
          </text>
          <text
            x={PAD_L}
            y={40}
            textAnchor="start"
            fontSize="10.5"
            fill="var(--text-secondary)"
          >
            查询★也是一个点，检索 = 找离它最近的 k 个点（虚线连到命中）
          </text>

          {/* —— 绘图区淡边框（细线，非整圈大容器；只为示意「这是一个空间」）—— */}
          <rect
            x={PAD_L}
            y={PAD_T}
            width={PLOT_W}
            height={PLOT_H}
            rx="8"
            fill="none"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="2 4"
          />

          {/* —— 命中连线：查询点 → 每个命中点（虚线）—— */}
          {ranked.slice(0, k).map((r) => (
            <line
              key={`link-${r.p.id}`}
              x1={qx}
              y1={qy}
              x2={toX(r.p.nx)}
              y2={toY(r.p.ny)}
              stroke="var(--accent)"
              strokeWidth="1.4"
              strokeDasharray="3 3"
              opacity="0.7"
            />
          ))}

          {/* —— 七个短语点 —— */}
          {POINTS.map((p) => {
            const cx = toX(p.nx);
            const cy = toY(p.ny);
            const hit = hitIds.has(p.id);
            const color = CLUSTER_COLOR[p.cluster];
            // 标签放点的上方或下方，避免越界：上半区的点标签放下方。
            const labelBelow = p.ny > 0.55;
            const ly = labelBelow ? cy + 18 : cy - 12;
            return (
              <g key={p.id}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={hit ? 8 : 6}
                  fill={color}
                  fillOpacity={hit ? 0.95 : 0.4}
                  stroke={color}
                  strokeWidth={hit ? 2.4 : 1.4}
                />
                {/* 命中环 */}
                {hit && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r="13"
                    fill="none"
                    stroke={color}
                    strokeWidth="1.6"
                    opacity="0.6"
                  />
                )}
                <text
                  x={cx}
                  y={ly}
                  textAnchor="middle"
                  fontSize="10.5"
                  fontWeight={hit ? 700 : 500}
                  fill={hit ? "var(--text-primary)" : "var(--text-secondary)"}
                >
                  {p.label}
                </text>
              </g>
            );
          })}

          {/* —— 查询点（★，紫色实心，最显眼）—— */}
          <g>
            <circle
              cx={qx}
              cy={qy}
              r="9"
              fill="var(--accent)"
              stroke="var(--bg)"
              strokeWidth="2.5"
            />
            <text
              x={qx}
              y={qy + 3.5}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill="var(--bg)"
            >
              ★
            </text>
            <text
              x={qx}
              y={qy - 16}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill="var(--accent)"
            >
              查询：{query.text}
            </text>
          </g>

          {/* —— 底部坐标说明（左对齐，距底边 ≥16px）—— */}
          <text
            x={PAD_L}
            y={VIEW_H - 16}
            textAnchor="start"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            示意：真实 embedding 是高维（几百~几千维），这里压成 2D 看个意思——位置近 = 意思近。
          </text>
        </svg>

        {/* 命中点题 */}
        <div className="mt-2 rounded-control border border-accent/40 bg-bg p-3 text-sm">
          <p className="mb-1 text-xs font-semibold text-accent">
            检索命中（最近的 {k} 个）：{hits.join("、")}
          </p>
          <p className="text-xs leading-relaxed text-secondary">
            {query.insight}
          </p>
        </div>

        {/* 关键教学点 */}
        <p className="mt-2 rounded-control border border-warning/40 bg-bg p-2 text-[11px] leading-relaxed text-secondary">
          <strong className="text-warning">一句话</strong>：embedding
          把「意思」变成「空间里的位置」，
          <strong className="text-primary">检索就是找最近的邻居</strong>
          ——所以查询能凭「意思近」找回字面不同的资料，这正是 RAG 按语义检索的底层。
        </p>
      </div>
    </DemoStage>
  );
}
