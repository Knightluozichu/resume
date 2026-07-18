import type { ReviewQuestion } from "./types";

export const gwpFinalReviewQuestions: ReviewQuestion[] = [
  { id: "gwp-final-review-1", chapter: "gwp-final-review", level: 1, question: "500、错误200、数据库泄漏、goroutine增长和部署缺文件分别回哪章？", answer: "500先沿第3至7章定位最后可信边界；错误200回第4章响应提交；数据库泄漏回第6章；goroutine增长回第9章；部署缺文件回第10章。第8章负责把这些症状变成可重复测试。", tags: ["故障定位", "十章"] },
  { id: "gwp-final-review-2", chapter: "gwp-final-review", level: 2, question: "为什么响应提交点是全书重要边界？", answer: "一旦WriteHeader或Write提交状态和header，后续模板、存储或编码失败无法再改成正确错误响应。Handler应先完成验证和可预检工作，再进入不可逆输出。", tags: ["ResponseWriter", "错误处理"] },
  { id: "gwp-final-review-3", chapter: "gwp-final-review", level: 3, question: "设计一个同时提供HTML和JSON的论坛时，哪些层应共享，哪些不共享？", answer: "领域用例和Store共享；HTML handler准备模板视图，API handler转换DTO与状态码，各自拥有表示契约。身份与授权规则共享，但Cookie解析和JSON codec留在协议适配层。", tags: ["综合设计", "HTML", "API"] },
  { id: "gwp-final-review-4", chapter: "gwp-final-review", level: 4, question: "最终项目如何证明功能、失败、并发和发布四类正确性？", answer: "功能用表驱动与HTTP旅程；失败用存储、codec和模板故障注入；并发用取消、race和goroutine收敛；发布用同一构建摘要、健康与关键探针以及可执行回滚。", tags: ["综合验收", "证据链"] },
];
