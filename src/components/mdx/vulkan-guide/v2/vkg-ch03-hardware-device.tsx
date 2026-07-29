"use client";

import {
  OfficialVulkanExecutionLab,
  type VulkanConceptNode,
  type VulkanExperimentModel,
} from "./official-vulkan-execution-lab";

const unitTitle = "连接硬件设备";
const nodes = [
  {
    label: "vkinstance",
    unit: "Instance, Physical and Logical Devices, Features, and Queues",
    mechanism:
      "VkPhysicalDevice描述硬件、限制、格式和queue family；VkDevice只启用明确请求的feature与extension。队列由family能力和创建数量决定，图形、计算与传输职责可能共享也可能分离。",
    probe: "设备属性、features链、queue family位、扩展和创建参数",
  },
  {
    label: "vkphysicaldevice",
    unit: "Instance, Physical and Logical Devices, Features, and Queues",
    mechanism:
      "VkPhysicalDevice描述硬件、限制、格式和queue family；VkDevice只启用明确请求的feature与extension。队列由family能力和创建数量决定，图形、计算与传输职责可能共享也可能分离。",
    probe: "设备属性、features链、queue family位、扩展和创建参数",
  },
  {
    label: "vkdevice",
    unit: "Instance, Physical and Logical Devices, Features, and Queues",
    mechanism:
      "VkPhysicalDevice描述硬件、限制、格式和queue family；VkDevice只启用明确请求的feature与extension。队列由family能力和创建数量决定，图形、计算与传输职责可能共享也可能分离。",
    probe: "设备属性、features链、queue family位、扩展和创建参数",
  },
  {
    label: "queue family",
    unit: "Instance, Physical and Logical Devices, Features, and Queues",
    mechanism:
      "VkPhysicalDevice描述硬件、限制、格式和queue family；VkDevice只启用明确请求的feature与extension。队列由family能力和创建数量决定，图形、计算与传输职责可能共享也可能分离。",
    probe: "设备属性、features链、queue family位、扩展和创建参数",
  },
  {
    label: "feature",
    unit: "Instance, Physical and Logical Devices, Features, and Queues",
    mechanism:
      "VkPhysicalDevice描述硬件、限制、格式和queue family；VkDevice只启用明确请求的feature与extension。队列由family能力和创建数量决定，图形、计算与传输职责可能共享也可能分离。",
    probe: "设备属性、features链、queue family位、扩展和创建参数",
  },
  {
    label: "extension",
    unit: "Instance, Physical and Logical Devices, Features, and Queues",
    mechanism:
      "VkPhysicalDevice描述硬件、限制、格式和queue family；VkDevice只启用明确请求的feature与extension。队列由family能力和创建数量决定，图形、计算与传输职责可能共享也可能分离。",
    probe: "设备属性、features链、queue family位、扩展和创建参数",
  },
] satisfies VulkanConceptNode[];
const model = {
  focus: "从物理设备能力筛选逻辑设备特性与队列合同",
  formula: "Device=select(Properties,Features,Queues)",
  invariant: "连接硬件设备的输入、状态、输出与恢复结果可用同一证据包重放",
  fault: "查询到feature却未在device creation启用，或假设queue family索引固定",
  evidence: "设备属性、features链、queue family位、扩展和创建参数",
  sourceLabel: "Khronos Vulkan Guide",
} satisfies VulkanExperimentModel;
const props = { unitTitle, nodes, model };

export function VkgCh03HardwareDeviceExecutionLab() {
  return <OfficialVulkanExecutionLab mode="execution" {...props} />;
}

export function VkgCh03HardwareDeviceHazardLab() {
  return <OfficialVulkanExecutionLab mode="hazard" {...props} />;
}

export function VkgCh03HardwareDeviceEvidenceLab() {
  return <OfficialVulkanExecutionLab mode="evidence" {...props} />;
}
