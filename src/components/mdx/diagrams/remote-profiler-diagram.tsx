/**
 * <RemoteProfilerDiagram step={0|1|2}>：移动端远程 Profiler 连接流程。
 *
 * step=0：全览 Android + iOS 两条链路
 * step=1：Android（USB ADB 或 WiFi 连接）
 * step=2：iOS（USB 连接 Mac + Xcode）
 */

type RemoteStep = 0 | 1 | 2;

interface Props {
  step?: RemoteStep;
}

export function RemoteProfilerDiagram({ step }: Props) {
  const isActive = (idx: number) =>
    step === undefined || step === 0 || step - 1 === idx;

  const boxStroke = (idx: number) =>
    isActive(idx) ? "var(--accent)" : "var(--border)";
  const boxBg = (idx: number) =>
    isActive(idx) ? "var(--bg-elevated)" : "var(--bg)";
  const textFill = (idx: number) =>
    isActive(idx) ? "var(--text-primary)" : "var(--text-secondary)";

  const bottomHints: Record<number | "all", string> = {
    all: "Android 用 ADB USB/WiFi + Development Build 连 Profiler；iOS 用 USB Mac + Xcode Ensure network discoverability",
    1: "Android：USB 插入 → adb forward tcp:55000 tcp:55000 → Profiler 窗口选 AndroidPlayer → 数据开始传输",
    2: "iOS：USB 连 Mac → Xcode 打开 Devices 窗口 → 勾选确保可发现 → Profiler 窗口选 iOSPlayer → 连上",
  };

  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <svg
          viewBox="0 0 640 230"
          role="img"
          aria-label="移动端远程 Profiler 连接：Android ADB 或 iOS USB 连接到 Editor Profiler"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          {/* Title */}
          <text
            x="320"
            y="22"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            移动端远程 Profiler 连接
          </text>

          {/* Editor box (center top) */}
          <rect
            x="220"
            y="38"
            width="200"
            height="52"
            rx="8"
            fill="var(--bg)"
            stroke="var(--accent)"
            strokeWidth="2"
          />
          <text
            x="320"
            y="58"
            textAnchor="middle"
            fontSize="13"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            Unity Editor
          </text>
          <text
            x="320"
            y="76"
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            Window → Analysis → Profiler
          </text>

          {/* Android column */}
          <g opacity={isActive(0) ? 1 : 0.35}>
            {/* Android box */}
            <rect
              x="60"
              y="110"
              width="240"
              height="100"
              rx="8"
              fill={boxBg(0)}
              stroke={boxStroke(0)}
              strokeWidth={isActive(0) ? 2.5 : 1.5}
            />
            <text
              x="180"
              y="130"
              textAnchor="middle"
              fontSize="13"
              fontWeight="600"
              fill={textFill(0)}
            >
              Android 设备
            </text>
            <text
              x="180"
              y="148"
              textAnchor="middle"
              fontSize="10"
              fill="var(--text-secondary)"
            >
              Development Build + Autoconnect
            </text>
            {/* ADB box */}
            <rect
              x="80"
              y="158"
              width="200"
              height="40"
              rx="6"
              fill="var(--bg-elevated)"
              stroke="var(--border)"
              strokeWidth="1"
            />
            <text
              x="180"
              y="174"
              textAnchor="middle"
              fontSize="10"
              fill="var(--text-secondary)"
            >
              USB ADB: adb forward tcp:55000
            </text>
            <text
              x="180"
              y="188"
              textAnchor="middle"
              fontSize="10"
              fill="var(--text-secondary)"
            >
              或 WiFi: 同网段直接输 IP
            </text>
          </g>

          {/* iOS column */}
          <g opacity={isActive(1) ? 1 : 0.35}>
            {/* iOS box */}
            <rect
              x="340"
              y="110"
              width="240"
              height="100"
              rx="8"
              fill={boxBg(1)}
              stroke={boxStroke(1)}
              strokeWidth={isActive(1) ? 2.5 : 1.5}
            />
            <text
              x="460"
              y="130"
              textAnchor="middle"
              fontSize="13"
              fontWeight="600"
              fill={textFill(1)}
            >
              iOS 设备
            </text>
            <text
              x="460"
              y="150"
              textAnchor="middle"
              fontSize="10"
              fill="var(--text-secondary)"
            >
              Development Build 导出 Xcode 工程
            </text>
            {/* Xcode box */}
            <rect
              x="360"
              y="160"
              width="200"
              height="40"
              rx="6"
              fill="var(--bg-elevated)"
              stroke="var(--border)"
              strokeWidth="1"
            />
            <text
              x="460"
              y="176"
              textAnchor="middle"
              fontSize="10"
              fill="var(--text-secondary)"
            >
              Xcode 打开 Devices → 确保可发现
            </text>
            <text
              x="460"
              y="192"
              textAnchor="middle"
              fontSize="10"
              fill="var(--text-secondary)"
            >
              USB 连 Mac → Profiler 自动发现
            </text>
          </g>

          {/* Connection arrows from Editor to devices */}
          {/* Editor → Android */}
          <line
            x1="270"
            y1="90"
            x2="180"
            y2="110"
            stroke={isActive(0) ? "var(--accent)" : "var(--border)"}
            strokeWidth="2"
            opacity={isActive(0) ? 1 : 0.4}
          />
          <path
            d="M180 110 l5 -10 l-8 -5 z"
            fill={isActive(0) ? "var(--accent)" : "var(--border)"}
            opacity={isActive(0) ? 1 : 0.4}
          />
          <text
            x="205"
            y="104"
            fontSize="8"
            fill="var(--text-secondary)"
            opacity={isActive(0) ? 1 : 0.4}
          >
            ADB
          </text>

          {/* Editor → iOS */}
          <line
            x1="370"
            y1="90"
            x2="460"
            y2="110"
            stroke={isActive(1) ? "var(--accent)" : "var(--border)"}
            strokeWidth="2"
            opacity={isActive(1) ? 1 : 0.4}
          />
          <path
            d="M460 110 l5 -10 l-8 -5 z"
            fill={isActive(1) ? "var(--accent)" : "var(--border)"}
            opacity={isActive(1) ? 1 : 0.4}
          />
          <text
            x="425"
            y="102"
            fontSize="8"
            fill="var(--text-secondary)"
            opacity={isActive(1) ? 1 : 0.4}
          >
            USB
          </text>

          {/* Bottom hint */}
          <text
            x="320"
            y="222"
            textAnchor="middle"
            fontSize="11"
            fill={
              step === undefined
                ? "var(--text-secondary)"
                : "var(--text-primary)"
            }
          >
            {step === undefined
              ? bottomHints.all
              : bottomHints[step]}
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        Android 走 ADB（USB 端口转发或 WiFi 同网段直连），iOS 必须通过 Mac 的 Xcode
        才能发现设备。两台设备不能同时在同一个 Profiler 窗口连接。
      </figcaption>
    </figure>
  );
}
