type Item = readonly [title: string, code: string, detail: string];

function ReviewMap({
  ariaLabel,
  caption,
  items,
}: {
  ariaLabel: string;
  caption: string;
  items: readonly Item[];
}) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label={ariaLabel}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map(([title, code, detail], index) => (
            <section
              key={title}
              className="min-h-40 border border-border bg-bg/40 p-4"
            >
              <span className="text-xs tabular-nums text-secondary">
                0{index + 1}
              </span>
              <strong className="mt-3 block text-sm text-primary">
                {title}
              </strong>
              <code className="mt-3 block text-xs text-accent">{code}</code>
              <p className="mb-0 mt-3 text-xs leading-5 text-secondary">
                {detail}
              </p>
            </section>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        {caption}
      </figcaption>
    </figure>
  );
}

const transferItems = [
  ["Timber", "state + loop", "把语言语句放进持续运行、时间驱动的程序。"],
  ["Pong", "objects + collision", "让类拥有状态，并把接触检测变成物理解算。"],
  [
    "Zombie Arena",
    "collections + resources",
    "管理对象群、投射物、资源、HUD 和存档。",
  ],
  [
    "Run! core",
    "factory + commands",
    "通过组合、稳定 id、命令和事件控制复杂度。",
  ],
  [
    "Run! presentation",
    "camera + animator + audio",
    "表现系统消费提交快照并允许降级。",
  ],
  [
    "Run! release",
    "shader + clean gate",
    "视觉增强、性能与干净构建共同证明完成。",
  ],
] as const;

const frameItems = [
  ["Intent", "InputMapper", "设备输入转换为普通意图和一次边沿。"],
  [
    "Update",
    "GameObject behaviors",
    "对象使用受限 dt 计算候选状态并追加命令。",
  ],
  ["Resolve", "collision + rules", "接触、伤害、落地和终局由规则层确认。"],
  ["Commit", "WorldCommand", "安全点统一生成、移动、伤害和销毁。"],
  ["Publish", "events + snapshots", "事实与只读快照交给表现系统。"],
  ["Present", "audio + HUD + draw", "声音、动画、相机和渲染不反向改规则。"],
] as const;

const gateItems = [
  ["Correctness", "fixed replay", "固定 seed、输入与步长得到同一事件序列。"],
  ["Lifecycle", "RAII + failure", "资源失败不发布半对象，销毁后没有悬空引用。"],
  ["States", "pause + restart", "阶段转换清输入、命令、声音并管理逻辑时间。"],
  [
    "Presentation",
    "fallback paths",
    "音频、雨效与 shader 失败时核心玩法仍可完成。",
  ],
  [
    "Performance",
    "budget counters",
    "对象、calls、voice、粒子和帧阶段有界可测。",
  ],
  ["Release", "clean package smoke", "干净构建从发布目录走完整关键路径。"],
] as const;

export function BcgpProjectTransferMap() {
  return (
    <ReviewMap
      ariaLabel="Timber Pong Zombie Arena Run 核心表现发布六阶段能力迁移图"
      caption="四个项目不是并列样例：每一步都把前一项目的能力放大到新的所有权与协作边界。"
      items={transferItems}
    />
  );
}

export function BcgpEndToEndFrameMap() {
  return (
    <ReviewMap
      ariaLabel="输入更新解算提交发布表现六阶段完整帧图"
      caption="一次帧内只有规则层确认事实；表现系统从事件和快照生成声音、HUD 与 draw calls。"
      items={frameItems}
    />
  );
}

export function BcgpCompletionGateMap() {
  return (
    <ReviewMap
      ariaLabel="正确性生命周期状态表现性能发布六项整书完成门禁图"
      caption="掌握与完成都需要可重复证据；窗口能打开或单次通关不足以证明系统可靠。"
      items={gateItems}
    />
  );
}
