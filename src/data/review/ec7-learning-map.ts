import type { ReviewQuestion } from "./types";

export const ec7LearningMapQuestions: ReviewQuestion[] = [
  {
    id: "ec7-learning-map-1",
    chapter: "ec7-learning-map",
    level: 1,
    question: "Essential C# 7.0第6版的22章可怎样分成五个连续验收阶段？",
    answer: "第1-5章language mechanics；第6-11章type/object/reliability contracts；第12-18章generics、delegates/events、collections/query与metadata abstraction；第19-21章multithreading、synchronization与interop/unsafe boundaries；第22章CLI/runtime architecture。阶段不替代官方章节，只提供dependency gate。",
    tags: ["official-outline", "learning-path", "phase-gate"],
  },
  {
    id: "ec7-learning-map-2",
    chapter: "ec7-learning-map",
    level: 2,
    question: "为什么岗位路线可以加速章节，但不能删除hard prerequisites？",
    answer: "目标路线只改变优先级。library design仍依赖language/method binding与equality/exception；query依赖generics/delegates/enumeration；concurrency依赖callback lifetime；native/runtime依赖value layout与metadata。只有用prediction、implementation和artifact inspection通过phase gate，才能加速而不留下mental-model断链。",
    tags: ["prerequisite", "evidence-loop", "route"],
  },
  {
    id: "ec7-learning-map-3",
    chapter: "ec7-learning-map",
    level: 3,
    question: "会写LINQ链但无法预测source变化与执行时机，应走哪条recovery route？",
    answer: "回第12-13章确认generic delegate与closure storage，第15章确认enumerator/deferred/buffering，第16章确认query translation/provider，第17章确认iterator state machine。预测construction、first/second enumeration、source mutation与ToList snapshot，再用side-effect counter和boundary tests验证。",
    tags: ["LINQ", "deferred", "recovery-route"],
  },
  {
    id: "ec7-learning-map-4",
    chapter: "ec7-learning-map",
    level: 4,
    question: "怎样证明第19-22章的并发、原生边界与runtime阶段已经连成完整能力？",
    answer: "提交一个bounded/native operation：画Task cancel/fault timeline与lock wait graph，列buffer/handle/callback owner和unregister-drain顺序，用ABI size/offset与architecture tests验证第21章，再检查assembly manifest、CIL/metadata、target API和JIT/AOT reachability。四层证据都闭合才通过。",
    tags: ["concurrency", "interop", "CLI"],
  },
];
