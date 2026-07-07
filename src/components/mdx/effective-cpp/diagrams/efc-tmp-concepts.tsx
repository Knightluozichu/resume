/**
 * <EfcTmpConceptsDiagram>：模板元编程概念（模板元编程章）。
 *
 * 左侧展示 TMP 三大支柱：
 *   - 编译期计算（递归模板实例化）
 *   - SFINAE（替换失败非错误）
 *   - type traits（类型特征查询与变换）
 * 右侧展示一个 TMP 流程示例： factorial 模板递归 → 编译期求值
 *
 * 纯静态展示，无交互。纯服务端组件，无客户端指令。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×500（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 500;

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const border = "var(--border)";

interface TmpPillar {
  name: string;
  desc: string;
  example: string;
  color: string;
}

const PILLARS: readonly TmpPillar[] = [
  {
    name: "编译期计算",
    desc: "递归模板实例化实现循环",
    example: "factorial<N> = N * factorial<N-1>",
    color: accent,
  },
  {
    name: "SFINAE",
    desc: "替换失败非错误，按条件启用重载",
    example: "enable_if / void_t",
    color: success,
  },
  {
    name: "type traits",
    desc: "编译期查询与变换类型属性",
    example: "is_integral / remove_const",
    color: warning,
  },
];

export function EfcTmpConceptsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="模板元编程概念图。左侧展示 TMP 三大支柱：编译期计算（递归模板实例化）、SFINAE（替换失败非错误）、type traits（类型特征查询与变换）。右侧展示 factorial 模板递归展开为编译期求值的流程。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="efc-tmp-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
              <path d="M0 0 L7 3 L0 6 z" fill={secondary} />
            </marker>
          </defs>

          {/* 主标题 */}
          <text x={VIEW_W / 2} y={28} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            模板元编程（TMP）核心概念
          </text>
          <text x={VIEW_W / 2} y={48} textAnchor="middle" fontSize="11" fill={secondary}>
            把计算从运行期搬到编译期——用模板实例化做「编译期编程」
          </text>

          {/* ===== 左侧：三大支柱 ===== */}
          <text x={32} y={76} fontSize="12.5" fontWeight="700" fill={primary}>
            TMP 三大支柱
          </text>

          {PILLARS.map((p, i) => {
            const y = 92 + i * 100;
            return (
              <g key={p.name}>
                <rect x={40} y={y} width={300} height={84} rx="10" fill={p.color} fillOpacity="0.06" stroke={p.color} strokeWidth="1.6" />
                <rect x={40} y={y} width={4} height={84} rx="2" fill={p.color} />
                <text x={56} y={y + 22} fontSize="13" fontWeight="700" fill={p.color}>{p.name}</text>
                <text x={56} y={y + 42} fontSize="11" fill={secondary}>{p.desc}</text>
                <text x={56} y={y + 64} fontSize="10.5" fill={primary} fontFamily="monospace">{p.example}</text>
              </g>
            );
          })}

          {/* ===== 右侧：factorial 编译期求值示例 ===== */}
          <text x={530} y={76} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={accent}>
            编译期求值示例：factorial
          </text>

          {/* 递归展开链 */}
          <rect x={376} y={92} width={312} height={40} rx="6" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="1.4" />
          <text x={532} y={116} textAnchor="middle" fontSize="11" fill={primary} fontFamily="monospace">factorial&lt;5&gt;::value = 120</text>

          <line x1={532} y1={132} x2={532} y2={148} stroke={secondary} strokeWidth="1.4" markerEnd="url(#efc-tmp-arrow)" />

          <rect x={376} y={152} width={312} height={40} rx="6" fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.2" />
          <text x={532} y={176} textAnchor="middle" fontSize="11" fill={secondary} fontFamily="monospace">= 5 * factorial&lt;4&gt;::value</text>

          <line x1={532} y1={192} x2={532} y2={208} stroke={secondary} strokeWidth="1.4" markerEnd="url(#efc-tmp-arrow)" />

          <rect x={376} y={212} width={312} height={40} rx="6" fill={accent} fillOpacity="0.05" stroke={accent} strokeWidth="1.2" />
          <text x={532} y={236} textAnchor="middle" fontSize="11" fill={secondary} fontFamily="monospace">= 5 * 4 * factorial&lt;3&gt;::value</text>

          <line x1={532} y1={252} x2={532} y2={268} stroke={secondary} strokeWidth="1.4" markerEnd="url(#efc-tmp-arrow)" />

          <rect x={376} y={272} width={312} height={40} rx="6" fill={accent} fillOpacity="0.04" stroke={accent} strokeWidth="1.0" />
          <text x={532} y={296} textAnchor="middle" fontSize="11" fill={secondary} fontFamily="monospace">... 递归展开 ...</text>

          <line x1={532} y1={312} x2={532} y2={328} stroke={secondary} strokeWidth="1.4" markerEnd="url(#efc-tmp-arrow)" />

          {/* 终止条件 */}
          <rect x={376} y={332} width={312} height={40} rx="6" fill={success} fillOpacity="0.08" stroke={success} strokeWidth="1.4" />
          <text x={532} y={356} textAnchor="middle" fontSize="11" fill={success} fontFamily="monospace">factorial&lt;0&gt;::value = 1（特化终止）</text>

          {/* ===== 底部总结 ===== */}
          <rect x={40} y={396} width={648} height={48} rx="8" fill={accent} fillOpacity="0.04" stroke={border} strokeWidth="1" />
          <text x={360} y={418} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={accent}>
            TMP = 把类型当值，把实例化当循环，把特化当分支
          </text>
          <text x={360} y={436} textAnchor="middle" fontSize="11" fill={secondary}>
            代价：编译时间长、错误信息难读；收益：零运行时开销、编译期类型安全
          </text>

          {/* 底部说明 */}
          <line x1={32} y1={460} x2={VIEW_W - 32} y2={460} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={482} textAnchor="middle" fontSize="10.5" fill={secondary}>
            条款 46-48：非成员模板函数做类型转换、traits classes 表现类型信息、认识 template 元编程
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        模板元编程核心概念：左侧三大支柱（编译期计算、SFINAE、type traits），右侧 factorial 模板递归展开为编译期求值示例。
      </figcaption>
    </figure>
  );
}
