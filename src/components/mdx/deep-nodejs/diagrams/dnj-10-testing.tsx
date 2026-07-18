import { DeepNodeOfficialLab } from "./official-deep-node-lab";

const chain = [
  "定义可观察契约",
  "隔离外部依赖",
  "控制异步完成",
  "建立性能基线",
  "施加真实压力",
  "保存回归证据",
] as const;
const concepts = [
  "第10章 测试",
  "10.1 单元测试",
  "10.1.1 单元测试的意义",
  "10.1.2 单元测试介绍",
  "10.1.3 工程化与自动化",
  "10.1.4 小结",
  "10.2 性能测试",
  "10.2.1 基准测试",
  "10.2.2 压力测试",
  "10.2.3 基准测试驱动开发",
  "10.2.4 测试数据与业务数据的转换",
  "10.3 总结",
  "10.4 参考资源",
] as const;

export function Dnj10TestingMapLab() {
  return (
    <DeepNodeOfficialLab
      title="第 10 章 测试 · 运行地图"
      label="Deep Node / Map"
      color="#9f1239"
      soft="#ffe4e6"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}
export function Dnj10TestingExperimentLab() {
  return (
    <DeepNodeOfficialLab
      title="第 10 章 测试 · 边界实验"
      label="Deep Node / Experiment"
      color="#9f1239"
      soft="#ffe4e6"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}
export function Dnj10TestingEvidenceLab() {
  return (
    <DeepNodeOfficialLab
      title="第 10 章 测试 · 关闭证据"
      label="Deep Node / Evidence"
      color="#9f1239"
      soft="#ffe4e6"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
