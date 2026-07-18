import { DeepNodeOfficialLab } from "./official-deep-node-lab";

const chain = [
  "固化工程结构",
  "构建与审查",
  "生成可追溯制品",
  "滚动部署",
  "监控日志与性能",
  "演练故障回滚",
] as const;
const concepts = [
  "第11章 产品化",
  "11.1 项目工程化",
  "11.1.1 目录结构",
  "11.1.2 构建工具",
  "11.1.3 编码规范",
  "11.1.4 代码审查",
  "11.2 部署流程",
  "11.2.1 部署环境",
  "11.2.2 部署操作",
  "11.3 性能",
  "11.3.1 动静分离",
  "11.3.2 启用缓存",
  "11.3.3 多进程架构",
  "11.3.4 读写分离",
  "11.4 日志",
  "11.4.1 访问日志",
  "11.4.2 异常日志",
  "11.4.3 日志与数据库",
  "11.4.4 分割日志",
  "11.4.5 小结",
  "11.5 监控报警",
  "11.5.1 监控",
  "11.5.2 报警的实现",
  "11.5.3 监控系统的稳定性",
  "11.6 稳定性",
  "11.7 异构共存",
  "11.8 总结",
  "11.9 参考资源",
] as const;

export function Dnj11ProductizationMapLab() {
  return (
    <DeepNodeOfficialLab
      title="第 11 章 产品化 · 运行地图"
      label="Deep Node / Map"
      color="#166534"
      soft="#dcfce7"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}
export function Dnj11ProductizationExperimentLab() {
  return (
    <DeepNodeOfficialLab
      title="第 11 章 产品化 · 边界实验"
      label="Deep Node / Experiment"
      color="#166534"
      soft="#dcfce7"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}
export function Dnj11ProductizationEvidenceLab() {
  return (
    <DeepNodeOfficialLab
      title="第 11 章 产品化 · 关闭证据"
      label="Deep Node / Evidence"
      color="#166534"
      soft="#dcfce7"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
