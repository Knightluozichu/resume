import { DeepNodeOfficialLab } from "./official-deep-node-lab";

const chain = [
  "拆分任务依赖",
  "选择组合模型",
  "统一错误出口",
  "设置并发上限",
  "传播取消",
  "验证单次完成",
] as const;
const concepts = [
  "第4章 异步编程",
  "4.1 函数式编程",
  "4.1.1 高阶函数",
  "4.1.2 偏函数用法",
  "4.2 异步编程的优势与难点",
  "4.2.1 优势",
  "4.2.2 难点",
  "4.3 异步编程解决方案",
  "4.3.1 事件发布/订阅模式",
  "4.3.2 Promise/Deferred模式",
  "4.3.3 流程控制库",
  "4.4 异步并发控制",
  "4.4.1 Bagpipe的解决方案",
  "4.4.2 async的解决方案",
  "4.5 总结",
  "4.6 参考资源",
] as const;

export function Dnj04AsyncProgrammingMapLab() {
  return (
    <DeepNodeOfficialLab
      title="第 4 章 异步编程 · 运行地图"
      label="Deep Node / Map"
      color="#be123c"
      soft="#ffe4e6"
      chain={chain}
      concepts={concepts}
      view="map"
    />
  );
}
export function Dnj04AsyncProgrammingExperimentLab() {
  return (
    <DeepNodeOfficialLab
      title="第 4 章 异步编程 · 边界实验"
      label="Deep Node / Experiment"
      color="#be123c"
      soft="#ffe4e6"
      chain={chain}
      concepts={concepts}
      view="experiment"
    />
  );
}
export function Dnj04AsyncProgrammingEvidenceLab() {
  return (
    <DeepNodeOfficialLab
      title="第 4 章 异步编程 · 关闭证据"
      label="Deep Node / Evidence"
      color="#be123c"
      soft="#ffe4e6"
      chain={chain}
      concepts={concepts}
      view="evidence"
    />
  );
}
