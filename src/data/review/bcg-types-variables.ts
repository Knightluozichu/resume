import type { ReviewQuestion } from "./types";

/** C++ 游戏编程入门 · 类型、变量与运算复习题 */
export const bcgTypesVariablesQuestions: ReviewQuestion[] = [
  {
    id: "bcg-types-variables-1",
    chapter: "bcg-types-variables",
    level: 1,
    question: `C++ 基本类型有哪四大族？\`unsigned\` 修饰整型会带来什么变化？`,
    answer:
      `四大族：整型（short/int/long/long long）、浮点（float/double/long double）、字符（char 等）、布尔（bool）。\n\n\`unsigned\` 修饰整型后，该类型只能表示非负数。由于不再需要符号位，原本表示负数的那一半空间全部让给正数，所以正数上限翻倍。例如 16 位 \`int\` 范围约 -32768~32767，而 \`unsigned int\` 是 0~65535。游戏里不会为负的计数（如生命值、分数）适合用 unsigned。`,
    tags: ["基本类型", "整型", "unsigned", "有符号"],
  },
  {
    id: "bcg-types-variables-2",
    chapter: "bcg-types-variables",
    level: 2,
    question: `\`float\` 和 \`double\` 有什么区别？游戏里表示角色坐标应该用哪个？`,
    answer:
      `\`float\` 通常 4 字节、约 7 位有效十进制数字；\`double\` 通常 8 字节、约 15 位有效数字。\`double\` 精度更高但占内存更多。\n\n游戏里表示角色坐标一般用 \`float\`。原因：\n1. 游戏坐标精度要求不高，7 位有效数字对屏幕像素级定位足够。\n2. \`float\` 占内存少，海量实体（子弹、粒子）时省显存、cache 友好。\n3. GPU 单精度浮点运算通常比双精度快（甚至硬件优化更好）。\n\n只有需要高精度累积（如物理引擎长时间积分、天文模拟）才用 \`double\`。SFML 的向量类（Vector2f）也用 \`float\`。`,
    tags: ["浮点", "float", "double", "精度", "坐标"],
  },
  {
    id: "bcg-types-variables-3",
    chapter: "bcg-types-variables",
    level: 3,
    question: `用 \`auto\` 声明变量有什么好处和风险？给出一个游戏代码中的合理用法和误用例。`,
    answer:
      `好处：让编译器推导类型，少打字、改类型时连声明一起改，减少维护成本。\n风险：可读性下降——读代码时不能一眼看出类型；可能推导出非预期类型（如 \`auto x = {1}\` 推成 \`std::initializer_list<int>\`）。\n\n合理用法（类型明显、名字已自解释）：\n\`auto player = getPlayer();\` 当函数名已表明返回 Player。\n迭代器：\`for (auto it = enemies.begin(); ...)\` 免写冗长的 \`vector<Enemy*>::iterator\`。\n\n误用例：\`auto hp = player.getHealth();\` 读者不知 hp 是 int 还是 float，若后续做 \`hp / 2\` 在 int 下是整除，可能埋 bug。此时应显式写 \`int hp = ...\`。\n\n原则：类型不明显或涉及精度敏感运算时显式声明，其余用 auto。`,
    tags: ["auto", "类型推断", "可读性", "应用"],
  },
  {
    id: "bcg-types-variables-4",
    chapter: "bcg-types-variables",
    level: 4,
    question: `综合分析：在游戏中为「玩家生命值」选类型时，要考虑哪些因素？\`int\`、\`unsigned int\`、\`float\` 各有什么取舍？`,
    answer:
      `需考虑：是否会为负、是否需要小数、范围多大、是否参与显示格式化、与外部系统（UI、存档、网络）的兼容。\n\n\`int\`：\n- 利：可表示负数，便于用「负值」标记异常/无敌/死亡状态；与多数 API 默认整型一致。\n- 弊：范围上限比 unsigned 小一半，但生命值通常不会到 20 亿，足够。\n\n\`unsigned int\`：\n- 利：不会出现负数，语义上更贴切「生命不可为负」；正数上限大。\n- 弊：减到负数会回绕成巨大正数（如 0-1=4294967295），导致「负伤反而满血」的恶性 bug，难排查。混入有符号运算还会触发编译警告。\n\n\`float\`：\n- 利：支持小数伤害（如 12.5 点）、平滑血条插值。\n- 弊：浮点比较有误差，判断 \`hp == 0\` 不可靠；显示整数血量需额外取整。\n\n综合：大多数游戏用 \`int\` 最稳——既能用负值做哨兵，又避免无符号回绕陷阱，显示也直接。需要小数伤害或平滑血条时才用 \`float\`，并改用 \`hp <= 0\` 判定死亡。\`unsigned\` 不推荐用于会做减法的量。`,
    tags: ["综合", "类型选择", "生命值", "unsigned 陷阱", "取舍"],
  },
];
