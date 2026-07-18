import { VueDesignImplementationLab } from "./official-vue-design-implementation-lab";

const nodes = [
  "描述需求",
  "比较范式",
  "估算更新成本",
  "选择运行策略",
  "引入编译信息",
  "签发权衡",
] as const;

export function Vdi01ArtOfTradeoffsMapLab() {
  return (
    <VueDesignImplementationLab
      title="第 1 章 权衡的艺术"
      label="Vue.js设计与实现"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Vdi01ArtOfTradeoffsExperimentLab() {
  return (
    <VueDesignImplementationLab
      title="正常、边界、失败与恢复"
      label="第 1 章 权衡的艺术"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Vdi01ArtOfTradeoffsEvidenceLab() {
  return (
    <VueDesignImplementationLab
      title="依赖、节点与恢复证据"
      label="第 1 章 权衡的艺术"
      nodes={nodes}
      mode="evidence"
    />
  );
}
