import { OfficialAca18BookLab } from "./official-aca18-book-lab";

const nodes = [
  "第3章 组件化优化",
  "3.1 Gradle优化",
  "3.1.1 Gradle基础",
  "3.1.2 版本参数优化",
  "3.1.3 调试优化",
  "3.1.4 资源引用配置",
  "3.1.5 Gradle 4.1依赖特性",
  "3.2 Git组件化部署",
  "3.2.1 submodule子模块",
  "3.2.2 subtree",
  "3.3 小结"
];

export function Aca18BoundaryLab() { return <OfficialAca18BookLab mode="boundary" unitTitle="第3章 组件化优化" focus="用Gradle参数、调试、资源引用与4.1依赖特性缩短反馈，再比较Git submodule与subtree部署边界" nodes={nodes} />; }
export function Aca18FailureLab() { return <OfficialAca18BookLab mode="failure" unitTitle="第3章 组件化优化" focus="在没有基线和命中率证据时堆叠Gradle参数，或选择Git子仓方案却不定义版本推进与回滚所有者" nodes={nodes} />; }
export function Aca18EvidenceLab() { return <OfficialAca18BookLab mode="evidence" unitTitle="第3章 组件化优化" focus="构建扫描、配置时间、依赖解析、资源引用报告、Git提交拓扑和回滚演练" nodes={nodes} />; }
