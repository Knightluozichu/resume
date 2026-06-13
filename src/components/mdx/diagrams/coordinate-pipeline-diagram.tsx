/**
 * <CoordinatePipelineDiagram>：「坐标系统」§3「概念讲解」核心掰碎图（B 数学型），
 * 兼作 §5 <Stepper> 五步分步配图（stage-aware）。
 *
 * 展示顶点从局部空间到屏幕空间的五步流水线——每个空间是什么、这个空间里乘的是什么矩阵。
 * 左起：模型局部（model space）→ Model 矩阵 → 世界空间 → View 矩阵 → 观察空间 → Projection
 * 矩阵 → 裁剪空间（NDC）→ 透视除法 + 视口变换 → 屏幕空间。
 *
 * stage prop（仿 frame-stage-diagram.tsx 的 stage-aware 范式）：
 *  - 不传（默认）= 完整总览图，§3 用法保持原样，所有空间框正常显示、底部说明全列出。
 *  - 传 0|1|2|3|4 = 高亮顶点「当前所在的空间」（0 局部 / 1 世界 / 2 观察 / 3 裁剪 / 4 NDC·屏幕），
 *    其余空间框淡化（opacity），并在当前空间框下标注此步的坐标态（取自各 Step 正文）。
 *    用于在 §5 五步里重复出现，形成「跟着一个点走完五步」的连贯体验。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * token 色，无阴影、rx 圆角（硬规则 5）。
 */

/** stage（0–4）→ 高亮哪个空间框（steps 数组下标）+ 该步的简短坐标态标注 */
const STAGE_TO_SPACE: Record<
  0 | 1 | 2 | 3 | 4,
  { index: number; coord: string }
> = {
  0: { index: 0, coord: "局部 (0.5, 2.0, 0.0)" }, // 局部空间框
  1: { index: 2, coord: "世界 (5.4, 1.6, -10.0)" }, // 世界空间框
  2: { index: 4, coord: "观察 (xₑ, yₑ, zₑ)" }, // 观察空间框
  3: { index: 6, coord: "裁剪 (x_c, y_c, z_c, w_c)" }, // 裁剪空间框
  4: { index: 8, coord: "屏幕像素 (1248, 648)" }, // 屏幕空间框
};

