/**
 * <FengFinalReviewDiagram>：前端工程化体系设计与实践 全书总复习图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function FengFinalReviewDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="前端工程化体系设计与实践 全书总复习图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            全书总复习：工程化闭环知识图谱
          </text>

          {/* 中心闭环 */}
          <circle cx="370" cy="240" r="130" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.4" strokeOpacity="0.3" />
          <text x="370" y="234" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">工程化闭环</text>
          <text x="370" y="252" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">代码 → 上线 → 监控 → 改进</text>

          {/* 四象限节点 */}
          {/* 构建 - 上 */}
          <rect x="290" y="78" width="160" height="56" rx="10" fill="var(--success)" fillOpacity="0.14" stroke="var(--success)" strokeWidth="1.4" />
          <text x="370" y="100" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--success)">构建</text>
          <text x="370" y="116" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Webpack / Vite / MF</text>
          <text x="370" y="128" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">能打包、能拆分</text>

          {/* 质量 - 右 */}
          <rect x="510" y="212" width="160" height="56" rx="10" fill="var(--warning)" fillOpacity="0.14" stroke="var(--warning)" strokeWidth="1.4" />
          <text x="590" y="234" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--warning)">质量</text>
          <text x="590" y="250" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">TS / ESLint / 测试</text>
          <text x="590" y="262" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">能防错、能验证</text>

          {/* CI/CD - 下 */}
          <rect x="290" y="346" width="160" height="56" rx="10" fill="var(--accent)" fillOpacity="0.14" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="370" y="368" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--accent)">CI/CD</text>
          <text x="370" y="384" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">流水线 / 蓝绿 / 灰度</text>
          <text x="370" y="396" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">能自动、能回滚</text>

          {/* 监控 - 左 */}
          <rect x="70" y="212" width="160" height="56" rx="10" fill="var(--danger)" fillOpacity="0.14" stroke="var(--danger)" strokeWidth="1.4" />
          <text x="150" y="234" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--danger)">监控</text>
          <text x="150" y="250" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Web Vitals / Sentry</text>
          <text x="150" y="262" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">能发现、能定位</text>

          {/* 闭环箭头 */}
          <line x1="430" y1="120" x2="510" y2="210" stroke="var(--text-tertiary)" strokeWidth="1.4" strokeDasharray="4 3" />
          <polygon points="510,210 502,206 506,214" fill="var(--text-tertiary)" />
          <line x1="510" y1="270" x2="430" y2="360" stroke="var(--text-tertiary)" strokeWidth="1.4" strokeDasharray="4 3" />
          <polygon points="430,360 438,356 434,364" fill="var(--text-tertiary)" />
          <line x1="290" y1="360" x2="210" y2="270" stroke="var(--text-tertiary)" strokeWidth="1.4" strokeDasharray="4 3" />
          <polygon points="210,270 218,274 214,266" fill="var(--text-tertiary)" />
          <line x1="210" y1="210" x2="290" y2="120" stroke="var(--text-tertiary)" strokeWidth="1.4" strokeDasharray="4 3" />
          <polygon points="290,120 282,124 286,116" fill="var(--text-tertiary)" />

          {/* 底部知识串联 */}
          <rect x="30" y="416" width="680" height="36" rx="8" fill="var(--text-tertiary)" fillOpacity="0.08" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="370" y="438" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            十章串联：构建出产物 → 质量守底线 → CI/CD 自动交付 → 监控驱动改进 → 回到代码
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        前端工程化全书总复习——构建、质量、持续交付、监控四象限闭环知识图谱
      </figcaption>
    </figure>
  );
}
