"use client";

import {
  LangchainEvidenceLab,
  type LangchainEvidenceModel,
} from "./langchain-evidence-lab";

const model = {
  unitId: "lcp-04",
  title: "第4章 链的构建",
  question: "组合链怎样保持输入输出类型、事件顺序、并发边界和失败恢复？",
  concepts: [
    "第4章 链的构建",
    "4.1 链的基本概念",
    "4.2 Runnable对象接口探究",
    "4.2.1 schema",
    "4.2.2 invoke",
    "4.2.3 stream",
    "4.2.4 batch",
    "4.2.5 astream_log",
    "4.3 LCEL高级特性",
    "4.3.1 ConfigurableField",
    "4.3.2 RunnableLambda",
    "4.3.3 RunnableBranch",
    "4.3.4 RunnablePassthrough",
    "4.3.5 RunnableParallel",
    "4.3.6 容错机制",
    "4.4 Chain接口",
    "4.4.1 Chain接口调用",
    "4.4.2 自定义Chain实现",
    "4.4.3 工具Chain",
    "4.5 专用Chain",
    "4.5.1 对话场景",
    "4.5.2 基于文档问答场景",
    "4.5.3 数据库问答场景",
    "4.5.4 API查询场景",
    "4.5.5 文本总结场景",
  ],
  invariant:
    "第4章 链的构建的包版本、输入输出schema、执行事件、评估结果与回退路径始终一致",
  fault: "把同步invoke通过等同于stream、batch、异步事件和并行分支都正确",
  artifact: "schema图、事件流、并发轨迹、重试记录与旧Chain迁移表",
  stages: [
    {
      name: "第4章 链的构建 · 依赖与输入",
      input:
        "在锁定的2024原书轨道和当前LangChain v1轨道上重放Runnable、LCEL高级组合、Chain接口与专用Chain",
      book2024:
        "冻结原书Runnable、LCEL高级组合、Chain接口与专用Chain对应的2024包版本、导入路径与示例输入",
      currentV1:
        "按当前官方文档冻结v1核心、集成包、LangGraph/LangSmith版本与输入schema",
      output: "第4章 链的构建的依赖锁、输入合同和版本泳道",
      check: "第4章 链的构建没有在同一运行中混用v0、langchain-classic与v1接口",
    },
    {
      name: "第4章 链的构建 · 组合与执行",
      input: "第4章 链的构建的锁定依赖、输入与预注册预测",
      book2024:
        "追踪Runnable的schema、invoke、stream、batch、配置、分支、并行与容错",
      currentV1:
        "当前v1将大量旧Chain移至langchain-classic；新开发需依据当前agent或LangGraph职责判断是否仍使用Runnable组合",
      output: "第4章 链的构建的状态事件、工具/检索调用与输出快照",
      check: "第4章 链的构建的每一步可由同一schema、版本、配置和顺序复算",
    },
    {
      name: "第4章 链的构建 · 迁移故障",
      input: "第4章 链的构建的参考轨迹与保持不变的模型、数据和评估集",
      book2024:
        "在原书轨道只注入“把同步invoke通过等同于stream、batch、异步事件和并行分支都正确”并保存首个失败事件",
      currentV1: "在v1轨道只注入同一迁移故障，检查命名空间、状态或事件语义分岔",
      output: "第4章 链的构建的首个不兼容点、传播路径与错误分类",
      check: "第4章 链的构建没有把多项依赖升级或模型切换归因给单一API",
    },
    {
      name: "第4章 链的构建 · 评估与回退",
      input: "第4章 链的构建的参考/故障trace、独立评估与回退快照",
      book2024: "恢复原书锁文件与接口合同，重放历史示例并保留历史边界",
      currentV1: "恢复v1锁文件与迁移适配，重放评估集并验证状态和输出",
      output: "第4章 链的构建的兼容结论、评估差分与发布/回退理由",
      check:
        "第4章 链的构建满足“第4章 链的构建的包版本、输入输出schema、执行事件、评估结果与回退路径始终一致”",
    },
  ],
  cases: [
    {
      name: "第4章 链的构建 · 原书参考",
      setup:
        "固定在锁定的2024原书轨道和当前LangChain v1轨道上重放Runnable、LCEL高级组合、Chain接口与专用Chain中的2024依赖、输入和事件顺序",
      prediction: "第4章 链的构建的历史轨迹应满足原书接口合同且不声称当前兼容",
      boundary: "第4章 链的构建的原书轨道只说明2024首版与锁定依赖",
    },
    {
      name: "第4章 链的构建 · v1参考",
      setup: "按当前官方文档固定v1依赖、输入schema、状态与评估",
      prediction:
        "第4章 链的构建应持续满足“第4章 链的构建的包版本、输入输出schema、执行事件、评估结果与回退路径始终一致”",
      boundary: "第4章 链的构建只覆盖核查日期的官方v1接口和已运行集成",
    },
    {
      name: "第4章 链的构建 · 迁移故障",
      setup:
        "保持其余条件不变，只注入“把同步invoke通过等同于stream、batch、异步事件和并行分支都正确”",
      prediction: "第4章 链的构建应定位首个不兼容事件并能从锁定快照回退",
      boundary: "第4章 链的构建的迁移结论不能外推到未测试provider、模型或部署",
    },
  ],
  referenceTrace: [
    "第4章 链的构建参考步骤1：原书轨道执行冻结原书Runnable、LCEL高级组合、Chain接口与专用Chain对应的2024包版本、导入路径与示例输入；当前v1轨道执行按当前官方文档冻结v1核心、集成包、LangGraph/LangSmith版本与输入schema；保存第4章 链的构建的依赖锁、输入合同和版本泳道并断言第4章 链的构建没有在同一运行中混用v0、langchain-classic与v1接口。",
    "第4章 链的构建参考步骤2：原书轨道执行追踪Runnable的schema、invoke、stream、batch、配置、分支、并行与容错；当前v1轨道执行当前v1将大量旧Chain移至langchain-classic；新开发需依据当前agent或LangGraph职责判断是否仍使用Runnable组合；保存第4章 链的构建的状态事件、工具/检索调用与输出快照并断言第4章 链的构建的每一步可由同一schema、版本、配置和顺序复算。",
    "第4章 链的构建参考步骤3：原书轨道执行在原书轨道只注入“把同步invoke通过等同于stream、batch、异步事件和并行分支都正确”并保存首个失败事件；当前v1轨道执行在v1轨道只注入同一迁移故障，检查命名空间、状态或事件语义分岔；保存第4章 链的构建的首个不兼容点、传播路径与错误分类并断言第4章 链的构建没有把多项依赖升级或模型切换归因给单一API。",
    "第4章 链的构建参考步骤4：原书轨道执行恢复原书锁文件与接口合同，重放历史示例并保留历史边界；当前v1轨道执行恢复v1锁文件与迁移适配，重放评估集并验证状态和输出；保存第4章 链的构建的兼容结论、评估差分与发布/回退理由并断言第4章 链的构建满足“第4章 链的构建的包版本、输入输出schema、执行事件、评估结果与回退路径始终一致”。",
  ],
  faultTrace: [
    "第4章 链的构建故障步骤1：保持在锁定的2024原书轨道和当前LangChain v1轨道上重放Runnable、LCEL高级组合、Chain接口与专用Chain不变，只检查“把同步invoke通过等同于stream、batch、异步事件和并行分支都正确”怎样改变第4章 链的构建的依赖锁、输入合同和版本泳道。",
    "第4章 链的构建故障步骤2：保持第4章 链的构建的锁定依赖、输入与预注册预测不变，只检查“把同步invoke通过等同于stream、batch、异步事件和并行分支都正确”怎样改变第4章 链的构建的状态事件、工具/检索调用与输出快照。",
    "第4章 链的构建故障步骤3：保持第4章 链的构建的参考轨迹与保持不变的模型、数据和评估集不变，只检查“把同步invoke通过等同于stream、batch、异步事件和并行分支都正确”怎样改变第4章 链的构建的首个不兼容点、传播路径与错误分类。",
    "第4章 链的构建故障步骤4：保持第4章 链的构建的参考/故障trace、独立评估与回退快照不变，只检查“把同步invoke通过等同于stream、batch、异步事件和并行分支都正确”怎样改变第4章 链的构建的兼容结论、评估差分与发布/回退理由。",
  ],
  gates: [
    {
      label: "书目与版本门",
      detail:
        "第4章 链的构建区分纸书目录、作者伴学材料、原书2024接口、当前v1文档和核查日期。",
    },
    {
      label: "schema与trace门",
      detail:
        "第4章 链的构建的依赖锁、输入输出schema、状态事件、工具/检索调用和错误可追溯。",
    },
    {
      label: "迁移与安全门",
      detail:
        "第4章 链的构建只注入“把同步invoke通过等同于stream、batch、异步事件和并行分支都正确”，检查权限、敏感数据、首个分岔和回退。",
    },
    {
      label: "评估与发布门",
      detail:
        "第4章 链的构建交付schema图、事件流、并发轨迹、重试记录与旧Chain迁移表，并报告通过、失败、未知和未测试集成。",
    },
  ],
} as const satisfies LangchainEvidenceModel;

export function Lcp04BuildingChainsVersionContractLab() {
  return <LangchainEvidenceLab model={model} view="version-contract" />;
}

export function Lcp04BuildingChainsRunnableTraceLab() {
  return <LangchainEvidenceLab model={model} view="runnable-trace" />;
}

export function Lcp04BuildingChainsReleaseGateLab() {
  return <LangchainEvidenceLab model={model} view="release-gate" />;
}
