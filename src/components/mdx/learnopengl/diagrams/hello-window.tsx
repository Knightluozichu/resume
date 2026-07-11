import type { ReactNode } from "react";

export { FrameStageDiagram } from "../../diagrams/frame-stage-diagram";
export { SetupPipelineDiagram } from "../../diagrams/setup-pipeline-diagram";

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
    title: "Specification",
    code: "OpenGL 3.3 core",
    detail: "定义命令结果，不负责窗口",
    color: accent,
  },
  {
    title: "Window + context",
    code: "GLFW",
    detail: "窗口、输入、current context",
    color: warning,
  },
  {
    title: "Function loading",
    code: "GLAD",
    detail: "按 context 装载函数地址",
    color: success,
  },
  {
    title: "Frame lifecycle",
    code: "viewport · clear · swap",
    detail: "事件、绘制、前后缓冲交换",
    color: danger,
  },
] as const;

export function HelloWindowContractDiagram({
  step = 0,
}: {
  step?: 0 | 1 | 2 | 3;
}) {
  const active =
    step === 1
      ? [1, 2]
      : step === 2
        ? [2, 3]
        : step === 3
          ? [3, 4]
          : [1, 2, 3, 4];
  return (
    <DiagramFrame caption="OpenGL 只规定图形 API 语义；GLFW 创建窗口与 current context，GLAD 在该 context 上加载函数，frame loop 再处理输入、viewport、clear、draw 与 buffer swap。">
      <svg
        viewBox="0 0 900 330"
        role="img"
        aria-label="OpenGL规范GLFW窗口上下文GLAD函数加载与帧循环契约"
        className="mx-auto hidden h-auto w-full max-w-[900px] md:block"
      >
        <text
          x="450"
          y="28"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={primary}
        >
          第一个窗口由四份契约组成
        </text>
        <text
          x="450"
          y="49"
          textAnchor="middle"
          fontSize="10.5"
          fill={secondary}
        >
          specification → window/context → function pointers → frame lifecycle
        </text>
        {stages.map((stage, index) => {
          const number = index + 1;
          const focused = active.includes(number);
          const x = 15 + index * 221;
          return (
            <g
              key={stage.title}
              opacity={focused ? 1 : 0.25}
              data-stage={number}
            >
              <rect
                x={x}
                y="76"
                width="205"
                height="180"
                rx="8"
                fill={stage.color}
                fillOpacity={focused ? 0.09 : 0.02}
                stroke={stage.color}
                strokeWidth={focused && active.length < 4 ? 2.5 : 1.2}
              />
              <circle cx={x + 26} cy="104" r="15" fill={stage.color} />
              <text
                x={x + 26}
                y="109"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill="var(--bg)"
              >
                {number}
              </text>
              <text
                x={x + 48}
                y="109"
                fontSize="11.2"
                fontWeight="700"
                fill={primary}
              >
                {stage.title}
              </text>
              <rect
                x={x + 12}
                y="133"
                width="181"
                height="38"
                rx="6"
                fill={elevated}
                stroke={border}
              />
              <text
                x={x + 102.5}
                y="156"
                textAnchor="middle"
                fontFamily="monospace"
                fontSize="9.2"
                fill={stage.color}
              >
                {stage.code}
              </text>
              <text x={x + 13} y="199" fontSize="9.5" fill={secondary}>
                职责
              </text>
              <text x={x + 13} y="221" fontSize="9.7" fill={primary}>
                {stage.detail}
              </text>
            </g>
          );
        })}
        {[210, 431, 652].map((x) => (
          <path
            key={x}
            d={`M${x} 165 H${x + 23} M${x + 15} 157 L${x + 24} 165 L${x + 15} 173`}
            fill="none"
            stroke={border}
            strokeWidth="2"
          />
        ))}
        <rect
          x="150"
          y="282"
          width="600"
          height="30"
          rx="6"
          fill={accent}
          fillOpacity="0.06"
          stroke={accent}
          strokeOpacity="0.45"
        />
        <text
          x="450"
          y="302"
          textAnchor="middle"
          fontSize="10.2"
          fill={primary}
        >
          失败要定位到具体边界：window、context current、loader、viewport 或
          frame loop
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <div className="text-center">
          <p className="text-sm font-semibold text-primary">
            第一个窗口由四份契约组成
          </p>
          <p className="mt-1 text-xs text-secondary">
            规范、上下文、函数加载、帧生命周期
          </p>
        </div>
        {stages.map((stage, index) => {
          const number = index + 1;
          const focused = active.includes(number);
          return (
            <div
              key={stage.title}
              className="rounded-control border bg-bg/40 p-3"
              style={{ borderColor: stage.color, opacity: focused ? 1 : 0.32 }}
            >
              <div className="flex items-start justify-between gap-3">
                <strong className="text-sm text-primary">
                  {number}. {stage.title}
                </strong>
                <span
                  className="font-mono text-[9px]"
                  style={{ color: stage.color }}
                >
                  {stage.code}
                </span>
              </div>
              <p className="mt-2 text-xs text-secondary">{stage.detail}</p>
            </div>
          );
        })}
      </div>
    </DiagramFrame>
  );
}
