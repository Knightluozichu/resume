const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";

const architectureStages = [
  {
    number: 1,
    title: "解析场景描述",
    code: "Parser + Builder",
    note: "生成带来源位置的 SceneEntity",
    color: accent,
  },
  {
    number: 2,
    title: "创建运行时对象",
    code: "BasicScene",
    note: "纹理、材质、光源与 Aggregate",
    color: warning,
  },
  {
    number: 3,
    title: "并行估计传输",
    code: "CPU / Wavefront",
    note: "BVH 求交、Sampler 与 Integrator",
    color: success,
  },
  {
    number: 4,
    title: "累积与输出",
    code: "Film::AddSample",
    note: "滤波、颜色转换与图像写入",
    color: danger,
  },
] as const;

export function PbtSystemArchitectureDiagram({
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
          aria-label="PBRT 从场景解析、运行时对象创建和并行光传输到 Film 输出的系统主链"
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
            PBRT 的架构主线是所有权转换，不是一个长期可编辑的 Scene Graph
          </text>
          <text
            x="400"
            y="50"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            解析期保留实体描述；渲染期使用紧凑、只读或线程局部的运行时对象
          </text>
          {architectureStages.map((stage, index) => {
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
            y="282"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            CPU 与 GPU 共享物理组件；对象布局、调度和求交后端按执行设备变化
          </text>
        </svg>
        <div className="grid gap-3 md:hidden">
          <p className="text-center text-sm font-semibold text-primary">
            场景描述到图像的主链
          </p>
          {architectureStages.map((stage) => {
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
        场景描述首先转换为类型化运行时对象，再由 CPU 或 wavefront
        积分器并行消费，最后进入 Film。
      </figcaption>
    </figure>
  );
}

export function PbtSceneConstructionDiagram() {
  const stages = [
    {
      title: "Parser",
      payload: "命令 + 参数 + FileLoc",
      action: "验证语法与变换栈",
      color: accent,
    },
    {
      title: "BasicSceneBuilder",
      payload: "SceneEntity 集合",
      action: "处理属性、实例与 Import",
      color: warning,
    },
    {
      title: "BasicScene",
      payload: "描述对象 + AsyncJob",
      action: "并行加载纹理、介质与相机",
      color: success,
    },
    {
      title: "Final objects",
      payload: "Aggregate + Integrator",
      action: "创建只读渲染表示",
      color: danger,
    },
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 800 310"
          role="img"
          aria-label="PBRT Parser BasicSceneBuilder BasicScene AsyncJob 与最终渲染对象的场景创建流水线"
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
            解析表示与渲染表示分离，启动工作可以和继续解析重叠
          </text>
          {stages.map((stage, index) => {
            const x = 20 + index * 195;
            return (
              <g key={stage.title}>
                <rect
                  x={x}
                  y="72"
                  width="174"
                  height="176"
                  rx="8"
                  fill={stage.color}
                  fillOpacity="0.07"
                  stroke={stage.color}
                />
                <text
                  x={x + 87}
                  y="103"
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill={stage.color}
                >
                  {stage.title}
                </text>
                <rect
                  x={x + 13}
                  y="124"
                  width="148"
                  height="42"
                  rx="6"
                  fill={elevated}
                  stroke={border}
                />
                <text
                  x={x + 87}
                  y="150"
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="600"
                  fill={primary}
                >
                  {stage.payload}
                </text>
                <text
                  x={x + 87}
                  y="202"
                  textAnchor="middle"
                  fontSize="10.5"
                  fill={secondary}
                >
                  {stage.action}
                </text>
              </g>
            );
          })}
          {[194, 389, 584].map((x) => (
            <g key={x}>
              <line
                x1={x}
                y1="160"
                x2={x + 20}
                y2="160"
                stroke={border}
                strokeWidth="2"
              />
              <path
                d={`M${x + 14} 154 L${x + 22} 160 L${x + 14} 166`}
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
            Camera、Sampler、纹理与介质可异步创建；Aggregate
            依赖材质、光源和介质完成
          </text>
        </svg>
        <div className="grid gap-3 md:hidden">
          {stages.map((stage, index) => (
            <div
              key={stage.title}
              className="rounded-control border bg-bg/40 p-3"
              style={{ borderColor: stage.color }}
            >
              <div className="flex items-center justify-between gap-3">
                <strong className="text-sm text-primary">
                  {index + 1}. {stage.title}
                </strong>
                <span
                  className="font-mono text-[10px]"
                  style={{ color: stage.color }}
                >
                  {stage.payload}
                </span>
              </div>
              <p className="mt-2 text-xs text-secondary">{stage.action}</p>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        BasicScene 不是渲染期 Scene Graph；它是把解析实体转换成
        Camera、Primitive、Light、Sampler 和 Integrator 的桥梁。
      </figcaption>
    </figure>
  );
}

export function PbtBvhArchitectureDiagram() {
  const build = [
    { title: "Primitive bounds", note: "质心 + AABB", color: accent },
    { title: "Partition", note: "SAH 或 HLBVH", color: warning },
    { title: "Ordered leaves", note: "叶内图元连续", color: success },
    { title: "Linear nodes", note: "无指针深度优先布局", color: danger },
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 800 350"
          role="img"
          aria-label="PBRT BVH 从图元包围盒经 SAH 或 HLBVH 分割到线性节点压平和近优先遍历的结构"
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
            构建时追求低预计遍历成本，渲染时追求紧凑和少访存
          </text>
          {build.map((stage, index) => {
            const x = 20 + index * 195;
            return (
              <g key={stage.title}>
                <rect
                  x={x}
                  y="66"
                  width="174"
                  height="82"
                  rx="8"
                  fill={stage.color}
                  fillOpacity="0.08"
                  stroke={stage.color}
                />
                <text
                  x={x + 87}
                  y="97"
                  textAnchor="middle"
                  fontSize="11.5"
                  fontWeight="700"
                  fill={stage.color}
                >
                  {stage.title}
                </text>
                <text
                  x={x + 87}
                  y="125"
                  textAnchor="middle"
                  fontSize="10.5"
                  fill={secondary}
                >
                  {stage.note}
                </text>
              </g>
            );
          })}
          {[194, 389, 584].map((x) => (
            <path
              key={x}
              d={`M${x} 107 L${x + 20} 107 M${x + 14} 101 L${x + 22} 107 L${x + 14} 113`}
              fill="none"
              stroke={border}
              strokeWidth="2"
            />
          ))}
          <rect
            x="36"
            y="188"
            width="728"
            height="116"
            rx="8"
            fill={elevated}
            stroke={border}
          />
          <text x="60" y="216" fontSize="12" fontWeight="700" fill={primary}>
            ray traversal
          </text>
          <rect
            x="174"
            y="204"
            width="124"
            height="42"
            rx="6"
            fill={accent}
            fillOpacity="0.08"
            stroke={accent}
          />
          <text
            x="236"
            y="230"
            textAnchor="middle"
            fontSize="10.5"
            fill={primary}
          >
            测试 node bounds
          </text>
          <rect
            x="338"
            y="204"
            width="124"
            height="42"
            rx="6"
            fill={warning}
            fillOpacity="0.08"
            stroke={warning}
          />
          <text
            x="400"
            y="230"
            textAnchor="middle"
            fontSize="10.5"
            fill={primary}
          >
            先访问近子树
          </text>
          <rect
            x="502"
            y="204"
            width="124"
            height="42"
            rx="6"
            fill={success}
            fillOpacity="0.08"
            stroke={success}
          />
          <text
            x="564"
            y="230"
            textAnchor="middle"
            fontSize="10.5"
            fill={primary}
          >
            叶节点测 Primitive
          </text>
          <path
            d="M298 225 L338 225 M462 225 L502 225"
            stroke={border}
            strokeWidth="2"
          />
          <text
            x="400"
            y="278"
            textAnchor="middle"
            fontSize="10.5"
            fill={secondary}
          >
            bounds miss 跳过整棵子树；最近命中缩短 tMax，帮助更早剪枝远处节点
          </text>
          <text
            x="400"
            y="330"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            复杂度取决于树重叠和 ray 分布；最坏仍可访问大量节点，不保证 O(log N)
          </text>
        </svg>
        <div className="grid gap-3 md:hidden">
          {build.map((stage, index) => (
            <div
              key={stage.title}
              className="rounded-control border bg-bg/40 p-3"
              style={{ borderColor: stage.color }}
            >
              <div className="flex items-center justify-between gap-2">
                <strong className="text-xs text-primary">
                  {index + 1}. {stage.title}
                </strong>
                <span className="text-[10px]" style={{ color: stage.color }}>
                  {stage.note}
                </span>
              </div>
            </div>
          ))}
          <div className="rounded-control border border-border bg-bg/40 p-3 text-xs text-secondary">
            遍历：bounds 测试 → 近子树 → 叶图元；miss 直接剪枝，最近命中持续缩短
            tMax。
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        PBRT 先构建易操作的指针树，再压平为 LinearBVHNode 数组；叶内 Primitive
        也按连续范围重排。
      </figcaption>
    </figure>
  );
}

export function PbtCpuParallelDiagram() {
  const waves = ["1", "1", "2", "4", "8", "16", "32", "64"];
  const workers = [
    { name: "worker 0", tile: "tile A", color: accent },
    { name: "worker 1", tile: "tile B", color: success },
    { name: "worker 2", tile: "tile C", color: warning },
    { name: "main thread", tile: "tile D", color: danger },
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 800 350"
          role="img"
          aria-label="PBRT ImageTileIntegrator 的渐进样本波次 ParallelFor2D 图块调度和线程局部 Sampler ScratchBuffer"
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
            波次保证全图尽早有预览，图块保证 CPU 核心持续有工作
          </text>
          <text x="28" y="72" fontSize="11" fontWeight="700" fill={primary}>
            spp waves
          </text>
          {waves.map((wave, index) => {
            const x = 124 + index * 80;
            return (
              <g key={`${wave}-${index}`}>
                <rect
                  x={x}
                  y="52"
                  width="62"
                  height="38"
                  rx="6"
                  fill={index < 2 ? accent : success}
                  fillOpacity="0.08"
                  stroke={index < 2 ? accent : success}
                />
                <text
                  x={x + 31}
                  y="76"
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill={primary}
                >
                  +{wave}
                </text>
              </g>
            );
          })}
          <text x="28" y="137" fontSize="11" fontWeight="700" fill={primary}>
            tile jobs
          </text>
          {workers.map((worker, index) => {
            const y = 112 + index * 50;
            return (
              <g key={worker.name}>
                <rect
                  x="124"
                  y={y}
                  width="154"
                  height="36"
                  rx="6"
                  fill={worker.color}
                  fillOpacity="0.08"
                  stroke={worker.color}
                />
                <text
                  x="201"
                  y={y + 23}
                  textAnchor="middle"
                  fontSize="10.5"
                  fill={primary}
                >
                  {worker.name}
                </text>
                <line
                  x1="278"
                  y1={y + 18}
                  x2="332"
                  y2={y + 18}
                  stroke={border}
                  strokeWidth="2"
                />
                <rect
                  x="332"
                  y={y}
                  width="112"
                  height="36"
                  rx="6"
                  fill={elevated}
                  stroke={border}
                />
                <text
                  x="388"
                  y={y + 23}
                  textAnchor="middle"
                  fontSize="10.5"
                  fill={primary}
                >
                  {worker.tile}
                </text>
                <rect
                  x="486"
                  y={y}
                  width="126"
                  height="36"
                  rx="6"
                  fill={elevated}
                  stroke={worker.color}
                />
                <text
                  x="549"
                  y={y + 23}
                  textAnchor="middle"
                  fontSize="9.5"
                  fill={secondary}
                >
                  local Sampler
                </text>
                <rect
                  x="634"
                  y={y}
                  width="138"
                  height="36"
                  rx="6"
                  fill={elevated}
                  stroke={worker.color}
                />
                <text
                  x="703"
                  y={y + 23}
                  textAnchor="middle"
                  fontSize="9.5"
                  fill={secondary}
                >
                  local ScratchBuffer
                </text>
              </g>
            );
          })}
          <text
            x="400"
            y="328"
            textAnchor="middle"
            fontSize="11"
            fill={secondary}
          >
            ParallelFor2D 自动平衡 tile
            数量与调度开销；提交工作的主线程也参与执行
          </text>
        </svg>
        <div className="grid gap-3 md:hidden">
          <div className="rounded-control border border-accent/50 bg-bg/40 p-3">
            <p className="text-xs font-semibold text-primary">渐进波次</p>
            <p className="mt-2 font-mono text-[11px] text-secondary">
              +1, +1, +2, +4, +8, +16, +32, +64
            </p>
          </div>
          {workers.map((worker) => (
            <div
              key={worker.name}
              className="rounded-control border bg-bg/40 p-3"
              style={{ borderColor: worker.color }}
            >
              <div className="flex items-center justify-between gap-2">
                <strong className="text-xs text-primary">{worker.name}</strong>
                <span className="text-[10px]" style={{ color: worker.color }}>
                  {worker.tile}
                </span>
              </div>
              <p className="mt-2 text-[11px] text-secondary">
                ThreadLocal Sampler + ScratchBuffer
              </p>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        每个 pixel/sample 都重置 Sampler，并在结束后 Reset
        ScratchBuffer；线程间共享只读场景而不共享可变游标。
      </figcaption>
    </figure>
  );
}

export function PbtWavefrontArchitectureDiagram() {
  const queues = [
    { title: "camera rays", note: "生成样本状态", color: accent },
    { title: "intersection", note: "closest hit", color: warning },
    { title: "medium / material", note: "按工作类型分流", color: success },
    { title: "shadow + next rays", note: "贡献与下一深度", color: danger },
  ] as const;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 800 330"
          role="img"
          aria-label="PBRT WavefrontPathIntegrator 从相机射线队列经求交介质材质到阴影和下一深度队列的数据流"
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
            Wavefront 用队列按工作类型重新聚合路径，减少 GPU 分支发散
          </text>
          {queues.map((queue, index) => {
            const x = 20 + index * 195;
            return (
              <g key={queue.title}>
                <rect
                  x={x}
                  y="76"
                  width="174"
                  height="102"
                  rx="8"
                  fill={queue.color}
                  fillOpacity="0.08"
                  stroke={queue.color}
                />
                <text
                  x={x + 87}
                  y="111"
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill={queue.color}
                >
                  {queue.title}
                </text>
                <text
                  x={x + 87}
                  y="145"
                  textAnchor="middle"
                  fontSize="10.5"
                  fill={secondary}
                >
                  {queue.note}
                </text>
              </g>
            );
          })}
          {[194, 389, 584].map((x) => (
            <path
              key={x}
              d={`M${x} 127 L${x + 20} 127 M${x + 14} 121 L${x + 22} 127 L${x + 14} 133`}
              fill="none"
              stroke={border}
              strokeWidth="2"
            />
          ))}
          <rect
            x="88"
            y="220"
            width="624"
            height="54"
            rx="8"
            fill={elevated}
            stroke={border}
          />
          <text
            x="400"
            y="243"
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="600"
            fill={primary}
          >
            escaped · hit area light · medium sample · material type · shadow
          </text>
          <text
            x="400"
            y="262"
            textAnchor="middle"
            fontSize="10"
            fill={secondary}
          >
            无对应工作时跳过 kernel；next ray queue 双缓冲进入下一 path depth
          </text>
          <path
            d="M690 284 C690 314 110 314 110 284"
            fill="none"
            stroke={secondary}
            strokeWidth="1.5"
            strokeDasharray="5 4"
          />
          <path d="M110 284 L104 294 L116 294 Z" fill={secondary} />
        </svg>
        <div className="grid gap-3 md:hidden">
          {queues.map((queue, index) => (
            <div
              key={queue.title}
              className="rounded-control border bg-bg/40 p-3"
              style={{ borderColor: queue.color }}
            >
              <div className="flex items-center justify-between gap-3">
                <strong className="text-xs text-primary">
                  {index + 1}. {queue.title}
                </strong>
                <span className="text-[10px]" style={{ color: queue.color }}>
                  {queue.note}
                </span>
              </div>
            </div>
          ))}
          <p className="text-center text-xs text-secondary">
            next ray queue 双缓冲进入下一 path depth
          </p>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Wavefront 改变调度和数据布局，不改变 VolPath 的目标积分；队列是 GPU
        路径，不是 CPU tile 调度的替代说法。
      </figcaption>
    </figure>
  );
}
