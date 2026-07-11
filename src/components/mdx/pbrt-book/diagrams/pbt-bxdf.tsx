const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";

const bxdfStages = [
  {
    number: 1,
    title: "局部坐标",
    code: "wo · n=(0,0,1)",
    note: "判断同半球与进入/离开",
    color: accent,
  },
  {
    number: 2,
    title: "选择散射",
    code: "uc → R / T / lobe",
    note: "按 Fresnel 和 flags 选分支",
    color: success,
  },
  {
    number: 3,
    title: "采样方向",
    code: "u → wi, f, pdf, eta",
    note: "方向与密度必须成对返回",
    color: warning,
  },
  {
    number: 4,
    title: "路径更新",
    code: "β *= f |cosθ| / pdf",
    note: "交给 MIS 与后续反弹",
    color: danger,
  },
] as const;

export function PbtBxdfDiagram({ step = 0 }: { step?: 0 | 1 | 2 | 3 }) {
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
          aria-label="PBRT BxDF 从局部坐标、散射分支和方向采样到路径吞吐量更新的接口链"
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
            BxDF 的核心不是只算一个值，而是返回可采样的散射分布
          </text>
          <text
            x="400"
            y="50"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            f、Sample_f 与 PDF 必须描述同一个分布
          </text>
          {bxdfStages.map((stage, index) => {
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
                  x={x + 49}
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
                  {stage.code}
                </text>
                <text
                  x={x + 87}
                  y="199"
                  textAnchor="middle"
                  fontSize="10.5"
                  fill={secondary}
                >
                  {stage.note}
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
            BSDF 负责 render ↔ shading 变换；BxDF 只在局部坐标中描述单点散射
          </text>
          <text
            x="400"
            y="298"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            完美镜面只能通过 Sample_f 命中，直接调用 f() 与 PDF() 都返回 0
          </text>
        </svg>

        <div className="grid gap-3 md:hidden">
          <p className="text-center text-sm font-semibold text-primary">
            BxDF 采样契约
          </p>
          {bxdfStages.map((stage) => {
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
                    {stage.code}
                  </span>
                </div>
                <p className="mt-2 text-xs text-secondary">{stage.note}</p>
              </div>
            );
          })}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        一次成功采样必须同时返回方向、散射值、固体角 PDF、类别标志和相对折射率。
      </figcaption>
    </figure>
  );
}

export function PbtBxdfLobesDiagram() {
  const lobes = [
    { title: "漫反射", note: "宽而近似均匀", color: accent },
    { title: "光泽反射", note: "围绕镜面方向展开", color: success },
    { title: "完美镜面", note: "单方向 Delta", color: warning },
    { title: "逆反射", note: "返回入射方向附近", color: danger },
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 800 330"
          role="img"
          aria-label="漫反射、光泽反射、完美镜面和逆反射四类散射瓣的方向分布对比"
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
            分类描述散射形状，Reflection / Transmission 描述跨不跨表面
          </text>
          {lobes.map((lobe, index) => {
            const x = 14 + index * 198;
            return (
              <g key={lobe.title} transform={`translate(${x} 0)`}>
                <rect
                  x="0"
                  y="62"
                  width="184"
                  height="220"
                  rx="8"
                  fill={lobe.color}
                  fillOpacity="0.06"
                  stroke={lobe.color}
                />
                <text
                  x="92"
                  y="88"
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill={lobe.color}
                >
                  {lobe.title}
                </text>
                <line
                  x1="24"
                  y1="229"
                  x2="160"
                  y2="229"
                  stroke={border}
                  strokeWidth="2"
                />
                <line
                  x1="92"
                  y1="229"
                  x2="92"
                  y2="116"
                  stroke={border}
                  strokeDasharray="4 4"
                />
                <line
                  x1="34"
                  y1="136"
                  x2="92"
                  y2="229"
                  stroke={secondary}
                  strokeWidth="2"
                />
                {index === 0 && (
                  <path
                    d="M35 229 Q45 139 92 126 Q139 139 149 229"
                    fill={lobe.color}
                    fillOpacity="0.16"
                    stroke={lobe.color}
                    strokeWidth="2"
                  />
                )}
                {index === 1 && (
                  <path
                    d="M92 229 Q109 146 145 130 Q157 171 149 229"
                    fill={lobe.color}
                    fillOpacity="0.16"
                    stroke={lobe.color}
                    strokeWidth="2"
                  />
                )}
                {index === 2 && (
                  <line
                    x1="92"
                    y1="229"
                    x2="151"
                    y2="130"
                    stroke={lobe.color}
                    strokeWidth="5"
                  />
                )}
                {index === 3 && (
                  <path
                    d="M92 229 Q62 170 33 136 Q40 194 52 229"
                    fill={lobe.color}
                    fillOpacity="0.16"
                    stroke={lobe.color}
                    strokeWidth="2"
                  />
                )}
                <text
                  x="92"
                  y="259"
                  textAnchor="middle"
                  fontSize="10.5"
                  fill={secondary}
                >
                  {lobe.note}
                </text>
              </g>
            );
          })}
          <text
            x="400"
            y="313"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            各向同性旋转表面后分布不变；各向异性会随切线方向改变
          </text>
        </svg>

        <div className="grid grid-cols-2 gap-3 md:hidden">
          {lobes.map((lobe) => (
            <div
              key={lobe.title}
              className="rounded-control border bg-bg/40 p-3"
              style={{ borderColor: lobe.color }}
            >
              <strong className="text-sm" style={{ color: lobe.color }}>
                {lobe.title}
              </strong>
              <p className="mt-2 text-xs text-secondary">{lobe.note}</p>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        BxDFFlags 将散射形状与反射/透射正交组合，逆反射在接口中归入 glossy。
      </figcaption>
    </figure>
  );
}

export function PbtFresnelMediaDiagram() {
  const panels = [
    {
      title: "介质 Dielectric",
      formula: "real η",
      detail: "F 选择反射，1-F 选择透射",
      note: "可能折射或全反射",
      color: success,
    },
    {
      title: "导体 Conductor",
      formula: "complex η + iκ",
      detail: "F(λ) 决定有色镜面反射",
      note: "内部能量快速吸收",
      color: warning,
    },
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 780 350"
          role="img"
          aria-label="介质与导体界面的 Fresnel 反射、折射和吸收路径对比"
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
            Fresnel 不是额外高光，而是界面如何分配反射与透射
          </text>
          {panels.map((panel, index) => {
            const x = 22 + index * 384;
            return (
              <g key={panel.title} transform={`translate(${x} 0)`}>
                <rect
                  x="0"
                  y="60"
                  width="362"
                  height="242"
                  rx="8"
                  fill={panel.color}
                  fillOpacity="0.05"
                  stroke={panel.color}
                />
                <text
                  x="181"
                  y="88"
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="700"
                  fill={panel.color}
                >
                  {panel.title}
                </text>
                <text
                  x="181"
                  y="109"
                  textAnchor="middle"
                  fontSize="11"
                  fill={secondary}
                >
                  {panel.formula}
                </text>
                <line
                  x1="30"
                  y1="185"
                  x2="332"
                  y2="185"
                  stroke={border}
                  strokeWidth="3"
                />
                <line
                  x1="95"
                  y1="104"
                  x2="181"
                  y2="185"
                  stroke={accent}
                  strokeWidth="3"
                />
                <line
                  x1="181"
                  y1="185"
                  x2="272"
                  y2="105"
                  stroke={panel.color}
                  strokeWidth="3"
                />
                {index === 0 ? (
                  <line
                    x1="181"
                    y1="185"
                    x2="225"
                    y2="274"
                    stroke={success}
                    strokeWidth="3"
                  />
                ) : (
                  <line
                    x1="181"
                    y1="185"
                    x2="207"
                    y2="234"
                    stroke={danger}
                    strokeWidth="3"
                    strokeDasharray="5 4"
                    opacity="0.6"
                  />
                )}
                <text
                  x="95"
                  y="94"
                  textAnchor="middle"
                  fontSize="10"
                  fill={accent}
                >
                  入射
                </text>
                <text
                  x="274"
                  y="95"
                  textAnchor="middle"
                  fontSize="10"
                  fill={panel.color}
                >
                  F · 反射
                </text>
                <text
                  x="236"
                  y="285"
                  textAnchor="middle"
                  fontSize="10"
                  fill={index === 0 ? success : danger}
                >
                  {index === 0 ? "(1-F) · 折射" : "导体内吸收"}
                </text>
                <text
                  x="181"
                  y="257"
                  textAnchor="middle"
                  fontSize="10.5"
                  fill={primary}
                >
                  {panel.detail}
                </text>
                <text
                  x="181"
                  y="281"
                  textAnchor="middle"
                  fontSize="10"
                  fill={secondary}
                >
                  {panel.note}
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
            掠射角通常令 F 接近 1；介质的临界角由 Snell 定律决定
          </text>
        </svg>

        <div className="grid gap-3 md:hidden">
          {panels.map((panel) => (
            <div
              key={panel.title}
              className="rounded-control border bg-bg/40 p-3"
              style={{ borderColor: panel.color }}
            >
              <div className="flex items-center justify-between gap-3">
                <strong className="text-sm" style={{ color: panel.color }}>
                  {panel.title}
                </strong>
                <span className="font-mono text-xs text-primary">
                  {panel.formula}
                </span>
              </div>
              <p className="mt-2 text-xs text-secondary">
                {panel.detail}；{panel.note}。
              </p>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        介质在反射与透射间分配能量；导体使用复折射率描述波长相关反射和内部吸收。
      </figcaption>
    </figure>
  );
}

export function PbtMicrofacetDiagram() {
  const factors = [
    { symbol: "D", title: "法线分布", note: "多少微面朝向 wm", color: accent },
    {
      symbol: "F",
      title: "Fresnel",
      note: "单个微面的反射比例",
      color: success,
    },
    {
      symbol: "G",
      title: "几何项",
      note: "遮蔽与阴影后的可见比例",
      color: warning,
    },
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 800 350"
          role="img"
          aria-label="微表面模型中粗糙度、可见微面法线以及 D、F、G 三项的物理作用"
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
            粗糙度把一个 Delta 镜面方向展开为可评估、可采样的分布
          </text>
          <g transform="translate(24 64)">
            <rect
              width="328"
              height="230"
              rx="8"
              fill={accent}
              fillOpacity="0.05"
              stroke={accent}
            />
            <text
              x="164"
              y="27"
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={accent}
            >
              微表面法线统计
            </text>
            <path
              d="M22 172 L58 146 L91 177 L124 118 L159 166 L194 102 L230 170 L270 126 L306 172"
              fill="none"
              stroke={primary}
              strokeWidth="3"
            />
            {[
              [58, 146, -18],
              [124, 118, 8],
              [194, 102, 24],
              [270, 126, -10],
            ].map(([x, y, tilt]) => (
              <line
                key={x}
                x1={x}
                y1={y}
                x2={x + tilt}
                y2={y - 50}
                stroke={success}
                strokeWidth="2"
              />
            ))}
            <line
              x1="164"
              y1="185"
              x2="164"
              y2="78"
              stroke={border}
              strokeDasharray="4 4"
            />
            <text
              x="164"
              y="210"
              textAnchor="middle"
              fontSize="10.5"
              fill={secondary}
            >
              αx / αy 控制各向异性展宽
            </text>
          </g>
          <g transform="translate(378 64)">
            <rect
              width="398"
              height="230"
              rx="8"
              fill={elevated}
              stroke={border}
            />
            <text
              x="199"
              y="27"
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={primary}
            >
              Torrance–Sparrow 反射
            </text>
            {factors.map((factor, index) => (
              <g
                key={factor.symbol}
                transform={`translate(${18 + index * 126} 52)`}
              >
                <rect
                  width="110"
                  height="104"
                  rx="8"
                  fill={factor.color}
                  fillOpacity="0.08"
                  stroke={factor.color}
                />
                <circle cx="55" cy="28" r="17" fill={factor.color} />
                <text
                  x="55"
                  y="34"
                  textAnchor="middle"
                  fontSize="15"
                  fontWeight="700"
                  fill="var(--bg)"
                >
                  {factor.symbol}
                </text>
                <text
                  x="55"
                  y="62"
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill={primary}
                >
                  {factor.title}
                </text>
                <text
                  x="55"
                  y="82"
                  textAnchor="middle"
                  fontSize="9.5"
                  fill={secondary}
                >
                  {factor.note}
                </text>
              </g>
            ))}
            <text
              x="199"
              y="184"
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={danger}
            >
              f = D(wm) F(wo·wm) G(wo,wi) / (4 |cosθo cosθi|)
            </text>
            <text
              x="199"
              y="207"
              textAnchor="middle"
              fontSize="10.5"
              fill={secondary}
            >
              采样可见法线，反射后再应用 masking
            </text>
          </g>
          <text
            x="400"
            y="327"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            PBRT 使用 Trowbridge–Reitz 分布，并直接采样从 wo 可见的微面法线
          </text>
        </svg>

        <div className="grid gap-3 md:hidden">
          <p className="text-center text-sm font-semibold text-primary">
            微表面反射三项
          </p>
          {factors.map((factor) => (
            <div
              key={factor.symbol}
              className="rounded-control border bg-bg/40 p-3"
              style={{ borderColor: factor.color }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold text-bg"
                  style={{ backgroundColor: factor.color }}
                >
                  {factor.symbol}
                </span>
                <strong className="text-sm text-primary">{factor.title}</strong>
              </div>
              <p className="mt-2 text-xs text-secondary">{factor.note}</p>
            </div>
          ))}
          <p className="rounded-control border border-border p-3 text-center font-mono text-[10px] text-primary">
            f = D · F · G / (4 |cosθo cosθi|)
          </p>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        D 描述微面朝向，F 描述界面反射，G
        修正微面间遮蔽；三项缺一都会失去物理意义。
      </figcaption>
    </figure>
  );
}
