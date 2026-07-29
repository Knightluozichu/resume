"use client";

import {
  OfficialVulkanExecutionLab,
  type VulkanConceptNode,
  type VulkanExperimentModel,
} from "./official-vulkan-execution-lab";

const unitTitle = "SPIR-V着色器与图形流水线";
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
  {
    label: "graphics pipeline",
    unit: "Graphics Pipeline, Dynamic State, and Dynamic Rendering",
    mechanism:
      "graphics pipeline把shader、顶点输入、光栅化和逐片元状态组合为可绑定对象；明确声明的dynamic state在录制时设置。dynamic rendering省去预建render pass对象，但pipeline rendering info与实际附件格式仍必须兼容。",
    probe: "pipeline create info、动态状态、附件格式、命令顺序和VUID",
  },
  {
    label: "pipeline state",
    unit: "Graphics Pipeline, Dynamic State, and Dynamic Rendering",
    mechanism:
      "graphics pipeline把shader、顶点输入、光栅化和逐片元状态组合为可绑定对象；明确声明的dynamic state在录制时设置。dynamic rendering省去预建render pass对象，但pipeline rendering info与实际附件格式仍必须兼容。",
    probe: "pipeline create info、动态状态、附件格式、命令顺序和VUID",
  },
  {
    label: "dynamic state",
    unit: "Graphics Pipeline, Dynamic State, and Dynamic Rendering",
    mechanism:
      "graphics pipeline把shader、顶点输入、光栅化和逐片元状态组合为可绑定对象；明确声明的dynamic state在录制时设置。dynamic rendering省去预建render pass对象，但pipeline rendering info与实际附件格式仍必须兼容。",
    probe: "pipeline create info、动态状态、附件格式、命令顺序和VUID",
  },
  {
    label: "dynamic rendering",
    unit: "Graphics Pipeline, Dynamic State, and Dynamic Rendering",
    mechanism:
      "graphics pipeline把shader、顶点输入、光栅化和逐片元状态组合为可绑定对象；明确声明的dynamic state在录制时设置。dynamic rendering省去预建render pass对象，但pipeline rendering info与实际附件格式仍必须兼容。",
    probe: "pipeline create info、动态状态、附件格式、命令顺序和VUID",
  },
  {
    label: "vkcmdbeginrendering",
    unit: "Graphics Pipeline, Dynamic State, and Dynamic Rendering",
    mechanism:
      "graphics pipeline把shader、顶点输入、光栅化和逐片元状态组合为可绑定对象；明确声明的dynamic state在录制时设置。dynamic rendering省去预建render pass对象，但pipeline rendering info与实际附件格式仍必须兼容。",
    probe: "pipeline create info、动态状态、附件格式、命令顺序和VUID",
  },
  {
    label: "pipeline cache",
    unit: "Graphics Pipeline, Dynamic State, and Dynamic Rendering",
    mechanism:
      "graphics pipeline把shader、顶点输入、光栅化和逐片元状态组合为可绑定对象；明确声明的dynamic state在录制时设置。dynamic rendering省去预建render pass对象，但pipeline rendering info与实际附件格式仍必须兼容。",
    probe: "pipeline create info、动态状态、附件格式、命令顺序和VUID",
  },
] satisfies VulkanConceptNode[];
const model = {
  focus:
    "以实例版本、验证层与SPIR-V能力建立Vulkan运行边界；让shader资源声明、descriptor与pipeline layout逐项一致；区分静态管线、动态状态与dynamic rendering兼容条件",
  formula:
    "Usable=Version\\cap Extensions\\cap Features ; ShaderInterface=PipelineLayout=BoundSets ; Draw=Pipeline_{static}+State_{dynamic}+Attachments",
  invariant:
    "SPIR-V着色器与图形流水线的输入、状态、输出与恢复结果可用同一证据包重放",
  fault:
    "请求未支持实例版本，或把验证层通过当成程序逻辑正确；descriptor类型或数组长度与shader不符，或push constant范围越界；漏设已声明动态的viewport/scissor，或pipeline附件格式与begin rendering不符",
  evidence:
    "loader版本、实例扩展、验证消息、SPIR-V环境和VUID、SPIR-V反射、set/binding、layout、写入资源、动态偏移和VUID、pipeline create info、动态状态、附件格式、命令顺序和VUID",
  sourceLabel: "Khronos Vulkan Guide",
} satisfies VulkanExperimentModel;
const props = { unitTitle, nodes, model };

export function VkgCh08SpirvPipelineExecutionLab() {
  return <OfficialVulkanExecutionLab mode="execution" {...props} />;
}

export function VkgCh08SpirvPipelineHazardLab() {
  return <OfficialVulkanExecutionLab mode="hazard" {...props} />;
}

export function VkgCh08SpirvPipelineEvidenceLab() {
  return <OfficialVulkanExecutionLab mode="evidence" {...props} />;
}
