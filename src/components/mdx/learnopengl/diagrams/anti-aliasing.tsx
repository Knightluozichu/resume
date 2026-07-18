import type { ReactNode } from "react";

export { AliasingDiagram } from "../../diagrams/aliasing-diagram";
export { MsaaSampleDiagram } from "../../diagrams/msaa-sample-diagram";
export { SsaaVsMsaaDiagram } from "../../diagrams/ssaa-vs-msaa-diagram";

function Frame({ children, caption }: { children: ReactNode; caption: string }) {
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

const resolveRows = [
  {
    title: "多重采样附件",
    detail: "msaaFBO: color / depth-stencil 都有 N 个样本",
    code: "renderbufferStorageMultisample(..., N, ...)",
    color: "var(--accent)",
  },
  {
    title: "解析边界",
    detail: "从 READ_FRAMEBUFFER 复制到 DRAW_FRAMEBUFFER",
    code: "blitFramebuffer(..., COLOR_BUFFER_BIT, NEAREST)",
    color: "var(--warning)",
  },
  {
    title: "普通颜色纹理",
    detail: "resolveFBO: 一个颜色值 / 像素，可用于后处理",
    code: "sampler2D screenTexture",
    color: "var(--success)",
  },
] as const;

export function MsaaResolveContractDiagram() {
  return (
    <Frame caption="离屏 MSAA 的关键不是只把场景画进 msaaFBO，而是明确解析边界：多样本附件写入后，经 blit 解析为普通颜色纹理，后处理和屏幕呈现才读取该普通纹理。">
      <div
        role="img"
        aria-label="离屏 MSAA 解析图，从带 N 个样本的多重采样帧缓冲开始，使用 blitFramebuffer 从读取帧缓冲复制到绘制帧缓冲，得到每像素一个颜色值的普通纹理供后处理和显示使用"
        className="grid gap-3"
      >
        <div className="grid gap-2 lg:grid-cols-3">
          {resolveRows.map((row, index) => (
            <div key={row.title} className="rounded-control border border-border bg-bg/40 p-3">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-mono" style={{ color: row.color }}>{index + 1}.</span>
                <strong style={{ color: row.color }}>{row.title}</strong>
              </div>
              <p className="mt-2 text-xs leading-5 text-secondary">{row.detail}</p>
              <code className="mt-3 block break-words text-xs text-primary">{row.code}</code>
            </div>
          ))}
        </div>
        <p className="rounded-control border border-border bg-bg/40 p-3 text-xs text-secondary">
          <strong className="text-primary">例外路径：</strong>若要自行读取每个样本，不先解析也可以，但着色器必须使用
          <code> sampler2DMS</code> 与 <code>texelFetch</code>；它不是普通的 <code>sampler2D</code> 后处理采样。
        </p>
      </div>
    </Frame>
  );
}
