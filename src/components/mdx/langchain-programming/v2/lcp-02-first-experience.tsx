"use client";

import {
  LangchainEvidenceLab,
  type LangchainEvidenceModel,
} from "./langchain-evidence-lab";

const model = {
  unitId: "lcp-02",
  title: "第2章 LangChain初体验",
  question: "快速开始怎样从一次成功调用升级为可复现、可观测且安全的最小服务？",
  concepts: [
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
  ],
  invariant:
    "第2章 LangChain初体验的包版本、输入输出schema、执行事件、评估结果与回退路径始终一致",
  fault: "使用未锁定最新版依赖和真实密钥，成功一次后隐藏trace与失败输出",
  artifact: "环境锁、输入输出schema、trace、服务合同与密钥泄露检查",
  stages: [
    {
      name: "第2章 LangChain初体验 · 依赖与输入",
      input:
        "在锁定的2024原书轨道和当前LangChain v1轨道上重放环境、快速开始、LCEL、LangSmith、LangServe与安全",
      book2024:
        "冻结原书环境、快速开始、LCEL、LangSmith、LangServe与安全对应的2024包版本、导入路径与示例输入",
      currentV1:
        "按当前官方文档冻结v1核心、集成包、LangGraph/LangSmith版本与输入schema",
      output: "第2章 LangChain初体验的依赖锁、输入合同和版本泳道",
      check:
        "第2章 LangChain初体验没有在同一运行中混用v0、langchain-classic与v1接口",
    },
    {
      name: "第2章 LangChain初体验 · 组合与执行",
      input: "第2章 LangChain初体验的锁定依赖、输入与预注册预测",
      book2024: "冻结Python、包锁、密钥边界并重放模型—提示—解析—观测—服务链",
      currentV1:
        "当前v1示例应从标准模型接口或create_agent开始；旧LCEL与服务示例需按包版本和迁移指南单独验证",
      output: "第2章 LangChain初体验的状态事件、工具/检索调用与输出快照",
      check:
        "第2章 LangChain初体验的每一步可由同一schema、版本、配置和顺序复算",
    },
    {
      name: "第2章 LangChain初体验 · 迁移故障",
      input: "第2章 LangChain初体验的参考轨迹与保持不变的模型、数据和评估集",
      book2024:
        "在原书轨道只注入“使用未锁定最新版依赖和真实密钥，成功一次后隐藏trace与失败输出”并保存首个失败事件",
      currentV1: "在v1轨道只注入同一迁移故障，检查命名空间、状态或事件语义分岔",
      output: "第2章 LangChain初体验的首个不兼容点、传播路径与错误分类",
      check: "第2章 LangChain初体验没有把多项依赖升级或模型切换归因给单一API",
    },
    {
      name: "第2章 LangChain初体验 · 评估与回退",
      input: "第2章 LangChain初体验的参考/故障trace、独立评估与回退快照",
      book2024: "恢复原书锁文件与接口合同，重放历史示例并保留历史边界",
      currentV1: "恢复v1锁文件与迁移适配，重放评估集并验证状态和输出",
      output: "第2章 LangChain初体验的兼容结论、评估差分与发布/回退理由",
      check:
        "第2章 LangChain初体验满足“第2章 LangChain初体验的包版本、输入输出schema、执行事件、评估结果与回退路径始终一致”",
    },
  ],
  cases: [
    {
      name: "第2章 LangChain初体验 · 原书参考",
      setup:
        "固定在锁定的2024原书轨道和当前LangChain v1轨道上重放环境、快速开始、LCEL、LangSmith、LangServe与安全中的2024依赖、输入和事件顺序",
      prediction:
        "第2章 LangChain初体验的历史轨迹应满足原书接口合同且不声称当前兼容",
      boundary: "第2章 LangChain初体验的原书轨道只说明2024首版与锁定依赖",
    },
    {
      name: "第2章 LangChain初体验 · v1参考",
      setup: "按当前官方文档固定v1依赖、输入schema、状态与评估",
      prediction:
        "第2章 LangChain初体验应持续满足“第2章 LangChain初体验的包版本、输入输出schema、执行事件、评估结果与回退路径始终一致”",
      boundary: "第2章 LangChain初体验只覆盖核查日期的官方v1接口和已运行集成",
    },
    {
      name: "第2章 LangChain初体验 · 迁移故障",
      setup:
        "保持其余条件不变，只注入“使用未锁定最新版依赖和真实密钥，成功一次后隐藏trace与失败输出”",
      prediction: "第2章 LangChain初体验应定位首个不兼容事件并能从锁定快照回退",
      boundary:
        "第2章 LangChain初体验的迁移结论不能外推到未测试provider、模型或部署",
    },
  ],
  referenceTrace: [
    "第2章 LangChain初体验参考步骤1：原书轨道执行冻结原书环境、快速开始、LCEL、LangSmith、LangServe与安全对应的2024包版本、导入路径与示例输入；当前v1轨道执行按当前官方文档冻结v1核心、集成包、LangGraph/LangSmith版本与输入schema；保存第2章 LangChain初体验的依赖锁、输入合同和版本泳道并断言第2章 LangChain初体验没有在同一运行中混用v0、langchain-classic与v1接口。",
    "第2章 LangChain初体验参考步骤2：原书轨道执行冻结Python、包锁、密钥边界并重放模型—提示—解析—观测—服务链；当前v1轨道执行当前v1示例应从标准模型接口或create_agent开始；旧LCEL与服务示例需按包版本和迁移指南单独验证；保存第2章 LangChain初体验的状态事件、工具/检索调用与输出快照并断言第2章 LangChain初体验的每一步可由同一schema、版本、配置和顺序复算。",
    "第2章 LangChain初体验参考步骤3：原书轨道执行在原书轨道只注入“使用未锁定最新版依赖和真实密钥，成功一次后隐藏trace与失败输出”并保存首个失败事件；当前v1轨道执行在v1轨道只注入同一迁移故障，检查命名空间、状态或事件语义分岔；保存第2章 LangChain初体验的首个不兼容点、传播路径与错误分类并断言第2章 LangChain初体验没有把多项依赖升级或模型切换归因给单一API。",
    "第2章 LangChain初体验参考步骤4：原书轨道执行恢复原书锁文件与接口合同，重放历史示例并保留历史边界；当前v1轨道执行恢复v1锁文件与迁移适配，重放评估集并验证状态和输出；保存第2章 LangChain初体验的兼容结论、评估差分与发布/回退理由并断言第2章 LangChain初体验满足“第2章 LangChain初体验的包版本、输入输出schema、执行事件、评估结果与回退路径始终一致”。",
  ],
  faultTrace: [
    "第2章 LangChain初体验故障步骤1：保持在锁定的2024原书轨道和当前LangChain v1轨道上重放环境、快速开始、LCEL、LangSmith、LangServe与安全不变，只检查“使用未锁定最新版依赖和真实密钥，成功一次后隐藏trace与失败输出”怎样改变第2章 LangChain初体验的依赖锁、输入合同和版本泳道。",
    "第2章 LangChain初体验故障步骤2：保持第2章 LangChain初体验的锁定依赖、输入与预注册预测不变，只检查“使用未锁定最新版依赖和真实密钥，成功一次后隐藏trace与失败输出”怎样改变第2章 LangChain初体验的状态事件、工具/检索调用与输出快照。",
    "第2章 LangChain初体验故障步骤3：保持第2章 LangChain初体验的参考轨迹与保持不变的模型、数据和评估集不变，只检查“使用未锁定最新版依赖和真实密钥，成功一次后隐藏trace与失败输出”怎样改变第2章 LangChain初体验的首个不兼容点、传播路径与错误分类。",
    "第2章 LangChain初体验故障步骤4：保持第2章 LangChain初体验的参考/故障trace、独立评估与回退快照不变，只检查“使用未锁定最新版依赖和真实密钥，成功一次后隐藏trace与失败输出”怎样改变第2章 LangChain初体验的兼容结论、评估差分与发布/回退理由。",
  ],
  gates: [
    {
      label: "书目与版本门",
      detail:
        "第2章 LangChain初体验区分纸书目录、作者伴学材料、原书2024接口、当前v1文档和核查日期。",
    },
    {
      label: "schema与trace门",
      detail:
        "第2章 LangChain初体验的依赖锁、输入输出schema、状态事件、工具/检索调用和错误可追溯。",
    },
    {
      label: "迁移与安全门",
      detail:
        "第2章 LangChain初体验只注入“使用未锁定最新版依赖和真实密钥，成功一次后隐藏trace与失败输出”，检查权限、敏感数据、首个分岔和回退。",
    },
    {
      label: "评估与发布门",
      detail:
        "第2章 LangChain初体验交付环境锁、输入输出schema、trace、服务合同与密钥泄露检查，并报告通过、失败、未知和未测试集成。",
    },
  ],
} as const satisfies LangchainEvidenceModel;

export function Lcp02FirstExperienceVersionContractLab() {
  return <LangchainEvidenceLab model={model} view="version-contract" />;
}

export function Lcp02FirstExperienceRunnableTraceLab() {
  return <LangchainEvidenceLab model={model} view="runnable-trace" />;
}

export function Lcp02FirstExperienceReleaseGateLab() {
  return <LangchainEvidenceLab model={model} view="release-gate" />;
}
