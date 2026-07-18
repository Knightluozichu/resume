const lifecycle = [
  ["Before", "barrier2", "producer writes → attachment access + layout"],
  ["Begin", "VkRenderingInfo", "views、load/store、clear、render area"],
  ["Draw", "pipeline contract", "formats、samples、layout 与实际附件一致"],
  ["After", "barrier2", "attachment writes → next read/present + layout"],
] as const;

const comparison = [
  ["对象", "VkRenderingInfo 在录制时给出", "VkRenderPass + VkFramebuffer 预创建"],
  ["Pipeline 合同", "VkPipelineRenderingCreateInfo formats", "兼容 render pass + subpass"],
  ["多阶段局部读取", "多个 rendering instance + barriers", "subpass + input attachment 可能局部保留"],
  ["同步/layout", "应用显式 barrier", "subpass dependencies + 隐式转换，仍需正确 scope"],
] as const;

function Frame({ caption, children }: { caption: string; children: React.ReactNode }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div>
      <figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption>
    </figure>
  );
}

export function VkgRenderPassDiagram() {
  return (
    <Frame caption="Dynamic rendering 只改变附件描述方式；前后访问依赖和 layout transition 仍由应用建立。">
      <div role="img" aria-label="Vulkan dynamic rendering 附件生命周期" className="grid gap-3">
        <strong className="border-b border-border pb-3 text-sm text-primary">Attachment lifecycle</strong>
        <div className="grid gap-3 md:grid-cols-4">
          {lifecycle.map(([phase, api, detail], index) => (
            <div key={phase} className="min-h-36 rounded-control border border-border bg-bg/45 p-4">
              <span className="mb-3 grid size-8 place-items-center rounded-full bg-accent/15 text-sm font-bold text-accent">{index + 1}</span>
              <strong className="block text-sm text-primary">{phase}</strong>
              <code className="mt-2 block text-xs text-accent">{api}</code>
              <p className="mb-0 mt-2 text-xs leading-5 text-secondary">{detail}</p>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

export function VkgRenderingModelDiagram() {
  return (
    <Frame caption="现代主线和 legacy render pass 都有效；选择取决于附件局部性、平台和引擎架构。">
      <div role="img" aria-label="Dynamic rendering 与 legacy render pass 对比" className="overflow-x-auto">
        <div className="min-w-[760px] overflow-hidden rounded-control border border-border">
          <div className="grid grid-cols-[1.2fr_2fr_2fr] gap-px bg-border text-xs">
            {['维度', 'Dynamic rendering', 'Legacy render pass'].map((label) => (
              <strong key={label} className="bg-bg p-3 text-primary">{label}</strong>
            ))}
            {comparison.flatMap((row) => row.map((cell, index) => (
              <span key={`${row[0]}-${cell}`} className={index === 0 ? "bg-accent/10 p-3 font-semibold text-accent" : "bg-elevated p-3 leading-5 text-secondary"}>{cell}</span>
            )))}
          </div>
        </div>
      </div>
    </Frame>
  );
}
