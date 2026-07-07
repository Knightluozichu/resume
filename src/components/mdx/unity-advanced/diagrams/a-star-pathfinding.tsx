/**
 * <AStarPathfinding>：A*寻路过程示意图
 *
 * 在网格上展示A*寻路：
 * - 起点S(绿色)、终点E(红色)、障碍物(深灰)、已探索Close(蓝色半透明)、待探索Open(黄色边框)
 * - 标注f=g+h公式：g是从起点到当前格子的代价，h是到终点的估算代价
 * - 路径回溯：从终点沿parent指针回到起点，高亮最终路径
 * - 旁边：公式说明和h函数选择
 */

const VIEW_W = 780;
const VIEW_H = 460;

const GRID_SIZE = 12;
const CELL = 32;
const GRID_X = 40;
const GRID_Y = 80;

// 网格定义：0=空地, 1=障碍, 2=起点, 3=终点, 4=路径, 5=open, 6=close
const GRID: number[][] = [
  [0,0,0,0,0,0,0,0,0,0,0,0],
  [0,2,0,0,0,0,1,0,0,0,0,0],
  [0,0,0,0,1,0,1,0,0,0,0,0],
  [0,0,0,0,1,0,1,0,0,0,0,0],
  [0,0,0,0,1,0,0,0,0,5,0,0],
  [0,0,0,0,0,0,0,0,5,4,5,0],
  [0,0,0,0,0,0,0,5,4,0,0,0],
  [0,1,1,0,0,1,5,4,0,0,0,0],
  [0,0,0,0,0,5,4,0,0,0,0,0],
  [0,0,0,0,5,4,0,0,0,1,1,0],
  [0,0,0,5,4,3,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0],
];

function cellColor(v: number): string {
  switch (v) {
    case 1: return "var(--text-secondary)";
    case 2: return "var(--success)";
    case 3: return "var(--danger)";
    case 4: return "var(--accent)";
    case 5: return "var(--warning)";
    case 6: return "var(--accent)";
    default: return "var(--bg)";
  }
}

