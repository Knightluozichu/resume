import { OfficialApo12BookLab } from "./official-apo12-book-lab";

const nodes = [
  "第9章 RenderScript",
  "9.1 概览",
  "9.2 Hello World",
  "9.3 Hello Rendering",
  "9.3.1 创建渲染脚本",
  "9.3.2 创建RenderScriptGL Context",
  "9.3.3 展开RSSurfaceView",
  "9.3.4 设置内容视图",
  "9.4 在脚本中添加变量",
  "9.5 HelloCompute",
  "9.5.1 Allocation",
  "9.5.2 rsForEach",
  "9.5.3 性能",
  "9.6 自带的RenderScript API",
  "9.6.1 rs_types.rsh",
  "9.6.2 rs_core.rsh",
  "9.6.3 rs_cl.rsh",
  "9.6.4 rs_math.rsh",
  "9.6.5 rs_graphics.rsh",
  "9.6.6 rs_time.rsh",
  "9.6.7 rs_atomic.rsh",
  "9.7 RenderScript与NDK对比",
  "9.8 总结"
];

export function Apo12PipelineLab() { return <OfficialApo12BookLab mode="pipeline" unitTitle="第9章 RenderScript" focus="从RenderScript概览、Hello World与渲染，进入脚本变量、Allocation、rsForEach、内置头文件并与NDK对比" nodes={nodes} />; }
export function Apo12ExperimentLab() { return <OfficialApo12BookLab mode="experiment" unitTitle="第9章 RenderScript" focus="把RenderScript并行化当作自动加速，忽略数据传输、设备实现、Context生命周期和现已弃用的迁移边界" nodes={nodes} />; }
export function Apo12EvidenceLab() { return <OfficialApo12BookLab mode="evidence" unitTitle="第9章 RenderScript" focus="脚本编译产物、Context与Surface生命周期、Allocation传输、并行结果、API调用和NDK基准" nodes={nodes} />; }
