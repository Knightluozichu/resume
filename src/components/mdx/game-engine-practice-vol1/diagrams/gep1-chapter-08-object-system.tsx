import { OfficialGep1Lab } from "./official-gep1-lab";

const props = {
  unitId: "gep1-chapter-08-object-system",
  title: "第8章 对象系统",
  nodes: [
    "注册类型元数据",
    "创建稳定对象",
    "编辑与序列化",
    "克隆或复制",
    "回收引用图",
  ],
  focuses: ["引用所有权", "反射版本", "对象图存储", "UI事务", "复制权限"],
};

export function Gep1Chapter08ObjectSystemMapLab() {
  return <OfficialGep1Lab {...props} initialView="map" />;
}
export function Gep1Chapter08ObjectSystemExperimentLab() {
  return <OfficialGep1Lab {...props} initialView="experiment" />;
}
export function Gep1Chapter08ObjectSystemEvidenceLab() {
  return <OfficialGep1Lab {...props} initialView="evidence" />;
}
