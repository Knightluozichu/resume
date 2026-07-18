type Item = readonly [title: string, code: string, detail: string];

function LogicMap({
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

const soundItems = [
  [
    "Load",
    "SoundId -> Buffer",
    "启动阶段验证并缓存声音缓冲，播放时不访问磁盘。",
  ],
  ["Emit", "GameEvent::Jump", "规则层只报告已发生的事实，不直接持有音频对象。"],
  ["Map", "event -> cue", "声音引擎把玩法事件映射为资源、音量和播放策略。"],
  [
    "Acquire",
    "voice pool",
    "从有界 voice 池取得空闲通道，避免无上限创建实例。",
  ],
  [
    "Play",
    "buffer lifetime valid",
    "Sound 借用仍存活的 Buffer，一次事件只触发一次播放。",
  ],
  ["Reset", "stop + clear queue", "重启关卡时停止旧 voice 并丢弃过期事件。"],
] as const;

const frameItems = [
  [
    "Input",
    "PlayerIntent",
    "把按键状态转换为意图，不在输入阶段直接改世界容器。",
  ],
  [
    "Simulate",
    "update(dt, world)",
    "Player 和对象行为在同一帧时间步推进候选状态。",
  ],
  ["Detect", "contacts + rules", "碰撞与规则判断产生事件和延迟命令。"],
  ["Commit", "CommandBuffer", "集中应用生成、销毁和状态转换，避免遍历失效。"],
  ["Notify", "GameEvent list", "HUD、声音等观察结果，但不反向决定玩法事实。"],
  ["Snapshot", "render state", "提交后生成稳定快照供相机和图形阶段只读使用。"],
] as const;

const communicationItems = [
  [
    "Identity",
    "GameObjectId",
    "跨对象引用使用稳定 id，查询不到表示目标已离开世界。",
  ],
  ["Fact", "GameEvent", "过去式事件描述已发生事实，可被多个非玩法系统消费。"],
  [
    "Request",
    "WorldCommand",
    "命令请求世界生成、销毁或修改对象，提交时再次校验。",
  ],
  [
    "Query",
    "ReadOnlyWorld",
    "有限只读查询提供附近对象和地面信息，不暴露容器写权限。",
  ],
  [
    "Ownership",
    "World owns objects",
    "组件不互相拥有，借用只在明确帧阶段内有效。",
  ],
  [
    "Order",
    "collect then commit",
    "先收集再提交使结果不依赖 vector 当前排列顺序。",
  ],
] as const;

export function BcgpSoundEngineMap() {
  return (
    <LogicMap
      ariaLabel="SoundEngine 加载发出映射取得播放重置六阶段图"
      caption="SoundEngine 消费规则层已经确认的事件；资源预加载、voice 有上限、重启时清理旧播放。"
      items={soundItems}
    />
  );
}

export function BcgpGameLogicFrameMap() {
  return (
    <LogicMap
      ariaLabel="游戏逻辑输入模拟检测提交通知快照六阶段帧图"
      caption="玩法先计算并提交事实，再通知声音与 HUD；渲染只读取提交后的稳定快照。"
      items={frameItems}
    />
  );
}

export function BcgpObjectCommunicationMap() {
  return (
    <LogicMap
      ariaLabel="对象通信身份事件命令查询所有权顺序六项契约图"
      caption="稳定 ID、事实事件、延迟命令和有限查询共同替代对象间的长期裸指针。"
      items={communicationItems}
    />
  );
}
