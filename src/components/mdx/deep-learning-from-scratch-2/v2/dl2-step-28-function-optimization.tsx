"use client";

import {
  DezeroEvidenceLab,
  type DezeroEvidenceModel,
} from "./dezero-evidence-lab";

const model = {
  unitId: "dl2-step-28",
  title: "步骤28 函数优化",
  question:
    "怎样让反向传播本身也由Variable和Function表达，从而支持二阶及更高阶导数？ 当前步骤新增的最小能力和失败边界分别是什么？",
  concepts: [
    "步骤28 函数优化",
    "28.1 Rosenbrock函数",
    "28.2 求导",
    "28.3 梯度下降法的实现",
  ],
  stages: [
    {
      name: "可视化前向图",
      input:
        "步骤28 函数优化：锁定上一步快照、对象与公共API，保持其余DeZero合同不变",
      operation:
        "冻结版本、对象身份、dtype/shape、图边和允许读取的信息，并持续满足“create_graph模式、反向算子、图可视化、重复backward和高阶数值对照一致；步骤28 函数优化的新增能力不得破坏此前步骤”",
      output: "可视化前向图产生可追溯框架前置状态",
      check:
        "可追溯框架前置状态、身份/shape/梯度断言；出现“反向阶段使用裸ndarray切断计算图，仍声称支持double backprop；在步骤28 函数优化验收中只注入这一处”时停止",
    },
    {
      name: "构建一阶图",
      input:
        "步骤28 函数优化：执行本步新增的类、函数或算子，保持其余DeZero合同不变",
      operation:
        "保存对象、输入输出shape、creator/generation、参数与缓存，并持续满足“create_graph模式、反向算子、图可视化、重复backward和高阶数值对照一致；步骤28 函数优化的新增能力不得破坏此前步骤”",
      output: "构建一阶图产生可重放计算图状态",
      check:
        "可重放计算图状态、身份/shape/梯度断言；出现“反向阶段使用裸ndarray切断计算图，仍声称支持double backprop；在步骤28 函数优化验收中只注入这一处”时停止",
    },
    {
      name: "保留反向图",
      input:
        "步骤28 函数优化：执行局部反向、图调度或资源更新，保持其余DeZero合同不变",
      operation:
        "保存上游梯度、归约轴、队列、差分误差和生命周期，并持续满足“create_graph模式、反向算子、图可视化、重复backward和高阶数值对照一致；步骤28 函数优化的新增能力不得破坏此前步骤”",
      output: "保留反向图产生可复核反向状态",
      check:
        "可复核反向状态、身份/shape/梯度断言；出现“反向阶段使用裸ndarray切断计算图，仍声称支持double backprop；在步骤28 函数优化验收中只注入这一处”时停止",
    },
    {
      name: "再次反向",
      input:
        "步骤28 函数优化：运行本步示例和单一故障注入，保持其余DeZero合同不变",
      operation:
        "保存API调用、输出、异常、模式/设备和回退差分，并持续满足“create_graph模式、反向算子、图可视化、重复backward和高阶数值对照一致；步骤28 函数优化的新增能力不得破坏此前步骤”",
      output: "再次反向产生可比较框架行为",
      check:
        "可比较框架行为、身份/shape/梯度断言；出现“反向阶段使用裸ndarray切断计算图，仍声称支持double backprop；在步骤28 函数优化验收中只注入这一处”时停止",
    },
    {
      name: "高阶对照",
      input:
        "步骤28 函数优化：重跑此前全部步骤的回归测试，保持其余DeZero合同不变",
      operation:
        "检查图、梯度、内存、设备、模式和历史兼容，并持续满足“create_graph模式、反向算子、图可视化、重复backward和高阶数值对照一致；步骤28 函数优化的新增能力不得破坏此前步骤”",
      output: "高阶对照产生独立框架证据包",
      check:
        "独立框架证据包、身份/shape/梯度断言；出现“反向阶段使用裸ndarray切断计算图，仍声称支持double backprop；在步骤28 函数优化验收中只注入这一处”时停止",
    },
  ],
  cases: [
    {
      name: "参考运行",
      observation:
        "从上一步DeZero快照出发，只实现“步骤28 函数优化”，再用参考图与单故障图做差分回归。 固定代码快照、对象图、输入、shape、顺序、容差和种子。",
      prediction:
        "沿“可视化前向图 → 构建一阶图 → 保留反向图 → 再次反向 → 高阶对照”得到可复核框架增量。",
      boundary:
        "全过程必须满足“create_graph模式、反向算子、图可视化、重复backward和高阶数值对照一致；步骤28 函数优化的新增能力不得破坏此前步骤”。",
    },
    {
      name: "边界反例",
      observation:
        "从上一步DeZero快照出发，只实现“步骤28 函数优化”，再用参考图与单故障图做差分回归。 其余条件不变，只注入“反向阶段使用裸ndarray切断计算图，仍声称支持double backprop；在步骤28 函数优化验收中只注入这一处”。",
      prediction:
        "定位第一处对象、边、拓扑、梯度、资源、设备或模式状态偏离，并拒绝结论。",
      boundary: "失败轨迹必须保留；撤销故障后以相同输入重放。",
    },
  ],
  referenceTrace: [
    "为“步骤28 函数优化”冻结代码快照、对象图、dtype/shape、顺序、容差和随机种子",
    "执行可视化前向图、构建一阶图，保存对象、边、输入输出、参数与缓存",
    "推进保留反向图、再次反向，记录梯度、调度、资源与模式状态",
    "在高阶对照交付dl2-step-28代码补丁、对象/边快照、输入输出shape、前向缓存、梯度轨迹、资源状态、回归测试与失败复现。",
  ],
  faultTrace: [
    "“步骤28 函数优化”复用相同代码快照、对象图、dtype/shape、顺序、容差和种子",
    "只改变一个条件：反向阶段使用裸ndarray切断计算图，仍声称支持double backprop；在步骤28 函数优化验收中只注入这一处",
    "沿“可视化前向图 → 构建一阶图 → 保留反向图 → 再次反向 → 高阶对照”寻找最早的对象、图边、梯度、资源或模式分叉",
    "撤销故障重放；只有“create_graph模式、反向算子、图可视化、重复backward和高阶数值对照一致；步骤28 函数优化的新增能力不得破坏此前步骤”恢复才接受修正",
  ],
  invariant:
    "create_graph模式、反向算子、图可视化、重复backward和高阶数值对照一致；步骤28 函数优化的新增能力不得破坏此前步骤",
  fault:
    "反向阶段使用裸ndarray切断计算图，仍声称支持double backprop；在步骤28 函数优化验收中只注入这一处",
  artifact:
    "dl2-step-28代码补丁、对象/边快照、输入输出shape、前向缓存、梯度轨迹、资源状态、回归测试与失败复现",
  gates: [
    {
      label: "快照、对象与公共API",
      detail:
        "“步骤28 函数优化”的代码快照、前置API、对象身份、dtype/shape、允许读取的信息和版本可追溯。",
    },
    {
      label: "计算图与拓扑顺序",
      detail:
        "“步骤28 函数优化”的输入输出对象、creator边、generation队列、前向缓存和输出shape已冻结。",
    },
    {
      label: "梯度与资源生命周期",
      detail:
        "“步骤28 函数优化”的上游/局部/累加梯度、数值对照、weakref、缓存释放和异常轨迹可重放。",
    },
    {
      label: "模式、设备与历史回归",
      detail:
        "“步骤28 函数优化”归档训练/测试模式、CPU/GPU状态、此前步骤回归、反例、复现环境和时间标签。",
    },
  ],
} as const satisfies DezeroEvidenceModel;

export function Dl2Step28FunctionOptimizationGraphContractLab() {
  return <DezeroEvidenceLab model={model} view="graph-contract" />;
}

export function Dl2Step28FunctionOptimizationBackwardTraceLab() {
  return <DezeroEvidenceLab model={model} view="backward-trace" />;
}

export function Dl2Step28FunctionOptimizationFrameworkGateLab() {
  return <DezeroEvidenceLab model={model} view="framework-gate" />;
}
