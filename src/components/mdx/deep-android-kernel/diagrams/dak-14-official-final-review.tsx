import { OfficialDak14BookLab } from "./official-dak14-book-lab";

const nodes = [
  "第1章 Android系统简介",
  "第2章 Android源码下载及编译",
  "第3章 Android编译系统",
  "第4章 操作系统基础",
  "第5章 Android进程/线程管理",
  "第6章 进程间通信——Binder",
  "第7章 Android启动过程简析",
  "第8章 ActivityManagerService（AMS）",
  "第9章 GUI系统之SurfaceFlinger",
  "第10章 GUI系统之窗口管理员——WMS",
  "第11章 GUI系统之View体系",
  "第12章 InputManagerService与输入事件",
  "第13章 应用不再同质化——音频系统",
  "第14章 Intent的匹配规则",
  "第15章 APK应用程序的资源适配",
  "第16章 Android字符编码格式",
  "第17章 Android和OpenGL ES",
  "第18章 系统的UI——SystemUI",
  "第19章 Android常用的小插件——Widget机制",
  "第20章 Android应用程序的编译和打包",
  "第21章 软件版本管理",
  "第22章 系统调试辅助工具"
];

export function Dak14PipelineLab(){return <OfficialDak14BookLab mode="pipeline" unitTitle="《深入理解Android内核设计思想》全书总复习" focus="从可复现构建出发，串联进程、Binder、启动、GUI、输入、音频、应用机制、Git与调试证据" nodes={nodes}/>;}
export function Dak14ExperimentLab(){return <OfficialDak14BookLab mode="experiment" unitTitle="《深入理解Android内核设计思想》全书总复习" focus="只记源码类名和流程箭头，不能在锁定版本上以命令、日志、状态和失败路径重放" nodes={nodes}/>;}
export function Dak14EvidenceLab(){return <OfficialDak14BookLab mode="evidence" unitTitle="《深入理解Android内核设计思想》全书总复习" focus="全书节点表、构建哈希、Binder事务、帧与输入时序、音频缓冲区、资源匹配、签名、Git对象和ADB协议" nodes={nodes}/>;}
