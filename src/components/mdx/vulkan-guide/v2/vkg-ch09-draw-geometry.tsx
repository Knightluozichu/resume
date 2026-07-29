"use client";

import {
  OfficialVulkanExecutionLab,
  type VulkanConceptNode,
  type VulkanExperimentModel,
} from "./official-vulkan-execution-lab";

const unitTitle = "绘制几何体";
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
    "让shader资源声明、descriptor与pipeline layout逐项一致；区分静态管线、动态状态与dynamic rendering兼容条件；按线程所有权录制command buffer并构造可复用提交",
  formula:
    "ShaderInterface=PipelineLayout=BoundSets ; Draw=Pipeline_{static}+State_{dynamic}+Attachments ; Submit=Waits+CommandBuffers+Signals",
  invariant: "绘制几何体的输入、状态、输出与恢复结果可用同一证据包重放",
  fault:
    "descriptor类型或数组长度与shader不符，或push constant范围越界；漏设已声明动态的viewport/scissor，或pipeline附件格式与begin rendering不符；多个线程并发重置同一command pool，或执行仍处pending状态的buffer",
  evidence:
    "SPIR-V反射、set/binding、layout、写入资源、动态偏移和VUID、pipeline create info、动态状态、附件格式、命令顺序和VUID、pool线程归属、buffer状态、submit批次、等待/信号值和fence",
  sourceLabel: "Khronos Vulkan Guide",
} satisfies VulkanExperimentModel;
const props = { unitTitle, nodes, model };

export function VkgCh09DrawGeometryExecutionLab() {
  return <OfficialVulkanExecutionLab mode="execution" {...props} />;
}

export function VkgCh09DrawGeometryHazardLab() {
  return <OfficialVulkanExecutionLab mode="hazard" {...props} />;
}

export function VkgCh09DrawGeometryEvidenceLab() {
  return <OfficialVulkanExecutionLab mode="evidence" {...props} />;
}
