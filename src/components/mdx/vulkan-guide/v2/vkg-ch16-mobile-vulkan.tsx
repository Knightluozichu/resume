"use client";

import {
  OfficialVulkanExecutionLab,
  type VulkanConceptNode,
  type VulkanExperimentModel,
} from "./official-vulkan-execution-lab";

const unitTitle = "移动端Vulkan";
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
    label: "compute shader",
    unit: "Extensions and Advanced Compute, Ray Tracing, Mesh, Descriptor, and Shading Features",
    mechanism:
      "compute、ray tracing、mesh shader、descriptor indexing与VRS都有各自feature、extension、limit和shader capability。能力存在不等于默认启用；应用还要准备同步、资源布局与回退实现。",
    probe:
      "扩展依赖、features链、limits、shader capability、管线结果和回退路径",
  },
  {
    label: "ray tracing",
    unit: "Extensions and Advanced Compute, Ray Tracing, Mesh, Descriptor, and Shading Features",
    mechanism:
      "compute、ray tracing、mesh shader、descriptor indexing与VRS都有各自feature、extension、limit和shader capability。能力存在不等于默认启用；应用还要准备同步、资源布局与回退实现。",
    probe:
      "扩展依赖、features链、limits、shader capability、管线结果和回退路径",
  },
  {
    label: "mesh shader",
    unit: "Extensions and Advanced Compute, Ray Tracing, Mesh, Descriptor, and Shading Features",
    mechanism:
      "compute、ray tracing、mesh shader、descriptor indexing与VRS都有各自feature、extension、limit和shader capability。能力存在不等于默认启用；应用还要准备同步、资源布局与回退实现。",
    probe:
      "扩展依赖、features链、limits、shader capability、管线结果和回退路径",
  },
  {
    label: "descriptor indexing",
    unit: "Extensions and Advanced Compute, Ray Tracing, Mesh, Descriptor, and Shading Features",
    mechanism:
      "compute、ray tracing、mesh shader、descriptor indexing与VRS都有各自feature、extension、limit和shader capability。能力存在不等于默认启用；应用还要准备同步、资源布局与回退实现。",
    probe:
      "扩展依赖、features链、limits、shader capability、管线结果和回退路径",
  },
  {
    label: "variable rate shading",
    unit: "Extensions and Advanced Compute, Ray Tracing, Mesh, Descriptor, and Shading Features",
    mechanism:
      "compute、ray tracing、mesh shader、descriptor indexing与VRS都有各自feature、extension、limit和shader capability。能力存在不等于默认启用；应用还要准备同步、资源布局与回退实现。",
    probe:
      "扩展依赖、features链、limits、shader capability、管线结果和回退路径",
  },
  {
    label: "extension",
    unit: "Extensions and Advanced Compute, Ray Tracing, Mesh, Descriptor, and Shading Features",
    mechanism:
      "compute、ray tracing、mesh shader、descriptor indexing与VRS都有各自feature、extension、limit和shader capability。能力存在不等于默认启用；应用还要准备同步、资源布局与回退实现。",
    probe:
      "扩展依赖、features链、limits、shader capability、管线结果和回退路径",
  },
] satisfies VulkanConceptNode[];
const model = {
  focus:
    "以实例版本、验证层与SPIR-V能力建立Vulkan运行边界；让surface、swapchain、acquire与present形成可恢复帧循环；按扩展依赖与设备feature启用计算、光追、mesh等高级路径",
  formula:
    "Usable=Version\\cap Extensions\\cap Features ; Acquire\\rightarrow Render\\rightarrow Present\\rightarrow Recreate? ; AdvancedPath=Extension\\land Feature\\land Limits\\land Shader",
  invariant: "移动端Vulkan的输入、状态、输出与恢复结果可用同一证据包重放",
  fault:
    "请求未支持实例版本，或把验证层通过当成程序逻辑正确；复用仍被present等待的binary semaphore，或resize后继续使用旧extent；只检查扩展名便创建管线，或没有为不支持设备准备可验证fallback",
  evidence:
    "loader版本、实例扩展、验证消息、SPIR-V环境和VUID、acquire结果、image index、等待信号量、present结果和重建代次、扩展依赖、features链、limits、shader capability、管线结果和回退路径",
  sourceLabel: "Khronos Vulkan Guide",
} satisfies VulkanExperimentModel;
const props = { unitTitle, nodes, model };

export function VkgCh16MobileVulkanExecutionLab() {
  return <OfficialVulkanExecutionLab mode="execution" {...props} />;
}

export function VkgCh16MobileVulkanHazardLab() {
  return <OfficialVulkanExecutionLab mode="hazard" {...props} />;
}

export function VkgCh16MobileVulkanEvidenceLab() {
  return <OfficialVulkanExecutionLab mode="evidence" {...props} />;
}
