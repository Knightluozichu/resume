/**
 * <AndroidStartupSequenceDiagram>：Android 系统启动全流程序列图。
 *
 * 展示 init → Zygote → SystemServer → Launcher 的启动链，
 * 每一步标注关键产出和里程碑。
 *
 * Server Component（纯展示，静态 SVG，无交互）。
 */

const STEPS = [
  {
    title: "① init 进程",
    sub: "kernel → init",
    y: 20,
    h: 44,
    color: "#7C5CFF",
    details: ["解析 init.rc", "启动 ServiceManager", "启动 Zygote"],
  },
  {
    title: "② Zygote 进程",
    sub: "fork + preload",
    y: 72,
    h: 44,
    color: "#3FB97F",
    details: ["预加载系统类和资源", "创建 ART 虚拟机实例", "注册 Socket 等待 fork 请求"],
  },
  {
    title: "③ SystemServer",
    sub: "fork from Zygote",
    y: 124,
    h: 56,
    color: "#E5B567",
    details: [
      "启动 AMS / WMS / PMS 等系统服务",
      "加载系统服务到 ServiceManager",
      "系统就绪，通知 AMS 启动 Home",
    ],
  },
  {
    title: "④ Launcher 启动",
    sub: "AMS → startHome",
    y: 188,
    h: 44,
    color: "#E5675C",
    details: ["AMS 发送 Intent 启动 Launcher", "Launcher 显示桌面", "系统启动完成 ✓"],
  },
];

export function AndroidStartupSequenceDiagram() {
  const arrowX = 48;

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 680 260"
          role="img"
          aria-label="Android 系统启动全流程：init → Zygote → SystemServer → Launcher，共四步"
          className="mx-auto block h-auto w-full max-w-[680px]"
        >
          {STEPS.map((step, i) => (
            <g key={step.title}>
              {/* 步骤节点圆圈 + 线条 */}
              <circle
                cx={arrowX}
                cy={step.y + step.h / 2}
                r="10"
                fill="var(--bg)"
                stroke={step.color}
                strokeWidth="2.5"
              />
              <text
                x={arrowX}
                y={step.y + step.h / 2 + 5}
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill={step.color}
              >
                {i + 1}
              </text>

              {/* 步骤连接线（向下） */}
              {i < STEPS.length - 1 && (
                <line
                  x1={arrowX}
                  y1={step.y + step.h / 2 + 10}
                  x2={arrowX}
                  y2={STEPS[i + 1].y + STEPS[i + 1].h / 2 - 10}
                  stroke={step.color}
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                />
              )}

              {/* 步骤标题卡片 */}
              <rect
                x={arrowX + 24}
                y={step.y}
                width="200"
                height={step.h}
                rx="6"
                fill={step.color}
                fillOpacity="0.08"
                stroke={step.color}
                strokeWidth="1.2"
              />
              <text
                x={arrowX + 38}
                y={step.y + 18}
                fontSize="13"
                fontWeight="600"
                fill={step.color}
              >
                {step.title}
              </text>
              <text
                x={arrowX + 38}
                y={step.y + 32}
                fontSize="10"
                fill="var(--text-secondary)"
              >
                {step.sub}
              </text>

              {/* 详情列表 */}
              {step.details.map((d, j) => (
                <text
                  key={d}
                  x={arrowX + 240}
                  y={step.y + 16 + j * 16}
                  fontSize="11"
                  fill="var(--text-primary)"
                >
                  · {d}
                </text>
              ))}

              {/* 分隔线 */}
              {i < STEPS.length - 1 && (
                <line
                  x1={arrowX + 24}
                  y1={step.y + step.h + 1}
                  x2={620}
                  y2={step.y + step.h + 1}
                  stroke="var(--border)"
                  strokeWidth="0.8"
                  strokeDasharray="8 4"
                />
              )}
            </g>
          ))}

          {/* 底部说明 */}
          <text x="16" y="250" fontSize="11" fill="var(--text-secondary)">
            Android 启动全链路：BootLoader → Kernel → init → Zygote → SystemServer → Launcher（桌面）
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        Android 系统启动从按下电源键到看到桌面的完整历程。每一步产出一个关键进程，
        下一步依赖上一步的成果——整个链路任何一步挂掉，你都看不到桌面。
      </figcaption>
    </figure>
  );
}
