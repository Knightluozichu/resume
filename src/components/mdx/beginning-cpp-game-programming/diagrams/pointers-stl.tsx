type Item = readonly [title: string, code: string, detail: string];

function PointerMap({
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

const pointerItems = [
  [
    "Object",
    "Zombie zombie",
    "对象拥有状态和生命周期；地址只在对象仍存在且未移动时有效。",
  ],
  [
    "Address",
    "Zombie* p = &zombie",
    "指针保存地址，可为空、可改指向，不自动拥有或延长对象生命。",
  ],
  [
    "Validate",
    "p != nullptr",
    "解引用前同时证明非空、类型正确、对齐有效和目标仍在生命周期内。",
  ],
  [
    "Dereference",
    "p->update(dt)",
    "箭头访问目标成员；复制指针只复制地址，不复制 Zombie。",
  ],
  [
    "Invalidate",
    "erase | reallocate",
    "容器删除、扩容或对象销毁可使地址失效，旧指针不能继续使用。",
  ],
  [
    "Prefer owner",
    "unique_ptr | value",
    "所有权用值或智能指针表达，原始指针主要表示可空非拥有观察。",
  ],
] as const;

const hordeItems = [
  [
    "Reserve",
    "vector.reserve(count)",
    "已知上限先保留容量，减少扩容；仍不能把容量当元素数量。",
  ],
  [
    "Construct",
    "emplace_back",
    "直接在容器内构造 Zombie，失败由 vector 回滚已完成对象。",
  ],
  [
    "Update",
    "for (Zombie& z : horde)",
    "引用遍历避免复制，每个对象使用同一 dt 和世界状态。",
  ],
  [
    "Filter",
    "erase_if",
    "删除死亡对象会使部分迭代器和指针失效，清理发生在安全阶段。",
  ],
  [
    "Query",
    "span<const Zombie>",
    "只读连续视图不拥有元素，调用期禁止让 vector 重分配。",
  ],
  [
    "Verify",
    "0,1,1000 + failure",
    "空群、单体、大群、容量变化和删除都检查数量、地址假设与帧预算。",
  ],
] as const;

const textureItems = [
  [
    "Load once",
    "Texture playerTexture",
    "初始化阶段加载并检查失败，生成每只僵尸时不重复读盘和上传。",
  ],
  [
    "Store stable",
    "map<string, Texture>",
    "资源容器保证纹理对象地址在精灵使用期稳定，接口返回只读引用。",
  ],
  [
    "Borrow",
    "sprite.setTexture(texture)",
    "Sprite 保存 Texture 关联但不拥有图像数据，资源必须更长寿。",
  ],
  [
    "Share",
    "1000 sprites -> 1 texture",
    "同类型僵尸共享纹理，各自只保存位置、变换和玩法状态。",
  ],
  [
    "Reload",
    "replace with protocol",
    "热重载不能销毁旧纹理后留下悬空精灵，要原位更新或重新绑定。",
  ],
  [
    "Shutdown",
    "horde before cache",
    "先销毁借用纹理的精灵和实体，再销毁资源库，关闭顺序与所有权图一致。",
  ],
] as const;

export function BcgpPointerLifetimeMap() {
  return (
    <PointerMap
      ariaLabel="第十章对象地址指针验证解引用失效所有权六项生命周期图"
      caption="指针只是地址值；每次解引用都依赖目标对象仍存活且地址没有因容器操作失效。"
      items={pointerItems}
    />
  );
}

export function BcgpZombieVectorMap() {
  return (
    <PointerMap
      ariaLabel="僵尸群 vector 预留构造更新删除只读视图验证六阶段图"
      caption="STL 容器负责元素生命周期；扩容和删除的失效规则决定哪些观察指针可以保存。"
      items={hordeItems}
    />
  );
}

export function BcgpTextureBorrowMap() {
  return (
    <PointerMap
      ariaLabel="纹理加载稳定存储精灵借用共享热重载关闭六阶段图"
      caption="纹理管理的核心是只加载一次、地址稳定和借用期明确，第 11 章再把协议封装成 TextureHolder。"
      items={textureItems}
    />
  );
}
