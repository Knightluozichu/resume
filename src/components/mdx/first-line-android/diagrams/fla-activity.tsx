/**
 * <FlaActivityDiagram>：Activity与Fragment——生命周期与回退栈图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 580;

export function FlaActivityDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Activity生命周期与Fragment回退栈图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Activity生命周期与Fragment管理
          </text>

          {/* 左侧：Activity生命周期 */}
          <text x="185" y="54" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">Activity 生命周期</text>

          <rect x="60" y="64" width="250" height="36" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="185" y="87" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">onCreate() — 创建</text>

          <text x="185" y="112" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>

          <rect x="60" y="120" width="250" height="36" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="185" y="143" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">onStart() — 可见但不可交互</text>

          <text x="185" y="168" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>

          <rect x="60" y="176" width="250" height="36" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="185" y="199" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">onResume() — 前台可交互</text>

          <text x="185" y="224" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr; 运行中</text>

          <rect x="60" y="232" width="250" height="36" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="185" y="255" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">onPause() — 部分遮挡</text>

          <text x="185" y="280" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>

          <rect x="60" y="288" width="250" height="36" rx="6" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="185" y="311" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">onStop() — 完全不可见</text>

          <text x="185" y="336" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&darr;</text>

          <rect x="60" y="344" width="250" height="36" rx="6" fill="var(--text-primary)" fillOpacity="0.08" stroke="var(--text-primary)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="185" y="367" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">onDestroy() — 销毁</text>

          {/* 回退路径标注 */}
          <text x="335" y="143" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">&larr; onRestart()</text>
          <text x="335" y="199" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">&larr; onResume()</text>

          {/* 右侧：Fragment回退栈与Intent */}
          <text x="545" y="54" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">Fragment 回退栈</text>

          <rect x="430" y="64" width="250" height="40" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="555" y="89" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">FragmentManager 管理事务</text>

          <rect x="430" y="116" width="250" height="56" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="555" y="136" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">FragmentTransaction</text>
          <text x="555" y="150" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">replace() 替换Fragment</text>
          <text x="555" y="164" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">addToBackStack() 加入回退栈</text>

          <rect x="430" y="184" width="250" height="56" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="555" y="204" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">Fragment 生命周期</text>
          <text x="555" y="218" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">onAttach → onCreate</text>
          <text x="555" y="232" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">onCreateView → onViewCreated</text>

          <rect x="430" y="252" width="250" height="56" rx="6" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="555" y="272" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">onDestroyView → onDestroy → onDetach</text>
          <text x="555" y="286" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Fragment比Activity多了</text>
          <text x="555" y="300" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">视图生命周期（view销毁≠fragment销毁）</text>

          {/* Intent类型 */}
          <text x="555" y="338" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">Intent 通信</text>

          <rect x="430" y="348" width="120" height="50" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="490" y="368" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">显式Intent</text>
          <text x="490" y="382" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">指定目标类名</text>
          <text x="490" y="394" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Intent(this, B::class.java)</text>

          <rect x="560" y="348" width="120" height="50" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="620" y="368" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">隐式Intent</text>
          <text x="620" y="382" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">指定action/category</text>
          <text x="620" y="394" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">系统匹配IntentFilter</text>

          {/* 底部：启动模式 */}
          <rect x="40" y="416" width="660" height="76" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="370" y="438" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">Activity 四大启动模式（launchMode）</text>
          <text x="130" y="460" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">standard — 每次新建实例</text>
          <text x="130" y="474" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">入栈顶层</text>
          <text x="310" y="460" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">singleTop — 栈顶复用</text>
          <text x="310" y="474" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">栈顶已有则调onNewIntent</text>
          <text x="490" y="460" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">singleTask — 栈内单例</text>
          <text x="490" y="474" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">清空上方Activity</text>
          <text x="640" y="460" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">singleInstance</text>
          <text x="640" y="474" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">独立任务栈</text>

          <text x="370" y="520" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Activity通过任务栈（Task）管理，Fragment通过回退栈管理事务</text>
          <text x="370" y="538" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">数据传递：Intent.putExtra() / startActivityForResult() / Fragment arguments</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Activity生命周期七回调（onCreate→onStart→onResume→onPause→onStop→onDestroy）与Fragment管理、Intent通信、四大启动模式
      </figcaption>
    </figure>
  );
}
