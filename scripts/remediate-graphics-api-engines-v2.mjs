#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const ROOT = process.cwd();
const MANIFEST_PATH = path.join(ROOT, "quality/fidelity-manifests.json");
const PROFILE_PATH = path.join(
  ROOT,
  "quality/graphics-api-engines-v2-profiles.json",
);

const SOURCES = {
  glCore: "https://registry.khronos.org/OpenGL/specs/gl/glspec46.core.pdf",
  glsl: "https://registry.khronos.org/OpenGL/specs/gl/GLSLangSpec.4.60.pdf",
  gles: "https://registry.khronos.org/OpenGL/specs/es/3.2/es_spec_3.2.pdf",
  webgl: "https://registry.khronos.org/webgl/specs/latest/2.0/",
  vulkanGuide: "https://docs.vulkan.org/guide/latest/",
  vulkanSpec: "https://docs.vulkan.org/spec/latest/",
  vulkanSamples: "https://docs.vulkan.org/samples/latest/",
};

const BOOKS = {
  "deep-opengl": {
    workTitle: "Khronos OpenGL / OpenGL ES / GLSL / WebGL 规范课程",
    sourceUrl: SOURCES.glCore,
    sourceAccess: "full-text-primary",
    sourceKind: "primary-specification-set",
    sourceSummary:
      "本课程不是某本同名日文或中文原书的翻译。八个正式单元是平台课程分类，技术事实分别由Khronos OpenGL 4.6、OpenGL ES 3.2、GLSL 4.60与WebGL 2规范核对。",
    practiceMode: "code",
    component: {
      implementation: "official-gl-state-lab",
      importName: "OfficialGlStateLab",
      typeNode: "ApiConceptNode",
      typeModel: "ApiExperimentModel",
      exports: [
        ["StateLab", "state"],
        ["FaultLab", "fault"],
        ["EvidenceLab", "evidence"],
      ],
    },
    factSources: {
      openGlCore: {
        kind: "primary-technical-standard",
        label: "OpenGL 4.6 Core Profile Specification",
        url: SOURCES.glCore,
      },
      glsl: {
        kind: "primary-technical-standard",
        label: "OpenGL Shading Language 4.60 Specification",
        url: SOURCES.glsl,
      },
      openGlEs: {
        kind: "primary-technical-standard",
        label: "OpenGL ES 3.2 Specification",
        url: SOURCES.gles,
      },
      webGl: {
        kind: "primary-technical-standard",
        label: "WebGL 2.0 Specification",
        url: SOURCES.webgl,
      },
    },
  },
  "vulkan-guide": {
    workTitle: "Khronos Vulkan Guide",
    sourceUrl: SOURCES.vulkanGuide,
    sourceAccess: "full-text-primary",
    sourceKind: "official-full-text-guide-and-specification-set",
    sourceSummary:
      "Khronos Vulkan Guide是持续更新的完整在线指南，不是固定16章纸书；课程把当前指南、规范与官方示例聚合成16个实现页，并显式标注十个正式能力簇。",
    practiceMode: "diagnosis",
    component: {
      implementation: "official-vulkan-execution-lab",
      importName: "OfficialVulkanExecutionLab",
      typeNode: "VulkanConceptNode",
      typeModel: "VulkanExperimentModel",
      exports: [
        ["ExecutionLab", "execution"],
        ["HazardLab", "hazard"],
        ["EvidenceLab", "evidence"],
      ],
    },
    factSources: {
      guide: {
        kind: "official-full-text-guide",
        label: "Khronos Vulkan Guide latest",
        url: SOURCES.vulkanGuide,
      },
      specification: {
        kind: "primary-technical-standard",
        label: "Vulkan Specification latest",
        url: SOURCES.vulkanSpec,
      },
      samples: {
        kind: "official-code-and-explanation",
        label: "Khronos Vulkan Samples",
        url: SOURCES.vulkanSamples,
      },
    },
  },
};

const ALL_DOG_UNITS = [
  "dog-01",
  "dog-02",
  "dog-03",
  "dog-04",
  "dog-05",
  "dog-06",
  "dog-07",
  "dog-08",
];

