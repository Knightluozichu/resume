import type { ReviewQuestion } from "./types";

export const cvcLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "cvc-learning-map-1",
    chapter: "cvc-learning-map",
    level: 1,
    question: "第四版官方30章可以分成哪五部分，各自回答什么问题？",
    answer: "Part I CLR Basics解释代码与identity怎样进入执行；Part II Designing Types建立type/member contract；Part III Essential Types检验常用值语义；Part IV Core Facilities处理failure、heap、loading、reflection、serialization与WinRT；Part V Threading处理work、async和synchronization。",
    tags: ["official-outline", "five-parts", "thirty-chapters"],
  },
  {
    id: "cvc-learning-map-2",
    chapter: "cvc-learning-map",
    level: 2,
    question: "Predict-trace-break-transfer怎样证明一个CLR章节已掌握？",
    answer: "先预测runtime state，再采IL、binding、allocation/root或thread/wait证据；注入identity mismatch、fault、pressure、cancel或race；最后换到陌生系统仍能写出owner、limit、invariant与验收，才通过transfer checkpoint。",
    tags: ["evidence-loop", "failure-injection", "transfer"],
  },
];
