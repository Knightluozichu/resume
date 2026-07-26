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

const techniqueStages = [
  {
    number: 1,
    title: "Texture footprint",
    code: "coords / LOD / filtering",
    result: "稳定重建材质信号",
    color: accent,
  },
  {
    number: 2,
    title: "Lighting + material",
    code: "N,L,V,H + maps",
    result: "物理或艺术光照响应",
    color: warning,
  },
  {
    number: 3,
    title: "Alternative passes",
    code: "G-buffer / SSAO / ray passes",
    result: "重组可见性与光照计算",
    color: success,
  },
  {
    number: 4,
    title: "2D composition",
    code: "sprites / bitmap / SDF text",
    result: "最终界面和文字合成",
    color: danger,
  },
] as const;

export function GlsTextureMappingDiagram({
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
    <DiagramFrame caption="Rendering techniques 从纹理 footprint 开始，经材质光照、替代渲染 passes，最后进入二维合成；每层都要保留空间与颜色契约。">
      <svg
        viewBox="0 0 900 330"
        role="img"
        aria-label="纹理驱动渲染从采样足迹、材质光照、替代渲染到二维合成的完整技术链"
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
          纹理不是终点，而是渲染算法的数据层
        </text>
        <text x="450" y="50" textAnchor="middle" fontSize="11" fill={secondary}>
          第 13 章：lighting · NPR · alternative rendering · 2D graphics
        </text>
        {techniqueStages.map((stage, index) => {
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
                fontSize="12"
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
          x="170"
          y="283"
          width="560"
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
          验证信号：空间、颜色、LOD、pass 依赖、带宽、画质误差与 GPU 时间
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <p className="text-center text-sm font-semibold text-primary">
          纹理驱动渲染技术链
        </p>
        {techniqueStages.map((stage) => {
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

const footprintRows = [
  ["Coordinate", "uv + wrap mode", "address texel domain", accent],
  ["Derivatives", "dFdx(uv), dFdy(uv)", "screen-space footprint", warning],
  ["Mipmap", "λ = log₂ρ", "select scale", success],
  ["Anisotropy", "major/minor footprint", "sample elongated footprint", danger],
  [
    "Array / atlas",
    "layer versus sub-rect",
    "batch without semantic bleed",
    accent,
  ],
] as const;

export function GlsTextureFootprintDiagram() {
  return (
    <DiagramFrame caption="纹理采样由坐标、导数、mip、各向异性与资源布局共同决定；sampler uniform 保存 texture unit 索引，不是纹理对象名称。">
      <svg
        viewBox="0 0 900 360"
        role="img"
        aria-label="纹理坐标导数mipmap各向异性和数组图集五层采样足迹决策"
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
          从 UV 到 texture footprint
        </text>
        <text x="28" y="66" fontSize="11" fill={secondary}>
          阶段
        </text>
        <text x="230" y="66" fontSize="11" fill={secondary}>
          信号
        </text>
        <text x="610" y="66" fontSize="11" fill={secondary}>
          决定
        </text>
        {footprintRows.map((row, index) => {
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
          y="337"
          textAnchor="middle"
          fontSize="11"
          fill={secondary}
        >
          最大 anisotropy 与格式支持均由 implementation/extension 查询，不是固定
          16×
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <p className="text-center text-sm font-semibold text-primary">
          Texture footprint
        </p>
        {footprintRows.map((row) => (
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

const materialRows = [
  ["Base color", "albedo map", "diffuse reflectance", accent],
  ["Normal", "normal map + TBN", "micro orientation", warning],
  ["Gloss/specular", "power or reflectance map", "highlight shape", success],
  [
    "Environment",
    "reflect/refract → cube/sphere map",
    "distant scene lighting",
    danger,
  ],
] as const;

export function GlsMaterialLightingDiagram() {
  return (
    <DiagramFrame caption="多纹理应对应明确材质参数；所有法线、光向量和视向量必须在同一坐标空间中进入 lighting model。">
      <svg
        viewBox="0 0 880 330"
        role="img"
        aria-label="基础色法线高光和环境纹理输入到统一光照模型"
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
          Texture maps → material parameters → lighting
        </text>
        {materialRows.map((row, index) => {
          const x = 18 + index * 217;
          return (
            <g key={row[0]}>
              <rect
                x={x}
                y="72"
                width="195"
                height="178"
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
                y="202"
                textAnchor="middle"
                fontSize="11"
                fill={secondary}
              >
                {row[2]}
              </text>
            </g>
          );
        })}
        <text
          x="440"
          y="292"
          textAnchor="middle"
          fontSize="11"
          fill={secondary}
        >
          Blinn-Phong: diffuse max(N·L,0) + specular max(N·H,0)^p
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <p className="text-center text-sm font-semibold text-primary">
          材质纹理与光照
        </p>
        {materialRows.map((row) => (
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

const nprRows = [
  ["Toon bands", "quantize N·L / 1D lookup", "discrete tones", accent],
  ["Rim light", "(1−N·V)^p", "silhouette emphasis", warning],
  ["Outline", "backface shell / edge detect", "contour", success],
  [
    "Hatching/stipple",
    "texture-space patterns",
    "illustrative material",
    danger,
  ],
] as const;

export function GlsNprDiagram() {
  return (
    <DiagramFrame caption="NPR 不是关闭真实光照，而是把连续信号量化、强化轮廓或映射为艺术纹理；每个操作都要定义空间和阈值。">
      <svg
        viewBox="0 0 880 330"
        role="img"
        aria-label="卡通色阶边缘光轮廓和排线四种非真实感渲染技术"
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
          Non-photorealistic rendering 转换信号语言
        </text>
        {nprRows.map((row, index) => {
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
                x="300"
                y={y + 25}
                fontFamily="monospace"
                fontSize="11"
                fill={row[3]}
              >
                {row[1]}
              </text>
              <text x="620" y={y + 25} fontSize="11" fill={secondary}>
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
          量化前先稳定法线和光照空间；阈值边缘用 fwidth/smoothstep 可减少闪烁
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <p className="text-center text-sm font-semibold text-primary">
          NPR 信号变换
        </p>
        {nprRows.map((row) => (
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

const alternativeRows = [
  [
    "Forward",
    "geometry × lights in material pass",
    "simple transparency",
    accent,
  ],
  ["Deferred", "G-buffer then lighting", "many lights / bandwidth", warning],
  [
    "Screen-space",
    "depth/normal neighborhood",
    "SSAO and post effects",
    success,
  ],
  [
    "Multipass ray",
    "FBO recursion / composite",
    "reflection/refraction paths",
    danger,
  ],
] as const;

export function GlsAlternativeRenderingDiagram() {
  return (
    <DiagramFrame caption="Alternative rendering 改变信息何时保存与消费：deferred、screen-space 和 multipass ray methods 都以额外 attachments/passes 换取不同计算结构。">
      <svg
        viewBox="0 0 900 335"
        role="img"
        aria-label="前向延迟屏幕空间和多遍光线方法四种替代渲染结构"
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
          改变 pass graph，而不只是换一个 shader
        </text>
        <text x="28" y="67" fontSize="11" fill={secondary}>
          方法
        </text>
        <text x="220" y="67" fontSize="11" fill={secondary}>
          数据路径
        </text>
        <text x="610" y="67" fontSize="11" fill={secondary}>
          主要取舍
        </text>
        {alternativeRows.map((row, index) => {
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
              <text x="610" y={y + 25} fontSize="11" fill={secondary}>
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
          比较 passes、attachment bytes、samples、overdraw、透明支持与 GPU 时间
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <p className="text-center text-sm font-semibold text-primary">
          Alternative rendering graph
        </p>
        {alternativeRows.map((row) => (
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
            <p className="mt-1 text-xs text-secondary">{row[2]}</p>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}

const graphics2dRows = [
  ["Atlas sprite", "sub-rect UV + padding", "mixed sizes / bleed risk", accent],
  [
    "Texture array",
    "same dimensions + layer",
    "stable filtering per layer",
    warning,
  ],
  ["Bitmap font", "glyph cell lookup", "fast fixed-resolution text", success],
  ["SDF text", "distance + smooth threshold", "scalable edges/effects", danger],
] as const;

export function GlsTwoDGraphicsDiagram() {
  return (
    <DiagramFrame caption="2D graphics 仍是 draw + texture + blend；atlas、array、bitmap 与 SDF 的差别在资源布局、过滤边界和缩放质量。">
      <svg
        viewBox="0 0 880 330"
        role="img"
        aria-label="纹理图集纹理数组位图字体和距离场文字四种二维图形路径"
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
          Sprites 与文字的纹理布局
        </text>
        {graphics2dRows.map((row, index) => {
          const x = 18 + index * 217;
          return (
            <g key={row[0]}>
              <rect
                x={x}
                y="72"
                width="195"
                height="178"
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
                y="202"
                textAnchor="middle"
                fontSize="11"
                fill={secondary}
              >
                {row[2]}
              </text>
            </g>
          );
        })}
        <text
          x="440"
          y="292"
          textAnchor="middle"
          fontSize="11"
          fill={secondary}
        >
          SDF coverage = smoothstep(edge−width, edge+width, distance), width
          from fwidth
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <p className="text-center text-sm font-semibold text-primary">
          二维资源布局
        </p>
        {graphics2dRows.map((row) => (
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

const evidenceRows = [
  ["Sampling", "mip / anisotropy / samples", "aliasing + texture time", accent],
  [
    "Material",
    "texture count / ALU / space",
    "lighting error + shader time",
    warning,
  ],
  [
    "Pass graph",
    "attachments / bytes / passes",
    "bandwidth + GPU time",
    success,
  ],
  [
    "2D",
    "glyphs / batches / overdraw",
    "edge quality + composite time",
    danger,
  ],
] as const;

export function GlsRenderingEvidenceDiagram() {
  return (
    <DiagramFrame caption="渲染技术没有单一“高级”开关；每一层都要同时记录输入规模、画质误差与 GPU 成本。">
      <svg
        viewBox="0 0 880 325"
        role="img"
        aria-label="纹理采样材质光照渲染图和二维合成的质量性能证据矩阵"
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
          Quality × Work × Time 三类证据
        </text>
        {evidenceRows.map((row, index) => {
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
              <text x="610" y={y + 25} fontSize="11" fill={secondary}>
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
          先保留 reference
          image，再逐项改变一项参数，避免“更快但画质不同”的无效对比
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <p className="text-center text-sm font-semibold text-primary">
          渲染技术证据矩阵
        </p>
        {evidenceRows.map((row) => (
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