const PAGE_SPECS = {
  "deep-opengl": [
    {
      path: "00-fundamentals/dog-learning-map",
      unitIds: ALL_DOG_UNITS,
      role: "learning-map",
    },
    { path: "01-core/dog-opengl-architecture", unitIds: ["dog-01"] },
    { path: "01-core/dog-opengl-es", unitIds: ["dog-04"] },
    { path: "01-core/dog-shader-language", unitIds: ["dog-02"] },
    { path: "01-core/dog-webgl-basics", unitIds: ["dog-03"] },
    { path: "02-advanced/dog-cross-platform", unitIds: ["dog-07"] },
    { path: "02-advanced/dog-debugging-tools", unitIds: ["dog-08"] },
    { path: "02-advanced/dog-fbo-techniques", unitIds: ["dog-05"] },
    { path: "02-advanced/dog-rendering-optimization", unitIds: ["dog-06"] },
    {
      path: "03-review/dog-final-review",
      unitIds: ALL_DOG_UNITS,
      role: "final-review",
    },
  ],
  "vulkan-guide": [
    { path: "01-introduction/vkg-ch01-vulkan-intro", unitIds: ["vkg-01"] },
    {
      path: "01-introduction/vkg-ch02-first-program",
      unitIds: ["vkg-01", "vkg-02", "vkg-03"],
    },
    { path: "02-device-setup/vkg-ch03-hardware-device", unitIds: ["vkg-02"] },
    { path: "02-device-setup/vkg-ch04-debugging", unitIds: ["vkg-01"] },
    {
      path: "03-memory-resources/vkg-ch05-command-memory",
      unitIds: ["vkg-04", "vkg-07"],
    },
    {
      path: "03-memory-resources/vkg-ch06-image-swapchain",
      unitIds: ["vkg-03", "vkg-04"],
    },
    {
      path: "04-pipeline-rendering/vkg-ch07-buffer-renderpass",
      unitIds: ["vkg-04", "vkg-09"],
    },
    {
      path: "04-pipeline-rendering/vkg-ch08-spirv-pipeline",
      unitIds: ["vkg-01", "vkg-05", "vkg-06"],
    },
    {
      path: "04-pipeline-rendering/vkg-ch09-draw-geometry",
      unitIds: ["vkg-05", "vkg-06", "vkg-07"],
    },
    {
      path: "05-textures-binding/vkg-ch10-textures-samplers",
      unitIds: ["vkg-04", "vkg-05", "vkg-09"],
    },
    {
      path: "05-textures-binding/vkg-ch11-descriptor-binding",
      unitIds: ["vkg-05"],
    },
    {
      path: "06-sync-compute/vkg-ch12-synchronization",
      unitIds: ["vkg-08"],
    },
    {
      path: "06-sync-compute/vkg-ch13-compute-pipeline",
      unitIds: ["vkg-06", "vkg-10"],
    },
    {
      path: "07-advanced-topics/vkg-ch14-multithreading",
      unitIds: ["vkg-07"],
    },
    {
      path: "07-advanced-topics/vkg-ch15-advanced-rendering",
      unitIds: ["vkg-06", "vkg-09", "vkg-10"],
    },
    {
      path: "07-advanced-topics/vkg-ch16-mobile-vulkan",
      unitIds: ["vkg-01", "vkg-03", "vkg-10"],
    },
  ],
};

