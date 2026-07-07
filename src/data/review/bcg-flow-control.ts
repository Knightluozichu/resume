import type { ReviewQuestion } from "./types";

/** C++ 游戏编程入门 · 流程控制复习题 */
export const bcgFlowControlQuestions: ReviewQuestion[] = [
  {
    id: "bcg-flow-control-1",
    chapter: "bcg-flow-control",
    level: 1,
    question: "`if/else` 和 `switch` 各适合什么场景？游戏菜单选项该用哪个？",
    answer:
      "`if/else` 适合范围判断和复杂条件（如 `hp <= 0`）；`switch` 适合对一个整型/字符表达式的多个离散等值分发（如按键 1/2/3）。\n\n游戏菜单选项（1 开始、2 设置、3 退出）该用 `switch`：每个 case 对应一个选项，结构清晰、易扩展。若用一长串 `if (choice==1) ... else if (choice==2) ...` 会更冗长且易漏 break 等价物。\n\n注意：`switch` 只能判等值、case 必须常量；判断区间或浮点仍需 `if`。",
    tags: ["if", "switch", "菜单", "分支"],
  },
  {
    id: "bcg-flow-control-2",
    chapter: "bcg-flow-control",
    level: 2,
    question: "`while` 和 `for` 有什么本质区别？为什么游戏主循环通常用 `while` 而遍历敌人列表用 `for`？",
    answer:
      "本质区别：`for` 把「初始化、条件、步进」三段写在一行，适合**已知次数**的计数循环；`while` 只写条件，适合**次数不确定、靠状态退出**的循环。\n\n游戏主循环用 `while (window.isOpen())`：循环次数事先未知，由玩家是否关窗口决定，没有自然的计数器。用 `for` 写会很别扭（要硬凑一个无意义的计数变量）。\n\n遍历敌人列表用 `for (int i=0; i<enemies.size(); i++)` 或范围 for：次数已知（= 列表长度），有明确的计数/迭代变量，用 `for` 表达力更强、意图更清晰。\n\n一句话：次数已知用 for，状态驱动用 while。",
    tags: ["while", "for", "游戏循环", "遍历"],
  },
  {
    id: "bcg-flow-control-3",
    chapter: "bcg-flow-control",
    level: 3,
    question: "`break` 和 `continue` 在循环里分别做什么？写一个游戏代码片段说明它们的用法。",
    answer:
      "`break` 立即跳出整个循环；`continue` 跳过本次剩余语句、直接进入下一次循环条件判断。\n\n游戏例（遍历敌人找第一个可攻击目标）：\n```cpp\nfor (auto* e : enemies) {\n  if (!e->isAlive()) continue;   // 死的敌人跳过，看下一个\n  if (e->isInvincible()) continue; // 无敌的也跳过\n  player.attack(e);\n  break;                          // 找到第一个能打的就停，不一打到底\n}\n```\n`continue` 让我们「过滤」掉不符合条件的敌人而不嵌套 if；`break` 让我们「找到即停」避免无谓遍历。\n\n注意：在 `switch` 里 `break` 是「结束 case」而非跳出外层循环，容易混淆；嵌套循环里 `break` 只破一层。",
    tags: ["break", "continue", "循环控制", "应用"],
  },
  {
    id: "bcg-flow-control-4",
    chapter: "bcg-flow-control",
    level: 4,
    question: "综合分析：游戏主循环里嵌套了「遍历敌人 + 每个敌人判断是否撞玩家」的双重循环，如何用流程控制结构把它写得既正确又高效？",
    answer:
      "结构上：外层 for 遍历敌人，内层用 if 判断碰撞，命中后用 break 提前终止外层（若只需知道是否碰到）。\n\n要点：\n1. 早退：若只需「是否发生碰撞」这一布尔结果，内层一旦命中就 break 外层，避免无谓遍历剩余敌人。可用标志位 + break，或直接 return。\n2. 过滤：先 continue 掉不可能碰撞的（已死、距离过远用粗筛），减少进入精确判断的次数。\n3. 避免深层嵌套：把「判断单个敌人是否撞玩家」抽成函数，循环体只剩一个 if，可读性大增。\n4. 性能：敌人多时双重循环是 O(N)，可引入空间分区（四叉树/网格）把候选缩到少数，但这是后续优化，初学先写对再优化。\n\n示例骨架：\n```cpp\nbool hit = false;\nfor (auto* e : enemies) {\n  if (!e->isAlive()) continue;\n  if (distance(e, player) > 50) continue; // 粗筛\n  if (aabbOverlap(e->bounds(), player.bounds())) {\n    hit = true;\n    break; // 只判是否碰到，提前退\n  }\n}\n```\n核心思想：用 continue 做粗筛减候选、用 break 做早退、用函数控制嵌套深度。",
    tags: ["综合", "嵌套循环", "早退", "性能", "碰撞"],
  },
];
