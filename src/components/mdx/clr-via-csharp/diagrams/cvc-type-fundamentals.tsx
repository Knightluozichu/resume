/**
 * <CvcTypeFundamentalsDiagram>：CLR 类型系统基础。
 *
 * 上半：继承层次（Dog → Animal → Object）与类型对象结构。
 * 下半：typeof / GetType / is / as 的运行时机制对比。
 *
 * 纯静态展示，无交互。Server Component（不加 "use client"）。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×420，四周留白 >=32，字号 >=11。
 */

const VIEW_W = 720;
const VIEW_H = 420;

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";
const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";

export function CvcTypeFundamentalsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="CLR 类型系统基础。上半展示继承层次 Dog 继承 Animal 继承 Object，及类型对象的方法表结构。下半对比 typeof、GetType、is、as 四种类型操作的运行时机制。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={34} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            CLR 类型系统：继承层次与类型对象
          </text>
          <text x={VIEW_W / 2} y={54} textAnchor="middle" fontSize="11" fill={secondary}>
            万物派生自 Object · 类型对象存方法表 · GetType 返回实际类型
          </text>

          {/* 上半：继承层次 */}
          <text x={180} y={84} textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
            继承层次
          </text>

          {/* Object */}
          <rect x={110} y={96} width={120} height={42} rx="6" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.4" strokeOpacity="0.5" />
          <text x={170} y={114} textAnchor="middle" fontSize="12" fontWeight="700" fill={accent} fontFamily="monospace">
            System.Object
          </text>
          <text x={170} y={130} textAnchor="middle" fontSize="10" fill={secondary}>
            根类型 · 4 个虚方法
          </text>

          {/* 箭头 */}
          <line x1={170} y1={138} x2={170} y2={158} stroke={secondary} strokeWidth="1.4" markerEnd="url(#cvc-tf-arrow)" />

          {/* Animal */}
          <rect x={110} y={160} width={120} height={42} rx="6" fill={elevated} stroke={success} strokeWidth="1.2" />
          <text x={170} y={178} textAnchor="middle" fontSize="12" fontWeight="700" fill={success} fontFamily="monospace">
            Animal
          </text>
          <text x={170} y={194} textAnchor="middle" fontSize="10" fill={secondary}>
            : Object
          </text>

          {/* 箭头 */}
          <line x1={170} y1={202} x2={170} y2={222} stroke={secondary} strokeWidth="1.4" markerEnd="url(#cvc-tf-arrow)" />

          {/* Dog */}
          <rect x={110} y={224} width={120} height={42} rx="6" fill={elevated} stroke={warning} strokeWidth="1.2" />
          <text x={170} y={242} textAnchor="middle" fontSize="12" fontWeight="700" fill={warning} fontFamily="monospace">
            Dog
          </text>
          <text x={170} y={258} textAnchor="middle" fontSize="10" fill={secondary}>
            : Animal
          </text>

          {/* 右侧：类型对象结构 */}
          <text x={480} y={84} textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>
            Dog 的类型对象（Type Object）
          </text>

          <rect x={350} y={96} width={300} height={170} rx="8" fill={elevated} stroke={border} strokeWidth="1" />

          <text x={360} y={118} fontSize="11" fontWeight="700" fill={primary}>方法表（Method Table）</text>
          <line x1={360} y1={124} x2={640} y2={124} stroke={border} strokeWidth="1" />

          <text x={370} y={140} fontSize="11" fill={secondary} fontFamily="monospace">Speak() → Dog.Speak</text>
          <text x={370} y={156} fontSize="11" fill={secondary} fontFamily="monospace">ToString() → Object.ToString</text>
          <text x={370} y={172} fontSize="11" fill={secondary} fontFamily="monospace">Equals() → Object.Equals</text>
          <text x={370} y={188} fontSize="11" fill={secondary} fontFamily="monospace">GetType() → 非虚 · 内置</text>

          <text x={360} y={212} fontSize="11" fontWeight="700" fill={primary}>基类指针</text>
          <text x={450} y={212} fontSize="11" fill={secondary}>→ Animal 类型对象</text>

          <text x={360} y={232} fontSize="11" fontWeight="700" fill={primary}>字段布局</text>
          <text x={450} y={232} fontSize="11" fill={secondary}>Name @ offset 8</text>

          <text x={360} y={252} fontSize="11" fontWeight="700" fill={primary}>实例类型指针</text>
          <text x={480} y={252} fontSize="11" fill={secondary}>每个 Dog 实例指向此对象</text>

          {/* 分隔线 */}
          <line x1={32} y1={290} x2={VIEW_W - 32} y2={290} stroke={border} strokeWidth="1" strokeDasharray="4 3" />

          {/* 下半：类型操作对比 */}
          <text x={VIEW_W / 2} y={312} textAnchor="middle" fontSize="13" fontWeight="700" fill={warning}>
            运行时类型识别：typeof / GetType / is / as
          </text>

          {/* 四列对比 */}
          <rect x={40} y={328} width={150} height={60} rx="6" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1" strokeOpacity="0.4" />
          <text x={115} y={346} textAnchor="middle" fontSize="11" fontWeight="700" fill={accent} fontFamily="monospace">typeof(Dog)</text>
          <text x={115} y={362} textAnchor="middle" fontSize="10" fill={secondary}>编译期确定</text>
          <text x={115} y={378} textAnchor="middle" fontSize="10" fill={secondary}>返回静态类型对象</text>

          <rect x={205} y={328} width={150} height={60} rx="6" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1" strokeOpacity="0.4" />
          <text x={280} y={346} textAnchor="middle" fontSize="11" fontWeight="700" fill={success} fontFamily="monospace">obj.GetType()</text>
          <text x={280} y={362} textAnchor="middle" fontSize="10" fill={secondary}>运行时读取</text>
          <text x={280} y={378} textAnchor="middle" fontSize="10" fill={secondary}>返回实际类型对象</text>

          <rect x={370} y={328} width={150} height={60} rx="6" fill={warning} fillOpacity="0.06" stroke={warning} strokeWidth="1" strokeOpacity="0.4" />
          <text x={445} y={346} textAnchor="middle" fontSize="11" fontWeight="700" fill={warning} fontFamily="monospace">obj is T</text>
          <text x={445} y={362} textAnchor="middle" fontSize="10" fill={secondary}>遍历继承链</text>
          <text x={445} y={378} textAnchor="middle" fontSize="10" fill={secondary}>返回 bool</text>

          <rect x={535} y={328} width={150} height={60} rx="6" fill={danger} fillOpacity="0.06" stroke={danger} strokeWidth="1" strokeOpacity="0.4" />
          <text x={610} y={346} textAnchor="middle" fontSize="11" fontWeight="700" fill={danger} fontFamily="monospace">obj as T</text>
          <text x={610} y={362} textAnchor="middle" fontSize="10" fill={secondary}>安全转型</text>
          <text x={610} y={378} textAnchor="middle" fontSize="10" fill={secondary}>失败返回 null</text>

          <defs>
            <marker id="cvc-tf-arrow" markerWidth="8" markerHeight="8" refX="4" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        所有类型派生自 Object，类型对象存储方法表，typeof/GetType/is/as 各有不同运行时机制。
      </figcaption>
    </figure>
  );
}