const UNIT_DETAILS = {
  "dog-01": {
    focus: "区分上下文状态、对象存储、绑定点与VAO捕获关系",
    explanation:
      "OpenGL命令在当前context上执行，buffer、texture与program等对象保存存储或可执行内容，binding把对象选为后续命令的隐式参数。VAO记录属性格式、属性缓冲关联与element array binding，但不会把所有全局状态冻结成快照。",
    formula: "Draw=F(Ctx,Program,VAO,FBO,State)",
    fault: "把ARRAY_BUFFER当前绑定误当成VAO整体状态，或依赖上一个pass残留开关",
    evidence: "当前context、program、VAO属性槽、EBO、FBO与逐片元状态快照",
  },
  "dog-02": {
    focus: "用GLSL ES阶段接口、精度与uniform合同连接顶点和片元",
    explanation:
      "GLSL ES编译单个shader stage，program link再核对跨阶段in/out接口。uniform由应用更新而不是逐顶点插值，precision qualifier在移动实现尤其影响范围与误差。链接成功仍不保证坐标空间和数值精度正确。",
    formula: "gl\\_Position=M_{clip\\leftarrow model}p",
    fault: "顶点输出与片元输入位置或类型不一致，或片元高光计算使用过低精度",
    evidence: "编译日志、链接日志、接口位置、uniform值和参考像素",
  },
  "dog-03": {
    focus: "管理WebGL上下文创建、版本能力、丢失与资源重建",
    explanation:
      "WebGL通过canvas.getContext取得明确对象；WebGL 1与2暴露的核心能力不同，扩展也必须逐项查询。context lost后旧GPU对象失效，应用应阻止默认处理、暂停渲染，并依据CPU侧资源描述完整重建。",
    formula: "Ready=Context\\land Capabilities\\land Resources",
    fault: "假设WebGL2或扩展必定存在，或context restored后继续复用旧句柄",
    evidence: "上下文版本、扩展集合、lost/restored事件和重建对象计数",
  },
  "dog-04": {
    focus: "在EGL、OpenGL ES与tile-based GPU边界内控制带宽和精度",
    explanation:
      "OpenGL ES保留可编程管线核心，但平台通常通过EGL建立display、surface与context。移动GPU常按tile处理片元，频繁读回、无意义store或超大中间附件会消耗外部带宽；精度限定也必须按数值范围选择。",
    formula: "Cost\\approx B_{external}+N_{tiles}C_{tile}",
    fault: "把桌面扩展当作ES核心能力，或每个pass都强制保存不会再读取的附件",
    evidence: "EGL配置、ES版本、附件load/store、外部带宽与shader精度范围",
  },
  "dog-05": {
    focus: "用完整FBO附件合同实现可复算的多遍后处理",
    explanation:
      "framebuffer把颜色、深度和模板attachment组成渲染目标；完整性取决于附件尺寸、样本数、格式和层级等条件。后处理先渲染到离屏颜色附件，再以纹理输入执行下一pass，必须防止读写同一子资源的反馈环。",
    formula: "Pass_{n+1}=Shader(Texture(Pass_n))",
    fault: "FBO不完整仍绘制，或把当前颜色附件同时绑定为采样输入",
    evidence: "完整性状态、附件尺寸/样本数、draw buffers和逐pass参考像素",
  },
  "dog-06": {
    focus: "用提交、状态切换和带宽证据优化绘制而不改变结果",
    explanation:
      "draw call成本包含CPU提交、驱动验证与GPU工作；instancing减少重复提交，state sorting减少昂贵切换，但透明对象仍受顺序约束。优化必须同时比较帧时间、提交数、带宽与像素结果。",
    formula: "T_{frame}=T_{cpu}+T_{gpu}+T_{sync}",
    fault: "只减少draw call却增加过度绘制或带宽，或用glFinish制造虚假稳定计时",
    evidence: "CPU/GPU时间戳、draw数、状态切换、带宽和图像差异",
  },
  "dog-07": {
    focus: "按版本、扩展与限制查询构造跨平台能力降级图",
    explanation:
      "feature detection先查询版本、extension与limit，再选择实现路径；桌面OpenGL、ES和WebGL名称相似但核心集合、着色语言与安全约束不同。fallback必须保持结果合同或明确降级质量。",
    formula: "Path=select(Core,Extensions,Limits)",
    fault: "用厂商字符串猜能力，或扩展存在却未检查对应限制与入口",
    evidence: "版本、扩展、限制、选择路径和降级输出差异",
  },
  "dog-08": {
    focus: "用调试回调、帧捕获与GPU计时定位首个错误事件",
    explanation:
      "glGetError只提供有限错误队列且可能扰动热路径；KHR_debug能携带source、type、severity与对象标签。RenderDoc或Spector帧捕获展示资源和命令状态，timer query则把GPU区间与CPU提交时间分开。",
    formula: "Fault=first(Event_{actual}\\ne Event_{expected})",
    fault: "只在帧尾调用glGetError，或用CPU墙钟时间替代GPU查询",
    evidence: "debug message、对象标签、捕获事件、资源快照与GPU时间戳",
  },
  "vkg-01": {
    focus: "以实例版本、验证层与SPIR-V能力建立Vulkan运行边界",
    explanation:
      "Vulkan是显式API，但应用仍必须查询loader支持版本、实例扩展和设备能力。validation layer是开发期诊断层，不能改变规范语义；SPIR-V是shader中间表示，其capability与目标环境必须兼容设备。",
    formula: "Usable=Version\\cap Extensions\\cap Features",
    fault: "请求未支持实例版本，或把验证层通过当成程序逻辑正确",
    evidence: "loader版本、实例扩展、验证消息、SPIR-V环境和VUID",
  },
  "vkg-02": {
    focus: "从物理设备能力筛选逻辑设备特性与队列合同",
    explanation:
      "VkPhysicalDevice描述硬件、限制、格式和queue family；VkDevice只启用明确请求的feature与extension。队列由family能力和创建数量决定，图形、计算与传输职责可能共享也可能分离。",
    formula: "Device=select(Properties,Features,Queues)",
    fault: "查询到feature却未在device creation启用，或假设queue family索引固定",
    evidence: "设备属性、features链、queue family位、扩展和创建参数",
  },
  "vkg-03": {
    focus: "让surface、swapchain、acquire与present形成可恢复帧循环",
    explanation:
      "WSI把平台窗口surface连接到VkSwapchainKHR。acquire只取得可用图像索引，present等待渲染完成后交给呈现引擎；OUT_OF_DATE与SUBOPTIMAL要求应用按surface capabilities重新选择extent、format与present mode。",
    formula:
      "Acquire\\rightarrow Render\\rightarrow Present\\rightarrow Recreate?",
    fault: "复用仍被present等待的binary semaphore，或resize后继续使用旧extent",
    evidence: "acquire结果、image index、等待信号量、present结果和重建代次",
  },
  "vkg-04": {
    focus: "把buffer/image需求匹配到内存类型、绑定、传输与所有权",
    explanation:
      "VkBuffer和VkImage先声明用途，再查询memory requirements并绑定满足memoryTypeBits的分配。staging路径把host写入与device-local消费分开；跨queue family使用还需明确ownership transfer。",
    formula: "typeBits\\land properties\\ne 0",
    fault: "只按属性标志挑内存却忽略memoryTypeBits，或跨队列使用未转移所有权",
    evidence:
      "requirements、memory type、绑定偏移、copy范围、layout和owner family",
  },
  "vkg-05": {
    focus: "让shader资源声明、descriptor与pipeline layout逐项一致",
    explanation:
      "descriptor set layout定义每个binding的类型、数量和stage可见性，pipeline layout组合set layout与push constant范围。写descriptor只更新资源引用，绑定时还要满足动态偏移、数组索引和图像layout合同。",
    formula: "ShaderInterface=PipelineLayout=BoundSets",
    fault: "descriptor类型或数组长度与shader不符，或push constant范围越界",
    evidence: "SPIR-V反射、set/binding、layout、写入资源、动态偏移和VUID",
  },
  "vkg-06": {
    focus: "区分静态管线、动态状态与dynamic rendering兼容条件",
    explanation:
      "graphics pipeline把shader、顶点输入、光栅化和逐片元状态组合为可绑定对象；明确声明的dynamic state在录制时设置。dynamic rendering省去预建render pass对象，但pipeline rendering info与实际附件格式仍必须兼容。",
    formula: "Draw=Pipeline_{static}+State_{dynamic}+Attachments",
    fault:
      "漏设已声明动态的viewport/scissor，或pipeline附件格式与begin rendering不符",
    evidence: "pipeline create info、动态状态、附件格式、命令顺序和VUID",
  },
  "vkg-07": {
    focus: "按线程所有权录制command buffer并构造可复用提交",
    explanation:
      "command pool管理同一queue family的command buffer分配与重置；外部同步要求同一pool不能被多个线程无保护并发访问。record只编码命令，queue submission才建立执行批次，secondary buffer适合明确继承边界的并行录制。",
    formula: "Submit=Waits+CommandBuffers+Signals",
    fault: "多个线程并发重置同一command pool，或执行仍处pending状态的buffer",
    evidence: "pool线程归属、buffer状态、submit批次、等待/信号值和fence",
  },
  "vkg-08": {
    focus: "用execution dependency与memory dependency修复真实资源hazard",
    explanation:
      "barrier同时描述源/目标stage与源/目标access，只有覆盖生产者写入和消费者访问才建立正确可见性。binary/timeline semaphore协调提交，fence让host观察完成；它们不能替代资源layout和access范围。",
    formula:
      "Write\\xrightarrow[access]{stage}Barrier\\xrightarrow[access]{stage}Read",
    fault:
      "只使用TOP/BOTTOM泛化stage，或等待semaphore却遗漏图像layout与访问屏障",
    evidence:
      "资源、生产者stage/access、消费者stage/access、layout、队列和信号值",
  },
  "vkg-09": {
    focus: "用attachment layout与load/store合同控制渲染内容生命周期",
    explanation:
      "attachment在渲染前后具有明确image layout；loadOp决定是否保留、清除或丢弃旧内容，storeOp决定pass后内容是否可继续读取。legacy render pass把这些关系和subpass依赖预声明，dynamic rendering则在命令中表达。",
    formula: "Content_{after}=Store(Render(Load(Content_{before})))",
    fault: "需要旧颜色却使用DONT_CARE，或后续采样前未转换layout与访问范围",
    evidence: "初末layout、load/store、clear值、附件范围和后续读者",
  },
  "vkg-10": {
    focus: "按扩展依赖与设备feature启用计算、光追、mesh等高级路径",
    explanation:
      "compute、ray tracing、mesh shader、descriptor indexing与VRS都有各自feature、extension、limit和shader capability。能力存在不等于默认启用；应用还要准备同步、资源布局与回退实现。",
    formula: "AdvancedPath=Extension\\land Feature\\land Limits\\land Shader",
    fault: "只检查扩展名便创建管线，或没有为不支持设备准备可验证fallback",
    evidence:
      "扩展依赖、features链、limits、shader capability、管线结果和回退路径",
  },
};

