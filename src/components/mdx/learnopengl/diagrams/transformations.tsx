import type { ReactNode } from "react";

export { HomogeneousTranslateDiagram } from "../../diagrams/homogeneous-translate-diagram";
export { TransformOrderDiagram } from "../../diagrams/transform-order-diagram";
export { VectorOpsDiagram } from "../../diagrams/vector-ops-diagram";

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";

function Frame({ children, caption }: { children: ReactNode; caption: string }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        {children}
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        {caption}
      </figcaption>
    </figure>
  );
}

export function MatrixConventionDiagram() {
  const matrix = [
    ["m00", "m01", "m02", "tx"],
    ["m10", "m11", "m12", "ty"],
    ["m20", "m21", "m22", "tz"],
    ["0", "0", "0", "1"],
  ];

  return (
    <Frame caption="列向量写在矩阵右边决定代数作用顺序；列主序只描述这 16 个数在线性内存中的存放顺序。">
      <svg
        viewBox="0 0 900 330"
        role="img"
        aria-label="区分列向量代数约定和列主序内存布局：左侧是矩阵乘列向量，右侧是按列连续存储的十六个浮点数"
        className="mx-auto hidden h-auto w-full max-w-[900px] md:block"
      >
        <text x="450" y="28" textAnchor="middle" fontSize="17" fontWeight="700" fill={primary}>
          先分清两件事：怎么算，与怎么存
        </text>
        <rect x="20" y="58" width="410" height="230" rx="8" fill={elevated} stroke={accent} />
        <text x="225" y="84" textAnchor="middle" fontSize="13" fontWeight="700" fill={accent}>
          代数约定：M · v
        </text>
        {matrix.map((row, r) =>
          row.map((value, c) => (
            <g key={`${r}-${c}`}>
              <rect
                x={62 + c * 55}
                y={105 + r * 35}
                width="51"
                height="31"
                rx="4"
                fill={c === 3 ? accent : "var(--bg)"}
                fillOpacity={c === 3 ? 0.1 : 1}
                stroke={c === 3 ? accent : border}
              />
              <text x={87.5 + c * 55} y={126 + r * 35} textAnchor="middle" fontSize="10" fontFamily="monospace" fill={primary}>
                {value}
              </text>
            </g>
          )),
        )}
        <text x="306" y="174" fontSize="20" fill={secondary}>×</text>
        {["x", "y", "z", "1"].map((value, i) => (
          <g key={value}>
            <rect x="335" y={105 + i * 35} width="42" height="31" rx="4" fill="var(--bg)" stroke={border} />
            <text x="356" y={126 + i * 35} textAnchor="middle" fontSize="11" fontFamily="monospace" fill={primary}>{value}</text>
          </g>
        ))}
        <text x="225" y="270" textAnchor="middle" fontSize="11" fill={secondary}>
          最右边的变换最先作用；平移量在最后一列
        </text>

        <rect x="470" y="58" width="410" height="230" rx="8" fill={elevated} stroke={success} />
        <text x="675" y="84" textAnchor="middle" fontSize="13" fontWeight="700" fill={success}>
          内存布局：一列接一列
        </text>
        {[0, 1, 2, 3].map((column) => (
          <g key={column}>
            <text x={522 + column * 91} y="113" textAnchor="middle" fontSize="10" fill={secondary}>
              第 {column + 1} 列
            </text>
            {matrix.map((row, r) => (
              <g key={`${column}-${r}`}>
                <rect
                  x={484 + column * 91}
                  y={127 + r * 34}
                  width="76"
                  height="30"
                  rx="4"
                  fill={column === 3 ? success : "var(--bg)"}
                  fillOpacity={column === 3 ? 0.1 : 1}
                  stroke={column === 3 ? success : border}
                />
                <text x={522 + column * 91} y={147 + r * 34} textAnchor="middle" fontSize="10" fontFamily="monospace" fill={primary}>
                  {row[column]}
                </text>
              </g>
            ))}
          </g>
        ))}
        <text x="675" y="276" textAnchor="middle" fontSize="11" fill={secondary}>
          glUniformMatrix4fv(..., GL_FALSE, data)
        </text>
      </svg>

      <div className="grid gap-3 md:hidden">
        <div className="rounded-control border border-accent bg-bg/40 p-3">
          <strong className="text-sm text-primary">代数：矩阵乘列向量</strong>
          <p className="mt-2 text-xs text-secondary">
            写成 M · v，向量在右；组合 T · R · S · v 从右往左作用。平移量位于矩阵最后一列。
          </p>
        </div>
        <div className="rounded-control border border-success bg-bg/40 p-3">
          <strong className="text-sm text-primary">存储：一列接一列</strong>
          <p className="mt-2 break-words font-mono text-[10px] text-secondary">
            m00,m10,m20,0 · m01,m11,m21,0 · m02,m12,m22,0 · tx,ty,tz,1
          </p>
        </div>
      </div>
    </Frame>
  );
}

