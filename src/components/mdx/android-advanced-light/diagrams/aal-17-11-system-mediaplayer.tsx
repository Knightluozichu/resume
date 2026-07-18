import { OfficialAal17BookLab } from "./official-aal17-book-lab";

const nodes = [
  "第11章 系统架构与MediaPlayer框架",
  "11.1 Android系统架构",
  "11.2 Android系统源码目录",
  "11.2.1 整体结构",
  "11.2.2 应用层部分",
  "11.2.3 应用框架层部分",
  "11.2.4 C/C++程序库部分",
  "11.3 Source Insight使用",
  "11.4 MediaPlayer框架",
  "11.4.1 Java Framework层的MediaPlayer分析",
  "11.4.2 JNI层的MediaPlayer分析",
  "11.4.3 Native层的MediaPlayer分析",
  "11.5 本章小结"
];

export function Aal17PipelineLab() { return <OfficialAal17BookLab mode="pipeline" unitTitle="第11章 系统架构与MediaPlayer框架" focus="从Android系统分层与源码目录、Source Insight阅读方法，追踪MediaPlayer在Java Framework、JNI和Native三层的调用" nodes={nodes} />; }
export function Aal17ExperimentLab() { return <OfficialAal17BookLab mode="experiment" unitTitle="第11章 系统架构与MediaPlayer框架" focus="跨版本拼接源码调用链，或只追到JNI函数名而不核对Native对象、线程、错误与资源释放" nodes={nodes} />; }
export function Aal17EvidenceLab() { return <OfficialAal17BookLab mode="evidence" unitTitle="第11章 系统架构与MediaPlayer框架" focus="源码版本卡、目录定位、调用图、Java到JNI签名、Native对象所有权、线程回调与释放路径" nodes={nodes} />; }
