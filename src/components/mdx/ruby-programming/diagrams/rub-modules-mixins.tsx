/**
 * <RubModulesMixinsDiagram>：Ruby 模块——命名空间与 Mixin。
 *
 * 展示模块作为命名空间、Mixin 多重继承、include/extend/prepend 的区别。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * viewBox 720×400，四周留白 >=32，字号 >=11。
 */

const VIEW_W = 720;
const VIEW_H = 400;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

export function RubModulesMixinsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Ruby 模块：命名空间组织代码、Mixin 实现多重继承。include/prepend/extend 三种混入方式决定方法查找顺序。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x={VIEW_W / 2} y={28} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            Ruby 模块：命名空间与 Mixin
          </text>
          <text x={VIEW_W / 2} y={46} textAnchor="middle" fontSize="11" fill={secondary}>
            模块不能实例化 · 解决 Ruby 单继承限制 · 三种混入方式控制查找链
          </text>

          {/* 左半：模块作为命名空间 */}
          <text x={170} y={74} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            模块 = 命名空间
          </text>

          <rect x={32} y={86} width={300} height={128} rx="8" fill={elevated} stroke={border} strokeWidth="1" />
          <text x={44} y={108} fontSize="11" fontWeight="600" fill={accent}>module MyMath</text>
          <text x={56} y={126} fontSize="11" fill={secondary}># 常量</text>
          <text x={56} y={142} fontSize="11" fill={primary}>PI = 3.14159</text>
          <text x={56} y={162} fontSize="11" fill={secondary}># 模块方法</text>
          <text x={56} y={178} fontSize="11" fill={primary}>def self.square(x)</text>
          <text x={56} y={192} fontSize="11" fill={primary}>  x * x</text>
          <text x={56} y={206} fontSize="11" fill={primary}>end</text>

          <rect x={32} y={226} width={300} height={36} rx="6" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1" strokeOpacity="0.4" />
          <text x={44} y={248} fontSize="11" fill={success}>MyMath.square(5)  # 25</text>

          {/* 右半：Mixin 三种方式 */}
          <line x1={336} y1={64} x2={336} y2={360} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          <text x={524} y={74} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            Mixin 三种方式
          </text>

          {/* include */}
          <rect x={360} y={86} width={300} height={60} rx="8" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={372} y={106} fontSize="12" fontWeight="600" fill={accent}>include Module</text>
          <text x={372} y={124} fontSize="11" fill={primary}>实例方法混入</text>
          <text x={372} y={140} fontSize="11" fill={secondary}>查找链：类 → include 的模块 → 父类</text>

          {/* prepend */}
          <rect x={360} y={158} width={300} height={60} rx="8" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={372} y={178} fontSize="12" fontWeight="600" fill={warning}>prepend Module</text>
          <text x={372} y={196} fontSize="11" fill={primary}>实例方法混入（优先级最高）</text>
          <text x={372} y={212} fontSize="11" fill={secondary}>查找链：prepend 的模块 → 类 → ...</text>

          {/* extend */}
          <rect x={360} y={230} width={300} height={60} rx="8" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.2" strokeOpacity="0.4" />
          <text x={372} y={250} fontSize="12" fontWeight="600" fill={success}>extend Module</text>
          <text x={372} y={268} fontSize="11" fill={primary}>类方法混入（给类本身加方法）</text>
          <text x={372} y={284} fontSize="11" fill={secondary}>查找链：类的单例类 → extend 的模块</text>

          {/* 底部：方法查找链示意 */}
          <line x1={32} y1={300} x2={VIEW_W - 32} y2={300} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={320} textAnchor="middle" fontSize="12" fontWeight="600" fill={primary}>
            方法查找链示意（prepend 类有最高优先级）
          </text>

          <rect x={60} y={332} width={100} height={36} rx="6" fill={warning} fillOpacity="0.08" stroke={warning} strokeWidth="1" />
          <text x={110} y={354} textAnchor="middle" fontSize="11" fill={warning}>PrependMod</text>

          <line x1={160} y1={350} x2={180} y2={350} stroke={secondary} strokeWidth="1" markerEnd="url(#rub-mod-arrow)" />

          <rect x={180} y={332} width={80} height={36} rx="6" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1" />
          <text x={220} y={354} textAnchor="middle" fontSize="11" fill={accent}>Dog（类）</text>

          <line x1={260} y1={350} x2={280} y2={350} stroke={secondary} strokeWidth="1" markerEnd="url(#rub-mod-arrow)" />

          <rect x={280} y={332} width={100} height={36} rx="6" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1" strokeOpacity="0.5" />
          <text x={330} y={354} textAnchor="middle" fontSize="11" fill={accent}>IncludeMod</text>

          <line x1={380} y1={350} x2={400} y2={350} stroke={secondary} strokeWidth="1" markerEnd="url(#rub-mod-arrow)" />

          <rect x={400} y={332} width={80} height={36} rx="6" fill={success} fillOpacity="0.08" stroke={success} strokeWidth="1" />
          <text x={440} y={354} textAnchor="middle" fontSize="11" fill={success}>Animal</text>

          <line x1={480} y1={350} x2={500} y2={350} stroke={secondary} strokeWidth="1" markerEnd="url(#rub-mod-arrow)" />

          <rect x={500} y={332} width={80} height={36} rx="6" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1" strokeOpacity="0.5" />
          <text x={540} y={354} textAnchor="middle" fontSize="11" fill={success}>Object</text>

          <line x1={580} y1={350} x2={600} y2={350} stroke={secondary} strokeWidth="1" markerEnd="url(#rub-mod-arrow)" />

          <rect x={600} y={332} width={80} height={36} rx="6" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1" strokeOpacity="0.5" />
          <text x={640} y={354} textAnchor="middle" fontSize="11" fill={danger}>BasicObject</text>

          <text x={VIEW_W / 2} y={388} textAnchor="middle" fontSize="11" fill={secondary}>
            super 在 prepend 中可调用被覆盖的原始方法 · include 常用 · extend 给类加方法
          </text>

          <defs>
            <marker id="rub-mod-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Ruby 模块双重身份：命名空间组织代码 + Mixin 实现多重继承，查找链 prepend → 类 → include → 父类。
      </figcaption>
    </figure>
  );
}
