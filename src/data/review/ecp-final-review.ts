import type { ReviewQuestion } from "./types";

/** Easy C++（第5版）· 总复习复习题 */
export const ecpFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "ecp-final-review-1",
    chapter: "ecp-final-review",
    level: 1,
    question: `回顾全书，C++ 入门需要掌握的五大核心知识块是什么？它们之间的依赖关系是怎样的？`,
    answer:
      `五大核心知识块及依赖关系：\n\n1. 基本语法（变量与类型、运算符）：程序的「积木」，定义数据和处理数据的基础。是一切的前提。\n2. 控制流（if/for/while）：让程序能判断和循环，从顺序执行进化到有逻辑分支。依赖语法。\n3. 函数：把逻辑拆成可复用单元，学会分解问题。依赖语法和控制流（函数体内有判断和循环）。\n4. 类与对象（含继承多态）：用对象组织数据与行为，面向对象编程。依赖函数（成员函数就是类内的函数）。\n5. 模板与 STL：泛型编程和标准库工具，复用最大化。依赖类（STL 容器是类模板）和函数（算法是函数模板）。\n\n依赖链：语法 → 控制流 → 函数 → 类 → 模板/STL。每一块是下一块的地基，顺序不能乱。`,
    tags: ["总复习", "知识体系", "依赖关系"],
  },
  {
    id: "ecp-final-review-2",
    chapter: "ecp-final-review",
    level: 2,
    question: `从「面向过程」到「面向对象」再到「泛型编程」，C++ 这三种编程范式分别解决什么问题？`,
    answer:
      `三种范式解决的问题：\n\n1. 面向过程（基本语法 + 控制流 + 函数）：\n   - 解决「如何用代码表达逻辑」的问题。\n   - 用变量存数据，用控制流做判断循环，用函数拆分复用。\n   - 适合简单脚本、算法题。局限：数据和处理数据的函数分离，数据多了难管理。\n\n2. 面向对象（类 + 继承 + 多态）：\n   - 解决「如何组织复杂程序中数据和操作的关系」的问题。\n   - 把数据和操作打包成类，用封装隐藏实现、用继承复用代码、用多态统一接口。\n   - 适合大型软件、模拟现实世界实体。局限：类层次设计不当会过度复杂。\n\n3. 泛型编程（模板 + STL）：\n   - 解决「如何让代码不依赖具体类型」的问题。\n   - 用模板写类型无关的代码，用 STL 复用现成的数据结构和算法。\n   - 适合库开发、需要多种类型复用的场景。局限：编译慢、错误信息难读。\n\n三者递进：面向过程打底，面向对象组织结构，泛型编程最大化复用。C++ 的强大在于三者共存，按需选用。`,
    tags: ["编程范式", "面向过程", "面向对象", "泛型"],
  },
  {
    id: "ecp-final-review-3",
    chapter: "ecp-final-review",
    level: 3,
    question: `设计一个简单的「学生成绩管理」程序，综合运用全书的类、继承、STL。说明你的设计思路和用到的知识点。`,
    answer:
      `设计思路：\n\n1. 定义 \`Student\` 基类，含 \`name\`、\`score\`，有虚函数 \`getGrade()\` 返回等级。\n2. 派生 \`HonorStudent\`（优秀生），覆盖 \`getGrade()\` 返回更高要求。\n3. 用 \`vector<Student*>\` 管理所有学生，利用多态统一处理。\n4. 用 STL 算法做排序、查找、统计。\n\n\`\`\`cpp\n#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Student {\npublic:\n    string name;\n    int score;\n    Student(string n, int s) : name(n), score(s) {}\n    virtual char getGrade() {\n        if (score >= 90) return 'A';\n        if (score >= 60) return 'B';\n        return 'C';\n    }\n    virtual ~Student() {}\n};\n\nclass HonorStudent : public Student {\npublic:\n    HonorStudent(string n, int s) : Student(n, s) {}\n    char getGrade() override {\n        if (score >= 95) return 'A';  // 优秀生标准更高\n        if (score >= 70) return 'B';\n        return 'C';\n    }\n};\n\nint main() {\n    vector<Student*> students = {\n        new Student(\"张三\", 85),\n        new HonorStudent(\"李四\", 92),\n        new Student(\"王五\", 50)\n    };\n\n    // 按分数排序（用 lambda 比较器）\n    sort(students.begin(), students.end(),\n         [](Student* a, Student* b) { return a->score > b->score; });\n\n    // 多态输出\n    for (auto s : students) {\n        cout << s->name << \" \" << s->score\n             << \" 等级:\" << s->getGrade() << endl;\n    }\n\n    for (auto s : students) delete s;\n    return 0;\n}\n\`\`\`\n\n知识点：类定义、构造函数、继承、虚函数多态、\`vector\` 容器、\`sort\` 算法、lambda 表达式、范围 for 循环。`,
    tags: ["综合设计", "类", "继承", "STL", "应用"],
  },
  {
    id: "ecp-final-review-4",
    chapter: "ecp-final-review",
    level: 4,
    question: `学完本书后，如果要继续深入 C++，你会建议从哪几个方向进阶？每个方向推荐学什么？`,
    answer:
      `四个进阶方向：\n\n1. 语言深度——掌握现代 C++ 特性：\n   - C++11/14/17：\`auto\`、\`lambda\`、智能指针（\`unique_ptr\`、\`shared_ptr\`）、右值引用与移动语义、\`constexpr\`。\n   - C++20：concepts、ranges、coroutines、modules。\n   - 推荐读物：《Effective Modern C++》《C++ Primer》第5版。\n   - 目标：写出更安全、更高效的现代 C++ 代码。\n\n2. 内存与底层——理解 C++ 如何运行：\n   - 内存模型、栈帧布局、虚函数表实现、对象生命周期。\n   - 手动内存管理（new/delete）与 RAII，理解智能指针原理。\n   - 推荐读物：《深度探索 C++ 对象模型》《CPU 眼里的 C++》。\n   - 目标：写出零泄漏、高性能的代码，能调试底层问题。\n\n3. 标准库深入——充分利用 STL：\n   - 深入容器（\`map\`、\`unordered_map\`、\`deque\`、\`list\`）的底层与选择策略。\n   - 算法库全貌（\`accumulate\`、\`transform\`、\`remove-erase\` 惯用法）。\n   - 多线程与并发（\`thread\`、\`mutex\`、\`atomic\`）。\n   - 推荐读物：《C++ 标准库》《C++ 并发编程实战》。\n   - 目标：不重复造轮子，用标准库写出简洁高效的代码。\n\n4. 工程实践——写大型项目：\n   - 设计模式在 C++ 中的应用（单例、工厂、观察者等）。\n   - 模板元编程进阶、CRTP、SFINAE。\n   - 构建工具（CMake）、测试（Google Test）、性能分析。\n   - 推荐读物：《Effective C++》《设计模式》《C++ 高性能编程》。\n   - 目标：能参与大型 C++ 项目，写出可维护的工程代码。\n\n综合建议：本书打下了语法和 OOP 基础，下一步优先学方向 1（现代 C++ 特性）补齐日常编程工具，再根据兴趣选方向深入。实践上，建议用 C++ 做一个小项目（如简易计算器、学生管理系统），把知识用起来。`,
    tags: ["进阶路线", "现代C++", "综合", "学习建议"],
  },
];
