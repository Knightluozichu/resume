/**
 * <DataFlowPipeline>：配置数据从Excel到游戏运行时的完整流程图
 *
 * 流水线：Excel → CSV/JSON导出 → 导表工具（校验+类型转换）→ ScriptableObject/二进制 →
 *         资源管理（AB/Addressables）→ 运行时读取（ConfigManager）
 * 标注了策划、程序、运行时三个阶段的角色边界。
 */

const VIEW_W = 900;
const VIEW_H = 520;

type Stage = {
  label: string;
  sub: string;
  color: string;
  icon: string;
  x: number;
  y: number;
  w: number;
  h: number;
  role: "策划" | "工具" | "运行时";
};

const STAGES: readonly Stage[] = [
  { label: "Excel", sub: "策划填表 (.xlsx)", color: "var(--success)", icon: "📊", x: 30, y: 100, w: 120, h: 70, role: "策划" },
  { label: "CSV/JSON", sub: "中间格式导出", color: "var(--accent)", icon: "📄", x: 190, y: 100, w: 120, h: 70, role: "工具" },
  { label: "导表工具", sub: "校验·类型转换·ID检查", color: "var(--warning)", icon: "⚙️", x: 350, y: 100, w: 140, h: 70, role: "工具" },
  { label: "ScriptableObject", sub: "Unity资产 (.asset)", color: "var(--accent)", icon: "💾", x: 530, y: 60, w: 150, h: 70, role: "工具" },
  { label: "二进制/JSON", sub: "热更配置文件", color: "var(--accent)", icon: "📦", x: 530, y: 150, w: 150, h: 70, role: "工具" },
  { label: "资源管理", sub: "AB/Addressables打包", color: "var(--text-secondary)", icon: "🗂️", x: 720, y: 100, w: 140, h: 70, role: "工具" },
];

const RUNTIME: Stage = {
  label: "ConfigManager",
  sub: "运行时读取·缓存·热加载",
  color: "var(--danger)",
  icon: "🎮",
  x: 350,
  y: 310,
  w: 200,
  h: 80,
  role: "运行时",
};

function Arrow({ x1, y1, x2, y2, color = "var(--border)", dashed = false, label }: { x1: number; y1: number; x2: number; y2: number; color?: string; dashed?: boolean; label?: string }) {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  return (
    <g>
      <path
        d={`M ${x1} ${y1} L ${x2} ${y2}`}
        stroke={color}
        strokeWidth="2"
        fill="none"
        strokeDasharray={dashed ? "5 4" : "none"}
        markerEnd="url(#df-arrow)"
      />
      {label && (
        <text x={midX} y={midY - 6} textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui">
          {label}
        </text>
      )}
    </g>
  );
}

function StageBox({ s }: { s: Stage }) {
  return (
    <g>
      <rect
        x={s.x}
        y={s.y}
        width={s.w}
        height={s.h}
        fill="var(--bg)"
        stroke={s.color}
        strokeWidth="1.5"
        rx="8"
      />
      <rect x={s.x} y={s.y} width={4} height={s.h} fill={s.color} rx="2" />
      <text x={s.x + 16} y={s.y + 28} fill={s.color} fontSize="20">
        {s.icon}
      </text>
      <text x={s.x + 44} y={s.y + 26} fill="var(--text-primary)" fontSize="13" fontWeight="600" fontFamily="system-ui">
        {s.label}
      </text>
      <text x={s.x + 44} y={s.y + 44} fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui">
        {s.sub}
      </text>
    </g>
  );
}

