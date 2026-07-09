/**
 * <FlaServiceDiagram>：服务与通知——Service生命周期与通知渠道图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 540;

export function FlaServiceDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Service生命周期与通知机制图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Service生命周期与通知机制
          </text>

          {/* 左侧：启动式Service生命周期 */}
          <text x="185" y="54" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">启动式 Service（startService）</text>

          <rect x="60" y="66" width="250" height="36" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="185" y="89" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">onCreate() — 首次创建</text>

          <text x="185" y="114" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>

          <rect x="60" y="122" width="250" height="36" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="185" y="145" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">onStartCommand() — 每次启动</text>

          <text x="185" y="170" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr; 服务运行中（可多次start）</text>

          <rect x="60" y="178" width="250" height="36" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="185" y="201" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">onDestroy() — stopService()后</text>

          <text x="185" y="232" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">手动调 stopSelf() / stopService() 才销毁</text>
          <text x="185" y="248" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">适合：后台音乐播放/下载任务</text>

          {/* 右侧：绑定式Service生命周期 */}
          <text x="545" y="54" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">绑定式 Service（bindService）</text>

          <rect x="420" y="66" width="250" height="36" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="545" y="89" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">onCreate() — 首次创建</text>

          <text x="545" y="114" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>

          <rect x="420" y="122" width="250" height="36" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="545" y="145" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">onBind() — 返回 IBinder</text>

          <text x="545" y="170" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr; 客户端通过Binder通信</text>

          <rect x="420" y="178" width="250" height="36" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="545" y="201" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">onUnbind() → onDestroy()</text>

          <text x="545" y="232" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">所有客户端 unbind 后自动销毁</text>
          <text x="545" y="248" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">适合：Activity与Service交互</text>

          {/* 中间：混合模式 */}
          <rect x="220" y="268" width="300" height="44" rx="8" fill="var(--text-primary)" fillOpacity="0.06" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="288" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">混合模式：start + bind 并存</text>
          <text x="370" y="304" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">需同时 stop + unbind 全部才销毁</text>

          {/* 下半：通知机制 */}
          <text x={VIEW_W / 2} y="338" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">通知机制（Notification）</text>

          <rect x="30" y="350" width="210" height="80" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="135" y="370" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">通知渠道（Android 8.0+）</text>
          <text x="135" y="386" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">NotificationChannel</text>
          <text x="135" y="400" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">channelId 重要性等级</text>
          <text x="135" y="414" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">必须创建才能显示通知</text>

          <text x="255" y="390" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="270" y="350" width="210" height="80" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="375" y="370" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">NotificationCompat.Builder</text>
          <text x="375" y="386" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">setContentTitle / setText</text>
          <text x="375" y="400" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">setSmallIcon（必须）</text>
          <text x="375" y="414" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">setPendingIntent 点击跳转</text>

          <text x="495" y="390" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="510" y="350" width="200" height="80" rx="8" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="610" y="370" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">NotificationManager</text>
          <text x="610" y="386" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">notify(id, notification)</text>
          <text x="610" y="400" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">前台服务必须显示通知</text>
          <text x="610" y="414" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">startForeground(id, notif)</text>

          {/* 底部：前台服务与后台限制 */}
          <text x="370" y="458" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">前台服务与后台限制</text>
          <text x="370" y="478" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">前台服务：用户可见的通知 + startForeground()，不易被系统杀死</text>
          <text x="370" y="494" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">后台Service：Android 8.0+ 后台运行受限，推荐使用 WorkManager 调度</text>
          <text x="370" y="510" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">onStartCommand 返回值：START_STICKY / START_NOT_STICKY / START_REDELIVER_INTENT</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Service两种模式生命周期（启动式startService/绑定式bindService）与通知渠道机制、前台服务
      </figcaption>
    </figure>
  );
}
