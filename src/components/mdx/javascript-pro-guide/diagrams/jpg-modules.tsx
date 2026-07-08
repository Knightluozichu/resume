/**
 * <JpgModulesDiagram>：模块系统图解（ESM vs CommonJS 加载机制对比）。
 * 纯静态展示，无交互。Server Component。全部 DESIGN token 配色。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function JpgModulesDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="模块系统 ESM 与 CommonJS 加载机制对比图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            ESM 与 CommonJS 加载机制对比
          </text>
          <text x={VIEW_W / 2} y="46" textAnchor="middle" fontSize="12" fill="var(--text-secondary)">
            ESM 静态加载、异步、实时绑定；CommonJS 同步加载、值的拷贝
          </text>

          {/* ESM */}
          <rect x="40" y="64" width="320" height="360" rx="10" fill="var(--success)" fillOpacity="0.04" stroke="var(--success)" strokeWidth="1.4" />
          <text x="200" y="86" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--success)">ESM（ES Modules）</text>
          <text x="200" y="102" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">import / export —— 浏览器+Node 原生</text>

          <rect x="56" y="114" width="288" height="40" rx="6" fill="var(--elevated)" stroke="var(--border)" strokeWidth="1" />
          <text x="200" y="130" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-primary)">加载时机：静态分析（编译期）</text>
          <text x="200" y="146" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">import 必须在顶层，路径可静态推导</text>

          <rect x="56" y="162" width="288" height="40" rx="6" fill="var(--elevated)" stroke="var(--border)" strokeWidth="1" />
          <text x="200" y="178" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-primary)">绑定方式：实时绑定（live binding）</text>
          <text x="200" y="194" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">import 的是引用，导出方改变即同步</text>

          <rect x="56" y="210" width="288" height="40" rx="6" fill="var(--elevated)" stroke="var(--border)" strokeWidth="1" />
          <text x="200" y="226" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-primary)">执行模型：异步、支持 tree-shaking</text>
          <text x="200" y="242" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">未用导出可被构建工具剔除</text>

          <rect x="56" y="258" width="288" height="70" rx="6" fill="var(--success)" fillOpacity="0.08" stroke="var(--success)" strokeWidth="1" />
          <text x="200" y="276" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--success)">语法示例</text>
          <text x="68" y="294" fontSize="9" fill="var(--text-secondary)">export const PI = 3.14;</text>
          <text x="68" y="310" fontSize="9" fill="var(--text-secondary)">export default function() &lbrace;&rbrace;</text>
          <text x="68" y="324" fontSize="9" fill="var(--text-secondary)">import &lbrace; PI &rbrace; from &quot;./math.js&quot;;</text>

          <rect x="56" y="336" width="288" height="76" rx="6" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="200" y="354" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--accent)">特性要点</text>
          <text x="68" y="370" fontSize="9" fill="var(--text-tertiary)">严格模式自动开启（无需 &quot;use strict&quot;）</text>
          <text x="68" y="384" fontSize="9" fill="var(--text-tertiary)">顶层 this 为 undefined（非 window）</text>
          <text x="68" y="398" fontSize="9" fill="var(--text-tertiary)">支持动态 import() 返回 Promise</text>
          <text x="68" y="412" fontSize="9" fill="var(--text-tertiary)">import.meta 暴露模块元信息</text>

          {/* CommonJS */}
          <rect x="380" y="64" width="320" height="360" rx="10" fill="var(--warning)" fillOpacity="0.04" stroke="var(--warning)" strokeWidth="1.4" />
          <text x="540" y="86" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--warning)">CommonJS</text>
          <text x="540" y="102" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)">require / module.exports —— Node 专用</text>

          <rect x="396" y="114" width="288" height="40" rx="6" fill="var(--elevated)" stroke="var(--border)" strokeWidth="1" />
          <text x="540" y="130" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-primary)">加载时机：运行时（同步阻塞）</text>
          <text x="540" y="146" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">require 可在任意位置，到哪行才加载</text>

          <rect x="396" y="162" width="288" height="40" rx="6" fill="var(--elevated)" stroke="var(--border)" strokeWidth="1" />
          <text x="540" y="178" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-primary)">绑定方式：值的拷贝（copy）</text>
          <text x="540" y="194" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">导出后改变不影响已 require 的副本</text>

          <rect x="396" y="210" width="288" height="40" rx="6" fill="var(--elevated)" stroke="var(--border)" strokeWidth="1" />
          <text x="540" y="226" textAnchor="middle" fontSize="10" fontWeight="600" fill="var(--text-primary)">执行模型：同步、首次加载缓存</text>
          <text x="540" y="242" textAnchor="middle" fontSize="9" fill="var(--text-secondary)">无法 tree-shaking，整体引入</text>

          <rect x="396" y="258" width="288" height="70" rx="6" fill="var(--warning)" fillOpacity="0.08" stroke="var(--warning)" strokeWidth="1" />
          <text x="540" y="276" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--warning)">语法示例</text>
          <text x="408" y="294" fontSize="9" fill="var(--text-secondary)">const PI = 3.14;</text>
          <text x="408" y="310" fontSize="9" fill="var(--text-secondary)">module.exports = &lbrace; PI &rbrace;;</text>
          <text x="408" y="324" fontSize="9" fill="var(--text-secondary)">const &lbrace; PI &rbrace; = require(&quot;./math&quot;);</text>

          <rect x="396" y="336" width="288" height="76" rx="6" fill="var(--danger)" fillOpacity="0.06" stroke="var(--danger)" strokeWidth="1" strokeOpacity="0.4" />
          <text x="540" y="354" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--danger)">特性要点</text>
          <text x="408" y="370" fontSize="9" fill="var(--text-tertiary)">this = module.exports（非 undefined）</text>
          <text x="408" y="384" fontSize="9" fill="var(--text-tertiary)">可动态条件 require（路径可拼变量）</text>
          <text x="408" y="398" fontSize="9" fill="var(--text-tertiary)">循环依赖返回已执行部分（可能未完整）</text>
          <text x="408" y="412" fontSize="9" fill="var(--text-tertiary)">ESM 与 CJS 互操作受限制（默认导出坑）</text>

          <text x={VIEW_W / 2} y="448" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)">
            现代前端统一用 ESM；Node 通过 .mjs 或 package.json &quot;type&quot;:&quot;module&quot; 启用
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        ESM 静态分析 + 实时绑定 + 可 tree-shaking；CommonJS 同步加载 + 值拷贝 + 运行时动态
      </figcaption>
    </figure>
  );
}
