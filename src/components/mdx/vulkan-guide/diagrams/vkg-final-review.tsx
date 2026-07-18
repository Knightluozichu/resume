const contracts = [
  ["Capability", "version / feature / extension / format / queue"],
  ["Resource", "allocation / binding / subresource / lifetime"],
  ["Interface", "SPIR-V / descriptors / pipeline / attachments"],
  ["Execution", "commands / barriers / submit2 / WSI"],
  ["Evidence", "validation / capture / timing / fallback / recovery"],
] as const;

const evidenceRows = [
  ["启动", "设备合同与 tier 报告", "为何选择设备和路径"],
  ["录制", "对象名、command labels、resource states", "哪次访问使用什么状态"],
  ["提交", "wait/signal values、fence、image index", "何时可执行和回收"],
  ["结果", "validation、截图、GPU timestamps", "正确性、画质与成本"],
  ["故障", "最小复现、device fault/driver info", "可定位、可回退、可恢复"],
] as const;

function Frame({ caption, children }: { caption: string; children: React.ReactNode }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div>
      <figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption>
    </figure>
  );
}

export function VkgFinalReviewDiagram() {
  return (
    <Frame caption="十个学习单元最终收敛成五类可检查合同；任何一类缺失都可能让首帧只在单机偶然成功。">
      <div role="img" aria-label="Vulkan 全书五类工程合同" className="grid gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
          <strong className="text-sm text-primary">First frame contract stack</strong>
          <span className="text-xs text-secondary">query → allocate → describe → execute → prove</span>
        </div>
        <div className="grid gap-3 lg:grid-cols-5">
          {contracts.map(([name, detail], index) => (
            <div key={name} className="min-h-36 rounded-control border border-border bg-bg/45 p-4">
              <span className="mb-3 grid size-8 place-items-center rounded-full bg-accent/15 text-sm font-bold text-accent">{index + 1}</span>
              <strong className="block text-sm text-primary">{name}</strong>
              <p className="mb-0 mt-2 text-xs leading-5 text-secondary">{detail}</p>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

export function VkgEvidenceChainDiagram() {
  return (
    <Frame caption="“没有 validation error”只是证据之一；启动选择、同步时序、输出和故障复现共同构成交付证明。">
      <div role="img" aria-label="Vulkan 正确性与性能证据链" className="overflow-x-auto">
        <div className="min-w-[720px] overflow-hidden rounded-control border border-border">
          <div className="grid grid-cols-[1fr_2fr_2fr] gap-px bg-border text-xs">
            {['阶段', '证据', '回答的问题'].map((label) => (
              <strong key={label} className="bg-bg p-3 text-primary">{label}</strong>
            ))}
            {evidenceRows.flatMap((row) => row.map((cell, index) => (
              <span key={`${row[0]}-${cell}`} className={index === 0 ? "bg-accent/10 p-3 font-semibold text-accent" : "bg-elevated p-3 leading-5 text-secondary"}>{cell}</span>
            )))}
          </div>
        </div>
      </div>
    </Frame>
  );
}