const transformStages = [
  { title: "局部点", formula: "v = (1, 1)", result: "(1, 1)", color: secondary },
  { title: "先缩放", formula: "S(2, 1)", result: "(2, 1)", color: warning },
  { title: "再旋转", formula: "R(90°)", result: "(-1, 2)", color: accent },
  { title: "后平移", formula: "T(4, -1)", result: "(3, 1)", color: success },
] as const;

export function TransformSequenceDiagram({ step = 0 }: { step?: 0 | 1 | 2 | 3 }) {
  const visibleThrough = step === 0 ? 3 : step;

  return (
    <Frame caption="同一点按 S → R → T 演算：公式写作 T · R · S · v，最靠近 v 的 S 先执行。">
      <svg
        viewBox="0 0 900 300"
        role="img"
        aria-label={`组合变换第 ${step || "全部"} 步，点从一一经过缩放变成二一，旋转变成负一二，平移后变成三一`}
        className="mx-auto hidden h-auto w-full max-w-[900px] md:block"
      >
        <text x="450" y="28" textAnchor="middle" fontSize="17" fontWeight="700" fill={primary}>
          T · R · S · v 从右往左执行
        </text>
        {transformStages.map((stage, i) => {
          const active = i <= visibleThrough;
          const x = 20 + i * 220;
          return (
            <g key={stage.title} opacity={active ? 1 : 0.24} data-stage={i}>
              <rect x={x} y="66" width="190" height="158" rx="8" fill={stage.color} fillOpacity={active ? 0.08 : 0.02} stroke={stage.color} strokeWidth={step === i ? 2.5 : 1.2} />
              <circle cx={x + 28} cy="94" r="15" fill={stage.color} />
              <text x={x + 28} y="99" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--bg)">{i}</text>
              <text x={x + 52} y="99" fontSize="12" fontWeight="700" fill={primary}>{stage.title}</text>
              <line x1={x + 34} y1="190" x2={x + 156} y2="190" stroke={border} />
              <line x1={x + 95} y1="127" x2={x + 95} y2="210" stroke={border} />
              <circle
                cx={x + 95 + Number(stage.result.match(/-?\d+/)?.[0] ?? 0) * 18}
                cy={190 - Number(stage.result.match(/,\s*(-?\d+)/)?.[1] ?? 0) * 18}
                r="6"
                fill={stage.color}
              />
              <text x={x + 95} y="245" textAnchor="middle" fontFamily="monospace" fontSize="11" fill={stage.color}>{stage.formula}</text>
              <text x={x + 95} y="266" textAnchor="middle" fontFamily="monospace" fontSize="12" fontWeight="700" fill={primary}>→ {stage.result}</text>
            </g>
          );
        })}
        {[210, 430, 650].map((x) => (
          <path key={x} d={`M${x} 145 H${x + 26} M${x + 18} 137 L${x + 27} 145 L${x + 18} 153`} fill="none" stroke={danger} strokeWidth="2" />
        ))}
      </svg>

      <div className="grid gap-3 md:hidden">
        <p className="text-center text-sm font-semibold text-primary">T · R · S · v 从右往左执行</p>
        {transformStages.map((stage, i) => {
          const active = i <= visibleThrough;
          return (
            <div key={stage.title} className="rounded-control border bg-bg/40 p-3" style={{ borderColor: stage.color, opacity: active ? 1 : 0.28 }}>
              <div className="flex items-start justify-between gap-3">
                <strong className="text-sm text-primary">{i}. {stage.title}</strong>
                <span className="font-mono text-xs" style={{ color: stage.color }}>{stage.formula}</span>
              </div>
              <p className="mt-2 text-xs text-secondary">坐标结果：{stage.result}</p>
            </div>
          );
        })}
      </div>
    </Frame>
  );
}
