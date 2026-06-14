/**
 * <MsaaSampleDiagram step={1|2|3}>：「抗锯齿」§5「MSAA 如何在一个像素里判覆盖度」<Stepper> 三步配图
 * （HEL-77，A 概念型）。放大看「一个像素格」，盯着 4 个采样点里几个落在图元内、覆盖度怎么定边缘色：
 *  ①一条斜边压过一个像素格：边把格子斜着切成「图元内」一侧和「图元外」一侧。
 *  ②像素内放 4 个采样点（不是格中心一个）：数一数几个落在斜边的图元内侧——这里是 2/4。
 *  ③按覆盖度 2/4 = 50% 取「图元色」与「背景色」的中间色填这个边缘像素 → 边缘柔和。
 *
 * 同一套 SVG 骨架（同一个放大像素格 + 同一条斜边 + 4 个采样点），按 step 高亮不同重点。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--success/--danger/--warning/--border/
 * --bg/--bg-elevated/--text-primary/--text-secondary），无阴影、rx 圆角、无裸 hex（硬规则 5）。
 */

type MsaaStep = 1 | 2 | 3;

const ARIA: Record<MsaaStep, string> = {
  1: "MSAA 判覆盖度第一步。放大看一个像素格，一条斜边压过这个格子，把它斜着切成两半：斜边一侧是三角形图元内部，另一侧是图元外部的背景。",
  2: "MSAA 判覆盖度第二步。在这个像素内放 4 个采样点，不是只取格中心一个。数一数有几个采样点落在斜边的图元内侧：这里 4 个里有 2 个在内、2 个在外，覆盖度是四分之二。",
  3: "MSAA 判覆盖度第三步。按覆盖度四分之二即百分之五十，取三角形图元颜色和背景颜色的中间色来填这个边缘像素，于是边缘像素变成半深的过渡色，看起来柔和，不再是硬邦邦的阶梯。",
};

// 放大像素格：左上角 (150,40)，边长 200。
const PX = 150;
const PY = 40;
const PS = 200;

// 4 个采样点（像素内的 4 个位置，旋转网格式摆放）。inside 标记「落在图元内」。
const SAMPLES = [
  { x: PX + 56, y: PY + 60, inside: true },
  { x: PX + 150, y: PY + 50, inside: false },
  { x: PX + 50, y: PY + 150, inside: true },
  { x: PX + 145, y: PY + 145, inside: false },
];

// 斜边：从像素格左上偏下，斜到右下偏上，把格子切成左下（图元内）/ 右上（图元外）两片。
const E0 = { x: PX + 10, y: PY + 130 };
const E1 = { x: PX + 175, y: PY - 6 };

