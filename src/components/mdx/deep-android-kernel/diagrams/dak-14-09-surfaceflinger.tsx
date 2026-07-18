import { OfficialDak14BookLab } from "./official-dak14-book-lab";

const nodes = [
  "第9章 GUI系统之SurfaceFlinger",
  "9.1 OpenGL ES与EGL",
  "9.2 Android的硬件接口——HAL",
  "9.3 Android终端显示设备的化身——Gralloc与Framebuffer",
  "9.4 Android中的本地窗口",
  "9.4.1 FramebufferNativeWindow",
  "9.4.2 应用程序端的本地窗口——Surface",
  "9.5 BufferQueue详解",
  "9.5.1 BufferQueue的内部原理",
  "9.5.2 BufferQueue中的缓冲区分配",
  "9.5.3 应用程序的典型绘图流程",
  "9.5.4 应用程序与BufferQueue的关系",
  "9.6 SurfaceFlinger",
  "9.6.1 黄油计划——Project Butter",
  "9.6.2 SurfaceFlinger的启动",
  "9.6.3 接口的服务端——Client",
  "9.7 VSync的产生和处理",
  "9.7.1 VSync信号的产生和分发",
  "9.7.2 VSync信号的处理",
  "9.7.3 handleMessageTransaction",
  "9.7.4 handleMessageInvalidate",
  "9.7.5 合成前的准备工作——preComposition",
  "9.7.6 可见区域——rebuildLayerStacks",
  "9.7.7 为Composition搭建环境——setUpHWComposer",
  "9.7.8 doDebugFlashRegions",
  "9.7.9 doComposition"
];

export function Dak14PipelineLab(){return <OfficialDak14BookLab mode="pipeline" unitTitle="第9章 GUI系统之SurfaceFlinger" focus="连接EGL、HAL、Gralloc、Framebuffer、本地窗口、BufferQueue、SurfaceFlinger与VSync合成" nodes={nodes}/>;}
export function Dak14ExperimentLab(){return <OfficialDak14BookLab mode="experiment" unitTitle="第9章 GUI系统之SurfaceFlinger" focus="把Surface当作普通Bitmap，忽略生产者消费者、缓冲区所有权、同步Fence和显示时序" nodes={nodes}/>;}
export function Dak14EvidenceLab(){return <OfficialDak14BookLab mode="evidence" unitTitle="第9章 GUI系统之SurfaceFlinger" focus="缓冲区槽位、dequeue/queue时序、Fence、Layer可见区域、VSync、HWC配置与合成结果" nodes={nodes}/>;}
