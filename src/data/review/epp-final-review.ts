import type { ReviewQuestion } from "./types";

/** C++ Primer Plus 6e · 18 章总复习 */
export const eppFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "epp-final-review-1",
    chapter: "epp-final-review",
    level: 1,
    question: "18 章怎样形成 build/value、path/function、object/reuse、library/persistence 四层证据？",
    answer: "Ch1–4/9 证明当前源码、类型值、TU/链接；Ch5–8 证明输入域、路径、循环和函数契约；Ch10–15 证明不变量、owner、copy/move、继承、异常；Ch16–18 证明 range/iterator/algorithm、stream/file 与 callable。最终输出只有在四层都通过时才可信。",
    tags: ["总复习", "证据矩阵", "18章"],
  },
  {
    id: "epp-final-review-2",
    chapter: "epp-final-review",
    level: 2,
    question: "多态记录队列为什么同时需要 copy policy、virtual destructor、异常提交和 unique owner？",
    answer: "链式 Queue 有动态 Node，默认 copy 会共享地址，必须删除或深复制；Base owner 删除 Derived 需要 virtual destructor；构造/解析先在 temporary 完成，异常后不提交半状态；unique_ptr 表达唯一 owner 和 move，但仍需接口替换、borrow lifetime 与 clone policy。",
    tags: ["所有权", "多态", "异常安全"],
  },
  {
    id: "epp-final-review-3",
    chapter: "epp-final-review",
    level: 3,
    question: "sort 后文件内容损坏，应按什么顺序区分 comparator、range、stream mode 与 schema？",
    answer: "先在内存中验证输入 range 有效、iterator 未失效、comparator 是 strict weak ordering，确认排序结果；再检查输出 mode 是否意外 app/trunc、每次 write/close 状态；最后按 schema/version/length 独立重读。不要直接改文件格式掩盖一个已被坏比较器破坏的范围。",
    tags: ["算法契约", "流状态", "故障分层"],
  },
  {
    id: "epp-final-review-4",
    chapter: "epp-final-review",
    level: 4,
    question: "一个完成的 capstone 应怎样证明正常路径与 shallow copy、slicing、bad ordering、short record 四个故障？",
    answer: "正常路径从干净构建、固定输入到两种派生记录 Queue/sort/save/reload 字段相等；copy 被删除或深复制地址独立；Base owner 容器保留 virtual override；相等/三元组测试拒绝非严格比较器；短记录在构造前由完整 read/length 检查拒绝。每项保存预测、首个失败证据和修复后反向测试。",
    tags: ["综合验收", "故障注入", "往返"],
  },
];
