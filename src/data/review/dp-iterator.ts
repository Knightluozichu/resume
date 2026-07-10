import type { ReviewQuestion } from "./types";

/** 迭代器模式章复习题 */
export const dpIteratorQuestions: ReviewQuestion[] = [
  {
    id: "dp-iterator-01",
    chapter: "dp-iterator",
    level: 1,
    question: `迭代器模式的意图是什么？`,
    answer: `迭代器模式提供一种方法顺序访问一个聚合对象中的各个元素，而又不暴露该对象的内部表示。\n\n核心意图：把「遍历」这件事从集合中抽离出来，变成一个独立的迭代器对象。客户端通过迭代器的统一接口（如 \`hasNext()\` / \`next()\`）逐个访问元素，不需要知道集合内部是数组、链表还是树，也不需要知道元素如何存储。这样集合的内部结构可以自由变化，只要换一个对应的迭代器，遍历代码不用改。`,
    tags: ["意图", "基础概念", "遍历"],
  },
  {
    id: "dp-iterator-02",
    chapter: "dp-iterator",
    level: 2,
    question: `为什么迭代器模式能屏蔽集合的内部结构（数组 vs 链表 vs 树）？`,
    answer: `迭代器把「如何取下一个元素」的细节封装在自己内部，对外只暴露统一的 \`hasNext()\` 和 \`next()\` 接口。\n\n- 数组迭代器：维护一个下标 \`index\`，\`next()\` 返回 \`arr[index++]\`。\n- 链表迭代器：维护一个当前节点指针 \`current\`，\`next()\` 返回 \`current.value\` 并后移 \`current = current.next\`。\n- 树迭代器：内部用栈或队列维护遍历路径（前序/中序/后序/层序），\`next()\` 弹出并补充子节点。\n\n三种集合的内部结构完全不同，但迭代器对外接口一样。客户端代码永远是 \`while (it.hasNext()) { process(it.next()); }\`，与具体集合类型解耦。集合只需实现一个 \`createIterator()\` 工厂方法返回自己的迭代器，客户端拿到迭代器后就能统一遍历，无需关心内部是连续内存、指针链还是树形节点。`,
    tags: ["内部结构", "封装", "对比"],
  },
  {
    id: "dp-iterator-03",
    chapter: "dp-iterator",
    level: 3,
    question: `实现一个支持 hasNext() / next() 的数组迭代器。`,
    answer: `1. 定义迭代器接口 \`Iterator<T>\`，声明 \`hasNext(): boolean\` 和 \`next(): T\`。\n2. 实现数组迭代器 \`ArrayIterator<T> implements Iterator<T>\`：\n- 构造时接收数组 \`items: T[]\`，维护游标 \`index = 0\`。\n- \`hasNext()\`：返回 \`index < items.length\`。\n- \`next()\`：返回 \`items[index++]\`（若越界可抛异常）。\n3. 聚合对象 \`MyList<T>\` 持有数组，提供 \`createIterator()\` 返回 \`new ArrayIterator(this.items)\`。\n4. 客户端：\`const it = list.createIterator(); while (it.hasNext()) { console.log(it.next()); }\`\n\n关键点：游标是迭代器的内部状态，外部不可见；多个迭代器可同时遍历同一集合互不干扰（各自独立游标）。这是迭代器相对集合内置 \`for\` 循环的核心优势——支持多种并行遍历。`,
    tags: ["应用", "数组迭代器", "实现"],
  },
  {
    id: "dp-iterator-04",
    chapter: "dp-iterator",
    level: 4,
    question: `迭代器模式与组合模式如何配合使用（统一遍历树形结构）？`,
    answer: `组合模式构建出树形结构（如文件系统：目录包含子目录和文件），但遍历树需要递归，对客户端不友好。结合迭代器后，可以把递归逻辑藏进迭代器内部，客户端用统一的 \`hasNext()\` / \`next()\` 平铺式遍历整棵树。\n\n做法：\n1. 组合节点的 \`createIterator()\` 返回一个「组合迭代器」。\n2. 组合迭代器内部维护一个栈（或队列），栈里存的是子节点的迭代器。\n- \`next()\`：先取栈顶迭代器的当前元素；如果该元素本身是组合节点（有子节点），就把它的迭代器压栈（深度优先）；如果栈顶迭代器耗尽，弹栈回退到父层继续。\n- \`hasNext()\`：栈非空且栈顶迭代器还有元素。\n3. 客户端拿到根节点的迭代器后，\`while (it.hasNext()) { process(it.next()); }\` 就能遍历整棵树，无论节点是叶子还是分支，全部一视同仁。\n\n这正是「组合模式提供统一结构、迭代器模式提供统一遍历」的协同：组合让客户端忽略叶子与组合的区别，迭代器让客户端忽略树与线性集合的区别。Java Swing 的 \`Container.getComponents()\`、DOM 树的 \`TreeWalker\` 都是这种配合的体现。`,
    tags: ["综合", "组合模式", "树形遍历"],
  },
];
