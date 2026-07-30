"use client";

import {
  LlmEvidenceLab,
  type LlmEvidenceModel,
} from "@/components/mdx/large-language-models/v2/llm-evidence-lab";

const model = {
  unitId: "learningMap",
  title: "《这就是ChatGPT》原版证据学习地图",
  question:
    "怎样从逐token生成走到神经网络、训练、意义空间与计算工具，并保留版本边界？",
  concepts: [
    "Preface / 前言",
    "What Is ChatGPT Doing ... and Why Does It Work? / ChatGPT在做什么，为什么有效？",
    "It's Just Adding One Word at a Time / 一次只添加一个词",
    "Where Do the Probabilities Come From? / 概率从何而来？",
    "What Is a Model? / 什么是模型？",
    "Models for Human-Like Tasks / 面向类人任务的模型",
    "Neural Nets / 神经网络",
    "Machine Learning, and the Training of Neural Nets / 机器学习和神经网络训练",
    "The Practice and Lore of Neural Net Training / 神经网络训练的实践与经验",
    '"Surely a Network That\'s Big Enough Can Do Anything!" / “足够大的网络当然什么都能做！”',
    "The Concept of Embeddings / 嵌入的概念",
    "Inside ChatGPT / ChatGPT内部",
    "The Training of ChatGPT / ChatGPT的训练",
    "Beyond Basic Training / 超越基础训练",
    "What Really Lets ChatGPT Work? / 真正让ChatGPT工作的是什么？",
    "Meaning Space and Semantic Laws of Motion / 意义空间与语义运动定律",
    "Semantic Grammar and the Power of Computational Language / 语义语法与计算语言的力量",
    "So ... What Is ChatGPT Doing, and Why Does It Work? / 所以，ChatGPT究竟在做什么，为什么有效？",
    "Thanks / 致谢",
    "Additional Resources / 补充资源",
    "Wolfram|Alpha as the Way to Bring Computational Knowledge Superpowers to ChatGPT / 以Wolfram|Alpha为ChatGPT带来计算知识超能力",
    "ChatGPT and Wolfram|Alpha / ChatGPT与Wolfram|Alpha",
    "A Basic Example / 一个基本示例",
    "A Few More Examples / 更多示例",
    "The Path Forward / 前进之路",
  ],
  invariant:
    "《这就是ChatGPT》原版证据学习地图的输入版本、条件分布或工具状态、输出证据与适用边界始终可追溯",
  fault: "把目录顺序误当成机制依赖，或用2026年的产品名称覆盖2023年的原书主张",
  artifact: "25坐标覆盖矩阵、两篇正文依赖图、历史边界与学习检查点",
  stages: [
    {
      name: "《这就是ChatGPT》原版证据学习地图 · 来源与输入",
      input:
        "在固定的2023年原书语境与独立事实来源下重放全书目录、机制依赖、来源层级与学习顺序",
      operation:
        "冻结全书目录、机制依赖、来源层级与学习顺序所需的文本、数据、模型或工具版本",
      output: "《这就是ChatGPT》原版证据学习地图的来源快照、输入合同与版本边界",
      check:
        "《这就是ChatGPT》原版证据学习地图没有把历史示意、产品名称或演示结果冒充当前规格",
    },
    {
      name: "《这就是ChatGPT》原版证据学习地图 · 机制与计算",
      input: "《这就是ChatGPT》原版证据学习地图的冻结输入与预注册预测",
      operation: "把25个正式目录层级组织成可验证的学习路径",
      output: "《这就是ChatGPT》原版证据学习地图的参考轨迹、状态变化与中间证据",
      check:
        "《这就是ChatGPT》原版证据学习地图的每一步都能由同一输入、规则、参数和顺序复算",
    },
    {
      name: "《这就是ChatGPT》原版证据学习地图 · 单故障反例",
      input: "《这就是ChatGPT》原版证据学习地图的参考轨迹与保持不变的控制条件",
      operation:
        "只注入“把目录顺序误当成机制依赖，或用2026年的产品名称覆盖2023年的原书主张”",
      output:
        "《这就是ChatGPT》原版证据学习地图的首个状态分岔、传播路径与失败输出",
      check:
        "《这就是ChatGPT》原版证据学习地图没有同时更换语料、模型、解码、工具和评估集",
    },
    {
      name: "《这就是ChatGPT》原版证据学习地图 · 恢复与边界",
      input: "《这就是ChatGPT》原版证据学习地图的故障快照、恢复操作与独立评估",
      operation: "撤销单一故障，从同一快照重放并检查不适用范围",
      output: "《这就是ChatGPT》原版证据学习地图的恢复差分、接受结论与边界声明",
      check:
        "《这就是ChatGPT》原版证据学习地图满足“《这就是ChatGPT》原版证据学习地图的输入版本、条件分布或工具状态、输出证据与适用边界始终可追溯”",
    },
  ],
  cases: [
    {
      name: "《这就是ChatGPT》原版证据学习地图 · 参考",
      setup:
        "固定在固定的2023年原书语境与独立事实来源下重放全书目录、机制依赖、来源层级与学习顺序的输入、版本、随机性与评估顺序",
      prediction:
        "《这就是ChatGPT》原版证据学习地图应持续满足“《这就是ChatGPT》原版证据学习地图的输入版本、条件分布或工具状态、输出证据与适用边界始终可追溯”",
      boundary:
        "《这就是ChatGPT》原版证据学习地图只回答本页正式目录坐标及已运行的历史与技术条件",
    },
    {
      name: "《这就是ChatGPT》原版证据学习地图 · 单故障",
      setup:
        "保持其余条件不变，只注入“把目录顺序误当成机制依赖，或用2026年的产品名称覆盖2023年的原书主张”",
      prediction:
        "《这就是ChatGPT》原版证据学习地图应出现可定位的首个状态分岔，而不是只有末端结论变化",
      boundary:
        "《这就是ChatGPT》原版证据学习地图的故障结果不能外推到未测试模型、语料、工具或产品版本",
    },
    {
      name: "《这就是ChatGPT》原版证据学习地图 · 恢复",
      setup: "撤销故障并从同一快照重放全书目录、机制依赖、来源层级与学习顺序",
      prediction:
        "《这就是ChatGPT》原版证据学习地图的状态、输出与独立评估应恢复参考路径",
      boundary:
        "《这就是ChatGPT》原版证据学习地图若无法恢复，就不能把异常归因给该单一故障",
    },
  ],
  referenceTrace: [
    "《这就是ChatGPT》原版证据学习地图参考步骤1：冻结全书目录、机制依赖、来源层级与学习顺序所需的文本、数据、模型或工具版本；保存《这就是ChatGPT》原版证据学习地图的来源快照、输入合同与版本边界，并断言《这就是ChatGPT》原版证据学习地图没有把历史示意、产品名称或演示结果冒充当前规格。",
    "《这就是ChatGPT》原版证据学习地图参考步骤2：把25个正式目录层级组织成可验证的学习路径；保存《这就是ChatGPT》原版证据学习地图的参考轨迹、状态变化与中间证据，并断言《这就是ChatGPT》原版证据学习地图的每一步都能由同一输入、规则、参数和顺序复算。",
    "《这就是ChatGPT》原版证据学习地图参考步骤3：只注入“把目录顺序误当成机制依赖，或用2026年的产品名称覆盖2023年的原书主张”；保存《这就是ChatGPT》原版证据学习地图的首个状态分岔、传播路径与失败输出，并断言《这就是ChatGPT》原版证据学习地图没有同时更换语料、模型、解码、工具和评估集。",
    "《这就是ChatGPT》原版证据学习地图参考步骤4：撤销单一故障，从同一快照重放并检查不适用范围；保存《这就是ChatGPT》原版证据学习地图的恢复差分、接受结论与边界声明，并断言《这就是ChatGPT》原版证据学习地图满足“《这就是ChatGPT》原版证据学习地图的输入版本、条件分布或工具状态、输出证据与适用边界始终可追溯”。",
  ],
  faultTrace: [
    "《这就是ChatGPT》原版证据学习地图故障步骤1：保持在固定的2023年原书语境与独立事实来源下重放全书目录、机制依赖、来源层级与学习顺序不变，检查“把目录顺序误当成机制依赖，或用2026年的产品名称覆盖2023年的原书主张”如何改变《这就是ChatGPT》原版证据学习地图的来源快照、输入合同与版本边界。",
    "《这就是ChatGPT》原版证据学习地图故障步骤2：保持《这就是ChatGPT》原版证据学习地图的冻结输入与预注册预测不变，检查“把目录顺序误当成机制依赖，或用2026年的产品名称覆盖2023年的原书主张”如何改变《这就是ChatGPT》原版证据学习地图的参考轨迹、状态变化与中间证据。",
    "《这就是ChatGPT》原版证据学习地图故障步骤3：保持《这就是ChatGPT》原版证据学习地图的参考轨迹与保持不变的控制条件不变，检查“把目录顺序误当成机制依赖，或用2026年的产品名称覆盖2023年的原书主张”如何改变《这就是ChatGPT》原版证据学习地图的首个状态分岔、传播路径与失败输出。",
    "《这就是ChatGPT》原版证据学习地图故障步骤4：保持《这就是ChatGPT》原版证据学习地图的故障快照、恢复操作与独立评估不变，检查“把目录顺序误当成机制依赖，或用2026年的产品名称覆盖2023年的原书主张”如何改变《这就是ChatGPT》原版证据学习地图的恢复差分、接受结论与边界声明。",
  ],
  gates: [
    {
      label: "原文与版本门",
      detail:
        "《这就是ChatGPT》原版证据学习地图区分作者2023年公开文章、英文原版、中文译本、研究论文与当前产品事实。",
    },
    {
      label: "输入与状态门",
      detail:
        "《这就是ChatGPT》原版证据学习地图的语料、上下文、模型/工具版本、参数、随机性与中间状态可复算。",
    },
    {
      label: "反例与恢复门",
      detail:
        "《这就是ChatGPT》原版证据学习地图只注入“把目录顺序误当成机制依赖，或用2026年的产品名称覆盖2023年的原书主张”，记录首个分岔并从同一快照恢复。",
    },
    {
      label: "结论与边界门",
      detail:
        "《这就是ChatGPT》原版证据学习地图交付25坐标覆盖矩阵、两篇正文依赖图、历史边界与学习检查点，并明确未测试模型、产品版本与外推范围。",
    },
  ],
} as const satisfies LlmEvidenceModel;

export function TcgOfficialLearningMapContextContractLab() {
  return <LlmEvidenceLab model={model} view="context-contract" />;
}

export function TcgOfficialLearningMapComputeTraceLab() {
  return <LlmEvidenceLab model={model} view="compute-trace" />;
}

export function TcgOfficialLearningMapEvidenceGateLab() {
  return <LlmEvidenceLab model={model} view="evidence-gate" />;
}
