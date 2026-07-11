const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";

const cameraStages = [
  {
    number: 1,
    title: "CameraSample",
    detail: "pFilm · pLens · time",
    result: "确定像素、孔径与快门时刻",
    color: accent,
  },
  {
    number: 2,
    title: "Camera",
    detail: "raster → camera → render",
    result: "投影并生成带权光线",
    color: success,
  },
  {
    number: 3,
    title: "Ray Differential",
    detail: "main · rx · ry",
    result: "估计相邻像素的光线足迹",
    color: warning,
  },
  {
    number: 4,
    title: "Film",
    detail: "L(λ) · filterWeight",
    result: "传感器响应与像素累积",
    color: danger,
  },
] as const;

export function PbtCameraModelDiagram({ step = 0 }: { step?: 0 | 1 | 2 | 3 }) {
  const activeStages =
    step === 1
      ? [1, 2]
      : step === 2
        ? [2, 3]
        : step === 3
          ? [3, 4]
          : [1, 2, 3, 4];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 800 310"
          role="img"
          aria-label="PBRT 相机从 CameraSample 经投影和 Ray Differential 到 Film 的完整成像流水线"
          className="mx-auto hidden h-auto w-full max-w-[800px] md:block"
        >
          <text
            x="400"
            y="28"
            textAnchor="middle"
            fontSize="17"
            fontWeight="700"
            fill={primary}
          >
            相机不是一条射线，而是位置、孔径、时间、波长与像素滤波的接口
          </text>
          <text
            x="400"
            y="50"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            Stepper 高亮当前审计层，其余阶段保留上下文
          </text>

          {cameraStages.map((stage, index) => {
            const focused = activeStages.includes(stage.number);
            const x = 20 + index * 195;
            return (
              <g key={stage.title} opacity={focused ? 1 : 0.25}>
                <rect
                  x={x}
                  y="78"
                  width="174"
                  height="166"
                  rx="8"
                  fill={stage.color}
                  fillOpacity={focused ? 0.09 : 0.02}
                  stroke={stage.color}
                  strokeWidth={step !== 0 && focused ? 2.5 : 1.2}
                />
                <circle cx={x + 26} cy="106" r="14" fill={stage.color} />
                <text
                  x={x + 26}
                  y="111"
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill="var(--bg)"
                >
                  {stage.number}
                </text>
                <text
                  x={x + 48}
                  y="111"
                  fontSize="13"
                  fontWeight="700"
                  fill={primary}
                >
                  {stage.title}
                </text>
                <rect
                  x={x + 14}
                  y="130"
                  width="146"
                  height="40"
                  rx="6"
                  fill={elevated}
                  stroke={border}
                />
                <text
                  x={x + 87}
                  y="155"
                  textAnchor="middle"
                  fontSize="10.5"
                  fontWeight="600"
                  fill={primary}
                >
                  {stage.detail}
                </text>
                <text
                  x={x + 87}
                  y="199"
                  textAnchor="middle"
                  fontSize="10.5"
                  fill={secondary}
                >
                  {stage.result}
                </text>
                <circle cx={x + 87} cy="222" r="4" fill={stage.color} />
              </g>
            );
          })}

          {[194, 389, 584].map((x) => (
            <g key={x}>
              <line
                x1={x}
                y1="161"
                x2={x + 20}
                y2="161"
                stroke={border}
                strokeWidth="2"
              />
              <path
                d={`M${x + 14} 155 L${x + 22} 161 L${x + 14} 167`}
                fill="none"
                stroke={border}
                strokeWidth="2"
              />
            </g>
          ))}
          <text
            x="400"
            y="278"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={primary}
          >
            GenerateRay(sample, λ) → CameraRay(ray, spectral weight) →
            Film.AddSample(...)
          </text>
          <text
            x="400"
            y="298"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            每个变量都对应一个可见效果：锯齿、景深、运动模糊、纹理过滤或曝光颜色
          </text>
        </svg>

        <div className="grid gap-3 md:hidden">
          <p className="text-center text-sm font-semibold text-primary">
            PBRT 相机成像流水线
          </p>
          {cameraStages.map((stage) => {
            const focused = activeStages.includes(stage.number);
            return (
              <div
                key={stage.title}
                className="rounded-control border bg-bg/40 p-3 transition-opacity"
                style={{
                  borderColor: stage.color,
                  opacity: focused ? 1 : 0.32,
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <strong className="text-sm text-primary">
                    {stage.number}. {stage.title}
                  </strong>
                  <span
                    className="font-mono text-[11px]"
                    style={{ color: stage.color }}
                  >
                    {stage.detail}
                  </span>
                </div>
                <p className="mt-2 text-xs text-secondary">{stage.result}</p>
              </div>
            );
          })}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        一条相机样本同时选择像素位置、透镜位置和快门时刻，最终携带光谱权重写入
        Film。
      </figcaption>
    </figure>
  );
}

export function PbtCameraSpacesDiagram() {
  const models = [
    {
      title: "正交投影",
      subtitle: "起点变，方向相同",
      note: "保留平行线，无透视缩短",
      color: accent,
    },
    {
      title: "透视投影",
      subtitle: "起点相同，方向变",
      note: "x/z、y/z 产生近大远小",
      color: success,
    },
    {
      title: "球面投影",
      subtitle: "像素映射到球面方向",
      note: "等距矩形或等面积参数化",
      color: warning,
    },
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 780 350"
          role="img"
          aria-label="正交、透视和球面相机如何把光栅坐标映射为不同起点与方向的相机光线"
          className="mx-auto hidden h-auto w-full max-w-[780px] md:block"
        >
          <text
            x="390"
            y="28"
            textAnchor="middle"
            fontSize="17"
            fontWeight="700"
            fill={primary}
          >
            同一个光栅样本，三种相机给出三种光线族
          </text>
          {models.map((model, index) => {
            const x = 20 + index * 255;
            return (
              <g key={model.title} transform={`translate(${x} 0)`}>
                <rect
                  x="0"
                  y="62"
                  width="235"
                  height="238"
                  rx="8"
                  fill={model.color}
                  fillOpacity="0.06"
                  stroke={model.color}
                />
                <text
                  x="117"
                  y="88"
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="700"
                  fill={model.color}
                >
                  {model.title}
                </text>
                <text
                  x="117"
                  y="108"
                  textAnchor="middle"
                  fontSize="11"
                  fill={secondary}
                >
                  {model.subtitle}
                </text>

                {index === 0 && (
                  <g>
                    {[58, 100, 142, 184].map((rayX) => (
                      <g key={rayX}>
                        <circle cx={rayX} cy="246" r="4" fill={model.color} />
                        <line
                          x1={rayX}
                          y1="242"
                          x2={rayX}
                          y2="135"
                          stroke={model.color}
                          strokeWidth="2"
                        />
                      </g>
                    ))}
                    <line
                      x1="35"
                      y1="247"
                      x2="200"
                      y2="247"
                      stroke={border}
                      strokeWidth="2"
                    />
                  </g>
                )}
                {index === 1 && (
                  <g>
                    <circle cx="117" cy="246" r="6" fill={model.color} />
                    {[
                      [45, 135],
                      [90, 135],
                      [145, 135],
                      [190, 135],
                    ].map(([rayX, rayY]) => (
                      <line
                        key={rayX}
                        x1="117"
                        y1="240"
                        x2={rayX}
                        y2={rayY}
                        stroke={model.color}
                        strokeWidth="2"
                      />
                    ))}
                    <line
                      x1="35"
                      y1="135"
                      x2="200"
                      y2="135"
                      stroke={border}
                      strokeWidth="2"
                    />
                  </g>
                )}
                {index === 2 && (
                  <g>
                    <circle cx="117" cy="202" r="7" fill={model.color} />
                    {[-120, -60, 0, 60, 120].map((angle) => {
                      const radians = (angle * Math.PI) / 180;
                      const x2 = 117 + Math.sin(radians) * 78;
                      const y2 = 202 - Math.cos(radians) * 78;
                      return (
                        <line
                          key={angle}
                          x1="117"
                          y1="202"
                          x2={x2}
                          y2={y2}
                          stroke={model.color}
                          strokeWidth="2"
                        />
                      );
                    })}
                    <path
                      d="M41 202 A76 76 0 1 1 193 202"
                      fill="none"
                      stroke={border}
                      strokeDasharray="4 4"
                    />
                  </g>
                )}

                <text
                  x="117"
                  y="280"
                  textAnchor="middle"
                  fontSize="10.5"
                  fill={primary}
                >
                  {model.note}
                </text>
              </g>
            );
          })}
          <text
            x="390"
            y="329"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            raster → screen → camera 的变换链决定起点和方向，render space
            只改变后续计算坐标系
          </text>
        </svg>

        <div className="grid gap-3 md:hidden">
          <p className="text-center text-sm font-semibold text-primary">
            三种投影的光线签名
          </p>
          {models.map((model) => (
            <div
              key={model.title}
              className="rounded-control border bg-bg/40 p-3"
              style={{ borderColor: model.color }}
            >
              <div className="flex items-center justify-between gap-3">
                <strong className="text-sm" style={{ color: model.color }}>
                  {model.title}
                </strong>
                <span className="text-xs text-primary">{model.subtitle}</span>
              </div>
              <p className="mt-2 text-xs text-secondary">{model.note}</p>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        正交相机改变光线起点，透视相机改变光线方向，球面相机让方向覆盖观察点四周。
      </figcaption>
    </figure>
  );
}

export function PbtDepthOfFieldDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 780 350"
          role="img"
          aria-label="针孔与有限孔径薄透镜对焦平面和焦外散布圆的几何对比"
          className="mx-auto hidden h-auto w-full max-w-[780px] md:block"
        >
          <text
            x="390"
            y="28"
            textAnchor="middle"
            fontSize="17"
            fontWeight="700"
            fill={primary}
          >
            景深来自“同一像素采样多个透镜位置”，不是后处理模糊
          </text>

          <g transform="translate(22 58)">
            <rect
              width="352"
              height="242"
              rx="8"
              fill={accent}
              fillOpacity="0.05"
              stroke={accent}
            />
            <text
              x="176"
              y="28"
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={accent}
            >
              针孔：一个孔径点
            </text>
            <line
              x1="56"
              y1="58"
              x2="56"
              y2="205"
              stroke={border}
              strokeWidth="3"
            />
            <line
              x1="176"
              y1="52"
              x2="176"
              y2="211"
              stroke={primary}
              strokeWidth="2"
            />
            <circle cx="176" cy="132" r="5" fill={accent} />
            <circle cx="305" cy="86" r="7" fill={success} />
            <circle cx="305" cy="180" r="7" fill={warning} />
            <line
              x1="56"
              y1="156"
              x2="176"
              y2="132"
              stroke={success}
              strokeWidth="2"
            />
            <line
              x1="176"
              y1="132"
              x2="305"
              y2="86"
              stroke={success}
              strokeWidth="2"
            />
            <line
              x1="56"
              y1="156"
              x2="176"
              y2="132"
              stroke={warning}
              strokeWidth="2"
              strokeDasharray="4 3"
            />
            <line
              x1="176"
              y1="132"
              x2="305"
              y2="180"
              stroke={warning}
              strokeWidth="2"
              strokeDasharray="4 3"
            />
            <text
              x="56"
              y="225"
              textAnchor="middle"
              fontSize="10"
              fill={secondary}
            >
              Film
            </text>
            <text
              x="176"
              y="225"
              textAnchor="middle"
              fontSize="10"
              fill={secondary}
            >
              pinhole
            </text>
            <text
              x="286"
              y="225"
              textAnchor="middle"
              fontSize="10"
              fill={secondary}
            >
              所有深度只有一条路径
            </text>
          </g>

          <g transform="translate(406 58)">
            <rect
              width="352"
              height="242"
              rx="8"
              fill={success}
              fillOpacity="0.05"
              stroke={success}
            />
            <text
              x="176"
              y="28"
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={success}
            >
              薄透镜：有限孔径
            </text>
            <line
              x1="56"
              y1="58"
              x2="56"
              y2="205"
              stroke={border}
              strokeWidth="3"
            />
            <path
              d="M176 52 Q154 132 176 212 Q198 132 176 52"
              fill={success}
              fillOpacity="0.1"
              stroke={success}
              strokeWidth="2"
            />
            <line
              x1="274"
              y1="52"
              x2="274"
              y2="212"
              stroke={warning}
              strokeDasharray="4 4"
            />
            <circle cx="306" cy="86" r="7" fill={success} />
            <circle cx="306" cy="180" r="7" fill={warning} />
            <line
              x1="56"
              y1="132"
              x2="176"
              y2="78"
              stroke={success}
              strokeWidth="2"
            />
            <line
              x1="56"
              y1="132"
              x2="176"
              y2="186"
              stroke={success}
              strokeWidth="2"
            />
            <line
              x1="176"
              y1="78"
              x2="306"
              y2="86"
              stroke={success}
              strokeWidth="2"
            />
            <line
              x1="176"
              y1="186"
              x2="306"
              y2="86"
              stroke={success}
              strokeWidth="2"
            />
            <line
              x1="56"
              y1="150"
              x2="176"
              y2="78"
              stroke={warning}
              strokeWidth="2"
              strokeDasharray="4 3"
            />
            <line
              x1="56"
              y1="166"
              x2="176"
              y2="186"
              stroke={warning}
              strokeWidth="2"
              strokeDasharray="4 3"
            />
            <line
              x1="176"
              y1="78"
              x2="306"
              y2="180"
              stroke={warning}
              strokeWidth="2"
              strokeDasharray="4 3"
            />
            <line
              x1="176"
              y1="186"
              x2="306"
              y2="180"
              stroke={warning}
              strokeWidth="2"
              strokeDasharray="4 3"
            />
            <line
              x1="56"
              y1="150"
              x2="56"
              y2="166"
              stroke={warning}
              strokeWidth="6"
              strokeLinecap="round"
            />
            <text
              x="56"
              y="225"
              textAnchor="middle"
              fontSize="10"
              fill={warning}
            >
              焦外散布圆
            </text>
            <text
              x="176"
              y="225"
              textAnchor="middle"
              fontSize="10"
              fill={secondary}
            >
              lens aperture
            </text>
            <text
              x="274"
              y="225"
              textAnchor="middle"
              fontSize="10"
              fill={secondary}
            >
              焦平面
            </text>
          </g>
          <text
            x="390"
            y="329"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            孔径越大，焦外点在 Film
            上覆盖的散布圆越大；焦平面上的路径仍汇聚到同一点
          </text>
        </svg>

        <div className="grid gap-3 md:hidden">
          <p className="text-center text-sm font-semibold text-primary">
            焦内与焦外的路径差异
          </p>
          <div
            className="rounded-control border p-3"
            style={{ borderColor: accent }}
          >
            <strong className="text-sm" style={{ color: accent }}>
              针孔
            </strong>
            <p className="mt-1 text-xs text-secondary">
              每个 Film
              点只对应一个孔径位置，所有深度几何清晰，但没有真实曝光量。
            </p>
          </div>
          <div
            className="rounded-control border p-3"
            style={{ borderColor: success }}
          >
            <strong className="text-sm" style={{ color: success }}>
              有限孔径
            </strong>
            <p className="mt-1 text-xs text-secondary">
              焦平面路径汇聚；焦外路径落在不同 Film 位置形成散布圆。
            </p>
          </div>
          <p className="rounded-control border border-border p-3 text-center font-mono text-[11px] text-primary">
            1 / z′ - 1 / z = 1 / f
          </p>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        薄透镜用高斯透镜方程确定焦平面，再从采样的孔径点连向对应焦点。
      </figcaption>
    </figure>
  );
}

export function PbtFilmPipelineDiagram() {
  const stages = [
    { title: "光谱辐亮度", detail: "L(λ), wavelength PDF", color: accent },
    { title: "曝光积分", detail: "孔径 · cos⁴θ · shutter", color: success },
    { title: "PixelSensor", detail: "RGB 响应 · ISO · 白平衡", color: warning },
    { title: "Film", detail: "滤波加权 · 累积 · 输出空间", color: danger },
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 800 300"
          role="img"
          aria-label="光谱辐亮度经过曝光积分、PixelSensor 响应和 Film 滤波累积生成输出 RGB 图像"
          className="mx-auto hidden h-auto w-full max-w-[800px] md:block"
        >
          <text
            x="400"
            y="28"
            textAnchor="middle"
            fontSize="17"
            fontWeight="700"
            fill={primary}
          >
            Film 不是数组终点，而是物理测量与图像重建的边界
          </text>
          {stages.map((stage, index) => {
            const x = 20 + index * 195;
            return (
              <g key={stage.title}>
                <rect
                  x={x}
                  y="78"
                  width="174"
                  height="126"
                  rx="8"
                  fill={stage.color}
                  fillOpacity="0.08"
                  stroke={stage.color}
                />
                <text
                  x={x + 87}
                  y="109"
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill={stage.color}
                >
                  {stage.title}
                </text>
                <rect
                  x={x + 14}
                  y="128"
                  width="146"
                  height="42"
                  rx="6"
                  fill={elevated}
                  stroke={border}
                />
                <text
                  x={x + 87}
                  y="154"
                  textAnchor="middle"
                  fontSize="10.5"
                  fill={primary}
                >
                  {stage.detail}
                </text>
                <circle cx={x + 87} cy="187" r="4" fill={stage.color} />
              </g>
            );
          })}
          {[194, 389, 584].map((x) => (
            <g key={x}>
              <line
                x1={x}
                y1="142"
                x2={x + 20}
                y2="142"
                stroke={border}
                strokeWidth="2"
              />
              <path
                d={`M${x + 14} 136 L${x + 22} 142 L${x + 14} 148`}
                fill="none"
                stroke={border}
                strokeWidth="2"
              />
            </g>
          ))}
          <rect
            x="128"
            y="230"
            width="544"
            height="42"
            rx="8"
            fill={elevated}
            stroke={border}
          />
          <text
            x="400"
            y="247"
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill={primary}
          >
            加权像素 = Σ filterWeightᵢ · RGBᵢ / Σ filterWeightᵢ
          </text>
          <text
            x="400"
            y="263"
            textAnchor="middle"
            fontSize="10"
            fill={secondary}
          >
            `AddSample` 与 `AddSplat` 的并发和归一化语义不同
          </text>
        </svg>

        <div className="grid gap-3 md:hidden">
          <p className="text-center text-sm font-semibold text-primary">
            光谱样本到输出像素
          </p>
          {stages.map((stage, index) => (
            <div
              key={stage.title}
              className="rounded-control border bg-bg/40 p-3"
              style={{ borderColor: stage.color }}
            >
              <div className="flex items-center justify-between gap-3">
                <strong className="text-sm" style={{ color: stage.color }}>
                  {index + 1}. {stage.title}
                </strong>
                <span className="text-[11px] text-secondary">
                  {stage.detail}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        PBRT 先按传感器光谱响应得到相机
        RGB，再经白平衡和目标颜色空间矩阵输出图像。
      </figcaption>
    </figure>
  );
}
