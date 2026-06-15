/**
 * <TypeConversionDiagram>：类型转换方向链图。
 *
 * 展示 C++ 内建算术类型的隐式转换方向——从窄类型到宽类型（bool→char→short→int→long→float→double）。
 * 支持 step prop：step=1 展示全体链；step=2 标出 int→float 转换（精度丢失点）；step=3 展示 static_cast 显式转换。
 *
 * Server Component（纯展示，静态 SVG，无交互）。
 * token 色，无阴影。
 */

interface Props {
  step?: 1 | 2 | 3;
}

export function TypeConversionDiagram({ step = 1 }: Props) {
  const types = [
    { label: "bool（1B）", x: 44, y: 100, w: 90, h: 42 },
    { label: "char（1B）", x: 148, y: 100, w: 90, h: 42 },
    { label: "short（2B）", x: 252, y: 100, w: 90, h: 42 },
    { label: "int（4B）", x: 356, y: 100, w: 90, h: 42 },
    { label: "long（8B）", x: 460, y: 100, w: 90, h: 42 },
    { label: "float（4B）", x: 350, y: 170, w: 100, h: 42 },
    { label: "double（8B）", x: 470, y: 170, w: 100, h: 42 },
  ];

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 680 300"
          role="img"
          aria-label="C++ 内建算术类型的隐式转换方向链"
          className="mx-auto block h-auto w-full max-w-[680px]"
        >
          {/* ---- 整型链：bool → char → short → int → long ---- */}
          {types.slice(0, 5).map((t, i) => (
            <g key={t.label}>
              <rect
                x={t.x}
                y={t.y}
                width={t.w}
                height={t.h}
                rx="8"
                fill={i === 3 ? "var(--accent)" : "var(--bg)"}
                opacity={i === 3 ? 0.12 : 1}
                stroke={i === 3 ? "var(--accent)" : "var(--border)"}
                strokeWidth={i === 3 ? 2 : 1.5}
              />
              <text
                x={t.x + t.w / 2}
                y={t.y + t.h / 2 + 5}
                textAnchor="middle"
                fontSize="12"
                fontWeight="600"
                fill={i === 3 ? "var(--accent)" : "var(--text-primary)"}
              >
                {t.label}
              </text>
            </g>
          ))}

          {/* 整型间箭头 → */}
          {[0, 1, 2, 3].map((i) => (
            <g key={`arrow-int-${i}`}>
              <line
                x1={types[i].x + types[i].w + 4}
                y1={types[i].y + types[i].h / 2}
                x2={types[i + 1].x - 4}
                y2={types[i + 1].y + types[i + 1].h / 2}
                stroke="var(--accent)"
                strokeWidth="2"
              />
              <polygon
                points={`${types[i + 1].x - 4},${types[i + 1].y + types[i + 1].h / 2} ${types[i + 1].x - 12},${types[i + 1].y + types[i + 1].h / 2 - 6} ${types[i + 1].x - 12},${types[i + 1].y + types[i + 1].h / 2 + 6}`}
                fill="var(--accent)"
              />
            </g>
          ))}

          {/* int → float（精度丢失路径） */}
          {step >= 2 && (
            <>
              <line
                x1={types[3].x + types[3].w / 2}
                y1={types[3].y + types[3].h}
                x2={types[5].x + types[5].w / 2}
                y2={types[5].y}
                stroke="var(--warning)"
                strokeWidth="2"
                strokeDasharray="6 3"
              />
              <polygon
                points={`${types[5].x + types[5].w / 2},${types[5].y} ${types[5].x + types[5].w / 2 - 6},${types[5].y + 8} ${types[5].x + types[5].w / 2 + 6},${types[5].y + 8}`}
                fill="var(--warning)"
              />
              <text
                x={types[3].x + types[3].w / 2}
                y={types[3].y + types[3].h + 20}
                textAnchor="middle"
                fontSize="11"
                fill="var(--warning)"
              >
                ⚠ 隐式转换 可能丢精度
              </text>
            </>
          )}

          {/* 浮点链：float → double */}
          {types.slice(5).map((t) => (
            <g key={t.label}>
              <rect
                x={t.x}
                y={t.y}
                width={t.w}
                height={t.h}
                rx="8"
                fill="var(--bg)"
                stroke="var(--border)"
                strokeWidth="1.5"
              />
              <text
                x={t.x + t.w / 2}
                y={t.y + t.h / 2 + 5}
                textAnchor="middle"
                fontSize="12"
                fontWeight="600"
                fill="var(--text-primary)"
              >
                {t.label}
              </text>
            </g>
          ))}

          {/* float → double 箭头 */}
          <line
            x1={types[5].x + types[5].w + 4}
            y1={types[5].y + types[5].h / 2}
            x2={types[6].x - 4}
            y2={types[6].y + types[6].h / 2}
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <polygon
            points={`${types[6].x - 4},${types[6].y + types[6].h / 2} ${types[6].x - 12},${types[6].y + types[6].h / 2 - 6} ${types[6].x - 12},${types[6].y + types[6].h / 2 + 6}`}
            fill="var(--accent)"
          />

          {/* step=3：static_cast 标注 */}
          {step >= 3 && (
            <text
              x={300}
              y={280}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill="var(--accent)"
            >
              逆方向需显式转换 static_cast&lt;int&gt;(3.14)
            </text>
          )}

          {/* 说明文字 */}
          <text x={14} y={20} fontSize="12" fontWeight="700" fill="var(--accent)">
            隐式转换方向（窄 → 宽）—— 编译器自动帮你做，不丢信息
          </text>
          <text x={14} y={240} fontSize="11" fill="var(--text-secondary)">
            C++ 的「类型提升」规则：如果两个操作数类型不同，编译器先把窄类型转成宽类型再运算。
          </text>
          <text x={14} y={258} fontSize="11" fill="var(--text-secondary)">
            逆方向需显式 static_cast，如 static_cast&lt;int&gt;(3.14) → 3。
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        从左到右是"安全方向"——小容量类型自动转为大容量类型。int→float 虽是隐式但可能丢精度（float 有效数字仅约 7 位）。逆方向必须显式 static_cast。
      </figcaption>
    </figure>
  );
}
