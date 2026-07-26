import type { ReactNode } from "react";

export { MipmapPyramidDiagram } from "../../diagrams/mipmap-pyramid-diagram";
export { TextureCoordDiagram } from "../../diagrams/texture-coord-diagram";

const primary = "var(--text-primary)";
const secondary = "var(--text-secondary)";
const border = "var(--border)";
const elevated = "var(--bg-elevated)";
const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";
const danger = "var(--danger)";

function Frame({
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
type Stage = { title: string; code: string; result: string; color: string };
function Stages({
  title,
  subtitle,
  stages,
  caption,
  ariaLabel,
  active = [1, 2, 3, 4],
}: {
  title: string;
  subtitle: string;
  stages: readonly Stage[];
  caption: string;
  ariaLabel: string;
  active?: readonly number[];
}) {
  return (
    <Frame caption={caption}>
      <svg
        viewBox="0 0 900 330"
        role="img"
        aria-label={ariaLabel}
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
          {title}
        </text>
        <text
          x="450"
          y="49"
          textAnchor="middle"
          fontSize="11"
          fill={secondary}
        >
          {subtitle}
        </text>
        {stages.map((s, i) => {
          const n = i + 1;
          const on = active.includes(n);
          const x = 15 + i * 221;
          return (
            <g key={s.title} opacity={on ? 1 : 0.25} data-stage={n}>
              <rect
                x={x}
                y="76"
                width="205"
                height="180"
                rx="8"
                fill={s.color}
                fillOpacity={on ? 0.09 : 0.02}
                stroke={s.color}
                strokeWidth={active.length < 4 && on ? 2.5 : 1.2}
              />
              <circle cx={x + 26} cy="104" r="15" fill={s.color} />
              <text
                x={x + 26}
                y="109"
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill="var(--bg)"
              >
                {n}
              </text>
              <text
                x={x + 48}
                y="109"
                fontSize="11.4"
                fontWeight="700"
                fill={primary}
              >
                {s.title}
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
                fontSize="11"
                fill={s.color}
              >
                {s.code}
              </text>
              <text x={x + 13} y="199" fontSize="11" fill={secondary}>
                验证
              </text>
              <text x={x + 13} y="221" fontSize="11" fill={primary}>
                {s.result}
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
          x="145"
          y="282"
          width="610"
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
          fontSize="11"
          fill={primary}
        >
          纹理正确性必须同时闭合像素格式、采样状态、unit binding 与 shader
          sampler
        </text>
      </svg>
      <div className="grid gap-3 md:hidden">
        <div className="text-center">
          <p className="text-sm font-semibold text-primary">{title}</p>
          <p className="mt-1 text-xs text-secondary">{subtitle}</p>
        </div>
        {stages.map((s, i) => {
          const n = i + 1;
          const on = active.includes(n);
          return (
            <div
              key={s.title}
              className="rounded-control border bg-bg/40 p-3"
              style={{ borderColor: s.color, opacity: on ? 1 : 0.32 }}
            >
              <div className="flex items-start justify-between gap-3">
                <strong className="text-sm text-primary">
                  {n}. {s.title}
                </strong>
                <span
                  className="font-mono text-[9px]"
                  style={{ color: s.color }}
                >
                  {s.code}
                </span>
              </div>
              <p className="mt-2 text-xs text-secondary">{s.result}</p>
            </div>
          );
        })}
      </div>
    </Frame>
  );
}

const lifecycle = [
  {
    title: "Decode image",
    code: "width · height · channels",
    result: "CPU pixels + flip policy",
    color: accent,
  },
  {
    title: "Create storage",
    code: "object · target · levels",
    result: "合法 texture storage",
    color: warning,
  },
  {
    title: "Upload + mips",
    code: "format/type · unpack",
    result: "每级数据完整",
    color: success,
  },
  {
    title: "Sample + destroy",
    code: "unit · sampler · texture()",
    result: "正确颜色与资源释放",
    color: danger,
  },
] as const;
export function TextureLifecycleDiagram() {
  return (
    <Stages
      title="纹理从图片变成可采样资源"
      subtitle="decode · allocate · upload/mipmap · bind/sample/destroy"
      stages={lifecycle}
      ariaLabel="纹理解码通道创建存储上传格式多级纹理绑定采样和释放生命周期"
      caption="图片文件不是 texture object；必须先解码成有尺寸和 channels 的像素，再按 format/type 上传并建立完整 mip chain。"
    />
  );
}

const units = [
  {
    title: "Active unit",
    code: "glActiveTexture(GL_TEXTURE0+i)",
    result: "选择第 i 个插槽",
    color: accent,
  },
  {
    title: "Target binding",
    code: "glBindTexture(TEXTURE_2D,id)",
    result: "该 unit 的 2D binding",
    color: warning,
  },
  {
    title: "Sampler uniform",
    code: "uniform1i(location,i)",
    result: "shader 保存 unit index",
    color: success,
  },
  {
    title: "Texture lookup",
    code: "texture(sampler,uv)",
    result: "按状态返回 texel",
    color: danger,
  },
] as const;
export function TextureUnitBindingDiagram() {
  return (
    <Stages
      title="Object、Unit、Binding 与 Sampler 是四个角色"
      subtitle="select unit · bind object · point sampler · lookup"
      stages={units}
      ariaLabel="活动纹理单元目标绑定纹理对象采样器uniform和GLSL采样关系"
      caption="Sampler uniform 保存整数 unit index，不保存 texture object ID；同一 unit 还可分别拥有不同 texture targets 的 bindings。"
    />
  );
}

const complete = [
  {
    title: "Base level",
    code: "dimensions + internal format",
    result: "level 0 已定义",
    color: accent,
  },
  {
    title: "Mip chain",
    code: "1×1 or max level",
    result: "MIN filter 所需 levels",
    color: warning,
  },
  {
    title: "Sampling params",
    code: "wrap · MIN · MAG",
    result: "MAG 不接受 mip filters",
    color: success,
  },
  {
    title: "Pixel transfer",
    code: "channels · alignment · flip",
    result: "行距和方向正确",
    color: danger,
  },
] as const;
export function TextureCompletenessDiagram() {
  return (
    <Stages
      title="黑纹理通常是 Completeness Contract 破裂"
      subtitle="base image · mip levels · legal filters · pixel transfer"
      stages={complete}
      ariaLabel="纹理基础级多级链过滤参数与像素传输完整性检查"
      caption="使用 mipmap MIN filter 时必须定义所需 levels；MAG 只能 NEAREST/LINEAR。RGB 行距不满足默认 4-byte alignment 时要调整 unpack alignment。"
    />
  );
}

const sampling = [
  {
    title: "UV attribute",
    code: "vertex vec2 → interpolated",
    result: "每片段坐标",
    color: accent,
  },
  {
    title: "Address",
    code: "wrap S/T",
    result: "越界坐标归约",
    color: warning,
  },
  {
    title: "LOD + filter",
    code: "MIN/MAG · mip selection",
    result: "重建采样值",
    color: success,
  },
  {
    title: "Combine",
    code: "texture · mix · output",
    result: "颜色进入 framebuffer",
    color: danger,
  },
] as const;
export function TextureSamplingContractDiagram({
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
    <Stages
      title="一次纹理采样包含四层决策"
      subtitle="coordinate · address · LOD/filter · shader combine"
      stages={sampling}
      active={active}
      ariaLabel="纹理UV坐标环绕寻址LOD过滤采样混合四层决策"
      caption="`texture()` 不只是数组索引；它结合 interpolated UV、wrap、derivative-derived LOD、mipmap 与 filtering 返回重建值。"
    />
  );
}