export function AStarPathfinding() {
  return (
    <div className="my-8 w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="mx-auto w-full max-w-[780px]"
        style={{ minWidth: 620 }}
        role="img" aria-label="A*寻路算法示意图"
      >
        <rect x="0" y="0" width={VIEW_W} height={VIEW_H} fill="var(--bg-elevated)" rx="12" />

        <text x={VIEW_W / 2} y={30} textAnchor="middle" fill="var(--text-primary)" fontSize="17" fontWeight="600" fontFamily="system-ui">
          A* 寻路算法
        </text>
        <text x={VIEW_W / 2} y={48} textAnchor="middle" fill="var(--text-secondary)" fontSize="11" fontFamily="system-ui">
          f(n) = g(n) + h(n) — 启发式搜索，Open表选f最小的节点扩展
        </text>

        {/* 网格 */}
        <g>
          {GRID.map((row, ry) =>
            row.map((cell, cx) => {
              const x = GRID_X + cx * CELL;
              const y = GRID_Y + ry * CELL;
              const fill = cellColor(cell);
              const isObstacle = cell === 1;
              const isStart = cell === 2;
              const isEnd = cell === 3;
              const isPath = cell === 4;
              const isOpen = cell === 5;
              return (
                <g key={`${cx}-${ry}`}>
                  <rect
                    x={x} y={y} width={CELL - 1} height={CELL - 1}
                    fill={isPath || isStart || isEnd ? fill : isOpen ? "var(--bg)" : fill}
                    fillOpacity={isPath ? "0.7" : isObstacle ? "1" : isStart || isEnd ? "0.8" : "1"}
                    stroke={isOpen ? "var(--warning)" : isPath ? "var(--accent)" : "var(--border)"}
                    strokeWidth={isOpen || isPath ? 2 : 0.8}
                    rx="2"
                  />
                  {isStart && <text x={x + CELL/2} y={y + CELL/2 + 5} textAnchor="middle" fill="white" fontSize="12" fontWeight="700" fontFamily="system-ui">S</text>}
                  {isEnd && <text x={x + CELL/2} y={y + CELL/2 + 5} textAnchor="middle" fill="white" fontSize="12" fontWeight="700" fontFamily="system-ui">E</text>}
                  {isPath && <circle cx={x + CELL/2} cy={y + CELL/2} r={5} fill="var(--accent)" />}
                </g>
              );
            })
          )}
        </g>

        {/* 右侧说明 */}
        <g>
          <rect x={460} y={80} width={290} height={340} fill="var(--bg)" stroke="var(--border)" strokeWidth="1" rx="8" />

          {/* 公式 */}
          <text x={475} y={105} fill="var(--text-primary)" fontSize="12" fontWeight="600" fontFamily="system-ui">核心公式</text>
          <rect x={475} y={115} width={260} height={40} fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="0.8" rx="4" />
          <text x={605} y={133} textAnchor="middle" fill="var(--accent)" fontSize="14" fontWeight="700" fontFamily="JetBrains Mono, monospace">f(n) = g(n) + h(n)</text>
          <text x={485} y={150} fill="var(--text-secondary)" fontSize="9" fontFamily="system-ui">f: 总代价  g: 起点→当前  h: 当前→终点(估算)</text>

          {/* 算法步骤 */}
          <text x={475} y={178} fill="var(--text-primary)" fontSize="12" fontWeight="600" fontFamily="system-ui">算法步骤</text>
          {[
            "1. Open=[S], Close=[]",
            "2. 从Open选f最小的节点n",
            "3. n是终点→回溯路径结束",
            "4. 扩展n的邻居，计算g/h/f",
            "5. 更好的路径→更新parent",
            "6. n移入Close，重复2-6",
          ].map((s, i) => (
            <text key={i} x={485} y={196 + i * 15} fill="var(--text-secondary)" fontSize="9" fontFamily="system-ui">{s}</text>
          ))}

          {/* 启发函数 */}
          <text x={475} y={295} fill="var(--text-primary)" fontSize="12" fontWeight="600" fontFamily="system-ui">启发函数 h(n) 选择</text>
          {[
            { name: "曼哈顿距离", form: "|dx|+|dy|", use: "四方向网格", color: "var(--success)" },
            { name: "对角距离", form: "Chebyshev", use: "八方向网格", color: "var(--accent)" },
            { name: "欧几里得", form: "√(dx²+dy²)", use: "任意方向", color: "var(--warning)" },
            { name: "0（Dijkstra）", form: "h=0", use: "退化为Dijkstra", color: "var(--text-secondary)" },
          ].map((h, i) => (
            <g key={h.name}>
              <rect x={475} y={305 + i * 24} width={260} height={20} fill={h.color} fillOpacity="0.06" rx="3" />
              <text x={485} y={319 + i * 24} fill={h.color} fontSize="9" fontWeight="600" fontFamily="system-ui">{h.name}</text>
              <text x={575} y={319 + i * 24} fill="var(--text-secondary)" fontSize="9" fontFamily="JetBrains Mono, monospace">{h.form}</text>
              <text x={660} y={319 + i * 24} fill="var(--text-secondary)" fontSize="8" fontFamily="system-ui">{h.use}</text>
            </g>
          ))}
        </g>

        {/* 图例 */}
        <g>
          <rect x={40} y={GRID_Y + GRID_SIZE * CELL + 10} width={380} height={30} fill="var(--bg)" stroke="var(--border)" strokeWidth="0.8" rx="4" />
          {[
            { label: "起点S", color: "var(--success)" },
            { label: "终点E", color: "var(--danger)" },
            { label: "障碍", color: "var(--text-secondary)" },
            { label: "Open", color: "var(--bg)", stroke: "var(--warning)" },
            { label: "Close(已探索)", color: "var(--accent)", opacity: "0.3" },
            { label: "路径", color: "var(--accent)" },
          ].map((item, i) => {
            const ix = 50 + i * 60;
            return (
              <g key={item.label}>
                <rect x={ix} y={GRID_Y + GRID_SIZE * CELL + 16} width={12} height={12} fill={item.color} fillOpacity={item.opacity ?? "1"} stroke={item.stroke ?? "none"} strokeWidth={item.stroke ? 2 : 0} rx="2" />
                <text x={ix + 16} y={GRID_Y + GRID_SIZE * CELL + 26} fill="var(--text-secondary)" fontSize="8" fontFamily="system-ui">{item.label}</text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
