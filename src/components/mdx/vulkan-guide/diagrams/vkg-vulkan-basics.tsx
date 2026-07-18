const objectLayers = [
  {
    label: "Instance",
    detail: "loader 版本、实例扩展、validation 与 debug messenger",
    tone: "border-sky-500/45 bg-sky-500/10",
  },
  {
    label: "Physical device",
    detail: "properties、features、extensions、formats 与 queue families",
    tone: "border-emerald-500/45 bg-emerald-500/10",
  },
  {
    label: "Logical device",
    detail: "只启用已查询且路径需要的 feature 与 device extension",
    tone: "border-amber-500/45 bg-amber-500/10",
  },
  {
    label: "Queues and resources",
    detail: "queue、memory、buffer/image、pipeline、command 与同步对象",
    tone: "border-rose-500/45 bg-rose-500/10",
  },
] as const;

const syncRows = [
  ["Pipeline barrier", "命令流内部", "stage/access、layout、ownership", "不能跨 queue submission signal"],
  ["Binary semaphore", "queue / WSI", "acquire、submit、present 的一次接力", "host 不能直接等待"],
  ["Timeline semaphore", "queue / 应用进度", "单调 value、跨提交或跨队列依赖", "WSI acquire/present 不使用 timeline"],
  ["Fence", "queue → host", "host 判断一次提交何时完成", "不建立命令流内的资源屏障"],
] as const;

function Figure({
  caption,
  children,
}: {
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        {children}
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        {caption}
      </figcaption>
    </figure>
  );
}

export function VkgVulkanBasicsDiagram() {
  return (
    <Figure caption="创建对象之前先形成能力合同；下层对象只能使用上层已协商并启用的能力。">
      <div role="img" aria-label="Vulkan 对象层级和能力协商关系" className="grid gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
          <strong className="text-sm text-primary">Vulkan 对象与能力合同</strong>
          <span className="text-xs text-secondary">query → verify → enable → use</span>
        </div>
        <div className="grid gap-3 lg:grid-cols-4">
          {objectLayers.map((item, index) => (
            <div key={item.label} className={`min-h-36 rounded-control border p-4 ${item.tone}`}>
              <div className="mb-3 flex items-center gap-2">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-bg text-xs font-bold text-primary">
                  {index + 1}
                </span>
                <strong className="text-sm text-primary">{item.label}</strong>
              </div>
              <p className="m-0 text-xs leading-5 text-secondary">{item.detail}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-2 text-xs text-secondary sm:grid-cols-3">
          <span className="rounded-control border border-border bg-bg/45 p-3">查询到不等于已启用</span>
          <span className="rounded-control border border-border bg-bg/45 p-3">扩展存在不等于 feature 为 true</span>
          <span className="rounded-control border border-border bg-bg/45 p-3">验证层无报错不等于同步最优</span>
        </div>
      </div>
    </Figure>
  );
}

export function VkgSynchronizationMatrixDiagram() {
  return (
    <Figure caption="先判断依赖发生在哪个边界，再选择 barrier、semaphore 或 fence。">
      <div role="img" aria-label="Vulkan 同步工具选择矩阵" className="overflow-x-auto">
        <div className="min-w-[720px]">
          <div className="grid grid-cols-[1.2fr_1fr_2fr_1.7fr] gap-px overflow-hidden rounded-control border border-border bg-border text-xs">
            {[
              "工具",
              "边界",
              "它建立什么",
              "不能替代什么",
            ].map((heading) => (
              <strong key={heading} className="bg-bg p-3 text-primary">{heading}</strong>
            ))}
            {syncRows.flatMap((row) =>
              row.map((cell, index) => (
                <span
                  key={`${row[0]}-${cell}`}
                  className={`p-3 leading-5 ${index === 0 ? "bg-accent/10 font-semibold text-accent" : "bg-elevated text-secondary"}`}
                >
                  {cell}
                </span>
              )),
            )}
          </div>
        </div>
      </div>
    </Figure>
  );
}
