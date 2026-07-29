"use client";

import {
  OfficialVulkanExecutionLab,
  type VulkanConceptNode,
  type VulkanExperimentModel,
} from "./official-vulkan-execution-lab";

const unitTitle = "多线程Vulkan应用程序";
const nodes = [
  {
    label: "command pool",
    unit: "Command Pools, Command Buffers, Queue Submission, and Threading",
    mechanism:
      "command pool管理同一queue family的command buffer分配与重置；外部同步要求同一pool不能被多个线程无保护并发访问。record只编码命令，queue submission才建立执行批次，secondary buffer适合明确继承边界的并行录制。",
    probe: "pool线程归属、buffer状态、submit批次、等待/信号值和fence",
  },
  {
    label: "command buffer",
    unit: "Command Pools, Command Buffers, Queue Submission, and Threading",
    mechanism:
      "command pool管理同一queue family的command buffer分配与重置；外部同步要求同一pool不能被多个线程无保护并发访问。record只编码命令，queue submission才建立执行批次，secondary buffer适合明确继承边界的并行录制。",
    probe: "pool线程归属、buffer状态、submit批次、等待/信号值和fence",
  },
  {
    label: "record",
    unit: "Command Pools, Command Buffers, Queue Submission, and Threading",
    mechanism:
      "command pool管理同一queue family的command buffer分配与重置；外部同步要求同一pool不能被多个线程无保护并发访问。record只编码命令，queue submission才建立执行批次，secondary buffer适合明确继承边界的并行录制。",
    probe: "pool线程归属、buffer状态、submit批次、等待/信号值和fence",
  },
  {
    label: "vkqueuesubmit",
    unit: "Command Pools, Command Buffers, Queue Submission, and Threading",
    mechanism:
      "command pool管理同一queue family的command buffer分配与重置；外部同步要求同一pool不能被多个线程无保护并发访问。record只编码命令，queue submission才建立执行批次，secondary buffer适合明确继承边界的并行录制。",
    probe: "pool线程归属、buffer状态、submit批次、等待/信号值和fence",
  },
  {
    label: "secondary command buffer",
    unit: "Command Pools, Command Buffers, Queue Submission, and Threading",
    mechanism:
      "command pool管理同一queue family的command buffer分配与重置；外部同步要求同一pool不能被多个线程无保护并发访问。record只编码命令，queue submission才建立执行批次，secondary buffer适合明确继承边界的并行录制。",
    probe: "pool线程归属、buffer状态、submit批次、等待/信号值和fence",
  },
  {
    label: "thread",
    unit: "Command Pools, Command Buffers, Queue Submission, and Threading",
    mechanism:
      "command pool管理同一queue family的command buffer分配与重置；外部同步要求同一pool不能被多个线程无保护并发访问。record只编码命令，queue submission才建立执行批次，secondary buffer适合明确继承边界的并行录制。",
    probe: "pool线程归属、buffer状态、submit批次、等待/信号值和fence",
  },
] satisfies VulkanConceptNode[];
const model = {
  focus: "按线程所有权录制command buffer并构造可复用提交",
  formula: "Submit=Waits+CommandBuffers+Signals",
  invariant:
    "多线程Vulkan应用程序的输入、状态、输出与恢复结果可用同一证据包重放",
  fault: "多个线程并发重置同一command pool，或执行仍处pending状态的buffer",
  evidence: "pool线程归属、buffer状态、submit批次、等待/信号值和fence",
  sourceLabel: "Khronos Vulkan Guide",
} satisfies VulkanExperimentModel;
const props = { unitTitle, nodes, model };

export function VkgCh14MultithreadingExecutionLab() {
  return <OfficialVulkanExecutionLab mode="execution" {...props} />;
}

export function VkgCh14MultithreadingHazardLab() {
  return <OfficialVulkanExecutionLab mode="hazard" {...props} />;
}

export function VkgCh14MultithreadingEvidenceLab() {
  return <OfficialVulkanExecutionLab mode="evidence" {...props} />;
}
