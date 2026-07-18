import { UnityCreatorEvidenceLab } from "./official-unity-creator-lab";

const nodes = [
  "目标平台",
  "构建配置",
  "输入适配",
  "签名凭据",
  "设备运行",
  "商店证据",
] as const;

export function Ums07BuildAndOutputMapLab() {
  return (
    <UnityCreatorEvidenceLab
      title="第七章 输出"
      label="第七章"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Ums07BuildAndOutputExperimentLab() {
  return (
    <UnityCreatorEvidenceLab
      title="正常、边界与失败样本"
      label="第七章"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Ums07BuildAndOutputEvidenceLab() {
  return (
    <UnityCreatorEvidenceLab
      title="交付证据与阶段门"
      label="第七章"
      nodes={nodes}
      mode="evidence"
    />
  );
}
