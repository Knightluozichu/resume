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
    title: "相机命中",
    code: "Intersect(ray)",
    note: "建立当前表面顶点",
    color: accent,
  },
  {
    number: 2,
    title: "直接光照",
    code: "SampleLd",
    note: "光源与 BSDF 用 MIS 合并",
    color: warning,
  },
  {
    number: 3,
    title: "延伸路径",
    code: "BSDF::Sample_f",
    note: "更新 beta、PDF 与方向",
    color: success,
  },
  {
    number: 4,
    title: "终止或累加",
    code: "Le / roulette",
    note: "命中发光体或概率终止",
    color: danger,
  },
] as const;

export function PbtLightTransportDiagram({
  step = 0,
}: {
  step?: 0 | 1 | 2 | 3;
}) {
  const activeStages =
    step === 1 ? [1] : step === 2 ? [2, 3] : step === 3 ? [3, 4] : [1, 2, 3, 4];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 800 310"
          role="img"
          aria-label="PBRT PathIntegrator 从相机命中、直接光照和 BSDF 延伸到发光累加与俄罗斯轮盘的路径循环"
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
            一次循环增加一个路径顶点，同时维护 L 与 beta
          </text>
          <text
            x="400"
            y="50"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            发光贡献进入 L；BSDF、余弦与 PDF 比值进入路径吞吐量 beta
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
          <path
            d="M692 250 C692 292 108 292 108 250"
            fill="none"
            stroke={secondary}
            strokeWidth="1.5"
            strokeDasharray="5 4"
          />
          <path d="M108 250 L102 260 L114 260 Z" fill={secondary} />
          <text
            x="400"
            y="286"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            存活路径以新 ray 回到求交；终止路径返回当前无偏估计
          </text>
        </svg>
        <div className="grid gap-3 md:hidden">
          <p className="text-center text-sm font-semibold text-primary">
            PathIntegrator 路径循环
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
        PBRT 增量构造相机子路径，不需要保存全部顶点，只需维护当前 ray、L、beta
        与采样状态。
      </figcaption>
    </figure>
  );
}

