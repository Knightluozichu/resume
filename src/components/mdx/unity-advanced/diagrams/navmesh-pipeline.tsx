/**
 * <NavMeshPipeline>：NavMesh生成流水线
 *
 * 展示Recast Navigation的NavMesh生成6步流程：
 * 1. 场景几何体（Voxelization体素化）
 * 2. 体素场（高度场，可行走表面）
 * 3. 区域划分（Region，连通区域）
 * 4. 轮廓提取（Contour）
 * 5. 多边形网格（Convex Polygon Mesh）
 * 6. 寻路查询（A* on Polygons + Funnel/Straight Path）
 *
 * 每个阶段用小图示意，箭头连接
 */

const VIEW_W = 780;
const VIEW_H = 420;

type Step = {
  label: string;
  sub: string;
  color: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

const STEPS: readonly Step[] = [
  { label: "场景几何", sub: "Scene Mesh", color: "var(--text-secondary)", x: 30, y: 80, w: 100, h: 80 },
  { label: "体素化", sub: "Voxelize", color: "var(--accent)", x: 155, y: 80, w: 100, h: 80 },
  { label: "区域", sub: "Region", color: "var(--success)", x: 280, y: 80, w: 100, h: 80 },
  { label: "轮廓", sub: "Contour", color: "var(--warning)", x: 405, y: 80, w: 100, h: 80 },
  { label: "多边形网格", sub: "Poly Mesh", color: "var(--danger)", x: 530, y: 80, w: 100, h: 80 },
  { label: "寻路查询", sub: "Path Query", color: "var(--accent)", x: 655, y: 80, w: 100, h: 80 },
];

export function NavMeshPipeline() {
  return (
    <div className="my-8 w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="mx-auto w-full max-w-[780px]"
        style={{ minWidth: 640 }}
        role="img" aria-label="NavMesh生成流水线"
      >
        <rect x="0" y="0" width={VIEW_W} height={VIEW_H} fill="var(--bg-elevated)" rx="12" />

        <text x={VIEW_W / 2} y={30} textAnchor="middle" fill="var(--text-primary)" fontSize="17" fontWeight="600" fontFamily="system-ui">
          NavMesh 生成流水线（Recast Navigation）
        </text>
        <text x={VIEW_W / 2} y={48} textAnchor="middle" fill="var(--text-secondary)" fontSize="11" fontFamily="system-ui">
          场景三角面→体素化→区域→轮廓→凸多边形网格→运行时寻路
        </text>

        {/* 步骤框 */}
        {STEPS.map((s, i) => (
          <g key={s.label}>
            <rect x={s.x} y={s.y} width={s.w} height={s.h} fill="var(--bg)" stroke={s.color} strokeWidth="1.5" rx="6" />
            <rect x={s.x} y={s.y} width={s.w} height={4} fill={s.color} rx="2" />
            <text x={s.x + s.w/2} y={s.y + 24} textAnchor="middle" fill={s.color} fontSize="11" fontWeight="600" fontFamily="system-ui">{s.label}</text>
            <text x={s.x + s.w/2} y={s.y + 40} textAnchor="middle" fill="var(--text-secondary)" fontSize="9" fontFamily="Inter, monospace">{s.sub}</text>

            {/* 小示意图 */}
            {i === 0 && (
              // 场景几何：几个三角形
              <g>
                <polygon points={`${s.x+15},${s.y+70} ${s.x+35},${s.y+50} ${s.x+55},${s.y+70}`} fill={s.color} fillOpacity="0.15" stroke={s.color} strokeWidth="1" />
                <polygon points={`${s.x+45},${s.y+70} ${s.x+65},${s.y+55} ${s.x+85},${s.y+70}`} fill={s.color} fillOpacity="0.2" stroke={s.color} strokeWidth="1" />
                <line x1={s.x+10} y1={s.y+70} x2={s.x+90} y2={s.y+70} stroke={s.color} strokeWidth="1" />
              </g>
            )}
            {i === 1 && (
              // 体素化：网格点
              <g>
                {Array.from({length: 8}).map((_, vi) =>
                  Array.from({length: 8}).map((_, hi) => {
                    const vx = s.x + 15 + hi * 9;
                    const vy = s.y + 50 + vi * 4;
                    const isWalkable = vi < 3 || (vi >= 5 && vi < 7 && hi > 2);
                    return <rect key={`${vi}-${hi}`} x={vx} y={vy} width={7} height={3} fill={isWalkable ? s.color : "var(--border)"} fillOpacity={isWalkable ? 0.6 : 0.2} rx="0.5" />;
                  })
                )}
              </g>
            )}
            {i === 2 && (
              // 区域：连通色块
              <g>
                <rect x={s.x+15} y={s.y+52} width={30} height={22} fill={s.color} fillOpacity="0.3" stroke={s.color} strokeWidth="0.8" rx="2" />
                <rect x={s.x+50} y={s.y+50} width={35} height={24} fill="var(--accent)" fillOpacity="0.2" stroke="var(--accent)" strokeWidth="0.8" rx="2" />
                <text x={s.x+30} y={s.y+66} textAnchor="middle" fill={s.color} fontSize="8" fontWeight="600">A</text>
                <text x={s.x+67} y={s.y+66} textAnchor="middle" fill="var(--accent)" fontSize="8" fontWeight="600">B</text>
              </g>
            )}
            {i === 3 && (
              // 轮廓：多边形边线
              <g>
                <polygon points={`${s.x+20},${s.y+72} ${s.x+35},${s.y+52} ${s.x+60},${s.y+50} ${s.x+80},${s.y+58} ${s.x+75},${s.y+72}`} fill="none" stroke={s.color} strokeWidth="1.5" strokeDasharray="2 2" />
                <circle cx={s.x+20} cy={s.y+72} r={2} fill={s.color} />
                <circle cx={s.x+35} cy={s.y+52} r={2} fill={s.color} />
                <circle cx={s.x+60} cy={s.y+50} r={2} fill={s.color} />
                <circle cx={s.x+80} cy={s.y+58} r={2} fill={s.color} />
                <circle cx={s.x+75} cy={s.y+72} r={2} fill={s.color} />
              </g>
            )}
            {i === 4 && (
              // 凸多边形网格：三角形拼接
              <g>
                <polygon points={`${s.x+20},${s.y+72} ${s.x+40},${s.y+52} ${s.x+60},${s.y+72}`} fill={s.color} fillOpacity="0.1" stroke={s.color} strokeWidth="1" />
                <polygon points={`${s.x+40},${s.y+52} ${s.x+60},${s.y+72} ${s.x+80},${s.y+55}`} fill={s.color} fillOpacity="0.2" stroke={s.color} strokeWidth="1" />
                <polygon points={`${s.x+60},${s.y+72} ${s.x+80},${s.y+55} ${s.x+85},${s.y+72}`} fill={s.color} fillOpacity="0.15" stroke={s.color} strokeWidth="1" />
              </g>
            )}
            {i === 5 && (
              // 寻路：起点终点+路径线
              <g>
                <circle cx={s.x+20} cy={s.y+70} r={4} fill="var(--success)" />
                <text x={s.x+20} y={s.y+64} textAnchor="middle" fill="var(--success)" fontSize="7" fontWeight="600">S</text>
                <circle cx={s.x+80} cy={s.y+55} r={4} fill="var(--danger)" />
                <text x={s.x+80} y={s.y+49} textAnchor="middle" fill="var(--danger)" fontSize="7" fontWeight="600">E</text>
                <path d={`M ${s.x+20} ${s.y+70} L ${s.x+40} ${s.y+62} L ${s.x+60} ${s.y+58} L ${s.x+80} ${s.y+55}`} stroke={s.color} strokeWidth="2" fill="none" markerEnd="url(#nm-arrow)" />
              </g>
            )}

            {/* 箭头 */}
            {i < STEPS.length - 1 && (
              <path d={`M ${s.x + s.w + 2} ${s.y + s.h/2} L ${s.x + s.w + 18} ${s.y + s.h/2}`} stroke="var(--border)" strokeWidth="1.5" fill="none" markerEnd="url(#nm-arrow-gray)" />
            )}
          </g>
        ))}

        {/* 关键参数 */}
        <g>
          <rect x={30} y={190} width={720} height={120} fill="var(--bg)" stroke="var(--border)" strokeWidth="1" rx="8" />
          <text x={50} y={212} fill="var(--text-primary)" fontSize="12" fontWeight="600" fontFamily="system-ui">NavMesh 烘焙关键参数</text>

          {[
            { name: "Agent Radius", val: "0.5m", desc: "代理半径，决定与墙壁的最小距离", color: "var(--accent)" },
            { name: "Agent Height", val: "2.0m", desc: "代理高度，低于此高度的空间不可通过", color: "var(--success)" },
            { name: "Max Slope", val: "45°", desc: "最大可行走坡度", color: "var(--warning)" },
            { name: "Step Height", val: "0.4m", desc: "最大台阶高度，高于此高度不可跨越", color: "var(--danger)" },
            { name: "Voxel Size", val: "0.1-0.3m", desc: "体素大小，越小越精确但烘焙越慢", color: "var(--text-secondary)" },
            { name: "Min Region Area", val: "2m²", desc: "最小区域面积，小于此面积的孤岛被丢弃", color: "var(--accent)" },
          ].map((p, i) => {
            const col = i % 3;
            const row = Math.floor(i / 3);
            const px = 50 + col * 235;
            const py = 225 + row * 40;
            return (
              <g key={p.name}>
                <rect x={px} y={py} width={220} height={32} fill={p.color} fillOpacity="0.06" stroke={p.color} strokeWidth="0.5" strokeOpacity="0.4" rx="4" />
                <text x={px + 8} y={py + 13} fill={p.color} fontSize="9" fontWeight="600" fontFamily="JetBrains Mono, monospace">{p.name}</text>
                <text x={px + 120} y={py + 13} fill="var(--text-primary)" fontSize="9" fontWeight="600" fontFamily="JetBrains Mono, monospace">{p.val}</text>
                <text x={px + 8} y={py + 26} fill="var(--text-secondary)" fontSize="8" fontFamily="system-ui">{p.desc}</text>
              </g>
            );
          })}
        </g>

        {/* 运行时组件 */}
        <g>
          <rect x={30} y={325} width={720} height={70} fill="var(--bg)" stroke="var(--border)" strokeWidth="1" rx="8" />
          <text x={50} y={347} fill="var(--text-primary)" fontSize="12" fontWeight="600" fontFamily="system-ui">运行时寻路组件</text>

          {[
            { label: "NavMeshAgent", desc: "寻路代理组件，自动寻路+避障", color: "var(--accent)" },
            { label: "NavMeshObstacle", desc: "动态障碍（可移动箱子/门）", color: "var(--warning)" },
            { label: "Off-Mesh Link", desc: "跳跃/攀爬/传送等非行走连接", color: "var(--success)" },
            { label: "NavMeshSurface", desc: "运行时可动态烘焙的NavMesh", color: "var(--danger)" },
          ].map((c, i) => {
            const cx = 50 + i * 175;
            return (
              <g key={c.label}>
                <rect x={cx} y={356} width={165} height={30} fill={c.color} fillOpacity="0.08" stroke={c.color} strokeWidth="0.8" rx="4" />
                <text x={cx + 8} y={370} fill={c.color} fontSize="9" fontWeight="600" fontFamily="system-ui">{c.label}</text>
                <text x={cx + 8} y={382} fill="var(--text-secondary)" fontSize="7" fontFamily="system-ui">{c.desc}</text>
              </g>
            );
          })}
        </g>

        <defs>
          <marker id="nm-arrow" markerWidth="7" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 7 3, 0 6" fill="var(--accent)" />
          </marker>
          <marker id="nm-arrow-gray" markerWidth="7" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 7 3, 0 6" fill="var(--border)" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
