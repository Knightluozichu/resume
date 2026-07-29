"use client";

import {
  OfficialVulkanExecutionLab,
  type VulkanConceptNode,
  type VulkanExperimentModel,
} from "./official-vulkan-execution-lab";

const unitTitle = "使用纹理与采样器";
const nodes = [
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
] satisfies VulkanConceptNode[];
const model = {
  focus:
    "把buffer/image需求匹配到内存类型、绑定、传输与所有权；让shader资源声明、descriptor与pipeline layout逐项一致；用attachment layout与load/store合同控制渲染内容生命周期",
  formula:
    "typeBits\\land properties\\ne 0 ; ShaderInterface=PipelineLayout=BoundSets ; Content_{after}=Store(Render(Load(Content_{before})))",
  invariant: "使用纹理与采样器的输入、状态、输出与恢复结果可用同一证据包重放",
  fault:
    "只按属性标志挑内存却忽略memoryTypeBits，或跨队列使用未转移所有权；descriptor类型或数组长度与shader不符，或push constant范围越界；需要旧颜色却使用DONT_CARE，或后续采样前未转换layout与访问范围",
  evidence:
    "requirements、memory type、绑定偏移、copy范围、layout和owner family、SPIR-V反射、set/binding、layout、写入资源、动态偏移和VUID、初末layout、load/store、clear值、附件范围和后续读者",
  sourceLabel: "Khronos Vulkan Guide",
} satisfies VulkanExperimentModel;
const props = { unitTitle, nodes, model };

export function VkgCh10TexturesSamplersExecutionLab() {
  return <OfficialVulkanExecutionLab mode="execution" {...props} />;
}

export function VkgCh10TexturesSamplersHazardLab() {
  return <OfficialVulkanExecutionLab mode="hazard" {...props} />;
}

export function VkgCh10TexturesSamplersEvidenceLab() {
  return <OfficialVulkanExecutionLab mode="evidence" {...props} />;
}
