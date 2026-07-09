/**
 * <AdaeRemoteViewsDiagram>：RemoteViews与通知工作原理图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 510;

export function AdaeRemoteViewsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="RemoteViews与通知工作原理图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            RemoteViews：跨进程更新 UI
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            通知栏 / 桌面 Widget 的统一机制
          </text>

          {/* 左面板：RemoteViews 工作流程 */}
          <rect x="30" y="62" width="410" height="420" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="235" y="86" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--accent)">RemoteViews 更新流程</text>

          <rect x="50" y="100" width="370" height="70" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.1" />
          <text x="235" y="122" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">1. 构造 RemoteViews</text>
          <text x="60" y="144" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">RemoteViews(packageName, layoutId)</text>
          <text x="60" y="162" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">setTextViewText/setImageViewResource</text>

          <text x="235" y="186" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">&darr; 通过 Action 描述操作（不直接持 View）</text>

          <rect x="50" y="196" width="370" height="70" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.1" />
          <text x="235" y="218" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">2. 跨进程传递</text>
          <text x="60" y="240" fontSize="11" fill="var(--text-secondary)">NotificationManager.notify</text>
          <text x="60" y="258" fontSize="11" fill="var(--text-secondary)">AppWidgetManager.updateAppWidget</text>

          <text x="235" y="282" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">&darr; 进入 SystemServer 进程（NotificationManagerService）</text>

          <rect x="50" y="292" width="370" height="70" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.1" />
          <text x="235" y="314" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">3. 重新 inflate 布局</text>
          <text x="60" y="336" fontSize="11" fill="var(--text-secondary)">目标进程用 LayoutInflater 加载</text>
          <text x="60" y="354" fontSize="11" fill="var(--text-secondary)">回放 Action 逐个 apply 到真实 View</text>

          <rect x="50" y="372" width="370" height="92" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.1" />
          <text x="235" y="394" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">限制</text>
          <text x="60" y="416" fontSize="11" fill="var(--text-secondary)">不支持自定义 View，仅系统 View</text>
          <text x="60" y="434" fontSize="11" fill="var(--text-secondary)">PendingIntent 处理点击（跨进程启动）</text>
          <text x="60" y="452" fontSize="11" fill="var(--text-secondary)">更新通过 setXxx 接口，反射执行</text>

          {/* 右面板：通知与 Widget */}
          <rect x="460" y="62" width="250" height="420" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="585" y="86" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--accent)">通知与 Widget</text>

          <rect x="475" y="100" width="220" height="138" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.1" />
          <text x="585" y="122" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">Notification 通知</text>
          <text x="485" y="144" fontSize="11" fill="var(--text-secondary)">NotificationCompat.Builder</text>
          <text x="485" y="162" fontSize="11" fill="var(--text-secondary)">setContentTitle/Text</text>
          <text x="485" y="180" fontSize="11" fill="var(--text-secondary)">setSmallIcon 必需</text>
          <text x="485" y="198" fontSize="11" fill="var(--text-secondary)">setContentIntent 点击</text>
          <text x="485" y="216" fontSize="11" fill="var(--text-secondary)">渠道 NotificationChannel(8.0+)</text>

          <rect x="475" y="250" width="220" height="138" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.1" />
          <text x="585" y="272" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">AppWidget 桌面小部件</text>
          <text x="485" y="294" fontSize="11" fill="var(--text-secondary)">AppWidgetProvider</text>
          <text x="485" y="312" fontSize="11" fill="var(--text-secondary)">onUpdate/onEnabled</text>
          <text x="485" y="330" fontSize="11" fill="var(--text-secondary)">AppWidgetProviderInfo</text>
          <text x="485" y="348" fontSize="11" fill="var(--text-secondary)">定时更新 minPeriod</text>
          <text x="485" y="366" fontSize="11" fill="var(--text-secondary)">RemoteViewsService 复杂列表</text>

          <rect x="475" y="400" width="220" height="68" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.1" />
          <text x="585" y="422" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">本质</text>
          <text x="485" y="444" fontSize="11" fill="var(--text-secondary)">View 的「操作序列化」</text>
          <text x="485" y="462" fontSize="11" fill="var(--text-secondary)">跨进程重建 UI，统一通知/Widget</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        RemoteViews跨进程UI更新机制——构造Action、跨进程传递、目标进程回放，应用于通知栏与桌面Widget
      </figcaption>
    </figure>
  );
}
