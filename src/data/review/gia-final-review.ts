import type { ReviewQuestion } from "./types";

/** 《Go in Action》总复习题。 */
export const giaFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "gia-final-review-1",
    chapter: "gia-final-review",
    level: 1,
    question: `构建失败、竞态、I/O 截断和基准波动应分别回到哪几章？`,
    answer: `构建与依赖回第3章，值别名和方法集问题回第4至5章，竞态与关闭协议回第6至7章，EOF、短写和资源关闭回第8章，基准样本与测试边界回第9章。第2章用于检查完整程序装配是否把这些契约接对。`,
    tags: ["故障定位", "九章", "全书结构"],
  },
  {
    id: "gia-final-review-2",
    level: 2,
    chapter: "gia-final-review",
    question: `一个可复现 Go 服务为什么必须同时保存源码、工具链、依赖和运行证据？`,
    answer: `源码只描述意图；Go 版本和命令决定编译与检查行为，go.mod、go.sum、proxy 与 replace 决定依赖解析，测试、race、I/O 注入和 benchmark 输出证明运行契约。缺少任一层，都可能出现本地通过但无法解释或复现的差异。`,
    tags: ["可复现", "工具链", "依赖证据"],
  },
  {
    id: "gia-final-review-3",
    level: 3,
    chapter: "gia-final-review",
    question: `设计“读取 JSON 数据源并并发处理”的最小正确架构。`,
    answer: `main 只装配；输入层用 json.Decoder 从 Reader 读取并明确 Close 所有权；固定 Work 池通过 channel 接收任务；每个结果携带输入身份和 error；协调者等待生产者后关闭结果通道。表驱动测试覆盖坏 JSON、EOF、处理失败与取消，race detector 验证共享状态。`,
    tags: ["综合", "JSON", "Work", "测试"],
  },
  {
    id: "gia-final-review-4",
    level: 4,
    chapter: "gia-final-review",
    question: `最终项目怎样证明“功能正确、并发收敛、资源关闭、性能结论可信”四件事？`,
    answer: `功能用表驱动、HTTP 与 Example 测试；并发用明确关闭者、等待协议和 race detector；资源用故障 Reader/Writer、Close 失败和 goroutine 数量检查；性能用语义等价实现、多次 benchmark、benchmem 和统计比较。四类证据必须来自同一干净构建。`,
    tags: ["综合验收", "并发", "资源", "性能"],
  },
];
