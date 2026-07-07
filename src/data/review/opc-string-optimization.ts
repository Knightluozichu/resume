import type { ReviewQuestion } from "./types";

/** C++ 性能优化指南 · 字符串优化复习题 */
export const opcStringOptimizationQuestions: ReviewQuestion[] = [
  {
    id: "opc-string-optimization-1",
    chapter: "opc-string-optimization",
    level: 1,
    question: "`std::string` 的性能瓶颈主要在哪里？为什么？",
    answer:
      "`std::string` 的性能瓶颈主要在堆分配（malloc/free）。\n\n每次构造、拷贝、扩容都可能触发堆分配：\n1. 构造：`std::string s(\"hello\")` 可能分配堆内存存字符。\n2. 拷贝：按值传参、按值返回都会深拷贝，触发新的分配。\n3. 扩容：`+=` 拼接时如果容量不够，会重新分配更大的内存并拷贝旧数据。\n\n堆分配是系统调用级别的昂贵操作（数百纳秒），远比栈操作（一条指令）慢。因此减少不必要的堆分配是字符串优化的核心。",
    tags: ["string", "堆分配", "瓶颈"],
  },
  {
    id: "opc-string-optimization-2",
    chapter: "opc-string-optimization",
    level: 2,
    question: "`std::string_view` 相比 `const std::string&` 有什么性能优势？它有什么使用陷阱？",
    answer:
      "性能优势：\n`string_view` 是一个非拥有引用（指针+长度），不分配内存。它可以从 `const char*`、`std::string` 等构造而不触发拷贝，比 `const string&` 更灵活——后者要求调用方先有一个 `std::string` 对象，裸字符串字面量会隐式构造临时 `string` 触发分配。\n\n使用陷阱：\n1. 悬空引用：`string_view` 不拥有数据，如果被引用的 `string` 被销毁或缩容，`string_view` 变成悬空引用。\n2. 非零终止：`string_view` 不保证以 `\\0` 结尾，传给需要 C 字符串的 API（如 `printf(\"%s\")`）会越界。需先拷贝到 `std::string` 或手动加终止符。\n3. 成员函数陷阱：`string_view::data()` 返回的指针不一定是零终止的。",
    tags: ["string_view", "引用", "悬空引用"],
  },
  {
    id: "opc-string-optimization-3",
    chapter: "opc-string-optimization",
    level: 3,
    question: "以下代码在循环中拼接字符串，有什么性能问题？如何优化？\n\n```\nstd::string result;\nfor (auto& item : items) {\n    result += item.name + \":\" + item.value + \",\";\n}\n```",
    answer:
      "性能问题：\n1. 无 reserve：每次 `+=` 可能触发扩容（重新分配 + 拷贝旧数据），N 次拼接最多 O(N) 次分配。\n2. 临时对象：`item.name + \":\"` 先构造一个临时 `string`，再 `+ item.value` 又一个临时，再 `+=` 到 result。每个 `+` 都触发分配。\n\n优化方案：\n```\nstd::string result;\nresult.reserve(estimated_size);  // 预分配\nfor (auto& item : items) {\n    result += item.name;\n    result += \":\";\n    result += item.value;\n    result += \",\";\n}\n```\n\n1. `reserve` 一次分配到位，避免反复扩容。\n2. 拆成多个 `+=` 避免 `+` 产生的临时对象。每个 `+=` 在容量足够时不触发分配。\n\n如果 `items` 数量已知，`estimated_size` 可估算为 `items.size() * avg_item_length`。",
    tags: ["reserve", "拼接", "临时对象", "应用"],
  },
  {
    id: "opc-string-optimization-4",
    chapter: "opc-string-optimization",
    level: 4,
    question: "综合分析：一个日志库的热点函数是 `std::string format(const char* fmt, ...)`，每次调用都返回新 string。请设计优化方案。",
    answer:
      "从减少分配的角度逐层优化：\n\n1. 减少返回值拷贝——确保 move/RVO 生效：\n现代编译器对返回 `std::string` 会做 RVO 或 move，确保函数内直接 `return result;` 而非 `return std::move(result);`（后者反而禁止 RVO）。\n\n2. 避免内部临时分配——预分配 + snprintf：\n```\nstd::string format(const char* fmt, ...) {\n    va_list args;\n    va_start(args, fmt);\n    int len = vsnprintf(nullptr, 0, fmt, args);\n    va_end(args);\n    std::string result(len, '\\0');\n    va_start(args, fmt);\n    vsnprintf(&result[0], len + 1, fmt, args);\n    va_end(args);\n    return result;  // RVO\n}\n```\n一次分配到位，无临时对象。\n\n3. 调用方零拷贝——接受预分配缓冲：\n提供 `void format_to(std::string& buf, const char* fmt, ...)` 重载，调用方复用同一个 `string` 缓冲区，避免每次分配。\n\n4. 高频路径——用 `string_view` 返回静态格式化结果：\n对于固定格式的日志（如时间戳），预格式化到静态缓冲，返回 `string_view` 零分配。\n\n5. 终极方案——侵入式格式化：\n日志库直接写入文件流（`fprintf`/`fwrite`），跳过 `std::string` 完全不分配。\n\n核心原则：能不分配就不分配，必须分配就一次到位，高频路径用预分配缓冲复用。",
    tags: ["综合", "format", "RVO", "预分配"],
  },
];
