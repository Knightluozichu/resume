const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";

const renderStages = [
  {
    number: 1,
    title: "定位像素样本",
    code: "StartPixelSample",
    note: "像素、样本序号与维度归零",
    color: accent,
  },
  {
    number: 2,
    title: "生成相机射线",
    code: "GenerateRay",
    note: "胶片、镜头、时间与波长",
    color: warning,
  },
  {
    number: 3,
    title: "估计路径辐亮度",
    code: "Li / work queues",
    note: "表面、介质、光源与 MIS",
    color: success,
  },
  {
    number: 4,
    title: "写回胶片",
    code: "Film::AddSample",
    note: "带相机权重累加像素估计",
    color: danger,
  },
] as const;

export function PbtIntegratorsDiagram({ step = 0 }: { step?: 0 | 1 | 2 | 3 }) {
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
          aria-label="PBRT 从像素采样、相机射线和光传输估计到 Film 写回的积分器执行链"
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
            Integrator 决定估计什么，Sampler 决定用哪些样本估计
          </text>
          <text
            x="400"
            y="50"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            相同传输算法搭配不同样本序列仍然无偏，但方差和误差结构会变化
          </text>
          {renderStages.map((stage, index) => {
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
                  fontSize="11"
                  fontWeight="600"
                  fill={primary}
                >
                  {stage.code}
                </text>
                <text
                  x={x + 87}
                  y="199"
                  textAnchor="middle"
                  fontSize="11"
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
            y="282"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            CPU 逐路径执行 Li；GPU 将同样的传输阶段拆成批量工作队列
          </text>
        </svg>
        <div className="grid gap-3 md:hidden">
          <p className="text-center text-sm font-semibold text-primary">
            像素样本到 Film 的执行链
          </p>
          {renderStages.map((stage) => {
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
        <code>ImageTileIntegrator</code>{" "}
        负责通用像素循环，具体积分器只需实现每条相机射线的传输估计。
      </figcaption>
    </figure>
  );
}

export function PbtIntegratorHierarchyDiagram() {
  const layers = [
    {
      name: "Integrator",
      api: "Render · Intersect · IntersectP",
      owns: "aggregate + lights",
      color: accent,
    },
    {
      name: "ImageTileIntegrator",
      api: "Render · EvaluatePixelSample",
      owns: "camera + sampler prototype + tiles",
      color: warning,
    },
    {
      name: "RayIntegrator",
      api: "Li(ray, lambda, sampler)",
      owns: "camera sample → ray → Film",
      color: success,
    },
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 800 330"
          role="img"
          aria-label="PBRT Integrator ImageTileIntegrator RayIntegrator 三层继承结构及职责边界"
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
            通用调度逐层下沉，具体算法只接管最小变化面
          </text>
          {layers.map((layer, index) => {
            const x = 56 + index * 248;
            return (
              <g key={layer.name}>
                <rect
                  x={x}
                  y="76"
                  width="208"
                  height="166"
                  rx="8"
                  fill={layer.color}
                  fillOpacity="0.07"
                  stroke={layer.color}
                />
                <text
                  x={x + 104}
                  y="108"
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill={layer.color}
                >
                  {layer.name}
                </text>
                <rect
                  x={x + 14}
                  y="128"
                  width="180"
                  height="40"
                  rx="6"
                  fill={elevated}
                  stroke={border}
                />
                <text
                  x={x + 104}
                  y="153"
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="600"
                  fill={primary}
                >
                  {layer.api}
                </text>
                <text
                  x={x + 104}
                  y="202"
                  textAnchor="middle"
                  fontSize="11"
                  fill={secondary}
                >
                  {layer.owns}
                </text>
              </g>
            );
          })}
          {[264, 512].map((x) => (
            <g key={x}>
              <line
                x1={x}
                y1="158"
                x2={x + 40}
                y2="158"
                stroke={border}
                strokeWidth="2"
              />
              <path
                d={`M${x + 32} 151 L${x + 42} 158 L${x + 32} 165`}
                fill="none"
                stroke={border}
                strokeWidth="2"
              />
            </g>
          ))}
          <rect
            x="144"
            y="270"
            width="512"
            height="36"
            rx="6"
            fill={elevated}
            stroke={border}
          />
          <text
            x="400"
            y="293"
            textAnchor="middle"
            fontSize="11"
            fill={primary}
          >
            RandomWalk · SimplePath · Path · SimpleVolPath · VolPath 都实现
            RayIntegrator::Li
          </text>
        </svg>
        <div className="grid gap-3 md:hidden">
          {layers.map((layer, index) => (
            <div
              key={layer.name}
              className="rounded-control border bg-bg/40 p-3"
              style={{ borderColor: layer.color }}
            >
              <div className="flex items-center justify-between gap-3">
                <strong className="text-sm text-primary">
                  {index + 1}. {layer.name}
                </strong>
                <span
                  className="font-mono text-[10px]"
                  style={{ color: layer.color }}
                >
                  {layer.api}
                </span>
              </div>
              <p className="mt-2 text-xs text-secondary">{layer.owns}</p>
            </div>
          ))}
          <p className="text-center text-xs text-secondary">
            具体 CPU 路径积分器统一实现 RayIntegrator::Li
          </p>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        继承层级隔离了场景求交、图块并行、相机采样和传输算法，避免每个积分器重复实现渲染主循环。
      </figcaption>
    </figure>
  );
}

export function PbtSamplerDimensionsDiagram() {
  const dimensions = [
    { width: 82, title: "波长", count: "1D", color: danger },
    { width: 96, title: "像素偏移", count: "2D", color: accent },
    { width: 88, title: "镜头位置", count: "2D", color: warning },
    { width: 68, title: "时间", count: "1D", color: danger },
    { width: 84, title: "光源选择", count: "1D", color: success },
    { width: 90, title: "光源位置", count: "2D", color: warning },
    { width: 98, title: "散射方向", count: "2D+", color: accent },
    { width: 72, title: "轮盘", count: "1D", color: danger },
  ] as const;

  let cursor = 22;
  const positioned = dimensions.map((dimension) => {
    const result = { ...dimension, x: cursor };
    cursor += dimension.width + 6;
    return result;
  });

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 800 300"
          role="img"
          aria-label="PBRT Sampler 从像素镜头时间到光源 BSDF 与俄罗斯轮盘的高维样本消费顺序"
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
            一条路径按需消费高维样本，维度位置必须可重复
          </text>
          <line
            x1="28"
            y1="105"
            x2="772"
            y2="105"
            stroke={border}
            strokeWidth="3"
          />
          {positioned.map((dimension, index) => (
            <g key={dimension.title}>
              <rect
                x={dimension.x}
                y="72"
                width={dimension.width}
                height="66"
                rx="7"
                fill={dimension.color}
                fillOpacity="0.09"
                stroke={dimension.color}
              />
              <text
                x={dimension.x + dimension.width / 2}
                y="99"
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill={primary}
              >
                {dimension.title}
              </text>
              <text
                x={dimension.x + dimension.width / 2}
                y="120"
                textAnchor="middle"
                fontSize="11"
                fill={dimension.color}
              >
                {dimension.count}
              </text>
              <text
                x={dimension.x + dimension.width / 2}
                y="158"
                textAnchor="middle"
                fontSize="11"
                fill={secondary}
              >
                group {index + 1}
              </text>
            </g>
          ))}
          <rect
            x="70"
            y="190"
            width="284"
            height="66"
            rx="8"
            fill={success}
            fillOpacity="0.06"
            stroke={success}
          />
          <text
            x="212"
            y="214"
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill={success}
          >
            正确：固定语义消费固定维度
          </text>
          <text
            x="212"
            y="239"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            分支不用样本时也要维护后续维度契约
          </text>
          <rect
            x="446"
            y="190"
            width="284"
            height="66"
            rx="8"
            fill={danger}
            fillOpacity="0.06"
            stroke={danger}
          />
          <text
            x="588"
            y="214"
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill={danger}
          >
            错误：条件分支让后续维度漂移
          </text>
          <text
            x="588"
            y="239"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            同一变量在不同路径上读取不同维度
          </text>
        </svg>
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {dimensions.map((dimension, index) => (
            <div
              key={dimension.title}
              className="rounded-control border bg-bg/40 p-3"
              style={{ borderColor: dimension.color }}
            >
              <div className="flex items-center justify-between gap-2">
                <strong className="text-xs text-primary">
                  {dimension.title}
                </strong>
                <span
                  className="font-mono text-[10px]"
                  style={{ color: dimension.color }}
                >
                  {dimension.count}
                </span>
              </div>
              <p className="mt-2 text-[10px] text-secondary">
                语义组 {index + 1}
              </p>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        <code>StartPixelSample</code> 固定像素、样本编号和起始维度；
        <code>Get1D</code> 与 <code>Get2D</code> 必须按稳定语义消费序列。
      </figcaption>
    </figure>
  );
}

export function PbtIntegratorFamiliesDiagram() {
  const families = [
    {
      name: "PathIntegrator",
      domain: "表面传输",
      execution: "CPU 逐路径",
      use: "无参与介质的基准主力",
      color: accent,
    },
    {
      name: "VolPathIntegrator",
      domain: "表面 + 介质",
      execution: "CPU 逐路径",
      use: "PBRT 4e 默认积分器",
      color: success,
    },
    {
      name: "WavefrontPath",
      domain: "表面 + 介质",
      execution: "GPU 队列与内核",
      use: "同算法重排以提高吞吐",
      color: warning,
    },
    {
      name: "BDPT / MLT",
      domain: "双向或相关路径",
      execution: "在线补充方法",
      use: "困难路径分布的专用策略",
      color: danger,
    },
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 800 330"
          role="img"
          aria-label="PBRT PathIntegrator VolPathIntegrator WavefrontPathIntegrator 与 BDPT MLT 的能力和执行架构对比"
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
            先按目标积分与硬件约束选家族，再比较采样效率
          </text>
          {families.map((family, index) => {
            const x = 20 + index * 195;
            return (
              <g key={family.name}>
                <rect
                  x={x}
                  y="68"
                  width="174"
                  height="206"
                  rx="8"
                  fill={family.color}
                  fillOpacity="0.07"
                  stroke={family.color}
                />
                <text
                  x={x + 87}
                  y="98"
                  textAnchor="middle"
                  fontSize="12.5"
                  fontWeight="700"
                  fill={family.color}
                >
                  {family.name}
                </text>
                <rect
                  x={x + 14}
                  y="118"
                  width="146"
                  height="36"
                  rx="6"
                  fill={elevated}
                  stroke={border}
                />
                <text
                  x={x + 87}
                  y="141"
                  textAnchor="middle"
                  fontSize="11"
                  fill={primary}
                >
                  {family.domain}
                </text>
                <text
                  x={x + 87}
                  y="184"
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="600"
                  fill={primary}
                >
                  {family.execution}
                </text>
                <line
                  x1={x + 24}
                  y1="202"
                  x2={x + 150}
                  y2="202"
                  stroke={border}
                />
                <text
                  x={x + 87}
                  y="232"
                  textAnchor="middle"
                  fontSize="11"
                  fill={secondary}
                >
                  {family.use}
                </text>
              </g>
            );
          })}
          <text
            x="400"
            y="307"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            SimplePath 与 SimpleVolPath 是验证参考，不应因名字简单就当成生产默认
          </text>
        </svg>
        <div className="grid gap-3 sm:grid-cols-2 md:hidden">
          {families.map((family) => (
            <div
              key={family.name}
              className="rounded-control border bg-bg/40 p-3"
              style={{ borderColor: family.color }}
            >
              <div className="flex items-center justify-between gap-2">
                <strong className="text-xs text-primary">{family.name}</strong>
                <span className="text-[10px]" style={{ color: family.color }}>
                  {family.execution}
                </span>
              </div>
              <p className="mt-2 text-xs text-primary">{family.domain}</p>
              <p className="mt-1 text-[11px] text-secondary">{family.use}</p>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        4e 主线以 VolPath 为默认 CPU 解法，并用 Wavefront 在 GPU
        上重排同一传输算法；BDPT/MLT 是补充路径策略。
      </figcaption>
    </figure>
  );
}

export function PbtAdvancedStrategiesDiagram() {
  const strategies = [
    {
      name: "PT",
      path: "E ← D ← S ← L",
      sampling: "只增长相机子路径",
      risk: "难发现镜面聚焦路径",
      color: accent,
    },
    {
      name: "BDPT",
      path: "E ← D · S ← L",
      sampling: "连接 t 个相机点与 s 个光源点",
      risk: "策略 PDF 必须用 MIS 统一",
      color: success,
    },
    {
      name: "MLT",
      path: "X → mutate(X) → Y",
      sampling: "贡献驱动的马尔可夫链",
      risk: "相关噪声与初始化敏感",
      color: warning,
    },
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 800 320"
          role="img"
          aria-label="路径追踪 BDPT 与 MLT 在路径生成策略、MIS 和马尔可夫变异方面的对比"
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
            三种方法估计同一路径积分，只改变路径概率
          </text>
          {strategies.map((strategy, index) => {
            const x = 28 + index * 258;
            return (
              <g key={strategy.name}>
                <rect
                  x={x}
                  y="66"
                  width="228"
                  height="202"
                  rx="8"
                  fill={strategy.color}
                  fillOpacity="0.07"
                  stroke={strategy.color}
                />
                <circle cx={x + 114} cy="103" r="22" fill={strategy.color} />
                <text
                  x={x + 114}
                  y="109"
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill="var(--bg)"
                >
                  {strategy.name}
                </text>
                <rect
                  x={x + 24}
                  y="139"
                  width="180"
                  height="38"
                  rx="6"
                  fill={elevated}
                  stroke={border}
                />
                <text
                  x={x + 114}
                  y="163"
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="600"
                  fill={primary}
                >
                  {strategy.path}
                </text>
                <text
                  x={x + 114}
                  y="205"
                  textAnchor="middle"
                  fontSize="11"
                  fill={primary}
                >
                  {strategy.sampling}
                </text>
                <text
                  x={x + 114}
                  y="238"
                  textAnchor="middle"
                  fontSize="11"
                  fill={secondary}
                >
                  {strategy.risk}
                </text>
              </g>
            );
          })}
          <text
            x="400"
            y="298"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            BDPT 以 (s,t) 区分连接策略；MLT 在 primary sample space
            接受或拒绝变异
          </text>
        </svg>
        <div className="grid gap-3 md:hidden">
          {strategies.map((strategy) => (
            <div
              key={strategy.name}
              className="rounded-control border bg-bg/40 p-3"
              style={{ borderColor: strategy.color }}
            >
              <div className="flex items-center justify-between gap-3">
                <strong className="text-sm" style={{ color: strategy.color }}>
                  {strategy.name}
                </strong>
                <span className="font-mono text-[11px] text-primary">
                  {strategy.path}
                </span>
              </div>
              <p className="mt-2 text-xs text-primary">{strategy.sampling}</p>
              <p className="mt-1 text-xs text-secondary">{strategy.risk}</p>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        BDPT 枚举双向连接策略并用 MIS 合并；MLT
        让高贡献路径附近获得更多相关样本，但不保证每张图都更快收敛。
      </figcaption>
    </figure>
  );
}