const PAGE_SNIPPETS = {
  "dog-learning-map": `const profile = inspectGlPlatform(gl);
for (const requirement of courseRequirements)
  assert(profile.supports(requirement));
recordBaseline(gl, "state-object-platform");`,
  "dog-opengl-architecture": `gl.bindVertexArray(vao);
gl.bindBuffer(gl.ARRAY_BUFFER, vertices);
gl.vertexAttribPointer(0, 3, gl.FLOAT, false, stride, 0);
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indices);
gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_SHORT, 0);`,
  "dog-opengl-es": `EGLContext context = create_es_context(display, config, 3, 2);
glInvalidateFramebuffer(GL_FRAMEBUFFER, 1, &discardedAttachment);
assert(query_external_bandwidth() <= budget);`,
  "dog-shader-language": `GLuint program = link(vertexShader, fragmentShader);
checkProgramInterface(program, "position", 0, GL_FLOAT_VEC3);
glProgramUniformMatrix4fv(program, mvpLocation, 1, GL_FALSE, mvp);`,
  "dog-webgl-basics": `const gl = canvas.getContext("webgl2");
if (!gl) throw new Error("WebGL2 unavailable");
canvas.addEventListener("webglcontextlost", e => e.preventDefault());
canvas.addEventListener("webglcontextrestored", rebuildResources);`,
  "dog-cross-platform": `Capabilities c = queryCapabilities(api);
RenderPath path = choosePath(c.version, c.extensions, c.limits);
assert(renderReference(path).error <= tolerance);`,
  "dog-debugging-tools": `glEnable(GL_DEBUG_OUTPUT);
glDebugMessageCallback(debugCallback, nullptr);
glBeginQuery(GL_TIME_ELAPSED, query);
drawPass();
glEndQuery(GL_TIME_ELAPSED);`,
  "dog-fbo-techniques": `glBindFramebuffer(GL_FRAMEBUFFER, offscreen);
assert(glCheckFramebufferStatus(GL_FRAMEBUFFER) == GL_FRAMEBUFFER_COMPLETE);
drawScene();
glBindFramebuffer(GL_FRAMEBUFFER, 0);
drawPostProcess(colorAttachment);`,
  "dog-rendering-optimization": `GpuTimer timer("opaque-pass");
sortByPipelineAndMaterial(draws);
drawInstanced(batches);
compareImage(reference, output, tolerance);`,
  "dog-final-review": `for (const Case& c : conformanceCases) {
  resetState(c.baseline);
  auto result = replay(c.commands);
  require(result.evidence == c.expectedEvidence);
}`,
  "vkg-ch01-vulkan-intro": `uint32_t version = VK_API_VERSION_1_0;
vkEnumerateInstanceVersion(&version);
InstancePlan plan = negotiateInstance(version, requiredExtensions);
enableValidation(plan);`,
  "vkg-ch02-first-program": `Frame frame = acquire(swapchain, imageAvailable);
recordTriangle(frame.commandBuffer, frame.image);
submit(graphicsQueue, frame, renderFinished);
present(presentQueue, frame, renderFinished);`,
  "vkg-ch03-hardware-device": `for (VkPhysicalDevice gpu : enumeratePhysicalDevices(instance)) {
  Candidate c = inspect(gpu);
  if (c.features && c.extensions && c.queues) choose(c);
}`,
  "vkg-ch04-debugging": `VkDebugUtilsMessengerCreateInfoEXT debugInfo = makeDebugMessenger();
debugInfo.messageSeverity = VK_DEBUG_UTILS_MESSAGE_SEVERITY_WARNING_BIT_EXT |
                            VK_DEBUG_UTILS_MESSAGE_SEVERITY_ERROR_BIT_EXT;`,
  "vkg-ch05-command-memory": `ThreadContext& t = contexts[workerId];
VkCommandBuffer cmd = t.begin(queueFamily);
vkCmdCopyBuffer(cmd, staging, deviceLocal, 1, &region);
t.endAndEnqueue(cmd);`,
  "vkg-ch06-image-swapchain": `uint32_t imageIndex = acquireImage(swapchain, imageAvailable);
transition(cmd, images[imageIndex], PRESENT_SRC_KHR, COLOR_ATTACHMENT_OPTIMAL);
render(cmd, images[imageIndex]);
transition(cmd, images[imageIndex], COLOR_ATTACHMENT_OPTIMAL, PRESENT_SRC_KHR);`,
  "vkg-ch07-buffer-renderpass": `VkRenderingAttachmentInfo color = attachment(view, LOAD_OP_CLEAR, STORE_OP_STORE);
vkCmdBeginRendering(cmd, &renderingInfo(color));
vkCmdDraw(cmd, vertexCount, 1, 0, 0);
vkCmdEndRendering(cmd);`,
  "vkg-ch08-spirv-pipeline": `reflectSpirv(shader, descriptorContract);
VkPipelineLayout layout = createPipelineLayout(descriptorContract);
VkPipeline pipeline = createGraphicsPipeline(shader, layout, attachmentFormats);`,
  "vkg-ch09-draw-geometry": `vkCmdBindPipeline(cmd, VK_PIPELINE_BIND_POINT_GRAPHICS, pipeline);
vkCmdBindDescriptorSets(cmd, VK_PIPELINE_BIND_POINT_GRAPHICS, layout, 0, 1, &set, 0, nullptr);
vkCmdBindVertexBuffers(cmd, 0, 1, &vertexBuffer, offsets);
vkCmdDraw(cmd, vertexCount, 1, 0, 0);`,
  "vkg-ch10-textures-samplers": `uploadImage(staging, texture);
transition(texture, TRANSFER_DST_OPTIMAL, SHADER_READ_ONLY_OPTIMAL);
writeCombinedImageSampler(set, binding, textureView, sampler);
validateDescriptorImageLayout(set);`,
  "vkg-ch11-descriptor-binding": `VkDescriptorSet set = allocateSet(pool, layout);
updateBufferBinding(set, 0, uniformBuffer, range);
updateImageBinding(set, 1, imageView, sampler, SHADER_READ_ONLY_OPTIMAL);
bindAndValidate(cmd, pipelineLayout, set);`,
  "vkg-ch12-synchronization": `VkImageMemoryBarrier2 barrier = imageBarrier(
  COLOR_ATTACHMENT_OUTPUT, COLOR_ATTACHMENT_WRITE,
  FRAGMENT_SHADER, SHADER_SAMPLED_READ,
  COLOR_ATTACHMENT_OPTIMAL, SHADER_READ_ONLY_OPTIMAL);
vkCmdPipelineBarrier2(cmd, &dependencyInfo(barrier));`,
  "vkg-ch13-compute-pipeline": `vkCmdBindPipeline(cmd, VK_PIPELINE_BIND_POINT_COMPUTE, computePipeline);
vkCmdBindDescriptorSets(cmd, VK_PIPELINE_BIND_POINT_COMPUTE, layout, 0, 1, &set, 0, nullptr);
vkCmdDispatch(cmd, groupsX, groupsY, 1);
barrierComputeWriteToGraphicsRead(cmd, output);`,
  "vkg-ch14-multithreading": `parallel_for(workers, [&](uint32_t id) {
  VkCommandBuffer secondary = threadPools[id].beginSecondary(inheritance);
  recordChunk(secondary, chunks[id]);
  ready[id] = threadPools[id].end(secondary);
});`,
  "vkg-ch15-advanced-rendering": `FeaturePlan plan = negotiateAdvancedFeatures(device);
Pipeline path = plan.rayTracing ? makeRayTracingPipeline()
                               : makeRasterFallback();
compareAgainstReference(path);`,
  "vkg-ch16-mobile-vulkan": `SurfaceProfile surface = querySurface(physicalDevice, surfaceHandle);
RenderPath path = selectMobilePath(features, surface, thermalBudget);
runFramesInFlight(path, /* count */ 2);
verifyPresentAndRecovery(path);`,
};

