/**
 * <UapLearningMapDiagram>：Unity 3D 高级编程全书学习地图图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function UapLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Unity 3D 高级编程全书学习地图图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="360" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">Unity 3D 高级编程全书学习地图</text>
          <rect x="40" y="70" width="150" height="50" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="115" y="100" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--success)">架构</text>
          <text x="200" y="100" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&rarr;</text>
          <rect x="210" y="70" width="150" height="50" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="285" y="100" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">性能</text>
          <text x="370" y="100" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&rarr;</text>
          <rect x="380" y="70" width="150" height="50" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="455" y="100" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--warning)">系统</text>
          <text x="540" y="100" textAnchor="middle" fontSize="18" fill="var(--text-tertiary)">&rarr;</text>
          <rect x="550" y="70" width="130" height="50" rx="8" fill="var(--text-tertiary)" fillOpacity="0.12" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="615" y="100" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-tertiary)">工程</text>
          <rect x="40" y="145" width="150" height="34" rx="6" fill="var(--success)" fillOpacity="0.06" stroke="var(--success)" strokeWidth="0.8" strokeOpacity="0.4" />
          <text x="115" y="167" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第2-3章 设计原则与模式</text>
          <rect x="210" y="145" width="150" height="34" rx="6" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="0.8" strokeOpacity="0.4" />
          <text x="285" y="167" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第4-5章 内存与渲染</text>
          <rect x="380" y="145" width="150" height="34" rx="6" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="0.8" strokeOpacity="0.4" />
          <text x="455" y="167" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第6-7章 UI与网络</text>
          <rect x="550" y="145" width="130" height="34" rx="6" fill="var(--text-tertiary)" fillOpacity="0.06" stroke="var(--text-tertiary)" strokeWidth="0.8" strokeOpacity="0.4" />
          <text x="615" y="167" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">第8-9章 热更与CI</text>
          <rect x="40" y="210" width="640" height="44" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="360" y="236" textAnchor="middle" fontSize="12" fill="var(--text-primary)">核心主线：从「会做功能」到「能扛项目」的进阶主程路径</text>
          <text x="360" y="285" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">关键能力递进</text>
          <text x="360" y="307" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">立架构 → 守性能 → 搭系统 → 建工程</text>
          <text x="360" y="325" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">每阶段解决一类主程必答问题</text>
          <text x="360" y="365" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">架构是地基，工程是护城河，缺一不可</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Unity 3D 高级编程全书学习地图——进阶主程成长路径
      </figcaption>
    </figure>
  );
}
