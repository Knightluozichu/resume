import type { ReviewQuestion } from "./types";

export const cseLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "cse-learning-map-1",
    chapter: "cse-learning-map",
    level: 1,
    question: "《C++ 服务器开发精髓》官方九章怎样形成从语言/调试到服务/生产的依赖链？",
    answer: "第1章建立RAII/pimpl/modern C++ ownership，第2章建立build/symbol/GDB evidence；第3～6章依次处理thread synchronization、socket state、network evidence和protocol framing/version；第7章把它们组装为single-loop service，第8章用Redis 6.0源码验证ae/client/RESP/thread ownership，第9章补齐reconnect/heartbeat/log/error/monitor production closure。",
    tags: ["官方九章", "依赖", "学习地图"],
  },
  {
    id: "cse-learning-map-2",
    chapter: "cse-learning-map",
    level: 2,
    question: "建设、事故和Redis源码阅读三条路径分别应保留哪些不可跳过的前置证据？",
    answer: "建设保留第1/3/4/6章的lifetime、happens-before、nonblocking state和framing，再进第7/9章；事故保留第2/4/5章的artifact/socket/two-sided evidence，再看service/recovery；源码阅读保留第1/2章owner/debug、第3/4/6/7章thread/network/protocol/architecture，才能解释第8章。路径可裁剪，但不能用熟悉API替代这些evidence gates。",
    tags: ["学习路径", "证据门槛", "依赖"],
  },
  {
    id: "cse-learning-map-3",
    chapter: "cse-learning-map",
    level: 3,
    question: "为什么页面数量和API覆盖不能证明本书完成？每章应怎样验收？",
    answer: "完成度以权威九章核心单元为骨架；每章还要有owner/state/evidence知识链、专属图、可复现实验和复习题。验收示例包括thread shutdown/happens-before、ET drain、two-sided tcpdump、random-chunk decoder、single-loop slow-client、Redis breakpoint chain、reconnect/log sink故障注入。地图和终局复习也必须与九章一致。",
    tags: ["章节验收", "权威目录", "质量"],
  },
];