function pascal(value) {
  return value
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join("");
}

function sourceSection(profile) {
  if (profile.bookSlug === "deep-opengl") {
    return `“${profile.title}”不是某本同名原书的翻译，也不把四套API规范拼成虚构目录。OpenGL状态与对象语义以[OpenGL 4.6 Core规范](${SOURCES.glCore})核对，着色语言以[GLSL 4.60规范](${SOURCES.glsl})核对，移动端与浏览器边界分别以[OpenGL ES 3.2规范](${SOURCES.gles})和[WebGL 2规范](${SOURCES.webgl})核对。八个正式单元是独立课程分类。`;
  }
  return `“${profile.title}”以[Khronos Vulkan Guide latest](${SOURCES.vulkanGuide})这套持续更新的官方完整指南为主，并由[Vulkan规范](${SOURCES.vulkanSpec})和[官方Samples](${SOURCES.vulkanSamples})核对VUID、对象合同与可运行路径。课程的16页是教学聚合，不宣称它们是官方固定章节。`;
}

function genericTerms(bookSlug) {
  return bookSlug === "deep-opengl"
    ? [
        ["state ownership", "状态所有权决定哪一个上下文或对象保存该值。"],
        ["binding", "绑定把对象选为后续命令的隐式参数。"],
        ["capability", "能力必须由版本、扩展与限制共同证明。"],
      ]
    : [
        ["execution dependency", "执行依赖约束先后发生的stage范围。"],
        ["memory dependency", "内存依赖让写入对后续访问可见。"],
        ["object lifetime", "对象生命周期必须覆盖所有pending使用。"],
      ];
}

