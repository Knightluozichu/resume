type Item = readonly [title: string, code: string, detail: string];

function ActionMap({
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

const platformItems = [
  ["Plan", "gap + width", "生成器按可达约束规划下一段，不只依赖随机数。"],
  ["Build", "Factory request", "先验证资源、尺寸和类型，再构造完整平台候选。"],
  ["Commit", "WorldCommand", "安全提交点加入世界和碰撞索引。"],
  ["Contact", "top crossing", "使用上一帧与当前帧位置判定从上方落地。"],
  ["Leave", "behind camera", "平台越过回收线后请求销毁，不在遍历中删除。"],
  [
    "Recycle",
    "id + state reset",
    "若复用实例，必须重置身份相关引用和全部状态。",
  ],
] as const;

const controlItems = [
  ["Read", "keys + event edge", "持续移动读取状态，跳跃读取按下边沿。"],
  ["Intent", "axis + jump", "普通值隔离设备 API 与玩法规则。"],
  ["Validate", "grounded + phase", "只有 Playing 且着地时接受跳跃。"],
  ["Integrate", "velocity + gravity", "用受限 dt 更新速度和候选位置。"],
  ["Resolve", "platform contact", "修正位置、清零竖直速度并提交 grounded。"],
  ["Publish", "PlayerLanded", "只在状态边沿发布事实供动画和声音消费。"],
] as const;

const animationItems = [
  ["State", "Run | Jump | Fall", "玩法状态机选择片段，不直接读取键盘。"],
  ["Clip", "frames + duration", "片段保存帧矩形、时长和循环策略。"],
  ["Enter", "reset policy", "状态真正变化时才决定是否从首帧重置。"],
  ["Accumulate", "time += dt", "Animator 累积时间并处理跨越多帧。"],
  ["Sample", "texture rect", "从片段采样当前动画帧并交给 Graphics。"],
  ["Event", "clip finished", "非循环片段结束产生一次事件而非每帧重复。"],
] as const;

export function BcgpPlatformLifecycleMap() {
  return (
    <ActionMap
      ariaLabel="平台规划构造提交接触离开回收六阶段图"
      caption="平台先满足可达约束再提交；离开相机后延迟回收，碰撞只认从上方跨越。"
      items={platformItems}
    />
  );
}

export function BcgpPlayerControlMap() {
  return (
    <ActionMap
      ariaLabel="玩家控制读取意图验证积分解算发布六阶段图"
      caption="player controls 先变成意图；落地是碰撞提交后的状态边沿，不由按键或动画猜测。"
      items={controlItems}
    />
  );
}

export function BcgpAnimatorFramesMap() {
  return (
    <ActionMap
      ariaLabel="动画状态片段进入累积采样事件六阶段图"
      caption="Animator 类按 dt 采样 animation frames；玩家动画由已提交玩法状态选择。"
      items={animationItems}
    />
  );
}
