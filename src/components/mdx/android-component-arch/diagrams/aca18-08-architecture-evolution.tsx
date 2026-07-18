import { OfficialAca18BookLab } from "./official-aca18-book-lab";

const nodes = [
  "第8章 架构演化",
  "8.1 基础架构",
  "8.2 基础组件化",
  "8.3 模块化",
  "8.4 多模板化",
  "8.5 插件化",
  "8.6 进程化",
  "8.7 小结"
];

export function Aca18BoundaryLab() { return <OfficialAca18BookLab mode="boundary" unitTitle="第8章 架构演化" focus="比较基础架构、基础组件化、模块化、多模板化、插件化和进程化的隔离强度、成本与适用规模" nodes={nodes} />; }
export function Aca18FailureLab() { return <OfficialAca18BookLab mode="failure" unitTitle="第8章 架构演化" focus="把插件化或进程化当作组件化的必然终点，不核对业务隔离、发布频率、团队规模和故障成本" nodes={nodes} />; }
export function Aca18EvidenceLab() { return <OfficialAca18BookLab mode="evidence" unitTitle="第8章 架构演化" focus="阶段能力矩阵、依赖边界、构建部署成本、运行隔离、团队所有权和迁移决策记录" nodes={nodes} />; }
