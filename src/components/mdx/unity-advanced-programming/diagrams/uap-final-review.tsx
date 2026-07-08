/**
 * <UapFinalReviewDiagram>：Unity 3D 高级编程全书总复习图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function UapFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Unity 3D 高级编程全书总复习图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="360" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">主程决策链路——全书串联</text>
          <rect x="30" y="60" width="120" height="50" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="90" y="84" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">架构承接</text>
          <text x="90" y="100" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">第2-3章</text>
          <text x="160" y="88" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <rect x="170" y="60" width="120" height="50" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="230" y="84" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">性能预算</text>
          <text x="230" y="100" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">第4-5章</text>
          <text x="300" y="88" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <rect x="310" y="60" width="120" height="50" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="84" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">系统对接</text>
          <text x="370" y="100" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">第6-7章</text>
          <text x="440" y="88" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <rect x="450" y="60" width="120" height="50" rx="8" fill="var(--text-tertiary)" fillOpacity="0.12" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="510" y="84" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-tertiary)">工程交付</text>
          <text x="510" y="100" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">第8-9章</text>
          <text x="580" y="88" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <rect x="590" y="60" width="100" height="50" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="640" y="84" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">上线</text>
          <text x="640" y="100" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">第10章</text>
          <rect x="30" y="135" width="665" height="44" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="362" y="161" textAnchor="middle" fontSize="12" fill="var(--text-primary)">每个需求到来，走完整决策链：架构→性能→系统→工程</text>
          <text x="360" y="210" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">项目阶段与主程重心</text>
          <rect x="40" y="225" width="150" height="60" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="0.8" strokeOpacity="0.5" />
          <text x="115" y="248" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">原型期</text>
          <text x="115" y="266" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">架构先行</text>
          <text x="115" y="280" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">骨架可保留</text>
          <rect x="205" y="225" width="150" height="60" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="0.8" strokeOpacity="0.5" />
          <text x="280" y="248" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">开发期</text>
          <text x="280" y="266" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">性能立规矩</text>
          <text x="280" y="280" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">GC 零容忍</text>
          <rect x="370" y="225" width="150" height="60" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="0.8" strokeOpacity="0.5" />
          <text x="445" y="248" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">联调期</text>
          <text x="445" y="266" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">系统打通</text>
          <text x="445" y="280" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">UI+网络对接</text>
          <rect x="535" y="225" width="145" height="60" rx="6" fill="var(--text-tertiary)" fillOpacity="0.08" stroke="var(--text-tertiary)" strokeWidth="0.8" strokeOpacity="0.5" />
          <text x="607" y="248" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-tertiary)">上线期</text>
          <text x="607" y="266" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">工程收尾</text>
          <text x="607" y="280" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">热更+CI/CD</text>
          <text x="360" y="325" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">架构评审清单</text>
          <text x="360" y="347" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">分层？循环依赖？GC=0？DrawCall 预算？UI 栈？CI 测试？</text>
          <text x="360" y="380" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">架构是地基，工程是护城河，主程是守门人</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        全书总复习——主程决策链路串联十章
      </figcaption>
    </figure>
  );
}
