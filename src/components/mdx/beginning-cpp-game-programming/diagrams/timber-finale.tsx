type Item = readonly [title: string, code: string, detail: string];

function FinaleMap({
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

const chopItems = [
  [
    "Edge input",
    "Left | Right key",
    "只在 Playing 且本次按下边沿生成一次砍树命令，按住不连发。",
  ],
  [
    "Choose side",
    "playerSide",
    "先切换玩家和斧头视觉，再用同一枚举参与危险枝条判定。",
  ],
  [
    "Shift branches",
    "shiftBranches",
    "一次命令只移位一次并生成一个顶部状态，分数同步增加。",
  ],
  [
    "Check danger",
    "lowest == playerSide",
    "移位提交后检查最底槽；None 安全，命中玩家侧进入死亡。",
  ],
  [
    "Launch log",
    "logActive = true",
    "保存起点、速度和方向，后续帧独立推进飞行木头。",
  ],
  [
    "Play sound",
    "chopSound.play()",
    "声音是命令结果；SoundBuffer 所有者必须仍存活。",
  ],
] as const;

const deathItems = [
  ["Playing", "time > 0", "允许砍树、更新实体和计分，持续检查时间与树枝危险。"],
  ["Timeout", "time == 0", "转 Expired、冻结玩法更新并显示可重启消息。"],
  ["Crushed", "branch collision", "转 Dead、停止输入计分并播放死亡反馈。"],
  [
    "Visual",
    "grave + message",
    "死亡画面由状态派生，不与碰撞代码分散维护多个显示标志。",
  ],
  [
    "Restart",
    "reset all state",
    "清空枝条、分数、计时、木头和声音状态，再提交 Playing。",
  ],
  [
    "Invariant",
    "one terminal transition",
    "同一帧超时和碰撞同时发生时使用明确优先级，只提交一个结果。",
  ],
] as const;

const soundItems = [
  [
    "Load",
    "sf::SoundBuffer",
    "启动时加载斧击、死亡和超时音频，失败按必需或可选策略处理。",
  ],
  [
    "Bind",
    "sf::Sound",
    "Sound 保存播放状态并借用 Buffer，Buffer 生命周期必须覆盖播放。",
  ],
  [
    "Trigger",
    "state transition",
    "只在砍击或死亡边沿调用 play，不在每帧条件为真时反复重启。",
  ],
  ["Mix", "volume policy", "统一设置音量并避免多个同声对象无界叠加导致削波。"],
  [
    "Reset",
    "stop before restart",
    "新局开始前停止旧终局声音，避免上一局反馈穿入下一局。",
  ],
  [
    "Test",
    "silent fallback",
    "无音频设备或资源损坏时仍能验证状态机，日志保留失败上下文。",
  ],
] as const;

export function BcgpChopTransactionMap() {
  return (
    <FinaleMap
      ariaLabel="Timber 第五章输入选边移枝碰撞木头和声音六阶段砍树事务图"
      caption="一次砍树命令按固定顺序提交：选边、移枝、判定、计分、木头反馈和声音都只发生一次。"
      items={chopItems}
    />
  );
}

export function BcgpEndConditionMap() {
  return (
    <FinaleMap
      ariaLabel="Timber 第五章游玩超时压死视觉重启和终局优先级六状态图"
      caption="时间耗尽和枝条碰撞都是终局转换；冻结玩法、显示反馈和完整重置由阶段统一控制。"
      items={deathItems}
    />
  );
}

export function BcgpSoundLifetimeMap() {
  return (
    <FinaleMap
      ariaLabel="Timber 第五章音频加载绑定触发混音重置和测试六阶段生命周期图"
      caption="Sound 借用 SoundBuffer；声音只在状态边沿触发，资源失败和重启都有明确策略。"
      items={soundItems}
    />
  );
}
