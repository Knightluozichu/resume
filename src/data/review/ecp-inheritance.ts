import type { ReviewQuestion } from "./types";

/** Easy C++（第5版）· 继承与多态复习题 */
export const ecpInheritanceQuestions: ReviewQuestion[] = [
  {
    id: "ecp-inheritance-1",
    chapter: "ecp-inheritance",
    level: 1,
    question: `什么是继承？写一个 \`Animal\` 基类和一个 \`Dog\` 派生类的例子。\`Dog\` 继承 \`Animal\` 后能得到什么？`,
    answer:
      `继承是面向对象的核心机制：一个类（派生类/子类）可以继承另一个类（基类/父类）的成员变量和成员函数，在不修改基类代码的情况下复用和扩展其功能。\n\n例子：\n\`\`\`cpp\nclass Animal {\npublic:\n    string name;\n    void eat() { cout << name << \"在吃东西\"; }\n};\n\nclass Dog : public Animal {\npublic:\n    void bark() { cout << name << \"在汪汪叫\"; }\n};\n\`\`\`\n\n\`Dog\` 继承 \`Animal\` 后得到：\n1. 成员变量 \`name\`——不用重新声明。\n2. 成员函数 \`eat()\`——不用重新定义。\n3. 自己新增的 \`bark()\`——扩展功能。\n\n\`Dog d; d.name = \"旺财\"; d.eat(); d.bark();\` 都合法。继承表达了「Dog 是一种 Animal」的 is-a 关系，实现了代码复用。`,
    tags: ["继承", "基类", "派生类", "is-a"],
  },
  {
    id: "ecp-inheritance-2",
    chapter: "ecp-inheritance",
    level: 2,
    question: `什么是虚函数和多态？为什么基类指针指向派生类对象时，需要虚函数才能调用到派生类的版本？`,
    answer:
      `虚函数：用 \`virtual\` 关键字修饰的成员函数，表示「这个函数在派生类中可以被覆盖（override）」。\n\n多态：通过基类指针或引用调用虚函数时，实际执行哪个版本取决于指针指向的对象的真实类型，而不是指针的声明类型。即「同一接口，不同行为」。\n\n为什么需要虚函数：\n\`\`\`cpp\nAnimal *p = new Dog();\np->speak();  // 没有 virtual → 调用 Animal::speak()\n             // 有 virtual → 调用 Dog::speak()\n\`\`\`\n\n不用 \`virtual\` 时，调用按指针的声明类型（\`Animal*\`）静态绑定，调用 \`Animal::speak()\`。\n用 \`virtual\` 时，调用按对象的实际类型（\`Dog\`）动态绑定，调用 \`Dog::speak()\`。\n\n动态绑定通过虚函数表（vtable）实现：每个含虚函数的类有一张函数指针表，对象内部存指向本类 vtable 的指针。调用虚函数时通过 vtable 查找实际地址，所以能找到派生类的版本。`,
    tags: ["虚函数", "多态", "动态绑定", "virtual"],
  },
  {
    id: "ecp-inheritance-3",
    chapter: "ecp-inheritance",
    level: 3,
    question: `写一个完整例子：\`Animal\` 基类有虚函数 \`speak()\`，\`Cat\` 和 \`Dog\` 各自覆盖它。用一个 \`Animal*\` 数组存放不同动物，循环调用 \`speak()\` 观察多态效果。`,
    answer:
      `\`\`\`cpp\n#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Animal {\npublic:\n    string name;\n    Animal(string n) : name(n) {}\n    virtual void speak() { cout << name << \"发出声音\" << endl; }\n    virtual ~Animal() {}  // 虚析构，确保正确释放\n};\n\nclass Dog : public Animal {\npublic:\n    Dog(string n) : Animal(n) {}\n    void speak() override { cout << name << \"汪汪汪\" << endl; }\n};\n\nclass Cat : public Animal {\npublic:\n    Cat(string n) : Animal(n) {}\n    void speak() override { cout << name << \"喵喵喵\" << endl; }\n};\n\nint main() {\n    Animal* zoo[] = {\n        new Dog(\"旺财\"),\n        new Cat(\"咪咪\"),\n        new Dog(\"大黄\")\n    };\n    for (int i = 0; i < 3; i++) {\n        zoo[i]->speak();  // 多态：各自调用对应版本\n    }\n    for (int i = 0; i < 3; i++) delete zoo[i];\n    return 0;\n}\n\`\`\`\n\n输出：\n\`\`\`\n旺财汪汪汪\n咪咪喵喵喵\n大黄汪汪汪\n\`\`\`\n\n要点：\n1. \`virtual\` 声明虚函数，\`override\` 关键字（C++11）确保正确覆盖。\n2. 基类指针 \`Animal*\` 指向派生类对象，调用 \`speak()\` 时动态绑定到各自版本。\n3. 基类析构函数声明为 \`virtual\`，否则 \`delete zoo[i]\` 只调用 \`Animal\` 的析构，派生类资源泄漏。\n4. 这就是多态的价值：同一段循环代码处理不同类型，新增动物类不用改循环。`,
    tags: ["多态", "override", "虚析构", "应用"],
  },
  {
    id: "ecp-inheritance-4",
    chapter: "ecp-inheritance",
    level: 4,
    question: `综合分析：继承和组合（has-a）分别在什么场景下使用？过度继承有什么危害？`,
    answer:
      `继承（is-a）适用场景：\n- 派生类「是一种」基类，如 \`Dog\` 是一种 \`Animal\`。\n- 派生类要复用基类的接口和实现，并可能覆盖行为（多态）。\n- 基类与派生类有强耦合的语义关系，生命周期一致。\n\n组合（has-a）适用场景：\n- 一个类「包含」另一个类作为部件，如 \`Car\` 包含 \`Engine\`。\n- 部件可以独立替换、运行时改变，关系灵活。\n- 只需复用功能，不需要暴露相同接口。\n\n选择原则：「is-a 用继承，has-a 用组合」。优先用组合，只有真正满足 is-a 且需要多态时才用继承。\n\n过度继承的危害：\n1. 层次过深：\`A → B → C → D → E\`，修改 \`A\` 会影响整条链，牵一发动全身。\n2. 强耦合：派生类依赖基类实现细节，基类变动导致派生类编译失败或行为异常（脆弱基类问题）。\n3. 菱形继承：多继承时同名成员冲突，需 \`virtual\` 继承解决，增加复杂度。\n4. 灵活性差：继承在编译时确定，运行时无法切换父类；组合可以在运行时替换部件。\n5. 爆炸式增长：用继承给类加功能（如 \`FlyingDog\`、\`SwimmingDog\`）会导致子类组合爆炸，用组合（\`Behavior\` 接口）更可控。\n\n综合：继承适合表达稳定的类型层次和多态，组合适合灵活组装功能。现代设计趋势是「组合优于继承」，用接口 + 组合替代深层继承树，提高可维护性。`,
    tags: ["继承", "组合", "is-a", "has-a", "综合"],
  },
];
