"use client";

import {
  LangchainEvidenceLab,
  type LangchainEvidenceModel,
} from "./langchain-evidence-lab";

const model = {
  unitId: "lcp-07",
  title: "第7章 记忆组件",
  question:
    "记忆组件怎样证明保留了任务所需信息，同时控制泄露、污染和上下文预算？",
  concepts: [
    "第7章 记忆组件",
    "7.1 构建记忆系统",
    "7.2 记忆组件类型",
    "7.2.1 ConversationBufferMemory",
    "7.2.2 ConversationBufferWindowMemory",
    "7.2.3 ConversationEntityMemory",
    "7.2.4 ConversationKGMemory",
    "7.2.5 VectorStoreRetrieverMemory",
    "7.2.6 ConversationSummaryMemory",
    "7.2.7 ConversationSummaryBufferMemory",
    "7.2.8 VectorStoreRetrieverMemory",
    "7.3 记忆组件的应用",
    "7.3.1 将记忆组件接入代理",
    "7.3.2 自定义记忆组件",
    "7.3.3 不同记忆组件结合",
    "7.4 记忆组件实战",
    "7.4.1 方案说明",
    "7.4.2 代码实践",
  ],
  invariant:
    "第7章 记忆组件的包版本、输入输出schema、执行事件、评估结果与回退路径始终一致",
  fault: "把所有历史无筛选塞回提示，或把旧Memory类名当成当前持久化方案",
  artifact: "状态schema、写入日志、读取命中、遗忘策略与隐私删除测试",
  stages: [
    {
      name: "第7章 记忆组件 · 依赖与输入",
      input:
        "在锁定的2024原书轨道和当前LangChain v1轨道上重放记忆类型、代理接入、自定义组合与实战",
      book2024:
        "冻结原书记忆类型、代理接入、自定义组合与实战对应的2024包版本、导入路径与示例输入",
      currentV1:
        "按当前官方文档冻结v1核心、集成包、LangGraph/LangSmith版本与输入schema",
      output: "第7章 记忆组件的依赖锁、输入合同和版本泳道",
      check: "第7章 记忆组件没有在同一运行中混用v0、langchain-classic与v1接口",
    },
    {
      name: "第7章 记忆组件 · 组合与执行",
      input: "第7章 记忆组件的锁定依赖、输入与预注册预测",
      book2024: "区分短期状态、摘要、实体、知识图和向量检索记忆的写入与读取",
      currentV1:
        "当前agent状态和持久化应依据LangGraph与当前短期记忆接口建模；旧Conversation*Memory属于历史轨道",
      output: "第7章 记忆组件的状态事件、工具/检索调用与输出快照",
      check: "第7章 记忆组件的每一步可由同一schema、版本、配置和顺序复算",
    },
    {
      name: "第7章 记忆组件 · 迁移故障",
      input: "第7章 记忆组件的参考轨迹与保持不变的模型、数据和评估集",
      book2024:
        "在原书轨道只注入“把所有历史无筛选塞回提示，或把旧Memory类名当成当前持久化方案”并保存首个失败事件",
      currentV1: "在v1轨道只注入同一迁移故障，检查命名空间、状态或事件语义分岔",
      output: "第7章 记忆组件的首个不兼容点、传播路径与错误分类",
      check: "第7章 记忆组件没有把多项依赖升级或模型切换归因给单一API",
    },
    {
      name: "第7章 记忆组件 · 评估与回退",
      input: "第7章 记忆组件的参考/故障trace、独立评估与回退快照",
      book2024: "恢复原书锁文件与接口合同，重放历史示例并保留历史边界",
      currentV1: "恢复v1锁文件与迁移适配，重放评估集并验证状态和输出",
      output: "第7章 记忆组件的兼容结论、评估差分与发布/回退理由",
      check:
        "第7章 记忆组件满足“第7章 记忆组件的包版本、输入输出schema、执行事件、评估结果与回退路径始终一致”",
    },
  ],
  cases: [
    {
      name: "第7章 记忆组件 · 原书参考",
      setup:
        "固定在锁定的2024原书轨道和当前LangChain v1轨道上重放记忆类型、代理接入、自定义组合与实战中的2024依赖、输入和事件顺序",
      prediction: "第7章 记忆组件的历史轨迹应满足原书接口合同且不声称当前兼容",
      boundary: "第7章 记忆组件的原书轨道只说明2024首版与锁定依赖",
    },
    {
      name: "第7章 记忆组件 · v1参考",
      setup: "按当前官方文档固定v1依赖、输入schema、状态与评估",
      prediction:
        "第7章 记忆组件应持续满足“第7章 记忆组件的包版本、输入输出schema、执行事件、评估结果与回退路径始终一致”",
      boundary: "第7章 记忆组件只覆盖核查日期的官方v1接口和已运行集成",
    },
    {
      name: "第7章 记忆组件 · 迁移故障",
      setup:
        "保持其余条件不变，只注入“把所有历史无筛选塞回提示，或把旧Memory类名当成当前持久化方案”",
      prediction: "第7章 记忆组件应定位首个不兼容事件并能从锁定快照回退",
      boundary: "第7章 记忆组件的迁移结论不能外推到未测试provider、模型或部署",
    },
  ],
  referenceTrace: [
    "第7章 记忆组件参考步骤1：原书轨道执行冻结原书记忆类型、代理接入、自定义组合与实战对应的2024包版本、导入路径与示例输入；当前v1轨道执行按当前官方文档冻结v1核心、集成包、LangGraph/LangSmith版本与输入schema；保存第7章 记忆组件的依赖锁、输入合同和版本泳道并断言第7章 记忆组件没有在同一运行中混用v0、langchain-classic与v1接口。",
    "第7章 记忆组件参考步骤2：原书轨道执行区分短期状态、摘要、实体、知识图和向量检索记忆的写入与读取；当前v1轨道执行当前agent状态和持久化应依据LangGraph与当前短期记忆接口建模；旧Conversation*Memory属于历史轨道；保存第7章 记忆组件的状态事件、工具/检索调用与输出快照并断言第7章 记忆组件的每一步可由同一schema、版本、配置和顺序复算。",
    "第7章 记忆组件参考步骤3：原书轨道执行在原书轨道只注入“把所有历史无筛选塞回提示，或把旧Memory类名当成当前持久化方案”并保存首个失败事件；当前v1轨道执行在v1轨道只注入同一迁移故障，检查命名空间、状态或事件语义分岔；保存第7章 记忆组件的首个不兼容点、传播路径与错误分类并断言第7章 记忆组件没有把多项依赖升级或模型切换归因给单一API。",
    "第7章 记忆组件参考步骤4：原书轨道执行恢复原书锁文件与接口合同，重放历史示例并保留历史边界；当前v1轨道执行恢复v1锁文件与迁移适配，重放评估集并验证状态和输出；保存第7章 记忆组件的兼容结论、评估差分与发布/回退理由并断言第7章 记忆组件满足“第7章 记忆组件的包版本、输入输出schema、执行事件、评估结果与回退路径始终一致”。",
  ],
  faultTrace: [
    "第7章 记忆组件故障步骤1：保持在锁定的2024原书轨道和当前LangChain v1轨道上重放记忆类型、代理接入、自定义组合与实战不变，只检查“把所有历史无筛选塞回提示，或把旧Memory类名当成当前持久化方案”怎样改变第7章 记忆组件的依赖锁、输入合同和版本泳道。",
    "第7章 记忆组件故障步骤2：保持第7章 记忆组件的锁定依赖、输入与预注册预测不变，只检查“把所有历史无筛选塞回提示，或把旧Memory类名当成当前持久化方案”怎样改变第7章 记忆组件的状态事件、工具/检索调用与输出快照。",
    "第7章 记忆组件故障步骤3：保持第7章 记忆组件的参考轨迹与保持不变的模型、数据和评估集不变，只检查“把所有历史无筛选塞回提示，或把旧Memory类名当成当前持久化方案”怎样改变第7章 记忆组件的首个不兼容点、传播路径与错误分类。",
    "第7章 记忆组件故障步骤4：保持第7章 记忆组件的参考/故障trace、独立评估与回退快照不变，只检查“把所有历史无筛选塞回提示，或把旧Memory类名当成当前持久化方案”怎样改变第7章 记忆组件的兼容结论、评估差分与发布/回退理由。",
  ],
  gates: [
    {
      label: "书目与版本门",
      detail:
        "第7章 记忆组件区分纸书目录、作者伴学材料、原书2024接口、当前v1文档和核查日期。",
    },
    {
      label: "schema与trace门",
      detail:
        "第7章 记忆组件的依赖锁、输入输出schema、状态事件、工具/检索调用和错误可追溯。",
    },
    {
      label: "迁移与安全门",
      detail:
        "第7章 记忆组件只注入“把所有历史无筛选塞回提示，或把旧Memory类名当成当前持久化方案”，检查权限、敏感数据、首个分岔和回退。",
    },
    {
      label: "评估与发布门",
      detail:
        "第7章 记忆组件交付状态schema、写入日志、读取命中、遗忘策略与隐私删除测试，并报告通过、失败、未知和未测试集成。",
    },
  ],
} as const satisfies LangchainEvidenceModel;

export function Lcp07MemoryVersionContractLab() {
  return <LangchainEvidenceLab model={model} view="version-contract" />;
}

export function Lcp07MemoryRunnableTraceLab() {
  return <LangchainEvidenceLab model={model} view="runnable-trace" />;
}

export function Lcp07MemoryReleaseGateLab() {
  return <LangchainEvidenceLab model={model} view="release-gate" />;
}
