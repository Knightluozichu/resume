type Item = readonly [title: string, code: string, detail: string];

function RunMap({
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

const objectItems = [
  [
    "Identity",
    "GameObjectId",
    "稳定 id 连接事件和查询，不把 vector 元素地址当永久身份。",
  ],
  [
    "Transform",
    "position + bounds",
    "对象拥有共享空间状态，Update 与 Graphics 通过明确上下文访问。",
  ],
  [
    "Update behavior",
    "unique_ptr<Update>",
    "可替换行为按 dt 推进逻辑，不依赖具体渲染类。",
  ],
  [
    "Graphics behavior",
    "unique_ptr<Graphics>",
    "只读取提交后状态绘制，不在 draw 中改变玩法。",
  ],
  [
    "Ownership",
    "Game owns GameObject",
    "对象独占拥有组件，销毁时自动按成员顺序清理。",
  ],
  [
    "Loop",
    "for object update/draw",
    "新增对象类型不改变主循环，只改变 Factory 组装的行为组合。",
  ],
] as const;

const factoryItems = [
  [
    "Request",
    "Archetype::Player",
    "调用者表达要创建的角色，不知道具体组件构造顺序。",
  ],
  [
    "Validate",
    "resources + spawn",
    "工厂检查纹理、声音、参数和位置，失败不发布半对象。",
  ],
  [
    "Allocate",
    "make_unique<GameObject>",
    "局部独占对象承载构建，异常自动清理已创建组件。",
  ],
  [
    "Compose",
    "Update + Graphics",
    "按 archetype 注入行为和共享配置，不让组件访问全局单例。",
  ],
  ["Commit", "return unique_ptr", "完整对象按移动所有权交给世界容器。"],
  [
    "Verify",
    "type + invariants",
    "每个 archetype 测试组件集合、初值、资源借用和失败回滚。",
  ],
] as const;

const ecsItems = [
  [
    "Inheritance",
    "virtual interface",
    "运行时多态替换 Update/Graphics，实现接口一致但有间接调用。",
  ],
  [
    "Composition",
    "object has behaviors",
    "组合多个小职责，避免 Player->Character->Entity 深继承树。",
  ],
  [
    "Component object",
    "per-object polymorphism",
    "本书 GameObject 持有行为对象，状态仍围绕对象组织。",
  ],
  [
    "ECS entity",
    "integer id",
    "实体只是 id，组件按类型存储，系统批量处理匹配组件。",
  ],
  [
    "ECS system",
    "Position + Velocity",
    "系统查询组件集合，不经每对象虚函数更新。",
  ],
  [
    "Decision",
    "scale + tooling + profile",
    "小项目组件对象足够，数据规模和性能证据再决定是否迁移 ECS。",
  ],
] as const;

export function BcgpRunObjectMap() {
  return (
    <RunMap
      ariaLabel="Run GameObject 身份变换更新行为图形行为所有权循环六项组合图"
      caption="GameObject 组合更新和图形行为，主循环只依赖稳定接口；新增实体不改循环骨架。"
      items={objectItems}
    />
  );
}

export function BcgpFactoryBuildMap() {
  return (
    <RunMap
      ariaLabel="Factory 请求验证分配组合提交验证六阶段构造图"
      caption="Factory 在局部完成资源与组件组装，成功后交出 unique_ptr，失败不泄漏半对象。"
      items={factoryItems}
    />
  );
}

export function BcgpEcsComparisonMap() {
  return (
    <RunMap
      ariaLabel="继承组合组件对象 ECS 实体 ECS 系统决策六项比较图"
      caption="书中的组件式对象不是完整 ECS；两者在身份、存储和更新调度上有明确差异。"
      items={ecsItems}
    />
  );
}