export function PbtLteFormsDiagram() {
  const forms = [
    {
      title: "方向形式",
      domain: "dωi",
      action: "采样方向并追踪射线",
      note: "几何关系藏在 t(p, ω)",
      color: accent,
    },
    {
      title: "面积形式",
      domain: "dA(p')",
      action: "采样表面点并检查可见性",
      note: "G 显式包含距离与余弦",
      color: warning,
    },
    {
      title: "路径形式",
      domain: "dA(x1)...dA(xn)",
      action: "对不同长度路径积分",
      note: "贡献是 Le、f 与 G 的乘积",
      color: success,
    },
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 800 300"
          role="img"
          aria-label="光传输方程从方向积分经面积积分变换到路径空间积分的三种等价形式"
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
            同一份能量平衡，三种积分域暴露不同结构
          </text>
          {forms.map((form, index) => {
            const x = 28 + index * 258;
            return (
              <g key={form.title}>
                <rect
                  x={x}
                  y="66"
                  width="228"
                  height="180"
                  rx="8"
                  fill={form.color}
                  fillOpacity="0.07"
                  stroke={form.color}
                />
                <text
                  x={x + 114}
                  y="96"
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="700"
                  fill={form.color}
                >
                  {form.title}
                </text>
                <rect
                  x={x + 24}
                  y="116"
                  width="180"
                  height="38"
                  rx="6"
                  fill={elevated}
                  stroke={border}
                />
                <text
                  x={x + 114}
                  y="140"
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="600"
                  fill={primary}
                >
                  {form.domain}
                </text>
                <text
                  x={x + 114}
                  y="182"
                  textAnchor="middle"
                  fontSize="11"
                  fill={primary}
                >
                  {form.action}
                </text>
                <text
                  x={x + 114}
                  y="211"
                  textAnchor="middle"
                  fontSize="10.5"
                  fill={secondary}
                >
                  {form.note}
                </text>
              </g>
            );
          })}
          {[256, 514].map((x) => (
            <g key={x}>
              <line
                x1={x}
                y1="156"
                x2={x + 26}
                y2="156"
                stroke={border}
                strokeWidth="2"
              />
              <path
                d={`M${x + 20} 150 L${x + 28} 156 L${x + 20} 162`}
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
            fontSize="11"
            fill={secondary}
          >
            变量替换不改变物理量；只改变采样对象、PDF 与可见性表达方式
          </text>
        </svg>
        <div className="grid gap-3 md:hidden">
          {forms.map((form, index) => (
            <div
              key={form.title}
              className="rounded-control border bg-bg/40 p-3"
              style={{ borderColor: form.color }}
            >
              <div className="flex items-center justify-between gap-3">
                <strong className="text-sm text-primary">
                  {index + 1}. {form.title}
                </strong>
                <span
                  className="font-mono text-[11px]"
                  style={{ color: form.color }}
                >
                  {form.domain}
                </span>
              </div>
              <p className="mt-2 text-xs text-primary">{form.action}</p>
              <p className="mt-1 text-xs text-secondary">{form.note}</p>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        方向形式适合递归射线解释，面积形式显式暴露几何耦合，路径形式允许比较不同路径生成策略。
      </figcaption>
    </figure>
  );
}

export function PbtPathContributionDiagram() {
  const vertices = [
    { x: 82, label: "x0", role: "相机", color: accent },
    { x: 278, label: "x1", role: "漫反射", color: success },
    { x: 500, label: "x2", role: "光泽反射", color: warning },
    { x: 718, label: "x3", role: "面光源", color: danger },
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 800 320"
          role="img"
          aria-label="四顶点光路中发光项、两个 BSDF 与三个几何项组成路径贡献和吞吐量"
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
            四顶点路径：发光项乘上沿途散射与几何耦合
          </text>
          <polyline
            points="82,192 278,126 500,184 718,96"
            fill="none"
            stroke={secondary}
            strokeWidth="3"
          />
          {vertices.map((vertex) => (
            <g key={vertex.label}>
              <circle
                cx={vertex.x}
                cy={
                  vertex.label === "x0"
                    ? 192
                    : vertex.label === "x1"
                      ? 126
                      : vertex.label === "x2"
                        ? 184
                        : 96
                }
                r="19"
                fill={vertex.color}
                fillOpacity="0.15"
                stroke={vertex.color}
                strokeWidth="2"
              />
              <text
                x={vertex.x}
                y={
                  vertex.label === "x0"
                    ? 197
                    : vertex.label === "x1"
                      ? 131
                      : vertex.label === "x2"
                        ? 189
                        : 101
                }
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill={primary}
              >
                {vertex.label}
              </text>
              <text
                x={vertex.x}
                y={
                  vertex.label === "x0"
                    ? 229
                    : vertex.label === "x1"
                      ? 91
                      : vertex.label === "x2"
                        ? 222
                        : 61
                }
                textAnchor="middle"
                fontSize="10.5"
                fill={vertex.color}
              >
                {vertex.role}
              </text>
            </g>
          ))}
          <text x="168" y="137" fontSize="10.5" fill={secondary}>
            G(x1 ↔ x0)
          </text>
          <text x="376" y="139" fontSize="10.5" fill={secondary}>
            G(x2 ↔ x1)
          </text>
          <text x="590" y="116" fontSize="10.5" fill={secondary}>
            G(x3 ↔ x2)
          </text>
          <rect
            x="190"
            y="252"
            width="420"
            height="42"
            rx="7"
            fill={elevated}
            stroke={border}
          />
          <text
            x="400"
            y="278"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill={primary}
          >
            P = Le(x3 → x2) · f(x3 → x2 → x1) · G32 · f(x2 → x1 → x0) · G21 ·
            G10
          </text>
        </svg>
        <div className="grid gap-3 md:hidden">
          <div className="flex items-center justify-between gap-2 rounded-control border border-accent/50 bg-bg/40 p-3 text-xs">
            <span className="font-semibold text-accent">相机 x0</span>
            <span className="text-secondary">G10</span>
            <span className="font-semibold text-success">表面 x1</span>
          </div>
          <div className="flex items-center justify-between gap-2 rounded-control border border-warning/50 bg-bg/40 p-3 text-xs">
            <span className="text-secondary">f1 · G21</span>
            <span className="font-semibold text-warning">表面 x2</span>
          </div>
          <div className="flex items-center justify-between gap-2 rounded-control border border-danger/50 bg-bg/40 p-3 text-xs">
            <span className="text-secondary">f2 · G32</span>
            <span className="font-semibold text-danger">光源 x3 · Le</span>
          </div>
          <p className="text-center font-mono text-xs text-primary">
            contribution = Le · throughput
          </p>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        路径贡献只在顶点相互可见、BSDF
        非零且终点发光时非零；吞吐量是不含末端发光的乘积。
      </figcaption>
    </figure>
  );
}

export function PbtMisDiagram() {
  const strategies = [
    {
      title: "只采光源",
      pdf: "p_l",
      wins: "小光源 + 粗糙表面",
      loses: "窄 BSDF 波瓣",
      color: warning,
    },
    {
      title: "只采 BSDF",
      pdf: "p_b",
      wins: "大光源 + 光泽表面",
      loses: "容易错过小光源",
      color: accent,
    },
    {
      title: "MIS 合并",
      pdf: "w_l + w_b",
      wins: "自动偏向较好策略",
      loses: "必须统一测度与 PDF",
      color: success,
    },
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 800 310"
          role="img"
          aria-label="直接光照中光源采样、BSDF 采样与幂启发式 MIS 的适用场景和权重对比"
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
            两个估计器各有盲区，MIS 用 PDF 判断谁更可信
          </text>
          {strategies.map((strategy, index) => {
            const x = 28 + index * 258;
            return (
              <g key={strategy.title}>
                <rect
                  x={x}
                  y="66"
                  width="228"
                  height="188"
                  rx="8"
                  fill={strategy.color}
                  fillOpacity="0.07"
                  stroke={strategy.color}
                />
                <text
                  x={x + 114}
                  y="96"
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="700"
                  fill={strategy.color}
                >
                  {strategy.title}
                </text>
                <rect
                  x={x + 55}
                  y="114"
                  width="118"
                  height="38"
                  rx="19"
                  fill={elevated}
                  stroke={border}
                />
                <text
                  x={x + 114}
                  y="138"
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill={primary}
                >
                  {strategy.pdf}
                </text>
                <text
                  x={x + 18}
                  y="184"
                  fontSize="10.5"
                  fontWeight="600"
                  fill={success}
                >
                  强项
                </text>
                <text x={x + 53} y="184" fontSize="10.5" fill={primary}>
                  {strategy.wins}
                </text>
                <text
                  x={x + 18}
                  y="217"
                  fontSize="10.5"
                  fontWeight="600"
                  fill={danger}
                >
                  风险
                </text>
                <text x={x + 53} y="217" fontSize="10.5" fill={secondary}>
                  {strategy.loses}
                </text>
              </g>
            );
          })}
          <text
            x="400"
            y="286"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            幂启发式：w_l = p_l^2 / (p_l^2 + p_b^2)，w_b 对称
          </text>
        </svg>
        <div className="grid gap-3 md:hidden">
          {strategies.map((strategy) => (
            <div
              key={strategy.title}
              className="rounded-control border bg-bg/40 p-3"
              style={{ borderColor: strategy.color }}
            >
              <div className="flex items-center justify-between gap-3">
                <strong className="text-sm text-primary">
                  {strategy.title}
                </strong>
                <span
                  className="font-mono text-[11px]"
                  style={{ color: strategy.color }}
                >
                  {strategy.pdf}
                </span>
              </div>
              <p className="mt-2 text-xs text-primary">强项：{strategy.wins}</p>
              <p className="mt-1 text-xs text-secondary">
                风险：{strategy.loses}
              </p>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        非 delta 直接光照同时考虑光源采样和 BSDF 采样；任何 PDF
        漏乘或测度不一致都会破坏权重。
      </figcaption>
    </figure>
  );
}

export function PbtIntegratorStateDiagram() {
  const states = [
    {
      name: "L",
      meaning: "已完成路径的辐亮度和",
      update: "+= beta · contribution",
      color: accent,
    },
    {
      name: "beta",
      meaning: "当前未完成路径吞吐量",
      update: "*= f · |cos| / p_b",
      color: success,
    },
    {
      name: "p_b",
      meaning: "上一段 BSDF 方向 PDF",
      update: "用于命中光源时的 MIS",
      color: warning,
    },
    {
      name: "etaScale",
      meaning: "抵消折射辐亮度缩放",
      update: "修正 roulette 概率",
      color: danger,
    },
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 800 300"
          role="img"
          aria-label="PBRT PathIntegrator 中 L beta p_b 与 etaScale 四个关键状态的含义和更新关系"
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
            不存整条路径，也能完整计算贡献与终止概率
          </text>
          {states.map((state, index) => {
            const x = 20 + index * 195;
            return (
              <g key={state.name}>
                <rect
                  x={x}
                  y="70"
                  width="174"
                  height="168"
                  rx="8"
                  fill={state.color}
                  fillOpacity="0.07"
                  stroke={state.color}
                />
                <circle cx={x + 87} cy="112" r="25" fill={state.color} />
                <text
                  x={x + 87}
                  y="118"
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill="var(--bg)"
                >
                  {state.name}
                </text>
                <text
                  x={x + 87}
                  y="163"
                  textAnchor="middle"
                  fontSize="10.5"
                  fill={primary}
                >
                  {state.meaning}
                </text>
                <rect
                  x={x + 12}
                  y="183"
                  width="150"
                  height="36"
                  rx="6"
                  fill={elevated}
                  stroke={border}
                />
                <text
                  x={x + 87}
                  y="205"
                  textAnchor="middle"
                  fontSize="9.5"
                  fontWeight="600"
                  fill={secondary}
                >
                  {state.update}
                </text>
              </g>
            );
          })}
          <text
            x="400"
            y="276"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            另需 specularBounce 与 prevIntrCtx 判断发光项是否直接累加或参与 MIS
          </text>
        </svg>
        <div className="grid gap-3 sm:grid-cols-2 md:hidden">
          {states.map((state) => (
            <div
              key={state.name}
              className="rounded-control border bg-bg/40 p-3"
              style={{ borderColor: state.color }}
            >
              <div className="flex items-center justify-between gap-2">
                <strong
                  className="font-mono text-sm"
                  style={{ color: state.color }}
                >
                  {state.name}
                </strong>
                <span className="text-[11px] text-secondary">
                  {state.meaning}
                </span>
              </div>
              <p className="mt-2 font-mono text-[11px] text-primary">
                {state.update}
              </p>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        `beta` 汇总已采样顶点的权重，`p_b` 和 `prevIntrCtx`
        则保留下一次发光命中的 MIS 上下文。
      </figcaption>
    </figure>
  );
}
