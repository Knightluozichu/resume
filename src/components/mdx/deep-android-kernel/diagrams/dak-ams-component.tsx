/**
 * <DakAmsComponentDiagram>：AMS与四大组件调度图解。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 520;

export function DakAmsComponentDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="AMS与四大组件调度图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            AMS——四大组件统一调度中心
          </text>

          {/* 中心：AMS */}
          <rect x="280" y="60" width="180" height="60" rx="8" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="370" y="84" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--accent)">AMS</text>
          <text x="370" y="102" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">运行在 system_server</text>
          <text x="370" y="116" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">ActivityManagerService</text>

          {/* 四大组件 */}
          {/* Activity */}
          <rect x="40" y="160" width="150" height="70" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="115" y="182" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">Activity</text>
          <text x="115" y="200" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">生命周期管理</text>
          <text x="115" y="214" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Activity栈（回退栈）</text>
          <text x="115" y="228" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">startActivity</text>

          {/* Service */}
          <rect x="210" y="160" width="150" height="70" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="285" y="182" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">Service</text>
          <text x="285" y="200" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">后台服务</text>
          <text x="285" y="214" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">startService/bindService</text>
          <text x="285" y="228" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">绑定通信</text>

          {/* BroadcastReceiver */}
          <rect x="380" y="160" width="150" height="70" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="455" y="182" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">Broadcast</text>
          <text x="455" y="200" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">广播分发</text>
          <text x="455" y="214" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">普通/有序/粘性</text>
          <text x="455" y="228" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">sendBroadcast</text>

          {/* ContentProvider */}
          <rect x="550" y="160" width="150" height="70" rx="8" fill="var(--text-primary)" fillOpacity="0.1" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="625" y="182" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">ContentProvider</text>
          <text x="625" y="200" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">数据共享</text>
          <text x="625" y="214" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">跨进程数据访问</text>
          <text x="625" y="228" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">query/insert/update</text>

          {/* 连接线 AMS → 四大组件 */}
          <line x1="320" y1="120" x2="115" y2="160" stroke="var(--text-tertiary)" strokeWidth="1" />
          <line x1="350" y1="120" x2="285" y2="160" stroke="var(--text-tertiary)" strokeWidth="1" />
          <line x1="390" y1="120" x2="455" y2="160" stroke="var(--text-tertiary)" strokeWidth="1" />
          <line x1="420" y1="120" x2="625" y2="160" stroke="var(--text-tertiary)" strokeWidth="1" />

          {/* 进程优先级 OOM Adj */}
          <rect x="40" y="270" width="660" height="120" rx="8" fill="var(--text-primary)" fillOpacity="0.04" stroke="var(--text-primary)" strokeWidth="1" strokeOpacity="0.2" />
          <text x="370" y="292" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">进程优先级（OOM Adj）—— LowMemoryKiller 回收顺序</text>

          <rect x="55" y="306" width="110" height="34" rx="4" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="0.8" />
          <text x="110" y="322" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">前台进程</text>
          <text x="110" y="335" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">adj &asymp; 0</text>

          <rect x="175" y="306" width="110" height="34" rx="4" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="230" y="322" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">可见进程</text>
          <text x="230" y="335" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">adj &asymp; 100</text>

          <rect x="295" y="306" width="110" height="34" rx="4" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="350" y="322" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--warning)">服务进程</text>
          <text x="350" y="335" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">adj &asymp; 500</text>

          <rect x="415" y="306" width="110" height="34" rx="4" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="0.8" />
          <text x="470" y="322" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">缓存进程</text>
          <text x="470" y="335" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">adj &asymp; 900</text>

          <rect x="535" y="306" width="110" height="34" rx="4" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-primary)" strokeWidth="0.8" />
          <text x="590" y="322" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-primary)">空进程</text>
          <text x="590" y="335" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">adj &asymp; 1000</text>

          <text x="370" y="366" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">数值越大越容易被杀；AMS 动态调整 adj，保证前台体验</text>
          <text x="370" y="384" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">内存不足时 LowMemoryKiller 从 adj 最大开始回收</text>

          {/* Activity 栈示意 */}
          <text x="370" y="420" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">Activity 回退栈</text>
          <rect x="200" y="430" width="130" height="24" rx="4" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="0.8" />
          <text x="265" y="446" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Activity C（栈顶）</text>
          <rect x="305" y="448" width="130" height="24" rx="4" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="0.8" />
          <text x="370" y="464" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Activity B</text>
          <rect x="410" y="466" width="130" height="24" rx="4" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="0.8" />
          <text x="475" y="482" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Activity A（栈底）</text>
          <text x="370" y="506" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">按 back 键依次出栈：C &rarr; B &rarr; A，AMS 管理生命周期回调</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        AMS统一调度四大组件——Activity栈管理、Service绑定、Broadcast分发、ContentProvider共享，OOM Adj进程回收
      </figcaption>
    </figure>
  );
}
