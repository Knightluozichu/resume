type Item = readonly [title: string, code: string, detail: string];

function LearningMap({
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

const projectItems = [
  ["Timber", "Ch 1-5", "变量、输入、循环、函数、碰撞与声音完成首个可玩项目。"],
  ["Pong", "Ch 6-7", "用 OOP、类与 AABB 物理解耦球拍、球和边界。"],
  [
    "Zombie Arena",
    "Ch 8-14",
    "View、引用、STL、资源、子弹、HUD、文件与波次组成中型项目。",
  ],
  [
    "Run! foundation",
    "Ch 15-16",
    "Factory、组件式对象、逻辑事件、SoundEngine 与 Player 建立架构。",
  ],
  [
    "Run! action",
    "Ch 17-19",
    "Camera、radar、平台、Animator、交互菜单与雨效完成主循环。",
  ],
  ["Run! finish", "Ch 20-21", "火球、空间音频、视差背景和 GLSL 形成完整游戏。"],
] as const;

const dependencyItems = [
  [
    "Language",
    "types -> flow -> functions",
    "先能表达状态、分支、循环和可复用规则。",
  ],
  [
    "Objects",
    "class -> ownership",
    "再让对象拥有状态，以 RAII 和 Factory 控制生命周期。",
  ],
  [
    "Realtime",
    "input -> update -> draw",
    "固定每帧事实顺序，dt 只推进一次逻辑。",
  ],
  [
    "World",
    "collision -> commands",
    "碰撞产生事实，增删对象在安全提交点执行。",
  ],
  [
    "Presentation",
    "view -> audio -> HUD",
    "表现层只消费提交快照，不反向决定玩法。",
  ],
  [
    "Finish",
    "effects -> clean gate",
    "视觉增强必须有降级，并通过完整回归与干净构建。",
  ],
] as const;

const evidenceItems = [
  ["Predict", "expected state", "运行前写出输入、状态边沿和输出预期。"],
  ["Implement", "small vertical slice", "一次只闭环一个规则与对应表现。"],
  [
    "Observe",
    "ids + frame logs",
    "记录帧号、对象 id、命令和事件，而非只看画面。",
  ],
  ["Test", "boundary cases", "覆盖暂停、重启、失败、极端 dt 与资源生命周期。"],
  ["Measure", "calls + voices + objects", "性能优化以计数与时间为证据。"],
  ["Prove", "clean replay", "固定回放和干净构建共同证明章节完成。"],
] as const;

export function BcgpThirdEditionJourneyMap() {
  return (
    <LearningMap
      ariaLabel="第三版四项目二十一章学习路线图"
      caption="第三版不是十个孤立主题，而是四个项目逐步扩大语言、实时系统和工程边界。"
      items={projectItems}
    />
  );
}

export function BcgpKnowledgeDependencyMap() {
  return (
    <LearningMap
      ariaLabel="语言对象实时世界表现完成六层知识依赖图"
      caption="每层依赖前一层的事实与所有权边界；跳过基础会在项目放大时集中暴露。"
      items={dependencyItems}
    />
  );
}

export function BcgpChapterEvidenceMap() {
  return (
    <LearningMap
      ariaLabel="预测实现观察测试测量证明六阶段章节验收图"
      caption="掌握不是看完页面：每章都要从预测走到可重复测试、测量和干净验证。"
      items={evidenceItems}
    />
  );
}
