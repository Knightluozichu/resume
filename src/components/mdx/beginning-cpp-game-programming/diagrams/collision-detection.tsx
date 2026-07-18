type Item = readonly [title: string, code: string, detail: string];

function PongMap({
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

const ballItems = [
  [
    "Construct",
    "position + velocity + size",
    "Ball 构造后尺寸为正、速度非零、形状与逻辑位置一致。",
  ],
  ["Integrate", "p += v * dt", "每帧用同一 dt 推进位置，绘制不修改速度。"],
  ["Walls", "left/right/top", "越界时先投影回合法边界，再只反转对应速度分量。"],
  [
    "Bat",
    "AABB + movingDown",
    "只有向下运动且与球拍相交才反弹，避免停留重叠时每帧翻转。",
  ],
  [
    "Miss",
    "bottom crossed",
    "球完整越过底部后计失分并重置，不继续在屏外积分。",
  ],
  [
    "Query",
    "bounds() + velocity()",
    "公开只读碰撞视图和诊断值，不暴露可修改 Shape。",
  ],
] as const;

const resolutionItems = [
  [
    "Detect",
    "ball.intersects(bat)",
    "AABB 只报告当前重叠，不提供接触时间、法线和穿透深度。",
  ],
  ["Qualify", "vy > 0", "球必须朝球拍方向运动，防止已弹起但仍重叠时再次响应。"],
  [
    "Project",
    "y = bat.top - ball.height",
    "先把球放回球拍上方，消除穿透并建立下一帧分离。",
  ],
  ["Reflect", "vy = -abs(vy)", "只反转法向速度，水平分量可按击球位置调整。"],
  [
    "Feedback",
    "sound + score event",
    "碰撞副作用只触发一次，不在每帧重叠条件下重播。",
  ],
  [
    "Verify",
    "grazing + large dt",
    "测试边缘接触、角落、低帧率和球拍移动，记录前后位置速度。",
  ],
] as const;

const scoreItems = [
  [
    "Point",
    "ball below arena",
    "底线越界生成一次失分事件，立即停用或重置 Ball。",
  ],
  ["Increment", "misses += 1", "计分由事件驱动，不从球位置每帧重复累加。"],
  [
    "Serve",
    "reset center",
    "恢复位置并选择合法发球速度，清除旧穿透和连续事件。",
  ],
  ["HUD", "score -> string", "分数是数值事实，文本只在变化时刷新。"],
  [
    "Compare",
    "Score <=> Score",
    "三路比较一次产生小于、等于或大于关系，默认成员比较按声明顺序。",
  ],
  [
    "End",
    "target score",
    "达到目标分进入终局，停止球更新，重启恢复 Ball、Bat 和分数。",
  ],
] as const;

export function BcgpBallLifecycleMap() {
  return (
    <PongMap
      ariaLabel="Pong Ball 构造积分墙壁球拍失分查询六阶段生命周期图"
      caption="Ball 自己维护位置速度与墙壁边界；世界规则协调球拍碰撞、失分和重置。"
      items={ballItems}
    />
  );
}

export function BcgpAabbResolutionMap() {
  return (
    <PongMap
      ariaLabel="Pong AABB 检测方向筛选穿透修正速度反射反馈验证六阶段图"
      caption="检测重叠只是开始；可靠响应还要方向筛选、位置投影和一次性速度反射。"
      items={resolutionItems}
    />
  );
}

export function BcgpPongScoreMap() {
  return (
    <PongMap
      ariaLabel="Pong 失分计数发球 HUD 三路比较和终局六阶段计分图"
      caption="底线越界产生一次计分事件并重置发球；HUD 与比较都读取数值分数，而不拥有规则。"
      items={scoreItems}
    />
  );
}
