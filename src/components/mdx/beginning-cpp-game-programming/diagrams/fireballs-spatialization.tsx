type Item = readonly [title: string, code: string, detail: string];

function SpatialMap({
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

const fireballItems = [
  ["Intent", "CastPressed", "输入边沿只表达施放请求，不直接创建对象。"],
  ["Validate", "cooldown + alive", "Player 规则验证阶段、冷却、费用和方向。"],
  ["Spawn", "WorldCommand", "Factory 在安全提交点构造完整火球。"],
  ["Advance", "velocity * dt", "ProjectileUpdate 推进位置、寿命和扫掠区间。"],
  ["Impact", "DamageCommand", "首次命中提交伤害与 FireballHit 事实。"],
  ["Retire", "hit | ttl | bounds", "命中、超时或越界后只销毁一次。"],
] as const;

const audioItems = [
  ["Listener", "Player position", "监听器跟随已提交 Player 世界位置。"],
  ["Source", "Fireball position", "voice 使用事件携带的命中或施放坐标。"],
  ["Scale", "pixels -> audio units", "统一换算坐标，避免几百像素立刻静音。"],
  ["Near", "minDistance", "近距离内保持稳定音量，防止源经过监听器时爆音。"],
  ["Falloff", "attenuation", "超过近距后随距离平滑衰减。"],
  ["Mix", "priority + voice pool", "关键命中声可抢占远处低优先级声音。"],
] as const;

const hudItems = [
  ["Snapshot", "health + cooldown", "HUD 只读提交后的 PlayerSnapshot。"],
  ["Derive", "ready ratio", "从剩余时间和总冷却派生归一化比例。"],
  ["Format", "READY | 0.8s", "文本、颜色和图标表达同一状态。"],
  ["Anchor", "HUD view", "控件固定在逻辑屏幕，不随主相机移动。"],
  ["Event", "PlayerHurt", "事件可触发短暂表现，但不重复修改生命。"],
  ["Verify", "snapshot assertions", "边界值、重启和暂停均可无窗口测试。"],
] as const;

export function BcgpFireballLifecycleMap() {
  return (
    <SpatialMap
      ariaLabel="火球意图验证生成推进命中退役六阶段图"
      caption="火球由输入请求，经规则验证和 Factory 提交后进入世界；首次命中或超时只退役一次。"
      items={fireballItems}
    />
  );
}

export function BcgpSpatialAudioMap() {
  return (
    <SpatialMap
      ariaLabel="监听器声源坐标缩放近距衰减混音六项空间音频图"
      caption="SFML 音频以 Listener 和声源的统一世界坐标计算空间化，SoundEngine 管 voice 与优先级。"
      items={audioItems}
    />
  );
}

export function BcgpFireballHudMap() {
  return (
    <SpatialMap
      ariaLabel="HUD 快照派生格式锚定事件验证六阶段图"
      caption="HUD class 投影已提交生命与火球冷却；表现事件不能反向修改玩法状态。"
      items={hudItems}
    />
  );
}
