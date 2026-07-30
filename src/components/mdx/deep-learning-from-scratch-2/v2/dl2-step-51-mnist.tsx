"use client";

import {
  DezeroEvidenceLab,
  type DezeroEvidenceModel,
} from "./dezero-evidence-lab";

const model = {
  unitId: "dl2-step-51",
  title: "步骤51 MNIST的训练",
  question:
    "怎样把自动微分核心扩展为可训练神经网络，同时保持shape、参数注册和数据角色正确？ 当前步骤新增的最小能力和失败边界分别是什么？",
  concepts: [
    "步骤51 MNIST的训练",
    "51.1 MNIST数据集",
    "51.2 训练MNIST",
    "51.3 改进模型",
  ],
  stages: [
    {
      name: "张量合同",
      input:
        "步骤51 MNIST的训练：锁定上一步快照、对象与公共API，保持其余DeZero合同不变",
      operation:
        "冻结版本、对象身份、dtype/shape、图边和允许读取的信息，并持续满足“reshape/sum/broadcast/matmul反向、Parameter递归注册、Optimizer更新和数据批次一致；步骤51 MNIST的训练的新增能力不得破坏此前步骤”",
      output: "张量合同产生可追溯框架前置状态",
      check:
        "可追溯框架前置状态、身份/shape/梯度断言；出现“广播或参数遍历漏项，训练损失仍因其他参数变化而下降；在步骤51 MNIST的训练验收中只注入这一处”时停止",
    },
    {
      name: "层与参数",
      input:
        "步骤51 MNIST的训练：执行本步新增的类、函数或算子，保持其余DeZero合同不变",
      operation:
        "保存对象、输入输出shape、creator/generation、参数与缓存，并持续满足“reshape/sum/broadcast/matmul反向、Parameter递归注册、Optimizer更新和数据批次一致；步骤51 MNIST的训练的新增能力不得破坏此前步骤”",
      output: "层与参数产生可重放计算图状态",
      check:
        "可重放计算图状态、身份/shape/梯度断言；出现“广播或参数遍历漏项，训练损失仍因其他参数变化而下降；在步骤51 MNIST的训练验收中只注入这一处”时停止",
    },
    {
      name: "损失前向",
      input:
        "步骤51 MNIST的训练：执行局部反向、图调度或资源更新，保持其余DeZero合同不变",
      operation:
        "保存上游梯度、归约轴、队列、差分误差和生命周期，并持续满足“reshape/sum/broadcast/matmul反向、Parameter递归注册、Optimizer更新和数据批次一致；步骤51 MNIST的训练的新增能力不得破坏此前步骤”",
      output: "损失前向产生可复核反向状态",
      check:
        "可复核反向状态、身份/shape/梯度断言；出现“广播或参数遍历漏项，训练损失仍因其他参数变化而下降；在步骤51 MNIST的训练验收中只注入这一处”时停止",
    },
    {
      name: "优化更新",
      input:
        "步骤51 MNIST的训练：运行本步示例和单一故障注入，保持其余DeZero合同不变",
      operation:
        "保存API调用、输出、异常、模式/设备和回退差分，并持续满足“reshape/sum/broadcast/matmul反向、Parameter递归注册、Optimizer更新和数据批次一致；步骤51 MNIST的训练的新增能力不得破坏此前步骤”",
      output: "优化更新产生可比较框架行为",
      check:
        "可比较框架行为、身份/shape/梯度断言；出现“广播或参数遍历漏项，训练损失仍因其他参数变化而下降；在步骤51 MNIST的训练验收中只注入这一处”时停止",
    },
    {
      name: "训练回归",
      input:
        "步骤51 MNIST的训练：重跑此前全部步骤的回归测试，保持其余DeZero合同不变",
      operation:
        "检查图、梯度、内存、设备、模式和历史兼容，并持续满足“reshape/sum/broadcast/matmul反向、Parameter递归注册、Optimizer更新和数据批次一致；步骤51 MNIST的训练的新增能力不得破坏此前步骤”",
      output: "训练回归产生独立框架证据包",
      check:
        "独立框架证据包、身份/shape/梯度断言；出现“广播或参数遍历漏项，训练损失仍因其他参数变化而下降；在步骤51 MNIST的训练验收中只注入这一处”时停止",
    },
  ],
  cases: [
    {
      name: "参考运行",
      observation:
        "从上一步DeZero快照出发，只实现“步骤51 MNIST的训练”，再用参考图与单故障图做差分回归。 固定代码快照、对象图、输入、shape、顺序、容差和种子。",
      prediction:
        "沿“张量合同 → 层与参数 → 损失前向 → 优化更新 → 训练回归”得到可复核框架增量。",
      boundary:
        "全过程必须满足“reshape/sum/broadcast/matmul反向、Parameter递归注册、Optimizer更新和数据批次一致；步骤51 MNIST的训练的新增能力不得破坏此前步骤”。",
    },
    {
      name: "边界反例",
      observation:
        "从上一步DeZero快照出发，只实现“步骤51 MNIST的训练”，再用参考图与单故障图做差分回归。 其余条件不变，只注入“广播或参数遍历漏项，训练损失仍因其他参数变化而下降；在步骤51 MNIST的训练验收中只注入这一处”。",
      prediction:
        "定位第一处对象、边、拓扑、梯度、资源、设备或模式状态偏离，并拒绝结论。",
      boundary: "失败轨迹必须保留；撤销故障后以相同输入重放。",
    },
  ],
  referenceTrace: [
    "为“步骤51 MNIST的训练”冻结代码快照、对象图、dtype/shape、顺序、容差和随机种子",
    "执行张量合同、层与参数，保存对象、边、输入输出、参数与缓存",
    "推进损失前向、优化更新，记录梯度、调度、资源与模式状态",
    "在训练回归交付dl2-step-51代码补丁、对象/边快照、输入输出shape、前向缓存、梯度轨迹、资源状态、回归测试与失败复现。",
  ],
  faultTrace: [
    "“步骤51 MNIST的训练”复用相同代码快照、对象图、dtype/shape、顺序、容差和种子",
    "只改变一个条件：广播或参数遍历漏项，训练损失仍因其他参数变化而下降；在步骤51 MNIST的训练验收中只注入这一处",
    "沿“张量合同 → 层与参数 → 损失前向 → 优化更新 → 训练回归”寻找最早的对象、图边、梯度、资源或模式分叉",
    "撤销故障重放；只有“reshape/sum/broadcast/matmul反向、Parameter递归注册、Optimizer更新和数据批次一致；步骤51 MNIST的训练的新增能力不得破坏此前步骤”恢复才接受修正",
  ],
  invariant:
    "reshape/sum/broadcast/matmul反向、Parameter递归注册、Optimizer更新和数据批次一致；步骤51 MNIST的训练的新增能力不得破坏此前步骤",
  fault:
    "广播或参数遍历漏项，训练损失仍因其他参数变化而下降；在步骤51 MNIST的训练验收中只注入这一处",
  artifact:
    "dl2-step-51代码补丁、对象/边快照、输入输出shape、前向缓存、梯度轨迹、资源状态、回归测试与失败复现",
  gates: [
    {
      label: "快照、对象与公共API",
      detail:
        "“步骤51 MNIST的训练”的代码快照、前置API、对象身份、dtype/shape、允许读取的信息和版本可追溯。",
    },
    {
      label: "计算图与拓扑顺序",
      detail:
        "“步骤51 MNIST的训练”的输入输出对象、creator边、generation队列、前向缓存和输出shape已冻结。",
    },
    {
      label: "梯度与资源生命周期",
      detail:
        "“步骤51 MNIST的训练”的上游/局部/累加梯度、数值对照、weakref、缓存释放和异常轨迹可重放。",
    },
    {
      label: "模式、设备与历史回归",
      detail:
        "“步骤51 MNIST的训练”归档训练/测试模式、CPU/GPU状态、此前步骤回归、反例、复现环境和时间标签。",
    },
  ],
} as const satisfies DezeroEvidenceModel;

export function Dl2Step51MnistGraphContractLab() {
  return <DezeroEvidenceLab model={model} view="graph-contract" />;
}

export function Dl2Step51MnistBackwardTraceLab() {
  return <DezeroEvidenceLab model={model} view="backward-trace" />;
}

export function Dl2Step51MnistFrameworkGateLab() {
  return <DezeroEvidenceLab model={model} view="framework-gate" />;
}