export function MsaaSampleDiagram({ step }: { step: MsaaStep }) {
  // 图元内一侧（左下三角）多边形：沿斜边 + 像素格左下两条边围出。
  const insidePoly = `${E0.x},${E0.y} ${E1.x},${E1.y} ${PX + PS},${PY + PS} ${PX},${PY + PS}`;

  return (
    <figure className="mdx-figure mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 500 280"
          role="img"
          aria-label={ARIA[step]}
          className="mx-auto block h-auto w-full max-w-[500px]"
        >
          {/* 像素格底（背景色一侧） */}
          <rect
            x={PX}
            y={PY}
            width={PS}
            height={PS}
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />

          {/* 图元内一侧填三角形色（accent），第 3 步整格改填覆盖度混色，故此处仅 step<=2 显示分区 */}
          {step <= 2 && (
            <polygon
              points={insidePoly}
              fill="var(--accent)"
              fillOpacity="0.32"
              stroke="none"
            />
          )}

          {/* 第 3 步：整个像素改填「图元色与背景的中间色」——用 accent 半透明铺满整格表示混色 */}
          {step === 3 && (
            <rect
              x={PX}
              y={PY}
              width={PS}
              height={PS}
              fill="var(--accent)"
              fillOpacity="0.42"
            />
          )}

          {/* 斜边本身 */}
          <line
            x1={E0.x}
            y1={E0.y}
            x2={E1.x}
            y2={E1.y}
            stroke="var(--accent)"
            strokeWidth="2.5"
          />

          {/* 「一个像素」标注 */}
          <text
            x={PX + PS / 2}
            y={PY - 12}
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            放大看一个像素
          </text>

          {/* 图元内 / 外 标注（第 1 步重点） */}
          {step === 1 && (
            <>
              <text
                x={PX + 44}
                y={PY + PS - 16}
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fill="var(--accent)"
              >
                图元内
              </text>
              <text
                x={PX + PS - 36}
                y={PY + 26}
                textAnchor="middle"
                fontSize="11"
                fill="var(--text-secondary)"
              >
                图元外
              </text>
            </>
          )}

          {/* 4 个采样点（第 2、3 步显示；第 1 步只画斜边切分） */}
          {step >= 2 &&
            SAMPLES.map((s, i) => (
              <g key={i}>
                <circle
                  cx={s.x}
                  cy={s.y}
                  r="9"
                  fill={s.inside ? "var(--success)" : "var(--bg-elevated)"}
                  stroke={s.inside ? "var(--success)" : "var(--text-secondary)"}
                  strokeWidth="2"
                />
                {s.inside && (
                  <path
                    d={`M${s.x - 4} ${s.y} l3 3 l5 -6`}
                    stroke="var(--bg)"
                    strokeWidth="1.6"
                    fill="none"
                  />
                )}
              </g>
            ))}

          {/* ====== 右侧：本步结论 ====== */}
          {step === 1 && (
            <>
              <text
                x="402"
                y="120"
                textAnchor="middle"
                fontSize="12"
                fontWeight="600"
                fill="var(--text-primary)"
              >
                一条斜边
              </text>
              <text
                x="402"
                y="142"
                textAnchor="middle"
                fontSize="12"
                fontWeight="600"
                fill="var(--text-primary)"
              >
                压过这个格
              </text>
              <text
                x="402"
                y="170"
                textAnchor="middle"
                fontSize="10"
                fill="var(--text-secondary)"
              >
                切成内 / 外两片
              </text>
            </>
          )}

          {step === 2 && (
            <>
              <text
                x="402"
                y="116"
                textAnchor="middle"
                fontSize="13"
                fontWeight="600"
                fill="var(--success)"
              >
                2 / 4 在内
              </text>
              <text
                x="402"
                y="142"
                textAnchor="middle"
                fontSize="11"
                fill="var(--text-secondary)"
              >
                覆盖度
              </text>
              <text
                x="402"
                y="162"
                textAnchor="middle"
                fontSize="14"
                fontWeight="600"
                className="font-mono"
                fill="var(--text-primary)"
              >
                2/4 = 50%
              </text>
            </>
          )}

          {step === 3 && (
            <>
              {/* 颜色混合示意：图元色 + 背景色 → 中间色 */}
              <rect
                x="372"
                y="80"
                width="28"
                height="28"
                fill="var(--accent)"
                fillOpacity="0.85"
                stroke="var(--border)"
              />
              <text
                x="412"
                y="98"
                fontSize="13"
                fontWeight="600"
                fill="var(--text-primary)"
              >
                +
              </text>
              <rect
                x="372"
                y="120"
                width="28"
                height="28"
                fill="var(--bg)"
                stroke="var(--text-secondary)"
              />
              <text
                x="402"
                y="172"
                textAnchor="middle"
                fontSize="11"
                fill="var(--text-secondary)"
              >
                按 50% 混
              </text>
              <text
                x="402"
                y="192"
                textAnchor="middle"
                fontSize="12"
                fontWeight="600"
                fill="var(--success)"
              >
                = 过渡色
              </text>
              <rect
                x="372"
                y="200"
                width="60"
                height="24"
                fill="var(--accent)"
                fillOpacity="0.5"
                stroke="var(--border)"
              />
            </>
          )}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        {step === 1 && (
          <>
            放大一个像素：一条斜边<strong>压过</strong>它，把格子切成
            <strong>图元内</strong>和<strong>图元外</strong>两片。
          </>
        )}
        {step === 2 && (
          <>
            像素里放 <strong>4 个采样点</strong>，数有几个落在图元内：这里
            <strong>2/4 = 50%</strong>，就是这个像素的<strong>覆盖度</strong>。
          </>
        )}
        {step === 3 && (
          <>
            按覆盖度 <strong>50%</strong> 取
            <strong>图元色与背景色的中间色</strong>填这个边缘像素 → 边缘
            <strong>柔和</strong>，不再是硬阶梯。
          </>
        )}
      </figcaption>
    </figure>
  );
}