function buildProfiles(bookSlug, manifest) {
  return PAGE_SPECS[bookSlug].map((spec, index) => {
    const units = spec.unitIds.map((id) => {
      const unit = manifest.units.find((candidate) => candidate.id === id);
      const detail = UNIT_DETAILS[id];
      if (!unit || !detail)
        throw new Error(`${bookSlug}缺少正式单元或机制说明：${id}`);
      return {
        id,
        title: unit.title,
        concepts: unit.concepts.map((alternatives) => alternatives[0]),
        detail,
      };
    });
    const filePath = path.join(ROOT, "content", bookSlug, `${spec.path}.mdx`);
    if (!fs.existsSync(filePath)) throw new Error(`找不到课程页：${filePath}`);
    const parsed = matter(fs.readFileSync(filePath, "utf8"));
    const chapterSlug = path.basename(spec.path);
    const focus = units.map((unit) => unit.detail.focus).join("；");
    const fault = units.map((unit) => unit.detail.fault).join("；");
    const evidence = units.map((unit) => unit.detail.evidence).join("、");
    return {
      ...spec,
      bookSlug,
      filePath,
      parsed,
      chapterSlug,
      sectionSlug: path.dirname(spec.path),
      title: String(
        parsed.data.title ?? units.map((unit) => unit.title).join(" × "),
      ),
      units,
      focus,
      fault,
      evidence,
      invariant: `${String(parsed.data.title ?? chapterSlug)}的输入、状态、输出与恢复结果可用同一证据包重放`,
      snippet: PAGE_SNIPPETS[chapterSlug],
      order: Number(parsed.data.order ?? index + 1),
    };
  });
}

function wrapperSource(bookSlug, profile) {
  const config = BOOKS[bookSlug];
  const prefix = pascal(profile.chapterSlug);
  const nodes = profile.units.flatMap((unit) =>
    unit.concepts.map((concept) => ({
      label: concept,
      unit: unit.title,
      mechanism: unit.detail.explanation,
      probe: unit.detail.evidence,
    })),
  );
  const model = {
    focus: profile.focus,
    formula: profile.units.map((unit) => unit.detail.formula).join(" ; "),
    invariant: profile.invariant,
    fault: profile.fault,
    evidence: profile.evidence,
    sourceLabel: config.workTitle,
  };
  const functions = config.component.exports
    .map(
      ([suffix, mode]) => `export function ${prefix}${suffix}() {
  return <${config.component.importName} mode="${mode}" {...props} />;
}`,
    )
    .join("\n\n");
  return `"use client";

import {
  ${config.component.importName},
  type ${config.component.typeNode},
  type ${config.component.typeModel},
} from "./${config.component.implementation}";

const unitTitle = ${JSON.stringify(profile.title)};
const nodes = ${JSON.stringify(nodes, null, 2)} satisfies ${config.component.typeNode}[];
const model = ${JSON.stringify(model, null, 2)} satisfies ${config.component.typeModel};
const props = { unitTitle, nodes, model };

${functions}
`;
}

function definition(term, profile) {
  const unit = profile.units.find((candidate) =>
    candidate.concepts.includes(term),
  );
  if (unit)
    return `${term}在“${profile.title}”的“${unit.title}”检查中用于${unit.detail.focus}；应由${unit.detail.evidence}确认。`;
  return (
    genericTerms(profile.bookSlug).find(([name]) => name === term)?.[1] ??
    `${term}必须落到可观察输入、状态与输出。`
  );
}

function contextualizeSentences(value, profile, unit) {
  return String(value)
    .split(/(?<=[。！？.!?])\s*/u)
    .filter(Boolean)
    .map(
      (sentence) => `在“${profile.title}”的“${unit.title}”检查中，${sentence}`,
    )
    .join("");
}

