/**
 * <FSMvsBT>：有限状态机(FSM) vs 行为树(BT) 结构对比图
 *
 * 左侧：FSM 状态图——节点是状态（Idle/Patrol/Chase/Attack/Flee），连线是转换条件
 *       展示状态爆炸问题：N个状态需要N*(N-1)条转换线
 * 右侧：行为树——树状层级结构
 *       Root → Selector(优先级选择) → Sequence(顺序执行)/Decorator(装饰器)/Leaf(叶子行为)
 *       标注：Selector（?）/ Sequence（→）/ Decorator（装饰）/ Leaf（动作）
 */

const VIEW_W = 780;
const VIEW_H = 460;

// FSM 节点定义
type FSMNode = {
  id: string;
  label: string;
  sub: string;
  x: number;
  y: number;
  color: string;
};

const FSM_NODES: readonly FSMNode[] = [
  { id: "idle", label: "Idle", sub: "待机", x: 60, y: 180, color: "var(--accent)" },
  { id: "patrol", label: "Patrol", sub: "巡逻", x: 200, y: 90, color: "var(--success)" },
  { id: "chase", label: "Chase", sub: "追击", x: 200, y: 270, color: "var(--warning)" },
  { id: "attack", label: "Attack", sub: "攻击", x: 340, y: 180, color: "var(--danger)" },
  { id: "flee", label: "Flee", sub: "逃跑", x: 60, y: 340, color: "var(--text-secondary)" },
];

type FSMTrans = { from: string; to: string; label: string };

const FSM_TRANS: readonly FSMTrans[] = [
  { from: "idle", to: "patrol", label: "无目标" },
  { from: "patrol", to: "idle", label: "巡逻完" },
  { from: "idle", to: "chase", label: "发现敌人" },
  { from: "chase", to: "idle", label: "丢失目标" },
  { from: "patrol", to: "chase", label: "发现敌人" },
  { from: "chase", to: "attack", label: "在攻击范围" },
  { from: "attack", to: "chase", label: "超出范围" },
  { from: "chase", to: "flee", label: "HP<20%" },
  { from: "attack", to: "flee", label: "HP<20%" },
  { from: "flee", to: "idle", label: "脱离战斗" },
];

// BT 节点
type BTNode = {
  label: string;
  type: "root" | "selector" | "sequence" | "decorator" | "leaf";
  x: number;
  y: number;
  desc?: string;
};

const BT_NODES: readonly BTNode[] = [
  { label: "Root", type: "root", x: 600, y: 50, desc: "根节点" },
  { label: "?", type: "selector", x: 480, y: 120, desc: "Selector 选择" },
  { label: "?", type: "selector", x: 720, y: 120, desc: "Selector" },
  { label: "→", type: "sequence", x: 430, y: 200, desc: "Sequence 顺序" },
  { label: "D", type: "decorator", x: 550, y: 200, desc: "Decorator" },
  { label: "→", type: "sequence", x: 680, y: 200, desc: "Sequence" },
  { label: "Leaf", type: "leaf", x: 750, y: 200, desc: "Flee逃跑" },
  { label: "Leaf", type: "leaf", x: 380, y: 290, desc: "MoveToTarget" },
  { label: "Leaf", type: "leaf", x: 480, y: 290, desc: "Attack攻击" },
  { label: "Leaf", type: "leaf", x: 550, y: 290, desc: "Patrol巡逻" },
  { label: "Leaf", type: "leaf", x: 630, y: 290, desc: "Idle待机" },
  { label: "Leaf", type: "leaf", x: 710, y: 290, desc: "Chase追击" },
];

function fsmCenter(n: FSMNode) {
  return { cx: n.x + 40, cy: n.y + 24 };
}

function findFSM(id: string) {
  return FSM_NODES.find((n) => n.id === id)!;
}

function btColor(type: string): string {
  switch (type) {
    case "root": return "var(--text-primary)";
    case "selector": return "var(--danger)";
    case "sequence": return "var(--success)";
    case "decorator": return "var(--warning)";
    case "leaf": return "var(--accent)";
    default: return "var(--border)";
  }
}

