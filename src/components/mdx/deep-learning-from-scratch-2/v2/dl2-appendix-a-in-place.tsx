"use client";

import {
  DezeroEvidenceLab,
  type DezeroEvidenceModel,
} from "./dezero-evidence-lab";

const model = {
  unitId: "dl2-app-a",
  title: "附录A in-place运算（步骤14的补充内容）",
  question:
    "怎样在补充场景中保持缓存、切片梯度和运行环境可重放？ 当前步骤新增的最小能力和失败边界分别是什么？",
  concepts: [
    "附录A in-place运算（步骤14的补充内容）",
    "A.1 问题确认",
    "A.2 关于复制和覆盖",
    "A.3 DeZero的反向传播",
  ],
  stages: [
    {
      name: "补充前提",
      input:
        "附录A in-place运算（步骤14的补充内容）：锁定上一步快照、对象与公共API，保持其余DeZero合同不变",
      operation:
        "冻结版本、对象身份、dtype/shape、图边和允许读取的信息，并持续满足“别名/复制、切片索引、梯度散射、依赖版本和运行设备均明确；附录A in-place运算（步骤14的补充内容）的新增能力不得破坏此前步骤”",
      output: "补充前提产生可追溯框架前置状态",
      check:
        "可追溯框架前置状态、身份/shape/梯度断言；出现“原地覆盖前向缓存，或切片反向遗漏重复索引的梯度累加；在附录A in-place运算（步骤14的补充内容）验收中只注入这一处”时停止",
    },
    {
      name: "执行边界操作",
      input:
        "附录A in-place运算（步骤14的补充内容）：执行本步新增的类、函数或算子，保持其余DeZero合同不变",
      operation:
        "保存对象、输入输出shape、creator/generation、参数与缓存，并持续满足“别名/复制、切片索引、梯度散射、依赖版本和运行设备均明确；附录A in-place运算（步骤14的补充内容）的新增能力不得破坏此前步骤”",
      output: "执行边界操作产生可重放计算图状态",
      check:
        "可重放计算图状态、身份/shape/梯度断言；出现“原地覆盖前向缓存，或切片反向遗漏重复索引的梯度累加；在附录A in-place运算（步骤14的补充内容）验收中只注入这一处”时停止",
    },
    {
      name: "记录缓存",
      input:
        "附录A in-place运算（步骤14的补充内容）：执行局部反向、图调度或资源更新，保持其余DeZero合同不变",
      operation:
        "保存上游梯度、归约轴、队列、差分误差和生命周期，并持续满足“别名/复制、切片索引、梯度散射、依赖版本和运行设备均明确；附录A in-place运算（步骤14的补充内容）的新增能力不得破坏此前步骤”",
      output: "记录缓存产生可复核反向状态",
      check:
        "可复核反向状态、身份/shape/梯度断言；出现“原地覆盖前向缓存，或切片反向遗漏重复索引的梯度累加；在附录A in-place运算（步骤14的补充内容）验收中只注入这一处”时停止",
    },
    {
      name: "反向复核",
      input:
        "附录A in-place运算（步骤14的补充内容）：运行本步示例和单一故障注入，保持其余DeZero合同不变",
      operation:
        "保存API调用、输出、异常、模式/设备和回退差分，并持续满足“别名/复制、切片索引、梯度散射、依赖版本和运行设备均明确；附录A in-place运算（步骤14的补充内容）的新增能力不得破坏此前步骤”",
      output: "反向复核产生可比较框架行为",
      check:
        "可比较框架行为、身份/shape/梯度断言；出现“原地覆盖前向缓存，或切片反向遗漏重复索引的梯度累加；在附录A in-place运算（步骤14的补充内容）验收中只注入这一处”时停止",
    },
    {
      name: "环境回归",
      input:
        "附录A in-place运算（步骤14的补充内容）：重跑此前全部步骤的回归测试，保持其余DeZero合同不变",
      operation:
        "检查图、梯度、内存、设备、模式和历史兼容，并持续满足“别名/复制、切片索引、梯度散射、依赖版本和运行设备均明确；附录A in-place运算（步骤14的补充内容）的新增能力不得破坏此前步骤”",
      output: "环境回归产生独立框架证据包",
      check:
        "独立框架证据包、身份/shape/梯度断言；出现“原地覆盖前向缓存，或切片反向遗漏重复索引的梯度累加；在附录A in-place运算（步骤14的补充内容）验收中只注入这一处”时停止",
    },
  ],
  cases: [
    {
      name: "参考运行",
      observation:
        "从上一步DeZero快照出发，只实现“附录A in-place运算（步骤14的补充内容）”，再用参考图与单故障图做差分回归。 固定代码快照、对象图、输入、shape、顺序、容差和种子。",
      prediction:
        "沿“补充前提 → 执行边界操作 → 记录缓存 → 反向复核 → 环境回归”得到可复核框架增量。",
      boundary:
        "全过程必须满足“别名/复制、切片索引、梯度散射、依赖版本和运行设备均明确；附录A in-place运算（步骤14的补充内容）的新增能力不得破坏此前步骤”。",
    },
    {
      name: "边界反例",
      observation:
        "从上一步DeZero快照出发，只实现“附录A in-place运算（步骤14的补充内容）”，再用参考图与单故障图做差分回归。 其余条件不变，只注入“原地覆盖前向缓存，或切片反向遗漏重复索引的梯度累加；在附录A in-place运算（步骤14的补充内容）验收中只注入这一处”。",
      prediction:
        "定位第一处对象、边、拓扑、梯度、资源、设备或模式状态偏离，并拒绝结论。",
      boundary: "失败轨迹必须保留；撤销故障后以相同输入重放。",
    },
  ],
  referenceTrace: [
    "为“附录A in-place运算（步骤14的补充内容）”冻结代码快照、对象图、dtype/shape、顺序、容差和随机种子",
    "执行补充前提、执行边界操作，保存对象、边、输入输出、参数与缓存",
    "推进记录缓存、反向复核，记录梯度、调度、资源与模式状态",
    "在环境回归交付dl2-app-a代码补丁、对象/边快照、输入输出shape、前向缓存、梯度轨迹、资源状态、回归测试与失败复现。",
  ],
  faultTrace: [
    "“附录A in-place运算（步骤14的补充内容）”复用相同代码快照、对象图、dtype/shape、顺序、容差和种子",
    "只改变一个条件：原地覆盖前向缓存，或切片反向遗漏重复索引的梯度累加；在附录A in-place运算（步骤14的补充内容）验收中只注入这一处",
    "沿“补充前提 → 执行边界操作 → 记录缓存 → 反向复核 → 环境回归”寻找最早的对象、图边、梯度、资源或模式分叉",
    "撤销故障重放；只有“别名/复制、切片索引、梯度散射、依赖版本和运行设备均明确；附录A in-place运算（步骤14的补充内容）的新增能力不得破坏此前步骤”恢复才接受修正",
  ],
  invariant:
    "别名/复制、切片索引、梯度散射、依赖版本和运行设备均明确；附录A in-place运算（步骤14的补充内容）的新增能力不得破坏此前步骤",
  fault:
    "原地覆盖前向缓存，或切片反向遗漏重复索引的梯度累加；在附录A in-place运算（步骤14的补充内容）验收中只注入这一处",
  artifact:
    "dl2-app-a代码补丁、对象/边快照、输入输出shape、前向缓存、梯度轨迹、资源状态、回归测试与失败复现",
  gates: [
    {
      label: "快照、对象与公共API",
      detail:
        "“附录A in-place运算（步骤14的补充内容）”的代码快照、前置API、对象身份、dtype/shape、允许读取的信息和版本可追溯。",
    },
    {
      label: "计算图与拓扑顺序",
      detail:
        "“附录A in-place运算（步骤14的补充内容）”的输入输出对象、creator边、generation队列、前向缓存和输出shape已冻结。",
    },
    {
      label: "梯度与资源生命周期",
      detail:
        "“附录A in-place运算（步骤14的补充内容）”的上游/局部/累加梯度、数值对照、weakref、缓存释放和异常轨迹可重放。",
    },
    {
      label: "模式、设备与历史回归",
      detail:
        "“附录A in-place运算（步骤14的补充内容）”归档训练/测试模式、CPU/GPU状态、此前步骤回归、反例、复现环境和时间标签。",
    },
  ],
} as const satisfies DezeroEvidenceModel;

export function Dl2AppendixAInPlaceGraphContractLab() {
  return <DezeroEvidenceLab model={model} view="graph-contract" />;
}

export function Dl2AppendixAInPlaceBackwardTraceLab() {
  return <DezeroEvidenceLab model={model} view="backward-trace" />;
}

export function Dl2AppendixAInPlaceFrameworkGateLab() {
  return <DezeroEvidenceLab model={model} view="framework-gate" />;
}
