/**
 * <EfcConventionsDiagram>：编码约定（编码约定章）。
 *
 * 五大维度展示 Effective C++ 杂项条款的编码约定：
 *   - 接口设计：让接口容易被正确使用（条款 18）
 *   - inline：理解 inline 的里里外外（条款 30）
 *   - 转型：尽量少做转型（条款 27）
 *   - 异常安全：为异常安全而努力（条款 29）
 *   - 命名与编译器警告：不轻忽警告（条款 53）
 *
 * 纯静态展示，无交互。纯服务端组件，无客户端指令。
 * 全部 DESIGN token 配色，无裸 hex、无阴影。
 * viewBox 720×480（宽 ≥720），四周留白 ≥32，字号 ≥11。
 */

const VIEW_W = 720;
const VIEW_H = 480;

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const border = "var(--border)";

interface Convention {
  title: string;
  item: string;
  rule: string;
  example: string;
  color: string;
}

const CONVENTIONS: readonly Convention[] = [
  {
    title: "接口设计",
    item: "条款 18",
    rule: "容易被正确使用，不易被误用",
    example: "用类型限制参数，避免误传",
    color: accent,
  },
  {
    title: "inline 策略",
    item: "条款 30",
    rule: "小函数 inline，大函数不 inline",
    example: "inline 可能增加代码体积",
    color: success,
  },
  {
    title: "转型控制",
    item: "条款 27",
    rule: "尽量少做转型，避免旧式转型",
    example: "static_cast / dynamic_cast",
    color: warning,
  },
  {
    title: "异常安全",
    item: "条款 29",
    rule: "提供基本/强/不抛异常保证",
    example: "copy-and-swap 模式",
    color: accent,
  },
  {
    title: "编译器警告",
    item: "条款 53",
    rule: "不要轻忽编译器警告",
    example: "不同编译器警告不同，逐条理解",
    color: success,
  },
];

export function EfcConventionsDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="编码约定图。五个维度展示 Effective C++ 杂项条款：接口设计容易被正确使用、inline 策略小函数inline大函数不inline、转型控制尽量少做转型、异常安全提供保证、编译器警告不要轻忽。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 主标题 */}
          <text x={VIEW_W / 2} y={28} textAnchor="middle" fontSize="16" fontWeight="700" fill={primary}>
            编码约定：五大维度
          </text>
          <text x={VIEW_W / 2} y={48} textAnchor="middle" fontSize="11" fill={secondary}>
            条款 53-55 杂项 + 贯穿全书的工程习惯
          </text>

          {/* 五个约定卡片 */}
          {CONVENTIONS.map((c, i) => {
            const col = i % 2;
            const row = Math.floor(i / 2);
            const x = 40 + col * 340;
            const y = 68 + row * 78;
            return (
              <g key={c.title}>
                <rect x={x} y={y} width={320} height={66} rx="10" fill={c.color} fillOpacity="0.06" stroke={c.color} strokeWidth="1.5" />
                <rect x={x} y={y} width={4} height={66} rx="2" fill={c.color} />
                <text x={x + 18} y={y + 22} fontSize="13" fontWeight="700" fill={c.color}>{c.title}</text>
                <text x={x + 18} y={y + 40} fontSize="11" fill={primary}>{c.rule}</text>
                <text x={x + 18} y={y + 56} fontSize="11" fill={secondary} fontFamily="monospace">{c.example}</text>
                <text x={x + 306} y={y + 22} textAnchor="end" fontSize="11" fill={secondary} fontFamily="monospace">{c.item}</text>
              </g>
            );
          })}

          {/* 第五个居中 */}
          <g>
            <rect x={200} y={300} width={320} height={66} rx="10" fill={success} fillOpacity="0.06" stroke={success} strokeWidth="1.5" />
            <rect x={200} y={300} width={4} height={66} rx="2" fill={success} />
            <text x={218} y={322} fontSize="13" fontWeight="700" fill={success}>标准库与 Boost</text>
            <text x={218} y={340} fontSize="11" fill={primary}>熟悉 TR1 / 标准库 / Boost 组件</text>
            <text x={218} y={356} fontSize="11" fill={secondary} fontFamily="monospace">条款 54-55：不重复造轮子</text>
            <text x={506} y={322} textAnchor="end" fontSize="11" fill={secondary} fontFamily="monospace">条款 54-55</text>
          </g>

          {/* ===== 底部总结 ===== */}
          <rect x={40} y={386} width={640} height={44} rx="8" fill={accent} fillOpacity="0.04" stroke={border} strokeWidth="1" />
          <text x={360} y={406} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={accent}>
            约定 = 把经验固化为习惯——让正确成为默认行为
          </text>
          <text x={360} y={424} textAnchor="middle" fontSize="11" fill={secondary}>
            接口防误用、inline 节制、转型最小化、异常安全、善用标准库
          </text>

          {/* 底部说明 */}
          <line x1={32} y1={446} x2={VIEW_W - 32} y2={446} stroke={border} strokeWidth="1" strokeDasharray="4 3" />
          <text x={VIEW_W / 2} y={468} textAnchor="middle" fontSize="11" fill={secondary}>
            条款 53-55：编译器警告、TR1 标准库、Boost 生态
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        编码约定五大维度：接口设计（防误用）、inline 策略（小函数）、转型控制（最小化）、异常安全（基本/强/不抛保证）、编译器警告（不轻忽），外加标准库与 Boost。
      </figcaption>
    </figure>
  );
}