export function FSMvsBT() {
  return (
    <div className="my-8 w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="mx-auto w-full max-w-[780px]"
        style={{ minWidth: 640 }}
        role="img"
        aria-label="有限状态机与行为树结构对比"
      >
        <rect x="0" y="0" width={VIEW_W} height={VIEW_H} fill="var(--bg-elevated)" rx="12" />

        {/* 标题 */}
        <text x={VIEW_W / 2} y={28} textAnchor="middle" fill="var(--text-primary)" fontSize="17" fontWeight="600" fontFamily="system-ui">
          有限状态机（FSM） vs 行为树（BT）
        </text>
        <text x={VIEW_W / 2} y={46} textAnchor="middle" fill="var(--text-secondary)" fontSize="11" fontFamily="system-ui">
          FSM用连线表达转换→状态爆炸；BT用树状组合→复用性强
        </text>

        {/* 分隔线 */}
        <line x1={390} y1={60} x2={390} y2={440} stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4" />
        <text x={195} y={72} textAnchor="middle" fill="var(--warning)" fontSize="12" fontWeight="600" fontFamily="system-ui">FSM 有限状态机</text>
        <text x={585} y={72} textAnchor="middle" fill="var(--success)" fontSize="12" fontWeight="600" fontFamily="system-ui">BT 行为树</text>

        {/* === 左侧：FSM === */}
        <g>
          {/* FSM连线（先画） */}
          {FSM_TRANS.map((t, i) => {
            const from = findFSM(t.from);
            const to = findFSM(t.to);
            const fc = fsmCenter(from);
            const tc = fsmCenter(to);
            // 简单曲线连接
            const dy = tc.cy - fc.cy;
            const mx = (fc.cx + tc.cx) / 2 + (Math.abs(dy) > 60 ? 15 * (dy > 0 ? 1 : -1) : 0);
            const my = (fc.cy + tc.cy) / 2;
            const d = `M ${fc.cx} ${fc.cy} Q ${mx} ${my} ${tc.cx} ${tc.cy}`;
            return (
              <g key={i}>
                <path d={d} stroke="var(--border)" strokeWidth="1" fill="none" markerEnd="url(#fb-fsm-arrow)" />
              </g>
            );
          })}

          {/* FSM节点 */}
          {FSM_NODES.map((n) => (
            <g key={n.id}>
              <rect x={n.x} y={n.y} width={80} height={48} fill="var(--bg)" stroke={n.color} strokeWidth="1.5" rx="6" />
              <rect x={n.x} y={n.y} width={80} height={4} fill={n.color} rx="2" />
              <text x={n.x + 40} y={n.y + 22} textAnchor="middle" fill="var(--text-primary)" fontSize="12" fontWeight="600" fontFamily="system-ui">{n.label}</text>
              <text x={n.x + 40} y={n.y + 38} textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui">{n.sub}</text>
            </g>
          ))}

          {/* 状态爆炸标注 */}
          <rect x={30} y={390} width={330} height={48} fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1" rx="5" />
          <text x={195} y={408} textAnchor="middle" fill="var(--danger)" fontSize="10" fontWeight="600" fontFamily="system-ui">状态爆炸问题</text>
          <text x={195} y={424} textAnchor="middle" fill="var(--text-secondary)" fontSize="9" fontFamily="system-ui">5个状态 = 10+条转换线，新增状态需改所有相关转换</text>
        </g>

        {/* === 右侧：BT === */}
        <g>
          {/* BT连线 */}
          {[
            ["Root", "?"], ["Root", "?"],  // root -> 两个selector
            // 左selector -> children
            // 简化：手动连线
          ].map(() => null)}
          {/* 手动绘制树连线 */}
          {/* Root -> Selector(480,120) */}
          <path d="M 600 70 L 480 110" stroke="var(--border)" strokeWidth="1.5" fill="none" />
          {/* Root -> Selector(720,120) */}
          <path d="M 600 70 L 720 110" stroke="var(--border)" strokeWidth="1.5" fill="none" />
          {/* Selector(480,120) -> Sequence(430,200) */}
          <path d="M 480 140 L 430 190" stroke="var(--border)" strokeWidth="1.2" fill="none" />
          {/* Selector(480,120) -> Decorator(550,200) */}
          <path d="M 480 140 L 550 190" stroke="var(--border)" strokeWidth="1.2" fill="none" />
          {/* Selector(720,120) -> Sequence(680,200) */}
          <path d="M 720 140 L 680 190" stroke="var(--border)" strokeWidth="1.2" fill="none" />
          {/* Selector(720,120) -> Leaf(750,200) */}
          <path d="M 720 140 L 750 190" stroke="var(--border)" strokeWidth="1.2" fill="none" />
          {/* Sequence(430,200) -> Leaf(380,290) */}
          <path d="M 430 220 L 380 280" stroke="var(--border)" strokeWidth="1" fill="none" />
          {/* Sequence(430,200) -> Leaf(480,290) */}
          <path d="M 430 220 L 480 280" stroke="var(--border)" strokeWidth="1" fill="none" />
          {/* Decorator(550,200) -> Leaf(550,290) */}
          <path d="M 550 220 L 550 280" stroke="var(--border)" strokeWidth="1" fill="none" />
          {/* Sequence(680,200) -> Leaf(630,290) */}
          <path d="M 680 220 L 630 280" stroke="var(--border)" strokeWidth="1" fill="none" />
          {/* Sequence(680,200) -> Leaf(710,290) */}
          <path d="M 680 220 L 710 280" stroke="var(--border)" strokeWidth="1" fill="none" />

          {/* BT节点 */}
          {BT_NODES.map((n, i) => {
            const c = btColor(n.type);
            const w = n.type === "root" ? 60 : n.type === "leaf" ? 80 : 50;
            const h = n.type === "root" ? 28 : 34;
            const isDiamond = n.type === "selector" || n.type === "sequence";
            const isRect = n.type === "decorator" || n.type === "leaf" || n.type === "root";
            return (
              <g key={i}>
                {isDiamond && (
                  <polygon
                    points={`${n.x},${n.y - h / 2} ${n.x + w / 2},${n.y} ${n.x},${n.y + h / 2} ${n.x - w / 2},${n.y}`}
                    fill="var(--bg)"
                    stroke={c}
                    strokeWidth="1.5"
                  />
                )}
                {isRect && (
                  <rect x={n.x - w / 2} y={n.y - h / 2} width={w} height={h} fill="var(--bg)" stroke={c} strokeWidth="1.5" rx={n.type === "root" ? 4 : 5} />
                )}
                <text x={n.x} y={n.y + 4} textAnchor="middle" fill={c} fontSize={n.type === "leaf" ? 9 : 11} fontWeight="600" fontFamily="system-ui">
                  {n.label}
                </text>
                {n.desc && n.type === "leaf" && (
                  <text x={n.x} y={n.y + h / 2 + 12} textAnchor="middle" fill="var(--text-secondary)" fontSize="8" fontFamily="system-ui">{n.desc}</text>
                )}
              </g>
            );
          })}

          {/* 图例 */}
          <g>
            <rect x={410} y={340} width={350} height={90} fill="var(--bg)" stroke="var(--border)" strokeWidth="1" rx="5" />
            <text x={420} y={358} fill="var(--text-primary)" fontSize="10" fontWeight="600" fontFamily="system-ui">节点类型图例</text>

            {[
              { label: "Root 根", color: "var(--text-primary)", shape: "rect" },
              { label: "? Selector 选择（OR：一个成功即成功）", color: "var(--danger)", shape: "diamond" },
              { label: "→ Sequence 顺序（AND：全部成功才成功）", color: "var(--success)", shape: "diamond" },
              { label: "D Decorator 装饰（取反/重复/超时）", color: "var(--warning)", shape: "rect" },
              { label: "Leaf 叶子（具体行为/条件判断）", color: "var(--accent)", shape: "rect" },
            ].map((item, i) => {
              const iy = 370 + i * 14;
              return (
                <g key={item.label}>
                  {item.shape === "diamond" ? (
                    <polygon points={`${425},${iy - 4} ${432},${iy + 1} ${425},${iy + 6} ${418},${iy + 1}`} fill="var(--bg)" stroke={item.color} strokeWidth="1" />
                  ) : (
                    <rect x={418} y={iy - 5} width={12} height={10} fill="var(--bg)" stroke={item.color} strokeWidth="1" rx="2" />
                  )}
                  <text x={440} y={iy + 4} fill="var(--text-secondary)" fontSize="9" fontFamily="system-ui">{item.label}</text>
                </g>
              );
            })}
          </g>
        </g>

        <defs>
          <marker id="fb-fsm-arrow" markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto">
            <polygon points="0 0, 6 2.5, 0 5" fill="var(--border)" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
