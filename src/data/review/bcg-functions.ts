import type { ReviewQuestion } from "./types";

/** C++ 游戏编程入门 · 函数与引用复习题 */
export const bcgFunctionsQuestions: ReviewQuestion[] = [
  {
    id: "bcg-functions-1",
    chapter: "bcg-functions",
    level: 1,
    question: "值传递和引用传递有什么区别？函数签名上怎么区分？",
    answer:
      "值传递：实参的**副本**传给形参，函数内改形参不影响原变量。签名用普通类型，如 `void f(int x)`。\n引用传递：形参成为实参的**别名**，函数内改形参就是改原变量。签名用 `&`，如 `void f(int& x)`。\n\n区分就看参数类型有没有 `&`：有就是引用传递，没有就是值传递。\n\n游戏例：`void addScore(int s)` 值传，安全；`void damage(Player& p)` 引用传，能直接扣 p 的血。",
    tags: ["值传递", "引用传递", "参数", "函数签名"],
  },
  {
    id: "bcg-functions-2",
    chapter: "bcg-functions",
    level: 2,
    question: "什么时候应该用引用传递而不是值传递？`const` 引用又解决什么问题？",
    answer:
      "用引用传递的场景：\n1. 需要函数修改原变量（如 `damage(Player& p)` 直接改血量）。\n2. 实参是大对象（如 `string`、`vector`、`Sprite`），值传递要复制整份开销大，引用传递只传别名几乎零成本。\n\n`const` 引用解决「想避免复制、又不想被改」的需求：`void print(const Player& p)` 既省了复制，又保证函数内不会误改 p。这是只读大对象参数的标准写法。\n\n原则：小类型（int/float/指针）值传；大对象用 `const&` 只读或 `&` 可写。",
    tags: ["引用传递", "const 引用", "性能", "只读"],
  },
  {
    id: "bcg-functions-3",
    chapter: "bcg-functions",
    level: 3,
    question: "什么是函数重载？写一组重载的 `spawn` 函数，说明编译器如何区分它们。",
    answer:
      "函数重载：同名函数但**参数列表不同**（参数个数/类型/顺序不同），编译器根据调用时实参自动匹配最合适的那一个。返回类型不参与区分。\n\n重载示例：\n```cpp\nvoid spawn(Enemy& e);                 // 在默认位置生成\nvoid spawn(Enemy& e, float x, float y); // 指定坐标生成\nvoid spawn(Enemy& e, Vector2f pos);     // 用向量指定坐标\n```\n编译器区分：看调用实参。`spawn(e)` 匹配第一个；`spawn(e, 100, 200)` 匹配第二个（两个 float）；`spawn(e, pos)` 匹配第三个（Vector2f）。\n\n注意：参数名不参与区分，只有类型列表算。若两个重载对某调用都能匹配（二义性），编译报错，需显式转型消除。",
    tags: ["函数重载", "参数列表", "重载解析", "应用"],
  },
  {
    id: "bcg-functions-4",
    chapter: "bcg-functions",
    level: 4,
    question: "综合分析：设计一个「给玩家加血」的函数，参数有玩家、加血量、是否触发特效。用值传/引用/默认参数/重载综合考虑，给出最佳设计并说明理由。",
    answer:
      "推荐设计（组合默认参数 + const 引用 + 引用输出）：\n```cpp\nvoid heal(Player& p, int amount = 10, bool showEffect = true);\n```\n\n理由逐项：\n1. `Player& p` 用引用：必须改玩家的血量，值传改不了原件；Player 是大对象，引用也省复制。\n2. `int amount` 值传：小类型 + 只读输入，值传最直接，无需 const&。\n3. `amount = 10` 默认参数：常见情况（小回血）调用方写 `heal(p)` 即可，省啰嗦；需大回血才传 `heal(p, 50)`。\n4. `showEffect = true` 默认参数：默认要特效，特殊场景（静默回血、测试）传 `false` 关掉。把布尔开关做成默认参数比新增重载更简洁。\n\n为何不用重载：`heal(p)` 和 `heal(p, 50)` 和 `heal(p, 50, false)` 用默认参数一条签名搞定；若用重载要写三个函数且内部互相转发，维护更累。默认参数适合「参数有常见默认值」，重载适合「参数类型/语义不同」。\n\n为何不返回新血量：血量已通过引用写回 p，再返回会语义重复；若调用方需要可再 `p.getHp()` 读，不必让函数既改又返。\n\n综合：引用解决修改与性能、值传处理小输入、默认参数覆盖常见用法，三者配合得到一条简洁灵活的签名。",
    tags: ["综合", "函数设计", "默认参数", "引用", "重载取舍"],
  },
];
