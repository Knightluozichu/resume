import { OfficialAca18BookLab } from "./official-aca18-book-lab";

const nodes = [
  "第4章 组件化编译",
  "4.1 Gradle编译",
  "4.1.1 Android基础编译流程",
  "4.1.2 Instant Run",
  "4.1.3 更优的Gradle构建策略",
  "4.2 极速增量编译",
  "4.2.1 Freeline的使用",
  "4.2.2 Freeline运行介绍",
  "4.3 小结"
];

export function Aca18BoundaryLab() { return <OfficialAca18BookLab mode="boundary" unitTitle="第4章 组件化编译" focus="沿Android构建任务图解释Gradle编译、Instant Run、构建策略与Freeline增量编译的输入输出和失效条件" nodes={nodes} />; }
export function Aca18FailureLab() { return <OfficialAca18BookLab mode="failure" unitTitle="第4章 组件化编译" focus="只记录一次热构建速度，忽略代码、资源、Manifest、插件变化会触发不同范围的失效与全量回退" nodes={nodes} />; }
export function Aca18EvidenceLab() { return <OfficialAca18BookLab mode="evidence" unitTitle="第4章 组件化编译" focus="任务图、增量输入、缓存命中、冷暖构建时间、安装产物和错误回退路径" nodes={nodes} />; }
