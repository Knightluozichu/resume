type Item = readonly [title: string, code: string, detail: string];

function MenuRainMap({
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

const menuItems = [
  ["Home", "Start | Quit", "没有运行中的世界，只允许创建新局或退出。"],
  ["Playing", "Pause", "玩法时钟推进，菜单只监听暂停边沿。"],
  ["Paused", "Resume | Restart | Quit", "冻结逻辑时钟，但菜单输入与绘制继续。"],
  ["GameOver", "Restart | Home", "保留最终快照，不再推进玩家与平台。"],
  ["Confirm", "MenuCommand", "选择先转换为命令，再由状态控制器验证。"],
  [
    "Transition",
    "reset clock last",
    "目标状态准备成功后才提交阶段并重启时钟。",
  ],
] as const;

const rainItems = [
  ["Spawn", "RainUpdate", "按发射率和相机范围激活固定池中的雨滴。"],
  ["Advance", "velocity * dt", "更新行为推进位置与寿命，不访问窗口。"],
  ["Recycle", "outside bounds", "离开区域的雨滴回到空闲池并重置状态。"],
  ["Snapshot", "drop instances", "逻辑提交后导出位置、长度和透明度。"],
  ["Batch", "RainGraphics", "图形行为把可见雨滴组成顶点批次。"],
  ["Draw", "one vertex array", "渲染器在 main view 下执行少量 draw calls。"],
] as const;

const frameItems = [
  ["Poll", "event edges", "关闭、菜单导航和确认从事件边沿读取。"],
  ["Route", "phase owns input", "当前阶段决定输入交给菜单还是 Player。"],
  ["Update", "if Playing", "只在玩法阶段推进世界、雨效与 elapsed。"],
  ["Commit", "commands + events", "集中应用菜单命令和世界命令。"],
  ["Render", "world then overlay", "暂停时可画冻结世界，再画菜单遮罩。"],
  ["Restart", "clock + queues", "恢复前清旧边沿、事件并重启帧时钟。"],
] as const;

export function BcgpInteractiveMenuMap() {
  return (
    <MenuRainMap
      ariaLabel="Home Playing Paused GameOver 菜单命令状态提交六项交互菜单图"
      caption="交互菜单只提出 MenuCommand；状态控制器验证 start、pause、restart、quit 转换。"
      items={menuItems}
    />
  );
}

export function BcgpRainCompositionMap() {
  return (
    <MenuRainMap
      ariaLabel="雨效生成推进回收快照批处理绘制六阶段组合图"
      caption="RainUpdate 管粒子生命，RainGraphics 管批量表现；GameObject composition 共享提交后快照。"
      items={rainItems}
    />
  );
}

export function BcgpMenuRainFrameMap() {
  return (
    <MenuRainMap
      ariaLabel="菜单雨效帧轮询路由更新提交通知渲染重启六阶段图"
      caption="当前 GamePhase 拥有输入与时间推进权，恢复 Playing 前清队列并重启时钟。"
      items={frameItems}
    />
  );
}
