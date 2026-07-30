"use client";

import {
  LangchainEvidenceLab,
  type LangchainEvidenceModel,
} from "./langchain-evidence-lab";

const model = {
  unitId: "learningMap",
  title: "《LangChain编程》原书/v1双轨学习地图",
  question: "怎样覆盖146个正式目录坐标，同时把稳定机制和易变API分开治理？",
  concepts: [
    "前言",
    "第1章 LangChain简介",
    "1.1 LangChain的产生背景",
    "1.1.1 大模型技术浪潮",
    "1.1.2 大模型时代的开发范式",
    "1.1.3 LangChain框架的爆火",
    "1.2 LangChain核心概念和模块",
    "1.2.1 模型I/O模块",
    "1.2.2 检索模块",
    "1.2.3 链模块",
    "1.2.4 记忆模块",
    "1.2.5 代理模块",
    "1.2.6 回调模块",
    "1.3 LangChain与其他框架的比较",
    "1.3.1 框架介绍",
    "1.3.2 框架比较",
    "1.3.3 小结",
    "第2章 LangChain初体验",
    "2.1 开发环境准备",
    "2.1.1 管理工具安装",
    "2.1.2 源码安装",
    "2.1.3 其他库安装",
    "2.2 快速开始",
    "2.2.1 语言模型",
    "2.2.2 提示模板",
    "2.2.3 输出解析器",
    "2.2.4 使用LCEL进行组合",
    "2.2.5 使用LangSmith进行观测",
    "2.2.6 使用LangServe提供服务",
    "2.3 最佳安全实践",
    "第3章 模型输入与输出",
    "3.1 大模型原理解释",
    "3.1.1 为什么模型输出不可控",
    "3.1.2 输入对输出的影响",
    "3.2 提示模板组件",
    "3.2.1 基础提示模板",
    "3.2.2 自定义提示模板",
    "3.2.3 使用FewShotPromptTemplate",
    "3.2.4 示例选择器",
    "3.3 大模型接口",
    "3.3.1 聊天模型",
    "3.3.2 聊天模型提示词的构建",
    "3.3.3 定制大模型接口",
    "3.3.4 扩展模型接口",
    "3.4 输出解析器",
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
    "第6章 智能代理设计",
    "6.1 智能代理的概念",
    "6.2 LangChain中的代理",
    "6.2.1 LLM驱动的智能代理",
    "6.2.2 LangChain中的代理",
    "6.2.3 代理的类型",
    "6.2.4 自定义代理工具",
    "6.3 设计并实现一个多模态代理",
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
    "第8章 回调机制",
    "8.1 回调处理器",
    "8.2 使用回调的两种方式",
    "8.2.1 构造器回调",
    "8.2.2 请求回调",
    "8.3 实现可观测性插件",
    "第9章 构建多模态机器人",
    "9.1 需求思考与设计",
    "9.1.1 需求分析",
    "9.1.2 应用设计",
    "9.1.3 Slack应用配置",
    "9.2 利用LangChain开发应用",
    "9.2.1 构建Slack事件接口",
    "9.2.2 消息处理框架",
    "9.2.3 实现多模态代理",
    "9.3 应用监控和调优",
    "9.3.1 应用监控",
    "9.3.2 模型效果评估",
    "9.3.3 模型备选服务",
    "9.3.4 模型内容安全",
    "9.3.5 应用部署",
    "第10章 社区和资源",
    "10.1 LangChain社区介绍",
    "10.1.1 官方博客",
    "10.1.2 项目代码与文档",
    "10.1.3 社区贡献",
    "10.1.4 参与社区活动",
    "10.2 资源和工具推荐",
    "10.2.1 模板",
    "10.2.2 LangServe",
    "10.2.3 LangSmith",
    "10.2.4 教程用例",
    "10.3 LangChain的未来展望",
    "10.3.1 生态系统概览",
    "10.3.2 变化与重构",
    "10.3.3 发展计划",
  ],
  invariant:
    "《LangChain编程》原书/v1双轨学习地图的包版本、输入输出schema、执行事件、评估结果与回退路径始终一致",
  fault: "把目录覆盖率当成代码可运行率，或在同一页混用v0、classic与v1接口",
  artifact: "146坐标矩阵、版本泳道、依赖图与迁移检查点",
  stages: [
    {
      name: "《LangChain编程》原书/v1双轨学习地图 · 依赖与输入",
      input:
        "在锁定的2024原书轨道和当前LangChain v1轨道上重放全书目录、稳定机制、易变接口与发布顺序",
      book2024:
        "冻结原书全书目录、稳定机制、易变接口与发布顺序对应的2024包版本、导入路径与示例输入",
      currentV1:
        "按当前官方文档冻结v1核心、集成包、LangGraph/LangSmith版本与输入schema",
      output:
        "《LangChain编程》原书/v1双轨学习地图的依赖锁、输入合同和版本泳道",
      check:
        "《LangChain编程》原书/v1双轨学习地图没有在同一运行中混用v0、langchain-classic与v1接口",
    },
    {
      name: "《LangChain编程》原书/v1双轨学习地图 · 组合与执行",
      input: "《LangChain编程》原书/v1双轨学习地图的锁定依赖、输入与预注册预测",
      book2024: "把前言、10章和135个节/小节组织成原书与v1双轨学习图",
      currentV1:
        "当前v1轨道以官方总览和迁移指南为准，原书2024轨道保持原貌并禁止跨轨拼接",
      output:
        "《LangChain编程》原书/v1双轨学习地图的状态事件、工具/检索调用与输出快照",
      check:
        "《LangChain编程》原书/v1双轨学习地图的每一步可由同一schema、版本、配置和顺序复算",
    },
    {
      name: "《LangChain编程》原书/v1双轨学习地图 · 迁移故障",
      input:
        "《LangChain编程》原书/v1双轨学习地图的参考轨迹与保持不变的模型、数据和评估集",
      book2024:
        "在原书轨道只注入“把目录覆盖率当成代码可运行率，或在同一页混用v0、classic与v1接口”并保存首个失败事件",
      currentV1: "在v1轨道只注入同一迁移故障，检查命名空间、状态或事件语义分岔",
      output:
        "《LangChain编程》原书/v1双轨学习地图的首个不兼容点、传播路径与错误分类",
      check:
        "《LangChain编程》原书/v1双轨学习地图没有把多项依赖升级或模型切换归因给单一API",
    },
    {
      name: "《LangChain编程》原书/v1双轨学习地图 · 评估与回退",
      input:
        "《LangChain编程》原书/v1双轨学习地图的参考/故障trace、独立评估与回退快照",
      book2024: "恢复原书锁文件与接口合同，重放历史示例并保留历史边界",
      currentV1: "恢复v1锁文件与迁移适配，重放评估集并验证状态和输出",
      output:
        "《LangChain编程》原书/v1双轨学习地图的兼容结论、评估差分与发布/回退理由",
      check:
        "《LangChain编程》原书/v1双轨学习地图满足“《LangChain编程》原书/v1双轨学习地图的包版本、输入输出schema、执行事件、评估结果与回退路径始终一致”",
    },
  ],
  cases: [
    {
      name: "《LangChain编程》原书/v1双轨学习地图 · 原书参考",
      setup:
        "固定在锁定的2024原书轨道和当前LangChain v1轨道上重放全书目录、稳定机制、易变接口与发布顺序中的2024依赖、输入和事件顺序",
      prediction:
        "《LangChain编程》原书/v1双轨学习地图的历史轨迹应满足原书接口合同且不声称当前兼容",
      boundary:
        "《LangChain编程》原书/v1双轨学习地图的原书轨道只说明2024首版与锁定依赖",
    },
    {
      name: "《LangChain编程》原书/v1双轨学习地图 · v1参考",
      setup: "按当前官方文档固定v1依赖、输入schema、状态与评估",
      prediction:
        "《LangChain编程》原书/v1双轨学习地图应持续满足“《LangChain编程》原书/v1双轨学习地图的包版本、输入输出schema、执行事件、评估结果与回退路径始终一致”",
      boundary:
        "《LangChain编程》原书/v1双轨学习地图只覆盖核查日期的官方v1接口和已运行集成",
    },
    {
      name: "《LangChain编程》原书/v1双轨学习地图 · 迁移故障",
      setup:
        "保持其余条件不变，只注入“把目录覆盖率当成代码可运行率，或在同一页混用v0、classic与v1接口”",
      prediction:
        "《LangChain编程》原书/v1双轨学习地图应定位首个不兼容事件并能从锁定快照回退",
      boundary:
        "《LangChain编程》原书/v1双轨学习地图的迁移结论不能外推到未测试provider、模型或部署",
    },
  ],
  referenceTrace: [
    "《LangChain编程》原书/v1双轨学习地图参考步骤1：原书轨道执行冻结原书全书目录、稳定机制、易变接口与发布顺序对应的2024包版本、导入路径与示例输入；当前v1轨道执行按当前官方文档冻结v1核心、集成包、LangGraph/LangSmith版本与输入schema；保存《LangChain编程》原书/v1双轨学习地图的依赖锁、输入合同和版本泳道并断言《LangChain编程》原书/v1双轨学习地图没有在同一运行中混用v0、langchain-classic与v1接口。",
    "《LangChain编程》原书/v1双轨学习地图参考步骤2：原书轨道执行把前言、10章和135个节/小节组织成原书与v1双轨学习图；当前v1轨道执行当前v1轨道以官方总览和迁移指南为准，原书2024轨道保持原貌并禁止跨轨拼接；保存《LangChain编程》原书/v1双轨学习地图的状态事件、工具/检索调用与输出快照并断言《LangChain编程》原书/v1双轨学习地图的每一步可由同一schema、版本、配置和顺序复算。",
    "《LangChain编程》原书/v1双轨学习地图参考步骤3：原书轨道执行在原书轨道只注入“把目录覆盖率当成代码可运行率，或在同一页混用v0、classic与v1接口”并保存首个失败事件；当前v1轨道执行在v1轨道只注入同一迁移故障，检查命名空间、状态或事件语义分岔；保存《LangChain编程》原书/v1双轨学习地图的首个不兼容点、传播路径与错误分类并断言《LangChain编程》原书/v1双轨学习地图没有把多项依赖升级或模型切换归因给单一API。",
    "《LangChain编程》原书/v1双轨学习地图参考步骤4：原书轨道执行恢复原书锁文件与接口合同，重放历史示例并保留历史边界；当前v1轨道执行恢复v1锁文件与迁移适配，重放评估集并验证状态和输出；保存《LangChain编程》原书/v1双轨学习地图的兼容结论、评估差分与发布/回退理由并断言《LangChain编程》原书/v1双轨学习地图满足“《LangChain编程》原书/v1双轨学习地图的包版本、输入输出schema、执行事件、评估结果与回退路径始终一致”。",
  ],
  faultTrace: [
    "《LangChain编程》原书/v1双轨学习地图故障步骤1：保持在锁定的2024原书轨道和当前LangChain v1轨道上重放全书目录、稳定机制、易变接口与发布顺序不变，只检查“把目录覆盖率当成代码可运行率，或在同一页混用v0、classic与v1接口”怎样改变《LangChain编程》原书/v1双轨学习地图的依赖锁、输入合同和版本泳道。",
    "《LangChain编程》原书/v1双轨学习地图故障步骤2：保持《LangChain编程》原书/v1双轨学习地图的锁定依赖、输入与预注册预测不变，只检查“把目录覆盖率当成代码可运行率，或在同一页混用v0、classic与v1接口”怎样改变《LangChain编程》原书/v1双轨学习地图的状态事件、工具/检索调用与输出快照。",
    "《LangChain编程》原书/v1双轨学习地图故障步骤3：保持《LangChain编程》原书/v1双轨学习地图的参考轨迹与保持不变的模型、数据和评估集不变，只检查“把目录覆盖率当成代码可运行率，或在同一页混用v0、classic与v1接口”怎样改变《LangChain编程》原书/v1双轨学习地图的首个不兼容点、传播路径与错误分类。",
    "《LangChain编程》原书/v1双轨学习地图故障步骤4：保持《LangChain编程》原书/v1双轨学习地图的参考/故障trace、独立评估与回退快照不变，只检查“把目录覆盖率当成代码可运行率，或在同一页混用v0、classic与v1接口”怎样改变《LangChain编程》原书/v1双轨学习地图的兼容结论、评估差分与发布/回退理由。",
  ],
  gates: [
    {
      label: "书目与版本门",
      detail:
        "《LangChain编程》原书/v1双轨学习地图区分纸书目录、作者伴学材料、原书2024接口、当前v1文档和核查日期。",
    },
    {
      label: "schema与trace门",
      detail:
        "《LangChain编程》原书/v1双轨学习地图的依赖锁、输入输出schema、状态事件、工具/检索调用和错误可追溯。",
    },
    {
      label: "迁移与安全门",
      detail:
        "《LangChain编程》原书/v1双轨学习地图只注入“把目录覆盖率当成代码可运行率，或在同一页混用v0、classic与v1接口”，检查权限、敏感数据、首个分岔和回退。",
    },
    {
      label: "评估与发布门",
      detail:
        "《LangChain编程》原书/v1双轨学习地图交付146坐标矩阵、版本泳道、依赖图与迁移检查点，并报告通过、失败、未知和未测试集成。",
    },
  ],
} as const satisfies LangchainEvidenceModel;

export function LcpOfficialLearningMapVersionContractLab() {
  return <LangchainEvidenceLab model={model} view="version-contract" />;
}

export function LcpOfficialLearningMapRunnableTraceLab() {
  return <LangchainEvidenceLab model={model} view="runnable-trace" />;
}

export function LcpOfficialLearningMapReleaseGateLab() {
  return <LangchainEvidenceLab model={model} view="release-gate" />;
}
