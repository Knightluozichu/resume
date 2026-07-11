import type { ReactNode } from "react";

export { FramebufferAttachmentDiagram } from "../../diagrams/framebuffer-attachment-diagram";
export { KernelDiagram } from "../../diagrams/kernel-diagram";
export { TwoPassDiagram } from "../../diagrams/two-pass-diagram";
export { FramebufferDemo } from "../../framebuffer-demo";

const accent = "var(--accent)";
const success = "var(--success)";
const warning = "var(--warning)";

function Frame({ children, caption }: { children: ReactNode; caption: string }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        {children}
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption>
    </figure>
  );
}

const passRows = [
  {
    label: "第一遍：场景",
    target: "自建 FBO",
    viewport: "离屏附件尺寸",
    access: "写 color + depth",
    guard: "不能同时采样 color",
    color: accent,
  },
  {
    label: "切换边界",
    target: "绑定 0 / null",
    viewport: "窗口像素尺寸",
    access: "绑定 color 供采样",
    guard: "恢复每遍状态",
    color: warning,
  },
  {
    label: "第二遍：后处理",
    target: "默认 framebuffer",
    viewport: "窗口像素尺寸",
    access: "读 color texture",
    guard: "输出到另一目标",
    color: success,
  },
] as const;

export function FramebufferPassContractDiagram() {
  return (
    <Frame caption="每一遍都要明确四件事：写到哪、viewport 多大、哪些资源在读写、结束后恢复什么。采样当前仍挂在绘制目标上的纹理会形成未定义的反馈回路。">
      <div
        role="img"
        aria-label="帧缓冲两遍渲染状态表，第一遍写入离屏颜色和深度附件，切换时绑定默认帧缓冲并恢复窗口视口，第二遍读取离屏颜色纹理输出到默认帧缓冲，禁止同时读写同一附件"
        className="grid gap-3"
      >
        {passRows.map((row, index) => (
          <div
            key={row.label}
            className="grid gap-2 rounded-control border border-border bg-bg/40 p-3 text-xs sm:grid-cols-[1.2fr_1fr_1fr_1.2fr_1.35fr] sm:items-center"
          >
            <strong style={{ color: row.color }}>{index + 1}. {row.label}</strong>
            <span className="text-secondary">目标：{row.target}</span>
            <span className="text-secondary">视口：{row.viewport}</span>
            <span className="text-secondary">资源：{row.access}</span>
            <span style={{ color: row.color }}>{row.guard}</span>
          </div>
        ))}
      </div>
    </Frame>
  );
}
