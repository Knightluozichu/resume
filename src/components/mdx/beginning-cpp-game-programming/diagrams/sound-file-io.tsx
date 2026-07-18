type Item = readonly [title: string, code: string, detail: string];

function FinishMap({
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

const saveItems = [
  [
    "Locate",
    "user data path",
    "存档写入用户可写目录，不依赖可执行文件旁边必然有权限。",
  ],
  [
    "Read",
    "ifstream + full parse",
    "缺文件使用默认分数，存在但损坏则报告并拒绝部分解析。",
  ],
  [
    "Validate",
    "0 <= score <= max",
    "解析成功后验证范围和尾随内容，不能信任本地文件。",
  ],
  [
    "Write temp",
    "ofstream temporary",
    "先写同目录临时文件，检查 stream 状态和 close。",
  ],
  [
    "Publish",
    "rename protocol",
    "成功关闭后替换正式文件，平台原子性和覆盖规则需要适配。",
  ],
  [
    "Recover",
    "keep old save",
    "任何失败保留旧正式文件，日志包含路径、操作和错误。",
  ],
] as const;

const soundItems = [
  [
    "Event",
    "Shot | Hit | Pickup | Death",
    "规则层在状态边沿产生事件，不让音频重新检查碰撞。",
  ],
  [
    "Lookup",
    "SoundId -> buffer",
    "预加载 Buffer 并按稳定 id 查找，缺资源按静音或失败策略处理。",
  ],
  [
    "Voice",
    "available sf::Sound",
    "短音效从受限 voice 池取得，允许必要叠加但控制上限。",
  ],
  [
    "Configure",
    "volume + pitch + position",
    "统一应用设置，二维普通声与后续空间音频分开。",
  ],
  ["Play", "once per event", "事件消费一次，持续状态不每帧重启声音。"],
  [
    "Reset",
    "stop round-scoped voices",
    "重启和关卡退出停止旧声音，Buffer 所有者最后销毁。",
  ],
] as const;

const waveItems = [
  [
    "Wave clear",
    "alive count == 0",
    "从非空到零的边沿触发一次升级，不在零状态每帧重复。",
  ],
  [
    "Level up",
    "choose/apply upgrade",
    "冻结战斗并验证选项，提交 Player 属性后刷新 HUD。",
  ],
  [
    "Plan wave",
    "count + speed + health",
    "难度函数有上限并使用宽类型检查算术。",
  ],
  [
    "Build horde",
    "local candidate",
    "新波次完整生成成功后替换旧群体，失败保持可恢复状态。",
  ],
  [
    "Resume",
    "restart frame clock",
    "恢复 Playing 前清事件并重启时钟，避免菜单时长成为 dt。",
  ],
  [
    "Restart game",
    "reset every subsystem",
    "Player、池、Pickup、分数、波次、声音和随机状态全部恢复。",
  ],
] as const;

export function BcgpHighScoreFileMap() {
  return (
    <FinishMap
      ariaLabel="最高分定位读取验证临时写入发布恢复六阶段文件图"
      caption="存档是小事务：完整解析旧值，临时文件写成功并关闭后才发布，失败保留旧文件。"
      items={saveItems}
    />
  );
}

export function BcgpSoundEventMap() {
  return (
    <FinishMap
      ariaLabel="音效事件查找 voice 配置播放重置六阶段图"
      caption="音频消费规则事件，不重新判断游戏状态；受限 voice 池允许叠加但避免无界播放。"
      items={soundItems}
    />
  );
}

export function BcgpWaveRestartMap() {
  return (
    <FinishMap
      ariaLabel="波次清空升级规划构建恢复重启六阶段图"
      caption="波次结束只触发一次升级；新群体完整提交，整局重启覆盖所有子系统。"
      items={waveItems}
    />
  );
}
