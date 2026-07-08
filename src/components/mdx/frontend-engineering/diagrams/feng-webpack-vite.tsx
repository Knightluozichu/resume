/**
 * <FengWebpackViteDiagram>：Webpack 与 Vite 构建/HMR 原理对比图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function FengWebpackViteDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Webpack 与 Vite 构建及 HMR 原理对比图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Webpack vs Vite：构建与 HMR 原理对比
          </text>

          {/* 左列 Webpack */}
          <rect x="30" y="48" width="330" height="390" rx="12" fill="var(--warning)" fillOpacity="0.05" stroke="var(--warning)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="195" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--warning)">Webpack（打包优先）</text>

          <rect x="50" y="86" width="290" height="42" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="195" y="104" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">开发启动</text>
          <text x="195" y="120" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">全量编译入口 → 打包 bundle → 启动服务</text>

          <text x="195" y="142" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="50" y="152" width="290" height="42" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="195" y="170" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">HMR 更新</text>
          <text x="195" y="186" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">重新编译受影响模块 → 生成 hot-update.json</text>

          <text x="195" y="208" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="50" y="218" width="290" height="42" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="195" y="236" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">产物</text>
          <text x="195" y="252" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">bundle.js + chunk 文件（全量打包）</text>

          <rect x="50" y="276" width="290" height="70" rx="6" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1" strokeOpacity="0.5" />
          <text x="195" y="294" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--danger)">代价</text>
          <text x="195" y="310" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">项目越大启动越慢（线性增长）</text>
          <text x="195" y="324" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">HMR 需重编依赖链</text>
          <text x="195" y="338" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">配置复杂（loader / plugin 生态）</text>

          <text x="195" y="366" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">优势：生态成熟、产物控制力强、兼容性广</text>

          {/* 右列 Vite */}
          <rect x="380" y="48" width="330" height="390" rx="12" fill="var(--success)" fillOpacity="0.05" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.4" />
          <text x="545" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--success)">Vite（原生 ESM）</text>

          <rect x="400" y="86" width="290" height="42" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="545" y="104" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">开发启动</text>
          <text x="545" y="120" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">按需编译 → 浏览器原生 ESM 加载</text>

          <text x="545" y="142" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="400" y="152" width="290" height="42" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="545" y="170" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">HMR 更新</text>
          <text x="545" y="186" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">单模块重编 → ESM 失效精确替换</text>

          <text x="545" y="208" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&darr;</text>

          <rect x="400" y="218" width="290" height="42" rx="6" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1" />
          <text x="545" y="236" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">产物</text>
          <text x="545" y="252" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Rollup 打包（生产构建）</text>

          <rect x="400" y="276" width="290" height="70" rx="6" fill="var(--accent)" fillOpacity="0.08" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.5" />
          <text x="545" y="294" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--accent)">优势</text>
          <text x="545" y="310" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">冷启动毫秒级（不随项目增长）</text>
          <text x="545" y="324" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">HMR 仅替换单文件</text>
          <text x="545" y="338" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">预构建依赖（esbuild 极速）</text>

          <text x="545" y="366" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">代价：生态较新、生产构建依赖 Rollup</text>

          {/* 底部对比总结 */}
          <rect x="30" y="448" width="680" height="0" rx="0" fill="none" />
          <text x={VIEW_W / 2} y="446" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            核心差异：Webpack 先打包再服务，Vite 先服务按需编译
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Webpack 与 Vite 构建及 HMR 原理对比——打包优先 vs 原生 ESM 按需编译
      </figcaption>
    </figure>
  );
}
