import type { ReviewQuestion } from "./types";
export const popLearningMapQuestions: ReviewQuestion[] = [
  { id: "pop-learning-map-1", chapter: "pop-learning-map", level: 1, question: "原书三篇16章怎样递进？", answer: "基础篇4章建立采集、监控、报表和安全；高级篇8章扩大到批量、集中控制、WebServer和大数据；案例篇4章完成平台化。", tags: ["导览", "三篇"] },
  { id: "pop-learning-map-2", chapter: "pop-learning-map", level: 2, question: "为什么批量执行前必须预览目标？", answer: "目标表达式错误会把单机失误放大到全网；预览、授权、限流和停止条件共同把影响面保持在批准范围。", tags: ["目标", "安全"] },
  { id: "pop-learning-map-3", chapter: "pop-learning-map", level: 3, question: "怎样完成跨章综合实验？", answer: "采集测试服务指标，生成差异和报表，经受信SSH发布配置，再从多个探针验证，并用同一事件ID串联证据与回滚。", tags: ["综合实验"] },
  { id: "pop-learning-map-4", chapter: "pop-learning-map", level: 4, question: "如何学习书中的历史工具？", answer: "从工具提取控制面、目标、状态和失败聚合模型，再用当前维护方案重写API与安全默认；Func、旧Fabric和CGI不直接作为新项目默认。", tags: ["迁移"] },
];
