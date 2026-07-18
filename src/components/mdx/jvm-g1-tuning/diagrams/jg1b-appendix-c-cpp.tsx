import { OfficialJg1BookLab } from "./official-jg1-book-lab";

const nodes = [
  "附录C 阅读JVM需要了解的C++知识"
];

export function Jg1RegionLab() { return <OfficialJg1BookLab mode="regions" unitTitle="附录C 阅读JVM需要了解的C++知识" focus="掌握阅读HotSpot所需的头文件、类、模板、指针、宏、RAII与定义实现分离，不把删节代码当可编译原文" nodes={nodes} />; }
export function Jg1CycleLab() { return <OfficialJg1BookLab mode="cycle" unitTitle="附录C 阅读JVM需要了解的C++知识" focus="从一个G1类追踪声明、实现、宏和调用者，画出对象所有权并由调试构建验证析构与线程边界" nodes={nodes} />; }
export function Jg1EvidenceLab() { return <OfficialJg1BookLab mode="evidence" unitTitle="附录C 阅读JVM需要了解的C++知识" focus="C++到Java差异表、头源文件导航、宏展开、所有权与生命周期注释" nodes={nodes} />; }
