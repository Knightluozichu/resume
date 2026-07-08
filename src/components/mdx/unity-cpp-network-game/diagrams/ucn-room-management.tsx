/**
 * <UcnRoomManagementDiagram>：房间管理与匹配系统——房间生命周期与匹配流程图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function UcnRoomManagementDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="房间管理与匹配系统——房间生命周期与匹配流程图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            房间生命周期与匹配流程
          </text>

          {/* 上半：匹配队列 */}
          <rect x="30" y="50" width="680" height="130" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="74" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">匹配队列（Matchmaking Queue）</text>

          <rect x="50" y="90" width="130" height="45" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="115" y="108" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">玩家请求匹配</text>
          <text x="115" y="124" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">附带 MMR + 模式</text>

          <text x="195" y="115" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="215" y="90" width="130" height="45" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="280" y="108" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">进入匹配池</text>
          <text x="280" y="124" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">按 MMR 分桶排序</text>

          <text x="360" y="115" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="380" y="90" width="130" height="45" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="445" y="108" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">MMR 搜索扩大</text>
          <text x="445" y="124" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">初始 ±50 → ±200</text>

          <text x="525" y="115" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="545" y="90" width="145" height="45" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="617" y="108" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">凑齐人数 → 创建房间</text>
          <text x="617" y="124" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">分配房间服务器</text>

          <text x="370" y="158" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">MMR 匹配窗口随等待时间扩大：10 秒内 ±50，30 秒 ±100，60 秒 ±200，最终全量匹配</text>

          {/* 下半左：房间状态机 */}
          <rect x="30" y="195" width="330" height="240" rx="10" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="195" y="218" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">房间状态机</text>

          <rect x="65" y="235" width="260" height="35" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="195" y="257" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">WAITING 等待加入</text>

          <text x="195" y="284" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr; 人满 / 房主开始</text>

          <rect x="65" y="293" width="260" height="35" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="195" y="315" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">READY 准备中</text>

          <text x="195" y="342" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr; 全员准备</text>

          <rect x="65" y="351" width="260" height="35" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="195" y="373" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">PLAYING 游戏中</text>

          <text x="195" y="400" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr; 游戏结束</text>

          <rect x="65" y="409" width="260" height="20" rx="6" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="195" y="423" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">DESTROYED 结算 → 销毁</text>

          {/* 下半右：房间服务器架构 */}
          <rect x="380" y="195" width="330" height="240" rx="10" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="545" y="218" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">房间服务器架构</text>

          <rect x="410" y="235" width="270" height="35" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="545" y="257" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">大厅服务器（Lobby）</text>

          <text x="545" y="284" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr; 分配房间 → 转发连接信息</text>

          <rect x="410" y="293" width="125" height="35" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="472" y="315" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--success)">房间服 A</text>

          <rect x="545" y="293" width="125" height="35" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="607" y="315" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--success)">房间服 B</text>

          <text x="545" y="350" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">每个房间服跑 N 个房间进程</text>
          <text x="545" y="368" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">玩家直连房间服（非经大厅转发）</text>
          <text x="545" y="386" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">房间结束 → 结果上报大厅 → 销毁</text>
          <text x="545" y="404" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">动态扩容：大厅监控房间服负载</text>
          <text x="545" y="422" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">负载高时启动新房间服进程</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        房间管理与匹配系统——MMR 匹配队列、房间状态机生命周期、大厅-房间服分离架构
      </figcaption>
    </figure>
  );
}
