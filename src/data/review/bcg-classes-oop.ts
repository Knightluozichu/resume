import type { ReviewQuestion } from "./types";

/** C++ 游戏编程入门 · 类与面向对象复习题 */
export const bcgClassesOopQuestions: ReviewQuestion[] = [
  {
    id: "bcg-classes-oop-1",
    chapter: "bcg-classes-oop",
    level: 1,
    question: `C++ 中 \`public\`、\`private\`、\`protected\` 三种访问控制分别允许谁访问？`,
    answer:
      `\`public\`：类内、类外、子类都能访问——对外暴露的接口。\n\`private\`：只有**类内**（含友元）能访问——外部和子类都不可见，用于隐藏实现细节。\n\`protected\`：类内和**子类**能访问，类外不可——介于两者之间，主要给继承体系用。\n\n游戏例：Player 类的 \`m_Health\` 设 private 防止外部直接改血量，只能通过 \`takeDamage()\` 这样的 public 方法受控修改；若有个 Enemy 子类需要访问基类的 \`m_Speed\`，就把 m_Speed 设 protected。`,
    tags: ["访问控制", "public", "private", "protected"],
  },
  {
    id: "bcg-classes-oop-2",
    chapter: "bcg-classes-oop",
    level: 2,
    question: `构造函数和析构函数分别在什么时候被调用？为什么析构函数常声明为虚函数？`,
    answer:
      `构造函数在**对象创建时**调用，负责初始化成员变量、申请资源。析构函数在**对象销毁时**调用（离开作用域或 delete），负责清理资源、释放内存。\n\n析构函数声明为虚函数（\`virtual ~Base()\`）是为了**通过基类指针删除派生类对象时能正确调用派生类的析构**。若基类析构非虚，\`delete basePtr\` 只调基类析构，派生类部分资源泄漏。\n\n游戏例：\`Entity* e = new Player(); delete e;\` 若 Entity 析构非虚，只清理 Entity 部分，Player 特有的资源（如贴图句柄）泄漏。设虚析构后先调 Player 析构再调 Entity 析构，正确清理。只要类可能被继承且通过基类指针管理，析构就应虚化。`,
    tags: ["构造函数", "析构函数", "虚析构", "继承"],
  },
  {
    id: "bcg-classes-oop-3",
    chapter: "bcg-classes-oop",
    level: 3,
    question: `封装的好处是什么？给一个游戏 Player 类的例子，说明把成员变量设 private、通过 public 方法访问如何提升健壮性。`,
    answer:
      `封装 = 把数据藏进 private，只暴露 public 方法操作。好处：\n1. 受控访问：方法内可加校验，防止非法状态。\n2. 实现可变：内部存储改了，只要方法签名不变，外部代码不用改。\n3. 不变量维护：保证对象始终处于有效状态。\n\nPlayer 类例：\n\`\`\`cpp\nclass Player {\nprivate:\n  int m_Hp;\npublic:\n  void takeDamage(int d) {\n    if (d < 0) return;          // 拒绝负伤害\n    m_Hp -= d;\n    if (m_Hp < 0) m_Hp = 0;     // 不会出现负血\n  }\n  int getHp() const { return m_Hp; }\n};\n\`\`\`\n若 m_Hp 是 public，外部可写 \`p.m_Hp = -999\` 制造非法状态。封装后只能走 takeDamage，血量始终在 [0, 上限] 内，且改伤害计算逻辑只动 takeDamage 一处。\n\n这就是封装的核心收益：把「血量永远非负」这个不变量锁在类里。`,
    tags: ["封装", "private", "不变量", "健壮性", "应用"],
  },
  {
    id: "bcg-classes-oop-4",
    chapter: "bcg-classes-oop",
    level: 4,
    question: `综合分析：设计一个游戏实体继承体系（Entity → Player/Enemy），考虑访问控制、虚函数、构造析构，指出常见设计陷阱。`,
    answer:
      `推荐设计：\n\`\`\`cpp\nclass Entity {\nprotected:\n  Vector2f m_Pos;        // 子类要用，设 protected\n  int m_Hp;\npublic:\n  Entity(Vector2f pos);\n  virtual ~Entity();     // 虚析构，防止通过基类指针 delete 泄漏\n  virtual void update(float dt) = 0;  // 纯虚，强制子类实现\n  virtual void draw(RenderWindow& w) const;\n  void takeDamage(int d); // 公共逻辑，非虚\n};\nclass Player : public Entity { ... override update/draw ... };\nclass Enemy : public Entity { ... };\n\`\`\`\n\n设计要点：\n1. 公共数据设 protected 供子类用；但能 private 就别 protected，减少子类耦合面。\n2. 析构虚化：实体几乎总要通过 \`vector<Entity*>\` 多态管理，虚析构是刚需。\n3. 行为差异用虚函数：update/draw 各子类不同，设为 virtual（或纯虚）；公共逻辑（takeDamage）非虚，子类直接复用。\n4. override 关键字：子类重写时加 override，编译器帮你检查签名是否真覆盖，防笔误。\n\n常见陷阱：\n- 析构忘虚 → 通过基类指针删派生对象时派生部分泄漏。\n- 在构造/析构里调虚函数 → 此时虚机制不按派生类走（对象还不完整/已拆），行为反直觉。\n- 过度继承：层次过深（Entity→Character→Mob→Goblin）导致改基类牵一发动全身；本书后续会建议组件模式替代深继承。\n- 把所有成员都 protected：等于变相 public，封装形同虚设。\n\n综合：基类定接口（虚函数）+ 公共逻辑（非虚）+ 受控数据（protected/private）+ 虚析构，是稳健继承体系的标准骨架。`,
    tags: ["综合", "继承体系", "虚函数", "虚析构", "设计陷阱", "override"],
  },
];
