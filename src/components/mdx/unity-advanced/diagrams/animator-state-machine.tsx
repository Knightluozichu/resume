/**
 * <AnimatorStateMachine>：Animator状态机图
 *
 * 展示Unity Animator状态机的核心组成：
 * - Entry / Exit / Any State 三个特殊节点
 * - States（Idle/Run/Jump/Attack等）
 * - Transitions（状态转换）
 * - Parameters（Float/Int/Bool/Trigger）
 * - Layers（Base Layer / Upper Body等）
 * 标注Has Exit Time、Fixed Duration、Transition Duration等关键参数。
 */

const VIEW_W = 860;
const VIEW_H = 520;

type StateNode = {
  id: string;
  label: string;
  sub?: string;
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  special?: "entry" | "exit" | "any";
};

const NODES: readonly StateNode[] = [
  { id: "entry", label: "Entry", sub: "入口", x: 60, y: 220, w: 80, h: 44, color: "var(--success)", special: "entry" },
  { id: "any", label: "Any State", sub: "任意状态", x: 60, y: 340, w: 100, h: 44, color: "var(--text-secondary)", special: "any" },
  { id: "exit", label: "Exit", sub: "出口", x: 720, y: 220, w: 70, h: 44, color: "var(--danger)", special: "exit" },

  { id: "idle", label: "Idle", sub: "待机", x: 220, y: 160, w: 100, h: 56, color: "var(--accent)" },
  { id: "run", label: "Run", sub: "奔跑", x: 380, y: 160, w: 100, h: 56, color: "var(--accent)" },
  { id: "jump", label: "Jump", sub: "跳跃", x: 540, y: 80, w: 100, h: 56, color: "var(--warning)" },
  { id: "attack", label: "Attack", sub: "攻击", x: 380, y: 300, w: 100, h: 56, color: "var(--danger)" },
  { id: "hurt", label: "Hurt", sub: "受击", x: 540, y: 220, w: 100, h: 56, color: "var(--warning)" },
  { id: "death", label: "Death", sub: "死亡", x: 540, y: 340, w: 100, h: 56, color: "var(--danger)" },
];

type Trans = { from: string; to: string; label: string; color?: string; dashed?: boolean };

const TRANSITIONS: readonly Trans[] = [
  { from: "entry", to: "idle", label: "默认进入" },
  { from: "idle", to: "run", label: "Speed>0.1", color: "var(--accent)" },
  { from: "run", to: "idle", label: "Speed<0.1", color: "var(--accent)" },
  { from: "any", to: "jump", label: "IsJump (Trigger)", color: "var(--warning)", dashed: true },
  { from: "any", to: "hurt", label: "IsHurt (Trigger)", color: "var(--warning)", dashed: true },
  { from: "any", to: "death", label: "HP<=0", color: "var(--danger)", dashed: true },
  { from: "idle", to: "attack", label: "IsAttack", color: "var(--danger)" },
  { from: "run", to: "attack", label: "IsAttack", color: "var(--danger)" },
  { from: "jump", to: "idle", label: "IsGrounded", color: "var(--accent)" },
  { from: "attack", to: "idle", label: "动画结束", color: "var(--accent)" },
  { from: "hurt", to: "idle", label: "动画结束", color: "var(--accent)" },
  { from: "death", to: "exit", label: "结束", color: "var(--danger)" },
];

function nodeCenter(n: StateNode) {
  return { cx: n.x + n.w / 2, cy: n.y + n.h / 2 };
}

function findNode(id: string) {
  return NODES.find((n) => n.id === id)!;
}

