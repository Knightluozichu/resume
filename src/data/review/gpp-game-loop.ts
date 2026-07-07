import type { ReviewQuestion } from "./types";

/** 游戏循环复习题 */
export const gppGameLoopQuestions: ReviewQuestion[] = [
  {
    id: "gpp-game-loop-01",
    chapter: "gpp-game-loop",
    level: 1,
    question: "游戏循环的核心职责是什么？",
    answer:
      "游戏循环是整个游戏的心脏，核心职责是「在游戏运行期间反复推进模拟并渲染」。\n\n每一轮循环（一帧）典型做三件事：\n1. 处理输入：读取键盘/手柄/鼠标/网络输入。\n2. 更新（Update）：推进游戏世界状态——移动实体、执行 AI、物理模拟、碰撞检测、播放动画。这一步改变世界。\n3. 渲染（Render）：把当前世界状态画到屏幕。\n\n关键特征：\n- 它是「忙循环」——不像事件驱动的 GUI 等用户操作才动，游戏循环无论有没有输入都每帧推进，让世界持续运动。\n- 它掌控「时间」——决定一帧推进多少游戏时间，保证游戏速度与帧率解耦。\n- 它永不退出（直到玩家关游戏），是主线程的顶层结构。\n\n与「事件循环」的区别：事件循环是「事件来了才处理」，空闲时等待；游戏循环是「每帧主动推进」，即使无输入也在跑物理和渲染。",
    tags: ["游戏循环", "核心职责", "帧", "输入更新渲染"],
  },
  {
    id: "gpp-game-loop-02",
    chapter: "gpp-game-loop",
    level: 2,
    question: "固定时间步（fixed timestep）与可变时间步（variable timestep）有什么区别？",
    answer:
      "两者区别在于「每帧推进多少游戏时间」：\n\n可变时间步：\n- 每帧测量实际经过的真实时间 `dt`（如 16ms、20ms、33ms），用它作为本帧的更新步长。\n- 公式：`update(dt)`，`dt` 随帧率波动。\n- 优点：简单直观，帧率高游戏就快、帧率低游戏就慢，但「看起来」速度一致（因为按真实时间推进）。\n- 缺点：\n  - 物理不稳定——`dt` 波动会导致积分误差，物体可能穿透、抖动、行为不一致。\n  - 确定性丢失——同样输入不同帧率下结果不同，无法做确定录像回放。\n  - `dt` 过大（卡顿帧）会让物理爆炸（物体瞬移穿墙）。\n\n固定时间步：\n- 每帧推进固定的游戏时间 `dt = 1/60` 秒，与真实帧率无关。\n- 如果真实一帧耗时超过 `dt`，就一帧内多次 `update(dt)` 追赶（accumulator 模式）。\n- 优点：\n  - 物理稳定——每次积分步长一致，结果可复现。\n  - 确定性——同样输入同样结果，支持录像回放、lockstep 联机。\n  - 不怕卡顿——卡顿帧多跑几次 update 追上，游戏速度不变。\n- 缺点：\n  - 实现稍复杂（要处理 accumulator 和剩余时间）。\n  - 「死亡螺旋」——如果单次 update 比真实 dt 还慢，accumulator 越积越多，永远追不上，游戏越来越慢（需设上限或减步长）。\n\n实践：现代游戏引擎普遍采用「固定时间步更新 + 可变时间步渲染」——物理/逻辑用固定步保证稳定，渲染用插值平滑。本书推荐固定时间步。",
    tags: ["固定时间步", "可变时间步", "物理稳定", "确定性"],
  },
  {
    id: "gpp-game-loop-03",
    chapter: "gpp-game-loop",
    level: 3,
    question: "写一个固定时间步游戏循环的伪码（accumulator 模式）。",
    answer:
      "核心思路：用 `accumulator` 累积真实经过的时间，每次消耗一个固定 `dt` 跑一次 `update`，渲染时用剩余插值。\n\n```\nconst FIXED_DT = 1 / 60  // 固定步长\nlet last = currentTime()  // 上一帧的真实时间\nlet accumulator = 0.0     // 累积的待消费时间\n\nwhile (running) {\n  const now = currentTime()\n  let frameTime = now - last\n  last = now\n\n  // 防止死亡螺旋：单帧时间封顶\n  if (frameTime > 0.25) frameTime = 0.25\n\n  accumulator += frameTime\n\n  // 消耗累积时间，每次跑一个固定步\n  while (accumulator >= FIXED_DT) {\n    processInput()\n    update(FIXED_DT)   // 注意：传固定步长\n    accumulator -= FIXED_DT\n  }\n\n  // 渲染用插值因子平滑，避免固定步导致的视觉抖动\n  const alpha = accumulator / FIXED_DT\n  render(alpha)\n}\n```\n\n要点：\n1. `frameTime` 是真实经过时间，封顶 0.25 秒防止卡顿时 accumulator 爆炸（死亡螺旋保护）。\n2. `update()` 永远收 `FIXED_DT`，保证物理确定。\n3. 一帧内可能跑 0 次、1 次或多次 update——帧率高于 60 时可能 0 次（只渲染插值），卡顿时多次追赶。\n4. `render(alpha)` 用 `alpha`（0~1）在上一物理状态和当前状态间插值，让画面在两次 update 之间也平滑。\n\n这样物理稳定（固定步）、画面流畅（插值渲染）、速度一致（accumulator 追赶），是业界标准做法。",
    tags: ["应用", "伪码", "accumulator", "固定时间步", "插值渲染"],
  },
  {
    id: "gpp-game-loop-04",
    chapter: "gpp-game-loop",
    level: 4,
    question:
      "为什么跨平台游戏的帧率不同（PC 144fps、手机 30fps），但游戏速度应该一致？游戏循环如何保证这一点？",
    answer:
      "为什么需要速度一致：\n游戏是「玩法」，玩法的公平性和手感要求「同样的操作产生同样的游戏结果」。如果 PC 上角色跑得比手机快（因为帧率高），那玩法就因设备而异——联机不公平、体验不一致、录像无法跨平台回放。\n\n帧率不同但速度一致，本质是把「渲染频率」和「模拟频率」解耦：\n\n1. 渲染频率跟着设备走：\nPC 144Hz 屏幕每秒画 144 帧，手机 30fps 每秒画 30 帧。这是「能画多快画多快」，只影响画面流畅度，不影响游戏世界推进速度。\n\n2. 模拟频率由固定时间步保证：\n游戏世界的推进用固定时间步 `FIXED_DT`。不管渲染多少帧，每秒累计推进的「游戏时间」恒定。\n- PC 144fps：每帧真实时间约 6.9ms，`accumulator` 每 16.6ms（=1/60）才凑够一次 update，所以很多帧只渲染不 update（或用插值），每秒仍恰好 60 次 update = 推进 1 秒游戏时间。\n- 手机 30fps：每帧真实时间约 33ms，一帧内 `accumulator` 够跑 2 次 update，每秒 30 帧 × 2 = 60 次 update = 推进 1 秒游戏时间。\n- 结果：两者每秒推进的游戏时间都是 1 秒，速度一致。\n\n3. 固定时间步的功劳：\n- `update(FIXED_DT)` 与真实帧率无关，只看累积时间。无论一帧 6.9ms 还是 33ms，`accumulator` 每攒满 `FIXED_DT` 跑一次。\n- 物理积分步长恒定 → 行为确定 → 跨设备结果一致。\n\n4. 插值渲染抹平视觉差异：\n- PC 帧率高，update 之间多渲染几次插值帧，画面更丝滑。\n- 手机帧率低，插值少，画面略顿但游戏速度不变。\n- 玩家感受：PC 更流畅，手机稍卡，但角色移动速度、物理表现完全一样。\n\n5. 边界情况：\n- 设备太慢（单次 update 都跑不完）：accumulator 封顶保护，游戏主动「慢放」而非物理爆炸——速度变慢但行为正确，优于「快但错」。\n- 联机场景：lockstep 同步命令序列 + 固定步，所有端按相同步长推进，结果一致。\n\n一句话：固定时间步让「模拟速度」绑定游戏时间而非帧时间，渲染只是「采样展示」——采样频率不同不影响被采样的世界本身。这就是游戏循环跨平台保证速度一致的原理。",
    tags: ["综合", "跨平台", "帧率", "固定时间步", "插值", "速度一致"],
  },
];
