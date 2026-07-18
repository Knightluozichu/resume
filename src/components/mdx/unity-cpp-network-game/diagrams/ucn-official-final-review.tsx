import { UnityCppEvidenceLab } from "./official-unity-cpp-evidence-lab";

const nodes = [
  "复核Unity工程基线",
  "复核人物场景UI",
  "复核C++网络数据库协议",
  "复核登录与网关",
  "复核中心与战场",
  "复核HLA、AI、职业路线与恢复",
] as const;

export function UcnOfficialFinalReviewMapLab() {
  return (
    <UnityCppEvidenceLab
      title="《Unity与C++网络游戏开发实战》全书总复习"
      label="全书复习"
      nodes={nodes}
      mode="map"
    />
  );
}

export function UcnOfficialFinalReviewExperimentLab() {
  return (
    <UnityCppEvidenceLab
      title="正常、边界与失败样本"
      label="《Unity与C++网络游戏开发实战》全书总复习"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function UcnOfficialFinalReviewEvidenceLab() {
  return (
    <UnityCppEvidenceLab
      title="所有权、代际与恢复证据"
      label="《Unity与C++网络游戏开发实战》全书总复习"
      nodes={nodes}
      mode="evidence"
    />
  );
}
