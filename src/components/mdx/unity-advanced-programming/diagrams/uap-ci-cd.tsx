/**
 * <UapCiCdDiagram>：Unity 持续集成与自动化构建图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 720;
const VIEW_H = 400;

export function UapCiCdDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Unity 持续集成与自动化构建图解"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="360" y="32" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">CI/CD 自动化流水线</text>
          <rect x="30" y="65" width="100" height="50" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="80" y="88" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">push 代码</text>
          <text x="80" y="104" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">触发 CI</text>
          <text x="140" y="93" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <rect x="155" y="65" width="100" height="50" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="205" y="88" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">安装 Unity</text>
          <text x="205" y="104" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">batchmode</text>
          <text x="265" y="93" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <rect x="280" y="65" width="100" height="50" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="330" y="88" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">命令行构建</text>
          <text x="330" y="104" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">BuildPipeline</text>
          <text x="390" y="93" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <rect x="405" y="65" width="100" height="50" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="455" y="88" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">跑测试</text>
          <text x="455" y="104" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">UTF</text>
          <text x="515" y="93" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <rect x="530" y="65" width="100" height="50" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="580" y="88" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">出包分发</text>
          <text x="580" y="104" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">蒲公英/TF</text>
          <text x="640" y="93" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>
          <rect x="655" y="65" width="40" height="50" rx="8" fill="var(--text-tertiary)" fillOpacity="0.12" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="675" y="93" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">QA</text>
          <rect x="30" y="140" width="665" height="44" rx="8" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="362" y="166" textAnchor="middle" fontSize="12" fill="var(--text-primary)">测试不过不出包——回归 Bug 在 CI 阶段拦截</text>
          <text x="360" y="215" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">工具选型</text>
          <rect x="60" y="230" width="180" height="44" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="0.8" strokeOpacity="0.5" />
          <text x="150" y="250" textAnchor="middle" fontSize="11" fill="var(--success)">Jenkins</text>
          <text x="150" y="266" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">自建灵活，维护高</text>
          <rect x="270" y="230" width="180" height="44" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="0.8" strokeOpacity="0.5" />
          <text x="360" y="250" textAnchor="middle" fontSize="11" fill="var(--accent)">GitHub Actions</text>
          <text x="360" y="266" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">云原生，零维护</text>
          <rect x="480" y="230" width="180" height="44" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="0.8" strokeOpacity="0.5" />
          <text x="570" y="250" textAnchor="middle" fontSize="11" fill="var(--warning)">Unity Cloud Build</text>
          <text x="570" y="266" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">最省心，定制差</text>
          <text x="360" y="310" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">优化要点</text>
          <text x="360" y="332" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Library 缓存（增量编译）+ 多平台并行 + 分级流水线</text>
          <text x="360" y="350" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">push 级 10 分钟内反馈，nightly 全量出包</text>
          <text x="360" y="380" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">开发者只管 push，机器管剩下</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        CI/CD 流水线——从提交到出包全自动
      </figcaption>
    </figure>
  );
}
