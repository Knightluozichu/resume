"use client";

/**
 * <ScriptingBackendDiagram>：辅图（静态对照）——「Mono vs IL2CPP 两种脚本后端」（HEL-290）。
 *
 * 左右两栏对照各自的编译流程与取舍：
 *  - 左栏 Mono：C# → IL → 运行时执行（JIT/解释）。构建快、迭代快；部分平台不支持。
 *  - 右栏 IL2CPP：C# → IL → C++ → 原生机器码。构建慢、性能/兼容好；iOS/WebGL 等必需。
 *
 * 纯静态展示组件（无 anime、无交互），与本章其它图统一外观（卡片 + figcaption）。
 * 无 Math 算坐标（全整数常量）。视觉：全部 DESIGN token；无裸 hex（硬规则 5）。
 * 所有 <text> 距 viewBox 任意边 ≥20px（底部基线离底边 ≥20px）。
 */

const VIEW_W = 736;
// VIEW_H=380：最低内容是底部取舍行基线 356，下留 24px。纵向利用率 ~88%。
const VIEW_H = 380;

// 两栏。
const COL_W = 332;
const LEFT_X = 24;
const RIGHT_X = VIEW_W - 24 - COL_W; // 右缘距边 24px
const COL_TOP = 72;
const COL_H = 284;

// 流程步骤盒（每栏内纵向排）。
const STEP_W = 188;
const STEP_H = 36;
const STEP_GAP = 18;
const STEP_TOP = COL_TOP + 56;
// 单一行内 y 公式：top + i*(h+gap)。
const stepY = (i: number) => STEP_TOP + i * (STEP_H + STEP_GAP);

// IL2CPP 四步盒：更矮 + 更小间隙，塞进同一栏高度。
const STEP4_H = 30;
const STEP4_GAP = 16;
const STEP4_TOP = COL_TOP + 50;
const stepY4 = (i: number) => STEP4_TOP + i * (STEP4_H + STEP4_GAP);

// Mono 三步 / IL2CPP 四步。
const MONO_STEPS = ["C# 源码", "IL（中间语言）", "运行时执行（JIT）"];
const IL2CPP_STEPS = [
  "C# 源码",
  "IL（中间语言）",
  "转成 C++ 源码",
  "编成原生机器码",
];

