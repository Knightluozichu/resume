import { OfficialGea3Lab } from "./official-gea3-lab";

const props = {
  unitId: "gea3-chapter-16-runtime-gameplay",
  title: "第16章 Runtime Gameplay Foundation Systems",
  nodes: [
    "流送世界块",
    "解析对象身份",
    "调度分阶段更新",
    "交换事件消息",
    "提交流程状态",
  ],
  focuses: ["稳定句柄", "更新调度", "并发副作用", "消息顺序", "脚本热更"],
};

export function Gea3Chapter16RuntimeGameplayMapLab() {
  return <OfficialGea3Lab {...props} initialView="map" />;
}

export function Gea3Chapter16RuntimeGameplayExperimentLab() {
  return <OfficialGea3Lab {...props} initialView="experiment" />;
}

export function Gea3Chapter16RuntimeGameplayEvidenceLab() {
  return <OfficialGea3Lab {...props} initialView="evidence" />;
}
