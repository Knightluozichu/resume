import { VueDesignImplementationLab } from "./official-vue-design-implementation-lab";

const nodes = [
  "创建元素",
  "设置属性",
  "挂载子节点",
  "安装事件伪造器",
  "比较并更新",
  "卸载清理",
] as const;

export function Vdi08MountUpdateMapLab() {
  return (
    <VueDesignImplementationLab
      title="第 8 章 挂载与更新"
      label="Vue.js设计与实现"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Vdi08MountUpdateExperimentLab() {
  return (
    <VueDesignImplementationLab
      title="正常、边界、失败与恢复"
      label="第 8 章 挂载与更新"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Vdi08MountUpdateEvidenceLab() {
  return (
    <VueDesignImplementationLab
      title="依赖、节点与恢复证据"
      label="第 8 章 挂载与更新"
      nodes={nodes}
      mode="evidence"
    />
  );
}
