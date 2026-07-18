import { OfficialAca18BookLab } from "./official-aca18-book-lab";

const nodes = [
  "第1章 组件化基础",
  "第2章 组件化编程",
  "第3章 组件化优化",
  "第4章 组件化编译",
  "第5章 组件化分发",
  "第6章 组件化流通",
  "第7章 架构模板",
  "第8章 架构演化",
  "附录A 思维与架构"
];

export function Aca18BoundaryLab() { return <OfficialAca18BookLab mode="boundary" unitTitle="《Android组件化架构》权威学习地图" focus="沿基础、编程、优化、编译、分发、流通、模板、演化与架构思维建立2018年组件化全链路" nodes={nodes} />; }
export function Aca18FailureLab() { return <OfficialAca18BookLab mode="failure" unitTitle="《Android组件化架构》权威学习地图" focus="把原书压成路由、通信、DI和构建几个现代专题，遗漏编译、分发、流通、模板与演化" nodes={nodes} />; }
export function Aca18EvidenceLab() { return <OfficialAca18BookLab mode="evidence" unitTitle="《Android组件化架构》权威学习地图" focus="9单元131节点矩阵、版本卡、依赖与构建图、实验路线、历史API迁移账本" nodes={nodes} />; }
