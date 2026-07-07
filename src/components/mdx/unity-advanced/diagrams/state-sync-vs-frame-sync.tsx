/**
 * <StateSyncVsFrameSync>：状态同步 vs 帧同步对比图
 *
 * 左右分栏对比：
 * - 左侧：状态同步（服务器权威，同步状态快照，流量大，延迟容忍低~中）
 * - 右侧：帧同步（同步操作指令，流量小，延迟容忍极低，需确定性）
 * 中间：对比维度标签（同步内容/流量/延迟/防作弊/适用类型/回放）
 * 底部：混合方案说明
 */

const VIEW_W = 780;
const VIEW_H = 460;

type Dim = {
  label: string;
  stateSync: string;
  frameSync: string;
};

const DIMS: readonly Dim[] = [
  { label: "同步内容", stateSync: "状态快照（位置/HP/状态）", frameSync: "操作指令（移动/技能输入）" },
  { label: "服务器角色", stateSync: "权威计算·广播结果", frameSync: "只转发指令·不计算" },
  { label: "流量消耗", stateSync: "大（状态数据频繁广播）", frameSync: "小（指令很短·广播输入）" },
  { label: "延迟容忍", stateSync: "中（插值/缓冲可掩盖）", frameSync: "极低（>100ms手感差）" },
  { label: "防作弊", stateSync: "强（服务器算结果）", frameSync: "弱（客户端本地算结果）" },
  { label: "断线重连", stateSync: "简单（收一次快照即可）", frameSync: "复杂（需追帧补指令）" },
  { label: "战斗回放", stateSync: "需录制状态·文件大", frameSync: "天然支持·录指令即可" },
  { label: "适用类型", stateSync: "MMO·RPG·射击·开放世界", frameSync: "MOBA·格斗·RTS·体育" },
];

const ROW_H = 38;
const TABLE_Y = 90;

export function StateSyncVsFrameSync() {
  return (
    <div className="my-8 w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="mx-auto w-full max-w-[780px]"
        style={{ minWidth: 620 }}
        role="img"
        aria-label="状态同步与帧同步对比"
      >
        <rect x="0" y="0" width={VIEW_W} height={VIEW_H} fill="var(--bg-elevated)" rx="12" />

        {/* 标题 */}
        <text x={VIEW_W / 2} y={30} textAnchor="middle" fill="var(--text-primary)" fontSize="17" fontWeight="600" fontFamily="system-ui">
          状态同步 vs 帧同步
        </text>
        <text x={VIEW_W / 2} y={48} textAnchor="middle" fill="var(--text-secondary)" fontSize="11" fontFamily="system-ui">
          多人游戏网络同步的两大流派，核心差异在&quot;同步什么&quot;
        </text>

        {/* 表头 */}
        <rect x={30} y={TABLE_Y - 28} width={130} height={26} fill="var(--bg)" stroke="var(--border)" strokeWidth="1" rx="4" />
        <text x={95} y={TABLE_Y - 10} textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontWeight="600" fontFamily="system-ui">对比维度</text>

        <rect x={165} y={TABLE_Y - 28} width={280} height={26} fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" rx="4" />
        <text x={305} y={TABLE_Y - 10} textAnchor="middle" fill="var(--accent)" fontSize="11" fontWeight="600" fontFamily="system-ui">状态同步 State Sync</text>

        <rect x={450} y={TABLE_Y - 28} width={300} height={26} fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" rx="4" />
        <text x={600} y={TABLE_Y - 10} textAnchor="middle" fill="var(--warning)" fontSize="11" fontWeight="600" fontFamily="system-ui">帧同步 Frame Sync（Lockstep）</text>

        {/* 表格行 */}
        {DIMS.map((dim, i) => {
          const y = TABLE_Y + i * ROW_H;
          const isAlt = i % 2 === 0;
          return (
            <g key={dim.label}>
              {/* 维度列 */}
              <rect x={30} y={y} width={130} height={ROW_H} fill={isAlt ? "var(--bg)" : "transparent"} stroke="var(--border)" strokeWidth="0.5" rx="0" />
              <text x={95} y={y + 24} textAnchor="middle" fill="var(--text-primary)" fontSize="10" fontWeight="500" fontFamily="system-ui">{dim.label}</text>

              {/* 状态同步列 */}
              <rect x={165} y={y} width={280} height={ROW_H} fill={isAlt ? "var(--accent)" : "var(--accent)"} fillOpacity={isAlt ? "0.04" : "0.02"} stroke="var(--border)" strokeWidth="0.5" />
              <text x={175} y={y + 24} fill="var(--text-primary)" fontSize="10" fontFamily="system-ui">{dim.stateSync}</text>

              {/* 帧同步列 */}
              <rect x={450} y={y} width={300} height={ROW_H} fill={isAlt ? "var(--warning)" : "var(--warning)"} fillOpacity={isAlt ? "0.04" : "0.02"} stroke="var(--border)" strokeWidth="0.5" />
              <text x={460} y={y + 24} fill="var(--text-primary)" fontSize="10" fontFamily="system-ui">{dim.frameSync}</text>
            </g>
          );
        })}

        {/* 底部：架构示意 */}
        <g>
          <rect x={30} y={TABLE_Y + DIMS.length * ROW_H + 12} width={720} height={60} fill="var(--bg)" stroke="var(--border)" strokeWidth="1" rx="6" />
          <text x={45} y={TABLE_Y + DIMS.length * ROW_H + 30} fill="var(--success)" fontSize="10" fontWeight="600" fontFamily="system-ui">混合方案（主流大项目）</text>

          <rect x={45} y={TABLE_Y + DIMS.length * ROW_H + 38} width={200} height={26} fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="0.8" rx="4" />
          <text x={145} y={TABLE_Y + DIMS.length * ROW_H + 55} textAnchor="middle" fill="var(--text-primary)" fontSize="9" fontFamily="system-ui">角色移动/位置 = 状态同步</text>

          <rect x={260} y={TABLE_Y + DIMS.length * ROW_H + 38} width={200} height={26} fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="0.8" rx="4" />
          <text x={360} y={TABLE_Y + DIMS.length * ROW_H + 55} textAnchor="middle" fill="var(--text-primary)" fontSize="9" fontFamily="system-ui">技能/战斗结算 = 帧同步</text>

          <rect x={475} y={TABLE_Y + DIMS.length * ROW_H + 38} width={260} height={26} fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="0.8" rx="4" />
          <text x={605} y={TABLE_Y + DIMS.length * ROW_H + 55} textAnchor="middle" fill="var(--text-primary)" fontSize="9" fontFamily="system-ui">客户端预测 + 服务端校验（回滚）</text>
        </g>
      </svg>
    </div>
  );
}
