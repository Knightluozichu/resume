type Item = readonly [title: string, code: string, detail: string];

function ViewMap({
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

const playerItems = [
  [
    "Input",
    "W A S D",
    "主循环采样连续状态并形成二维方向，不让 Player 直接依赖全局 Keyboard。",
  ],
  [
    "Normalize",
    "length > 0",
    "斜向输入归一化，避免同时按两轴时速度变成根号二倍。",
  ],
  [
    "Integrate",
    "position += velocity * dt",
    "速度使用世界单位每秒，dt 由同一帧统一传入。",
  ],
  [
    "Clamp",
    "arena bounds",
    "按玩家完整包围盒限制世界位置，不让相机跟随到地图外无内容区。",
  ],
  [
    "Aim",
    "world mouse",
    "窗口像素经 worldView 映射后计算瞄准方向，不能直接混用屏幕坐标。",
  ],
  [
    "Query",
    "position + sprite",
    "只读接口供相机和渲染使用，Player 自己维护逻辑与精灵同步。",
  ],
] as const;

const viewItems = [
  [
    "World state",
    "player.position()",
    "玩家位置和竞技场边界存在于逻辑世界空间。",
  ],
  [
    "World view",
    "view.setCenter(player)",
    "相机中心跟随玩家，尺寸决定可见世界范围而非修改实体位置。",
  ],
  [
    "World draw",
    "setView(worldView)",
    "地面、玩家和僵尸在世界视图下绘制并随相机滚动。",
  ],
  [
    "HUD view",
    "setView(hudView)",
    "HUD 使用固定逻辑屏幕坐标，不继承世界相机中心。",
  ],
  [
    "HUD draw",
    "ammo + score",
    "文字和准星按屏幕层绘制，窗口 resize 时统一更新视口策略。",
  ],
  [
    "Input map",
    "mapPixelToCoords",
    "鼠标像素必须指定 worldView 映射到世界，命中与瞄准才一致。",
  ],
] as const;

const engineItems = [
  [
    "Initialize",
    "window + assets + Player",
    "必需资源与有效竞技场先完成，失败不进入主循环。",
  ],
  [
    "Events",
    "close + resize",
    "耗尽离散事件，resize 更新 View 策略而不是改写世界对象。",
  ],
  [
    "Input",
    "movement + aim",
    "把设备状态转换成命令数据，世界鼠标坐标使用当前 worldView。",
  ],
  [
    "Update",
    "Player then camera",
    "先更新玩家，再把 worldView 中心对齐新位置，避免相机落后一帧。",
  ],
  [
    "Render",
    "world then HUD",
    "一次 clear 后切两次 view 分层 draw，最后只 display 一次。",
  ],
  [
    "Verify",
    "scroll + HUD fixed",
    "玩家跨越一屏时世界滚动、HUD 不动、鼠标瞄准仍指向同一世界点。",
  ],
] as const;

export function BcgpPlayerWorldMap() {
  return (
    <ViewMap
      ariaLabel="Zombie Arena 玩家输入归一化积分边界瞄准查询六阶段图"
      caption="Player 只接收输入意图和 dt，在世界坐标中维护位置、边界和瞄准不变量。"
      items={playerItems}
    />
  );
}

export function BcgpDualViewMap() {
  return (
    <ViewMap
      ariaLabel="SFML 世界状态世界视图世界绘制 HUD 视图 HUD 绘制输入映射六层图"
      caption="同一个窗口按 worldView 与 hudView 分两层绘制；View 改变观察映射，不移动世界对象。"
      items={viewItems}
    />
  );
}

export function BcgpZombieLoopMap() {
  return (
    <ViewMap
      ariaLabel="Zombie Arena 初始化事件输入更新双层渲染验证六阶段主循环图"
      caption="先更新 Player 再跟随相机，世界和 HUD 分层绘制，整帧只呈现一次。"
      items={engineItems}
    />
  );
}
