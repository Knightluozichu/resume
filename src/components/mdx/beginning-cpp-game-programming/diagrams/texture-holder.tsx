type Item = readonly [title: string, code: string, detail: string];

function HolderMap({
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

const cacheItems = [
  [
    "Normalize key",
    "asset path",
    "同一资源不同相对写法先规范化，避免重复缓存。",
  ],
  [
    "Lookup",
    "map.find(key)",
    "命中直接返回稳定 const 引用，不重复解码和上传。",
  ],
  [
    "Load candidate",
    "sf::Texture texture",
    "未命中先在局部对象加载，失败不污染缓存。",
  ],
  [
    "Commit",
    "try_emplace",
    "成功后一次移入节点式容器，处理并发或重复插入结果。",
  ],
  [
    "Borrow",
    "const Texture&",
    "Sprite 只借用，缓存禁止在借用期 erase 对应条目。",
  ],
  [
    "Shutdown",
    "entities then holder",
    "先销毁 Sprite/僵尸，再销毁缓存和图形上下文。",
  ],
] as const;

const singletonItems = [
  [
    "Private constructor",
    "TextureHolder()",
    "阻止调用者任意构造多个缓存实例。",
  ],
  [
    "Static accessor",
    "getInstance()",
    "函数局部 static 在首次调用构造，C++11 起初始化线程安全。",
  ],
  [
    "One identity",
    "deleted copy/move",
    "删除复制移动，避免误复制资源库并破坏借用地址。",
  ],
  [
    "Hidden dependency",
    "global access",
    "任何函数都可取缓存，调用签名看不出 I/O 和资源依赖。",
  ],
  [
    "Test seam",
    "explicit interface",
    "生产可保留单例，核心逻辑仍接收 TextureProvider 引用以便替身。",
  ],
  [
    "Thread policy",
    "load on render thread",
    "静态构造安全不等于 map 和 GPU 资源操作并发安全。",
  ],
] as const;

const hordeItems = [
  [
    "Plan",
    "count + arena + minDistance",
    "先验证数量上限、竞技场尺寸和玩家安全半径。",
  ],
  ["Reserve", "vector<Zombie>", "已知数量预留容量，构造完成前不发布观察指针。"],
  [
    "Sample",
    "bounded attempts",
    "随机生成点必须在场内且远离 Player，设置最大尝试避免死循环。",
  ],
  [
    "Construct",
    "emplace(texture, position)",
    "所有 Zombie 借用同一缓存纹理，各自拥有状态和 Sprite。",
  ],
  [
    "Commit",
    "return vector",
    "局部群体完整成功后按值返回，异常自动清理已构造对象。",
  ],
  [
    "Verify",
    "count + bounds + shared address",
    "断言数量、生成范围、最小距离和所有 Sprite 纹理地址相同。",
  ],
] as const;

export function BcgpTextureCacheMap() {
  return (
    <HolderMap
      ariaLabel="TextureHolder 键规范查询候选加载提交借用关闭六阶段缓存图"
      caption="未命中先在局部加载，成功后提交到地址稳定容器；失败不留下假缓存项。"
      items={cacheItems}
    />
  );
}

export function BcgpSingletonTradeoffMap() {
  return (
    <HolderMap
      ariaLabel="TextureHolder 私有构造静态访问单一身份隐藏依赖测试并发六项权衡图"
      caption="单实例保证缓存身份，不代表依赖透明或线程安全；核心逻辑仍应允许显式资源接口。"
      items={singletonItems}
    />
  );
}

export function BcgpHordeBuildMap() {
  return (
    <HolderMap
      ariaLabel="僵尸群规划预留采样构造提交验证六阶段生成图"
      caption="僵尸群在局部完整构建后提交，所有 Sprite 共享一张稳定纹理，生成循环有明确上限。"
      items={hordeItems}
    />
  );
}
