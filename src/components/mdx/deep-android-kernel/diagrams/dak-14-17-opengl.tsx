import { OfficialDak14BookLab } from "./official-dak14-book-lab";

const nodes = [
  "第17章 Android和OpenGL ES",
  "17.1 3D图形学基础",
  "17.1.1 计算机3D图形",
  "17.1.2 图形管线",
  "17.2 Android中的OpenGL ES简介",
  "17.3 图形渲染API——EGL",
  "17.3.1 EGL与OpenGL ES",
  "17.3.2 egl.cfg",
  "17.3.3 EGL接口解析",
  "17.3.4 EGL实例",
  "17.4 简化OpenGL ES开发——GLSurfaceView"
];

export function Dak14PipelineLab(){return <OfficialDak14BookLab mode="pipeline" unitTitle="第17章 Android和OpenGL ES" focus="从3D图形与图形管线进入OpenGL ES、EGL接口和GLSurfaceView" nodes={nodes}/>;}
export function Dak14ExperimentLab(){return <OfficialDak14BookLab mode="experiment" unitTitle="第17章 Android和OpenGL ES" focus="只复制绘制三角形代码，不管理EGL生命周期、渲染线程和上下文丢失" nodes={nodes}/>;}
export function Dak14EvidenceLab(){return <OfficialDak14BookLab mode="evidence" unitTitle="第17章 Android和OpenGL ES" focus="EGL配置、Context/Surface、着色器、顶点与纹理、线程、帧输出和上下文丢失恢复" nodes={nodes}/>;}
