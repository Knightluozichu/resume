import { OfficialApo12BookLab } from "./official-apo12-book-lab";

const nodes = [
  "第2章 NDK入门",
  "2.1 NDK里有什么",
  "2.2 混合使用Java和C/C++代码",
  "2.2.1 声明本地方法",
  "2.2.2 实现JNI粘合层",
  "2.2.3 创建Makefile",
  "2.2.4 实现本地函数",
  "2.2.5 编译本地库",
  "2.2.6 加载本地库",
  "2.3 Application.mk",
  "2.3.1 为几乎所有设备优化",
  "2.3.2 支持所有设备",
  "2.4 Android.mk",
  "2.5 使用C/C++改进性能",
  "2.6 NativeActivity",
  "2.6.1 构建缺失的库",
  "2.6.2 替代方案",
  "2.7 总结"
];

export function Apo12PipelineLab() { return <OfficialApo12BookLab mode="pipeline" unitTitle="第2章 NDK入门" focus="贯通NDK内容、Java与C/C++混合、JNI粘合层、Makefile、ABI配置、Android.mk、性能对照与NativeActivity" nodes={nodes} />; }
export function Apo12ExperimentLab() { return <OfficialApo12BookLab mode="experiment" unitTitle="第2章 NDK入门" focus="因为C/C++看似更快就搬迁全部逻辑，忽略JNI过渡、复制、异常、ABI体积和生命周期成本" nodes={nodes} />; }
export function Apo12EvidenceLab() { return <OfficialApo12BookLab mode="evidence" unitTitle="第2章 NDK入门" focus="JNI签名、Application.mk与Android.mk、ABI产物、加载日志、基准和NativeActivity回退" nodes={nodes} />; }
