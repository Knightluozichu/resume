type Item = readonly [title: string, code: string, detail: string];

function CombatMap({
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

const bulletItems = [
  [
    "Acquire",
    "inactive slot",
    "射击先从固定池找未激活子弹；没有槽位则拒绝，不在热路径分配。",
  ],
  [
    "Aim",
    "target - muzzle",
    "世界目标减枪口位置并归一化，零长度目标不能生成方向。",
  ],
  [
    "Launch",
    "active + start + velocity",
    "一次提交位置、速度、剩余射程和 Shape，避免半初始化活跃对象。",
  ],
  ["Update", "p += v * dt", "仅活跃子弹推进，累计实际路程而不是按帧计寿命。"],
  [
    "Hit",
    "AABB -> damage event",
    "命中一只僵尸后立即停用，伤害与删除在安全提交阶段处理。",
  ],
  ["Expire", "range | arena", "超过射程或场外停用并回到池，不保留旧命中标志。"],
] as const;

const pickupItems = [
  ["Hidden", "cooldown > 0", "拾取后不可见不可碰撞，冷却按游戏时间减少。"],
  [
    "Spawn",
    "valid arena point",
    "冷却结束在可走区域生成，避开 Player 和墙体并限制尝试次数。",
  ],
  ["Available", "active bounds", "只有可用状态参与玩家碰撞和绘制。"],
  [
    "Collect",
    "health | ammo",
    "碰撞生成明确效果，先按上限钳制玩家状态，再停用 Pickup。",
  ],
  ["Reset timer", "respawnSeconds", "拾取后重置冷却，不能每帧重叠重复补给。"],
  [
    "Verify",
    "one effect per spawn",
    "测试持续重叠只生效一次、暂停不偷走冷却、重生点合法。",
  ],
] as const;

const collisionItems = [
  [
    "Snapshot",
    "active bullets/zombies",
    "检测阶段读取本帧更新后的稳定集合，不在遍历中 erase。",
  ],
  [
    "Bullet vs Zombie",
    "first valid hit",
    "子弹命中后标记 inactive，Zombie 累积伤害并产生可能死亡事件。",
  ],
  [
    "Player vs Zombie",
    "contact cooldown",
    "持续重叠使用受伤冷却或无敌帧，避免每帧扣完整伤害。",
  ],
  [
    "Player vs Pickup",
    "apply capped effect",
    "只对 active Pickup 生效并立即进入 Hidden。",
  ],
  [
    "Commit",
    "damage -> deaths -> score",
    "集中提交伤害、死亡、分数与音效，再安全移除死亡 Zombie。",
  ],
  [
    "Render",
    "only active objects",
    "渲染只读取提交后状态，不再次执行碰撞或玩法副作用。",
  ],
] as const;

export function BcgpBulletLifecycleMap() {
  return (
    <CombatMap
      ariaLabel="第十二章子弹槽位瞄准发射更新命中过期六阶段生命周期图"
      caption="子弹从固定池取得，发射时一次建立完整状态，命中或越界后停用复用。"
      items={bulletItems}
    />
  );
}

export function BcgpPickupStateMap() {
  return (
    <CombatMap
      ariaLabel="拾取物隐藏生成可用收集冷却验证六状态图"
      caption="Pickup 只有 Available 才绘制和碰撞；一次收集后立即隐藏，冷却结束再合法生成。"
      items={pickupItems}
    />
  );
}

export function BcgpCombatCollisionMap() {
  return (
    <CombatMap
      ariaLabel="玩家僵尸子弹拾取物快照三类碰撞提交渲染六阶段图"
      caption="检测与删除分离：先在稳定集合上生成事件，再集中提交伤害、死亡、分数和资源回收。"
      items={collisionItems}
    />
  );
}
