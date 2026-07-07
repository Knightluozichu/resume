/**
 * <McdSingletonDiagram>：SingletonHolder 的三个策略维度。
 *
 * 中心 SingletonHolder<T, Creation, Lifetime, Threading> 辐射三策略分支：
 * CreationPolicy（创建）、LifetimePolicy（生命周期）、ThreadingModel（线程模型）。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×500，四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 500;

const CX = 360;
const CY = 250;

interface Branch {
  name: string;
  color: string;
  bx: number;
  by: number;
  options: { label: string; x: number; y: number }[];
}

const BRANCHES: readonly Branch[] = [
  {
    name: "CreationPolicy",
    color: "var(--accent)",
    bx: 150,
    by: 120,
    options: [
      { label: "CreateUsingNew", x: 40, y: 60 },
      { label: "CreateStatic", x: 40, y: 96 },
      { label: "CreateUsingMalloc", x: 40, y: 132 },
    ],
  },
  {
    name: "LifetimePolicy",
    color: "var(--success)",
    bx: 570,
    by: 120,
    options: [
      { label: "DefaultLifetime", x: 550, y: 60 },
      { label: "PhoenixSingleton", x: 550, y: 96 },
      { label: "WithLongevity", x: 550, y: 132 },
    ],
  },
  {
    name: "ThreadingModel",
    color: "var(--warning)",
    bx: 360,
    by: 400,
    options: [
      { label: "SingleThreaded", x: 80, y: 450 },
      { label: "MultiThreaded", x: 295, y: 450 },
      { label: "ObjectLevelLock", x: 510, y: 450 },
    ],
  },
];

const OPT_W = 130;
const OPT_H = 26;

export function McdSingletonDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="SingletonHolder 策略示意。中心节点 SingletonHolder 三参数模板辐射三策略分支：左上 CreationPolicy 创建策略（紫色，CreateUsingNew、CreateStatic、CreateUsingMalloc）；右上 LifetimePolicy 生命周期策略（绿色，DefaultLifetime、PhoenixSingleton、WithLongevity）；下方 ThreadingModel 线程模型策略（暖色，SingleThreaded、MultiThreaded、ObjectLevelLock）。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={30} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            SingletonHolder：三策略可定制单例
          </text>
          <text x={VIEW_W / 2} y={52} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            创建 · 生命周期 · 线程模型——编译时拼装单例，告别手写变体
          </text>

          {/* 中心 → 分支连线 */}
          {BRANCHES.map((b) => (
            <line key={`cb-${b.name}`} x1={CX} y1={CY} x2={b.bx} y2={b.by} stroke={b.color} strokeWidth="2.2" strokeOpacity="0.55" />
          ))}

          {/* 分支 → 选项连线 + 选项药丸 + 分支节点 */}
          {BRANCHES.map((b) => (
            <g key={`br-${b.name}`}>
              {b.options.map((o) => (
                <line key={`ol-${b.name}-${o.label}`} x1={b.bx} y1={b.by} x2={o.x + OPT_W / 2} y2={o.y + OPT_H / 2} stroke={b.color} strokeWidth="1.2" strokeOpacity="0.4" />
              ))}
              {b.options.map((o) => (
                <g key={`op-${b.name}-${o.label}`}>
                  <rect x={o.x} y={o.y} width={OPT_W} height={OPT_H} rx="13" fill="var(--bg-elevated)" stroke={b.color} strokeWidth="1.4" strokeOpacity="0.6" />
                  <text x={o.x + OPT_W / 2} y={o.y + 17} textAnchor="middle" fontSize="10.5" fontWeight="600" fill="var(--text-primary)" fontFamily="monospace">
                    {o.label}
                  </text>
                </g>
              ))}
              {/* 分支节点 */}
              <rect x={b.bx - 74} y={b.by - 18} width="148" height="36" rx="10" fill={b.color} fillOpacity="0.16" stroke={b.color} strokeWidth="1.8" />
              <text x={b.bx} y={b.by + 5} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={b.color} fontFamily="monospace">
                {b.name}
              </text>
            </g>
          ))}

          {/* 中心节点 */}
          <circle cx={CX} cy={CY} r="70" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="2.6" />
          <text x={CX} y={CY - 14} textAnchor="middle" fontSize="12.5" fontWeight="700" fill="var(--text-primary)" fontFamily="monospace">
            SingletonHolder
          </text>
          <text x={CX} y={CY + 8} textAnchor="middle" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">
            {"<T, C, L, Th>"}
          </text>
          <text x={CX} y={CY + 28} textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            Instance() 单一入口
          </text>

          {/* 底部说明 */}
          <text x={VIEW_W / 2} y={488} textAnchor="middle" fontSize="11.5" fill="var(--text-secondary)">
            三个策略各取其一，编译时生成定制单例 · 统一 Instance() 访问
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        SingletonHolder 用 Creation/Lifetime/Threading 三个策略维度编译时拼装单例，统一 Instance() 访问。
      </figcaption>
    </figure>
  );
}
