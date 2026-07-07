/**
 * <SkinnedMeshBones>：蒙皮骨骼示意图
 *
 * 展示SkinnedMeshRenderer的骨骼蒙皮原理：
 * - 骨骼层级（骨盆→脊柱→胸廓→头/手臂/腿的树形结构）
 * - 网格顶点绑定到骨骼（每个顶点最多4根骨骼权重）
 * - 骨骼运动时顶点按权重加权变换
 * 左侧：骨骼树；右侧：网格+骨骼+权重分布。
 */

const VIEW_W = 860;
const VIEW_H = 480;

type Bone = {
  id: string;
  label: string;
  x: number;
  y: number;
  r: number;
  parent?: string;
  color: string;
};

const BONES: readonly Bone[] = [
  { id: "root", label: "Root", x: 230, y: 370, r: 10, color: "var(--danger)" },
  { id: "pelvis", label: "Pelvis 骨盆", x: 230, y: 330, r: 12, parent: "root", color: "var(--warning)" },
  { id: "spine", label: "Spine 脊柱", x: 230, y: 280, r: 10, parent: "pelvis", color: "var(--warning)" },
  { id: "chest", label: "Chest 胸廓", x: 230, y: 230, r: 12, parent: "spine", color: "var(--accent)" },
  { id: "neck", label: "Neck", x: 230, y: 180, r: 8, parent: "chest", color: "var(--accent)" },
  { id: "head", label: "Head 头", x: 230, y: 140, r: 14, parent: "neck", color: "var(--success)" },

  { id: "lshoulder", label: "", x: 185, y: 220, r: 8, parent: "chest", color: "var(--accent)" },
  { id: "lelbow", label: "L_Arm", x: 145, y: 270, r: 7, parent: "lshoulder", color: "var(--text-secondary)" },
  { id: "lhand", label: "", x: 110, y: 320, r: 7, parent: "lelbow", color: "var(--text-secondary)" },

  { id: "rshoulder", label: "", x: 275, y: 220, r: 8, parent: "chest", color: "var(--accent)" },
  { id: "relbow", label: "R_Arm", x: 315, y: 270, r: 7, parent: "rshoulder", color: "var(--text-secondary)" },
  { id: "rhand", label: "", x: 350, y: 320, r: 7, parent: "relbow", color: "var(--text-secondary)" },

  { id: "lthigh", label: "L_Leg", x: 210, y: 390, r: 8, parent: "pelvis", color: "var(--text-secondary)" },
  { id: "lknee", label: "", x: 200, y: 430, r: 7, parent: "lthigh", color: "var(--text-secondary)" },
  { id: "lfoot", label: "", x: 195, y: 460, r: 7, parent: "lknee", color: "var(--text-secondary)" },

  { id: "rthigh", label: "R_Leg", x: 250, y: 390, r: 8, parent: "pelvis", color: "var(--text-secondary)" },
  { id: "rknee", label: "", x: 260, y: 430, r: 7, parent: "rthigh", color: "var(--text-secondary)" },
  { id: "rfoot", label: "", x: 265, y: 460, r: 7, parent: "rknee", color: "var(--text-secondary)" },
];

function findBone(id: string) {
  return BONES.find((b) => b.id === id)!;
}

