"use client";

import {
  OfficialVulkanExecutionLab,
  type VulkanConceptNode,
  type VulkanExperimentModel,
} from "./official-vulkan-execution-lab";

const unitTitle = "计算流水线";
const nodes = [
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
    "区分静态管线、动态状态与dynamic rendering兼容条件；按扩展依赖与设备feature启用计算、光追、mesh等高级路径",
  formula:
    "Draw=Pipeline_{static}+State_{dynamic}+Attachments ; AdvancedPath=Extension\\land Feature\\land Limits\\land Shader",
  invariant: "计算流水线的输入、状态、输出与恢复结果可用同一证据包重放",
  fault:
    "漏设已声明动态的viewport/scissor，或pipeline附件格式与begin rendering不符；只检查扩展名便创建管线，或没有为不支持设备准备可验证fallback",
  evidence:
    "pipeline create info、动态状态、附件格式、命令顺序和VUID、扩展依赖、features链、limits、shader capability、管线结果和回退路径",
  sourceLabel: "Khronos Vulkan Guide",
} satisfies VulkanExperimentModel;
const props = { unitTitle, nodes, model };

export function VkgCh13ComputePipelineExecutionLab() {
  return <OfficialVulkanExecutionLab mode="execution" {...props} />;
}

export function VkgCh13ComputePipelineHazardLab() {
  return <OfficialVulkanExecutionLab mode="hazard" {...props} />;
}

export function VkgCh13ComputePipelineEvidenceLab() {
  return <OfficialVulkanExecutionLab mode="evidence" {...props} />;
}
