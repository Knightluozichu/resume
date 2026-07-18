import { OfficialAca18BookLab } from "./official-aca18-book-lab";

const nodes = [
  "第7章 架构模板",
  "7.1 组件化模板",
  "7.1.1 模板基础",
  "7.1.2 模板制作",
  "7.1.3 实时模板",
  "7.1.4 头部注释模板",
  "7.2 注解检测",
  "7.3 小结"
];

export function Aca18BoundaryLab() { return <OfficialAca18BookLab mode="boundary" unitTitle="第7章 架构模板" focus="把组件模板、实时模板、文件头模板和注解检测变成可版本化、可验证的工程规范入口" nodes={nodes} />; }
export function Aca18FailureLab() { return <OfficialAca18BookLab mode="failure" unitTitle="第7章 架构模板" focus="把模板复制视为架构治理，生成后不检查依赖方向、命名、所有者与过期配置" nodes={nodes} />; }
export function Aca18EvidenceLab() { return <OfficialAca18BookLab mode="evidence" unitTitle="第7章 架构模板" focus="模板源、生成前后差异、IDE版本、注解检测结果、错误样例和升级迁移" nodes={nodes} />; }
