import type { ReviewQuestion } from "./types";

export const cqcLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "cqc-learning-map-1",
    chapter: "cqc-learning-map",
    level: 1,
    question: "官方12章157条建议怎样组成四段学习路径？",
    answer: "第1-3章建立value/collection/query/generic/delegate语言契约；第4-6章处理resource/failure/execution ownership；第7-9章设计member/type/security public boundary；第10-12章让names、clean change、tests/version/release evidence闭环。原书顺序不变，四段只是帮助建立依赖。",
    tags: ["官方目录", "学习地图", "157条建议"],
  },
  {
    id: "cqc-learning-map-2",
    chapter: "cqc-learning-map",
    level: 2,
    question: "为什么每条旧建议都要经过read-predict-implement-verify-transfer门禁？",
    answer: "Read保留original-title和时代背景；predict写normal/boundary/fault/lifetime；implement用最小API表达；verify以tests/trace/profile/analyzer/security证据证明；transfer用于真实review并记录target/domain/migration。这样避免把enum、finalizer、SecureString等旧结论机械当lint规则。",
    tags: ["decision-boundary", "evidence", "transfer"],
  },
];
