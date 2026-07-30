"use client";

import {
  LangchainEvidenceLab,
  type LangchainEvidenceModel,
} from "./langchain-evidence-lab";

const model = {
  unitId: "lcp-05",
  title: "第5章 RAG",
  question: "RAG系统怎样证明检索到了正确证据，而不是只让答案听起来更具体？",
  concepts: [
    "第5章 RAG",
    "5.1 RAG技术概述",
    "5.2 LangChain中的RAG组件",
    "5.2.1 加载器",
    "5.2.2 分割器",
    "5.2.3 文本嵌入",
    "5.2.4 向量存储",
    "5.2.5 检索器",
    "5.2.6 多文档联合检索",
    "5.2.7 RAG技术的关键挑战",
    "5.3 检索增强生成实践",
    "5.3.1 文档预处理过程",
    "5.3.2 文档检索过程",
    "5.3.3 方案优势",
  ],
  invariant:
    "第5章 RAG的包版本、输入输出schema、执行事件、评估结果与回退路径始终一致",
  fault: "同时更换切分、嵌入和检索器，只凭最终答案主观好看宣称RAG提升",
  artifact: "文档谱系、chunk账本、检索排名、引用覆盖与端到端评估集",
  stages: [
    {
      name: "第5章 RAG · 依赖与输入",
      input:
        "在锁定的2024原书轨道和当前LangChain v1轨道上重放RAG组件、文档预处理、检索、生成与关键挑战",
      book2024:
        "冻结原书RAG组件、文档预处理、检索、生成与关键挑战对应的2024包版本、导入路径与示例输入",
      currentV1:
        "按当前官方文档冻结v1核心、集成包、LangGraph/LangSmith版本与输入schema",
      output: "第5章 RAG的依赖锁、输入合同和版本泳道",
      check: "第5章 RAG没有在同一运行中混用v0、langchain-classic与v1接口",
    },
    {
      name: "第5章 RAG · 组合与执行",
      input: "第5章 RAG的锁定依赖、输入与预注册预测",
      book2024: "分解加载、切分、嵌入、索引、检索、上下文装配、生成与评估",
      currentV1:
        "当前实现应按集成包和LangGraph/agent工作流明确索引与运行时路径，并用trace与检索评估验收",
      output: "第5章 RAG的状态事件、工具/检索调用与输出快照",
      check: "第5章 RAG的每一步可由同一schema、版本、配置和顺序复算",
    },
    {
      name: "第5章 RAG · 迁移故障",
      input: "第5章 RAG的参考轨迹与保持不变的模型、数据和评估集",
      book2024:
        "在原书轨道只注入“同时更换切分、嵌入和检索器，只凭最终答案主观好看宣称RAG提升”并保存首个失败事件",
      currentV1: "在v1轨道只注入同一迁移故障，检查命名空间、状态或事件语义分岔",
      output: "第5章 RAG的首个不兼容点、传播路径与错误分类",
      check: "第5章 RAG没有把多项依赖升级或模型切换归因给单一API",
    },
    {
      name: "第5章 RAG · 评估与回退",
      input: "第5章 RAG的参考/故障trace、独立评估与回退快照",
      book2024: "恢复原书锁文件与接口合同，重放历史示例并保留历史边界",
      currentV1: "恢复v1锁文件与迁移适配，重放评估集并验证状态和输出",
      output: "第5章 RAG的兼容结论、评估差分与发布/回退理由",
      check:
        "第5章 RAG满足“第5章 RAG的包版本、输入输出schema、执行事件、评估结果与回退路径始终一致”",
    },
  ],
  cases: [
    {
      name: "第5章 RAG · 原书参考",
      setup:
        "固定在锁定的2024原书轨道和当前LangChain v1轨道上重放RAG组件、文档预处理、检索、生成与关键挑战中的2024依赖、输入和事件顺序",
      prediction: "第5章 RAG的历史轨迹应满足原书接口合同且不声称当前兼容",
      boundary: "第5章 RAG的原书轨道只说明2024首版与锁定依赖",
    },
    {
      name: "第5章 RAG · v1参考",
      setup: "按当前官方文档固定v1依赖、输入schema、状态与评估",
      prediction:
        "第5章 RAG应持续满足“第5章 RAG的包版本、输入输出schema、执行事件、评估结果与回退路径始终一致”",
      boundary: "第5章 RAG只覆盖核查日期的官方v1接口和已运行集成",
    },
    {
      name: "第5章 RAG · 迁移故障",
      setup:
        "保持其余条件不变，只注入“同时更换切分、嵌入和检索器，只凭最终答案主观好看宣称RAG提升”",
      prediction: "第5章 RAG应定位首个不兼容事件并能从锁定快照回退",
      boundary: "第5章 RAG的迁移结论不能外推到未测试provider、模型或部署",
    },
  ],
  referenceTrace: [
    "第5章 RAG参考步骤1：原书轨道执行冻结原书RAG组件、文档预处理、检索、生成与关键挑战对应的2024包版本、导入路径与示例输入；当前v1轨道执行按当前官方文档冻结v1核心、集成包、LangGraph/LangSmith版本与输入schema；保存第5章 RAG的依赖锁、输入合同和版本泳道并断言第5章 RAG没有在同一运行中混用v0、langchain-classic与v1接口。",
    "第5章 RAG参考步骤2：原书轨道执行分解加载、切分、嵌入、索引、检索、上下文装配、生成与评估；当前v1轨道执行当前实现应按集成包和LangGraph/agent工作流明确索引与运行时路径，并用trace与检索评估验收；保存第5章 RAG的状态事件、工具/检索调用与输出快照并断言第5章 RAG的每一步可由同一schema、版本、配置和顺序复算。",
    "第5章 RAG参考步骤3：原书轨道执行在原书轨道只注入“同时更换切分、嵌入和检索器，只凭最终答案主观好看宣称RAG提升”并保存首个失败事件；当前v1轨道执行在v1轨道只注入同一迁移故障，检查命名空间、状态或事件语义分岔；保存第5章 RAG的首个不兼容点、传播路径与错误分类并断言第5章 RAG没有把多项依赖升级或模型切换归因给单一API。",
    "第5章 RAG参考步骤4：原书轨道执行恢复原书锁文件与接口合同，重放历史示例并保留历史边界；当前v1轨道执行恢复v1锁文件与迁移适配，重放评估集并验证状态和输出；保存第5章 RAG的兼容结论、评估差分与发布/回退理由并断言第5章 RAG满足“第5章 RAG的包版本、输入输出schema、执行事件、评估结果与回退路径始终一致”。",
  ],
  faultTrace: [
    "第5章 RAG故障步骤1：保持在锁定的2024原书轨道和当前LangChain v1轨道上重放RAG组件、文档预处理、检索、生成与关键挑战不变，只检查“同时更换切分、嵌入和检索器，只凭最终答案主观好看宣称RAG提升”怎样改变第5章 RAG的依赖锁、输入合同和版本泳道。",
    "第5章 RAG故障步骤2：保持第5章 RAG的锁定依赖、输入与预注册预测不变，只检查“同时更换切分、嵌入和检索器，只凭最终答案主观好看宣称RAG提升”怎样改变第5章 RAG的状态事件、工具/检索调用与输出快照。",
    "第5章 RAG故障步骤3：保持第5章 RAG的参考轨迹与保持不变的模型、数据和评估集不变，只检查“同时更换切分、嵌入和检索器，只凭最终答案主观好看宣称RAG提升”怎样改变第5章 RAG的首个不兼容点、传播路径与错误分类。",
    "第5章 RAG故障步骤4：保持第5章 RAG的参考/故障trace、独立评估与回退快照不变，只检查“同时更换切分、嵌入和检索器，只凭最终答案主观好看宣称RAG提升”怎样改变第5章 RAG的兼容结论、评估差分与发布/回退理由。",
  ],
  gates: [
    {
      label: "书目与版本门",
      detail:
        "第5章 RAG区分纸书目录、作者伴学材料、原书2024接口、当前v1文档和核查日期。",
    },
    {
      label: "schema与trace门",
      detail:
        "第5章 RAG的依赖锁、输入输出schema、状态事件、工具/检索调用和错误可追溯。",
    },
    {
      label: "迁移与安全门",
      detail:
        "第5章 RAG只注入“同时更换切分、嵌入和检索器，只凭最终答案主观好看宣称RAG提升”，检查权限、敏感数据、首个分岔和回退。",
    },
    {
      label: "评估与发布门",
      detail:
        "第5章 RAG交付文档谱系、chunk账本、检索排名、引用覆盖与端到端评估集，并报告通过、失败、未知和未测试集成。",
    },
  ],
} as const satisfies LangchainEvidenceModel;

export function Lcp05RagVersionContractLab() {
  return <LangchainEvidenceLab model={model} view="version-contract" />;
}

export function Lcp05RagRunnableTraceLab() {
  return <LangchainEvidenceLab model={model} view="runnable-trace" />;
}

export function Lcp05RagReleaseGateLab() {
  return <LangchainEvidenceLab model={model} view="release-gate" />;
}
