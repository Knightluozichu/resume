import type { ReviewQuestion } from "./types";

/** C++ Primer Plus · C++ 基础语法复习题 */
export const eppCppBasicsQuestions: ReviewQuestion[] = [
  {
    id: "epp-cpp-basics-1",
    chapter: "epp-cpp-basics",
    level: 1,
    question: `一个最简的 C++ 程序由哪些要素构成？main 函数的返回值代表什么？`,
    answer:
      `最简 C++ 程序五要素：\n\n1. \`#include <iostream>\`：预处理指令，把输入输出库头文件插入源码。\n2. \`using namespace std;\`：命名空间声明，省去 \`std::\` 前缀。\n3. \`int main() { ... }\`：程序入口，操作系统调用它。\n4. \`cout << \"Hello\";\`：标准输出，用插入运算符把文本送到屏幕。\n5. \`return 0;\`：返回语句，0 表示正常结束。\n\nmain 的返回值是 int 状态码，交还给操作系统。0 表示正常结束，非 0 表示异常。操作系统或调用脚本据此判断程序是否成功。C++ 标准允许 main 省略 return 语句，编译器隐式返回 0，但显式写 return 0 更清晰。`,
    tags: ["程序结构", "main", "返回值"],
  },
  {
    id: "epp-cpp-basics-2",
    chapter: "epp-cpp-basics",
    level: 2,
    question: `C++ 的命名空间（namespace）解决什么问题？\`using namespace std;\` 有什么风险？`,
    answer:
      `命名空间解决「名称冲突」问题：大型项目多人协作，不同库可能定义同名类/函数，命名空间把它们隔离，避免冲突。标准库的所有内容都放在 std 命名空间里。\n\n\`using namespace std;\` 的风险：\n1. 把 std 里所有名称一股脑引入当前作用域，可能与你自定义的同名标识符冲突。\n2. 破坏了命名空间的隔离初衷——一旦引入，编译器就无法区分你写的 vector 是自己的还是 std 的。\n3. 在头文件中使用尤其危险：所有 include 该头文件的文件都被污染，且难追溯。\n\n推荐做法：在源文件里用 \`using std::cout;\` 这种限定引入，只引入真正用到的名字；或全程写 \`std::cout\` 显式限定，虽繁琐但最安全。`,
    tags: ["命名空间", "using", "名称冲突"],
  },
  {
    id: "epp-cpp-basics-3",
    chapter: "epp-cpp-basics",
    level: 3,
    question: `你的 C++ 程序能编译通过但运行时一闪而过看不到输出，可能是什么原因？如何排查？`,
    answer:
      `常见原因与排查：\n\n1. 程序正常结束太快：控制台程序输出完立即退出，窗口一闪而过。修法：在 return 前加 \`cin.get();\` 或 \`system(\"pause\")\`（后者不跨平台），让程序等待输入再退出。\n\n2. 输出缓冲未刷新：cout 默认带缓冲，程序异常退出时缓冲未刷到屏幕。修法：用 \`endl\`（刷新并换行）或 \`cout.flush()\`，或关闭同步 \`ios::sync_with_stdio(false)\` 时注意手动刷新。\n\n3. 程序崩溃在输出之后：若 cout 之后有未定义行为（如越界访问），可能在退出前崩溃，看似「没输出」。排查：在 cout 后立即 endl 刷新，再用调试器单步看是否到达崩溃点。\n\n4. 重定向了标准输出：检查是否被重定向到文件，终端看不到。排查：在 shell 里直接运行而非 IDE。\n\n关键习惯：调试期用 \`cout << x << endl;\`（带 endl 刷新），确认输出可见后再优化为 \`\\n\`。`,
    tags: ["运行时排查", "缓冲", "应用"],
  },
  {
    id: "epp-cpp-basics-4",
    chapter: "epp-cpp-basics",
    level: 4,
    question: `综合分析：C++ 兼容 C 的过程式语法（main、函数、控制流），又引入命名空间与 iostream，这种「兼容 + 扩展」策略对工程有什么利弊？`,
    answer:
      `利：\n1. 低迁移成本：C 代码几乎可直接用 C++ 编译器编译，C 程序员能平滑过渡，C++ 得以快速推广。\n2. 生态复用：海量 C 库（系统调用、第三方库）可直接在 C++ 中调用，无需重写。\n3. 渐进式现代化：旧 C 代码可逐步引入 C++ 特性（先加命名空间、换 iostream，再上类），不必一次性重写。\n\n弊：\n1. 语言臃肿：C++ 既要支持 C 的指针算术、宏、goto，又要支持类、模板、异常，特性爆炸导致学习曲线陡峭，编译器实现复杂。\n2. 陷阱并存：C 的不安全特性（裸指针、数组退化、无边界检查）与 C++ 的安全抽象并存，新手容易写出「C with classes」的混合代码，引入内存错误。\n3. 风格分裂：同一项目里可能并存 C 风格（printf/malloc）与 C++ 风格（cout/new），团队需约定规范否则代码混乱。\n\n工程权衡：现代 C++ 项目倾向于「用 C++ 子集」——禁用裸 new/delete、优先 STL、用 RAII 管理资源，把 C 兼容性当作「能用」而非「该用」。兼容是 C++ 成功的基石，也是它复杂的根源。`,
    tags: ["综合", "兼容性", "语言设计"],
  },
];
