import type { ReactNode } from "react";

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";

function DiagramFrame({
  children,
  caption,
}: {
  children: ReactNode;
  caption: string;
}) {
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

const learningStages = [
  {
    number: 1,
    range: "1–3",
    title: "先让命令可见",
    topics: "Application · Shaders · Pipeline",
    contract: "上下文、程序、图元、像素",
    evidence: "可解释的第一个三角形",
    color: accent,
  },
  {
    number: 2,
    range: "4–6",
    title: "建立数学与数据",
    topics: "Math · Data · GLSL Programs",
    contract: "空间、布局、编译与链接",
    evidence: "矩阵/缓冲/接口自省日志",
    color: warning,
  },
  {
    number: 3,
    range: "7–12",
    title: "逐段拆开 GPU",
    topics: "Vertex · Primitive · Fragment · Compute",
    contract: "调用频率、可见性、同步",
    evidence: "查询与屏障证明依赖",
    color: success,
  },
  {
    number: 4,
    range: "13–15",
    title: "把技术变成系统",
    topics: "Techniques · Performance · Debugging",
    contract: "画质、成本、稳定性",
    evidence: "可复现性能与错误报告",
    color: danger,
  },
] as const;

export function GlsLearningMapDiagram({ step = 0 }: { step?: 0 | 1 | 2 | 3 }) {
  const activeStages =
    step === 1
      ? [1, 2]
      : step === 2
        ? [2, 3]
        : step === 3
          ? [3, 4]
          : [1, 2, 3, 4];

  return (
    <DiagramFrame caption="第 7 版从可运行命令出发，补齐数学与数据，再下钻各管线阶段，最后以技术、性能和稳定性收束。">
      <svg
        viewBox="0 0 840 330"
        role="img"
        aria-label="OpenGL SuperBible 第七版从应用与管线到数学数据、深度管线和实践系统的四阶段地图"
        className="mx-auto hidden h-auto w-full max-w-[840px] md:block"
      >
        <text
          x="420"
          y="28"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={primary}
        >
          OpenGL SuperBible 7e：十五章，四次能力跃迁
        </text>
        <text x="420" y="49" textAnchor="middle" fontSize="11" fill={secondary}>
          每段都交付状态、数据、命令和 GPU 可观测证据
        </text>
        {learningStages.map((stage, index) => {
          const focused = activeStages.includes(stage.number);
          const x = 16 + index * 207;
          return (
            <g key={stage.title} opacity={focused ? 1 : 0.25}>
              <rect
                x={x}
                y="72"
                width="188"
                height="194"
                rx="8"
                fill={stage.color}
                fillOpacity={focused ? 0.09 : 0.02}
                stroke={stage.color}
                strokeWidth={step !== 0 && focused ? 2.5 : 1.2}
              />
              <circle cx={x + 25} cy="99" r="14" fill={stage.color} />
              <text
                x={x + 25}
                y="104"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill="var(--bg)"
              >
                {stage.number}
              </text>
              <text
                x={x + 48}
                y="96"
                fontSize="12.2"
                fontWeight="700"
                fill={primary}
              >
                {stage.title}
              </text>
              <text x={x + 48} y="112" fontSize="11" fill={stage.color}>
                Chapters {stage.range}
              </text>
              <rect
                x={x + 13}
                y="128"
                width="162"
                height="38"
                rx="6"
                fill={elevated}
                stroke={border}
              />
              <text
                x={x + 94}
                y="151"
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fill={primary}
              >
                {stage.topics}
              </text>
              <text x={x + 14} y="190" fontSize="11" fill={secondary}>
                必须带走
              </text>
              <text
                x={x + 14}
                y="208"
                fontSize="11"
                fontWeight="600"
                fill={primary}
              >
                {stage.contract}
              </text>
              <text x={x + 14} y="232" fontSize="11" fill={secondary}>
                验收 · {stage.evidence}
              </text>
            </g>
          );
        })}
        {[204, 411, 618].map((x) => (
          <path
            key={x}
            d={`M${x} 169 H${x + 18} M${x + 11} 162 L${x + 19} 169 L${x + 11} 176`}
            fill="none"
            stroke={border}
            strokeWidth="2"
          />
        ))}
        <text
          x="420"
          y="302"
          textAnchor="middle"
          fontSize="11"
          fill={secondary}
        >
          API 调用只是表面；真正主线是状态、对象、命令、依赖与证据
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <p className="text-center text-sm font-semibold text-primary">
          第 7 版四阶段地图
        </p>
        {learningStages.map((stage) => {
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
                  className="font-mono text-[10px]"
                  style={{ color: stage.color }}
                >
                  Ch. {stage.range}
                </span>
              </div>
              <p className="mt-2 text-xs text-primary">{stage.topics}</p>
              <p className="mt-1 text-xs text-secondary">
                {stage.contract} · {stage.evidence}
              </p>
            </div>
          );
        })}
      </div>
    </DiagramFrame>
  );
}

