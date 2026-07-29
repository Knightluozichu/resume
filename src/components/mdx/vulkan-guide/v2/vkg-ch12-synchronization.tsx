"use client";

import {
  OfficialVulkanExecutionLab,
  type VulkanConceptNode,
  type VulkanExperimentModel,
} from "./official-vulkan-execution-lab";

const unitTitle = "同步原语：栅栏、信号量与事件";
const nodes = [
  {
    label: "synchronization2",
    unit: "Synchronization2, Barriers, Binary and Timeline Semaphores, and Fences",
    mechanism:
      "barrier同时描述源/目标stage与源/目标access，只有覆盖生产者写入和消费者访问才建立正确可见性。binary/timeline semaphore协调提交，fence让host观察完成；它们不能替代资源layout和access范围。",
    probe: "资源、生产者stage/access、消费者stage/access、layout、队列和信号值",
  },
  {
    label: "pipeline barrier",
    unit: "Synchronization2, Barriers, Binary and Timeline Semaphores, and Fences",
    mechanism:
      "barrier同时描述源/目标stage与源/目标access，只有覆盖生产者写入和消费者访问才建立正确可见性。binary/timeline semaphore协调提交，fence让host观察完成；它们不能替代资源layout和access范围。",
    probe: "资源、生产者stage/access、消费者stage/access、layout、队列和信号值",
  },
  {
    label: "memory dependency",
    unit: "Synchronization2, Barriers, Binary and Timeline Semaphores, and Fences",
    mechanism:
      "barrier同时描述源/目标stage与源/目标access，只有覆盖生产者写入和消费者访问才建立正确可见性。binary/timeline semaphore协调提交，fence让host观察完成；它们不能替代资源layout和access范围。",
    probe: "资源、生产者stage/access、消费者stage/access、layout、队列和信号值",
  },
  {
    label: "timeline semaphore",
    unit: "Synchronization2, Barriers, Binary and Timeline Semaphores, and Fences",
    mechanism:
      "barrier同时描述源/目标stage与源/目标access，只有覆盖生产者写入和消费者访问才建立正确可见性。binary/timeline semaphore协调提交，fence让host观察完成；它们不能替代资源layout和access范围。",
    probe: "资源、生产者stage/access、消费者stage/access、layout、队列和信号值",
  },
  {
    label: "binary semaphore",
    unit: "Synchronization2, Barriers, Binary and Timeline Semaphores, and Fences",
    mechanism:
      "barrier同时描述源/目标stage与源/目标access，只有覆盖生产者写入和消费者访问才建立正确可见性。binary/timeline semaphore协调提交，fence让host观察完成；它们不能替代资源layout和access范围。",
    probe: "资源、生产者stage/access、消费者stage/access、layout、队列和信号值",
  },
  {
    label: "fence",
    unit: "Synchronization2, Barriers, Binary and Timeline Semaphores, and Fences",
    mechanism:
      "barrier同时描述源/目标stage与源/目标access，只有覆盖生产者写入和消费者访问才建立正确可见性。binary/timeline semaphore协调提交，fence让host观察完成；它们不能替代资源layout和access范围。",
    probe: "资源、生产者stage/access、消费者stage/access、layout、队列和信号值",
  },
] satisfies VulkanConceptNode[];
const model = {
  focus: "用execution dependency与memory dependency修复真实资源hazard",
  formula:
    "Write\\xrightarrow[access]{stage}Barrier\\xrightarrow[access]{stage}Read",
  invariant:
    "同步原语：栅栏、信号量与事件的输入、状态、输出与恢复结果可用同一证据包重放",
  fault: "只使用TOP/BOTTOM泛化stage，或等待semaphore却遗漏图像layout与访问屏障",
  evidence:
    "资源、生产者stage/access、消费者stage/access、layout、队列和信号值",
  sourceLabel: "Khronos Vulkan Guide",
} satisfies VulkanExperimentModel;
const props = { unitTitle, nodes, model };

export function VkgCh12SynchronizationExecutionLab() {
  return <OfficialVulkanExecutionLab mode="execution" {...props} />;
}

export function VkgCh12SynchronizationHazardLab() {
  return <OfficialVulkanExecutionLab mode="hazard" {...props} />;
}

export function VkgCh12SynchronizationEvidenceLab() {
  return <OfficialVulkanExecutionLab mode="evidence" {...props} />;
}
