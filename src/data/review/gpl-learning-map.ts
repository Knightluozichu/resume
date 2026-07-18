import type { ReviewQuestion } from "./types";

export const gplLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "gpl-learning-map-1",
    chapter: "gpl-learning-map",
    level: 1,
    question: "官方13章应怎样分成四个阶段，每个阶段向下一阶段提供什么前置contract？",
    answer: "第1–4章程序与数据提供type/scope/copy-alias/shape；第5–7章函数方法接口提供call/error/method-set/dynamic contract；第8–9章分别提供channel lifecycle和shared-state happens-before proof；第10–13章提供package/build/test evidence以及reflection/unsafe/cgo boundary。地图按官方章导航，不能用8个泛主题替代独立章节。",
    tags: ["official outline", "learning path", "ownership", "concurrency", "evidence"],
  },
  {
    id: "gpl-learning-map-2",
    chapter: "gpl-learning-map",
    level: 2,
    question: "一个章节达到90/100分后，为什么仍需practice和verification gate，且并发/low-level要提高强度？",
    answer: "内容分与目录覆盖证明教材结构，不证明reader能迁移能力。每章还需实现带failure path的练习、review回答和对应工具证据。并发需race/cancel/backpressure/leak路径，reflection需nil/cycle/limits，unsafe/cgo需checkptr/architecture/ownership tests与clean build。只有理解、实现、证据同时成立才前移。",
    tags: ["quality gate", "practice", "verification", "race detector", "checkptr"],
  },
];