export function CoordinatePipelineDiagram({
  stage,
}: {
  stage?: 0 | 1 | 2 | 3 | 4;
}) {
  const active = stage !== undefined ? STAGE_TO_SPACE[stage] : null;

  const steps = [
    { label: "局部空间", sub: "模型自己的坐标", color: "var(--success)" },
    { label: "Model", sub: "摆到场上", color: "var(--accent)" },
    { label: "世界空间", sub: "所有物体在一起", color: "var(--success)" },
    { label: "View", sub: "摄像机视角", color: "var(--accent)" },
    { label: "观察空间", sub: "从摄像机看世界", color: "var(--success)" },
    { label: "Projection", sub: "框定可见范围", color: "var(--accent)" },
    { label: "裁剪空间", sub: "NDC [-1,1]³", color: "var(--success)" },
    {
      label: "透视除法\n+视口变换",
      sub: "映射到屏幕",
      color: "var(--warning)",
    },
    { label: "屏幕空间", sub: "像素坐标", color: "var(--success)" },
  ];

  const boxW = 114;
  const boxH = 50;
  const gap = 12;
  const startX = 16;

  return (
    <figure className={`mdx-figure mx-auto ${active ? "my-4" : "my-6"}`}>
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-6">
        <svg
          viewBox="0 0 1300 200"
          role="img"
          aria-label={
            active
              ? `坐标空间五步流水线，当前高亮「${steps[active.index].label}」（第 ${stage! + 1} 步），顶点坐标态 ${active.coord}。完整管线：局部空间→Model矩阵→世界空间→View矩阵→观察空间→Projection矩阵→裁剪空间NDC→透视除法+视口变换→屏幕空间。`
              : "坐标空间五步流水线。局部空间→Model矩阵→世界空间→View矩阵→观察空间→Projection矩阵→裁剪空间NDC→透视除法+视口变换→屏幕空间。每步标注了是什么矩阵做了什么变换。"
          }
          className="mx-auto block h-auto w-full max-w-[1300px]"
        >
          <text
            x="650"
            y="28"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            {active
              ? "跟着一个顶点走五步——当前所在的空间已高亮"
              : "顶点从模型空间到屏幕的五步之旅"}
          </text>

          {steps.map((s, i) => {
            const isSpace = i % 2 === 0;
            const x = startX + i * (boxW + gap);
            const y = 56;
            const fn = x + boxW / 2;
            // stage 态：当前空间框高亮、其余淡化；总览态（无 active）全不淡化
            const isActiveSpace = active !== null && i === active.index;
            const dimmed = active !== null && !isActiveSpace;

            return (
              <g key={i} opacity={dimmed ? 0.32 : 1}>
                {isSpace ? (
                  /* 空间框：当前所在空间加粗描边 + 实底强调 */
                  <>
                    <rect
                      x={x}
                      y={y}
                      width={boxW}
                      height={boxH}
                      rx="8"
                      fill={isActiveSpace ? s.color : "var(--accent-glow)"}
                      fillOpacity={isActiveSpace ? 0.22 : 1}
                      stroke={s.color}
                      strokeWidth={isActiveSpace ? 3 : 2}
                    />
                    <text
                      x={fn}
                      y={y + 24}
                      textAnchor="middle"
                      fontSize="13"
                      fontWeight="600"
                      fill="var(--text-primary)"
                    >
                      {s.label}
                    </text>
                    <text
                      x={fn}
                      y={y + 42}
                      textAnchor="middle"
                      fontSize="10"
                      fill="var(--text-secondary)"
                    >
                      {s.sub}
                    </text>
                    {/* 当前空间下方标注此步坐标态（取自 Step 正文） */}
                    {isActiveSpace && (
                      <text
                        x={fn}
                        y={y + boxH + 18}
                        textAnchor="middle"
                        fontSize="11"
                        fontFamily="var(--font-mono)"
                        fontWeight="600"
                        fill={s.color}
                      >
                        {active.coord}
                      </text>
                    )}
                  </>
                ) : (
                  /* 矩阵/变换标签 */
                  <>
                    <text
                      x={fn}
                      y={y + 24}
                      textAnchor="middle"
                      fontSize="13"
                      fontWeight="600"
                      fill={s.color}
                    >
                      {s.label === "透视除法\n+视口变换" ? (
                        <>
                          <tspan x={fn} dy="-8">
                            透视除法
                          </tspan>
                          <tspan x={fn} dy="18">
                            + 视口变换
                          </tspan>
                        </>
                      ) : (
                        s.label
                      )}
                    </text>
                    {s.sub && (
                      <text
                        x={fn}
                        y={y + 42}
                        textAnchor="middle"
                        fontSize="10"
                        fill="var(--text-secondary)"
                      >
                        {s.sub}
                      </text>
                    )}
                  </>
                )}

                {/* 箭头到下一个 */}
                {i < steps.length - 1 && (
                  <g>
                    <line
                      x1={x + boxW + 4}
                      y1={y + boxH / 2}
                      x2={x + boxW + gap - 4}
                      y2={y + boxH / 2}
                      stroke="var(--text-secondary)"
                      strokeWidth="1.5"
                    />
                    <polygon
                      points={`${x + boxW + gap - 10},${y + boxH / 2 - 4} ${x + boxW + gap - 4},${y + boxH / 2} ${x + boxW + gap - 10},${y + boxH / 2 + 4}`}
                      fill="var(--text-secondary)"
                    />
                  </g>
                )}
              </g>
            );
          })}

          {/* 底部说明：总览态列全管线；stage 态压成一句聚焦当前步 */}
          {active ? (
            <text
              x="650"
              y="158"
              textAnchor="middle"
              fontSize="12"
              fontWeight="600"
              fill="var(--accent)"
            >
              这一步顶点落在「{steps[active.index].label}」——五步里的第{" "}
              {stage! + 1} 步
            </text>
          ) : (
            <>
              <text
                x="650"
                y="132"
                textAnchor="middle"
                fontSize="12"
                fontWeight="600"
                fill="var(--accent)"
              >
                顶点着色器里一句 gl_Position = P · V · M · vec4(aPos,
                1.0)，走完这五步
              </text>
              <text
                x="650"
                y="156"
                textAnchor="middle"
                fontSize="11"
                fill="var(--text-secondary)"
              >
                ① Model 矩阵把模型摆到世界 ② View 矩阵把世界拉到摄像机面前 ③
                Projection 矩阵把视锥体压进 NDC 立方体 ④ 透视除法（除以
                w）实现近大远小 ⑤ 视口变换映射到屏幕像素
              </text>

              {/* 底部框：每个矩阵的英文全称 */}
              <g transform="translate(0, 176)">
                <text
                  x="650"
                  y="0"
                  textAnchor="middle"
                  fontSize="10"
                  fontFamily="var(--font-mono)"
                  fill="var(--text-secondary)"
                >
                  Model Matrix (M) &nbsp;&nbsp;→&nbsp;&nbsp; View Matrix (V)
                  &nbsp;&nbsp;→&nbsp;&nbsp; Projection Matrix (P) &nbsp;&nbsp;=
                  &nbsp;&nbsp; MVP 矩阵
                </text>
              </g>
            </>
          )}
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        {active
          ? `顶点走到第 ${stage! + 1} 步：当前位于「${steps[active.index].label}」，坐标态 ${active.coord}。`
          : "顶点坐标从模型空间出发，依次乘上 Model、View、Projection 三个矩阵，一路变换到裁剪空间（NDC），最后经透视除法和视口变换落到屏幕像素上。"}
      </figcaption>
    </figure>
  );
}
