"use client";

import {
  LangchainEvidenceLab,
  type LangchainEvidenceModel,
} from "./langchain-evidence-lab";

const model = {
  unitId: "lcp-preface",
  title: "前言",
  question: "怎样学习一本快速过时的框架书，同时保存原书语义并验证当前接口？",
  concepts: ["前言"],
  invariant:
    "前言的包版本、输入输出schema、执行事件、评估结果与回退路径始终一致",
  fault: "把作者开放伴学站当成纸书逐页全文，或把2024年API写成当前默认",
  artifact: "版本时间轴、来源类型表、兼容矩阵与迁移决策记录",
  stages: [
    {
      name: "前言 · 依赖与输入",
      input:
        "在锁定的2024原书轨道和当前LangChain v1轨道上重放原书范围、伴学材料、当前文档与版本治理",
      book2024:
        "冻结原书原书范围、伴学材料、当前文档与版本治理对应的2024包版本、导入路径与示例输入",
      currentV1:
        "按当前官方文档冻结v1核心、集成包、LangGraph/LangSmith版本与输入schema",
      output: "前言的依赖锁、输入合同和版本泳道",
      check: "前言没有在同一运行中混用v0、langchain-classic与v1接口",
    },
    {
      name: "前言 · 组合与执行",
      input: "前言的锁定依赖、输入与预注册预测",
      book2024: "把2024年原书、作者伴学材料和当前LangChain v1放进可追溯时间轴",
      currentV1:
        "当前v1以精简agent构建块为主，旧Chain与检索接口按迁移指南进入langchain-classic或新编排层",
      output: "前言的状态事件、工具/检索调用与输出快照",
      check: "前言的每一步可由同一schema、版本、配置和顺序复算",
    },
    {
      name: "前言 · 迁移故障",
      input: "前言的参考轨迹与保持不变的模型、数据和评估集",
      book2024:
        "在原书轨道只注入“把作者开放伴学站当成纸书逐页全文，或把2024年API写成当前默认”并保存首个失败事件",
      currentV1: "在v1轨道只注入同一迁移故障，检查命名空间、状态或事件语义分岔",
      output: "前言的首个不兼容点、传播路径与错误分类",
      check: "前言没有把多项依赖升级或模型切换归因给单一API",
    },
    {
      name: "前言 · 评估与回退",
      input: "前言的参考/故障trace、独立评估与回退快照",
      book2024: "恢复原书锁文件与接口合同，重放历史示例并保留历史边界",
      currentV1: "恢复v1锁文件与迁移适配，重放评估集并验证状态和输出",
      output: "前言的兼容结论、评估差分与发布/回退理由",
      check:
        "前言满足“前言的包版本、输入输出schema、执行事件、评估结果与回退路径始终一致”",
    },
  ],
  cases: [
    {
      name: "前言 · 原书参考",
      setup:
        "固定在锁定的2024原书轨道和当前LangChain v1轨道上重放原书范围、伴学材料、当前文档与版本治理中的2024依赖、输入和事件顺序",
      prediction: "前言的历史轨迹应满足原书接口合同且不声称当前兼容",
      boundary: "前言的原书轨道只说明2024首版与锁定依赖",
    },
    {
      name: "前言 · v1参考",
      setup: "按当前官方文档固定v1依赖、输入schema、状态与评估",
      prediction:
        "前言应持续满足“前言的包版本、输入输出schema、执行事件、评估结果与回退路径始终一致”",
      boundary: "前言只覆盖核查日期的官方v1接口和已运行集成",
    },
    {
      name: "前言 · 迁移故障",
      setup:
        "保持其余条件不变，只注入“把作者开放伴学站当成纸书逐页全文，或把2024年API写成当前默认”",
      prediction: "前言应定位首个不兼容事件并能从锁定快照回退",
      boundary: "前言的迁移结论不能外推到未测试provider、模型或部署",
    },
  ],
  referenceTrace: [
    "前言参考步骤1：原书轨道执行冻结原书原书范围、伴学材料、当前文档与版本治理对应的2024包版本、导入路径与示例输入；当前v1轨道执行按当前官方文档冻结v1核心、集成包、LangGraph/LangSmith版本与输入schema；保存前言的依赖锁、输入合同和版本泳道并断言前言没有在同一运行中混用v0、langchain-classic与v1接口。",
    "前言参考步骤2：原书轨道执行把2024年原书、作者伴学材料和当前LangChain v1放进可追溯时间轴；当前v1轨道执行当前v1以精简agent构建块为主，旧Chain与检索接口按迁移指南进入langchain-classic或新编排层；保存前言的状态事件、工具/检索调用与输出快照并断言前言的每一步可由同一schema、版本、配置和顺序复算。",
    "前言参考步骤3：原书轨道执行在原书轨道只注入“把作者开放伴学站当成纸书逐页全文，或把2024年API写成当前默认”并保存首个失败事件；当前v1轨道执行在v1轨道只注入同一迁移故障，检查命名空间、状态或事件语义分岔；保存前言的首个不兼容点、传播路径与错误分类并断言前言没有把多项依赖升级或模型切换归因给单一API。",
    "前言参考步骤4：原书轨道执行恢复原书锁文件与接口合同，重放历史示例并保留历史边界；当前v1轨道执行恢复v1锁文件与迁移适配，重放评估集并验证状态和输出；保存前言的兼容结论、评估差分与发布/回退理由并断言前言满足“前言的包版本、输入输出schema、执行事件、评估结果与回退路径始终一致”。",
  ],
  faultTrace: [
    "前言故障步骤1：保持在锁定的2024原书轨道和当前LangChain v1轨道上重放原书范围、伴学材料、当前文档与版本治理不变，只检查“把作者开放伴学站当成纸书逐页全文，或把2024年API写成当前默认”怎样改变前言的依赖锁、输入合同和版本泳道。",
    "前言故障步骤2：保持前言的锁定依赖、输入与预注册预测不变，只检查“把作者开放伴学站当成纸书逐页全文，或把2024年API写成当前默认”怎样改变前言的状态事件、工具/检索调用与输出快照。",
    "前言故障步骤3：保持前言的参考轨迹与保持不变的模型、数据和评估集不变，只检查“把作者开放伴学站当成纸书逐页全文，或把2024年API写成当前默认”怎样改变前言的首个不兼容点、传播路径与错误分类。",
    "前言故障步骤4：保持前言的参考/故障trace、独立评估与回退快照不变，只检查“把作者开放伴学站当成纸书逐页全文，或把2024年API写成当前默认”怎样改变前言的兼容结论、评估差分与发布/回退理由。",
  ],
  gates: [
    {
      label: "书目与版本门",
      detail:
        "前言区分纸书目录、作者伴学材料、原书2024接口、当前v1文档和核查日期。",
    },
    {
      label: "schema与trace门",
      detail:
        "前言的依赖锁、输入输出schema、状态事件、工具/检索调用和错误可追溯。",
    },
    {
      label: "迁移与安全门",
      detail:
        "前言只注入“把作者开放伴学站当成纸书逐页全文，或把2024年API写成当前默认”，检查权限、敏感数据、首个分岔和回退。",
    },
    {
      label: "评估与发布门",
      detail:
        "前言交付版本时间轴、来源类型表、兼容矩阵与迁移决策记录，并报告通过、失败、未知和未测试集成。",
    },
  ],
} as const satisfies LangchainEvidenceModel;

export function LcpPrefaceVersionContractLab() {
  return <LangchainEvidenceLab model={model} view="version-contract" />;
}

export function LcpPrefaceRunnableTraceLab() {
  return <LangchainEvidenceLab model={model} view="runnable-trace" />;
}

export function LcpPrefaceReleaseGateLab() {
  return <LangchainEvidenceLab model={model} view="release-gate" />;
}