export function AnimatorStateMachine() {
  return (
    <div className="my-8 w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="mx-auto w-full max-w-[860px]"
        style={{ minWidth: 680 }}
        role="img"
        aria-label="Animator状态机结构示意图"
      >
        <rect x="0" y="0" width={VIEW_W} height={VIEW_H} fill="var(--bg-elevated)" rx="12" />

        <text x={VIEW_W / 2} y={32} textAnchor="middle" fill="var(--text-primary)" fontSize="17" fontWeight="600" fontFamily="system-ui">
          Animator 状态机结构
        </text>
        <text x={VIEW_W / 2} y={52} textAnchor="middle" fill="var(--text-secondary)" fontSize="11" fontFamily="system-ui">
          States + Transitions + Parameters + Layers = 动画状态机
        </text>

        {/* 状态机网格背景 */}
        <rect x={30} y={60} width={800} height={350} fill="var(--bg)" stroke="var(--border)" strokeWidth="1" rx="8" />

        {/* 参数面板（左侧下） */}
        <g>
          <rect x={40} y={400} width={340} height={80} fill="var(--bg-elevated)" stroke="var(--border)" strokeWidth="1" rx="6" />
          <text x={56} y={422} fill="var(--text-primary)" fontSize="12" fontWeight="600" fontFamily="system-ui">Parameters 参数</text>

          {[
            { name: "Speed", type: "Float", val: "0~5", color: "var(--accent)" },
            { name: "IsJump", type: "Trigger", val: "—", color: "var(--warning)" },
            { name: "IsAttack", type: "Bool", val: "true/false", color: "var(--danger)" },
            { name: "HP", type: "Int", val: "0~100", color: "var(--success)" },
          ].map((p, i) => {
            const col = i % 2;
            const row = Math.floor(i / 2);
            const px = 56 + col * 155;
            const py = 432 + row * 22;
            return (
              <g key={p.name}>
                <rect x={px} y={py} width={145} height={18} fill={p.color} fillOpacity="0.08" rx="3" />
                <text x={px + 6} y={py + 13} fill={p.color} fontSize="10" fontWeight="600" fontFamily="JetBrains Mono, monospace">
                  {p.name}
                </text>
                <text x={px + 80} y={py + 13} fill="var(--text-secondary)" fontSize="9" fontFamily="system-ui">
                  {p.type}
                </text>
                <text x={px + 120} y={py + 13} fill="var(--text-secondary)" fontSize="9" fontFamily="system-ui">
                  {p.val}
                </text>
              </g>
            );
          })}
        </g>

        {/* Layers标注（右侧下） */}
        <g>
          <rect x={400} y={400} width={430} height={80} fill="var(--bg-elevated)" stroke="var(--border)" strokeWidth="1" rx="6" />
          <text x={416} y={422} fill="var(--text-primary)" fontSize="12" fontWeight="600" fontFamily="system-ui">Layers 动画层（Avatar Mask + Weight）</text>

          {[
            { name: "Base Layer", weight: "1.0", mask: "全身", color: "var(--accent)" },
            { name: "Upper Body", weight: "1.0", mask: "上半身", color: "var(--warning)" },
            { name: "Face", weight: "0.5", mask: "面部", color: "var(--success)" },
            { name: "IK", weight: "1.0", mask: "手脚IK", color: "var(--text-secondary)" },
          ].map((l, i) => {
            const lx = 416 + (i % 2) * 200;
            const ly = 432 + Math.floor(i / 2) * 22;
            return (
              <g key={l.name}>
                <rect x={lx} y={ly} width={185} height={18} fill={l.color} fillOpacity="0.08" rx="3" />
                <text x={lx + 6} y={ly + 13} fill={l.color} fontSize="10" fontWeight="600" fontFamily="system-ui">
                  {l.name}
                </text>
                <text x={lx + 100} y={ly + 13} fill="var(--text-secondary)" fontSize="9" fontFamily="JetBrains Mono, monospace">
                  w={l.weight}
                </text>
                <text x={lx + 140} y={ly + 13} fill="var(--text-secondary)" fontSize="9" fontFamily="system-ui">
                  {l.mask}
                </text>
              </g>
            );
          })}
        </g>

        {/* 连线（先画连线，节点在上层） */}
        {TRANSITIONS.map((t, i) => {
          const from = findNode(t.from);
          const to = findNode(t.to);
          const fc = nodeCenter(from);
          const tc = nodeCenter(to);

          // 简单的贝塞尔连接
          let sx = fc.cx;
          const sy = fc.cy;
          let ex = tc.cx;
          const ey = tc.cy;

          // 根据方向调整起点终点
          if (from.x < to.x) { sx = from.x + from.w; } else if (from.x > to.x) { sx = from.x; ex = to.x + to.w; }
          else { sx = fc.cx; ex = tc.cx; }
          if (Math.abs(from.y - to.y) > 40) {
            // 垂直方向偏移
          }

          const midX = (sx + ex) / 2;
          const d = `M ${sx} ${sy} C ${midX} ${sy}, ${midX} ${ey}, ${ex} ${ey}`;
          const color = t.color ?? "var(--border)";

          return (
            <g key={i}>
              <path
                d={d}
                stroke={color}
                strokeWidth="1.5"
                fill="none"
                strokeDasharray={t.dashed ? "5 3" : "none"}
                markerEnd="url(#asm-arrow)"
              />
              {/* 标签 */}
              <rect x={midX - t.label.length * 3.5 - 4} y={(sy + ey) / 2 - 8} width={t.label.length * 7 + 8} height={14} fill="var(--bg-elevated)" rx="3" />
              <text x={midX} y={(sy + ey) / 2 + 3} textAnchor="middle" fill={color} fontSize="9" fontFamily="system-ui">
                {t.label}
              </text>
            </g>
          );
        })}

        {/* 节点 */}
        {NODES.map((n) => {
          const isSpecial = !!n.special;
          return (
            <g key={n.id}>
              {n.special === "entry" && (
                <polygon
                  points={`${n.x + n.w / 2} ${n.y},${n.x + n.w} ${n.y + n.h / 2},${n.x + n.w / 2} ${n.y + n.h},${n.x} ${n.y + n.h / 2}`}
                  fill={n.color}
                  fillOpacity="0.15"
                  stroke={n.color}
                  strokeWidth="1.5"
                />
              )}
              {n.special === "exit" && (
                <circle cx={n.x + n.w / 2} cy={n.y + n.h / 2} r={n.h / 2} fill={n.color} fillOpacity="0.15" stroke={n.color} strokeWidth="1.5" />
              )}
              {n.special === "any" && (
                <rect x={n.x} y={n.y} width={n.w} height={n.h} fill="var(--bg)" stroke={n.color} strokeWidth="1.5" strokeDasharray="4 3" rx="6" />
              )}
              {!isSpecial && (
                <rect x={n.x} y={n.y} width={n.w} height={n.h} fill="var(--bg)" stroke={n.color} strokeWidth="1.5" rx="6" />
              )}
              {!isSpecial && (
                <rect x={n.x} y={n.y} width={n.w} height={4} fill={n.color} rx="2" />
              )}
              <text x={n.x + n.w / 2} y={n.y + (n.sub ? n.h / 2 - 2 : n.h / 2 + 4)} textAnchor="middle" fill={isSpecial ? n.color : "var(--text-primary)"} fontSize={isSpecial ? 11 : 13} fontWeight={isSpecial ? 600 : 600} fontFamily="system-ui">
                {n.label}
              </text>
              {n.sub && (
                <text x={n.x + n.w / 2} y={n.y + n.h / 2 + 12} textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui">
                  {n.sub}
                </text>
              )}
            </g>
          );
        })}

        {/* 关键参数标注 */}
        <g>
          <rect x={600} y={140} width={180} height={50} fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" rx="5" />
          <text x={690} y={158} textAnchor="middle" fill="var(--warning)" fontSize="10" fontWeight="600" fontFamily="system-ui">Transition 关键参数</text>
          <text x={610} y={174} fill="var(--text-secondary)" fontSize="9" fontFamily="system-ui">Has Exit Time · Fixed Duration</text>
          <text x={610} y={186} fill="var(--text-secondary)" fontSize="9" fontFamily="system-ui">Transition Duration · Interruption</text>
        </g>

        <defs>
          <marker id="asm-arrow" markerWidth="7" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 7 3, 0 6" fill="var(--border)" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
