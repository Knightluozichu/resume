/**
 * <DnjNpmModuleDiagram>：NPM 与模块生态图解（require 解析 / semver / peer deps）。
 * 纯静态展示，无交互。Server Component。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 480;

export function DnjNpmModuleDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="NPM模块解析与语义化版本图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            NPM 与模块生态：require 解析 + 语义化版本 + 依赖树
          </text>

          {/* require 解析路径 */}
          <text x={VIEW_W / 2} y="52" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">CommonJS require 解析路径</text>

          <rect x="40" y="64" width="130" height="40" rx="6" fill="var(--success)" fillOpacity="0.1" stroke="var(--success)" strokeWidth="1.2" />
          <text x="105" y="88" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--success)">require("x")</text>

          <text x="175" y="88" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="190" y="64" width="130" height="40" rx="6" fill="var(--warning)" fillOpacity="0.1" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="255" y="82" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--warning)">Node 内置模块?</text>
          <text x="255" y="96" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">fs/http/path…</text>

          <text x="325" y="88" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="340" y="64" width="130" height="40" rx="6" fill="var(--accent)" fillOpacity="0.1" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="405" y="82" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--accent)">node_modules 查找</text>
          <text x="405" y="96" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">逐级向上直到根</text>

          <text x="475" y="88" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="490" y="64" width="130" height="40" rx="6" fill="var(--danger)" fillOpacity="0.1" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="555" y="82" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--danger)">文件扩展名补全</text>
          <text x="555" y="96" textAnchor="middle" fontSize="8" fill="var(--text-secondary)">.js .json .node</text>

          <text x="625" y="88" textAnchor="middle" fontSize="14" fill="var(--text-tertiary)">&rarr;</text>

          <rect x="640" y="64" width="60" height="40" rx="6" fill="var(--text-tertiary)" fillOpacity="0.1" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="670" y="88" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--text-tertiary)">缓存</text>

          <text x="105" y="120" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">Module._cache 缓存：首次加载后 require 返回同一实例</text>

          {/* 语义化版本 */}
          <text x={VIEW_W / 2} y="148" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">语义化版本（Semantic Versioning）</text>

          <rect x="40" y="162" width="660" height="40" rx="8" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.2" />
          <text x={VIEW_W / 2} y="188" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--accent)">1.4.2  →  MAJOR.MINOR.PATCH</text>

          <rect x="40" y="212" width="210" height="64" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="145" y="232" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">MAJOR（主版本）</text>
          <text x="145" y="248" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">不兼容的 API 变更</text>
          <text x="145" y="262" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">&#94;1.4.2 锁定大版本</text>

          <rect x="265" y="212" width="210" height="64" rx="8" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="232" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">MINOR（次版本）</text>
          <text x="370" y="248" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">向下兼容的新功能</text>
          <text x="370" y="262" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">~1.4.2 锁定小版本</text>

          <rect x="490" y="212" width="210" height="64" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" />
          <text x="595" y="232" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">PATCH（修订号）</text>
          <text x="595" y="248" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">向下兼容的修复</text>
          <text x="595" y="262" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">1.4.2 精确版本</text>

          {/* 依赖类型 */}
          <text x={VIEW_W / 2} y="298" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--accent)">三种依赖类型对比</text>

          <rect x="40" y="312" width="210" height="74" rx="8" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1.2" />
          <text x="145" y="332" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">dependencies</text>
          <text x="145" y="348" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">运行时依赖</text>
          <text x="145" y="362" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">npm install 默认</text>
          <text x="145" y="376" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">express / lodash</text>

          <rect x="265" y="312" width="210" height="74" rx="8" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1.2" />
          <text x="370" y="332" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--warning)">devDependencies</text>
          <text x="370" y="348" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">开发时依赖</text>
          <text x="370" y="362" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">--save-dev / jest</text>
          <text x="370" y="376" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">npm install 不装到生产</text>

          <rect x="490" y="312" width="210" height="74" rx="8" fill="var(--danger)" fillOpacity="0.08" stroke="var(--danger)" strokeWidth="1.2" />
          <text x="595" y="332" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--danger)">peerDependencies</text>
          <text x="595" y="348" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">宿主项目提供</text>
          <text x="595" y="362" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">插件/中间件模式</text>
          <text x="595" y="376" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">eslint-plugin 需要 eslint</text>

          {/* 底部 */}
          <rect x="40" y="400" width="660" height="60" rx="6" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
          <text x={VIEW_W / 2} y="420" textAnchor="middle" fontSize="10" fill="var(--accent)">
            嵌套 vs 扁平：npm v2 嵌套安装（重复依赖）→ npm v3+ 扁平化 hoist 到顶层 node_modules
          </text>
          <text x={VIEW_W / 2} y="438" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            锁文件：package-lock.json / yarn.lock 固定版本树，保证可复现安装
          </text>
          <text x={VIEW_W / 2} y="454" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">
            幽灵依赖：扁平化导致引用未声明依赖，pnpm 用软链接隔离解决
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        NPM 与模块生态——require 解析路径、语义化版本规则、三种依赖类型与锁文件
      </figcaption>
    </figure>
  );
}
