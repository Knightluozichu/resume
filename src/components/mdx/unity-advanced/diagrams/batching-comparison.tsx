/**
 * <BatchingComparison>：合批方式对比图
 *
 * 横向对比 5 种合批策略：不合并 → 静态合批 → 动态合批 → GPU Instancing → SRP Batcher
 * 用柱状图直观展示 DrawCall 数量和内存占用对比
 * 下方列出每种方式的适用条件和限制
 */

const VIEW_W = 800;
const VIEW_H = 500;

type BatchMode = {
  name: string;
  sub: string;
  color: string;
  dcLevel: "极高" | "高" | "中" | "低";
  memLevel: "极高" | "高" | "中" | "低";
  dcHeight: number;
  memHeight: number;
  condition: string;
  limit1: string;
  limit2: string;
  recommended?: boolean;
};

const MODES: readonly BatchMode[] = [
  {
    name: "不合并", sub: "No Batching", color: "var(--danger)",
    dcLevel: "极高", memLevel: "低", dcHeight: 95, memHeight: 20,
    condition: "每个物体独立DrawCall",
    limit1: "DC最多", limit2: "性能最差",
  },
  {
    name: "静态合批", sub: "Static Batching", color: "var(--accent)",
    dcLevel: "中", memLevel: "极高", dcHeight: 30, memHeight: 85,
    condition: "Static标记+共享材质",
    limit1: "不可移动", limit2: "内存翻倍",
  },
  {
    name: "动态合批", sub: "Dynamic Batching", color: "var(--success)",
    dcLevel: "高", memLevel: "低", dcHeight: 55, memHeight: 25,
    condition: "顶点<300+同材质",
    limit1: "顶点限制严", limit2: "CPU开销大",
  },
  {
    name: "GPU Instancing", sub: "GPU Instancing", color: "var(--warning)",
    dcLevel: "低", memLevel: "中", dcHeight: 20, memHeight: 30,
    condition: "同Mesh+同材质",
    limit1: "需Shader支持", limit2: "不同Mesh不行",
  },
  {
    name: "SRP Batcher", sub: "SRP Batcher", color: "var(--text-primary)",
    dcLevel: "低", memLevel: "低", dcHeight: 15, memHeight: 15,
    condition: "URP/HDRP+兼容Shader",
    limit1: "需CBUFFER布局", limit2: "材质变体别太多",
    recommended: true,
  },
];

const CHART_X = 50;
const CHART_Y = 80;
const CHART_W = 700;
const CHART_H = 170;
const COL_W = CHART_W / MODES.length;
const BAR_W = 38;

