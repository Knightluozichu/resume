/**
 * <FengTypescriptEslintDiagram>：TypeScript 与 ESLint 双层质量防护图解。
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex。
 */

const VIEW_W = 740;
const VIEW_H = 460;

export function FengTypescriptEslintDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="TypeScript 与 ESLint 双层质量防护图解"
          className="mx-auto block h-auto w-full max-w-[740px]"
        >
          <text x={VIEW_W / 2} y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            TypeScript + ESLint：类型安全与代码规范双层防护
          </text>

          {/* 源码入口 */}
          <rect x="290" y="48" width="160" height="40" rx="8" fill="var(--text-tertiary)" fillOpacity="0.12" stroke="var(--text-tertiary)" strokeWidth="1.2" />
          <text x="370" y="73" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">源码 .ts / .tsx</text>

          <line x1="370" y1="88" x2="370" y2="108" stroke="var(--text-tertiary)" strokeWidth="1.5" />
          <text x="384" y="103" fontSize="11" fill="var(--text-tertiary)">&darr;</text>

          {/* 第一层：TypeScript 类型检查 */}
          <rect x="40" y="112" width="660" height="130" rx="10" fill="var(--accent)" fillOpacity="0.06" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="370" y="134" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--accent)">第一层：TypeScript 类型检查（tsc）</text>

          <rect x="60" y="146" width="195" height="80" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="157" y="164" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">编译期拦截</text>
          <text x="157" y="182" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">类型不匹配 → 编译报错</text>
          <text x="157" y="196" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">null / undefined 安全</text>
          <text x="157" y="210" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">泛型约束与推断</text>

          <rect x="270" y="146" width="195" height="80" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="367" y="164" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">配置旋钮</text>
          <text x="367" y="182" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">strict: true 全量严格</text>
          <text x="367" y="196" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">noImplicitAny 禁隐式 any</text>
          <text x="367" y="210" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">type-checks 增量构建</text>

          <rect x="480" y="146" width="200" height="80" rx="6" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeWidth="1" />
          <text x="580" y="164" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">解决的问题</text>
          <text x="580" y="182" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">参数类型错误</text>
          <text x="580" y="196" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">API 返回结构不匹配</text>
          <text x="580" y="210" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">重构漏改引用</text>

          <line x1="370" y1="242" x2="370" y2="262" stroke="var(--text-tertiary)" strokeWidth="1.5" />
          <text x="384" y="257" fontSize="11" fill="var(--text-tertiary)">&darr;</text>

          {/* 第二层：ESLint 规范检查 */}
          <rect x="40" y="266" width="660" height="130" rx="10" fill="var(--warning)" fillOpacity="0.06" stroke="var(--warning)" strokeWidth="1.4" />
          <text x="370" y="288" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--warning)">第二层：ESLint 代码规范（lint）</text>

          <rect x="60" y="300" width="195" height="80" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="157" y="318" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">AST 规则扫描</text>
          <text x="157" y="336" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">no-unused-vars 未用变量</text>
          <text x="157" y="350" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">no-console 禁调试残留</text>
          <text x="157" y="364" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">import/order 导入排序</text>

          <rect x="270" y="300" width="195" height="80" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="367" y="318" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">类型规则桥接</text>
          <text x="367" y="336" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">typescript-eslint</text>
          <text x="367" y="350" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">no-floating-promises</text>
          <text x="367" y="364" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">await-thenable 守护</text>

          <rect x="480" y="300" width="200" height="80" rx="6" fill="var(--warning)" fillOpacity="0.12" stroke="var(--warning)" strokeWidth="1" />
          <text x="580" y="318" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">解决的问题</text>
          <text x="580" y="336" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">代码风格不一致</text>
          <text x="580" y="350" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">潜在 bug 模式</text>
          <text x="580" y="364" textAnchor="middle" fontSize="10" fill="var(--text-secondary)">可维护性规则</text>

          {/* 输出 */}
          <line x1="370" y1="396" x2="370" y2="416" stroke="var(--text-tertiary)" strokeWidth="1.5" />
          <text x="384" y="411" fontSize="11" fill="var(--text-tertiary)">&darr;</text>

          <rect x="200" y="420" width="340" height="32" rx="8" fill="var(--success)" fillOpacity="0.12" stroke="var(--success)" strokeWidth="1.2" />
          <text x="370" y="441" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--success)">类型安全 + 规范一致 = 可维护的代码</text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        TypeScript 与 ESLint 双层防护——tsc 编译期类型检查 + ESLint AST 规范扫描
      </figcaption>
    </figure>
  );
}
