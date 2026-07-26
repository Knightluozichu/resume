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

const fragmentStages = [
  {
    number: 1,
    title: "Coverage + samples",
    code: "rasterization / interpolation",
    result: "生成覆盖与 shader 输入",
    color: accent,
  },
  {
    number: 2,
    title: "Fragment shader",
    code: "outputs / depth / discard",
    result: "一次或多次 sample 着色",
    color: warning,
  },
  {
    number: 3,
    title: "Per-fragment tests",
    code: "scissor / stencil / depth",
    result: "决定哪些 sample 通过",
    color: success,
  },
  {
    number: 4,
    title: "Blend + write",
    code: "equation / masks / attachments",
    result: "更新 framebuffer 存储",
    color: danger,
  },
] as const;

export function GlsFragmentShadingDiagram({
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
    <DiagramFrame caption="Fragment shader 输出还要通过覆盖、逐片段测试、混合和写掩码，才可能更新 framebuffer attachment。">
      <svg
        viewBox="0 0 900 330"
        role="img"
        aria-label="片段从覆盖样本、片段着色、逐片段测试到混合并写入帧缓冲的完整处理链"
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
          从 raster coverage 到 attachment storage
        </text>
        <text x="450" y="50" textAnchor="middle" fontSize="11" fill={secondary}>
          fragment、sample、pixel 是三个不同粒度
        </text>
        {fragmentStages.map((stage, index) => {
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
                fontSize="12.1"
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
                {stage.result}
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
          x="175"
          y="283"
          width="550"
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
          逻辑结果受状态约束；硬件可在保持可观察语义时提前或并行执行部分测试
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <p className="text-center text-sm font-semibold text-primary">
          Fragment/sample 完整链
        </p>
        {fragmentStages.map((stage) => {
          const focused = active.includes(stage.number);
          return (
            <div
              key={stage.title}
              className="rounded-control border bg-bg/40 p-3 transition-opacity"
              style={{ borderColor: stage.color, opacity: focused ? 1 : 0.32 }}
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
              <p className="mt-2 text-xs text-secondary">{stage.result}</p>
            </div>
          );
        })}
      </div>
    </DiagramFrame>
  );
}

const invocationRows = [
  ["gl_FragCoord", "window x/y/z + reciprocal w", "位置与深度", accent],
  ["gl_FrontFacing", "front/back primitive", "双面材质", warning],
  ["gl_PointCoord", "point sprite [0,1]²", "点形状与纹理", success],
  [
    "sample inputs",
    "SampleID / SamplePosition / SampleMaskIn",
    "per-sample 控制",
    danger,
  ],
  ["derivatives", "dFdx / dFdy + helper invocations", "LOD 与屏幕梯度", accent],
] as const;

export function GlsFragmentInvocationDiagram() {
  return (
    <DiagramFrame caption="Fragment shader 可读取窗口位置、面朝向、点坐标、sample 信息和导数；启用 sample shading 时 invocation 数可能高于每像素一次。">
      <svg
        viewBox="0 0 900 360"
        role="img"
        aria-label="片段着色器窗口坐标面朝向点坐标采样输入和导数五类输入"
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
          Fragment invocation 的可观察输入
        </text>
        <text x="28" y="66" fontSize="11" fill={secondary}>
          输入
        </text>
        <text x="230" y="66" fontSize="11" fill={secondary}>
          语义
        </text>
        <text x="610" y="66" fontSize="11" fill={secondary}>
          典型用途
        </text>
        {invocationRows.map((row, index) => {
          const y = 79 + index * 48;
          return (
            <g key={row[0]}>
              <rect
                x="20"
                y={y}
                width="860"
                height="36"
                rx="6"
                fill={index % 2 === 0 ? "var(--bg)" : elevated}
                stroke={border}
              />
              <circle cx="40" cy={y + 18} r="6" fill={row[3]} />
              <text
                x="55"
                y={y + 23}
                fontFamily="monospace"
                fontSize="11"
                fontWeight="700"
                fill={primary}
              >
                {row[0]}
              </text>
              <text
                x="230"
                y={y + 23}
                fontFamily="monospace"
                fontSize="11"
                fill={row[3]}
              >
                {row[1]}
              </text>
              <text x="610" y={y + 23} fontSize="11" fill={secondary}>
                {row[2]}
              </text>
            </g>
          );
        })}
        <text
          x="450"
          y="338"
          textAnchor="middle"
          fontSize="11"
          fill={secondary}
        >
          Helper invocation 可计算导数但不会更新 framebuffer 或执行可见副作用
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <p className="text-center text-sm font-semibold text-primary">
          Fragment shader 输入
        </p>
        {invocationRows.map((row) => (
          <div
            key={row[0]}
            className="rounded-control border p-3"
            style={{ borderColor: row[3] }}
          >
            <strong className="font-mono text-[11px] text-primary">
              {row[0]}
            </strong>
            <p
              className="mt-1 break-words font-mono text-[10px]"
              style={{ color: row[3] }}
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

const testRows = [
  ["Scissor", "window rectangle", "outside → reject", accent],
  [
    "Stencil",
    "compare + fail/depth-fail/pass ops",
    "mask and classify",
    warning,
  ],
  ["Depth", "compare source vs stored depth", "visibility", success],
  [
    "Occlusion / ownership",
    "implementation/window constraints",
    "sample eligibility",
    danger,
  ],
  ["Write masks", "color/depth/stencil masks", "final storage lanes", accent],
] as const;

export function GlsPerFragmentTestsDiagram() {
  return (
    <DiagramFrame caption="逐片段测试是一组有状态的 sample 过滤与更新规则；early execution 是允许的优化，不应把所有实现固定成单一流水线时序。">
      <svg
        viewBox="0 0 900 360"
        role="img"
        aria-label="剪裁框模板深度像素所有权和写掩码组成的逐片段测试与更新规则"
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
          Per-fragment tests：比较、操作与写掩码
        </text>
        {testRows.map((row, index) => {
          const y = 67 + index * 51;
          return (
            <g key={row[0]}>
              <rect
                x="55"
                y={y}
                width="790"
                height="39"
                rx="6"
                fill={row[3]}
                fillOpacity="0.07"
                stroke={row[3]}
              />
              <text
                x="80"
                y={y + 24}
                fontSize="11"
                fontWeight="700"
                fill={primary}
              >
                {row[0]}
              </text>
              <text
                x="300"
                y={y + 24}
                fontFamily="monospace"
                fontSize="11"
                fill={row[3]}
              >
                {row[1]}
              </text>
              <text x="650" y={y + 24} fontSize="11" fill={secondary}>
                {row[2]}
              </text>
            </g>
          );
        })}
        <text
          x="450"
          y="337"
          textAnchor="middle"
          fontSize="11"
          fill={secondary}
        >
          layout(early_fragment_tests) 可强制提前测试；gl_FragDepth 与 discard
          的语义要单独验证
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <p className="text-center text-sm font-semibold text-primary">
          逐片段测试与掩码
        </p>
        {testRows.map((row) => (
          <div
            key={row[0]}
            className="rounded-control border p-3"
            style={{ borderColor: row[3] }}
          >
            <strong className="text-sm text-primary">{row[0]}</strong>
            <p className="mt-1 font-mono text-[10px]" style={{ color: row[3] }}>
              {row[1]}
            </p>
            <p className="mt-1 text-xs text-secondary">{row[2]}</p>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}

const blendRows = [
  [
    "Straight alpha",
    "S.rgb·Sa + D.rgb·(1−Sa)",
    "SRC_ALPHA, ONE_MINUS_SRC_ALPHA",
    accent,
  ],
  [
    "Premultiplied",
    "S.rgb + D.rgb·(1−Sa)",
    "ONE, ONE_MINUS_SRC_ALPHA",
    success,
  ],
  ["Additive", "S.rgb + D.rgb", "ONE, ONE", warning],
  [
    "Separate alpha",
    "RGB and A use separate factors",
    "BlendFuncSeparate",
    danger,
  ],
] as const;

export function GlsBlendEquationDiagram() {
  return (
    <DiagramFrame caption="Blend equation 分别组合 source 与 destination；straight 与 premultiplied alpha 需要匹配不同因子，混用会出现黑边或亮度错误。">
      <svg
        viewBox="0 0 900 335"
        role="img"
        aria-label="直通透明度预乘透明度加法和独立透明通道四种混合方程与因子"
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
          Source、Destination、Factor、Equation
        </text>
        <text x="28" y="67" fontSize="11" fill={secondary}>
          模式
        </text>
        <text x="220" y="67" fontSize="11" fill={secondary}>
          颜色方程
        </text>
        <text x="590" y="67" fontSize="11" fill={secondary}>
          常见 factors
        </text>
        {blendRows.map((row, index) => {
          const y = 81 + index * 52;
          return (
            <g key={row[0]}>
              <rect
                x="20"
                y={y}
                width="860"
                height="40"
                rx="6"
                fill={index % 2 === 0 ? "var(--bg)" : elevated}
                stroke={border}
              />
              <circle cx="40" cy={y + 20} r="6.5" fill={row[3]} />
              <text
                x="56"
                y={y + 25}
                fontSize="11"
                fontWeight="700"
                fill={primary}
              >
                {row[0]}
              </text>
              <text
                x="220"
                y={y + 25}
                fontFamily="monospace"
                fontSize="11"
                fill={row[3]}
              >
                {row[1]}
              </text>
              <text
                x="590"
                y={y + 25}
                fontFamily="monospace"
                fontSize="11"
                fill={secondary}
              >
                {row[2]}
              </text>
            </g>
          );
        })}
        <text
          x="450"
          y="309"
          textAnchor="middle"
          fontSize="11"
          fill={secondary}
        >
          Integer color attachments 不执行普通 floating-point blending；格式与
          attachment 类型必须匹配
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <p className="text-center text-sm font-semibold text-primary">
          Blend equations
        </p>
        {blendRows.map((row) => (
          <div
            key={row[0]}
            className="rounded-control border p-3"
            style={{ borderColor: row[3] }}
          >
            <strong className="text-sm text-primary">{row[0]}</strong>
            <p
              className="mt-1 break-words font-mono text-[10px]"
              style={{ color: row[3] }}
            >
              {row[1]}
            </p>
            <p className="mt-1 break-words font-mono text-[9px] text-secondary">
              {row[2]}
            </p>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}

const fboRows = [
  ["Color 0", "RGBA8 / RGBA16F / integer", "location 0", accent],
  ["Color 1..N", "MRT data", "glDrawBuffers mapping", warning],
  ["Depth", "DEPTH_COMPONENT", "depth test + sampling", success],
  ["Depth-stencil", "combined format", "shared attachment", danger],
] as const;

export function GlsFramebufferDiagram() {
  return (
    <DiagramFrame caption="Framebuffer object 组合 attachment 与 draw/read routing；只有完整且格式、尺寸、sample count 兼容时才能作为渲染目标。">
      <svg
        viewBox="0 0 880 335"
        role="img"
        aria-label="离屏帧缓冲的多个颜色附件深度附件绘制缓冲映射和完整性"
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
          FBO 是 attachment 集合，不保存像素本身
        </text>
        {fboRows.map((row, index) => {
          const x = 18 + index * 217;
          return (
            <g key={row[0]}>
              <rect
                x={x}
                y="72"
                width="195"
                height="175"
                rx="8"
                fill={row[3]}
                fillOpacity="0.08"
                stroke={row[3]}
              />
              <text
                x={x + 97.5}
                y="105"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill={primary}
              >
                {row[0]}
              </text>
              <rect
                x={x + 12}
                y="126"
                width="171"
                height="38"
                rx="6"
                fill={elevated}
                stroke={border}
              />
              <text
                x={x + 97.5}
                y="149"
                textAnchor="middle"
                fontFamily="monospace"
                fontSize="11"
                fill={row[3]}
              >
                {row[1]}
              </text>
              <text
                x={x + 97.5}
                y="199"
                textAnchor="middle"
                fontSize="11"
                fill={secondary}
              >
                {row[2]}
              </text>
            </g>
          );
        })}
        <rect
          x="125"
          y="284"
          width="630"
          height="28"
          rx="6"
          fill={warning}
          fillOpacity="0.07"
          stroke={warning}
          strokeOpacity="0.5"
        />
        <text
          x="440"
          y="303"
          textAnchor="middle"
          fontSize="11"
          fill={primary}
        >
          attach → glDrawBuffers → completeness check → set viewport →
          clear/render → consume
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <p className="text-center text-sm font-semibold text-primary">
          Framebuffer attachments
        </p>
        {fboRows.map((row) => (
          <div
            key={row[0]}
            className="rounded-control border p-3"
            style={{ borderColor: row[3] }}
          >
            <strong className="text-sm text-primary">{row[0]}</strong>
            <p className="mt-1 font-mono text-[10px]" style={{ color: row[3] }}>
              {row[1]}
            </p>
            <p className="mt-1 text-xs text-secondary">{row[2]}</p>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}

const sampleRows = [
  ["Coverage", "which samples primitive covers", "sample mask", accent],
  [
    "Fragment shading",
    "one invocation or per-sample",
    "min sample shading",
    warning,
  ],
  [
    "Per-sample tests",
    "depth/stencil per sample",
    "multisample attachments",
    success,
  ],
  ["Resolve", "N samples → single-sample value", "blit or shader", danger],
] as const;

export function GlsMultisampleDiagram() {
  return (
    <DiagramFrame caption="MSAA 增加 coverage/depth/color samples，不保证 fragment shader 每 sample 执行；sample shading 才提高最小着色频率。">
      <svg
        viewBox="0 0 880 325"
        role="img"
        aria-label="多重采样从覆盖掩码片段着色逐采样测试到解析单采样图像"
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
          Coverage samples 与 shader invocations 分离
        </text>
        {sampleRows.map((row, index) => {
          const x = 18 + index * 217;
          return (
            <g key={row[0]}>
              <circle cx={x + 24} cy="89" r="15" fill={row[3]} />
              <text
                x={x + 24}
                y="94"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill="var(--bg)"
              >
                {index + 1}
              </text>
              <rect
                x={x}
                y="115"
                width="195"
                height="111"
                rx="8"
                fill={row[3]}
                fillOpacity="0.08"
                stroke={row[3]}
              />
              <text
                x={x + 97.5}
                y="146"
                textAnchor="middle"
                fontSize="11.5"
                fontWeight="700"
                fill={primary}
              >
                {row[0]}
              </text>
              <text
                x={x + 97.5}
                y="178"
                textAnchor="middle"
                fontSize="11"
                fill={row[3]}
              >
                {row[1]}
              </text>
              <text
                x={x + 97.5}
                y="205"
                textAnchor="middle"
                fontSize="11"
                fill={secondary}
              >
                {row[2]}
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
        <text
          x="440"
          y="287"
          textAnchor="middle"
          fontSize="11"
          fill={secondary}
        >
          4x MSAA 通常约四倍 sample storage，但着色次数取决于 sample shading
          与实现合并
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <p className="text-center text-sm font-semibold text-primary">
          MSAA 与 resolve
        </p>
        {sampleRows.map((row, index) => (
          <div
            key={row[0]}
            className="rounded-control border p-3"
            style={{ borderColor: row[3] }}
          >
            <strong className="text-sm text-primary">
              {index + 1}. {row[0]}
            </strong>
            <p className="mt-1 text-xs" style={{ color: row[3] }}>
              {row[1]}
            </p>
            <p className="mt-1 text-xs text-secondary">{row[2]}</p>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}

const formatRows = [
  [
    "Normalized",
    "RGBA8 / SRGB8_ALPHA8",
    "conversion + optional sRGB encode",
    accent,
  ],
  [
    "Integer",
    "RGBA32UI / RGBA8I",
    "integer output; no ordinary blend",
    warning,
  ],
  ["Float", "RGBA16F / RGBA32F", "HDR range and bandwidth", success],
  ["Readback", "read FBO → PBO/CPU", "format/type + pack alignment", danger],
] as const;

export function GlsFormatReadbackDiagram() {
  return (
    <DiagramFrame caption="Attachment internal format controls conversion, precision and blending; readback additionally depends on read buffer, transfer format/type, row alignment and synchronization.">
      <svg
        viewBox="0 0 880 330"
        role="img"
        aria-label="归一化整数浮点帧缓冲格式和像素读回路径对照"
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
          Storage format 与 transfer format 是两层契约
        </text>
        {formatRows.map((row, index) => {
          const y = 72 + index * 52;
          return (
            <g key={row[0]}>
              <rect
                x="65"
                y={y}
                width="750"
                height="40"
                rx="6"
                fill={row[3]}
                fillOpacity="0.07"
                stroke={row[3]}
              />
              <text
                x="90"
                y={y + 25}
                fontSize="11"
                fontWeight="700"
                fill={primary}
              >
                {row[0]}
              </text>
              <text
                x="285"
                y={y + 25}
                fontFamily="monospace"
                fontSize="11"
                fill={row[3]}
              >
                {row[1]}
              </text>
              <text x="575" y={y + 25} fontSize="11" fill={secondary}>
                {row[2]}
              </text>
            </g>
          );
        })}
        <text
          x="440"
          y="304"
          textAnchor="middle"
          fontSize="11"
          fill={secondary}
        >
          read pixels 可同步阻塞；PBO 可延迟映射，但仍需 fence 或其他 completion
          证据
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <p className="text-center text-sm font-semibold text-primary">
          Attachment formats 与 readback
        </p>
        {formatRows.map((row) => (
          <div
            key={row[0]}
            className="rounded-control border p-3"
            style={{ borderColor: row[3] }}
          >
            <strong className="text-sm text-primary">{row[0]}</strong>
            <p className="mt-1 font-mono text-[10px]" style={{ color: row[3] }}>
              {row[1]}
            </p>
            <p className="mt-1 text-xs text-secondary">{row[2]}</p>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}
