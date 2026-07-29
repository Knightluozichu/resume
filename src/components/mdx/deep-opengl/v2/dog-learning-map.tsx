"use client";

import {
  OfficialGlStateLab,
  type ApiConceptNode,
  type ApiExperimentModel,
} from "./official-gl-state-lab";

const unitTitle = "深入理解 OpenGL WebGL OpenGL ES 全书学习地图";
const nodes = [
  {
    label: "context",
    unit: "OpenGL Context, Objects, and State",
    mechanism:
      "OpenGL命令在当前context上执行，buffer、texture与program等对象保存存储或可执行内容，binding把对象选为后续命令的隐式参数。VAO记录属性格式、属性缓冲关联与element array binding，但不会把所有全局状态冻结成快照。",
    probe: "当前context、program、VAO属性槽、EBO、FBO与逐片元状态快照",
  },
  {
    label: "state machine",
    unit: "OpenGL Context, Objects, and State",
    mechanism:
      "OpenGL命令在当前context上执行，buffer、texture与program等对象保存存储或可执行内容，binding把对象选为后续命令的隐式参数。VAO记录属性格式、属性缓冲关联与element array binding，但不会把所有全局状态冻结成快照。",
    probe: "当前context、program、VAO属性槽、EBO、FBO与逐片元状态快照",
  },
  {
    label: "vao",
    unit: "OpenGL Context, Objects, and State",
    mechanism:
      "OpenGL命令在当前context上执行，buffer、texture与program等对象保存存储或可执行内容，binding把对象选为后续命令的隐式参数。VAO记录属性格式、属性缓冲关联与element array binding，但不会把所有全局状态冻结成快照。",
    probe: "当前context、program、VAO属性槽、EBO、FBO与逐片元状态快照",
  },
  {
    label: "vbo",
    unit: "OpenGL Context, Objects, and State",
    mechanism:
      "OpenGL命令在当前context上执行，buffer、texture与program等对象保存存储或可执行内容，binding把对象选为后续命令的隐式参数。VAO记录属性格式、属性缓冲关联与element array binding，但不会把所有全局状态冻结成快照。",
    probe: "当前context、program、VAO属性槽、EBO、FBO与逐片元状态快照",
  },
  {
    label: "glsl es",
    unit: "GLSL ES Shaders",
    mechanism:
      "GLSL ES编译单个shader stage，program link再核对跨阶段in/out接口。uniform由应用更新而不是逐顶点插值，precision qualifier在移动实现尤其影响范围与误差。链接成功仍不保证坐标空间和数值精度正确。",
    probe: "编译日志、链接日志、接口位置、uniform值和参考像素",
  },
  {
    label: "uniform",
    unit: "GLSL ES Shaders",
    mechanism:
      "GLSL ES编译单个shader stage，program link再核对跨阶段in/out接口。uniform由应用更新而不是逐顶点插值，precision qualifier在移动实现尤其影响范围与误差。链接成功仍不保证坐标空间和数值精度正确。",
    probe: "编译日志、链接日志、接口位置、uniform值和参考像素",
  },
  {
    label: "in/out",
    unit: "GLSL ES Shaders",
    mechanism:
      "GLSL ES编译单个shader stage，program link再核对跨阶段in/out接口。uniform由应用更新而不是逐顶点插值，precision qualifier在移动实现尤其影响范围与误差。链接成功仍不保证坐标空间和数值精度正确。",
    probe: "编译日志、链接日志、接口位置、uniform值和参考像素",
  },
  {
    label: "precision",
    unit: "GLSL ES Shaders",
    mechanism:
      "GLSL ES编译单个shader stage，program link再核对跨阶段in/out接口。uniform由应用更新而不是逐顶点插值，precision qualifier在移动实现尤其影响范围与误差。链接成功仍不保证坐标空间和数值精度正确。",
    probe: "编译日志、链接日志、接口位置、uniform值和参考像素",
  },
  {
    label: "webgl context",
    unit: "WebGL Context and WebGL 1/2",
    mechanism:
      "WebGL通过canvas.getContext取得明确对象；WebGL 1与2暴露的核心能力不同，扩展也必须逐项查询。context lost后旧GPU对象失效，应用应阻止默认处理、暂停渲染，并依据CPU侧资源描述完整重建。",
    probe: "上下文版本、扩展集合、lost/restored事件和重建对象计数",
  },
  {
    label: "webgl1",
    unit: "WebGL Context and WebGL 1/2",
    mechanism:
      "WebGL通过canvas.getContext取得明确对象；WebGL 1与2暴露的核心能力不同，扩展也必须逐项查询。context lost后旧GPU对象失效，应用应阻止默认处理、暂停渲染，并依据CPU侧资源描述完整重建。",
    probe: "上下文版本、扩展集合、lost/restored事件和重建对象计数",
  },
  {
    label: "webgl2",
    unit: "WebGL Context and WebGL 1/2",
    mechanism:
      "WebGL通过canvas.getContext取得明确对象；WebGL 1与2暴露的核心能力不同，扩展也必须逐项查询。context lost后旧GPU对象失效，应用应阻止默认处理、暂停渲染，并依据CPU侧资源描述完整重建。",
    probe: "上下文版本、扩展集合、lost/restored事件和重建对象计数",
  },
  {
    label: "context lost",
    unit: "WebGL Context and WebGL 1/2",
    mechanism:
      "WebGL通过canvas.getContext取得明确对象；WebGL 1与2暴露的核心能力不同，扩展也必须逐项查询。context lost后旧GPU对象失效，应用应阻止默认处理、暂停渲染，并依据CPU侧资源描述完整重建。",
    probe: "上下文版本、扩展集合、lost/restored事件和重建对象计数",
  },
  {
    label: "opengl es",
    unit: "OpenGL ES Mobile Runtime",
    mechanism:
      "OpenGL ES保留可编程管线核心，但平台通常通过EGL建立display、surface与context。移动GPU常按tile处理片元，频繁读回、无意义store或超大中间附件会消耗外部带宽；精度限定也必须按数值范围选择。",
    probe: "EGL配置、ES版本、附件load/store、外部带宽与shader精度范围",
  },
  {
    label: "egl",
    unit: "OpenGL ES Mobile Runtime",
    mechanism:
      "OpenGL ES保留可编程管线核心，但平台通常通过EGL建立display、surface与context。移动GPU常按tile处理片元，频繁读回、无意义store或超大中间附件会消耗外部带宽；精度限定也必须按数值范围选择。",
    probe: "EGL配置、ES版本、附件load/store、外部带宽与shader精度范围",
  },
  {
    label: "precision qualifier",
    unit: "OpenGL ES Mobile Runtime",
    mechanism:
      "OpenGL ES保留可编程管线核心，但平台通常通过EGL建立display、surface与context。移动GPU常按tile处理片元，频繁读回、无意义store或超大中间附件会消耗外部带宽；精度限定也必须按数值范围选择。",
    probe: "EGL配置、ES版本、附件load/store、外部带宽与shader精度范围",
  },
  {
    label: "tile",
    unit: "OpenGL ES Mobile Runtime",
    mechanism:
      "OpenGL ES保留可编程管线核心，但平台通常通过EGL建立display、surface与context。移动GPU常按tile处理片元，频繁读回、无意义store或超大中间附件会消耗外部带宽；精度限定也必须按数值范围选择。",
    probe: "EGL配置、ES版本、附件load/store、外部带宽与shader精度范围",
  },
  {
    label: "framebuffer",
    unit: "Framebuffer and Post-processing",
    mechanism:
      "framebuffer把颜色、深度和模板attachment组成渲染目标；完整性取决于附件尺寸、样本数、格式和层级等条件。后处理先渲染到离屏颜色附件，再以纹理输入执行下一pass，必须防止读写同一子资源的反馈环。",
    probe: "完整性状态、附件尺寸/样本数、draw buffers和逐pass参考像素",
  },
  {
    label: "color attachment",
    unit: "Framebuffer and Post-processing",
    mechanism:
      "framebuffer把颜色、深度和模板attachment组成渲染目标；完整性取决于附件尺寸、样本数、格式和层级等条件。后处理先渲染到离屏颜色附件，再以纹理输入执行下一pass，必须防止读写同一子资源的反馈环。",
    probe: "完整性状态、附件尺寸/样本数、draw buffers和逐pass参考像素",
  },
  {
    label: "depth attachment",
    unit: "Framebuffer and Post-processing",
    mechanism:
      "framebuffer把颜色、深度和模板attachment组成渲染目标；完整性取决于附件尺寸、样本数、格式和层级等条件。后处理先渲染到离屏颜色附件，再以纹理输入执行下一pass，必须防止读写同一子资源的反馈环。",
    probe: "完整性状态、附件尺寸/样本数、draw buffers和逐pass参考像素",
  },
  {
    label: "post-processing",
    unit: "Framebuffer and Post-processing",
    mechanism:
      "framebuffer把颜色、深度和模板attachment组成渲染目标；完整性取决于附件尺寸、样本数、格式和层级等条件。后处理先渲染到离屏颜色附件，再以纹理输入执行下一pass，必须防止读写同一子资源的反馈环。",
    probe: "完整性状态、附件尺寸/样本数、draw buffers和逐pass参考像素",
  },
  {
    label: "draw call",
    unit: "Draw-call and Rendering Optimization",
    mechanism:
      "draw call成本包含CPU提交、驱动验证与GPU工作；instancing减少重复提交，state sorting减少昂贵切换，但透明对象仍受顺序约束。优化必须同时比较帧时间、提交数、带宽与像素结果。",
    probe: "CPU/GPU时间戳、draw数、状态切换、带宽和图像差异",
  },
  {
    label: "instancing",
    unit: "Draw-call and Rendering Optimization",
    mechanism:
      "draw call成本包含CPU提交、驱动验证与GPU工作；instancing减少重复提交，state sorting减少昂贵切换，但透明对象仍受顺序约束。优化必须同时比较帧时间、提交数、带宽与像素结果。",
    probe: "CPU/GPU时间戳、draw数、状态切换、带宽和图像差异",
  },
  {
    label: "state sorting",
    unit: "Draw-call and Rendering Optimization",
    mechanism:
      "draw call成本包含CPU提交、驱动验证与GPU工作；instancing减少重复提交，state sorting减少昂贵切换，但透明对象仍受顺序约束。优化必须同时比较帧时间、提交数、带宽与像素结果。",
    probe: "CPU/GPU时间戳、draw数、状态切换、带宽和图像差异",
  },
  {
    label: "bandwidth",
    unit: "Draw-call and Rendering Optimization",
    mechanism:
      "draw call成本包含CPU提交、驱动验证与GPU工作；instancing减少重复提交，state sorting减少昂贵切换，但透明对象仍受顺序约束。优化必须同时比较帧时间、提交数、带宽与像素结果。",
    probe: "CPU/GPU时间戳、draw数、状态切换、带宽和图像差异",
  },
  {
    label: "feature detection",
    unit: "Feature Detection and Extensions",
    mechanism:
      "feature detection先查询版本、extension与limit，再选择实现路径；桌面OpenGL、ES和WebGL名称相似但核心集合、着色语言与安全约束不同。fallback必须保持结果合同或明确降级质量。",
    probe: "版本、扩展、限制、选择路径和降级输出差异",
  },
  {
    label: "extension",
    unit: "Feature Detection and Extensions",
    mechanism:
      "feature detection先查询版本、extension与limit，再选择实现路径；桌面OpenGL、ES和WebGL名称相似但核心集合、着色语言与安全约束不同。fallback必须保持结果合同或明确降级质量。",
    probe: "版本、扩展、限制、选择路径和降级输出差异",
  },
  {
    label: "fallback",
    unit: "Feature Detection and Extensions",
    mechanism:
      "feature detection先查询版本、extension与limit，再选择实现路径；桌面OpenGL、ES和WebGL名称相似但核心集合、着色语言与安全约束不同。fallback必须保持结果合同或明确降级质量。",
    probe: "版本、扩展、限制、选择路径和降级输出差异",
  },
  {
    label: "compatibility",
    unit: "Feature Detection and Extensions",
    mechanism:
      "feature detection先查询版本、extension与limit，再选择实现路径；桌面OpenGL、ES和WebGL名称相似但核心集合、着色语言与安全约束不同。fallback必须保持结果合同或明确降级质量。",
    probe: "版本、扩展、限制、选择路径和降级输出差异",
  },
  {
    label: "glgeterror",
    unit: "Debugging and GPU Profiling",
    mechanism:
      "glGetError只提供有限错误队列且可能扰动热路径；KHR_debug能携带source、type、severity与对象标签。RenderDoc或Spector帧捕获展示资源和命令状态，timer query则把GPU区间与CPU提交时间分开。",
    probe: "debug message、对象标签、捕获事件、资源快照与GPU时间戳",
  },
  {
    label: "khr_debug",
    unit: "Debugging and GPU Profiling",
    mechanism:
      "glGetError只提供有限错误队列且可能扰动热路径；KHR_debug能携带source、type、severity与对象标签。RenderDoc或Spector帧捕获展示资源和命令状态，timer query则把GPU区间与CPU提交时间分开。",
    probe: "debug message、对象标签、捕获事件、资源快照与GPU时间戳",
  },
  {
    label: "renderdoc",
    unit: "Debugging and GPU Profiling",
    mechanism:
      "glGetError只提供有限错误队列且可能扰动热路径；KHR_debug能携带source、type、severity与对象标签。RenderDoc或Spector帧捕获展示资源和命令状态，timer query则把GPU区间与CPU提交时间分开。",
    probe: "debug message、对象标签、捕获事件、资源快照与GPU时间戳",
  },
  {
    label: "profil",
    unit: "Debugging and GPU Profiling",
    mechanism:
      "glGetError只提供有限错误队列且可能扰动热路径；KHR_debug能携带source、type、severity与对象标签。RenderDoc或Spector帧捕获展示资源和命令状态，timer query则把GPU区间与CPU提交时间分开。",
    probe: "debug message、对象标签、捕获事件、资源快照与GPU时间戳",
  },
] satisfies ApiConceptNode[];
const model = {
  focus:
    "区分上下文状态、对象存储、绑定点与VAO捕获关系；用GLSL ES阶段接口、精度与uniform合同连接顶点和片元；管理WebGL上下文创建、版本能力、丢失与资源重建；在EGL、OpenGL ES与tile-based GPU边界内控制带宽和精度；用完整FBO附件合同实现可复算的多遍后处理；用提交、状态切换和带宽证据优化绘制而不改变结果；按版本、扩展与限制查询构造跨平台能力降级图；用调试回调、帧捕获与GPU计时定位首个错误事件",
  formula:
    "Draw=F(Ctx,Program,VAO,FBO,State) ; gl\\_Position=M_{clip\\leftarrow model}p ; Ready=Context\\land Capabilities\\land Resources ; Cost\\approx B_{external}+N_{tiles}C_{tile} ; Pass_{n+1}=Shader(Texture(Pass_n)) ; T_{frame}=T_{cpu}+T_{gpu}+T_{sync} ; Path=select(Core,Extensions,Limits) ; Fault=first(Event_{actual}\\ne Event_{expected})",
  invariant:
    "深入理解 OpenGL WebGL OpenGL ES 全书学习地图的输入、状态、输出与恢复结果可用同一证据包重放",
  fault:
    "把ARRAY_BUFFER当前绑定误当成VAO整体状态，或依赖上一个pass残留开关；顶点输出与片元输入位置或类型不一致，或片元高光计算使用过低精度；假设WebGL2或扩展必定存在，或context restored后继续复用旧句柄；把桌面扩展当作ES核心能力，或每个pass都强制保存不会再读取的附件；FBO不完整仍绘制，或把当前颜色附件同时绑定为采样输入；只减少draw call却增加过度绘制或带宽，或用glFinish制造虚假稳定计时；用厂商字符串猜能力，或扩展存在却未检查对应限制与入口；只在帧尾调用glGetError，或用CPU墙钟时间替代GPU查询",
  evidence:
    "当前context、program、VAO属性槽、EBO、FBO与逐片元状态快照、编译日志、链接日志、接口位置、uniform值和参考像素、上下文版本、扩展集合、lost/restored事件和重建对象计数、EGL配置、ES版本、附件load/store、外部带宽与shader精度范围、完整性状态、附件尺寸/样本数、draw buffers和逐pass参考像素、CPU/GPU时间戳、draw数、状态切换、带宽和图像差异、版本、扩展、限制、选择路径和降级输出差异、debug message、对象标签、捕获事件、资源快照与GPU时间戳",
  sourceLabel: "Khronos OpenGL / OpenGL ES / GLSL / WebGL 规范课程",
} satisfies ApiExperimentModel;
const props = { unitTitle, nodes, model };

export function DogLearningMapStateLab() {
  return <OfficialGlStateLab mode="state" {...props} />;
}

export function DogLearningMapFaultLab() {
  return <OfficialGlStateLab mode="fault" {...props} />;
}

export function DogLearningMapEvidenceLab() {
  return <OfficialGlStateLab mode="evidence" {...props} />;
}
