const FIRST_FRAME = [
  ["Loader 与 Instance", "协商 API 版本、实例扩展和验证层"],
  ["设备能力契约", "物理设备、队列族、feature、extension、format"],
  ["Device 与队列", "只启用已查询能力，取得 graphics/present/transfer queue"],
  ["资源与接口", "内存、buffer/image、descriptor、SPIR-V、pipeline layout"],
  ["Pipeline 与 Rendering", "动态状态、dynamic rendering、附件和布局"],
  ["命令与提交", "录制、barrier2、submit2、semaphore/fence、present"],
] as const;

const CORE_UNITS = [
  "架构/版本/验证/SPIR-V",
  "实例/设备/队列/特性",
  "WSI/Surface/Swapchain",
  "内存/Buffer/Image/所有权",
  "Shader/Descriptor/Push Constant",
  "Pipeline/Dynamic Rendering",
  "Command Buffer/Threading",
  "Synchronization2/Timeline",
  "附件/Layout/Legacy Render Pass",
  "Compute/Ray Tracing/Mesh/VRS",
] as const;

export function VkgLearningMapDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <div
          role="img"
          aria-label="Vulkan 第一帧六段依赖和十个官方核心单元学习地图"
          className="grid gap-5"
        >
          <section>
            <h3 className="text-sm font-bold text-primary">第一帧的六段依赖</h3>
            <div className="mt-3 grid gap-2 md:grid-cols-3">
              {FIRST_FRAME.map(([title, detail], index) => (
                <div
                  key={title}
                  className="min-h-28 rounded-control border border-accent/50 bg-accent/10 p-3"
                >
                  <span className="font-mono text-xs text-secondary">{index + 1}</span>
                  <strong className="mt-2 block text-sm text-accent">{title}</strong>
                  <p className="mt-2 text-xs leading-5 text-secondary">{detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-sm font-bold text-primary">十个权威核心单元</h3>
            <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
              {CORE_UNITS.map((unit, index) => (
                <div
                  key={unit}
                  className="grid min-h-20 content-center rounded-control border border-border bg-bg/40 p-3 text-center"
                >
                  <span className="font-mono text-xs text-secondary">{index + 1}</span>
                  <strong className="mt-1 text-xs leading-5 text-primary">{unit}</strong>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Vulkan 的第一帧不是固定五步初始化，而是能力、资源、状态、命令和同步组成的依赖图
      </figcaption>
    </figure>
  );
}

const SUBMISSION_CHAIN = [
  ["Acquire", "获取 swapchain image；WSI binary semaphore 表示图像可用"],
  ["Record", "barrier2 转换布局，beginRendering，bind/draw，结束并转 PRESENT"],
  ["Submit2", "等待 acquire，提交 command buffer，signal timeline 与 render-finished"],
  ["Present", "present queue 等待 render-finished，再把图像交给呈现引擎"],
  ["Recycle", "确认该帧/图像资源完成后，才重置 pool、复用 semaphore 和 CPU 数据"],
] as const;

export function VkgSubmissionChainDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4">
        <div
          role="img"
          aria-label="Vulkan 从获取交换链图像到录制、提交、呈现和资源复用的同步链"
          className="grid gap-2 md:grid-cols-5"
        >
          {SUBMISSION_CHAIN.map(([title, detail], index) => (
            <div
              key={title}
              className="relative min-h-36 rounded-control border border-border bg-bg/40 p-3"
            >
              <span className="font-mono text-xs text-secondary">{index + 1}</span>
              <strong className="mt-2 block text-sm text-accent">{title}</strong>
              <p className="mt-2 text-xs leading-5 text-secondary">{detail}</p>
              {index < SUBMISSION_CHAIN.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 text-accent md:block"
                >
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        queue submission 只建立提交边界；正确性还取决于阶段、访问、布局和资源复用时机
      </figcaption>
    </figure>
  );
}
