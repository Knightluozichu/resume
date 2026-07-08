import type { ReviewQuestion } from "./types";

/** Python编程：从入门到实践 · 游戏开发复习题 */
export const pccGameDevQuestions: ReviewQuestion[] = [
  {
    id: "pcc-game-dev-1",
    chapter: "pcc-game-dev",
    level: 1,
    question: "游戏循环的三步是什么？为什么顺序不能颠倒？",
    answer:
      "游戏循环三步：\n1. **事件处理**：检测玩家输入（键盘、鼠标）和系统事件（退出）\n2. **状态更新**：根据输入和游戏规则更新所有对象的位置和状态\n3. **屏幕绘制**：清空屏幕，绘制所有对象，翻转缓冲区显示画面\n\n顺序不能颠倒的原因：\n- 事件处理必须在最前面——先知道玩家做了什么才能更新状态\n- 状态更新在绘制之前——先更新位置再画到屏幕上，否则画面比状态滞后一帧\n- 绘制在最后——只在状态确定后才渲染\n\n另外事件处理和状态更新之间不应有绘制——否则画面会闪烁。",
    tags: ["游戏循环", "事件处理", "绘制"],
  },
  {
    id: "pcc-game-dev-2",
    chapter: "pcc-game-dev",
    level: 2,
    question: "为什么游戏循环中必须调用 clock.tick(60)？不调会有什么问题？",
    answer:
      "`clock.tick(60)` 将帧率限制为 60 FPS（每秒最多 60 帧），保证游戏在不同性能的电脑上速度一致。\n\n不调的问题：\n- 游戏循环会以 CPU 最快速度运行——在高速电脑上飞船一帧就飞出屏幕，在慢速电脑上卡顿\n- CPU 占用率飙到 100%，电脑发热爱坏\n- 游戏速度完全取决于硬件性能，无法控制\n\ntick(60) 的原理：如果一帧的处理时间不到 1/60 秒（约 16.7 毫秒），tick 会等待补足差额。如果处理时间超过 16.7 毫秒，tick 立即返回（无法加速）。这保证了帧率上限但不保证下限——如果代码太慢帧率会降低。",
    tags: ["帧率", "clock.tick", "性能"],
  },
  {
    id: "pcc-game-dev-3",
    chapter: "pcc-game-dev",
    level: 3,
    question: "在"外星人入侵"项目中，全书哪些知识被综合运用了？",
    answer:
      "游戏项目综合运用了全书前三个板块的知识：\n\n**基础语法（变量与列表）**：变量存储游戏配置（速度、尺寸、颜色）；Group 本质是列表管理多个精灵；字典存储碰撞结果 {bullet: [aliens]}\n\n**控制流与函数**：while 循环构成游戏循环；if-elif-else 处理不同按键事件；函数封装 fire_bullet、create_fleet 等逻辑\n\n**类与文件**：Sprite 子类（Ship、Alien、Bullet）封装对象属性和行为；继承 pygame.sprite.Sprite；异常处理图片加载失败；Settings 类管理配置，GameStats 类管理分数\n\n游戏项目是全书知识的"毕业考试"——每个板块的知识都在项目中找到了实际应用场景。",
    tags: ["综合应用", "Pygame", "知识串联"],
  },
  {
    id: "pcc-game-dev-4",
    chapter: "pcc-game-dev",
    level: 4,
    question: "pygame.sprite.groupcollide(bullets, aliens, True, True) 的四个参数和返回值分别是什么？",
    answer:
      "`groupcollide(bullets, aliens, True, True)` 检测两组精灵之间的碰撞。\n\n四个参数：\n1. `bullets`：第一组精灵（子弹编组）\n2. `aliens`：第二组精灵（外星人编组）\n3. `True`（dokill1）：碰撞后是否删除第一组中的精灵（True = 删除碰撞的子弹）\n4. `True`（dokill2）：碰撞后是否删除第二组中的精灵（True = 删除碰撞的外星人）\n\n返回值：字典 `{bullet_sprite: [alien_sprite, ...]}`——每个碰撞的子弹作为键，它碰到的外星人列表作为值。\n\n```python\ncollisions = pygame.sprite.groupcollide(bullets, aliens, True, True)\nfor bullet, hit_aliens in collisions.items():\n    score += len(hit_aliens) * 10  # 每击中一个外星人加 10 分\n```\n\n如果不想删除精灵（只检测碰撞），传 False, False。",
    tags: ["碰撞检测", "groupcollide", "Sprite"],
  },
];
