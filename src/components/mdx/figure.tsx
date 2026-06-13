/**
 * <Figure>：带图注的图示——「图片比喻」主力（chapter-spec §五）。
 *
 * Server Component（纯展示，无交互）。可选 annotations 在图上叠加标注点 + 标签，
 * 用百分比坐标定位（相对图片框，随图缩放），适合给示意图标关键部位。
 *
 * 用原生 <img> 而非 next/image：章节配图多为作者放进 public/ 的示意图/比喻图，
 * 不需要 optimizer 的 sizes/srcset 机制（参照 hero-canvas 的同款决策与 eslint 注释惯例）。
 *
 * 颜色/间距/圆角全部走 DESIGN token（硬规则 5）。caption 用 text-secondary。
 */

type Annotation = {
  /** 横向位置，0–100（百分比，相对图片框左边） */
  x: number;
  /** 纵向位置，0–100（百分比，相对图片框顶边） */
  y: number;
  /** 标注文字 */
  label: string;
};

type FigureProps = {
  src: string;
  alt: string;
  caption?: string;
  annotations?: Annotation[];
  /** 最大宽度（如 "32rem"），不传则铺满正文栏 */
  maxWidth?: string;
};

export function Figure({
  src,
  alt,
  caption,
  annotations,
  maxWidth,
}: FigureProps) {
  return (
    <figure
      className="mdx-figure mx-auto my-6"
      style={maxWidth ? { maxWidth } : undefined}
    >
      <div className="relative overflow-hidden rounded-card border border-border bg-elevated">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="block h-auto w-full" />

        {/* 标注层：百分比定位的点 + 标签，随图缩放 */}
        {annotations?.map((a, i) => (
          <span
            key={`${a.x}-${a.y}-${i}`}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${a.x}%`, top: `${a.y}%` }}
          >
            <span className="flex items-center gap-1">
              {/* 标注点：accent 小圆点 + 辉光环 */}
              <span
                aria-hidden="true"
                className="h-2 w-2 shrink-0 rounded-full bg-accent ring-4 ring-accent-glow"
              />
              <span className="rounded-control border border-border bg-bg/85 px-2 py-1 text-xs whitespace-nowrap text-primary">
                {a.label}
              </span>
            </span>
          </span>
        ))}
      </div>

      {caption && (
        <figcaption className="mt-2 text-center text-xs text-secondary">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
