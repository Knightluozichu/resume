/**
 * <AdaeActivityLifecycleDiagram>：Activity生命周期与启动模式图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 540;

export function AdaeActivityLifecycleDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Activity生命周期与启动模式图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Activity生命周期与启动模式
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            七个回调 + 四种 launchMode + 任务栈
          </text>

          {/* 左面板：生命周期 */}
          <rect x="30" y="62" width="330" height="450" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="195" y="86" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--accent)">生命周期回调</text>

          <rect x="95" y="100" width="200" height="30" rx="6" fill="var(--warning)" fillOpacity="0.14" stroke="var(--warning)" strokeWidth="1.1" />
          <text x="195" y="120" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">onCreate()</text>
          <text x="195" y="142" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">&darr;</text>

          <rect x="95" y="150" width="200" height="30" rx="6" fill="var(--warning)" fillOpacity="0.14" stroke="var(--warning)" strokeWidth="1.1" />
          <text x="195" y="170" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">onStart()</text>
          <text x="195" y="192" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">&darr;</text>

          <rect x="95" y="200" width="200" height="30" rx="6" fill="var(--success)" fillOpacity="0.14" stroke="var(--success)" strokeWidth="1.1" />
          <text x="195" y="220" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">onResume()  可见且可交互</text>
          <text x="195" y="242" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">&darr; 部分遮挡</text>

          <rect x="95" y="250" width="200" height="30" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.1" />
          <text x="195" y="270" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">onPause()  部分可见</text>
          <text x="195" y="292" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">&darr; 完全遮挡</text>

          <rect x="95" y="300" width="200" height="30" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.1" />
          <text x="195" y="320" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">onStop()  不可见</text>
          <text x="195" y="342" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">&darr; 销毁/回前台</text>

          <rect x="95" y="350" width="200" height="30" rx="6" fill="var(--text-primary)" fillOpacity="0.10" stroke="var(--text-primary)" strokeWidth="1.1" strokeOpacity="0.4" />
          <text x="195" y="370" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">onDestroy()</text>
          <text x="195" y="396" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">onRestart() &rarr; onStart()  从后台回前台</text>

          <rect x="60" y="410" width="270" height="86" rx="8" fill="var(--text-primary)" fillOpacity="0.05" stroke="var(--text-primary)" strokeWidth="1.1" strokeOpacity="0.3" />
          <text x="195" y="432" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">异常情况处理</text>
          <text x="70" y="452" fontSize="11" fill="var(--text-secondary)">资源回收 onSaveInstanceState</text>
          <text x="70" y="470" fontSize="11" fill="var(--text-secondary)">恢复 onRestoreInstanceState/onCreate</text>
          <text x="70" y="488" fontSize="11" fill="var(--text-secondary)">配置变更(android:configChanges)</text>

          {/* 右面板：启动模式 */}
          <rect x="380" y="62" width="330" height="450" rx="12" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="545" y="86" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--accent)">四种启动模式（launchMode）</text>

          <rect x="400" y="100" width="290" height="88" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.1" />
          <text x="545" y="122" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">standard 标准模式</text>
          <text x="410" y="144" fontSize="11" fill="var(--text-secondary)">每次 startActivity 都新建实例</text>
          <text x="410" y="162" fontSize="11" fill="var(--text-secondary)">谁启动就入谁的栈</text>
          <text x="410" y="180" fontSize="11" fill="var(--text-secondary)">默认模式，栈内可重复</text>

          <rect x="400" y="198" width="290" height="88" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.1" />
          <text x="545" y="220" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">singleTop 栈顶复用</text>
          <text x="410" y="242" fontSize="11" fill="var(--text-secondary)">若已在栈顶 → onNewIntent</text>
          <text x="410" y="260" fontSize="11" fill="var(--text-secondary)">不在栈顶 → 仍新建实例</text>
          <text x="410" y="278" fontSize="11" fill="var(--text-secondary)">适合推送/通知点击页</text>

          <rect x="400" y="296" width="290" height="88" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.1" />
          <text x="545" y="318" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--danger)">singleTask 栈内单例</text>
          <text x="410" y="340" fontSize="11" fill="var(--text-secondary)">整个系统唯一实例</text>
          <text x="410" y="358" fontSize="11" fill="var(--text-secondary)">已存在 → 清其上方 + onNewIntent</text>
          <text x="410" y="376" fontSize="11" fill="var(--text-secondary)">主界面/浏览器常用</text>

          <rect x="400" y="394" width="290" height="88" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.1" />
          <text x="545" y="416" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">singleInstance 单实例</text>
          <text x="410" y="438" fontSize="11" fill="var(--text-secondary)">独占一个任务栈</text>
          <text x="410" y="456" fontSize="11" fill="var(--text-secondary)">整个系统唯一，独立 Back 栈</text>
          <text x="410" y="474" fontSize="11" fill="var(--text-secondary)">系统级通话页/闹钟页</text>

          <text x="545" y="500" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">Intent Flags 可动态覆盖 launchMode（如 FLAG_ACTIVITY_NEW_TASK）</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Activity生命周期七回调与四种启动模式——standard/singleTop/singleTask/singleInstance及任务栈复用规则
      </figcaption>
    </figure>
  );
}
