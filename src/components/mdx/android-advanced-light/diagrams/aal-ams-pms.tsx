/**
 * <AalAmsPmsDiagram>：AMS与PMS核心职责图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 480;

export function AalAmsPmsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="AMS与PMS核心职责图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            AMS 与 PMS 核心职责
          </text>

          {/* AMS 区域 */}
          <rect x="30" y="50" width="330" height="400" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <rect x="30" y="50" width="330" height="40" rx="10" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="195" y="76" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--accent)">AMS（Activity Manager Service）</text>

          <rect x="50" y="105" width="290" height="48" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="65" y="124" textAnchor="start" fontSize="11" fontWeight="600" fill="var(--text-primary)">统一调度四大组件</text>
          <text x="65" y="140" textAnchor="start" fontSize="10" fill="var(--text-secondary)">Activity / Service / BroadcastReceiver / ContentProvider</text>

          <rect x="50" y="163" width="290" height="48" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="65" y="182" textAnchor="start" fontSize="11" fontWeight="600" fill="var(--text-primary)">Activity栈管理</text>
          <text x="65" y="198" textAnchor="start" fontSize="10" fill="var(--text-secondary)">Task / Back Stack / 生命周期调度</text>

          <rect x="50" y="221" width="290" height="48" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="65" y="240" textAnchor="start" fontSize="11" fontWeight="600" fill="var(--text-primary)">进程管理</text>
          <text x="65" y="256" textAnchor="start" fontSize="10" fill="var(--text-secondary)">进程优先级 / OOM Adj / LowMemoryKiller</text>

          <rect x="50" y="279" width="290" height="48" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="65" y="298" textAnchor="start" fontSize="11" fontWeight="600" fill="var(--text-primary)">内存管理</text>
          <text x="65" y="314" textAnchor="start" fontSize="10" fill="var(--text-secondary)">进程回收 / onTrimMemory / 空进程清理</text>

          <rect x="50" y="337" width="290" height="48" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="65" y="356" textAnchor="start" fontSize="11" fontWeight="600" fill="var(--text-primary)">Intent路由</text>
          <text x="65" y="372" textAnchor="start" fontSize="10" fill="var(--text-secondary)">解析 Intent / 匹配 Activity / 启动流程</text>

          <text x="195" y="415" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">运行在 system_server 进程</text>
          <text x="195" y="432" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">与 App 进程通过 Binder 通信</text>

          {/* PMS 区域 */}
          <rect x="380" y="50" width="330" height="400" rx="10" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="1.2" />
          <rect x="380" y="50" width="330" height="40" rx="10" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="545" y="76" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--success)">PMS（Package Manager Service）</text>

          <rect x="400" y="105" width="290" height="48" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="415" y="124" textAnchor="start" fontSize="11" fontWeight="600" fill="var(--text-primary)">APK包解析</text>
          <text x="415" y="140" textAnchor="start" fontSize="10" fill="var(--text-secondary)">解析 AndroidManifest.xml / 解析 dex / 提取资源</text>

          <rect x="400" y="163" width="290" height="48" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="415" y="182" textAnchor="start" fontSize="11" fontWeight="600" fill="var(--text-primary)">权限管理</text>
          <text x="415" y="198" textAnchor="start" fontSize="10" fill="var(--text-secondary)">权限声明检查 / 动态权限 / 权限授予状态</text>

          <rect x="400" y="221" width="290" height="48" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="415" y="240" textAnchor="start" fontSize="11" fontWeight="600" fill="var(--text-primary)">组件信息维护</text>
          <text x="415" y="256" textAnchor="start" fontSize="10" fill="var(--text-secondary)">Activity/Service/Receiver/Provider 注册表</text>

          <rect x="400" y="279" width="290" height="48" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="415" y="298" textAnchor="start" fontSize="11" fontWeight="600" fill="var(--text-primary)">签名校验</text>
          <text x="415" y="314" textAnchor="start" fontSize="10" fill="var(--text-secondary)">APK签名验证 / 签名方案 v1/v2/v3</text>

          <rect x="400" y="337" width="290" height="48" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="415" y="356" textAnchor="start" fontSize="11" fontWeight="600" fill="var(--text-primary)">包安装/卸载/更新</text>
          <text x="415" y="372" textAnchor="start" fontSize="10" fill="var(--text-secondary)">PackageInstaller / odex/vdex 生成</text>

          <text x="545" y="415" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">维护全局 PackageInfo 缓存</text>
          <text x="545" y="432" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">PackageManager 是其客户端接口</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        AMS与PMS核心职责——AMS调度组件与进程，PMS管理包解析与安装
      </figcaption>
    </figure>
  );
}
