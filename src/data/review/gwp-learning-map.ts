import type { ReviewQuestion } from "./types";

export const gwpLearningMapQuestions: ReviewQuestion[] = [
  { id: "gwp-learning-map-1", chapter: "gwp-learning-map", level: 1, question: "原书十章的准确顺序是什么？", answer: "1 Go与Web应用；2 Go ChitChat；3 处理请求；4 处理请求内容；5 展示内容；6 存储数据；7 Go Web服务；8 测试应用；9 利用Go并发；10 部署Go应用。本站导览和总复习是额外教学层。", tags: ["官方目录", "十章"] },
  { id: "gwp-learning-map-2", chapter: "gwp-learning-map", level: 2, question: "为什么ChitChat要在Handler、模板和存储细节章之前？", answer: "它先给出mux、静态文件、Cookie、模板、PostgreSQL和服务器启动如何协作的完整全景。后续章节再拆解局部机制，读者始终知道每个API位于请求生命周期哪一段。", tags: ["ChitChat", "全景"] },
  { id: "gwp-learning-map-3", chapter: "gwp-learning-map", level: 3, question: "从请求到响应的六个主要责任层是什么？", answer: "协议消息、路由与handler、请求解析与响应提交、模板或服务表示、存储与事务、测试并发与部署证据。每层都要标出输入、所有者、错误和可观察输出。", tags: ["请求生命周期", "责任层"] },
  { id: "gwp-learning-map-4", chapter: "gwp-learning-map", level: 4, question: "完成全书的最小发布证据链是什么？", answer: "固定Go和依赖，从干净检出运行单元、HTTP、故障和race测试，构建二进制或镜像并记录摘要，部署同一摘要后执行健康、静态资产、模板、数据库与关键用户旅程探针。", tags: ["验收", "发布证据"] },
];
