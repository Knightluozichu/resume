const contractStages = [
  ["Loader + Instance", "协商实例版本，启用平台 surface 与 debug utils"],
  ["Enumerate", "列出所有 physical devices，不假设第一块就是目标"],
  ["Qualify", "核验 feature、extension、queue、surface、format 与 limit"],
  ["Create Device", "启用最小 feature 链，按唯一 family 请求 queues"],
] as const;

const candidateRows = [
  ["候选 A：独显", "满足", "满足", "8 GB", "高性能路径"],
  ["候选 B：集显", "满足", "满足", "共享", "低功耗路径"],
  ["候选 C：旧独显", "缺 dynamic rendering", "满足", "4 GB", "淘汰或兼容路径"],
] as const;

function Frame({ caption, children }: { caption: string; children: React.ReactNode }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div>
      <figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption>
    </figure>
  );
}

export function VkgInstanceDeviceDiagram() {
  return (
    <Frame caption="设备初始化是先淘汰不合格候选，再按产品目标排序，而不是取枚举结果的第一项。">
      <div role="img" aria-label="Vulkan 实例与设备能力筛选流程" className="grid gap-3">
        <strong className="text-sm text-primary">实例到逻辑设备：两道门</strong>
        <div className="grid gap-3 md:grid-cols-4">
          {contractStages.map(([title, detail], index) => (
            <div key={title} className="min-h-36 rounded-control border border-border bg-bg/45 p-4">
              <span className="mb-3 grid size-8 place-items-center rounded-full bg-accent/15 text-sm font-bold text-accent">{index + 1}</span>
              <strong className="block text-sm text-primary">{title}</strong>
              <p className="mb-0 mt-2 text-xs leading-5 text-secondary">{detail}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="rounded-control border border-rose-500/40 bg-rose-500/10 p-3 text-xs text-secondary">
            <strong className="text-rose-600 dark:text-rose-300">资格门</strong>：任一 required 条件失败即淘汰
          </div>
          <div className="rounded-control border border-emerald-500/40 bg-emerald-500/10 p-3 text-xs text-secondary">
            <strong className="text-emerald-700 dark:text-emerald-300">偏好门</strong>：仅在合格候选间比较性能、功耗和内存
          </div>
        </div>
      </div>
    </Frame>
  );
}

export function VkgDeviceCandidateDiagram() {
  return (
    <Frame caption="设备类型只能参与偏好评分；required feature 缺失仍会使高性能硬件失去资格。">
      <div role="img" aria-label="Vulkan 物理设备候选筛选矩阵" className="overflow-x-auto">
        <div className="min-w-[680px] overflow-hidden rounded-control border border-border">
          <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr_1.4fr] gap-px bg-border text-xs">
            {["设备", "必需 feature", "present/format", "内存", "决策"].map((item) => (
              <strong key={item} className="bg-bg p-3 text-primary">{item}</strong>
            ))}
            {candidateRows.flatMap((row, rowIndex) =>
              row.map((cell, columnIndex) => (
                <span
                  key={`${row[0]}-${cell}`}
                  className={`p-3 leading-5 ${
                    rowIndex === 2 && columnIndex > 0
                      ? "bg-rose-500/10 text-rose-700 dark:text-rose-300"
                      : columnIndex === 0
                        ? "bg-accent/10 font-semibold text-accent"
                        : "bg-elevated text-secondary"
                  }`}
                >
                  {cell}
                </span>
              )),
            )}
          </div>
        </div>
      </div>
    </Frame>
  );
}
