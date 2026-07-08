/**
 * <UmmStateSyncDiagram>：状态同步与帧同步对比图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 420;

export function UmmStateSyncDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
         aria-label="状态同步与帧同步对比图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="30" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            状态同步 vs 帧同步
          </text>
          <text x={VIEW_W / 2} y="50" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            两种网络同步模式的架构差异
          </text>

          {/* 左半：状态同步 */}
          <rect x="30" y="70" width="330" height="320" rx="12" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="195" y="95" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--success)">状态同步</text>

          <rect x="55" y="110" width="280" height="40" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="195" y="128" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">服务器计算全部逻辑</text>
          <text x="195" y="143" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">权威服务器</text>

          <text x="195" y="168" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          <rect x="55" y="178" width="280" height="40" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="195" y="196" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">广播结果状态</text>
          <text x="195" y="211" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">位置 / HP / Buff</text>

          <text x="195" y="236" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          <rect x="55" y="246" width="280" height="40" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="195" y="264" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">客户端直接渲染</text>
          <text x="195" y="279" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">收到什么画什么</text>

          <text x="195" y="312" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">优点：反作弊容易、断线恢复快</text>
          <text x="195" y="330" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">缺点：带宽消耗大、服务器压力大</text>
          <text x="195" y="348" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">适用：MMORPG、MOBA</text>
          <text x="195" y="372" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">代表：魔兽世界、王者荣耀</text>

          {/* 右半：帧同步 */}
          <rect x="380" y="70" width="330" height="320" rx="12" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="545" y="95" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--warning)">帧同步</text>

          <rect x="405" y="110" width="280" height="40" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="545" y="128" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">客户端上传操作输入</text>
          <text x="545" y="143" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">按键 / 摇杆 / 触屏</text>

          <text x="545" y="168" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          <rect x="405" y="178" width="280" height="40" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="545" y="196" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">服务器收集并广播操作帧</text>
          <text x="545" y="211" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">每帧操作集合</text>

          <text x="545" y="236" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&darr;</text>

          <rect x="405" y="246" width="280" height="40" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="545" y="264" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">客户端各自模拟演算</text>
          <text x="545" y="279" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">确定性逻辑帧</text>

          <text x="545" y="312" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">优点：带宽小、可回放录像</text>
          <text x="545" y="330" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">缺点：浮点确定性难、断线追帧复杂</text>
          <text x="545" y="348" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">适用：RTS、格斗、竞技</text>
          <text x="545" y="372" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">代表：星际争霸、Dota2</text>

          <text x={VIEW_W / 2} y="408" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：状态同步传「结果」，帧同步传「输入」——前者省客户端算力，后者省服务器算力
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        状态同步与帧同步对比——权威服务器 vs 确定性模拟的架构取舍
      </figcaption>
    </figure>
  );
}
