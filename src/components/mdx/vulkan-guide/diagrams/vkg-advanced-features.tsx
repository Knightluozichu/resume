const contractStages = [
  ["Advertised", "API version + extension names", "入口可能存在"],
  ["Supported", "feature booleans + properties", "路径有资格"],
  ["Enabled", "device extensions + pNext chain", "设备合同开启"],
  ["Operational", "commands + limits + sync + tests", "路径可发布"],
] as const;

const tiers = [
  ["Baseline", "raster + core resource path", "所有合格设备"],
  ["Compute", "dispatch、storage resources、async opportunity", "核心能力 + queue/limits"],
  ["Bindless", "descriptor indexing feature bundle", "大量动态资源"],
  ["Geometry", "mesh/task shader", "GPU-driven geometry"],
  ["Ray tracing", "AS + RT pipeline/query", "反射、阴影、GI"],
  ["Shading rate", "pipeline/primitive/attachment VRS", "质量可控区域"],
] as const;

function Frame({ caption, children }: { caption: string; children: React.ReactNode }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div>
      <figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption>
    </figure>
  );
}

export function VkgAdvancedFeaturesDiagram() {
  return (
    <Frame caption="扩展名只是入口广告；只有 feature、limits、启用链、同步和测试都闭环，能力才可交付。">
      <div role="img" aria-label="Vulkan 扩展能力合同四阶段" className="grid gap-3">
        <strong className="border-b border-border pb-3 text-sm text-primary">Capability contract</strong>
        <div className="grid gap-3 md:grid-cols-4">
          {contractStages.map(([stage, evidence, result], index) => (
            <div key={stage} className="min-h-40 rounded-control border border-border bg-bg/45 p-4">
              <span className="mb-3 grid size-8 place-items-center rounded-full bg-accent/15 text-sm font-bold text-accent">{index + 1}</span>
              <strong className="block text-sm text-primary">{stage}</strong>
              <p className="mb-0 mt-2 text-xs leading-5 text-secondary">证据：{evidence}</p>
              <p className="mb-0 mt-1 text-xs font-medium text-primary">结论：{result}</p>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

export function VkgCapabilityTiersDiagram() {
  return (
    <Frame caption="高级路径按独立 tier 组合；不支持某一 tier 不应使 baseline 渲染器失效。">
      <div role="img" aria-label="Vulkan 高级能力分层矩阵" className="overflow-x-auto">
        <div className="min-w-[700px] overflow-hidden rounded-control border border-border">
          <div className="grid grid-cols-[1.2fr_2fr_1.5fr] gap-px bg-border text-xs">
            {['Tier', '能力合同', '产品用途'].map((label) => (
              <strong key={label} className="bg-bg p-3 text-primary">{label}</strong>
            ))}
            {tiers.flatMap((row) => row.map((cell, index) => (
              <span key={`${row[0]}-${cell}`} className={index === 0 ? "bg-accent/10 p-3 font-semibold text-accent" : "bg-elevated p-3 leading-5 text-secondary"}>{cell}</span>
            )))}
          </div>
        </div>
      </div>
    </Frame>
  );
}
