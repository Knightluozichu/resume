type Item = readonly [title: string, code: string, detail: string];

function VariablesMap({
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

const stateItems = [
  [
    "Identity",
    "cloudSpeed",
    "名字表达单位和角色；速度与位置分开，不能把每帧位移误叫速度。",
  ],
  [
    "Type",
    "float pixelsPerSecond",
    "类型决定值域和运算；SFML 二维位置使用 float，但计数与状态可选不同类型。",
  ],
  [
    "Initial value",
    "0.0F | false",
    "所有进入首帧的状态都显式初始化，避免随机位置和未定义分支。",
  ],
  [
    "Unit",
    "px | s | px/s",
    "给变量附单位，只有量纲兼容的值才能相加；速度乘秒得到像素位移。",
  ],
  [
    "Invariant",
    "speed > 0",
    "构造和重置都维护范围，不让无效状态进入更新循环。",
  ],
  [
    "Observation",
    "log seed + reset",
    "调试随机动画时记录种子、速度和重置位置，才能复现偶发轨迹。",
  ],
] as const;

const randomItems = [
  [
    "Seed once",
    "std::random_device",
    "启动时为引擎选择种子；测试可传固定种子得到可重复轨迹。",
  ],
  [
    "Engine persists",
    "std::mt19937 rng",
    "引擎保存序列状态，不应在每帧或每次重置时重新构造。",
  ],
  [
    "Distribution",
    "uniform_real_distribution",
    "分布把引擎结果映射到明确范围，比余数取模更能表达意图。",
  ],
  [
    "Sample speed",
    "40..120 px/s",
    "速度与高度使用独立分布，范围来自玩法和屏幕约束。",
  ],
  [
    "Apply reset",
    "x = -width",
    "对象离开右边界后放到左侧外，避免一帧闪现在可见区域。",
  ],
  [
    "Reproduce",
    "fixed seed",
    "错误用同一种子回放；不要把不可重复随机当作更真实。",
  ],
] as const;

const movementItems = [
  [
    "Measure",
    "dt = clock.restart()",
    "每帧只重启一次时钟，所有实体共享同一个经过边界处理的时间跨度。",
  ],
  [
    "Decide",
    "if offscreen",
    "先基于当前边界决定是否重置，或在更新后统一检测；顺序必须固定。",
  ],
  [
    "Move",
    "x += speed * dt",
    "以每秒速度乘秒得到本帧位移，避免帧率改变游戏速度。",
  ],
  [
    "Clamp",
    "min(dt, maxFrame)",
    "断点或窗口拖动可产生巨大 dt；限制单帧跨度保护本章的简单动画。",
  ],
  [
    "Draw",
    "sprite.setPosition",
    "逻辑状态是事实来源，渲染只读取结果，不在 draw 阶段再次推进。",
  ],
  [
    "Verify",
    "same distance per second",
    "分别在帧率上限和垂直同步配置下测量一秒位移，允许小的调度误差。",
  ],
] as const;

export function BcgpVariableStateMap() {
  return (
    <VariablesMap
      ariaLabel="Beginning C++ Game Programming 第三版第二章变量身份类型初值单位不变量和观测六项状态图"
      caption="变量不是随便找个类型的盒子：名字、值域、单位、初值和不变量共同定义游戏状态。"
      items={stateItems}
    />
  );
}

export function BcgpRandomResetMap() {
  return (
    <VariablesMap
      ariaLabel="Timber 云和蜜蜂随机动画播种引擎分布速度重置和复现六阶段图"
      caption="随机系统也要可测试：引擎只播种一次，范围由分布表达，固定种子负责复现。"
      items={randomItems}
    />
  );
}

export function BcgpTimedMovementMap() {
  return (
    <VariablesMap
      ariaLabel="Timber 每帧测时分支移动限幅设置精灵和验证六阶段动画图"
      caption="一帧只产生一个 dt；先维护逻辑状态，再同步精灵并绘制，更新与渲染不互相改值。"
      items={movementItems}
    />
  );
}
