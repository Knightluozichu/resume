import type { ReviewQuestion } from "./types";

/** やさしいC++ 第5版 · 官方 16 课总复习题 */
export const ecpFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "ecp-final-review-1",
    chapter: "ecp-final-review",
    level: 1,
    question: "官方 16 课如何组成源码、控制、数据、对象与文件的端到端证据链？",
    answer: "L1–4 证明当前源码如何编译并按类型/表达式产生值；L5–7 证明分支、循环和函数路径；L8–11 证明地址、数组边界、定义来源和数据形状；L12–15 证明对象不变量、生命周期与多态；L16 把合法对象写出并独立重读比较。",
    tags: ["总复习", "16课", "证据链"],
  },
  {
    id: "ecp-final-review-2",
    chapter: "ecp-final-review",
    level: 2,
    question: "编译错误、链接错误、边界错误和文件格式错误应分别从哪些证据开始？",
    answer: "编译看最小源码、token、声明和类型；链接看定义签名、目标文件和最终链接命令；边界看输入分类、循环不变量、数组 count 与生命周期；文件格式看路径、模式、原始行、字段转换和 eof/fail/bad 状态。按最早失败阶段定位。",
    tags: ["失败分层", "编译链接", "流状态"],
  },
  {
    id: "ecp-final-review-3",
    chapter: "ecp-final-review",
    level: 3,
    question: "成绩记录项目怎样同时守住解析边界和对象不变量？",
    answer: "解析器先确认一行字段完整、分数可转成整数并保留行号；ScoreRecord 构造再验证姓名非空、分数处于 0–100。两层都通过才提交对象，失败不留下半合法状态。写文件后关闭重开，重新经过同一边界并逐字段比较。",
    tags: ["解析", "对象不变量", "提交边界"],
  },
  {
    id: "ecp-final-review-4",
    chapter: "ecp-final-review",
    level: 4,
    question: "最终故障注入为什么要包含非法分数、半记录、追加污染和对象切片？",
    answer: "四者分别验证条件/构造不变量、读取循环与流状态、打开模式与往返记录数、数组元素类型与 virtual 分派。它们跨越不同 Lesson，能证明项目不是只在正常输入偶然通过，也能检验诊断者是否从症状回到正确证据层。",
    tags: ["故障注入", "文件往返", "对象切片"],
  },
];
