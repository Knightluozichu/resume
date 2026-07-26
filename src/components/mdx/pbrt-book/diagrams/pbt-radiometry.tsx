const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";

const quantities = [
  {
    number: 1,
    name: "通量 Φ",
    definition: "dQ / dt",
    unit: "W",
    question: "每秒有多少能量？",
    color: accent,
  },
  {
    number: 2,
    name: "辐照度 E",
    definition: "dΦ / dA",
    unit: "W / m²",
    question: "表面每平方米收到多少？",
    color: success,
  },
  {
    number: 3,
    name: "强度 I",
    definition: "dΦ / dω",
    unit: "W / sr",
    question: "点光源向该方向发出多少？",
    color: warning,
  },
  {
    number: 4,
    name: "辐亮度 L",
    definition: "d²Φ / (dA⊥ dω)",
    unit: "W / (m² sr)",
    question: "该表面沿该方向传递多少？",
    color: danger,
  },
] as const;

export function PbtRadiometryDiagram({ step = 0 }: { step?: 0 | 1 | 2 | 3 }) {
  const activeNumbers =
    step === 1 ? [1, 2] : step === 2 ? [3] : step === 3 ? [4] : [1, 2, 3, 4];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 780 320"
          role="img"
          aria-label="从辐射能到通量、辐照度、强度和辐亮度的定义、单位与适用问题"
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
            每增加一个微分约束，就回答一个更具体的光能问题
          </text>
          <text
            x="390"
            y="50"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            面积使用垂直于传播方向的投影 dA⊥ = |cos θ| dA
          </text>

          {quantities.map((quantity, index) => {
            const focused = activeNumbers.includes(quantity.number);
            const x = 18 + index * 190;
            return (
              <g key={quantity.name} opacity={focused ? 1 : 0.25}>
                <rect
                  x={x}
                  y="78"
                  width="174"
                  height="178"
                  rx="8"
                  fill={quantity.color}
                  fillOpacity={focused ? 0.09 : 0.02}
                  stroke={quantity.color}
                  strokeWidth={step !== 0 && focused ? 2.5 : 1.2}
                />
                <circle cx={x + 26} cy="106" r="14" fill={quantity.color} />
                <text
                  x={x + 26}
                  y="111"
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill="var(--bg)"
                >
                  {quantity.number}
                </text>
                <text
                  x={x + 49}
                  y="111"
                  fontSize="14"
                  fontWeight="700"
                  fill={primary}
                >
                  {quantity.name}
                </text>
                <rect
                  x={x + 14}
                  y="130"
                  width="146"
                  height="42"
                  rx="6"
                  fill={elevated}
                  stroke={border}
                />
                <text
                  x={x + 87}
                  y="156"
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="600"
                  fill={primary}
                >
                  {quantity.definition}
                </text>
                <text
                  x={x + 87}
                  y="194"
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill={quantity.color}
                >
                  {quantity.unit}
                </text>
                <text
                  x={x + 87}
                  y="220"
                  textAnchor="middle"
                  fontSize="11"
                  fill={secondary}
                >
                  {quantity.question}
                </text>
              </g>
            );
          })}

          <path d="M54 286 H726" stroke={border} strokeWidth="2" />
          <circle cx="54" cy="286" r="5" fill={accent} />
          <circle cx="726" cy="286" r="5" fill={danger} />
          <text
            x="390"
            y="307"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            总量 → 面积密度或方向密度 → 同时保留位置与方向的五维光场量
          </text>
        </svg>

        <div className="grid gap-3 md:hidden">
          <p className="text-center text-sm font-semibold text-primary">
            从总能量到位置与方向
          </p>
          {quantities.map((quantity) => {
            const focused = activeNumbers.includes(quantity.number);
            return (
              <div
                key={quantity.name}
                className="rounded-control border bg-bg/40 p-3 transition-opacity"
                style={{
                  borderColor: quantity.color,
                  opacity: focused ? 1 : 0.32,
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <strong className="text-sm text-primary">
                    {quantity.name}
                  </strong>
                  <span
                    className="font-mono text-xs"
                    style={{ color: quantity.color }}
                  >
                    {quantity.unit}
                  </span>
                </div>
                <p className="mt-2 rounded-control border border-border px-2 py-1.5 text-center font-mono text-xs text-primary">
                  {quantity.definition}
                </p>
                <p className="mt-2 text-xs text-secondary">
                  {quantity.question}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        通量描述总功率；辐照度与强度各保留一个维度；辐亮度同时保留面积和方向。
      </figcaption>
    </figure>
  );
}

export function PbtSurfaceScatteringDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 760 360"
          role="img"
          aria-label="入射辐亮度经过余弦投影和 BSDF 后积分为出射辐亮度的表面散射流程"
          className="mx-auto hidden h-auto w-full max-w-[760px] md:block"
        >
          <text
            x="380"
            y="29"
            textAnchor="middle"
            fontSize="17"
            fontWeight="700"
            fill={primary}
          >
            表面把整片方向域的入射光变成一个方向的出射光
          </text>
          <line
            x1="380"
            y1="78"
            x2="380"
            y2="274"
            stroke={border}
            strokeWidth="2"
          />
          <ellipse
            cx="380"
            cy="274"
            rx="160"
            ry="24"
            fill={accent}
            fillOpacity="0.08"
            stroke={border}
          />
          <circle cx="380" cy="274" r="7" fill={primary} />
          <text
            x="380"
            y="322"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={primary}
          >
            表面点 p 与法线 n
          </text>

          {[
            { x: 105, y: 90, label: "Li(ω₁)", color: accent },
            { x: 205, y: 62, label: "Li(ω₂)", color: success },
            { x: 300, y: 92, label: "Li(ω₃)", color: warning },
          ].map((ray) => (
            <g key={ray.label}>
              <line
                x1={ray.x}
                y1={ray.y}
                x2="372"
                y2="266"
                stroke={ray.color}
                strokeWidth="3"
              />
              <circle cx={ray.x} cy={ray.y} r="5" fill={ray.color} />
              <text
                x={ray.x}
                y={ray.y - 13}
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill={ray.color}
              >
                {ray.label}
              </text>
            </g>
          ))}

          <path d="M388 266 L636 88" stroke={danger} strokeWidth="4" />
          <circle cx="636" cy="88" r="6" fill={danger} />
          <text
            x="636"
            y="70"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={danger}
          >
            Lo(ωo)
          </text>
          <path
            d="M380 180 A94 94 0 0 1 456 219"
            fill="none"
            stroke={secondary}
            strokeDasharray="4 4"
          />
          <text x="466" y="190" fontSize="11" fill={secondary}>
            θi 决定投影权重
          </text>

          <rect
            x="486"
            y="238"
            width="226"
            height="60"
            rx="8"
            fill={elevated}
            stroke={danger}
          />
          <text
            x="599"
            y="260"
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill={primary}
          >
            对所有入射方向积分
          </text>
          <text
            x="599"
            y="281"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            BSDF × Li × |cos θi| × dωi
          </text>

          <rect
            x="44"
            y="238"
            width="162"
            height="60"
            rx="8"
            fill={elevated}
            stroke={accent}
          />
          <text
            x="125"
            y="260"
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill={primary}
          >
            BRDF：同一点反射
          </text>
          <text
            x="125"
            y="281"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            BSSRDF：可从另一点离开
          </text>
        </svg>

        <div className="grid gap-3 md:hidden">
          <p className="text-center text-sm font-semibold text-primary">
            散射方程的三段因果链
          </p>
          {[
            {
              title: "1. 入射",
              body: "半球上每个方向都有 Li(p, ωi)",
              color: accent,
            },
            {
              title: "2. 加权",
              body: "乘 BSDF 和投影因子 |cos θi|",
              color: warning,
            },
            {
              title: "3. 积分",
              body: "对方向域积分，得到 Lo(p, ωo)",
              color: danger,
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-control border bg-bg/40 p-3"
              style={{ borderColor: item.color }}
            >
              <strong className="text-sm" style={{ color: item.color }}>
                {item.title}
              </strong>
              <p className="mt-1 text-xs text-secondary">{item.body}</p>
            </div>
          ))}
          <p className="rounded-control border border-border p-3 text-center font-mono text-[11px] text-primary">
            Lo = ∫ f · Li · |cos θi| dωi
          </p>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        BSDF 决定方向与光谱重分配，余弦项来自投影面积；二者不能互相替代。
      </figcaption>
    </figure>
  );
}

export function PbtSpectrumColorDiagram() {
  const spectrum = [
    [0, 76],
    [34, 68],
    [68, 32],
    [102, 53],
    [136, 22],
    [170, 37],
    [204, 61],
    [238, 72],
  ]
    .map(([x, y]) => `${x},${y}`)
    .join(" ");

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 780 330"
          role="img"
          aria-label="从光谱功率分布经过 CIE 匹配函数积分得到 XYZ，再由颜色空间矩阵转换为 RGB 的流程"
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
            物理光谱经过观察者模型，才成为显示设备上的颜色
          </text>

          <g transform="translate(35 82)">
            <rect
              width="255"
              height="160"
              rx="8"
              fill={elevated}
              stroke={accent}
            />
            <text
              x="127"
              y="25"
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={accent}
            >
              光谱 S(λ)
            </text>
            <line x1="10" y1="122" x2="244" y2="122" stroke={border} />
            <polyline
              points={spectrum}
              transform="translate(8 37)"
              fill="none"
              stroke={accent}
              strokeWidth="3"
            />
            <text x="20" y="143" fontSize="11" fill={secondary}>
              360 nm
            </text>
            <text x="203" y="143" fontSize="11" fill={secondary}>
              830 nm
            </text>
          </g>

          <path d="M300 162 H348" stroke={border} strokeWidth="2" />
          <path
            d="M340 155 L350 162 L340 169"
            fill="none"
            stroke={border}
            strokeWidth="2"
          />
          <g transform="translate(352 102)">
            <rect
              width="178"
              height="120"
              rx="8"
              fill={success}
              fillOpacity="0.08"
              stroke={success}
            />
            <text
              x="89"
              y="26"
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={success}
            >
              CIE 匹配函数
            </text>
            <text
              x="89"
              y="55"
              textAnchor="middle"
              fontSize="11"
              fill={primary}
            >
              X = ∫ S(λ)x̄(λ)dλ
            </text>
            <text
              x="89"
              y="77"
              textAnchor="middle"
              fontSize="11"
              fill={primary}
            >
              Y = ∫ S(λ)ȳ(λ)dλ
            </text>
            <text
              x="89"
              y="99"
              textAnchor="middle"
              fontSize="11"
              fill={primary}
            >
              Z = ∫ S(λ)z̄(λ)dλ
            </text>
          </g>

          <path d="M536 162 H580" stroke={border} strokeWidth="2" />
          <path
            d="M572 155 L582 162 L572 169"
            fill="none"
            stroke={border}
            strokeWidth="2"
          />
          <g transform="translate(585 82)">
            <rect
              width="160"
              height="160"
              rx="8"
              fill={warning}
              fillOpacity="0.08"
              stroke={warning}
            />
            <text
              x="80"
              y="25"
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill={warning}
            >
              指定颜色空间 RGB
            </text>
            <rect
              x="26"
              y="47"
              width="108"
              height="48"
              rx="6"
              fill="rgb(232 115 72)"
            />
            <text
              x="80"
              y="116"
              textAnchor="middle"
              fontSize="11"
              fill={primary}
            >
              原色 + 白点 + 矩阵
            </text>
            <text
              x="80"
              y="137"
              textAnchor="middle"
              fontSize="11"
              fill={secondary}
            >
              同一数值不等于同一光谱
            </text>
          </g>

          <text
            x="390"
            y="286"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={primary}
          >
            光谱是物理量；颜色是观察者与设备共同定义的三刺激表示
          </text>
          <text
            x="390"
            y="307"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            RGB → 光谱是欠定问题：许多不同光谱可以产生相同颜色感知
          </text>
        </svg>

        <div className="grid gap-3 md:hidden">
          <p className="text-center text-sm font-semibold text-primary">
            光谱到屏幕颜色
          </p>
          {[
            { title: "1. S(λ)", body: "保存波长上的物理分布", color: accent },
            { title: "2. XYZ", body: "乘 CIE 匹配函数并积分", color: success },
            {
              title: "3. RGB",
              body: "通过指定颜色空间矩阵转换",
              color: warning,
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-control border bg-bg/40 p-3"
              style={{ borderColor: item.color }}
            >
              <strong className="text-sm" style={{ color: item.color }}>
                {item.title}
              </strong>
              <p className="mt-1 text-xs text-secondary">{item.body}</p>
            </div>
          ))}
          <p className="text-center text-xs text-secondary">
            相同 RGB 只有在颜色空间也相同时才有明确含义。
          </p>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        PBRT 在光传输阶段采样光谱，输出时经 XYZ 转入目标 RGB 颜色空间。
      </figcaption>
    </figure>
  );
}
