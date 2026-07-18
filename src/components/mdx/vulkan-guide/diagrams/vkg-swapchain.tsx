const frameStages = [
  ["Acquire", "WSI 返回 imageIndex，并 signal imageAvailable[frame]"],
  ["Record", "按实际旧 layout 过渡，绘制到 images[imageIndex]"],
  ["Submit", "wait acquire，signal renderFinished[imageIndex]"],
  ["Present", "present queue 等待该 image 的完成信号量"],
] as const;

const resultRows = [
  ["VK_SUCCESS", "继续", "正常呈现"],
  ["VK_SUBOPTIMAL_KHR", "可继续", "标记重建，当前帧通常仍可完成"],
  ["VK_ERROR_OUT_OF_DATE_KHR", "停止当前路径", "重新查询 surface 并重建"],
  ["VK_ERROR_SURFACE_LOST_KHR", "surface 无效", "重建 surface，再重建 swapchain"],
] as const;

function Frame({ caption, children }: { caption: string; children: React.ReactNode }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div>
      <figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption>
    </figure>
  );
}

export function VkgSwapchainDiagram() {
  return (
    <Frame caption="frame index 管 CPU 侧帧资源，image index 管本次取得的 WSI 图像；两者不能混为一个下标。">
      <div role="img" aria-label="Vulkan acquire submit present 生命周期" className="grid gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
          <strong className="text-sm text-primary">WSI 一帧的所有权接力</strong>
          <span className="text-xs text-secondary">frameIndex ≠ imageIndex</span>
        </div>
        <div className="grid gap-3 md:grid-cols-4">
          {frameStages.map(([title, detail], index) => (
            <div key={title} className="min-h-36 rounded-control border border-border bg-bg/45 p-4">
              <span className="mb-3 grid size-8 place-items-center rounded-full bg-accent/15 text-sm font-bold text-accent">{index + 1}</span>
              <strong className="text-sm text-primary">{title}</strong>
              <p className="mb-0 mt-2 text-xs leading-5 text-secondary">{detail}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-2 text-xs sm:grid-cols-2">
          <span className="rounded-control border border-sky-500/35 bg-sky-500/10 p-3 text-secondary">每帧：command pool、fence、acquire semaphore</span>
          <span className="rounded-control border border-emerald-500/35 bg-emerald-500/10 p-3 text-secondary">每图像：image view、layout 历史、present-wait semaphore</span>
        </div>
      </div>
    </Frame>
  );
}

export function VkgSwapchainResultDiagram() {
  return (
    <Frame caption="Acquire 和 present 都是状态机入口；返回码决定继续、延后重建还是重建 surface。">
      <div role="img" aria-label="Vulkan WSI 返回码决策矩阵" className="overflow-x-auto">
        <div className="min-w-[660px] overflow-hidden rounded-control border border-border">
          <div className="grid grid-cols-[1.5fr_1fr_2fr] gap-px bg-border text-xs">
            {['返回码', '当前帧', '动作'].map((label) => (
              <strong key={label} className="bg-bg p-3 text-primary">{label}</strong>
            ))}
            {resultRows.flatMap((row, rowIndex) =>
              row.map((cell, columnIndex) => (
                <span
                  key={`${row[0]}-${cell}`}
                  className={`p-3 leading-5 ${
                    columnIndex === 0
                      ? rowIndex >= 2
                        ? "bg-rose-500/10 font-semibold text-rose-700 dark:text-rose-300"
                        : "bg-accent/10 font-semibold text-accent"
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