export function SkinnedMeshBones() {
  return (
    <div className="my-8 w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="mx-auto w-full max-w-[860px]"
        style={{ minWidth: 680 }}
        role="img"
        aria-label="蒙皮骨骼权重绑定示意图"
      >
        <rect x="0" y="0" width={VIEW_W} height={VIEW_H} fill="var(--bg-elevated)" rx="12" />

        <text x={VIEW_W / 2} y={32} textAnchor="middle" fill="var(--text-primary)" fontSize="17" fontWeight="600" fontFamily="system-ui">
          SkinnedMeshRenderer：骨骼与蒙皮权重
        </text>
        <text x={VIEW_W / 2} y={52} textAnchor="middle" fill="var(--text-secondary)" fontSize="11" fontFamily="system-ui">
          骨骼是变换层级，顶点按权重绑定到骨骼（最多4根），动画时加权计算顶点位置
        </text>

        {/* 左侧：骨骼树 */}
        <g>
          <rect x={30} y={70} width={380} height={380} fill="var(--bg)" stroke="var(--border)" strokeWidth="1" rx="8" />
          <text x={220} y={92} textAnchor="middle" fill="var(--text-primary)" fontSize="12" fontWeight="600" fontFamily="system-ui">
            骨骼层级（树形结构 Transform Hierarchy）
          </text>

          {/* 骨骼连线 */}
          {BONES.filter((b) => b.parent).map((b) => {
            const p = findBone(b.parent!);
            return (
              <line
                key={b.id}
                x1={p.x}
                y1={p.y}
                x2={b.x}
                y2={b.y}
                stroke="var(--border)"
                strokeWidth="3"
                strokeLinecap="round"
              />
            );
          })}

          {/* 骨骼节点 */}
          {BONES.map((b) => (
            <g key={b.id}>
              <circle cx={b.x} cy={b.y} r={b.r} fill={b.color} fillOpacity="0.2" stroke={b.color} strokeWidth="1.5" />
              {b.label && (
                <text x={b.x + b.r + 6} y={b.y + 4} fill={b.color} fontSize="10" fontWeight="500" fontFamily="system-ui">
                  {b.label}
                </text>
              )}
            </g>
          ))}

          {/* T-Pose人形轮廓（简化） */}
          <ellipse cx={230} cy={140} rx={22} ry={26} fill="none" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3 2" />
          <path d="M 230 165 Q 230 200 230 260 Q 230 290 230 330" fill="none" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3 2" />
          <path d="M 230 230 Q 180 230 130 290 Q 110 310 110 320" fill="none" stroke="var(--text-secondary)" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3 2" />
          <path d="M 230 230 Q 280 230 330 290 Q 350 310 350 320" fill="none" stroke="var(--text-secondary)" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3 2" />
          <path d="M 230 330 Q 210 380 200 430 Q 195 450 195 460" fill="none" stroke="var(--text-secondary)" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3 2" />
          <path d="M 230 330 Q 250 380 260 430 Q 265 450 265 460" fill="none" stroke="var(--text-secondary)" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3 2" />
        </g>

        {/* 右侧：蒙皮权重示意 */}
        <g>
          <rect x={440} y={70} width={390} height={380} fill="var(--bg)" stroke="var(--border)" strokeWidth="1" rx="8" />
          <text x={635} y={92} textAnchor="middle" fill="var(--text-primary)" fontSize="12" fontWeight="600" fontFamily="system-ui">
            顶点权重绑定（Vertex Weight Binding）
          </text>

          {/* 简化网格：用顶点+连线表示 */}
          {/* 一个肩部区域的顶点群 */}
          {[
            { x: 540, y: 200, w: [{ b: "chest", w: 0.7 }, { b: "lshoulder", w: 0.3 }] },
            { x: 560, y: 180, w: [{ b: "chest", w: 0.4 }, { b: "lshoulder", w: 0.6 }] },
            { x: 580, y: 200, w: [{ b: "lshoulder", w: 0.8 }, { b: "chest", w: 0.2 }] },
            { x: 560, y: 220, w: [{ b: "spine", w: 0.3 }, { b: "chest", w: 0.7 }] },
            { x: 520, y: 220, w: [{ b: "spine", w: 0.6 }, { b: "chest", w: 0.4 }] },
            { x: 600, y: 180, w: [{ b: "lshoulder", w: 0.5 }, { b: "lelbow", w: 0.5 }] },
            { x: 620, y: 220, w: [{ b: "lelbow", w: 0.9 }, { b: "lshoulder", w: 0.1 }] },
            { x: 600, y: 260, w: [{ b: "lelbow", w: 0.7 }, { b: "lhand", w: 0.3 }] },
            { x: 540, y: 260, w: [{ b: "spine", w: 0.8 }, { b: "pelvis", w: 0.2 }] },
          ].map((v, i) => {
            const mainColor = v.w[0].b.includes("chest") || v.w[0].b.includes("spine")
              ? "var(--accent)"
              : v.w[0].b.includes("shoulder")
              ? "var(--warning)"
              : v.w[0].b.includes("elbow") || v.w[0].b.includes("hand")
              ? "var(--text-secondary)"
              : "var(--text-secondary)";
            return (
              <g key={i}>
                <circle cx={v.x} cy={v.y} r={4} fill={mainColor} stroke="var(--bg-elevated)" strokeWidth="1" />
                {/* 权重条 */}
                <rect x={v.x - 15} y={v.y + 8} width={30} height={3} fill="var(--border)" rx="1" />
                <rect x={v.x - 15} y={v.y + 8} width={30 * v.w[0].w} height={3} fill={mainColor} rx="1" />
              </g>
            );
          })}

          {/* 网格连线 */}
          <path d="M 540 200 L 560 180 L 580 200 L 560 220 L 540 200 M 580 200 L 600 180 L 620 220 L 600 260 L 560 220 M 540 200 L 520 220 L 560 220 M 520 220 L 540 260 L 560 220" stroke="var(--border)" strokeWidth="0.8" fill="none" opacity="0.5" />

          {/* 代码示例 */}
          <rect x={460} y={290} width={350} height={140} fill="var(--bg-elevated)" rx="6" />
          <text x={476} y={312} fill="var(--text-primary)" fontSize="11" fontWeight="600" fontFamily="system-ui">顶点数据结构（简化）</text>
          <text x={476} y={332} fill="var(--accent)" fontSize="10" fontFamily="JetBrains Mono, monospace">{"struct Vertex {"}</text>
          <text x={488} y={348} fill="var(--text-secondary)" fontSize="10" fontFamily="JetBrains Mono, monospace">{"Vector3 position;   // 顶点位置"}</text>
          <text x={488} y={364} fill="var(--text-secondary)" fontSize="10" fontFamily="JetBrains Mono, monospace">{"Vector3 normal;"}</text>
          <text x={488} y={380} fill="var(--warning)" fontSize="10" fontFamily="JetBrains Mono, monospace">{"int   boneIndex[4]; // 最多4根骨骼索引"}</text>
          <text x={488} y={396} fill="var(--warning)" fontSize="10" fontFamily="JetBrains Mono, monospace">{"float weight[4];   // 对应权重，和=1"}</text>
          <text x={476} y={412} fill="var(--accent)" fontSize="10" fontFamily="JetBrains Mono, monospace">{"}"}</text>
        </g>

        {/* 底部公式 */}
        <rect x={30} y={VIEW_H - 40} width={VIEW_W - 60} height={28} fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" rx="5" />
        <text x={VIEW_W / 2} y={VIEW_H - 21} textAnchor="middle" fill="var(--accent)" fontSize="11" fontFamily="JetBrains Mono, monospace">
          V_world = Σ weight[i] × Matrix[i] × V_bind   （加权变换，weight[i] 之和 = 1.0）
        </text>
      </svg>
    </div>
  );
}
