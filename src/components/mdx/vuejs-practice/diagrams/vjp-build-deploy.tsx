/**
 * <VjpBuildDeployDiagram>：Vue 项目构建优化与部署流程图解。
 * 展示源码 → Vite 依赖预构建 → 编译打包 → 优化 → 部署 CDN 的全链路。
 * 纯静态展示，无交互。Server Component。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function VjpBuildDeployDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Vue 项目构建优化与部署流程图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            Vue 项目构建与部署全链路（Vite）
          </text>
          <text x={VIEW_W / 2} y="48" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            源码 → 依赖预构建 → 编译打包 → 优化 → 部署，每一步都有可调旋钮
          </text>

          {/* 第一排：源码 + 依赖预构建 */}
          <rect x="30" y="70" width="160" height="80" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="110" y="94" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--success)">源码</text>
          <text x="110" y="112" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">.vue / .ts / .css</text>
          <text x="110" y="128" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">main.ts 入口</text>
          <text x="110" y="142" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">import 图</text>

          <text x="205" y="114" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="220" y="70" width="170" height="80" rx="8" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="305" y="94" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--warning)">依赖预构建</text>
          <text x="305" y="112" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">esbuild 扫描依赖</text>
          <text x="305" y="128" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">CJS → ESM</text>
          <text x="305" y="142" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">合并小模块减少请求</text>

          <text x="405" y="114" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="420" y="70" width="170" height="80" rx="8" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="505" y="94" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--accent)">Rollup 打包</text>
          <text x="505" y="112" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">编译模板为 render</text>
          <text x="505" y="128" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Tree-shaking 摇掉死代码</text>
          <text x="505" y="142" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">生成 chunks</text>

          <text x="605" y="114" textAnchor="middle" fontSize="16" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="620" y="70" width="90" height="80" rx="8" fill="var(--danger)" fillOpacity="0.12" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="665" y="100" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--danger)">dist/</text>
          <text x="665" y="118" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">assets/</text>
          <text x="665" y="134" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">index.html</text>

          {/* 第二排：优化手段 */}
          <rect x="30" y="180" width="680" height="120" rx="10" fill="var(--accent)" fillOpacity="0.04" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="50" y="202" fontSize="13" fontWeight="600" fill="var(--text-primary)">构建优化手段</text>

          <rect x="50" y="214" width="150" height="74" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="125" y="234" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">代码分割</text>
          <text x="125" y="252" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">动态 import()</text>
          <text x="125" y="268" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">路由懒加载</text>
          <text x="125" y="282" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">按需加载大组件</text>

          <rect x="215" y="214" width="150" height="74" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="290" y="234" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">压缩与哈希</text>
          <text x="290" y="252" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">esbuild minify</text>
          <text x="290" y="268" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">内容哈希命名</text>
          <text x="290" y="282" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">长效缓存</text>

          <rect x="380" y="214" width="150" height="74" rx="8" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1" />
          <text x="455" y="234" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">分包策略</text>
          <text x="455" y="252" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">vendor 单独 chunk</text>
          <text x="455" y="268" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">手动 manualChunks</text>
          <text x="455" y="282" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">避免重复打包</text>

          <rect x="545" y="214" width="150" height="74" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="620" y="234" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">资源内联</text>
          <text x="620" y="252" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">小图转 base64</text>
          <text x="620" y="268" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">CSS 提取抽取</text>
          <text x="620" y="282" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">gzip / brotli</text>

          {/* 第三排：部署 */}
          <rect x="30" y="320" width="680" height="90" rx="10" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1.2" strokeOpacity="0.3" />
          <text x="50" y="342" fontSize="13" fontWeight="600" fill="var(--text-primary)">部署与分发</text>

          <rect x="50" y="354" width="190" height="48" rx="8" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1" />
          <text x="145" y="374" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">静态托管</text>
          <text x="145" y="392" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">Vercel / Netlify / OSS</text>

          <text x="255" y="380" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="275" y="354" width="190" height="48" rx="8" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1" />
          <text x="370" y="374" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--accent)">CDN 加速</text>
          <text x="370" y="392" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">边缘缓存就近回源</text>

          <text x="480" y="380" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="500" y="354" width="195" height="48" rx="8" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1" />
          <text x="597" y="374" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">CI/CD 流水线</text>
          <text x="597" y="392" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">lint → build → 部署</text>

          <text x={VIEW_W / 2} y="432" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            关键洞察：构建优化 = 减少首屏要下载的代码量 + 让缓存命中率最大化
          </text>
          <text x={VIEW_W / 2} y="450" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)">
            分包与懒加载是手段，目标是「用户只下载当前页面需要的代码」
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Vue 项目构建与部署全链路——Vite 预构建、Rollup 打包、代码分割与 CDN 部署
      </figcaption>
    </figure>
  );
}
