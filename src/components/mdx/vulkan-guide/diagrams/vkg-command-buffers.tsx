const states = [
  ["Initial", "allocate / reset", "可 begin"],
  ["Recording", "vkBeginCommandBuffer", "只能录制合法命令"],
  ["Executable", "vkEndCommandBuffer", "可 submit 或按规则重录"],
  ["Pending", "queue submission", "GPU 可能仍引用，禁止 reset"],
] as const;

const ownershipRows = [
  ["Command pool", "一个 worker + 一个 frame slot", "pool/reset/allocate 需 host 外部同步"],
  ["Command buffer", "从所属 pool 分配", "Pending 前不得 reset/free"],
  ["Queue", "提交线程或显式 mutex", "同一 queue host access 外部同步"],
  ["Referenced resources", "resource manager / frame generation", "执行完成前保持有效且同步可见"],
] as const;

function Frame({ caption, children }: { caption: string; children: React.ReactNode }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">{children}</div>
      <figcaption className="mt-2 text-center text-sm text-secondary">{caption}</figcaption>
    </figure>
  );
}

export function VkgCommandBuffersDiagram() {
  return (
    <Frame caption="Fence 或 timeline progress 证明 Pending 工作完成后，command buffer 才能安全回到可重用状态。">
      <div role="img" aria-label="Vulkan command buffer 生命周期状态机" className="grid gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
          <strong className="text-sm text-primary">Command buffer state machine</strong>
          <span className="text-xs text-secondary">recording 本身不执行 GPU 工作</span>
        </div>
        <div className="grid gap-3 md:grid-cols-4">
          {states.map(([state, transition, rule], index) => (
            <div key={state} className={`min-h-36 rounded-control border p-4 ${state === 'Pending' ? 'border-rose-500/40 bg-rose-500/10' : 'border-border bg-bg/45'}`}>
              <span className="mb-3 grid size-8 place-items-center rounded-full bg-accent/15 text-sm font-bold text-accent">{index + 1}</span>
              <strong className="block text-sm text-primary">{state}</strong>
              <p className="mb-0 mt-2 text-xs leading-5 text-secondary">进入：{transition}</p>
              <p className="mb-0 mt-1 text-xs font-medium leading-5 text-primary">{rule}</p>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

export function VkgCommandOwnershipDiagram() {
  return (
    <Frame caption="并行录制来自明确分片的 pool 所有权；共享 pool 或 queue 必须串行化 host 访问。">
      <div role="img" aria-label="Vulkan command 对象线程所有权矩阵" className="overflow-x-auto">
        <div className="min-w-[700px] overflow-hidden rounded-control border border-border">
          <div className="grid grid-cols-[1.2fr_1.7fr_2fr] gap-px bg-border text-xs">
            {['对象', '推荐所有权', '关键约束'].map((label) => (
              <strong key={label} className="bg-bg p-3 text-primary">{label}</strong>
            ))}
            {ownershipRows.flatMap((row) => row.map((cell, index) => (
              <span key={`${row[0]}-${cell}`} className={index === 0 ? "bg-accent/10 p-3 font-semibold text-accent" : "bg-elevated p-3 leading-5 text-secondary"}>{cell}</span>
            )))}
          </div>
        </div>
      </div>
    </Frame>
  );
}