function renderPage(profile, previous, next) {
  const config = BOOKS[profile.bookSlug];
  const prefix = pascal(profile.chapterSlug);
  const imports = config.component.exports.map(
    ([suffix]) => `${prefix}${suffix}`,
  );
  const concepts = profile.units.flatMap((unit) => unit.concepts);
  const termNames = [
    ...new Set([
      ...concepts,
      ...genericTerms(profile.bookSlug).map(([term]) => term),
    ]),
  ].slice(0, 6);
  const termLine = termNames
    .map(
      (term) =>
        `<Term def=${JSON.stringify(definition(term, profile))}>${term}</Term>`,
    )
    .join("、");
  const glossary = termNames
    .map(
      (term) =>
        `  <GlossaryItem term=${JSON.stringify(term)}>\n    ${definition(term, profile)}\n  </GlossaryItem>`,
    )
    .join("\n");
  const unitSections = profile.units
    .map(
      (unit) => `### ${unit.title}

${contextualizeSentences(unit.detail.explanation, profile, unit)}

在“${profile.title}”本页，正式坐标是${unit.concepts.join("、")}。在“${profile.title}”的反例核对中，反事实为“${unit.detail.fault}”；应从${unit.detail.evidence}找到第一个分叉。

$$
${unit.detail.formula}
$$`,
    )
    .join("\n\n");
  const practice = concepts
    .map(
      (concept, index) =>
        `  ${index + 1}. **${concept}**：在“${profile.title}”章专属实验中保存${profile.evidence}，注入“${profile.fault}”，恢复后以相同输入重放。`,
    )
    .join("\n");
  const visuals = config.component.exports.map(
    ([suffix]) => `${prefix}${suffix}`,
  );
  const navigation = [
    previous
      ? `[← ${previous.title}](/learn/${profile.bookSlug}/${previous.path})`
      : null,
    next ? `[${next.title} →](/learn/${profile.bookSlug}/${next.path})` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return `import { ${imports.join(", ")} } from "@/components/mdx/${profile.bookSlug}/v2/${profile.chapterSlug}";
import {
  Objectives,
  Callout,
  Glossary,
  GlossaryItem,
  Term,
  Exercises,
  Answer,
  Stepper,
  Step,
  Attribution,
} from "@/components/mdx/mdx-components";

<Objectives>

- 能说明“${profile.title}”中的${profile.focus}，并给出对应对象、状态或概率边界
- 能用正常基线与“${profile.fault}”反例定位${profile.evidence}中的首个差异
- 能操作三个章专属实验，让${concepts.join("、")}具备解释、视觉和练习证据
- 能修改最小实现、固定输入重放，并判断“${profile.invariant}”是否恢复

</Objectives>

{/* GRAPHICS_API_ENGINES_QUALITY_V2 */}

## 从一个可推翻的运行假设开始

“${profile.title}”先固定一个问题：如何证明${profile.focus}？先写下预期对象、状态或像素，再运行正常基线；若${profile.evidence}不能指出第一个分叉，最终画面看起来正确也不能通过。

本页不变量是：${profile.invariant}。故障模式“${profile.fault}”每次只改变一个条件，正常、故障、恢复三次运行必须共享输入与版本。

## 来源、版本与课程边界

${sourceSection(profile)}

## 六个检查词

在“${profile.title}”的六词核对中，${termLine}。术语只有进入公式、交互状态、代码和可重放输出，才算真正覆盖。

## 正式单元与机制解释

${unitSections}

## 先预测，再操作三个章专属实验

<Stepper>
  <Step title="1. 对象与执行路径">
    选择任一正式坐标，沿真实对象、状态、队列或像素路径查看因果关系。

    <${visuals[0]} />

  </Step>
  <Step title="2. 单变量故障">
    保持其余条件不变，只切换一个绑定、能力、访问或同步错误，预测首个差异。

    <${visuals[1]} />

  </Step>
  <Step title="3. 证据与恢复">
    保存基线，注入“${profile.fault}”，撤销后以相同输入重放并重置。

    <${visuals[2]} />

  </Step>
</Stepper>

## 最小可重现实验

\`\`\`cpp
${profile.snippet}
\`\`\`

运行“${profile.title}”时记录API/规范版本、设备或浏览器能力、固定输入、关键中间状态与输出摘要。不得用一次漂亮截图替代对象合同、验证消息、时间戳或像素差异。

<Callout type="trap" title="本页核心误区">
  ${profile.fault}。它会破坏“${profile.invariant}”，应先由${profile.evidence}定位。
</Callout>

<Callout type="trap" title="不要跨API套生命周期模板">
  “${profile.title}”中的${profile.bookSlug === "deep-opengl" ? "OpenGL/WebGL状态机" : "Vulkan显式对象与同步"}只在自己的规范语义内解释本页。不能把另一套API的Buffer、Fence、bind或隐式同步模型换上标题后当作正文。
</Callout>

## 练习与答案

<Exercises>

**问题 1：公式边界。** 在“${profile.title}”中，如何用一个可手算样本验证 $${profile.units[0].detail.formula}$，并标明每个量属于哪一对象、stage、空间或时间点？

<Answer>
  针对“${profile.title}”固定最小输入，逐项记录${profile.evidence}；只扰动一个量并比较变化方向。若公式、验证消息和输出不一致，先拒绝实现再调查隐藏状态。
</Answer>

**问题 2：正式坐标。** 在“${profile.title}”中，${concepts.join("、")}如何进入可操作验证？

<Answer>
${practice}
</Answer>

**问题 3：恢复证据。** 怎样证明“${profile.fault}”已真正修复？

<Answer>
  保存正常基线，注入故障并标记${profile.evidence}中的首个分叉；撤销故障后以完全相同输入重放。只有${profile.invariant}重新成立且重置回到初值，修复才可交接。
</Answer>

</Exercises>

## 本章回顾

掌握“${profile.title}”意味着能把“${profile.focus}”落到具体对象、状态与输出，能制造“${profile.fault}”，还能凭${profile.evidence}恢复同输入结果。

<Glossary>
${glossary}
</Glossary>

## 阅读导航

${navigation}

<Attribution
  mode="independent-rewrite"
  sourceBasis="full-text-primary"
  workTitle=${JSON.stringify(config.workTitle)}
  adaptedUrl=${JSON.stringify(config.sourceUrl)}
/>
`;
}

function writePage(profile, previous, next) {
  const config = BOOKS[profile.bookSlug];
  const data = {
    ...profile.parsed.data,
    title: profile.title,
    description: `${profile.title}：${profile.focus}，以章专属交互与可重放证据独立重写。`,
    sourceUrl: config.sourceUrl,
    demo: true,
    math: true,
    draft: false,
    qualityVersion: 2,
    practiceMode: config.practiceMode,
    sourceMode: "independent-rewrite",
  };
  delete data.officialUnitId;
  delete data.officialUnitIds;
  if (profile.unitIds.length === 1) data.officialUnitId = profile.unitIds[0];
  else data.officialUnitIds = profile.unitIds;
  fs.writeFileSync(
    profile.filePath,
    matter.stringify(renderPage(profile, previous, next), data),
  );
}

function updateManifest(bookSlug, manifest, profiles) {
  const config = BOOKS[bookSlug];
  manifest.version = 2;
  manifest.sourceAccess = config.sourceAccess;
  manifest.sourceMode = "independent-rewrite";
  manifest.defaultSourceMode = "independent-rewrite";
  manifest.sourceKind = config.sourceKind;
  manifest.sourceUrl = config.sourceUrl;
  manifest.secondarySourceUrls = Object.values(config.factSources)
    .map((source) => source.url)
    .filter((url) => url !== config.sourceUrl);
  manifest.status = "verified-full-text-independent-rewrite";
  manifest.verifiedAt = "2026-07-30";
  manifest.disclosureNote = config.sourceSummary;
  manifest.factSourcePolicy =
    "课程页必须区分规范、指南与课程聚合结构；每个正式单元都要有解释、专属视觉、练习和可重放证据。";
  manifest.factSources = config.factSources;
  for (const unit of manifest.units) {
    const profile = profiles.find(
      (candidate) => !candidate.role && candidate.unitIds.includes(unit.id),
    );
    if (!profile) throw new Error(`${bookSlug}未映射正式单元：${unit.id}`);
    unit.sourceUnitId = unit.id;
    unit.chapterPath = profile.path;
    unit.sourceAccess = config.sourceAccess;
    unit.sourceMode = "independent-rewrite";
    unit.factSourceIds = Object.keys(config.factSources);
  }
}

const manifestRoot = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
const portableProfiles = [];
for (const [bookSlug, config] of Object.entries(BOOKS)) {
  const manifest = manifestRoot.books[bookSlug];
  if (!manifest) throw new Error(`缺少fidelity manifest：${bookSlug}`);
  const profiles = buildProfiles(bookSlug, manifest);
  const componentDir = path.join(ROOT, "src/components/mdx", bookSlug, "v2");
  fs.mkdirSync(componentDir, { recursive: true });
  profiles.forEach((profile, index) => {
    writePage(
      profile,
      profiles[index - 1] ?? null,
      profiles[index + 1] ?? null,
    );
    fs.writeFileSync(
      path.join(componentDir, `${profile.chapterSlug}.tsx`),
      wrapperSource(bookSlug, profile),
    );
    portableProfiles.push({
      bookSlug,
      chapterSlug: profile.chapterSlug,
      relativePath: path
        .relative(ROOT, profile.filePath)
        .replaceAll(path.sep, "/"),
      title: profile.title,
      unitIds: profile.unitIds,
      focus: profile.focus,
      sourceAccess: config.sourceAccess,
      sourceUrl: config.sourceUrl,
    });
  });
  updateManifest(bookSlug, manifest, profiles);
}

fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifestRoot, null, 2)}\n`);
fs.writeFileSync(
  PROFILE_PATH,
  `${JSON.stringify(
    {
      version: 2,
      books: Object.keys(BOOKS),
      pages: portableProfiles.length,
      officialUnits: Object.fromEntries(
        Object.keys(BOOKS).map((bookSlug) => [
          bookSlug,
          manifestRoot.books[bookSlug].units.length,
        ]),
      ),
      profiles: portableProfiles,
    },
    null,
    2,
  )}\n`,
);

console.log(
  JSON.stringify(
    {
      books: Object.keys(BOOKS),
      pages: portableProfiles.length,
      officialUnits: Object.keys(BOOKS).reduce(
        (sum, bookSlug) => sum + manifestRoot.books[bookSlug].units.length,
        0,
      ),
      sourceModes: Object.fromEntries(
        Object.entries(BOOKS).map(([bookSlug, config]) => [
          bookSlug,
          config.sourceAccess,
        ]),
      ),
    },
    null,
    2,
  ),
);
