"use client";

import {
  OfficialVulkanExecutionLab,
  type VulkanConceptNode,
  type VulkanExperimentModel,
} from "./official-vulkan-execution-lab";

const unitTitle = "指令缓存与内存管理";
const nodes = [
  {
    label: "memory allocation",
    unit: "Memory Allocation, Buffers, Images, Transfers, and Ownership",
    mechanism:
      "VkBuffer和VkImage先声明用途，再查询memory requirements并绑定满足memoryTypeBits的分配。staging路径把host写入与device-local消费分开；跨queue family使用还需明确ownership transfer。",
    probe:
      "requirements、memory type、绑定偏移、copy范围、layout和owner family",
  },
  {
    label: "vkbuffer",
    unit: "Memory Allocation, Buffers, Images, Transfers, and Ownership",
    mechanism:
      "VkBuffer和VkImage先声明用途，再查询memory requirements并绑定满足memoryTypeBits的分配。staging路径把host写入与device-local消费分开；跨queue family使用还需明确ownership transfer。",
    probe:
      "requirements、memory type、绑定偏移、copy范围、layout和owner family",
  },
  {
    label: "vkimage",
    unit: "Memory Allocation, Buffers, Images, Transfers, and Ownership",
    mechanism:
      "VkBuffer和VkImage先声明用途，再查询memory requirements并绑定满足memoryTypeBits的分配。staging路径把host写入与device-local消费分开；跨queue family使用还需明确ownership transfer。",
    probe:
      "requirements、memory type、绑定偏移、copy范围、layout和owner family",
  },
  {
    label: "staging",
    unit: "Memory Allocation, Buffers, Images, Transfers, and Ownership",
    mechanism:
      "VkBuffer和VkImage先声明用途，再查询memory requirements并绑定满足memoryTypeBits的分配。staging路径把host写入与device-local消费分开；跨queue family使用还需明确ownership transfer。",
    probe:
      "requirements、memory type、绑定偏移、copy范围、layout和owner family",
  },
  {
    label: "memory type",
    unit: "Memory Allocation, Buffers, Images, Transfers, and Ownership",
    mechanism:
      "VkBuffer和VkImage先声明用途，再查询memory requirements并绑定满足memoryTypeBits的分配。staging路径把host写入与device-local消费分开；跨queue family使用还需明确ownership transfer。",
    probe:
      "requirements、memory type、绑定偏移、copy范围、layout和owner family",
  },
  {
    label: "queue family ownership",
    unit: "Memory Allocation, Buffers, Images, Transfers, and Ownership",
    mechanism:
      "VkBuffer和VkImage先声明用途，再查询memory requirements并绑定满足memoryTypeBits的分配。staging路径把host写入与device-local消费分开；跨queue family使用还需明确ownership transfer。",
    probe:
      "requirements、memory type、绑定偏移、copy范围、layout和owner family",
  },
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
  focus:
    "把buffer/image需求匹配到内存类型、绑定、传输与所有权；按线程所有权录制command buffer并构造可复用提交",
  formula:
    "typeBits\\land properties\\ne 0 ; Submit=Waits+CommandBuffers+Signals",
  invariant: "指令缓存与内存管理的输入、状态、输出与恢复结果可用同一证据包重放",
  fault:
    "只按属性标志挑内存却忽略memoryTypeBits，或跨队列使用未转移所有权；多个线程并发重置同一command pool，或执行仍处pending状态的buffer",
  evidence:
    "requirements、memory type、绑定偏移、copy范围、layout和owner family、pool线程归属、buffer状态、submit批次、等待/信号值和fence",
  sourceLabel: "Khronos Vulkan Guide",
} satisfies VulkanExperimentModel;
const props = { unitTitle, nodes, model };

export function VkgCh05CommandMemoryExecutionLab() {
  return <OfficialVulkanExecutionLab mode="execution" {...props} />;
}

export function VkgCh05CommandMemoryHazardLab() {
  return <OfficialVulkanExecutionLab mode="hazard" {...props} />;
}

export function VkgCh05CommandMemoryEvidenceLab() {
  return <OfficialVulkanExecutionLab mode="evidence" {...props} />;
}
