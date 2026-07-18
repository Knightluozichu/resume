import { OfficialGep1Lab } from "./official-gep1-lab";

const props = {
  unitId: "gep1-chapter-07-application-framework",
  title: "第7章 应用程序框架",
  nodes: [
    "创建应用实例",
    "接入平台事件",
    "映射逻辑动作",
    "驱动帧循环",
    "安全退出",
  ],
  focuses: ["平台隔离", "事件顺序", "动作映射", "帧节奏", "退出状态"],
};

export function Gep1Chapter07ApplicationFrameworkMapLab() {
  return <OfficialGep1Lab {...props} initialView="map" />;
}
export function Gep1Chapter07ApplicationFrameworkExperimentLab() {
  return <OfficialGep1Lab {...props} initialView="experiment" />;
}
export function Gep1Chapter07ApplicationFrameworkEvidenceLab() {
  return <OfficialGep1Lab {...props} initialView="evidence" />;
}
