"use client";

import {
  OfficialVulkanExecutionLab,
  type VulkanConceptNode,
  type VulkanExperimentModel,
} from "./official-vulkan-execution-lab";

const unitTitle = "你的第一个Vulkan伪代码程序";
const nodes = [
  {
    label: "explicit api",
    unit: "Vulkan Architecture, Versions, Validation, and SPIR-V",
    mechanism:
      "Vulkan是显式API，但应用仍必须查询loader支持版本、实例扩展和设备能力。validation layer是开发期诊断层，不能改变规范语义；SPIR-V是shader中间表示，其capability与目标环境必须兼容设备。",
    probe: "loader版本、实例扩展、验证消息、SPIR-V环境和VUID",
  },
  {
    label: "vulkan version",
    unit: "Vulkan Architecture, Versions, Validation, and SPIR-V",
    mechanism:
      "Vulkan是显式API，但应用仍必须查询loader支持版本、实例扩展和设备能力。validation layer是开发期诊断层，不能改变规范语义；SPIR-V是shader中间表示，其capability与目标环境必须兼容设备。",
    probe: "loader版本、实例扩展、验证消息、SPIR-V环境和VUID",
  },
  {
    label: "validation layer",
    unit: "Vulkan Architecture, Versions, Validation, and SPIR-V",
    mechanism:
      "Vulkan是显式API，但应用仍必须查询loader支持版本、实例扩展和设备能力。validation layer是开发期诊断层，不能改变规范语义；SPIR-V是shader中间表示，其capability与目标环境必须兼容设备。",
    probe: "loader版本、实例扩展、验证消息、SPIR-V环境和VUID",
  },
  {
    label: "spir-v",
    unit: "Vulkan Architecture, Versions, Validation, and SPIR-V",
    mechanism:
      "Vulkan是显式API，但应用仍必须查询loader支持版本、实例扩展和设备能力。validation layer是开发期诊断层，不能改变规范语义；SPIR-V是shader中间表示，其capability与目标环境必须兼容设备。",
    probe: "loader版本、实例扩展、验证消息、SPIR-V环境和VUID",
  },
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
  {
    label: "wsi",
    unit: "Window System Integration, Surface, Swapchain, Acquire, and Present",
    mechanism:
      "WSI把平台窗口surface连接到VkSwapchainKHR。acquire只取得可用图像索引，present等待渲染完成后交给呈现引擎；OUT_OF_DATE与SUBOPTIMAL要求应用按surface capabilities重新选择extent、format与present mode。",
    probe: "acquire结果、image index、等待信号量、present结果和重建代次",
  },
  {
    label: "vksurfacekhr",
    unit: "Window System Integration, Surface, Swapchain, Acquire, and Present",
    mechanism:
      "WSI把平台窗口surface连接到VkSwapchainKHR。acquire只取得可用图像索引，present等待渲染完成后交给呈现引擎；OUT_OF_DATE与SUBOPTIMAL要求应用按surface capabilities重新选择extent、format与present mode。",
    probe: "acquire结果、image index、等待信号量、present结果和重建代次",
  },
  {
    label: "vkswapchainkhr",
    unit: "Window System Integration, Surface, Swapchain, Acquire, and Present",
    mechanism:
      "WSI把平台窗口surface连接到VkSwapchainKHR。acquire只取得可用图像索引，present等待渲染完成后交给呈现引擎；OUT_OF_DATE与SUBOPTIMAL要求应用按surface capabilities重新选择extent、format与present mode。",
    probe: "acquire结果、image index、等待信号量、present结果和重建代次",
  },
  {
    label: "vkacquirenextimage",
    unit: "Window System Integration, Surface, Swapchain, Acquire, and Present",
    mechanism:
      "WSI把平台窗口surface连接到VkSwapchainKHR。acquire只取得可用图像索引，present等待渲染完成后交给呈现引擎；OUT_OF_DATE与SUBOPTIMAL要求应用按surface capabilities重新选择extent、format与present mode。",
    probe: "acquire结果、image index、等待信号量、present结果和重建代次",
  },
  {
    label: "vkqueuepresent",
    unit: "Window System Integration, Surface, Swapchain, Acquire, and Present",
    mechanism:
      "WSI把平台窗口surface连接到VkSwapchainKHR。acquire只取得可用图像索引，present等待渲染完成后交给呈现引擎；OUT_OF_DATE与SUBOPTIMAL要求应用按surface capabilities重新选择extent、format与present mode。",
    probe: "acquire结果、image index、等待信号量、present结果和重建代次",
  },
  {
    label: "out_of_date",
    unit: "Window System Integration, Surface, Swapchain, Acquire, and Present",
    mechanism:
      "WSI把平台窗口surface连接到VkSwapchainKHR。acquire只取得可用图像索引，present等待渲染完成后交给呈现引擎；OUT_OF_DATE与SUBOPTIMAL要求应用按surface capabilities重新选择extent、format与present mode。",
    probe: "acquire结果、image index、等待信号量、present结果和重建代次",
  },
] satisfies VulkanConceptNode[];
const model = {
  focus:
    "以实例版本、验证层与SPIR-V能力建立Vulkan运行边界；从物理设备能力筛选逻辑设备特性与队列合同；让surface、swapchain、acquire与present形成可恢复帧循环",
  formula:
    "Usable=Version\\cap Extensions\\cap Features ; Device=select(Properties,Features,Queues) ; Acquire\\rightarrow Render\\rightarrow Present\\rightarrow Recreate?",
  invariant:
    "你的第一个Vulkan伪代码程序的输入、状态、输出与恢复结果可用同一证据包重放",
  fault:
    "请求未支持实例版本，或把验证层通过当成程序逻辑正确；查询到feature却未在device creation启用，或假设queue family索引固定；复用仍被present等待的binary semaphore，或resize后继续使用旧extent",
  evidence:
    "loader版本、实例扩展、验证消息、SPIR-V环境和VUID、设备属性、features链、queue family位、扩展和创建参数、acquire结果、image index、等待信号量、present结果和重建代次",
  sourceLabel: "Khronos Vulkan Guide",
} satisfies VulkanExperimentModel;
const props = { unitTitle, nodes, model };

export function VkgCh02FirstProgramExecutionLab() {
  return <OfficialVulkanExecutionLab mode="execution" {...props} />;
}

export function VkgCh02FirstProgramHazardLab() {
  return <OfficialVulkanExecutionLab mode="hazard" {...props} />;
}

export function VkgCh02FirstProgramEvidenceLab() {
  return <OfficialVulkanExecutionLab mode="evidence" {...props} />;
}
