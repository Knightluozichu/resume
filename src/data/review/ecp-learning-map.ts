import type { ReviewQuestion } from "./types";

/** やさしいC++ 第5版 · 官方 16 课学习地图复习题 */
export const ecpLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "ecp-learning-map-1",
    chapter: "ecp-learning-map",
    level: 1,
    question: "官方 16 个 Lesson 可以分成哪四个学习阶段，各自交付什么能力？",
    answer: "L1–4 建立开发循环、输入输出、变量和表达式规则；L5–7 建立条件、循环与函数契约；L8–11 建立指针/生命周期、数组边界、多文件构建和数据形状；L12–16 建立封装、对象生命周期、继承多态与文件往返。四段分别回答结果、路径、数据和有效状态如何被证明。",
    tags: ["官方目录", "16课", "学习路线"],
  },
  {
    id: "ecp-learning-map-2",
    chapter: "ecp-learning-map",
    level: 2,
    question: "为什么旧的八主题路线不能代替第5版官方目录？",
    answer: "旧路线合并或遗漏了表达式、循环、指针、数组、多文件、各种类型、类的连续高级主题和文件 I/O，又把模板/STL 当成官方独立主课。它无法逐课验收原书核心知识，也破坏前置依赖。学习地图、正文与题库必须以 16 课为同一结构基线。",
    tags: ["目录忠实度", "章节边界", "结构基线"],
  },
  {
    id: "ecp-learning-map-3",
    chapter: "ecp-learning-map",
    level: 3,
    question: "一个阶段闸门应包含哪些可复查证据，为什么一次正确输出不够？",
    answer: "至少包含可独立重建的程序、改动前预测、实际结果、边界用例、故意失败实验和原因解释。一次输出只覆盖一条路径，也可能运行旧产物；它不能证明区间边界、循环终止、生命周期、链接来源或流状态。",
    tags: ["阶段闸门", "边界测试", "故障实验"],
  },
  {
    id: "ecp-learning-map-4",
    chapter: "ecp-learning-map",
    level: 4,
    question: "如何用一个成绩册文件往返项目串联全书，而不把它做成只会读写文件的孤立示例？",
    answer: "变量定义字段，条件验证范围，循环处理多条记录，函数拆分解析与校验，数组/序列保存数据，多文件分离接口实现，struct/class 表达记录并维护不变量，继承多态统一展示，最后用明确路径、模式和格式写入，关闭重开后逐字段比较，并覆盖缺失、非法和半记录。",
    tags: ["综合项目", "对象不变量", "文件往返"],
  },
];
