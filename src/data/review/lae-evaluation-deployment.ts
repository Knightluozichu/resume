import type { ReviewQuestion } from "./types";

export const laeEvaluationDeploymentQuestions: ReviewQuestion[] = [
  {
    id: "lae-evaluation-deployment-1",
    chapter: "lae-evaluation-deployment",
    level: 1,
    question: `大模型评估的四大维度是什么？每个维度关注什么？`,
    answer:
      `四大评估维度：①质量评估——回答好不好。指标包括准确率（事实正确性）、相关性（是否切题）、忠实性（是否无幻觉、有据可依）、流畅性（语言是否通顺）、连贯性（逻辑是否自洽）。②安全评估——安不安全。检查毒性内容、偏见和歧视、越狱攻击防护（是否被诱导输出有害内容）、隐私泄露（是否暴露训练数据中的PII）。③性能评估——快不快。指标包括TTFT（Time To First Token，首字延迟）、TPS（Tokens Per Second，每秒生成Token数）、QPS（Queries Per Second，吞吐量）、GPU利用率。④成本评估——贵不贵。指标包括Token消耗量、API调用费用、单位请求成本。四者需要平衡：追求高质量可能增加成本和延迟，追求低成本可能牺牲质量。`,
    tags: ["评估维度", "质量评估", "安全评估", "性能评估", "成本评估"],
  },
  {
    id: "lae-evaluation-deployment-2",
    chapter: "lae-evaluation-deployment",
    level: 2,
    question: `基准测试、人工评估、LLM-as-Judge和A/B测试四种评估方法各有什么优缺点？`,
    answer:
      `四种评估方法：①基准测试——用标准化数据集（MMLU/HumanEval等）自动评分。优点：客观量化、可复现、成本低。缺点：数据集可能过时、与实际应用场景有差距、容易被\"刷榜\"。②人工评估——专家对模型输出打分、盲测对比、偏好排序。优点：最可靠、能评估主观质量。缺点：成本高、速度慢、难大规模。③LLM-as-Judge——用强大模型（如GPT-4）评估其他模型输出。优点：大规模自动化、成本低速度快、能评估开放式输出。缺点：评估模型本身有偏差、可能偏好自己风格、对细微错误不敏感。④在线A/B测试——将真实用户流量分配到不同版本，比较业务指标。优点：最贴近真实效果、直接反映用户满意度。缺点：需要线上流量、周期长、有用户影响风险。最佳实践：离线用基准+LLM-Judge快速筛选 → 人工评估验证关键版本 → A/B测试做最终决策。`,
    tags: ["评估方法", "基准测试", "人工评估", "LLM-as-Judge", "A/B测试"],
  },
  {
    id: "lae-evaluation-deployment-3",
    chapter: "lae-evaluation-deployment",
    level: 2,
    question: `大模型部署的典型架构是怎样的？vLLM等推理框架解决了什么问题？`,
    answer:
      `典型部署架构：①负载均衡层——分发请求到多个推理实例，实现水平扩展。②API网关——统一鉴权、限流、请求路由、日志记录。③推理服务层——核心推理引擎，运行模型生成。④缓存层——语义缓存命中免调用、KV Cache复用降低延迟。⑤监控告警层——实时采集指标、异常告警。推理框架（vLLM/TGI/DeepSpeed-FastGen）解决的关键问题：①显存管理——PagedAttention技术将KV Cache像虚拟内存一样分页管理，减少显存碎片，提高显存利用率。②连续批处理（Continuous Batching）——动态将不同请求的Token拼接成批次，GPU始终满载，大幅提高吞吐量。③模型并行——将大模型分布到多GPU上，支持超过单卡显存的大模型。④量化支持——支持INT8/INT4量化，降低显存和加速推理。这些技术使单GPU的吞吐量提升3-10倍。`,
    tags: ["部署架构", "vLLM", "推理框架", "PagedAttention"],
  },
  {
    id: "lae-evaluation-deployment-4",
    chapter: "lae-evaluation-deployment",
    level: 3,
    question: `如何设计一个渐进式上线策略，兼顾快速迭代和风险控制？`,
    answer:
      `渐进式上线策略（金丝雀发布）：①离线评估——新版本先在测试集上通过基准测试、LLM-Judge评估和人工抽检，确认核心指标不退化。②影子模式——新版本与线上版本并行处理真实流量，但只返回旧版本结果，对比新版本输出质量，不影响用户。③小流量灰度——将1-5%流量导入新版本，密切监控错误率、延迟、用户反馈。如有异常立即回滚。④逐步扩量——指标正常则逐步扩大流量（5% → 10% → 50% → 100%），每步观察1-3天。⑤A/B测试——在扩量过程中同时比较新旧版本的业务指标（用户满意度、完成率等），用统计显著性验证新版本是否更优。⑥全量发布——所有指标确认后全量切换，保留旧版本快速回滚能力。⑦持续监控——上线后持续追踪TTFT、TPS、错误率、成本等指标，设置告警阈值。核心原则：小步快跑、可回滚、数据驱动。`,
    tags: ["渐进上线", "金丝雀发布", "灰度", "A/B测试", "风险控制"],
  },
];
