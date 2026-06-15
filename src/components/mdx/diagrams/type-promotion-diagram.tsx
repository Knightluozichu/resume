/**
 * <TypePromotionDiagram>：C语言类型隐式转换层次链图。
 *
 * 按 C 语言整型提升与寻常算术转换规则，自底向上展示类型自动升级路径：
 * char → short → int → unsigned int → long → float → double → long double
 *
 * 双向转换演示：赋值转换（窄化，可能丢数据）向下，表达式求值中的隐式转换向上。
 * Server Component（纯展示，静态 SVG，无交互）。token 色，无阴影。
 */

export function TypePromotionDiagram() {
  const marginL = 40;
  const w = 600;

  // 类型层次（自底向上：越上面级别越高 / 范围越大）
  const types = [
    { label: "long double", width: 220, desc: "扩展双精度浮点" },
    { label: "double", width: 190, desc: "双精度浮点" },
    { label: "float", width: 160, desc: "单精度浮点" },
    { label: "long", width: 130, desc: "长整数" },
    { label: "unsigned int", width: 160, desc: "无符号整数" },
    { label: "int", width: 100, desc: "有符号整数" },
    { label: "short", width: 100, desc: "短整数" },
    { label: "char", width: 90, desc: "字符型" },
  ];

  const boxH = 34;
  const gap = 16;
  const startY = 50;
  const levels = types.length;
  const totalH = startY + levels * (boxH + gap) + 90;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox={`0 0 ${w} ${totalH}`}
          role="img"
          aria-label="C语言类型隐式转换层次：char 到 long double 的自动升级链"
          className="mx-auto block h-auto w-full max-w-[600px]"
        >
          {/* 标题 */}
          <text x={marginL} y={30} fontSize="17" fontWeight="700" fill="var(--text-primary)" fontFamily="system-ui">
            C 语言类型隐式转换层次链
          </text>

          {types.map((t, i) => {
            const y = startY + i * (boxH + gap);
            const cx = w / 2;
            const halfW = t.width / 2;

            // 级别越高越深的 accent 色
            const alpha = 0.06 + i * 0.03;
            const fillOpacity = Math.min(alpha, 0.2);

            return (
              <g key={t.label}>
                {/* 连接线（向上） */}
                {i > 0 && (
                  <>
                    <line x1={cx} y1={y} x2={cx} y2={y - gap + 2} stroke="var(--accent)" strokeWidth="1" opacity="0.3" />
                    <text x={cx} y={y - gap / 2 + 1} textAnchor="middle" fontSize="18" fill="var(--accent)" opacity="0.4">
                      ↑
                    </text>
                  </>
                )}

                {/* 类型框 */}
                <rect x={cx - halfW} y={y} width={t.width} height={boxH} rx="6" fill="var(--accent)" fillOpacity={fillOpacity} stroke="var(--accent)" strokeWidth="1" strokeOpacity={0.3} />

                {/* 类型名 */}
                <text x={cx} y={y + boxH / 2 + 5} textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--text-primary)" fontFamily="monospace">
                  {t.label}
                </text>

                {/* 说明 */}
                <text x={cx + halfW + 14} y={y + boxH / 2 + 5} textAnchor="start" fontSize="11" fill="var(--text-secondary)" fontFamily="system-ui">
                  {t.desc}
                </text>
              </g>
            );
          })}

          {/* 底部解说 */}
          <text x={marginL} y={totalH - 60} fontSize="12" fill="var(--text-secondary)" fontFamily="system-ui">
            混合类型表达式中，低级别类型自动向高级别提升以避免数据丢失
          </text>
          <text x={marginL} y={totalH - 44} fontSize="12" fill="var(--accent)" fontFamily="system-ui">
            char / short 先提升为 int（整型提升）→ 再按「低→高」统一 → 赋值时反向截断（cast）
          </text>
          <text x={marginL} y={totalH - 20} fontSize="11" fill="var(--text-secondary)" fontFamily="system-ui">
            赋值转换向下（窄化，可能丢数据） · 表达式求值中的隐式转换向上
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        C语言在表达式求值中会将低级别类型自动提升为高级别类型（整型提升 + 寻常算术转换）。赋值则反向截断，可能丢失精度。
      </figcaption>
    </figure>
  );
}
