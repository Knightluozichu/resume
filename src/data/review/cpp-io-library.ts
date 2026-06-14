/** 复习题库 · C++ IO 库（cpp-io-library）。C++ Primer §8 改编章节。 */

import type { ReviewQuestion } from "./types";

export const cppIoLibraryQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "cio-1",
    chapter: "cpp-io-library",
    level: 1,
    question: "C++ 标准库提供了哪三大类 IO 流？各自操作什么？",
    answer:
      "① iostream——控制台 IO：`cin`（标准输入，从键盘读）、`cout`（标准输出，向屏幕写）、`cerr`（标准错误，不缓冲）、`clog`（标准日志，缓冲）。② fstream——文件 IO：`ifstream`（读文件）、`ofstream`（写文件）、`fstream`（读写文件）。③ sstream——字符串 IO：`istringstream`（从 string 读）、`ostringstream`（写入 string）、`stringstream`（读写 string）。这三族都从 ios_base 根类派生而来，共享统一的流操作接口。",
    tags: ["iostream", "fstream", "sstream", "流分类"],
  },
  {
    id: "cio-2",
    chapter: "cpp-io-library",
    level: 1,
    question: "C++ iostream 继承树的根是谁？ios_base、ios、istream、ostream 之间是什么关系？",
    answer:
      "`ios_base` 是根——管理格式状态（精度、宽度、进制等）和流状态（good/eof/fail/bad），但不管理缓冲区。`ios` 继承 ios_base 并增加对 streambuf 的管理（字符缓冲区）。`istream` 和 `ostream` 都继承 ios（各自增加输入/输出操作接口）。`iostream` 通过多重继承同时拥有 istream 和 ostream 的能力。fstream 和 sstream 族分别从 istream/ostream 派生——所以所有流类都共享同一套状态检测和格式化接口。",
    tags: ["继承树", "ios_base", "ios", "istream", "ostream"],
  },
  {
    id: "cio-3",
    chapter: "cpp-io-library",
    level: 1,
    question: "fstream 有哪几个文件打开模式？`app` 和 `ate` 有什么区别？",
    answer:
      "共 6 种模式：`in`（读）、`out`（写，默认截断）、`app`（追加写，每次写前 seek 到文件末尾——防止多进程覆盖）、`ate`（打开时 seek 到末尾，但之后可以回退到任意位置写）、`trunc`（截断文件——打开时把内容清空，out 模式默认隐含 trunc）、`binary`（二进制模式——不转换换行符 `\\n`→`\\r\\n`，Windows 上尤其重要）。`app` 和 `ate` 的关键区别：app 的「末尾 seek」发生在每次写之前且不可撤销——无论你在哪 seek、真正的写总发生在文件末尾；ate 只在打开时 seek 一次到末尾，之后可以自由 seek 到任何位置写。",
    tags: ["fstream", "打开模式", "app", "ate", "trunc", "binary"],
  },
  {
    id: "cio-4",
    chapter: "cpp-io-library",
    level: 1,
    question: "C++ 流的四种状态标志（iostate）是什么？分别表示什么含义？",
    answer:
      "① `goodbit`——值为 0，表示流一切正常、没有错误位被设置。② `eofbit`——读到文件末尾时设置，表示「没更多数据可读了」。③ `failbit`——IO 操作失败但流可恢复时设置——如试图把 `string` 读进 `int`（格式错）、或者读完 eof 之后再读一次也会同时置 eofbit+failbit。④ `badbit`——流崩溃、不可恢复的错误时设置——如底层系统级读写错误、缓冲区损坏。这四个值的枚举在 `ios::iostate` 里定义，通过 `rdstate()` 获取当前掩码。",
    tags: ["iostate", "goodbit", "eofbit", "failbit", "badbit"],
  },
  {
    id: "cio-5",
    chapter: "cpp-io-library",
    level: 1,
    question: "假设一个 ifstream 读到文件末尾后，`file.eof()` 返回 `true`。这个 file 还能继续用吗？如果还想重新读一遍文件，要做什么？",
    answer:
      "流设置了 eofbit 或 failbit 之后，后续任何 IO 操作都会失败（流处于不可用状态）。要继续使用同一个流对象重新读取文件，必须做两步：① `file.clear()`——重置所有状态位；② `file.seekg(0, ios::beg)`——把读取位置指针移回文件开头（seekg 是「seek get」，移动输入位置）。两步做完后流恢复正常，可以从头重新读。如果不先 clear，即使 seekg 调了，后续的 >> 操作也会因为流处于错误状态而直接失败。",
    tags: ["eof", "clear", "seekg", "状态恢复"],
  },
  {
    id: "cio-6",
    chapter: "cpp-io-library",
    level: 1,
    question: "stringstream 有什么用？和直接操作 string 有什么区别？",
    answer:
      "`stringstream` 让字符串拥有和 cin/cout 完全一样的「流」操作接口。典型用途：① 把已格式化的字符串「输入流化」——`istringstream iss(\"123 456\"); iss >> a >> b;` 从字符串里提取数字；② 把多种类型的数据组合成格式字符串——`ostringstream oss; oss << \"price: \" << setprecision(2) << fixed << price; string s = oss.str();` 像输出到 cout 一样输出到 string。和直接操作 string 的区别：sstream 有格式化能力（setw/setprecision/hex 等操纵符全支持），而直接用 string 拼接需要自己写转换代码。",
    tags: ["stringstream", "istringstream", "ostringstream"],
  },
  {
    id: "cio-7",
    chapter: "cpp-io-library",
    level: 1,
    question: "`getline(file, line)` 和 `file >> word` 的区别是什么？各自什么时候用？",
    answer:
      "`file >> word`——按空白字符（空格、tab、换行）分隔，一次读一个「词」——遇到空白跳过、读到下一个空白停止。`getline(file, line)`——按换行符 '\\n' 分隔，一次读一整行（包括空格和 tab），读到 '\\n' 停止（换行符被消费但不存入 line）。什么时候用：需要逐词处理用 >>——如读数字、读单独的关键字。需要保留原始行格式（含空格）用 getline——如读一整行文本、读 CSV 行再进一步解析。两者也可混用——但注意 >> 会留下残留换行符被下一个 getline 吞掉。",
    tags: ["getline", ">> 运算符", "空白分隔", "行读入"],
  },
  {
    id: "cio-8",
    chapter: "cpp-io-library",
    level: 1,
    question: "C++ 格式化输出常用哪些操纵符？setw 有什么特殊的行为？",
    answer:
      "常用操纵符（需 `#include <iomanip>`）：`setw(n)` 设字段宽度、`setprecision(n)` 设浮点精度、`fixed` 固定小数格式、`scientific` 科学记数、`left`/`right` 左右对齐、`hex`/`oct`/`dec` 切换进制、`boolalpha` 输出 true/false、`showbase` 显示进制前缀。setw 的特殊行为：只对**紧接着的下一次输出**生效，用完自动重置为 0——不像 fixed/hex/left 等是一旦设置就全局持久生效的。如果循环里每个元素都需要统一的宽度，每次输出前都要重复设 setw。",
    tags: ["操纵符", "setw", "setprecision", "fixed", "hex", "iomanip"],
  },
  {
    id: "cio-9",
    chapter: "cpp-io-library",
    level: 1,
    question: "什么时候用 `ifstream`、什么时候用 `ofstream`、什么时候用 `fstream`？各自适合什么场景？",
    answer:
      "`ifstream`——只读取文件，适合只需要输入的场景。`ofstream`——只写入文件，适合只需要输出的场景。`fstream`——既读又写同一个文件，适合需要读写交替的场景（如数据库文件的随机读写）。选择原则：如果只需要一种方向就用专用的 ifstream/ofstream——代码意图清晰、编译器能帮你检查误用（如不小心对 ifstream 用 <<）。只有确实需要在同一个流对象上交替读写才用 fstream——并注意及时 seek 和刷新缓冲区。",
    tags: ["ifstream", "ofstream", "fstream", "选择"],
  },
  {
    id: "cio-10",
    chapter: "cpp-io-library",
    level: 1,
    question: "ifstream 在构造时如果文件不存在会发生什么？如何检查文件是否成功打开了？",
    answer:
      "构造时文件不存在不会抛异常——默认行为是流进入 fail 状态（failbit 被设置）。检查方法：① 直接判断流对象——`if (!file)` 或 `if (!file.is_open())`；② 检查 good 状态——`if (!file.good())`。最简洁的惯用法是在构造后立即判断：`ifstream file(\"data.txt\"); if (!file) { cerr << \"无法打开文件\"; }`。C++11 起 ifstream 还支持 `file.fail()` 和上面提到的 is_open()。ifstream 的布尔转换运算符 `operator bool()` 等价于 `!fail()`——所以 `while (file >> word)` 在读失败（EOF 或出错）后自动停止。",
    tags: ["ifstream", "文件不存在", "fail", "is_open"],
  },

  // ── L2 理解：为什么 / 机制 ──
  {
    id: "cio-11",
    chapter: "cpp-io-library",
    level: 2,
    question: "为什么 C++ 设计了统一的流体系（iostream/fstream/sstream）？这种设计的好处是什么？",
    answer:
      "统一体系的核心思想是「对不同的目标/源使用相同的接口」。好处：① 代码复用——同一个处理函数既能处理控制台输入、也能处理文件输入、还能处理字符串输入；只需把函数形参声明为 `istream &` 而非 `ifstream &`——这样任何继承 istream 的流都能传进来。② 格式化能力统一——setw/setprecision/hex 等操纵符在任何流上行为一致。③ 学习成本降低——学会了 >> 和 getline，无论在哪个流上用法都一样。④ 测试方便——可以用 stringstream 代替真实文件输入来写单元测试，不需要创建临时文件。",
    tags: ["流体系", "多态", "代码复用", "统一接口"],
  },
  {
    id: "cio-12",
    chapter: "cpp-io-library",
    level: 2,
    question: "ifstream 打开文件后，数据是直接从硬盘读的吗？什么是「缓冲区」？为什么要有缓冲区？",
    answer:
      "不是逐字节从硬盘读的——流内部有一块「缓冲区」（由 streambuf 管理）。流程：① ifstream 打开文件时在内存分配一块缓冲区（通常是 4096 字节）；② 第一次 `>>` 时从硬盘一次读满整块缓冲区；③ 之后每次 >> 从缓冲区取数据——比从硬盘读快几百倍；④ 缓冲区读空后再从硬盘批量补充。同理，ofstream 写数据时先往输出缓冲区写，攒够一整块或遇到 flush/endl 时才真写硬盘。缓冲区存在的唯一原因：硬盘 IO 太慢了——批量读写的吞吐量远高于逐字节读写。",
    tags: ["缓冲区", "streambuf", "批量IO", "性能"],
  },
  {
    id: "cio-13",
    chapter: "cpp-io-library",
    level: 2,
    question: "`failbit` 和 `badbit` 有什么区别？为什么有分两个 flag 而不是一个？各自的典型触发场景是什么？",
    answer:
      "`failbit`——可恢复的错误：格式错（读 int 遇到 \"abc\"）、已经 EOF 后再读、打开的文件不存在等。这类错误后你可以 `clear()` 重置状态继续用同一个流。`badbit`——不可恢复的错误：底层系统级 IO 错误（磁盘物理损坏）、流内部数据损坏、对没有关联 streambuf 的流进行操作等。badbit 被设置后这个流基本废了——即使 clear() 也未必恢复。分开两个 flag 的意义：failbit 是「这次操作没成功，你可以检查/重试」——badbit 是「流坏了，别用了」。你写的代码可以用 `if (file.good())` 快速检查（good = fail/eof/bad 都未设置）。",
    tags: ["failbit", "badbit", "可恢复", "不可恢复"],
  },
  {
    id: "cio-14",
    chapter: "cpp-io-library",
    level: 2,
    question: "为什么 `while (file >> value)` 能在读到文件末尾时自动停止？ifstream 是怎么知道「读完了」的？",
    answer:
      "每次 `>>` 操作返回的是流对象自身的引用（即 ifstream&）。ifstream 继承自 ios 有一个 `operator bool()`（或 `operator void*()`），它实际上返回 `!fail()`——只要流没有 fail 或 bad（包括 eof），这个布尔值就是 true。当读到文件末尾：① 第一次尝试读时 eofbit 被设置——但此时 `>>` 可能已成功读入最后的数据；② 下一次再调用 `>>` 时——没有数据可读了、操作失败——同时设置 eofbit 和 failbit；③ 返回的流对象通过 operator bool() 检查发现 fail()==true——循环停止。这就是「最后一次成功读 + 下一次发现 fail 就停止」的两拍模式。",
    tags: ["while循环", "operator bool", "fail", "EOF"],
  },
  {
    id: "cio-15",
    chapter: "cpp-io-library",
    level: 2,
    question: "把 ifstream 对象作为参数传给函数时，为什么不能按值传递？应该怎么传？",
    answer:
      "IO 对象**不允许拷贝**——ifstream/ofstream/stringstream 的拷贝构造函数被删除了（= delete）。原因：流对象内部管理着操作系统资源（文件句柄）和缓冲区——拷贝会导致两个对象同时拥有同一个文件句柄/缓冲区，析构时重复释放、数据崩溃。正确做法：① 按**引用**传递——`void readData(ifstream &file)`；② 如果函数不需要修改流的读取状态，用**非常量引用**——因为读操作本身会改变流的状态（移动读取位置），所以即使是「只读」的函数形参也必须是 `istream&`（不是 `const istream&`）——const 引用不能调用 >> 等修改流状态的方法。",
    tags: ["不可拷贝", "引用传递", "文件句柄", "流对象"],
  },

  // ── L3 应用：读代码 / 排错 ──
  {
    id: "cio-16",
    chapter: "cpp-io-library",
    level: 3,
    question:
      "这段代码试图从文件逐行读取并打印，但实际输出里第一行是空的——找出 bug 并解释：\n  `ifstream file(\"data.txt\");`\n  `string line;`\n  `int n; file >> n;`\n  `while (getline(file, line)) cout << line << endl;`",
    answer:
      "Bug：`file >> n` 读取完整数后，输入位置停在整数后面的空白处——`\\n` 还在缓冲区里。紧接着的 `getline` 第一个读到就是那个残留的换行符——得到空字符串。修正：在 `>>` 之后再调用一次 `file.ignore()` 跳过当前行剩余的空白，或者加一个 `file.get()` 吞掉换行符后再进入 getline 循环。更安全的方式是都统一用 getline 读行，然后对行内容做 `istringstream` 解析——这样避免了混用 >> 和 getline 的坑。",
    tags: [">> 与 getline", "残留换行符", "排错"],
  },
  {
    id: "cio-17",
    chapter: "cpp-io-library",
    level: 3,
    question:
      "下面代码编译通过但输出是乱码——找出原因：\n  `ofstream file(\"out.bin\", ios::binary);`\n  `int values[] = {1, 2, 3};`\n  `file << values[0] << values[1] << values[2];`",
    answer:
      "原因：虽然文件以 `ios::binary` 模式打开，但 `<<` 操作符做的是**文本输出**——把整数 1、2、3 转成字符 '1'、'2'、'3' 写入文件。io::binary 只影响换行符转换（`\\n` 不转 `\\r\\n`），不影响 `<<` 的行为——<< 永远是「把数据转成人类可读的文本再写」。「二进制写」指的是用 `write()` 方法——`file.write(reinterpret_cast<const char*>(values), sizeof(values))` 才会把内存中的原始字节直接写进文件。修正：如果目的是二进制写，用 write() 而不是 <<。",
    tags: ["二进制写", "write", "<< 运算符", "排错"],
  },
  {
    id: "cio-18",
    chapter: "cpp-io-library",
    level: 3,
    question:
      "这段代码试图把 vector 的元素写到文件后重新读回——运行崩溃——找出 bug：\n  `vector<int> data = {1, 2, 3};`\n  `ofstream out(\"temp\"); for (int x : data) out.write((char*)&x, sizeof(int));`\n  `ifstream in(\"temp\"); int val; while (in.read((char*)&val, sizeof(int))) data2.push_back(val);`",
    answer:
      "Bug：`ofstream out(\"temp\")` 以**文本模式**（默认）打开，不是二进制模式。在 Windows 上文本模式会把 `\\n` 字符（值为 10）自动转成 `\\r\\n`（值 13 10）——如果 int 的某个字节恰好是 10，就会被篡改。修正：用 `ofstream out(\"temp\", ios::binary)` 和 `ifstream in(\"temp\", ios::binary)`——跨平台一致。读回的 while 也会因为字节被篡改导致 read 读到的数据长度不对而提前停止或无限循环。二进制读写文件永远用 binary 模式。",
    tags: ["二进制模式", "文本模式", "CRLF", "排错"],
  },
  {
    id: "cio-19",
    chapter: "cpp-io-library",
    level: 3,
    question:
      "一个函数从文件里读所有整数存入 vector 并返回。调用方发现返回的是空 vector——猜测三种可能的原因。",
    answer:
      "三种常见原因：① 文件路径错误或文件不存在——ifstream 构造失败（failbit 置位），后续所有 >> 操作都直接失败，循环没执行——应在构造后加 `if (!file)` 检查。② 文件已经读完（eof），需要在每次重新读前调用 `file.clear()` + `file.seekg(0)` 重置流——没有 reset，循环条件一开始就是 false。③ 第一个读操作就遇到非整数字符（如文件第一行是标题 \"Scores:\"）——failbit 置位、循环不执行——需要在读之前跳过非数据行，或在读到错误类型时检查 `file.fail()` 并清理格式错误。",
    tags: ["排错", "文件路径", "状态重置", "格式匹配"],
  },
  {
    id: "cio-20",
    chapter: "cpp-io-library",
    level: 3,
    question:
      "用 stringstream 把 `\"Bob 85 90\"` 解析成一个 string 和两个 int——写出完整代码。如果输入数据量未知怎么办？",
    answer:
      "```cpp\n#include <string>\n#include <sstream>\n#include <iostream>\nint main() {\n    std::string input = \"Bob 85 90\";\n    std::istringstream iss(input);\n    std::string name;\n    int score1, score2;\n    iss >> name >> score1 >> score2;\n    std::cout << name << \": \" << (score1 + score2) / 2.0 << std::endl;\n    return 0;\n}\n```\n如果数据量未知——while (iss >> val) 循环读到 fail：\n```cpp\nstd::string name;\niss >> name;  // 只读名字\nstd::vector<int> scores;\nint s;\nwhile (iss >> s) scores.push_back(s);\n```",
    tags: ["stringstream", "解析", "应用"],
  },

  // ── L4 综合：陷阱 / 全流程 ──
  {
    id: "cio-21",
    chapter: "cpp-io-library",
    level: 4,
    question:
      "综合题：设计并实现一个程序——读取一个文本文件，统计每个单词出现的次数，最后按词频降序输出到另一个文件。要求：(1) 用 ifstream 读，ofstream 写 (2) 用 stringstream 辅助 (3) 处理文件打开失败 (4) 输出用 setw 对齐。给出完整实现。",
    answer:
      "```cpp\n#include <iostream>\n#include <fstream>\n#include <sstream>\n#include <string>\n#include <map>\n#include <vector>\n#include <algorithm>\n#include <iomanip>\nint main() {\n    std::ifstream in(\"input.txt\");\n    if (!in) { std::cerr << \"无法打开 input.txt\"; return 1; }\n    std::map<std::string, int> freq;\n    std::string line;\n    while (std::getline(in, line)) {\n        std::istringstream iss(line);\n        std::string word;\n        while (iss >> word) freq[word]++;  // 读到空白分隔的每个词\n    }\n    in.close();\n    // 按频次降序排列\n    std::vector<std::pair<std::string, int>> sorted(freq.begin(), freq.end());\n    std::sort(sorted.begin(), sorted.end(),\n              [](auto &a, auto &b) { return a.second > b.second; });\n    std::ofstream out(\"output.txt\");\n    if (!out) { std::cerr << \"无法创建 output.txt\"; return 1; }\n    for (auto &[w, c] : sorted) {\n        out << std::left << std::setw(20) << w << std::right << std::setw(6) << c << '\\n';\n    }\n    std::cout << \"完成！共 \" << sorted.size() << \" 个不同单词。\\n\";\n    return 0;\n}\n```\n要点：① stringstream 在从行中逐词提取时替代了直接正则处理——利用 >> 的空白分隔能力 ② setw 对齐输出使结果表格化 ③ 打开文件后立即用 `if (!in)` 检查，失败则提前返回。",
    tags: ["综合", "ifstream", "ofstream", "sstream", "setw"],
  },
  {
    id: "cio-22",
    chapter: "cpp-io-library",
    level: 4,
    question:
      "综合题：从文件读取一系列 `姓名 分数` 的纪录（每行一条，形如 `Alice 92`）。计算总人数和平均分。要求：(1) 一行读入后使用 istringstream 解析 (2) 处理格式错误行（缺少分数的行）——不能因为一行坏就让整个程序崩溃 (3) 输出用 fixed + setprecision(2) 格式化平均分。给出完整实现。",
    answer:
      "```cpp\n#include <iostream>\n#include <fstream>\n#include <sstream>\n#include <string>\n#include <iomanip>\nint main() {\n    std::ifstream file(\"scores.txt\");\n    if (!file) { std::cerr << \"文件打开失败\"; return 1; }\n    std::string line;\n    int count = 0, total = 0, lineNum = 0;\n    while (std::getline(file, line)) {\n        lineNum++;\n        std::istringstream iss(line);\n        std::string name;\n        int score;\n        if (!(iss >> name >> score)) {  // 解析失败\n            std::cerr << \"第 \" << lineNum << \" 行格式错误，跳过：\" << line << '\\n';\n            continue;\n        }\n        count++;\n        total += score;\n    }\n    if (count == 0) {\n        std::cout << \"没有有效纪录\\n\";\n    } else {\n        std::cout << std::fixed << std::setprecision(2)\n                  << \"总人数: \" << count << \"\\n\"\n                  << \"平均分: \" << static_cast<double>(total) / count << '\\n';\n    }\n    return 0;\n}\n```\n要点：① getline 读整行→sstream 解析 ② sstream的bool转换`if (!(iss >> ...))` 检测解析失败 ③ 格式错误行不崩溃——打印警告并 continue ④ 防除以零：count==0 时特殊处理。",
    tags: ["综合", "格式处理", "sstream", "fixed", "setprecision"],
  },
  {
    id: "cio-23",
    chapter: "cpp-io-library",
    level: 4,
    question:
      "综合题：解释为什么下面这段代码在反复读同一个文件时会只正确读第一遍——第二遍开始所有值都是默认值。给出正确的写法。\n  `ifstream file(\"nums.txt\");`\n  `for (int i = 0; i < 3; i++) {`\n  `    int val; while (file >> val) cout << val << ' ';`\n  `    cout << endl;`\n  `}`",
    answer:
      "原因：第一遍读完后文件位置指针到达末尾——eofbit 被设置，同时后续任何 >> 都因为流处于非 good 状态直接返回 false。第二遍循环 `while (file >> val)` 条件为 false——循环体一次都不执行。修正——每次循环后重置流：\n```cpp\nifstream file(\"nums.txt\");\nfor (int i = 0; i < 3; i++) {\n    int val;\n    while (file >> val) cout << val << ' ';\n    cout << endl;\n    file.clear();           // ① 清除 eofbit/failbit\n    file.seekg(0, ios::beg); // ② 把读取位置移回文件开头\n}\n```\n两步缺一不可——光 seekg 不回退（因为流还没从错误状态恢复，seekg 对处于 fail 状态的流是无效操作、什么都不做，位置指针不会被移动）；光 clear 不 seekg 则虽然流状态正常了但位置指针仍在末尾——再读即刻 EOF，while 仍然不执行。",
    tags: ["综合", "重复读", "clear", "seekg", "状态管理"],
  },
  {
    id: "cio-24",
    chapter: "cpp-io-library",
    level: 4,
    question:
      "综合题：数字 123.45678 分别用 defaultfloat、fixed、scientific 格式、且 precision=4 输出时结果分别是什么？C++ 的 setprecision 在 default 和 fixed 模式下含义有什么不同？",
    answer:
      "`precision=4` 时三种格式的输出结果：① `defaultfloat`：`123.5`——precision 控制的是**总有效位数**（4 位），四舍五入后 123.5。② `fixed + setprecision(4)`：`123.4568`——precision 控制的是**小数点后的位数**（4 位），整数部分不变。③ `scientific + setprecision(4)`：`1.2346e+02`——precision 控制的是**尾数的位数**（即小数点后的位数 4 位），指数部分按规范输出。核心区别：defaultfloat 的 precision 是「数字总位数」；fixed/scientific 的 precision 是「小数点后几位」。这是极容易搞混的地方——需要小数点后固定位数时一定加 `fixed`。",
    tags: ["综合", "setprecision", "fixed", "scientific", "defaultfloat"],
  },
  {
    id: "cio-25",
    chapter: "cpp-io-library",
    level: 4,
    question:
      "综合题：设计并实现一个日志记录器（Logger）——把程序运行中的日志消息写进文件。要求：(1) 每条日志带时间戳（不需要真实时间，用序号即可）(2) 使用 ofstream + app 模式（每次写追加到末尾）(3) 提供 `log(const string &msg)` 方法输出 `[#N] message` 格式 (4) 自动管理文件——程序结束时析构函数自动关闭。给出 Logger 类的完整实现。",
    answer:
      "```cpp\n#include <fstream>\n#include <string>\nclass Logger {\n    std::ofstream file;\n    int seq = 0;\npublic:\n    explicit Logger(const std::string &filename)\n        : file(filename, std::ios::app) {  // app 模式追加\n        if (!file)\n            throw std::runtime_error(\"无法打开日志文件: \" + filename);\n    }\n    void log(const std::string &msg) {\n        file << \"[#\" << (++seq) << \"] \" << msg << std::endl;\n    }\n    // 析构函数自动关闭文件——不需要手动 close()\n};\n// 使用：\nint main() {\n    try {\n        Logger logger(\"app.log\");\n        logger.log(\"程序启动\");\n        logger.log(\"处理数据完成\");\n        // logger 离开作用域时析构，文件自动关闭\n    } catch (const std::exception &e) {\n        std::cerr << e.what();\n        return 1;\n    }\n    return 0;\n}\n```\n要点：① ios::app 让每次写之前都 seek 到当前文件末尾，避免单线程下意外覆盖已有内容——但多线程并发写仍需调用方自己加锁同步，流本身不保证并发安全 ② 构造时检查 `!file`——失败抛异常 ③ 析构函数自动 flush + close——不需要手动 close ④ 如果程序多次运行，日志会持续追加到同一文件——每次运行前可加一个分隔行 log(\"─── 新会话 ───\")。",
    tags: ["综合", "ofstream", "app", "RAII", "Logger"],
  },
];

export default cppIoLibraryQuestions;
