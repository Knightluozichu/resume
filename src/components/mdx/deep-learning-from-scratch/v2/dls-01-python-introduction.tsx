"use client";

import { DlsEvidenceLab, type DlsEvidenceModel } from "./dls-evidence-lab";

const model = {
  unitId: "dls-01",
  title: "第1章 Python入门",
  question:
    "怎样用最小Python程序证明数组形状、广播和索引行为，而不是把运行成功当作语义正确？",
  concepts: [
    "第1章 Python入门",
    "1.1 Python是什么",
    "1.2 Python的安装",
    "1.2.1 Python版本",
    "1.2.2 使用的外部库",
    "1.2.3 Anaconda发行版",
    "1.3 Python解释器",
    "1.3.1 算术计算",
    "1.3.2 数据类型",
    "1.3.3 变量",
    "1.3.4 列表",
    "1.3.5 字典",
    "1.3.6 布尔型",
    "1.3.7 if语句",
    "1.3.8 for语句",
    "1.3.9 函数",
    "1.4 Python脚本文件",
    "1.4.1 保存为文件",
    "1.4.2 类",
    "1.5 NumPy",
    "1.5.1 导入NumPy",
    "1.5.2 生成NumPy数组",
    "1.5.3 NumPy的算术运算",
    "1.5.4 NumPy的N维数组",
    "1.5.5 广播",
    "1.5.6 访问元素",
    "1.6 Matplotlib",
    "1.6.1 绘制简单图形",
    "1.6.2 pyplot的功能",
    "1.6.3 显示图像",
    "1.7 小结",
  ],
  stages: [
    {
      name: "锁定运行环境",
      input:
        "第1章 Python入门：锁定解释器、依赖、输入与数据角色，保持其余实现合同不变",
      operation:
        "冻结版本、dtype、shape、轴、种子和允许读取的信息，并持续满足“Python/NumPy版本、dtype、shape、轴方向、广播规则、随机种子和绘图输入固定”",
      output: "锁定运行环境产生可追溯输入状态",
      check:
        "可追溯输入状态、shape与数值断言；出现“广播产生可运行但语义错误的结果，或数组/列表混用后悄悄改变形状”时停止",
    },
    {
      name: "构造数组",
      input:
        "第1章 Python入门：执行本页的前向代码或数组变换，保持其余实现合同不变",
      operation:
        "保存输入输出shape、参数、缓存和数值范围，并持续满足“Python/NumPy版本、dtype、shape、轴方向、广播规则、随机种子和绘图输入固定”",
      output: "构造数组产生可重放前向状态",
      check:
        "可重放前向状态、shape与数值断言；出现“广播产生可运行但语义错误的结果，或数组/列表混用后悄悄改变形状”时停止",
    },
    {
      name: "执行广播",
      input:
        "第1章 Python入门：计算局部导数、数值梯度或状态更新，保持其余实现合同不变",
      operation:
        "保存上游梯度、归约轴、差分步长和相对误差，并持续满足“Python/NumPy版本、dtype、shape、轴方向、广播规则、随机种子和绘图输入固定”",
      output: "执行广播产生可复核梯度状态",
      check:
        "可复核梯度状态、shape与数值断言；出现“广播产生可运行但语义错误的结果，或数组/列表混用后悄悄改变形状”时停止",
    },
    {
      name: "验证索引",
      input:
        "第1章 Python入门：按固定batch顺序更新参数或组合网络，保持其余实现合同不变",
      operation:
        "保存优化器状态、损失、训练/推理模式和曲线，并持续满足“Python/NumPy版本、dtype、shape、轴方向、广播规则、随机种子和绘图输入固定”",
      output: "验证索引产生可比较训练状态",
      check:
        "可比较训练状态、shape与数值断言；出现“广播产生可运行但语义错误的结果，或数组/列表混用后悄悄改变形状”时停止",
    },
    {
      name: "绘制并归档",
      input:
        "第1章 Python入门：执行形状、梯度、复现和独立评估检查，保持其余实现合同不变",
      operation:
        "隔离测试角色并登记版本、失败反例和时间边界，并持续满足“Python/NumPy版本、dtype、shape、轴方向、广播规则、随机种子和绘图输入固定”",
      output: "绘制并归档产生独立实现证据包",
      check:
        "独立实现证据包、shape与数值断言；出现“广播产生可运行但语义错误的结果，或数组/列表混用后悄悄改变形状”时停止",
    },
  ],
  cases: [
    {
      name: "参考运行",
      observation:
        "建立一个只依赖Python、NumPy与Matplotlib的可复现实验环境并处理小型图像批次。 固定环境、数据、shape、初值、顺序、容差和种子。",
      prediction:
        "沿“锁定运行环境 → 构造数组 → 执行广播 → 验证索引 → 绘制并归档”得到可复核实现结果。",
      boundary:
        "全过程必须满足“Python/NumPy版本、dtype、shape、轴方向、广播规则、随机种子和绘图输入固定”。",
    },
    {
      name: "边界反例",
      observation:
        "建立一个只依赖Python、NumPy与Matplotlib的可复现实验环境并处理小型图像批次。 其余条件不变，只注入“广播产生可运行但语义错误的结果，或数组/列表混用后悄悄改变形状”。",
      prediction:
        "定位第一处环境、shape、前向、梯度、训练或评估状态偏离，并拒绝结论。",
      boundary: "失败轨迹必须保留；撤销故障后以相同输入重放。",
    },
  ],
  referenceTrace: [
    "为“第1章 Python入门”冻结环境、数据角色、dtype/shape、初值、顺序、容差和随机种子",
    "执行锁定运行环境、构造数组，保存输入输出、参数、缓存与数值范围",
    "推进执行广播、验证索引，记录梯度、更新、损失与训练状态",
    "在绘制并归档交付解释器与包版本、脚本、输入数组、dtype/shape、广播轴、索引结果、图像范围、随机种子和截图。",
  ],
  faultTrace: [
    "“第1章 Python入门”复用相同环境、数据角色、dtype/shape、初值、顺序、容差和种子",
    "只改变一个条件：广播产生可运行但语义错误的结果，或数组/列表混用后悄悄改变形状",
    "沿“锁定运行环境 → 构造数组 → 执行广播 → 验证索引 → 绘制并归档”寻找最早的代码、shape、梯度或评估分叉",
    "撤销故障重放；只有“Python/NumPy版本、dtype、shape、轴方向、广播规则、随机种子和绘图输入固定”恢复才接受修正",
  ],
  invariant:
    "Python/NumPy版本、dtype、shape、轴方向、广播规则、随机种子和绘图输入固定",
  fault: "广播产生可运行但语义错误的结果，或数组/列表混用后悄悄改变形状",
  artifact:
    "解释器与包版本、脚本、输入数组、dtype/shape、广播轴、索引结果、图像范围、随机种子和截图。",
  gates: [
    {
      label: "环境、输入与数据角色",
      detail:
        "“第1章 Python入门”的解释器、依赖、dtype/shape、采样/切分、允许读取的信息和版本可追溯。",
    },
    {
      label: "前向代码与形状",
      detail:
        "“第1章 Python入门”的层、参数、轴、缓存、激活、损失和输出shape已冻结。",
    },
    {
      label: "梯度与训练复现",
      detail:
        "“第1章 Python入门”的数值梯度、反向梯度、初值、batch顺序、优化器状态和误差可重放。",
    },
    {
      label: "独立评估与边界",
      detail:
        "“第1章 Python入门”归档训练/验证曲线、独立测试、反例、复现环境、适用域和时间标签。",
    },
  ],
} as const satisfies DlsEvidenceModel;

export function Dls01PythonIntroductionTensorPathLab() {
  return <DlsEvidenceLab model={model} view="tensor-path" />;
}

export function Dls01PythonIntroductionGradientTraceLab() {
  return <DlsEvidenceLab model={model} view="gradient-trace" />;
}

export function Dls01PythonIntroductionTrainingGateLab() {
  return <DlsEvidenceLab model={model} view="training-gate" />;
}
