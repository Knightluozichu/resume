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

const stages = [
  {
    number: 1,
    range: "2–4",
    title: "基础语言",
    topics: "Monte Carlo · Geometry · Radiometry",
    contract: "量、坐标、概率密度",
    deliverable: "手算一个有单位的估计量",
    color: accent,
  },
  {
    number: 2,
    range: "5–8",
    title: "成像与场景",
    topics: "Camera · Shape · BVH · Sampling",
    contract: "样本、ray、稳健交点",
    deliverable: "追踪像素到 SurfaceInteraction",
    color: warning,
  },
  {
    number: 3,
    range: "9–12",
    title: "局部散射",
    topics: "BxDF · Material · Medium · Light",
    contract: "评估、采样、PDF",
    deliverable: "核对一次散射与直接光",
    color: success,
  },
  {
    number: 4,
    range: "13–16",
    title: "全局求解",
    topics: "Transport · Volume · GPU · Future",
    contract: "路径状态、调度、证据",
    deliverable: "解释一条完整贡献路径",
    color: danger,
  },
] as const;

export function PbtLearningMapDiagram({ step = 0 }: { step?: 0 | 1 | 2 | 3 }) {
  const activeStages =
    step === 1
      ? [1, 2]
      : step === 2
        ? [2, 3]
        : step === 3
          ? [3, 4]
          : [1, 2, 3, 4];

  return (
    <DiagramFrame caption="官方四段结构按契约递进：后段默认读者已经掌握前段的量、类型、接口与概率约定。">
      <svg
        viewBox="0 0 840 330"
        role="img"
        aria-label="PBRT 第四版从基础语言、成像与场景、局部散射到全局求解的四阶段学习地图"
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
          PBRT 第 4 版：四段依赖，四次可验收交付
        </text>
        <text x="420" y="49" textAnchor="middle" fontSize="11" fill={secondary}>
          第 1 章建立系统视角；第 2–16 章按基础、场景、散射、传输推进
        </text>
        {stages.map((stage, index) => {
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
                fontSize="13"
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
              <text x={x + 14} y="191" fontSize="11" fill={secondary}>
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
              <text x={x + 14} y="231" fontSize="11" fill={secondary}>
                验收 · {stage.deliverable}
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
          不是“看完即完成”：每段都要产出可复算、可运行、可解释的证据
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <p className="text-center text-sm font-semibold text-primary">
          PBRT 四阶段学习地图
        </p>
        {stages.map((stage) => {
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
                  Chapters {stage.range}
                </span>
              </div>
              <p className="mt-2 text-xs text-primary">{stage.topics}</p>
              <p className="mt-1 text-xs text-secondary">
                {stage.contract} · {stage.deliverable}
              </p>
            </div>
          );
        })}
      </div>
    </DiagramFrame>
  );
}

const chapterGroups = [
  {
    range: "1–4",
    title: "入口与基础",
    chapters: ["1 系统概览", "2 蒙特卡洛", "3 几何变换", "4 辐射/光谱/颜色"],
    local: "系统架构 · 蒙特卡洛 · 辐射度量",
    color: accent,
  },
  {
    range: "5–8",
    title: "成像与几何",
    chapters: [
      "5 Camera/Film",
      "6 Shapes",
      "7 Primitive/BVH",
      "8 Sampling/Filter",
    ],
    local: "相机模型 · 系统架构 · 积分器",
    color: warning,
  },
  {
    range: "9–12",
    title: "散射与光源",
    chapters: ["9 Reflection", "10 Texture/Material", "11 Volume", "12 Lights"],
    local: "BxDF · 体积散射 · 光传输",
    color: success,
  },
  {
    range: "13–16",
    title: "传输与反思",
    chapters: ["13 Surface", "14 Volume", "15 GPU Wavefront", "16 Future"],
    local: "光传输 · 积分器 · 总复习",
    color: danger,
  },
] as const;

export function PbtChapterDependencyDiagram() {
  return (
    <DiagramFrame caption="本站 9 个专题章不是删减原书目录，而是按共同契约重组 16 章；学习时仍需保留官方章号。">
      <svg
        viewBox="0 0 840 370"
        role="img"
        aria-label="PBRT 官方 16 章与本站九个专题章节的覆盖对应关系"
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
          官方 16 章与本站专题章的覆盖矩阵
        </text>
        {chapterGroups.map((group, index) => {
          const y = 57 + index * 70;
          return (
            <g key={group.range}>
              <rect
                x="20"
                y={y}
                width="800"
                height="58"
                rx="8"
                fill={group.color}
                fillOpacity="0.07"
                stroke={group.color}
                strokeOpacity="0.7"
              />
              <rect
                x="32"
                y={y + 11}
                width="54"
                height="36"
                rx="6"
                fill={group.color}
              />
              <text
                x="59"
                y={y + 34}
                textAnchor="middle"
                fontSize="11.5"
                fontWeight="700"
                fill="var(--bg)"
              >
                {group.range}
              </text>
              <text
                x="100"
                y={y + 24}
                fontSize="11.5"
                fontWeight="700"
                fill={primary}
              >
                {group.title}
              </text>
              <text x="100" y={y + 43} fontSize="11" fill={secondary}>
                {group.chapters.join(" · ")}
              </text>
              <path
                d={`M560 ${y + 29} H590 M583 ${y + 22} L591 ${y + 29} L583 ${y + 36}`}
                fill="none"
                stroke={border}
                strokeWidth="2"
              />
              <text x="605" y={y + 23} fontSize="11" fill={secondary}>
                本站专题
              </text>
              <text
                x="605"
                y={y + 43}
                fontSize="11"
                fontWeight="600"
                fill={group.color}
              >
                {group.local}
              </text>
            </g>
          );
        })}
        <text
          x="420"
          y="352"
          textAnchor="middle"
          fontSize="11"
          fill={secondary}
        >
          复习时用专题串联系统，查缺时回到官方章号与小节
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <p className="text-center text-sm font-semibold text-primary">
          16 章覆盖矩阵
        </p>
        {chapterGroups.map((group) => (
          <div
            key={group.range}
            className="rounded-control border bg-bg/40 p-3"
            style={{ borderColor: group.color }}
          >
            <div className="flex items-center gap-3">
              <strong style={{ color: group.color }}>{group.range}</strong>
              <strong className="text-sm text-primary">{group.title}</strong>
            </div>
            <p className="mt-2 text-xs text-secondary">
              {group.chapters.join(" · ")}
            </p>
            <p className="mt-1 text-xs font-medium text-primary">
              本站：{group.local}
            </p>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}

const routes = [
  {
    goal: "先跑通渲染器",
    path: "1 → 3 → 5 → 6/7 → 9/12 → 13",
    keep: "Ray · Interaction · BxDF · Light · Li()",
    gate: "解释一个 pixel sample 如何成为路径贡献",
    color: accent,
  },
  {
    goal: "研究材料外观",
    path: "2/4 → 8 → 9 → 10 → 12 → 13",
    keep: "Spectrum · BSDF · Texture · PDF · MIS",
    gate: "实现并验证一个可评估、可采样 BxDF",
    color: warning,
  },
  {
    goal: "研究体积传输",
    path: "2/4 → 8 → 11/12 → 13 → 14",
    keep: "Tr · free flight · phase · majorant",
    gate: "复算一次介质事件的 beta 更新",
    color: success,
  },
  {
    goal: "理解 GPU 架构",
    path: "1–12 契约 → 13/14 → 15 → 16",
    keep: "Path state · queue · kernel · ownership",
    gate: "比较逐路径与 wavefront 的实测证据",
    color: danger,
  },
] as const;

export function PbtRouteSelectorDiagram() {
  return (
    <DiagramFrame caption="可以按目标跳读实现细节，但不能跳过目标路线依赖的量、接口与渲染主循环。">
      <svg
        viewBox="0 0 840 360"
        role="img"
        aria-label="按跑通渲染器、材料外观、体积传输和 GPU 架构四种目标选择 PBRT 阅读路线"
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
          先选问题，再选路线；每条路线都有不可跳过的契约
        </text>
        {routes.map((route, index) => {
          const x = 18 + index * 205;
          return (
            <g key={route.goal}>
              <rect
                x={x}
                y="62"
                width="188"
                height="238"
                rx="8"
                fill={route.color}
                fillOpacity="0.07"
                stroke={route.color}
              />
              <text
                x={x + 94}
                y="90"
                textAnchor="middle"
                fontSize="12.5"
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
                {route.path}
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
          y="334"
          textAnchor="middle"
          fontSize="11"
          fill={secondary}
        >
          路线用于调度注意力，不用于删除核心知识
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <p className="text-center text-sm font-semibold text-primary">
          四种目标路线
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
              {route.path}
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
  ["M1 基础", "估计量 + 单位表", "能指出随机变量、PDF、测度和方差来源"],
  [
    "M2 成像",
    "固定 pixel 的 ray/交点日志",
    "能解释坐标变换、最近命中与 pError",
  ],
  ["M3 散射", "一次直接光与 BSDF 采样账本", "能复算 beta、PDF 与 MIS 权重"],
  ["M4 传输", "小场景 CPU/GPU 对照报告", "能分离物理模型、估计量和执行架构"],
] as const;

export function PbtMilestoneDiagram() {
  return (
    <DiagramFrame caption="阶段验收要求产出证据；只完成页数或代码阅读，不足以证明掌握。">
      <svg
        viewBox="0 0 840 335"
        role="img"
        aria-label="PBRT 四个学习里程碑的交付物与通过条件"
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
          每段学习都要留下可复算交付物
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
          “看懂了”必须被手算、日志、图像差分或性能计数器替代
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

const loopNodes = [
  {
    number: "1",
    title: "公式",
    detail: "量、单位、积分域、估计量",
    question: "这项在算什么？",
    color: accent,
  },
  {
    number: "2",
    title: "接口",
    detail: "输入、输出、坐标、PDF",
    question: "谁提供、谁消费？",
    color: warning,
  },
  {
    number: "3",
    title: "实验",
    detail: "固定场景、样本、随机种子",
    question: "怎样让差异可复现？",
    color: success,
  },
  {
    number: "4",
    title: "证据",
    detail: "日志、图像差分、计数器",
    question: "什么结果会推翻理解？",
    color: danger,
  },
] as const;

export function PbtCodeReadingLoopDiagram() {
  return (
    <DiagramFrame caption="PBRT 的文学编程把推导和源码放在同一叙事中；学习闭环还需要可复现实验和反证证据。">
      <svg
        viewBox="0 0 840 340"
        role="img"
        aria-label="从公式、接口、实验到证据再返回公式的 PBRT 代码阅读闭环"
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
          公式 → 接口 → 实验 → 证据：一次完整阅读循环
        </text>
        {loopNodes.map((node, index) => {
          const x = 30 + index * 205;
          return (
            <g key={node.title}>
              <rect
                x={x}
                y="80"
                width="170"
                height="160"
                rx="8"
                fill={node.color}
                fillOpacity="0.07"
                stroke={node.color}
              />
              <circle cx={x + 26} cy="107" r="14" fill={node.color} />
              <text
                x={x + 26}
                y="112"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill="var(--bg)"
              >
                {node.number}
              </text>
              <text
                x={x + 50}
                y="112"
                fontSize="13"
                fontWeight="700"
                fill={primary}
              >
                {node.title}
              </text>
              <text x={x + 15} y="148" fontSize="11" fill={secondary}>
                核对对象
              </text>
              <text
                x={x + 15}
                y="168"
                fontSize="11"
                fontWeight="600"
                fill={primary}
              >
                {node.detail}
              </text>
              <text x={x + 15} y="202" fontSize="11" fill={secondary}>
                关键问题
              </text>
              <text x={x + 15} y="221" fontSize="11" fill={node.color}>
                {node.question}
              </text>
            </g>
          );
        })}
        {[200, 405, 610].map((x) => (
          <path
            key={x}
            d={`M${x} 160 H${x + 28} M${x + 20} 153 L${x + 29} 160 L${x + 20} 167`}
            fill="none"
            stroke={border}
            strokeWidth="2"
          />
        ))}
        <path
          d="M748 258 C748 307 92 307 92 258 M85 266 L92 257 L99 266"
          fill="none"
          stroke={border}
          strokeWidth="2"
          strokeDasharray="6 4"
        />
        <text
          x="420"
          y="323"
          textAnchor="middle"
          fontSize="11"
          fill={secondary}
        >
          证据与预测不符时，回到公式或接口修正模型
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <p className="text-center text-sm font-semibold text-primary">
          公式到证据的阅读闭环
        </p>
        {loopNodes.map((node) => (
          <div
            key={node.title}
            className="rounded-control border bg-bg/40 p-3"
            style={{ borderColor: node.color }}
          >
            <div className="flex items-center gap-3">
              <strong style={{ color: node.color }}>{node.number}</strong>
              <strong className="text-sm text-primary">{node.title}</strong>
            </div>
            <p className="mt-2 text-xs text-primary">{node.detail}</p>
            <p className="mt-1 text-xs text-secondary">{node.question}</p>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}
