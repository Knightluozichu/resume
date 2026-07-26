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

const vertexStages = [
  {
    number: 1,
    title: "取顶点与实例",
    code: "VAO + draw parameters",
    output: "attributes、VertexID、InstanceID",
    color: accent,
  },
  {
    number: 2,
    title: "顶点 shader",
    code: "P · V · M · p",
    output: "gl_Position + stage outputs",
    color: warning,
  },
  {
    number: 3,
    title: "保存或装配",
    code: "TF capture / primitives",
    output: "可选保存，或继续图元处理",
    color: success,
  },
  {
    number: 4,
    title: "裁剪到窗口",
    code: "clip → NDC → viewport",
    output: "窗口坐标与深度范围",
    color: danger,
  },
] as const;

export function GlsVertexProcessingDiagram({
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
    <DiagramFrame caption="绘制参数决定顶点 shader 的调用序列；shader 输出可被 transform feedback 保存，也可继续经过装配、裁剪和视口变换。">
      <svg
        viewBox="0 0 900 330"
        role="img"
        aria-label="顶点从绘制命令取数、顶点着色、可选变换反馈到裁剪和视口的完整处理链"
        className="mx-auto hidden h-auto w-full max-w-[900px] md:block"
      >
        <text
          x="450"
          y="29"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={primary}
        >
          顶点处理不只是一条 MVP 乘法
        </text>
        <text x="450" y="50" textAnchor="middle" fontSize="11" fill={secondary}>
          draw 定义调用域，shader 定义变换，固定阶段定义可见范围
        </text>
        {vertexStages.map((stage, index) => {
          const focused = active.includes(stage.number);
          const x = 15 + index * 221;
          return (
            <g key={stage.title} opacity={focused ? 1 : 0.25}>
              <rect
                x={x}
                y="75"
                width="205"
                height="180"
                rx="8"
                fill={stage.color}
                fillOpacity={focused ? 0.09 : 0.02}
                stroke={stage.color}
                strokeWidth={step !== 0 && focused ? 2.5 : 1.2}
              />
              <circle cx={x + 27} cy="103" r="15" fill={stage.color} />
              <text
                x={x + 27}
                y="108"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill="var(--bg)"
              >
                {stage.number}
              </text>
              <text
                x={x + 50}
                y="108"
                fontSize="12.2"
                fontWeight="700"
                fill={primary}
              >
                {stage.title}
              </text>
              <rect
                x={x + 12}
                y="132"
                width="181"
                height="38"
                rx="6"
                fill={elevated}
                stroke={border}
              />
              <text
                x={x + 102.5}
                y="155"
                textAnchor="middle"
                fontFamily="monospace"
                fontSize="11"
                fill={stage.color}
              >
                {stage.code}
              </text>
              <text x={x + 13} y="201" fontSize="11" fill={secondary}>
                结果
              </text>
              <text x={x + 13} y="222" fontSize="11" fill={primary}>
                {stage.output}
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
          x="210"
          y="283"
          width="480"
          height="29"
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
          fontSize="11"
          fill={primary}
        >
          关键证据：调用参数、内建 ID、裁剪坐标、捕获字节数与窗口映射
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <p className="text-center text-sm font-semibold text-primary">
          顶点处理完整链
        </p>
        {vertexStages.map((stage) => {
          const focused = active.includes(stage.number);
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
                  className="text-right font-mono text-[9px]"
                  style={{ color: stage.color }}
                >
                  {stage.code}
                </span>
              </div>
              <p className="mt-2 text-xs text-secondary">{stage.output}</p>
            </div>
          );
        })}
      </div>
    </DiagramFrame>
  );
}

const transformRows = [
  ["点", "(x, y, z, 1)", "受旋转、缩放和平移", accent],
  ["方向", "(x, y, z, 0)", "不受平移", warning],
  ["法线", "(M⁻¹)ᵀ n", "保持与切线垂直", success],
  ["相机", "V = C⁻¹", "把世界变到 eye space", danger],
] as const;

export function GlsMathTransformDiagram() {
  return (
    <DiagramFrame caption="齐次坐标区分点与方向；非均匀缩放下，法线使用模型矩阵线性部分的逆转置。">
      <svg
        viewBox="0 0 860 330"
        role="img"
        aria-label="点方向法线和相机矩阵在三维变换中的不同规则"
        className="mx-auto hidden h-auto w-full max-w-[860px] md:block"
      >
        <text
          x="430"
          y="28"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={primary}
        >
          同一矩阵，对象语义不同
        </text>
        <text x="28" y="67" fontSize="11" fill={secondary}>
          对象
        </text>
        <text x="165" y="67" fontSize="11" fill={secondary}>
          表达
        </text>
        <text x="450" y="67" fontSize="11" fill={secondary}>
          正确效果
        </text>
        {transformRows.map((row, index) => {
          const y = 82 + index * 49;
          return (
            <g key={row[0]}>
              <rect
                x="20"
                y={y}
                width="820"
                height="37"
                rx="6"
                fill={index % 2 === 0 ? "var(--bg)" : elevated}
                stroke={border}
              />
              <circle cx="41" cy={y + 18.5} r="7" fill={row[3]} />
              <text
                x="57"
                y={y + 23}
                fontSize="11"
                fontWeight="700"
                fill={primary}
              >
                {row[0]}
              </text>
              <text
                x="165"
                y={y + 23}
                fontFamily="monospace"
                fontSize="11"
                fill={row[3]}
              >
                {row[1]}
              </text>
              <text x="450" y={y + 23} fontSize="11" fill={primary}>
                {row[2]}
              </text>
            </g>
          );
        })}
        <rect
          x="145"
          y="290"
          width="570"
          height="27"
          rx="6"
          fill={accent}
          fillOpacity="0.06"
          stroke={accent}
          strokeOpacity="0.45"
        />
        <text
          x="430"
          y="308"
          textAnchor="middle"
          fontSize="11"
          fill={primary}
        >
          列向量约定：p_clip = P · V · M · p_local，最右侧先作用
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <p className="text-center text-sm font-semibold text-primary">
          点、方向、法线、相机
        </p>
        {transformRows.map((row) => (
          <div
            key={row[0]}
            className="rounded-control border p-3"
            style={{ borderColor: row[3] }}
          >
            <div className="flex items-center justify-between gap-3">
              <strong className="text-sm text-primary">{row[0]}</strong>
              <span className="font-mono text-[10px]" style={{ color: row[3] }}>
                {row[1]}
              </span>
            </div>
            <p className="mt-2 text-xs text-secondary">{row[2]}</p>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}

const curveRows = [
  ["线性插值", "(1−t)p₀ + tp₁", "两点之间"],
  ["三次 Bézier", "Σ Bᵢ³(t)pᵢ", "四个控制点"],
  ["样条", "分段多项式 + 连续性", "可扩展长曲线"],
] as const;

export function GlsInterpolationCurveDiagram() {
  return (
    <DiagramFrame caption="插值是属性与动画的共同语言；Bézier 和样条用控制点与基函数把离散数据扩展成连续曲线。">
      <svg
        viewBox="0 0 860 320"
        role="img"
        aria-label="从线性插值到三次贝塞尔曲线和分段样条的数学关系"
        className="mx-auto hidden h-auto w-full max-w-[860px] md:block"
      >
        <text
          x="430"
          y="28"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={primary}
        >
          从两个端点到连续曲线
        </text>
        {curveRows.map((row, index) => {
          const x = 28 + index * 278;
          const color = [accent, warning, success][index];
          return (
            <g key={row[0]}>
              <rect
                x={x}
                y="66"
                width="248"
                height="164"
                rx="8"
                fill={color}
                fillOpacity="0.08"
                stroke={color}
              />
              <text
                x={x + 124}
                y="98"
                textAnchor="middle"
                fontSize="12.5"
                fontWeight="700"
                fill={primary}
              >
                {row[0]}
              </text>
              <rect
                x={x + 15}
                y="119"
                width="218"
                height="40"
                rx="6"
                fill={elevated}
                stroke={border}
              />
              <text
                x={x + 124}
                y="144"
                textAnchor="middle"
                fontFamily="monospace"
                fontSize="11"
                fill={color}
              >
                {row[1]}
              </text>
              <text
                x={x + 124}
                y="188"
                textAnchor="middle"
                fontSize="11"
                fill={secondary}
              >
                {row[2]}
              </text>
            </g>
          );
        })}
        <path
          d="M80 279 C185 232 240 312 330 266 S520 240 595 275 S735 295 790 250"
          fill="none"
          stroke={accent}
          strokeWidth="3"
        />
        {[80, 330, 595, 790].map((x, index) => (
          <circle
            key={x}
            cx={x}
            cy={[279, 266, 275, 250][index]}
            r="5"
            fill={warning}
          />
        ))}
      </svg>
      <div className="grid gap-3 md:hidden">
        <p className="text-center text-sm font-semibold text-primary">
          插值、曲线与样条
        </p>
        {curveRows.map((row, index) => (
          <div
            key={row[0]}
            className="rounded-control border border-border p-3"
          >
            <strong className="text-sm text-primary">{row[0]}</strong>
            <p
              className="mt-1 break-words font-mono text-[11px]"
              style={{ color: [accent, warning, success][index] }}
            >
              {row[1]}
            </p>
            <p className="mt-1 text-xs text-secondary">{row[2]}</p>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}

const drawRows = [
  ["Arrays", "first + count", "无 index buffer", "glDrawArrays"],
  ["Elements", "count + type + offset", "EBO 索引复用", "glDrawElements"],
  [
    "Instanced",
    "instance count + divisor",
    "复用网格，多组实例数据",
    "glDraw*Instanced",
  ],
  [
    "Indirect / Multi",
    "command buffer",
    "GPU/批量提供参数",
    "glMultiDraw*Indirect",
  ],
] as const;

export function GlsDrawCommandDiagram() {
  return (
    <DiagramFrame caption="选择绘制命令时先回答：顶点是否索引、是否实例化、参数来自 CPU 还是 indirect buffer、一次提交包含几个 draw。">
      <svg
        viewBox="0 0 900 350"
        role="img"
        aria-label="OpenGL 数组索引实例化和间接多绘制命令的参数与使用场景矩阵"
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
          绘制命令是顶点调用域的描述
        </text>
        <text x="28" y="67" fontSize="11" fill={secondary}>
          家族
        </text>
        <text x="170" y="67" fontSize="11" fill={secondary}>
          核心参数
        </text>
        <text x="405" y="67" fontSize="11" fill={secondary}>
          语义
        </text>
        <text x="690" y="67" fontSize="11" fill={secondary}>
          代表 API
        </text>
        {drawRows.map((row, index) => {
          const y = 81 + index * 53;
          const color = [accent, warning, success, danger][index];
          return (
            <g key={row[0]}>
              <rect
                x="20"
                y={y}
                width="860"
                height="41"
                rx="6"
                fill={index % 2 === 0 ? "var(--bg)" : elevated}
                stroke={border}
              />
              <circle cx="41" cy={y + 20} r="7" fill={color} />
              <text
                x="57"
                y={y + 25}
                fontSize="11"
                fontWeight="700"
                fill={primary}
              >
                {row[0]}
              </text>
              <text
                x="170"
                y={y + 25}
                fontFamily="monospace"
                fontSize="11"
                fill={color}
              >
                {row[1]}
              </text>
              <text x="405" y={y + 25} fontSize="11" fill={primary}>
                {row[2]}
              </text>
              <text
                x="690"
                y={y + 25}
                fontFamily="monospace"
                fontSize="11"
                fill={secondary}
              >
                {row[3]}
              </text>
            </g>
          );
        })}
        <rect
          x="120"
          y="309"
          width="660"
          height="25"
          rx="5"
          fill={warning}
          fillOpacity="0.08"
          stroke={warning}
          strokeOpacity="0.5"
        />
        <text x="450" y="326" textAnchor="middle" fontSize="11" fill={primary}>
          VAO 提供取数格式；draw 参数提供序列范围、实例数和 base 偏移
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <p className="text-center text-sm font-semibold text-primary">
          绘制命令选择矩阵
        </p>
        {drawRows.map((row, index) => (
          <div
            key={row[0]}
            className="rounded-control border border-border p-3"
          >
            <div className="flex items-center justify-between gap-3">
              <strong className="text-sm text-primary">{row[0]}</strong>
              <span
                className="text-right font-mono text-[9px]"
                style={{ color: [accent, warning, success, danger][index] }}
              >
                {row[3]}
              </span>
            </div>
            <p className="mt-2 font-mono text-[10px] text-primary">{row[1]}</p>
            <p className="mt-1 text-xs text-secondary">{row[2]}</p>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}

const feedbackStages = [
  ["声明捕获", "varyings before link", accent],
  ["绑定目标", "TF buffer binding points", warning],
  ["执行捕获", "begin → draw → end", success],
  ["交换并复用", "buffer A ↔ buffer B", danger],
] as const;

export function GlsTransformFeedbackDiagram() {
  return (
    <DiagramFrame caption="Transform feedback 在光栅化前保存顶点管线输出；ping-pong 缓冲使上一轮输出成为下一轮输入。">
      <svg
        viewBox="0 0 880 320"
        role="img"
        aria-label="变换反馈从链接前声明输出到绑定缓冲、执行捕获和乒乓复用的生命周期"
        className="mx-auto hidden h-auto w-full max-w-[880px] md:block"
      >
        <text
          x="440"
          y="28"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={primary}
        >
          先选择输出，再链接，再捕获
        </text>
        {feedbackStages.map((stage, index) => {
          const x = 18 + index * 217;
          return (
            <g key={stage[0]}>
              <circle cx={x + 24} cy="91" r="15" fill={stage[2]} />
              <text
                x={x + 24}
                y="96"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill="var(--bg)"
              >
                {index + 1}
              </text>
              <rect
                x={x}
                y="116"
                width="195"
                height="108"
                rx="8"
                fill={stage[2]}
                fillOpacity="0.08"
                stroke={stage[2]}
              />
              <text
                x={x + 97.5}
                y="148"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill={primary}
              >
                {stage[0]}
              </text>
              <text
                x={x + 97.5}
                y="181"
                textAnchor="middle"
                fontFamily="monospace"
                fontSize="11"
                fill={stage[2]}
              >
                {stage[1]}
              </text>
            </g>
          );
        })}
        {[213, 430, 647].map((x) => (
          <path
            key={x}
            d={`M${x} 170 H${x + 22} M${x + 14} 162 L${x + 23} 170 L${x + 14} 178`}
            fill="none"
            stroke={border}
            strokeWidth="2"
          />
        ))}
        <rect
          x="140"
          y="263"
          width="600"
          height="35"
          rx="6"
          fill={accent}
          fillOpacity="0.06"
          stroke={accent}
          strokeOpacity="0.45"
        />
        <text
          x="440"
          y="285"
          textAnchor="middle"
          fontSize="11"
          fill={primary}
        >
          GL_RASTERIZER_DISCARD
          可跳过光栅化，但不会自动建立读写屏障或避免同缓冲冲突
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <p className="text-center text-sm font-semibold text-primary">
          Transform feedback 生命周期
        </p>
        {feedbackStages.map((stage, index) => (
          <div
            key={stage[0]}
            className="rounded-control border p-3"
            style={{ borderColor: stage[2] }}
          >
            <div className="flex items-center justify-between gap-3">
              <strong className="text-sm text-primary">
                {index + 1}. {stage[0]}
              </strong>
              <span
                className="font-mono text-[9px]"
                style={{ color: stage[2] }}
              >
                {stage[1]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}

const clipStages = [
  ["Clip space", "−w ≤ x,y,z ≤ w", "装配后按齐次平面裁剪", accent],
  ["Perspective divide", "ndc = clip / w", "裁剪后才除 w", warning],
  ["Viewport", "x,y → origin + size", "NDC 映射到窗口矩形", success],
  ["Depth range", "z → near/far", "写入窗口深度范围", danger],
] as const;

export function GlsClipViewportDiagram() {
  return (
    <DiagramFrame caption="裁剪发生在齐次 clip space；透视除法之后才得到 NDC，最后由 viewport 与 depth range 映射到窗口。">
      <svg
        viewBox="0 0 900 330"
        role="img"
        aria-label="齐次裁剪空间经过透视除法、视口和深度范围映射为窗口坐标"
        className="mx-auto hidden h-auto w-full max-w-[900px] md:block"
      >
        <text
          x="450"
          y="29"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={primary}
        >
          从 gl_Position 到窗口坐标
        </text>
        {clipStages.map((stage, index) => {
          const x = 16 + index * 221;
          return (
            <g key={stage[0]}>
              <rect
                x={x}
                y="72"
                width="204"
                height="161"
                rx="8"
                fill={stage[3]}
                fillOpacity="0.08"
                stroke={stage[3]}
              />
              <text
                x={x + 102}
                y="102"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill={primary}
              >
                {stage[0]}
              </text>
              <rect
                x={x + 12}
                y="121"
                width="180"
                height="37"
                rx="6"
                fill={elevated}
                stroke={border}
              />
              <text
                x={x + 102}
                y="144"
                textAnchor="middle"
                fontFamily="monospace"
                fontSize="11"
                fill={stage[3]}
              >
                {stage[1]}
              </text>
              <text
                x={x + 102}
                y="193"
                textAnchor="middle"
                fontSize="11"
                fill={secondary}
              >
                {stage[2]}
              </text>
            </g>
          );
        })}
        {[210, 431, 652].map((x) => (
          <path
            key={x}
            d={`M${x} 151 H${x + 23} M${x + 15} 143 L${x + 24} 151 L${x + 15} 159`}
            fill="none"
            stroke={border}
            strokeWidth="2"
          />
        ))}
        <rect
          x="130"
          y="272"
          width="640"
          height="35"
          rx="6"
          fill={warning}
          fillOpacity="0.07"
          stroke={warning}
          strokeOpacity="0.5"
        />
        <text
          x="450"
          y="294"
          textAnchor="middle"
          fontSize="11"
          fill={primary}
        >
          用户裁剪：shader 写 gl_ClipDistance[i]，应用启用 GL_CLIP_DISTANCEi
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <p className="text-center text-sm font-semibold text-primary">
          Clip space 到窗口
        </p>
        {clipStages.map((stage, index) => (
          <div
            key={stage[0]}
            className="rounded-control border p-3"
            style={{ borderColor: stage[3] }}
          >
            <div className="flex items-center justify-between gap-3">
              <strong className="text-sm text-primary">
                {index + 1}. {stage[0]}
              </strong>
              <span
                className="text-right font-mono text-[9px]"
                style={{ color: stage[3] }}
              >
                {stage[1]}
              </span>
            </div>
            <p className="mt-2 text-xs text-secondary">{stage[2]}</p>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}
