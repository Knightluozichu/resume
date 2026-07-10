import type { ReviewQuestion } from "./types";

/** Easy C++（第5版）· STL 入门复习题 */
export const ecpStlQuestions: ReviewQuestion[] = [
  {
    id: "ecp-stl-1",
    chapter: "ecp-stl",
    level: 1,
    question: `STL 是什么？它主要包含哪三大组件？各举一个例子。`,
    answer:
      `STL（Standard Template Library，标准模板库）是 C++ 标准库的核心部分，提供通用的数据结构、算法和迭代器，都用模板实现，「拿来即用」。\n\n三大组件：\n\n1. 容器：管理数据集合的模板类。\n   - \`vector<int> v;\` 动态数组，可尾部追加元素。\n   - \`string s;\` 字符串容器。\n   - \`map<string,int> m;\` 键值对映射。\n\n2. 算法：操作容器的通用函数模板。\n   - \`sort(v.begin(), v.end());\` 排序。\n   - \`find(v.begin(), v.end(), 5);\` 查找。\n   - \`count(v.begin(), v.end(), 3);\` 计数。\n\n3. 迭代器：连接容器和算法的「通用指针」。\n   - \`v.begin()\` 指向首元素。\n   - \`v.end()\` 指向尾后位置。\n   - 算法通过迭代器访问容器元素，不依赖容器具体类型。`,
    tags: ["STL", "容器", "算法", "迭代器"],
  },
  {
    id: "ecp-stl-2",
    chapter: "ecp-stl",
    level: 2,
    question: `\`vector\` 和普通数组有什么区别？为什么优先用 \`vector\`？`,
    answer:
      `普通数组：\n- 大小在声明时固定，不能动态改变：\`int arr[10];\`\n- 不知道自己的长度，需单独维护 size 变量。\n- 不能直接赋值、比较，传给函数会退化为指针。\n- 越界访问不检查，容易出 bug。\n\n\`vector\`：\n- 大小动态变化：\`push_back()\` 自动扩容。\n- 自带 \`size()\` 方法，随时知道长度。\n- 支持赋值 \`v2 = v1\`、比较 \`v1 == v2\`。\n- \`at()\` 方法做越界检查（抛异常），\`[]\` 不检查但方便。\n- 和 STL 算法无缝配合（\`sort\`、\`find\` 等）。\n\n优先用 \`vector\` 的原因：\n1. 安全：动态扩容不会越界，\`size()\` 避免手动管理长度。\n2. 方便：不用手动 new/delete 内存，析构自动释放。\n3. 通用：STL 算法直接可用，排序查找一行代码。\n4. 性能可控：内存连续，缓存友好；预知大小可 \`reserve()\` 预分配。\n\n只有需要固定大小且追求极致零开销时才用普通数组。`,
    tags: ["vector", "数组", "对比"],
  },
  {
    id: "ecp-stl-3",
    chapter: "ecp-stl",
    level: 3,
    question: `写一段代码：创建一个 \`vector<int>\`，存入 5 个数，用 \`sort\` 排序，用 \`find\` 查找某个值，用 \`for\` 循环遍历输出。`,
    answer:
      `\`\`\`cpp\n#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    vector<int> v;\n    v.push_back(3);\n    v.push_back(1);\n    v.push_back(4);\n    v.push_back(1);\n    v.push_back(5);\n\n    // 排序（升序）\n    sort(v.begin(), v.end());\n    // v = {1, 1, 3, 4, 5}\n\n    // 查找值 3\n    auto it = find(v.begin(), v.end(), 3);\n    if (it != v.end()) {\n        cout << \"找到了 3，位置:\" << (it - v.begin()) << endl;\n    }\n\n    // 遍历输出\n    for (int x : v) {\n        cout << x << \" \";\n    }\n    cout << endl;\n    // 输出：1 1 3 4 5\n    return 0;\n}\n\`\`\`\n\n要点：\n1. \`push_back()\` 尾部追加元素，\`vector\` 自动扩容。\n2. \`sort(v.begin(), v.end())\` 传迭代器范围，对区间内元素排序。\n3. \`find()\` 返回迭代器，找不到等于 \`v.end()\`。\n4. \`it - v.begin()\` 算出找到位置的下标。\n5. 范围 for 循环 \`for (int x : v)\` 遍历容器，简洁安全。`,
    tags: ["sort", "find", "遍历", "应用"],
  },
  {
    id: "ecp-stl-4",
    chapter: "ecp-stl",
    level: 4,
    question: `综合分析：STL 的「容器 + 算法 + 迭代器」三层架构设计有什么好处？为什么算法不直接写成容器的成员函数？`,
    answer:
      `三层架构的好处：\n\n1. 解耦：容器只管「存数据」，算法只管「处理数据」，迭代器是两者之间的桥梁。三者独立演进，互不依赖。\n2. 复用最大化：一套算法（如 \`sort\`）通过迭代器可用于所有容器（\`vector\`、\`deque\`、\`list\` 的随机访问迭代器），不用为每个容器重写。容器也不用内置全部算法，接口精简。\n3. 可扩展：自定义容器只要提供迭代器，就能用所有 STL 算法；自定义算法只要接受迭代器范围，就能用于所有容器。\n4. 性能：迭代器分类（随机访问、双向、前向）让算法根据迭代器能力选择最优实现，编译期分派，零运行时开销。\n\n算法不写成成员函数的原因：\n1. 避免容器接口膨胀：如果把 \`sort\`、\`find\`、\`count\`、\`copy\` 等几十个算法都做成成员函数，每个容器类会极其臃肿。\n2. 统一接口：算法以「迭代器范围」为参数，与容器类型无关。\`sort(v.begin(), v.end())\` 和 \`sort(a, a+n)\`（普通数组）写法一致，学习成本低。\n3. 泛型性：算法可以操作任何满足迭代器要求的序列，不只 STL 容器。普通数组、自定义链表、流迭代器都能用。\n4. 编译期多态：通过迭代器类型（random_access_iterator_tag 等）在编译期选择最优算法路径，比运行时虚函数分派高效。\n\n例外：少数算法确实做成成员函数（如 \`list::sort\`、\`map::find\`），因为它们依赖容器内部结构才能高效实现（链表 sort 不能随机访问，需成员函数利用链表指针重排）。\n\n综合：STL 三层架构是泛型设计的经典范例，用迭代器解耦容器与算法，以最小的接口覆盖最大的功能空间，兼顾复用性、扩展性和性能。`,
    tags: ["STL架构", "迭代器", "解耦", "泛型", "综合"],
  },
];
