/**
 * <RemoteProfilerDiagram>：Ch7 平台专项 Profiling §3「Unity Profiler 远程连接」核心图示。
 *
 * 展示 PC 端 Unity Editor 通过 ADB（Android）或 Xcode（iOS）远程连接到移动设备
 * 跑 Profiler 的完整流程。左右两路并行：左路 Android（ADB over USB）、右路 iOS
 * （Xcode over USB），每路标注关键步骤和常见故障点。
 *
 * Server Component（纯展示，静态 SVG，无交互、无 three、reduced-motion 无关）。
 * 视觉语言与既有 diagram 一致：token 色（var(--accent)/--success/--warning/--danger/
 * --bg/--bg-elevated/--border/--text-primary/--text-secondary），无阴影、无裸 hex（硬规则 5）。
 */
export function RemoteProfilerDiagram() {
  return (
    <figure className="mdx-figure mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated">
        <svg
          viewBox="0 0 640 370"
          role="img"
          aria-label="Unity Profiler 远程连接移动设备示意图。左侧 Android 路径：PC 上 Unity Editor 通过 ADB 经过 USB 线连接到 Android 手机，步骤包括打开 Development Build、ADB devices 确认、USB 调试开启、Build and Run 后自动连接。标注常见故障——USB 线不支持数据、没开 Development Build、ADB 未授权。右侧 iOS 路径：PC 上的 Unity Editor 先导出 Xcode 工程，Xcode 再经过 USB 连接 iPhone，步骤包括勾选 Development Build、Build Settings 设 Device SDK、Xcode 打开 xcodeproj、用 USB 连手机后 Build and Run。标注常见故障——Xcode 未信任证书、手机未解锁。底部总结：移动端必须实机验证，PC Profiler 数据不能替代。"
          className="mx-auto block h-auto w-full max-w-[640px]"
        >
          <defs>
            <marker
              id="rp-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--accent)" />
            </marker>
          </defs>

          {/* ==== 标题行 ==== */}
          <text
            x="200"
            y="28"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            Android 路径
          </text>
          <line
            x1="318"
            y1="10"
            x2="318"
            y2="355"
            stroke="var(--border)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <text
            x="440"
            y="28"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            iOS 路径
          </text>

          {/* ==== PC 端 ==== */}
          <rect
            x="60"
            y="46"
            width="256"
            height="40"
            rx="8"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <text
            x="188"
            y="70"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            Unity Editor (PC)
          </text>

          {/* —— Android 流 —— */}
          {/* ADB */}
          <rect
            x="100"
            y="110"
            width="176"
            height="36"
            rx="6"
            fill="var(--bg-elevated)"
            stroke="var(--accent)"
            strokeWidth="1.2"
          />
          <text
            x="188"
            y="126"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            ADB over USB
          </text>
          <text
            x="188"
            y="140"
            textAnchor="middle"
            fontSize="8"
            fill="var(--text-secondary)"
          >
            adb devices
          </text>

          {/* 箭头 PC→ADB */}
          <line
            x1="188"
            y1="86"
            x2="188"
            y2="108"
            stroke="var(--accent)"
            strokeWidth="2"
            markerEnd="url(#rp-arrow)"
          />

          {/* 箭头 ADB→Device */}
          <line
            x1="188"
            y1="146"
            x2="188"
            y2="170"
            stroke="var(--accent)"
            strokeWidth="2"
            markerEnd="url(#rp-arrow)"
          />

          {/* Android 设备 */}
          <rect
            x="104"
            y="172"
            width="168"
            height="66"
            rx="8"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <text
            x="188"
            y="196"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            Android 设备
          </text>
          <text
            x="188"
            y="214"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            USB 调试 + Dev Build
          </text>
          <text
            x="188"
            y="228"
            textAnchor="middle"
            fontSize="9"
            fill="var(--accent)"
          >
            Auto-connect Profiler
          </text>

          {/* 故障标注 (Android) */}
          <rect
            x="60"
            y="256"
            width="256"
            height="90"
            rx="6"
            fill="var(--bg)"
            stroke="var(--warning)"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          <text
            x="188"
            y="276"
            textAnchor="middle"
            fontSize="9"
            fontWeight="600"
            fill="var(--warning)"
          >
            常见故障
          </text>
          {[
            "USB 线不支持数据传输",
            "没开 Development Build",
            "ADB 未授权（手机弹窗拒了）",
          ].map((t, i) => (
            <text
              key={i}
              x="188"
              y={294 + i * 14}
              textAnchor="middle"
              fontSize="8.5"
              fill="var(--text-secondary)"
            >
              {i + 1}. {t}
            </text>
          ))}

          {/* ==== iOS 流 ==== */}
          {/* Unity → Xcode */}
          <rect
            x="362"
            y="46"
            width="256"
            height="40"
            rx="8"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <text
            x="490"
            y="70"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            Unity Editor → 导出 Xcode 工程
          </text>

          {/* 箭头 */}
          <line
            x1="490"
            y1="86"
            x2="490"
            y2="108"
            stroke="var(--accent)"
            strokeWidth="2"
            markerEnd="url(#rp-arrow)"
          />

          {/* Xcode */}
          <rect
            x="400"
            y="110"
            width="180"
            height="36"
            rx="6"
            fill="var(--bg-elevated)"
            stroke="var(--accent)"
            strokeWidth="1.2"
          />
          <text
            x="490"
            y="126"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            Xcode over USB
          </text>
          <text
            x="490"
            y="140"
            textAnchor="middle"
            fontSize="8"
            fill="var(--text-secondary)"
          >
            Device SDK + 签名证书
          </text>

          {/* 箭头 Xcode→Device */}
          <line
            x1="490"
            y1="146"
            x2="490"
            y2="170"
            stroke="var(--accent)"
            strokeWidth="2"
            markerEnd="url(#rp-arrow)"
          />

          {/* iOS 设备 */}
          <rect
            x="410"
            y="172"
            width="160"
            height="66"
            rx="8"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />
          <text
            x="490"
            y="196"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            iOS 设备
          </text>
          <text
            x="490"
            y="214"
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-secondary)"
          >
            ⁨亮屏⁩ + ⁨已解锁⁩ + ⁨已信任⁩
          </text>
          <text
            x="490"
            y="228"
            textAnchor="middle"
            fontSize="9"
            fill="var(--accent)"
          >
            Build & Run
          </text>

          {/* 故障标注 (iOS) */}
          <rect
            x="362"
            y="256"
            width="256"
            height="90"
            rx="6"
            fill="var(--bg)"
            stroke="var(--danger)"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          <text
            x="490"
            y="276"
            textAnchor="middle"
            fontSize="9"
            fontWeight="600"
            fill="var(--danger)"
          >
            常见故障
          </text>
          {[
            "Xcode 未信任开发者证书",
            "iPhone 未解锁/黑屏",
            "Profiler 列表不显示设备",
          ].map((t, i) => (
            <text
              key={i}
              x="490"
              y={294 + i * 14}
              textAnchor="middle"
              fontSize="8.5"
              fill="var(--text-secondary)"
            >
              {i + 1}. {t}
            </text>
          ))}

          {/* 底部总结 */}
          <text
            x="320"
            y="365"
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            移动端必须实机验证——PC Profiler 的数据不能替代手机上测的数据
          </text>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-xs text-secondary">
        Android 通过 <strong>ADB + USB 调试 + Development Build</strong>，
        iOS 通过 <strong>Xcode 中转</strong>。两端都需要 Development Build，且
        PC 端 Profiler 必须手动点击录制按钮才会捕获数据。
      </figcaption>
    </figure>
  );
}
