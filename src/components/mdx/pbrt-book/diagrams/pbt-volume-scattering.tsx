const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";

const transportStages = [
  {
    number: 1,
    title: "介质区间",
    code: "ray + Medium",
    note: "裁剪边界并取得 majorant",
    color: accent,
  },
  {
    number: 2,
    title: "自由飞行",
    code: "t ~ Exp(σmaj)",
    note: "抽取候选碰撞距离",
    color: success,
  },
  {
    number: 3,
    title: "事件分类",
    code: "σa / σs / σn",
    note: "吸收、真实散射或 null",
    color: warning,
  },
  {
    number: 4,
    title: "路径继续",
    code: "phase.Sample_p",
    note: "更新方向、权重与介质",
    color: danger,
  },
] as const;

export function PbtVolumeScatteringDiagram({
  step = 0,
}: {
  step?: 0 | 1 | 2 | 3;
}) {
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
          aria-label="PBRT 体积路径从介质区间、自由飞行和事件分类到相函数采样的运输链"
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
            体积路径追踪采样事件，不是按固定步长累加颜色
          </text>
          <text
            x="400"
            y="50"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            majorant 把非均匀介质转成可采样的分段指数过程
          </text>
          {transportStages.map((stage, index) => {
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
            σmaj = σa + σs + σn；null 事件只改变估计过程，不改变物理光路
          </text>
          <text
            x="400"
            y="298"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            抵达区间终点表示本段无真实碰撞，继续表面相交或下一段
          </text>
        </svg>
        <div className="grid gap-3 md:hidden">
          <p className="text-center text-sm font-semibold text-primary">
            体积路径采样链
          </p>
          {transportStages.map((stage) => {
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
        PBRT 以指数分布生成候选事件，再依据局部系数决定吸收、散射或无效碰撞。
      </figcaption>
    </figure>
  );
}

export function PbtVolumeProcessesDiagram() {
  const processes = [
    { title: "吸收", symbol: "σa", note: "光能转为其他能量", color: danger },
    {
      title: "发射",
      symbol: "σa Le",
      note: "介质向路径加入辐亮度",
      color: accent,
    },
    {
      title: "外散射",
      symbol: "σs",
      note: "当前方向的光被偏转走",
      color: warning,
    },
    {
      title: "内散射",
      symbol: "σs p",
      note: "其他方向散射进当前方向",
      color: success,
    },
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 800 330"
          role="img"
          aria-label="参与介质中的吸收、发射、外散射和内散射四种局部辐亮度变化"
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
            局部过程先改变微分辐亮度，沿射线积分后才得到画面
          </text>
          {processes.map((process, index) => {
            const x = 14 + index * 198;
            return (
              <g key={process.title} transform={`translate(${x} 0)`}>
                <rect
                  x="0"
                  y="62"
                  width="184"
                  height="220"
                  rx="8"
                  fill={process.color}
                  fillOpacity="0.06"
                  stroke={process.color}
                />
                <text
                  x="92"
                  y="88"
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill={process.color}
                >
                  {process.title}
                </text>
                <circle
                  cx="92"
                  cy="158"
                  r="25"
                  fill={process.color}
                  fillOpacity="0.12"
                  stroke={process.color}
                />
                <text
                  x="92"
                  y="164"
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="700"
                  fill={process.color}
                >
                  {process.symbol}
                </text>
                <line
                  x1="24"
                  y1="158"
                  x2="64"
                  y2="158"
                  stroke={primary}
                  strokeWidth="3"
                />
                {index === 0 && (
                  <line
                    x1="120"
                    y1="158"
                    x2="151"
                    y2="158"
                    stroke={secondary}
                    strokeWidth="1.5"
                    opacity="0.25"
                  />
                )}
                {index === 1 && (
                  <line
                    x1="120"
                    y1="158"
                    x2="156"
                    y2="158"
                    stroke={accent}
                    strokeWidth="3"
                  />
                )}
                {index === 2 && (
                  <line
                    x1="116"
                    y1="147"
                    x2="151"
                    y2="112"
                    stroke={warning}
                    strokeWidth="3"
                  />
                )}
                {index === 3 && (
                  <line
                    x1="145"
                    y1="112"
                    x2="116"
                    y2="147"
                    stroke={success}
                    strokeWidth="3"
                  />
                )}
                <text
                  x="92"
                  y="222"
                  textAnchor="middle"
                  fontSize="10.5"
                  fill={secondary}
                >
                  {process.note}
                </text>
                <text
                  x="92"
                  y="252"
                  textAnchor="middle"
                  fontSize="10"
                  fill={primary}
                >
                  {index < 2 ? "能量移除 / 加入" : "方向重分配"}
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
            σt = σa + σs 描述 extinction；相函数只分配真实散射的方向
          </text>
        </svg>
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {processes.map((process) => (
            <div
              key={process.title}
              className="rounded-control border bg-bg/40 p-3"
              style={{ borderColor: process.color }}
            >
              <div className="flex items-center justify-between gap-2">
                <strong className="text-sm" style={{ color: process.color }}>
                  {process.title}
                </strong>
                <span className="font-mono text-xs text-primary">
                  {process.symbol}
                </span>
              </div>
              <p className="mt-2 text-xs text-secondary">{process.note}</p>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        吸收和外散射衰减当前方向；发射和内散射向当前方向增加辐亮度。
      </figcaption>
    </figure>
  );
}

export function PbtTransmittanceDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 800 350"
          role="img"
          aria-label="均匀介质 Beer 定律与非均匀介质 majorant null scattering 的透射率估计对比"
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
            透射率是整段光学厚度的指数，不是每点透明度的平均
          </text>
          <g transform="translate(22 62)">
            <rect
              width="360"
              height="230"
              rx="8"
              fill={accent}
              fillOpacity="0.05"
              stroke={accent}
            />
            <text
              x="180"
              y="28"
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={accent}
            >
              均匀介质
            </text>
            <line
              x1="34"
              y1="128"
              x2="326"
              y2="128"
              stroke={border}
              strokeWidth="8"
            />
            {[64, 105, 146, 187, 228, 269, 310].map((x) => (
              <circle
                key={x}
                cx={x}
                cy="128"
                r="5"
                fill={accent}
                opacity={(330 - x) / 300}
              />
            ))}
            <text
              x="180"
              y="82"
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={primary}
            >
              Tr(d) = exp(-σt d)
            </text>
            <text
              x="180"
              y="184"
              textAnchor="middle"
              fontSize="10.5"
              fill={secondary}
            >
              常数 σt，解析 Beer–Lambert
            </text>
          </g>
          <g transform="translate(418 62)">
            <rect
              width="360"
              height="230"
              rx="8"
              fill={success}
              fillOpacity="0.05"
              stroke={success}
            />
            <text
              x="180"
              y="28"
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill={success}
            >
              非均匀介质
            </text>
            {[0, 1, 2, 3, 4, 5].map((cell) => {
              const heights = [44, 90, 56, 118, 72, 36];
              const h = heights[cell];
              return (
                <g key={cell}>
                  <rect
                    x={26 + cell * 52}
                    y={165 - h}
                    width="42"
                    height={h}
                    fill={cell % 2 ? warning : success}
                    fillOpacity="0.18"
                    stroke={border}
                  />
                  <line
                    x1={26 + cell * 52}
                    y1="47"
                    x2={68 + cell * 52}
                    y2="47"
                    stroke={danger}
                    strokeWidth="2"
                  />
                </g>
              );
            })}
            <text
              x="180"
              y="42"
              textAnchor="middle"
              fontSize="10"
              fill={danger}
            >
              局部 majorant 上界
            </text>
            <line
              x1="26"
              y1="165"
              x2="328"
              y2="165"
              stroke={border}
              strokeWidth="2"
            />
            {[74, 128, 205, 283].map((x, index) => (
              <circle
                key={x}
                cx={x}
                cy="165"
                r="6"
                fill={index === 2 ? warning : secondary}
              />
            ))}
            <text
              x="180"
              y="196"
              textAnchor="middle"
              fontSize="10.5"
              fill={secondary}
            >
              指数候选事件：真实 / null / 越过
            </text>
          </g>
          <rect
            x="170"
            y="310"
            width="460"
            height="28"
            rx="6"
            fill={elevated}
            stroke={border}
          />
          <text
            x="400"
            y="329"
            textAnchor="middle"
            fontSize="10.5"
            fill={primary}
          >
            σn(p) = σmaj - σt(p)，填充虚构粒子后可使用指数采样
          </text>
        </svg>
        <div className="grid gap-3 md:hidden">
          <div
            className="rounded-control border p-3"
            style={{ borderColor: accent }}
          >
            <strong className="text-sm" style={{ color: accent }}>
              均匀介质
            </strong>
            <p className="mt-2 font-mono text-xs text-primary">
              Tr = exp(-σt d)
            </p>
            <p className="mt-1 text-xs text-secondary">
              常数系数可直接使用 Beer 定律。
            </p>
          </div>
          <div
            className="rounded-control border p-3"
            style={{ borderColor: success }}
          >
            <strong className="text-sm" style={{ color: success }}>
              非均匀介质
            </strong>
            <p className="mt-2 font-mono text-xs text-primary">
              σn = σmaj - σt(p)
            </p>
            <p className="mt-1 text-xs text-secondary">
              用 majorant 和 null 事件构造无偏估计。
            </p>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        直接估计光学厚度再取指数通常有偏；null scattering
        提供可递归采样的无偏形式。
      </figcaption>
    </figure>
  );
}

export function PbtPhaseFunctionDiagram() {
  const phases = [
    { g: "-0.7", title: "后向散射", note: "返回光源所在方向", color: danger },
    { g: "0", title: "各向同性", note: "p = 1 / 4π", color: accent },
    { g: "+0.7", title: "前向散射", note: "沿原传播方向继续", color: success },
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 780 340"
          role="img"
          aria-label="Henyey Greenstein 相函数在负零正 g 下的后向、各向同性和前向散射方向分布"
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
            HG 的 g 是平均余弦，但 PBRT 的 wi 与 wo 都从散射点向外
          </text>
          {phases.map((phase, index) => {
            const x = 18 + index * 250;
            return (
              <g key={phase.g} transform={`translate(${x} 0)`}>
                <rect
                  x="0"
                  y="62"
                  width="230"
                  height="230"
                  rx="8"
                  fill={phase.color}
                  fillOpacity="0.05"
                  stroke={phase.color}
                />
                <text
                  x="115"
                  y="88"
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill={phase.color}
                >
                  {phase.title}
                </text>
                <text
                  x="115"
                  y="108"
                  textAnchor="middle"
                  fontSize="11"
                  fill={secondary}
                >
                  g = {phase.g}
                </text>
                <circle cx="115" cy="188" r="5" fill={primary} />
                <line
                  x1="42"
                  y1="188"
                  x2="110"
                  y2="188"
                  stroke={warning}
                  strokeWidth="3"
                />
                <text x="41" y="176" fontSize="9" fill={warning}>
                  来光传播
                </text>
                {index === 0 && (
                  <path
                    d="M115 188 Q78 151 31 188 Q78 225 115 188"
                    fill={phase.color}
                    fillOpacity="0.2"
                    stroke={phase.color}
                    strokeWidth="2"
                  />
                )}
                {index === 1 && (
                  <circle
                    cx="115"
                    cy="188"
                    r="47"
                    fill={phase.color}
                    fillOpacity="0.15"
                    stroke={phase.color}
                    strokeWidth="2"
                  />
                )}
                {index === 2 && (
                  <path
                    d="M115 188 Q151 151 198 188 Q151 225 115 188"
                    fill={phase.color}
                    fillOpacity="0.2"
                    stroke={phase.color}
                    strokeWidth="2"
                  />
                )}
                <text
                  x="115"
                  y="265"
                  textAnchor="middle"
                  fontSize="10.5"
                  fill={secondary}
                >
                  {phase.note}
                </text>
              </g>
            );
          })}
          <text
            x="390"
            y="320"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            p 与采样 PDF 相等；所有方向积分为 1，体积散射积分没有表面 cosθ 项
          </text>
        </svg>
        <div className="grid gap-3 md:hidden">
          {phases.map((phase) => (
            <div
              key={phase.g}
              className="rounded-control border bg-bg/40 p-3"
              style={{ borderColor: phase.color }}
            >
              <div className="flex items-center justify-between gap-3">
                <strong className="text-sm" style={{ color: phase.color }}>
                  {phase.title}
                </strong>
                <span className="font-mono text-xs text-primary">
                  g = {phase.g}
                </span>
              </div>
              <p className="mt-2 text-xs text-secondary">{phase.note}</p>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        PBRT 中 g&lt;0 表示后向散射，g&gt;0 表示沿光原传播方向的前向散射。
      </figcaption>
    </figure>
  );
}

export function PbtMediumDiagram() {
  const media = [
    { title: "Homogeneous", note: "单一常数 majorant", color: accent },
    {
      title: "Grid / RGBGrid",
      note: "密度网格 + DDA 分段上界",
      color: success,
    },
    { title: "Cloud / NanoVDB", note: "程序云与稀疏体数据", color: warning },
  ] as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 780 330"
          role="img"
          aria-label="PBRT MediumInterface 边界切换与 Homogeneous Grid Cloud NanoVDB 介质实现"
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
            表面可以只切换 Medium，而完全不产生 BSDF 散射
          </text>
          <g transform="translate(22 62)">
            <rect
              width="250"
              height="220"
              rx="8"
              fill={elevated}
              stroke={border}
            />
            <text
              x="125"
              y="27"
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={primary}
            >
              MediumInterface
            </text>
            <rect
              x="20"
              y="52"
              width="82"
              height="112"
              rx="6"
              fill={accent}
              fillOpacity="0.12"
              stroke={accent}
            />
            <rect
              x="148"
              y="52"
              width="82"
              height="112"
              rx="6"
              fill={success}
              fillOpacity="0.12"
              stroke={success}
            />
            <line
              x1="125"
              y1="46"
              x2="125"
              y2="178"
              stroke={warning}
              strokeWidth="3"
            />
            <text
              x="61"
              y="111"
              textAnchor="middle"
              fontSize="11"
              fill={accent}
            >
              inside
            </text>
            <text
              x="189"
              y="111"
              textAnchor="middle"
              fontSize="11"
              fill={success}
            >
              outside
            </text>
            <path d="M42 188 H208" stroke={primary} strokeWidth="2" />
            <text
              x="125"
              y="207"
              textAnchor="middle"
              fontSize="10"
              fill={secondary}
            >
              nullptr Material：边界不可见
            </text>
          </g>
          <g transform="translate(294 62)">
            <rect
              width="464"
              height="220"
              rx="8"
              fill={elevated}
              stroke={border}
            />
            <text
              x="232"
              y="27"
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={primary}
            >
              Medium 实现与 SampleRay
            </text>
            {media.map((medium, index) => (
              <g
                key={medium.title}
                transform={`translate(${20 + index * 148} 52)`}
              >
                <rect
                  width="128"
                  height="112"
                  rx="8"
                  fill={medium.color}
                  fillOpacity="0.08"
                  stroke={medium.color}
                />
                <text
                  x="64"
                  y="31"
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill={medium.color}
                >
                  {medium.title}
                </text>
                <text
                  x="64"
                  y="62"
                  textAnchor="middle"
                  fontSize="9.5"
                  fill={secondary}
                >
                  {medium.note}
                </text>
                <line
                  x1="18"
                  y1="86"
                  x2="110"
                  y2="86"
                  stroke={medium.color}
                  strokeWidth="3"
                />
              </g>
            ))}
            <text
              x="232"
              y="194"
              textAnchor="middle"
              fontSize="10"
              fill={secondary}
            >
              RayMajorantIterator 按前到后返回不重叠区间
            </text>
          </g>
          <text
            x="390"
            y="316"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            ray 持有当前 Medium；穿过边界时根据方向与法线选择 inside / outside
          </text>
        </svg>
        <div className="grid gap-3 md:hidden">
          <div className="rounded-control border border-border p-3">
            <strong className="text-sm text-primary">MediumInterface</strong>
            <p className="mt-2 text-xs text-secondary">
              按方向选择 inside/outside；空 Material 只改变介质。
            </p>
          </div>
          {media.map((medium) => (
            <div
              key={medium.title}
              className="rounded-control border bg-bg/40 p-3"
              style={{ borderColor: medium.color }}
            >
              <strong className="text-sm" style={{ color: medium.color }}>
                {medium.title}
              </strong>
              <p className="mt-2 text-xs text-secondary">{medium.note}</p>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Medium 提供点属性与沿 ray 的 majorant 区间；几何边界负责切换当前介质。
      </figcaption>
    </figure>
  );
}