export function BatchingComparison() {
  return (
    <div className="my-8 w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="mx-auto w-full max-w-[800px]"
        style={{ minWidth: 700 }}
        role="img"
        aria-label="合批方式对比图"
      >
        <rect x="0" y="0" width={VIEW_W} height={VIEW_H} fill="var(--bg-elevated)" rx="12" />

        {/* 标题 */}
        <text x={VIEW_W / 2} y={28} textAnchor="middle" fill="var(--text-primary)" fontSize="17" fontWeight="600" fontFamily="system-ui">
          合批方式对比：DrawCall vs 内存开销
        </text>
        <text x={VIEW_W / 2} y={46} textAnchor="middle" fill="var(--text-secondary)" fontSize="11" fontFamily="system-ui">
          合批的本质：减少CPU→GPU的状态切换开销，但各有代价
        </text>

        {/* 图表区域背景 */}
        <rect x={CHART_X} y={CHART_Y} width={CHART_W} height={CHART_H} fill="var(--bg)" stroke="var(--border)" strokeWidth="1" rx="6" />

        {/* Y轴网格线 */}
        {[0, 25, 50, 75, 100].map((v) => {
          const y = CHART_Y + CHART_H - (v / 100) * CHART_H;
          return (
            <g key={v}>
              <line x1={CHART_X} y1={y} x2={CHART_X + CHART_W} y2={y} stroke="var(--border)" strokeWidth="0.5" strokeDasharray="2 2" />
              <text x={CHART_X - 6} y={y + 3} textAnchor="end" fill="var(--text-secondary)" fontSize="8" fontFamily="JetBrains Mono, monospace">{v}%</text>
            </g>
          );
        })}

        {/* 图例 */}
        <rect x={560} y={60} width={10} height={10} fill="var(--accent)" rx="2" />
        <text x={575} y={69} fill="var(--text-secondary)" fontSize="9" fontFamily="system-ui">DrawCall数量</text>
        <rect x={660} y={60} width={10} height={10} fill="var(--warning)" rx="2" />
        <text x={675} y={69} fill="var(--text-secondary)" fontSize="9" fontFamily="system-ui">内存占用</text>

        {/* 柱子 */}
        {MODES.map((m, i) => {
          const cx = CHART_X + COL_W * i + COL_W / 2;
          const dcBarH = (m.dcHeight / 100) * CHART_H;
          const memBarH = (m.memHeight / 100) * CHART_H;
          const dcX = cx - BAR_W - 3;
          const memX = cx + 3;
          const barY = CHART_Y + CHART_H;

          return (
            <g key={m.name}>
              {/* DrawCall 柱 */}
              <rect x={dcX} y={barY - dcBarH} width={BAR_W} height={dcBarH} fill="var(--accent)" fillOpacity="0.7" rx="3" />
              <text x={dcX + BAR_W / 2} y={barY - dcBarH - 5} textAnchor="middle" fill="var(--accent)" fontSize="9" fontWeight="600" fontFamily="system-ui">
                {m.dcLevel}
              </text>

              {/* 内存柱 */}
              <rect x={memX} y={barY - memBarH} width={BAR_W} height={memBarH} fill="var(--warning)" fillOpacity="0.7" rx="3" />
              <text x={memX + BAR_W / 2} y={barY - memBarH - 5} textAnchor="middle" fill="var(--warning)" fontSize="9" fontWeight="600" fontFamily="system-ui">
                {m.memLevel}
              </text>

              {/* 名称标签 */}
              <text x={cx} y={barY + 16} textAnchor="middle" fill={m.color} fontSize="10" fontWeight="600" fontFamily="system-ui">{m.name}</text>
              <text x={cx} y={barY + 28} textAnchor="middle" fill="var(--text-secondary)" fontSize="7.5" fontFamily="JetBrains Mono, monospace">{m.sub}</text>

              {/* 推荐标记 */}
              {m.recommended && (
                <g>
                  <rect x={cx - 48} y={CHART_Y - 12} width={96} height={20} fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" rx="4" />
                  <text x={cx} y={CHART_Y + 2} textAnchor="middle" fill="var(--success)" fontSize="8.5" fontWeight="700" fontFamily="system-ui">★ 推荐(URP/HDRP默认)</text>
                </g>
              )}
            </g>
          );
        })}

        {/* 分隔线 */}
        <line x1={CHART_X} y1={CHART_Y + CHART_H + 38} x2={CHART_X + CHART_W} y2={CHART_Y + CHART_H + 38} stroke="var(--border)" strokeWidth="1" />

        {/* 底部详情卡片 */}
        {MODES.map((m, i) => {
          const cx = CHART_X + COL_W * i + 5;
          const cy = CHART_Y + CHART_H + 50;
          const cw = COL_W - 10;
          return (
            <g key={`detail-${m.name}`}>
              <rect x={cx} y={cy} width={cw} height={130} fill={m.color} fillOpacity="0.05" stroke={m.color} strokeWidth="0.8" strokeOpacity="0.4" rx="5" />
              <rect x={cx} y={cy} width={cw} height={3} fill={m.color} rx="1" />

              <text x={cx + 6} y={cy + 16} fill={m.color} fontSize="8" fontWeight="600" fontFamily="system-ui">适用条件</text>
              <text x={cx + 6} y={cy + 28} fill="var(--text-primary)" fontSize="7.5" fontFamily="system-ui">{m.condition}</text>

              <text x={cx + 6} y={cy + 48} fill="var(--danger)" fontSize="8" fontWeight="600" fontFamily="system-ui">限制</text>
              <text x={cx + 6} y={cy + 60} fill="var(--text-secondary)" fontSize="7.5" fontFamily="system-ui">{m.limit1}</text>
              <text x={cx + 6} y={cy + 72} fill="var(--text-secondary)" fontSize="7.5" fontFamily="system-ui">{m.limit2}</text>

              {/* 合批原理简述 */}
              <text x={cx + 6} y={cy + 92} fill="var(--success)" fontSize="8" fontWeight="600" fontFamily="system-ui">原理</text>
              <text x={cx + 6} y={cy + 104} fill="var(--text-secondary)" fontSize="7.5" fontFamily="system-ui">
                {i === 0 ? "N物体=N个DC" : i === 1 ? "烘焙时合并Mesh" : i === 2 ? "CPU合并小Mesh" : i === 3 ? "一次DC绘制多实例" : "常驻GPU CBuffer"}
              </text>
              <text x={cx + 6} y={cy + 116} fill="var(--text-secondary)" fontSize="7.5" fontFamily="system-ui">
                {i === 0 ? "" : i === 1 ? "→1个大DC" : i === 2 ? "→1个DC" : i === 3 ? "→材质属性每实例" : "→材质数据不切换"}
              </text>
            </g>
          );
        })}

      </svg>
    </div>
  );
}
