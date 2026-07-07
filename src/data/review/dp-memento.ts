import type { ReviewQuestion } from "./types";

/** 备忘录模式章复习题 */
export const dpMementoQuestions: ReviewQuestion[] = [
  {
    id: "dp-memento-01",
    chapter: "dp-memento",
    level: 1,
    question: "备忘录模式的意图是什么？",
    answer: "备忘录模式在不破坏封装性的前提下，捕获一个对象的内部状态，并在该对象之外保存这个状态，以便以后当需要时能将该对象恢复到原先保存的状态。\n\n核心意图：把「状态的快照」从对象里抽出来外部存储，既能实现撤销/回滚，又不暴露对象的内部实现。对象自己负责生成快照（它最清楚哪些状态需要保存），外部只负责保管快照，不能读取或修改快照内容——这样既实现了状态外存，又维持了封装。",
    tags: ["意图", "基础概念", "状态保存"],
  },
  {
    id: "dp-memento-02",
    chapter: "dp-memento",
    level: 2,
    question: "备忘录三角色（Originator、Memento、Caretaker）各自的职责是什么？",
    answer: "1. Originator（发起人）：被保存状态的对象。它提供 `createMemento()`（把自己的内部状态打包成一个 Memento 返回）和 `restore(memento)`（用 Memento 里的状态恢复自己）。只有 Originator 能读写 Memento 的内容。\n2. Memento（备忘录）：一个值对象，内部存储 Originator 在某一时刻的内部状态。它对 Originator 宽接口（可读写），对其他对象窄接口（只能持有不能看内容），通常通过包级私有/嵌套类/内部类实现访问控制。\n3. Caretaker（管理者）：负责保管 Memento，但它只能存取、不能修改 Memento 的内容。它维护一个快照栈（或列表），在需要时把 Memento 交还给 Originator 恢复。\n\n协作流程：Originator 生成 Memento → Caretaker 保存；需要恢复时 Caretaker 取出 Memento → 交给 Originator 的 `restore()`。Caretaker 全程不碰 Memento 内部数据，封装得以保持。",
    tags: ["三角色", "结构", "封装"],
  },
  {
    id: "dp-memento-03",
    chapter: "dp-memento",
    level: 3,
    question: "文本编辑器场景：实现撤销功能，用备忘录模式设计。",
    answer: "1. Originator：`TextEditor`，内部状态为 `content: string`（可选加光标位置、选区等）。\n- `createMemento()`：返回 `new EditorMemento(this.content)`，把当前文本快照出去。\n- `restore(m)`：`this.content = m.getContent()`，从快照恢复。\n2. Memento：`EditorMemento`，私有字段 `content`，只对 `TextEditor` 暴露 `getContent()`（窄接口），对外部不可见。\n3. Caretaker：`History`，内部维护 `Stack<EditorMemento>`。\n- 每次编辑（输入、删除）前，调 `editor.createMemento()` 压栈保存当前状态。\n- 撤销（Ctrl+Z）时弹栈，取出最近的 Memento 调 `editor.restore(m)`。\n4. 客户端：`history.push(editor.createMemento()); editor.type(\"hello\");` 撤销时 `editor.restore(history.pop())`。\n\n关键点：`History` 只管压栈弹栈，看不到 Memento 里的文本内容；`TextEditor` 自己决定保存哪些字段。新增要保存的字段（如光标）只改 Originator 和 Memento，Caretaker 不受影响。这是封装友好的撤销实现。",
    tags: ["应用", "撤销", "文本编辑器"],
  },
  {
    id: "dp-memento-04",
    chapter: "dp-memento",
    level: 4,
    question: "备忘录模式在内存上有什么风险？如何优化？",
    answer: "风险：\n\n1. 快照数量膨胀：每次操作都存一份完整状态，操作频繁时（如连续输入上万个字符）快照会占用大量内存，每份快照都拷贝全部状态，哪怕实际只改了一个字符。\n2. 大对象拷贝开销：如果 Originator 内部状态很大（如整个文档、整张图片），每次 `createMemento()` 都深拷贝，时间和空间都吃不消。\n3. 长期堆积：撤销栈无上限时，快照会一直累积，最终 OOM。\n\n优化手段：\n- 增量快照：只存「相对上一次的变化」（增量/diff），而不是完整状态。恢复时按序回放增量，或周期性存全量 + 之间存增量。文档编辑器常用「操作日志」代替全量快照。\n- 写时复制/共享不可变部分：状态中的不可变部分（如大字符串的某段）多份快照共享引用，只拷贝变化的部分。\n- 限制栈深度：撤销栈设上限（如最近 50 步），超出则丢弃最旧快照，牺牲无限撤销换内存可控。\n- 按需快照：不是每次操作都存，而是按「可撤销粒度」合并（如连续输入合并为一次撤销点）。\n- 序列化到磁盘：历史快照不常访问时，序列化到磁盘或数据库，内存只留最近几步。\n\n本质权衡：完整快照换来了恢复简单但内存重；增量换来了内存省但恢复逻辑复杂。根据对象大小和操作频率选择。",
    tags: ["内存风险", "优化", "增量快照"],
  },
];
