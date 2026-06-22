/**
 * <OssContributionFlowDiagram>：OSS 中设计者的角色——贡献者旅程流程图。
 *
 * 展示一个新贡献者进入开源项目的四步旅程：
 *   ① 找到 Issue → ② 架构文档指向入口模块 → ③ 代码示例 + 命名规范指导实现 → ④ PR Review 使用设计原则
 * 垂直流式布局，每一步绘制带图标的步骤框与连接箭头。
 * 底部标注核心概念：架构文档 = 导航地图。
 *
 * Server Component（纯展示，静态 SVG，无交互）。
 */

const VIEW_W = 720;
const VIEW_H = 550;

// ---- 四个步骤定义 ----
interface StepDef {
  num: string;
  title: string;
  desc: string;
  detail: string[];
  color: string;
  icon: string;
}

const STEP_DATA: readonly StepDef[] = [
  {
    num: "1",
    title: "找到 Issue",
    desc: "新贡献者浏览 Issue 列表",
    detail: ["good first issue 标签", "清晰的问题描述", "可复现的步骤"],
    color: "var(--accent)",
    icon: "🔍",
  },
  {
    num: "2",
    title: "定位入口模块",
    desc: "架构文档指明方向",
    detail: ["ARCHITECTURE.md", "模块依赖图", "入口函数 / 类"],
    color: "var(--warning)",
    icon: "🗺️",
  },
  {
    num: "3",
    title: "编写代码",
    desc: "示例 + 规范指导实现",
    detail: ["代码示例 (examples/)", "命名规范 (CONTRIBUTING.md)", "测试用例模板"],
    color: "var(--success)",
    icon: "💻",
  },
  {
    num: "4",
    title: "PR Review",
    desc: "设计原则把关评审",
    detail: ["设计原则文档", "自动化 CI 检查", "维护者反馈循环"],
    color: "var(--danger)",
    icon: "✅",
  },
];

// ---- 布局参数 ----
const STEP_H = 88;
const STEP_W = 520;
const GAP = 20;
const START_Y = 44;
const CX = VIEW_W / 2;

// 步骤框左上角
function stepY(i: number) {
  return START_Y + i * (STEP_H + GAP);
}

export function OssContributionFlowDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-6">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="OSS 贡献者旅程四步流程图。第一步：找到 Issue，新贡献者浏览 Issue 列表，通过 good first issue 标签、清晰问题描述、可复现步骤找到任务。第二步：定位入口模块，架构文档 ARCHITECTURE.md 和模块依赖图指引入口函数和入口类。第三步：编写代码，examples/ 代码示例、CONTRIBUTING.md 命名规范、测试用例模板指导实现。第四步：PR Review，设计原则文档、自动化 CI 检查、维护者反馈循环把关评审。四步之间用垂直箭头串联。底部核心概念：架构文档等于导航地图，让陌生贡献者不需要问就能找到入口。"
          className="mx-auto block h-auto w-full max-w-[620px]"
        >
          <defs>
            <marker
              id="oss-arrow-down"
              markerWidth="8"
              markerHeight="8"
              refX="4"
              refY="6"
              orient="auto"
            >
              <path d="M0 0 L4 6 L8 0 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {STEP_DATA.map((step, i) => {
            const y = stepY(i);
            const isLast = i === STEP_DATA.length - 1;

            return (
              <g key={step.num}>
                {/* 步骤序号圆圈 */}
                <circle
                  cx={CX - STEP_W / 2 + 10}
                  cy={y + 20}
                  r="14"
                  fill={step.color}
                  fillOpacity="0.12"
                  stroke={step.color}
                  strokeWidth="2"
                />
                <text
                  x={CX - STEP_W / 2 + 10}
                  y={y + 25}
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="700"
                  fill={step.color}
                >
                  {step.num}
                </text>

                {/* 步骤框 */}
                <rect
                  x={CX - STEP_W / 2}
                  y={y}
                  width={STEP_W}
                  height={STEP_H}
                  rx="10"
                  fill="var(--bg)"
                  stroke={step.color}
                  strokeWidth="1.8"
                />
                {/* 左侧语义色条 */}
                <rect
                  x={CX - STEP_W / 2}
                  y={y}
                  width="4"
                  height={STEP_H}
                  rx="2"
                  fill={step.color}
                  fillOpacity="0.4"
                />

                {/* 标题 */}
                <text
                  x={CX - STEP_W / 2 + 46}
                  y={y + 22}
                  fontSize="14"
                  fontWeight="700"
                  fill={step.color}
                >
                  {step.icon} {step.title}
                </text>

                {/* 描述 */}
                <text
                  x={CX - STEP_W / 2 + 46}
                  y={y + 42}
                  fontSize="11"
                  fill="var(--text-secondary)"
                >
                  {step.desc}
                </text>

                <g>
                  {step.detail.map((d, di) => {
                    const bx = CX - STEP_W / 2 + 12 + di * 168;
                    return (
                      <g key={di}>
                        <rect
                          x={bx}
                          y={y + 58}
                          width={158}
                          height={22}
                          rx="4"
                          fill={step.color}
                          fillOpacity="0.06"
                          stroke={step.color}
                          strokeWidth="0.8"
                          strokeOpacity="0.3"
                        />
                        <text
                          x={bx + 79}
                          y={y + 73}
                          textAnchor="middle"
                          fontSize="11"
                          fontFamily="var(--font-mono)"
                          fill="var(--text-primary)"
                        >
                          {d}
                        </text>
                      </g>
                    );
                  })}
                </g>

                {/* 步骤间连接箭头（非最后一步） */}
                {!isLast && (
                  <line
                    x1={CX}
                    y1={y + STEP_H}
                    x2={CX}
                    y2={stepY(i + 1)}
                    stroke="var(--text-secondary)"
                    strokeWidth="2"
                    strokeDasharray="5 4"
                    markerEnd="url(#oss-arrow-down)"
                  />
                )}
              </g>
            );
          })}

          {/* 底部核心概念 */}
          <rect
            x={CX - 260}
            y={VIEW_H - 60}
            width={520}
            height={40}
            rx="8"
            fill="var(--accent)"
            fillOpacity="0.06"
            stroke="var(--accent)"
            strokeWidth="1.2"
            strokeOpacity="0.3"
          />
          <text
            x={CX}
            y={VIEW_H - 36}
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--accent)"
          >
            架构文档 = 导航地图，让陌生贡献者不需要问就能找到入口
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        OSS 贡献者旅程：好的架构文档是开源项目的导航地图——Issue 指引方向、文档定位入口、示例规范编码、设计原则评审。
      </figcaption>
    </figure>
  );
}
