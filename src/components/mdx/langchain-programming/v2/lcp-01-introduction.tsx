"use client";

import {
  LangchainEvidenceLab,
  type LangchainEvidenceModel,
} from "./langchain-evidence-lab";

const model = {
  unitId: "lcp-01",
  title: "第1章 LangChain简介",
  question: "LangChain抽象解决什么组合问题，哪些旧模块边界在v1已经重构？",
  concepts: [
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
  ],
  invariant:
    "第1章 LangChain简介的包版本、输入输出schema、执行事件、评估结果与回退路径始终一致",
  fault: "只替换包名便宣称模型I/O、链、记忆、代理和回调语义完全兼容",
  artifact: "模块责任图、旧新命名空间差分、最小调用轨迹与框架选择表",
  stages: [
    {
      name: "第1章 LangChain简介 · 依赖与输入",
      input:
        "在锁定的2024原书轨道和当前LangChain v1轨道上重放产生背景、核心模块、框架比较与当前生态",
      book2024:
        "冻结原书产生背景、核心模块、框架比较与当前生态对应的2024包版本、导入路径与示例输入",
      currentV1:
        "按当前官方文档冻结v1核心、集成包、LangGraph/LangSmith版本与输入schema",
      output: "第1章 LangChain简介的依赖锁、输入合同和版本泳道",
      check:
        "第1章 LangChain简介没有在同一运行中混用v0、langchain-classic与v1接口",
    },
    {
      name: "第1章 LangChain简介 · 组合与执行",
      input: "第1章 LangChain简介的锁定依赖、输入与预注册预测",
      book2024:
        "比较2024年六大模块叙事与当前agent harness、LangGraph和集成包结构",
      currentV1:
        "当前总览以create_agent、标准模型接口、中间件、LangGraph和LangSmith组织职责，不能照搬旧六模块目录",
      output: "第1章 LangChain简介的状态事件、工具/检索调用与输出快照",
      check: "第1章 LangChain简介的每一步可由同一schema、版本、配置和顺序复算",
    },
    {
      name: "第1章 LangChain简介 · 迁移故障",
      input: "第1章 LangChain简介的参考轨迹与保持不变的模型、数据和评估集",
      book2024:
        "在原书轨道只注入“只替换包名便宣称模型I/O、链、记忆、代理和回调语义完全兼容”并保存首个失败事件",
      currentV1: "在v1轨道只注入同一迁移故障，检查命名空间、状态或事件语义分岔",
      output: "第1章 LangChain简介的首个不兼容点、传播路径与错误分类",
      check: "第1章 LangChain简介没有把多项依赖升级或模型切换归因给单一API",
    },
    {
      name: "第1章 LangChain简介 · 评估与回退",
      input: "第1章 LangChain简介的参考/故障trace、独立评估与回退快照",
      book2024: "恢复原书锁文件与接口合同，重放历史示例并保留历史边界",
      currentV1: "恢复v1锁文件与迁移适配，重放评估集并验证状态和输出",
      output: "第1章 LangChain简介的兼容结论、评估差分与发布/回退理由",
      check:
        "第1章 LangChain简介满足“第1章 LangChain简介的包版本、输入输出schema、执行事件、评估结果与回退路径始终一致”",
    },
  ],
  cases: [
    {
      name: "第1章 LangChain简介 · 原书参考",
      setup:
        "固定在锁定的2024原书轨道和当前LangChain v1轨道上重放产生背景、核心模块、框架比较与当前生态中的2024依赖、输入和事件顺序",
      prediction:
        "第1章 LangChain简介的历史轨迹应满足原书接口合同且不声称当前兼容",
      boundary: "第1章 LangChain简介的原书轨道只说明2024首版与锁定依赖",
    },
    {
      name: "第1章 LangChain简介 · v1参考",
      setup: "按当前官方文档固定v1依赖、输入schema、状态与评估",
      prediction:
        "第1章 LangChain简介应持续满足“第1章 LangChain简介的包版本、输入输出schema、执行事件、评估结果与回退路径始终一致”",
      boundary: "第1章 LangChain简介只覆盖核查日期的官方v1接口和已运行集成",
    },
    {
      name: "第1章 LangChain简介 · 迁移故障",
      setup:
        "保持其余条件不变，只注入“只替换包名便宣称模型I/O、链、记忆、代理和回调语义完全兼容”",
      prediction: "第1章 LangChain简介应定位首个不兼容事件并能从锁定快照回退",
      boundary:
        "第1章 LangChain简介的迁移结论不能外推到未测试provider、模型或部署",
    },
  ],
  referenceTrace: [
    "第1章 LangChain简介参考步骤1：原书轨道执行冻结原书产生背景、核心模块、框架比较与当前生态对应的2024包版本、导入路径与示例输入；当前v1轨道执行按当前官方文档冻结v1核心、集成包、LangGraph/LangSmith版本与输入schema；保存第1章 LangChain简介的依赖锁、输入合同和版本泳道并断言第1章 LangChain简介没有在同一运行中混用v0、langchain-classic与v1接口。",
    "第1章 LangChain简介参考步骤2：原书轨道执行比较2024年六大模块叙事与当前agent harness、LangGraph和集成包结构；当前v1轨道执行当前总览以create_agent、标准模型接口、中间件、LangGraph和LangSmith组织职责，不能照搬旧六模块目录；保存第1章 LangChain简介的状态事件、工具/检索调用与输出快照并断言第1章 LangChain简介的每一步可由同一schema、版本、配置和顺序复算。",
    "第1章 LangChain简介参考步骤3：原书轨道执行在原书轨道只注入“只替换包名便宣称模型I/O、链、记忆、代理和回调语义完全兼容”并保存首个失败事件；当前v1轨道执行在v1轨道只注入同一迁移故障，检查命名空间、状态或事件语义分岔；保存第1章 LangChain简介的首个不兼容点、传播路径与错误分类并断言第1章 LangChain简介没有把多项依赖升级或模型切换归因给单一API。",
    "第1章 LangChain简介参考步骤4：原书轨道执行恢复原书锁文件与接口合同，重放历史示例并保留历史边界；当前v1轨道执行恢复v1锁文件与迁移适配，重放评估集并验证状态和输出；保存第1章 LangChain简介的兼容结论、评估差分与发布/回退理由并断言第1章 LangChain简介满足“第1章 LangChain简介的包版本、输入输出schema、执行事件、评估结果与回退路径始终一致”。",
  ],
  faultTrace: [
    "第1章 LangChain简介故障步骤1：保持在锁定的2024原书轨道和当前LangChain v1轨道上重放产生背景、核心模块、框架比较与当前生态不变，只检查“只替换包名便宣称模型I/O、链、记忆、代理和回调语义完全兼容”怎样改变第1章 LangChain简介的依赖锁、输入合同和版本泳道。",
    "第1章 LangChain简介故障步骤2：保持第1章 LangChain简介的锁定依赖、输入与预注册预测不变，只检查“只替换包名便宣称模型I/O、链、记忆、代理和回调语义完全兼容”怎样改变第1章 LangChain简介的状态事件、工具/检索调用与输出快照。",
    "第1章 LangChain简介故障步骤3：保持第1章 LangChain简介的参考轨迹与保持不变的模型、数据和评估集不变，只检查“只替换包名便宣称模型I/O、链、记忆、代理和回调语义完全兼容”怎样改变第1章 LangChain简介的首个不兼容点、传播路径与错误分类。",
    "第1章 LangChain简介故障步骤4：保持第1章 LangChain简介的参考/故障trace、独立评估与回退快照不变，只检查“只替换包名便宣称模型I/O、链、记忆、代理和回调语义完全兼容”怎样改变第1章 LangChain简介的兼容结论、评估差分与发布/回退理由。",
  ],
  gates: [
    {
      label: "书目与版本门",
      detail:
        "第1章 LangChain简介区分纸书目录、作者伴学材料、原书2024接口、当前v1文档和核查日期。",
    },
    {
      label: "schema与trace门",
      detail:
        "第1章 LangChain简介的依赖锁、输入输出schema、状态事件、工具/检索调用和错误可追溯。",
    },
    {
      label: "迁移与安全门",
      detail:
        "第1章 LangChain简介只注入“只替换包名便宣称模型I/O、链、记忆、代理和回调语义完全兼容”，检查权限、敏感数据、首个分岔和回退。",
    },
    {
      label: "评估与发布门",
      detail:
        "第1章 LangChain简介交付模块责任图、旧新命名空间差分、最小调用轨迹与框架选择表，并报告通过、失败、未知和未测试集成。",
    },
  ],
} as const satisfies LangchainEvidenceModel;

export function Lcp01IntroductionVersionContractLab() {
  return <LangchainEvidenceLab model={model} view="version-contract" />;
}

export function Lcp01IntroductionRunnableTraceLab() {
  return <LangchainEvidenceLab model={model} view="runnable-trace" />;
}

export function Lcp01IntroductionReleaseGateLab() {
  return <LangchainEvidenceLab model={model} view="release-gate" />;
}
