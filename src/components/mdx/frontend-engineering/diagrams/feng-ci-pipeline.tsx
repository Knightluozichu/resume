/**
 * <FengCiPipelineDiagram>：CI 流水线阶段图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function FengCiPipelineDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="CI 流水线阶段图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            CI 流水线：从代码推送到自动发布
          </text>

          {/* 触发 */}
          <rect x="290" y="48" width="160" height="40" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="370" y="73" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">git push / PR</text>

          <line x1="370" y1="88" x2="370" y2="104" stroke="var(--text-tertiary)" strokeWidth="1.5" />
          <text x="384" y="100" fontSize="11" fill="var(--text-tertiary)">&darr;</text>

          {/* 流水线阶段 - 横向 5 步 */}
          {/* Step 1: Lint */}
          <rect x="30" y="112" width="120" height="100" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.4" />
          <text x="90" y="134" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--warning)">① Lint</text>
          <text x="90" y="152" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">ESLint</text>
          <text x="90" y="166" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Prettier</text>
          <text x="90" y="180" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">tsc --noEmit</text>
          <text x="90" y="200" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">拦截风格/类型</text>

          {/* 箭头 */}
          <line x1="150" y1="162" x2="168" y2="162" stroke="var(--text-tertiary)" strokeWidth="1.5" />
          <text x="159" y="158" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">&rarr;</text>

          {/* Step 2: Test */}
          <rect x="172" y="112" width="120" height="100" rx="8" fill="var(--success)" fillOpacity="0.10" stroke="var(--success)" strokeWidth="1.4" />
          <text x="232" y="134" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--success)">② Test</text>
          <text x="232" y="152" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Vitest / Jest</text>
          <text x="232" y="166" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">覆盖率上报</text>
          <text x="232" y="180" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">集成测试</text>
          <text x="232" y="200" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">验证逻辑正确</text>

          <line x1="292" y1="162" x2="310" y2="162" stroke="var(--text-tertiary)" strokeWidth="1.5" />
          <text x="301" y="158" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">&rarr;</text>

          {/* Step 3: Build */}
          <rect x="314" y="112" width="120" height="100" rx="8" fill="var(--accent)" fillOpacity="0.10" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="374" y="134" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--accent)">③ Build</text>
          <text x="374" y="152" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">pnpm build</text>
          <text x="374" y="166" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">产物打包</text>
          <text x="374" y="180" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">SourceMap 生成</text>
          <text x="374" y="200" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">产出可部署物</text>

          <line x1="434" y1="162" x2="452" y2="162" stroke="var(--text-tertiary)" strokeWidth="1.5" />
          <text x="443" y="158" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">&rarr;</text>

          {/* Step 4: Deploy Staging */}
          <rect x="456" y="112" width="120" height="100" rx="8" fill="var(--warning)" fillOpacity="0.10" stroke="var(--warning)" strokeWidth="1.4" />
          <text x="516" y="134" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--warning)">④ Deploy</text>
          <text x="516" y="152" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">上传 CDN</text>
          <text x="516" y="166" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">预发环境</text>
          <text x="516" y="180" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">冒烟验证</text>
          <text x="516" y="200" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">预发布就绪</text>

          <line x1="576" y1="162" x2="594" y2="162" stroke="var(--text-tertiary)" strokeWidth="1.5" />
          <text x="585" y="158" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">&rarr;</text>

          {/* Step 5: Release */}
          <rect x="598" y="112" width="120" height="100" rx="8" fill="var(--danger)" fillOpacity="0.10" stroke="var(--danger)" strokeWidth="1.4" />
          <text x="658" y="134" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--danger)">⑤ Release</text>
          <text x="658" y="152" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">灰度 / 蓝绿</text>
          <text x="658" y="166" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">监控告警</text>
          <text x="658" y="180" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">可回滚</text>
          <text x="658" y="200" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">线上交付</text>

          {/* 失败短路 */}
          <rect x="30" y="236" width="688" height="44" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="374" y="254" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">失败短路（Fail Fast）</text>
          <text x="374" y="270" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">任一阶段失败 → 立即中止后续 → 通知作者修复 → 不阻塞主干</text>

          {/* GitHub Actions 示例 */}
          <rect x="30" y="296" width="688" height="44" rx="8" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="374" y="314" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">GitHub Actions 编排</text>
          <text x="374" y="330" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">.github/workflows/ci.yml → jobs 并行 Lint/Test，串行 Build/Deploy → matrix 跨版本</text>

          {/* 缓存优化 */}
          <rect x="30" y="356" width="340" height="80" rx="8" fill="var(--text-tertiary)" fillOpacity="0.06" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="200" y="376" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">缓存加速</text>
          <text x="45" y="394" fontSize="10" fill="var(--text-secondary)">- pnpm store 缓存依赖</text>
          <text x="45" y="408" fontSize="10" fill="var(--text-secondary)">- .next / dist 构建缓存</text>
          <text x="45" y="422" fontSize="10" fill="var(--text-secondary)">- Turborepo 远程缓存</text>

          <rect x="388" y="356" width="330" height="80" rx="8" fill="var(--text-tertiary)" fillOpacity="0.06" stroke="var(--text-tertiary)" strokeWidth="1" />
          <text x="553" y="376" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">并行编排</text>
          <text x="403" y="394" fontSize="10" fill="var(--text-secondary)">- Lint / Test 无依赖可并行</text>
          <text x="403" y="408" fontSize="10" fill="var(--text-secondary)">- Build 依赖前两步通过</text>
          <text x="403" y="422" fontSize="10" fill="var(--text-secondary)">- Deploy 仅 main 分支触发</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        CI 流水线——从 git push 触发 Lint/Test/Build/Deploy/Release 五阶段，失败短路、缓存加速
      </figcaption>
    </figure>
  );
}
