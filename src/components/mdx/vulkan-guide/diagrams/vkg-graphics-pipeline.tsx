const interfaceRows = [
  ["Shader stages", "SPIR-V entry points", "location、descriptor、push constant"],
  ["Pipeline layout", "set layouts + push ranges", "shader 资源接口兼容"],
  ["Rendering formats", "color/depth/stencil + samples", "dynamic rendering 附件合同"],
  ["Fixed/dynamic state", "raster、depth、blend、viewport", "创建时固定或录制时显式设置"],
] as const;

const stateRows = [
  ["Shader stages", "固定", "切换 pipeline 或使用扩展路径"],
  ["Attachment formats", "固定合同", "重建格式相关 pipeline"],
  ["Viewport / scissor", "常设动态", "每次录制显式 vkCmdSet*"],
  ["Cull/front face/depth", "核心或扩展动态", "先查询 feature，再加入 dynamic state"],
] as const;

function Frame({ caption, children }: { caption: string; children: React.ReactNode }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div>
      <figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption>
    </figure>
  );
}

export function VkgGraphicsPipelineDiagram() {
  return (
    <Frame caption="VkPipeline 把四类接口合同组合起来；draw 只有同时满足这些合同才有定义。">
      <div role="img" aria-label="Vulkan 图形管线接口合同" className="grid gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
          <strong className="text-sm text-primary">Graphics pipeline contract</strong>
          <span className="text-xs text-secondary">shader ↔ resources ↔ attachments ↔ command state</span>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {interfaceRows.map(([title, object, contract], index) => (
            <div key={title} className="rounded-control border border-border bg-bg/45 p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="grid size-7 place-items-center rounded-full bg-accent/15 text-xs font-bold text-accent">{index + 1}</span>
                <strong className="text-sm text-primary">{title}</strong>
              </div>
              <p className="m-0 text-xs leading-5 text-secondary">{object}</p>
              <p className="mb-0 mt-2 text-xs font-medium leading-5 text-primary">验证：{contract}</p>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

export function VkgPipelineStateDiagram() {
  return (
    <Frame caption="动态状态减少组合数量，但把责任转移到命令录制；未设置的动态状态不是默认值。">
      <div role="img" aria-label="Vulkan 固定状态和动态状态选择矩阵" className="overflow-x-auto">
        <div className="min-w-[660px] overflow-hidden rounded-control border border-border">
          <div className="grid grid-cols-[1.4fr_1fr_2fr] gap-px bg-border text-xs">
            {['状态', '常见选择', '变化时的责任'].map((label) => (
              <strong key={label} className="bg-bg p-3 text-primary">{label}</strong>
            ))}
            {stateRows.flatMap((row) => row.map((cell, index) => (
              <span key={`${row[0]}-${cell}`} className={index === 0 ? "bg-accent/10 p-3 font-semibold text-accent" : "bg-elevated p-3 leading-5 text-secondary"}>{cell}</span>
            )))}
          </div>
        </div>
      </div>
    </Frame>
  );
}
