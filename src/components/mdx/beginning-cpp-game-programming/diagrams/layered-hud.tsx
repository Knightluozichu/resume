type Item = readonly [title: string, code: string, detail: string];

function HudLayerMap({
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

const layerItems = [
  ["Clear", "window.clear", "一帧只清屏一次，后续 View 切换不会清除已有图层。"],
  [
    "World view",
    "setView(worldView)",
    "绘制地图、Player、Zombie、Bullet 和 Pickup，随相机滚动。",
  ],
  [
    "World overlays",
    "damage flash",
    "属于世界位置的血条和命中特效仍在 worldView 下绘制。",
  ],
  [
    "HUD view",
    "setView(hudView)",
    "切换固定逻辑屏幕坐标，分数弹药和状态条不随玩家移动。",
  ],
  [
    "Screen overlay",
    "home | level-up",
    "全屏面板最后绘制并按阶段拦截世界输入。",
  ],
  ["Display", "window.display", "所有层完成后只呈现一次，避免中间帧闪烁。"],
] as const;

const dataItems = [
  [
    "Source",
    "GameSnapshot",
    "分数、弹药、生命、波次和阶段来自游戏状态，不从 Text 反解析。",
  ],
  [
    "Detect change",
    "snapshot != previous",
    "数值或阶段变化时标记对应 HUD 字段 dirty。",
  ],
  [
    "Format",
    "string builder",
    "集中控制标签、精度和本地化，不在 draw 中散落拼接。",
  ],
  [
    "Layout",
    "bounds + anchors",
    "字符串变化后重算 local bounds，以边距、中心或右对齐锚点放置。",
  ],
  [
    "Store",
    "sf::Text + RectangleShape",
    "HUD 对象借用长生命周期 Font，保存可绘制视图状态。",
  ],
  ["Draw", "const HUD", "绘制不修改业务状态；同一 snapshot 产生稳定输出。"],
] as const;

const stateItems = [
  [
    "Home",
    "Enter -> Playing",
    "显示标题和开始说明，世界可静止绘制但不接受战斗输入。",
  ],
  ["Playing", "combat enabled", "更新世界和 HUD，达到升级条件后转 LevelUp。"],
  ["LevelUp", "choose option", "冻结战斗，显示选项；只接受一次选择事件。"],
  [
    "Apply",
    "validate + mutate",
    "检查选项仍合法，提交属性变化并刷新派生 HUD。",
  ],
  [
    "Resume",
    "LevelUp -> Playing",
    "清除面板与重复输入，重置必要时钟避免恢复大 dt。",
  ],
  [
    "GameOver",
    "restart | home",
    "终局面板读取最终 snapshot，重启完整恢复或回首页。",
  ],
] as const;

export function BcgpLayeredViewMap() {
  return (
    <HudLayerMap
      ariaLabel="第十三章清屏世界视图世界叠加 HUD 视图屏幕面板呈现六层图"
      caption="一帧只 clear/display 一次，中间按 worldView、hudView 和全屏面板顺序叠加。"
      items={layerItems}
    />
  );
}

export function BcgpHudProjectionMap() {
  return (
    <HudLayerMap
      ariaLabel="HUD 状态源变更检测格式化布局对象存储绘制六阶段投影图"
      caption="HUD 是 GameSnapshot 的只读投影；业务值变化后更新文本与布局，draw 不参与规则。"
      items={dataItems}
    />
  );
}

export function BcgpScreenStateMap() {
  return (
    <HudLayerMap
      ariaLabel="Home Playing LevelUp 应用选择恢复 GameOver 六状态界面图"
      caption="Home 与 LevelUp 是明确游戏阶段，控制输入和时间，不只是盖在世界上的一张图片。"
      items={stateItems}
    />
  );
}
