/**
 * <MgaFinalReviewDiagram>：全书总复习知识图谱图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 440;

export function MgaFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="全书总复习知识图谱"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            全书知识图谱：一条玩家消息的旅程
          </text>

          {/* 第一层：架构模型 */}
          <rect x="30" y="48" width="680" height="80" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="50" y="68" fontSize="10" fontWeight="700" fill="var(--success)">第一层 架构模型</text>

          <rect x="50" y="78" width="200" height="40" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="0.8" />
          <text x="150" y="95" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">C/S 架构模型</text>
          <text x="150" y="109" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">网关接入 → 大厅鉴权</text>

          <rect x="270" y="78" width="200" height="40" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="0.8" />
          <text x="370" y="95" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">微服务通信</text>
          <text x="370" y="109" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">gRPC 加载角色</text>

          <rect x="490" y="78" width="200" height="40" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="0.8" />
          <text x="590" y="95" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">服务注册发现</text>
          <text x="590" y="109" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">Consul / etcd</text>

          {/* 箭头 */}
          <text x={VIEW_W / 2} y="146" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>

          {/* 第二层：状态同步 */}
          <rect x="30" y="156" width="680" height="80" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="50" y="176" fontSize="10" fontWeight="700" fill="var(--warning)">第二层 状态同步</text>

          <rect x="50" y="186" width="200" height="40" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="150" y="203" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">AOI 兴趣管理</text>
          <text x="150" y="217" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">九宫格注册</text>

          <rect x="270" y="186" width="200" height="40" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="370" y="203" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">状态复制</text>
          <text x="370" y="217" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">快照下发 + 预测校正</text>

          <rect x="490" y="186" width="200" height="40" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="590" y="203" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">快照插值</text>
          <text x="590" y="217" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">远程玩家平滑</text>

          {/* 箭头 */}
          <text x={VIEW_W / 2} y="254" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>

          {/* 第三层：扩展伸缩 */}
          <rect x="30" y="264" width="680" height="60" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="50" y="284" fontSize="10" fontWeight="700" fill="var(--accent)">第三层 扩展伸缩</text>

          <rect x="50" y="292" width="310" height="24" rx="5" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="205" y="308" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--accent)">分片：跨片迁移 + 跨片技能</text>

          <rect x="380" y="292" width="310" height="24" rx="5" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="535" y="308" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--accent)">网关：SSL 卸载 + 一致性哈希</text>

          {/* 箭头 */}
          <text x={VIEW_W / 2} y="344" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>

          {/* 第四层：可靠性 */}
          <rect x="30" y="354" width="680" height="60" rx="10" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="50" y="374" fontSize="10" fontWeight="700" fill="var(--danger)">第四层 可靠性</text>

          <rect x="50" y="382" width="310" height="24" rx="5" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="205" y="398" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--danger)">容错：热备切换 + WAL 回放</text>

          <rect x="380" y="382" width="310" height="24" rx="5" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="535" y="398" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--danger)">监控：Metrics + Logging + Tracing</text>

          {/* 右侧主线标注 */}
          <line x1="725" y1="58" x2="725" y2="410" stroke="var(--accent)" strokeWidth="2" />
          <text x="735" y="120" fontSize="8" fill="var(--success)" transform="rotate(90, 735, 120)">架构</text>
          <text x="735" y="200" fontSize="8" fill="var(--warning)" transform="rotate(90, 735, 200)">同步</text>
          <text x="735" y="280" fontSize="8" fill="var(--accent)" transform="rotate(90, 735, 280)">伸缩</text>
          <text x="735" y="370" fontSize="8" fill="var(--danger)" transform="rotate(90, 735, 370)">可靠性</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书知识图谱——四层递进（架构模型→状态同步→扩展伸缩→可靠性）串联十章
      </figcaption>
    </figure>
  );
}
