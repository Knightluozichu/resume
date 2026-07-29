"use client";

import {
  OfficialVulkanExecutionLab,
  type VulkanConceptNode,
  type VulkanExperimentModel,
} from "./official-vulkan-execution-lab";

const unitTitle = "描述符集与资源绑定";
const nodes = [
  {
    label: "shader",
    unit: "Shaders, Descriptors, Push Constants, and Resource Mapping",
    mechanism:
      "descriptor set layout定义每个binding的类型、数量和stage可见性，pipeline layout组合set layout与push constant范围。写descriptor只更新资源引用，绑定时还要满足动态偏移、数组索引和图像layout合同。",
    probe: "SPIR-V反射、set/binding、layout、写入资源、动态偏移和VUID",
  },
  {
    label: "descriptor set",
    unit: "Shaders, Descriptors, Push Constants, and Resource Mapping",
    mechanism:
      "descriptor set layout定义每个binding的类型、数量和stage可见性，pipeline layout组合set layout与push constant范围。写descriptor只更新资源引用，绑定时还要满足动态偏移、数组索引和图像layout合同。",
    probe: "SPIR-V反射、set/binding、layout、写入资源、动态偏移和VUID",
  },
  {
    label: "descriptor set layout",
    unit: "Shaders, Descriptors, Push Constants, and Resource Mapping",
    mechanism:
      "descriptor set layout定义每个binding的类型、数量和stage可见性，pipeline layout组合set layout与push constant范围。写descriptor只更新资源引用，绑定时还要满足动态偏移、数组索引和图像layout合同。",
    probe: "SPIR-V反射、set/binding、layout、写入资源、动态偏移和VUID",
  },
  {
    label: "pipeline layout",
    unit: "Shaders, Descriptors, Push Constants, and Resource Mapping",
    mechanism:
      "descriptor set layout定义每个binding的类型、数量和stage可见性，pipeline layout组合set layout与push constant范围。写descriptor只更新资源引用，绑定时还要满足动态偏移、数组索引和图像layout合同。",
    probe: "SPIR-V反射、set/binding、layout、写入资源、动态偏移和VUID",
  },
  {
    label: "push constant",
    unit: "Shaders, Descriptors, Push Constants, and Resource Mapping",
    mechanism:
      "descriptor set layout定义每个binding的类型、数量和stage可见性，pipeline layout组合set layout与push constant范围。写descriptor只更新资源引用，绑定时还要满足动态偏移、数组索引和图像layout合同。",
    probe: "SPIR-V反射、set/binding、layout、写入资源、动态偏移和VUID",
  },
  {
    label: "sampler",
    unit: "Shaders, Descriptors, Push Constants, and Resource Mapping",
    mechanism:
      "descriptor set layout定义每个binding的类型、数量和stage可见性，pipeline layout组合set layout与push constant范围。写descriptor只更新资源引用，绑定时还要满足动态偏移、数组索引和图像layout合同。",
    probe: "SPIR-V反射、set/binding、layout、写入资源、动态偏移和VUID",
  },
] satisfies VulkanConceptNode[];
const model = {
  focus: "让shader资源声明、descriptor与pipeline layout逐项一致",
  formula: "ShaderInterface=PipelineLayout=BoundSets",
  invariant: "描述符集与资源绑定的输入、状态、输出与恢复结果可用同一证据包重放",
  fault: "descriptor类型或数组长度与shader不符，或push constant范围越界",
  evidence: "SPIR-V反射、set/binding、layout、写入资源、动态偏移和VUID",
  sourceLabel: "Khronos Vulkan Guide",
} satisfies VulkanExperimentModel;
const props = { unitTitle, nodes, model };

export function VkgCh11DescriptorBindingExecutionLab() {
  return <OfficialVulkanExecutionLab mode="execution" {...props} />;
}

export function VkgCh11DescriptorBindingHazardLab() {
  return <OfficialVulkanExecutionLab mode="hazard" {...props} />;
}

export function VkgCh11DescriptorBindingEvidenceLab() {
  return <OfficialVulkanExecutionLab mode="evidence" {...props} />;
}
