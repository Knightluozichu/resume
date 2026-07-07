import type { ReviewQuestion } from "./types";

/** Easy C++（第5版）· 第一个 C++ 程序复习题 */
export const ecpFirstProgramQuestions: ReviewQuestion[] = [
  {
    id: "ecp-first-program-1",
    chapter: "ecp-first-program",
    level: 1,
    question: "写出一个最简单的 C++ 程序，它会在屏幕上输出 `Hello, World!`。说明每行的作用。",
    answer:
      "```cpp\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello, World!\" << endl;\n    return 0;\n}\n```\n\n逐行说明：\n1. `#include <iostream>`：引入输入输出流头文件，让程序能用 `cout` 和 `cin`。\n2. `using namespace std;`：声明使用标准命名空间，这样写 `cout` 就不用加 `std::` 前缀。\n3. `int main() { ... }`：程序入口，操作系统从这里开始执行。返回 `int` 表示退出状态。\n4. `cout << \"Hello, World!\" << endl;`：用输出流 `cout` 把字符串打印到屏幕，`endl` 换行并刷新缓冲区。\n5. `return 0;`：返回 0 表示程序正常结束。",
    tags: ["Hello World", "程序结构", "cout"],
  },
  {
    id: "ecp-first-program-2",
    chapter: "ecp-first-program",
    level: 2,
    question: "`#include <iostream>` 和 `using namespace std;` 分别做什么？如果不用 `using namespace std;`，`cout` 该怎么写？",
    answer:
      "`#include <iostream>` 是预处理指令，在编译前把标准输入输出流库的头文件内容插入到当前文件，使程序可以使用 `cin`、`cout`、`endl` 等设施。\n\n`using namespace std;` 是命名空间声明，告诉编译器「在本文件中直接用 `std` 命名空间里的名字」，省去每次写 `std::` 前缀。\n\n如果不用 `using namespace std;`，`cout` 必须写成 `std::cout`，`endl` 写成 `std::endl`：\n```cpp\nstd::cout << \"Hello\" << std::endl;\n```\n\n大型项目中推荐不用 `using namespace std;`，避免命名冲突；小型练习中用它可以让代码更简洁。",
    tags: ["include", "命名空间", "std"],
  },
  {
    id: "ecp-first-program-3",
    chapter: "ecp-first-program",
    level: 3,
    question: "动手写一个程序，要求用户输入自己的名字，然后输出「你好，XXX！」。指出用到了哪些 C++ 设施。",
    answer:
      "```cpp\n#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string name;\n    cout << \"请输入你的名字：\";\n    cin >> name;\n    cout << \"你好，\" << name << \"！\" << endl;\n    return 0;\n}\n```\n\n用到的设施：\n1. `#include <iostream>`：`cout`（输出）和 `cin`（输入）。\n2. `#include <string>`：`string` 类型，存储用户输入的名字。\n3. `cout <<`：输出提示和结果，`<<` 是插入运算符。\n4. `cin >>`：从键盘读取输入存入变量，`>>` 是提取运算符。\n5. `main` 函数与 `return 0`：程序入口与正常退出。\n\n注意 `cin >> name` 遇到空格会停止，如果名字含空格需要用 `getline(cin, name)`。",
    tags: ["cin", "string", "输入输出", "应用"],
  },
  {
    id: "ecp-first-program-4",
    chapter: "ecp-first-program",
    level: 4,
    question: "综合分析：C++ 程序从源代码到运行输出，经历了哪些阶段？`#include` 和 `using namespace` 分别在哪个阶段起作用？",
    answer:
      "C++ 程序从源码到运行经历四个阶段：\n\n1. 预处理（Preprocessing）：预处理器处理以 `#` 开头的指令。`#include <iostream>` 在此阶段把 iostream 头文件的内容复制到源文件中，`#define` 宏也会在此展开。输出仍是 C++ 源码。\n2. 编译（Compilation）：编译器把预处理后的源码翻译成汇编代码，做语法检查、类型检查。`using namespace std;` 在此阶段生效——它影响编译器如何解析 `cout` 这样的名字，把它关联到 `std::cout`。\n3. 汇编（Assembly）：汇编器把汇编代码翻译成机器码，生成目标文件（.o / .obj）。\n4. 链接（Linking）：链接器把目标文件与库文件（如 C++ 标准库）连接，解析 `cout` 等符号的实际地址，生成可执行文件。\n\n总结：`#include` 在预处理阶段起作用（文本替换），`using namespace` 在编译阶段起作用（名字解析）。运行时这两者都已消失，程序直接执行机器码。",
    tags: ["编译流程", "预处理", "链接", "综合"],
  },
];
