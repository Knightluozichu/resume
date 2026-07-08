/**
 * <FengTestingStrategyDiagram>：测试金字塔与测试策略图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function FengTestingStrategyDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="测试金字塔与测试策略图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            测试金字塔：单元 / 集成 / E2E 三层策略
          </text>

          {/* 金字塔结构 - 左侧 */}
          {/* E2E 顶层 */}
          <polygon points="220,80 320,80 270,130" fill="var(--danger)" fillOpacity="0.18" stroke="var(--danger)" strokeWidth="1.4" />
          <text x="270" y="110" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--danger)">E2E</text>

          {/* 集成层 */}
          <polygon points="170,130 370,130 320,80 220,80" fill="var(--warning)" fillOpacity="0.18" stroke="var(--warning)" strokeWidth="1.4" />
          <text x="270" y="112" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--warning)">集成</text>

          {/* 单元层底 */}
          <polygon points="100,220 440,220 370,130 170,130" fill="var(--success)" fillOpacity="0.18" stroke="var(--success)" strokeWidth="1.4" />
          <text x="270" y="180" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--success)">单元测试</text>

          {/* 右侧说明栏 */}
          {/* E2E 说明 */}
          <rect x="470" y="70" width="250" height="64" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="595" y="90" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--danger)">E2E 端到端（Cypress / Playwright）</text>
          <text x="485" y="108" fontSize="10" fill="var(--text-secondary)">- 模拟真实用户，全链路验证</text>
          <text x="485" y="122" fontSize="10" fill="var(--text-secondary)">- 数量少、速度慢、成本高</text>

          {/* 集成说明 */}
          <rect x="470" y="146" width="250" height="64" rx="8" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="595" y="166" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--warning)">集成测试（Testing Library）</text>
          <text x="485" y="184" fontSize="10" fill="var(--text-secondary)">- 组件 + 依赖协作验证</text>
          <text x="485" y="198" fontSize="10" fill="var(--text-secondary)">- 数量适中、覆盖交互路径</text>

          {/* 单元说明 */}
          <rect x="470" y="222" width="250" height="64" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" />
          <text x="595" y="242" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">单元测试（Jest / Vitest）</text>
          <text x="485" y="260" fontSize="10" fill="var(--text-secondary)">- 隔离函数 / 模块，纯逻辑验证</text>
          <text x="485" y="274" fontSize="10" fill="var(--text-secondary)">- 数量多、速度快、成本低</text>

          {/* 底部：投入产出比 */}
          <rect x="40" y="300" width="680" height="44" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="370" y="318" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">投入产出权衡</text>
          <text x="370" y="334" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">底层多投（快、廉）→ 顶层少投（慢、贵）— 金字塔倒置 = 回馈慢且脆</text>

          {/* 底部：选择策略 */}
          <rect x="40" y="360" width="330" height="80" rx="8" fill="var(--text-tertiary)" fillOpacity="0.06" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="205" y="380" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">工具选择</text>
          <text x="55" y="398" fontSize="10" fill="var(--text-secondary)">Vitest：Vite 原生、ESM 友好</text>
          <text x="55" y="412" fontSize="10" fill="var(--text-secondary)">Jest：生态成熟、快照测试</text>
          <text x="55" y="426" fontSize="10" fill="var(--text-secondary)">Playwright：跨浏览器 E2E</text>

          <rect x="390" y="360" width="330" height="80" rx="8" fill="var(--text-tertiary)" fillOpacity="0.06" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="555" y="380" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">覆盖率原则</text>
          <text x="405" y="398" fontSize="10" fill="var(--text-secondary)">核心逻辑 100% 单元覆盖</text>
          <text x="405" y="412" fontSize="10" fill="var(--text-secondary)">关键流程必有集成测试</text>
          <text x="405" y="426" fontSize="10" fill="var(--text-secondary)">冒烟场景用 E2E 兜底</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        测试金字塔策略——单元测试为基底、集成测试居中、E2E 端到端封顶的投入产出分层
      </figcaption>
    </figure>
  );
}
