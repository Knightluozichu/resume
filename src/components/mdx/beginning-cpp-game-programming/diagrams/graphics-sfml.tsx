type Item = readonly [title: string, code: string, detail: string];

function HudMap({
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

const phaseItems = [
  [
    "Waiting",
    "Press Enter",
    "显示开始消息，不推进玩法计时；只接受一次开始边沿。",
  ],
  [
    "Playing",
    "input + update",
    "采样连续输入、扣减剩余时间并刷新分数和时间条。",
  ],
  ["Paused", "Escape edge", "冻结游戏时间但继续抽取窗口事件和绘制暂停 HUD。"],
  [
    "Expired",
    "time <= 0",
    "把剩余时间钳制为零，显示结束消息，停止产生游戏结果。",
  ],
  [
    "Restart",
    "Enter edge",
    "重置分数、时间、实体和随机状态，不能只改一个 paused 布尔值。",
  ],
  [
    "Close",
    "Event::Closed",
    "所有阶段都响应窗口关闭；状态机不拥有操作系统窗口生命周期。",
  ],
] as const;

const textItems = [
  [
    "State",
    "int score",
    "数值状态是事实来源，HUD 文本只是每帧或变更时生成的视图。",
  ],
  [
    "Format",
    "ostringstream",
    "把标签、数值和精度组合成 std::string，避免固定字符数组溢出。",
  ],
  [
    "Font",
    "sf::Font",
    "字体拥有字形资源，加载失败应阻止依赖文本进入有效状态。",
  ],
  [
    "Text",
    "sf::Text",
    "文本借用字体并保存字符串与变换，字体必须覆盖全部绘制生命周期。",
  ],
  [
    "Layout",
    "origin + position",
    "先确定局部边界和原点，再放到 HUD 坐标，窗口缩放时重新布局。",
  ],
  [
    "Draw",
    "world then HUD",
    "世界对象先画，消息和分数最后画，避免被背景或实体覆盖。",
  ],
] as const;

const timerItems = [
  [
    "Budget",
    "totalTime = 6s",
    "总时长由玩法配置给出，不能从矩形像素宽度反推业务时间。",
  ],
  [
    "Elapsed",
    "gameClock.restart",
    "只在 Playing 阶段把经过时间计入预算；暂停期间不偷走游戏时间。",
  ],
  [
    "Remaining",
    "max(0, left - dt)",
    "扣减后钳制到零，避免负宽度和结束条件抖动。",
  ],
  ["Ratio", "left / total", "先处理总时长为零，再把比例限制在 0 到 1。"],
  [
    "Geometry",
    "fullWidth * ratio",
    "用比例更新矩形尺寸，位置和高度由 HUD 布局负责。",
  ],
  [
    "Verify",
    "pause + resume + expiry",
    "检查暂停不扣时、恢复连续、到零只触发一次结束转换。",
  ],
] as const;

export function BcgpPauseInputMap() {
  return (
    <HudMap
      ariaLabel="Beginning C++ Game Programming 第三版第三章等待游玩暂停超时重启和关闭六状态输入图"
      caption="暂停与重启是状态转换：事件处理负责边沿，状态决定计时和更新，所有阶段都继续服务窗口。"
      items={phaseItems}
    />
  );
}

export function BcgpHudTextMap() {
  return (
    <HudMap
      ariaLabel="Timber 分数状态格式化字体文本布局和绘制六阶段 HUD 字符串图"
      caption="HUD 是游戏状态的投影：数值先格式化成字符串，Text 借用 Font，最后在屏幕层绘制。"
      items={textItems}
    />
  );
}

export function BcgpTimeBarMap() {
  return (
    <HudMap
      ariaLabel="Timber 总时间经过时间剩余时间比例几何和验证六阶段时间条图"
      caption="时间条只显示剩余时间比例；暂停是否扣时、到零如何转换必须由玩法状态决定。"
      items={timerItems}
    />
  );
}