export function DataFlowPipeline() {
  return (
    <div className="my-8 w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="mx-auto w-full max-w-[900px]"
        style={{ minWidth: 680 }}
        role="img"
        aria-label="配置数据从Excel到游戏运行时的完整流水线"
      >
        <rect x="0" y="0" width={VIEW_W} height={VIEW_H} fill="var(--bg-elevated)" rx="12" />

        {/* 标题 */}
        <text x={VIEW_W / 2} y={32} textAnchor="middle" fill="var(--text-primary)" fontSize="17" fontWeight="600" fontFamily="system-ui">
          配置数据流流水线
        </text>
        <text x={VIEW_W / 2} y={52} textAnchor="middle" fill="var(--text-secondary)" fontSize="11" fontFamily="system-ui">
          Excel → 导表工具 → 资产文件 → 资源管理 → 运行时读取
        </text>

        {/* 角色分区背景 */}
        <rect x="20" y="72" width="140" height="120" fill="var(--success)" fillOpacity="0.05" stroke="var(--success)" strokeWidth="1" strokeDasharray="4 4" rx="8" />
        <text x="90" y="88" textAnchor="middle" fill="var(--success)" fontSize="11" fontWeight="600" fontFamily="system-ui">策划阶段</text>

        <rect x="180" y="72" width="690" height="165" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1" strokeDasharray="4 4" rx="8" />
        <text x="525" y="88" textAnchor="middle" fill="var(--accent)" fontSize="11" fontWeight="600" fontFamily="system-ui">CI/工具阶段（程序维护）</text>

        <rect x="20" y="280" width="860" height="130" fill="var(--danger)" fillOpacity="0.05" stroke="var(--danger)" strokeWidth="1" strokeDasharray="4 4" rx="8" />
        <text x="450" y="298" textAnchor="middle" fill="var(--danger)" fontSize="11" fontWeight="600" fontFamily="system-ui">游戏运行时</text>

        {/* 各阶段节点 */}
        {STAGES.map((s) => (
          <StageBox key={s.label} s={s} />
        ))}

        {/* 水平箭头 */}
        <Arrow x1={150} y1={135} x2={190} y2={135} label="导出" />
        <Arrow x1={310} y1={135} x2={350} y2={135} label="解析" />

        {/* 导表工具分叉 */}
        <path d="M 490 120 L 530 95" stroke="var(--border)" strokeWidth="2" fill="none" markerEnd="url(#df-arrow)" />
        <text x={505} y={98} fill="var(--text-secondary)" fontSize="9" fontFamily="system-ui">开发期</text>
        <path d="M 490 150 L 530 185" stroke="var(--border)" strokeWidth="2" fill="none" markerEnd="url(#df-arrow)" />
        <text x={498} y={178} fill="var(--text-secondary)" fontSize="9" fontFamily="system-ui">热更期</text>

        {/* 两路汇合 */}
        <Arrow x1={680} y1={95} x2={720} y2={125} />
        <Arrow x1={680} y1={185} x2={720} y2={145} />

        {/* 资源管理到运行时 */}
        <path d="M 790 170 L 790 260 L 550 260 L 550 310" stroke="var(--danger)" strokeWidth="2.5" fill="none" markerEnd="url(#df-arrow-red)" />
        <text x={700} y={250} fill="var(--danger)" fontSize="10" fontWeight="500" fontFamily="system-ui">加载到内存</text>

        {/* 热更虚线（绕过打包直接到运行时） */}
        <path
          d="M 605 220 L 605 270 L 500 270 L 500 310"
          stroke="var(--warning)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="6 4"
          markerEnd="url(#df-arrow-yellow)"
        />
        <text x={640} y={240} fill="var(--warning)" fontSize="10" fontWeight="500" fontFamily="system-ui">热更下载→直接覆盖</text>

        {/* 运行时节点 */}
        <StageBox s={RUNTIME} />

        {/* 运行时消费者 */}
        <g>
          <rect x={80} y={370} width={140} height={50} fill="var(--bg)" stroke="var(--border)" strokeWidth="1" rx="6" />
          <text x={150} y={392} textAnchor="middle" fill="var(--text-primary)" fontSize="12" fontWeight="500" fontFamily="system-ui">业务系统</text>
          <text x={150} y={408} textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui">Config.Get&lt;T&gt;(id)</text>

          <rect x={280} y={370} width={140} height={50} fill="var(--bg)" stroke="var(--border)" strokeWidth="1" rx="6" />
          <text x={350} y={392} textAnchor="middle" fill="var(--text-primary)" fontSize="12" fontWeight="500" fontFamily="system-ui">UI表现</text>
          <text x={350} y={408} textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui">多语言·图标·描述</text>

          <rect x={480} y={370} width={140} height={50} fill="var(--bg)" stroke="var(--border)" strokeWidth="1" rx="6" />
          <text x={550} y={392} textAnchor="middle" fill="var(--text-primary)" fontSize="12" fontWeight="500" fontFamily="system-ui">3D场景</text>
          <text x={550} y={408} textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui">模型·特效·数值</text>

          <rect x={680} y={370} width={140} height={50} fill="var(--bg)" stroke="var(--border)" strokeWidth="1" rx="6" />
          <text x={750} y={392} textAnchor="middle" fill="var(--text-primary)" fontSize="12" fontWeight="500" fontFamily="system-ui">存档系统</text>
          <text x={750} y={408} textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui">默认值·初始配置</text>
        </g>

        {/* 运行时到消费者的箭头 */}
        {[150, 350, 550, 750].map((cx, i) => (
          <path
            key={i}
            d={`M 450 390 L ${cx} 370`}
            stroke="var(--border)"
            strokeWidth="1"
            fill="none"
            strokeDasharray="3 3"
          />
        ))}

        {/* 校验标注 */}
        <g>
          <rect x={355} y={180} width={130} height={50} fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" rx="6" />
          <text x={420} y={198} textAnchor="middle" fill="var(--warning)" fontSize="11" fontWeight="600" fontFamily="system-ui">导表校验项</text>
          <text x={420} y={214} textAnchor="middle" fill="var(--text-secondary)" fontSize="9" fontFamily="system-ui">类型·ID唯一·外键·范围·空值</text>
        </g>

        <defs>
          <marker id="df-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="var(--border)" />
          </marker>
          <marker id="df-arrow-red" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="var(--danger)" />
          </marker>
          <marker id="df-arrow-yellow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="var(--warning)" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
