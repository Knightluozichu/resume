import { OfficialGep1Lab } from "./official-gep1-lab";

const props = {
  unitId: "gep1-chapter-04-data-structures",
  title: "第4章 基本数据结构",
  nodes: [
    "声明访问模式",
    "选择容器布局",
    "绑定分配策略",
    "定义迭代失效",
    "压测真实负载",
  ],
  focuses: ["缓存局部", "容量增长", "句柄稳定", "委托生命周期", "复杂度实测"],
};

export function Gep1Chapter04DataStructuresMapLab() {
  return <OfficialGep1Lab {...props} initialView="map" />;
}
export function Gep1Chapter04DataStructuresExperimentLab() {
  return <OfficialGep1Lab {...props} initialView="experiment" />;
}
export function Gep1Chapter04DataStructuresEvidenceLab() {
  return <OfficialGep1Lab {...props} initialView="evidence" />;
}