const officialParts = [
  {
    part: "Part I",
    title: "Foundations",
    range: "1–6",
    chapters:
      "Introduction · First Program · Pipeline · Math · Data · Shaders/Programs",
    question: "OpenGL 如何接收数据并形成一条合法命令？",
    color: accent,
  },
  {
    part: "Part II",
    title: "In Depth",
    range: "7–12",
    chapters:
      "Vertex · Primitive · Fragment/Framebuffer · Compute · Advanced Data · Control/Monitor",
    question: "各 GPU 阶段何时执行，如何交换与同步数据？",
    color: success,
  },
  {
    part: "Part III",
    title: "In Practice",
    range: "13–15",
    chapters: "Rendering Techniques · High Performance · Debugging/Stability",
    question: "怎样把技术做成可测、低开销且稳健的应用？",
    color: danger,
  },
] as const;

export function GlsOfficialTocDiagram() {
  return (
    <DiagramFrame caption="出版社目录的三部分是忠实度基准：本站专题可以重组，但不能让任何正式章节消失。">
      <svg
        viewBox="0 0 840 350"
        role="img"
        aria-label="OpenGL SuperBible 第七版 Foundations In Depth In Practice 三部分十五章目录"
        className="mx-auto hidden h-auto w-full max-w-[840px] md:block"
      >
        <text
          x="420"
          y="28"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={primary}
        >
          官方三部分与十五个正式章节
        </text>
        {officialParts.map((part, index) => {
          const y = 60 + index * 83;
          return (
            <g key={part.part}>
              <rect
                x="24"
                y={y}
                width="792"
                height="68"
                rx="8"
                fill={part.color}
                fillOpacity="0.07"
                stroke={part.color}
              />
              <rect
                x="38"
                y={y + 13}
                width="84"
                height="42"
                rx="6"
                fill={part.color}
              />
              <text
                x="80"
                y={y + 31}
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill="var(--bg)"
              >
                {part.part}
              </text>
              <text
                x="80"
                y={y + 47}
                textAnchor="middle"
                fontSize="11"
                fill="var(--bg)"
              >
                Ch. {part.range}
              </text>
              <text
                x="142"
                y={y + 24}
                fontSize="12"
                fontWeight="700"
                fill={primary}
              >
                {part.title}
              </text>
              <text x="142" y={y + 43} fontSize="11" fill={secondary}>
                {part.chapters}
              </text>
              <text
                x="142"
                y={y + 59}
                fontSize="11"
                fontWeight="600"
                fill={part.color}
              >
                {part.question}
              </text>
            </g>
          );
        })}
        <text
          x="420"
          y="329"
          textAnchor="middle"
          fontSize="11"
          fill={secondary}
        >
          附录继续提供 SBM 文件格式、SuperBible 工具与延伸阅读
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <p className="text-center text-sm font-semibold text-primary">
          官方三部分 · 十五章
        </p>
        {officialParts.map((part) => (
          <div
            key={part.part}
            className="rounded-control border bg-bg/40 p-3"
            style={{ borderColor: part.color }}
          >
            <div className="flex items-center justify-between gap-3">
              <strong className="text-sm text-primary">
                {part.part}: {part.title}
              </strong>
              <span className="text-xs" style={{ color: part.color }}>
                Ch. {part.range}
              </span>
            </div>
            <p className="mt-2 text-xs text-secondary">{part.chapters}</p>
            <p className="mt-1 text-xs text-primary">{part.question}</p>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}

const executionStages = [
  ["上下文状态", "Capabilities · bindings · viewport", "当前命令解释环境"],
  [
    "对象与存储",
    "Buffer · Texture · Program · FBO",
    "有名字的 GPU 资源及元数据",
  ],
  [
    "命令与依赖",
    "Draw · Dispatch · Query · Barrier",
    "向命令流声明工作与先后关系",
  ],
  [
    "GPU 执行",
    "Vertex → Primitive → Fragment / Compute",
    "异步消费并写入可观测结果",
  ],
] as const;

export function GlsExecutionModelDiagram() {
  return (
    <DiagramFrame caption="OpenGL 不是立即执行函数集合：调用修改上下文或对象并提交命令，GPU 在满足依赖后异步消费。">
      <svg
        viewBox="0 0 840 335"
        role="img"
        aria-label="OpenGL 上下文状态、对象存储、命令依赖到 GPU 异步执行的执行模型"
        className="mx-auto hidden h-auto w-full max-w-[840px] md:block"
      >
        <text
          x="420"
          y="28"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={primary}
        >
          API 调用背后：状态 + 对象 + 命令 + 异步执行
        </text>
        {executionStages.map((row, index) => {
          const x = 18 + index * 205;
          const color = [accent, warning, success, danger][index];
          return (
            <g key={row[0]}>
              <rect
                x={x}
                y="73"
                width="188"
                height="185"
                rx="8"
                fill={color}
                fillOpacity="0.07"
                stroke={color}
              />
              <circle cx={x + 27} cy="102" r="15" fill={color} />
              <text
                x={x + 27}
                y="107"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill="var(--bg)"
              >
                {index + 1}
              </text>
              <text
                x={x + 51}
                y="107"
                fontSize="12.5"
                fontWeight="700"
                fill={primary}
              >
                {row[0]}
              </text>
              <rect
                x={x + 13}
                y="128"
                width="162"
                height="43"
                rx="6"
                fill={elevated}
                stroke={border}
              />
              <text
                x={x + 94}
                y="153"
                textAnchor="middle"
                fontSize="11"
                fontFamily="monospace"
                fill={primary}
              >
                {row[1]}
              </text>
              <text x={x + 14} y="201" fontSize="11" fill={secondary}>
                核心含义
              </text>
              <text
                x={x + 14}
                y="222"
                fontSize="11"
                fontWeight="600"
                fill={primary}
              >
                {row[2]}
              </text>
            </g>
          );
        })}
        {[206, 411, 616].map((x) => (
          <path
            key={x}
            d={`M${x} 165 H${x + 17} M${x + 10} 158 L${x + 18} 165 L${x + 10} 172`}
            fill="none"
            stroke={border}
            strokeWidth="2"
          />
        ))}
        <path
          d="M735 278 C735 314 105 314 105 278"
          fill="none"
          stroke={border}
          strokeWidth="2"
          strokeDasharray="6 4"
        />
        <text
          x="420"
          y="320"
          textAnchor="middle"
          fontSize="11"
          fill={secondary}
        >
          Query、fence、debug output 与读回把异步结果送回 CPU 观察
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <p className="text-center text-sm font-semibold text-primary">
          OpenGL 执行模型
        </p>
        {executionStages.map((row, index) => (
          <div
            key={row[0]}
            className="rounded-control border border-border p-3"
          >
            <strong className="text-sm text-primary">
              {index + 1}. {row[0]}
            </strong>
            <p className="mt-2 font-mono text-[10px] text-primary">{row[1]}</p>
            <p className="mt-1 text-xs text-secondary">{row[2]}</p>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}

const routes = [
  {
    goal: "跑通第一幅图",
    chapters: "1 → 2 → 3 → 5/6 → 9",
    keep: "context · program · VAO · buffer · FBO",
    gate: "能从 CPU 调用追到 framebuffer 像素",
    color: accent,
  },
  {
    goal: "掌握管线编程",
    chapters: "3/4 → 6 → 7 → 8 → 9",
    keep: "interface · interpolation · clipping · tests",
    gate: "能预测每阶段调用次数与输入输出",
    color: warning,
  },
  {
    goal: "掌握数据与 Compute",
    chapters: "5/6 → 10 → 11 → 12",
    keep: "layout · work group · barrier · fence",
    gate: "能证明一次读写依赖没有数据竞争",
    color: success,
  },
  {
    goal: "做成稳定高性能应用",
    chapters: "12 → 13 → 14 → 15",
    keep: "query · AZDO · debug output · robustness",
    gate: "提交可复现性能与错误证据",
    color: danger,
  },
] as const;

export function GlsRouteSelectorDiagram() {
  return (
    <DiagramFrame caption="路线可以改变阅读深度，但所有路线最终都必须回到数据所有权、命令依赖和可观测证据。">
      <svg
        viewBox="0 0 840 350"
        role="img"
        aria-label="OpenGL SuperBible 按第一幅图、管线编程、数据计算和高性能应用选择阅读路线"
        className="mx-auto hidden h-auto w-full max-w-[840px] md:block"
      >
        <text
          x="420"
          y="28"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={primary}
        >
          按问题选路线，不按 API 字母表背诵
        </text>
        {routes.map((route, index) => {
          const x = 18 + index * 205;
          return (
            <g key={route.goal}>
              <rect
                x={x}
                y="62"
                width="188"
                height="228"
                rx="8"
                fill={route.color}
                fillOpacity="0.07"
                stroke={route.color}
              />
              <text
                x={x + 94}
                y="91"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill={route.color}
              >
                {route.goal}
              </text>
              <text x={x + 14} y="120" fontSize="11" fill={secondary}>
                官方章号路线
              </text>
              <rect
                x={x + 13}
                y="130"
                width="162"
                height="35"
                rx="6"
                fill={elevated}
                stroke={border}
              />
              <text
                x={x + 94}
                y="152"
                textAnchor="middle"
                fontSize="11"
                fontFamily="monospace"
                fill={primary}
              >
                {route.chapters}
              </text>
              <text x={x + 14} y="192" fontSize="11" fill={secondary}>
                不可跳过
              </text>
              <text
                x={x + 14}
                y="211"
                fontSize="11"
                fontWeight="600"
                fill={primary}
              >
                {route.keep}
              </text>
              <text x={x + 14} y="241" fontSize="11" fill={secondary}>
                通过条件
              </text>
              <text x={x + 14} y="260" fontSize="11" fill={route.color}>
                {route.gate}
              </text>
            </g>
          );
        })}
        <text
          x="420"
          y="326"
          textAnchor="middle"
          fontSize="11"
          fill={secondary}
        >
          章节路线是最小依赖，不是删减清单
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <p className="text-center text-sm font-semibold text-primary">
          四条目标路线
        </p>
        {routes.map((route) => (
          <div
            key={route.goal}
            className="rounded-control border bg-bg/40 p-3"
            style={{ borderColor: route.color }}
          >
            <strong className="text-sm" style={{ color: route.color }}>
              {route.goal}
            </strong>
            <p className="mt-2 font-mono text-[11px] text-primary">
              {route.chapters}
            </p>
            <p className="mt-1 text-xs text-secondary">保留：{route.keep}</p>
            <p className="mt-1 text-xs text-primary">验收：{route.gate}</p>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}

const milestones = [
  ["M1 可见命令", "三角形 + 状态快照", "解释每个对象、绑定和 draw 参数"],
  ["M2 数据契约", "接口自省 + 布局表", "矩阵、attribute、block 与存储一致"],
  ["M3 GPU 依赖", "query/barrier/fence 实验", "结果正确且无隐式同步猜测"],
  ["M4 应用证据", "画质/性能/错误报告", "可复现、可比较、可反证"],
] as const;

export function GlsMilestoneDiagram() {
  return (
    <DiagramFrame caption="阶段通过看交付物，不看读完页数：每份交付物都必须能独立复算或复现。">
      <svg
        viewBox="0 0 840 335"
        role="img"
        aria-label="OpenGL SuperBible 从可见命令、数据契约、GPU依赖到应用证据的四个里程碑"
        className="mx-auto hidden h-auto w-full max-w-[840px] md:block"
      >
        <text
          x="420"
          y="28"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={primary}
        >
          四个里程碑：从“能跑”到“能证明”
        </text>
        <text x="34" y="66" fontSize="11" fill={secondary}>
          里程碑
        </text>
        <text x="190" y="66" fontSize="11" fill={secondary}>
          最小交付物
        </text>
        <text x="480" y="66" fontSize="11" fill={secondary}>
          通过条件
        </text>
        {milestones.map((row, index) => {
          const y = 79 + index * 54;
          const color = [accent, warning, success, danger][index];
          return (
            <g key={row[0]}>
              <rect
                x="22"
                y={y}
                width="796"
                height="42"
                rx="6"
                fill={index % 2 === 0 ? "var(--bg)" : elevated}
                stroke={border}
              />
              <circle cx="43" cy={y + 21} r="7" fill={color} />
              <text
                x="61"
                y={y + 26}
                fontSize="11"
                fontWeight="700"
                fill={primary}
              >
                {row[0]}
              </text>
              <text x="190" y={y + 26} fontSize="11" fill={primary}>
                {row[1]}
              </text>
              <text x="480" y={y + 26} fontSize="11" fill={secondary}>
                {row[2]}
              </text>
            </g>
          );
        })}
        <text
          x="420"
          y="316"
          textAnchor="middle"
          fontSize="11"
          fontWeight="600"
          fill={danger}
        >
          截图不是证据终点：还要保留状态、输入、查询结果和复现步骤
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <p className="text-center text-sm font-semibold text-primary">
          四个阶段里程碑
        </p>
        {milestones.map((row) => (
          <div
            key={row[0]}
            className="rounded-control border border-border p-3"
          >
            <strong className="text-sm text-primary">{row[0]}</strong>
            <p className="mt-2 text-xs text-primary">交付：{row[1]}</p>
            <p className="mt-1 text-xs text-secondary">验收：{row[2]}</p>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}
