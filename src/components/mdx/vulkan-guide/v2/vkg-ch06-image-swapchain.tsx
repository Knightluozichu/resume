"use client";

import {
  OfficialVulkanExecutionLab,
  type VulkanConceptNode,
  type VulkanExperimentModel,
} from "./official-vulkan-execution-lab";

const unitTitle = "图像资源分配与交换链构建";
const nodes = [
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
] satisfies VulkanConceptNode[];
const model = {
  focus:
    "让surface、swapchain、acquire与present形成可恢复帧循环；把buffer/image需求匹配到内存类型、绑定、传输与所有权",
  formula:
    "Acquire\\rightarrow Render\\rightarrow Present\\rightarrow Recreate? ; typeBits\\land properties\\ne 0",
  invariant:
    "图像资源分配与交换链构建的输入、状态、输出与恢复结果可用同一证据包重放",
  fault:
    "复用仍被present等待的binary semaphore，或resize后继续使用旧extent；只按属性标志挑内存却忽略memoryTypeBits，或跨队列使用未转移所有权",
  evidence:
    "acquire结果、image index、等待信号量、present结果和重建代次、requirements、memory type、绑定偏移、copy范围、layout和owner family",
  sourceLabel: "Khronos Vulkan Guide",
} satisfies VulkanExperimentModel;
const props = { unitTitle, nodes, model };

export function VkgCh06ImageSwapchainExecutionLab() {
  return <OfficialVulkanExecutionLab mode="execution" {...props} />;
}

export function VkgCh06ImageSwapchainHazardLab() {
  return <OfficialVulkanExecutionLab mode="hazard" {...props} />;
}

export function VkgCh06ImageSwapchainEvidenceLab() {
  return <OfficialVulkanExecutionLab mode="evidence" {...props} />;
}
