"use client";

import { PrmlEvidenceLab, type PrmlEvidenceModel } from "./prml-evidence-lab";

const model = {
  unitId: "prl-app-d",
  title: "附录D 变分法",
  question:
    "怎样从泛函、扰动与边界条件得到Euler型驻点条件，并用离散近似反证漏项？",
  concepts: ["Appendix D Calculus of Variations"],
  stages: [
    {
      name: "定义泛函",
      prior: "附录D 变分法：声明观测、变量与数据角色，保持其余概率合同不变",
      operation:
        "冻结支持集、形状、版本和允许读取的信息，并持续满足“函数空间、允许扰动、端点/边界、泛函、正则性和离散容差固定”",
      posterior: "定义泛函产生可追溯观测状态",
      check:
        "可追溯观测状态、概率质量与数值断言；出现“忽略边界项或允许不可行扰动，却仍把驻点解释为原问题解”时停止",
    },
    {
      name: "施加扰动",
      prior: "附录D 变分法：构造联合分布、函数或图结构，保持其余概率合同不变",
      operation:
        "记录假设、参数化、归一与条件独立，并持续满足“函数空间、允许扰动、端点/边界、泛函、正则性和离散容差固定”",
      posterior: "施加扰动产生可计算模型状态",
      check:
        "可计算模型状态、概率质量与数值断言；出现“忽略边界项或允许不可行扰动，却仍把驻点解释为原问题解”时停止",
    },
    {
      name: "分部积分",
      prior:
        "附录D 变分法：选择精确、近似、优化或采样步骤，保持其余概率合同不变",
      operation:
        "保存初值、顺序、随机性、目标和残差，并持续满足“函数空间、允许扰动、端点/边界、泛函、正则性和离散容差固定”",
      posterior: "分部积分产生可重放推断状态",
      check:
        "可重放推断状态、概率质量与数值断言；出现“忽略边界项或允许不可行扰动，却仍把驻点解释为原问题解”时停止",
    },
    {
      name: "得到驻点条件",
      prior: "附录D 变分法：从后验或参数形成任务输出，保持其余概率合同不变",
      operation:
        "同时保留点结果、不确定性和损失语义，并持续满足“函数空间、允许扰动、端点/边界、泛函、正则性和离散容差固定”",
      posterior: "得到驻点条件产生可检验预测状态",
      check:
        "可检验预测状态、概率质量与数值断言；出现“忽略边界项或允许不可行扰动，却仍把驻点解释为原问题解”时停止",
    },
    {
      name: "离散复核",
      prior:
        "附录D 变分法：执行归一、收敛、校准与反例检查，保持其余概率合同不变",
      operation:
        "隔离测试角色并登记适用域和时间边界，并持续满足“函数空间、允许扰动、端点/边界、泛函、正则性和离散容差固定”",
      posterior: "离散复核产生独立概率证据包",
      check:
        "独立概率证据包、概率质量与数值断言；出现“忽略边界项或允许不可行扰动，却仍把驻点解释为原问题解”时停止",
    },
  ],
  cases: [
    {
      name: "参考观测",
      observation:
        "对一个路径泛函推导一阶变分并与网格离散梯度比较。 固定数据、参数化、初值、顺序、容差和种子。",
      prediction:
        "沿“定义泛函 → 施加扰动 → 分部积分 → 得到驻点条件 → 离散复核”得到可复核概率结论。",
      boundary:
        "全过程必须满足“函数空间、允许扰动、端点/边界、泛函、正则性和离散容差固定”。",
    },
    {
      name: "边界反例",
      observation:
        "对一个路径泛函推导一阶变分并与网格离散梯度比较。 其余条件不变，只注入“忽略边界项或允许不可行扰动，却仍把驻点解释为原问题解”。",
      prediction: "定位第一处概率、条件独立、推断或预测状态偏离，并拒绝结论。",
      boundary: "失败轨迹必须保留；撤销故障后以相同输入重放。",
    },
  ],
  referenceTrace: [
    "为“附录D 变分法”冻结观测、数据角色、参数化、初值、顺序、容差和随机种子",
    "执行定义泛函、施加扰动，保存支持集、假设、分布或图结构",
    "推进分部积分、得到驻点条件，记录推断目标、更新、残差与预测不确定性",
    "在离散复核交付函数与定义域、扰动族、边界条件、一阶变分、边界项、驻点方程、离散梯度和残差。",
  ],
  faultTrace: [
    "“附录D 变分法”复用相同观测、数据角色、参数化、初值、顺序、容差和种子",
    "只改变一个条件：忽略边界项或允许不可行扰动，却仍把驻点解释为原问题解",
    "沿“定义泛函 → 施加扰动 → 分部积分 → 得到驻点条件 → 离散复核”寻找最早的概率或数值分叉",
    "撤销故障重放；只有“函数空间、允许扰动、端点/边界、泛函、正则性和离散容差固定”恢复才接受修正",
  ],
  invariant: "函数空间、允许扰动、端点/边界、泛函、正则性和离散容差固定",
  fault: "忽略边界项或允许不可行扰动，却仍把驻点解释为原问题解",
  artifact:
    "函数与定义域、扰动族、边界条件、一阶变分、边界项、驻点方程、离散梯度和残差。",
  gates: [
    {
      label: "观测与数据角色",
      detail:
        "“附录D 变分法”的变量、支持集、采样/切分、允许读取的信息和版本可追溯。",
    },
    {
      label: "模型与概率语义",
      detail:
        "“附录D 变分法”的结构、参数化、先验、似然、条件独立和归一约定已冻结。",
    },
    {
      label: "推断与数值诊断",
      detail:
        "“附录D 变分法”的初值、顺序、随机性、目标、更新、容差、残差和近似误差可重放。",
    },
    {
      label: "预测与外部边界",
      detail:
        "“附录D 变分法”归档不确定性、损失、校准、独立测试、反例、适用域和时间标签。",
    },
  ],
} as const satisfies PrmlEvidenceModel;

export function PrlAppendixDCalculusVariationsProbabilisticModelLab() {
  return <PrmlEvidenceLab model={model} view="probabilistic-model" />;
}

export function PrlAppendixDCalculusVariationsInferenceTraceLab() {
  return <PrmlEvidenceLab model={model} view="inference-trace" />;
}

export function PrlAppendixDCalculusVariationsPredictiveCheckLab() {
  return <PrmlEvidenceLab model={model} view="predictive-check" />;
}