export function ScriptingBackendDiagram() {
  const leftCx = LEFT_X + COL_W / 2;
  const rightCx = RIGHT_X + COL_W / 2;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-6">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Mono 和 IL2CPP 两种脚本后端的对照图，左右两栏。左栏 Mono：C# 源码先编成 IL 中间语言，再交给运行时用 JIT 执行；构建快、迭代快，但部分平台不支持。右栏 IL2CPP：C# 源码先编成 IL，再把 IL 转成 C++ 源码，最后编成原生机器码；构建慢，但性能和兼容更好，iOS、WebGL 等平台必需用它。两栏底部分别标注各自的取舍：Mono 适合开发期快速迭代，IL2CPP 适合发布、尤其是必需的平台。"
          className="mx-auto block h-auto w-full max-w-[736px]"
        >
          {/* ===== 主标题 ===== */}
          <text
            x={VIEW_W / 2}
            y={28}
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            脚本后端：Mono vs IL2CPP（Player Settings 里选）
          </text>
          <text
            x={VIEW_W / 2}
            y={50}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
          >
            同一份 C#，两条「编译落地」路线——一条快、一条更原生
          </text>

          {/* ===== 左栏底框 Mono ===== */}
          <rect
            x={LEFT_X}
            y={COL_TOP}
            width={COL_W}
            height={COL_H}
            rx="12"
            fill="var(--accent)"
            fillOpacity="0.05"
            stroke="var(--accent)"
            strokeWidth="1.8"
          />
          <text
            x={leftCx}
            y={COL_TOP + 28}
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="var(--accent)"
          >
            Mono
          </text>

          {/* 左栏流程步骤 + 步间箭头 */}
          {MONO_STEPS.map((label, i) => (
            <g key={`mono-${i}`}>
              {i > 0 && (
                <line
                  x1={leftCx}
                  y1={stepY(i - 1) + STEP_H}
                  x2={leftCx}
                  y2={stepY(i)}
                  stroke="var(--accent)"
                  strokeWidth="1.6"
                  markerEnd="url(#sb-arrow-accent)"
                />
              )}
              <rect
                x={leftCx - STEP_W / 2}
                y={stepY(i)}
                width={STEP_W}
                height={STEP_H}
                rx="8"
                fill="var(--bg)"
                stroke="var(--border)"
                strokeWidth="1.4"
              />
              <text
                x={leftCx}
                y={stepY(i) + 23}
                textAnchor="middle"
                fontSize="11"
                fontFamily={i === 0 ? "var(--font-mono)" : undefined}
                fontWeight="700"
                fill="var(--text-primary)"
              >
                {label}
              </text>
            </g>
          ))}
          {/* 左栏取舍 */}
          <text
            x={leftCx}
            y={COL_TOP + COL_H - 30}
            textAnchor="middle"
            fontSize="10"
            fontWeight="700"
            fill="var(--success)"
          >
            构建快 · 迭代快（开发期默认）
          </text>
          <text
            x={leftCx}
            y={COL_TOP + COL_H - 12}
            textAnchor="middle"
            fontSize="9.5"
            fill="var(--warning)"
          >
            部分平台不支持（iOS / WebGL 用不了）
          </text>

          {/* ===== 右栏底框 IL2CPP ===== */}
          <rect
            x={RIGHT_X}
            y={COL_TOP}
            width={COL_W}
            height={COL_H}
            rx="12"
            fill="var(--success)"
            fillOpacity="0.05"
            stroke="var(--success)"
            strokeWidth="1.8"
          />
          <text
            x={rightCx}
            y={COL_TOP + 28}
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill="var(--success)"
          >
            IL2CPP
          </text>

          {/* 右栏流程步骤（四步，盒更矮以塞下） */}
          {IL2CPP_STEPS.map((label, i) => (
            <g key={`il2cpp-${i}`}>
              {i > 0 && (
                <line
                  x1={rightCx}
                  y1={stepY4(i - 1) + STEP4_H}
                  x2={rightCx}
                  y2={stepY4(i)}
                  stroke="var(--success)"
                  strokeWidth="1.6"
                  markerEnd="url(#sb-arrow-success)"
                />
              )}
              <rect
                x={rightCx - STEP_W / 2}
                y={stepY4(i)}
                width={STEP_W}
                height={STEP4_H}
                rx="7"
                fill="var(--bg)"
                stroke="var(--border)"
                strokeWidth="1.4"
              />
              <text
                x={rightCx}
                y={stepY4(i) + 19}
                textAnchor="middle"
                fontSize="10.5"
                fontFamily={i === 0 ? "var(--font-mono)" : undefined}
                fontWeight="700"
                fill="var(--text-primary)"
              >
                {label}
              </text>
            </g>
          ))}
          {/* 右栏取舍 */}
          <text
            x={rightCx}
            y={COL_TOP + COL_H - 30}
            textAnchor="middle"
            fontSize="10"
            fontWeight="700"
            fill="var(--success)"
          >
            性能 / 兼容更好（发布优选）
          </text>
          <text
            x={rightCx}
            y={COL_TOP + COL_H - 12}
            textAnchor="middle"
            fontSize="9.5"
            fill="var(--warning)"
          >
            构建更慢 · iOS / WebGL 等必需
          </text>

          <defs>
            <marker
              id="sb-arrow-accent"
              markerWidth="9"
              markerHeight="9"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
            </marker>
            <marker
              id="sb-arrow-success"
              markerWidth="9"
              markerHeight="9"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--success)" />
            </marker>
          </defs>
        </svg>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        **Mono**（`C# → IL →
        运行时执行`）构建快、迭代快，部分平台不支持；**IL2CPP**（`C# → IL → C++
        → 原生机器码`）构建更慢，但性能 / 兼容更好，iOS / WebGL 等平台必需。在
        Player Settings 的 Scripting Backend 里选。
      </figcaption>
    </figure>
  );
}
