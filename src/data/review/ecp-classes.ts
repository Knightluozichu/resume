import type { ReviewQuestion } from "./types";

/** Easy C++（第5版）· 类与对象复习题 */
export const ecpClassesQuestions: ReviewQuestion[] = [
  {
    id: "ecp-classes-1",
    chapter: "ecp-classes",
    level: 1,
    question: `什么是类？类和对象是什么关系？写一个简单的 \`Student\` 类，包含姓名和分数两个成员变量。`,
    answer:
      `类是一种自定义数据类型，把数据（成员变量）和操作数据的函数（成员函数）打包在一起，是面向对象编程的基本单位。\n\n类和对象的关系：类是「图纸/模板」，对象是按图纸造出的「实例」。一个类可以创建多个对象，每个对象有各自的成员变量值，但共享同一套成员函数。\n\n\`Student\` 类：\n\`\`\`cpp\nclass Student {\npublic:\n    string name;\n    int score;\n};\n\`\`\`\n\n创建对象：\n\`\`\`cpp\nStudent s1;\ns1.name = \"张三\";\ns1.score = 90;\n\`\`\`\n\n\`class\` 关键字定义类，\`public:\` 表示后面的成员公开可访问。\`s1\` 是 \`Student\` 类的一个对象。`,
    tags: ["类", "对象", "成员变量"],
  },
  {
    id: "ecp-classes-2",
    chapter: "ecp-classes",
    level: 2,
    question: `什么是构造函数和析构函数？它们分别什么时候被调用？写一个带构造函数的 \`Student\` 类。`,
    answer:
      `构造函数：\n- 与类同名的特殊成员函数，对象创建时自动调用，用于初始化成员变量。\n- 没有返回类型，可以有参数，支持重载。\n\n析构函数：\n- 名为 \`~类名\` 的特殊成员函数，对象销毁时自动调用，用于释放资源。\n- 没有参数和返回类型，每个类只能有一个。\n\n带构造函数的 \`Student\` 类：\n\`\`\`cpp\nclass Student {\npublic:\n    string name;\n    int score;\n    // 构造函数\n    Student(string n, int s) {\n        name = n;\n        score = s;\n    }\n    // 析构函数\n    ~Student() {\n        cout << name << \" 被销毁\" << endl;\n    }\n};\n\`\`\`\n\n调用时机：\n- \`Student s(\"张三\", 90);\` 创建对象时调用构造函数。\n- \`s\` 离开作用域时调用析构函数。\n\n构造函数保证对象一创建就处于有效状态，析构函数保证对象销毁前清理资源（如动态分配的内存、打开的文件）。`,
    tags: ["构造函数", "析构函数", "生命周期"],
  },
  {
    id: "ecp-classes-3",
    chapter: "ecp-classes",
    level: 3,
    question: `给 \`Student\` 类添加一个成员函数 \`isPass()\` 判断是否及格（分数 >= 60），再添加一个 \`display()\` 打印学生信息。写出完整代码并创建对象测试。`,
    answer:
      `\`\`\`cpp\n#include <iostream>\n#include <string>\nusing namespace std;\n\nclass Student {\npublic:\n    string name;\n    int score;\n\n    Student(string n, int s) : name(n), score(s) {}\n\n    // 判断是否及格\n    bool isPass() {\n        return score >= 60;\n    }\n\n    // 打印信息\n    void display() {\n        cout << name << \" 分数:\" << score\n             << (isPass() ? \" 及格\" : \" 不及格\") << endl;\n    }\n};\n\nint main() {\n    Student s1(\"张三\", 85);\n    Student s2(\"李四\", 50);\n    s1.display();  // 张三 分数:85 及格\n    s2.display();  // 李四 分数:50 不及格\n    return 0;\n}\n\`\`\`\n\n要点：\n1. 成员函数可以直接访问该类的成员变量（\`name\`、\`score\`）。\n2. \`isPass()\` 返回 \`bool\`，可被 \`display()\` 内部调用，体现类内复用。\n3. 构造函数用初始化列表 \`: name(n), score(s)\`，比在函数体里赋值更高效。\n4. 对象 \`s1\`、\`s2\` 各有独立的 \`name\` 和 \`score\`，但共享同一套成员函数。`,
    tags: ["成员函数", "封装", "应用"],
  },
  {
    id: "ecp-classes-4",
    chapter: "ecp-classes",
    level: 4,
    question: `综合分析：\`public\`、\`private\`、\`protected\` 三种访问修饰符有什么区别？为什么要把成员变量设为 \`private\` 而通过 \`public\` 函数访问？`,
    answer:
      `三种访问修饰符：\n\n1. \`public\`：公开成员，类外任意代码都能访问。是对外的接口。\n2. \`private\`：私有成员，只有类自己的成员函数能访问。是对内的实现细节。\n3. \`protected\`：受保护成员，类自己和派生类（子类）能访问，类外不能。用于继承场景。\n\n把成员变量设为 \`private\`、通过 \`public\` 函数访问的好处（封装）：\n\n1. 数据保护：外部不能随意修改内部状态，只能通过提供的接口。例如 \`setScore(int s)\` 可以在函数里检查 \`s >= 0\`，防止非法值。\n2. 实现隐藏：内部实现可以自由改变，只要接口不变就不影响使用方。比如把 \`score\` 从 \`int\` 换成 \`double\`，只要 \`getScore()\` 返回类型兼容，调用方代码不用改。\n3. 维护一致性：所有修改都经过函数，可以在函数里加日志、断言、触发事件，便于调试和维护。\n4. 降低耦合：外部只依赖接口不依赖实现，修改内部不影响外部，减少 bug 传播。\n\n反例：如果成员变量是 \`public\`，任何代码都能直接 \`s.score = -100\`，无法拦截非法值；改成员变量名会导致所有调用方编译失败。\n\n这就是面向对象「封装」原则：隐藏实现细节，只暴露稳定接口。`,
    tags: ["访问控制", "封装", "public", "private", "综合"],
  },
];
