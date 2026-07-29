"use client";

import {
  OfficialVulkanExecutionLab,
  type VulkanConceptNode,
  type VulkanExperimentModel,
} from "./official-vulkan-execution-lab";

const unitTitle = "高级渲染技术简介";
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
    label: "attachment",
    unit: "Rendering Attachments, Layouts, Load Store, and Legacy Render Passes",
    mechanism:
      "attachment在渲染前后具有明确image layout；loadOp决定是否保留、清除或丢弃旧内容，storeOp决定pass后内容是否可继续读取。legacy render pass把这些关系和subpass依赖预声明，dynamic rendering则在命令中表达。",
    probe: "初末layout、load/store、clear值、附件范围和后续读者",
  },
  {
    label: "image layout",
    unit: "Rendering Attachments, Layouts, Load Store, and Legacy Render Passes",
    mechanism:
      "attachment在渲染前后具有明确image layout；loadOp决定是否保留、清除或丢弃旧内容，storeOp决定pass后内容是否可继续读取。legacy render pass把这些关系和subpass依赖预声明，dynamic rendering则在命令中表达。",
    probe: "初末layout、load/store、clear值、附件范围和后续读者",
  },
  {
    label: "loadop",
    unit: "Rendering Attachments, Layouts, Load Store, and Legacy Render Passes",
    mechanism:
      "attachment在渲染前后具有明确image layout；loadOp决定是否保留、清除或丢弃旧内容，storeOp决定pass后内容是否可继续读取。legacy render pass把这些关系和subpass依赖预声明，dynamic rendering则在命令中表达。",
    probe: "初末layout、load/store、clear值、附件范围和后续读者",
  },
  {
    label: "storeop",
    unit: "Rendering Attachments, Layouts, Load Store, and Legacy Render Passes",
    mechanism:
      "attachment在渲染前后具有明确image layout；loadOp决定是否保留、清除或丢弃旧内容，storeOp决定pass后内容是否可继续读取。legacy render pass把这些关系和subpass依赖预声明，dynamic rendering则在命令中表达。",
    probe: "初末layout、load/store、clear值、附件范围和后续读者",
  },
  {
    label: "render pass",
    unit: "Rendering Attachments, Layouts, Load Store, and Legacy Render Passes",
    mechanism:
      "attachment在渲染前后具有明确image layout；loadOp决定是否保留、清除或丢弃旧内容，storeOp决定pass后内容是否可继续读取。legacy render pass把这些关系和subpass依赖预声明，dynamic rendering则在命令中表达。",
    probe: "初末layout、load/store、clear值、附件范围和后续读者",
  },
  {
    label: "subpass",
    unit: "Rendering Attachments, Layouts, Load Store, and Legacy Render Passes",
    mechanism:
      "attachment在渲染前后具有明确image layout；loadOp决定是否保留、清除或丢弃旧内容，storeOp决定pass后内容是否可继续读取。legacy render pass把这些关系和subpass依赖预声明，dynamic rendering则在命令中表达。",
    probe: "初末layout、load/store、clear值、附件范围和后续读者",
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
    "区分静态管线、动态状态与dynamic rendering兼容条件；用attachment layout与load/store合同控制渲染内容生命周期；按扩展依赖与设备feature启用计算、光追、mesh等高级路径",
  formula:
    "Draw=Pipeline_{static}+State_{dynamic}+Attachments ; Content_{after}=Store(Render(Load(Content_{before}))) ; AdvancedPath=Extension\\land Feature\\land Limits\\land Shader",
  invariant: "高级渲染技术简介的输入、状态、输出与恢复结果可用同一证据包重放",
  fault:
    "漏设已声明动态的viewport/scissor，或pipeline附件格式与begin rendering不符；需要旧颜色却使用DONT_CARE，或后续采样前未转换layout与访问范围；只检查扩展名便创建管线，或没有为不支持设备准备可验证fallback",
  evidence:
    "pipeline create info、动态状态、附件格式、命令顺序和VUID、初末layout、load/store、clear值、附件范围和后续读者、扩展依赖、features链、limits、shader capability、管线结果和回退路径",
  sourceLabel: "Khronos Vulkan Guide",
} satisfies VulkanExperimentModel;
const props = { unitTitle, nodes, model };

export function VkgCh15AdvancedRenderingExecutionLab() {
  return <OfficialVulkanExecutionLab mode="execution" {...props} />;
}

export function VkgCh15AdvancedRenderingHazardLab() {
  return <OfficialVulkanExecutionLab mode="hazard" {...props} />;
}

export function VkgCh15AdvancedRenderingEvidenceLab() {
  return <OfficialVulkanExecutionLab mode="evidence" {...props} />;
}
