import type { ReviewQuestion } from "./types";

/** 组合模式章复习题 */
export const dpCompositeQuestions: ReviewQuestion[] = [
  {
    id: "dp-composite-01",
    chapter: "dp-composite",
    level: 1,
    question: "组合模式的意图是什么？",
    answer: "组合模式将对象组合成树形结构以表示「部分-整体」的层次，使得客户端对单个对象和组合对象的使用具有一致性。\n\n核心意图：让调用方无需区分「叶子节点」还是「容器节点」，用统一接口操作整棵树。典型场景：文件系统、UI 控件树、组织架构图——无论当前节点是末端还是容器，调用方式完全相同。",
    tags: ["意图", "基础概念", "树形结构"],
  },
  {
    id: "dp-composite-02",
    chapter: "dp-composite",
    level: 2,
    question: "透明式和安全式组合模式有什么区别？各自适合什么场景？",
    answer: "透明式：在抽象 `Component` 接口中就声明 `add` / `remove` / `getChild` 等容器方法，叶子节点也继承这些方法，但调用时抛异常。\n- 优点：调用方完全统一，不需要类型判断，真正「透明」。\n- 缺点：叶子节点被迫实现无意义的方法，违反 LSP（里氏替换），错误要运行时才暴露。\n\n安全式：`Component` 只声明公共业务方法（如 `operation`），`add` / `remove` 只在 `Composite` 子类中定义。\n- 优点：叶子不会被要求实现容器方法，类型安全，编译期就能挡住错误。\n- 缺点：调用方若要调用 `add`，必须知道自己持有的是 `Composite`，需要类型判断/转换，不够「透明」。\n\n场景：调用方频繁且无差别地递归处理整棵树、不需要新增子节点时，选透明式（如只读展示）；调用方需要频繁增删子节点、对类型安全要求高时，选安全式（如可编辑的树结构）。",
    tags: ["透明式", "安全式", "对比"],
  },
  {
    id: "dp-composite-03",
    chapter: "dp-composite",
    level: 3,
    question: "文件系统场景：文件夹和文件，如何用组合模式设计统一遍历？",
    answer: "1. 定义统一接口 `FileSystemNode`，声明 `getName()`、`getSize()`、`print()`。\n2. 叶子 `File implements FileSystemNode`：`getSize()` 返回自身文件大小；`print()` 输出文件名和大小。\n3. 容器 `Folder implements FileSystemNode`：内部持有 `children: FileSystemNode[]`，提供 `add(node)` / `remove(node)` 管理子节点。\n- `getSize()` 递归累加所有子节点的 size。\n- `print()` 输出文件夹名，再遍历 `children` 递归调用每个子节点的 `print()`。\n4. 遍历：调用方拿到根节点 `root.print()`，无需关心当前是文件还是文件夹，统一调用一个方法即可遍历整棵树。\n\n关键点：`Folder` 的 `children` 既能装 `File` 也能装 `Folder`（因为都是 `FileSystemNode`），天然形成树形递归结构。计算总大小时，叶子返回自身大小、容器递归汇总，调用方完全感知不到差异。",
    tags: ["应用", "文件系统", "递归"],
  },
  {
    id: "dp-composite-04",
    chapter: "dp-composite",
    level: 4,
    question: "组合模式为什么常与迭代器模式配合使用？",
    answer: "组合模式形成的是树形结构，调用方经常需要「遍历」它（如统计总数、查找节点、序列化、过滤）。\n\n不用迭代器的问题：调用方要自己写递归遍历逻辑，遍历方式（深度优先/广度优先/按层级）散落在各处，每个调用方都要懂树的内部结构，既重复又破坏封装——`Folder` 的 `children` 实现细节泄露了出去。\n\n用迭代器的好处：把「遍历策略」封装进迭代器对象，组合结构对外只暴露 `createIterator()`，调用方用统一的 `while (it.hasNext()) it.next()` 接口遍历，不关心是树还是线性、是深度优先还是广度优先。\n\n二者配合让「树结构的表示」（组合）和「树结构的遍历」（迭代器）彻底解耦：\n① 符合单一职责——组合管结构、迭代器管遍历；\n② 方便切换遍历方式而不改调用方代码；\n③ 支持多种遍历（前序/后序/层序）共存，各自一个迭代器实现即可；\n④ 配合访问者模式还能在不改节点类的前提下新增对树的操作。",
    tags: ["迭代器", "配合", "遍历", "单一职责"],
  },
];
