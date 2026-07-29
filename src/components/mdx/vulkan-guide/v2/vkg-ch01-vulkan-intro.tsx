"use client";

import {
  OfficialVulkanExecutionLab,
  type VulkanConceptNode,
  type VulkanExperimentModel,
} from "./official-vulkan-execution-lab";

const unitTitle = "开始学习新一代3D图形API";
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
] satisfies VulkanConceptNode[];
const model = {
  focus: "以实例版本、验证层与SPIR-V能力建立Vulkan运行边界",
  formula: "Usable=Version\\cap Extensions\\cap Features",
  invariant:
    "开始学习新一代3D图形API的输入、状态、输出与恢复结果可用同一证据包重放",
  fault: "请求未支持实例版本，或把验证层通过当成程序逻辑正确",
  evidence: "loader版本、实例扩展、验证消息、SPIR-V环境和VUID",
  sourceLabel: "Khronos Vulkan Guide",
} satisfies VulkanExperimentModel;
const props = { unitTitle, nodes, model };

export function VkgCh01VulkanIntroExecutionLab() {
  return <OfficialVulkanExecutionLab mode="execution" {...props} />;
}

export function VkgCh01VulkanIntroHazardLab() {
  return <OfficialVulkanExecutionLab mode="hazard" {...props} />;
}

export function VkgCh01VulkanIntroEvidenceLab() {
  return <OfficialVulkanExecutionLab mode="evidence" {...props} />;
}
