"use client";

import {
  DezeroEvidenceLab,
  type DezeroEvidenceModel,
} from "./dezero-evidence-lab";

const model = {
  unitId: "dl2-step-19",
  title: "步骤19 让变量更易用",
  question:
    "怎样让自然Python语法保持正确计算图、梯度累加、生命周期和类型分派？ 当前步骤新增的最小能力和失败边界分别是什么？",
  concepts: [
    "步骤19 让变量更易用",
    "19.1 命名变量",
    "19.2 实例变量ndarray",
    "19.3 len函数和print函数",
  ],
  stages: [
    {
      name: "API输入",
      input:
        "步骤19 让变量更易用：锁定上一步快照、对象与公共API，保持其余DeZero合同不变",
      operation:
        "冻结版本、对象身份、dtype/shape、图边和允许读取的信息，并持续满足“多输入输出、梯度累加、generation顺序、weakref、Config模式和运算符分派一致；步骤19 让变量更易用的新增能力不得破坏此前步骤”",
      output: "API输入产生可追溯框架前置状态",
      check:
        "可追溯框架前置状态、身份/shape/梯度断言；出现“API更易用却丢失一条边、覆盖共享梯度或形成循环引用；在步骤19 让变量更易用验收中只注入这一处”时停止",
    },
    {
      name: "图连接",
      input:
        "步骤19 让变量更易用：执行本步新增的类、函数或算子，保持其余DeZero合同不变",
      operation:
        "保存对象、输入输出shape、creator/generation、参数与缓存，并持续满足“多输入输出、梯度累加、generation顺序、weakref、Config模式和运算符分派一致；步骤19 让变量更易用的新增能力不得破坏此前步骤”",
      output: "图连接产生可重放计算图状态",
      check:
        "可重放计算图状态、身份/shape/梯度断言；出现“API更易用却丢失一条边、覆盖共享梯度或形成循环引用；在步骤19 让变量更易用验收中只注入这一处”时停止",
    },
    {
      name: "梯度汇聚",
      input:
        "步骤19 让变量更易用：执行局部反向、图调度或资源更新，保持其余DeZero合同不变",
      operation:
        "保存上游梯度、归约轴、队列、差分误差和生命周期，并持续满足“多输入输出、梯度累加、generation顺序、weakref、Config模式和运算符分派一致；步骤19 让变量更易用的新增能力不得破坏此前步骤”",
      output: "梯度汇聚产生可复核反向状态",
      check:
        "可复核反向状态、身份/shape/梯度断言；出现“API更易用却丢失一条边、覆盖共享梯度或形成循环引用；在步骤19 让变量更易用验收中只注入这一处”时停止",
    },
    {
      name: "资源释放",
      input:
        "步骤19 让变量更易用：运行本步示例和单一故障注入，保持其余DeZero合同不变",
      operation:
        "保存API调用、输出、异常、模式/设备和回退差分，并持续满足“多输入输出、梯度累加、generation顺序、weakref、Config模式和运算符分派一致；步骤19 让变量更易用的新增能力不得破坏此前步骤”",
      output: "资源释放产生可比较框架行为",
      check:
        "可比较框架行为、身份/shape/梯度断言；出现“API更易用却丢失一条边、覆盖共享梯度或形成循环引用；在步骤19 让变量更易用验收中只注入这一处”时停止",
    },
    {
      name: "回归兼容",
      input:
        "步骤19 让变量更易用：重跑此前全部步骤的回归测试，保持其余DeZero合同不变",
      operation:
        "检查图、梯度、内存、设备、模式和历史兼容，并持续满足“多输入输出、梯度累加、generation顺序、weakref、Config模式和运算符分派一致；步骤19 让变量更易用的新增能力不得破坏此前步骤”",
      output: "回归兼容产生独立框架证据包",
      check:
        "独立框架证据包、身份/shape/梯度断言；出现“API更易用却丢失一条边、覆盖共享梯度或形成循环引用；在步骤19 让变量更易用验收中只注入这一处”时停止",
    },
  ],
  cases: [
    {
      name: "参考运行",
      observation:
        "从上一步DeZero快照出发，只实现“步骤19 让变量更易用”，再用参考图与单故障图做差分回归。 固定代码快照、对象图、输入、shape、顺序、容差和种子。",
      prediction:
        "沿“API输入 → 图连接 → 梯度汇聚 → 资源释放 → 回归兼容”得到可复核框架增量。",
      boundary:
        "全过程必须满足“多输入输出、梯度累加、generation顺序、weakref、Config模式和运算符分派一致；步骤19 让变量更易用的新增能力不得破坏此前步骤”。",
    },
    {
      name: "边界反例",
      observation:
        "从上一步DeZero快照出发，只实现“步骤19 让变量更易用”，再用参考图与单故障图做差分回归。 其余条件不变，只注入“API更易用却丢失一条边、覆盖共享梯度或形成循环引用；在步骤19 让变量更易用验收中只注入这一处”。",
      prediction:
        "定位第一处对象、边、拓扑、梯度、资源、设备或模式状态偏离，并拒绝结论。",
      boundary: "失败轨迹必须保留；撤销故障后以相同输入重放。",
    },
  ],
  referenceTrace: [
    "为“步骤19 让变量更易用”冻结代码快照、对象图、dtype/shape、顺序、容差和随机种子",
    "执行API输入、图连接，保存对象、边、输入输出、参数与缓存",
    "推进梯度汇聚、资源释放，记录梯度、调度、资源与模式状态",
    "在回归兼容交付dl2-step-19代码补丁、对象/边快照、输入输出shape、前向缓存、梯度轨迹、资源状态、回归测试与失败复现。",
  ],
  faultTrace: [
    "“步骤19 让变量更易用”复用相同代码快照、对象图、dtype/shape、顺序、容差和种子",
    "只改变一个条件：API更易用却丢失一条边、覆盖共享梯度或形成循环引用；在步骤19 让变量更易用验收中只注入这一处",
    "沿“API输入 → 图连接 → 梯度汇聚 → 资源释放 → 回归兼容”寻找最早的对象、图边、梯度、资源或模式分叉",
    "撤销故障重放；只有“多输入输出、梯度累加、generation顺序、weakref、Config模式和运算符分派一致；步骤19 让变量更易用的新增能力不得破坏此前步骤”恢复才接受修正",
  ],
  invariant:
    "多输入输出、梯度累加、generation顺序、weakref、Config模式和运算符分派一致；步骤19 让变量更易用的新增能力不得破坏此前步骤",
  fault:
    "API更易用却丢失一条边、覆盖共享梯度或形成循环引用；在步骤19 让变量更易用验收中只注入这一处",
  artifact:
    "dl2-step-19代码补丁、对象/边快照、输入输出shape、前向缓存、梯度轨迹、资源状态、回归测试与失败复现",
  gates: [
    {
      label: "快照、对象与公共API",
      detail:
        "“步骤19 让变量更易用”的代码快照、前置API、对象身份、dtype/shape、允许读取的信息和版本可追溯。",
    },
    {
      label: "计算图与拓扑顺序",
      detail:
        "“步骤19 让变量更易用”的输入输出对象、creator边、generation队列、前向缓存和输出shape已冻结。",
    },
    {
      label: "梯度与资源生命周期",
      detail:
        "“步骤19 让变量更易用”的上游/局部/累加梯度、数值对照、weakref、缓存释放和异常轨迹可重放。",
    },
    {
      label: "模式、设备与历史回归",
      detail:
        "“步骤19 让变量更易用”归档训练/测试模式、CPU/GPU状态、此前步骤回归、反例、复现环境和时间标签。",
    },
  ],
} as const satisfies DezeroEvidenceModel;

export function Dl2Step19UsableVariableGraphContractLab() {
  return <DezeroEvidenceLab model={model} view="graph-contract" />;
}

export function Dl2Step19UsableVariableBackwardTraceLab() {
  return <DezeroEvidenceLab model={model} view="backward-trace" />;
}

export function Dl2Step19UsableVariableFrameworkGateLab() {
  return <DezeroEvidenceLab model={model} view="framework-gate" />;
}
