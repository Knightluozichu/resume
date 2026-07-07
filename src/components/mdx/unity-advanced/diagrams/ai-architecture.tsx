/**
 * <AIArchitecture>：AI系统架构图（感知层→决策层→行为层 + 黑板系统）
 *
 * 三层架构：
 * - 感知层（Perception）：视觉、听觉、触觉、伤害感知→更新记忆/黑板
 * - 决策层（Decision）：FSM/BT/Utility/GOAP→读取黑板数据→选择行为
 * - 行为层（Action）：移动、攻击、寻路、动画→执行决策→反馈结果
 * 中心：Blackboard黑板（共享数据存储：目标位置、敌人列表、HP、状态等）
 * 右侧：AI LOD（远处AI简化）
 */

const VIEW_W = 780;
const VIEW_H = 460;

export function AIArchitecture() {
  return (
    <div className="my-8 w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="mx-auto w-full max-w-[780px]"
        style={{ minWidth: 620 }}
        role="img"
        aria-label="游戏AI系统三层架构"
      >
        <rect x="0" y="0" width={VIEW_W} height={VIEW_H} fill="var(--bg-elevated)" rx="12" />

        <text x={VIEW_W / 2} y={30} textAnchor="middle" fill="var(--text-primary)" fontSize="17" fontWeight="600" fontFamily="system-ui">
          游戏 AI 系统架构
        </text>
        <text x={VIEW_W / 2} y={48} textAnchor="middle" fill="var(--text-secondary)" fontSize="11" fontFamily="system-ui">
          感知→决策→行为三层，黑板作为共享数据中枢
        </text>

        {/* 感知层 */}
        <g>
          <rect x={30} y={70} width={720} height={80} fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" rx="8" />
          <rect x={30} y={70} width={5} height={80} fill="var(--accent)" rx="2" />
          <text x={50} y={92} fill="var(--accent)" fontSize="14" fontWeight="600" fontFamily="system-ui">感知层 Perception</text>
          <text x={50} y={108} fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui">收集环境信息→写入黑板</text>

          {[
            { label: "视觉 Sight", x: 170, icon: "👁" },
            { label: "听觉 Hearing", x: 290, icon: "👂" },
            { label: "伤害感知", x: 400, icon: "💥" },
            { label: "触达/范围", x: 500, icon: "🎯" },
            { label: "队友通信", x: 610, icon: "📡" },
          ].map((s) => (
            <g key={s.label}>
              <rect x={s.x} y={88} width={90} height={48} fill="var(--bg)" stroke="var(--accent)" strokeWidth="0.8" strokeOpacity="0.4" rx="5" />
              <text x={s.x + 45} y={108} textAnchor="middle" fontSize="16">{s.icon}</text>
              <text x={s.x + 45} y={126} textAnchor="middle" fill="var(--text-primary)" fontSize="9" fontWeight="500" fontFamily="system-ui">{s.label}</text>
            </g>
          ))}
        </g>

        {/* 黑板（中心数据层） */}
        <g>
          <rect x={250} y={170} width={280} height={100} fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.5" rx="10" />
          <rect x={250} y={170} width={280} height={24} fill="var(--warning)" fillOpacity="0.2" rx="10" />
          <text x={390} y={187} textAnchor="middle" fill="var(--warning)" fontSize="12" fontWeight="600" fontFamily="system-ui">Blackboard 黑板（共享记忆）</text>

          {[
            { label: "Target 目标", x: 265 },
            { label: "LastKnownPos", x: 365 },
            { label: "HP/MP", x: 465 },
            { label: "Enemy[] 敌人列表", x: 265, y: 220 },
            { label: "State 状态", x: 395, y: 220 },
            { label: "记忆时间戳", x: 485, y: 220 },
          ].map((b, i) => (
            <g key={i}>
              <rect x={b.x} y={b.y ?? 200} width={85} height={18} fill="var(--bg-elevated)" stroke="var(--warning)" strokeWidth="0.5" strokeOpacity="0.4" rx="3" />
              <text x={b.x + 42} y={(b.y ?? 200) + 13} textAnchor="middle" fill="var(--text-primary)" fontSize="8" fontFamily="JetBrains Mono, monospace">{b.label}</text>
            </g>
          ))}
        </g>

        {/* 感知→黑板 箭头 */}
        <path d="M 390 150 L 390 168" stroke="var(--accent)" strokeWidth="2" fill="none" markerEnd="url(#ai-arrow-accent)" />
        <text x={400} y={162} fill="var(--text-secondary)" fontSize="9" fontFamily="system-ui">写入</text>

        {/* 决策层 */}
        <g>
          <rect x={30} y={290} width={720} height={70} fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" rx="8" />
          <rect x={30} y={290} width={5} height={70} fill="var(--success)" rx="2" />
          <text x={50} y={312} fill="var(--success)" fontSize="14" fontWeight="600" fontFamily="system-ui">决策层 Decision</text>
          <text x={50} y={328} fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui">读取黑板→选择行为</text>

          {[
            { label: "FSM 状态机", x: 170, color: "var(--success)" },
            { label: "BT 行为树", x: 300, color: "var(--success)" },
            { label: "Utility AI", x: 420, color: "var(--success)" },
            { label: "GOAP 规划", x: 540, color: "var(--success)" },
            { label: "ML/深度Q", x: 650, color: "var(--text-secondary)" },
          ].map((d) => (
            <g key={d.label}>
              <rect x={d.x} y={302} width={100} height={44} fill="var(--bg)" stroke={d.color} strokeWidth="0.8" strokeOpacity="0.5" rx="5" />
              <text x={d.x + 50} y={322} textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontWeight="600" fontFamily="system-ui">{d.label}</text>
              <text x={d.x + 50} y={337} textAnchor="middle" fill="var(--text-secondary)" fontSize="8" fontFamily="system-ui">读取黑板</text>
            </g>
          ))}
        </g>

        {/* 黑板→决策 箭头 */}
        <path d="M 390 272 L 390 288" stroke="var(--success)" strokeWidth="2" fill="none" markerEnd="url(#ai-arrow-green)" />
        <text x={400} y={284} fill="var(--text-secondary)" fontSize="9" fontFamily="system-ui">读取</text>

        {/* 行为层 */}
        <g>
          <rect x={30} y={380} width={530} height={60} fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" rx="8" />
          <rect x={30} y={380} width={5} height={60} fill="var(--danger)" rx="2" />
          <text x={50} y={402} fill="var(--danger)" fontSize="14" fontWeight="600" fontFamily="system-ui">行为层 Action</text>
          <text x={50} y={418} fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui">执行决策→驱动角色</text>

          {[
            { label: "移动/寻路", x: 170 },
            { label: "攻击/技能", x: 275 },
            { label: "播放动画", x: 380 },
            { label: "发声/特效", x: 470 },
          ].map((a) => (
            <g key={a.label}>
              <rect x={a.x} y={390} width={80} height={38} fill="var(--bg)" stroke="var(--danger)" strokeWidth="0.8" strokeOpacity="0.4" rx="4" />
              <text x={a.x + 40} y={413} textAnchor="middle" fill="var(--text-primary)" fontSize="9" fontWeight="500" fontFamily="system-ui">{a.label}</text>
            </g>
          ))}
        </g>

        {/* 决策→行为 箭头 */}
        <path d="M 300 362 L 250 378" stroke="var(--danger)" strokeWidth="1.5" fill="none" markerEnd="url(#ai-arrow-red)" />

        {/* 行为→黑板 反馈箭头 */}
        <path d="M 560 410 L 680 410 L 680 220 L 535 220" stroke="var(--text-secondary)" strokeWidth="1.2" fill="none" strokeDasharray="4 3" markerEnd="url(#ai-arrow-dim)" />
        <text x={690} y={310} fill="var(--text-secondary)" fontSize="9" fontFamily="system-ui" writingMode="tb">行为结果回写</text>

        {/* AI LOD 右侧面板 */}
        <g>
          <rect x={580} y={380} width={170} height={60} fill="var(--bg)" stroke="var(--border)" strokeWidth="1" rx="6" />
          <text x={665} y={398} textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontWeight="600" fontFamily="system-ui">AI LOD（性能分级）</text>
          <text x={590} y={414} fill="var(--text-secondary)" fontSize="8" fontFamily="system-ui">近距离：完整BT+感知+IK</text>
          <text x={590} y={426} fill="var(--text-secondary)" fontSize="8" fontFamily="system-ui">中距离：简化BT+低频率更新</text>
          <text x={590} y={438} fill="var(--text-secondary)" fontSize="8" fontFamily="system-ui">远距离：仅播放动画/禁用AI</text>
        </g>

        <defs>
          <marker id="ai-arrow-accent" markerWidth="7" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 7 3, 0 6" fill="var(--accent)" />
          </marker>
          <marker id="ai-arrow-green" markerWidth="7" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 7 3, 0 6" fill="var(--success)" />
          </marker>
          <marker id="ai-arrow-red" markerWidth="7" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 7 3, 0 6" fill="var(--danger)" />
          </marker>
          <marker id="ai-arrow-dim" markerWidth="7" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 7 3, 0 6" fill="var(--text-secondary)" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
