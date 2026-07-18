import { OfficialAdae15BookLab } from "./official-adae15-book-lab";

const nodes = [
  "第14章 JNI和NDK编程",
  "14.1 JNI的开发流程",
  "14.2 NDK的开发流程",
  "14.3 JNI的数据类型和类型签名",
  "14.4 JNI调用Java方法的流程"
];

export function AdaeFlowLab() { return <OfficialAdae15BookLab mode="flow" unitTitle="第14章 JNI和NDK编程" focus="贯通JNI/NDK构建、Java与原生类型签名、方法查找、线程附着和异常/资源释放" nodes={nodes} />; }
export function AdaeFailureLab() { return <OfficialAdae15BookLab mode="failure" unitTitle="第14章 JNI和NDK编程" focus="缓存线程局部JNIEnv、遗漏Release/Delete，或让原生崩溃绕过Java异常模型" nodes={nodes} />; }
export function AdaeEvidenceLab() { return <OfficialAdae15BookLab mode="evidence" unitTitle="第14章 JNI和NDK编程" focus="构建指纹、符号表、类型签名表、调用时序、异常传播和资源清理测试" nodes={nodes} />; }
