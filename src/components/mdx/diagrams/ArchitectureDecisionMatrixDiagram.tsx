/**
 * <ArchitectureDecisionMatrixDiagram />：《Android 设计模式》「设计问答广场」章配图。
 *
 * 画面内容：展现左侧 4 个诊断因素与右侧 4 个架构选项的诊断匹配关系。
 *  - 左侧：团队规模、状态复杂度、测试要求、迁移成本。
 *  - 右侧：MVP、MVVM、Flux、VIPER。
 *  - 下方：决策 + 反证条件。
 *
 * Server Component（纯展示，静态 SVG，无交互）。
 */
export function ArchitectureDecisionMatrixDiagram() {
  const VW = 720;
  const VH = 320;
  const tp = "var(--text-primary)";
  const ts = "var(--text-secondary)";
  const bg = "var(--bg)";
  const bo = "var(--border)";
  const be = "var(--bg-elevated)";
  const ac = "var(--accent)";
  const acg = "var(--accent-glow)";

  const factors = ["团队规模", "状态复杂度", "测试要求", "迁移成本"];
  const architectures = ["MVP", "MVVM", "Flux", "VIPER"];

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-5">
        <svg
          viewBox={`0 0 ${VW} ${VH}`}
          role="img"
          aria-label="架构决策诊断映射图"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* Background rect */}
          <rect width={VW} height={VH} rx="12" fill={bg} />

          {/* Left Column: Factors */}
          {factors.map((label, index) => {
            const active = index < 3;
            const x = 48;
            const y = 34 + index * 62;
            const w = 140;
            const h = 42;
            return (
              <g key={label}>
                <rect
                  x={x}
                  y={y}
                  width={w}
                  height={h}
                  rx="8"
                  fill={active ? acg : bg}
                  stroke={active ? ac : bo}
                  strokeWidth="2"
                />
                <text
                  x={x + w / 2}
                  y={y + h / 2 + 5}
                  textAnchor="middle"
                  fill={tp}
                  fontSize="13px"
                  fontWeight="600"
                >
                  {label}
                </text>
              </g>
            );
          })}

          {/* Right Row: Architectures */}
          {architectures.map((label, index) => {
            const active = index === 1 || index === 2; // MVVM or Flux
            const x = 250 + index * 92;
            const y = 52;
            const w = 76;
            const h = 50;
            return (
              <g key={label}>
                <rect
                  x={x}
                  y={y}
                  width={w}
                  height={h}
                  rx="8"
                  fill={active ? acg : bg}
                  stroke={active ? ac : bo}
                  strokeWidth="2"
                />
                <text
                  x={x + w / 2}
                  y={y + h / 2 + 5}
                  textAnchor="middle"
                  fill={tp}
                  fontSize="13px"
                  fontWeight="600"
                >
                  {label}
                </text>
              </g>
            );
          })}

          {/* Bottom Center: Decision Box */}
          <g>
            <rect
              x={300}
              y={184}
              width={180}
              height={58}
              rx="8"
              fill={acg}
              stroke={ac}
              strokeWidth="2"
            />
            <text
              x={390}
              y={218}
              textAnchor="middle"
              fill={tp}
              fontSize="13px"
              fontWeight="700"
            >
              决策 + 反证条件
            </text>
          </g>

          {/* Connections */}
          {/* 1. 团队规模 -> MVP (Diagonal Arrow) */}
          <line
            x1={188}
            y1={55}
            x2={250}
            y2={77}
            stroke={ac}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx={250} cy={77} r="4" fill={ac} />

          {/* 2. 状态复杂度 -> Flux (Stepped Orthogonal Arrow to avoid crossing MVP/MVVM) */}
          {/* Horizontal segment */}
          <line
            x1={188}
            y1={117}
            x2={420}
            y2={117}
            stroke={ac}
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Vertical segment */}
          <line
            x1={420}
            y1={117}
            x2={420}
            y2={77}
            stroke={ac}
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Horizontal entry segment */}
          <line
            x1={420}
            y1={77}
            x2={434}
            y2={77}
            stroke={ac}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx={434} cy={77} r="4" fill={ac} />

          {/* 3. Flux -> 决策 + 反证条件 (Stepped with text gap to avoid overlap) */}
          {/* Vertical segment from Flux bottom */}
          <line
            x1={472}
            y1={102}
            x2={472}
            y2={142}
            stroke={ac}
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Horizontal segment split around label */}
          <line
            x1={472}
            y1={142}
            x2={465}
            y2={142}
            stroke={ac}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1={397}
            y1={142}
            x2={390}
            y2={142}
            stroke={ac}
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Vertical segment down to Decision box */}
          <line
            x1={390}
            y1={142}
            x2={390}
            y2={184}
            stroke={ac}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx={390} cy={184} r="4" fill={ac} />

          {/* Text label in the gap */}
          <text
            x={431}
            y={146}
            textAnchor="middle"
            fill={ts}
            fontSize="11px"
            fontWeight="600"
          >
            trade-off
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        架构决策诊断映射关系。根据不同的团队规模与状态复杂度，合理定位推荐架构，最后收敛至具体的架构决策与反证条件。
      </figcaption>
    </figure>
  );
}
