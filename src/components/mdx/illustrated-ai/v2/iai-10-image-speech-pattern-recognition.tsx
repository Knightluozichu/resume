"use client";

import {
  AiSystemEvidenceLab,
  type AiSystemEvidenceModel,
} from "./ai-system-evidence-lab";

const model = {
  unitId: "iai-10",
  title: "第10章 图像和语音的模式识别",
  question: "怎样从传感器信号到特征、模型和解码结果建立端到端误差归因？",
  concepts: [
    "第10章 图像和语音的模式识别",
    "01 模式识别",
    "02 特征提取方法",
    "03 图像识别",
    "04 语音识别",
  ],
  nodes: [
    {
      name: "传感器信号",
      state: "第10章 图像和语音的模式识别：版本化观测或输入",
      rule: "验证来源、身份和边界，并保持“采样、标注、预处理、特征、模型、解码、指标和噪声条件固定”",
      transition: "可信输入状态",
      evidence:
        "数据卡、身份与时间；出现“训练测试来自同一说话人或图像近重复，指标因身份泄漏虚高”时暂停",
    },
    {
      name: "预处理",
      state: "第10章 图像和语音的模式识别：上游输入与已有事实",
      rule: "构造“第10章 图像和语音的模式识别”的知识、表示或系统状态，并保持“采样、标注、预处理、特征、模型、解码、指标和噪声条件固定”",
      transition: "可查询中间状态",
      evidence:
        "规则、图、模型或参数；出现“训练测试来自同一说话人或图像近重复，指标因身份泄漏虚高”时暂停",
    },
    {
      name: "特征表示",
      state: "第10章 图像和语音的模式识别：当前状态与候选变换",
      rule: "执行推理、学习、搜索或协调，并保持“采样、标注、预处理、特征、模型、解码、指标和噪声条件固定”",
      transition: "候选结论或动作",
      evidence:
        "轨迹、概率、梯度或消息；出现“训练测试来自同一说话人或图像近重复，指标因身份泄漏虚高”时暂停",
    },
    {
      name: "识别/解码",
      state: "第10章 图像和语音的模式识别：已验证结论/动作",
      rule: "按权限和容量提交服务或执行，并保持“采样、标注、预处理、特征、模型、解码、指标和噪声条件固定”",
      transition: "可追踪外部结果",
      evidence:
        "输出、授权与副作用；出现“训练测试来自同一说话人或图像近重复，指标因身份泄漏虚高”时暂停",
    },
    {
      name: "误差与噪声评估",
      state: "第10章 图像和语音的模式识别：结果、日志和反馈",
      rule: "监测偏离并恢复已知状态，并保持“采样、标注、预处理、特征、模型、解码、指标和噪声条件固定”",
      transition: "验收或拒绝",
      evidence:
        "指标、反例、检查点和回滚；出现“训练测试来自同一说话人或图像近重复，指标因身份泄漏虚高”时暂停",
    },
  ],
  cases: [
    {
      name: "正常案例",
      observation:
        "对图像字符与短语音片段建立识别管线，并注入模糊和噪声。 使用冻结版本、输入、初态和种子。",
      expectedAction:
        "沿“传感器信号 → 预处理 → 特征表示 → 识别/解码 → 误差与噪声评估”完成可解释动作。",
      boundary:
        "必须满足“采样、标注、预处理、特征、模型、解码、指标和噪声条件固定”。",
    },
    {
      name: "边界反例",
      observation:
        "对图像字符与短语音片段建立识别管线，并注入模糊和噪声。 其余不变，只注入“训练测试来自同一说话人或图像近重复，指标因身份泄漏虚高”。",
      expectedAction: "定位第一处状态或信任偏离并拒绝下游动作。",
      boundary: "失败运行必须保留，撤销故障后用同一输入重放。",
    },
  ],
  normalTrace: [
    "为“第10章 图像和语音的模式识别”冻结系统版本、输入、身份、初态、权限、容量与随机种子",
    "执行传感器信号、预处理，保存观测、知识或模型状态",
    "推进特征表示、识别/解码，记录推理、学习、通信和动作",
    "在误差与噪声评估交付采样率/分辨率、标注、实体切分、预处理、特征、模型、解码、混淆矩阵、噪声曲线和泄漏检查。",
  ],
  failureTrace: [
    "“第10章 图像和语音的模式识别”复用相同系统、输入、身份、初态、权限、容量和种子",
    "只注入单一故障：训练测试来自同一说话人或图像近重复，指标因身份泄漏虚高",
    "沿“传感器信号 → 预处理 → 特征表示 → 识别/解码 → 误差与噪声评估”定位第一处状态、证据或信任偏离",
    "撤销故障并重放；仅当“采样、标注、预处理、特征、模型、解码、指标和噪声条件固定”恢复才接受修正",
  ],
  invariant: "采样、标注、预处理、特征、模型、解码、指标和噪声条件固定",
  fault: "训练测试来自同一说话人或图像近重复，指标因身份泄漏虚高",
  artifact:
    "采样率/分辨率、标注、实体切分、预处理、特征、模型、解码、混淆矩阵、噪声曲线和泄漏检查。",
  gates: [
    {
      label: "输入与身份",
      detail:
        "“第10章 图像和语音的模式识别”的来源、实体、单位、时间和边界可追溯。",
    },
    {
      label: "状态与模型",
      detail:
        "“第10章 图像和语音的模式识别”的知识、规则、参数、版本和中间状态可复核。",
    },
    {
      label: "权限与副作用",
      detail:
        "“第10章 图像和语音的模式识别”的通信、动作、资源和外部副作用有权限与容量界限。",
    },
    {
      label: "复现与时间",
      detail:
        "“第10章 图像和语音的模式识别”归档环境、种子、失败、恢复和2016/当前标签。",
    },
  ],
} as const satisfies AiSystemEvidenceModel;

export function Iai10ImageSpeechPatternRecognitionKnowledgeStateLab() {
  return <AiSystemEvidenceLab model={model} view="knowledge-state" />;
}

export function Iai10ImageSpeechPatternRecognitionExecutionTraceLab() {
  return <AiSystemEvidenceLab model={model} view="execution-trace" />;
}

export function Iai10ImageSpeechPatternRecognitionSystemGateLab() {
  return <AiSystemEvidenceLab model={model} view="system-gate" />;
}
