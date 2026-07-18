type Item = readonly [title: string, code: string, detail: string];

function TerrainMap({
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

const referenceItems = [
  [
    "Caller owns",
    "VertexArray terrain",
    "调用者决定对象生命周期，函数不保存越过调用期的隐藏引用。",
  ],
  [
    "Mutable alias",
    "VertexArray& out",
    "非常量引用明确函数会填充目标，调用者看到同一个对象的结果。",
  ],
  [
    "Read-only alias",
    "const Texture& atlas",
    "避免复制图形资源并禁止函数内替换纹理状态。",
  ],
  [
    "Value inputs",
    "rows, columns, tileSize",
    "小型尺寸和种子按值传递，函数修改副本不影响调用者。",
  ],
  [
    "Preconditions",
    "positive + capacity safe",
    "尺寸为正，乘法不溢出，图集包含所有将访问的 tile。",
  ],
  [
    "Postconditions",
    "4 vertices per tile",
    "成功后图元类型为 Quads、顶点数准确、位置和纹理坐标均在范围。",
  ],
] as const;

const atlasItems = [
  [
    "Tile id",
    "0..tileCount-1",
    "随机或关卡数据只保存图块编号，不保存重复像素。",
  ],
  [
    "Atlas cell",
    "u = id % columns",
    "用列数拆出图集单元坐标，先验证编号合法。",
  ],
  [
    "World quad",
    "x,y -> x+size,y+size",
    "每个世界格生成四个顶点并保持一致绕序。",
  ],
  [
    "UV quad",
    "u,v -> u+size,v+size",
    "texCoords 使用纹理像素坐标，与图集 tile 尺寸匹配。",
  ],
  [
    "Batch",
    "sf::VertexArray Quads",
    "所有地面四边形一次提交，减少逐 tile Sprite 的 draw 调用。",
  ],
  [
    "Texture state",
    "RenderStates atlas",
    "draw 时显式绑定仍存活的图集纹理，VertexArray 本身不拥有它。",
  ],
] as const;

const backgroundItems = [
  ["Seed", "fixed or recorded", "同一种子生成同一布局，错误和性能轨迹可回放。"],
  [
    "Generate ids",
    "weighted distribution",
    "草地、墙和障碍概率由玩法配置控制，出生区必须强制可走。",
  ],
  [
    "Build vertices",
    "rows * cols * 4",
    "先检查尺寸乘法，再一次 resize 并按索引填充。",
  ],
  [
    "World bounds",
    "cols*tileSize",
    "竞技场矩形与顶点几何来自同一配置，Player/View 不使用另一套魔法尺寸。",
  ],
  [
    "Scroll",
    "worldView follows Player",
    "背景保持世界坐标不动，相机变化自然选择可见区域。",
  ],
  [
    "Verify",
    "seed + checksum + screenshot",
    "断言顶点范围和出生连通性，再用截图验证接缝与纹理方向。",
  ],
] as const;

export function BcgpReferenceContractMap() {
  return (
    <TerrainMap
      ariaLabel="第九章调用者所有权可写引用只读引用值参数前置后置六项函数契约图"
      caption="引用表达别名与修改权限，不转移所有权；背景构建函数的生命周期和结果数量都可验证。"
      items={referenceItems}
    />
  );
}

export function BcgpAtlasVertexMap() {
  return (
    <TerrainMap
      ariaLabel="精灵图集编号单元世界四边形纹理四边形批处理纹理绑定六阶段图"
      caption="每个 tile 编号映射为四个世界顶点和四个纹理坐标，整个背景由一次 VertexArray draw 提交。"
      items={atlasItems}
    />
  );
}

export function BcgpScrollingBackgroundMap() {
  return (
    <TerrainMap
      ariaLabel="随机背景种子编号顶点世界边界相机滚动验证六阶段图"
      caption="随机布局先成为确定的 tile 数据，再生成世界几何；滚动来自 View，而不是每帧移动背景。"
      items={backgroundItems}
    />
  );
}
